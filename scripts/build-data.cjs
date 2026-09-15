// Annual JSON is canonical; deterministic bundle generation for static/offline use.
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const data = {};
const manifest = [];
fs.mkdirSync(path.join(root, 'data/years'), { recursive: true });
for (let year = 2010; year <= 2026; year++) {
  const file = path.join(root, 'data', `${year}.json`);
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  const before = JSON.stringify(d);
  for (const t of d.texts) {
    t.year ??= year;
    t.title ||= `${year} 年考研英语（二）阅读理解 Text ${t.text_id}`;
    const start = Number(t.q_range.split('-')[0]);
    t.questions.forEach((q, i) => { q.qid ??= start + i; });
  }
  if (before !== JSON.stringify(d)) fs.writeFileSync(file, JSON.stringify(d, null, 2) + '\n');
  data[year] = d;
  const payload = JSON.stringify(d);
  const version = createHash('sha256').update(payload).digest('hex').slice(0, 12);
  fs.writeFileSync(path.join(root, 'data/years', `${year}.js`), `window.DataLoader.registerYear(${year}, ${payload});\n`);
  manifest.push({ year, version, texts: d.texts.map(t => ({ id: t.text_id, title: t.title, q_range: t.q_range })) });
}
fs.writeFileSync(path.join(root, 'data/all_data.js'), `window.KAOYAN_MANIFEST = ${JSON.stringify(manifest)};\nwindow.KAOYAN_PURE_DATA = ${JSON.stringify(data)};\n`);
fs.writeFileSync(path.join(root, 'data/manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'data/manifest.js'), `window.KAOYAN_MANIFEST = ${JSON.stringify(manifest, null, 2)};\n`);
console.log('Updated manifest, 17 lazy year assets and compatibility bundle: 68 passages.');
