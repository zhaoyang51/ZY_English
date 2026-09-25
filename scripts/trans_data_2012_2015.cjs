// 2012-2015 Detailed Translation Analysis Data (3-Step Teacher Methodology)
module.exports = {
  2012: [
    {
      sid: 1,
      pid: 0,
      en: "When people in developing countries worry about migration, they are usually concerned at the prospect of their best and brightest departure to Silicon Valley or to hospitals and universities in the developed world.",
      cn: "当发展中国家的人们为移民问题感到担忧时，他们通常忧虑的是，自己国家最优秀、最拔尖的人才离开本土，流向硅谷，或是流向发达国家的医院与高等学府。",
      grammar_breakdown: "When 引导时间状语从句；主句主谓为 they are usually concerned at the prospect of，of 后跟动名词逻辑复合结构 their best and brightest departure，后面接两个并列介词短语 to... or to... 交代出走的目的地。",
      reassembly_notes: "大范围语序调整：时间状语从句置于句首顺译。将 departure 名词转译为动词‘离开/流向’，比字面硬译‘关于……离去的前景’更加符合现代汉语习惯。采用增词法补充‘本土’与‘流向’，句意更加丰满。",
      scoring_points: [
        {
          phrase: "When people in developing countries worry about migration",
          score: 0.5,
          guide: "When 引导时间状语从句顺译，worry about 译为‘为……感到担忧’；migration 译为‘移民问题’或‘人口外迁’。意群精准译为‘当发展中国家的人们为移民问题感到担忧时’",
          vocab: [
            { word: "migration", pos: "n.", common: "移居；迁徙", context: "人口跨国迁移；移民外流" },
            { word: "developing", pos: "adj.", common: "发展中的", context: "发展中的（与 developed 发达的相对）" }
          ]
        },
        {
          phrase: "they are usually concerned at the prospect of their best and brightest departure",
          score: 1.0,
          guide: "be concerned at 表‘对……感到忧虑’；the best and brightest 为考研经典习语，形容词最高级代指人，转译为‘最优秀、最拔尖的人才’；departure 名词转译为动词‘出走/离开本土’。意群精准译为‘他们通常忧虑的是，自己国家最优秀、最拔尖的人才离开本土’",
          vocab: [
            { word: "prospect", pos: "n.", common: "前景；期望", context: "预期的可能情形或局面" },
            { word: "brightest", pos: "adj.", common: "最明亮的；最聪明的", context: "最拔尖、最有前途的人才" },
            { word: "departure", pos: "n.", common: "离开；起程", context: "人才流失离国；出走" }
          ]
        },
        {
          phrase: "to Silicon Valley or to hospitals and universities in the developed world",
          score: 0.5,
          guide: "两个并列介词短语表示人才流向，in the developed world 作后置定语修饰 hospitals and universities，前置翻译为‘发达国家的医院与高等学府’。意群精准译为‘流向硅谷，或是发达国家的医院与高等学府’",
          vocab: [
            { word: "Silicon Valley", pos: "n.", common: "硅谷", context: "美国高科技产业创新中心" },
            { word: "developed", pos: "adj.", common: "发达的", context: "发达国家（the developed world）" }
          ]
        }
      ]
    },
    {
      sid: 2,
      pid: 0,
      en: "These are the kind of workers that countries like Britain, Canada and Australia try to attract by using immigration rules that privilege college graduates.",
      cn: "英国、加拿大和澳大利亚等国正试图通过制定优待大学毕业生的移民政策，来大力招揽这些优秀人才。",
      grammar_breakdown: "主句为 These are the kind of workers；第一个 that 引导定语从句修饰先行词 workers；by using... 为方式状语；rules 后面嵌套第二个 that 引导的定语从句修饰 rules。",
      reassembly_notes: "大范围语序调整：英语习惯将方式状语 by using... 置于句末，汉语则习惯将手段/方式前置于主要动作之前，故重组为‘通过制定……政策，来大力招揽……’，使逻辑链条严密流畅。",
      scoring_points: [
        {
          phrase: "These are the kind of workers",
          score: 0.5,
          guide: "主句主干，承前代词 These 指代上一句的高端拔尖人才，增词译为‘这些优秀人才’。意群精准译为‘这些正是相关国家极力争夺的人才’",
          vocab: [
            { word: "worker", pos: "n.", common: "工人；劳动者", context: "专业人才；知识劳动力" }
          ]
        },
        {
          phrase: "that countries like Britain, Canada and Australia try to attract",
          score: 0.5,
          guide: "that 定语从句修饰 workers，like 表列举‘英国、加拿大和澳大利亚等国’，try to attract 译为‘试图吸引/极力招揽’。意群精准译为‘英国、加拿大和澳大利亚等国正极力吸引的’",
          vocab: [
            { word: "attract", pos: "v.", common: "吸引；引起注意", context: "招揽；招引（高端人才）" }
          ]
        },
        {
          phrase: "by using immigration rules that privilege college graduates",
          score: 1.0,
          guide: "by using 表方式‘通过使用/推行……’；privilege 在此为及物动词（考研熟词僻义），译为‘给……特权/优待’；college graduates 译为‘大学毕业生’。意群精准译为‘通过制定优待大学毕业生的移民政策’",
          vocab: [
            { word: "privilege", pos: "v.", common: "给予特权；优待", context: "在政策上优先考虑；优待" },
            { word: "graduate", pos: "n.", common: "毕业生", context: "拥有高等学历的大学毕业生" }
          ]
        }
      ]
    },
    {
      sid: 3,
      pid: 1,
      en: "Lots of studies have found that well-educated people from developing countries are particularly likely to emigrate.",
      cn: "诸多研究均表明，来自发展中国家的高学历人群格外倾向于移居海外。",
      grammar_breakdown: "主句主干为 Lots of studies have found，that 引导宾语从句；从句主干为 well-educated people are likely to emigrate，介词短语 from developing countries 作后置定语修饰 people。",
      reassembly_notes: "句式为常见科研报告引出客观事实的结构。well-educated people 转译为‘高学历人群’；be particularly likely to do 顺译为‘格外倾向于……’，准确体现概率与倾向性。",
      scoring_points: [
        {
          phrase: "Lots of studies have found that",
          score: 0.5,
          guide: "主句主干，现在完成时表示已有研究定论，规范学术表述译为‘诸多研究均表明/大量研究显示’。意群精准译为‘诸多研究均表明’",
          vocab: [
            { word: "study", pos: "n.", common: "学习；研究", context: "调查报告；学术科研成果" }
          ]
        },
        {
          phrase: "well-educated people from developing countries",
          score: 0.5,
          guide: "从句主语部分，介词短语 from developing countries 前置修饰 people；well-educated 准确引申为‘受过良好教育的/高学历的’。意群精准译为‘来自发展中国家的高学历人群’",
          vocab: [
            { word: "well-educated", pos: "adj.", common: "受过良好教育的", context: "高学历的；受过高等教育的" }
          ]
        },
        {
          phrase: "are particularly likely to emigrate",
          score: 1.0,
          guide: "be likely to do 系表短语表倾向，particularly 加强语气；emigrate 考研高频重点词（专指移居国外、迁出母国）。意群精准译为‘格外倾向于移居海外’",
          vocab: [
            { word: "particularly", pos: "adv.", common: "特别；尤其", context: "格外；非常" },
            { word: "emigrate", pos: "v.", common: "移居国外", context: "移民海外（强调从原籍国迁出）" }
          ]
        }
      ]
    },
    {
      sid: 4,
      pid: 1,
      en: "A big survey of Indian households in 2004 found that nearly 40% of emigrants had more than a high-school education, compared with around 3.3% of all Indians over the age 25.",
      cn: "2004年针对印度家庭展开的一项大规模调查显示，将近40%的外流移民拥有高中以上学历，而相比之下，全印度25岁以上人群中拥有该学历的比例仅为3.3%左右。",
      grammar_breakdown: "主句为 A big survey... found that；that 引导宾语从句说明调查结果；compared with... 为过去分词短语作比较状语，over the age 25 为后置定语修饰 all Indians。",
      reassembly_notes: "时间状语 in 2004 提至句首修饰调查。分词伴随结构 compared with... 转换为汉语对照转折分句‘而相比之下……仅为……’，突显两者之间悬殊的学历差距。",
      scoring_points: [
        {
          phrase: "A big survey of Indian households in 2004 found that",
          score: 0.5,
          guide: "主句主干，survey of Indian households 译为‘针对印度家庭的调查’，时间提前。意群精准译为‘2004年针对印度家庭展开的一项大规模调查显示’",
          vocab: [
            { word: "survey", pos: "n.", common: "调查；测量", context: "社会学民意与人口调查" },
            { word: "household", pos: "n.", common: "一家人；家庭", context: "住户；家庭户" }
          ]
        },
        {
          phrase: "nearly 40% of emigrants had more than a high-school education",
          score: 1.0,
          guide: "宾语从句主干，more than a high-school education 译为‘高中以上学历/受过高中以上教育’；nearly 译为‘将近/近’。意群精准译为‘将近40%的外流移民拥有高中以上学历’",
          vocab: [
            { word: "emigrant", pos: "n.", common: "移民；移居外国者", context: "外流移民；迁出人口" },
            { word: "education", pos: "n.", common: "教育", context: "受教育程度；学历水平" }
          ]
        },
        {
          phrase: "compared with around 3.3% of all Indians over the age 25",
          score: 0.5,
          guide: "compared with 引导对比状语，over the age 25 定语前置为‘25岁以上’，增补对照连词‘而相比之下’。意群精准译为‘而25岁以上的全印度人口中这一比例仅约3.3%’",
          vocab: [
            { word: "compared", pos: "v.", common: "对比；比较", context: "compared with 与……相比" },
            { word: "around", pos: "adv.", common: "大约；到处", context: "大约；约为（修饰具体数据）" }
          ]
        }
      ]
    },
    {
      sid: 5,
      pid: 2,
      en: "This \"brain drain\" has long bothered policymakers in poor countries.",
      cn: "这种“人才外流”现象长期以来一直困扰着贫穷国家的政策制定者。",
      grammar_breakdown: "简单句，主语为 This 'brain drain'，谓语为 has long bothered，宾语为 policymakers，后接介词短语 in poor countries 修饰。",
      reassembly_notes: "单句顺译。注意把引号中的 brain drain 规范译作政治经济学术语‘人才外流’；has long bothered 体现从过去持续至今的困扰。",
      scoring_points: [
        {
          phrase: "This \"brain drain\" has long bothered",
          score: 1.0,
          guide: "brain drain 考研高频词，译为‘人才外流’或‘智力流失’；bother 译为‘困扰/使烦恼’；long 作副词修饰完成时。意群精准译为‘这种“人才外流”现象长期以来一直困扰着’",
          vocab: [
            { word: "drain", pos: "n./v.", common: "排水；耗尽", context: "brain drain 人才外流/人才流失" },
            { word: "bother", pos: "v.", common: "打扰；烦扰", context: "使困扰；使担忧" }
          ]
        },
        {
          phrase: "policymakers in poor countries",
          score: 1.0,
          guide: "policymaker 复合词‘政策制定者/政府决策官员’；in poor countries 介词定语前置为‘贫穷国家的’。意群精准译为‘贫穷国家的政策制定者’",
          vocab: [
            { word: "policymaker", pos: "n.", common: "政策制定者", context: "政府决策层；法规制定官员" }
          ]
        }
      ]
    },
    {
      sid: 6,
      pid: 2,
      en: "They fear that it hurts their economies, depriving them of much-needed skilled workers who could have taught at their universities, worked in their hospitals and come up with clever new products for their factories to make.",
      cn: "他们担忧人才流失会重创本国经济，使他们痛失极为急需的专业技术人才；而这些人原本可以在本国大学任教、在医院行医，并为当地工厂研发巧妙新颖的产品。",
      grammar_breakdown: "主句谓语为 fear，that 引导宾语从句；depriving of 为现在分词短语作伴随结果状语；先行词 workers 之后由 who 引导定语从句，从句内部包含三个并列虚拟语气动作 taught, worked 和 come up with。",
      reassembly_notes: "结构长且复杂，拆译为两段：前半段讲宏观危害（重创经济、夺走人才），后半段将 who 引导的长定语从句独立成句，并还原 could have done 的虚拟语气含义（‘原本可以……’），使情感与事实传达精确。",
      scoring_points: [
        {
          phrase: "They fear that it hurts their economies",
          score: 0.5,
          guide: "主句主干，it 指代前文的人才外流现象；hurt economies 译为‘重创/损害本国经济’。意群精准译为‘他们担忧人才流失会重创本国经济’",
          vocab: [
            { word: "economy", pos: "n.", common: "经济；节约", context: "国民经济；经济发展" }
          ]
        },
        {
          phrase: "depriving them of much-needed skilled workers",
          score: 0.5,
          guide: "deprive sb of sth 固定短语‘剥夺/使丧失……’；much-needed 译为‘急需的/迫切需要的’；skilled workers 译为‘技术工人/专业技能人才’。意群精准译为‘使他们痛失极为急需的专业技术人才’",
          vocab: [
            { word: "deprive", pos: "v.", common: "剥夺；使丧失", context: "使……失去/丧失（核心权益）" },
            { word: "skilled", pos: "adj.", common: "有熟练技术的", context: "专业技能过硬的" }
          ]
        },
        {
          phrase: "who could have taught at their universities, worked in their hospitals",
          score: 0.5,
          guide: "who 定语从句，could have done 考查虚拟语气，表达本可做但因人才外流而未能实现，译为‘原本可以在……任教、在……行医’。意群精准译为‘而这些人原本可以在本国大学任教、在医院工作’",
          vocab: [
            { word: "could have", pos: "phrase", common: "本来能够", context: "表对过去的虚拟推论，本可以做到" }
          ]
        },
        {
          phrase: "and come up with clever new products for their factories to make",
          score: 0.5,
          guide: "come up with 考研核心短语‘提出；构想出；研发出’；clever 意境引申为‘巧妙新颖的’；for factories to make 作逻辑宾补。意群精准译为‘并为当地工厂研发出巧妙新颖的产品’",
          vocab: [
            { word: "come up with", pos: "phr.", common: "想出；提出", context: "构想出；研发设计出" },
            { word: "clever", pos: "adj.", common: "聪明的；机灵的", context: "精巧的；新颖独特的" }
          ]
        }
      ]
    }
  ],

  2013: [
    {
      sid: 1,
      pid: 0,
      en: "I can pick a date from the past 53 years and know instantly where I was, what happened in the news and even the day of the week.",
      cn: "我可以从过去的53年中随手挑出一个日期，就能立即知道那天我身在何处、新闻里发生了什么，甚至能脱口说出那是星期几。",
      grammar_breakdown: "主语为 I，情态动词 can 后面接两个并列动词短语 pick a date... 和 know instantly...；know 后面并列带了三个宾语成分：where 从句、what 从句以及名词短语 the day of the week。",
      reassembly_notes: "know 引导的三个宾语并列（两个宾从加一个名词短语），中文顺译时增补‘那天’、‘脱口说出’等衔接词，节奏紧凑明快。",
      scoring_points: [
        {
          phrase: "I can pick a date from the past 53 years",
          score: 0.5,
          guide: "pick a date 顺译为‘挑出一个日期/选定某一天’，介词短语修饰 53 年。意群精准译为‘我可以从过去的53年中随手挑出一个日期’",
          vocab: [
            { word: "pick", pos: "v.", common: "挑选；采摘", context: "随手挑出；选定" }
          ]
        },
        {
          phrase: "and know instantly where I was",
          score: 0.5,
          guide: "instantly 副词修饰 know，译为‘瞬间/立刻知道’；where I was 地点状语从句译为‘我身在何处’。意群精准译为‘并立刻知道当时自己身在何方’",
          vocab: [
            { word: "instantly", pos: "adv.", common: "立刻；马上", context: "一瞬间；立刻" }
          ]
        },
        {
          phrase: "what happened in the news and even the day of the week",
          score: 1.0,
          guide: "what 引导宾语从句，the day of the week 为固定表达‘星期几’，even 表递进‘甚至’。意群精准译为‘新闻里发生了什么，甚至那天是星期几’",
          vocab: [
            { word: "happen", pos: "v.", common: "发生", context: "出现；发生" },
            { word: "week", pos: "n.", common: "周；星期", context: "the day of the week 星期几" }
          ]
        }
      ]
    },
    {
      sid: 2,
      pid: 0,
      en: "I've been able to do this since I was four.",
      cn: "从我四岁起，我就具备了这种能力。",
      grammar_breakdown: "主句为现在完成时 I've been able to do this，since 引导时间状语从句 I was four。",
      reassembly_notes: "语序调整：汉语习惯将 since 引导的时间状语从句‘从我四岁起’置于句首，主句后置，更加自然地交代能力来源。",
      scoring_points: [
        {
          phrase: "I've been able to do this",
          score: 1.0,
          guide: "be able to do 译为‘能够做到这一点/具备这种能力’；完成时态体现持续性。意群精准译为‘我就一直具备这种能力’",
          vocab: [
            { word: "able", pos: "adj.", common: "能够的；有才干的", context: "be able to 具备……的能力" }
          ]
        },
        {
          phrase: "since I was four",
          score: 1.0,
          guide: "since 引导时间状语从句，four 略去了 years old。意群精准译为‘从我四岁的时候开始’",
          vocab: [
            { word: "since", pos: "conj.", common: "自……以来；因为", context: "引导过去某时间点至今的时间状语" }
          ]
        }
      ]
    },
    {
      sid: 3,
      pid: 1,
      en: "I never feel overwhelmed with the amount of information my brain absorbs.",
      cn: "大脑吸收如此巨量的信息，但我从未因此感到不堪重负。",
      grammar_breakdown: "主干为 I never feel overwhelmed with...；the amount of information 之后带有省略了关系代词 that/which 的定语从句 my brain absorbs 修饰 information。",
      reassembly_notes: "将介词短语及后置定语从句‘大脑所吸收的庞大信息量’前提作为铺垫，主句‘从未感到不堪重负’置后，形成语义转折反差，更具表现力。",
      scoring_points: [
        {
          phrase: "I never feel overwhelmed with",
          score: 1.0,
          guide: "feel overwhelmed with 为考研核心短语，译为‘对……感到不堪重负/被……压垮’；never 表完全否定。意群精准译为‘我从未感到不堪重负’",
          vocab: [
            { word: "overwhelmed", pos: "adj.", common: "不知所措的；被压垮的", context: "不堪重负的；无法承受的" }
          ]
        },
        {
          phrase: "the amount of information my brain absorbs",
          score: 1.0,
          guide: "the amount of 修饰不可数名词 information；my brain absorbs 定语从句前置修饰‘大脑所吸收的’。意群精准译为‘大脑所吸收的海量信息’",
          vocab: [
            { word: "absorb", pos: "v.", common: "吸收；同化", context: "摄取、接收并储存知识/信息" }
          ]
        }
      ]
    },
    {
      sid: 4,
      pid: 1,
      en: "My mind seems to be able to cope and the information is stored away neatly.",
      cn: "我的大脑似乎应付自如，所有信息都被井井有条地归档封存。",
      grammar_breakdown: "and 连接两个并列主句；前一句主谓为 My mind seems to be able to cope；后一句为一般现在时的被动语态 the information is stored away neatly。",
      reassembly_notes: "并列两分句顺译；cope 引申为‘应付自如/应对得当’；store away neatly 带有拟人比喻色彩，译作‘井井有条地归档封存’。",
      scoring_points: [
        {
          phrase: "My mind seems to be able to cope",
          score: 1.0,
          guide: "mind 译为‘大脑/心智’；seem to be able to 译为‘似乎完全能够’；cope 为不及物动词，译为‘应对/应付自如’。意群精准译为‘我的大脑似乎完全能够应付自如’",
          vocab: [
            { word: "cope", pos: "v.", common: "处理；对付", context: "应对得当；应付自如" }
          ]
        },
        {
          phrase: "and the information is stored away neatly",
          score: 1.0,
          guide: "被动语态 is stored away 译为‘被储存/被归档’；neatly 副词译为‘井然有序地/整整齐齐地’。意群精准译为‘而且所有信息都被井井有条地封存起来’",
          vocab: [
            { word: "store", pos: "v.", common: "贮存；保存", context: "store away 归纳储存；封存" },
            { word: "neatly", pos: "adv.", common: "整洁地；巧妙地", context: "井井有条地；工整地" }
          ]
        }
      ]
    },
    {
      sid: 5,
      pid: 2,
      en: "When I think of a sad memory, I do what everybody does – try to put it to one side.",
      cn: "当回想起一段伤心往事时，我和常人一样——尽力把它搁置一边。",
      grammar_breakdown: "When 引导时间状语从句；主句主干为 I do what everybody does，what 引导宾语从句；破折号后不定式短语 try to put it to one side 作为同位语补充说明具体做法。",
      reassembly_notes: "what everybody does 意译为‘像所有人一样/和常人无异’；put it to one side 形象生动，译为成语‘搁置一边/抛在脑后’。",
      scoring_points: [
        {
          phrase: "When I think of a sad memory",
          score: 0.5,
          guide: "think of 译为‘想到/回想起’；sad memory 译为‘悲伤的回忆/伤心往事’。意群精准译为‘当我想起伤心往事时’",
          vocab: [
            { word: "memory", pos: "n.", common: "记忆；回忆", context: "一段记忆往事" }
          ]
        },
        {
          phrase: "I do what everybody does",
          score: 0.5,
          guide: "what 引导宾语从句，字面是‘做每个人都做的事’，地道意译为‘我和普通人一样’。意群精准译为‘我和大家一样’",
          vocab: [
            { word: "everybody", pos: "pron.", common: "每个人；人人", context: "普通大众；常人" }
          ]
        },
        {
          phrase: "try to put it to one side",
          score: 1.0,
          guide: "破折号引出解释；put sth to one side 英语习语，比喻‘将……置于一旁/抛至脑后’。意群精准译为‘努力把它先搁置在一旁’",
          vocab: [
            { word: "side", pos: "n.", common: "边；侧面", context: "put to one side 搁置一边；暂不理会" }
          ]
        }
      ]
    },
    {
      sid: 6,
      pid: 2,
      en: "I don't think it's harder for me just because my memory is clearer.",
      cn: "我并不认为仅仅因为自己的记忆更加清晰，摆脱痛苦对我而言就会更艰难。",
      grammar_breakdown: "主句为否定转移句型 I don't think...；think 后面接宾语从句 it's harder for me；just because 引导原因状语从句解释比较的缘由。",
      reassembly_notes: "典型的否定转移结构 I don't think，否定实则落在从句 harder 上；原因状语从句 just because 前置翻译符合汉语因果逻辑：‘并不认为仅仅因为……，对我而言就会更难’。",
      scoring_points: [
        {
          phrase: "I don't think it's harder for me",
          score: 1.0,
          guide: "否定转移：think 否定从句中的 harder；it 为形式主语指代前文走出悲伤。意群精准译为‘我并不认为这对我来说会更加困难’",
          vocab: [
            { word: "harder", pos: "adj.", common: "更困难的", context: "在心理上更加艰难难熬" }
          ]
        },
        {
          phrase: "just because my memory is clearer",
          score: 1.0,
          guide: "just because 强调原因‘仅仅因为’；clearer 比较级译为‘更清晰/历历在目’。意群精准译为‘仅仅是因为自己的记忆更为清晰’",
          vocab: [
            { word: "clear", pos: "adj.", common: "清晰的；明亮的", context: "记忆细节分明清晰" }
          ]
        }
      ]
    },
    {
      sid: 7,
      pid: 2,
      en: "Powerful memory doesn't make my emotions any more acute or vivid.",
      cn: "强大的记忆力并没有让我的情绪变得更加剧烈或鲜明。",
      grammar_breakdown: "主干为主谓宾宾补结构：主语 Powerful memory，谓语 doesn't make，宾语 my emotions，宾语补足语 any more acute or vivid。",
      reassembly_notes: "make + n. + adj. 结构，顺译即可。acute 与 vivid 两个形容词并列修饰 emotions，分别对应情绪感受的‘剧烈程度’与‘清晰鲜活程度’。",
      scoring_points: [
        {
          phrase: "Powerful memory doesn't make my emotions",
          score: 1.0,
          guide: "Powerful memory 作主语‘强大的记忆能力’；make my emotions 表使役‘使我的情绪……’。意群精准译为‘超强记忆并没有让我的情感波澜’",
          vocab: [
            { word: "powerful", pos: "adj.", common: "强大的；强有力的", context: "超常卓越的；强劲的" },
            { word: "emotion", pos: "n.", common: "情感；情绪", context: "内心感受与情绪" }
          ]
        },
        {
          phrase: "any more acute or vivid",
          score: 1.0,
          guide: "acute 形容词‘敏锐的；剧烈的’；vivid 形容词‘生动的；鲜明的’；any more 在否定句中表‘丝毫更……’。意群精准译为‘变得更加剧烈或鲜活’",
          vocab: [
            { word: "acute", pos: "adj.", common: "急性的；敏锐的", context: "剧烈的；强烈的（痛感或情绪）" },
            { word: "vivid", pos: "adj.", common: "生动的；鲜明的", context: "历历在目的；鲜活的" }
          ]
        }
      ]
    },
    {
      sid: 8,
      pid: 2,
      en: "I can recall the day my grandfather died and the sadness I felt when we went to the hospital the day before.",
      cn: "我能回忆起祖父去世的那一天，以及前一天我们去医院探视时我内心体会到的巨大悲伤。",
      grammar_breakdown: "主谓为 I can recall；recall 带有两个由 and 并列的宾语部分：the day (that) my grandfather died 和 the sadness (that) I felt，最后接时间状语从句 when we went to the hospital the day before。",
      reassembly_notes: "两处定语从句省略了关系代词 that。把修饰 sadness 的时间从句 when we went to the hospital the day before 提前译出，符合汉语时间先于感受的叙事顺序。",
      scoring_points: [
        {
          phrase: "I can recall the day my grandfather died",
          score: 1.0,
          guide: "recall 考研核心词‘回忆起’；the day 后省略 that 定从，修饰 the day‘祖父去世的那一天’。意群精准译为‘我能清晰忆起祖父离世的那天’",
          vocab: [
            { word: "recall", pos: "v.", common: "回忆；召回", context: "脑海中重新浮现；回忆起" }
          ]
        },
        {
          phrase: "and the sadness I felt when we went to the hospital the day before",
          score: 1.0,
          guide: "sadness 宾语‘悲痛/难过’；I felt 定语从句‘我所感受到的’；the day before 译为‘前一天’。意群精准译为‘以及前一天我们赶往医院时我所感到的悲伤’",
          vocab: [
            { word: "sadness", pos: "n.", common: "悲伤；难过", context: "失去至亲的悲痛之情" }
          ]
        }
      ]
    }
  ],

  2014: [
    {
      sid: 1,
      pid: 0,
      en: "Most people would define optimism as being endlessly happy, with a glass that's perpetually half full.",
      cn: "大多数人会将乐观定义为永无止境的快乐，就像眼中永远装着半杯水的杯子一样。",
      grammar_breakdown: "主干为主谓宾补：Most people would define optimism as being endlessly happy；with 复合结构作伴随状语，that 引导定语从句修饰 a glass。",
      reassembly_notes: "define A as B 顺译为‘把 A 定义为 B’；with a glass that's perpetually half full 是西方经典比喻（半杯水看作半满还是半空），重组时采用比喻增词‘就像……一样’，点出乐观意象。",
      scoring_points: [
        {
          phrase: "Most people would define optimism as being endlessly happy",
          score: 1.0,
          guide: "define... as... 译为‘把……定义为……’；endlessly happy 译为‘无止境的快乐/永恒的开心’。意群精准译为‘多数人会将乐观定义为永远快乐’",
          vocab: [
            { word: "define", pos: "v.", common: "给……下定义；界定", context: "阐释界定（某概念）" },
            { word: "optimism", pos: "n.", common: "乐观；乐观主义", context: "积极向上的心态" },
            { word: "endlessly", pos: "adv.", common: "无尽地；不断地", context: "永无休止地；持续不断地" }
          ]
        },
        {
          phrase: "with a glass that's perpetually half full",
          score: 1.0,
          guide: "with 复合结构表伴随比喻；perpetually 考研高频副词‘永久地/始终’；half full 意指‘总看到半满那一半（积极面）’。意群精准译为‘眼中杯子里的水永远是半满的状态’",
          vocab: [
            { word: "perpetually", pos: "adv.", common: "永恒地；持久地", context: "始终如一地；永远" }
          ]
        }
      ]
    },
    {
      sid: 2,
      pid: 0,
      en: "But that's exactly the kind of false cheerfulness that positive psychologists wouldn't recommend.",
      cn: "但这恰恰是积极心理学家们绝不会推荐的那种虚假的盲目乐观。",
      grammar_breakdown: "主句为 But that's exactly the kind of false cheerfulness；that 引导限制性定语从句修饰 cheerfulness。",
      reassembly_notes: "that's exactly 译为‘但这恰恰是……’；cheerfulness 转译为‘乐观/乐天态度’，定语从句提前修饰‘积极心理学家绝不推荐的’。",
      scoring_points: [
        {
          phrase: "But that's exactly the kind of false cheerfulness",
          score: 1.0,
          guide: "exactly 表强调‘恰恰/正是’；false cheerfulness 核心概念‘虚假的高兴/强颜欢笑/虚妄的盲目乐观’。意群精准译为‘但这恰恰是那种虚假的欢快’",
          vocab: [
            { word: "cheerfulness", pos: "n.", common: "愉快；快乐", context: "乐观欢悦的心态" },
            { word: "false", pos: "adj.", common: "虚假的；错误的", context: "不真实的；虚妄的" }
          ]
        },
        {
          phrase: "that positive psychologists wouldn't recommend",
          score: 1.0,
          guide: "that 定语从句；positive psychologists 专有名词‘积极心理学家’；recommend 动词‘推荐/倡导’。意群精准译为‘积极心理学家绝不推荐的做法’",
          vocab: [
            { word: "positive", pos: "adj.", common: "积极的；正面的", context: "positive psychology 积极心理学" },
            { word: "psychologist", pos: "n.", common: "心理学家", context: "从事心理科学研究的学者" },
            { word: "recommend", pos: "v.", common: "推荐；建议", context: "推崇；倡导" }
          ]
        }
      ]
    },
    {
      sid: 3,
      pid: 1,
      en: "\"Healthy optimism means being in touch with reality,\" says Tal Ben-Shahar, a Harvard professor.",
      cn: "哈佛大学教授塔尔·本-沙哈尔表示：“健康的乐观主义意味着立足于现实。”",
      grammar_breakdown: "直接引语作宾语，主句为 says Tal Ben-Shahar，a Harvard professor 为同位语解释主语身份；引语中 means 后接动名词短语 being in touch with reality 作宾语。",
      reassembly_notes: "语序调整：引语标点在汉语中通常先交代说话人及其身份‘哈佛大学教授……表示’，再接冒号引号引出所言内容，语流更加符合中文叙述惯例。",
      scoring_points: [
        {
          phrase: "\"Healthy optimism means being in touch with reality,\"",
          score: 1.0,
          guide: "in touch with 核心习语‘接触；联系；立足于’；reality 译为‘客观现实’。意群精准译为‘“健康的乐观主义意味着不脱离现实”’",
          vocab: [
            { word: "healthy", pos: "adj.", common: "健康的", context: "理性的；健全的（乐观心态）" },
            { word: "reality", pos: "n.", common: "现实；实际情况", context: "客观现实与生活境况" }
          ]
        },
        {
          phrase: "says Tal Ben-Shahar, a Harvard professor",
          score: 1.0,
          guide: "完全倒装引语主句；a Harvard professor 作同位语，提前翻译修饰。意群精准译为‘哈佛大学教授塔尔·本-沙哈尔说道’",
          vocab: [
            { word: "professor", pos: "n.", common: "教授", context: "大学正教授" }
          ]
        }
      ]
    },
    {
      sid: 4,
      pid: 1,
      en: "According to Ben-Shahar, realistic optimists are those who make the best of things that happen, but not those who believe everything happens for the best.",
      cn: "本-沙哈尔认为，务实的乐观主义者是那些能对所发生之事随遇而安、充分利用的人，而不是盲目相信一切发生皆是最好安排的人。",
      grammar_breakdown: "According to 作介词状语；主干为 realistic optimists are those... but not those...；两个 those 后面各自带有一个由 who 引导的定语从句，形成对比。",
      reassembly_notes: "句型包含 not A but B 对比思维（此处是 A but not B）。make the best of 是考研必背习语（充分利用现有条件），与 believe everything happens for the best 形成鲜明反差，重组时增补连词‘而不是’强化对仗。",
      scoring_points: [
        {
          phrase: "According to Ben-Shahar, realistic optimists are those who make the best of things that happen",
          score: 1.0,
          guide: "realistic optimists 译为‘务实的/现实的乐观主义者’；make the best of 习语译为‘充分利用；善处逆境’；that happen 定语从句译为‘所发生的事情’。意群精准译为‘本-沙哈尔指出，务实的乐观者会尽可能善用所发生的一切’",
          vocab: [
            { word: "realistic", pos: "adj.", common: "现实的；务实的", context: "立足实际的；实事求是的" },
            { word: "make the best of", pos: "phr.", common: "充分利用；妥善处理", context: "面对困境尽力争取最好结果" }
          ]
        },
        {
          phrase: "but not those who believe everything happens for the best",
          score: 1.0,
          guide: "but not 引导并列否定项；happen for the best 习语译为‘冥冥中都是最好的安排/最终结果总是好的’。意群精准译为‘而非盲目坚信所有事情都会走向最好结局的人’",
          vocab: [
            { word: "believe", pos: "v.", common: "相信；坚信", context: "盲目坚信某种信念" }
          ]
        }
      ]
    },
    {
      sid: 5,
      pid: 2,
      en: "Ben-Shahar uses three optimistic exercises.",
      cn: "本-沙哈尔推行了三套培养乐观心态的练习方法。",
      grammar_breakdown: "主谓宾简单句：主语 Ben-Shahar，谓语 uses，宾语 three optimistic exercises。",
      reassembly_notes: "单句顺译。将 exercises 结合心理学语境引申为‘心理练习/训练方法’，避免字面直译‘做练习’。",
      scoring_points: [
        {
          phrase: "Ben-Shahar uses three optimistic exercises",
          score: 2.0,
          guide: "uses 译为‘运用/推行’；optimistic exercises 译为‘乐观练习/积极心态训练方法’。意群精准译为‘本-沙哈尔经常运用三种培养乐观心态的练习’",
          vocab: [
            { word: "exercise", pos: "n.", common: "锻炼；练习", context: "心理调节与思维训练方法" }
          ]
        }
      ]
    },
    {
      sid: 6,
      pid: 2,
      en: "When he feels down – say, after giving a bad lecture – he grants himself permission to be human.",
      cn: "每当他情绪低落时——比如说，在搞砸了一场演讲之后——他便允许自己展露出作为普通人的一面。",
      grammar_breakdown: "When 引导时间状语从句；破折号之间 say, after giving a bad lecture 为插入语作举例说明；主句主谓宾补为 he grants himself permission to be human。",
      reassembly_notes: "插入语 say 在此为熟词僻义（副词表‘比方说’）；grant permission 搭配 to be human 属于地道英语习语，意指‘接纳自己也会犯错的凡人属性’，意译为‘允许自己也有凡人的弱点/展露凡人一面’。",
      scoring_points: [
        {
          phrase: "When he feels down – say, after giving a bad lecture",
          score: 1.0,
          guide: "feel down 习语‘情绪低落/心情沮丧’；say 插入语‘比方说’；bad lecture 译为‘一场糟糕的授课/讲座’。意群精准译为‘当他情绪沮丧时——比如作了一场糟糕的讲座之后’",
          vocab: [
            { word: "down", pos: "adj./adv.", common: "向下", context: "feel down 情绪消沉低落" },
            { word: "lecture", pos: "n.", common: "讲座；演讲；训斥", context: "大学课堂讲授；学术演讲" }
          ]
        },
        {
          phrase: "he grants himself permission to be human",
          score: 1.0,
          guide: "grant sb permission to do 译为‘给予某人……的许可’；to be human 意译为‘承认自己只是凡人/允许自己是个普通人’。意群精准译为‘他会允许自己也有身为普通人的软弱’",
          vocab: [
            { word: "grant", pos: "v.", common: "准许；授予", context: "正式允许；给予" },
            { word: "permission", pos: "n.", common: "许可；准许", context: "宽容与接纳的许可" }
          ]
        }
      ]
    },
    {
      sid: 7,
      pid: 2,
      en: "He reminds himself that not every lecture can be a Nobel winner; some will be less effective than others.",
      cn: "他提醒自己：并非每一次演讲都能像诺贝尔奖得主的发言那样惊艳；有些演讲的效果难免会不如其他场次。",
      grammar_breakdown: "主句为 He reminds himself that...；that 引导宾语从句；从句中 not every 为部分否定；分号连接并列句 some will be less effective than others。",
      reassembly_notes: "not every 是考研英语重点语法（部分否定），必须译为‘并非每一次……都……’，不能误译为全盘否定；Nobel winner 比喻引申为‘顶尖杰作/极高水准’。",
      scoring_points: [
        {
          phrase: "He reminds himself that not every lecture can be a Nobel winner",
          score: 1.0,
          guide: "remind sb that 译为‘提醒自己……’；not every 考查部分否定‘并非每场……都能……’；Nobel winner 借喻极高成就。意群精准译为‘他告诫自己，并非每场讲座都能达到诺奖级别的高度’",
          vocab: [
            { word: "remind", pos: "v.", common: "提醒；使想起", context: "心理自我告诫与提醒" },
            { word: "lecture", pos: "n.", common: "演讲；讲座", context: "公开授课" }
          ]
        },
        {
          phrase: "some will be less effective than others",
          score: 1.0,
          guide: "less effective than 比较级‘效果不如其他场次’；some 与 others 对比。意群精准译为‘总有些演讲的效果会稍显逊色’",
          vocab: [
            { word: "effective", pos: "adj.", common: "有效的；起作用的", context: "授课与沟通成效卓著的" }
          ]
        }
      ]
    },
    {
      sid: 8,
      pid: 2,
      en: "Next is reconstruction.",
      cn: "紧接着第二步是认知重构。",
      grammar_breakdown: "倒装系表结构，副词/序数标志 Next 位于句首充当表语，连系动词 is，主语为 reconstruction。",
      reassembly_notes: "单句精练。reconstruction 在心理学中专业术语为‘认知重构’（cognitive reconstruction），体现语境专业度。",
      scoring_points: [
        {
          phrase: "Next is reconstruction",
          score: 2.0,
          guide: "Next 译为‘下一步/紧接着’；reconstruction 结合积极心理学专业术语译为‘思维重构/认知重塑’。意群精准译为‘接下来的环节便是认知重构’",
          vocab: [
            { word: "reconstruction", pos: "n.", common: "重建；改建", context: "心理认知重构（重新诠释困境）" }
          ]
        }
      ]
    }
  ],

  2015: [
    {
      sid: 1,
      pid: 0,
      en: "Think about driving a route that's very familiar.",
      cn: "请设想一下，开车行驶在一条你非常熟悉的线路上。",
      grammar_breakdown: "祈使句；动词 Think about 作谓语，宾语为 driving a route；that 引导限制性定语从句 that's very familiar 修饰 route。",
      reassembly_notes: "祈使句顺译，增补委婉语气词‘请设想一下/想象一下’；定语从句提前修饰‘一条你极为熟悉的路线’。",
      scoring_points: [
        {
          phrase: "Think about driving a route",
          score: 1.0,
          guide: "Think about 祈使句译为‘想象一下/试想……’；driving a route 译为‘沿某条路线驾车行驶’。意群精准译为‘试想一下开车走某条路线的情景’",
          vocab: [
            { word: "route", pos: "n.", common: "路线；路途", context: "日常行驶的行车路线" }
          ]
        },
        {
          phrase: "that's very familiar",
          score: 1.0,
          guide: "that 定语从句修饰 a route，familiar 译为‘熟悉的/驾轻就熟的’。意群精准译为‘而这条路线你极为熟悉’",
          vocab: [
            { word: "familiar", pos: "adj.", common: "熟悉的；通晓的", context: "走过多次、烂熟于心的" }
          ]
        }
      ]
    },
    {
      sid: 2,
      pid: 0,
      en: "It could be your commute to work, a trip into town or the way home.",
      cn: "那可能是你上班的通勤路、进城采买的路线，或是返程回家的路途。",
      grammar_breakdown: "主干为主系表结构，It could be 后面连接三个并列名词短语作为表语：your commute to work, a trip into town 和 the way home。",
      reassembly_notes: "三个并列路程顺译，注意 commute 为考研高频重点词汇，专指‘上班通勤/往返上下班的路程’。",
      scoring_points: [
        {
          phrase: "It could be your commute to work",
          score: 1.0,
          guide: "It 指代前面的路线；commute to work 考研核心短语，译为‘上班的通勤路’。意群精准译为‘它可能是你每日上下班的通勤路线’",
          vocab: [
            { word: "commute", pos: "n./v.", common: "上下班往返；通勤", context: "工作与住所之间的往返路途" }
          ]
        },
        {
          phrase: "a trip into town or the way home",
          score: 1.0,
          guide: "a trip into town 译为‘进城一趟/前往市中心的路’；the way home 译为‘回家的路’。意群精准译为‘去往市区的一段路，或是回家的路途’",
          vocab: [
            { word: "trip", pos: "n.", common: "旅行；行程", context: "短途出行；一趟旅程" }
          ]
        }
      ]
    },
    {
      sid: 3,
      pid: 0,
      en: "Whichever it is, you know every twist and turn like the back of your hand.",
      cn: "无论是哪一种，对于路上的每一处弯道曲折，你都了如指掌、烂熟于心。",
      grammar_breakdown: "Whichever it is 引导让步状语从句；主句主干为 you know every twist and turn；介词短语 like the back of your hand 作方式状语。",
      reassembly_notes: "让步状语从句顺译；twist and turn 译为‘弯弯绕绕/每一个转弯与曲折’；like the back of one's hand 属于经典英语习语，翻译为汉语成语‘了如指掌/烂熟于心’最为地道传神。",
      scoring_points: [
        {
          phrase: "Whichever it is",
          score: 0.5,
          guide: "Whichever 引导让步状语从句，译为‘不论是哪一种情况/无论是哪条路’。意群精准译为‘无论是哪一种情形’",
          vocab: [
            { word: "whichever", pos: "pron.", common: "无论哪个", context: "不论上述所列举的哪一种路线" }
          ]
        },
        {
          phrase: "you know every twist and turn",
          score: 0.5,
          guide: "twist and turn 名词并列搭配，指‘盘旋曲折/每一个拐弯处’。意群精准译为‘你对路上的每个弯道曲折都一清二楚’",
          vocab: [
            { word: "twist", pos: "n./v.", common: "扭曲；转折", context: "道路的弯曲蜿蜒处" }
          ]
        },
        {
          phrase: "like the back of your hand",
          score: 1.0,
          guide: "比喻习语，字面是‘像手背一样了解’，地道汉语译为成语‘了如指掌’。意群精准译为‘简直就像熟悉自己的手背一样了如指掌’",
          vocab: [
            { word: "back of hand", pos: "idiom", common: "手背", context: "like the back of one's hand 了如指掌" }
          ]
        }
      ]
    },
    {
      sid: 4,
      pid: 1,
      en: "On these sorts of trips it's easy to lose concentration on the driving and pay little attention to the passing scenery.",
      cn: "在这类行车过程中，人们很容易在驾驶时注意力涣散，并且对沿途掠过的风景视而不见。",
      grammar_breakdown: "On these sorts of trips 为介词短语作状语；it 为形式主语，真正的主语为两个并列不定式短语 to lose concentration... and (to) pay little attention...。",
      reassembly_notes: "形式主语 it 顺译为‘很容易……’；little attention 含有半否定意义，翻译出‘很少留意/几乎视而不见’；passing scenery 译为‘沿途掠过的景物/身边经过的风景’。",
      scoring_points: [
        {
          phrase: "On these sorts of trips it's easy to lose concentration on the driving",
          score: 1.0,
          guide: "it 为形式主语；lose concentration 译为‘分散注意力/注意力难以集中’；driving 作动名词宾语。意群精准译为‘在这样的旅程中，人们很容易在开车时分散注意力’",
          vocab: [
            { word: "concentration", pos: "n.", common: "专注；专心；浓度", context: "精神集中度；注意力" }
          ]
        },
        {
          phrase: "and pay little attention to the passing scenery",
          score: 1.0,
          guide: "pay little attention to 含有半否定‘几乎不注意/很少留心’；passing scenery 译为‘沿途掠过的风景’。意群精准译为‘并且几乎无心留恋沿途掠过的景物’",
          vocab: [
            { word: "attention", pos: "n.", common: "注意；关注", context: "pay attention to 集中关注" },
            { word: "scenery", pos: "n.", common: "风景；景色", context: "道路两侧的自然或人文风光" }
          ]
        }
      ]
    },
    {
      sid: 5,
      pid: 1,
      en: "The consequence is that you perceive that the trip has taken less time than it actually has.",
      cn: "其结果就是，你主观上觉得这趟旅程所花费的时间，比实际耗费的时间要短得多。",
      grammar_breakdown: "主句主系表：The consequence is that...；第一个 that 引导表语从句；从句中 perceive 后嵌套第二个 that 引导的宾语从句；宾语从句中包含 less... than 比较结构，has 后面省略了 taken。",
      reassembly_notes: "双重从句嵌套：先译表语从句‘结果是’，再译感知宾语从句‘你觉得……’；比较级结构‘比实际耗时更少’与汉语习惯契合，顺畅衔接。",
      scoring_points: [
        {
          phrase: "The consequence is that you perceive",
          score: 1.0,
          guide: "consequence 考研核心词‘结果；后果’；perceive 动词‘感知到；主观觉得’。意群精准译为‘这种心不在焉的结果便是，你会主观感觉’",
          vocab: [
            { word: "consequence", pos: "n.", common: "结果；后果；重要性", context: "必然招致的情形或结果" },
            { word: "perceive", pos: "v.", common: "感知；察觉；认为", context: "主观直觉与认知感知" }
          ]
        },
        {
          phrase: "that the trip has taken less time than it actually has",
          score: 1.0,
          guide: "take time 译为‘花费时间’；less... than 比较级；it actually has 省略了 taken time。意群精准译为‘该行程所花费的时间比实际消耗的时间更短’",
          vocab: [
            { word: "actually", pos: "adv.", common: "实际上；事实上", context: "真实客观情况下" }
          ]
        }
      ]
    },
    {
      sid: 6,
      pid: 2,
      en: "This is the well-travelled road effect: People tend to underestimate the time it takes to travel a familiar route.",
      cn: "这就是著名的“走熟路效应”：人们往往会低估沿着一条熟悉路线行驶所需要的时间。",
      grammar_breakdown: "冒号前为主系表结构 This is the well-travelled road effect；冒号后为同位语解释分句，主干为 People tend to underestimate the time，it takes to travel a familiar route 为省略了 that 的定语从句修饰 time。",
      reassembly_notes: "well-travelled road effect 为心理学专属名词‘走熟路效应’；underestimate 考研常考前缀词（under- + estimate 估计不足/低估），定语从句提前翻译为‘行驶一条熟悉路线所花费的时间’。",
      scoring_points: [
        {
          phrase: "This is the well-travelled road effect:",
          score: 0.5,
          guide: "专有名词 well-travelled road effect 译为‘走熟路效应/熟路效应’，冒号引出定义解释。意群精准译为‘这就是所谓的“走熟路效应”：’",
          vocab: [
            { word: "well-travelled", pos: "adj.", common: "常有人走的", context: "非常熟悉且常开的道路" },
            { word: "effect", pos: "n.", common: "效应；影响", context: "心理学效应/现象" }
          ]
        },
        {
          phrase: "People tend to underestimate the time",
          score: 0.5,
          guide: "tend to 译为‘往往；倾向于’；underestimate 考研高频词，译为‘低估/轻估’。意群精准译为‘人们往往会低估’",
          vocab: [
            { word: "tend", pos: "v.", common: "倾向；照料", context: "tend to 往往易于出现某种倾向" },
            { word: "underestimate", pos: "v.", common: "低估；看轻", context: "在估算时间或成本时偏低" }
          ]
        },
        {
          phrase: "it takes to travel a familiar route",
          score: 1.0,
          guide: "定语从句修饰 the time，it 为形式主语‘花费……时间去走一段熟悉路线’。意群精准译为‘行驶一条熟悉路线所耗费的时间’",
          vocab: [
            { word: "familiar", pos: "adj.", common: "熟悉的", context: "驾轻就熟的路线" }
          ]
        }
      ]
    },
    {
      sid: 7,
      pid: 2,
      en: "The effect is caused by the way we allocate our attention.",
      cn: "之所以产生这种效应，是因为我们分配自身注意力的方式所致。",
      grammar_breakdown: "主干为被动语态 The effect is caused by...；the way 后面跟定语从句 we allocate our attention 修饰 the way（省略了 in which 或 that）。",
      reassembly_notes: "被动句转译：is caused by 转译为汉语因果连词‘之所以……是因为……’，符合汉语习惯；allocate attention 译为‘分配注意力’。",
      scoring_points: [
        {
          phrase: "The effect is caused by",
          score: 1.0,
          guide: "被动语态被动转主动，译为‘这种效应是由……引起的/之所以产生该效应，源于……’。意群精准译为‘这一效应的产生，根源在于’",
          vocab: [
            { word: "cause", pos: "v.", common: "引起；导致", context: "be caused by 由……引起；根源在于" }
          ]
        },
        {
          phrase: "the way we allocate our attention",
          score: 1.0,
          guide: "the way 后跟定语从句，allocate 考研高频核心词‘分配；配给’；attention 译为‘注意力’。意群精准译为‘我们分配自身注意力的方式’",
          vocab: [
            { word: "allocate", pos: "v.", common: "分配；划拨", context: "合理调配与分配心理认知资源" },
            { word: "attention", pos: "n.", common: "注意力", context: "大脑心智的专注点" }
          ]
        }
      ]
    },
    {
      sid: 8,
      pid: 2,
      en: "When we travel down a well-known route, because we don't have to concentrate much, time seems to flow more quickly.",
      cn: "当我们行驶在一条熟知的路线上时，由于我们不必高度集中精力，时间似乎流逝得更为飞快。",
      grammar_breakdown: "When 引导时间状语从句；主句前面又插入了 because 引导的原因状语从句；主句主干为 time seems to flow more quickly。",
      reassembly_notes: "双重状语从句（时间状语从句 + 原因状语从句），顺译逻辑先后；concentrate much 译为‘高度集中精神’；flow more quickly 拟人化‘时间流逝得更快’。",
      scoring_points: [
        {
          phrase: "When we travel down a well-known route",
          score: 0.5,
          guide: "When 引导时间状语；well-known route 译为‘熟知的路线’；travel down 译为‘驱车行驶在……’。意群精准译为‘当我们行驶在一条熟悉的路线上时’",
          vocab: [
            { word: "well-known", pos: "adj.", common: "著名的；众所周知的", context: "烂熟于心的；所熟知的" }
          ]
        },
        {
          phrase: "because we don't have to concentrate much",
          score: 0.5,
          guide: "because 原因状语从句，don't have to 译为‘不必’；concentrate 不及物动词‘聚精会神/集中精力’。意群精准译为‘因为我们不必过于高度集中精力’",
          vocab: [
            { word: "concentrate", pos: "v.", common: "集中；聚集；浓缩", context: "全神贯注；集中注意力" }
          ]
        },
        {
          phrase: "time seems to flow more quickly",
          score: 1.0,
          guide: "主句主干，seem to 译为‘似乎/好像’；flow 比喻时间如水般‘流逝’；more quickly 比较级修饰 flow。意群精准译为‘时间似乎便流逝得更为迅速’",
          vocab: [
            { word: "flow", pos: "v.", common: "流动；流出", context: "比喻时光飞速流淌流逝" },
            { word: "quickly", pos: "adv.", common: "迅速地；快速地", context: "飞速地" }
          ]
        }
      ]
    }
  ]
};
