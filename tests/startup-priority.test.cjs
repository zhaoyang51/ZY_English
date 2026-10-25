const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

function createEnvironment(initialState = {}) {
  const storageMap = new Map();
  const localStorageMock = {
    getItem: k => storageMap.get(k) || null,
    setItem: (k, v) => storageMap.set(k, String(v)),
    removeItem: k => storageMap.delete(k),
    clear: () => storageMap.clear()
  };

  const elements = new Map();
  const createMockElement = (id, tag = 'div') => {
    const el = {
      id,
      tagName: tag.toUpperCase(),
      style: {},
      options: [],
      classList: {
        classes: new Set(),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        contains(c) { return this.classes.has(c); },
        toggle(c, force) {
          if (force === undefined) {
            if (this.classes.has(c)) this.classes.delete(c);
            else this.classes.add(c);
          } else if (force) {
            this.classes.add(c);
          } else {
            this.classes.delete(c);
          }
          return this.classes.has(c);
        }
      },
      children: [],
      appendChild(child) {
        this.children.push(child);
        if (child.tagName === 'OPTION') this.options.push(child);
        return child;
      },
      removeChild(child) {
        const idx = this.children.indexOf(child);
        if (idx !== -1) this.children.splice(idx, 1);
        return child;
      },
      listeners: {},
      addEventListener(ev, fn) {
        this.listeners[ev] = this.listeners[ev] || [];
        this.listeners[ev].push(fn);
      },
      trigger(ev, eventObj = {}) {
        (this.listeners[ev] || []).forEach(fn => fn(eventObj));
      },
      setAttribute(k, v) { this[k] = v; },
      getAttribute(k) { return this[k] || null; },
      value: '',
      hidden: false
    };
    elements.set(id, el);
    return el;
  };

  const documentMock = {
    body: createMockElement('body'),
    getElementById: id => elements.get(id) || createMockElement(id),
    createElement: tag => createMockElement(`elem_${Math.random()}`, tag),
    addEventListener: () => {},
    querySelectorAll: () => []
  };

  let yearLoadCalls = [];
  let vocabInitCalled = false;
  let domContentLoadedHandler = null;

  global.CustomEvent = class CustomEvent { constructor(type, detail) { this.type = type; this.detail = detail; } };
  global.localStorage = localStorageMock;
  global.document = documentMock;
  global.window = {
    localStorage: localStorageMock,
    document: documentMock,
    dispatchEvent: () => {},
    addEventListener: (ev, fn) => {
      if (ev === 'DOMContentLoaded') domContentLoadedHandler = fn;
    },
    DataLoader: {
      peek: () => null,
      loadYear: (yr) => {
        yearLoadCalls.push(yr);
        return Promise.resolve({ texts: [{ text_id: 1, title: 'Text 1' }] });
      }
    },
    VocabModule: {
      init: (id) => {
        vocabInitCalled = true;
      }
    },
    ReaderModule: {
      init: () => {}
    },
    KAOYAN_MANIFEST: [{ year: 2024, texts: [{ id: 1, q_range: '21-25' }] }]
  };

  // 1. Load storage.js
  const storageJs = fs.readFileSync(path.join(__dirname, '../js/storage.js'), 'utf8');
  eval(storageJs);

  if (initialState) {
    global.window.StorageModule.saveProgress(initialState);
  }

  // 2. Load app.js
  const appJs = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
  eval(appJs);

  return {
    elements,
    startApp: () => {
      if (domContentLoadedHandler) domContentLoadedHandler();
    },
    getYearLoadCalls: () => yearLoadCalls,
    isVocabInitCalled: () => vocabInitCalled,
    getStorageModule: () => global.window.StorageModule
  };
}

test('Startup Priority: Exiting from Vocab mode boots into Vocab instantly without loading exam year data', () => {
  const env = createEnvironment({
    year: 2024,
    textId: 1,
    mode: 'vocab',
    lastReadingMode: 'practice'
  });

  env.startApp();

  assert.strictEqual(env.isVocabInitCalled(), true, 'VocabModule.init must be called immediately');
  assert.strictEqual(env.getYearLoadCalls().length, 0, 'DataLoader.loadYear must NOT be called synchronously in vocab mode');
  assert.strictEqual(env.elements.get('dataLoadStatus').hidden, true, 'dataLoadStatus must be hidden');
  assert.strictEqual(env.elements.get('mainLayout').style.display, 'none', 'mainLayout must be hidden');
  assert.strictEqual(env.elements.get('vocabSection').style.visibility, '', 'vocabSection must be visible');
  assert.strictEqual(env.elements.get('vocabModeBtn').classList.contains('active'), true, 'vocabModeBtn must be active');
});

test('Startup Priority: Exiting from Practice mode loads paper directly and saves mode changes', () => {
  const env = createEnvironment({
    year: 2024,
    textId: 1,
    mode: 'practice',
    lastReadingMode: 'practice'
  });

  env.startApp();

  assert.strictEqual(env.getYearLoadCalls().includes(2024), true, 'DataLoader.loadYear must be called for practice');
  assert.strictEqual(env.elements.get('practiceModeBtn').classList.contains('active'), true, 'practiceModeBtn must be active');

  // Switch to Vocab mode via button click
  env.elements.get('vocabModeBtn').trigger('click');
  const updatedProgress = env.getStorageModule().loadProgress();
  assert.strictEqual(updatedProgress.mode, 'vocab', 'Switching to vocab must automatically persist mode: "vocab" to localStorage');
});
