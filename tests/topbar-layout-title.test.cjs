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

test('Topbar removes brand header row and places toggle button on the same row at far right', () => {
  const html = read('index.html');
  const css = read('css/components.css');

  // Verify brand row is removed
  assert.ok(!html.includes('topbar-header-row'), 'topbar-header-row must be removed from index.html');
  assert.ok(!html.includes('topbar-brand'), 'topbar-brand must be removed from index.html');
  assert.ok(!html.includes('考研英语二真题系统'), 'Brand title text must be removed');
  assert.ok(!html.includes('2010-2026 全量'), 'Brand badge text must be removed');

  // Verify toggleTopbarBtn is a sibling after topbarControls inside #mainTopbar
  const headerMatch = html.match(/<header class="topbar" id="mainTopbar">([\s\S]*?)<\/header>/);
  assert.ok(headerMatch, '#mainTopbar header must exist');
  const headerInner = headerMatch[1];
  const controlsIdx = headerInner.indexOf('id="topbarControls"');
  const toggleBtnIdx = headerInner.indexOf('id="toggleTopbarBtn"');
  assert.ok(controlsIdx !== -1, '#topbarControls must exist inside #mainTopbar');
  assert.ok(toggleBtnIdx > controlsIdx, '#toggleTopbarBtn must follow #topbarControls on the same header row');

  // Verify CSS positions topbar as a horizontal flex row with toggle button aligned right
  assert.match(css, /\.topbar\s*\{[\s\S]*?flex-direction:\s*row;/, '.topbar must use flex-direction: row');
  assert.match(css, /\.topbar-toggle-btn\s*\{[\s\S]*?margin-left:\s*auto;/, '.topbar-toggle-btn must push to far right via margin-left: auto');
  assert.match(css, /\.topbar\.controls-collapsed\s*\{[\s\S]*?justify-content:\s*flex-end;/, '.topbar.controls-collapsed must keep toggle button on far right');
});
