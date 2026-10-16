/* Buscador de libros por fragmento textual — motor y UI.
   Datos: corpus.json (metadatos), index.json.gz (raíz -> [[libro, frecuencia]]),
   books/<id>.json.gz ({ch:[capítulos], seg:[[capIdx, texto, "raíces"]]}). */
'use strict';

const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const TOKEN = /[\p{L}\p{N}]+/gu;
const stemmers = { es: snowballFactory.newStemmer('spanish'), en: snowballFactory.newStemmer('english') };
const stemCache = new Map();
function stem(word, lang) {
  const key = lang + ':' + word;
  let v = stemCache.get(key);
  if (v === undefined) { v = stemmers[lang].stem(word); stemCache.set(key, v); }
  return v;
}
const stemAny = w => { const a = stem(w, 'es'), b = stem(w, 'en'); return a === b ? [a] : [a, b]; };

/* ---------- analizador de consultas ----------
   orExpr := andExpr (OR andExpr)* ; andExpr := notExpr ((AND)? notExpr)* ;
   notExpr := NOT notExpr | atom ; atom := "frase" | término | '(' orExpr ')' */
function lexQuery(q) {
  const toks = [];
  const re = /"([^"]+)"|\(|\)|[^\s()"]+/g;
  let m;
  while ((m = re.exec(q))) {
    if (m[1] !== undefined) toks.push({ k: 'phrase', v: m[1] });
    else if (m[0] === '(' || m[0] === ')') toks.push({ k: m[0] });
    else {
      const up = m[0].toUpperCase();
      if (['AND', 'OR', 'NOT', 'Y', 'O', 'NO'].includes(up)) {
        const map = { AND: 'AND', Y: 'AND', OR: 'OR', O: 'OR', NOT: 'NOT', NO: 'NOT' };
        toks.push({ k: 'op', v: map[up] });
      } else toks.push({ k: 'term', v: m[0] });
    }
  }
  return toks;
}
function parseQuery(q) {
  const toks = lexQuery(q);
  let pos = 0;
  const peek = () => toks[pos];
  function parseOr() {
    let left = parseAnd();
    while (peek() && peek().k === 'op' && peek().v === 'OR') { pos++; left = { t: 'or', a: left, b: parseAnd() }; }
    return left;
  }
  function parseAnd() {
    let left = parseNot();
    for (;;) {
      const p = peek();
      if (!p || p.k === ')' || (p.k === 'op' && p.v === 'OR')) break;
      if (p.k === 'op' && p.v === 'AND') pos++;
      left = { t: 'and', a: left, b: parseNot() };
    }
    return left;
  }
  function parseNot() {
    const p = peek();
    if (p && p.k === 'op' && p.v === 'NOT') { pos++; return { t: 'not', a: parseNot() }; }
    return parseAtom();
  }
  function parseAtom() {
    const p = peek();
    if (!p) throw new Error('Consulta incompleta');
    if (p.k === '(') { pos++; const e = parseOr(); if (peek() && peek().k === ')') pos++; else throw new Error('Falta cerrar un paréntesis'); return e; }
    pos++;
    if (p.k === 'phrase') {
      const wordsRaw = (p.v.match(TOKEN) || []).filter(w => w.length);
      if (!wordsRaw.length) throw new Error('Frase vacía');
      // coincidencia exacta solicitada: se respetan tildes y mayúsculas (spec §3)
      const words = wordsRaw.map(norm);
      return { t: 'phrase', raw: p.v, wordsRaw, joinedRaw: wordsRaw.join(' '), words, joined: words.join(' ') };
    }
    if (p.k === 'term') {
      const w = norm(p.v).replace(/[^\p{L}\p{N}]/gu, '');
      if (!w) throw new Error('Término vacío');
      return { t: 'term', word: w };
    }
    throw new Error('Operador inesperado');
  }
  if (!toks.length) throw new Error('Escribe algo para buscar');
  const tree = parseOr();
  if (pos < toks.length) throw new Error('No entiendo la consulta tal como está escrita');
  return tree;
}
/* hojas positivas (para candidatos/ranking) y negativas (exclusión de obra) */
function leaves(tree, neg = false, out = { pos: [], neg: [] }) {
  if (tree.t === 'not') leaves(tree.a, !neg, out);
  else if (tree.t === 'and' || tree.t === 'or') { leaves(tree.a, neg, out); leaves(tree.b, neg, out); }
  else (neg ? out.neg : out.pos).push(tree);
  return out;
}

