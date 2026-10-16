const WebSocket=require('ws'); const http=require('http'); const fs=require('fs');
const get=u=>new Promise((res,rej)=>http.get(u,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(d));}).on('error',rej));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const targets=JSON.parse(await get('http://127.0.0.1:9222/json'));
  console.log('targets:',targets.map(t=>t.type+' '+t.url).join(' | '));
  const t=targets.find(x=>x.type==='page'); const ws=new WebSocket(t.webSocketDebuggerUrl);
  await new Promise(r=>ws.on('open',r));
  let id=0; const pend={}; const logs=[];
  ws.on('message',m=>{const d=JSON.parse(m); if(d.id&&pend[d.id]){pend[d.id](d);delete pend[d.id];}
    else if(d.method==='Runtime.exceptionThrown') logs.push('EXC '+JSON.stringify(d.params.exceptionDetails.exception&&d.params.exceptionDetails.exception.description||d.params.exceptionDetails.text));
    else if(d.method==='Runtime.consoleAPICalled'&&['error','warning'].includes(d.params.type)) logs.push('CON '+d.params.type+' '+d.params.args.map(a=>a.value||a.description).join(' ').slice(0,200));
    else if(d.method==='Network.loadingFailed') logs.push('NETFAIL '+d.params.errorText+' '+(d.params.blockedReason||''));});
  const send=(method,params={})=>new Promise(r=>{const i=++id;pend[i]=r;ws.send(JSON.stringify({id:i,method,params}));});
  const ev=async(expr)=>{const r=await send('Runtime.evaluate',{expression:expr,awaitPromise:true,returnByValue:true});return r.result.result?r.result.result.value:r.result;};
  await send('Runtime.enable'); await send('Network.enable'); await send('Page.enable');
  console.log('page:',JSON.stringify(await ev('({url:location.href,ua:navigator.userAgent,w:innerWidth,h:innerHeight,status:document.querySelector("#status").innerText,topics:document.querySelectorAll("#f-topics-list input").length})')));
  const run=async(label,q,setup)=>{
    await ev(`(()=>{${setup||''};document.querySelector("#q").value=${JSON.stringify(q)};document.querySelector("#search-form").requestSubmit();})()`);
    const t0=Date.now(); let st;
    for(;;){await sleep(1500); st=await ev('({busy:document.querySelector("#search-btn").disabled,cards:document.querySelectorAll(".card").length,nullbox:!!document.querySelector(".null-box"),status:document.querySelector("#status").innerText.slice(0,140)})');
      if(!st.busy||Date.now()-t0>150000)break;}
    console.log('RESULT',label,q,'ms='+(Date.now()-t0),JSON.stringify(st));
    return st;};
  const shot=async(n)=>{const r=await send('Page.captureScreenshot',{format:'png'}); fs.writeFileSync('evidence/'+n+'.png',Buffer.from(r.result.data,'base64'));};
  await run('base','amor'); await shot('02-amor');
  await run('latin','arma virumque');
  await run('griego','μῆνιν ἄειδε');
  await run('tema1','amor','const c=document.querySelector("#f-topics-list input");c.checked=true;c.dispatchEvent(new Event("change",{bubbles:true}))');
  await ev('document.querySelector("#f-topics").open=true'); await shot('03-temas-abierto');
  const hasAll=await ev('!!document.querySelector("#f-topics-all")');
  console.log('boton seleccionar todos:',hasAll);
  if(hasAll){ await ev('document.querySelector("#f-topics-all").click()'); await sleep(500); console.log('tras seleccionar todos:',await ev('document.querySelectorAll("#f-topics-list input:checked").length+" marcados; "+document.querySelector("#f-topics-summary").innerText')); await run('todos-temas','amor'); await shot('04-todos-temas');}
  if(hasAll){ await ev('document.querySelector("#f-topics-clear").click()'); await sleep(500);
    console.log('tras quitar seleccion:',await ev('document.querySelectorAll("#f-topics-list input:checked").length+" marcados; resumen="+document.querySelector("#f-topics-summary").innerText')); await shot('05-quitar-seleccion'); }
  // inyeccion de fallo de descarga de packs (CDP Fetch) y reintento
  let failMode=true, blocked=0;
  ws.on('message',m=>{const d=JSON.parse(m); if(d.method==='Fetch.requestPaused'){ if(failMode){blocked++; send('Fetch.failRequest',{requestId:d.params.requestId,errorReason:'Failed'});} else send('Fetch.continueRequest',{requestId:d.params.requestId}); }});
  await send('Page.navigate',{url:'https://xesco-tejedor.github.io/OpCit/'});
  for(let i=0;i<60;i++){await sleep(1000); const s2=await ev('(document.querySelector("#status")||{}).innerText||""'); if(/Corpus listo/.test(s2))break;}
  await send('Fetch.enable',{patterns:[{urlPattern:'*pack-*',requestStage:'Request'},{urlPattern:'*extpack-*',requestStage:'Request'}]});
  const f1=await run('fallo-inyectado','amor');
  console.log('peticiones de packs bloqueadas:',blocked,'| caja de error visible:',await ev('(document.querySelector(".null-box h3")||{}).innerText'));
  await shot('06-fallo-descarga');
  failMode=false;
  const f2=await run('reintento-sin-fallo','amor'); await shot('07-reintento-ok');
  console.log('LOGS',JSON.stringify(logs.slice(0,30)));
  ws.close(); process.exit(0);
})().catch(e=>{console.log('CDPERR',e.message);process.exit(1);});
