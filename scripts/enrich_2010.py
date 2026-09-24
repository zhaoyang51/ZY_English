import json, os, re

def enrich_2010():
    fp = 'data/2010.json'
    with open(fp, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 1. Use of English (Swine flu)
    use_of_english = {
        "title": "2010 年考研英语（二）完形填空 Use of English",
        "q_range": "1-20",
        "directions": "Read the following text. Choose the best word(s) for each numbered blank and mark A, B, C or D on the ANSWER SHEET. (10 points)",
        "paragraphs": [
            {
                "pid": 0,
                "text": "The outbreak of swine flu that was first detected in Mexico was declared a global epidemic on June 11, 2009. It is the first worldwide epidemic  __1__  by the World Health Organization in 41 years."
            },
            {
                "pid": 1,
                "text": "The heightened alert  __2__  an emergency meeting with flu experts in Geneva that assembled after a sharp rise in cases in Australia, and rising  __3__  in Britain, Japan, Chile and elsewhere."
            },
            {
                "pid": 2,
                "text": "But the epidemic is \"  __4__  \" in severity, according to Margaret Chan, the organization's director general,  __5__  the overwhelming majority of patients experiencing only mild symptoms and a full recovery, often in the  __6__  of any medical treatment."
            },
            {
                "pid": 3,
                "text": "The outbreak came to global  __7__  in late April 2009, when Mexican authorities noted an unusually large number of hospitalizations and deaths  __8__  healthy adults. As much of Mexico City shut down at the height of a panic, cases began to  __9__  in New York City, the southwestern United States and around the world."
            },
            {
                "pid": 4,
                "text": "In the United States, new cases seemed to fade  __10__  warmer weather arrived. But in late September 2009, officials reported there was  __11__  flu activity in almost every state and that virtually all the  __12__  tested are the new swine flu, also known as (A) H1N1, not seasonal flu. In the U.S., it has  __13__  more than one million people, and caused more than 600 deaths and more than 6,000 hospitalizations."
            },
            {
                "pid": 5,
                "text": "Federal health officials  __14__  Tamiflu for children from the national stockpile and began  __15__  orders from the states for the new swine flu vaccine. The new vaccine, which is different from the annual flu vaccine, is  __16__  ahead of expectations. More than three million doses were to be made available in early October 2009, though most of those  __17__  doses were of the FluMist nasal spray type, which is not  __18__  for pregnant women, people over 50 or those with breathing difficulties, heart disease or several other  __19__  . But it was still possible to vaccinate people in other high-risk groups: health care workers, people  __20__  infants and healthy young people."
            }
        ],
        "questions": [
            { "qid": 1, "answer": "D", "options": { "A": "criticized", "B": "appointed", "C": "commented", "D": "designated" }, "category": "动词词义辨析", "analysis": "世界卫生组织指定/宣布某种疫情为全球流行病，designate 意为‘命名、指定’，符合公文权威界法语境。", "context_clue": "declared a global epidemic" },
            { "qid": 2, "answer": "C", "options": { "A": "proceeded", "B": "activated", "C": "followed", "D": "prompted" }, "category": "动词搭配与时序", "analysis": "提高警报级别是在日内瓦紧急会议‘之后’发生的（followed an emergency meeting）。", "context_clue": "after a sharp rise in cases" },
            { "qid": 3, "answer": "B", "options": { "A": "digits", "B": "numbers", "C": "amounts", "D": "sums" }, "category": "名词词义辨析", "analysis": "此处指患病人数增加，可数名词数量用 numbers；amounts 和 sums 常用在不可数名词或金额。", "context_clue": "sharp rise in cases" },
            { "qid": 4, "answer": "A", "options": { "A": "moderate", "B": "normal", "C": "unusual", "D": "extreme" }, "category": "形容词词义辨析", "analysis": "后文指出绝大多数患者症状轻微（mild symptoms），因此严重程度为‘温和/中等’（moderate）。", "context_clue": "mild symptoms and a full recovery" },
            { "qid": 5, "answer": "A", "options": { "A": "with", "B": "in", "C": "from", "D": "by" }, "category": "介词复合结构", "analysis": "with + 名词 + 分词构成独立主格结构，表伴随伴态。", "context_clue": "with the overwhelming majority ... experiencing" },
            { "qid": 6, "answer": "B", "options": { "A": "progress", "B": "absence", "C": "presence", "D": "favor" }, "category": "固定介词搭配", "analysis": "in the absence of 意为‘在缺乏/没有…的情况下’，符合患者即使不接受治疗也能完全康复的语境。", "context_clue": "full recovery" },
            { "qid": 7, "answer": "D", "options": { "A": "reality", "B": "phenomenon", "C": "concept", "D": "notice" }, "category": "固定习语搭配", "analysis": "come to global notice 意为‘引起全球关注’，固定表达。", "context_clue": "outbreak ... noted an unusually large number" },
            { "qid": 8, "answer": "C", "options": { "A": "over", "B": "for", "C": "among", "D": "to" }, "category": "介词词义辨析", "analysis": "在健康成年人‘群体之中’（among healthy adults）。", "context_clue": "deaths among healthy adults" },
            { "qid": 9, "answer": "B", "options": { "A": "stay", "B": "appear", "C": "continue", "D": "increase" }, "category": "动词词义辨析", "analysis": "病例开始在纽约市以及世界各地‘出现’（appear）。", "context_clue": "began to appear" },
            { "qid": 10, "answer": "A", "options": { "A": "as", "B": "if", "C": "unless", "D": "until" }, "category": "连词逻辑关系", "analysis": "as 引导时间状语从句，意为‘随着暖和天气的到来’，流感病例似乎逐渐消退。", "context_clue": "warmer weather arrived" },
            { "qid": 11, "answer": "C", "options": { "A": "excessive", "B": "enormous", "C": "widespread", "D": "extensive" }, "category": "形容词词义辨析", "analysis": "后文指出‘in almost every state’（几乎每个州），说明流感活动‘分布广泛’（widespread）。", "context_clue": "in almost every state" },
            { "qid": 12, "answer": "D", "options": { "A": "categories", "B": "examples", "C": "patterns", "D": "samples" }, "category": "名词词义辨析", "analysis": "医学检测的‘样本’称为 samples。", "context_clue": "tested are the new swine flu" },
            { "qid": 13, "answer": "D", "options": { "A": "imparted", "B": "visited", "C": "overwhelmed", "D": "infected" }, "category": "动词词义辨析", "analysis": "流感病毒‘感染’了一百多万人，使用 infect。", "context_clue": "infected more than one million people" },
            { "qid": 14, "answer": "A", "options": { "A": "released", "B": "delivered", "C": "relayed", "D": "injected" }, "category": "动词词义辨析", "analysis": "从国家储备库中‘调拨/释放’达菲药物，使用 release。", "context_clue": "from the national stockpile" },
            { "qid": 15, "answer": "C", "options": { "A": "administering", "B": "receiving", "C": "taking", "D": "dropping" }, "category": "动词固定搭配", "analysis": "take orders 意为‘接受/处理订单’，联邦官员开始接受各州的新疫苗订单。", "context_clue": "orders from the states" },
            { "qid": 16, "answer": "B", "options": { "A": "classified", "B": "arriving", "C": "planned", "D": "passed" }, "category": "动词词义辨析", "analysis": "根据后文 10 月初就能到位，说明新疫苗‘到货’早于预期（arriving ahead of expectations）。", "context_clue": "ahead of expectations" },
            { "qid": 17, "answer": "D", "options": { "A": "present", "B": "restricted", "C": "reasonable", "D": "initial" }, "category": "形容词词义辨析", "analysis": "与前文 early October（第一批）呼应，此处指‘首批/最初的’剂量（initial doses）。", "context_clue": "early October ... initial doses" },
            { "qid": 18, "answer": "C", "options": { "A": "feasible", "B": "eligible", "C": "recommended", "D": "relevant" }, "category": "形容词固定搭配", "analysis": "be recommended for 为固定搭配，意为‘推荐用于/适用于…’，鼻喷疫苗不推荐给孕妇使用。", "context_clue": "not recommended for pregnant women" },
            { "qid": 19, "answer": "A", "options": { "A": "conditions", "B": "situations", "C": "problems", "D": "complications" }, "category": "名词语境辨析", "analysis": "medical conditions 意为‘健康状况/疾病’，前文列举了 breathing difficulties, heart disease。", "context_clue": "breathing difficulties, heart disease" },
            { "qid": 20, "answer": "B", "options": { "A": "caring", "B": "caring for", "C": "caring about", "D": "caring of" }, "category": "动词短语搭配", "analysis": "care for 意为‘照料/看护’，此处指照料婴儿的人员（people caring for infants）。", "context_clue": "people caring for infants" }
        ]
    }

    # 2. Part B (True/False 2010)
    part_b = {
        "title": "2010 年考研英语（二）新题型 Part B",
        "subtype": "true_false",
        "q_range": "41-45",
        "directions": "Read the following text and decide whether each of the statements is true or false. Choose T if the statement is true or F if the statement is not true. Mark your answers on ANSWER SHEET 1. (10 points)",
        "paragraphs": [
            { "pid": 0, "text": "Copying Birds May Save Aircraft Fuel\nBoth Boeing and Airbus have trumpeted the efficiency of their newest aircraft, the 787 and A350 respectively. Their clever designs and lightweight composites certainly make a difference. But a group of researchers at Stanford University, led by Ilan Kroo, has suggested that airlines could take a more naturalistic approach to cutting jet-fuel use and it would not require them to buy new aircraft." },
            { "pid": 1, "text": "The answer, says Dr. Kroo, lies with birds. Since 1914, scientists have known that birds flying in formation – a V-shape – expend less energy. The air flowing over a bird's wings curls upwards behind the wingtips, a phenomenon known as upwash. Other birds flying in the upwash experience reduced drag, and spend less energy propelling themselves. Peter Lissaman, an aeronautics expert who was formerly at Caltech and the University of Southern California, has suggested that a formation of 25 birds might enjoy a range increase of 71%." },
            { "pid": 2, "text": "When applied to aircraft, the principles are not substantially different. Dr. Kroo and his team modeled what would happen if three passenger jets departing from Los Angeles, San Francisco and Las Vegas were to assemble over Utah, assume an inverted V-formation, occasionally change places so all could have a turn in the most favourable positions, and proceed to London. They found that the aircraft consumed as much as 15% less fuel (coupled with a reduction in carbon-dioxide output). Nitrogen-oxide emissions during the cruising portions of the flight fell by around a quarter." },
            { "pid": 3, "text": "There are, of course, knots to be worked out. One consideration is safety, or at least the perception of it. Would passengers feel comfortable travelling in company? Dr. Kroo points out that the aircraft could be separated by several nautical miles, and would not be in the intimate groupings favoured by display teams like the Red Arrows. A passenger peering out of the window might not even see the other planes. Whether the separation distances involved would satisfy air-traffic-control regulations is another matter, although a working group at the International Civil Aviation Organisation has included the possibility of formation flying in a blueprint for new operational guidelines." },
            { "pid": 4, "text": "It remains to be seen how weather conditions affect the air flows that make formation flight more efficient. In zones of increased turbulence, the planes' wakes will decay more quickly and the effect will diminish. Dr. Kroo says this is one of the areas his team will investigate further. It might also be hard for airlines to co-ordinate the departure times and destinations of passenger aircraft in a way that would allow them to gain from formation flight. Cargo aircraft, in contrast, might be easier to reschedule, as might routine military flights." },
            { "pid": 5, "text": "As it happens, America's armed forces are on the case already. Earlier this year the country's Defence Advanced Research Projects Agency announced plans to pay Boeing to investigate formation flight, though the programme has yet to begin. There are reports that some military aircraft flew in formation when they were low on fuel during the Second World War, but Dr. Lissaman says they are unsubstantiated. \"My father was an RAF pilot and my cousin the skipper of a Lancaster lost over Berlin,\" he adds. So he should know." }
        ],
        "items": [
            { "qid": 41, "title": "Findings of the Stanford University researchers will promote the sales of new Boeing and Airbus aircraft.", "locate_para": 0 },
            { "qid": 42, "title": "The upwash experience may save propelling energy as well as reducing resistance.", "locate_para": 1 },
            { "qid": 43, "title": "Formation flight is more comfortable because passengers can not see the other planes.", "locate_para": 3 },
            { "qid": 44, "title": "The role that weather plays in formation flight has not yet been clearly defined.", "locate_para": 4 },
            { "qid": 45, "title": "It has been documented that during World War II, America's armed forces once tried formation flight to save fuel.", "locate_para": 5 }
        ],
        "options": {
            "T": "True (正确)",
            "F": "False (错误)"
        },
        "answers": {
            "41": "F",
            "42": "T",
            "43": "F",
            "44": "T",
            "45": "F"
        },
        "distractors": [],
        "distractor_analysis": {}
    }

    # 3. Translation (Sustainability)
    translation = {
        "title": "2010 年考研英语（二）英译汉 Translation",
        "qid": 46,
        "points": 15,
        "directions": "Translate the following text into Chinese. Write your translation on the ANSWER SHEET. (15 points)",
        "source_text": "\"Sustainability\" has become a popular word these days, but to Ted Ning, the concept will always have personal meaning. Having endured a painful period of unsustainability in his own life made it clear to him that sustainability-oriented values must be expressed through everyday action and choice.\n\nNing recalls spending a confusing year in the late 1990s selling insurance. He'd been through the dot-com boom and burst and, desperate for a job, signed on with a Boulder agency.\n\nIt didn't go well. \"It was a really bad move because that's not my passion,\" says Ning, whose dilemma about the job translated, predictably, into a lack of sales. \"I was miserable. I had so much anxiety that I would wake up in the middle of the night and stare at the ceiling. I had no money and needed the job. Everyone said, 'Just wait, you'll turn the corner, give it some time.'\"",
        "reference_translation": "“可持续性”如今已成为一个流行词汇，但对特德·宁而言，这个概念永远有着特殊的个人意义。他本人在生活中经历过一段不可持续的艰难痛苦时期，这让他深刻明白，以可持续发展为导向的价值观必须通过每天的行动与选择体现出来。\n\n宁回忆起20世纪90年代末卖保险度过的那段迷茫岁月。在经历了互联网泡沫的兴盛与破灭后，迫切渴望一份工作的他签约了博尔德的一家代理机构。\n\n但进展并不顺利。“这真是一次糟糕的抉择，因为那并不是我的热情所在，”宁说道。他在工作上的进退维谷正如预料的那样转化为业绩惨淡。“我感到痛苦不堪。我焦虑到半夜醒来呆呆盯着天花板。我身无分文却急需这份工作。每个人都说：‘等等看吧，情况总会好转的，给它一点时间。’”",
        "paragraphs": [
            { "pid": 0, "text": "\"Sustainability\" has become a popular word these days, but to Ted Ning, the concept will always have personal meaning. Having endured a painful period of unsustainability in his own life made it clear to him that sustainability-oriented values must be expressed through everyday action and choice." },
            { "pid": 1, "text": "Ning recalls spending a confusing year in the late 1990s selling insurance. He'd been through the dot-com boom and burst and, desperate for a job, signed on with a Boulder agency." },
            { "pid": 2, "text": "It didn't go well. \"It was a really bad move because that's not my passion,\" says Ning, whose dilemma about the job translated, predictably, into a lack of sales. \"I was miserable. I had so much anxiety that I would wake up in the middle of the night and stare at the ceiling. I had no money and needed the job. Everyone said, 'Just wait, you'll turn the corner, give it some time.'\"" }
        ],
        "sentences": [
            {
                "sid": 1,
                "pid": 0,
                "en": "\"Sustainability\" has become a popular word these days, but to Ted Ning, the concept will always have personal meaning.",
                "cn": "“可持续性”如今已成为一个流行词汇，但对特德·宁而言，这个概念永远有着特殊的个人意义。",
                "scoring_points": [
                    { "phrase": "\"Sustainability\" has become a popular word these days", "score": 1.0, "guide": "现在完成时顺译为‘如今已成为一个流行词汇’" },
                    { "phrase": "to Ted Ning, the concept will always have personal meaning", "score": 1.0, "guide": "介词短语提前，personal meaning 译为‘特殊的个人意义’" }
                ],
                "grammar_breakdown": "but 连接两个并列分句，主句时态为现在完成时与一般将来时。"
            },
            {
                "sid": 2,
                "pid": 0,
                "en": "Having endured a painful period of unsustainability in his own life made it clear to him that sustainability-oriented values must be expressed through everyday action and choice.",
                "cn": "他本人在生活中经历过一段不可持续的艰难痛苦时期，这让他深刻明白，以可持续发展为导向的价值观必须通过每天的行动与选择体现出来。",
                "scoring_points": [
                    { "phrase": "Having endured a painful period of unsustainability in his own life", "score": 1.5, "guide": "现在分词完成时作主语，译为‘经历过一段…痛苦时期’" },
                    { "phrase": "made it clear to him that...", "score": 1.0, "guide": "make it clear 形式宾语结构，that 从句为真正宾语，译为‘让他深刻明白…’" },
                    { "phrase": "sustainability-oriented values must be expressed through everyday action and choice", "score": 1.5, "guide": "复合形容词 sustainability-oriented 译为‘以可持续发展为导向的’，被动语态转化为主动表达‘体现出来’" }
                ],
                "grammar_breakdown": "现在分词完成时短语作主语，谓语动词为 made，it 为形式宾语，that 引导真正宾语从句。"
            },
            {
                "sid": 3,
                "pid": 1,
                "en": "Ning recalls spending a confusing year in the late 1990s selling insurance.",
                "cn": "宁回忆起20世纪90年代末卖保险度过的那段迷茫岁月。",
                "scoring_points": [
                    { "phrase": "recalls spending a confusing year ... selling insurance", "score": 1.5, "guide": "recall doing sth 结构，confusing year 译为‘迷茫岁月/困惑的一年’" }
                ],
                "grammar_breakdown": "recall 后接动名词短语 spending 作宾语，selling insurance 为伴随状语。"
            },
            {
                "sid": 4,
                "pid": 1,
                "en": "He'd been through the dot-com boom and burst and, desperate for a job, signed on with a Boulder agency.",
                "cn": "在经历了互联网泡沫的兴盛与破灭后，迫切渴望一份工作的他签约了博尔德的一家代理机构。",
                "scoring_points": [
                    { "phrase": "He'd been through the dot-com boom and burst", "score": 1.0, "guide": "dot-com boom and burst 准确翻译为‘互联网泡沫的繁荣与破裂/兴盛与破灭’" },
                    { "phrase": "desperate for a job, signed on with a Boulder agency", "score": 1.0, "guide": "desperate for a job 形容词短语作状语表原因‘迫切渴望工作’，signed on with 签约加盟" }
                ],
                "grammar_breakdown": "过去完成时 had been through 与一般过去时 signed 并列，desperate for a job 为形容词短语作插入状语。"
            },
            {
                "sid": 5,
                "pid": 2,
                "en": "\"It was a really bad move because that's not my passion,\" says Ning, whose dilemma about the job translated, predictably, into a lack of sales.",
                "cn": "“这真是一次糟糕的抉择，因为那并不是我的热情所在，”宁说道。他在工作上的进退维谷正如预料的那样转化为业绩惨淡。",
                "scoring_points": [
                    { "phrase": "It was a really bad move because that's not my passion", "score": 1.0, "guide": "bad move 译为‘糟糕的举措/抉择’，passion 译为‘热情/热爱所在’" },
                    { "phrase": "whose dilemma about the job translated, predictably, into a lack of sales", "score": 1.5, "guide": "whose 引导非限制性定语从句，translate into 转化/导致，predictably 插入语‘不出所料/正如预料的那样’" }
                ],
                "grammar_breakdown": "whose 引导定语从句修饰 Ning，从句中 dilemma 为主语，translated 为谓语动词。"
            },
            {
                "sid": 6,
                "pid": 2,
                "en": "\"I was miserable. I had so much anxiety that I would wake up in the middle of the night and stare at the ceiling. I had no money and needed the job.",
                "cn": "“我感到痛苦不堪。我焦虑到半夜醒来呆呆盯着天花板。我身无分文却急需这份工作。",
                "scoring_points": [
                    { "phrase": "I had so much anxiety that...", "score": 1.0, "guide": "so... that... 结果状语从句‘如此焦虑以至于…’" },
                    { "phrase": "wake up in the middle of the night and stare at the ceiling", "score": 1.0, "guide": "stare at the ceiling 形象翻译为‘呆呆盯着天花板’" }
                ],
                "grammar_breakdown": "so much anxiety that 引导结果状语从句，描述极度焦虑的心理状态。"
            },
            {
                "sid": 7,
                "pid": 2,
                "en": "Everyone said, 'Just wait, you'll turn the corner, give it some time.'\"",
                "cn": "每个人都说：‘等等看吧，情况总会好转的，给它一点时间。’\"",
                "scoring_points": [
                    { "phrase": "turn the corner", "score": 1.0, "guide": "固定习语 turn the corner，意为‘走出困境/迎来转机/情况好转’" }
                ],
                "grammar_breakdown": "直接引语，turn the corner 为考研核心成语表达。"
            }
        ]
    }

    data['use_of_english'] = use_of_english
    data['part_b'] = part_b
    data['translation'] = translation

    with open(fp, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Successfully enriched 2010.json with Section I, Part B, and Section III!")

enrich_2010()
