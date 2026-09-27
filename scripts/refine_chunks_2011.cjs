const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2011.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

// ----------------------------------------------------
// Text 1 (19 sentences)
// ----------------------------------------------------
const t1_refined = [
  {
    slashed_text: "Ruth Simmons joined Goldman Sachs’s board / as an outside director / in January 2000; / a year later / she became president of Brown University.",
    chunk_translation: "露丝·西蒙斯加入了高盛集团董事会 / 担任外部董事 / 于2000年1月； / 一年之后 / 她成为了布朗大学的校长。"
  },
  {
    slashed_text: "For the rest of the decade / she apparently managed both roles / without attracting much criticism.",
    chunk_translation: "在此后的十年间 / 她显然较好地兼顾了这两种角色 / 未引来太多批评。"
  },
  {
    slashed_text: "But by the end of 2009 / Ms. Simmons was under fire / for having sat on Goldman’s compensation committee; / how could she have let those enormous bonus payouts / pass unremarked?",
    chunk_translation: "但到了2009年底 / 西蒙斯女士却饱受指责 / 因为她曾供职于高盛的薪酬委员会； / 她怎么能让那些巨额奖金的发放 / 毫无异议地通过呢？"
  },
  {
    slashed_text: "By February the next year / Ms. Simmons had left the board.",
    chunk_translation: "到了次年2月 / 西蒙斯女士便退出了董事会。"
  },
  {
    slashed_text: "The position was just taking up too much time, / she said.",
    chunk_translation: "该职位占用了太多时间 / 她说道。"
  },
  {
    slashed_text: "Outside directors are supposed to serve / as helpful, yet less biased, advisers / on a firm’s board.",
    chunk_translation: "外部董事本应发挥的作用是 / 作为有益且较少偏见的顾问 / 在公司的董事会中。"
  },
  {
    slashed_text: "Having made their wealth and their reputations elsewhere, / they presumably have enough independence / to disagree with the chief executive’s proposals.",
    chunk_translation: "在其他领域已经收获了财富与声望 / 他们理应拥有足够的独立性 / 去对首席执行官的提议提出异议。"
  },
  {
    slashed_text: "If the sky, / and the share price, / is falling, / outside directors should be able to give advice / based on having weathered their own crises.",
    chunk_translation: "如果天塌下来 / 以及股价 / 暴跌时 / 外部董事应当能够提供建议 / 依据自身经历过危机的经验。"
  },
  {
    slashed_text: "The researchers from Ohio University / used a database / that covered more than 10,000 firms / and more than 64,000 different directors / between 1989 and 2004.",
    chunk_translation: "来自俄亥俄大学的研究人员 / 使用了一个数据库 / 涵盖了超过1万家公司 / 以及超过6.4万名不同的董事 / 在1989年至2004年之间。"
  },
  {
    slashed_text: "Then they simply checked / which directors stayed / from one proxy statement to the next.",
    chunk_translation: "然后他们仅仅核对了 / 哪些董事一直留任 / 从一份委托书到下一份委托书。"
  },
  {
    slashed_text: "The most likely reason for departing a board was age, / so the researchers concentrated / on those “surprise” disappearances / by directors under the age of 70.",
    chunk_translation: "离开董事会最可能的原因是年龄 / 因此研究人员重点关注了 / 那些“出人意料”的离职事件 / 涉及70岁以下的董事。"
  },
  {
    slashed_text: "They found that after a surprise departure, / the probability / that the company will subsequently have to restate earnings / increased by nearly 20%.",
    chunk_translation: "他们发现在出现意外离职后 / 这一概率 / 即公司随后不得不重新调整财务收益的概率 / 增加了近20%。"
  },
  {
    slashed_text: "The likelihood of being named in a federal class-action lawsuit / also increases, / and the stock is likely to perform worse.",
    chunk_translation: "在联邦集体诉讼中被列为被告的可能性 / 也随之增加 / 并且股票很可能表现得更差。"
  },
  {
    slashed_text: "The effect tended to be larger / for larger firms.",
    chunk_translation: "这种效应往往更为显著 / 对规模较大的公司而言。"
  },
  {
    slashed_text: "Although a correlation between them leaving and subsequent bad performance at the firm / is suggestive, / it does not mean / that such directors are always jumping off a sinking ship.",
    chunk_translation: "尽管董事离职与公司随后糟糕业绩之间的相关性 / 耐人寻味 / 但这并不意味着 / 这类董事总是在弃即将沉没的船而去。"
  },
  {
    slashed_text: "Often they “trade up”, / leaving riskier, smaller firms / for larger and more stable firms.",
    chunk_translation: "他们常常是“往高处走” / 离开风险更大、规模更小的公司 / 前往规模更大、更稳定的公司。"
  },
  {
    slashed_text: "But the researchers believe / that outside directors have an easier time of avoiding a blow to their reputations / if they leave a firm before bad news breaks, / even if a review of history shows / they were on the board at the time any wrongdoing occurred.",
    chunk_translation: "但研究人员认为 / 外部董事更容易避免声誉受损 / 如果他们在坏消息爆发前离开公司 / 即使历史记录审查显示 / 在任何不当行为发生时他们都在董事会中任职。"
  },
  {
    slashed_text: "Firms who want to keep their outside directors through tough times / may have to create incentives.",
    chunk_translation: "想在艰难时期留住外部董事的公司 / 可能不得不建立激励机制。"
  },
  {
    slashed_text: "Otherwise outside directors will follow the example of Ms. Simmons, / once again very popular on campus.",
    chunk_translation: "否则外部董事就会效仿西蒙斯女士的例子 / 她如今再次在校园里大受欢迎。"
  }
];

