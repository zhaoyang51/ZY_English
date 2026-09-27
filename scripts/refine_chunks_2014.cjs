const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2014.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

const fixes = {
  // Text 1
  '1:0': {
    slashed_text: "What would you do with $590m? / This is now a question / for Gloria MacKenzie , / an 84-year-old widow / who recently emerged from her small , tin-roofed house / in Florida to collect the biggest undivided lottery jackpot / in history.",
    chunk_translation: "你会用5.9亿美元做什么？ / 这现在成了一个问题 / 摆在格洛丽亚·麦肯齐面前， / 一位84岁的寡妇， / 她最近走出自己在佛罗里达州那间狭小的铁皮屋顶房屋， / 前去领取了历史上单人独揽的最大彩票大奖， / 创下历史纪录。"
  },
  '1:14': {
    slashed_text: "Yet the link between feeling good and spending money / on others can be seen among rich and poor people around the world , / and scarcity enhances the pleasure of most things / for most people.",
    chunk_translation: "然而自我感觉良好与花钱之间的联系 / 在为他人花钱这件事上，可以在世界各地的富人和穷人中看到， / 而且稀缺性会增加大多数事物带来的愉悦感 / 对大多数人而言。"
  },
  '1:15': {
    slashed_text: "Not everyone will agree with the authors’ policy ideas , / which range from mandating more holiday time / to reducing tax incentives / for American homebuyers.",
    chunk_translation: "并非每个人都会赞同作者们的政策构想， / 这些构想从强制规定更多休假时间 / 到减少税收优惠 / 针对美国购房者。"
  },

  // Text 2 - Full alignment and de-hallucination
  '2:0': {
    slashed_text: "An article / in Scientific American has pointed out / that empirical research says / that , actually , / you think you’re more beautiful / than you are.",
    chunk_translation: "一篇文章 / 发表在《科学美国人》上指出， / 实证研究表明， / 实际上， / 你认为自己更美丽 / 相比于你真实的模样。"
  },
  '2:1': {
    slashed_text: "We have a deep-seated need to feel good / about ourselves / and we naturally employ a number of self-enhancing strategies / to achieve this.",
    chunk_translation: "我们有一种根深蒂固的需求去自我感觉良好， / 对待我们自己， / 我们自然会采用一系列自我提升策略 / 来达到这一目的。"
  },
  '2:2': {
    slashed_text: "Social psychologists have amassed oceans of research / into what they call the “above average effect” , or “illusory superiority” , / and shown that , for example , / 70 % of us rate ourselves as above average in leadership , / 93 % in driving / and 85 % at getting on well with others — / all obviously statistical impossibilities.",
    chunk_translation: "社会心理学家积累了海量的研究 / 关于他们所称的“高于平均水平效应”或“虚幻优越感”， / 并表明，例如， / 我们当中有70%的人认为自己在领导力方面高于平均水平， / 93%的人认为自己在驾驶方面高于平均水平， / 85%的人认为自己在与他人融洽相处方面高于平均水平—— / 这些显然在统计学上都是不可能的。"
  },
  '2:3': {
    slashed_text: "We rose-tint our memories / and put ourselves / into self-affirming situations.",
    chunk_translation: "我们粉饰自己的回忆， / 并让自己置身于 / 自我肯定的情境中。"
  },
  '2:4': {
    slashed_text: "We become defensive / when criticised , / and apply negative stereotypes to others / to boost our own esteem.",
    chunk_translation: "我们变得具有防御性 / 当受到批评时， / 并且对他人套用负面的刻板印象 / 来提升我们自己的自尊。"
  },
  '2:5': {
    slashed_text: "We stalk around / thinking we’re hot stuff.",
    chunk_translation: "我们昂首阔步地走来走去， / 自以为不可一世。"
  },
  '2:6': {
    slashed_text: "Psychologist and behavioural scientist Nicholas Epley oversaw a key study / into self- enhancement and attractiveness.",
    chunk_translation: "心理学家兼行为科学家尼古拉斯·埃普利主持了一项关键研究， / 探讨自我美化与吸引力。"
  },
  '2:7': {
    slashed_text: "Rather than have people simply rate their beauty / compared with others , / he asked them to identify an original photograph of themselves / from a lineup including versions / that had been altered to appear more and less attractive.",
    chunk_translation: "他没有让人们简单地评价自己的外貌 / 与他人相比， / 而是让他们从一组照片中辨认出自己原始的照片， / 其中包含经过修改的版本， / 分别使其显得更有吸引力或更无吸引力。"
  },
  '2:8': {
    slashed_text: "Visual recognition , reads the study , / is “an automatic psychological process , / occurring rapidly and intuitively / with little or no apparent conscious deliberation.” / If the subjects quickly chose a falsely flattering image — / which most did — / they genuinely believed it was really how they looked.",
    chunk_translation: "该研究指出，视觉识别 / 是“一种自动的心理过程， / 迅速且直觉地发生， / 几乎或完全不需要显式的意识深思熟虑。” / 如果受试者迅速选择了一张虚假美化的照片—— / 大多数人确实如此—— / 他们就真心认为那正是自己真实的模样。"
  },
  '2:9': {
    slashed_text: "Epley found no significant gender difference / in responses.",
    chunk_translation: "埃普利没有发现显著的性别差异 / 在反应结果上。"
  },
  '2:10': {
    slashed_text: "Nor was there any evidence / that those who self-enhanced the most / (that is , the participants who thought the most positively doctored picture were real) / were doing so to make up for profound insecurities.",
    chunk_translation: "也没有任何证据表明， / 那些自我美化程度最高的人 / （即那些认为修饰得最漂亮的照片才是真实照片的参与者） / 这么做是为了弥补内心深处的不安全感。"
  },
  '2:11': {
    slashed_text: "In fact , / those who thought that the images higher up the attractiveness scale were real / directly corresponded with those / who showed other markers / for having higher self-esteem.",
    chunk_translation: "事实上， / 那些认为吸引力评分更高的照片才是真实照片的人， / 直接对应着那些 / 表现出拥有更高自尊心 / 其他指标的人。"
  },
  '2:12': {
    slashed_text: "“I don’t think the findings that we have / are any evidence of personal delusion ,” / says Epley.",
    chunk_translation: "“我不认为我们所获得的调查结果 / 是个人妄想的任何证据，” / 埃普利说。"
  },
  '2:13': {
    slashed_text: "“It’s a reflection simply of people generally thinking well of themselves.” / If you are depressed , / you won’t be self-enhancing.",
    chunk_translation: "“这仅仅反映了人们普遍对自己评价良好。” / 如果你感到抑郁， / 你就不会进行自我美化。"
  },
  '2:14': {
    slashed_text: "Knowing the results of Epley’s study , / it makes sense / that many people hate photographs of themselves viscerally — / on one level , / they don’t even recognise the person in the picture as themselves.",
    chunk_translation: "了解到埃普利的研究结果， / 这就说得通了： / 为什么许多人本能地讨厌自己的照片—— / 在某种层面上， / 他们甚至认不出照片中的人就是自己。"
  },
  '2:15': {
    slashed_text: "Facebook therefore , / is a self-enhancer’s paradise , / where people can share only the most flattering photos , / the cream of their wit , / style , beauty , intellect and lifestyle.",
    chunk_translation: "脸书因此 / 是自我美化者的天堂， / 在那里人们可以只分享最诱人的照片、 / 他们机智的精华、 / 以及风度、美貌、才智与生活方式的最佳面貌。"
  },
  '2:16': {
    slashed_text: "It’s not that people’s profiles are dishonest , / says Catalina Toma of Wisconsin-Madison University , / “but they portray an idealised version of themselves.”",
    chunk_translation: "“这并不是说人们的个人资料不诚实，” / 威斯康星大学麦迪逊分校的卡塔利娜·托马说， / “而是他们描绘了一个理想化的自己。”"
  },

  // Text 3
  '3:0': {
    slashed_text: "The concept of man versus machine / is at least as old as the industrial revolution , / but this phenomenon tends to be most acutely felt / during economic downturns and fragile recoveries.",
    chunk_translation: "人机竞争的概念 / 至少和工业革命一样古老， / 但这种现象往往最深刻地被人们感受到 / 在经济低迷与脆弱复苏时期。"
  },
  '3:4': {
    slashed_text: "When there is rapid improvement / in the price and performance of technology , / jobs that were once thought to be immune from automation / suddenly become threatened.",
    chunk_translation: "当出现快速改善时 / 在技术的性价比方面， / 那些曾经被认为免于自动化的工作岗位 / 突然面临威胁。"
  },
  '3:7': {
    slashed_text: "And yet , / John Hagel , / author of The Power of Pull and other books , / says Brynjolfsson and McAfee miss the reason / why these jobs are so vulnerable to technology in the first place.",
    chunk_translation: "然而， / 约翰·哈格尔， / 《拉动力》等书的作者， / 认为布林约尔松和麦卡菲忽略了一个根本原因： / 为什么这些岗位从一开始就如此容易受到技术的冲击。"
  },
  '3:8': {
    slashed_text: "Hagel says we have designed jobs in the U.S.",
    chunk_translation: "哈格尔表示，我们在美国设计工作岗位的方式"
  },
  '3:9': {
    slashed_text: "that tend to be “tightly scripted” and “highly standardized” ones / that leave no room for “individual initiative or creativity.” / In short , / these are the types of jobs / that machines can perform much better / at than human beings.",
    chunk_translation: "往往倾向于“高度按既定程序行事”与“高度标准化”， / 没有给“个人主动性或创造力”留下任何空间。 / 简而言之， / 这些类型的工作 / 机器能做得远远更好 / 相比于人类。"
  },
  '3:10': {
    slashed_text: "That is how we have put a giant target sign / on the backs of American workers , / Hagel says.",
    chunk_translation: "这就是我们如何把一个巨大的瞄准靶心 / 贴在美国工人的背上， / 哈格尔说。"
  },
  '3:11': {
    slashed_text: "It’s time to reinvent the formula for how work is conducted , / since we are still relying on a very 20th century notion of work , / Hagel says.",
    chunk_translation: "现在是时候重塑工作的开展模式了， / 因为我们仍然依赖于非常20世纪的工作观念， / 哈格尔说。"
  },
  '3:12': {
    slashed_text: "In our rapidly changing economy , / we more than ever need people in the workplace / who can take initiative and exercise their imagination “to respond to unexpected events.” / That is not something machines are good at.",
    chunk_translation: "在我们飞速变化的经济环境中， / 我们比以往任何时候都更需要职场中的员工 / 能够发挥主动性并运用想象力“来应对突发事件”。 / 这绝非机器所擅长的事情。"
  },
  '3:13': {
    slashed_text: "They are designed / to perform very predictable activities.",
    chunk_translation: "它们被设计出来 / 专门执行高度可预测的活动。"
  },
  '3:14': {
    slashed_text: "As Hagel notes , / Brynjolfsson and McAfee indeed touched / on this point / in their book.",
    chunk_translation: "正如哈格尔所指出的， / 布林约尔松和麦卡菲确实涉及了 / 这一点 / 在他们的书中。"
  },
  '3:15': {
    slashed_text: "We need to reframe / race against the machine / as race with the machine .",
    chunk_translation: "我们需要重构这一理念： / 将“与机器赛跑竞争” / 转化为“与机器同行协同”。"
  },
  '3:16': {
    slashed_text: "In other words , / we need to look at the ways in / which machines can augment human labor / rather than replace it.",
    chunk_translation: "换句话说， / 我们需要审视各种途径， / 在这些途径中机器能够增强人类劳动力， / 而不是替代它。"
  },
  '3:17': {
    slashed_text: "So then the problem is not really / about technology , / but rather , / “how do we innovate our institutions and our work practices?”",
    chunk_translation: "因此问题的核心并不真正 / 在于技术本身， / 而是， / “我们如何革新我们的体制和我们的工作实践？”"
  },

  // Text 4
  '4:0': {
    slashed_text: "When the government talks / about infrastructure contributing to the economy / the focus is usually / on roads , railways , broadband and energy.",
    chunk_translation: "当政府谈论 / 基础设施对经济的贡献时， / 焦点通常集中在 / 公路、铁路、宽带和能源上。"
  },
  '4:4': {
    slashed_text: "We have not been good / at communicating the real value / that housing can contribute to economic growth.",
    chunk_translation: "我们一直不擅长 / 传达真实价值 / 即住房能对经济增长做出的贡献。"
  },
  '4:6': {
    slashed_text: "It is hard to shove / for attention among multibillion-pound infrastructure projects , / so it is inevitable / that the attention is focused elsewhere.",
    chunk_translation: "很难去挤位争抢关注 / 在那些价值数十亿英镑的基础设施项目中， / 因此不可避免的是 / 注意力被吸引到了其他地方。"
  },
  '4:7': {
    slashed_text: "But perhaps the most significant reason is / that the issue has always been so politically charged.",
    chunk_translation: "但也许最重要的原因是 / 这一问题历来都极具政治敏感性。"
  },
  '4:8': {
    slashed_text: "Nevertheless , / the affordable housing situation is desperate.",
    chunk_translation: "尽管如此， / 保障性住房的形势依然十分严峻。"
  },
  '4:13': {
    slashed_text: "The communities minister , / Don Foster , / has hinted / that George Osborne , Chancellor of the Exchequer , / may introduce more flexibility / to the current cap on the amount / that local authorities can borrow against their housing stock debt.",
    chunk_translation: "社区事务大臣 / 唐·福斯特 / 已经暗示， / 财政大臣乔治·奥斯本 / 可能会引入更大的灵活性 / 针对目前的借贷上限， / 即地方当局以其存量住房债务为抵押所能借贷的金额。"
  },
  '4:14': {
    slashed_text: "Evidence shows / that 60,000 extra new homes could be built / over the next five years / if the cap were lifted , / increasing GDP by 0.6%.",
    chunk_translation: "证据表明， / 可以额外建造6万套新住房 / 在未来五年内， / 如果借贷上限被放宽， / 并使国内生产总值增长0.6%。"
  },
  '4:15': {
    slashed_text: "Ministers should also look / at creating greater certainty in the rental environment , / which would have a significant impact on the ability of registered providers to fund new developments / from revenues.",
    chunk_translation: "部长们还应该着眼于 / 在租赁环境中创造更大的确定性， / 这将对注册住房提供商依靠租金收入资助新开发项目的能力 / 产生重大影响。"
  },
  '4:17': {
    slashed_text: "While these measures would be welcome in the short term , / we must face up to the fact / that the existing ￡4.5bn programme of grants to fund new affordable housing , / set to expire in 2015 , / is unlikely to be extended beyond then.",
    chunk_translation: "尽管这些举措在短期内会受到欢迎， / 但我们必须正视这一事实： / 现有的45亿英镑资助新建保障性住房的拨款计划 / 预计将于2015年到期， / 之后极不可能再获得展期。"
  },
  '4:18': {
    slashed_text: "The Labour party has recently announced / that it will retain a large part of the coalition’s spending plans / if it returns to power.",
    chunk_translation: "工党最近宣布， / 它将保留执政联盟支出计划的大部分内容， / 如果它重新执政。"
  },
  '4:19': {
    slashed_text: "The housing sector needs to accept / that we are very unlikely to ever return to the era of large-scale public grants.",
    chunk_translation: "住房部门需要接受这一现实： / 我们极不可能再回到大规模公共拨款的时代。"
  },
  '4:21': {
    slashed_text: "While the government’s commitment to long-term funding may have changed , / the very pressing need / for more affordable housing is real and is not going away.",
    chunk_translation: "虽然政府对长期资金的承诺可能已经改变， / 但对更多保障性住房的紧迫需求 / 是实实在在的，而且不会自行消失。"
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
console.log(`Successfully refined 2014.json! Applied ${appliedCount} sentence fixes across 74 sentences.`);
