/* UI: flujo de búsqueda, tarjetas, paginación, filtros. Requiere app.js (motor) cargado antes. */
'use strict';
(function () {
const PAGE = 10;
const $ = s => document.querySelector(s);
const resultsEl = $('#results'), statusEl = $('#status'), pagerEl = $('#pager');
let current = null; // {tree, candidates:[{n,score}], verified:[results], cursor, filters}
let searchSeq = 0;

async function boot() {
  try {
    await loadCorpus();
    const n = corpus.books.length;
    const words = corpus.books.reduce((a, b) => a + b.w, 0);
    const txt = n + ' obras (' + (words / 1e6).toFixed(1) + ' M de palabras)';
    $('#corpus-count').textContent = n;
    $('#corpus-count-2').textContent = n;
    const cc3 = $('#corpus-count-3'); if (cc3) cc3.textContent = n;
    document.querySelector('.tagline').innerHTML =
      'Encuentra una obra por lo que <em>dice</em>, no por su título: busca dentro del texto íntegro de ' +
      n + ' obras de dominio público (' + (words / 1e6).toFixed(1) + ' millones de palabras).';
    // temas: subjects más frecuentes
    const freq = {};
    for (const b of corpus.books) for (const s of b.s) freq[s] = (freq[s] || 0) + 1;
    const top = Object.entries(freq).filter(([, c]) => c >= 3).sort((a, b) => b[1] - a[1]).slice(0, 24);
    const sel = $('#f-subject');
    for (const [s, c] of top) {
      const o = document.createElement('option');
      o.value = s; o.textContent = s + ' (' + c + ')';
      sel.appendChild(o);
    }
    statusEl.innerHTML = 'Corpus listo: <strong>' + txt + '</strong>. La búsqueda se ejecuta en tu navegador.';
  } catch (e) {
    statusEl.textContent = 'No pude cargar el corpus: ' + e.message;
  }
}

function passesFilters(n) {
  const b = corpus.books[n];
  const lang = $('#f-lang').value, subj = $('#f-subject').value;
  if (lang && b.l !== lang) return false;
  if (subj && !b.s.includes(subj)) return false;
  return true;
}

async function runSearch(q) {
  const seq = ++searchSeq;
  resultsEl.innerHTML = ''; pagerEl.innerHTML = '';
  let tree;
  try { tree = parseQuery(q); }
  catch (e) { statusEl.textContent = e.message; return; }
  $('#search-btn').disabled = true;
  statusEl.textContent = 'Cargando índice…';
  try {
    await Promise.all([loadCorpus(), loadIndex()]);
    if (seq !== searchSeq) return;
    const { pos, neg } = leaves(tree);
    if (!pos.length) { statusEl.textContent = 'La búsqueda necesita al menos un término positivo (no puede ser solo NOT).'; $('#search-btn').disabled = false; return; }
    const sets = new Map();
    for (const leaf of [...pos, ...neg]) sets.set(leaf, leafPostingSet(leaf));
    const universe = new Set(corpus.books.map(b => b.n));
    let cand = evalBookLevel(tree, sets, universe);
    // tf lookup para ranking
    const tfOf = (st, n) => {
      const post = index[st];
      if (!post) return 0;
      for (const [bn, tf] of post) if (bn === n) return tf;
      return 0;
    };
    let ranked = [...cand].map(n => ({ n, score: bookScore(tree, n, tfOf, corpus.books[n].w) }))
      .filter(x => passesFilters(x.n))
      .sort((a, b) => b.score - a.score);
    current = { tree, ranked, verified: [], cursor: 0, seq };
    statusEl.textContent = ranked.length + ' obras candidatas; verificando coincidencia en el mismo segmento…';
    await fillPage(1);
  } catch (e) {
    statusEl.textContent = 'Error: ' + e.message;
  } finally {
    $('#search-btn').disabled = false;
  }
}

async function fillPage(page) {
  const c = current; if (!c) return;
  const need = page * PAGE;
  const tree = c.tree;
  while (c.verified.length < need && c.cursor < c.ranked.length) {
    if (c.seq !== searchSeq) return;
    const batch = c.ranked.slice(c.cursor, c.cursor + 12);
    c.cursor += batch.length;
    const books = await Promise.all(batch.map(x => loadBook(x.n).then(b => [x, b]).catch(() => null)));
    if (c.seq !== searchSeq) return;
    for (const pair of books) {
      if (!pair) continue;
      const [x, book] = pair;
      const hits = analyzeBook(book, tree, corpus.books[x.n].l);
      if (hits.length) c.verified.push({ n: x.n, score: x.score, book, hits });
    }
    statusEl.textContent = 'Verificando: ' + Math.min(c.cursor, c.ranked.length) + '/' + c.ranked.length +
      ' obras revisadas, ' + c.verified.length + ' resultados confirmados…';
  }
  renderPage(page);
}

function renderPage(page) {
  const c = current; if (!c) return;
  const start = (page - 1) * PAGE;
  const items = c.verified.slice(start, start + PAGE);
  const done = c.cursor >= c.ranked.length;
  const total = c.verified.length + (done ? 0 : '+');
  if (!items.length && page === 1) {
    statusEl.textContent = '';
    resultsEl.innerHTML = nullBox();
    pagerEl.innerHTML = '';
    return;
  }
  statusEl.innerHTML = '<strong>' + total + '</strong> resultado' + (total === 1 ? '' : 's') +
    ' confirmado' + (total === 1 ? '' : 's') + ' en el texto' + (done ? '' : ' (seguirá creciendo al avanzar de página)') + '.';
  resultsEl.innerHTML = items.map((r, i) => cardHtml(r, start + i)).join('');
  for (const d of resultsEl.querySelectorAll('details.occs-details')) {
    d.addEventListener('toggle', () => { if (d.open && !d.dataset.loaded) { d.dataset.loaded = '1'; fillOccs(d); } });
  }
  // paginación
  pagerEl.innerHTML = '';
  if (page > 1 || !done || c.verified.length > start + PAGE) {
    const mk = (label, p, disabled) => {
      const b = document.createElement('button');
      b.textContent = label; b.disabled = disabled;
      b.onclick = () => fillPage(p);
      return b;
    };
    const hasMore = c.verified.length > start + PAGE || !done;
    pagerEl.appendChild(mk('← Anterior', page - 1, page <= 1));
    const info = document.createElement('span');
    info.className = 'page-info'; info.textContent = 'Página ' + page;
    pagerEl.appendChild(info);
    pagerEl.appendChild(mk('Siguiente →', page + 1, !hasMore));
  }
  window.scrollTo({ top: resultsEl.offsetTop - 90, behavior: 'smooth' });
}

function cardHtml(r, k) {
  const b = corpus.books[r.n];
  const lang = b.l;
  const best = r.hits[0];
  const snip = makeSnippet(best.text, current.tree, lang);
  const chap = best.ch >= 0 && r.book.ch[best.ch] ? r.book.ch[best.ch] : null;
  const gurl = 'https://www.gutenberg.org/ebooks/' + b.id;
  const occCount = r.hits.length;
  return `<article class="card">
  <h3><a href="${gurl}" target="_blank" rel="noopener">${escapeHtml(b.t)}</a></h3>
  <p class="author">${escapeHtml(b.a.join(' · '))}</p>
  <p class="snippet">${highlight(snip, current.tree, lang)}</p>
  <div class="meta">
    ${chap ? `<span class="chap">§ ${escapeHtml(chap)}</span>` : '<span>§ sin referencia de capítulo</span>'}
    <span>${occCount === 1 ? '1 aparición' : (occCount >= 50 ? 'más de 50 apariciones' : occCount + ' apariciones')} en segmentos distintos</span>
    <span>${b.l === 'es' ? 'Español' : 'English'}</span>
    <a href="${gurl}" target="_blank" rel="noopener">Ficha en Gutenberg ↗</a>
  </div>
  ${occCount > 1 ? `<details class="occs-details" data-k="${k}"><summary>Ver ${occCount >= 50 ? 'las 50 principales' : 'todas las ' + occCount} apariciones</summary><ul class="occs"></ul></details>` : ''}
</article>`;
}

function fillOccs(details) {
  const k = +details.dataset.k;
  const c = current;
  const start = Math.floor(k / PAGE) * PAGE;
  const r = c.verified[k];
  if (!r) return;
  const ul = details.querySelector('.occs');
  ul.innerHTML = r.hits.map(h => {
    const chap = h.ch >= 0 && r.book.ch[h.ch] ? r.book.ch[h.ch] : 'sin referencia de capítulo';
    const snip = makeSnippet(h.text, c.tree, corpus.books[r.n].l);
    return `<li><span class="occ-chap">§ ${escapeHtml(chap)}</span><span class="occ-text">${highlight(snip, c.tree, corpus.books[r.n].l)}</span></li>`;
  }).join('');
}

function nullBox() {
  const q = $('#q').value;
  const tips = [];
  if (/"/.test(q)) tips.push('Las comillas piden coincidencia literal (tildes, mayúsculas y forma exacta): quítalas para ignorarlas y admitir flexiones, o revisa la grafía de la frase.');
  if (/\b(AND|Y)\b|\s/.test(q.trim())) tips.push('Prueba con menos términos: todos los términos exigidos deben convivir en un mismo párrafo.');
  if (!/\bOR\b|\bO\b/.test(q)) tips.push('Usa OR para alternar sinónimos: <code>cielo OR mar</code>.');
  if ($('#f-lang').value || $('#f-subject').value) tips.push('Amplía los filtros de idioma o tema (ahora están limitando el corpus).');
  tips.push('Recuerda que el corpus es una selección de obras de dominio público: la obra que buscas puede no estar en él.');
  return `<div class="null-box"><h3>Sin coincidencias</h3>
  <p>Ninguna obra del corpus contiene esos términos juntos en un mismo segmento del texto.</p>
  <ul>${tips.map(t => `<li>${t}</li>`).join('')}</ul></div>`;
}

$('#search-form').addEventListener('submit', e => { e.preventDefault(); runSearch($('#q').value.trim()); });
$('#f-lang').addEventListener('change', () => { if ($('#q').value.trim()) runSearch($('#q').value.trim()); });
$('#f-subject').addEventListener('change', () => { if ($('#q').value.trim()) runSearch($('#q').value.trim()); });
boot();
})();
