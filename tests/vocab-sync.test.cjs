const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

function setupSyncTestEnv() {
  const storageMap = new Map();
  const localStorageMock = {
    getItem: k => (storageMap.has(k) ? storageMap.get(k) : null),
    setItem: (k, v) => storageMap.set(k, String(v)),
    removeItem: k => storageMap.delete(k),
    clear: () => storageMap.clear()
  };

  const elements = new Map();
  const createEl = (id, tag = 'div') => {
    const el = {
      id,
      tagName: tag.toUpperCase(),
      style: {},
      options: [],
      children: [],
      _html: '',
      value: '',
      hidden: false,
      checked: true,
      textContent: '',
      classList: {
        _set: new Set(),
        add(c) { this._set.add(c); },
        remove(c) { this._set.delete(c); },
        contains(c) { return this._set.has(c); },
        toggle(c, f) {
          if (f === undefined) {
            if (this._set.has(c)) this._set.delete(c);
            else this._set.add(c);
          } else if (f) {
            this._set.add(c);
          } else {
            this._set.delete(c);
          }
        }
      },
      appendChild(c) { this.children.push(c); return c; },
      removeChild(c) { return c; },
      addEventListener() {},
      removeEventListener() {},
      setAttribute() {},
      getAttribute() { return ''; },
      querySelector(sel) {
        if (sel.startsWith('#')) {
          return elements.get(sel.slice(1)) || createEl(sel.slice(1));
        }
        return null;
      },
      querySelectorAll() { return []; },
      select() {}
    };
    if (id) elements.set(id, el);
    return el;
  };

  const documentMock = {
    body: createEl('body'),
    getElementById: id => elements.get(id) || null,
    createElement: tag => createEl('', tag),
    querySelectorAll: () => [],
    addEventListener: () => {}
  };

  global.CustomEvent = class CustomEvent { constructor(type, detail) { this.type = type; this.detail = detail; } };
  global.localStorage = localStorageMock;
  global.document = documentMock;
  global.window = {
    localStorage: localStorageMock,
    document: documentMock,
    dispatchEvent: () => {},
    addEventListener: () => {},
    speechSynthesis: { cancel: () => {}, speak: () => {} },
    NANXIAO_SUSHUA_VOCAB: [
      {
        word: 'resilient',
        meaning: 'adj. 有弹性的；能迅速恢复的',
        sentence: 'Young people are remarkably resilient.',
        sentenceZh: '年轻人具有非凡的恢复力。',
        provenance: '2020年阅读Text2',
        freq: 8
      },
      {
        word: 'substantial',
        meaning: 'adj. 大量的；实质性的',
        sentence: 'We made substantial progress.',
        sentenceZh: '我们取得了实质性进展。',
        provenance: '2018年阅读Text1',
        freq: 14
      }
    ],
    KAOYAN_VOCAB_DICT: {
      abandon: 'v. 放弃；遗弃'
    },
    KAOYAN_VOCAB_BANK: [],
    KAOYAN_VOCAB_RELATIONS: {}
  };

  const storageJs = fs.readFileSync(path.join(__dirname, '../js/storage.js'), 'utf8');
  const vocabJs = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');
  const exporterJs = fs.readFileSync(path.join(__dirname, '../js/exporter.js'), 'utf8');

  eval(storageJs);
  eval(vocabJs);
  eval(exporterJs);

  return { localStorageMock, storageMap, elements };
}