// ----------------------------------------------------
// Text 2 (30 sentences)
// ----------------------------------------------------
const t2_refined = [
  {
    slashed_text: "Whatever happened / to the death of newspapers?",
    chunk_translation: "报纸消亡论 / 究竟是怎么一回事？"
  },
  {
    slashed_text: "A year ago / the end seemed near.",
    chunk_translation: "一年前 / 终局似乎已近在眼前。"
  },
  {
    slashed_text: "The recession threatened to remove the advertising and readers / that had not already fled to the internet.",
    chunk_translation: "经济衰退威胁要夺走那些 / 尚未流失到互联网上的广告和读者。"
  },
  {
    slashed_text: "Newspapers like the San Francisco Chronicle / were chronicling their own doom.",
    chunk_translation: "像《旧金山纪事报》这样的报纸 / 都在记录着它们自身的覆灭。"
  },
  {
    slashed_text: "America’s Federal Trade Commission / launched a round of talks / about how to save newspapers.",
    chunk_translation: "美国联邦贸易委员会 / 发起了一轮会谈 / 探讨如何拯救报业。"
  },
  {
    slashed_text: "Should they become charitable corporations?",
    chunk_translation: "它们应该转变为慈善机构吗？"
  },
  {
    slashed_text: "Should the state subsidize them?",
    chunk_translation: "国家应该对它们进行补贴吗？"
  },
  {
    slashed_text: "It will hold another meeting soon.",
    chunk_translation: "不久之后还将举行另一次会议。"
  },
  {
    slashed_text: "But the discussions now seem out of date.",
    chunk_translation: "但这些讨论如今看来已经过时了。"
  },
  {
    slashed_text: "In much of the world / there is little sign of crisis.",
    chunk_translation: "在世界大部分地区 / 几乎看不到危机的迹象。"
  },
  {
    slashed_text: "German and Brazilian papers / have shrugged off the recession.",
    chunk_translation: "德国和巴西的报纸 / 已经摆脱了经济衰退的影响。"
  },
  {
    slashed_text: "Even American newspapers, / which inhabit the most troubled corner of the global industry, / have not only survived / but often returned to profit.",
    chunk_translation: "即便是美国报业 / 身处全球报业最困顿的角落 / 不仅存活了下来 / 而且大多恢复了盈利。"
  },
  {
    slashed_text: "Not the 20% profit margins / that were routine a few years ago, / but profit all the same.",
    chunk_translation: "虽不再是几年前司空见惯的20%的利润率 / 几年前那是常态 / 但终究还是盈利了。"
  },
  {
    slashed_text: "It has not been much fun.",
    chunk_translation: "这过程并不怎么轻松愉快。"
  },
  {
    slashed_text: "Many papers stayed afloat / by pushing journalists overboard.",
    chunk_translation: "许多报纸得以维持经营 / 是通过裁掉新闻记者。"
  },
  {
    slashed_text: "The American Society of News Editors reckons / that 13,500 newsroom jobs have gone / since 2007.",
    chunk_translation: "美国新闻编辑学会估计 / 已有13500个采编岗位消失 / 自2007年以来。"
  },
  {
    slashed_text: "Readers are paying more / for slimmer products.",
    chunk_translation: "读者正在支付更高的价格 / 购买版面更薄的报纸。"
  },
  {
    slashed_text: "Some papers even had the nerve / to refuse delivery to distant suburbs.",
    chunk_translation: "一些报纸甚至有胆量 / 拒绝向偏远的郊区投递。"
  },
  {
    slashed_text: "Yet these desperate measures have proved the right ones / and, sadly for many journalists, / they can be pushed further.",
    chunk_translation: "然而这些破釜沉舟的举措已被证明是正确的 / 而且对许多记者而言令人遗憾的是 / 这些举措还可以进一步推进。"
  },
  {
    slashed_text: "Newspapers are becoming more balanced businesses, / with a healthier mix of revenues / from readers and advertisers.",
    chunk_translation: "报社正转变为更加均衡的商业模式 / 拥有更健康的收入组合 / 来自读者与广告商两端。"
  },
  {
    slashed_text: "American papers have long been highly unusual / in their reliance on ads.",
    chunk_translation: "美国报纸长期以来极不寻常之处 / 就在于其对广告的高度依赖。"
  },
  {
    slashed_text: "Fully 87% of their revenues came from advertising in 2008, / according to the Organization for Economic Cooperation & Development (OECD).",
    chunk_translation: "在2008年其整整87%的收入来自广告 / 根据经济合作与发展组织（OECD）的数据。"
  },
  {
    slashed_text: "In Japan the proportion is 35%.",
    chunk_translation: "在日本这一比例为35%。"
  },
  {
    slashed_text: "Not surprisingly, / Japanese newspapers are much more stable.",
    chunk_translation: "不足为奇的是 / 日本报纸要稳定得多。"
  },
  {
    slashed_text: "The whirlwind that swept through newsrooms / harmed everybody, / but much of the damage has been concentrated / in areas where newspapers are least distinctive.",
    chunk_translation: "席卷各新闻编辑室的风暴 / 伤害了每一个人 / 但大部分冲击都集中在 / 报纸最缺乏特色的板块领域。"
  },
  {
    slashed_text: "Car and film reviewers have gone.",
    chunk_translation: "汽车和电影评论员已经被裁掉了。"
  },
  {
    slashed_text: "So have science and general business reporters.",
    chunk_translation: "科技和一般商业记者也是如此。"
  },
  {
    slashed_text: "Foreign bureaus have been savagely cut off.",
    chunk_translation: "驻外记者站已被无情地大幅撤销。"
  },
  {
    slashed_text: "Newspapers are less complete as a result.",
    chunk_translation: "报纸的内容因此不如以往全面。"
  },
  {
    slashed_text: "But completeness is no longer a virtue / in the newspaper business.",
    chunk_translation: "但内容面面俱到已不再是一种美德 / 在报业经营当中。"
  }
];

