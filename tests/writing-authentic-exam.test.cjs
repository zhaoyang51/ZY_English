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
      value: '',
      style: {},
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        toggle(c, v) { if (v !== undefined) { if (v) this._classes.add(c); else this._classes.delete(c); } else { if (this._classes.has(c)) this._classes.delete(c); else this._classes.add(c); } },
        contains(c) { return this._classes.has(c); }
      },
      attributes: {},
      setAttribute(k, v) { this.attributes[k] = String(v); },
      getAttribute(k) { return this.attributes[k]; },
      removeAttribute(k) { delete this.attributes[k]; },
      addEventListener() {},
      querySelectorAll() { return []; },
      querySelector() { return null; },
      scrollIntoView() {},
      getBoundingClientRect() { return { left: 0, bottom: 0, top: 0, right: 0 }; },
      dispatchEvent() {}
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
    console: { log() {}, warn() {}, error() {} },
    setTimeout: (fn) => setTimeout(fn, 0),
    clearTimeout: () => {},
    navigator: { clipboard: { writeText: () => Promise.resolve() } }
  });
  context.window.window = context.window;
  context.window.document = document;
  context.window.localStorage = context.localStorage;

  vm.runInContext(read('data/writing_prompts.js'), context);
  vm.runInContext(read('js/render_cloze.js'), context);
  vm.runInContext(read('js/render_matching.js'), context);
  vm.runInContext(read('js/render_translation.js'), context);
  vm.runInContext(read('js/render_writing.js'), context);

  return { context, document, elements };
}

test('Writing Prompts Dataset: Covers 17 years (2010-2026) for E1 Part A, E2 Part A, and E2 Part B', () => {
  const { context } = setupDOM();
  const prompts = context.window.WRITING_PROMPTS;
  assert.ok(prompts, 'WRITING_PROMPTS must exist on window');

  const e2a = prompts.e2_part_a;
  const e2b = prompts.e2_part_b;
  const e1a = prompts.e1_part_a;

  assert.strictEqual(Object.keys(e2a).length, 17, 'Must have 17 years of English 2 Part A');
  assert.strictEqual(Object.keys(e2b).length, 17, 'Must have 17 years of English 2 Part B');
  assert.strictEqual(Object.keys(e1a).length, 17, 'Must have 17 years of English 1 Part A');

  for (let yr = 2010; yr <= 2026; yr++) {
    // English 2 Part A
    assert.ok(e2a[yr], `Year ${yr} E2 Part A must exist`);
    assert.ok(e2a[yr].directionsEn && e2a[yr].directionsEn.includes('Directions'), `Year ${yr} E2 Part A must have Directions`);
    assert.ok(e2a[yr].title, `Year ${yr} E2 Part A must have title`);
    assert.strictEqual(e2a[yr].qid, 47);
    assert.strictEqual(e2a[yr].points, 10);

    // English 2 Part B
    assert.ok(e2b[yr], `Year ${yr} E2 Part B must exist`);
    assert.ok(e2b[yr].directionsEn && e2b[yr].directionsEn.includes('Directions'), `Year ${yr} E2 Part B must have Directions`);
    assert.ok(e2b[yr].chartImage && e2b[yr].chartImage.includes(`chart_${yr}.jpg`), `Year ${yr} E2 Part B must link to chart image`);
    assert.strictEqual(e2b[yr].qid, 48);
    assert.strictEqual(e2b[yr].points, 15);

    // English 1 Part A
    assert.ok(e1a[yr], `Year ${yr} E1 Part A must exist`);
    assert.ok(e1a[yr].directionsEn && e1a[yr].directionsEn.includes('Directions'), `Year ${yr} E1 Part A must have Directions`);
    assert.ok(e1a[yr].form, `Year ${yr} E1 Part A must have form`);
  }
});

