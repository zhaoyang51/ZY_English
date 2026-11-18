const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

test('Page title and description are set to ZY考研英二系统', () => {
  const html = read('index.html');
  assert.ok(html.includes('<title>ZY考研英二系统</title>'), 'Page title must be ZY考研英二系统');
  assert.ok(html.includes('<meta name="description" content="ZY考研英二系统">'), 'Meta description must be ZY考研英二系统');
});

test('Topbar removes brand header row and simplifies controls, grouping, theme, and arrow toggle', () => {
  const html = read('index.html');
  const css = read('css/components.css');
  const appJs = read('js/app.js');

  // Verify brand row is removed
  assert.ok(!html.includes('topbar-header-row'), 'topbar-header-row must be removed from index.html');
  assert.ok(!html.includes('topbar-brand'), 'topbar-brand must be removed from index.html');
  assert.ok(!html.includes('考研英语二真题系统'), 'Brand title text must be removed');
  assert.ok(!html.includes('2010-2026 全量'), 'Brand badge text must be removed');

  // Verify statsBtn & exportBtn removed
  assert.ok(!html.includes('id="statsBtn"'), 'statsBtn must be removed');
  assert.ok(!html.includes('id="exportBtn"'), 'exportBtn must be removed');

  // Verify concise button labels & separate button groups
  assert.ok(html.includes('>做题</button>'), 'Practice button text must be 做题');
  assert.ok(html.includes('>复盘</button>'), 'Review button text must be 复盘');
  assert.ok(html.includes('>写作宝典</button>'), 'Writing button must not have leading icon');
  assert.ok(!html.includes('✍️ 写作宝典'), 'Writing button icon must be removed');

  // Ensure practice/review group is separate from vocab/writing/vocabBook group
  assert.match(
    html,
    /<div class="btn-group">[\s\S]*?id="practiceModeBtn"[\s\S]*?id="reviewModeBtn"[\s\S]*?<\/div>\s*<!-- Vocab, Writing & Vocab Book Group -->\s*<div class="btn-group">[\s\S]*?id="vocabModeBtn"[\s\S]*?id="writingModeBtn"[\s\S]*?id="vocabBookBtn"[\s\S]*?<\/div>/,
    '做题/复盘 must be in one btn-group and 单词背诵/写作宝典/生词本 in another'
  );

  // Verify theme options & default parchment
  assert.match(
    html,
    /<select id="themeSelect"[^>]*>\s*<option value="parchment" selected>护眼<\/option>\s*<option value="light">浅色<\/option>\s*<option value="dark">深色<\/option>\s*<\/select>/,
    'themeSelect must have 护眼(default), 浅色, 深色'
  );
  assert.ok(html.includes('class="mode-practice theme-parchment"'), 'Body must default to theme-parchment');
  assert.ok(appJs.includes("theme: 'parchment'"), 'AppState.theme must default to parchment');

  // Verify Part A / Part B writing dropdown labels have no icons
  assert.ok(appJs.includes("optWritingA.textContent = 'Part A 小作文 (47题 · 10分)';"), 'Part A option must have no icon');
  assert.ok(appJs.includes("optWritingB.textContent = 'Part B 大作文 (48题 · 15分)';"), 'Part B option must have no icon');

  // Verify toggleTopbarBtn is an arrow-only button on the same row at far right
  const headerMatch = html.match(/<header class="topbar" id="mainTopbar">([\s\S]*?)<\/header>/);
  assert.ok(headerMatch, '#mainTopbar header must exist');
  const headerInner = headerMatch[1];
  const controlsIdx = headerInner.indexOf('id="topbarControls"');
  const toggleBtnIdx = headerInner.indexOf('id="toggleTopbarBtn"');
  assert.ok(controlsIdx !== -1, '#topbarControls must exist inside #mainTopbar');
  assert.ok(toggleBtnIdx > controlsIdx, '#toggleTopbarBtn must follow #topbarControls on the same header row');
  assert.ok(headerInner.includes('>▲</button>'), '#toggleTopbarBtn must display only ▲ arrow');
  assert.ok(appJs.includes("toggleTopbarBtn.textContent = isCollapsed ? '▼' : '▲';"), 'JS toggle must switch between ▼ and ▲');

  // Verify CSS positions topbar as a horizontal flex row with toggle button aligned right
  assert.match(css, /\.topbar\s*\{[\s\S]*?flex-direction:\s*row;/, '.topbar must use flex-direction: row');
  assert.match(css, /\.topbar-toggle-btn\s*\{[\s\S]*?margin-left:\s*auto;/, '.topbar-toggle-btn must push to far right via margin-left: auto');
  assert.match(css, /\.topbar\.controls-collapsed\s*\{[\s\S]*?justify-content:\s*flex-end;/, '.topbar.controls-collapsed must keep toggle button on far right');
});
