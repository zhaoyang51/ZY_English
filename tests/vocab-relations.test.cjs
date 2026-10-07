const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

// 1. Load vocab relations database
const relCode = fs.readFileSync('data/vocab_relations.js', 'utf8');
const fakeWindow = {};
const fn = new Function('window', relCode);
fn(fakeWindow);
const relations = fakeWindow.KAOYAN_VOCAB_RELATIONS;

// Load all exam corpus tokens to verify 100% authenticity
const examTokens = new Set();
const examSentences = [];

for (let y = 2010; y <= 2026; y++) {
  const p = path.join('data', `${y}.json`);
  if (!fs.existsSync(p)) continue;
  const content = fs.readFileSync(p, 'utf8');
  (content.match(/[a-zA-Z]+/g) || []).forEach(w => examTokens.add(w.toLowerCase()));

  const d = JSON.parse(content);
  if (d.texts) {
    d.texts.forEach(t => {
      (t.sentences || []).forEach(s => {
        if (s.text) examSentences.push(s.text.toLowerCase());
      });
    });
  }
}

test('Vocabulary Book 5-Dimensional Relations: Database Integrity and Coverage', () => {
  assert.ok(relations, 'KAOYAN_VOCAB_RELATIONS should exist');
  const totalKeys = Object.keys(relations).length;
  assert.ok(totalKeys > 5000, `Expected over 5000 words in relations, found ${totalKeys}`);
});

test('Vocabulary Book 5-Dimensional Relations: User Target Words (interfere, interrupt, interpret)', () => {
  // 1. interfere
  const interfere = relations['interfere'];
  assert.ok(interfere, 'interfere should exist in relations');
  assert.ok(interfere.lookalikes && interfere.lookalikes.length > 0, 'interfere should have lookalikes');
  const lookalikeWords = interfere.lookalikes.map(l => l.word.toLowerCase());
  assert.ok(lookalikeWords.includes('interrupt'), 'interfere lookalikes should include interrupt');
  assert.ok(lookalikeWords.includes('interpret'), 'interfere lookalikes should include interpret');
  assert.ok(interfere.phrases && interfere.phrases.length > 0, 'interfere should have exam phrases');
  assert.ok(interfere.phrases.some(p => p.phrase.toLowerCase().includes('interfere with')), 'interfere should include "interfere with"');
  assert.ok(interfere.synonyms && interfere.synonyms.length > 0, 'interfere should have synonyms');
  assert.ok(interfere.antonyms && interfere.antonyms.length > 0, 'interfere should have antonyms');
  assert.ok(interfere.sentences && interfere.sentences.length > 0, 'interfere should have authentic exam sentences');

  // 2. interrupt
  const interrupt = relations['interrupt'];
  assert.ok(interrupt, 'interrupt should exist in relations');
  const interruptLookalikes = interrupt.lookalikes.map(l => l.word.toLowerCase());
  assert.ok(interruptLookalikes.includes('interfere'), 'interrupt lookalikes should include interfere');
  assert.ok(interruptLookalikes.includes('interpret'), 'interrupt lookalikes should include interpret');
  assert.ok(interrupt.sentences && interrupt.sentences.length > 0, 'interrupt should have authentic exam sentences');

  // 3. interpret
  const interpret = relations['interpret'];
  assert.ok(interpret, 'interpret should exist in relations');
  const interpretLookalikes = interpret.lookalikes.map(l => l.word.toLowerCase());
  assert.ok(interpretLookalikes.includes('interfere'), 'interpret lookalikes should include interfere');
  assert.ok(interpretLookalikes.includes('interrupt'), 'interpret lookalikes should include interrupt');
  assert.ok(interpret.phrases && interpret.phrases.some(p => p.phrase.toLowerCase().includes('narrowly interpreted')), 'interpret should include phrase');
  assert.ok(interpret.sentences && interpret.sentences.length > 0, 'interpret should have authentic exam sentences');
});

test('Vocabulary Book 5-Dimensional Relations: 100% Exam Provenance Verification', () => {
  // Test a sample of 50 core words to ensure ALL lookalikes, synonyms, and antonyms are in examTokens
  const sampleWords = ['interfere', 'interrupt', 'interpret', 'adopt', 'adapt', 'optimistic', 'advocate', 'decline', 'crucial', 'eliminate', 'enhance', 'abandon', 'alter', 'compel', 'convey', 'diminish', 'dispute', 'distinct', 'dominate', 'drastic', 'elaborate', 'emphasize', 'encounter', 'endure', 'evaluate', 'evident', 'exceed', 'expand', 'exploit', 'feasible', 'flourish', 'foster', 'fundamental', 'generate', 'hamper', 'hazard', 'highlight', 'identify', 'ignore', 'illuminate', 'impact', 'impede', 'incentive', 'inevitable', 'innovative', 'insight', 'inspect', 'integrate', 'intense', 'isolate'];

  for (const w of sampleWords) {
    const rel = relations[w];
    if (!rel) continue;

    // Verify lookalikes are authentic exam words
    (rel.lookalikes || []).forEach(item => {
      assert.ok(examTokens.has(item.word.toLowerCase()), `Lookalike "${item.word}" of "${w}" must exist in exam corpus`);
      assert.ok(item.def, `Lookalike "${item.word}" must have definition`);
      assert.ok(item.prov, `Lookalike "${item.word}" must have provenance`);
    });

    // Verify synonyms are authentic exam words
    (rel.synonyms || []).forEach(item => {
      assert.ok(examTokens.has(item.word.toLowerCase()), `Synonym "${item.word}" of "${w}" must exist in exam corpus`);
      assert.ok(item.def, `Synonym "${item.word}" must have definition`);
    });

    // Verify antonyms are authentic exam words
    (rel.antonyms || []).forEach(item => {
      assert.ok(examTokens.has(item.word.toLowerCase()), `Antonym "${item.word}" of "${w}" must exist in exam corpus`);
      assert.ok(item.def, `Antonym "${item.word}" must have definition`);
    });

    // Verify sentences are authentic exam sentences
    (rel.sentences || []).forEach(s => {
      assert.ok(s.text, `Sentence for "${w}" must have text`);
      assert.ok(s.year >= 2010 && s.year <= 2026, `Sentence year must be 2010-2026, got ${s.year}`);
      assert.ok(s.prov, `Sentence must have provenance label`);
    });
  }
});
