const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
let totalSentences = 0;
let totalPassages = 0;
let errors = [];

for (let year = 2010; year <= 2026; year++) {
  const filePath = path.join(root, `data/${year}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  data.texts.forEach(text => {
    totalPassages++;
    text.sentences.forEach((s, sIdx) => {
      totalSentences++;
      if (!s.slashed_text || !s.chunk_translation) {
        errors.push(`${year} Text ${text.text_id} Sent ${sIdx + 1}: Missing slashed_text or chunk_translation`);
        return;
      }

      const slChunks = s.slashed_text.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
      const ckChunks = s.chunk_translation.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);

      if (slChunks.length !== ckChunks.length) {
        errors.push(`${year} Text ${text.text_id} Sent ${sIdx + 1}: Chunk count mismatch: ${slChunks.length} vs ${ckChunks.length}\n  SL: ${s.slashed_text}\n  CK: ${s.chunk_translation}`);
      }
    });
  });
}

console.log(`Validated ${totalPassages} passages across 17 years (2010-2026).`);
console.log(`Total sentences checked: ${totalSentences}`);

if (errors.length > 0) {
  console.error(`Found ${errors.length} errors:`);
  errors.slice(0, 10).forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log(`SUCCESS: 100% of all ${totalSentences} sentences have exact 1:1 chunk alignment with zero mismatches!`);
}
