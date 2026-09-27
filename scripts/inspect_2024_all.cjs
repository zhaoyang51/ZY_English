const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2024.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

d.texts.forEach(t => {
  console.log(`\n================== 2024 TEXT ${t.text_id} ==================`);
  t.sentences.forEach((s, idx) => {
    const sl = (s.slashed_text || '').split(/\s*[/／]\s*/).filter(Boolean);
    const tr = (s.chunk_translation || '').split(/\s*[/／]\s*/).filter(Boolean);
    const match = sl.length === tr.length ? 'OK' : `MISMATCH (${sl.length} vs ${tr.length})`;
    console.log(`\n--- [T${t.text_id} S${idx + 1}] [${match}] ---`);
    console.log(`EN: ${s.text}`);
    console.log(`SL: ${s.slashed_text}`);
    console.log(`TR: ${s.chunk_translation}`);
  });
});
