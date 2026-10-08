const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

// Read reader.js in a sandbox
const readerCode = fs.readFileSync('js/reader.js', 'utf8');
const fakeWindow = { StorageModule: { loadSettings: () => ({}) } };
const fakeDoc = {
  documentElement: { style: { setProperty: () => {} } },
  getElementById: () => null
};

// Execute reader.js
const fn = new Function('window', 'document', readerCode);
fn(fakeWindow, fakeDoc);

const Reader = fakeWindow.ReaderModule;

test('Logic Connectors Highlight: 2016 Text 3 "in so far as" highlights as complete phrase, not isolated "so"', () => {
  Reader.settings.highlightLogic = true;
  const sentence1 = 'Thinking of time as a resource to be maximised means you approach it instrumentally, judging any given moment as well spent only in so far as it advances progress toward some goal.';
  const html = Reader.formatSentenceText(sentence1, []);
  
  // 1. Must contain complete phrase "in so far as"
  assert.ok(html.includes('data-connector="in so far as"'), 'Should highlight "in so far as" as a full phrase');
  assert.ok(html.includes('>in so far as</span>'), 'Text inside span must be "in so far as"');
  
  // 2. Must NOT contain isolated "so" connector
  assert.ok(!html.includes('data-connector="so"'), 'Must NOT highlight isolated "so" inside "in so far as"');
  assert.ok(!html.includes('>so</span> far as'), 'Must NOT split "so" from "far as"');
});

test('Logic Connectors Highlight: 2016 Text 3 "providing" and "so that" highlighted accurately', () => {
  Reader.settings.highlightLogic = true;
  const sentence2 = '“Carry a book with you at all times” can actually work, too—providing you dip in often enough, so that reading becomes the default state from which you temporarily surface to take care of business, before dropping back down.';
  const html = Reader.formatSentenceText(sentence2, []);

  // 1. Must contain "providing" as condition connector
  assert.ok(html.includes('data-connector="providing"'), 'Should highlight "providing" as condition connector');
  assert.ok(html.includes('transition-condition'), 'Should have transition-condition class for providing');

  // 2. Must contain full "so that" as purpose connector
  assert.ok(html.includes('data-connector="so that"'), 'Should highlight "so that" as full phrase');
  assert.ok(html.includes('transition-purpose'), 'Should have transition-purpose class for so that');

  // 3. Must NOT contain isolated "so" connector
  assert.ok(!html.includes('data-connector="so"'), 'Must NOT isolate "so" when part of "so that"');
});

test('Logic Connectors Highlight: as long as, so long as, so as to, in order to, unless are supported', () => {
  Reader.settings.highlightLogic = true;

  // as long as
  const sentA = 'You can succeed as long as you keep working hard.';
  const htmlA = Reader.formatSentenceText(sentA, []);
  assert.ok(htmlA.includes('data-connector="as long as"'), 'Should highlight "as long as"');
  assert.ok(htmlA.includes('transition-condition'), '"as long as" must be condition');

  // so long as
  const sentB = 'They remain effective so long as rules are respected.';
  const htmlB = Reader.formatSentenceText(sentB, []);
  assert.ok(htmlB.includes('data-connector="so long as"'), 'Should highlight "so long as"');

  // so as to & in order to
  const sentC = 'We left early so as to avoid traffic and in order to catch the train.';
  const htmlC = Reader.formatSentenceText(sentC, []);
  assert.ok(htmlC.includes('data-connector="so as to"'), 'Should highlight "so as to"');
  assert.ok(htmlC.includes('data-connector="in order to"'), 'Should highlight "in order to"');

  // unless
  const sentD = 'No progress is possible unless structural reforms occur.';
  const htmlD = Reader.formatSentenceText(sentD, []);
  assert.ok(htmlD.includes('data-connector="unless"'), 'Should highlight "unless"');
  assert.ok(htmlD.includes('transition-condition'), '"unless" must be condition');
});

test('Logic Connectors Highlight: degree adverb "so" (so important, so much) is NOT falsely highlighted', () => {
  Reader.settings.highlightLogic = true;

  const sentDegree = 'The issue is so important and became so widespread that people did so without thinking so much.';
  const html = Reader.formatSentenceText(sentDegree, []);

  // 'so important', 'did so', 'so much' should NOT be wrapped as connectors
  assert.ok(!html.includes('data-connector="so"'), 'Degree adverb "so" should not be falsely highlighted as a connector');
});

test('Logic Connectors Highlight: genuine causal coordinating conjunction "so" is preserved', () => {
  Reader.settings.highlightLogic = true;

  const sentCausal = 'The market collapsed, so investors rushed to sell their shares.';
  const html = Reader.formatSentenceText(sentCausal, []);

  assert.ok(html.includes('data-connector="so"'), 'Genuine causal ", so" should be recognized as connector');
  assert.ok(html.includes('transition-cause'), 'Causal "so" should have transition-cause class');
});