test('Vocab Book Export & Import: JSON round-trip, TXT/Anki parsing, dictionary enrichment, merge & replace', () => {
  setupSyncTestEnv();

  // 1. Add words and export JSON + TXT
  window.StorageModule.addWordToBook('resilient', 'adj. 有弹性的', 'Test sentence 1.', '2020', '2', 1, 1);
  window.StorageModule.addWordToBook('abandon', '', '', '', '', '', '');

  const jsonExport = window.StorageModule.exportVocabBookData({ format: 'json' });
  assert.strictEqual(jsonExport.type, 'kaoyan_vocab_book');
  assert.strictEqual(jsonExport.count, 2);
  assert.strictEqual(jsonExport.words.length, 2);

  const txtExport = window.StorageModule.exportVocabBookData({ format: 'txt' });
  assert.strictEqual(txtExport.format, 'txt');
  assert.ok(txtExport.content.includes('resilient\tadj. 有弹性的\tTest sentence 1.'));

  // 2. Clear and restore via JSON import (with replace)
  window.StorageModule.clearVocabBook();
  assert.strictEqual(window.StorageModule.getVocabBook().length, 0);

  const restoreRes = window.StorageModule.importVocabBookData(JSON.stringify(jsonExport), { mode: 'replace' });
  assert.strictEqual(restoreRes.ok, true);
  assert.strictEqual(restoreRes.added, 2);
  assert.strictEqual(restoreRes.total, 2);

  // 3. Merge plain word list + Anki HTML TSV and verify dictionary auto-enrichment
  const mixedImport = [
    '#separator:tab',
    '<b>substantial</b>\t\t\t2018年',
    'resilient\t\t', // duplicate, should not wipe existing definition
    'ephemeral - adj. 短暂的'
  ].join('\n');

  const mergeRes = window.StorageModule.importVocabBookData(mixedImport, { mode: 'merge' });
  assert.strictEqual(mergeRes.ok, true);
  assert.strictEqual(mergeRes.added, 2, 'Should add substantial and ephemeral');
  assert.strictEqual(mergeRes.total, 4);

  const book = window.StorageModule.getVocabBook();
  const sub = book.find(w => w.word === 'substantial');
  assert.ok(sub, 'substantial must exist');
  assert.strictEqual(sub.def, 'adj. 大量的；实质性的', 'Missing def should be enriched from NANXIAO_SUSHUA_VOCAB');
  assert.strictEqual(sub.sentence, 'Young people are remarkably resilient.' === sub.sentence ? '' : 'We made substantial progress.');

  const resEntry = book.find(w => w.word === 'resilient');
  assert.strictEqual(resEntry.def, 'adj. 有弹性的', 'Existing definition must be preserved on merge');

  const ephEntry = book.find(w => w.word === 'ephemeral');
  assert.strictEqual(ephEntry.def, 'adj. 短暂的');

  // 4. Empty/invalid input returns error cleanly
  const badRes = window.StorageModule.importVocabBookData('   \n# only comments');
  assert.strictEqual(badRes.ok, false);
});

