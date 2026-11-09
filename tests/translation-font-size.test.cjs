const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

function setupDOM() {
  const elements = new Map();
  function makeEl(id) {
    const listeners = new Map();
    const el = {
      id,
      innerHTML: '',
      textContent: '',
      value: '',
      style: {},
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        toggle(c, v) {
          if (v !== undefined) {
            if (v) this._classes.add(c);
            else this._classes.delete(c);
          } else {
            if (this._classes.has(c)) this._classes.delete(c);
            else this._classes.add(c);
          }
        },
        contains(c) { return this._classes.has(c); }
      },
      attributes: {},
      setAttribute(k, v) { this.attributes[k] = String(v); },
      getAttribute(k) { return this.attributes[k]; },
      removeAttribute(k) { delete this.attributes[k]; },
      addEventListener(evt, handler) {
        if (!listeners.has(evt)) listeners.set(evt, []);
        listeners.get(evt).push(handler);
      },
      trigger(evt, eventObj = {}) {
        const fns = listeners.get(evt) || [];
        fns.forEach(fn => fn({
          preventDefault() {},
          stopPropagation() {},
          target: el,
          ...eventObj
        }));
      },
      querySelectorAll() { return []; },
      querySelector(sel) {
        if (sel === '#btnFontDec') return elements.get('btnFontDec') || makeEl('btnFontDec');
        if (sel === '#btnFontInc') return elements.get('btnFontInc') || makeEl('btnFontInc');
        if (sel === '#readerFontBadge') return elements.get('readerFontBadge') || makeEl('readerFontBadge');
        if (sel === '.authentic-exam-sheet') return elements.get('sheet') || makeEl('sheet');
        return null;
      },
      scrollIntoView() {},
      getBoundingClientRect() { return { left: 0, bottom: 0, top: 0, right: 0 }; }
    };
    elements.set(id, el);
    return el;
  }

  const document = {
    getElementById(id) {
      if (!elements.has(id)) makeEl(id);
      return elements.get(id);
    },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    documentElement: {
      style: {
        _props: {},
        setProperty(k, v) { this._props[k] = v; },
        getPropertyValue(k) { return this._props[k] || ''; }
      }
    },
    body: {
      classList: {
        _classes: new Set(),
        toggle(c, v) { if (v !== undefined) { if (v) this._classes.add(c); else this._classes.delete(c); } else { if (this._classes.has(c)) this._classes.delete(c); else this._classes.add(c); } },
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        contains(c) { return this._classes.has(c); }
      },
      className: '',
      appendChild() {},
      removeChild() {}
    },
    createElement(tag) {
      return makeEl('created_' + Math.random());
    }
  };

  const context = vm.createContext({
    window: {},
    document,
    localStorage: {
      _data: {},
      getItem(k) { return this._data[k] || null; },
      setItem(k, v) { this._data[k] = String(v); },
      removeItem(k) { delete this._data[k]; }
    },
    setTimeout(fn) { fn(); return 0; },
    clearTimeout() {}
  });
  context.window = context;

  // Run translation renderer
  const transCode = read('js/render_translation.js');
  vm.runInContext(transCode, context);

  return { context, document, elements };
}

test('TranslationRenderer left panel includes font size and line height controls in toolbar', () => {
  const { context, document } = setupDOM();
  const data2015 = JSON.parse(read('data/2015.json'));

  context.window.TranslationRenderer.render(data2015.translation, 2015, 'practice');
  const paperHtml = document.getElementById('examPaper').innerHTML;

  assert.ok(paperHtml.includes('id="btnFontDec"'), 'Must have btnFontDec button');
  assert.ok(paperHtml.includes('id="btnFontInc"'), 'Must have btnFontInc button');
  assert.ok(paperHtml.includes('id="readerFontBadge"'), 'Must have readerFontBadge element');
  assert.ok(paperHtml.includes('data-lh="1.6"'), 'Must have data-lh=1.6 button');
  assert.ok(paperHtml.includes('data-lh="1.85"'), 'Must have data-lh=1.85 button');
  assert.ok(paperHtml.includes('data-lh="2.2"'), 'Must have data-lh=2.2 button');
});

test('TranslationRenderer font size adjustment interacts with ReaderModule settings and updates DOM styles', () => {
  const { context, document, elements } = setupDOM();

  // Setup ReaderModule mock
  context.window.ReaderModule = {
    settings: {
      fontSize: 17.5,
      lineHeight: 1.85
    },
    applySettings() {
      const fs = this.settings.fontSize;
      const lh = this.settings.lineHeight;
      document.documentElement.style.setProperty('--reader-font-size', `${fs}px`);
      document.documentElement.style.setProperty('--reader-line-height', `${lh}`);
      const examEl = document.getElementById('examPaper');
      if (examEl) {
        examEl.style.fontSize = `${fs}px`;
        examEl.style.lineHeight = `${lh}`;
      }
    },
    updateToolbarActiveStates() {}
  };

  const data2015 = JSON.parse(read('data/2015.json'));
  context.window.TranslationRenderer.render(data2015.translation, 2015, 'practice');

  const btnInc = elements.get('btnFontInc');
  const btnDec = elements.get('btnFontDec');
  const badge = elements.get('readerFontBadge');
  const sheet = elements.get('sheet');

  assert.ok(btnInc, 'btnFontInc must exist');
  assert.ok(btnDec, 'btnFontDec must exist');

  // Trigger Font Increase
  btnInc.trigger('click');
  assert.ok(context.window.ReaderModule.settings.fontSize > 17.5, 'Font size must increase');
  assert.ok(document.documentElement.style.getPropertyValue('--reader-font-size').includes('px'), '--reader-font-size must update');
  assert.strictEqual(sheet.style.fontSize, `${context.window.ReaderModule.settings.fontSize}px`, 'sheet fontSize must match new setting');
  assert.strictEqual(badge.textContent, `${context.window.ReaderModule.settings.fontSize}px`, 'badge text must match new setting');

  // Trigger Font Decrease
  const currentFs = context.window.ReaderModule.settings.fontSize;
  btnDec.trigger('click');
  assert.ok(context.window.ReaderModule.settings.fontSize < currentFs, 'Font size must decrease after A-');
});

test('TranslationRenderer article paragraph text inherits font size without hardcoded overrides', () => {
  const transCode = read('js/render_translation.js');
  // Ensure the inline span doesn't hardcode fixed font-size
  assert.ok(!transCode.includes('<span class="para-text" style="font-size:'), 'para-text should inherit authentic-exam-sheet font size');

  const cssCode = read('css/sections.css');
  assert.ok(cssCode.includes('.authentic-trans-article .para-text'), 'CSS must define .authentic-trans-article .para-text');
  assert.ok(cssCode.includes('font-size: inherit;'), 'para-text must have font-size: inherit');
});
