const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
function setup() {
  const scripts = [], timers = new Map();
  let id = 0;
  const context = vm.createContext({ window: {}, URL,
    setTimeout: callback => { timers.set(++id, callback); return id; },
    clearTimeout: key => timers.delete(key),
    document: {
      currentScript: { src: 'https://example.test/ZY_English/js/data_loader.js?v=1' },
      createElement: () => ({ remove() { this.removed = true; } }),
      head: { appendChild: s => scripts.push(s) }
    }
  });
  vm.runInContext(read('data/manifest.js'), context);
  vm.runInContext(read('js/data_loader.js'), context);
  return { context, loader: context.window.DataLoader, scripts, timers,
    complete(year, index = scripts.length - 1) {
      vm.runInContext(read(`data/years/${year}.js`), context);
      scripts[index].onload();
    }
  };
}
test('startup is metadata-only; all generated year files match canonical JSON and content versions', () => {
  const s = setup();
  assert.equal(s.scripts.length, 0);
  assert.equal(Object.keys(s.context.window.KAOYAN_PURE_DATA).length, 0);
  assert.doesNotMatch(read('index.html'), /src="data\/all_data\.js/);
  for (const item of s.context.window.KAOYAN_MANIFEST) {
    const data = JSON.parse(read(`data/${item.year}.json`));
    const payload = JSON.stringify(data);
    assert.equal(item.version, createHash('sha256').update(payload).digest('hex').slice(0, 12));
    vm.runInContext(read(`data/years/${item.year}.js`), s.context);
    assert.equal(JSON.stringify(s.loader.peek(item.year)), payload);
  }
});
test('same-year concurrent loads share one request; success is cached without further requests', async () => {
  const s = setup();
  const first = s.loader.loadYear(2024);
  assert.equal(first, s.loader.loadYear('2024'));
  assert.equal(s.scripts.length, 1);
  assert.match(s.scripts[0].src, /^https:\/\/example.test\/ZY_English\/data\/years\/2024\.js\?v=[a-f0-9]{12}$/);
  s.complete(2024);
  const data = await first;
  assert.equal(await s.loader.loadYear(2024), data);
  assert.equal(s.scripts.length, 1);
  assert.equal(s.timers.size, 0);
  assert.ok(s.scripts[0].removed);
});
test('failed and timed-out requests can retry; empty and wrong-year payloads are rejected', async () => {
  const s = setup();
  let task = s.loader.loadYear(2025);
  s.scripts[0].onerror();
  await assert.rejects(task, /加载失败/);
  task = s.loader.loadYear(2025);
  assert.equal(s.scripts.length, 2);
  [...s.timers.values()][0]();
  await assert.rejects(task, /超时/);
  task = s.loader.loadYear(2025);
  s.scripts[2].onload();
  await assert.rejects(task, /未正确加载/);
  assert.throws(() => s.loader.registerYear(2025, { year: 2024, texts: [] }), /格式/);
  assert.equal(s.loader.peek(2025), null);
  task = s.loader.loadYear(2025);
  s.complete(2025);
  assert.equal((await task).year, 2025);
  assert.equal(s.timers.size, 0);
});
test('unknown or non-numeric years never issue requests', async () => {
  const s = setup();
  await assert.rejects(s.loader.loadYear('../secret'), /未收录/);
  await assert.rejects(s.loader.loadYear(2099), /未收录/);
  assert.equal(s.scripts.length, 0);
});
