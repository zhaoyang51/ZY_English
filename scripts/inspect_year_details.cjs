const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const yr = process.argv[2] || 2014;
const filePath = path.join(root, `data/${yr}.json`);
const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));

d.texts.forEach(t => {
  console.log(`\n================== TEXT ${t.text_id} ==================`);
  t.sentences.forEach((s, idx) => {
    const sl = (s.slashed_text || '').split(/\s*[/／]\s*/).filter(Boolean);
    const tr = (s.chunk_translation || '').split(/\s*[/／]\s*/).filter(Boolean);
    console.log(`--- [T${t.text_id} S${idx + 1}] (${sl.length} chunks) ---`);
    for (let i = 0; i < Math.max(sl.length, tr.length); i++) {
      console.log(`  [${i+1}] ${sl[i] || 'MISSING'}  ===>  ${tr[i] || 'MISSING'}`);
    }
  });
});
