const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2012.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

// Fixes map keyed by text_id (1-based) and sentence_index (0-based)
const fixes = {
  // Text 1
  '1:0': {
    slashed_text: "Homework has never been terribly popular / with students and even many parents, / but in recent years / it has been particularly scorned.",
    chunk_translation: "家庭作业向来不太受欢迎 / 在学生乃至许多家长当中 / 但在近年来 / 它尤其备受指责。"
  },
  '1:1': {
    slashed_text: "School districts across the country, / most recently Los Angeles Unified, / are revising their thinking / on this educational ritual.",
    chunk_translation: "全国各地的学区 / 最近的是洛杉矶联合学区 / 正在修正他们的看法 / 对这种教育惯例。"
  },
  '1:6': {
    slashed_text: "Certainly, / no homework should be assigned / that students cannot complete on their own / or that they cannot do / without expensive equipment.",
    chunk_translation: "诚然 / 不应布置这样的家庭作业 / 即学生无法独立完成的作业 / 或者没有昂贵设备 / 就无法完成的作业。"
  },
  '1:7': {
    slashed_text: "But if the district is essentially giving a pass / to students who do not do their homework / because of complicated family lives, / it is going riskily close to the implication / that standards need to be lowered / for poor children.",
    chunk_translation: "但如果学区实质上是在放任通融 / 那些不做家庭作业的学生 / 因为家庭生活复杂 / 那么它就极其危险地接近了这样一种暗示 / 即评判标准需要被降低 / 针对贫困儿童。"
  },
  '1:10': {
    slashed_text: "Some students might do well on state tests / without completing their homework, / but what about the students / who performed well on the tests / and did their homework?",
    chunk_translation: "有些学生在州级统考中可能成绩不错 / 哪怕没有完成家庭作业 / 但那些学生又该如何呢 / 他们在考试中表现优异 / 并且认真完成了家庭作业？"
  },
  '1:13': {
    slashed_text: "At the same time, / the policy addresses none of the truly thorny questions / about homework.",
    chunk_translation: "与此同时 / 该政策丝毫没有解决真正棘手的问题 / 关于家庭作业。"
  },

  // Text 2
  '2:4': {
    slashed_text: "Girls’ attraction to pink may seem unavoidable, / somehow encoded in their DNA, / but according to Jo Paoletti, / an associate professor of American Studies, / it is not.",
    chunk_translation: "女孩对粉色的偏爱看似不可避免 / 似乎早已编码进她们的DNA之中 / 但据乔·保莱蒂表示 / 一位美国研究副教授 / 事实并非如此。"
  },
  '2:13': {
    slashed_text: "Turns out, / according to Daniel Cook, / a historian of childhood consumerism, / it was popularised as a marketing trick / by clothing manufacturers in the 1930s.",
    chunk_translation: "事实证明 / 据丹尼尔·库克所述 / 一位儿童消费主义历史学家 / 它是作为一种营销策略被推广的 / 由20世纪30年代的服装制造商。"
  },

  // Text 3
  '3:4': {
    slashed_text: "The Biotechnology Industry Organisation (BIO), / a trade group, / assured members / that this was just a “preliminary step” / in a longer battle.",
    chunk_translation: "生物技术产业组织（BIO） / 一个行业贸易团体 / 向会员保证 / 这只是一个“初步步骤” / 在一场更漫长的战役中。"
  },
  '3:8': {
    slashed_text: "But as companies continue their attempts / at personalised medicine, / the courts will remain rather busy.",
    chunk_translation: "但随着各公司继续尝试 / 开展个性化医疗 / 法院仍将相当忙碌。"
  },
  '3:19': {
    slashed_text: "Companies are unlikely to file many more patents / for human DNA molecules — / most are already patented / or in the public domain.",
    chunk_translation: "各公司不太可能再申请大量专利 / 针对人类DNA分子—— / 大多数要么已被授予专利 / 要么已进入公有领域。"
  },

  // Text 4
  '4:4': {
    slashed_text: "Many said / that unemployment, while extremely painful, / had improved them in some ways; / they had become less materialistic / and more financially prudent; / they were more aware of the struggles of others.",
    chunk_translation: "许多人表示 / 失业虽然极其痛苦 / 却在某些方面使他们有所提升； / 他们变得不再那么物质至上 / 在财务上也更为审慎； / 他们更深刻地体察到了他人的挣扎。"
  },
  '4:12': {
    slashed_text: "The research of Till Von Wachter, / the economist at Columbia University, / suggests / that not all people graduating into a recession / see their life chances dimmed: / those with degrees from elite universities / catch up fairly quickly / to where they otherwise would have been / if they had graduated in better times; / it is the masses beneath them / that are left behind.",
    chunk_translation: "蒂尔·冯·瓦赫特的研究 / 哥伦比亚大学经济学家 / 表明 / 并非所有在经济衰退期毕业的人 / 人生前景都会黯淡： / 拥有精英大学学位的人 / 能相当迅速地赶上 / 他们本应达到的发展水平 / 如果他们是在更好的时期毕业； / 唯有处于他们之下的普通大众 / 才会被抛在身后。"
  },
  '4:13': {
    slashed_text: "In the Internet age, / it is particularly easy to see / the resentment / that has always been hidden within American society.",
    chunk_translation: "在互联网时代 / 尤其容易看清 / 那种怨恨情绪 / 始终隐匿于美国社会内部。"
  },
  '4:16': {
    slashed_text: "America was more socially tolerant / entering this recession / than at any time in its history, / and a variety of national polls on social conflict / since then have shown mixed results.",
    chunk_translation: "美国具有更高的社会包容度 / 在步入此次经济衰退时 / 相比其历史上的任何时期 / 而自那时以来关于社会冲突的多项全国民调 / 呈现出喜忧参半的结果。"
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
console.log(`Successfully refined 2012.json! Applied ${appliedCount} sentence fixes across 82 sentences.`);
