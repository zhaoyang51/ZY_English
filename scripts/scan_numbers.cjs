const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
for (const yr of [2018, 2019, 2020, 2021, 2022, 2023]) {
  const d = JSON.parse(fs.readFileSync(path.join(root, `data/${yr}.json`), 'utf8'));
  d.texts.forEach(t => {
    t.sentences.forEach((s, sIdx) => {
      const sl = s.slashed_text || '';
      if (/\d+,\s*[/／]\s*\d+/.test(sl)) {
        console.log(`[Number Split] ${yr} T${t.text_id} S${sIdx+1}: ${sl}`);
      }
      const chunks = sl.split(/\s*[/／]\s*/).filter(Boolean);
      chunks.forEach((c, cIdx) => {
        if (/^\d{1,4}$/.test(c.trim()) && cIdx > 0) {
          console.log(`[Digit chunk] ${yr} T${t.text_id} S${sIdx+1} C${cIdx+1}: '${c}' in ${sl}`);
        }
      });
    });
  });
}