/* ---------- datos ---------- */
let corpus = null, index = null;
const bookCache = new Map();
async function fetchGzJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const buf = await r.arrayBuffer();
  const ds = new DecompressionStream('gzip');
  const text = await new Response(new Blob([buf]).stream().pipeThrough(ds)).text();
  return JSON.parse(text);
}
async function loadIndex() { if (!index) index = await fetchGzJSON('index.json.gz'); return index; }
async function loadCorpus() { if (!corpus) corpus = await (await fetch('corpus.json')).json(); return corpus; }
async function loadBook(n) {
  const b = corpus.books[n];
  if (!bookCache.has(b.p)) bookCache.set(b.p, fetchGzJSON('pack-' + b.p + '.json.gz'));
  const pack = await bookCache.get(b.p);
  return pack[b.id];
}

/* candidatos por hoja: conjunto de libros (n) que contienen la hoja a nivel obra */
function leafPostingSet(leaf) {
  const set = new Set();
  if (leaf.t === 'term') {
    for (const st of stemAny(leaf.word)) {
      const post = index[st];
      if (post) for (const [n] of post) set.add(n);
    }
    leaf.stems = stemAny(leaf.word);
  } else {
    // frase: intersección de las raíces de sus palabras (todas deben estar en la obra)
    let acc = null;
    leaf.stems = leaf.words.map(w => stemAny(w));
    for (const alts of leaf.stems) {
      const s = new Set();
      for (const st of alts) { const post = index[st]; if (post) for (const [n] of post) s.add(n); }
      if (!s.size) continue; // palabra sin postings (p. ej. "y"): no estrecha; la verificación literal decide
      acc = acc === null ? s : new Set([...acc].filter(x => s.has(x)));
      if (!acc.size) break;
    }
    for (const n of (acc || [])) set.add(n);
  }
  return set;
}
function evalBookLevel(tree, sets, universe) {
  switch (tree.t) {
    case 'term': case 'phrase': return sets.get(tree);
    case 'and': { const a = evalBookLevel(tree.a, sets, universe); if (!a.size) return a; const b = evalBookLevel(tree.b, sets, universe); return new Set([...a].filter(x => b.has(x))); }
    case 'or': { const a = evalBookLevel(tree.a, sets, universe); const b = evalBookLevel(tree.b, sets, universe); return new Set([...a, ...b]); }
    case 'not': { const a = evalBookLevel(tree.a, sets, universe); return new Set([...universe].filter(x => !a.has(x))); }
  }
}

/* puntuación a nivel obra */
function bookScore(tree, n, tfOf, words) {
  switch (tree.t) {
    case 'term': {
      let tf = 0;
      for (const st of tree.stems) tf += tfOf(st, n) || 0;
      return tf ? Math.log1p(tf) / Math.log(10 + words) : 0;
    }
    case 'phrase': {
      // frase: pondera por rareza (idf) y densidad de cada palabra en la obra; no es prueba de coincidencia, solo orden de verificación
      if (!tree.idfInfo) {
        const N = (corpus && corpus.books.length) || 1;
        tree.idfInfo = (tree.stems || []).map(alts => {
          const seen = new Set();
          for (const st of alts) { const p = index[st]; if (p) for (const [bn] of p) seen.add(bn); }
          return seen.size ? Math.log(N / seen.size) + 0.05 : 0;
        });
      }
      let sc = 0;
      (tree.stems || []).forEach((alts, i) => {
        if (!tree.idfInfo[i]) return;
        let tf = 0;
        for (const st of alts) tf += tfOf(st, n) || 0;
        if (tf) sc += tree.idfInfo[i] * Math.log1p(tf * 1e5 / words);
      });
      return 2 * sc / Math.max(1, (tree.stems || []).length * 6);
    }
    case 'and': return bookScore(tree.a, n, tfOf, words) + bookScore(tree.b, n, tfOf, words);
    case 'or': return Math.max(bookScore(tree.a, n, tfOf, words), bookScore(tree.b, n, tfOf, words));
    case 'not': return 0;
  }
}

/* ---------- verificación estricta por segmento ---------- */
function normTextWithMap(text) {
  // texto normalizado + mapa de cada carácter normalizado a su índice original
  const n = text.normalize('NFD');
  let out = ''; const map = [];
  for (let i = 0; i < n.length; i++) {
    const c = n[i];
    if (c >= '̀' && c <= 'ͯ') continue; // marcas combinantes
    const lc = c.toLowerCase();
    for (const d of lc) { out += d; map.push(i); }
  }
  // re-mapea índices NFD a índices del original: NFD puede expandir (p.ej. á -> a+´)
  // Construimos correspondencia recorriendo el original.
  const orig = text; const omap = [];
  let ni = 0;
  for (let oi = 0; oi < orig.length; oi++) {
    const d = orig[oi].normalize('NFD');
    for (let k = 0; k < d.length; k++) omap.push(oi);
  }
  return { norm: out, map: map.map(i => omap[i] ?? 0) };
}
function phraseInSegment(leaf, segNormJoined) {
  const target = leaf.joinedRaw || leaf.joined;
  let from = 0;
  for (;;) {
    const at = segNormJoined.indexOf(target, from);
    if (at === -1) return false;
    const before = at === 0 ? ' ' : segNormJoined[at - 1];
    const after = at + target.length >= segNormJoined.length ? ' ' : segNormJoined[at + target.length];
    if (before === ' ' && after === ' ') return true;
    from = at + 1;
  }
}
function segmentTokens(text) {
  const toks = [];
  for (const m of text.matchAll(TOKEN)) toks.push({ raw: m[0], i: m.index, len: m[0].length });
  return toks;
}
function joinedTokens(text) {
  // "palabra palabra palabra" normalizado (una fila)
  return (text.match(TOKEN) || []).map(norm).join(' ');
}
function joinedTokensRaw(text) {
  // fila de tokens SIN normalizar: para frases exactas (sensibles a tildes/mayúsculas)
  return (text.match(TOKEN) || []).join(' ');
}

