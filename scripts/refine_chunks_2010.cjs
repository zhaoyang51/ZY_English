const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2010.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

// ----------------------------------------------------
// Text 1 (19 sentences)
// ----------------------------------------------------
const t1_refined = [
  {
    slashed_text: "The longest bull run in a century of art-market history / ended on a dramatic note / with a sale of 56 works / by Damien Hirst, / Beautiful Inside My Head Forever, / at Sotheby’s in London / on September 15th 2008.",
    chunk_translation: "艺术市场一个世纪历史上最长的牛市 / 戏剧性地终结了 / 伴随着56件作品的拍卖 / 出自达明安·赫斯特之手 / 《我脑中永存的美丽》 / 在伦敦苏富比拍卖行 / 于2008年9月15日"
  },
  {
    slashed_text: "All but two pieces sold, / fetching more than £70m, / a record for a sale by a single artist.",
    chunk_translation: "除两件作品外全部售出 / 成交额超过7000万英镑 / 创下单场由单一个人艺术家作品拍卖的纪录"
  },
  {
    slashed_text: "It was a last victory.",
    chunk_translation: "这是最后的胜利。"
  },
  {
    slashed_text: "As the auctioneer called out bids, / in New York / one of the oldest banks on Wall Street, / Lehman Brothers, / filed for bankruptcy.",
    chunk_translation: "正当拍卖师喊出竞价时 / 在纽约 / 华尔街最古老的银行之一 / 雷曼兄弟 / 申请了破产"
  },
  {
    slashed_text: "The world art market / had already been losing momentum for a while / after rising bewilderingly / since 2003.",
    chunk_translation: "全球艺术品市场 / 在一段时间内就已在失去势头 / 在经历了令人眼花缭乱的上涨之后 / 自2003年以来"
  },
  {
    slashed_text: "At its peak in 2007 / it was worth some $65 billion, / reckons Clare McAndrew, / founder of Arts Economics, a research firm — / double the figure five years earlier.",
    chunk_translation: "在2007年的顶峰时期 / 其价值约为650亿美元 / 克莱尔·麦克安德鲁估计 / 艺术经济学研究公司的创始人 / 是五年前数字的两倍"
  },
  {
    slashed_text: "Since then / it may have come down to $50 billion.",
    chunk_translation: "自那时起 / 其价值可能已降至500亿美元"
  },
  {
    slashed_text: "But the market generates interest far beyond its size / because it brings together great wealth, / enormous egos, / greed, / passion and controversy / in a way matched by few other industries.",
    chunk_translation: "但该市场引发的关注远超其规模 / 因为它汇聚了巨大财富 / 极度的自负 / 贪婪 / 激情与争议 / 以极少有其他行业能够比拟的方式"
  },
  {
    slashed_text: "In the weeks and months / that followed Mr. Hirst’s sale, / spending of any sort / became deeply unfashionable.",
    chunk_translation: "在接下来的数周和数月里 / 在赫斯特先生的拍卖会之后 / 任何形式的消费 / 都变得极不合时宜"
  },
  {
    slashed_text: "In the art world / that meant collectors stayed away / from galleries and salerooms.",
    chunk_translation: "在艺术界 / 这意味着收藏家远离了 / 画廊和拍卖场"
  },
  {
    slashed_text: "Sales of contemporary art fell by two-thirds, / and in the most overheated sector, / they were down by nearly 90% / in the year to November 2008.",
    chunk_translation: "当代艺术品的销售额下降了三分之二 / 而在最过热的领域 / 销售额下降了近90% / 在截至2008年11月的一年中"
  },
  {
    slashed_text: "Within weeks / the world’s two biggest auction houses, / Sotheby’s and Christie’s, / had to pay out nearly $200m in guarantees / to clients who had placed works for sale with them.",
    chunk_translation: "数周之内 / 全球最大的两家拍卖行 / 苏富比和佳士得 / 不得不支付近2亿美元的担保金 / 给将作品委托给他们出售的客户"
  },
  {
    slashed_text: "The current downturn in the art market / is the worst / since the Japanese stopped buying Impressionists / at the end of 1989.",
    chunk_translation: "当前艺术市场的低迷 / 是最严重的一次 / 自日本人停止购买印象派画作以来 / 在1989年底"
  },
  {
    slashed_text: "This time experts reckon / that prices are about 40% down on their peak / on average, / though some have been far more fluctuant.",
    chunk_translation: "这一次专家们估计 / 价格相比峰值下降了约40% / 平均而言 / 尽管有些价格的波动要大得多"
  },
  {
    slashed_text: "But Edward Dolman, / Christie’s chief executive, / says: / “I’m pretty confident we’re at the bottom.”",
    chunk_translation: "但爱德华·多尔曼 / 佳士得首席执行官 / 说道： / “我非常有信心我们正处于谷底。”"
  },
  {
    slashed_text: "What makes this slump different from the last, / he says, / is that / there are still buyers in the market.",
    chunk_translation: "使这次暴跌不同于上次的地方 / 他说 / 在于 / 市场上依然存在买家"
  },
  {
    slashed_text: "Almost everyone / who was interviewed for this special report said / that the biggest problem at the moment / is not a lack of demand / but a lack of good work to sell.",
    chunk_translation: "几乎所有人 / 接受本专题报告采访的人都表示 / 目前最大的问题 / 不是缺乏需求 / 而是缺乏可售的好作品"
  },
  {
    slashed_text: "The three Ds — / death, debt and divorce — / still deliver works of art to the market.",
    chunk_translation: "“3D”因素—— / 死亡、债务与离婚—— / 依然向市场输送着艺术品"
  },
  {
    slashed_text: "But anyone who does not have to sell / is keeping away, / waiting for confidence to return.",
    chunk_translation: "但任何非必须变现的人 / 都在远离市场 / 等待信心的回归"
  }
];

