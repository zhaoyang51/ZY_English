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
    const el = {
      id,
      innerHTML: '',
      textContent: '',
      style: {},
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        toggle(c, v) { if (v) this._classes.add(c); else this._classes.delete(c); },
        contains(c) { return this._classes.has(c); }
      },
      attributes: {},
      setAttribute(k, v) { this.attributes[k] = String(v); },
      getAttribute(k) { return this.attributes[k]; },
      removeAttribute(k) { delete this.attributes[k]; },
      addEventListener() {},
      querySelectorAll() { return []; },
      querySelector() { return null; },
      scrollIntoView() {}
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
    documentElement: { style: { setProperty() {} } },
    body: { classList: { toggle() {}, add() {}, remove() {} } }
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
    console: { log() {}, warn() {}, error() {} }
  });

  vm.runInContext(read('js/render_cloze.js'), context);
  vm.runInContext(read('js/render_matching.js'), context);
  vm.runInContext(read('js/render_translation.js'), context);

  return { context, document, elements };
}

test('Renderer modules can render all years 2010 to 2026 without errors', () => {
  const { context, document } = setupDOM();
  assert.ok(context.window.ClozeRenderer);
  assert.ok(context.window.MatchingRenderer);
  assert.ok(context.window.TranslationRenderer);

  for (let yr = 2010; yr <= 2026; yr++) {
    const data = JSON.parse(read(`data/${yr}.json`));
    
    // 1. Cloze
    context.window.ClozeRenderer.render(data.use_of_english, yr, 'practice');
    assert.ok(document.getElementById('examPaper').innerHTML.includes('Section I'));
    assert.ok(document.getElementById('workspaceContent').innerHTML.includes('cloze-card'));

    // 2. Matching
    context.window.MatchingRenderer.render(data.part_b, yr, 'practice');
    assert.ok(document.getElementById('examPaper').innerHTML.includes('Part B'));
    assert.ok(document.getElementById('workspaceContent').innerHTML.includes('matching-item-card'));

    // 3. Translation
    context.window.TranslationRenderer.render(data.translation, yr, 'practice');
    assert.ok(document.getElementById('examPaper').innerHTML.includes('Section III'));
    assert.ok(document.getElementById('workspaceContent').innerHTML.includes('trans-textarea'));
  }
});

test('ClozeRenderer immediately grades upon option selection (both correct and wrong)', () => {
  const { context, document } = setupDOM();
  const data = JSON.parse(read('data/2012.json'));
  
  // 1. Initial render without answers: all unpicked
  context.window.ClozeRenderer.render(data.use_of_english, 2012, 'practice');
  const initialHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(initialHtml.includes('未作答'));
  assert.ok(initialHtml.includes('cloze-dashboard'));

  // 2. Select Question 1 with correct answer ('B') and Question 2 with wrong answer ('A')
  // For 2012, Q1 answer is 'B', Q2 answer is 'B'
  context.localStorage.setItem('kaoyan_cloze_2012', JSON.stringify({ 1: 'B', 2: 'A' }));
  context.window.ClozeRenderer.render(data.use_of_english, 2012, 'practice');

  const gradedHtml = document.getElementById('workspaceContent').innerHTML;
  const leftHtml = document.getElementById('examPaper').innerHTML;

  // Question 1: correct
  assert.ok(gradedHtml.includes('回答正确 (+0.5分)'));
  assert.ok(leftHtml.includes('cloze-blank filled correct'));

  // Question 2: wrong (with gentle soft styling and clear distinction)
  assert.ok(gradedHtml.includes('错选 [A] · 正解: [B]'));
  assert.ok(gradedHtml.includes('cloze-opt-flag wrong'));
  assert.ok(leftHtml.includes('cloze-blank filled wrong'));

  // Analysis shown directly for graded questions
  assert.ok(gradedHtml.includes('cloze-analysis-box'));

  // Dashboard stats
  assert.ok(gradedHtml.includes('答对</span>\n              <span class="cloze-stat-val">1 题'));
  assert.ok(gradedHtml.includes('答错</span>\n              <span class="cloze-stat-val">1 题'));
  assert.ok(gradedHtml.includes('0.5 <small'));

  // 3. In Review Mode (mode === 'review'), verify clean review badge without '错误'
  context.window.ClozeRenderer.render(data.use_of_english, 2012, 'review');
  const reviewHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(reviewHtml.includes('review-key'));
  assert.ok(reviewHtml.includes('正解: [B]'));
  assert.ok(!reviewHtml.includes('✖ 错误 正解'));
});