// ----------------------------------------------------
// Text 3 (17 sentences)
// ----------------------------------------------------
const t3_refined = [
  {
    slashed_text: "We tend to think of the decades immediately following World War II / as a time of prosperity and growth, / with soldiers returning home by the millions, / going off to college on the G.I. Bill / and lining up at the marriage bureaus.",
    chunk_translation: "我们往往将二战刚结束后的几十年 / 视为一个繁荣与增长的时代 / 数百万士兵复员回家 / 依靠《退伍军人权利法案》进入大学 / 并纷纷前往婚姻登记处排队。"
  },
  {
    slashed_text: "But when it came to their houses, / it was a time of common sense / and a belief that less could truly be more.",
    chunk_translation: "但在住房问题上 / 那是一个崇尚务实理性的时代 / 并坚信少确实可以胜多。"
  },
  {
    slashed_text: "During the Depression and the war, / Americans had learned to live with less, / and that restraint, / in combination with the postwar confidence in the future, / made small, efficient housing positively stylish.",
    chunk_translation: "在大萧条和战争期间 / 美国人已经学会了以更少的生活资料度日 / 而那种克制生活 / 结合了战后对未来的信心 / 使得小而高效的住宅极为流行。"
  },
  {
    slashed_text: "Economic condition was only a stimulus / for the trend toward efficient living.",
    chunk_translation: "经济条件仅仅是一种催化剂 / 推动着走向高效生活的趋势。"
  },
  {
    slashed_text: "The phrase “less is more” was actually first popularized by a German, / the architect Ludwig Mies van der Rohe, / who like other people associated with the Bauhaus, a school of design, / emigrated to the United States before World War II / and took up posts at American architecture schools.",
    chunk_translation: "“少即是多”这一口号实际上最早由一位德国人推广 / 建筑师路德维希·密斯·凡德罗 / 他像与包豪斯设计学院相关的其他人一样 / 在二战爆发前移民到了美国 / 并在美国各建筑院校任职。"
  },
  {
    slashed_text: "These designers came to exert enormous influence / on the course of American architecture, / but none more so than Mies.",
    chunk_translation: "这些设计师发挥了巨大影响 / 对美国建筑的发展进程 / 但谁也比不上密斯的影响深远。"
  },
  {
    slashed_text: "Mies’s signature phrase means / that less decoration, / properly organized, / has more impact than a lot.",
    chunk_translation: "密斯的这句标志性名言意味着 / 更少的装饰 / 只要组织得当 / 就能比繁冗的装饰产生更大的冲击力。"
  },
  {
    slashed_text: "Elegance, he believed, / did not derive from abundance.",
    chunk_translation: "他坚信典雅 / 并不源于堆砌丰盛。"
  },
  {
    slashed_text: "Like other modern architects, / he employed metal, glass and laminated wood — / materials that we take for granted today / but that in the 1940s symbolized the future.",
    chunk_translation: "与其他现代建筑师一样 / 他运用金属、玻璃和层压木材—— / 这些我们今天习以为常的材料 / 但在20世纪40年代却象征着未来。"
  },
  {
    slashed_text: "Mies’s sophisticated presentation masked the fact / that the spaces he designed were small and efficient, / rather than big and often empty.",
    chunk_translation: "密斯高超的表现手法掩盖了一个事实： / 即他所设计的空间小而高效 / 而不是大而空洞。"
  },
  {
    slashed_text: "The apartments in the elegant towers Mies built on Chicago’s Lake Shore Drive, for example, / were smaller — / two-bedroom units under 1,000 square feet — / than those in their older neighbors along the city’s Gold Coast.",
    chunk_translation: "例如密斯在芝加哥湖滨大道上建造的优雅高楼中的公寓 / 面积更小—— / 两居室户型不足1000平方英尺—— / 相比沿该市黄金海岸的老式邻近建筑中的住宅。"
  },
  {
    slashed_text: "But they were popular / because of their airy glass walls, / the views they afforded / and the elegance of the buildings’ details and proportions, / the architectural equivalent of the abstract art so popular at the time.",
    chunk_translation: "但它们深受人们喜爱 / 因为其通透的玻璃幕墙 / 带来的极佳视野 / 以及建筑细节与比例的优雅 / 堪称当时风靡一时的抽象艺术在建筑学上的体现。"
  },
  {
    slashed_text: "The trend toward “less” / was not entirely foreign.",
    chunk_translation: "崇尚“少”的这一潮流 / 并非完全是外来的舶来品。"
  },
  {
    slashed_text: "In the 1930s / Frank Lloyd Wright started building more modest and efficient houses — / usually around 1,200 square feet — / than the spreading two-story ones he had designed in the 1890s and the early 20th century.",
    chunk_translation: "在20世纪30年代 / 弗兰克·劳埃德·赖特开始建造更为质朴高效的住宅—— / 通常约为1200平方英尺左右—— / 相比他在19世纪90年代和20世纪初设计的铺展开来的双层住宅。"
  },
  {
    slashed_text: "The “Case Study Houses” / commissioned from talented modern architects / by California Arts & Architecture magazine between 1945 and 1962 / were yet another homegrown influence / on the “less is more” trend.",
    chunk_translation: "“案例研究住宅”项目 / 委托有才华的现代建筑师设计 / 由《加州艺术与建筑》杂志在1945年至1962年间出资赞助 / 构成了本土力量的又一影响 / 对“少即是多”的潮流。"
  },
  {
    slashed_text: "Aesthetic effect came / from the landscape, / new materials / and forthright detailing.",
    chunk_translation: "美学效果源自 / 周边景观、 / 新材料 / 以及直率简洁的细部处理。"
  },
  {
    slashed_text: "In his Case Study House, / Ralph Rapson may have mispredicted / just how the mechanical revolution would impact everyday life — / few American families acquired helicopters, / though most eventually got clothes dryers — / but his belief that self-sufficiency was both desirable and inevitable / was widely shared.",
    chunk_translation: "在他的案例研究住宅中 / 拉尔夫·拉普森或许误判了 / 机械革命究竟会如何影响日常生活—— / 很少有美国家庭买了直升机 / 虽然大多数家庭最终都购置了干衣机—— / 但他认为自给自足既可取又不可避免的信念 / 却得到了广泛的共鸣。"
  }
];

