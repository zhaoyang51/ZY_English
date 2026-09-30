const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

test('all sentences and paragraphs across 2010-2026 have valid 1:1 chunk alignment and authentic translations', () => {
  let totalSentences = 0;

  for (let yr = 2010; yr <= 2026; yr++) {
    const filePath = path.join(root, `data/${yr}.json`);
    assert.ok(fs.existsSync(filePath), `Data file for ${yr} should exist`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    data.texts.forEach((textObj, tIdx) => {
      // 1. Validate sentences
      textObj.sentences.forEach((sent, sIdx) => {
        totalSentences++;
        const sLoc = `${yr} Text ${tIdx + 1} Sentence ${sIdx} (sid: ${sent.sid})`;

        // Translation must contain Chinese
        if (sent.text && sent.text.trim().length > 3) {
          assert.ok(
            /[\u4e00-\u9fa5]/.test(sent.translation),
            `${sLoc}: translation should contain Chinese characters, got: "${sent.translation}"`
          );
        }

        // Slashed text and chunk translation count must match 1:1
        if (sent.slashed_text && sent.chunk_translation) {
          const slChunks = sent.slashed_text.split(/\s*\/\s*/).map(s => s.trim()).filter(Boolean);
          const ckChunks = sent.chunk_translation.split(/\s*\/\s*/).map(s => s.trim()).filter(Boolean);
          assert.equal(
            slChunks.length,
            ckChunks.length,
            `${sLoc}: slashed chunk count (${slChunks.length}) must equal chunk translation count (${ckChunks.length})`
          );

          // No suspicious repeated chunks within the same sentence
          const ckCounts = {};
          ckChunks.forEach(c => {
            if (c.length >= 3) {
              ckCounts[c] = (ckCounts[c] || 0) + 1;
              assert.ok(
                ckCounts[c] < 3,
                `${sLoc}: detected suspicious repeated chunk "${c}" (${ckCounts[c]} times)`
              );
            }
          });
        }
      });

      // 2. Validate paragraphs
      textObj.paragraphs.forEach((p, pIdx) => {
        const pLoc = `${yr} Text ${tIdx + 1} Paragraph ${pIdx}`;
        if (p.slashed_text && p.chunk_translation) {
          const slChunks = p.slashed_text.split(/\s*\/\s*/).map(s => s.trim()).filter(Boolean);
          const ckChunks = p.chunk_translation.split(/\s*\/\s*/).map(s => s.trim()).filter(Boolean);
          assert.equal(
            slChunks.length,
            ckChunks.length,
            `${pLoc}: paragraph slashed chunk count (${slChunks.length}) must equal chunk translation count (${ckChunks.length})`
          );
        }
      });
    });
  }

  assert.equal(totalSentences, 1273, 'Expected 1273 total sentences across all 17 years');
});
