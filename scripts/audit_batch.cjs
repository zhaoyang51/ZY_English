const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const startYear = parseInt(process.argv[2] || '2018', 10);
const endYear = parseInt(process.argv[3] || '2020', 10);

for (let yr = startYear; yr <= endYear; yr++) {
  const file = path.join(root, 'data', `${yr}.json`);
  if (!fs.existsSync(file)) continue;
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log(`\n================ YEAR ${yr} ================`);
  d.texts.forEach(t => {
    console.log(`--- [Year ${yr} Text ${t.text_id}] ---`);
    t.sentences.forEach((s, sIdx) => {
      const sl = (s.slashed_text || '').split(/\s*[/／]\s*/).filter(Boolean);
      const tr = (s.chunk_translation || '').split(/\s*[/／]\s*/).filter(Boolean);
      if (sl.length !== tr.length) {
        console.log(`[MISMATCH] T${t.text_id} S${sIdx+1}: sl=${sl.length}, tr=${tr.length}`);
      }
      // Print first sentence and any sentence with suspicious keywords or mismatch
      const fullText = s.text;
      const fullTrans = s.chunk_translation;
      // Check for common translation discrepancies or over-translations
      const suspicious = ['绝望', '残酷', '窒息', '不可自拔', '惊悚', '天方夜谭', '狂欢', '血雨腥风', '抓狂', '巨额', '畸形'];
      const hasSuspicious = suspicious.some(w => fullTrans.includes(w));
      if (sIdx === 0 || hasSuspicious || sl.length !== tr.length) {
        console.log(`S${sIdx+1} [${hasSuspicious ? 'SUSPICIOUS' : 'SAMPLE'}]: ${fullText}`);
        console.log(`   SL: ${s.slashed_text}`);
        console.log(`   TR: ${s.chunk_translation}`);
      }
    });
  });
}
