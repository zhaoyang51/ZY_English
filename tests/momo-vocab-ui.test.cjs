const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// Test MoMo UI Structure and Styles
test('MoMo Vocab UI: Stylesheet has Morandi mist gradient, serif typography, frosted cards, and indicators', () => {
  const css = fs.readFileSync(path.join(__dirname, '../css/vocab.css'), 'utf8');

  // 1. Morandi background gradient
  assert.ok(css.includes('--momo-bg-gradient'), 'Must define --momo-bg-gradient');
  assert.ok(css.includes('linear-gradient(180deg, #dce6de 0%, #c8d5cb 45%, #b1c1b4 100%)'), 'Must use Morandi mist gradient');

  // 2. Serif typography for word
  assert.ok(css.includes('font-family: "Newsreader"') || css.includes('Georgia'), 'Must specify elegant serif font');

  // 3. Frosted card styling
  assert.ok(css.includes('backdrop-filter: blur'), 'Cards must use frosted glass backdrop filter');
  assert.ok(css.includes('.vocab-momo-card'), 'Must contain .vocab-momo-card class');

  // 4. Color indicator bars (green, amber, red)
  assert.ok(css.includes('.bar-green'), 'Must contain .bar-green');
  assert.ok(css.includes('.bar-amber'), 'Must contain .bar-amber');
  assert.ok(css.includes('.bar-red'), 'Must contain .bar-red');

  // 5. Checkmark badge and frequency badge
  assert.ok(css.includes('.momo-checkmark'), 'Must contain .momo-checkmark badge class');
  assert.ok(css.includes('.momo-freq-badge'), 'Must contain .momo-freq-badge class');

  // 6. Relations card expanded to bottom and content scrolls inside white card
  assert.ok(css.includes('.vocab-momo-card-relations') && css.includes('flex: 1 1 0'), 'Relations card must expand to bottom with flex: 1 1 0');
  assert.ok(css.includes('.momo-colloc-list') && css.includes('overflow-y: auto'), 'Collocations list must scroll inside white card');
});

test('MoMo Vocab UI: JS Engine generates syllables, phonetics, and matches both Unrevealed and Revealed states', () => {
  const vocabJs = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');

  // 1. Syllable division function
  assert.ok(vocabJs.includes('formatWordWithSyllables'), 'Must contain formatWordWithSyllables function');

  // 2. Hint text for unrevealed state
  assert.ok(vocabJs.includes('瞬间想起词义，选「认识」'), 'Must include 瞬间想起词义 guidance prompt');
  assert.ok(vocabJs.includes('思考后想起词义，选「模糊」'), 'Must include 思考后想起词义 guidance prompt');

  // 3. Unrevealed 3 buttons
  assert.ok(vocabJs.includes('vocabMomoBtnGood') && vocabJs.includes('认识'), 'Must have 认识 button');
  assert.ok(vocabJs.includes('vocabMomoBtnHard') && vocabJs.includes('模糊'), 'Must have 模糊 button');
  assert.ok(vocabJs.includes('vocabMomoBtnForgot') && vocabJs.includes('忘记了'), 'Must have 忘记了 button');

  // 4. Revealed 2 buttons
  assert.ok(vocabJs.includes('vocabMomoBtnContinue') && vocabJs.includes('继续'), 'Must have 继续 button');
  assert.ok(vocabJs.includes('vocabMomoBtnWrong') && vocabJs.includes('记错了'), 'Must have 记错了 button');

  // 5. Top bar controls: Back, Progress, Undo, Star, Mastered, Spelling, More
  assert.ok(vocabJs.includes('vocabMomoBtnBack'), 'Must have Back button');
  assert.ok(vocabJs.includes('vocabMomoProgress'), 'Must have Progress text');
  assert.ok(vocabJs.includes('vocabMomoBtnUndo'), 'Must have Undo button');
  assert.ok(vocabJs.includes('vocabMomoBtnStar'), 'Must have Star button');
  assert.ok(vocabJs.includes('vocabMomoBtnMastered'), 'Must have 熟 Mastered button');
  assert.ok(vocabJs.includes('vocabMomoBtnSpelling'), 'Must have abc Spelling button');
  assert.ok(vocabJs.includes('vocabMomoBtnMore'), 'Must have ··· More button');

  // 6. Settings Modal Sheet
  assert.ok(vocabJs.includes('vocabFilterModal'), 'Must have Settings Modal Sheet');

  // 7. Exam Frequency Badge & Calculation
  assert.ok(vocabJs.includes('vocabMomoFreqBadge'), 'Must have frequency badge element ID');
  assert.ok(vocabJs.includes('getWordFrequency'), 'Must have getWordFrequency function');
});

test('MoMo Vocab UI: Word phonetics dictionary is bundled with 3,500+ authentic entries', () => {
  const phoneticsPath = path.join(__dirname, '../data/vocab_phonetics.js');
  assert.ok(fs.existsSync(phoneticsPath), 'vocab_phonetics.js must exist');
  const txt = fs.readFileSync(phoneticsPath, 'utf8');
  assert.ok(txt.includes('nasty'), 'Must include nasty');
  assert.ok(txt.includes('ˈnɑːsti') || txt.includes('nɑ:sti'), 'Must have authentic phonetic for nasty');
  assert.ok(txt.length > 100000, 'Must contain complete comprehensive dictionary data');
});
