const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

test('All 34 小作文套写 HTML files exist (2010-2026 进阶版 & 速通版) with expected controls', () => {
  const tiers = ['进阶版', '速通版'];
  for (let year = 2010; year <= 2026; year++) {
    for (const tier of tiers) {
      const rel = path.join('小作文套写', `英二_2010-2026_小作文_${tier}`, `英二_${year}_小作文_${tier}.html`);
      const full = path.join(root, rel);
      assert.ok(fs.existsSync(full), `Missing HTML file: ${rel}`);
      const html = fs.readFileSync(full, 'utf8');
      assert.ok(html.includes('id="prev"'), `${rel} must contain #prev`);
      assert.ok(html.includes('id="next"'), `${rel} must contain #next`);
      assert.ok(html.includes('id="questionModal"'), `${rel} must contain #questionModal`);
    }
  }
});

test('app.js configures both writing_a (进阶版/速通版 only) and writing_b workspaces and exports loadCurrentText', () => {
  const appSrc = read('js/app.js');
  assert.ok(appSrc.includes('WRITING_WORKSPACES'), 'app.js must define WRITING_WORKSPACES');
  assert.ok(!appSrc.includes('答题卡模考'), 'Part A writing workspace must NOT include 答题卡模考');
  assert.ok(appSrc.includes("小作文套写/英二_2010-2026_小作文_${tierKey}/英二_${yNum}_小作文_${tierKey}.html"), 'app.js must resolve 小作文套写 HTML URLs');
  assert.ok(appSrc.includes("大作文套写/英二_${yNum}_${tierKey}.html"), 'app.js must keep 大作文套写 HTML URLs');
  assert.ok(appSrc.includes('window.loadCurrentText = loadCurrentText;'), 'app.js must export window.loadCurrentText');
  assert.ok(appSrc.includes('window.setupYearDropdown = setupYearDropdown;'), 'app.js must export window.setupYearDropdown');
  assert.ok(appSrc.includes("['translation', 'writing_a', 'writing_b'].includes(String(AppState.textId))"), 'app.js must hide practice/review mode buttons for translation, writing_a, and writing_b');
  assert.ok(appSrc.includes('syncPracticeReviewModeButtons();'), 'app.js must sync practice/review mode buttons');
});

test('WritingModule.loadSectionFromWriting jumps to Part A 小作文套写 in English 2', () => {
  const elements = new Map();
  function makeEl(id) {
    const el = {
      id,
      innerHTML: '',
      textContent: '',
      value: '',
      style: {},
      attributes: {},
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        toggle() {},
        contains(c) { return this._classes.has(c); }
      },
      setAttribute(k, v) { this.attributes[k] = String(v); },
      getAttribute(k) { return this.attributes[k]; },
      addEventListener() {},
      querySelectorAll() { return []; },
      querySelector() { return null; },
      dispatchEvent() {}
    };
    elements.set(id, el);
    return el;
  }

  let loadCalls = 0;
  let setupCalls = 0;
  const document = {
    getElementById(id) {
      if (!elements.has(id)) makeEl(id);
      return elements.get(id);
    },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    documentElement: { style: { setProperty() {} } },
    body: {
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        toggle() {},
        contains(c) { return this._classes.has(c); }
      }
    },
    createElement() { return makeEl('created_' + Math.random()); }
  };

  const context = vm.createContext({
    window: {},
    document,
    localStorage: {
      _data: {},
      getItem(k) { return Object.prototype.hasOwnProperty.call(this._data, k) ? this._data[k] : null; },
      setItem(k, v) { this._data[k] = String(v); },
      removeItem(k) { delete this._data[k]; }
    },
    console: { log() {}, warn() {}, error() {} },
    setTimeout: (fn) => setTimeout(fn, 0),
    clearTimeout: () => {},
    navigator: { clipboard: { writeText: () => Promise.resolve() } }
  });
  context.window.window = context.window;
  context.window.document = document;
  context.window.localStorage = context.localStorage;
  context.window.AppState = { mode: 'writing', examType: 'en1', year: 2020, textId: 1, savedStepIndex: 3 };
  context.window.loadCurrentText = () => { loadCalls++; };
  context.window.setupYearDropdown = () => { setupCalls++; };

  vm.runInContext(read('data/writing_prompts.js'), context);
  vm.runInContext(read('js/writing.js'), context);

  context.window.loadSectionFromWriting('writing_a', 2024);
  assert.strictEqual(context.window.AppState.examType, 'en2');
  assert.strictEqual(context.window.AppState.year, 2024);
  assert.strictEqual(context.window.AppState.textId, 'writing_a');
  assert.strictEqual(context.window.AppState.mode, 'practice');
  assert.strictEqual(setupCalls, 1);
  assert.strictEqual(loadCalls, 1);
});