// ----------------------------------------------------
// Text 2 (16 sentences)
// ----------------------------------------------------
const t2_refined = [
  {
    slashed_text: "I was addressing a small gathering in a suburban Virginia living room — / a women’s group / that had invited men to join them.",
    chunk_translation: "我当时正在弗吉尼亚郊区的一间客厅里向一个小型聚会发表演讲—— / 这是一个女性团体 / 她们邀请了男性加入她们"
  },
  {
    slashed_text: "Throughout the evening, / one man had been particularly talkative, / frequently offering ideas and anecdotes, / while his wife sat silently beside him on the couch.",
    chunk_translation: "整个晚上 / 一名男子表现得格外健谈 / 频繁地发表观点并分享轶事 / 而他的妻子则静静地坐在沙发上他身边"
  },
  {
    slashed_text: "Toward the end of the evening, / I commented / that women frequently complain / that their husbands don’t talk to them.",
    chunk_translation: "在傍晚聚会快结束时 / 我评论道 / 女性经常抱怨 / 她们的丈夫不跟她们说话"
  },
  {
    slashed_text: "This man quickly nodded in agreement.",
    chunk_translation: "这名男子迅速点头表示赞同。"
  },
  {
    slashed_text: "He gestured toward his wife and said, / “She’s the talker in our family.” / The room burst into laughter; / the man looked puzzled and hurt.",
    chunk_translation: "他指着妻子说道 / “在我们家里她才爱说话。” / 满屋子人都哄堂大笑； / 那个男人显得既困惑又伤心。"
  },
  {
    slashed_text: "“It’s true,” he explained.",
    chunk_translation: "“这是真的，”他解释道。"
  },
  {
    slashed_text: "“When I come home from work, / I have nothing to say.",
    chunk_translation: "“当我下班回家时 / 我就无话可说了。"
  },
  {
    slashed_text: "If she didn’t keep the conversation going, / we’d spend the whole evening in silence.”",
    chunk_translation: "如果不是她一直维持着谈话 / 我们整个晚上都会在沉默中度过。”"
  },
  {
    slashed_text: "This episode crystallizes the irony / that although American men tend to talk more than women in public situations, / they often talk less at home.",
    chunk_translation: "这一插曲生动体现了这种讽刺现象： / 尽管在公共场合美国男性往往比女性话更多 / 但在家里他们往往话更少"
  },
  {
    slashed_text: "And this pattern / is wreaking havoc with marriage.",
    chunk_translation: "而这种模式 / 正在严重破坏婚姻关系。"
  },
  {
    slashed_text: "The pattern was observed by political scientist Andrew Hacker / in the late 1970s.",
    chunk_translation: "这种模式在20世纪70年代末 / 就被政治学家安德鲁·哈克观察到了。"
  },
  {
    slashed_text: "Sociologist Catherine Kohler Riessman reports in her new book Divorce Talk / that most of the women she interviewed — / but only a few of the men — / gave lack of communication / as the reason for their divorces.",
    chunk_translation: "社会学家凯瑟琳·科勒·里斯曼在其新书《离婚谈话》中报告 / 她所采访的大多数女性—— / 但只有极少数男性—— / 将缺乏沟通 / 视作她们离婚的原因。"
  },
  {
    slashed_text: "Given the current divorce rate of nearly 50 percent, / that amounts to millions of cases in the United States every year — / a virtual epidemic of failed conversation.",
    chunk_translation: "鉴于目前近50%的离婚率 / 这相当于美国每年有数百万起案件—— / 实际上堪称一场对话失败的流行病。"
  },
  {
    slashed_text: "In my own research, / complaints from women about their husbands / most often focused not on tangible inequities / such as having given up the chance for a career to accompany a husband to his, / or doing far more than their share of daily life-support work / like cleaning, cooking and social arrangements.",
    chunk_translation: "在我自己的研究中 / 女性对丈夫的抱怨 / 往往并不集中在切实的不平等上 / 比如放弃自己的职业机会去配合丈夫的职业 / 或是承担远超自己份额的日常家务 / 比如打扫、做饭和人际交往安排"
  },
  {
    slashed_text: "Instead, they focused on communication: / “He doesn’t listen to me.” / “He doesn’t talk to me.” / I found, as Hacker observed years before, / that most wives want their husbands to be, first and foremost, conversational partners, / but few husbands share this expectation of their wives.",
    chunk_translation: "相反，她们聚焦于沟通： / “他不听我倾诉。” / “他也不跟我说话。” / 我发现正如哈克多年前所观察到的 / 大多数妻子希望丈夫首要且最重要的是成为谈话伴侣 / 但很少有丈夫对妻子抱有这种期望。"
  },
  {
    slashed_text: "In short, / the image that best represents the current crisis / is the stereotypical cartoon scene / of a man sitting at the breakfast table with a newspaper held up in front of his face, / while a woman glares at the back of it, / wanting to talk.",
    chunk_translation: "简而言之 / 最能代表当前危机的画面 / 是一幅典型的漫画场景： / 一个男人坐在早餐桌前，报纸高高举起挡在脸前 / 而一个女人怒视着报纸的背面 / 渴望能交谈两句。"
  }
];

