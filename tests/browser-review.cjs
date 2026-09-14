// Browser smoke test without third-party packages. Uses an isolated headless Chrome profile.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const chromePath = process.env.REVIEW_CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/chromium', '/usr/bin/google-chrome'
].find(p => fs.existsSync(p));
if (!chromePath) throw new Error('Set REVIEW_CHROME_PATH to a Chrome/Chromium executable.');
const artifacts = path.join(root, 'scratch', 'review-check');
fs.mkdirSync(artifacts, { recursive: true });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'english-review-'));
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.setHeader('Content-Type', ({ '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json' })[path.extname(file)] || 'application/octet-stream');
    res.end(data);
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
  await evaluate('document.querySelector("#reviewModeBtn").click()');
  await jump(1);
  assert.ok(await evaluate('!!document.querySelector(".vocab-matrix-wrap")'));
  await evaluate('document.querySelector(".vocab-mask-toggle").click(); document.querySelector("[data-view=table]").click()');
  assert.ok(await evaluate('document.querySelector(".vocab-matrix-wrap").classList.contains("mask-active")'));
  await evaluate('document.querySelector("[data-view=grid]").click()');
  await evaluate('document.querySelector("[data-review-note]").value="词义与搭配";document.querySelector("[data-review-note]").dispatchEvent(new Event("input",{bubbles:true}))');
  await jump(2);
  await evaluate('const n=document.querySelector("textarea");n.focus();n.value="My translation";n.dispatchEvent(new Event("input",{bubbles:true}))');
  const before = await evaluate('document.querySelector("#progressText").textContent');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: ' ', code: 'Space', text: ' ' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: ' ', code: 'Space' });
  assert.equal(await evaluate('document.querySelector("#progressText").textContent'), before);
  await jump(1);
  assert.equal(await evaluate('document.querySelector("[data-review-note]").value'), '词义与搭配');
  await jump(3);
  assert.ok(await evaluate('!document.querySelector("details").open'));
  await evaluate('document.querySelector("[data-review-choice][value=D]").click();document.querySelector("details summary").click()');
  assert.ok(await evaluate('document.querySelector("details").open'));
  await screenshot('desktop-question.png');
  await select('#yearSelect', '2026');
  await select('#textSelect', '4');
  await jump(3);
  assert.ok(await evaluate('document.querySelector("#workspaceContent").textContent.includes("第 36 题")'));
  await evaluate('document.querySelector("[data-review-choice][value=C]").click()');
  await jump(4);
  await evaluate('document.querySelector("[data-review-action=check-headings]").click()');
  assert.ok(await evaluate('document.querySelector("[data-heading-result]").textContent.includes("请先")'));
  await evaluate('const keys=["D","A","F","G","C"];document.querySelectorAll("[data-review-heading]").forEach((s,i)=>{s.value=keys[i];s.dispatchEvent(new Event("change",{bubbles:true}))});document.querySelector("[data-review-action=check-headings]").click()');
  assert.ok(await evaluate('document.querySelector("[data-heading-result]").textContent.includes("答对 5 / 5")'));
  await jump(5);
  await evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async text=>{window.__copied=text}}});document.querySelector("[data-review-action=copy]").click()');
  assert.ok(await evaluate('window.__copied.includes("far more than")'));
  await evaluate('const t=document.querySelector("[data-review-note]");t.value="Students can learn together.";t.dispatchEvent(new Event("input",{bubbles:true}));document.querySelector("[data-review-action=complete]").click()');
  assert.ok(await evaluate('document.querySelector("[data-review-status]").textContent.includes("待完成")'));
  await evaluate('document.querySelector("#toggleAllBtn").click()');
  assert.equal(await evaluate('Array.from(document.querySelectorAll("[data-review-note]")).find(el=>el.dataset.reviewNote==="w:0:draft").value'), 'Students can learn together.');
  await evaluate('document.querySelectorAll("[data-review-check]").forEach(c=>c.click());document.querySelector("[data-review-action=complete]").click()');
  assert.ok(await evaluate('document.querySelector("[data-review-status]").textContent.includes("五部分自检已完成")'));
  const downloadStart = Date.now();
  await evaluate('document.querySelector("#exportBtn").click();document.querySelector("#btnExpNotesMd").click();document.querySelector("#closeExportBtn").click()');
  const newDownload = () => fs.readdirSync(artifacts).find(f => f.endsWith('.md') && fs.statSync(path.join(artifacts, f)).mtimeMs >= downloadStart);
  await poll(async () => !!newDownload());
  const md = fs.readFileSync(path.join(artifacts, newDownload()), 'utf8');
  assert.ok(md.includes('Students can learn together.'));
  assert.doesNotMatch(md, /undefined/);
  await send('Page.reload');
  await poll(() => evaluate('document.querySelectorAll("[data-review-check]").length === 5'));
  assert.ok(await evaluate('Array.from(document.querySelectorAll("[data-review-check]")).every(c=>c.checked)'));
  await evaluate('document.querySelector("#toggleAllBtn").click()');
  await jump(5);
  for (const theme of ['dark', 'parchment', 'light']) {
    await select('#themeSelect', theme);
    assert.ok(await evaluate('!!document.querySelector(".review-writing-card")'));
  }
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate('document.querySelector("#tabRightBtn").click();window.scrollTo(0,0)');
  await screenshot('mobile-writing.png');
  const bounds = await evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth})');
  assert.ok(bounds.scroll <= bounds.width + 2, `Mobile overflow ${JSON.stringify(bounds)}`);
  await select('#yearSelect', '2010');
  await select('#textSelect', '1');
  await jump(1);
  assert.equal(await evaluate('document.querySelector("[data-review-note]").value'), '词义与搭配');
  await evaluate('document.querySelector("#practiceModeBtn").click();document.querySelector("#submodeMockBtn").click()');
  assert.equal(await evaluate('document.querySelectorAll(".mock-q-card").length'), 5);
  await evaluate('document.querySelector("#vocabModeBtn").click()');
  assert.ok(await evaluate('document.querySelector("#vocabSection").textContent.length > 100'));
  assert.deepEqual(errors, []);
  console.log('Browser PASS: recall, notes, keyboard, all-view, reload, per-text isolation, answers, headings, clipboard, Markdown download, completion, themes, mobile, mock, vocabulary.');
  console.log(`Screenshots and downloaded notes: ${artifacts}`);
}
function send(method, params = {}) {
  return new Promise((resolve, reject) => { const next = ++id; pending.set(next, { resolve, reject }); socket.send(JSON.stringify({ id: next, method, params })); });
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
async function select(selector, value) { return evaluate(`(()=>{const s=document.querySelector(${JSON.stringify(selector)});s.value=${JSON.stringify(value)};s.dispatchEvent(new Event('change',{bubbles:true}))})()`); }
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
