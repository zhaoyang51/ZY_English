const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2015.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

const fixes = {
  // Text 1
  '1:2': {
    slashed_text: "Researchers measured people’s cortisol , / which is a stress marker , / while they were at work / and while they were at home / and found it higher / in what is supposed to be a haven.",
    chunk_translation: "研究人员测量了人们体内的皮质醇， / 这是一种压力标志物， / 当他们在工作时 / 以及当他们在家里时， / 并发现其水平更高 / 在原本应当是避风港的家中。"
  },
  '1:3': {
    slashed_text: "“Further contradicting conventional wisdom , / we found that women as well as men had lower levels of stress / at work / compared with at home ,” / one of the researchers , Sarah Damaske , wrote.",
    chunk_translation: "“进一步推翻传统认知的是， / 我们发现无论女性还是男性在工作中感受到的压力水平都更低， / 相比于 / 在家里，” / 其中一位研究人员萨拉·达马斯克写道。"
  },
  '1:14': {
    slashed_text: "On the home front , / however , / people have fewer colleagues / to share burdens with.",
    chunk_translation: "而在家庭阵地上， / 然而， / 人们很少有同事 / 可以共同分担负担。"
  },

  // Text 2
  '2:0': {
    slashed_text: "For years , studies have found / that first-generation college students — / those who do not have a parent with a college degree — / lag other students / on a range of education achievement factors.",
    chunk_translation: "多年以来，研究发现 / 第一代大学生—— / 即那些父母没有大学学历的学生—— / 落后于其他学生 / 在一系列学业成就指标上。"
  },
  '2:2': {
    slashed_text: "But since such students are most likely to advance economically / if they succeed in higher education , / colleges and universities have pushed for decades / to recruit more of them.",
    chunk_translation: "但由于这类学生最有可能实现经济状况的改善 / 如果他们在高等教育中取得成功， / 过去几十年来各大高校一直在努力 / 招收更多的此类学生。"
  },
  '2:3': {
    slashed_text: "This has created “a paradox” in that recruiting first-generation students , / but then watching many of them fail , / means that higher education has “continued to reproduce and widen , / rather than close” / an achievement gap based on social class , / according to the depressing beginning of a paper / forthcoming in the journal Psychological Science.",
    chunk_translation: "这造成了一种“悖论”：招收第一代大学生， / 随后却眼睁睁看着他们中许多人失败， / 意味着高等教育“一直在复制并拉大、 / 而不是缩小” / 基于社会阶层的成就差距， / 这正如一篇即将发表在《心理科学》期刊上的论文 / 那令人沮丧的开篇所言。"
  },

  // Text 3 - Comprehensive de-hallucination and 1:1 alignment
  '3:8': {
    slashed_text: "These terms are also intended to infuse work / with meaning — / and , as Rakesh Khurana , another professor , points out , / increase allegiance to the firm.",
    chunk_translation: "这些术语同时也旨在为工作注入 / 意义—— / 正如另一位教授拉凯什·库拉纳所指出的， / 增加对公司的忠诚度。"
  },
  '3:9': {
    slashed_text: "“You have the importation of terminology / that historically used to be associated with non-profit organizations and religious organizations : / terms like vision , values , passion , and purpose ,” / said Khurana.",
    chunk_translation: "“你可以看到那些术语的引入， / 它们在历史上曾经与非营利组织和宗教团体联系在一起： / 诸如远景、价值观、激情和目标等术语，” / 库拉纳说道。"
  },
  '3:10': {
    slashed_text: "This new focus on personal fulfillment / can help keep employees motivated / amid increasingly loud debates over work-life balance.",
    chunk_translation: "这种对个人价值实现的新关注 / 有助于保持员工的工作积极性， / 在有关工作与生活平衡的争论日益激烈的当下。"
  },
  '3:11': {
    slashed_text: "The “mommy wars” of the 1990s are still going on today , / prompting arguments about why women still can’t have it all / and books like Sheryl Sandberg’s Lean In , / whose title has become a buzzword in its own right.",
    chunk_translation: "20世纪90年代的“妈妈之争”在今天依然在上演， / 引发了关于为何女性仍然无法兼顾一切的争论， / 以及诸如谢丽尔·桑德伯格的《向前一步》等书籍的问世， / 该书的书名本身就已成为一个流行热词。"
  },
  '3:12': {
    slashed_text: "Terms like unplug , offline , life-hack , bandwidth , and capacity / are all about setting boundaries / between the office and the home.",
    chunk_translation: "诸如断网、离线、生活巧招、带宽以及负荷能力等用语 / 都是为了划清界限 / 在办公室与家庭之间。"
  },
  '3:13': {
    slashed_text: "But if your work is your “passion ,” / you’ll be more likely to devote yourself to it , / even if that means going home for dinner / and then working long after the kids are in bed.",
    chunk_translation: "但如果你的工作就是你的“激情所在”， / 你就更有可能全身心投入其中， / 即便这意味着回家吃顿晚饭， / 然后在孩子们入睡后继续工作很长时间。"
  },
  '3:14': {
    slashed_text: "But this seems to be the irony of office speak : / Everyone makes fun of it , / but managers love it , / companies depend on it , / and regular people willingly absorb it.",
    chunk_translation: "但这似乎正是职场语言的讽刺之处： / 每个人都拿它开玩笑调侃， / 但管理人员喜爱它， / 公司依赖它， / 普通员工也心甘情愿地吸收接纳它。"
  },
  '3:15': {
    slashed_text: "As a linguist once said , / “You can get people to think it’s nonsense / at the same time that you buy into it.” / In a workplace that’s fundamentally indifferent to your life and its meaning , / office speak can help you figure out how you relate to your work — / and how your work defines who you are.",
    chunk_translation: "正如一位语言学家曾经所说： / “你可以让人们觉得它是废话， / 与此同时却又欣然认同买账。” / 在一个本质上对你的生活及其意义漠不关心的职场中， / 职场语言能够帮助你理清自己与工作的关系—— / 以及你的工作如何定义你是谁。"
  },

  // Text 4 - Number repair, de-hallucination and exact alignment
  '4:0': {
    slashed_text: "Many people talked of the 288,000 new jobs / the Labor Department reported for June , / along with the drop in the unemployment rate to 6.1 percent , / as good news.",
    chunk_translation: "许多人将劳工部公布的 / 6月份28.8万个新增就业岗位， / 以及失业率降至6.1%的消息， / 视作大好消息。"
  },
  '4:3': {
    slashed_text: "We still have a long way to go / to get back to full employment , / but at least we are now finally moving forward / at a faster pace.",
    chunk_translation: "我们仍有很长的路要走 / 才能重返充分就业， / 但至少我们现在终于在前进， / 以更快的步伐。"
  },
  '4:5': {
    slashed_text: "There was a big jump in the number of people / who report voluntarily working part-time.",
    chunk_translation: "报告称自愿从事兼职工作的人数 / 出现了大幅激增。"
  },
  '4:6': {
    slashed_text: "This figure is now 830,000 (4.4 percent) / above its year ago level.",
    chunk_translation: "这一数字目前比一年前的高出83万人 / （增幅达4.4%）。"
  },
  '4:7': {
    slashed_text: "Before explaining the connection to the Obamacare , / it is worth making an important distinction.",
    chunk_translation: "在解释其与奥巴马医改的关系之前， / 有必要先做出一个重要的区分。"
  },
  '4:10': {
    slashed_text: "An increase in involuntary part-time work / is evidence of weakness in the labor market / and it means that many people / will be having a very hard time making ends meet.",
    chunk_translation: "非自愿兼职工作的增加 / 是劳动力市场疲软的证据， / 这意味着许多人 / 将在维持生计上经历非常艰难的时期。"
  },
  '4:12': {
    slashed_text: "Involuntary part-time employment is still far higher than before the recession , / but it is down by 640,000 (7.9 percent) / from its year ago level.",
    chunk_translation: "非自愿兼职就业人数仍然远高于衰退前的水平， / 但相比一年前的水平已经减少了64万人 / （降幅达7.9%）。"
  },
  '4:13': {
    slashed_text: "We know the difference / between voluntary and involuntary part-time employment / because people tell us.",
    chunk_translation: "我们之所以知道 / 自愿兼职与非自愿兼职就业的区别， / 是因为受访者如实告诉我们。"
  },
  '4:14': {
    slashed_text: "The survey used by the Labor Department / asks people / if they worked less than 35 hours / in the reference week.",
    chunk_translation: "劳工部采用的调查 / 会询问受访者， / 是否在该参考调查周内 / 工作时间少于35小时。"
  },
  '4:15': {
    slashed_text: "If the answer is “yes ,” / they are classified as working part-time.",
    chunk_translation: "如果回答是“是”， / 他们就会被归类为从事兼职工作。"
  },
  '4:16': {
    slashed_text: "The survey then asks / whether they worked less than 35 hours in that week / because they wanted to work less than full time / or because they had no choice.",
    chunk_translation: "随后调查会继续询问： / 他们在那一周工作少于35小时， / 是因为他们自己想做少于全职的工作， / 还是因为他们别无选择。"
  },
  '4:17': {
    slashed_text: "They are only classified as voluntary part-time workers / if they tell the survey taker / they chose to work less than 35 hours a week.",
    chunk_translation: "他们只有在告诉调查人员 / 自己是主动选择每周工作少于35小时的情况下， / 才会归类为自愿兼职工作者。"
  },
  '4:18': {
    slashed_text: "The issue of voluntary part-time relates to Obamacare / because one of the main purposes was to allow people / to get insurance outside of employment.",
    chunk_translation: "自愿兼职问题与奥巴马医改相关联， / 因为该法案的主要目的之一就是允许人们 / 在受雇工作之外获得医疗保险。"
  },
  '4:19': {
    slashed_text: "For many people , / especially those with serious health conditions / or family members with serious health conditions , / before Obamacare / the only way to get insurance / was through a job that provided health insurance.",
    chunk_translation: "对于许多人来说， / 特别是那些自身患有严重疾病、 / 或者有家庭成员患有严重疾病的人， / 在奥巴马医改之前， / 获得医保的唯一途径 / 就是通过一份提供医疗保险的工作。"
  },
  '4:20': {
    slashed_text: "However , Obamacare has allowed / more than 12 million people / to either get insurance through Medicaid / or the exchanges.",
    chunk_translation: "然而，奥巴马医改已经使得 / 超过1200万人 / 能够通过医疗补助计划 / 或健康保险交易市场获得保险。"
  },
  '4:21': {
    slashed_text: "These are people / who may previously have felt the need to get a full-time job that provided insurance / in order to cover themselves and their families.",
    chunk_translation: "这些人 / 先前可能觉得必须去获得一份提供医保的全职工作， / 以便为自己和家人提供保障。"
  },
  '4:22': {
    slashed_text: "With Obamacare / there is no longer a link / between employment and insurance.",
    chunk_translation: "有了奥巴马医改， / 就业与医疗保险之间 / 不再存在必然的绑定纽带。"
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
console.log(`Successfully refined 2015.json! Applied ${appliedCount} sentence fixes across 75 sentences.`);