// ----------------------------------------------------
// Text 3 (16 sentences)
// ----------------------------------------------------
const t3_refined = [
  {
    slashed_text: "Over the past decade, / many companies had perfected the art / of creating automatic behaviors — / habits — / among consumers.",
    chunk_translation: "在过去的十年里 / 许多公司已经完善了这一技巧 / 即在消费者群体中 / 制造无意识的自动行为—— / 亦即习惯。"
  },
  {
    slashed_text: "These habits have helped companies earn billions of dollars / when customers eat snacks / or wipe counters / almost without thinking, / often in response to a carefully designed set of daily cues.",
    chunk_translation: "这些习惯已帮助各家公司赚取数十亿美元 / 当顾客吃零食 / 或擦拭柜台时 / 几乎是不假思索的 / 这往往是对一套精心设计的日常线索所作出的反应。"
  },
  {
    slashed_text: "“There are fundamental public health problems, / like dirty hands instead of a soap habit, / that remain killers / only because we can’t figure out / how to change people’s habits,” / said Dr. Curtis, / the director of the Hygiene Center / at the London School of Hygiene & Tropical Medicine.",
    chunk_translation: "“存在着根本性的公共卫生问题 / 比如双手不洁而没有使用肥皂的习惯 / 它们依然是致命杀手 / 仅仅是因为我们弄不明白 / 该如何改变人们的习惯” / 柯蒂斯博士说 / 卫生中心主任 / 供职于伦敦卫生与热带医学院。"
  },
  {
    slashed_text: "“We wanted to learn from private industry / how to create new behaviors / that happen automatically.”",
    chunk_translation: "“我们想向私营行业请教 / 如何创造新的行为模式 / 使其能够自发地进行。”"
  },
  {
    slashed_text: "The companies that Dr. Curtis turned to — / Procter & Gamble, Colgate-Palmolive and Unilever — / had invested hundreds of millions of dollars / finding the subtle cues in consumers’ lives / that corporations could use / to introduce new routines.",
    chunk_translation: "柯蒂斯博士求助的那些公司—— / 宝洁、高露洁棕榄与联合利华—— / 已经投入了数亿美元 / 去寻找消费者生活中的微妙线索 / 企业可以利用这些线索 / 来引入新的生活常规。"
  },
  {
    slashed_text: "If you look hard enough, / you’ll find / that many of the products we use every day — / chewing gums, skin moisturizers, disinfecting wipes, air fresheners, water purifiers, health snacks, teeth whiteners, fabric softeners, vitamins — / are results of manufactured habits.",
    chunk_translation: "如果你仔细观察 / 你会发现 / 我们每天使用的许多产品—— / 口香糖、润肤乳、消毒湿巾、空气清新剂、净水器、健康零食、牙齿美白剂、织物柔软剂、维生素—— / 都是人为塑造习惯的产物。"
  },
  {
    slashed_text: "A century ago, / few people regularly brushed their teeth multiple times a day.",
    chunk_translation: "一个世纪前 / 很少有人每天规律地刷多次牙。"
  },
  {
    slashed_text: "Today, / because of shrewd advertising and public health campaigns, / many Americans habitually give their pearly whites a cavity-preventing scrub twice a day, / often with Colgate, Crest or one of the other brands.",
    chunk_translation: "如今 / 得益于精明的广告营销和公共卫生宣传运动 / 许多美国人习惯每天两次刷洗他们洁白的牙齿以防蛀牙 / 通常使用高露洁、佳洁士或其他品牌之一。"
  },
  {
    slashed_text: "A few decades ago, / many people didn’t drink water outside of a meal.",
    chunk_translation: "几十年前 / 许多人在正餐之外并不喝水。"
  },
  {
    slashed_text: "Then beverage companies started bottling the production of far-off springs, / and now office workers unthinkingly sip bottled water all day long.",
    chunk_translation: "后来饮料公司开始把遥远泉水灌装成瓶装水生产 / 如今上班族整天不假思索地啜饮着瓶装水。"
  },
  {
    slashed_text: "Chewing gum, once bought primarily by adolescent boys, / is now featured in commercials / as a breath freshener and teeth cleanser / for use after a meal.",
    chunk_translation: "口香糖曾经主要由青春期男孩购买 / 如今在广告中被重点宣传 / 作为口气清新剂和牙齿清洁剂 / 供饭后使用。"
  },
  {
    slashed_text: "Skin moisturizers are advertised as part of morning beauty rituals, / slipped in / between hair brushing and putting on makeup.",
    chunk_translation: "润肤霜被宣传为早间护肤美颜程序的一部分 / 悄然嵌入在 / 梳理头发与化妆之间。"
  },
  {
    slashed_text: "“Our products succeed / when they become part of daily or weekly patterns,” / said Carol Berning, / a consumer psychologist / who recently retired from Procter & Gamble, / the company that sold $76 billion of Tide, Crest and other products last year.",
    chunk_translation: "“我们的产品之所以成功 / 是因为它们成为了人们日常或每周生活常规的一部分” / 卡罗尔·伯宁说 / 一位消费者心理学家 / 她最近刚从宝洁公司退休 / 这家公司去年售出了760亿美元的汰渍、佳洁士等产品。"
  },
  {
    slashed_text: "“Creating positive habits is a huge part of improving our consumers’ lives, / and it’s essential to making new products commercially viable.”",
    chunk_translation: "“培养积极的习惯是改善我们消费者生活的重要一环 / 这对让新产品在商业上可行也至关重要。”"
  },
  {
    slashed_text: "Through experiments and observation, / social scientists like Dr. Berning have learned / that there is power / in tying certain behaviors to habitual cues / through ruthless advertising.",
    chunk_translation: "通过实验和观察 / 像伯宁博士这样的社会科学家已经了解到 / 蕴藏着强大的力量 / 在于将特定行为与习惯性线索紧密捆绑 / 借助铺天盖地的强势广告。"
  },
  {
    slashed_text: "As this new science of habit has emerged, / controversies have erupted / when the tactics have been used to sell questionable beauty creams / or unhealthy foods.",
    chunk_translation: "随着这门关于习惯的新兴科学应运而生 / 当这些营销策略被用于推销存疑的美容霜 / 或不健康食品时 / 争议便随之爆发了。"
  }
];