/* evalúa la parte positiva del árbol dentro de un segmento */
function evalSegment(tree, segStemSet, segJoined, phraseHits) {
  switch (tree.t) {
    case 'term': return tree.stems.some(s => segStemSet.has(s));
    case 'phrase': {
      const ok = phraseInSegment(tree, segJoined);
      if (ok && phraseHits) phraseHits.push(tree);
      return ok;
    }
    case 'and': { const a = evalSegment(tree.a, segStemSet, segJoined, phraseHits); if (!a) return false; return evalSegment(tree.b, segStemSet, segJoined, phraseHits); }
    case 'or': return evalSegment(tree.a, segStemSet, segJoined, phraseHits) || evalSegment(tree.b, segStemSet, segJoined, phraseHits);
    case 'not': return true; // NOT se aplica a nivel de obra, no de segmento
  }
}
function countLeaves(tree, segStemSet, segJoined) {
  switch (tree.t) {
    case 'term': return tree.stems.some(s => segStemSet.has(s)) ? 1 : 0;
    case 'phrase': return phraseInSegment(tree, segJoined) ? 1 : 0;
    case 'and': case 'or': return countLeaves(tree.a, segStemSet, segJoined) + countLeaves(tree.b, segStemSet, segJoined);
    case 'not': return 0;
  }
}

function analyzeBook(book, tree, lang) {
  // devuelve segmentos coincidentes [{i, ch, score}]
  const hits = [];
  for (let i = 0; i < book.seg.length; i++) {
    const [ch, text, stems] = book.seg[i];
    const set = new Set(stems.split(' '));
    const joined = joinedTokensRaw(text);
    if (evalSegment(tree, set, joined)) {
      hits.push({ i, ch, score: countLeaves(tree, set, joined), text });
    }
  }
  hits.sort((a, b) => b.score - a.score || a.i - b.i);
  return hits.slice(0, 50);
}

