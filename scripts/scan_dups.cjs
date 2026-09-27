const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

for (const yr of [2018, 2019, 2020, 2021, 2022, 2023]) {
  const filePath = path.join(root, `data/${yr}.json`);
  const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`\n=== Year ${yr} ===`);
  d.texts.forEach(t => {
    t.sentences.forEach((s, sIdx) => {
      const slChunks = (s.slashed_text || '').split(/\s*[/／]\s*/).filter(Boolean);
      const ckChunks = (s.chunk_translation || '').split(/\s*[/／]\s*/).filter(Boolean);

      // Check Chinese duplicate tokens between adjacent chunks
      for (let i = 0; i < ckChunks.length - 1; i++) {
        const c1 = ckChunks[i].trim();
        const c2 = ckChunks[i + 1].trim();

        // Check if a substantial word/phrase (>=2 chars) in c2 is repeated in c1
        const words2 = c2.match(/[\u4e00-\u9fa5]{2,}/g) || [];
        for (const w of words2) {
          if (c1.includes(w) && !['以及', '可以', '他们', '我们', '这个', '这些', '因为', '并且', '如果', '没有', '这种'].includes(w)) {
            console.log(`[ZH Repeat] T${t.text_id} S${sIdx+1} "${w}":`);
            console.log(`  C${i+1} [${slChunks[i]}]: ${c1}`);
            console.log(`  C${i+2} [${slChunks[i+1]}]: ${c2}`);
          }
        }
      }
    });
  });
}
