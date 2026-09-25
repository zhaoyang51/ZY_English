// 2016-2019 Detailed Translation Analysis Data (3-Step Teacher Methodology)
module.exports = {
  2016: [
    {
      sid: 1,
      pid: 0,
      en: "The supermarket is designed to lure customers into spending as much time as possible within its doors.",
      cn: "超市的设计初衷，正是为了诱导顾客在其门店内尽可能多地逗留停留。",
      grammar_breakdown: "主干为被动语态 The supermarket is designed to do...；不定式短语内部含有 lure sb into doing sth 结构；as much time as possible 为数量状语，within its doors 为地点介词短语。",
      reassembly_notes: "被动转主动：is designed to 译为‘……的设计初衷正是为了……’；lure sb into doing 译为‘引诱/诱导某人做某事’；within its doors 转译为‘在门店内/在店内’。",
      scoring_points: [
        {
          phrase: "The supermarket is designed to",
          score: 0.5,
          guide: "被动语态转主动，译为‘超市的设计旨在/其设计初衷是’。意群精准译为‘超市的设计旨在’",
          vocab: [
            { word: "design", pos: "v.", common: "设计；计划", context: "be designed to 旨在；初衷是为了" }
          ]
        },
        {
          phrase: "lure customers into spending as much time as possible",
          score: 1.0,
          guide: "lure sb into doing 考研核心短语‘引诱/诱惑某人做某事’；as much time as possible 译为‘尽可能多的时间’。意群精准译为‘诱导顾客尽可能耗费更多的时间’",
          vocab: [
            { word: "lure", pos: "v.", common: "引诱；诱惑", context: "商业营销手段上的引诱" },
            { word: "customer", pos: "n.", common: "顾客；客户", context: "超市消费者" }
          ]
        },
        {
          phrase: "within its doors",
          score: 0.5,
          guide: "within its doors 介词短语，比喻修辞‘在超市门内/在店内’。意群精准译为‘逗留在超市门店内’",
          vocab: [
            { word: "within", pos: "prep.", common: "在……之内", context: "在营业场所范围内部" }
          ]
        }
      ]
    },
    {
      sid: 2,
      pid: 0,
      en: "The reason for this is simple: The longer you stay in the store, the more stuff you'll see, and the more stuff you see, the more you'll buy.",
      cn: "其中的原因很简单：你在店里逗留的时间越长，看到的商品就越多；而你看到的商品越多，购买的也就越多。",
      grammar_breakdown: "冒号前为主系表 The reason for this is simple；冒号后包含两组并列的 the more..., the more... 经典比较句型。",
      reassembly_notes: "冒号后为双重 the + 比较级，the + 比较级结构，前后对仗工整，顺译出‘越……就越……；而越……就越……’的递进因果逻辑。",
      scoring_points: [
        {
          phrase: "The reason for this is simple:",
          score: 0.5,
          guide: "主系表结构引出解释，顺译即可。意群精准译为‘这背后的原因很简单：’",
          vocab: [
            { word: "reason", pos: "n.", common: "理由；原因", context: "商业营销行为背后的动因" }
          ]
        },
        {
          phrase: "The longer you stay in the store, the more stuff you'll see",
          score: 0.5,
          guide: "the more..., the more... 比较结构，stuff 在此指代各类商品货物。意群精准译为‘在店里呆得越久，看到的商品就越多’",
          vocab: [
            { word: "stuff", pos: "n.", common: "东西；原料", context: "超市陈列的各种商品" }
          ]
        },
        {
          phrase: "and the more stuff you see, the more you'll buy",
          score: 1.0,
          guide: "第二组比较结构承接上文，形成连环递进逻辑。意群精准译为‘而你看到的货品越多，买得也就越多’",
          vocab: [
            { word: "buy", pos: "v.", common: "购买", context: "掏钱消费选购" }
          ]
        }
      ]
    },
    {
      sid: 3,
      pid: 1,
      en: "And supermarkets contain a lot of stuff.",
      cn: "而超市里的商品确实琳琅满目、应有尽有。",
      grammar_breakdown: "简单主谓宾句：supermarkets 为主语，contain 为谓语，a lot of stuff 为宾语。",
      reassembly_notes: "a lot of stuff 过于口语化，重组翻译时运用汉语四字成语‘琳琅满目/应有尽有’进行雅化与润色。",
      scoring_points: [
        {
          phrase: "And supermarkets contain a lot of stuff",
          score: 2.0,
          guide: "contain 译为‘包含/容纳’；a lot of stuff 意译为‘货品浩繁/琳琅满目’。意群精准译为‘而且超市里所容纳的货物确实数量惊人’",
          vocab: [
            { word: "contain", pos: "v.", common: "包含；容纳；克制", context: "陈列包罗大量商品" },
            { word: "stuff", pos: "n.", common: "物品；东西", context: "各类货物商品" }
          ]
        }
      ]
    },
    {
      sid: 4,
      pid: 1,
      en: "The average supermarket, according to the Food Marketing Institute, carries some 44,000 different items, and many carry tens of thousands more.",
      cn: "据食品营销协会统计，一家普通超市通常销售大约4.4万种不同的货品，许多大型超市的货品甚至还要多出数万种。",
      grammar_breakdown: "according to... 为插入语；and 连接两个并列分句：前一句主谓宾 The average supermarket carries some 44,000 different items；后一句 many carry tens of thousands more。",
      reassembly_notes: "语序调整：将插入语 according to the Food Marketing Institute 提到句首‘据……统计’；carries 熟词僻义（商店售卖/有某种存货），some 在数词前为副词‘大约’。",
      scoring_points: [
        {
          phrase: "The average supermarket, according to the Food Marketing Institute",
          score: 0.5,
          guide: "average 译为‘普通的/一般的’；according to 插入语提至句首，Food Marketing Institute 专有名词。意群精准译为‘据食品营销协会统计，一家普通超市’",
          vocab: [
            { word: "average", pos: "adj.", common: "平均的；普通的", context: "普通典型的；常规规模的" },
            { word: "institute", pos: "n.", common: "协会；学院；研究所", context: "行业协会研究机构" }
          ]
        },
        {
          phrase: "carries some 44,000 different items",
          score: 1.0,
          guide: "carry 熟词僻义，指‘售卖/铺货’；some 修饰数词为‘大约’；items 译为‘商品种类/单品’。意群精准译为‘通常会售卖大约4.4万种各色商品’",
          vocab: [
            { word: "carry", pos: "v.", common: "携带；售卖（熟词僻义）", context: "商店有存货并持续销售" },
            { word: "item", pos: "n.", common: "项目；一件商品", context: "SKU/商品单品种类" }
          ]
        },
        {
          phrase: "and many carry tens of thousands more",
          score: 0.5,
          guide: "many 代指许多大型超市；tens of thousands more 译为‘还要多出数万种’。意群精准译为‘而许多超市的商品数量还要多出数万种’",
          vocab: [
            { word: "tens of thousands", pos: "phrase", common: "成千上万", context: "数以万计的增量" }
          ]
        }
      ]
    },
    {
      sid: 5,
      pid: 2,
      en: "The sheer volume of available choice is enough to send shoppers into a state of information overload.",
      cn: "摆在面前如此庞大的可供选择数量，足以让购物者陷入信息过载的状态。",
      grammar_breakdown: "主语为 The sheer volume of available choice，包含两个介词短语修饰；谓语为 is enough to do...；send sb into... 为结果使役结构。",
      reassembly_notes: "sheer volume 为经典高频词组（极其庞大的数量）；send sb into 译为‘使某人陷入……状态’；information overload 为现代认知心理学术语‘信息过载’。",
      scoring_points: [
        {
          phrase: "The sheer volume of available choice",
          score: 1.0,
          guide: "sheer 考研重点词‘极度的/纯粹的’；volume 译为‘数量/容积’；available choice 译为‘可供挑选的选择’。意群精准译为‘如此庞大的可选商品数量’",
          vocab: [
            { word: "sheer", pos: "adj.", common: "纯粹的；全然的；陡峭的", context: "数量极多到令人惊叹的" },
            { word: "volume", pos: "n.", common: "体积；容积；总量", context: "可供选择的总数量" },
            { word: "available", pos: "adj.", common: "可利用的；可获得的", context: "摆在货架上供挑选的" }
          ]
        },
        {
          phrase: "is enough to send shoppers into a state of information overload",
          score: 1.0,
          guide: "send sb into a state of 译为‘让某人陷入……的境地’；information overload 专业词汇‘信息过载’。意群精准译为‘足以让消费者陷入信息过载的瘫痪状态’",
          vocab: [
            { word: "shopper", pos: "n.", common: "购物者", context: "前来采购的顾客" },
            { word: "overload", pos: "n./v.", common: "过载；超载", context: "大脑信息负荷超载" }
          ]
        }
      ]
    },
    {
      sid: 6,
      pid: 2,
      en: "According to brain-scan experiments, the demands of so much decision-making quickly become too much for us.",
      cn: "脑部扫描实验显示，做出如此繁复的决策需求，很快就会让我们的大脑难以承受。",
      grammar_breakdown: "According to brain-scan experiments 为介词状语；主干为 the demands of so much decision-making quickly become too much for us；the demands 为主语，become 为系动词，too much 为表语。",
      reassembly_notes: "介词短语提至句首；too much for us 英语口语习惯表达，指‘超过负荷、让人难以招架’，意译为‘让我们的大脑不堪重负/难以承受’。",
      scoring_points: [
        {
          phrase: "According to brain-scan experiments",
          score: 0.5,
          guide: "brain-scan experiments 科技常识词‘脑部扫描实验’。意群精准译为‘脑部扫描实验表明’",
          vocab: [
            { word: "scan", pos: "n./v.", common: "扫描；细看", context: "医学脑电或核磁扫描" },
            { word: "experiment", pos: "n.", common: "实验；尝试", context: "科学实证研究" }
          ]
        },
        {
          phrase: "the demands of so much decision-making",
          score: 0.5,
          guide: "demands 名词‘要求/需求/消耗’；decision-making 译为‘决策/做出决断’。意群精准译为‘如此频繁做决定的心智负担’",
          vocab: [
            { word: "demand", pos: "n.", common: "要求；需求", context: "对大脑认知精力的苛刻要求" },
            { word: "decision-making", pos: "n.", common: "决策制定", context: "权衡挑选商品的决断过程" }
          ]
        },
        {
          phrase: "quickly become too much for us",
          score: 1.0,
          guide: "become too much for sb 习语‘使某人无法招架/难以负荷’。意群精准译为‘很快就会让人招架不住’",
          vocab: [
            { word: "quickly", pos: "adv.", common: "迅速地", context: "转瞬间；很快" }
          ]
        }
      ]
    },
    {
      sid: 7,
      pid: 2,
      en: "After about 40 minutes of shopping, most people stop struggling to be rationally selective, and instead begin shopping emotionally – which is the point at which we accumulate the 50 percent of stuff in our cart that we never intended buying.",
      cn: "在逛街采购大约40分钟之后，多数人便不再苦苦坚持理性挑选，转而开始冲动消费——正是在这一刻，我们把购物车里50%原本根本没打算购买的商品堆了进去。",
      grammar_breakdown: "时间状语为 After about 40 minutes of shopping；主句主干包含并列谓语 stop struggling... and begin shopping...；破折号后 which 引导非限制性定语从句，从句中嵌套 at which 引导的定语从句修饰 the point，从句末尾包含 that 定语从句修饰 stuff。",
      reassembly_notes: "长难句经典三层拆分：前半句先交待时间与理性心理崩溃过程（不再坚持理性筛选）；中段承接情感冲动购物；后半段破折号双重定从拆译为‘正是在这一时刻……’，将 cart that we never intended buying 的限定定从前置润色。",
      scoring_points: [
        {
          phrase: "After about 40 minutes of shopping, most people stop struggling to be rationally selective",
          score: 0.5,
          guide: "stop doing sth 停止做某事；struggle to do 挣扎着做某事；rationally selective 译为‘理智地进行挑选’。意群精准译为‘在购物大约40分钟之后，大部分人不再勉力保持理性筛选’",
          vocab: [
            { word: "struggle", pos: "v.", common: "挣扎；努力斗争", context: "勉力抵抗诱惑；苦苦坚持" },
            { word: "rationally", pos: "adv.", common: "理性地", context: "按逻辑与预算理智地" },
            { word: "selective", pos: "adj.", common: "有选择性的", context: "精挑细选的" }
          ]
        },
        {
          phrase: "and instead begin shopping emotionally",
          score: 0.5,
          guide: "instead 表转折替代‘取而代之的是’；emotionally 译为‘凭感性/冲动地’。意群精准译为‘反而开始全凭感性与情绪冲动购物’",
          vocab: [
            { word: "instead", pos: "adv.", common: "反而；代替", context: "转向另一种相反的行为模式" },
            { word: "emotionally", pos: "adv.", common: "情绪化地", context: "凭感觉与情绪冲动" }
          ]
        },
        {
          phrase: "which is the point at which we accumulate the 50 percent of stuff in our cart",
          score: 0.5,
          guide: "which 指代前文的时间点，at which 引导从句修饰 point；accumulate 核心动词‘堆积/积聚’。意群精准译为‘而正是从这时起，我们开始在购物车里胡乱堆放那半数的货品’",
          vocab: [
            { word: "accumulate", pos: "v.", common: "积累；积聚", context: "一件件往购物车里塞堆" },
            { word: "cart", pos: "n.", common: "手推车；购物车", context: "超市手推车" }
          ]
        },
        {
          phrase: "that we never intended buying",
          score: 0.5,
          guide: "that 定语从句修饰 stuff；intend doing/to do 译为‘原本打算做……’；never 表否定。意群精准译为‘那些我们原本根本无意购买的商品’",
          vocab: [
            { word: "intend", pos: "v.", common: "打算；意图", context: "原本有购买规划" }
          ]
        }
      ]
    }
  ],

  2017: [
    {
      sid: 1,
      pid: 0,
      en: "My dream has always been to work somewhere in an area between fashion and publishing.",
      cn: "我的梦想一直都是能够在时尚与出版两大行业的交汇领域工作。",
      grammar_breakdown: "主系表结构：主语 My dream，谓语 has always been，表语为不定式短语 to work somewhere；介词短语 in an area between fashion and publishing 作地点状语。",
      reassembly_notes: "between fashion and publishing 修饰 an area，地道汉语译为‘时尚与出版两大行业的交汇/交叉领域’，顺畅贴切。",
      scoring_points: [
        {
          phrase: "My dream has always been",
          score: 0.5,
          guide: "完成时态体现一贯追求，译为‘我的梦想始终是……’。意群精准译为‘我一直以来的梦想就是’",
          vocab: [
            { word: "dream", pos: "n.", common: "梦想；梦境", context: "长久以来的职业理想" }
          ]
        },
        {
          phrase: "to work somewhere in an area between fashion and publishing",
          score: 1.5,
          guide: "to work somewhere 译为‘在某处工作’；between fashion and publishing 定语前置‘介于时尚与出版业之间’。意群精准译为‘在时尚与出版跨界交叉的领域谋得一份工作’",
          vocab: [
            { word: "fashion", pos: "n.", common: "时尚；风尚", context: "时装与时尚行业" },
            { word: "publishing", pos: "n.", common: "出版；出版业", context: "图书杂志与媒体出版行业" }
          ]
        }
      ]
    },
    {
      sid: 2,
      pid: 0,
      en: "Two years before graduating from secondary school, I took a sewing and design course thinking that I would move on to a fashion design course.",
      cn: "在中学毕业前两年，我参加了缝纫与设计课程，当时我心想自己随后会进一步去攻读服装设计专业。",
      grammar_breakdown: "时间状语 Two years before graduating from secondary school；主句主干为 I took a sewing and design course；现在分词短语 thinking that... 作伴随状语，that 后引导宾语从句。",
      reassembly_notes: "时间状语提前；thinking that 分词伴随译为‘心中揣着……的想法/心想’；move on to 译为‘进阶到/进而学习’，层次分明。",
      scoring_points: [
        {
          phrase: "Two years before graduating from secondary school",
          score: 0.5,
          guide: "before graduating 介词加动名词；secondary school 译为‘中学/高中’。意群精准译为‘在中学毕业前的两年’",
          vocab: [
            { word: "graduate", pos: "v.", common: "毕业", context: "学业完成毕业" },
            { word: "secondary", pos: "adj.", common: "次要的；中等的", context: "secondary school 中等教育学校" }
          ]
        },
        {
          phrase: "I took a sewing and design course",
          score: 0.5,
          guide: "take a course 经典搭配‘修读/参加一门课程’；sewing 译为‘缝纫/刺绣裁剪’。意群精准译为‘我参加了一门缝纫与设计课程’",
          vocab: [
            { word: "sewing", pos: "n.", common: "缝纫；针线活", context: "服装缝纫工艺" },
            { word: "course", pos: "n.", common: "课程；过程", context: "技能培训课程" }
          ]
        },
        {
          phrase: "thinking that I would move on to a fashion design course",
          score: 1.0,
          guide: "thinking 分词伴随状语；move on to 考研核心短语‘进而转向/继续学习’。意群精准译为‘心里琢磨着自己将来会接着去读服装设计专业’",
          vocab: [
            { word: "move on to", pos: "phr.", common: "进而转向；进入下一阶段", context: "升学进入更专业的领域" }
          ]
        }
      ]
    },
    {
      sid: 3,
      pid: 1,
      en: "However, during that course I realized I was not good enough in this area to compete with other creative personalities in the future, so I decided that it was not the right path for me.",
      cn: "然而，在那门课程的学习期间，我意识到自己在这一领域并不出众，未来根本无法与其他富有创意的人才竞争，所以我断定这并非适合我的道路。",
      grammar_breakdown: "However 表转折；during that course 为时间状语；主干包含 so 连接的因果并列句：前句 I realized 后接省略 that 的宾语从句，从句内部包含 not good enough... to compete with 结构；后句 so I decided that 引导宾语从句。",
      reassembly_notes: "长因果句：前半句‘意识到天赋不足、无法竞争’作为原因顺译；后半句‘断定不适合自己’作为果。creative personalities 属于熟词僻义（借代‘富有创造力的人才’）。",
      scoring_points: [
        {
          phrase: "However, during that course I realized",
          score: 0.5,
          guide: "However 转折；during that course 译为‘在那段学习期间’；realize 译为‘领悟到/意识到’。意群精准译为‘然而在学习那门课的过程中，我意识到’",
          vocab: [
            { word: "realize", pos: "v.", common: "意识到；实现", context: "清醒地认识到现实" }
          ]
        },
        {
          phrase: "I was not good enough in this area to compete with other creative personalities in the future",
          score: 1.0,
          guide: "not good enough to 译为‘不够优秀以至于无法……’；compete with 译为‘与……一较高下/竞争’；personalities 熟词僻义，指‘知名人士/有个性的人才’。意群精准译为‘自己在该领域资质平平，未来根本无法与那些极富创造力的人才一较高下’",
          vocab: [
            { word: "compete", pos: "v.", common: "竞争；对抗", context: "职场与艺术维度的竞争" },
            { word: "creative", pos: "adj.", common: "有创意的；创造性的", context: "艺术创造力极强的" },
            { word: "personality", pos: "n.", common: "个性；名人（熟词僻义）", context: "具备鲜明才华特质的人士" }
          ]
        },
        {
          phrase: "so I decided that it was not the right path for me",
          score: 0.5,
          guide: "so 因果连词；decided 引导从句；not the right path 比喻‘并非适合我的发展方向’。意群精准译为‘因此我认定这并非适合自己的正确道路’",
          vocab: [
            { word: "path", pos: "n.", common: "小路；道路", context: "人生与职业发展道路" }
          ]
        }
      ]
    },
    {
      sid: 4,
      pid: 1,
      en: "Before applying for university I told everyone that I would study journalism, because writing was, and still is, one of my favourite activities.",
      cn: "在申请大学之前，我告诉所有人自己会攻读新闻学，因为写作在过去是、并且现在依然是我最喜欢的活动之一。",
      grammar_breakdown: "Before applying for university 为时间状语；主干为 I told everyone that...；because 引导原因状语从句，从句主谓包含 was, and still is 插入并列时态。",
      reassembly_notes: "Before applying for university 提至句首；was, and still is 巧妙对仗，译出‘过去是、现在也依然是’的时态跨度感。",
      scoring_points: [
        {
          phrase: "Before applying for university I told everyone that I would study journalism",
          score: 1.0,
          guide: "apply for university 译为‘申请大学’；study journalism 译为‘学习新闻学/新闻专业’。意群精准译为‘在报考大学前，我跟所有人都说自己打算去读新闻学’",
          vocab: [
            { word: "apply", pos: "v.", common: "申请；应用", context: "apply for university 申请高校录取" },
            { word: "journalism", pos: "n.", common: "新闻学；新闻业", context: "大学新闻与采编专业" }
          ]
        },
        {
          phrase: "because writing was, and still is, one of my favourite activities",
          score: 1.0,
          guide: "because 原因从句；was, and still is 插入语兼顾过去与现在；favourite activities 译为‘最热爱的事情/活动之一’。意群精准译为‘因为写作向来就是、且至今仍是我最喜欢的爱好之一’",
          vocab: [
            { word: "favourite", pos: "adj./n.", common: "特别喜爱的", context: "心头所爱；最青睐的" },
            { word: "activity", pos: "n.", common: "活动；行动", context: "日常热爱的事情/爱好" }
          ]
        }
      ]
    },
    {
      sid: 5,
      pid: 2,
      en: "But, to be honest, I said it, because I thought that fashion and I together were just a dream – I knew that no one could imagine me in the fashion industry at all!",
      cn: "但老实说，我之所以那么说，是因为我觉得自己与时尚结缘不过是痴人说梦——我心知肚明，根本没有人能想象我投身时尚界的模样！",
      grammar_breakdown: "to be honest 为插入语；主句主干为 I said it；because 引导原因状语从句；破折号后 I knew that... 为同位补充说明，宾语从句含 not... at all 完全否定。",
      reassembly_notes: "to be honest 译为‘平心而论/老实说’；fashion and I together were just a dream 意译为‘自己涉足时尚界不过是一场虚幻的梦境/痴人说梦’；not at all 加强语气‘根本不……’。",
      scoring_points: [
        {
          phrase: "But, to be honest, I said it",
          score: 0.5,
          guide: "to be honest 插入语‘老实说/坦白讲’；said it 译为‘之所以那样讲’。意群精准译为‘但平心而论，我之所以这么说’",
          vocab: [
            { word: "honest", pos: "adj.", common: "诚实的；老实的", context: "to be honest 坦白说；平心而论" }
          ]
        },
        {
          phrase: "because I thought that fashion and I together were just a dream",
          score: 0.5,
          guide: "because 原因从句；fashion and I together 形象表述，指‘我和时尚搭边’；just a dream 译为‘黄粱一梦/痴心妄想’。意群精准译为‘是因为我觉得自己涉足时尚圈纯属痴人说梦’",
          vocab: [
            { word: "dream", pos: "n.", common: "梦想；幻觉", context: "脱离实际的虚妄幻想" }
          ]
        },
        {
          phrase: "I knew that no one could imagine me in the fashion industry at all!",
          score: 1.0,
          guide: "knew that 引导从句；imagine sb in... 译为‘想象某人身处……行业’；not... at all 表绝无可能。意群精准译为‘我很清楚身边完全没人能想象我置身于时尚界！’",
          vocab: [
            { word: "imagine", pos: "v.", common: "想象；设想", context: "在大脑中勾画某种场景" },
            { word: "industry", pos: "n.", common: "工业；行业", context: "the fashion industry 时尚行业" }
          ]
        }
      ]
    },
    {
      sid: 6,
      pid: 2,
      en: "So I decided to look for some fashion-related courses that included writing.",
      cn: "于是，我决定去搜寻一些兼顾写作的时尚相关专业课程。",
      grammar_breakdown: "简单句，主语 I，谓语 decided to look for，宾语 some fashion-related courses；that included writing 为定语从句修饰 courses。",
      reassembly_notes: "fashion-related 复合形容词译为‘时尚相关的’；that included writing 定语从句前置修饰‘涵盖写作内容的/兼顾写作的’，语意凝练。",
      scoring_points: [
        {
          phrase: "So I decided to look for some fashion-related courses",
          score: 1.0,
          guide: "decide to do 决定做某事；look for 寻找；fashion-related 复合形容词‘与时尚相关的’。意群精准译为‘于是我决定去找一些与时尚相关的课程’",
          vocab: [
            { word: "decide", pos: "v.", common: "决定；决断", context: "下定决心采取行动" },
            { word: "related", pos: "adj.", common: "相关的；有联系的", context: "fashion-related 时尚相关的" }
          ]
        },
        {
          phrase: "that included writing",
          score: 1.0,
          guide: "that 定语从句前置，include 译为‘包含/涵盖’。意群精准译为‘其中涵盖了写作内容的课程’",
          vocab: [
            { word: "include", pos: "v.", common: "包括；包含", context: "课程培养方案中涵盖" }
          ]
        }
      ]
    },
    {
      sid: 7,
      pid: 2,
      en: "This is when I noticed the course \"Fashion Media & Promotion.\"",
      cn: "正是在这个时候，我留意到了“时尚传媒与品牌推广”这门课程。",
      grammar_breakdown: "主系表结构：This is when...；when 引导表语从句，从句主谓宾为 I noticed the course...",
      reassembly_notes: "This is when... 经典强调时间节点句型，译为‘正是在这个时候……’；Promotion 商业熟词僻义（品牌公关与营销推广）。",
      scoring_points: [
        {
          phrase: "This is when I noticed the course",
          score: 1.0,
          guide: "This is when 句型译为‘正是在此时/正是那时候’；notice 动词‘注意到/留意到’。意群精准译为‘正是在那个契机下，我注意到了这门课程’",
          vocab: [
            { word: "notice", pos: "v.", common: "注意；留心", context: "目光捕捉到并引起浓厚兴趣" }
          ]
        },
        {
          phrase: "\"Fashion Media & Promotion.\"",
          score: 1.0,
          guide: "专有名词课程名；Fashion Media 译为‘时尚媒体/时尚传媒’；Promotion 译为‘公关推广/宣传营销’。意群精准译为‘名为“时尚媒体与品牌推广”’",
          vocab: [
            { word: "media", pos: "n.", common: "媒体；媒介", context: "时尚新闻媒体与期刊" },
            { word: "promotion", pos: "n.", common: "晋升；促销；推广", context: "品牌公关宣传与营销推广" }
          ]
        }
      ]
    }
  ],

  2018: [
    {
      sid: 1,
      pid: 0,
      en: "A fifth grader gets a homework assignment to select his future career path from a list of occupations.",
      cn: "一名五年级小学生接到了一项家庭作业：从一份职业清单中挑选出自己未来的职业规划路线。",
      grammar_breakdown: "主谓宾句：主语 A fifth grader，谓语 gets，宾语 a homework assignment；不定式短语 to select... 作后置定语修饰 assignment，from 介词短语表示选择的范围。",
      reassembly_notes: "fifth grader 译为‘五年级学生/小学生’；assignment 后接不定式作定语，顺译为冒号解释作业内容，通顺符合汉语行文。",
      scoring_points: [
        {
          phrase: "A fifth grader gets a homework assignment",
          score: 1.0,
          guide: "fifth grader 译为‘五年级学生’；homework assignment 考研基础词汇‘家庭作业’。意群精准译为‘一名五年级的小学生领到了一项作业任务’",
          vocab: [
            { word: "grader", pos: "n.", common: "……年级的学生", context: "fifth grader 小学五年级学生" },
            { word: "assignment", pos: "n.", common: "任务；作业；分配", context: "学校布置的功课/作业" }
          ]
        },
        {
          phrase: "to select his future career path from a list of occupations",
          score: 1.0,
          guide: "to select 不定式定语；career path 译为‘职业发展路径/职业规划’；occupations 核心词‘职业’。意群精准译为‘从一份职业列表中选出自己未来的职业道路’",
          vocab: [
            { word: "career", pos: "n.", common: "职业；生涯", context: "毕生从事的职业生涯" },
            { word: "occupation", pos: "n.", common: "占领；职业", context: "社会各类行业工种" }
          ]
        }
      ]
    },
    {
      sid: 2,
      pid: 0,
      en: "He ticks \"astronaut\" but quickly adds \"scientist\" to the list and selects it as well.",
      cn: "他在“宇航员”一栏打了勾，但很快又在清单上添加了“科学家”，并同样将其勾选。",
      grammar_breakdown: "并列谓语结构：He 为主语，ticks \"astronaut\" 与 adds... and selects... 由 but 连接构成并列动作。",
      reassembly_notes: "ticks 动词熟词僻义（打勾勾选）；as well 译为‘同样/也’，两个并列动作流畅连贯。",
      scoring_points: [
        {
          phrase: "He ticks \"astronaut\" but quickly adds \"scientist\" to the list",
          score: 1.0,
          guide: "tick 动词‘打钩选定’；astronaut 译为‘宇航员/航天员’；adds... to... 译为‘把……添入清单’。意群精准译为‘他勾选了“宇航员”，但旋即又在清单上写下“科学家”’",
          vocab: [
            { word: "tick", pos: "v.", common: "滴答响；打勾标记", context: "在选项方框内打钩" },
            { word: "astronaut", pos: "n.", common: "宇航员", context: "航天飞行员" }
          ]
        },
        {
          phrase: "and selects it as well",
          score: 1.0,
          guide: "select 动词‘选择/挑选’；as well 译为‘同样地/也’。意群精准译为‘并且同样予以选定’",
          vocab: [
            { word: "select", pos: "v.", common: "挑选；选拔", context: "慎重做出选择" }
          ]
        }
      ]
    },
    {
      sid: 3,
      pid: 1,
      en: "The boy is convinced that if he reads enough, he can explore as many career paths as he likes.",
      cn: "小男孩坚信，只要自己阅读量足够丰富，他就能随心所欲地探索尽可能多的职业道路。",
      grammar_breakdown: "主干为 The boy is convinced that...；that 引导宾语从句；从句中嵌套 if 引导的条件状语从句；as many... as he likes 为比较同级结构。",
      reassembly_notes: "be convinced that 核心短语（坚信/深信不疑）；条件从句 if he reads enough 提前翻译为‘只要读得足够多’，as... as he likes 顺译为‘随心所欲/尽情’。",
      scoring_points: [
        {
          phrase: "The boy is convinced that if he reads enough",
          score: 1.0,
          guide: "be convinced that 考研核心短语‘坚信……’；if reads enough 条件从句译为‘只要博览群书/阅读量足够’。意群精准译为‘小男孩深信只要自己大量阅读’",
          vocab: [
            { word: "convinced", pos: "adj.", common: "确信的；深信不疑的", context: "内心坚信某种真理" }
          ]
        },
        {
          phrase: "he can explore as many career paths as he likes",
          score: 1.0,
          guide: "explore 动词‘探索/涉足’；as many... as he likes 译为‘想探索多少就探索多少/尽情探索’。意群精准译为‘就能任意探索自己心仪的诸多职业道路’",
          vocab: [
            { word: "explore", pos: "v.", common: "探测；探索", context: "对未知职业可能性的尝试与了解" }
          ]
        }
      ]
    },
    {
      sid: 4,
      pid: 1,
      en: "And so he reads – everything from encyclopedias to science fiction novels.",
      cn: "于是他博览群书——上至百科全书，下至科幻小说，无所不读。",
      grammar_breakdown: "主干 And so he reads；破折号后 everything from A to B 作同位泛指说明阅读面之广。",
      reassembly_notes: "from A to B 译为‘从……到……’，增补四字短语‘博览群书’或‘无所不读’，体现读书之痴迷与广泛。",
      scoring_points: [
        {
          phrase: "And so he reads –",
          score: 0.5,
          guide: "And so 承接‘于是/正因如此’；reads 顺译为‘开始大量阅读’。意群精准译为‘于是他开启了阅读之旅——’",
          vocab: [
            { word: "reads", pos: "v.", common: "阅读", context: "如饥似渴地博览群书" }
          ]
        },
        {
          phrase: "everything from encyclopedias to science fiction novels",
          score: 1.5,
          guide: "encyclopedias 专有名词‘百科全书’；science fiction novels 译为‘科幻小说’；from... to... 结构。意群精准译为‘从大部头的百科全书，到各类科幻小说，无所不读’",
          vocab: [
            { word: "encyclopedia", pos: "n.", common: "百科全书", context: "包罗万象的知识参考书" },
            { word: "fiction", pos: "n.", common: "虚构小说", context: "science fiction 科幻文学" }
          ]
        }
      ]
    },
    {
      sid: 5,
      pid: 1,
      en: "He reads so passionately that his parents have to institute a \"no reading policy\" at the dinner table.",
      cn: "他的阅读热情如此高涨，以至于父母不得不立下一项家规：在餐桌上“严禁看书”。",
      grammar_breakdown: "主干为 so... that... 结果状语从句结构；主句 He reads so passionately；that 从句主干 his parents have to institute a policy；at the dinner table 为地点介词短语。",
      reassembly_notes: "so... that... 顺译为‘如此……以至于……’；institute a policy 考研熟词僻义（动词 institute 意为‘推行/设立/制定制度’），译为‘立下一条规定/家规’。",
      scoring_points: [
        {
          phrase: "He reads so passionately that",
          score: 0.5,
          guide: "passionately 副词‘热情充沛地/如饥似渴地’；so... that 引导结果。意群精准译为‘他的阅读劲头如此痴迷狂热’",
          vocab: [
            { word: "passionately", pos: "adv.", common: "热情地；热烈地", context: "入迷沉醉地；狂热地" }
          ]
        },
        {
          phrase: "his parents have to institute a \"no reading policy\" at the dinner table",
          score: 1.5,
          guide: "institute 动词熟词僻义‘设立/推行规矩’；policy 转译为‘家规/禁令’；dinner table 译为‘餐桌旁’。意群精准译为‘以至于父母不得不立下一条餐桌上“不许读书”的家规’",
          vocab: [
            { word: "institute", pos: "v.", common: "建立；设立（熟词僻义）", context: "颁布并推行某项规矩/制度" },
            { word: "policy", pos: "n.", common: "政策；方针", context: "家庭行为准则与规矩" }
          ]
        }
      ]
    },
    {
      sid: 6,
      pid: 2,
      en: "That boy was Bill Gates, and he hasn't stopped reading yet – not even after becoming one of the most successful people on the planet.",
      cn: "那个小男孩就是比尔·盖茨，而直到今天他依然没有停止阅读——即便在成为这颗星球上最成功的人士之一后，他也依然保持着这个习惯。",
      grammar_breakdown: "and 连接两个并列句：That boy was Bill Gates 与 he hasn't stopped reading yet；破折号后 not even after... 为介词短语作状语补充强调。",
      reassembly_notes: "yet 在现在完成时否定句中译为‘至今/依然’；not even after... 递进让步‘即便在……之后，也毫不例外’，人话润色自然。",
      scoring_points: [
        {
          phrase: "That boy was Bill Gates, and he hasn't stopped reading yet",
          score: 1.0,
          guide: "That boy was... 揭开谜底；haven't stopped doing yet 译为‘至今仍未停止阅读’。意群精准译为‘那个男孩正是比尔·盖茨，而他至今从未间断过阅读’",
          vocab: [
            { word: "stopped", pos: "v.", common: "停止", context: "中断终结某种长久习惯" }
          ]
        },
        {
          phrase: "– not even after becoming one of the most successful people on the planet",
          score: 1.0,
          guide: "not even after 连词短语‘即便在……之后也未曾改变’；on the planet 修饰 people 译为‘全球/这颗星球上’。意群精准译为‘——哪怕是在成为了这个星球上最成功的人物之一后也是如此’",
          vocab: [
            { word: "successful", pos: "adj.", common: "成功的", context: "功成名就的" },
            { word: "planet", pos: "n.", common: "行星；地球", context: "on the planet 整个地球/全球范围" }
          ]
        }
      ]
    },
    {
      sid: 7,
      pid: 2,
      en: "Nowadays, his reading material has changed from science fiction and reference books: recently, he revealed that he reads at least 50 nonfiction books a year.",
      cn: "如今，他的阅读书目已不再局限于科幻小说与工具书：最近他透露，自己每年至少要读完50本非虚构类书籍。",
      grammar_breakdown: "冒号前为主句 his reading material has changed from...；冒号后为展开说明分句，主谓宾包含 that 引导的宾语从句 he reads at least 50 nonfiction books a year。",
      reassembly_notes: "changed from... 语境引申为‘发生了转变/不再局限于……’；nonfiction books 专有名词‘非虚构类读物/纪实书籍’。",
      scoring_points: [
        {
          phrase: "Nowadays, his reading material has changed from science fiction and reference books:",
          score: 1.0,
          guide: "reading material 译为‘阅读书单/读物’；reference books 译为‘参考书/工具书’。意群精准译为‘如今，他的阅读书目早已不仅限于科幻文学与参考书籍：’",
          vocab: [
            { word: "material", pos: "n.", common: "材料；素材", context: "书籍等文字读物" },
            { word: "reference", pos: "n.", common: "参考；提及", context: "reference books 词典百科工具书" }
          ]
        },
        {
          phrase: "recently, he revealed that he reads at least 50 nonfiction books a year",
          score: 1.0,
          guide: "revealed 动词‘透露/公开宣布’；at least 译为‘至少’；nonfiction 核心词‘非虚构类作品’。意群精准译为‘最近他透露，自己每年至少读完50本非虚构类专著’",
          vocab: [
            { word: "reveal", pos: "v.", common: "揭露；透露", context: "向外界公开透露生活习惯" },
            { word: "nonfiction", pos: "n./adj.", common: "非虚构类（文学）", context: "基于客观事实的社科纪实类读物" }
          ]
        }
      ]
    },
    {
      sid: 8,
      pid: 2,
      en: "Gates chooses nonfiction titles because they explain how the world works.",
      cn: "盖茨之所以偏爱非虚构类著作，是因为这些书阐释了世界是如何运转的。",
      grammar_breakdown: "主干为主谓宾 Gates chooses nonfiction titles；because 引导原因状语从句，从句内部嵌套 how the world works 作 explain 的宾语从句。",
      reassembly_notes: "titles 熟词僻义（借代‘书籍书目’）；how the world works 顺译为‘世界运转的底层规律’，言简意赅。",
      scoring_points: [
        {
          phrase: "Gates chooses nonfiction titles",
          score: 1.0,
          guide: "nonfiction titles 熟词僻义，title 在此代指‘书目/书籍’。意群精准译为‘盖茨之所以偏好非虚构类作品’",
          vocab: [
            { word: "title", pos: "n.", common: "标题；头衔；书籍单行本（熟词僻义）", context: "图书出版物" }
          ]
        },
        {
          phrase: "because they explain how the world works",
          score: 1.0,
          guide: "because 引导原因从句；explain 后接 how 引导的宾语从句‘世间万物运转的原理’。意群精准译为‘是因为它们能够阐明真实世界的运行规律’",
          vocab: [
            { word: "explain", pos: "v.", common: "解释；说明", context: "揭示深层运作机制" },
            { word: "works", pos: "v.", common: "工作；运转", context: "社会与自然法则的运转" }
          ]
        }
      ]
    }
  ],

  2019: [
    {
      sid: 1,
      pid: 0,
      en: "It is easy to underestimate English writer James Herriot.",
      cn: "人们很容易低估英国作家詹姆斯·赫里奥特。",
      grammar_breakdown: "形式主语结构：It 为形式主语，is 为系动词，easy 为表语，真正的主语为动词不定式短语 to underestimate English writer James Herriot。",
      reassembly_notes: "It is easy to do 顺译为‘人们很容易……’；underestimate 考研高频动词（低估/看轻）。单句精炼明快。",
      scoring_points: [
        {
          phrase: "It is easy to underestimate",
          score: 1.0,
          guide: "It 为形式主语；underestimate 考研高频词‘低估/轻视’。意群精准译为‘人们很容易低估’",
          vocab: [
            { word: "underestimate", pos: "v.", common: "低估；看轻", context: "低估作家的文学造诣与深度" }
          ]
        },
        {
          phrase: "English writer James Herriot",
          score: 1.0,
          guide: "专有名词及同位修饰，writer 修饰人名。意群精准译为‘英国作家詹姆斯·赫里奥特’",
          vocab: [
            { word: "writer", pos: "n.", common: "作家；作者", context: "文学创作者" }
          ]
        }
      ]
    },
    {
      sid: 2,
      pid: 0,
      en: "He had such a pleasant, readable style that one might think that anyone could imitate it.",
      cn: "他的写作风格如此亲切流畅、通俗易懂，以至于人们可能会误以为任何人都能轻易效仿。",
      grammar_breakdown: "主干为 such... that... 引导的结果状语从句；主句 He had such a pleasant, readable style；that 从句中嵌套 that 引导的宾语从句 that anyone could imitate it。",
      reassembly_notes: "such a pleasant, readable style 两个形容词并列修饰 style，译为‘亲切流畅、通俗易懂的文风’；imitate 动词‘模仿/效仿’。",
      scoring_points: [
        {
          phrase: "He had such a pleasant, readable style",
          score: 1.0,
          guide: "pleasant 译为‘令人愉悦的/亲切的’；readable 派生词‘通俗流畅的/好读的’；style 译为‘行文风格/文风’。意群精准译为‘他的文字风格如此平易近人、通畅好读’",
          vocab: [
            { word: "pleasant", pos: "adj.", common: "令人愉快的；亲切的", context: "文笔令人如沐春风" },
            { word: "readable", pos: "adj.", common: "好读的；清晰易读的", context: "通俗易懂流畅的" },
            { word: "style", pos: "n.", common: "风格；文体", context: "文学写作风格" }
          ]
        },
        {
          phrase: "that one might think that anyone could imitate it",
          score: 1.0,
          guide: "that 引导结果从句；one 代指普通人‘任何人’；imitate 考研核心动词‘模仿/仿造’。意群精准译为‘以至于人们会觉得谁都能信手仿效’",
          vocab: [
            { word: "imitate", pos: "v.", common: "模仿；效仿", context: "临摹并仿制某种写作笔调" }
          ]
        }
      ]
    },
    {
      sid: 3,
      pid: 1,
      en: "How many times have I heard people say, \"I could write a book.",
      cn: "我已经数不清有多少次听别人说过：“我也能写出一本书来。",
      grammar_breakdown: "特殊疑问句倒装：How many times 为时间状语，助动词 have 前置于主语 I，谓语 heard people say，双引号内为直接引语 I could write a book。",
      reassembly_notes: "How many times have I heard 习语化反问修辞，译为‘不知有多少次，我听到有人吹嘘……’，生动再现口语语境。",
      scoring_points: [
        {
          phrase: "How many times have I heard people say,",
          score: 1.0,
          guide: "倒装感叹句式，译为‘不知多少次我曾听人说道’。意群精准译为‘有多少次我听到人们大言不惭地说：’",
          vocab: [
            { word: "times", pos: "n.", common: "次数；时代", context: "听到这种论调的频次" }
          ]
        },
        {
          phrase: "\"I could write a book.",
          score: 1.0,
          guide: "could 表虚拟语气与能力自信，直译为‘我也能写一本书’。意群精准译为‘“我也能写一本书呢，’",
          vocab: [
            { word: "write", pos: "v.", common: "撰写；写作", context: "从事长篇文学创作" }
          ]
        }
      ]
    },
    {
      sid: 4,
      pid: 1,
      en: "I just haven't the time.\" Easily said.",
      cn: "我只是抽不出时间罢了。”说来容易，",
      grammar_breakdown: "直接引语分句 I just haven't the time；后面接省略句 Easily said（为 It is easily said 的省略）。",
      reassembly_notes: "haven't the time 译为‘没有时间/抽不出工夫’；Easily said 与下一句 Not so easily done 构成经典成语对照‘说来容易做来难’。",
      scoring_points: [
        {
          phrase: "I just haven't the time.\"",
          score: 1.0,
          guide: "口语表达，haven't the time 译为‘只是没时间罢了’。意群精准译为‘无非是我腾不出时间而已。”’",
          vocab: [
            { word: "time", pos: "n.", common: "时间", context: "从事创作的空暇工夫" }
          ]
        },
        {
          phrase: "Easily said.",
          score: 1.0,
          guide: "成语俗语前半句，省略句，译为‘说起来容易’。意群精准译为‘说来轻巧，’",
          vocab: [
            { word: "easily", pos: "adv.", common: "容易地；轻而易举地", context: "口头上说说极为轻巧" }
          ]
        }
      ]
    },
    {
      sid: 5,
      pid: 1,
      en: "Not so easily done.",
      cn: "但做起来可绝非易事。",
      grammar_breakdown: "承接上一句的完全省略句：（It is）not so easily done，属于固定英语谚语对仗。",
      reassembly_notes: "配合 Easily said，译为四字成语或俗语‘做来却难/实际做起来绝非容易’。",
      scoring_points: [
        {
          phrase: "Not so easily done",
          score: 2.0,
          guide: "英语经典俗语 Easily said, not so easily done 对应的后半截，译为‘做起来却谈何容易’。意群精准译为‘做起来却殊非易事。’",
          vocab: [
            { word: "done", pos: "v.", common: "做完；达成", context: "付诸长期的文字实践与付印" }
          ]
        }
      ]
    },
    {
      sid: 6,
      pid: 2,
      en: "James Herriot, contrary to popular opinion, did not find it easy in his early days of, as he put it, \"having a go at the writing game\".",
      cn: "与大众的想法恰恰相反，詹姆斯·赫里奥特在他早年——正如他所言——“投身写作这一行”时，并没觉得这是一件轻松的事。",
      grammar_breakdown: "主语 James Herriot；contrary to popular opinion 为插入状语；谓语为 did not find it easy，it 为形式宾语，真正的宾语为后面的介词动名词短语；as he put it 为插入语；having a go at 为习语。",
      reassembly_notes: "两处插入语嵌套（contrary to... 与 as he put it）；have a go at 习语（尝试/试一试）；the writing game 比喻‘写作这行营生/文坛’；it 形式宾语还原为‘并不觉得轻松’。",
      scoring_points: [
        {
          phrase: "James Herriot, contrary to popular opinion,",
          score: 0.5,
          guide: "contrary to 介词短语‘与……相反’；popular opinion 译为‘大众普遍观点/常人看法’。意群精准译为‘与常人的想当然相反，詹姆斯·赫里奥特’",
          vocab: [
            { word: "contrary", pos: "adj./n.", common: "相反的；反对的", context: "contrary to 与……截然相悖" },
            { word: "opinion", pos: "n.", common: "意见；看法", context: "外界先入为主的偏见" }
          ]
        },
        {
          phrase: "did not find it easy in his early days of,",
          score: 0.5,
          guide: "find it easy 形式宾语结构‘觉得……容易’；early days 译为‘早年岁月/初创时期’。意群精准译为‘在他早年的摸索时期丝毫没感到轻松’",
          vocab: [
            { word: "early", pos: "adj.", common: "早期的", context: "写作生涯刚刚起步的早年" }
          ]
        },
        {
          phrase: "as he put it, \"having a go at the writing game\"",
          score: 1.0,
          guide: "as he put it 经典插入语‘正如他所说/用他的话来说’；have a go at 习语‘尝试做……’；writing game 比喻‘写作这行当’。意群精准译为‘正如他自己形容的那样，在“尝试涉足写作这门营生”之初’",
          vocab: [
            { word: "game", pos: "n.", common: "游戏；猎物；行业/行当（高频熟词僻义）", context: "具有挑战性与竞争性的职业门类" },
            { word: "put", pos: "v.", common: "放置；表达（熟词僻义）", context: "as one puts it 正如某人所言" }
          ]
        }
      ]
    },
    {
      sid: 7,
      pid: 2,
      en: "While he obviously had an abundance of natural talent, the final, polished work that he gave to the world was the result of years of practicing, re-writing and reading.",
      cn: "尽管他显然拥有过人的天赋，但他最终奉献给世人的千锤百炼之作，却是多年刻苦练习、反复重写以及大量阅读的结晶。",
      grammar_breakdown: "While 引导让步状语从句；主句主干为 the final, polished work... was the result of...；that he gave to the world 为定语从句修饰 work；of 后面连接三个并列动名词 practicing, re-writing and reading。",
      reassembly_notes: "While 让步状语从句顺译‘尽管……’；an abundance of natural talent 译为‘过人的天赋/卓越的天资’；polished work 艺术转译为‘千锤百炼的作品/打磨成熟之作’；the result of 结合动名词译为‘……的结晶’。",
      scoring_points: [
        {
          phrase: "While he obviously had an abundance of natural talent",
          score: 0.5,
          guide: "While 引导让步‘尽管/虽然’；an abundance of 考研高频‘极其丰富充沛的’；natural talent 译为‘天赋秉异’。意群精准译为‘尽管他显然具备极为充沛的与生俱来的天赋’",
          vocab: [
            { word: "abundance", pos: "n.", common: "丰富；充足", context: "过人且源源不断的才能" },
            { word: "talent", pos: "n.", common: "天赋；才能", context: "天生的文学写作直觉" }
          ]
        },
        {
          phrase: "the final, polished work that he gave to the world",
          score: 0.5,
          guide: "polished work 熟词僻义，指‘精心打磨、字斟句酌的成熟作品’；that 定语从句修饰 work。意群精准译为‘但他最终呈现给世人的字斟句酌的成熟之作’",
          vocab: [
            { word: "polished", pos: "adj.", common: "磨光的；精雕细琢的", context: "经过无数次推敲润色的完美文本" }
          ]
        },
        {
          phrase: "was the result of years of practicing, re-writing and reading",
          score: 1.0,
          guide: "the result of 译为‘……的结晶/成果’；三个并列动名词顺译‘多年练笔、反复重写与广泛阅读’。意群精准译为‘无一不是多年刻苦磨练、反复推敲修改与海量阅读的结晶’",
          vocab: [
            { word: "result", pos: "n.", common: "结果；成果", context: "长期辛勤努力积累的果实" },
            { word: "practicing", pos: "v.", common: "练习；实践", context: "坚持不懈的创作实践" }
          ]
        }
      ]
    },
    {
      sid: 8,
      pid: 2,
      en: "Like the majority of authors, he had to suffer many disappointments and rejections along the way, but these made him all the more determined to succeed.",
      cn: "正如绝大多数作家一样，他一路走来不得不承受无数次的失望与退稿；但这反而让他更加坚定了成功的决心。",
      grammar_breakdown: "Like the majority of authors 作比较介词状语；主干为 but 连接的两个并列分句：前一句 he had to suffer many disappointments and rejections along the way；后一句 these made him all the more determined to succeed（含 make + 宾语 + 宾补结构）。",
      reassembly_notes: "rejections 在文学出版界具有明确行业含义（退稿信/拒绝出版）；all the more 表程度递进（越发/更加）；determined to succeed 译为‘坚定了成功的信念/意志’。",
      scoring_points: [
        {
          phrase: "Like the majority of authors,",
          score: 0.5,
          guide: "Like 介词‘正如……一样’；the majority of 译为‘绝大多数’。意群精准译为‘与绝大多数作者毫无二致’",
          vocab: [
            { word: "majority", pos: "n.", common: "大多数；大部分", context: "文坛绝大多数普通写作者" }
          ]
        },
        {
          phrase: "he had to suffer many disappointments and rejections along the way",
          score: 0.5,
          guide: "suffer 动词‘遭受/经历’；rejections 文学特定语境译为‘退稿/被拒稿件’；along the way 译为‘一路走来/在写作生涯中’。意群精准译为‘他在一路打拼中必须咽下诸多失望与被无情退稿的痛苦’",
          vocab: [
            { word: "disappointment", pos: "n.", common: "失望；沮丧", context: "作品得不到认可的挫败感" },
            { word: "rejection", pos: "n.", common: "拒绝；排斥；退稿（熟词僻义）", context: "出版社寄来的拒绝信与退稿" }
          ]
        },
        {
          phrase: "but these made him all the more determined to succeed",
          score: 1.0,
          guide: "these 指代前面的挫折；all the more 强调‘越发/更加’；determined to succeed 译为‘坚定求成’。意群精准译为‘但这反而使他更加坚定了取得成功的信念’",
          vocab: [
            { word: "determined", pos: "adj.", common: "坚定的；决意的", context: "越挫越勇、矢志不移的坚定决心" },
            { word: "succeed", pos: "v.", common: "成功；继任", context: "在文坛立足成名" }
          ]
        }
      ]
    }
  ]
};
