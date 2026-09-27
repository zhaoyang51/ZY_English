const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2017.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

const fixes = {
  // Text 1
  '1:0': {
    slashed_text: "Every Saturday morning , / at 9 am , / more than 50,000 runners set off / to run 5km around their local park.",
    chunk_translation: "每个周六早晨， / 在上午9点整， / 超过5万名跑者出发 / 绕着他们当地的公园跑完5公里。"
  },
  '1:1': {
    slashed_text: "The Parkrun phenomenon began with a dozen friends / and has inspired 400 events in the UK / and more abroad.",
    chunk_translation: "“公园跑”这一风靡现象最初始于十几个朋友， / 如今已在英国激发了400场活动， / 在海外激发的活动甚至更多。"
  },
  '1:2': {
    slashed_text: "Events are free , / staffed by thousands of volunteers.",
    chunk_translation: "各项活动均免费参加， / 由数以千计的志愿者协助组织维持。"
  },
  '1:3': {
    slashed_text: "Runners range from four years old to grandparents ; / their times range / from Andrew Baddeley’s world record 13 minutes 48 seconds / up to an hour.",
    chunk_translation: "跑步者的年龄跨度从四岁幼童到祖父母辈老人； / 他们的成绩耗时跨度 / 从安德鲁·巴德利创下的13分48秒世界纪录， / 到长达一个小时不等。"
  },
  '1:5': {
    slashed_text: "Ten years ago on Monday , / it was announced / that the Games of the 30th Olympiad / would be in London.",
    chunk_translation: "十年前的周一， / 官方正式宣布， / 第30届奥林匹克运动会 / 将在伦敦举行。"
  },
  '1:6': {
    slashed_text: "Planning documents pledged / that the great legacy of the Games / would be to lever a nation of sport lovers / away from their couches.",
    chunk_translation: "规划文件承诺， / 本届奥运会最伟大的遗产 / 将是促使一个热爱体育的国家的大众 / 离开沙发走出家门。"
  },
  '1:7': {
    slashed_text: "The population would be fitter , / healthier / and produce more winners.",
    chunk_translation: "全体国民将变得更健壮、 / 更健康， / 并涌现出更多的优胜赢家。"
  },
  '1:9': {
    slashed_text: "The number of adults doing weekly sport did rise , / by nearly 2 million in the run-up to 2012 — / but the general population was growing faster.",
    chunk_translation: "每周进行体育运动的成年人数量确实上升了， / 在2012年筹备期间增加了近200万—— / 但总体人口的增长速度更快。"
  },
  '1:11': {
    slashed_text: "The opposition claims / primary school pupils doing at least two hours of sport a week / have nearly halved.",
    chunk_translation: "反对党声称， / 每周至少进行两小时体育锻炼的小学生人数 / 几乎减半。"
  },
  '1:16': {
    slashed_text: "There is as much joy / over a puffed-out first-timer being clapped over the line / as there is about top talent shining.",
    chunk_translation: "对气喘吁吁跑过终点线并受到鼓掌欢呼的初跑者所给予的欣喜， / 丝毫不亚于 / 对闪闪发光的顶尖选手所给予的赞叹。"
  },
  '1:17': {
    slashed_text: "The Olympic bidders , by contrast , / wanted to get more people doing sport / and to produce more elite athletes.",
    chunk_translation: "相比之下，奥运申办方 / 既想促使更多人参与体育， / 又想培养出更多的精英运动员。"
  },
  '1:18': {
    slashed_text: "The dual aim was mixed up : / The stress on success over taking part / was intimidating for newcomers.",
    chunk_translation: "这两个双重目标被混为一谈： / 重获胜而轻参与的强调倾向 / 让初涉运动的新手望而生畏。"
  },
  '1:19': {
    slashed_text: "Indeed , there is something a little absurd / in the state getting involved in the planning / of such a fundamentally “grassroots” concept as community sports associations.",
    chunk_translation: "确实，国家政府介入规划 / 像社区体育协会这样 / 本质上属于“草根”理念的事物，本身就带有一点荒谬色彩。"
  },
  '1:21': {
    slashed_text: "But successive governments have presided over selling green spaces , / squeezing money from local authorities / and declining attention on sport in education.",
    chunk_translation: "但历届政府却主持主导了绿地公共空间的出售， / 压缩地方当局的财政资金， / 并减少了对教育中体育运动的关注。"
  },
  '1:22': {
    slashed_text: "Instead of wordy , worthy strategies , / future governments need to do more / to provide the conditions for sport to thrive.",
    chunk_translation: "与其制定冗长空洞、貌似高尚的战略方案， / 未来的政府更需要做出切实努力， / 为体育运动的蓬勃发展创造有利条件。"
  },
  '1:23': {
    slashed_text: "Or at least / not make them worse.",
    chunk_translation: "或者至少， / 不要让这些条件变得更糟。"
  },

  // Text 2
  '2:1': {
    slashed_text: "“Tech is designed to really suck you in ,” / says Jenny Radesky in her study of digital play , / “and digital products are there to promote maximal engagement.",
    chunk_translation: "“科技产品从设计上就是为了让你深深沉迷，” / 珍妮·拉德斯基在她关于数字娱乐的研究中说， / “而且数字产品的存在就是为了促成最大限度的参与投入。"
  },
  '2:2': {
    slashed_text: "It makes it hard to disengage , / and leads to a lot of bleed-over into the family routine.",
    chunk_translation: "这让人很难脱身抽离， / 并导致大量溢出渗透进家庭日常生活中。"
  },
  '2:4': {
    slashed_text: "Radesky has studied the use of mobile phones and tablets at mealtimes / by giving mother-child pairs a food-testing exercise.",
    chunk_translation: "拉德斯基通过让母亲和孩子结对进行一项品尝食物的测试， / 研究了就餐期间手机和平板电脑的使用情况。"
  },
  '2:5': {
    slashed_text: "She found that mothers who used devices during the exercise / started 20 per cent fewer verbal / and 39 per cent fewer nonverbal interactions with their children.",
    chunk_translation: "她发现，在测试期间使用电子设备的母亲 / 与孩子发起的语言互动减少了20%， / 非语言肢体互动减少了39%。"
  },
  '2:7': {
    slashed_text: "Parents would be looking at their emails / while the children would be making excited bids for their attention.",
    chunk_translation: "父母们往往只顾着看自己的电子邮件， / 而孩子们则兴奋地试图吸引他们的注意。"
  },
  '2:8': {
    slashed_text: "Infants are wired to look at parents’ faces / to try to understand their world , / and if those faces are blank and unresponsive — / as they often are when absorbed in a device — / it can be extremely disconcerting for the children.",
    chunk_translation: "婴儿天生就会注视父母的面孔 / 试图借此了解周围的世界， / 如果那些面孔毫无表情、没有反应—— / 正如父母沉浸在设备中时常常表现的那样—— / 这对孩子们来说会造成极大的不安。"
  },
  '2:10': {
    slashed_text: "In it , a mother is asked to interact with her child in a normal way / before putting on a blank expression / and not giving them any visual social feedback : / The child becomes increasingly distressed / as she tries to capture her mother’s attention.",
    chunk_translation: "在实验中，一位母亲被要求先以正常方式与孩子互动， / 随后换上一副毫无表情的面孔， / 不给孩子任何视觉社交反馈： / 随着孩子努力试图捕捉母亲的注意， / 她变得越来越焦躁不安。"
  },
  '2:12': {
    slashed_text: "On the other hand , / Tronick himself is concerned that the worries about kids’ use of screens / are born out of an “oppressive ideology that demands that parents should always be interacting” with their children : / “It’s based on a somewhat fantasised , very white , very upper-middle-class ideology / that says if you’re failing to expose your child to 30,000 words you are neglecting them.” / Tronick believes that just because a child isn’t learning from the screen / doesn’t mean there’s no value to it — / particularly if it gives parents time to have a shower , do housework or simply have a break from their child.",
    chunk_translation: "另一方面， / 特罗尼克本人则担心，针对孩子使用屏幕的担忧 / 源于一种“强求父母必须时刻与孩子互动”的“压迫性意识形态”： / “它基于一种带有些许幻想色彩的、非常白人、非常上层中产阶级的意识形态， / 该观念认为如果你没能让孩子接触到3万个单词，你就是在忽视怠慢他们。” / 特罗尼克认为，仅仅因为孩子没有从屏幕中学习到知识， / 并不意味着它毫无价值—— / 特别是如果它能让父母有时间洗个澡、做做家务，或者只是从带孩子中暂时解脱休息一下的话。"
  },

  // Text 3
  '3:4': {
    slashed_text: "There’s always a constant fear of falling behind everyone else / on the socially perpetuated “race to the finish line ,” / whether that be toward graduate school , / medical school / or a lucrative career.",
    chunk_translation: "人们总是持久担心落后于他人， / 在社会不断宣扬的“冲向终点线的赛跑”中， / 无论那是通往读研、 / 医学院、 / 还是高薪职业。"
  },
  '3:8': {
    slashed_text: "Gap year experiences can lessen the blow / when it comes to adjusting to college and being thrown into a brand new environment , / making it easier to focus / on academics and activities rather than acclimation blunders.",
    chunk_translation: "度过间隔年的经历可以减轻适应大学生活时的冲击， / 当面对被抛入一个全新环境时， / 使学生能够更容易地专注于 / 学业与课外活动，而不是在适应环境上频频出错。"
  },
  '3:9': {
    slashed_text: "If you’re not convinced of the inherent value / in taking a year off to explore interests , / then consider its financial impact / on future academic choices.",
    chunk_translation: "如果你对内在价值尚未信服， / 在休学一年探索兴趣这件事上， / 那么不妨考虑一下其经济影响， / 对未来的学术抉择。"
  },
  '3:11': {
    slashed_text: "This isn’t surprising , / considering the basic mandatory high school curriculum leaves students / with a poor understanding of the vast academic possibilities / that await them in college.",
    chunk_translation: "这并不奇怪， / 考虑到高中的基础必修课程让学生们 / 对等待他们在大学里探索的广阔学术可能性 / 知之甚少。"
  },
  '3:14': {
    slashed_text: "At Boston College , for example , / you would have to complete an extra year / were you to switch to the nursing school / from another department.",
    chunk_translation: "例如在波士顿学院， / 你就必须多读整整一年， / 如果你要从其他系部 / 转入护理学院的话。"
  },

  // Text 4
  '4:1': {
    slashed_text: "In 2015 , the US Forest Service for the first time / spent more than half of its $5.5 billion annual budget fighting fires — / nearly double the percentage it spent on such efforts 20 years ago.",
    chunk_translation: "2015年，美国国家林业局首次 / 将其55亿美元年度预算的一半以上用于灭火—— / 这一比例几乎是20年前在此类工作上支出比例的两倍。"
  },
  '4:2': {
    slashed_text: "In effect , fewer federal funds today are going towards the agency’s other work — / such as forest conservation , / watershed and cultural resources management , / and infrastructure upkeep — / that affect the lives of all Americans.",
    chunk_translation: "实际上，如今流向该机构其他工作的联邦资金减少了—— / 比如森林保护、 / 流域与文化资源管理、 / 以及基础设施维护—— / 这些都关系到全体美国人的生活。"
  },
  '4:3': {
    slashed_text: "Another nationwide concern is whether public funds from other agencies / are going into construction / in fire-prone districts.",
    chunk_translation: "另一个全国性的担忧是，来自其他机构的公共资金 / 是否正在流入 / 火灾易发地区的建设中。"
  },
  '4:4': {
    slashed_text: "As Moritz puts it , / how often are federal dollars building homes / that are likely to be lost to a wildfire?",
    chunk_translation: "正如莫里茨所说， / 联邦资金有多少次被用于建造那些 / 极有可能在野火中毁于一旦的房屋？"
  },
  '4:7': {
    slashed_text: "Like , ‘Wait a minute , is this OK?’ / Do we want instead to redirect those funds / to concentrate on lower-hazard parts of the landscape?”",
    chunk_translation: "比如，‘等一下，这样做合适吗？’ / 我们是否反而希望将这些资金转投 / 集中在危险性较低的区域？”"
  },
  '4:10': {
    slashed_text: "Over the past decade , the focus has been on climate change — / how the warming of the Earth from greenhouse gases / is leading to conditions that worsen fires.",
    chunk_translation: "在过去的十年里，焦点一直集中在气候变化上—— / 即温室气体导致地球变暖 / 是如何引发让火灾更加恶化的环境条件的。"
  },
  '4:11': {
    slashed_text: "While climate is a key element , Moritz says , / it shouldn’t come at the expense of the rest of the equation.",
    chunk_translation: "虽然气候是一个关键因素，莫里茨说， / 但它不应以忽视方程式中其余部分为代价。"
  },
  '4:13': {
    slashed_text: "Failing to recognize that , he notes , / leads to “an overly simplified view of what the solutions might be.",
    chunk_translation: "未能认识到这一点，他指出， / 会导致“对可能的解决方案持有一种过度简化的看法。"
  },
  '4:14': {
    slashed_text: "Our perception of the problem / and of what the solution is / becomes very limited.”",
    chunk_translation: "我们对问题的认知 / 以及对解决方案的构想 / 会变得非常局限。”"
  },
  '4:15': {
    slashed_text: "At the same time , people continue to treat fire as an event / that needs to be wholly controlled / and unleashed only out of necessity , / says Professor Balch at the University of Colorado.",
    chunk_translation: "与此同时，人们继续将火灾视为一种事件， / 即需要被彻底控制、 / 仅在必要时才被释放的现象， / 科罗拉多大学的鲍尔奇教授说。"
  },
  '4:16': {
    slashed_text: "But acknowledging fire’s inevitable presence in human life / is an attitude crucial to developing the laws , policies , and practices / that make it as safe as possible , / she says.",
    chunk_translation: "但承认火在人类生活中不可避免的存在， / 是一种至关重要的态度，有助于制定法律、政策和实践做法， / 使其尽可能安全， / 她说。"
  },
  '4:17': {
    slashed_text: "“We’ve disconnected ourselves / from living with fire ,” / Balch says.",
    chunk_translation: "“我们已经割裂了自己 / 与火共处的联系，” / 鲍尔奇说。"
  },
  '4:18': {
    slashed_text: "“It is really important to understand / and try and tease out / what is the human connection with fire today.”",
    chunk_translation: "“真正重要的是去理解、 / 并尝试理清 / 当今人类与火究竟存在怎样的联系。”"
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
console.log(`Successfully refined 2017.json! Applied ${appliedCount} sentence fixes across 74 sentences.`);