test('Study Progress Export & Import: Smart cross-device merge and exact replace', () => {
  const { storageMap } = setupSyncTestEnv();
  const now = Date.now();
  const today = window.VocabModule.getTodayKey();

  // Seed device A state
  storageMap.set('KAOYAN_VOCAB_PROGRESS_V2', JSON.stringify({
    resilient: { status: 'learning', level: 2, lastReviewTime: now - 5000, nextReviewTime: now + 3600000, reviewCount: 2 },
    abandon: { status: 'mastered', level: 11, lastReviewTime: now - 1000, nextReviewTime: now + 864000000, reviewCount: 5 }
  }));
  storageMap.set('KAOYAN_VOCAB_DAILY_LOG_V1', JSON.stringify({
    date: today,
    newLearned: ['resilient'],
    reviewed: ['abandon'],
    history: { '2026-11-19': { newCount: 10, reviewCount: 5 } }
  }));
  storageMap.set('KAOYAN_VOCAB_LAST_POSITION_V2', JSON.stringify({
    source: 'nanxiao_sushua',
    lastWord: 'resilient',
    lastIndex: 4,
    sourcePositions: { nanxiao_sushua: { word: 'resilient', index: 4 } }
  }));
  window.VocabModule.saveUserNotes({ resilient: 'Device A note' });
  window.StorageModule.addWordToBook('resilient', 'adj. 有弹性的', 'Young people are remarkably resilient.');

  // Export backup from Device A
  const exported = window.VocabModule.exportStudyProgress({ includeVocabBook: true });
  assert.strictEqual(exported.type, 'kaoyan_vocab_progress');
  assert.strictEqual(exported.summary.totalTrackedWords, 2);
  assert.strictEqual(exported.summary.masteredCount, 1);
  assert.strictEqual(exported.summary.vocabBookCount, 1);

  // Switch to Device B local state (older resilient, plus new word substantial)
  storageMap.clear();
  storageMap.set('KAOYAN_VOCAB_PROGRESS_V2', JSON.stringify({
    resilient: { status: 'learning', level: 1, lastReviewTime: now - 90000, nextReviewTime: now + 60000, reviewCount: 1 },
    substantial: { status: 'learning', level: 3, lastReviewTime: now - 100, nextReviewTime: now + 7200000, reviewCount: 3 }
  }));
  storageMap.set('KAOYAN_VOCAB_DAILY_LOG_V1', JSON.stringify({
    date: today,
    newLearned: ['substantial'],
    reviewed: [],
    history: { '2026-11-19': { newCount: 4, reviewCount: 8 } }
  }));

  // Import Device A backup into Device B using smart merge
  const mergeRes = window.VocabModule.importStudyProgress(JSON.stringify(exported), { mode: 'merge', includeVocabBook: true });
  assert.strictEqual(mergeRes.ok, true);
  assert.strictEqual(mergeRes.totalTracked, 3, 'Merged progress must contain resilient, abandon, substantial');
  assert.strictEqual(mergeRes.masteredCount, 1);
  assert.strictEqual(mergeRes.addedWords, 1, 'abandon added');
  assert.strictEqual(mergeRes.updatedWords, 1, 'newer resilient overwrites older resilient');

  const mergedProg = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(mergedProg.resilient.level, 2, 'Newer resilient progress wins');
  assert.strictEqual(mergedProg.substantial.level, 3, 'Local substantial progress preserved');
  assert.strictEqual(mergedProg.abandon.status, 'mastered');

  const mergedLog = JSON.parse(storageMap.get('KAOYAN_VOCAB_DAILY_LOG_V1'));
  assert.ok(mergedLog.newLearned.includes('resilient') && mergedLog.newLearned.includes('substantial'));
  assert.strictEqual(mergedLog.history['2026-11-19'].newCount, 10);
  assert.strictEqual(mergedLog.history['2026-11-19'].reviewCount, 8);

  const notes = window.VocabModule.loadUserNotes();
  assert.strictEqual(notes.resilient, 'Device A note');
  assert.strictEqual(window.StorageModule.getVocabBook().length, 1);

  // Replace mode restores exact Device A snapshot (drops substantial)
  const replaceRes = window.VocabModule.importStudyProgress(exported, { mode: 'replace', includeVocabBook: true });
  assert.strictEqual(replaceRes.ok, true);
  assert.strictEqual(replaceRes.totalTracked, 2);
  const replacedProg = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(replacedProg.substantial, undefined);

  // Guard: pasting vocabBook JSON into study progress import returns clear error
  const wrongTypeRes = window.VocabModule.importStudyProgress(JSON.stringify({ type: 'kaoyan_vocab_book', words: [] }));
  assert.strictEqual(wrongTypeRes.ok, false);
  assert.ok(wrongTypeRes.message.includes('生词本'));
});

test('UI Integration: Sync buttons exist in index.html and js/vocab.js', () => {
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const vocabJs = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');

  assert.ok(indexHtml.includes('id="btnExportVocabBook"'));
  assert.ok(indexHtml.includes('id="btnImportVocabBook"'));
  assert.ok(indexHtml.includes('id="btnSyncOpenProgress"'));
  assert.ok(indexHtml.includes('id="btnSyncOpenBook"'));

  assert.ok(vocabJs.includes('id="vocabBtnExportProgress"'));
  assert.ok(vocabJs.includes('id="vocabBtnImportProgress"'));
  assert.ok(vocabJs.includes('id="vocabBtnExportBook"'));
  assert.ok(vocabJs.includes('id="vocabBtnImportBook"'));
});
