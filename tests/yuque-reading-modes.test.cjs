const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

test('Yuque Reading Manifest and HTML integration tests', () => {
  // 1. Verify yuque_manifest.js
  const manifestContent = read('js/yuque_manifest.js');
  const sandbox = { window: {} };
  const fn = new Function('window', manifestContent);
  fn(sandbox.window);
  const manifest = sandbox.window.YuqueManifest;

  assert.ok(manifest.practice, 'manifest.practice should exist');
  assert.ok(manifest.review, 'manifest.review should exist');
  assert.strictEqual(typeof manifest.practice['2010_text1'], 'string');
  assert.strictEqual(manifest.practice['2010_text1'], '2010_text1_做题模式.html');
  assert.strictEqual(manifest.review['2010_text1'], '2010_text1_复盘模式.html');

  // Verify missing篇目 correctly evaluate to undefined
  assert.strictEqual(manifest.practice['2010_text2'], undefined, '2010 Text 2 should not exist in Yuque');
  assert.strictEqual(manifest.practice['2022_text1'], undefined, '2022 Text 1 should not exist in Yuque');

  // 2. Verify all files in manifest physically exist on disk
  for (const [key, fileName] of Object.entries(manifest.practice)) {
    const filePath = path.join(root, '英二做题和复盘模式', fileName);
    assert.ok(fs.existsSync(filePath), `Practice file should exist on disk: ${fileName}`);
    assert.ok(fs.statSync(filePath).size > 1000, `Practice file should not be empty: ${fileName}`);
  }

  for (const [key, fileName] of Object.entries(manifest.review)) {
    const filePath = path.join(root, '英二做题和复盘模式', fileName);
    assert.ok(fs.existsSync(filePath), `Review file should exist on disk: ${fileName}`);
    assert.ok(fs.statSync(filePath).size > 1000, `Review file should not be empty: ${fileName}`);
  }

  // 3. Verify index.html contains required elements
  const indexHtml = read('index.html');
  assert.ok(indexHtml.includes('id="reviewSubmodeGroup"'), 'index.html should contain reviewSubmodeGroup');
  assert.ok(indexHtml.includes('id="reviewMode1Btn"'), 'index.html should contain reviewMode1Btn');
  assert.ok(indexHtml.includes('id="reviewMode2Btn"'), 'index.html should contain reviewMode2Btn');
  assert.ok(indexHtml.includes('id="yuqueContainer"'), 'index.html should contain yuqueContainer');
  assert.ok(indexHtml.includes('src="js/yuque_manifest.js"'), 'index.html should include yuque_manifest.js');

  // 4. Verify css/components.css contains yuque styles
  const css = read('css/components.css');
  assert.ok(css.includes('.yuque-container'), 'css should define .yuque-container');
  assert.ok(css.includes('.yuque-frame'), 'css should define .yuque-frame');
  assert.ok(css.includes('.yuque-empty-card'), 'css should define .yuque-empty-card');

  // 5. Verify practice mode files have enlarged layout and zoom controls
  const samplePractice = read('英二做题和复盘模式/2017_text1_做题模式.html');
  assert.ok(samplePractice.includes('grid-template-columns:minmax(520px,1.25fr) minmax(420px,1fr)'), 'Practice file layout should allocate wider space for left article');
  assert.ok(samplePractice.includes('max-width:1150px'), 'Practice pageWrap should allow larger max width');
  assert.ok(samplePractice.includes('id="zoomIn"'), 'Practice file should contain zoomIn button');
  assert.ok(samplePractice.includes('id="zoomOut"'), 'Practice file should contain zoomOut button');
  assert.ok(samplePractice.includes('applyZoom'), 'Practice file should contain applyZoom logic');

  // 6. Verify app.js removes redundant labels and hides disabled step controls in yuque mode
  const appJs = read('js/app.js');
  assert.ok(!appJs.includes("progressText.textContent = `${AppState.year} Text ${AppState.textId} (${modeLabel})`"), 'Redundant mode label in progressText should be removed');
  assert.ok(appJs.includes("if (stepNavGroup) stepNavGroup.style.display = 'none';"), 'Disabled step controls should be hidden in yuque mode');
});

