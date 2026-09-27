const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

for (const yr of years) {
  const filePath = path.join(root, `data/${yr}.json`);
  if (!fs.existsSync(filePath)) continue;
  const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`\n=== Year ${yr} ===`);
  const texts = d.texts || (d.reading && d.reading.texts) || [];
  texts.forEach(t => {
    t.sentences.forEach((s, sIdx) => {
      const slashChunks = (s.slashed_text || '').split(/\s*[/／]\s*/).filter(Boolean);
      const transChunks = (s.chunk_translation || '').split(/\s*[/／]\s*/).filter(Boolean);
      if (slashChunks.length !== transChunks.length) {
        console.log(`[Count Mismatch] Text ${t.id} Sent ${sIdx}: slash=${slashChunks.length}, trans=${transChunks.length}`);
      }
      if (/\d+,\s*[/／]\s*\d+/.test(s.slashed_text || '')) {
        console.log(`[Number Split] Text ${t.id} Sent ${sIdx}: ${s.slashed_text.match(/\d+,\s*[/／]\s*\d+/)[0]}`);
      }
      // Check duplicated boundary words
      for (let i = 0; i < slashChunks.length - 1; i++) {
        const wordsA = slashChunks[i].trim().split(/\s+/);
        const wordsB = slashChunks[i+1].trim().split(/\s+/);
        const lastA = wordsA[wordsA.length - 1].replace(/[.,;:!?"'“”]/g, '').toLowerCase();
        const firstB = wordsB[0].replace(/[.,;:!?"'“”]/g, '').toLowerCase();
        if (lastA && firstB && lastA === firstB && lastA.length > 2) {
          console.log(`[Duplicate Word] Text ${t.id} Sent ${sIdx}: '${lastA}' across slash`);
          console.log(`   A: "${slashChunks[i]}"`);
          console.log(`   B: "${slashChunks[i+1]}"`);
        }
      }
    });
  });
}
