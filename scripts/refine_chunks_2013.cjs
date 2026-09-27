const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2013.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

const fixes = {
  // Text 1
  '1:0': {
    slashed_text: "In an essay entitled “Making It in America”, / the author Adam Davidson relates a joke from cotton country / about just how much a modern textile mill has been automated: / The average mill has only two employees today, / “a man and a dog.",
    chunk_translation: "在一篇题为《美国制造》的文章中 / 作者亚当·戴维森讲述了一个来自棉花之乡的笑话 / 涉及一家现代纺织厂的自动化程度究竟有多高： / 如今普通工厂只有两名雇员 / “一个人和一条狗。"
  },
  '1:2': {
    slashed_text: "Davidson’s article is one of a number of pieces / that have recently appeared making the point / that the reason we have such stubbornly high unemployment and declining middle-class incomes today / is largely because of the big drop in demand because of the Great Recession, / but it is also because of the advances in both globalization and the information technology revolution, / which are more rapidly than ever replacing labor / with machines or foreign workers.",
    chunk_translation: "戴维森的文章是最近出现的许多文章之一 / 这些文章阐明了这样一个观点： / 当今我们面临如此顽固的高失业率以及中产阶级收入下降的原因 / 很大程度上是由于大衰退带来的需求暴跌 / 但同时也源于全球化与信息技术革命的巨大推进 / 它们正以前所未有的速度替代劳动力 / 借助机器或外国劳工。"
  },

  // Text 2
  '2:9': {
    slashed_text: "We don’t need more categories, / but we need to change the way we think / about categories.",
    chunk_translation: "我们不需要划分更多的类别 / 而是需要改变我们的思考方式 / 关于如何看待类别划分。"
  },
  '2:16': {
    slashed_text: "They can manage to have a job in one place / and a family in another.",
    chunk_translation: "他们能够做到在一个地方工作 / 而在另一个地方安家立业。"
  },

  // Text 3
  '3:6': {
    slashed_text: "Psychologists at the University of Toronto / found that viewing a fast-food logo / for just a few milliseconds / primes us to read 20 percent faster, / even though reading has little to do with eating.",
    chunk_translation: "多伦多大学的心理学家 / 发现仅仅注视快餐标志 / 短短几毫秒 / 就会促使我们的阅读速度加快20% / 尽管阅读与进食几乎毫无关联。"
  },
  '3:10': {
    slashed_text: "If we know we will overreact to consumer products or housing options / when we see a happy face (one reason good sales representatives and real estate agents are always smiling), / we can take a moment / before buying.",
    chunk_translation: "如果我们知道自己会对消费品或房产选择过度反应 / 当我们看到一张笑脸时（这是优秀销售和房产中介总是面带微笑的原因） / 我们可以在下单前暂停片刻 / 慎重考虑后再做购买。"
  },
  '3:13': {
    slashed_text: "When Dr. Gottman really wants to assess / whether a couple will stay together, / he invites them to his island retreat / for a much longer evaluation: / two days, not two seconds.",
    chunk_translation: "当戈特曼博士真正想要评估 / 一对夫妻是否能白头偕老时 / 他会邀请他们到自己的海岛度假处 / 进行时间更长的评估： / 整整两天，而非区区两秒。"
  },
  '3:14': {
    slashed_text: "Our ability to mute our hard-wired reactions by pausing / is what differentiates us from animals: / dogs can think about the future / only intermittently or for a few minutes.",
    chunk_translation: "我们通过停顿来克制本能反应的能力 / 正是将我们与动物区分开来的本质所在： / 狗思考未来的能力 / 只能是断断续续的或是短短几分钟。"
  },

  // Text 4
  '4:9': {
    slashed_text: "“Personally, I don’t like quotas,” / Reding said recently.",
    chunk_translation: "“就我个人而言，我不喜欢配额制” / 雷丁最近表示。"
  },
  '4:10': {
    slashed_text: "“But I like what the quotas do.” / Quotas get action: / they “open the way to equality and they break through the glass ceiling,” according to Reding, / a result seen in France and other countries / with legally binding provisions / on placing women in top business positions.",
    chunk_translation: "“但我喜欢配额带来的成效。” / 配额带来了切实行动： / 雷丁指出，它们“开辟了通向平等的道路并打破了玻璃天花板” / 这一成效已在法国等国显现 / 这些国家出台了具有法律约束力的条款 / 旨在让女性进入企业最高决策层。"
  },
  '4:15': {
    slashed_text: "When women do break through to the summit of corporate power — / as, for example, Sheryl Sandberg recently did at Facebook — / they attract massive attention precisely / because they remain the exception to the rule.",
    chunk_translation: "当女性真正冲破阻碍登上企业权力的顶峰时—— / 比如谢丽尔·桑德伯格最近在脸书的作为—— / 她们之所以引来极大的关注 / 恰恰因为她们依然属于常规之外的特例。"
  },
  '4:16': {
    slashed_text: "If appropriate public policies were in place / to help all women — / whether CEOs or their children’s caregivers — / and all families, / Sandberg would be no more newsworthy / than any other highly capable person living in a more just society.",
    chunk_translation: "如果恰当的公共政策能够落实到位 / 去帮助所有女性—— / 无论是首席执行官还是照料孩子的保姆—— / 以及所有的家庭 / 桑德伯格就绝不会比其他能人更具新闻轰动性 / 只要生活在一个更加公正的社会当中。"
  }
};

let appliedCount = 0;
d.texts.forEach((textObj) => {
  const tid = textObj.text_id;
  textObj.sentences.forEach((s, sIdx) => {
    const key = `${tid}:${sIdx}`;
    if (fixes[key]) {
      s.slashed_text = fixes[key].slashed_text;
      s.chunk_translation = fixes[key].chunk_translation;
      appliedCount++;
    }

    // Verify 1:1 chunk count between slashed_text and chunk_translation
    const slChunks = s.slashed_text.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    const ckChunks = s.chunk_translation.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    if (slChunks.length !== ckChunks.length) {
      throw new Error(`Text ${tid} Sentence ${sIdx+1} chunk count mismatch: ${slChunks.length} vs ${ckChunks.length}\nSL: ${s.slashed_text}\nCK: ${s.chunk_translation}`);
    }
  });

  // Re-assemble paragraphs
  for (const para of textObj.paragraphs) {
    const sentsInPara = textObj.sentences.filter(s => s.pid === para.pid);
    para.slashed_text = sentsInPara.map(s => s.slashed_text).filter(Boolean).join(' / ');
    para.chunk_translation = sentsInPara.map(s => s.chunk_translation).filter(Boolean).join(' / ');
  }
});

fs.writeFileSync(file, JSON.stringify(d, null, 2) + '\n', 'utf8');
console.log(`Successfully refined 2013.json! Applied ${appliedCount} sentence fixes across 71 sentences.`);
