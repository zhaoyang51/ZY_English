// Browser smoke test without third-party packages. Uses an isolated headless Chrome profile.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const { pathToFileURL } = require('node:url');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const chromePath = process.env.REVIEW_CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/chromium', '/usr/bin/google-chrome'
].find(p => fs.existsSync(p));
if (!chromePath) throw new Error('Set REVIEW_CHROME_PATH to a Chrome/Chromium executable.');
const artifacts = path.join(root, 'scratch', 'reading-check');
fs.mkdirSync(artifacts, { recursive: true });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'english-review-'));
const requests = [];
const failures = new Map([['/data/years/2010.js', 1]]);
const delays = new Map([['/data/years/2011.js', 800], ['/data/years/2013.js', 800], ['/data/years/2015.js', 800]]);
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  requests.push(pathname);
  if (failures.get(pathname)) {
    failures.set(pathname, failures.get(pathname) - 1);
    res.writeHead(503); return res.end('Simulated temporary failure');
  }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.setHeader('Content-Type', ({ '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json' })[path.extname(file)] || 'application/octet-stream');
    if (delays.has(pathname)) setTimeout(() => res.end(data), delays.get(pathname));
    else res.end(data);
  });
});
let chrome;
let socket;
let id = 0;
const pending = new Map();
const errors = [];
async function run() {
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  chrome = spawn(chromePath, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', '--disable-background-networking', 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
  const endpoint = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Chrome startup timeout')), 20000);
    let log = '';
    chrome.stderr.on('data', chunk => {
      log += chunk;
      const match = log.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
    chrome.on('error', reject);
  });
  const pages = await (await fetch(`http://${new URL(endpoint).host}/json/list`)).json();
  socket = new WebSocket(pages.find(p => p.type === 'page').webSocketDebuggerUrl);
  await once(socket, 'open');
  socket.addEventListener('message', event => {
    const m = JSON.parse(event.data);
    if (m.id) { const item = pending.get(m.id); pending.delete(m.id); if (item) m.error ? item.reject(new Error(JSON.stringify(m.error))) : item.resolve(m.result); }
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  });
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: artifacts });
  await send('Page.navigate', { url: `http://127.0.0.1:${server.address().port}/` });
  await poll(() => evaluate('document.querySelector("#yearSelect")?.options.length === 17'));
  await poll(() => evaluate('!!document.querySelector("#retryDataLoadBtn")'));
  assert.ok(await evaluate('document.querySelector("#nextBtn").disabled && document.querySelector("#btnExpNotesMd").disabled'));
  await evaluate('document.querySelector("#retryDataLoadBtn").click()');
  await ready();
  assert.deepEqual(await evaluate('Object.keys(window.KAOYAN_PURE_DATA)'), ['2010']);
  assert.deepEqual([...new Set(requests.filter(p => /\/data\/years\//.test(p)))], ['/data/years/2010.js']);
  assert.ok(!requests.includes('/data/all_data.js'));
  await evaluate('document.querySelector("#reviewModeBtn").click()');
  await jump(1);
  assert.ok(await evaluate('!!document.querySelector(".vocab-matrix-wrap")'));
  assert.equal(await evaluate('document.querySelectorAll("#workspaceContent textarea,#workspaceContent input,#workspaceContent select").length'), 0);
  await evaluate('document.querySelector(".vocab-mask-toggle").click();document.querySelector("[data-view=table]").click()');
  assert.ok(await evaluate('document.querySelector(".vocab-matrix-wrap").classList.contains("mask-active")'));
  await evaluate('document.querySelector("[data-view=grid]").click();document.querySelector(".vocab-mask-toggle").click()');
  await jump(2);
  await evaluate('document.querySelector("#nextBtn").click();document.querySelector("#nextBtn").click();document.querySelector("#nextBtn").click();document.querySelector("#nextBtn").click()');
  assert.ok(await evaluate('!!document.querySelector(".reading-backbone")'));
  await screenshot('sentence-desktop.png');
  await jump(3);
  await evaluate('document.querySelector("#nextBtn").click()');
  assert.ok(await evaluate('document.querySelector(".reading-answer").textContent.includes("答案：D")'));
  assert.equal(await evaluate('document.querySelectorAll("#workspaceContent input,#workspaceContent textarea,#workspaceContent details").length'), 0);
  assert.equal(await evaluate('document.querySelectorAll("#workspaceContent .btn-review-q-jump").length'), 5);
  await evaluate('document.querySelector("#workspaceContent .btn-review-q-jump[data-qid=\'23\']").click()');
  assert.ok(await evaluate('document.querySelector("#workspaceContent").textContent.includes("23题 · 题干、题型与核心出处")'));
  assert.ok(await evaluate('document.querySelector("#workspaceContent .btn-review-q-jump[data-qid=\'23\']").classList.contains("active")'));
  assert.equal(await evaluate('document.querySelectorAll("#examPaper .btn-jump-to-review-q").length'), 5);
  await evaluate('document.querySelector("#examPaper .btn-jump-to-review-q[data-qid=\'24\']").click()');
  assert.ok(await evaluate('document.querySelector("#workspaceContent").textContent.includes("24题 · 题干、题型与核心出处")'));
  assert.ok(await evaluate('document.querySelector("#workspaceContent .btn-review-q-jump[data-qid=\'24\']").classList.contains("active")'));
  await select('#yearSelect', '2024');
  await select('#textSelect', '1');
  await jump(4);
  assert.ok(await evaluate('document.querySelector("#workspaceContent").textContent.includes("数字经济")'));
  assert.ok(await evaluate('!document.querySelector("#workspaceContent").textContent.includes("龋齿")'));
  assert.equal(await evaluate('document.querySelectorAll("#workspaceContent .reading-evidence").length'), 5);
  assert.equal(await evaluate('document.querySelectorAll("#workspaceContent .part-b-select").length'), 5);
  await evaluate('(() => { const selects = document.querySelectorAll("#workspaceContent .part-b-select"); selects.forEach(s => s.value = s.getAttribute("data-correct")); window.QuizModule.checkPartB(); })()');
  assert.ok(await evaluate('document.querySelector("#partBResultBox").style.display !== "none"'));
  assert.ok(await evaluate('document.querySelector("#partBResultBox").textContent.includes("答对 5 / 5 题")'));
  await evaluate('document.querySelector(".part-b-box").scrollIntoView({ behavior: "instant", block: "start" })');
  await screenshot('discourse-desktop.png');
  await select('#yearSelect', '2026');
  await select('#textSelect', '4');
  await jump(3);
  await evaluate('document.querySelector("#nextBtn").click()');
  assert.ok(await evaluate('document.querySelector("#workspaceContent").textContent.includes("答案：C")'));
  assert.ok(await evaluate('document.querySelector("#workspaceContent").textContent.includes("第 1 段")'));
  await jump(5);
  assert.ok(await evaluate('document.querySelector("#workspaceContent").textContent.includes("搭配与使用范围")'));
  assert.equal(await evaluate('document.querySelectorAll(".corpus-card").length'), 3);
  await evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async text=>{window.__copied=text}}});document.querySelector(".btn-copy-slot").click()');
  assert.ok(await evaluate('window.__copied.includes("pay its own way")'));
  await evaluate('document.querySelectorAll(".corpus-tab-btn")[1].click()');
  assert.equal(await evaluate('Array.from(document.querySelectorAll(".corpus-card")).filter(c=>c.style.display!=="none").length'), 1);
  await evaluate('document.querySelector(".corpus-tab-btn").click()');
  await screenshot('writing-desktop.png');
  await evaluate('document.querySelector("#toggleAllBtn").click()');
  assert.equal(await evaluate('document.querySelectorAll("#workspaceContent input,#workspaceContent textarea,#workspaceContent details").length'), 0);
  assert.equal(await evaluate('document.querySelectorAll("#workspaceContent select").length'), 5);
  assert.ok(await evaluate('!document.querySelector("#workspaceContent").textContent.includes("undefined")'));
  await evaluate('document.querySelector(".btn-copy-slot").click()');
  assert.ok(await evaluate('window.__copied.includes("pay its own way")'));
  const downloadStart = Date.now();
  await evaluate('document.querySelector("#exportBtn").click();document.querySelector("#btnExpNotesMd").click();document.querySelector("#closeExportBtn").click()');
  const latest = () => fs.readdirSync(artifacts).find(f => f.endsWith('.md') && fs.statSync(path.join(artifacts, f)).mtimeMs >= downloadStart);
  await poll(async () => !!latest());
  const md = fs.readFileSync(path.join(artifacts, latest()), 'utf8');
  assert.equal((md.match(/^## [一二三四五]、/gm) || []).length, 5);
  assert.ok(md.includes('搭配与使用范围'));
  assert.doesNotMatch(md, /undefined/);
  await evaluate('document.querySelector("#toggleAllBtn").click()');
  await jump(5);
  for (const theme of ['dark', 'parchment', 'light']) {
    await select('#themeSelect', theme);
    assert.ok(await evaluate('!!document.querySelector(".reading-writing-note")'));
    if (theme === 'dark') await screenshot('writing-dark.png');
  }
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate('document.querySelector("#tabRightBtn").click();document.querySelector("#toggleTopbarBtn").click();window.scrollTo(0,0)');
  await screenshot('writing-mobile.png');
  const bounds = await evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth})');
  assert.ok(bounds.scroll <= bounds.width + 2, JSON.stringify(bounds));
  const navBounds = await evaluate('(()=>{const r=document.querySelector(".floating-nav-bar").getBoundingClientRect();return {left:r.left,right:r.right,width:innerWidth}})()');
  assert.ok(navBounds.left >= 0 && navBounds.right <= navBounds.width, JSON.stringify(navBounds));
  for (const width of [768, 1024]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1024, deviceScaleFactor: 1, mobile: true });
    await evaluate('document.querySelector("#tabRightBtn").click()');
    assert.ok(await evaluate('getComputedStyle(document.querySelector(".right-panel")).display !== "none" && document.querySelector("#workspaceContent").textContent.length > 100'));
    await evaluate('document.querySelector("#tabLeftBtn").click()');
    assert.ok(await evaluate('getComputedStyle(document.querySelector(".left-panel")).display !== "none" && document.querySelector("#examPaper").textContent.length > 100'));
  }
  await evaluate('document.querySelector("#practiceModeBtn").click();document.querySelector("#submodeMockBtn").click()');
  assert.equal(await evaluate('document.querySelectorAll(".mock-q-card").length'), 5);
  await evaluate('document.querySelector("#vocabModeBtn").click()');
  assert.ok(await evaluate('document.querySelector("#vocabSection").textContent.length > 100'));
  await send('Emulation.setTouchEmulationEnabled', { enabled: true });
  for (const width of [390, 768, 1024, 1366]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: true });
    assert.equal(await evaluate('document.querySelector("#vocabBtnStarFront").textContent'), '☆');
    await tap('#vocabBtnStarFront');
    assert.equal(await evaluate('document.querySelector("#vocabBtnStarBack").textContent'), '★');
    assert.equal(await evaluate('document.querySelector("#vocabBtnStarBack").getAttribute("aria-pressed")'), 'true');
    await tap('#vocabBtnStarFront');
    assert.equal(await evaluate('document.querySelector("#vocabBtnStarBack").textContent'), '☆');
    const beforeNext = await evaluate('document.querySelector("#vocabSessionProgressText").textContent');
    const beforeRatings = await evaluate('localStorage.getItem("KAOYAN_VOCAB_PROGRESS_V2")');
    await tap('#vocabBtnNextFront');
    assert.notEqual(await evaluate('document.querySelector("#vocabSessionProgressText").textContent'), beforeNext);
    await tap('#vocabWordFront');
    assert.ok(await evaluate('document.querySelector("#vocabCardFlipper").classList.contains("is-flipped")'));
    // Force a long explanation to ensure buttons remain reachable, without an inner scroller.
    await evaluate('document.querySelector("#vocabSentenceZh").textContent="长例句与译文测试。".repeat(180)');
    assert.ok(await evaluate('getComputedStyle(document.querySelector("#vocabFaceBack")).overflowY === "visible"'));
    const backBefore = await evaluate('document.querySelector("#vocabSessionProgressText").textContent');
    if (width === 390) { await reveal('#vocabBtnNext'); await screenshot('vocab-mobile-controls.png'); }
    await tap('#vocabBtnNext');
    assert.notEqual(await evaluate('document.querySelector("#vocabSessionProgressText").textContent'), backBefore);
    assert.equal(await evaluate('localStorage.getItem("KAOYAN_VOCAB_PROGRESS_V2")'), beforeRatings, 'Next must not record a grade');
  }
  await send('Emulation.setTouchEmulationEnabled', { enabled: false });
  // Independent vocabulary filters fetch missing context, but never all years at once.
  await select('#vocabYearSelect', '2015');
  await select('#vocabYearSelect', '2016');
  await poll(() => evaluate('!!window.DataLoader.peek(2015) && !!window.DataLoader.peek(2016)'));
  const contextCheck = await evaluate('(()=>{const w=document.querySelector("#vocabWordFront").textContent;const t=document.querySelector("#vocabTextSelect").value;const s=window.VocabModule.findExamSentence(w,2016,t);return {expected:s?.text,actual:document.querySelector("#vocabSentenceEn").textContent}})()');
  assert.ok(contextCheck.expected, 'Selected vocabulary has an authentic context');
  assert.equal(contextCheck.actual, contextCheck.expected, 'A slower older vocabulary request must not replace the current context');
  await evaluate('document.querySelector("#reviewModeBtn").click()');
  // Fast year/text/mode changes must render only the newest selection.
  await evaluate('(()=>{const s=document.querySelector("#yearSelect");s.value="2011";s.dispatchEvent(new Event("change"));s.value="2012";s.dispatchEvent(new Event("change"));const t=document.querySelector("#textSelect");t.value="3";t.dispatchEvent(new Event("change"));document.querySelector("#practiceModeBtn").click()})()');
  await ready();
  await poll(() => evaluate('!!window.DataLoader.peek(2011)'));
  assert.ok(await evaluate('document.querySelector("#examPaper").textContent.includes(window.KAOYAN_PURE_DATA[2012].texts[2].paragraphs[0].text.slice(0,40))'));
  assert.equal(await evaluate('document.querySelector("#textSelect").value'), '3');
  assert.ok(await evaluate('document.body.classList.contains("mode-practice")'));
  await select('#yearSelect', '2024');
  await select('#textSelect', '4');
  await select('#yearSelect', '2012');
  assert.equal(await evaluate('document.querySelector("#textSelect").value'), '1');
  assert.equal(requests.filter(p => p === '/data/years/2012.js').length, 1);
  // A late failure cannot overwrite a newer, successful cached selection.
  failures.set('/data/years/2014.js', 1);
  await evaluate('(()=>{const s=document.querySelector("#yearSelect");s.value="2014";s.dispatchEvent(new Event("change"));s.value="2024";s.dispatchEvent(new Event("change"))})()');
  await ready();
  await poll(async () => failures.get('/data/years/2014.js') === 0);
  assert.ok(await evaluate('document.querySelector("#dataLoadStatus").hidden'));
  // Restored progress must survive the asynchronous initial request.
  await select('#yearSelect', '2013');
  await select('#textSelect', '2');
  await evaluate('document.querySelector("#reviewModeBtn").click()');
  await jump(5);
  const savedStep = await evaluate('window.StorageModule.loadProgress().stepIndex');
  await send('Page.reload', { ignoreCache: true });
  await poll(() => evaluate('document.querySelector("#yearSelect")?.value === "2013" && !!window.DataLoader?.peek(2013) && document.querySelector("#dataLoadStatus").hidden'));
  assert.equal(await evaluate('window.StorageModule.loadProgress().stepIndex'), savedStep);
  assert.equal(await evaluate('document.querySelector("#textSelect").value'), '2');
  assert.deepEqual(await evaluate('Object.keys(window.KAOYAN_PURE_DATA)'), ['2013']);
  assert.ok(!requests.includes('/data/all_data.js'));
  // Script-based year assets also preserve direct local-file use without fetch/CORS.
  await send('Page.navigate', { url: pathToFileURL(path.join(root, 'index.html')).href });
  await poll(() => evaluate('location.protocol === "file:" && document.querySelector("#yearSelect")?.value === "2010" && !!window.DataLoader?.peek(2010) && document.querySelector("#dataLoadStatus").hidden'));
  assert.deepEqual(await evaluate('Object.keys(window.KAOYAN_PURE_DATA)'), ['2010']);
  await select('#yearSelect', '2026');
  assert.ok(await evaluate('document.querySelector("#examPaper").textContent.length > 100'));

  // Seamless switching between Special Sections and Traditional Reading Comprehension
  await select('#textSelect', 'use_of_english');
  assert.ok(await evaluate('document.querySelector("#examPaper").textContent.includes("Section I")'));
  assert.equal(await evaluate('document.querySelector("#textSelect").value'), 'use_of_english');

  await select('#textSelect', 'part_b');
  assert.ok(await evaluate('document.querySelector("#examPaper").textContent.includes("Part B")'));
  assert.equal(await evaluate('document.querySelector("#textSelect").value'), 'part_b');

  await select('#textSelect', 'translation');
  assert.ok(await evaluate('document.querySelector("#examPaper").textContent.includes("Section III")'));
  assert.equal(await evaluate('document.querySelector("#textSelect").value'), 'translation');

  // Jump back to Reading Comprehension Text 1
  await select('#textSelect', '1');
  assert.ok(await evaluate('document.querySelector("#examPaper").textContent.includes("Text 1")'));
  assert.equal(await evaluate('document.querySelector("#textSelect").value'), '1');
  assert.ok(await evaluate('document.querySelector("#workspaceContent").children.length > 0'));

  // Jump to Text 3
  await select('#textSelect', '3');
  assert.ok(await evaluate('document.querySelector("#examPaper").textContent.includes("Text 3")'));
  assert.equal(await evaluate('document.querySelector("#textSelect").value'), '3');

  assert.deepEqual(errors, []);
  console.log('Lazy loading PASS: initial-year only, failure/retry, shared cache, stale responses, vocabulary context, restored progress, tablet layouts and local-file use.');
  console.log('Browser PASS: reading-only sections 1-5, source context, direct answers, static headings, full view, copying, filtering, downloaded notes, themes, mobile, practice and vocabulary.');
  console.log('Artifacts: ' + artifacts);
}
function send(method, params = {}) {
  return new Promise((resolve, reject) => { const next = ++id; pending.set(next, { resolve, reject }); socket.send(JSON.stringify({ id: next, method, params })); });
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
async function ready() { await poll(() => evaluate('document.querySelector("#dataLoadStatus")?.hidden && document.querySelector("#mainLayout").getAttribute("aria-busy")==="false"')); }
async function reveal(selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',behavior:'instant'})`);
  await evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
}
async function tap(selector) {
  await reveal(selector);
  const point = await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});const r=e.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;return {x,y,hit:e.contains(document.elementFromPoint(x,y))}})()`);
  assert.ok(point.hit, `Touch target obstructed: ${selector} ${JSON.stringify(point)}`);
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: point.x, y: point.y }] });
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await evaluate('new Promise(resolve=>requestAnimationFrame(resolve))');
}
async function select(selector, value) {
  await evaluate(`(()=>{const s=document.querySelector(${JSON.stringify(selector)});s.value=${JSON.stringify(value)};s.dispatchEvent(new Event('change',{bubbles:true}))})()`);
  if (selector === '#yearSelect' || selector === '#textSelect') await ready();
}
async function jump(section) { return evaluate(`(()=>{const s=document.querySelector('#jumpSelect');const o=Array.from(s.options).find(o=>o.textContent.startsWith('${section}.'));if(!o)throw Error('Missing section ${section}');s.value=o.value;s.dispatchEvent(new Event('change',{bubbles:true}))})()`); }
async function screenshot(name) {
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifacts, name), Buffer.from(data, 'base64'));
}
async function poll(fn) {
  for (let i = 0; i < 60; i++) { if (await fn()) return; await new Promise(r => setTimeout(r, 100)); }
  throw new Error('Browser state timeout');
}
run().catch(err => { console.error(err); process.exitCode = 1; }).finally(async () => {
  if (socket?.readyState === WebSocket.OPEN) { socket.close(); }
  if (chrome) chrome.kill();
  server.closeAllConnections();
  server.close();
});
