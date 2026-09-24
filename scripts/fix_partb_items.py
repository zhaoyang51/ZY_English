import json, os

ITEMS_DATA = {
    2010: [
        {"qid": 41, "title": "Findings of the Stanford University researchers will promote the sales of new Boeing and Airbus aircraft.", "title_cn": "斯坦福大学研究人员的发现将促进波音和空客新飞机的销售。"},
        {"qid": 42, "title": "The upwash experience may save propelling energy as well as reducing resistance.", "title_cn": "上升气流的体验既能节省推进能量，又能减少空气阻力。"},
        {"qid": 43, "title": "Formation flight is more comfortable because passengers can not see the other planes.", "title_cn": "编队飞行更加舒适是因为乘客看不到其他飞机。"},
        {"qid": 44, "title": "The role that weather plays in formation flight has not yet been clearly defined.", "title_cn": "天气在编队飞行中所起的作用尚未完全明确。"},
        {"qid": 45, "title": "It has been documented that during World War II, America's armed forces once tried formation flight to save fuel.", "title_cn": "有文献记录表明，二战期间美国军队曾尝试编队飞行以节省燃油。"}
    ],
    2011: [
        {"qid": 41, "title": "Andrew Lansley held that", "title_cn": "安德鲁·兰斯利 (Andrew Lansley) 认为"},
        {"qid": 42, "title": "Terence Stephenson agreed that", "title_cn": "特伦斯·斯蒂芬森 (Terence Stephenson) 赞同"},
        {"qid": 43, "title": "Jamie Oliver seemed to believe that", "title_cn": "杰米·奥利弗 (Jamie Oliver) 似乎认为"},
        {"qid": 44, "title": "Dinesh Bhugra suggested that", "title_cn": "迪内什·布格拉 (Dinesh Bhugra) 建议"},
        {"qid": 45, "title": "A Department of Health spokesperson proposed that", "title_cn": "卫生部发言人 (Department of Health) 提出"}
    ],
    2012: [
        {"qid": 41, "title": "Petrarch", "title_cn": "弗朗切斯科·彼特拉克 (Petrarch)"},
        {"qid": 42, "title": "Niccolò Machiavelli", "title_cn": "尼科洛·马基雅维利 (Niccolò Machiavelli)"},
        {"qid": 43, "title": "Samuel Smiles", "title_cn": "萨缪尔·斯迈尔斯 (Samuel Smiles)"},
        {"qid": 44, "title": "Thomas Carlyle", "title_cn": "托马斯·卡莱尔 (Thomas Carlyle)"},
        {"qid": 45, "title": "Marx and Engels", "title_cn": "卡尔·马克思与弗里德里希·恩格斯 (Marx and Engels)"}
    ],
    2013: [
        {"qid": 41, "title": "[Para 3] Impulsive spending isn't an option, so plan your week's menu in advance...", "title_cn": "第 3 段小标题 (提前规划菜单)", "locate_para": 2},
        {"qid": 42, "title": "[Para 5] This is where supermarkets and their anonymity come in handy...", "title_cn": "第 5 段小标题 (利用超市匿名性)", "locate_para": 4},
        {"qid": 43, "title": "[Para 7] You may proudly claim to only have frozen peas in the freezer...", "title_cn": "第 7 段小标题 (物尽其用不浪费)", "locate_para": 6},
        {"qid": 44, "title": "[Para 9] Everyone says this, but it really is a top tip for frugal eaters. Shop at butchers, delis...", "title_cn": "第 9 段小标题 (与店主建立友好关系)", "locate_para": 8},
        {"qid": 45, "title": "[Para 11] You won't be eating out a lot, but save your pennies and once every few months treat yourself...", "title_cn": "第 11 段小标题 (偶尔犒劳一下自己)", "locate_para": 10}
    ],
    2014: [
        {"qid": 41, "title": "Stone Circle", "title_cn": "《石圈》(Stone Circle)"},
        {"qid": 42, "title": "Olaf Street Study", "title_cn": "《奥拉夫街研究》(Olaf Street Study)"},
        {"qid": 43, "title": "Across the Park", "title_cn": "《跨越公园》(Across the Park)"},
        {"qid": 44, "title": "Towards Avebury", "title_cn": "《走向埃夫伯里》(Towards Avebury)"},
        {"qid": 45, "title": "Seven Days", "title_cn": "《七日》(Seven Days)"}
    ],
    2015: [
        {"qid": 41, "title": "[Para 5] Fear is both useful and harmful. This normal human reaction is used...", "title_cn": "第 5 段小标题 (多数恐惧并非真实存在)", "locate_para": 4},
        {"qid": 42, "title": "[Para 7] If you are surrounded by problems and cannot stop thinking about them...", "title_cn": "第 7 段小标题 (专注于当下时刻)", "locate_para": 6},
        {"qid": 43, "title": "[Para 9] Sometimes it is easy to feel bad because you are going through tough times...", "title_cn": "第 9 段小标题 (有许多值得感恩的事)", "locate_para": 8},
        {"qid": 44, "title": "[Para 11] No matter how isolated you might feel and how serious the situation is...", "title_cn": "第 11 段小标题 (你并不孤单)", "locate_para": 10},
        {"qid": 45, "title": "[Para 13] Today many people find it difficult to trust their own opinion and often rely on others...", "title_cn": "第 13 段小标题 (开辟属于你自己的独特道路)", "locate_para": 12}
    ],
    2016: [
        {"qid": 41, "title": "[Para 4] What does a child do when he's sad? He cries. When he's angry? He screams...", "title_cn": "第 4 段小标题 (宣泄情感与求助)", "locate_para": 3},
        {"qid": 42, "title": "[Para 6] A couple of Christmases ago, my youngest stepdaughter, who was nine years old at the time...", "title_cn": "第 6 段小标题 (容易得到满足)", "locate_para": 5},
        {"qid": 43, "title": "[Para 8] Have you ever noticed how much children laugh? If we adults could lighten up...", "title_cn": "第 8 段小标题 (保持孩子般的傻气/童真)", "locate_para": 7},
        {"qid": 44, "title": "[Para 10] The problem with being a grownup is that there's an awful lot of serious stuff to deal with...", "title_cn": "第 10 段小标题 (享受乐趣/找寻快乐)", "locate_para": 9},
        {"qid": 45, "title": "[Para 12] Having said all of the above, it's important to add that we shouldn't walk through life oblivious...", "title_cn": "第 12 段小标题 (留心感知周围事物)", "locate_para": 11}
    ],
    2017: [
        {"qid": 41, "title": "Jay Dunwell", "title_cn": "杰伊·邓威尔 (Jay Dunwell)"},
        {"qid": 42, "title": "Jason Stenquist", "title_cn": "杰森·斯滕奎斯特 (Jason Stenquist)"},
        {"qid": 43, "title": "Birgit Klohs", "title_cn": "比尔吉特·克洛斯 (Birgit Klohs)"},
        {"qid": 44, "title": "Rob Spohr", "title_cn": "罗布·斯波尔 (Rob Spohr)"},
        {"qid": 45, "title": "Julie Parks", "title_cn": "朱莉·帕克斯 (Julie Parks)"}
    ],
    2018: [
        {"qid": 41, "title": "[Para 6] Suppose you are in a room with someone you don't know and something gets your attention...", "title_cn": "第 6 段小标题 (想说就直说)", "locate_para": 5},
        {"qid": 42, "title": "[Para 9] It is a problem all of us face; you have limited time with the person and don't know what to ask...", "title_cn": "第 9 段小标题 (跳过无关紧要的闲聊)", "locate_para": 8},
        {"qid": 43, "title": "[Para 13] When you meet a person for the first time, make an effort to find common ground...", "title_cn": "第 13 段小标题 (寻找‘我也一样’的共鸣)", "locate_para": 12},
        {"qid": 44, "title": "[Para 15] Imagine you are pouring your heart out to someone and they are just nodding along without listening...", "title_cn": "第 15 段小标题 (全心投入倾听)", "locate_para": 14},
        {"qid": 45, "title": "[Para 18] You all came into a conversation where you first met the person, remember their name and details...", "title_cn": "第 18 段小标题 (记住姓名、地点与细节)", "locate_para": 17}
    ],
    2019: [
        {"qid": 41, "title": "Ryan Hooper", "title_cn": "瑞恩·胡珀 (Ryan Hooper)"},
        {"qid": 42, "title": "Adam Bailey", "title_cn": "亚当·贝利 (Adam Bailey)"},
        {"qid": 43, "title": "Tracey Hampson", "title_cn": "特蕾西·汉普森 (Tracey Hampson)"},
        {"qid": 44, "title": "Aaron Norris", "title_cn": "亚伦·诺里斯 (Aaron Norris)"},
        {"qid": 45, "title": "Julie Gurner", "title_cn": "朱莉·格纳 (Julie Gurner)"}
    ],
    2020: [
        {"qid": 41, "title": "[Para 4] If you have a bone to pick with someone in your workplace, you may want to address it directly...", "title_cn": "第 4 段小标题 (多花时间与同事交流)", "locate_para": 3},
        {"qid": 42, "title": "[Para 6] Just as important as being honest about yourself is being receptive to what others have to say...", "title_cn": "第 6 段小标题 (放慢节奏用心倾听)", "locate_para": 5},
        {"qid": 43, "title": "[Para 8] It's common to have a 'cubicle mate' or special confidant in a workplace, but adapt to diverse styles...", "title_cn": "第 8 段小标题 (量身定制社交互动)", "locate_para": 7},
        {"qid": 44, "title": "[Para 10] Positive feedback is important for anyone to hear. And you don't have to wait for annual reviews...", "title_cn": "第 10 段小标题 (换位思考设身处地)", "locate_para": 9},
        {"qid": 45, "title": "[Para 12] This one may be a bit more difficult to pull off, but it can go a long way: be pleasant always...", "title_cn": "第 12 段小标题 (始终展现和善面容)", "locate_para": 11}
    ],
    2021: [
        {"qid": 41, "title": "[Para 4] You may decide it's best to hold off on voicing your opinion. Maybe the timing isn't right...", "title_cn": "第 4 段小标题 (决定是否暂时等待)", "locate_para": 3},
        {"qid": 42, "title": "[Para 6] Before you share your thoughts, think about what the powerful person cares about...", "title_cn": "第 6 段小标题 (明确共同的目标)", "locate_para": 5},
        {"qid": 43, "title": "[Para 8] This step may sound overly deferential, but it's a smart way to give the powerful person...", "title_cn": "第 8 段小标题 (征求表达异议的许可)", "locate_para": 7},
        {"qid": 44, "title": "[Para 10] You might feel your heart racing or your face turning red, but do your best to remain...", "title_cn": "第 10 段小标题 (保持镇定冷静)", "locate_para": 9},
        {"qid": 45, "title": "[Para 12] Emphasize that you're only offering your opinion, not gospel truth...", "title_cn": "第 12 段小标题 (保持谦逊客观)", "locate_para": 11}
    ],
    2022: [
        {"qid": 41, "title": "[Para 4] Don't try to go back to what you were doing before your break. If you used to run five miles...", "title_cn": "第 4 段小标题 (从低难度开始，循序渐进)", "locate_para": 3},
        {"qid": 42, "title": "[Para 6] If you're breathing too hard to talk in complete sentences, back off the intensity...", "title_cn": "第 6 段小标题 (倾听身体给出的信号)", "locate_para": 5},
        {"qid": 43, "title": "[Para 8] Consistency is the key to getting stronger and building endurance...", "title_cn": "第 8 段小标题 (将其培养成生活习惯)", "locate_para": 7},
        {"qid": 44, "title": "[Para 10] Even if you can't yet do a favorite activity, you can practice the basic movement...", "title_cn": "第 10 段小标题 (从基础动作模拟开始)", "locate_para": 9},
        {"qid": 45, "title": "[Para 12] Exercising with others 'can keep you accountable and make it more enjoyable.'...", "title_cn": "第 12 段小标题 (不要独自一人锻炼)", "locate_para": 11}
    ],
    2023: [
        {"qid": 41, "title": "Brian Berry", "title_cn": "布莱恩·贝里 (Brian Berry)"},
        {"qid": 42, "title": "Gareth Belsham", "title_cn": "加雷斯·贝尔舍姆 (Gareth Belsham)"},
        {"qid": 43, "title": "Marcus Jefford", "title_cn": "马库斯·杰福德 (Marcus Jefford)"},
        {"qid": 44, "title": "John Kelly", "title_cn": "约翰·凯利 (John Kelly)"},
        {"qid": 45, "title": "Andrew Mellor", "title_cn": "安德鲁·梅勒 (Andrew Mellor)"}
    ],
    2024: [
        {"qid": 41, "title": "Sue Rexford", "title_cn": "苏·雷克斯福德 (Sue Rexford)"},
        {"qid": 42, "title": "Sara Harberson", "title_cn": "莎拉·哈伯森 (Sara Harberson)"},
        {"qid": 43, "title": "Katie Kelley", "title_cn": "凯蒂·凯利 (Katie Kelley)"},
        {"qid": 44, "title": "Mayghin Levine", "title_cn": "梅金·莱文 (Mayghin Levine)"},
        {"qid": 45, "title": "Erica Gwyn", "title_cn": "埃里卡·格温 (Erica Gwyn)"}
    ],
    2025: [
        {"qid": 41, "title": "[Para 5] Great ideas don't stand alone. In other words, you can't mention a new idea without connecting...", "title_cn": "第 5 段小标题 (化身推销员，阐述商业价值)", "locate_para": 4},
        {"qid": 42, "title": "[Para 7] Sometimes it makes sense to go to your boss first. But other times...", "title_cn": "第 7 段小标题 (善用跨部门多重沟通渠道)", "locate_para": 6},
        {"qid": 43, "title": "[Para 9] One of the biggest barriers to gaining buy-in occurs when the owner appears rigid...", "title_cn": "第 9 段小标题 (保持谦虚包容的态度)", "locate_para": 8},
        {"qid": 44, "title": "[Para 11] New ideas are the grandchildren of old ones. In other words, don't trash existing systems...", "title_cn": "第 11 段小标题 (尊重组织过往积累的经验)", "locate_para": 10},
        {"qid": 45, "title": "[Para 13] When pitching a new idea, it's important to use the language of an invitation...", "title_cn": "第 13 段小标题 (始终保持积极向上的基调)", "locate_para": 12}
    ],
    2026: [
        {"qid": 41, "title": "Ramni Jamnadass", "title_cn": "拉姆尼·贾姆纳达斯 (Ramni Jamnadass)"},
        {"qid": 42, "title": "Christopher Kettle", "title_cn": "克里斯托弗·凯特尔 (Christopher Kettle)"},
        {"qid": 43, "title": "John Stanturf", "title_cn": "约翰·斯坦特夫 (John Stanturf)"},
        {"qid": 44, "title": "Pedro Brancalion", "title_cn": "佩德罗·布兰卡里昂 (Pedro Brancalion)"},
        {"qid": 45, "title": "Robin Chazdon", "title_cn": "罗宾·查兹登 (Robin Chazdon)"}
    ]
}

def apply_items():
    for yr, items in ITEMS_DATA.items():
        fp = f'data/{yr}.json'
        if not os.path.exists(fp):
            continue
        with open(fp, 'r', encoding='utf-8') as f:
            d = json.load(f)
        if 'part_b' in d:
            d['part_b']['items'] = items
            with open(fp, 'w', encoding='utf-8') as f:
                json.dump(d, f, ensure_ascii=False, indent=2)
            print(f'Applied authentic items to {yr}.json')

if __name__ == '__main__':
    apply_items()
