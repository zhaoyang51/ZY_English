const fs = require('fs');

async function main() {
  const vb = fs.readFileSync('data/vocab_bank.js', 'utf8');
  const wordsSet = new Set();
  const re = /\[\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\]/g;
  let m;
  while ((m = re.exec(vb)) !== null) {
    const raw = m[1].trim();
    if (raw && !raw.includes(' ') && /^[a-zA-Z\-']+$/.test(raw)) {
      wordsSet.add(raw.toLowerCase());
    }
  }

  // Also include words from sucheng
  if (fs.existsSync('data/vocab_sucheng.js')) {
    try {
      const sc = JSON.parse(fs.readFileSync('data/vocab_sucheng.js', 'utf8').replace(/^[^{[]+/, '').replace(/;?\s*$/, ''));
      sc.forEach(item => {
        if (item.word && !item.word.includes(' ') && /^[a-zA-Z\-']+$/.test(item.word)) {
          wordsSet.add(item.word.trim().toLowerCase());
        }
      });
    } catch (e) {}
  }

  // Check if existing phonetics file exists
  let phonetics = {};
  if (fs.existsSync('data/vocab_phonetics.js')) {
    try {
      const existing = fs.readFileSync('data/vocab_phonetics.js', 'utf8').replace(/^[^{]+/, '').replace(/;?\s*$/, '');
      phonetics = JSON.parse(existing);
    } catch (e) {}
  }

  const words = Array.from(wordsSet);
  console.log(`Total words: ${words.length}. Already have phonetics for: ${Object.keys(phonetics).length}`);

  const toFetch = words.filter(w => !phonetics[w]);
  console.log(`Words to fetch: ${toFetch.length}`);

  const BATCH_SIZE = 25;
  for (let i = 0; i < toFetch.length; i += BATCH_SIZE) {
    const batch = toFetch.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (w) => {
      try {
        const res = await fetch('https://dict.youdao.com/jsonapi?q=' + encodeURIComponent(w), {
          headers: { 'User-Agent': 'Mozilla/5.0' },
          signal: AbortSignal.timeout(4000)
        });
        const data = await res.json();
        const wordInfo = data.simple?.word?.[0];
        if (wordInfo) {
          phonetics[w] = {
            uk: wordInfo.ukphone ? `/'${wordInfo.ukphone.replace(/^\/+|\/+$/g, '')}/` : '',
            us: wordInfo.usphone ? `/'${wordInfo.usphone.replace(/^\/+|\/+$/g, '')}/` : ''
          };
        }
      } catch (err) {
        // Ignore single word failure
      }
    }));

    if ((i + BATCH_SIZE) % 250 < BATCH_SIZE || i + BATCH_SIZE >= toFetch.length) {
      console.log(`Progress: ${Math.min(i + BATCH_SIZE, toFetch.length)} / ${toFetch.length}`);
      // Save checkpoint
      fs.writeFileSync('data/vocab_phonetics.js', 'window.KAOYAN_VOCAB_PHONETICS = ' + JSON.stringify(phonetics) + ';\n');
    }
  }

  fs.writeFileSync('data/vocab_phonetics.js', 'window.KAOYAN_VOCAB_PHONETICS = ' + JSON.stringify(phonetics) + ';\n');
  console.log(`Finished! Total phonetics: ${Object.keys(phonetics).length}`);
}

main().catch(console.error);