// ----------------------------------------------------
// Text 4 (14 sentences)
// ----------------------------------------------------
const t4_refined = [
  {
    slashed_text: "Many Americans regard the jury system / as a concrete expression of crucial democratic values, / including the principles / that all citizens / who meet minimal qualifications of age and literacy / are equally competent to serve on juries; / that jurors should be selected randomly / from a representative cross section of the community; / that no citizen should be denied the right to serve on a jury / on account of race, religion, sex, or national origin; / that defendants are entitled to trial by their peers; / and that verdicts should represent the conscience of the community / and not just the letter of the law.",
    chunk_translation: "许多美国人将陪审团制度 / 视为关键民主价值观的具体体现 / 包括以下原则： / 所有公民 / 只要达到年龄和文化程度的最低要求 / 就同样有资格在陪审团任职； / 陪审员应当随机选拔 / 从具有代表性的社区各阶层中； / 任何公民都不应被剥夺在陪审团任职的权利 / 基于种族、宗教、性别或国籍； / 被告有权接受同侪的审判； / 裁决应当体现社区的良知 / 而不仅仅是法律的条文。"
  },
  {
    slashed_text: "The jury is also said to be / the best surviving example / of direct rather than representative democracy.",
    chunk_translation: "陪审团也被认为是 / 留存至今的最佳范例 / 属于直接民主而非代议制民主。"
  },
  {
    slashed_text: "In a direct democracy, / citizens take turns governing themselves, / rather than electing representatives / to govern for them.",
    chunk_translation: "在直接民主制下 / 公民轮流自我管理 / 而不是选举代表 / 来替他们进行治理。"
  },
  {
    slashed_text: "But as recently as in 1968, / jury selection procedures / conflicted with these democratic ideals.",
    chunk_translation: "但直到1968年 / 陪审团的遴选程序 / 依然与这些民主理想存在冲突。"
  },
  {
    slashed_text: "In some states, for example, / jury duty was limited to persons / of supposedly superior intelligence, education, and moral character.",
    chunk_translation: "例如在一些州 / 陪审员职责仅限于那些 / 据称在智力、教育和道德品质上高人一等的人。"
  },
  {
    slashed_text: "Although the Supreme Court of the United States / had prohibited intentional racial discrimination in jury selection / as early as the 1880 case of Strauder v. West Virginia, / the practice of selecting so-called elite or blue-ribbon juries / provided a convenient way around this and other antidiscrimination laws.",
    chunk_translation: "尽管美国最高法院 / 早已禁止在陪审团遴选中蓄意进行种族歧视 / 早在1880年的“斯特劳德诉西弗吉尼亚州案”中 / 选拔所谓的精英或“蓝带”陪审团的做法 / 却为绕开该法案及其他反歧视法律提供了便利途径。"
  },
  {
    slashed_text: "The system also failed / to regularly include women on juries / until the mid-20th century.",
    chunk_translation: "该制度同样未能 / 定期将女性纳入陪审团 / 直到20世纪中叶。"
  },
  {
    slashed_text: "Although women first served on state juries in Utah in 1898, / it was not until the 1940s / that a majority of states made women eligible for jury duty.",
    chunk_translation: "尽管女性早在1898年就首次在犹他州进入州陪审团任职 / 但直到20世纪40年代 / 大多数州才赋予女性担任陪审员的资格。"
  },
  {
    slashed_text: "Even then / several states automatically exempted women from jury duty / unless they personally asked / to have their names included on the jury list.",
    chunk_translation: "即便在那时 / 一些州也自动免除女性的陪审义务 / 除非她们亲自提出申请 / 将自己的名字列入陪审员名单。"
  },
  {
    slashed_text: "This practice was justified by the claim / that women were needed at home, / and it kept juries unrepresentative of women / through the 1960s.",
    chunk_translation: "这种做法以一种说法来辩解： / 即家庭需要女性 / 这使得陪审团一直无法充分代表女性 / 直到20世纪60年代。"
  },
  {
    slashed_text: "In 1968, / the Congress of the United States / passed the Jury Selection and Service Act, / ushering in a new era of democratic reforms for the jury.",
    chunk_translation: "在1968年 / 美国国会 / 通过了《陪审团遴选与服务法案》 / 开启了陪审团民主改革的新时代。"
  },
  {
    slashed_text: "This law abolished special educational requirements for federal jurors / and required them to be selected at random / from a cross section of the entire community.",
    chunk_translation: "该法废除了对联邦陪审员的特殊学历要求 / 并要求随机选拔陪审员 / 从整个社区具有代表性的各阶层中。"
  },
  {
    slashed_text: "In the landmark 1975 decision Taylor v. Louisiana, / the Supreme Court extended the requirement / that juries be representative of all parts of the community / to the state level.",
    chunk_translation: "在1975年里程碑式的“泰勒诉路易斯安那州案”判决中 / 最高法院扩大了这项要求的适用范围 / 即陪审团必须能代表社区的各个群体 / 将其延伸至州一级。"
  },
  {
    slashed_text: "The Taylor decision also declared sex discrimination in jury selection to be unconstitutional / and ordered states to use the same procedures / for selecting male and female jurors.",
    chunk_translation: "泰勒案的判决还宣布陪审团遴选中的性别歧视违宪 / 并责令各州采用相同程序 / 来选拔男性与女性陪审员。"
  }
];

