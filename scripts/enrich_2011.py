import json, os

def enrich_2011():
    fp = 'data/2011.json'
    with open(fp, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 1. Use of English (Internet Anonymity & Digital Identity)
    use_of_english = {
        "title": "2011 年考研英语（二）完形填空 Use of English",
        "q_range": "1-20",
        "directions": "Read the following text. Choose the best word(s) for each numbered blank and mark A, B, C or D on the ANSWER SHEET. (10 points)",
        "paragraphs": [
            { "pid": 0, "text": "The Internet affords anonymity to its users, a blessing to privacy and freedom of speech. But that very anonymity is also behind the explosion of cyber-crime that has  __1__  across the Web." },
            { "pid": 1, "text": "Can privacy be preserved  __2__  bringing safety and security to a world that seems increasingly  __3__  ?" },
            { "pid": 2, "text": "Last month, Howard Schmidt, the nation's cyber-czar, offered the federal government a  __4__  to make the Web a safer place – a \"voluntary trusted identity\" system that would be the high-tech  __5__  of a physical key, a fingerprint and a photo ID card, all rolled  __6__  one. The system might use a smart identity card, or a digital credential  __7__  to a specific computer, and would authenticate users at a range of online services." },
            { "pid": 3, "text": "The idea is to  __8__  a federation of private online identity systems. Users could  __9__  which system to join, and only registered users whose identities have been authenticated could navigate those systems. The approach contrasts with one that would require an Internet driver's license  __10__  by the government." },
            { "pid": 4, "text": "Google and Microsoft are among companies that already have these \"single sign-on\" systems that make it possible for users to  __11__  just once but use many different services." },
            { "pid": 5, "text": "__12__  , the approach would create a \"walled garden\" in cyberspace, with safe \"neighborhoods\" and bright \"streetlights\" to establish a sense of a  __13__  community." },
            { "pid": 6, "text": "Mr. Schmidt described it as a \"voluntary ecosystem\" in which \"individuals and organizations can complete online transactions with  __14__  , trusting the identities of each other and the identities of the infrastructure  __15__  which the transaction runs.\"" },
            { "pid": 7, "text": "Still, the administration's plan has  __16__  privacy rights activists. Some applaud the approach; others are concerned. It seems clear that such a scheme is an initiative push toward what would  __17__  be a compulsory Internet \"driver's license\" mentality." },
            { "pid": 8, "text": "The plan has also been greeted with  __18__  by some computer security experts, who worry that the \"voluntary ecosystem\" envisioned by Mr. Schmidt would still leave much of the Internet  __19__  . They argue that all Internet users should be  __20__  to register and identify themselves, in the same way that drivers must be licensed to drive on public roads." }
        ],
        "questions": [
            { "qid": 1, "answer": "A", "options": { "A": "swept", "B": "skipped", "C": "walked", "D": "ridden" }, "category": "动词词义辨析", "analysis": "sweep across 为固定搭配，意为‘席卷/横扫’，网络犯罪迅速席卷整个互联网。", "context_clue": "explosion of cyber-crime" },
            { "qid": 2, "answer": "C", "options": { "A": "for", "B": "within", "C": "while", "D": "though" }, "category": "连词逻辑关系", "analysis": "while 引导时间状语或伴随对比，意为‘在带来安全与保障的同时，隐私能否得到保护？’", "context_clue": "preserved while bringing safety" },
            { "qid": 3, "answer": "B", "options": { "A": "careless", "B": "insecure", "C": "trivial", "D": "ambiguous" }, "category": "形容词词义辨析", "analysis": "与前文 safety and security 对应，网络世界看似日益‘不安全’（insecure）。", "context_clue": "safety and security ... increasingly insecure" },
            { "qid": 4, "answer": "D", "options": { "A": "routine", "B": "habit", "C": "trip", "D": "proposal" }, "category": "名词词义辨析", "analysis": "向联邦政府提出一项‘方案/建议’，使用 proposal。", "context_clue": "offered the federal government a proposal" },
            { "qid": 5, "answer": "A", "options": { "A": "equivalent", "B": "counterpart", "C": "substitute", "D": "replica" }, "category": "名词固定搭配", "analysis": "equivalent of 意为‘…的等同物/对等物’，高科技数字身份等同于实体钥匙、指纹和身份证的集合。", "context_clue": "high-tech equivalent of a physical key" },
            { "qid": 6, "answer": "C", "options": { "A": "off", "B": "out", "C": "into", "D": "over" }, "category": "固定习语搭配", "analysis": "roll into one 为固定成语，意为‘融为一体/集于一身’。", "context_clue": "all rolled into one" },
            { "qid": 7, "answer": "B", "options": { "A": "attributed", "B": "linked", "C": "dedicated", "D": "designed" }, "category": "动词介词搭配", "analysis": "be linked to 意为‘与…相连接/绑定’，与特定电脑绑定的数字凭证。", "context_clue": "credential linked to a specific computer" },
            { "qid": 8, "answer": "D", "options": { "A": "inherit", "B": "invent", "C": "capture", "D": "foster" }, "category": "动词词义辨析", "analysis": "foster 意为‘培养、促进、建立’，促进私营在线身份系统的联合。", "context_clue": "foster a federation" },
            { "qid": 9, "answer": "A", "options": { "A": "choose", "B": "decide", "C": "opt", "D": "resolve" }, "category": "动词搭配辨析", "analysis": "choose 接 which 引导的宾语从句，用户可选择加入哪一套系统；opt 需接 for。", "context_clue": "choose which system to join" },
            { "qid": 10, "answer": "B", "options": { "A": "released", "B": "issued", "C": "distributed", "D": "delivered" }, "category": "动词公文搭配", "analysis": "证件/执照由政府‘颁发/核发’，标准用词为 issued by the government。", "context_clue": "license issued by the government" },
            { "qid": 11, "answer": "C", "options": { "A": "carry on", "B": "linger on", "C": "log in", "D": "sign in" }, "category": "计算机专业动词", "analysis": "单点登录系统（single sign-on）允许用户仅‘登录’（log in）一次即可使用多个服务。", "context_clue": "single sign-on ... log in just once" },
            { "qid": 12, "answer": "A", "options": { "A": "In effect", "B": "In addition", "C": "In turn", "D": "In contrast" }, "category": "逻辑连接词", "analysis": "In effect 意为‘实际上’，对前文做法产生的实际生态效果进行总结阐述。", "context_clue": "create a walled garden in cyberspace" },
            { "qid": 13, "answer": "B", "options": { "A": "genuine", "B": "virtual", "C": "physical", "D": "actual" }, "category": "形容词词义辨析", "analysis": "在网络空间（cyberspace）建立起‘虚拟’社区的感觉，选 virtual。", "context_clue": "in cyberspace ... virtual community" },
            { "qid": 14, "answer": "C", "options": { "A": "delight", "B": "certainty", "C": "confidence", "D": "precision" }, "category": "介词短语搭配", "analysis": "with confidence 意为‘满怀信心地/放心地’完成在线交易。", "context_clue": "complete online transactions with confidence" },
            { "qid": 15, "answer": "D", "options": { "A": "under", "B": "upon", "C": "within", "D": "across" }, "category": "介词搭配", "analysis": "run across 意为‘跨越/基于…网络架构运行’。", "context_clue": "infrastructure across which the transaction runs" },
            { "qid": 16, "answer": "A", "options": { "A": "alarmed", "B": "astonished", "C": "puzzled", "D": "shocked" }, "category": "动词词义辨析", "analysis": "后文提到 others are concerned（另一些人感到担忧），故选 alarmed（使恐慌/引起警惕）。", "context_clue": "others are concerned" },
            { "qid": 17, "answer": "D", "options": { "A": "frequently", "B": "incidentally", "C": "occasionally", "D": "eventually" }, "category": "副词词义辨析", "analysis": "最终可能演变成强制性的网络驾照思维，eventually 意为‘最终/终将’。", "context_clue": "initiative push toward what would eventually be" },
            { "qid": 18, "answer": "A", "options": { "A": "skepticism", "B": "tolerance", "C": "indifference", "D": "enthusiasm" }, "category": "态度情感辨析", "analysis": "安全专家感到担忧，因此对该计划抱以‘怀疑态度’（greeted with skepticism）。", "context_clue": "who worry that ... leave much of the Internet" },
            { "qid": 19, "answer": "C", "options": { "A": "manageable", "B": "defendable", "C": "vulnerable", "D": "invisible" }, "category": "形容词词义辨析", "analysis": "自愿原则仍会导致互联网大部分处于‘脆弱易受攻击’的状态（vulnerable）。", "context_clue": "security experts worry ... vulnerable" },
            { "qid": 20, "answer": "D", "options": { "A": "invited", "B": "appointed", "C": "allowed", "D": "forced" }, "category": "动词语境辨析", "analysis": "后文类比公路驾驶执照是‘must be licensed’（强制性的），因此专家主张所有用户都应被‘强制’（forced）注册登记。", "context_clue": "drivers must be licensed" }
        ]
    }

    # 2. Section II Part B Multiple Matching (Andrew Lansley, Terence Stephenson, etc.)
    part_b = {
        "title": "2011 年考研英语（二）新题型 Part B",
        "subtype": "multiple_matching",
        "q_range": "41-45",
        "directions": "Read the following text and match each of the numbered items in the left column to its corresponding information in the right column. There are two extra choices in the right column. Mark your answers on the ANSWER SHEET. (10 points)",
        "paragraphs": [
            { "pid": 0, "text": "Leading doctors today weigh in on the debate over the government's role in promoting public health by demanding that ministers impose \"fat taxes\" on unhealthy food and introduce cigarette-style warnings to children about the dangers of a poor diet." },
            { "pid": 1, "text": "The demands follow comments made last week by the health secretary, Andrew Lansley, who insisted the government could not force people to make healthy choices and promised to free businesses from public health regulations." },
            { "pid": 2, "text": "But senior medical figures want to stop fast-food outlets opening near schools, restrict advertising of products high in fat, salt or sugar, and limit sponsorship of sports events by fast-food producers such as McDonald's." },
            { "pid": 3, "text": "They argue that government action is necessary to curb Britain's addiction to unhealthy food and help halt spiraling rates of obesity, diabetes and heart disease. Professor Terence Stephenson, president of the Royal College of Paediatrics and Child Health, said that the consumption of unhealthy food should be seen to be just as damaging as smoking or excessive drinking." },
            { "pid": 4, "text": "\"Thirty years ago, it would have been inconceivable to have imagined a ban on smoking in the workplace or in pubs, and yet that is what we have now. Are we willing to be just as courageous in respect of obesity? I would suggest that we should be,\" said the leader of the UK's children's doctors." },
            { "pid": 5, "text": "Lansley has alarmed health campaigners by suggesting he wants industry rather than government to take the lead. He said that manufacturers of crisps and candies could play a central role in the Change4Life campaign, the centrepiece of government efforts to boost healthy eating and fitness. He has also criticised the celebrity chef Jamie Oliver's high-profile attempt to improve school lunches in England as an example of how \"lecturing\" people was not the best way to change their behaviour." },
            { "pid": 6, "text": "Stephenson suggested potential restrictions could include banning TV advertisements for foods high in fat, salt or sugar before 9 p.m. and limiting them on billboards or in cinemas. \"If we were really bold, we might even begin to think of high-calorie fast food in the same way as cigarettes – by setting strict limits on advertising, product placement and sponsorship of sports events,\" he said." },
            { "pid": 7, "text": "Such a move could affect firms such as McDonald's, which sponsors the youth coaching scheme run by the Football Association. Fast-food chains should also stop offering \"inducements\" such as toys, cute animals and mobile phone credit to lure young customers, Stephenson said." },
            { "pid": 8, "text": "Professor Dinesh Bhugra, president of the Royal College of Psychiatrists, said: \"If children are taught about the impact that food has on their growth, and that some things can harm, at least information is available up front.\"" },
            { "pid": 9, "text": "He also urged councils to impose \"fast-food-free zones\" around schools and hospitals – areas within which takeaways cannot open." },
            { "pid": 10, "text": "A Department of Health spokesperson said: \"We need to create a new vision for public health where all of society works together to get healthy and live longer. This includes creating a new 'responsibility deal' with business, built on social responsibility, not state regulation. Later this year, we will publish a white paper setting out exactly how we will achieve this.\"" },
            { "pid": 11, "text": "The food industry will be alarmed that such senior doctors back such radical moves, especially the call to use some of the tough tactics that have been deployed against smoking over the last decade." }
        ],
        "items": [
            { "qid": 41, "title": "Andrew Lansley held that", "locate_para": 5 },
            { "qid": 42, "title": "Terence Stephenson agreed that", "locate_para": 6 },
            { "qid": 43, "title": "Jamie Oliver seemed to believe that", "locate_para": 5 },
            { "qid": 44, "title": "Dinesh Bhugra suggested that", "locate_para": 9 },
            { "qid": 45, "title": "A Department of Health spokesperson proposed that", "locate_para": 10 }
        ],
        "options": {
            "A": "\"fat taxes\" should be imposed on fast-food producers such as McDonald's.",
            "B": "the government should ban fast-food outlets in the neighborhood of schools.",
            "C": "\"lecturing\" was an effective way to improve school lunches in England.",
            "D": "cigarette-style warnings should be introduced to children about the dangers of a poor diet.",
            "E": "the producers of crisps and candies could contribute significantly to the Change4Life campaign.",
            "F": "parents should set good examples for their children by keeping a healthy diet at home.",
            "G": "the government should strengthen the sense of responsibility among businesses."
        },
        "answers": {
            "41": "E",
            "42": "D",
            "43": "C",
            "44": "B",
            "45": "G"
        },
        "distractors": ["A", "F"],
        "distractor_analysis": {
            "A": "【干扰项剖析】原文中虽然提到高级医生呼吁征收 fat taxes，且提到限制麦当劳赞助体育赛事，但并未提出‘专门对麦当劳等快餐生产商征收肥胖税’，属于偷换概念与张冠李戴。",
            "F": "【干扰项剖析】全文探讨的是政府立法管制、企业社会责任与学校周边禁售快餐，完全没有提及‘父母在家庭饮食中为孩子树立榜样’，属于无中生有。"
        }
    }

    # 3. Section III Translation (IT Industry & Greenhouse Gases)
    translation = {
        "title": "2011 年考研英语（二）英译汉 Translation",
        "qid": 46,
        "points": 15,
        "directions": "Translate the following text into Chinese. Write your translation on the ANSWER SHEET. (15 points)",
        "source_text": "Who would have thought that, globally, the IT industry produces about the same volume of greenhouse gases as the world's airlines do - roughly 2 percent of all human emissions?\n\nMany everyday tasks take a surprising toll on the environment. A Google search can leak between 0.2 and 7.0 grams of CO2, depending on how many attempts are needed to get the \"right\" answer. To deliver results to its users quickly, then, Google has to maintain huge data centres around the world, packed with thousands of computers. It also needs to run air conditioning to keep them from overheating, which consumes a large amount of electricity.\n\nHowever, Google and other big tech providers monitor their efficiency closely and make improvements. Monitoring is the first step on the road to reduction, but there is much more to be done, and not just by tech companies.",
        "reference_translation": "谁曾想到，在全球范围内，IT行业产生的温室气体排放量竟然与全球航空业相当——大约占人类排放总量的2%？\n\n许多日常活动对环境造成了令人惊讶的破坏。一次谷歌搜索会释放出0.2至7.0克二氧化碳，具体取决于获取“正确”答案所需的搜索次数。因此，为了向用户快速返回结果，谷歌必须在全球范围内运营庞大的数据中心，里面挤满了成千上万台计算机。它还需要开动空调防止计算机过热，这会消耗大量的电力。\n\n然而，谷歌和其他大型科技供应商密切监控其能效并积极加以改进。监控是走向减排道路上的第一步，但仍有大量工作需要去完成，而且不仅局限于科技公司。",
        "paragraphs": [
            { "pid": 0, "text": "Who would have thought that, globally, the IT industry produces about the same volume of greenhouse gases as the world's airlines do - roughly 2 percent of all human emissions?" },
            { "pid": 1, "text": "Many everyday tasks take a surprising toll on the environment. A Google search can leak between 0.2 and 7.0 grams of CO2, depending on how many attempts are needed to get the \"right\" answer. To deliver results to its users quickly, then, Google has to maintain huge data centres around the world, packed with thousands of computers. It also needs to run air conditioning to keep them from overheating, which consumes a large amount of electricity." },
            { "pid": 2, "text": "However, Google and other big tech providers monitor their efficiency closely and make improvements. Monitoring is the first step on the road to reduction, but there is much more to be done, and not just by tech companies." }
        ],
        "sentences": [
            {
                "sid": 1,
                "pid": 0,
                "en": "Who would have thought that, globally, the IT industry produces about the same volume of greenhouse gases as the world's airlines do - roughly 2 percent of all human emissions?",
                "cn": "谁曾想到，在全球范围内，IT行业产生的温室气体排放量竟然与全球航空业相当——大约占人类排放总量的2%？",
                "scoring_points": [
                    { "phrase": "Who would have thought that...", "score": 1.0, "guide": "反问句型准确译为‘谁会想到/谁曾料想…’" },
                    { "phrase": "about the same volume of greenhouse gases as the world's airlines do", "score": 1.5, "guide": "the same... as 比较结构，译为‘与全球航空业相当的温室气体排放量’" },
                    { "phrase": "roughly 2 percent of all human emissions", "score": 0.5, "guide": "roughly 译为‘大约/约’，破折号后补充说明" }
                ],
                "grammar_breakdown": "特殊疑问句作主句，that 引导宾语从句，从句内部包含 the same... as 比较结构与破折号同位解释语。"
            },
            {
                "sid": 2,
                "pid": 1,
                "en": "Many everyday tasks take a surprising toll on the environment.",
                "cn": "许多日常活动对环境造成了令人惊讶的破坏。",
                "scoring_points": [
                    { "phrase": "take a surprising toll on the environment", "score": 1.5, "guide": "take a toll on 为考研核心短语，译为‘对…造成损失/破坏/产生不利影响’" }
                ],
                "grammar_breakdown": "简单句，主干为 Many everyday tasks take a toll on the environment。"
            },
            {
                "sid": 3,
                "pid": 1,
                "en": "A Google search can leak between 0.2 and 7.0 grams of CO2, depending on how many attempts are needed to get the \"right\" answer.",
                "cn": "一次谷歌搜索会释放出0.2至7.0克二氧化碳，具体取决于获取“正确”答案所需的搜索次数。",
                "scoring_points": [
                    { "phrase": "leak between 0.2 and 7.0 grams of CO2", "score": 1.0, "guide": "leak 引申翻译为‘释放/排放’" },
                    { "phrase": "depending on how many attempts are needed...", "score": 1.5, "guide": "depending on 作状语，译为‘取决于…’，how many attempts 译为‘搜索尝试的次数’" }
                ],
                "grammar_breakdown": "主句 + depending on 引导的现在分词短语作状语，内含 how many attempts are needed 宾语从句。"
            },
            {
                "sid": 4,
                "pid": 1,
                "en": "To deliver results to its users quickly, then, Google has to maintain huge data centres around the world, packed with thousands of computers.",
                "cn": "因此，为了向用户快速返回结果，谷歌必须在全球范围内运营庞大的数据中心，里面挤满了成千上万台计算机。",
                "scoring_points": [
                    { "phrase": "To deliver results to its users quickly", "score": 1.0, "guide": "不定式作目的状语，译为‘为了向其用户迅速提供结果/返回结果’" },
                    { "phrase": "maintain huge data centres", "score": 1.0, "guide": "maintain 结合语境翻译为‘维持/运营/维护’" },
                    { "phrase": "packed with thousands of computers", "score": 1.0, "guide": "过去分词短语作后置定语，修饰 data centres，译为‘容纳/塞满了成千上万台计算机’" }
                ],
                "grammar_breakdown": "不定式短语放句首作目的状语，then 为插入语，packed with... 过去分词短语作后置定语。"
            },
            {
                "sid": 5,
                "pid": 1,
                "en": "It also needs to run air conditioning to keep them from overheating, which consumes a large amount of electricity.",
                "cn": "它还需要开动空调防止计算机过热，这会消耗大量的电力。",
                "scoring_points": [
                    { "phrase": "keep them from overheating", "score": 1.0, "guide": "keep ... from doing 阻止/防止…过热" },
                    { "phrase": "which consumes a large amount of electricity", "score": 1.0, "guide": "which 引导非限制性定语从句，指代整个开空调的过程，顺译为‘这消耗了大量电力’" }
                ],
                "grammar_breakdown": "which 引导非限制性定语从句，修饰前半句整个事件。"
            },
            {
                "sid": 6,
                "pid": 2,
                "en": "However, Google and other big tech providers monitor their efficiency closely and make improvements.",
                "cn": "然而，谷歌和其他大型科技供应商密切监控其能效并积极加以改进。",
                "scoring_points": [
                    { "phrase": "monitor their efficiency closely", "score": 1.0, "guide": "密切监控其效率/能源利用率" }
                ],
                "grammar_breakdown": "However 转折副词，并列谓语 monitor 与 make improvements。"
            },
            {
                "sid": 7,
                "pid": 2,
                "en": "Monitoring is the first step on the road to reduction, but there is much more to be done, and not just by tech companies.",
                "cn": "监控是走向减排道路上的第一步，但仍有大量工作需要去完成，而且不仅局限于科技公司。",
                "scoring_points": [
                    { "phrase": "on the road to reduction", "score": 1.0, "guide": "隐喻顺译为‘走向减排的道路上’" },
                    { "phrase": "there is much more to be done, and not just by tech companies", "score": 1.5, "guide": "there be 句型与被动不定式，not just by 译为‘不仅限于科技公司’" }
                ],
                "grammar_breakdown": "but 连接两个并列主句，后半句包含 there be 句型与省略的并列介词短语。"
            }
        ]
    }

    data['use_of_english'] = use_of_english
    data['part_b'] = part_b
    data['translation'] = translation

    with open(fp, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Successfully enriched 2011.json with Section I, Part B, and Section III!")

enrich_2011()
