const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const m1 = require('./trans_data_2012_2015.cjs');
const m2 = require('./trans_data_2016_2019.cjs');
const m3 = require('./trans_data_2020_2023.cjs');
const m4 = require('./trans_data_2024_2026.cjs');

const allData = { ...m1, ...m2, ...m3, ...m4 };

let totalUpdated = 0;

for (let y = 2012; y <= 2026; y++) {
  const filePath = path.join(__dirname, '..', 'data', `${y}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File ${filePath} not found, skipping.`);
    continue;
  }

  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const enrichedSents = allData[y];

  if (!enrichedSents) {
    console.warn(`No enriched data for year ${y}`);
    continue;
  }

  if (!json.translation) {
    console.warn(`Year ${y} has no translation object!`);
    continue;
  }

  // Accurately assign sentence pid according to paragraph text match
  const paras = json.translation.paragraphs || [{ pid: 0, text: json.translation.source_text || '' }];
  const mergedSents = enrichedSents.map(es => {
    let truePid = 0;
    const sPrefix = (es.en || '').trim().slice(0, 25);
    for (let i = 0; i < paras.length; i++) {
      if (paras[i].text && paras[i].text.includes(sPrefix)) {
        truePid = paras[i].pid !== undefined ? paras[i].pid : i;
        break;
      }
    }
    return {
      sid: es.sid,
      pid: truePid,
      en: es.en,
      cn: es.cn,
      scoring_points: es.scoring_points,
      grammar_breakdown: es.grammar_breakdown,
      reassembly_notes: es.reassembly_notes
    };
  });

  json.translation.sentences = mergedSents;
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`Year ${y} updated: ${mergedSents.length} sentences enriched.`);
  totalUpdated += mergedSents.length;
}

console.log(`Total sentences enriched: ${totalUpdated}.`);

console.log('Running build-data.cjs to rebuild bundles and manifest...');
execSync('node scripts/build-data.cjs', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
console.log('Build completed successfully.');
