const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

test('2010 and 2011 have complete Section I, Part B, and Translation structures', () => {
  for (const yr of [2010, 2011]) {
    const d = JSON.parse(fs.readFileSync(path.join(root, `data/${yr}.json`), 'utf8'));
    
    // 1. Section I Use of English
    assert.ok(d.use_of_english, `Year ${yr} missing use_of_english`);
    assert.equal(d.use_of_english.questions.length, 20, `Year ${yr} Use of English should have 20 questions`);
    for (const q of d.use_of_english.questions) {
      assert.ok(q.qid >= 1 && q.qid <= 20);
      assert.ok(['A', 'B', 'C', 'D'].includes(q.answer));
      assert.equal(Object.keys(q.options).length, 4);
    }
    
    // 2. Section II Part B
    assert.ok(d.part_b, `Year ${yr} missing part_b`);
    assert.equal(d.part_b.items.length, 5, `Year ${yr} Part B should have 5 items`);
    assert.ok(Object.keys(d.part_b.options).length >= 2, `Year ${yr} Part B should have options`);
    assert.equal(Object.keys(d.part_b.answers).length, 5, `Year ${yr} Part B should have 5 answers`);
    
    // 3. Section III Translation
    assert.ok(d.translation, `Year ${yr} missing translation`);
    assert.equal(d.translation.qid, 46);
    assert.equal(d.translation.points, 15);
    assert.ok(d.translation.reference_translation.length > 50);
    assert.ok(d.translation.sentences.length >= 3);
  }
});
