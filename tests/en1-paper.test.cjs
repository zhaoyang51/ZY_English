const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

function setupLoader() {
  const scripts = [];
  const context = vm.createContext({
    window: {},
    URL,
    setTimeout,
    clearTimeout,
    document: {
      currentScript: { src: 'https://example.test/ZY_English/js/data_loader.js?v=1' },
      createElement: () => ({ remove() { this.removed = true; } }),
      head: { appendChild: s => scripts.push(s) }
    }
  });
  context.window = context;
  vm.runInContext(read('data/manifest.js'), context);
  vm.runInContext(read('data/en1_manifest.js'), context);
  vm.runInContext(read('js/data_loader.js'), context);
  return {
    context,
    scripts,
    loadAllEn1() {
      const manifest = context.window.KAOYAN_EN1_MANIFEST;
      manifest.forEach(item => {
        vm.runInContext(read(`data/en1/${item.year}.js`), context);
      });
    }
  };
}

test('English I manifest includes required Part B (2007, 2016, 2020) and Reading (2011, 2012, 2014, 2016-2020, 2022) years', () => {
  const { context, loadAllEn1 } = setupLoader();
  const manifest = context.window.KAOYAN_EN1_MANIFEST;
  const years = Array.from(manifest.map(m => m.year));
  assert.deepEqual(years, [2007, 2011, 2012, 2014, 2016, 2017, 2018, 2019, 2020, 2022]);

  const partBYears = Array.from(manifest.filter(m => m.hasPartB).map(m => m.year));
  assert.deepEqual(partBYears, [2007, 2016, 2020]);

  const readingYears = Array.from(manifest.filter(m => m.texts && m.texts.length === 4).map(m => m.year));
  assert.deepEqual(readingYears, [2011, 2012, 2014, 2016, 2017, 2018, 2019, 2020, 2022]);

  loadAllEn1();
  for (const item of manifest) {
    const data = context.window.DataLoader.peekEn1(item.year);
    assert.ok(data, `Missing en1 data for ${item.year}`);
    assert.equal(data.year, item.year);
    if (item.hasPartB) {
      assert.ok(data.part_b, `Missing part_b for ${item.year}`);
      assert.equal(Object.keys(data.part_b.options).length, 7);
      assert.equal(data.part_b.items.length, 5);
      for (let q = 41; q <= 45; q++) {
        assert.ok(['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(data.part_b.answers[q]), `${item.year} Q${q} invalid answer`);
      }
    }
    if (item.texts.length > 0) {
      assert.equal(data.texts.length, 4);
      data.texts.forEach((t, idx) => {
        assert.equal(t.text_id, idx + 1);
        assert.ok(t.paragraphs.length >= 4, `${item.year} Text ${idx + 1} paragraphs`);
        assert.equal(t.questions.length, 5);
        t.questions.forEach(q => {
          assert.equal(q.options.length, 4);
          assert.deepEqual(Array.from(q.options.map(o => o.key)), ['A', 'B', 'C', 'D']);
          const correctOpts = q.options.filter(o => o.is_correct);
          assert.equal(correctOpts.length, 1);
          assert.equal(correctOpts[0].key, q.answer);
        });
      });
    }
  }

  // Verify 2017 Text 4 underlined sentence preserved
  const y2017 = context.window.DataLoader.peekEn1(2017);
  assert.ok(y2017.texts[3].paragraphs[0].text.includes('<u>'), '2017 Text 4 Para 1 must preserve underlined clause');
});

test('DataLoader.loadEn1Year loads lazily and deduplicates concurrent requests', async () => {
  const { context, scripts } = setupLoader();
  const p1 = context.window.DataLoader.loadEn1Year(2020);
  const p2 = context.window.DataLoader.loadEn1Year('2020');
  assert.equal(p1, p2);
  assert.equal(scripts.length, 1);
  assert.match(scripts[0].src, /data\/en1\/2020\.js\?v=[a-f0-9]{12}$/);
  vm.runInContext(read('data/en1/2020.js'), context);
  scripts[0].onload();
  const res = await p1;
  assert.equal(res.year, 2020);
  assert.equal(await context.window.DataLoader.loadEn1Year(2020), res);
  assert.equal(scripts.length, 1);
});

test('En1PaperRenderer renders authentic split paper UI for Reading and Part B', () => {
  const { context, loadAllEn1 } = setupLoader();
  loadAllEn1();

  const elements = new Map();
  function makeEl(id) {
    const el = {
      id,
      innerHTML: '',
      textContent: '',
      style: {},
      scrollTop: 0,
      classList: {
        _set: new Set(),
        add(c) { this._set.add(c); },
        remove(c) { this._set.delete(c); },
        toggle(c, v) { if (v !== undefined) { if (v) this._set.add(c); else this._set.delete(c); } else { if (this._set.has(c)) this._set.delete(c); else this._set.add(c); } },
        contains(c) { return this._set.has(c); }
      },
      addEventListener() {},
      querySelectorAll() { return []; },
      querySelector() { return null; },
      normalize() {},
      scrollIntoView() {}
    };
    elements.set(id, el);
    return el;
  }

  const domCtx = vm.createContext({
    window: {},
    document: {
      getElementById(id) {
        if (!elements.has(id)) makeEl(id);
        return elements.get(id);
      },
      querySelectorAll() { return []; },
      querySelector() { return null; },
      createElement() { return makeEl('dyn'); },
      createTreeWalker() { return { nextNode() { return null; } }; },
      addEventListener() {},
      body: { appendChild() {}, classList: { toggle() {}, add() {}, remove() {} } }
    },
    NodeFilter: { SHOW_TEXT: 4, FILTER_REJECT: 2, FILTER_ACCEPT: 1 },
    Node: { TEXT_NODE: 3 },
    localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = String(v); }, removeItem(k) { delete this._d[k]; } },
    sessionStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = String(v); }, removeItem(k) { delete this._d[k]; } },
    ReaderModule: { settings: { fontSize: 17.5, lineHeight: 1.85 }, applySettings() {} },
    AppState: { examType: 'en1' },
    setTimeout,
    clearTimeout
  });
  domCtx.window = domCtx;
  vm.runInContext(read('js/render_en1_paper.js'), domCtx);

  // Render 2020 Text 1
  const y2020 = context.window.DataLoader.peekEn1(2020);
  domCtx.window.En1PaperRenderer.render(y2020.texts[0], 2020, 1, 'practice');
  const leftReading = elements.get('examPaper').innerHTML;
  const rightReading = elements.get('workspaceContent').innerHTML;
  assert.ok(leftReading.includes('id="en1AnnotatorToolbar"'));
  assert.ok(leftReading.includes('id="en1ClearMarksBtn"'));
  assert.ok(leftReading.includes('class="en1-para"'));
  assert.ok(rightReading.includes('class="en1-q-badge en1-no-mark">21</span>'));
  assert.ok(rightReading.includes('class="en1-opt-row '));

  // Render 2007 Part B
  const y2007 = context.window.DataLoader.peekEn1(2007);
  domCtx.window.En1PaperRenderer.render(y2007.part_b, 2007, 'part_b', 'practice');
  const leftPB = elements.get('examPaper').innerHTML;
  const rightPB = elements.get('workspaceContent').innerHTML;
  assert.ok(leftPB.includes('How Can a Parent Help?'));
  assert.ok(leftPB.includes('data-partb-slot="41"'));
  assert.ok(rightPB.includes('data-pb-pick-qid="41"'));
  assert.ok(rightPB.includes('data-pb-opt="F"'));
});
