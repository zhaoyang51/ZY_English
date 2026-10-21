const fs = require('fs');
const path = require('path');

function decodeEntities(str) {
  if (!str) return '';
  return str
    .replace(/&#(\d+);/g, (m, c) => String.fromCharCode(c))
    .replace(/&#x([0-9a-fA-F]+);/g, (m, c) => String.fromCharCode(parseInt(c, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'");
}

function parseSuchengSvg(svgText, docTitle) {
  const textMatches = svgText.match(/<text[^>]*>([\s\S]*?)<\/text>/g) || [];
  const nodes = textMatches.map(t => decodeEntities(t.replace(/<[^>]+>/g, '').trim())).filter(Boolean);
  
  if (nodes.length < 3) return null;

  const word = nodes[0];
  const freqMatch = nodes[1].match(/词频\s*(\d+)/);
  const frequency = freqMatch ? parseInt(freqMatch[1]) : 1;

  // Footer is usually the last node
  const footer = nodes[nodes.length - 1];
  let type = '';
  let rankInType = '';
  const footerMatch = footer.match(/类型([一二三])·([^｜|]+)[｜|](\d+\/\d+)/);
  if (footerMatch) {
    type = `类型${footerMatch[1]}·${footerMatch[2].trim()}`;
    rankInType = footerMatch[3];
  } else {
    // Infer type from doc title
    if (docTitle.startsWith('1.')) type = '类型一·词根型';
    else if (docTitle.startsWith('2.')) type = '类型二·独立词型';
    else if (docTitle.startsWith('3.')) type = '类型三·直接背型';
  }

  // Find index of "思维链路" and "已考词性词义"
  const idxMind = nodes.findIndex(n => n.includes('思维链路'));
  const idxExam = nodes.findIndex(n => n.includes('已考词性词义'));

  // Brief meaning: between node 1 and (idxMind > -1 ? idxMind : idxExam)
  const endDefIdx = idxMind > -1 ? idxMind : (idxExam > -1 ? idxExam : nodes.length - 1);
  const briefDef = nodes.slice(2, endDefIdx).join('；').replace(/；+/g, '；');

  // Mind chain / 思维链路
  let mindChain = '';
  if (idxMind > -1) {
    const endMindIdx = idxExam > -1 ? idxExam : nodes.length - 1;
    mindChain = nodes.slice(idxMind + 1, endMindIdx).join('\n');
  }

  // Exam uses / 已考词性词义
  const examUses = [];
  if (idxExam > -1) {
    const examNodes = nodes.slice(idxExam + 1, footerMatch ? nodes.length - 1 : nodes.length);
    let currentUse = null;
    let inSentence = false;

    for (let i = 0; i < examNodes.length; i++) {
      const text = examNodes[i];
      // Check if it's an item number (1, 2, 3...)
      if (/^\d+$/.test(text)) {
        if (currentUse) examUses.push(currentUse);
        currentUse = {
          itemNum: parseInt(text),
          posAndDef: '',
          freq: 1,
          sentence: '',
          source: ''
        };
        inSentence = false;
        continue;
      }

      if (!currentUse) {
        currentUse = { itemNum: examUses.length + 1, posAndDef: '', freq: 1, sentence: '', source: '' };
      }

      // Check for 考频
      const itemFreqMatch = text.match(/^考频\s*(\d+)/);
      if (itemFreqMatch) {
        currentUse.freq = parseInt(itemFreqMatch[1]);
        inSentence = true;
        continue;
      }

      // Check for 出处
      if (text.startsWith('出处：') || text.startsWith('出处:')) {
        currentUse.source = text.replace(/^出处[：:]\s*/, '');
        inSentence = false;
        continue;
      }

      if (!inSentence && !itemFreqMatch) {
        currentUse.posAndDef = currentUse.posAndDef ? (currentUse.posAndDef + ' ' + text) : text;
      } else {
        // Accumulate sentence lines
        currentUse.sentence = currentUse.sentence ? (currentUse.sentence + ' ' + text) : text;
      }
    }
    if (currentUse) examUses.push(currentUse);
  }

  return {
    word,
    frequency,
    briefDef,
    type,
    rankInType,
    mindChain,
    examUses,
    docTitle
  };
}

function parseDaxueSvg(svgText, docTitle) {
  const textMatches = svgText.match(/<text[^>]*>([\s\S]*?)<\/text>/g) || [];
  const nodes = textMatches.map(t => decodeEntities(t.replace(/<[^>]+>/g, '').trim())).filter(Boolean);
  
  const metaMatch = svgText.match(/<metadata>([\s\S]*?)<\/metadata>/);
  let metadata = null;
  if (metaMatch) {
    try {
      metadata = JSON.parse(decodeEntities(metaMatch[1]));
    } catch (e) {}
  }

  let root = metadata?.root || (nodes[2] || '');
  let rank = metadata?.rank || (nodes[1] || '');

  let idxInfo = nodes.findIndex(n => n.includes('词根信息'));
  let idxRhyme = nodes.findIndex(n => n.includes('记忆焚诀'));
  let idxCore = nodes.findIndex(n => n.includes('主词'));
  let idxAdd = nodes.findIndex(n => n.includes('附加词'));

  let rootInfo = '';
  if (idxInfo > -1 && idxRhyme > -1) {
    rootInfo = nodes.slice(idxInfo + 1, idxRhyme).join('\n');
  } else if (metadata?.root_info_original) {
    rootInfo = metadata.root_info_original;
  }

  let mnemonic = '';
  if (idxRhyme > -1 && idxCore > -1) {
    mnemonic = nodes.slice(idxRhyme + 1, idxCore).join('\n');
  }

  // Parse Core Words
  const coreWords = [];
  if (idxCore > -1) {
    const endCoreIdx = idxAdd > -1 ? idxAdd : nodes.length - 1;
    const coreSlice = nodes.slice(idxCore + 1, endCoreIdx);
    
    let currentCore = null;
    let inDerivation = false;
    for (const line of coreSlice) {
      if (/^\d{2}$/.test(line)) {
        if (currentCore) coreWords.push(currentCore);
        currentCore = { num: line, word: '', construction: '', derivation: '' };
        inDerivation = false;
        continue;
      }
      if (!currentCore) continue;
      if (!currentCore.word) {
        currentCore.word = line;
      } else if (line.startsWith('推导：') || line.startsWith('推导:')) {
        inDerivation = true;
        const rest = line.replace(/^推导[：:]\s*/, '');
        if (rest) currentCore.derivation = rest;
      } else if (inDerivation) {
        currentCore.derivation = currentCore.derivation ? (currentCore.derivation + ' ' + line) : line;
      } else {
        currentCore.construction = currentCore.construction ? (currentCore.construction + ' ' + line) : line;
      }
    }
    if (currentCore) coreWords.push(currentCore);
  }

  // Parse Additional Words
  const additionalWords = [];
  if (idxAdd > -1) {
    const addSlice = nodes.slice(idxAdd + 1, nodes.length - 1);
    let currentAdd = null;
    for (const line of addSlice) {
      if (/^\d{2}$/.test(line)) {
        if (currentAdd) additionalWords.push(currentAdd);
        currentAdd = { num: line, word: '', info: '' };
        continue;
      }
      if (!currentAdd) continue;
      if (!currentAdd.word) {
        currentAdd.word = line;
      } else {
        currentAdd.info = currentAdd.info ? (currentAdd.info + ' ' + line) : line;
      }
    }
    if (currentAdd) additionalWords.push(currentAdd);
  }

  return {
    root,
    rank,
    docTitle,
    rootInfo,
    mnemonic,
    coreWords,
    additionalWords,
    metadata
  };
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) return await res.text();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error(`Failed to fetch ${url}`);
}

async function downloadAndProcess() {
  console.log('Starting Yuque Vocabulary Extraction...');
  const suchengRaw = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'yuque_sucheng_full.json'), 'utf-8'));
  const daxueRaw = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'yuque_daxue_full.json'), 'utf-8'));

  function extractDocSvgs(docs) {
    const list = [];
    docs.forEach(d => {
      const content = d.content || '';
      const encodedMatches = content.match(/https%3A%2F%2Fcdn\.nlark\.com%2Fyuque%2F[^\s"'\\]+?\.svg/g) || [];
      const directMatches = content.match(/https:\/\/cdn\.nlark\.com\/yuque\/[^\s"'\\]+?\.svg/g) || [];
      const seen = new Set();
      const urls = [];
      encodedMatches.forEach(u => urls.push(decodeURIComponent(u)));
      directMatches.forEach(u => urls.push(u));
      urls.forEach(url => {
        if (!seen.has(url)) {
          seen.add(url);
          list.push({ docTitle: d.title, url });
        }
      });
    });
    return list;
  }

  // 1. Process Sucheng (2,868 SVGs)
  const suchengItems = extractDocSvgs(suchengRaw.docs);
  console.log(`\n=== Downloading & Parsing Sucheng (${suchengItems.length} items) ===`);
  const suchengResults = [];
  const concurrency = 25;
  let done = 0;
  const startS = Date.now();

  for (let i = 0; i < suchengItems.length; i += concurrency) {
    const batch = suchengItems.slice(i, i + concurrency);
    await Promise.all(batch.map(async item => {
      try {
        const svgText = await fetchWithRetry(item.url);
        const parsed = parseSuchengSvg(svgText, item.docTitle);
        if (parsed) {
          parsed.svgUrl = item.url;
          suchengResults.push(parsed);
        }
      } catch (err) {
        console.error(`Error fetching ${item.url}:`, err.message);
      }
      done++;
    }));
    if (done % 200 === 0 || done === suchengItems.length) {
      const elapsed = ((Date.now() - startS) / 1000).toFixed(1);
      console.log(`Sucheng Progress: ${done}/${suchengItems.length} (${(done/elapsed).toFixed(1)} items/s)`);
    }
  }

  console.log(`Sucheng completed! Total successfully parsed: ${suchengResults.length}`);

  // 2. Process Daxue (876 SVGs)
  const daxueItems = extractDocSvgs(daxueRaw.docs);
  console.log(`\n=== Downloading & Parsing Daxue (${daxueItems.length} items) ===`);
  const daxueResults = [];
  done = 0;
  const startD = Date.now();

  for (let i = 0; i < daxueItems.length; i += concurrency) {
    const batch = daxueItems.slice(i, i + concurrency);
    await Promise.all(batch.map(async item => {
      try {
        const svgText = await fetchWithRetry(item.url);
        const parsed = parseDaxueSvg(svgText, item.docTitle);
        if (parsed) {
          parsed.svgUrl = item.url;
          daxueResults.push(parsed);
        }
      } catch (err) {
        console.error(`Error fetching ${item.url}:`, err.message);
      }
      done++;
    }));
    if (done % 100 === 0 || done === daxueItems.length) {
      const elapsed = ((Date.now() - startD) / 1000).toFixed(1);
      console.log(`Daxue Progress: ${done}/${daxueItems.length} (${(done/elapsed).toFixed(1)} items/s)`);
    }
  }

  console.log(`Daxue completed! Total successfully parsed: ${daxueResults.length}`);

  // 3. Save JSON and JS outputs
  console.log('\nWriting datasets to disk...');
  
  // Format Sucheng for Vocab Module:
  // Each entry in window.YUQUE_SUCHENG_VOCAB:
  // {
  //   word, meaning, freq, type, category, subbook, rank, mindChain, examUses, sentence, source
  // }
  const cleanSucheng = suchengResults.map(w => {
    // Determine category & subbook from docTitle
    // e.g. "1.1.1_考频45-209次_第1-3册_10词" -> category: "词根构词型", subbook: "1.1.1 第1-3册 (考频45-209次)"
    let cat = '词根构词型';
    if (w.docTitle.startsWith('2.') || w.type.includes('独立')) cat = '独立词型';
    else if (w.docTitle.startsWith('3.') || w.type.includes('释义') || w.type.includes('直接背')) cat = '直接背型';

    // Subbook: extract "1.1.1", "考频45-209次", "第1-3册"
    const parts = w.docTitle.split('_');
    const code = parts[0] || '';
    const freqRange = parts[1] || '';
    const book = parts[2] || '';
    const subbook = `${code} ${book} (${freqRange})`.trim();

    // Default primary sentence and source
    let primeSentence = '';
    let primeSource = '';
    if (w.examUses && w.examUses.length > 0) {
      // Find use with highest freq or first
      const topUse = [...w.examUses].sort((a, b) => (b.freq || 0) - (a.freq || 0))[0];
      primeSentence = topUse.sentence || '';
      primeSource = topUse.source ? `${topUse.source} [${topUse.posAndDef}]` : topUse.posAndDef;
    }

    return {
      word: w.word,
      meaning: w.briefDef,
      freq: w.frequency,
      category: cat,
      subbook: subbook,
      rank: w.rankInType || '',
      mindChain: w.mindChain || '',
      examUses: w.examUses || [],
      sentence: primeSentence,
      source: primeSource,
      svgUrl: w.svgUrl
    };
  });

  // Sort Sucheng: highest frequency first or by doc order
  fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'vocab_sucheng.js'), 
    `/**\n * 考研英语二 · 单词大观 2-4 天速成版 (2,868 核心真题词汇)\n * 包含：真题词频、词根构词推导思维链路、真题考点释义与历年全真例句\n */\nwindow.YUQUE_SUCHENG_VOCAB = ${JSON.stringify(cleanSucheng)};\n`, 'utf-8');

  // Format Daxue for Vocab Module:
  // Each entry in window.YUQUE_DAXUE_VOCAB:
  // {
  //   root, rank, freqTier, subbook, docTitle, rootInfo, mnemonic, coreWords, additionalWords, svgUrl
  // }
  const cleanDaxue = daxueResults.map(r => {
    // docTitle e.g. "1.1.1_考频154-333次_1-8"
    const parts = r.docTitle.split('_');
    const freqTier = parts[1] || '考频 1次';
    const subbook = `${parts[0]} (${parts[1]} ${parts[2] || ''})`.trim();

    // Also extract all derived words for fast indexing / search
    const allWords = [
      ...(r.coreWords || []).map(w => w.word),
      ...(r.additionalWords || []).map(w => w.word)
    ].filter(Boolean);

    return {
      root: r.root,
      rank: r.rank,
      freqTier: freqTier,
      subbook: subbook,
      docTitle: r.docTitle,
      rootInfo: r.rootInfo,
      mnemonic: r.mnemonic,
      coreWords: r.coreWords,
      additionalWords: r.additionalWords,
      allWords: allWords,
      svgUrl: r.svgUrl
    };
  });

  fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'vocab_daxue.js'),
    `/**\n * 考研英语二 · 单词大观 大雪深埋版 (876 核心词根构词与推导矩阵)\n * 包含：词根发音/来源/考纲含义、记忆焚诀、主词构词与推导、附加派生词\n */\nwindow.YUQUE_DAXUE_VOCAB = ${JSON.stringify(cleanDaxue)};\n`, 'utf-8');

  console.log(`Generated data/vocab_sucheng.js (${(fs.statSync(path.resolve(__dirname, '..', 'data', 'vocab_sucheng.js')).size / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`Generated data/vocab_daxue.js (${(fs.statSync(path.resolve(__dirname, '..', 'data', 'vocab_daxue.js')).size / 1024 / 1024).toFixed(2)} MB)`);
  console.log('Vocabulary data successfully built!');
}

downloadAndProcess();