test('Authentic Exam Paper Simulation Layout across all 4 sections (新题型、英译汉、小作文、大作文)', () => {
  const { context, document } = setupDOM();

  for (let yr = 2010; yr <= 2026; yr++) {
    const data = JSON.parse(read(`data/${yr}.json`));

    // 1. 新题型 (Part B)
    context.window.MatchingRenderer.render(data.part_b, yr, 'practice');
    const partBLeft = document.getElementById('examPaper').innerHTML;
    assert.ok(partBLeft.includes('authentic-exam-sheet'), `Year ${yr} Part B must have authentic-exam-sheet`);
    assert.ok(partBLeft.includes('authentic-exam-header'), `Year ${yr} Part B must have authentic-exam-header`);
    assert.ok(partBLeft.includes('Section II  Reading Comprehension'), `Year ${yr} Part B must display Section II`);
    assert.ok(partBLeft.includes('Part B'), `Year ${yr} Part B must display Part B`);
    assert.ok(partBLeft.includes('Directions:'), `Year ${yr} Part B must display Directions:`);

    // 2. 英译汉 (Translation)
    context.window.TranslationRenderer.render(data.translation, yr, 'practice');
    const transLeft = document.getElementById('examPaper').innerHTML;
    assert.ok(transLeft.includes('authentic-exam-sheet'), `Year ${yr} Translation must have authentic-exam-sheet`);
    assert.ok(transLeft.includes('authentic-exam-header'), `Year ${yr} Translation must have authentic-exam-header`);
    assert.ok(transLeft.includes('Section III  Translation'), `Year ${yr} Translation must display Section III`);
    assert.ok(transLeft.includes('46.'), `Year ${yr} Translation must display 46.`);
    assert.ok(transLeft.includes('Directions:'), `Year ${yr} Translation must display Directions:`);
    // Ensure no [Para X] debug badges
    assert.ok(!transLeft.includes('para-badge'), `Year ${yr} Translation must NOT render [Para X] badges`);

    // 3. 小作文 (Writing Part A)
    context.window.WritingRenderer.render(yr, 'writing_a', 'practice');
    const writeALeft = document.getElementById('examPaper').innerHTML;
    const writeARight = document.getElementById('workspaceContent').innerHTML;
    assert.ok(writeALeft.includes('authentic-exam-sheet'), `Year ${yr} Writing A must have authentic-exam-sheet`);
    assert.ok(writeALeft.includes('authentic-exam-header'), `Year ${yr} Writing A must have authentic-exam-header`);
    assert.ok(writeALeft.includes('Section IV  Writing'), `Year ${yr} Writing A must display Section IV`);
    assert.ok(writeALeft.includes('Part A'), `Year ${yr} Writing A must display Part A`);
    assert.ok(writeALeft.includes('47.'), `Year ${yr} Writing A must display 47.`);
    assert.ok(writeARight.includes('authentic-answer-sheet-container'), `Year ${yr} Writing A right panel must be ANSWER SHEET`);
    assert.ok(writeARight.includes('writingAnswerSheetTextarea'), `Year ${yr} Writing A must have writing textarea`);

    // 4. 大作文 (Writing Part B)
    context.window.WritingRenderer.render(yr, 'writing_b', 'practice');
    const writeBLeft = document.getElementById('examPaper').innerHTML;
    const writeBRight = document.getElementById('workspaceContent').innerHTML;
    assert.ok(writeBLeft.includes('authentic-exam-sheet'), `Year ${yr} Writing B must have authentic-exam-sheet`);
    assert.ok(writeBLeft.includes('authentic-exam-header'), `Year ${yr} Writing B must have authentic-exam-header`);
    assert.ok(writeBLeft.includes('Section IV  Writing'), `Year ${yr} Writing B must display Section IV`);
    assert.ok(writeBLeft.includes('Part B'), `Year ${yr} Writing B must display Part B`);
    assert.ok(writeBLeft.includes('48.'), `Year ${yr} Writing B must display 48.`);
    assert.ok(writeBLeft.includes(`images/charts/chart_${yr}.jpg`), `Year ${yr} Writing B must display authentic chart image`);
    assert.ok(writeBRight.includes('authentic-answer-sheet-container'), `Year ${yr} Writing B right panel must be ANSWER SHEET`);
    assert.ok(writeBRight.includes('writingAnswerSheetTextarea'), `Year ${yr} Writing B must have writing textarea`);
  }
});

test('WritingRenderer word counting and draft persistence', () => {
  const { context, document } = setupDOM();
  assert.ok(context.window.WritingRenderer);

  // Test word count helper
  assert.strictEqual(context.window.WritingRenderer.countWords(''), 0);
  assert.strictEqual(context.window.WritingRenderer.countWords('Hello world'), 2);
  assert.strictEqual(context.window.WritingRenderer.countWords("It's a high-quality state-of-the-art exam paper."), 6);

  // Test persistence
  context.localStorage.setItem('kaoyan_writing_writing_a_2025', 'Dear John,\nI am writing to invite you to take part in our play.');
  context.window.WritingRenderer.render(2025, 'writing_a', 'practice');

  const textarea = document.getElementById('writingAnswerSheetTextarea');
  assert.ok(textarea.textContent.includes('Dear John'), 'Saved draft must be restored into textarea');

  const countBadge = document.getElementById('writingLiveCountBadge');
  assert.ok(countBadge.innerHTML.includes('14'), 'Must display live word count for restored draft');
});

test('App.js integration: Section IV Writing dropdown options and year retention', () => {
  const appCode = read('js/app.js');

  // Verify dropdown includes writing options
  assert.ok(appCode.includes("optWritingA.value = 'writing_a';"), 'Must have writing_a option in text dropdown');
  assert.ok(appCode.includes("optWritingB.value = 'writing_b';"), 'Must have writing_b option in text dropdown');
  assert.ok(appCode.includes('Section IV 写作'), 'Must label Section IV Writing group');

  // Verify special section year change retention
  assert.ok(appCode.includes("const writingSections = ['writing_a', 'writing_b'];"), 'Must define writingSections for retention');
});

test('Writing Module: Small Essay Tab supports English 1 & English 2 switchable prompts', () => {
  const writingCode = read('js/writing.js');

  assert.ok(writingCode.includes('btnSmallSubE2'), 'Must have button for English 2 small essay prompts');
  assert.ok(writingCode.includes('btnSmallSubE1'), 'Must have button for English 1 small essay prompts');
  assert.ok(writingCode.includes('e2_part_a'), 'Must query e2_part_a from prompts dataset');
  assert.ok(writingCode.includes('e1_part_a'), 'Must query e1_part_a from prompts dataset');
  assert.ok(writingCode.includes('practice-jump-btn'), 'Must have direct practice jump button');
});

test('Writing Module: Past Exams Tab displays authentic Directions and chart image', () => {
  const writingCode = read('js/writing.js');

  assert.ok(writingCode.includes('Section IV  Writing · Part B'), 'Must render Section IV Part B header in past exams');
  assert.ok(writingCode.includes('authentic-chart-wrapper'), 'Must render authentic-chart-wrapper in past exams');
  assert.ok(writingCode.includes('images/charts/chart_'), 'Must reference chart image in past exams');
});