const texts_refined = [t1_refined, t2_refined, t3_refined, t4_refined];

for (let tid = 0; tid < 4; tid++) {
  const textObj = d.texts[tid];
  const refinedSents = texts_refined[tid];
  
  if (refinedSents.length !== textObj.sentences.length) {
    throw new Error(`Text ${tid+1} sentence count mismatch: expected ${refinedSents.length}, got ${textObj.sentences.length}`);
  }

  // Apply to sentences
  for (let s = 0; s < refinedSents.length; s++) {
    const r = refinedSents[s];
    // Verify 1:1 chunk count between slashed_text and chunk_translation
    const slChunks = r.slashed_text.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    const ckChunks = r.chunk_translation.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    if (slChunks.length !== ckChunks.length) {
      throw new Error(`Text ${tid+1} Sentence ${s+1} chunk count mismatch: ${slChunks.length} vs ${ckChunks.length}\nSL: ${r.slashed_text}\nCK: ${r.chunk_translation}`);
    }
    textObj.sentences[s].slashed_text = r.slashed_text;
    textObj.sentences[s].chunk_translation = r.chunk_translation;
  }

  // Re-assemble paragraphs from refined sentences
  for (const para of textObj.paragraphs) {
    const sentsInPara = textObj.sentences.filter(s => s.pid === para.pid);
    para.slashed_text = sentsInPara.map(s => s.slashed_text).filter(Boolean).join(' / ');
    para.chunk_translation = sentsInPara.map(s => s.chunk_translation).filter(Boolean).join(' / ');
  }
}

fs.writeFileSync(file, JSON.stringify(d, null, 2) + '\n', 'utf8');
console.log('Successfully refined all 4 texts (65 sentences) of 2010.json!');
