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

  // 2. Select Question 1 with correct answer ('A') and Question 2 with wrong answer ('A')
  // For 2012, Q1 verified answer is 'A' (served), Q2 answer is 'B' (common)
  context.localStorage.setItem('kaoyan_cloze_2012', JSON.stringify({ 1: 'A', 2: 'A' }));
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

test('Cloze and Part B bilingual Chinese translation toggle and data coverage (2010-2026)', () => {
  const { context, document } = setupDOM();

  for (let yr = 2010; yr <= 2026; yr++) {
    const data = JSON.parse(read(`data/${yr}.json`));

    // Verify Use of English translation coverage
    const uoe = data.use_of_english;
    assert.ok(uoe, `Missing use_of_english for ${yr}`);
    assert.ok(uoe.paragraphs.length > 0, `No paragraphs in cloze for ${yr}`);
    uoe.paragraphs.forEach((p, idx) => {
      assert.ok(p.translation && p.translation.length > 5, `Missing paragraph ${idx} translation in cloze ${yr}`);
    });
    assert.equal(uoe.questions.length, 20, `Expected 20 questions in cloze ${yr}`);
    uoe.questions.forEach((q) => {
      assert.ok(q.options_cn, `Missing options_cn for question ${q.qid} in cloze ${yr}`);
      assert.ok(q.options_cn.A && q.options_cn.B && q.options_cn.C && q.options_cn.D, `Incomplete options_cn for Q${q.qid} in ${yr}`);
    });

    // Verify Part B translation coverage
    const pb = data.part_b;
    assert.ok(pb, `Missing part_b for ${yr}`);
    assert.ok(pb.paragraphs.length > 0, `No paragraphs in part_b for ${yr}`);
    pb.paragraphs.forEach((p, idx) => {
      assert.ok(p.translation && p.translation.length > 5, `Missing paragraph ${idx} translation in part_b ${yr}`);
    });
    assert.equal(pb.items.length, 5, `Expected 5 items in part_b ${yr}`);
    pb.items.forEach((it) => {
      assert.ok(it.title_cn && it.title_cn.length > 0, `Missing title_cn for item ${it.qid} in ${yr}`);
    });
    assert.ok(pb.options_cn, `Missing options_cn in part_b ${yr}`);
  }

  // Test interactive rendering & toggle in Cloze
  const data2015 = JSON.parse(read('data/2015.json'));

  // 1. By default (showTrans = false), no cloze-para-trans
  context.localStorage.setItem('kaoyan_cloze_show_trans', 'false');
  context.window.ClozeRenderer.render(data2015.use_of_english, 2015, 'practice');
  let paperHtml = document.getElementById('examPaper').innerHTML;
  let wsHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(!paperHtml.includes('cloze-para-trans'), 'cloze-para-trans should not be visible when showTrans is false');
  assert.ok(paperHtml.includes('id="btnToggleClozeTrans"'), 'btnToggleClozeTrans button must exist in toolbar');

  // 2. Set showTrans = true, verify cloze-para-trans and option translations
  context.window.ClozeRenderer.setShowTrans(true);
  context.window.ClozeRenderer.render(data2015.use_of_english, 2015, 'practice');
  paperHtml = document.getElementById('examPaper').innerHTML;
  wsHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(paperHtml.includes('cloze-para-trans'), 'cloze-para-trans must be rendered when showTrans is true');
  assert.ok(paperHtml.includes('cloze-trans-badge'), 'cloze-trans-badge must be rendered');
  assert.ok(wsHtml.includes('cloze-opt-cn'), 'cloze-opt-cn should be rendered for options');

  // Test interactive rendering & toggle in Part B
  // 1. When showTrans is false, no partb-para-trans
  context.window.MatchingRenderer.setShowTrans(false);
  context.window.MatchingRenderer.render(data2015.part_b, 2015, 'practice');
  paperHtml = document.getElementById('examPaper').innerHTML;
  wsHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(!paperHtml.includes('partb-para-trans'), 'partb-para-trans should not be visible when showTrans is false');
  assert.ok(paperHtml.includes('id="btnTogglePartBTrans"'), 'btnTogglePartBTrans button must exist in toolbar');

  // 2. When showTrans is true, verify partb-para-trans, matching-item-cn, matching-opt-cn
  context.window.MatchingRenderer.setShowTrans(true);
  context.window.MatchingRenderer.render(data2015.part_b, 2015, 'practice');
  paperHtml = document.getElementById('examPaper').innerHTML;
  wsHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(paperHtml.includes('partb-para-trans'), 'partb-para-trans must be rendered when showTrans is true');
  assert.ok(paperHtml.includes('partb-trans-badge'), 'partb-trans-badge must be rendered');
  assert.ok(wsHtml.includes('matching-item-cn'), 'matching-item-cn must be rendered');
  assert.ok(wsHtml.includes('matching-opt-cn'), 'matching-opt-cn must be rendered');
});

test('Part B items for all 17 years (2010-2026) have authentic question titles and full interactive elements', () => {
  const { context, document } = setupDOM();

  for (let yr = 2010; yr <= 2026; yr++) {
    const data = JSON.parse(read(`data/${yr}.json`));
    const pb = data.part_b;
    assert.ok(pb, `Year ${yr} must have part_b`);
    assert.equal(pb.items.length, 5, `Year ${yr} must have 5 items (41-45)`);

    pb.items.forEach(it => {
      assert.ok(it.title && it.title.length > 3, `Year ${yr} item ${it.qid} must have non-empty title`);
      assert.ok(!it.title.includes('【第 41 题】 (选择对应小标题)'), `Year ${yr} item ${it.qid} must not have placeholder title`);
      assert.ok(it.title_cn && it.title_cn.length > 2, `Year ${yr} item ${it.qid} must have non-empty title_cn`);
    });

    // Render in practice mode
    context.window.MatchingRenderer.render(pb, yr, 'practice');
    const paperHtml = document.getElementById('examPaper').innerHTML;
    const wsHtml = document.getElementById('workspaceContent').innerHTML;

    if (pb.subtype === 'heading_matching') {
      // Must contain interactive heading slots
      assert.ok(paperHtml.includes('partb-heading-slot'), `Year ${yr} heading matching must have partb-heading-slot`);
    } else {
      // Multiple matching / true false must contain questions panel with authentic items
      assert.ok(paperHtml.includes('partb-questions-panel'), `Year ${yr} must have partb-questions-panel`);
      assert.ok(paperHtml.includes('partb-exam-item-row'), `Year ${yr} must have partb-exam-item-row`);
    }

    // Verify workspace displays authentic item titles
    pb.items.forEach(it => {
      assert.ok(wsHtml.includes(it.title.substring(0, 15)), `Workspace must render item title for ${yr} ${it.qid}`);
    });
  }
});



