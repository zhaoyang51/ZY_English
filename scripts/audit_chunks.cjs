const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function auditYear(yr) {
  const filePath = path.join(root, `data/${yr}.json`);
  if (!fs.existsSync(filePath)) return;
  const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`\n================ YEAR ${yr} ================`);

  let countMismatch = 0;
  let isolatedChunks = 0;
  let flaggedTrans = 0;

  d.texts.forEach(t => {
    t.sentences.forEach((s, sIdx) => {
      const slashChunks = (s.slashed_text || '').split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
      const transChunks = (s.chunk_translation || '').split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);

      if (slashChunks.length !== transChunks.length) {
        countMismatch++;
        console.log(`[MISMATCH] T${t.text_id} S${sIdx + 1}: slash=${slashChunks.length}, trans=${transChunks.length}`);
      }

      // Check isolated prepositions / conjunctions / numbers
      slashChunks.forEach((c, cIdx) => {
        const tr = c.trim();
        if (/^\d+,?$/.test(tr) || /^(in|on|at|of|to|for|with|by|from|about|into|through|after|before|between|under|without)$/i.test(tr) || /^(and|but|or|so|yet)$/i.test(tr)) {
          isolatedChunks++;
          console.log(`[ISOLATED CHUNK] T${t.text_id} S${sIdx + 1} C${cIdx + 1}: "${tr}" | Trans: "${transChunks[cIdx] || ''}"`);
        }
      });

      // Check for over-translations / dramatic words
      const dramaticKeywords = [
        '残酷', '惊悚', '令人膛目结舌', '撕心裂肺', '畸形', '争分夺秒', '抓狂', '窒息',
        '不可自拔', '惊天', '血雨腥风', '痛心疾首', '心照不宣', '浩如烟海', '皮质醇',
        '面临着特殊的阻碍与困难', '双重沉重打击'
      ];
      dramaticKeywords.forEach(kw => {
        if ((s.chunk_translation || '').includes(kw)) {
          flaggedTrans++;
          console.log(`[OVERTRANS KEYWORD: ${kw}] T${t.text_id} S${sIdx + 1}: ${s.chunk_translation}`);
        }
      });
    });
  });

  console.log(`Summary ${yr}: mismatches=${countMismatch}, isolatedChunks=${isolatedChunks}, flaggedTrans=${flaggedTrans}`);
}

const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
years.forEach(auditYear);
