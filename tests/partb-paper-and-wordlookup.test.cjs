const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

function setupEnv() {
  const elements = new Map();
  function makeEl(id) {
    const el = {
      id,
      innerHTML: '',
      textContent: '',
      style: {},
      classList: {
        _set: new Set(),
        add(c) { this._set.add(c); },
        remove(c) { this._set.delete(c); },
        toggle(c, v) { if (v !== undefined) { if (v) this._set.add(c); else this._set.delete(c); } else { if (this._set.has(c)) this._set.delete(c); else this._set.add(c); } },
        contains(c) { return this._set.has(c); }
      },
      attributes: {},
      setAttribute(k, v) { this.attributes[k] = String(v); },
      getAttribute(k) { return this.attributes[k]; },
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
  context.window = context;

  vm.runInContext(read('data/vocab_dict.js'), context);
  vm.runInContext(read('js/render_matching.js'), context);

  const appCode = read('js/app.js');
  const fnStart = appCode.indexOf('function getWordInfo(word');
  const fnEnd = appCode.indexOf('function showVocabPopup(');
  vm.runInContext(appCode.slice(fnStart, fnEnd), context);

  return { context, document };
}

test('Part B renders authentic split exam paper layout across all years (2010-2026)', () => {
  const { context, document } = setupEnv();

  for (let yr = 2010; yr <= 2026; yr++) {
    const data = JSON.parse(read(`data/${yr}.json`));
    const pb = data.part_b;

    context.window.MatchingRenderer.render(pb, yr, 'practice');
    const paperHtml = document.getElementById('examPaper').innerHTML;
    const wsHtml = document.getElementById('workspaceContent').innerHTML;

    assert.ok(wsHtml.includes('partb-right-sheet'), `Year ${yr} right panel must use .partb-right-sheet`);
    assert.ok(wsHtml.includes('partb-quick-strip'), `Year ${yr} right panel must include quick answer strip`);
    assert.ok(wsHtml.includes('partb-paper-opt'), `Year ${yr} right panel must style options as .partb-paper-opt`);

    if (pb.subtype === 'heading_matching') {
      assert.ok(paperHtml.includes('41. <span class="partb-blank-underline"'), `Year ${yr} heading matching must show authentic "41. _____" blank line`);
      const optIdx = wsHtml.indexOf('partb-paper-options-list');
      const itemsIdx = wsHtml.indexOf('partb-paper-items-list');
      assert.ok(optIdx !== -1 && itemsIdx !== -1 && optIdx < itemsIdx, `Year ${yr} heading matching must render Options A-G above items card strip on right paper`);
    } else {
      const optIdx = wsHtml.indexOf('partb-paper-options-list');
      const itemsIdx = wsHtml.indexOf('partb-paper-items-list');
      assert.ok(optIdx !== -1 && itemsIdx !== -1 && itemsIdx < optIdx, `Year ${yr} non-heading matching must render Questions 41-45 before Options`);
    }
  }
});

test('Part B options and items tokenize EVERY English word (including short/common words) and resolve translations in vocab_dict', () => {
  const { context, document } = setupEnv();

  const missingDefs = [];
  for (let yr = 2010; yr <= 2026; yr++) {
    const data = JSON.parse(read(`data/${yr}.json`));
    const pb = data.part_b;

    context.window.MatchingRenderer.render(pb, yr, 'practice');
    const wsHtml = document.getElementById('workspaceContent').innerHTML;

    // Every word in every option must appear as an exam-word-token in the right sheet
    Object.values(pb.options || {}).forEach(optText => {
      const words = optText.match(/\b([a-zA-Z]+(?:['’][a-zA-Z]+)?)\b/g) || [];
      words.forEach(w => {
        assert.ok(
          wsHtml.includes(`data-word="${w}"`),
          `Year ${yr} option word "${w}" must be clickable (.exam-word-token) in right panel`
        );
        const info = context.getWordInfo(w, optText);
        if (!info || !info.def) {
          missingDefs.push(`${yr}:${w}`);
        }
      });
    });

    // Every word in every question item must also resolve cleanly
    (pb.items || []).forEach(it => {
      const txt = it.title || it.stem || '';
      const words = txt.match(/\b([a-zA-Z]+(?:['’][a-zA-Z]+)?)\b/g) || [];
      words.forEach(w => {
        assert.ok(
          wsHtml.includes(`data-word="${w}"`),
          `Year ${yr} Q${it.qid} word "${w}" must be clickable (.exam-word-token) in right panel`
        );
        const info = context.getWordInfo(w, txt);
        if (!info || !info.def) {
          missingDefs.push(`${yr}:${w}`);
        }
      });
    });
  }

  assert.deepEqual(missingDefs, [], 'All Part B option & item words must have Chinese translations in vocab_dict');
});
