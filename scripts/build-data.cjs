// Year JSON files are the source of truth. Rebuild with: node scripts/build-data.cjs
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const db = {};
const manifest = [];
for (let year = 2010; year <= 2026; year++) {
  const file = path.join(root, 'data', `${year}.json`);
  const original = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(original);
  const before = JSON.stringify(data);
  for (const text of data.texts) {
    text.year ??= year;
    text.title ||= `${year} 年考研英语（二）阅读理解 Text ${text.text_id}`;
    const start = Number(text.q_range.split('-')[0]);
    text.questions.forEach((q, i) => { q.qid ??= start + i; });
  }
  if (JSON.stringify(data) !== before) fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  db[year] = data;
  manifest.push({ year, texts: data.texts.map(t => ({ id: t.text_id, title: t.title, q_range: t.q_range })) });
}
fs.writeFileSync(path.join(root, 'data/all_data.js'), `window.KAOYAN_MANIFEST = ${JSON.stringify(manifest)};\nwindow.KAOYAN_PURE_DATA = ${JSON.stringify(db)};\n`);
fs.writeFileSync(path.join(root, 'data/manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'data/manifest.js'), `window.KAOYAN_MANIFEST = ${JSON.stringify(manifest, null, 2)};\n`);
console.log('Built 17 years / 68 texts; normalized year, title and question IDs.');
