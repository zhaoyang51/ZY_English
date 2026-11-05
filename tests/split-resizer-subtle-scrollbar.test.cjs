const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('Split Resizer: index.html markup and accessibility structure', () => {
  const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

  // Verify resizer element exists between left and right panel
  assert.ok(indexHtml.includes('id="mainSplitResizer"'), 'index.html must have #mainSplitResizer element');
  assert.ok(indexHtml.includes('class="split-resizer"'), 'index.html must define .split-resizer class');
  assert.ok(indexHtml.includes('class="split-resizer-handle"'), 'index.html must contain .split-resizer-handle indicator');
  assert.ok(indexHtml.includes('role="separator"'), 'resizer must have role="separator" for accessibility');
  assert.ok(indexHtml.includes('aria-orientation="vertical"'), 'resizer must indicate vertical orientation');
  assert.ok(indexHtml.includes('title="拖动调整左右分栏比例，双击恢复默认"'), 'resizer must provide intuitive Chinese tooltip');
});

test('Split Resizer & Subtle Scrollbar: css/components.css rules', () => {
  const css = fs.readFileSync(path.join(root, 'css/components.css'), 'utf8');

  // 1. Resizable dual-panel flex layout
  assert.ok(css.includes('--main-split-left'), 'CSS must utilize --main-split-left CSS custom property for dynamic ratio');
  assert.ok(css.includes('.split-resizer {'), 'CSS must define .split-resizer styling');
  assert.ok(css.includes('cursor: col-resize'), 'resizer must have col-resize cursor');
  assert.ok(css.includes('.split-resizer-handle'), 'CSS must define .split-resizer-handle');
  assert.ok(css.includes('body.is-split-resizing'), 'CSS must define global dragging state on body');
  assert.ok(css.includes('pointer-events: none !important'), 'iframes must ignore pointer events during dragging to prevent event capture');

  // 2. Mobile fallback
  assert.ok(css.includes('.split-resizer {\r\n    display: none !important;') || css.includes('.split-resizer {\n    display: none !important;'), 'resizer must be cleanly hidden on mobile viewports');

  // 3. Subtle minimalist scrollbars
  assert.ok(css.includes('::-webkit-scrollbar {\r\n  width: 5px;') || css.includes('::-webkit-scrollbar {\n  width: 5px;'), 'scrollbar width must be subtle 5px');
  assert.ok(css.includes('::-webkit-scrollbar-track {\r\n  background: transparent !important;') || css.includes('::-webkit-scrollbar-track {\n  background: transparent !important;'), 'scrollbar track must be 100% transparent');
  assert.ok(css.includes('border-radius: 999px;'), 'scrollbar thumb must have smooth rounded pill radius');
  assert.ok(css.includes('scrollbar-width: thin;'), 'Firefox scrollbar-width must be thin');

  // 4. Theme adaptive scrollbar colors
  assert.ok(css.includes('body.theme-parchment') && css.includes('rgba(140, 110, 80'), 'parchment theme must have warm paper-toned scrollbar thumb');
  assert.ok(css.includes('body.theme-dark') && css.includes('rgba(255, 255, 255'), 'dark theme must have translucent night-toned scrollbar thumb');
});

test('Split Resizer & Scrollbar: js/app.js logic & iframe enhancement', () => {
  const appJs = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');

  // 1. App initialization hooks
  assert.ok(appJs.includes('setupMainSplitResizer();'), 'init() must initialize setupMainSplitResizer');
  assert.ok(appJs.includes('setupYuqueIframeSplitAndScroll(win, doc);'), 'attachYuqueFrameShortcuts must enhance iframe with split and scrollbar');

  // 2. Main split resizer logic
  assert.ok(appJs.includes('KAOYAN_MAIN_SPLIT_RATIO'), 'main split resizer must persist custom ratio in localStorage');
  assert.ok(appJs.includes('--main-split-left'), 'main split resizer must adjust --main-split-left dynamically');
  assert.ok(appJs.includes('is-split-resizing'), 'dragging must toggle is-split-resizing');

  // 3. Yuque iframe enhancement
  assert.ok(appJs.includes('__yuque_enhanced_styles'), 'iframe enhancer must inject subtle scrollbar and resizer styles');
  assert.ok(appJs.includes('yuqueSplitResizer'), 'iframe enhancer must create yuqueSplitResizer element');
  assert.ok(appJs.includes('KAOYAN_YUQUE_PRACTICE_SPLIT_RATIO'), 'practice mode must persist ratio in localStorage');
  assert.ok(appJs.includes('KAOYAN_YUQUE_REVIEW_SPLIT_RATIO'), 'review mode must persist ratio in localStorage');
});