/* ---------- fragmento y resaltado ---------- */
function makeSnippet(segText, tree, lang) {
  const MAXW = 340;
  if (segText.length <= 400) return segText;
  const toks = segmentTokens(segText);
  // spans de coincidencia [ini, fin, peso]: frases literales (peso 2) + términos por raíz (peso 1)
  const spans = [];
  for (const ph of collectPhrases(tree)) {
    const n = ph.wordsRaw.length;
    for (let i = 0; i + n <= toks.length; i++) {
      let ok = true;
      for (let k = 0; k < n; k++) if (toks[i + k].raw !== ph.wordsRaw[k]) { ok = false; break; }
      if (ok) { spans.push([toks[i].i, toks[i + n - 1].i + toks[i + n - 1].len, 2]); i += n - 1; }
    }
  }
  for (const tk of toks) {
    const w = norm(tk.raw);
    if (w.length < 2) continue;
    if (leafMatchStem(tree, stem(w, lang))) spans.push([tk.i, tk.i + tk.len, 1]);
  }
  let start, end;
  if (!spans.length) {
    start = Math.max(0, Math.min(Math.floor(segText.length / 2) - Math.floor(MAXW / 2), segText.length - MAXW));
    end = Math.min(start + MAXW, segText.length);
  } else {
    spans.sort((a, b) => a[0] - b[0]);
    // ancla: inicio del grupo de spans con más peso total dentro de una ventana MAXW
    let ai = 0, best = -1;
    for (let i = 0; i < spans.length; i++) {
      let d = 0;
      for (let j = i; j < spans.length && spans[j][1] - spans[i][0] <= MAXW; j++) d += spans[j][2];
      if (d > best) { best = d; ai = i; }
    }
    let a0 = spans[ai][0], a1 = spans[ai][1];
    for (const sp of spans) if (sp[0] >= a0 && sp[1] - a0 <= MAXW) a1 = Math.max(a1, sp[1]);
    const spanLen = a1 - a0;
    const pad = Math.floor((MAXW - Math.min(spanLen, MAXW)) / 2);
    start = Math.max(0, Math.min(a0 - pad, segText.length - MAXW));
    end = Math.min(start + MAXW, segText.length);
    if (end < a1) { end = a1; start = Math.max(0, end - MAXW); }
    // el ajuste a palabra/frase solo puede ensanchar la ventana, nunca cortar la coincidencia
    while (start > 0 && /\S/.test(segText[start - 1])) start--;
    const tail = segText.slice(Math.max(start, end - 60), Math.min(end + 40, segText.length));
    const stopM = tail.match(/[.!?…»\n]\s/);
    if (stopM) {
      const candEnd = Math.max(start, end - 60) + stopM.index + 1;
      if (candEnd > start + 200 && candEnd >= a1) { end = candEnd; }
      else { while (end < segText.length && /\S/.test(segText[end])) end++; }
    } else { while (end < segText.length && /\S/.test(segText[end])) end++; }
    if (end < a1) end = Math.min(a1, segText.length);
    return (start > 0 ? '… ' : '') + segText.slice(start, end).trim() + (end < segText.length ? ' …' : '');
  }
  while (start > 0 && /\S/.test(segText[start - 1])) start--;
  end = Math.min(start + MAXW, segText.length);
  const tail = segText.slice(end - 60, Math.min(end + 40, segText.length));
  const stopM = tail.match(/[.!?…»\n]\s/);
  if (stopM && end - 60 + stopM.index + 1 > start + 200) end = end - 60 + stopM.index + 1;
  else { while (end < segText.length && /\S/.test(segText[end])) end++; }
  return (start > 0 ? '… ' : '') + segText.slice(start, end).trim() + (end < segText.length ? ' …' : '');
}
function collectPhrases(tree, out = []) {
  if (tree.t === 'phrase') out.push(tree);
  else if (tree.a) { collectPhrases(tree.a, out); if (tree.b) collectPhrases(tree.b, out); }
  return out;
}
function leafMatchStem(tree, st) {
  switch (tree.t) {
    case 'term': return tree.stems.includes(st);
    case 'and': case 'or': return leafMatchStem(tree.a, st) || leafMatchStem(tree.b, st);
    default: return false;
  }
}
function highlight(snippet, tree, lang) {
  // resalta tokens cuyo stem coincide + ocurrencias de frases exactas
  const phraseSpans = [];
  for (const ph of collectPhrases(tree)) {
    const target = ph.joinedRaw;
    const jt = (snippet.match(TOKEN) || []);
    // busca secuencia de tokens literal (tildes/mayúsculas sensibles)
    for (let i = 0; i + ph.wordsRaw.length <= jt.length; i++) {
      if (jt.slice(i, i + ph.wordsRaw.length).join(' ') === target) {
        const toks = segmentTokens(snippet);
        if (toks[i] && toks[i + ph.wordsRaw.length - 1]) {
          phraseSpans.push([toks[i].i, toks[i + ph.wordsRaw.length - 1].i + toks[i + ph.wordsRaw.length - 1].len]);
        }
        i += ph.wordsRaw.length - 1;
      }
    }
  }
  let html = '', last = 0;
  const toks = segmentTokens(snippet);
  const marks = [];
  for (const tk of toks) {
    const w = norm(tk.raw);
    let isMark = w.length >= 2 && leafMatchStem(tree, stem(w, lang));
    if (!isMark) for (const [s, e] of phraseSpans) if (tk.i >= s && tk.i < e) { isMark = true; break; }
    if (isMark) marks.push([tk.i, tk.i + tk.len]);
  }
  // fusiona marcas contiguas separadas solo por espacios (una frase se ve como un solo resaltado)
  const merged = [];
  for (const m of marks) {
    const lm = merged[merged.length - 1];
    if (lm && /^\s+$/.test(snippet.slice(lm[1], m[0]))) lm[1] = m[1];
    else merged.push([m[0], m[1]]);
  }
  for (const [s, e] of merged) {
    html += escapeHtml(snippet.slice(last, s)) + '<mark>' + escapeHtml(snippet.slice(s, e)) + '</mark>';
    last = e;
  }
  html += escapeHtml(snippet.slice(last));
  return html;
}
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- export para pruebas en Node ---------- */
if (typeof module !== 'undefined') {
  module.exports = { norm, parseQuery, leaves, joinedTokens, joinedTokensRaw, normTextWithMap, stem, stemAny, stemmers, evalSegment, countLeaves, makeSnippet, highlight, leafMatchStem, collectPhrases, phraseInSegment, evalBookLevel, leafPostingSet, bookScore, analyzeBook, loadIndex, loadCorpus, loadBook, fetchGzJSON };
}
