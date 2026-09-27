const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 2021
const f2021 = path.join(root, 'data/2021.json');
const d2021 = JSON.parse(fs.readFileSync(f2021, 'utf8'));

const fixes2021 = {
  // Text 1
  '1:13': {
    slashed_text: "As of May , / those rates had spiked up to 13.3 per cent and 13.7 per cent , / and although many worker shortages had disappeared , / not all had done so.",
    chunk_translation: "截至五月， / 这些失业率已飙升至13.3%和13.7%， / 而且尽管许多劳动力短缺现象已经消失， / 但并非所有短缺都已缓解。"
  },
  // Text 2
  '2:6': {
    slashed_text: "According to a report on UK food production from the University of Leeds, UK , / 85 per cent of the country’s total land area is associated / with meat and dairy production.",
    chunk_translation: "根据英国利兹大学关于英国粮食生产的一份报告， / 其全国土地总面积的85%都与 / 肉类和乳制品生产相关联。"
  },
  // Text 4
  '4:3': {
    slashed_text: "Another set of participants had to count backward from 1,000 / by nines as they watched the clips , / occupying their conscious working memory.",
    chunk_translation: "另一组参与者在观看视频时必须从1000开始以9为单位倒数， / 这占据了他们有意识的工作记忆。 / "
  },
  '4:11': {
    slashed_text: "But if you go on automatic pilot , / you’re fine.",
    chunk_translation: "但如果你进入“自动驾驶”状态， / 你就会表现得很好。"
  }
};

// Fix 4:3 chunks:
fixes2021['4:3'] = {
  slashed_text: "Another set of participants had to count backward from 1,000 / by nines as they watched the clips , / occupying their conscious working memory.",
  chunk_translation: "另一组参与者必须从1000开始倒数， / 在观看视频片段时以9为递减间隔， / 这占据了他们有意识的工作记忆。"
};

let count2021 = 0;
d2021.texts.forEach((textObj) => {
  const tid = textObj.text_id;
  textObj.sentences.forEach((s, sIdx) => {
    const key = `${tid}:${sIdx}`;
    if (fixes2021[key]) {
      s.slashed_text = fixes2021[key].slashed_text;
      s.chunk_translation = fixes2021[key].chunk_translation;
      count2021++;
    }
    const slChunks = s.slashed_text.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    const ckChunks = s.chunk_translation.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    if (slChunks.length !== ckChunks.length) {
      throw new Error(`2021 Text ${tid} Sentence ${sIdx+1} mismatch: ${slChunks.length} vs ${ckChunks.length}`);
    }
  });

  for (const para of textObj.paragraphs) {
    const sentsInPara = textObj.sentences.filter(s => s.pid === para.pid);
    para.slashed_text = sentsInPara.map(s => s.slashed_text).filter(Boolean).join(' / ');
    para.chunk_translation = sentsInPara.map(s => s.chunk_translation).filter(Boolean).join(' / ');
  }
});
fs.writeFileSync(f2021, JSON.stringify(d2021, null, 2) + '\n', 'utf8');
console.log(`2021 done, applied ${count2021} fixes.`);

// 2022
const f2022 = path.join(root, 'data/2022.json');
const d2022 = JSON.parse(fs.readFileSync(f2022, 'utf8'));

const fixes2022 = {
  // Text 4
  '4:1': {
    slashed_text: "But a new study published in Cognition found / that , in at least one real-world situation , / a single ethics lesson may have had lasting effects.",
    chunk_translation: "然而发表在《认知》期刊上的一项新研究发现， / 在至少一种现实生活情境中， / 单单一堂伦理道德课就可能产生持久的影响。"
  },
  '4:12': {
    slashed_text: "And if real , she notes , / it might be reversible by another nudge : / “Easy come , easy go.”",
    chunk_translation: "而且即使效果属实，她指出， / 它也可能被另一次心理助推所逆转： / 正所谓“来得容易，去得也快”。"
  }
};

let count2022 = 0;
d2022.texts.forEach((textObj) => {
  const tid = textObj.text_id;
  textObj.sentences.forEach((s, sIdx) => {
    const key = `${tid}:${sIdx}`;
    if (fixes2022[key]) {
      s.slashed_text = fixes2022[key].slashed_text;
      s.chunk_translation = fixes2022[key].chunk_translation;
      count2022++;
    }
    const slChunks = s.slashed_text.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    const ckChunks = s.chunk_translation.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    if (slChunks.length !== ckChunks.length) {
      throw new Error(`2022 Text ${tid} Sentence ${sIdx+1} mismatch: ${slChunks.length} vs ${ckChunks.length}`);
    }
  });

  for (const para of textObj.paragraphs) {
    const sentsInPara = textObj.sentences.filter(s => s.pid === para.pid);
    para.slashed_text = sentsInPara.map(s => s.slashed_text).filter(Boolean).join(' / ');
    para.chunk_translation = sentsInPara.map(s => s.chunk_translation).filter(Boolean).join(' / ');
  }
});
fs.writeFileSync(f2022, JSON.stringify(d2022, null, 2) + '\n', 'utf8');
console.log(`2022 done, applied ${count2022} fixes.`);