// ----------------------------------------------------
// Text 4 (17 sentences)
// ----------------------------------------------------
const t4_refined = [
  {
    slashed_text: "Will the European Union make it?",
    chunk_translation: "欧洲联盟能渡过难关吗？"
  },
  {
    slashed_text: "The question would have sounded strange / not long ago.",
    chunk_translation: "这个问题听起来会很奇怪 / 就在不久之前。"
  },
  {
    slashed_text: "Now even the project’s greatest cheerleaders / talk of a continent facing a “Bermuda triangle” / of debt, population decline and lower growth.",
    chunk_translation: "如今哪怕是该项目最热心的支持者 / 也在谈论欧洲大陆正面临着一个“百慕大三角” / 即债务危机、人口下滑以及增长放缓。"
  },
  {
    slashed_text: "As well as those chronic problems, / the EU faces an acute crisis in its economic core, / the 16 countries that use the single currency.",
    chunk_translation: "除了那些长期存在的慢性顽疾之外 / 欧盟在其经济核心区还面临着一场严重的急性危机 / 即使用单一货币的16个成员国。"
  },
  {
    slashed_text: "Markets have lost faith / that the euro zone’s economies, weaker or stronger, / will one day converge / thanks to the discipline of sharing a single currency, / which denies uncompetitive members the quick fix of devaluation.",
    chunk_translation: "市场已经失去了信心 / 认为欧元区各经济体（无论强弱） / 终有一日会走向趋同 / 得益于共享同一种单一货币的纪律约束 / 尽管这种制度剥夺了缺乏竞争力的成员国利用汇率贬值进行快速脱困的手段。"
  },
  {
    slashed_text: "Yet the debate about how to save Europe’s single currency from disintegration / is stuck.",
    chunk_translation: "然而关于如何拯救欧洲单一货币免于瓦解的争论 / 陷入了僵局。"
  },
  {
    slashed_text: "It is stuck / because the euro zone’s dominant powers, France and Germany, / agree on the need for greater harmonisation within the euro zone, / but disagree about what to harmonise.",
    chunk_translation: "它之所以陷入停滞 / 是因为欧元区的主导大国法国与德国 / 虽然都认同需要在欧元区内部实现更大程度的协调统一步调 / 却在具体协调什么内容上存在分歧。"
  },
  {
    slashed_text: "Germany thinks the euro must be saved by stricter rules on borrowing, spending and competitiveness, / backed by quasi-automatic sanctions / for governments that do not obey.",
    chunk_translation: "德国认为拯救欧元必须通过更严格的借贷、支出和竞争力规则 / 并辅以近乎自动触发的制裁措施 / 惩处那些不守规矩的政府。"
  },
  {
    slashed_text: "These might include threats to freeze EU funds / for poorer regions and EU mega-projects, / and even the suspension of a country’s voting rights / in EU ministerial councils.",
    chunk_translation: "这些可能包括威胁冻结欧盟资金 / 针对贫困地区和欧盟大型项目的拨款 / 甚至暂停某个成员国的投票表决权 / 在欧盟部长理事会中。"
  },
  {
    slashed_text: "It insists that economic co-ordination should involve all 27 members of the EU club, / among whom there is a small majority / for free-market liberalism and economic rigour; / in the inner core alone, Germany fears, / a small majority favour French interference.",
    chunk_translation: "德国坚持认为经济协调应当涵盖欧盟俱乐部的全部27个成员国 / 在这27国之中有微弱多数 / 赞成自由市场自由主义和严格的财政自律； / 德国担心若仅在核心圈内部 / 赞成法国式干预主义的成员国将占微弱多数。"
  },
  {
    slashed_text: "A “southern” camp headed by France / wants something different: / “European economic government” / within an inner core of euro-zone members.",
    chunk_translation: "由法国牵头的“南方阵营” / 则想要不同的方案： / 建立“欧洲经济政府” / 在欧元区核心成员国范围内。"
  },
  {
    slashed_text: "Translated, that means politicians intervening in monetary policy / and a system of redistribution from richer to poorer members, / via cheaper borrowing for governments / through common Eurobonds / or complete fiscal transfers.",
    chunk_translation: "换句话说，这意味着政治家插手货币政策 / 以及建立从富裕成员向贫困成员的再分配体系 / 通过为政府提供更廉价的借贷渠道 / 借助共同的欧洲债券 / 或彻底的财政转移支付。"
  },
  {
    slashed_text: "Finally, figures close to the French government have murmured, / euro-zone members should agree to some fiscal and social harmonisation: / e.g., curbing competition / in corporate-tax rates or labour costs.",
    chunk_translation: "最后，接近法国政府的人士低语表示 / 欧元区成员国应当在财政和社会政策上达成某种统一步调： / 例如遏制恶性竞争 / 在企业所得税率或劳动力成本方面。"
  },
  {
    slashed_text: "It is too soon to write off the EU.",
    chunk_translation: "现在就判定欧盟出局还为时过早。"
  },
  {
    slashed_text: "It remains the world’s largest trading block.",
    chunk_translation: "它依然是全球最大的贸易集团。"
  },
  {
    slashed_text: "At its best, the European project is remarkably liberal: / built around a single market of 27 rich and poor countries, / its internal borders are far more open to goods, capital and labour / than any comparable trading area.",
    chunk_translation: "在其最理想状态下，欧洲一体化方案极为自由开放： / 围绕一个囊括27个贫富国家的单一市场建立 / 其内部边界对于商品、资本和劳动力流动的开放程度 / 远超任何具备可比性的贸易区域。"
  },
  {
    slashed_text: "It is an ambitious attempt to blunt the sharpest edges of globalisation, / and make capitalism benign.",
    chunk_translation: "这是一项雄心勃勃的尝试，旨在磨平全球化最锋利的棱角 / 并让资本主义变得更加温和向善。"
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
console.log('Successfully refined all 4 texts (83 sentences) of 2011.json!');
