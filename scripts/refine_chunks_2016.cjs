const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2016.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

const fixes = {
  // Text 1
  '1:8': {
    slashed_text: "The Flatiron School , / where people pay to learn programming , / started as one of the many coding bootcamps / that’s become popular / for adults looking for a career change.",
    chunk_translation: "熨斗学校， / 人们在那里付费学习编程， / 最初是众多编程训练营之一， / 这些训练营变得颇受欢迎， / 针对寻求职业转型的成年人。"
  },
  '1:9': {
    slashed_text: "The high-schoolers get the same curriculum , / but “we try to gear lessons / toward things they’re interested in ,” / said Victoria Friedman , an instructor.",
    chunk_translation: "高中生们接受相同的课程体系， / 但“我们尽量将课程内容贴近 / 他们感兴趣的事物，” / 讲师维多利亚·弗里德曼说。"
  },
  '1:10': {
    slashed_text: "For instance , / one of the apps the students are developing / suggests movies / based on your mood.",
    chunk_translation: "例如， / 学生们正在开发的一款应用程序 / 能够推荐电影， / 根据你的心情。"
  },
  '1:11': {
    slashed_text: "The students in the Flatiron class / probably won’t drop out of high school / and build the next Facebook.",
    chunk_translation: "熨斗班上的学生们 / 可能不会从高中辍学 / 并打造出下一个脸书。"
  },
  '1:12': {
    slashed_text: "Programming languages have a quick turnover , / so the “Ruby on Rails” language they learned / may not even be relevant / by the time they enter the job market.",
    chunk_translation: "编程语言更新迭代十分迅速， / 因此他们学到的“Ruby on Rails”语言 / 甚至可能不再适用， / 到他们进入就业市场的时候。"
  },
  '1:13': {
    slashed_text: "But the skills they learn — / how to think logically through a problem / and organize the results — / apply to any coding language , / said Deborah Seehorn , / an education consultant for the state of North Carolina.",
    chunk_translation: "但他们学到的技能—— / 如何通过逻辑思维剖析问题 / 并梳理组织结果—— / 适用于任何编程语言， / 北卡罗来纳州教育顾问 / 德博拉·西霍恩说。"
  },
  '1:14': {
    slashed_text: "Indeed , / the Flatiron students might not go into IT at all.",
    chunk_translation: "确实， / 熨斗学校的学生们可能根本不会进入信息技术行业。"
  },
  '1:15': {
    slashed_text: "But creating a future army of coders / is not the sole purpose of the classes.",
    chunk_translation: "但打造一支未来的程序员大军 / 并不是这些课程的唯一目的。"
  },
  '1:16': {
    slashed_text: "These kids are going to be surrounded by computers — / in their pockets , in their offices , in their homes — / for the rest of their lives.",
    chunk_translation: "这些孩子将被计算机所包围—— / 在他们的口袋里、在他们的办公室里、在他们的家里—— / 在他们的余生中。"
  },
  '1:17': {
    slashed_text: "The younger they learn how computers think , / how to coax the machine into producing what they want — / the earlier they learn that they have the power to do that — / the better.",
    chunk_translation: "他们越早学会计算机如何思考， / 如何引导机器产出他们想要的东西—— / 越早明白自己有能力做到这一点—— / 就越好。"
  },

  // Text 2
  '2:1': {
    slashed_text: "But just some 22,000 birds remain today , / occupying about 16% / of the species’ historic range.",
    chunk_translation: "但如今仅存约22,000只鸟， / 仅占其历史分布范围的 / 约16%。"
  },
  '2:6': {
    slashed_text: "They had pushed the agency / to designate the bird as “endangered ,” / a status that gives federal officials greater regulatory power / to crack down on threats.",
    chunk_translation: "他们此前敦促该机构 / 将该鸟类列为“濒危物种”， / 这一级别能赋予联邦官员更大的监管权力 / 来打击威胁。"
  },
  '2:7': {
    slashed_text: "But Ashe and others argued / that the “threatened” tag / gave the federal government flexibility / to try out new , potentially less confrontational conservation approaches.",
    chunk_translation: "但阿什等人认为， / “受威胁”这一标签 / 赋予了联邦政府灵活性， / 可以尝试新的、潜在对抗性更弱的保护方式。"
  },
  '2:8': {
    slashed_text: "In particular , they called for forging closer collaborations / with western state governments , which are often uneasy with federal action , / and with the private landowners / who control an estimated 95% of the prairie chicken’s habitat.",
    chunk_translation: "特别是，他们呼吁建立更紧密的合作， / 与往往对联邦行动感到不安的西部州政府合作， / 以及与私人土地所有者合作， / 后者控制着估计95%的草原榛鸡栖息地。"
  },
  '2:9': {
    slashed_text: "Under the plan , for example , / the agency said it would not prosecute landowners or businesses / that unintentionally kill , harm , or disturb the bird , / as long as they had signed a range-wide management plan / to restore prairie chicken habitat.",
    chunk_translation: "例如，根据该计划， / 该机构表示不会起诉土地所有者或企业， / 如果他们无意中杀死、伤害或惊扰了这种鸟类， / 只要他们签署了全域管理计划 / 来恢复草原榛鸡的栖息地。"
  },
  '2:10': {
    slashed_text: "Negotiated by USFWS and the states , / the plan requires individuals and businesses / that damage habitat as part of their operations / to pay into a fund / to replace every acre destroyed / with 2 new acres of suitable habitat.",
    chunk_translation: "由鱼类及野生动物管理局与各州协商制定， / 该计划要求个人和企业 / 凡在日常运营中破坏栖息地的， / 向一项基金缴纳资金， / 以便在每破坏一英亩土地时 / 用两英亩新适宜栖息地进行替代。"
  },
  '2:11': {
    slashed_text: "The fund will also be used / to compensate landowners / who set aside habitat.",
    chunk_translation: "该基金还将用于 / 补偿那些留出保护栖息地的 / 土地所有者。"
  },
  '2:12': {
    slashed_text: "USFWS also set an interim goal / of restoring prairie chicken populations / to an annual average of 67,000 birds / over the next 10 years.",
    chunk_translation: "鱼类及野生动物管理局还设定了一项中期目标： / 恢复草原榛鸡的种群数量， / 使其在未来10年内 / 达到年均67,000只。"
  },
  '2:13': {
    slashed_text: "And it gives the Western Association of Fish and Wildlife Agencies (WAFWA) , / a coalition of state agencies , / the job of monitoring progress.",
    chunk_translation: "并赋予西部鱼类和野生动物机构协会（WAFWA）—— / 一个州级机构联盟—— / 监督进展的工作职责。"
  },
  '2:14': {
    slashed_text: "Overall , the idea is to let “states remain in the driver’s seat / for managing the species ,” / Ashe said.",
    chunk_translation: "总体而言，其思路是让“各州在物种管理中 / 保持主导地位，” / 阿什说。"
  },
  '2:15': {
    slashed_text: "Not everyone buys / the win-win rhetoric.",
    chunk_translation: "并非人人都买账 / 这种双赢的说辞。"
  },
  '2:16': {
    slashed_text: "Some Congress members are trying to block the plan , / and at least a dozen industry groups , / four states , / and three environmental groups / are challenging it in federal court.",
    chunk_translation: "一些国会议员正试图阻挠该计划， / 而且至少有十几个行业团体、 / 四个州 / 以及三个环保组织 / 正在联邦法院对其发起法律诉讼。"
  },
  '2:17': {
    slashed_text: "Not surprisingly , / industry groups and states generally argue it goes too far ; / environmentalists say it doesn’t go far enough.",
    chunk_translation: "不足为奇的是， / 行业团体和各州普遍认为该计划管得过头了； / 而环保人士则认为这还远远不够。"
  },
  '2:18': {
    slashed_text: "“The federal government is giving responsibility / for managing the bird / to the same industries that are pushing it to extinction ,” / says biologist Jay Lininger.",
    chunk_translation: "“联邦政府正将管理这种鸟类的责任， / 拱手让给 / 那些正在将它推向灭绝的行业，” / 生物学家杰伊·莱宁格说。"
  },

  // Text 3
  '3:7': {
    slashed_text: "Thinking of time as a resource to be maximised / means you approach it instrumentally , / judging any given moment as well spent / only in so far as it advances progress toward some goal.",
    chunk_translation: "将时间视为一种需要被最大化利用的资源 / 意味着你带着功利目的对待它， / 评判任何特定时刻是否过得充实 / 仅仅取决于它是否推动了实现某个目标的进展。"
  },
  '3:8': {
    slashed_text: "Immersive reading , by contrast , / depends on being willing to risk inefficiency , / goallessness , / even time-wasting.",
    chunk_translation: "相比之下，沉浸式阅读 / 取决于是否愿意承担低效的风险、 / 漫无目的、 / 甚至是浪费时间的风险。"
  },
  '3:9': {
    slashed_text: "Try to slot it in as a to-do list item / and you’ll manage only goal-focused reading — / useful , sometimes , / but not the most fulfilling kind.",
    chunk_translation: "试着将它作为待办事项清单中的一项插进去， / 你最多只能做到以目标为导向的阅读—— / 有时固然有用， / 但绝不是最让人有充实感的那一种。"
  },
  '3:10': {
    slashed_text: "“The future comes at us like empty bottles / along an unstoppable and nearly infinite conveyor belt ,” / writes Gary Eberle in his book Sacred Time , / and “we feel a pressure to fill these different-sized bottles (days , hours , minutes) as they pass , / for if they get by without being filled , we will have wasted them.” / No mind-set could be worse / for losing yourself in a book.",
    chunk_translation: "“未来像空瓶子一样朝我们涌来， / 沿着一条不可阻挡且近乎无限的传送带前进，” / 加里·埃伯利在其《神圣时间》一书中写道， / “当这些不同规格的瓶子（天、小时、分钟）经过时，我们感到一种去填满它们的压力， / 因为如果它们没有被填满就溜走了，我们就等于浪费了它们。” / 没有哪种心态会比这更糟了， / 对于沉浸在一本书中而言。"
  },
  '3:12': {
    slashed_text: "Perhaps surprisingly , / scheduling regular times for reading.",
    chunk_translation: "或许令人意外的是， / 为阅读安排固定的时间。"
  },
  '3:13': {
    slashed_text: "You’d think this might fuel the efficiency mind-set , / but in fact , Eberle notes , / such ritualistic behaviour helps us “step outside time’s flow” into “soul time.” / You could limit distractions / by reading only physical books , / or on single-purpose e-readers.",
    chunk_translation: "你可能认为这会助长追求效率的心态， / 但实际上，埃伯利指出， / 这种仪式般的行为帮助我们“跳脱时间的流动”，进入“心灵时间”。 / 你可以减少外界干扰， / 只要只阅读纸质书籍， / 或者使用单一功能的电子阅读器。"
  },
  '3:14': {
    slashed_text: "“Carry a book with you at all times” can actually work , too — / providing you dip in often enough , / so that reading becomes the default state / from which you temporarily surface to take care of business , / before dropping back down.",
    chunk_translation: "“随时随地随身带一本书”实际上也很管用—— / 只要你足够频繁地翻开阅读， / 从而让阅读成为一种默认状态， / 你只是临时浮出水面去处理事务， / 然后再次潜入书海。"
  },
  '3:15': {
    slashed_text: "On a really good day , / it no longer feels as if you’re “making time to read ,” / but just reading , / and making time for everything else.",
    chunk_translation: "在一个真正美好的日子里， / 你不再觉得好像是在“挤时间阅读”， / 而只是在阅读， / 并为其他所有事情腾出时间。"
  },

  // Text 4
  '4:1': {
    slashed_text: "Across generational lines , / Americans continue to prize many of the same traditional milestones of a successful life , / including getting married , / having children , / owning a home , / and retiring in their sixties.",
    chunk_translation: "跨越代际界限， / 美国人继续珍视成功人生的许多相同的传统里程碑， / 包括结婚、 / 生子、 / 拥有住房、 / 以及在六十多岁时退休。"
  },
  '4:2': {
    slashed_text: "But while young and old mostly agree / on what constitutes the finish line of a fulfilling life , / they offer strikingly different paths / for reaching it.",
    chunk_translation: "但尽管年轻人与年长者大体上赞同 / 关于什么构成了充实人生的终点线， / 他们却给出了截然不同的路径 / 来实现这一目标。"
  },
  '4:3': {
    slashed_text: "Young people who are still getting started in life / were more likely than older adults to prioritize personal fulfillment in their work , / to believe they will advance their careers most by regularly changing jobs , / to favor communities with more public services and a faster pace of life , / to agree that couples should be financially secure before getting married or having children , / and to maintain that children are best served by two parents working outside the home , / the survey found.",
    chunk_translation: "刚刚步入社会的年轻人 / 比年长者更有可能将工作中的个人实现放在首位， / 更有可能认为通过定期跳槽能最大程度推进职业发展， / 更偏好公共服务更多、生活节奏更快的社区， / 更赞同夫妻在结婚或生子前应具备经济保障， / 并且坚持认为父母双方都外出工作对子女成长最为有益， / 该调查发现。"
  },
  '4:4': {
    slashed_text: "From career to community and family , / these contrasts suggest / that in the aftermath of the searing Great Recession , / those just starting out in life / are defining priorities and expectations / that will increasingly spread through virtually all aspects of American life , / from consumer preferences to housing patterns to politics.",
    chunk_translation: "从职业到社区再到家庭， / 这些对比表明， / 在遭受剧烈大衰退的冲击之后， / 那些初入社会的人 / 正在确立新的优先级与期望， / 这些将日益扩散至美国生活的方方面面， / 从消费偏好、住房模式到政治态度。"
  },
  '4:5': {
    slashed_text: "Young and old converge on one key point : / Overwhelming majorities of both groups said they believe it is harder / for young people today to get started in life / than it was for earlier generations.",
    chunk_translation: "年轻人与年长者在关键一点上达成共识： / 两个群体中绝大多数人都认为， / 如今年轻人步入社会立足 / 比前几代人要更加艰难。"
  },
  '4:6': {
    slashed_text: "While younger people are somewhat more optimistic / than their elders about the prospects for those starting out today , / big majorities in both groups believe / those “just getting started in life” face a tougher climb than earlier generations / in reaching such signpost achievements / as securing a good-paying job , / starting a family , / managing debt , / and finding affordable housing.",
    chunk_translation: "尽管年轻人对如今起步者的前景 / 比长辈略微乐观一些， / 但两个群体中绝大多数人都认为， / 那些“刚步入社会的人”面临比前几代人更艰难的攀登， / 在达成标志性成就方面， / 比如获得一份高薪工作、 / 组建家庭、 / 应对债务、 / 以及寻找负担得起的住房。"
  },
  '4:8': {
    slashed_text: "Schneider , a 27-year-old auto technician from the Chicago suburbs , / says he struggled to find a job / after graduating from college.",
    chunk_translation: "施耐德，来自芝加哥郊区的一名27岁汽车技师， / 说他大学毕业后 / 费了很大劲才找到一份工作。"
  },
  '4:9': {
    slashed_text: "Even now that he is working steadily , / he said , “I can’t afford to pay my monthly mortgage payments on my own , / so I have to rent rooms out to people to make that happen.” / Looking back , he is struck / that his parents could provide a comfortable life for their children / even though neither had completed college / when he was young.",
    chunk_translation: "即使现在有了稳定的工作， / 他说：“我凭自己一人根本付不起每月的房贷， / 所以我不得不把房间出租给别人来实现这一点。” / 回想过去，他深有触动： / 他的父母能够为子女提供舒适的生活， / 尽管在他年幼时 / 父母双方都没有大学毕业。"
  },
  '4:10': {
    slashed_text: "“I still grew up in an upper middle-class home / with parents who didn’t have college degrees ,” / Schneider said.",
    chunk_translation: "“我依然是在一个中上阶层的家庭中长大的， / 尽管父母都没有大学文凭，” / 施耐德说。"
  },
  '4:11': {
    slashed_text: "“I don’t think people are capable / of that anymore.”",
    chunk_translation: "“我认为现在的人们已经无法 / 再做到那样了。”"
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
console.log(`Successfully refined 2016.json! Applied ${appliedCount} sentence fixes across 65 sentences.`);
