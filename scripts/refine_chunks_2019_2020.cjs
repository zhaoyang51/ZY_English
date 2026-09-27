const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 2019
const f2019 = path.join(root, 'data/2019.json');
const d2019 = JSON.parse(fs.readFileSync(f2019, 'utf8'));

const fixes2019 = {
  // Text 3
  '3:26': {
    slashed_text: "In effect , / the U.S. can import food / or it can import the workers / who pick it.",
    chunk_translation: "实际上， / 美国既可以进口农产品粮食， / 也可以引进劳工 / 来采摘这些粮食。"
  },
  // Text 4
  '4:2': {
    slashed_text: "The key messages / that have been put together / for World Environment Day do include a call / for governments to enact legislation to curb single-use plastics.",
    chunk_translation: "汇集整理起来的 / 核心宣传信息 / 为世界环境日确实包含一项呼吁： / 要求各国政府立法以遏制一次性塑料制品。"
  },
  '4:4': {
    slashed_text: "My concern / with leaving it up to the individual , / however , / is our limited sense of what needs to be achieved.",
    chunk_translation: "我的担忧 / 在于若将责任完全留给个人， / 然而， / 在于我们对究竟需要实现什么缺乏充分的认知。"
  },
  '4:14': {
    slashed_text: "It’s just that individual actions are too slow , / she says , / for that to be the only , / or even primary , / approach to changing widespread behavior.",
    chunk_translation: "只是个人行动的见效实在太慢， / 她说， / 不足以作为唯一的、 / 乃至主要的 / 改变广泛公众行为的途径。"
  },
  '4:18': {
    slashed_text: "We need progressive policies / that shape collective action , / alongside engaged citizens pushing / for change.",
    chunk_translation: "我们需要积极进取的政策 / 来引导塑造集体行动， / 同时需要积极参与的公民去共同推动 / 变革的发生。"
  }
};

let count2019 = 0;
d2019.texts.forEach((textObj) => {
  const tid = textObj.text_id;
  textObj.sentences.forEach((s, sIdx) => {
    const key = `${tid}:${sIdx}`;
    if (fixes2019[key]) {
      s.slashed_text = fixes2019[key].slashed_text;
      s.chunk_translation = fixes2019[key].chunk_translation;
      count2019++;
    }
    const slChunks = s.slashed_text.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    const ckChunks = s.chunk_translation.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    if (slChunks.length !== ckChunks.length) {
      throw new Error(`2019 Text ${tid} Sentence ${sIdx+1} mismatch: ${slChunks.length} vs ${ckChunks.length}`);
    }
  });

  for (const para of textObj.paragraphs) {
    const sentsInPara = textObj.sentences.filter(s => s.pid === para.pid);
    para.slashed_text = sentsInPara.map(s => s.slashed_text).filter(Boolean).join(' / ');
    para.chunk_translation = sentsInPara.map(s => s.chunk_translation).filter(Boolean).join(' / ');
  }
});
fs.writeFileSync(f2019, JSON.stringify(d2019, null, 2) + '\n', 'utf8');
console.log(`2019 done, applied ${count2019} fixes.`);

// 2020
const f2020 = path.join(root, 'data/2020.json');
const d2020 = JSON.parse(fs.readFileSync(f2020, 'utf8'));

const fixes2020 = {
  // Text 4
  '4:0': {
    slashed_text: "Now / that members of Generation Z are graduating college this spring — / the most commonly-accepted definition says this generation was born after 1995 , / give or take a year — / the attention has been rising steadily / in recent weeks.",
    chunk_translation: "如今 / 随着Z世代的成员将于今年春季大学毕业—— / 最普遍接受的定义是指1995年之后出生的一代人， / 误差在一岁左右—— / 公众对他们的关注度一直在稳步上升 / 在最近几周里。"
  },
  '4:15': {
    slashed_text: "“Millennials wanted more flexibility / in their lives , / ” notes Tanya Michelsen , / Associate Director of YouthSight , / a UK-based brand manager / that conducts regular 60-day surveys of British youth , / in findings / that might just as well apply to American youth.",
    chunk_translation: "“千禧一代希望拥有更多灵活性 / 在他们的生活中，” / 坦尼娅·米歇尔森指出， / 她是英国咨询机构YouthSight的副总监， / 该机构是一家英国品牌管理咨询公司， / 定期对英国青年开展每60天一次的追踪调查， / 其调查结果 / 可能同样适用于美国青年群体。"
  }
};

let count2020 = 0;
d2020.texts.forEach((textObj) => {
  const tid = textObj.text_id;
  textObj.sentences.forEach((s, sIdx) => {
    const key = `${tid}:${sIdx}`;
    if (fixes2020[key]) {
      s.slashed_text = fixes2020[key].slashed_text;
      s.chunk_translation = fixes2020[key].chunk_translation;
      count2020++;
    }
    const slChunks = s.slashed_text.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    const ckChunks = s.chunk_translation.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    if (slChunks.length !== ckChunks.length) {
      throw new Error(`2020 Text ${tid} Sentence ${sIdx+1} mismatch: ${slChunks.length} vs ${ckChunks.length}`);
    }
  });

  for (const para of textObj.paragraphs) {
    const sentsInPara = textObj.sentences.filter(s => s.pid === para.pid);
    para.slashed_text = sentsInPara.map(s => s.slashed_text).filter(Boolean).join(' / ');
    para.chunk_translation = sentsInPara.map(s => s.chunk_translation).filter(Boolean).join(' / ');
  }
});
fs.writeFileSync(f2020, JSON.stringify(d2020, null, 2) + '\n', 'utf8');
console.log(`2020 done, applied ${count2020} fixes.`);
