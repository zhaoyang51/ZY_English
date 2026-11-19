# -*- coding: utf-8 -*-
"""
Part 1: Rich Translation Data for 2017, 2018, 2019, 2020, 2021
"""

TRANSLATION_DATA_PART1 = {
    2017: {
        "title": "2017 年考研英语（二）英译汉 Translation",
        "qid": 46,
        "points": 15,
        "directions": "Translate the following text into Chinese. Write your translation on the ANSWER SHEET. (15 points)",
        "source_text": "My dream has always been to work somewhere in an area between fashion and publishing. Two years before graduating from secondary school, I took a sewing and design course thinking that I would move on to a fashion design course. However, during that course I realized I was not good enough in this area to compete with other creative personalities in the future, so I decided that it was not the right path for me. Before applying for university I told everyone that I would study journalism, because writing was, and still is, one of my favourite activities. But, to be honest, I said it, because I thought that fashion and I together were just a dream – I knew that no one could imagine me in the fashion industry at all! So I decided to look for some fashion-related courses that included writing. This is when I noticed the course \"Fashion Media & Promotion.\"",
        "full_literal_translation": "我的梦想一直是在介于时尚和出版之间的某个领域的某处工作。在从中学毕业前两年，我选修了一门缝纫与设计课，心想我会继续学习服装设计课程。然而，在那门课期间，我意识到自己在这方面不够好，未来无法与其他有创造力的人士竞争，所以我决定那对我来说不是正确的道路。在申请大学前，我告诉所有人我会学习新闻学，因为写作过去是，现在依然是，我最喜欢的活动之一。但是，说实话，我那么说是因为我认为时尚和我在一起只是一个梦——我知道根本没有人能想象我在时尚行业的样子！因此我决定寻找一些包含写作的与时尚相关的课程。就在那时，我注意到了“时尚媒体与推广”这门课程。",
        "full_refined_translation": "我一直梦想在时尚与出版的交叉领域工作。中学毕业前两年，我选修了缝纫与设计课，本打算日后攻读服装设计专业。然而在学习过程中，我意识到自己在这方面实力不足，未来难以与其他创意人才竞争，于是决定放弃这条路。申请大学前，我告诉所有人自己要学新闻学，因为写作过去是、现在也依然是我最喜欢的活动之一。但说实话，我这么说是因为觉得自己踏入时尚圈只是个遥不可及的梦——我清楚根本没人能想象我从事时尚行业的样子！因此，我决定寻找一些包含写作内容的时尚相关课程。就在那时，我注意到了“时尚媒体与推广”这门专业。",
        "reference_translation": "我一直梦想在时尚与出版的交叉领域工作。中学毕业前两年，我选修了缝纫与设计课，本打算日后攻读服装设计专业。然而在学习过程中，我意识到自己在这方面实力不足，未来难以与其他创意人才竞争，于是决定放弃这条路。申请大学前，我告诉所有人自己要学新闻学，因为写作过去是、现在也依然是我最喜欢的活动之一。但说实话，我这么说是因为觉得自己踏入时尚圈只是个遥不可及的梦——我清楚根本没人能想象我从事时尚行业的样子！因此，我决定寻找一些包含写作内容的时尚相关课程。就在那时，我注意到了“时尚媒体与推广”这门专业。",
        "paragraphs": [
            {
                "pid": 0,
                "text": "My dream has always been to work somewhere in an area between fashion and publishing. Two years before graduating from secondary school, I took a sewing and design course thinking that I would move on to a fashion design course. However, during that course I realized I was not good enough in this area to compete with other creative personalities in the future, so I decided that it was not the right path for me. Before applying for university I told everyone that I would study journalism, because writing was, and still is, one of my favourite activities. But, to be honest, I said it, because I thought that fashion and I together were just a dream – I knew that no one could imagine me in the fashion industry at all! So I decided to look for some fashion-related courses that included writing. This is when I noticed the course \"Fashion Media & Promotion.\""
            }
        ],
        "sentences": [
            {
                "sid": 1,
                "pid": 0,
                "en": "My dream has always been to work somewhere in an area between fashion and publishing.",
                "slashed_text": "My dream / has always been / to work somewhere / in an area between fashion and publishing.",
                "literal_cn": "我的梦想一直是在介于时尚和出版之间的某个领域的某处工作。",
                "refined_cn": "我一直梦想在时尚与出版的交叉领域工作。",
                "cn": "我一直梦想在时尚与出版的交叉领域工作。",
                "syntax_points": [
                    {"label": "句子主干", "text": "My dream 为主语，has always been 为系动词，to work... 为不定式表语。"},
                    {"label": "修饰成分", "text": "somewhere 作地点状语，介词短语 in an area... 限定其具体范围。"},
                    {"label": "时态特征", "text": "现在完成时（has always been）表示梦想从过去持续至今。"}
                ],
                "vocab_points": [
                    {"term": "somewhere in an area between A and B", "note": "指“A 与 B 之间的交叉领域”。somewhere 无需硬译为“某地”。"},
                    {"term": "publishing", "note": "出版业，涵盖杂志、书籍及数字媒体出版。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "My dream has always been",
                        "score": 0.5,
                        "guide": "现在完成时（has always been）表示梦想从过去持续至今，译为“我一直梦想……”。",
                        "vocab": [{"word": "dream", "pos": "n.", "common": "梦想；梦境", "context": "一直以来的职业理想"}]
                    },
                    {
                        "phrase": "to work somewhere in an area between fashion and publishing",
                        "score": 1.5,
                        "guide": "somewhere in an area between A and B 指“A 与 B 之间的交叉领域”，somewhere 无需硬译为“某地”。",
                        "vocab": [
                            {"word": "fashion", "pos": "n.", "common": "时尚；时装", "context": "时尚行业"},
                            {"word": "publishing", "pos": "n.", "common": "出版；出版业", "context": "涵盖杂志、书籍及数字媒体出版"}
                        ]
                    }
                ],
                "grammar_breakdown": "句子主干：My dream 为主语，has always been 为系动词，to work... 为不定式表语。修饰成分：somewhere 作地点状语，介词短语 in an area... 限定其具体范围。时态特征：现在完成时（has always been）表示梦想从过去持续至今。",
                "reassembly_notes": "somewhere in an area between A and B 意译为“A 与 B 的交叉领域”，somewhere 弱化不翻，行文简洁地道。"
            },
            {
                "sid": 2,
                "pid": 0,
                "en": "Two years before graduating from secondary school, I took a sewing and design course thinking that I would move on to a fashion design course.",
                "slashed_text": "Two years before graduating from secondary school, / I took a sewing and design course / thinking / that I would move on to a fashion design course.",
                "literal_cn": "在从中学毕业前两年，我选修了一门缝纫与设计课，心想我会继续学习服装设计课程。",
                "refined_cn": "中学毕业前两年，我选修了缝纫与设计课，本打算日后攻读服装设计专业。",
                "cn": "中学毕业前两年，我选修了缝纫与设计课，本打算日后攻读服装设计专业。",
                "syntax_points": [
                    {"label": "句子主干", "text": "I 为主语，took 为谓语，a sewing and design course 为宾语。"},
                    {"label": "修饰成分", "text": "Two years before... 作时间状语；现在分词 thinking... 作伴随状语，后接宾语从句。"},
                    {"label": "时态特征", "text": "过去将来时（would move on to）表示站在过去时间点对未来的打算。"}
                ],
                "vocab_points": [
                    {"term": "secondary school", "note": "中学（英联邦学制中通常涵盖初中至高中阶段）。"},
                    {"term": "take a course", "note": "选修或参加某门课程。"},
                    {"term": "move on to", "note": "继续学习更高阶的课程，此处意译为“日后攻读”。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "Two years before graduating from secondary school",
                        "score": 0.5,
                        "guide": "secondary school 译为“中学”；before graduating 译为“毕业前”。",
                        "vocab": [{"word": "secondary school", "pos": "n.", "common": "中等学校；中学", "context": "英联邦学制中通常涵盖初中至高中阶段"}]
                    },
                    {
                        "phrase": "I took a sewing and design course",
                        "score": 0.5,
                        "guide": "take a course 选修或参加某门课程；sewing and design 译为“缝纫与设计”。",
                        "vocab": [{"word": "sewing", "pos": "n.", "common": "缝纫；针线活", "context": "服装缝纫与裁剪"}]
                    },
                    {
                        "phrase": "thinking that I would move on to a fashion design course",
                        "score": 1.0,
                        "guide": "thinking 分词作伴随状语；move on to 指继续学习更高阶课程，意译为“本打算日后攻读”。",
                        "vocab": [{"word": "move on to", "pos": "phr.", "common": "进而转向；继续学习", "context": "继续攻读更高阶的专业课程"}]
                    }
                ],
                "grammar_breakdown": "句子主干：I 为主语，took 为谓语，a sewing and design course 为宾语。修饰成分：Two years before... 作时间状语；现在分词 thinking... 作伴随状语，后接宾语从句。时态特征：过去将来时（would move on to）表示站在过去时间点对未来的打算。",
                "reassembly_notes": "thinking that I would move on to... 顺译为“本打算日后攻读……”，准确体现过去对未来的规划。"
            },
            {
                "sid": 3,
                "pid": 0,
                "en": "However, during that course I realized I was not good enough in this area to compete with other creative personalities in the future, so I decided that it was not the right path for me.",
                "slashed_text": "However, / during that course / I realized / [that] I was not good enough in this area / to compete with other creative personalities in the future, / so I decided / that it was not the right path for me.",
                "literal_cn": "然而，在那门课期间，我意识到自己在这方面不够好，未来无法与其他有创造力的人士竞争，所以我决定那对我来说不是正确的道路。",
                "refined_cn": "然而在学习过程中，我意识到自己在这方面实力不足，未来难以与其他创意人才竞争，于是决定放弃这条路。",
                "cn": "然而在学习过程中，我意识到自己在这方面实力不足，未来难以与其他创意人才竞争，于是决定放弃这条路。",
                "syntax_points": [
                    {"label": "句子主干", "text": "so 连接的并列复合句。前句主干为 I realized [that]...，后句主干为 I decided that...。"},
                    {"label": "修饰成分", "text": "during that course 作时间状语；realized 后的宾语从句包含结果状语结构。"},
                    {"label": "特殊句式", "text": "not + 形容词 + enough + to do sth.（不够优秀以至于无法做某事）。"}
                ],
                "vocab_points": [
                    {"term": "creative personalities", "note": "创意人才。personality 在此为可数名词，指“有某种特质的人”，切勿直译为“创意性格”。"},
                    {"term": "the right path", "note": "合适的道路或发展方向。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "However, during that course I realized",
                        "score": 0.5,
                        "guide": "during that course 作时间状语，译为“在学习过程中”。",
                        "vocab": [{"word": "realize", "pos": "v.", "common": "意识到；实现", "context": "清醒地认识到自身局限"}]
                    },
                    {
                        "phrase": "I was not good enough in this area to compete with other creative personalities in the future",
                        "score": 1.0,
                        "guide": "not + adj. + enough + to do（不够……以至于无法……）；creative personalities 熟词生义指“创意人才”。",
                        "vocab": [
                            {"word": "compete", "pos": "v.", "common": "竞争；对抗", "context": "与同行竞争"},
                            {"word": "personality", "pos": "n.", "common": "性格；人物/人才（熟词生义）", "context": "有某种鲜明特质的人才"}
                        ]
                    },
                    {
                        "phrase": "so I decided that it was not the right path for me",
                        "score": 0.5,
                        "guide": "the right path 指“合适的道路或发展方向”，意译为“决定放弃这条路”。",
                        "vocab": [{"word": "path", "pos": "n.", "common": "小路；道路", "context": "职业发展道路"}]
                    }
                ],
                "grammar_breakdown": "句子主干：so 连接的并列复合句。前句主干为 I realized [that]...，后句主干为 I decided that...。修饰成分：during that course 作时间状语；realized 后的宾语从句包含结果状语结构。特殊句式：not + 形容词 + enough + to do sth.（不够优秀以至于无法做某事）。",
                "reassembly_notes": "creative personalities 切勿直译为“创意性格”，应译为“创意人才”；not the right path for me 可灵活用正话反说译为“决定放弃这条路”。"
            },
            {
                "sid": 4,
                "pid": 0,
                "en": "Before applying for university I told everyone that I would study journalism, because writing was, and still is, one of my favourite activities.",
                "slashed_text": "Before applying for university / I told everyone / that I would study journalism, / because writing was, / and still is, / one of my favourite activities.",
                "literal_cn": "在申请大学前，我告诉所有人我会学习新闻学，因为写作过去是，现在依然是，我最喜欢的活动之一。",
                "refined_cn": "申请大学前，我告诉所有人自己要学新闻学，因为写作过去是、现在也依然是我最喜欢的活动之一。",
                "cn": "申请大学前，我告诉所有人自己要学新闻学，因为写作过去是、现在也依然是我最喜欢的活动之一。",
                "syntax_points": [
                    {"label": "句子主干", "text": "I 为主语，told 为谓语，everyone 为间接宾语，that 从句为直接宾语。"},
                    {"label": "修饰成分", "text": "Before applying for university 作时间状语；because 引导原因状语从句。"},
                    {"label": "特殊句式", "text": "was, and still is 为插入式时态并列，通过过去与现在对比强调热爱从未改变。"}
                ],
                "vocab_points": [
                    {"term": "apply for university", "note": "申请大学。"},
                    {"term": "journalism", "note": "新闻学，新闻专业。"},
                    {"term": "was, and still is", "note": "过去是、现在也依然是。翻译时需保留双重时间维度。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "Before applying for university I told everyone that I would study journalism",
                        "score": 1.0,
                        "guide": "apply for university 译为“申请大学”；journalism 译为“新闻学”。",
                        "vocab": [
                            {"word": "apply for", "pos": "phr.", "common": "申请", "context": "申请大学入学"},
                            {"word": "journalism", "pos": "n.", "common": "新闻学；新闻业", "context": "大学新闻学专业"}
                        ]
                    },
                    {
                        "phrase": "because writing was, and still is, one of my favourite activities",
                        "score": 1.0,
                        "guide": "was, and still is 插入式时态并列，译为“过去是、现在也依然是”，保留双重时间维度。",
                        "vocab": [{"word": "favourite", "pos": "adj.", "common": "最喜爱的", "context": "最热爱的活动之一"}]
                    }
                ],
                "grammar_breakdown": "句子主干：I 为主语，told 为谓语，everyone 为间接宾语，that 从句为直接宾语。修饰成分：Before applying for university 作时间状语；because 引导原因状语从句。特殊句式：was, and still is 为插入式时态并列，通过过去与现在对比强调热爱从未改变。",
                "reassembly_notes": "was, and still is 翻译时必须保留过去与现在的双重时间对比，译为“过去是、现在也依然是”。"
            },
            {
                "sid": 5,
                "pid": 0,
                "en": "But, to be honest, I said it, because I thought that fashion and I together were just a dream – I knew that no one could imagine me in the fashion industry at all!",
                "slashed_text": "But, / to be honest, / I said it, / because I thought / that fashion and I together were just a dream / – I knew / that no one could imagine me in the fashion industry at all!",
                "literal_cn": "但是，说实话，我那么说是因为我认为时尚和我在一起只是一个梦——我知道根本没有人能想象我在时尚行业的样子！",
                "refined_cn": "但说实话，我这么说是因为觉得自己踏入时尚圈只是个遥不可及的梦——我清楚根本没人能想象我从事时尚行业的样子！",
                "cn": "但说实话，我这么说是因为觉得自己踏入时尚圈只是个遥不可及的梦——我清楚根本没人能想象我从事时尚行业的样子！",
                "syntax_points": [
                    {"label": "句子主干", "text": "I 为主语，said 为谓语，it 为宾语。破折号后为补充说明分句 I knew that...。"},
                    {"label": "修饰成分", "text": "to be honest 作插入语；because 引导原因状语从句，内嵌 that 宾语从句。"},
                    {"label": "特殊句式", "text": "破折号（–）用于引出对前文心理活动的进一步解释与情绪强化。"}
                ],
                "vocab_points": [
                    {"term": "to be honest", "note": "老实说，说实话。"},
                    {"term": "fashion and I together were just a dream", "note": "直译较生硬，汉译需具象化为“自己踏入时尚圈只是个遥不可及的梦”。"},
                    {"term": "not... at all", "note": "根本不，完全不。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "But, to be honest, I said it",
                        "score": 0.5,
                        "guide": "to be honest 插入语译为“说实话/老实说”；said it 译为“这么说”。",
                        "vocab": [{"word": "to be honest", "pos": "phr.", "common": "老实说；说实话", "context": "引出内心真实想法"}]
                    },
                    {
                        "phrase": "because I thought that fashion and I together were just a dream",
                        "score": 0.5,
                        "guide": "fashion and I together were just a dream 具象化译为“自己踏入时尚圈只是个遥不可及的梦”。",
                        "vocab": [{"word": "dream", "pos": "n.", "common": "梦；梦想", "context": "遥不可及的幻想"}]
                    },
                    {
                        "phrase": "– I knew that no one could imagine me in the fashion industry at all!",
                        "score": 1.0,
                        "guide": "not... at all 表强烈否定“根本不”；imagine me in the fashion industry 译为“想象我从事时尚行业的样子”。",
                        "vocab": [
                            {"word": "imagine", "pos": "v.", "common": "想象；设想", "context": "脑海中设想某人从事某行业的画面"},
                            {"word": "industry", "pos": "n.", "common": "工业；行业", "context": "the fashion industry 时尚行业"}
                        ]
                    }
                ],
                "grammar_breakdown": "句子主干：I 为主语，said 为谓语，it 为宾语。破折号后为补充说明分句 I knew that...。修饰成分：to be honest 作插入语；because 引导原因状语从句，内嵌 that 宾语从句。特殊句式：破折号（–）用于引出对前文心理活动的进一步解释与情绪强化。",
                "reassembly_notes": "fashion and I together 直译“时尚和我在一起”较生硬，汉译具象化为“自己踏入时尚圈”。"
            },
            {
                "sid": 6,
                "pid": 0,
                "en": "So I decided to look for some fashion-related courses that included writing.",
                "slashed_text": "So / I decided to look for / some fashion-related courses / that included writing.",
                "literal_cn": "因此我决定寻找一些包含写作的与时尚相关的课程。",
                "refined_cn": "因此，我决定寻找一些包含写作内容的时尚相关课程。",
                "cn": "因此，我决定寻找一些包含写作内容的时尚相关课程。",
                "syntax_points": [
                    {"label": "句子主干", "text": "I 为主语，decided to look for 为谓语，some fashion-related courses 为宾语。"},
                    {"label": "修饰成分", "text": "that included writing 为定语从句，修饰先行词 courses。"},
                    {"label": "语法要点", "text": "复合形容词 fashion-related（时尚相关的）作前置定语。"}
                ],
                "vocab_points": [
                    {"term": "fashion-related", "note": "与时尚相关的（名词 + -related 构成复合形容词）。"},
                    {"term": "include", "note": "包含，涵盖（课程设置中涉及某项内容）。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "So I decided to look for some fashion-related courses",
                        "score": 1.0,
                        "guide": "look for 译为“寻找”；fashion-related 复合形容词译为“时尚相关的”。",
                        "vocab": [{"word": "fashion-related", "pos": "adj.", "common": "与时尚相关的", "context": "名词 + -related 构成复合形容词"}]
                    },
                    {
                        "phrase": "that included writing",
                        "score": 1.0,
                        "guide": "定语从句前置修饰 courses，译为“包含写作内容的”。",
                        "vocab": [{"word": "include", "pos": "v.", "common": "包含；包括", "context": "课程设置中涵盖某项内容"}]
                    }
                ],
                "grammar_breakdown": "句子主干：I 为主语，decided to look for 为谓语，some fashion-related courses 为宾语。修饰成分：that included writing 为定语从句，修饰先行词 courses。语法要点：复合形容词 fashion-related（时尚相关的）作前置定语。",
                "reassembly_notes": "短定语从句 that included writing 前置译为“包含写作内容的”，与“时尚相关课程”组合自然。"
            },
            {
                "sid": 7,
                "pid": 0,
                "en": "This is when I noticed the course \"Fashion Media & Promotion.\"",
                "slashed_text": "This is / when I noticed / the course \"Fashion Media & Promotion.\"",
                "literal_cn": "这就是我注意到“时尚媒体与推广”这门课程的时候。",
                "refined_cn": "就在那时，我注意到了“时尚媒体与推广”这门专业。",
                "cn": "就在那时，我注意到了“时尚媒体与推广”这门专业。",
                "syntax_points": [
                    {"label": "句子主干", "text": "This 为主语，is 为系动词，when I noticed... 为表语从句。"},
                    {"label": "修饰成分", "text": "\"Fashion Media & Promotion\" 为 the course 的同位语，点明具体专业名称。"},
                    {"label": "特殊句式", "text": "This is when...（就在那时……），用于引出关键转折节点。"}
                ],
                "vocab_points": [
                    {"term": "notice", "note": "注意到，留意到。"},
                    {"term": "Fashion Media & Promotion", "note": "时尚媒体与推广（英美高校常见专业，Promotion 在此指品牌推广与市场传播）。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "This is when I noticed the course",
                        "score": 1.0,
                        "guide": "This is when... 译为“就在那时……”；the course 此处指大学专业课程。",
                        "vocab": [{"word": "notice", "pos": "v.", "common": "注意到；留意到", "context": "在检索课程时发现"}]
                    },
                    {
                        "phrase": "\"Fashion Media & Promotion.\"",
                        "score": 1.0,
                        "guide": "同位语点明专业名称，译为“时尚媒体与推广”，Promotion 指品牌推广与市场传播。",
                        "vocab": [{"word": "promotion", "pos": "n.", "common": "推广；促销；晋升", "context": "品牌推广与市场传播"}]
                    }
                ],
                "grammar_breakdown": "句子主干：This 为主语，is 为系动词，when I noticed... 为表语从句。修饰成分：\"Fashion Media & Promotion\" 为 the course 的同位语，点明具体专业名称。特殊句式：This is when...（就在那时……），用于引出关键转折节点。",
                "reassembly_notes": "This is when... 顺译为“就在那时……”，引出全文收束的关键转折点。"
            }
        ]
    },
    2018: {
        "title": "2018 年考研英语（二）英译汉 Translation",
        "qid": 46,
        "points": 15,
        "directions": "Translate the following text into Chinese. Write your translation on the ANSWER SHEET. (15 points)",
        "source_text": "A fifth grader gets a homework assignment to select his future career path from a list of occupations. He ticks \"astronaut\" but quickly adds \"scientist\" to the list and selects it as well. The boy is convinced that if he reads enough, he can explore as many career paths as he likes. And so he reads – everything from encyclopedias to science fiction novels. He reads so passionately that his parents have to institute a \"no reading policy\" at the dinner table.\n\nThat boy was Bill Gates, and he hasn't stopped reading yet – not even after becoming one of the most successful people on the planet. Nowadays, his reading material has changed from science fiction and reference books: recently, he revealed that he reads at least 50 nonfiction books a year. Gates chooses nonfiction titles because they explain how the world works. \"Each book opens up new avenues of knowledge to explore\", Gates says.",
        "full_literal_translation": "一名五年级学生收到一份家庭作业，要求从一份职业清单中选择他未来的职业道路。他在“宇航员”上打了勾，但很快把“科学家”添加到清单上，并且也选择了它。这个男孩深信，如果他读得足够多，他就能探索他喜欢的尽可能多的职业道路。于是他就读——从百科全书到科幻小说的一切书籍。他读得如此充满激情，以至于他的父母不得不在餐桌上制定一项“禁止阅读政策”。\n\n那个男孩就是比尔·盖茨，而且他至今还没有停止阅读——甚至在成为地球上最成功的人之一后也没有。如今，他的阅读材料已经从科幻小说和参考书发生了变化：最近，他透露他每年至少读50本非虚构类书籍。盖茨选择非虚构类书籍，因为它们解释了世界是如何运转的。“每一本书都开辟了有待探索的新知识途径”，盖茨说。",
        "full_refined_translation": "一名五年级学生领到一项家庭作业，需要从职业清单里挑出自己未来的职业方向。他先勾选了“宇航员”，但很快又在清单上补写“科学家”并一并勾选。这男孩坚信，只要书读得够多，想探索多少种职业道路都不在话下。于是他埋头苦读，从百科全书到科幻小说，无所不涉。他读书如此痴迷，父母不得不立下规矩，禁止他在餐桌上阅读。\n\n那个男孩正是比尔·盖茨。即便如今已成为全球最成功的人士之一，他依然手不释卷。如今，他的阅读书单早已不再局限于科幻小说和工具书。他近期透露，自己每年至少阅读 50 本非虚构类书籍。盖茨偏爱非虚构类读物，因为这类书能揭示世界的运行规律。盖茨表示：“每一本书都为我开辟了探索新知的全新路径。”",
        "reference_translation": "一名五年级学生领到一项家庭作业，需要从职业清单里挑出自己未来的职业方向。他先勾选了“宇航员”，但很快又在清单上补写“科学家”并一并勾选。这男孩坚信，只要书读得够多，想探索多少种职业道路都不在话下。于是他埋头苦读，从百科全书到科幻小说，无所不涉。他读书如此痴迷，父母不得不立下规矩，禁止他在餐桌上阅读。\n\n那个男孩正是比尔·盖茨。即便如今已成为全球最成功的人士之一，他依然手不释卷。如今，他的阅读书单早已不再局限于科幻小说和工具书。他近期透露，自己每年至少阅读 50 本非虚构类书籍。盖茨偏爱非虚构类读物，因为这类书能揭示世界的运行规律。盖茨表示：“每一本书都为我开辟了探索新知的全新路径。”",
        "paragraphs": [
            {
                "pid": 0,
                "text": "A fifth grader gets a homework assignment to select his future career path from a list of occupations. He ticks \"astronaut\" but quickly adds \"scientist\" to the list and selects it as well. The boy is convinced that if he reads enough, he can explore as many career paths as he likes. And so he reads – everything from encyclopedias to science fiction novels. He reads so passionately that his parents have to institute a \"no reading policy\" at the dinner table."
            },
            {
                "pid": 1,
                "text": "That boy was Bill Gates, and he hasn't stopped reading yet – not even after becoming one of the most successful people on the planet. Nowadays, his reading material has changed from science fiction and reference books: recently, he revealed that he reads at least 50 nonfiction books a year. Gates chooses nonfiction titles because they explain how the world works. \"Each book opens up new avenues of knowledge to explore\", Gates says."
            }
        ],
        "sentences": [
            {
                "sid": 1,
                "pid": 0,
                "en": "A fifth grader gets a homework assignment to select his future career path from a list of occupations.",
                "slashed_text": "A fifth grader / gets a homework assignment / to select his future career path / from a list of occupations.",
                "literal_cn": "一名五年级学生收到一份家庭作业，要求从一份职业清单中选择他未来的职业道路。",
                "refined_cn": "一名五年级学生领到一项家庭作业，需要从职业清单里挑出自己未来的职业方向。",
                "cn": "一名五年级学生领到一项家庭作业，需要从职业清单里挑出自己未来的职业方向。",
                "syntax_points": [
                    {"label": "句子主干", "text": "A fifth grader 为主语，gets 为谓语，a homework assignment 为宾语。"},
                    {"label": "修饰成分", "text": "不定式短语 to select... 作后置定语，说明作业的具体内容。"}
                ],
                "vocab_points": [
                    {"term": "fifth grader", "note": "五年级学生。"},
                    {"term": "career path", "note": "职业道路，职业发展方向。"},
                    {"term": "a list of occupations", "note": "职业清单（occupation 侧重具体工种与职业）。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "A fifth grader gets a homework assignment",
                        "score": 1.0,
                        "guide": "fifth grader 译为“五年级学生”；homework assignment 译为“家庭作业”。",
                        "vocab": [
                            {"word": "fifth grader", "pos": "n.", "common": "五年级学生", "context": "小学五年级学童"},
                            {"word": "assignment", "pos": "n.", "common": "作业；任务", "context": "老师布置的家庭作业"}
                        ]
                    },
                    {
                        "phrase": "to select his future career path from a list of occupations",
                        "score": 1.0,
                        "guide": "不定式作后置定语说明作业内容；career path 译为“职业道路/方向”；a list of occupations 译为“职业清单”。",
                        "vocab": [
                            {"word": "career path", "pos": "n.", "common": "职业道路", "context": "未来的职业发展方向"},
                            {"word": "occupation", "pos": "n.", "common": "职业；工作", "context": "侧重具体工种与职业"}
                        ]
                    }
                ],
                "grammar_breakdown": "句子主干：A fifth grader 为主语，gets 为谓语，a homework assignment 为宾语。修饰成分：不定式短语 to select... 作后置定语，说明作业的具体内容。",
                "reassembly_notes": "不定式定语 to select... 顺译为“需要从职业清单里挑出……”，符合汉语叙事逻辑。"
            },
            {
                "sid": 2,
                "pid": 0,
                "en": "He ticks \"astronaut\" but quickly adds \"scientist\" to the list and selects it as well.",
                "slashed_text": "He ticks \"astronaut\" / but quickly adds \"scientist\" to the list / and selects it as well.",
                "literal_cn": "他在“宇航员”上打了勾，但很快把“科学家”添加到清单上，并且也选择了它。",
                "refined_cn": "他先勾选了“宇航员”，但很快又在清单上补写“科学家”并一并勾选。",
                "cn": "他先勾选了“宇航员”，但很快又在清单上补写“科学家”并一并勾选。",
                "syntax_points": [
                    {"label": "句子主干", "text": "He 为主语，谓语由 ticks、adds、selects 三个动词并列构成。"},
                    {"label": "逻辑连接", "text": "but 表转折补充，and 表动作顺承。"}
                ],
                "vocab_points": [
                    {"term": "tick", "note": "打勾，勾选（英式常用表达，美式多用 check）。"},
                    {"term": "add A to B", "note": "把 A 添加到 B 中。"},
                    {"term": "as well", "note": "也，同样（通常置于肯定句句末）。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "He ticks \"astronaut\" but quickly adds \"scientist\" to the list",
                        "score": 1.0,
                        "guide": "tick 动词“打勾/勾选”；add A to B 译为“把 A 添加/补写到 B 上”。",
                        "vocab": [
                            {"word": "tick", "pos": "v.", "common": "打勾；勾选", "context": "在清单选项旁画勾"},
                            {"word": "astronaut", "pos": "n.", "common": "宇航员", "context": "航天员职业"}
                        ]
                    },
                    {
                        "phrase": "and selects it as well",
                        "score": 0.5,
                        "guide": "selects it as well 译为“并且也选择了它 / 并一并勾选”。",
                        "vocab": [{"word": "as well", "pos": "phr.", "common": "也；同样", "context": "置于肯定句末表并列补充"}]
                    }
                ],
                "grammar_breakdown": "句子主干：He 为主语，谓语由 ticks、adds、selects 三个动词并列构成。逻辑连接：but 表转折补充，and 表动作顺承。",
                "reassembly_notes": "三个连续动作 ticks... adds... selects... 译为“先勾选了……又补写……并一并勾选”，画面感极强。"
            },
            {
                "sid": 3,
                "pid": 0,
                "en": "The boy is convinced that if he reads enough, he can explore as many career paths as he likes.",
                "slashed_text": "The boy is convinced / that [if he reads enough, / he can explore as many career paths / as he likes].",
                "literal_cn": "这个男孩深信，如果他读得足够多，他就能探索他喜欢的尽可能多的职业道路。",
                "refined_cn": "这男孩坚信，只要书读得够多，想探索多少种职业道路都不在话下。",
                "cn": "这男孩坚信，只要书读得够多，想探索多少种职业道路都不在话下。",
                "syntax_points": [
                    {"label": "句子主干", "text": "The boy 为主语，is convinced 为系表结构，that 引导宾语从句。"},
                    {"label": "嵌套层次", "text": "宾语从句内包含 if 条件状语从句，以及 as...as 比较状语从句。"}
                ],
                "vocab_points": [
                    {"term": "be convinced that...", "note": "深信，确信。"},
                    {"term": "as many + 复数名词 + as sb. likes", "note": "想有多少就有多少……。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "The boy is convinced that if he reads enough",
                        "score": 1.0,
                        "guide": "be convinced that 译为“深信/坚信”；if he reads enough 译为“只要书读得够多”。",
                        "vocab": [{"word": "convinced", "pos": "adj.", "common": "确信的；深信的", "context": "be convinced that 深信不疑"}]
                    },
                    {
                        "phrase": "he can explore as many career paths as he likes",
                        "score": 1.0,
                        "guide": "as many... as he likes 译为“他喜欢的尽可能多的 / 想探索多少种……都不在话下”。",
                        "vocab": [{"word": "explore", "pos": "v.", "common": "探索；探究", "context": "探索未来的职业可能性"}]
                    }
                ],
                "grammar_breakdown": "句子主干：The boy 为主语，is convinced 为系表结构，that 引导宾语从句。嵌套层次：宾语从句内包含 if 条件状语从句，以及 as...as 比较状语从句。",
                "reassembly_notes": "as many career paths as he likes 直译“他喜欢的尽可能多的职业道路”较绕，精译为“想探索多少种职业道路都不在话下”更地道。"
            },
            {
                "sid": 4,
                "pid": 0,
                "en": "And so he reads – everything from encyclopedias to science fiction novels.",
                "slashed_text": "And so he reads / – everything / from encyclopedias / to science fiction novels.",
                "literal_cn": "于是他就读——从百科全书到科幻小说的一切书籍。",
                "refined_cn": "于是他埋头苦读，从百科全书到科幻小说，无所不涉。",
                "cn": "于是他埋头苦读，从百科全书到科幻小说，无所不涉。",
                "syntax_points": [
                    {"label": "句子主干", "text": "he 为主语，reads 为不及物谓语动词。"},
                    {"label": "补充成分", "text": "破折号后为名词短语，具体解释他阅读的广度。"}
                ],
                "vocab_points": [
                    {"term": "and so", "note": "于是，因此（用于承接上文顺理成章的行动）。"},
                    {"term": "encyclopedia", "note": "百科全书。"},
                    {"term": "science fiction novel", "note": "科幻小说。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "And so he reads –",
                        "score": 0.5,
                        "guide": "And so 译为“于是”；reads 译为“埋头苦读”。",
                        "vocab": [{"word": "and so", "pos": "phr.", "common": "于是；因此", "context": "承接上文顺理成章的行动"}]
                    },
                    {
                        "phrase": "everything from encyclopedias to science fiction novels",
                        "score": 1.5,
                        "guide": "everything from A to B 译为“从 A 到 B 的一切书籍 / 从 A 到 B，无所不涉”。",
                        "vocab": [
                            {"word": "encyclopedia", "pos": "n.", "common": "百科全书", "context": "综合性知识工具书"},
                            {"word": "science fiction novel", "pos": "n.", "common": "科幻小说", "context": "科学幻想类文学作品"}
                        ]
                    }
                ],
                "grammar_breakdown": "句子主干：he 为主语，reads 为不及物谓语动词。补充成分：破折号后为名词短语，具体解释他阅读的广度。",
                "reassembly_notes": "everything 置后转化为四字格总结“无所不涉/无所不读”，凸显涉猎之广。"
            },
            {
                "sid": 5,
                "pid": 0,
                "en": "He reads so passionately that his parents have to institute a \"no reading policy\" at the dinner table.",
                "slashed_text": "He reads so passionately / that his parents have to institute / a \"no reading policy\" / at the dinner table.",
                "literal_cn": "他读得如此充满激情，以至于他的父母不得不在餐桌上制定一项“禁止阅读政策”。",
                "refined_cn": "他读书如此痴迷，父母不得不立下规矩，禁止他在餐桌上阅读。",
                "cn": "他读书如此痴迷，父母不得不立下规矩，禁止他在餐桌上阅读。",
                "syntax_points": [
                    {"label": "句子主干", "text": "He 为主语，reads 为谓语。"},
                    {"label": "特殊句式", "text": "so + 副词 + that 引导结果状语从句，强调阅读痴迷程度带来的后果。"}
                ],
                "vocab_points": [
                    {"term": "passionately", "note": "热情地，痴迷地。"},
                    {"term": "institute", "note": "熟词生义。作动词意为“制定，实行（制度或规定）”，切勿译为“机构”。"},
                    {"term": "no reading policy", "note": "禁止阅读规定。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "He reads so passionately that",
                        "score": 0.5,
                        "guide": "so passionately that 译为“读得如此充满激情/如此痴迷，以至于……”。",
                        "vocab": [{"word": "passionately", "pos": "adv.", "common": "热情地；狂热地", "context": "读书极其痴迷投入"}]
                    },
                    {
                        "phrase": "his parents have to institute a \"no reading policy\" at the dinner table",
                        "score": 1.5,
                        "guide": "institute 熟词生义作动词指“制定/实行（规矩）”；no reading policy 译为“禁止阅读政策/规矩”。",
                        "vocab": [
                            {"word": "institute", "pos": "v.", "common": "制定；建立（熟词生义）", "context": "立下规矩或实行规定"},
                            {"word": "policy", "pos": "n.", "common": "政策；规定", "context": "家庭内部的规矩"}
                        ]
                    }
                ],
                "grammar_breakdown": "句子主干：He 为主语，reads 为谓语。特殊句式：so + 副词 + that 引导结果状语从句，强调阅读痴迷程度带来的后果。",
                "reassembly_notes": "institute a \"no reading policy\" 大词小用，带着幽默语调，精译为“立下规矩，禁止他在餐桌上阅读”。"
            },
            {
                "sid": 6,
                "pid": 1,
                "en": "That boy was Bill Gates, and he hasn't stopped reading yet – not even after becoming one of the most successful people on the planet.",
                "slashed_text": "That boy was Bill Gates, / and he hasn't stopped reading yet / – not even after becoming / one of the most successful people on the planet.",
                "literal_cn": "那个男孩就是比尔·盖茨，而且他至今还没有停止阅读——甚至在成为地球上最成功的人之一后也没有。",
                "refined_cn": "那个男孩正是比尔·盖茨。即便如今已成为全球最成功的人士之一，他依然手不释卷。",
                "cn": "那个男孩正是比尔·盖茨。即便如今已成为全球最成功的人士之一，他依然手不释卷。",
                "syntax_points": [
                    {"label": "句子主干", "text": "and 连接两个并列分句。前句为系表结构，后句主干为 he hasn't stopped reading。"},
                    {"label": "时态与补充", "text": "现在完成时（hasn't stopped）表状态持续至今；破折号后强化让步语气。"}
                ],
                "vocab_points": [
                    {"term": "stop doing sth.", "note": "停止正在做的事（区别于 stop to do 停下来去做另一件事）。"},
                    {"term": "on the planet", "note": "地球上，全世界（比 in the world 语气更强）。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "That boy was Bill Gates, and he hasn't stopped reading yet",
                        "score": 1.0,
                        "guide": "hasn't stopped reading yet 译为“至今还没有停止阅读 / 依然手不释卷”。",
                        "vocab": [{"word": "stop doing", "pos": "phr.", "common": "停止做某事", "context": "停止长期保持的阅读习惯"}]
                    },
                    {
                        "phrase": "– not even after becoming one of the most successful people on the planet",
                        "score": 1.0,
                        "guide": "not even after becoming... 强化让步；on the planet 译为“地球上/全球”。",
                        "vocab": [{"word": "on the planet", "pos": "phr.", "common": "地球上；全世界", "context": "比 in the world 语气更强的全球范围"}]
                    }
                ],
                "grammar_breakdown": "句子主干：and 连接两个并列分句。前句为系表结构，后句主干为 he hasn't stopped reading。时态与补充：现在完成时（hasn't stopped）表状态持续至今；破折号后强化让步语气。",
                "reassembly_notes": "破折号后的让步状语 not even after becoming... 在精译时可前置译为“即便如今已成为……，他依然手不释卷”。"
            },
            {
                "sid": 7,
                "pid": 1,
                "en": "Nowadays, his reading material has changed from science fiction and reference books: recently, he revealed that he reads at least 50 nonfiction books a year.",
                "slashed_text": "Nowadays, / his reading material has changed / from science fiction and reference books: / recently, / he revealed / that he reads at least 50 nonfiction books a year.",
                "literal_cn": "如今，他的阅读材料已经从科幻小说和参考书发生了变化：最近，他透露他每年至少读50本非虚构类书籍。",
                "refined_cn": "如今，他的阅读书单早已不再局限于科幻小说和工具书。他近期透露，自己每年至少阅读 50 本非虚构类书籍。",
                "cn": "如今，他的阅读书单早已不再局限于科幻小说和工具书。他近期透露，自己每年至少阅读 50 本非虚构类书籍。",
                "syntax_points": [
                    {"label": "句子主干", "text": "冒号连接两个独立分句，后句解释前句的变化细节。"},
                    {"label": "从句结构", "text": "后句主干为 he revealed，后接 that 引导的宾语从句。"}
                ],
                "vocab_points": [
                    {"term": "reading material", "note": "阅读材料，书单。"},
                    {"term": "reference book", "note": "工具书，参考书（对应前文的百科全书）。"},
                    {"term": "nonfiction", "note": "非虚构类书籍（涵盖传记、历史、科普、商业等纪实作品）。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "Nowadays, his reading material has changed from science fiction and reference books:",
                        "score": 1.0,
                        "guide": "reading material 译为“阅读材料/书单”；reference books 译为“参考书/工具书”。",
                        "vocab": [
                            {"word": "reading material", "pos": "n.", "common": "阅读材料", "context": "日常阅读书单"},
                            {"word": "reference book", "pos": "n.", "common": "工具书；参考书", "context": "对应前文的百科全书"}
                        ]
                    },
                    {
                        "phrase": "recently, he revealed that he reads at least 50 nonfiction books a year",
                        "score": 1.0,
                        "guide": "revealed 译为“透露”；nonfiction books 译为“非虚构类书籍”。",
                        "vocab": [
                            {"word": "reveal", "pos": "v.", "common": "透露；揭示", "context": "公开透露个人习惯"},
                            {"word": "nonfiction", "pos": "n.", "common": "非虚构类读物", "context": "传记、历史、科普等纪实作品"}
                        ]
                    }
                ],
                "grammar_breakdown": "句子主干：冒号连接两个独立分句，后句解释前句的变化细节。从句结构：后句主干为 he revealed，后接 that 引导的宾语从句。",
                "reassembly_notes": "has changed from A 直译“从 A 发生了变化”不通顺，增益译为“早已不再局限于 A”。"
            },
            {
                "sid": 8,
                "pid": 1,
                "en": "Gates chooses nonfiction titles because they explain how the world works.",
                "slashed_text": "Gates chooses nonfiction titles / because they explain / how the world works.",
                "literal_cn": "盖茨选择非虚构类书籍，因为它们解释了世界是如何运转的。",
                "refined_cn": "盖茨偏爱非虚构类读物，因为这类书能揭示世界的运行规律。",
                "cn": "盖茨偏爱非虚构类读物，因为这类书能揭示世界的运行规律。",
                "syntax_points": [
                    {"label": "句子主干", "text": "Gates 为主语，chooses 为谓语，nonfiction titles 为宾语。"},
                    {"label": "嵌套层次", "text": "because 引导原因状语从句，内嵌 how 引导的宾语从句。"}
                ],
                "vocab_points": [
                    {"term": "title", "note": "熟词生义。在出版语境中指“书籍、刊物”，而非“标题”。"},
                    {"term": "how the world works", "note": "世界是如何运转的，世间万物的运行规律。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "Gates chooses nonfiction titles",
                        "score": 1.0,
                        "guide": "title 在出版语境中熟词生义指“书籍、读物”，避免误译为“标题”。",
                        "vocab": [{"word": "title", "pos": "n.", "common": "标题；书籍/出版物（熟词生义）", "context": "某一类书籍或刊物"}]
                    },
                    {
                        "phrase": "because they explain how the world works",
                        "score": 1.0,
                        "guide": "how the world works 直译“世界是如何运转的”，精译为“世界的运行规律”。",
                        "vocab": [{"word": "work", "pos": "v.", "common": "工作；运转；运行", "context": "世界与客观规律的运转"}]
                    }
                ],
                "grammar_breakdown": "句子主干：Gates 为主语，chooses 为谓语，nonfiction titles 为宾语。嵌套层次：because 引导原因状语从句，内嵌 how 引导的宾语从句。",
                "reassembly_notes": "nonfiction titles 与上句 nonfiction books 同义替换；explain how the world works 译为“揭示世界的运行规律”凝练地道。"
            },
            {
                "sid": 9,
                "pid": 1,
                "en": "\"Each book opens up new avenues of knowledge to explore\", Gates says.",
                "slashed_text": "\"Each book / opens up / new avenues of knowledge / to explore\", / Gates says.",
                "literal_cn": "“每一本书都开辟了有待探索的新知识途径”，盖茨说。",
                "refined_cn": "盖茨表示：“每一本书都为我开辟了探索新知的全新路径。”",
                "cn": "盖茨表示：“每一本书都为我开辟了探索新知的全新路径。”",
                "syntax_points": [
                    {"label": "句子主干", "text": "直接引语作宾语，主干为 Each book opens up new avenues of knowledge。"},
                    {"label": "修饰成分", "text": "不定式 to explore 作后置定语修饰 avenues of knowledge。"}
                ],
                "vocab_points": [
                    {"term": "open up", "note": "开辟，打开，展现（新的机会或路径）。"},
                    {"term": "avenue", "note": "林荫道；比喻“途径，渠道，路径”。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "\"Each book opens up new avenues of knowledge to explore\", Gates says",
                        "score": 1.5,
                        "guide": "open up 译为“开辟/打开”；avenues of knowledge 译为“知识的途径/探索新知的路径”。",
                        "vocab": [
                            {"word": "open up", "pos": "phr.", "common": "开辟；打开", "context": "开拓新的认知视野"},
                            {"word": "avenue", "pos": "n.", "common": "大街；途径/渠道（比喻义）", "context": "探索知识的路径"}
                        ]
                    }
                ],
                "grammar_breakdown": "句子主干：直接引语作宾语，主干为 Each book opens up new avenues of knowledge。修饰成分：不定式 to explore 作后置定语修饰 avenues of knowledge。",
                "reassembly_notes": "中文叙事习惯将末尾的 Gates says 提至引语之前译为“盖茨表示：……”。"
            }
        ]
    },
    2019: {
        "title": "2019 年考研英语（二）英译汉 Translation",
        "qid": 46,
        "points": 15,
        "directions": "Translate the following text into Chinese. Write your translation on the ANSWER SHEET. (15 points)",
        "source_text": "It is easy to underestimate English writer James Herriot. He had such a pleasant, readable style that one might think that anyone could imitate it. How many times have I heard people say, \"I could write a book. I just haven't the time.\" Easily said. Not so easily done. James Herriot, contrary to popular opinion, did not find it easy in his early days of, as he put it, \"having a go at the writing game\". While he obviously had an abundance of natural talent, the final, polished work that he gave to the world was the result of years of practicing, re-writing and reading. Like the majority of authors, he had to suffer many disappointments and rejections along the way, but these made him all the more determined to succeed. Everything he achieved in life was earned the hard way and his success in the literary field was no exception.",
        "full_literal_translation": "低估英国作家詹姆斯·赫里奥特是很容易的。他有着如此令人愉悦、可读性强的风格，以至于人们可能会认为任何人都能模仿它。我听过多少次人们说：“我也能写一本书。我只是没有时间。”容易说。不那么容易做。与普遍看法相反，詹姆斯·赫里奥特在他早期——正如他所说——“尝试写作游戏”的日子里，并没有觉得这很容易。虽然他显然拥有丰富的天赋，但他奉献给世界的最终润色过的作品，是多年练习、重写和阅读的结果。像大多数作家一样，他在一路上不得不遭受许多失望和拒绝，但这些使他更加决心要成功。他在一生中取得的一切成就都是通过艰难的方式赢得的，而且他在文学领域的成功也不例外。",
        "full_refined_translation": "人们很容易低估英国作家詹姆斯·赫里奥特。他的文风如此亲切流畅，让人误以为谁都能模仿得来。我不知听多少人说过：“我也能写本书，只是没时间罢了。”说起来容易，做起来难。与大众的普遍印象相反，詹姆斯·赫里奥特在刚涉足（按他自己的话说）“写作这一行”时，并不觉得轻松。尽管他显然天赋异禀，但他最终呈现给世人的那些精雕细琢的作品，实则是多年练笔、反复改写和大量阅读的结晶。和大多数作家一样，他在创作路上也饱尝挫折与退稿之苦，但这些经历反而让他更加下定决心要取得成功。他一生所取得的一切成就皆得来不易，他在文学领域的成功同样也不例外。",
        "reference_translation": "人们很容易低估英国作家詹姆斯·赫里奥特。他的文风如此亲切流畅，让人误以为谁都能模仿得来。我不知听多少人说过：“我也能写本书，只是没时间罢了。”说起来容易，做起来难。与大众的普遍印象相反，詹姆斯·赫里奥特在刚涉足（按他自己的话说）“写作这一行”时，并不觉得轻松。尽管他显然天赋异禀，但他最终呈现给世人的那些精雕细琢的作品，实则是多年练笔、反复改写和大量阅读的结晶。和大多数作家一样，他在创作路上也饱尝挫折与退稿之苦，但这些经历反而让他更加下定决心要取得成功。他一生所取得的一切成就皆得来不易，他在文学领域的成功同样也不例外。",
        "paragraphs": [
            {
                "pid": 0,
                "text": "It is easy to underestimate English writer James Herriot. He had such a pleasant, readable style that one might think that anyone could imitate it. How many times have I heard people say, \"I could write a book. I just haven't the time.\" Easily said. Not so easily done. James Herriot, contrary to popular opinion, did not find it easy in his early days of, as he put it, \"having a go at the writing game\". While he obviously had an abundance of natural talent, the final, polished work that he gave to the world was the result of years of practicing, re-writing and reading. Like the majority of authors, he had to suffer many disappointments and rejections along the way, but these made him all the more determined to succeed. Everything he achieved in life was earned the hard way and his success in the literary field was no exception."
            }
        ],
        "sentences": [
            {
                "sid": 1,
                "pid": 0,
                "en": "It is easy to underestimate English writer James Herriot.",
                "slashed_text": "It is easy / to underestimate / English writer James Herriot.",
                "literal_cn": "低估英国作家詹姆斯·赫里奥特是很容易的。",
                "refined_cn": "人们很容易低估英国作家詹姆斯·赫里奥特。",
                "cn": "人们很容易低估英国作家詹姆斯·赫里奥特。",
                "syntax_points": [
                    {"label": "句子主干", "text": "It 为形式主语，is easy 为系表结构，不定式短语 to underestimate... 为真正主语。"},
                    {"label": "同位语", "text": "English writer 与 James Herriot 构成同位语，点明人物身份。"}
                ],
                "vocab_points": [
                    {"term": "underestimate", "note": "低估，小看。"},
                    {"term": "James Herriot", "note": "詹姆斯·赫里奥特，英国著名兽医作家（代表作《万物既伟大又渺小》）。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "It is easy to underestimate",
                        "score": 1.0,
                        "guide": "形式主语结构 It is easy to do... 汉译时常增补泛指主语“人们很容易……”。",
                        "vocab": [{"word": "underestimate", "pos": "v.", "common": "低估；看轻", "context": "低估作家的写作功底"}]
                    },
                    {
                        "phrase": "English writer James Herriot",
                        "score": 0.5,
                        "guide": "同位语前置修饰，译为“英国作家詹姆斯·赫里奥特”。",
                        "vocab": [{"word": "writer", "pos": "n.", "common": "作家", "context": "文学创作者"}]
                    }
                ],
                "grammar_breakdown": "句子主干：It 为形式主语，is easy 为系表结构，不定式短语 to underestimate... 为真正主语。同位语：English writer 与 James Herriot 构成同位语，点明人物身份。",
                "reassembly_notes": "形式主语句 It is easy to do 增补泛指主语“人们”，消除头重脚轻感。"
            },
            {
                "sid": 2,
                "pid": 0,
                "en": "He had such a pleasant, readable style that one might think that anyone could imitate it.",
                "slashed_text": "He had such a pleasant, readable style / that one might think / [that] anyone could imitate it.",
                "literal_cn": "他有着如此令人愉悦、可读性强的风格，以至于人们可能会认为任何人都能模仿它。",
                "refined_cn": "他的文风如此亲切流畅，让人误以为谁都能模仿得来。",
                "cn": "他的文风如此亲切流畅，让人误以为谁都能模仿得来。",
                "syntax_points": [
                    {"label": "句子主干", "text": "He 为主语，had 为谓语，style 为宾语。"},
                    {"label": "特殊句式", "text": "such... that... 引导结果状语从句，从句内嵌省略引导词 that 的宾语从句。"}
                ],
                "vocab_points": [
                    {"term": "pleasant", "note": "令人愉悦的，亲切自然的。"},
                    {"term": "readable", "note": "可读性强的，通俗流畅的。"},
                    {"term": "one", "note": "泛指“人们，任何人”。"},
                    {"term": "imitate", "note": "模仿，效仿。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "He had such a pleasant, readable style",
                        "score": 1.0,
                        "guide": "pleasant, readable style 译为“令人愉悦、可读性强的风格 / 亲切流畅的文风”。",
                        "vocab": [
                            {"word": "pleasant", "pos": "adj.", "common": "令人愉快的；亲切的", "context": "文风亲切自然"},
                            {"word": "readable", "pos": "adj.", "common": "可读性强的；通畅易读的", "context": "文字通俗流畅"}
                        ]
                    },
                    {
                        "phrase": "that one might think that anyone could imitate it",
                        "score": 1.0,
                        "guide": "such... that... 引导结果从句；imitate 译为“模仿”。",
                        "vocab": [{"word": "imitate", "pos": "v.", "common": "模仿；效仿", "context": "模仿他的写作风格"}]
                    }
                ],
                "grammar_breakdown": "句子主干：He 为主语，had 为谓语，style 为宾语。特殊句式：such... that... 引导结果状语从句，从句内嵌省略引导词 that 的宾语从句。",
                "reassembly_notes": "one might think 结合上文 underestimate 的语境，精译为“让人误以为”，准确传达世人的错觉。"
            },
            {
                "sid": 3,
                "pid": 0,
                "en": "How many times have I heard people say, \"I could write a book. I just haven't the time.\"",
                "slashed_text": "How many times / have I heard people say, / \"I could write a book. / I just haven't the time.\"",
                "literal_cn": "我听过多少次人们说：“我也能写一本书。我只是没有时间。”",
                "refined_cn": "我不知听多少人说过：“我也能写本书，只是没时间罢了。”",
                "cn": "我不知听多少人说过：“我也能写本书，只是没时间罢了。”",
                "syntax_points": [
                    {"label": "句子主干", "text": "现在完成时的特殊疑问句，实质为反问句（表“无数次”）。"},
                    {"label": "语法要点", "text": "hear sb. do sth. 接不带 to 的不定式；haven't the time 为英式英语用法，等同于 don't have the time。"}
                ],
                "vocab_points": [
                    {"term": "How many times", "note": "多少次（反问语境下意译为“不知多少次”）。"},
                    {"term": "just", "note": "只是，仅仅（带有轻描淡写的语气）。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "How many times have I heard people say,",
                        "score": 1.0,
                        "guide": "修辞性疑问句表感叹，译为“我听过多少次人们说 / 我不知听多少人说过”。",
                        "vocab": [{"word": "hear sb. do", "pos": "phr.", "common": "听到某人做过某事", "context": "多次听人夸口"}]
                    },
                    {
                        "phrase": "\"I could write a book. I just haven't the time.\"",
                        "score": 1.0,
                        "guide": "haven't the time 为英式口语“没有时间”，just 译出“只是……罢了”的轻描淡写语气。",
                        "vocab": [{"word": "just", "pos": "adv.", "common": "只是；仅仅", "context": "轻描淡写找借口"}]
                    }
                ],
                "grammar_breakdown": "句子主干：现在完成时的特殊疑问句，实质为反问句（表“无数次”）。语法要点：hear sb. do sth. 接不带 to 的不定式；haven't the time 为英式英语用法，等同于 don't have the time。",
                "reassembly_notes": "将两句短引语合并为一句话“我也能写本书，只是没时间罢了”，口语感鲜活。"
            },
            {
                "sid": 4,
                "pid": 0,
                "en": "Easily said. Not so easily done.",
                "slashed_text": "Easily said. / Not so easily done.",
                "literal_cn": "容易说。不那么容易做。",
                "refined_cn": "说起来容易，做起来难。",
                "cn": "说起来容易，做起来难。",
                "syntax_points": [
                    {"label": "特殊句式", "text": "省略句，完整形式为 [It is] easily said. [It is] not so easily done. 过去分词表被动含义。"}
                ],
                "vocab_points": [
                    {"term": "Easily said. Not so easily done.", "note": "习语变体（源自 Easier said than done），意为“说起来容易做起来难”。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "Easily said. Not so easily done.",
                        "score": 1.5,
                        "guide": "省略结构 [It is] easily said, [it is] not so easily done，地道汉语俗语“说起来容易，做起来难”。",
                        "vocab": [{"word": "easily said", "pos": "idiom", "common": "说起来容易", "context": "对比言行难易程度"}]
                    }
                ],
                "grammar_breakdown": "特殊句式：省略句，完整形式为 [It is] easily said. [It is] not so easily done. 过去分词表被动含义。",
                "reassembly_notes": "直接套用汉语熟语“说起来容易，做起来难”，简洁有力。"
            },
            {
                "sid": 5,
                "pid": 0,
                "en": "James Herriot, contrary to popular opinion, did not find it easy in his early days of, as he put it, \"having a go at the writing game\".",
                "slashed_text": "James Herriot, / contrary to popular opinion, / did not find it easy / in his early days of, / as he put it, / \"having a go at the writing game\".",
                "literal_cn": "与普遍看法相反，詹姆斯·赫里奥特在他早期——正如他所说——“尝试写作游戏”的日子里，并没有觉得这很容易。",
                "refined_cn": "与大众的普遍印象相反，詹姆斯·赫里奥特在刚涉足（按他自己的话说）“写作这一行”时，并不觉得轻松。",
                "cn": "与大众的普遍印象相反，詹姆斯·赫里奥特在刚涉足（按他自己的话说）“写作这一行”时，并不觉得轻松。",
                "syntax_points": [
                    {"label": "句子主干", "text": "James Herriot did not find it easy...（it 为形式宾语，指代后文提及的写作一事）。"},
                    {"label": "插入成分", "text": "contrary to popular opinion 和 as he put it 均为插入语，起补充说明作用。"}
                ],
                "vocab_points": [
                    {"term": "contrary to popular opinion", "note": "与普遍看法相反。"},
                    {"term": "as he put it", "note": "正如他自己所说（put 在此作动词，意为“表达，表述”）。"},
                    {"term": "have a go at sth.", "note": "尝试做某事。"},
                    {"term": "the writing game", "note": "熟词生义。game 在此指“行业、行当”，切勿直译为“游戏”。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "James Herriot, contrary to popular opinion, did not find it easy",
                        "score": 1.0,
                        "guide": "contrary to popular opinion 提至句首译为“与普遍看法相反”；did not find it easy 译为“并不觉得轻松”。",
                        "vocab": [{"word": "contrary to", "pos": "phr.", "common": "与……相反", "context": "打破大众刻板印象"}]
                    },
                    {
                        "phrase": "in his early days of, as he put it, \"having a go at the writing game\"",
                        "score": 1.5,
                        "guide": "as he put it 译为“正如他所说”；have a go at 意为“尝试”；game 熟词生义指“行业/行当”。",
                        "vocab": [
                            {"word": "have a go at", "pos": "idiom", "common": "尝试做某事", "context": "初次涉足尝试写作"},
                            {"word": "game", "pos": "n.", "common": "游戏；行业/行当（熟词生义）", "context": "the writing game 写作这一行"}
                        ]
                    }
                ],
                "grammar_breakdown": "句子主干：James Herriot did not find it easy...（it 为形式宾语，指代后文提及的写作一事）。插入成分：contrary to popular opinion 和 as he put it 均为插入语，起补充说明作用。",
                "reassembly_notes": "contrary to popular opinion 移至句首作全句状语；the writing game 是自谦幽默说法，译为“写作这一行”。"
            },
            {
                "sid": 6,
                "pid": 0,
                "en": "While he obviously had an abundance of natural talent, the final, polished work that he gave to the world was the result of years of practicing, re-writing and reading.",
                "slashed_text": "While he obviously had an abundance of natural talent, / the final, polished work / [that he gave to the world] / was the result / of years of practicing, re-writing and reading.",
                "literal_cn": "虽然他显然拥有丰富的天赋，但他奉献给世界的最终润色过的作品，是多年练习、重写和阅读的结果。",
                "refined_cn": "尽管他显然天赋异禀，但他最终呈现给世人的那些精雕细琢的作品，实则是多年练笔、反复改写和大量阅读的结晶。",
                "cn": "尽管他显然天赋异禀，但他最终呈现给世人的那些精雕细琢的作品，实则是多年练笔、反复改写和大量阅读的结晶。",
                "syntax_points": [
                    {"label": "句子主干", "text": "the final, polished work 为主语，was 为系动词，the result of... 为表语。"},
                    {"label": "修饰成分", "text": "While 引导让步状语从句（表“虽然，尽管”）；that he gave to the world 为定语从句，修饰先行词 work。"}
                ],
                "vocab_points": [
                    {"term": "an abundance of", "note": "大量的，丰富的。"},
                    {"term": "natural talent", "note": "天赋，天分。"},
                    {"term": "polished", "note": "精心打磨的，润色完善的。"},
                    {"term": "give to the world", "note": "奉献给世人，公之于众。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "While he obviously had an abundance of natural talent",
                        "score": 1.0,
                        "guide": "While 引导让步“虽然/尽管”；an abundance of natural talent 译为“丰富的天赋 / 天赋异禀”。",
                        "vocab": [
                            {"word": "abundance", "pos": "n.", "common": "丰富；充裕", "context": "an abundance of 极其丰富的"},
                            {"word": "natural talent", "pos": "n.", "common": "天赋；天资", "context": "与生俱来的写作才华"}
                        ]
                    },
                    {
                        "phrase": "the final, polished work that he gave to the world",
                        "score": 1.0,
                        "guide": "polished work 译为“润色过的作品 / 精雕细琢的作品”；that 定语从句前置修饰 work。",
                        "vocab": [{"word": "polished", "pos": "adj.", "common": "磨光的；精雕细琢的；润色过的", "context": "精心打磨完善的文学作品"}]
                    },
                    {
                        "phrase": "was the result of years of practicing, re-writing and reading",
                        "score": 1.0,
                        "guide": "the result of 译为“……的结果/结晶”；practicing, re-writing and reading 译为“练笔、反复改写和大量阅读”。",
                        "vocab": [{"word": "re-writing", "pos": "n.", "common": "重写；改写", "context": "手稿的反复修改打磨"}]
                    }
                ],
                "grammar_breakdown": "句子主干：the final, polished work 为主语，was 为系动词，the result of... 为表语。修饰成分：While 引导让步状语从句（表“虽然，尽管”）；that he gave to the world 为定语从句，修饰先行词 work。",
                "reassembly_notes": "定语从句 that he gave to the world 提前置于 the final, polished work 之前，译为“他最终呈现给世人的那些精雕细琢的作品”。"
            },
            {
                "sid": 7,
                "pid": 0,
                "en": "Like the majority of authors, he had to suffer many disappointments and rejections along the way, but these made him all the more determined to succeed.",
                "slashed_text": "Like the majority of authors, / he had to suffer many disappointments and rejections / along the way, / but these made him / all the more determined to succeed.",
                "literal_cn": "像大多数作家一样，他在一路上不得不遭受许多失望和拒绝，但这些使他更加决心要成功。",
                "refined_cn": "和大多数作家一样，他在创作路上也饱尝挫折与退稿之苦，但这些经历反而让他更加下定决心要取得成功。",
                "cn": "和大多数作家一样，他在创作路上也饱尝挫折与退稿之苦，但这些经历反而让他更加下定决心要取得成功。",
                "syntax_points": [
                    {"label": "句子主干", "text": "but 连接的并列复合句。前句主干为 he had to suffer...；后句主干为 these made him... determined...（make + 宾语 + 形容词作宾补）。"},
                    {"label": "修饰成分", "text": "Like the majority of authors 作比较状语；along the way 作时间/过程状语。"}
                ],
                "vocab_points": [
                    {"term": "the majority of", "note": "大多数。"},
                    {"term": "rejection", "note": "出版写作语境下特指“退稿”，比泛泛译为“拒绝”更贴切。"},
                    {"term": "along the way", "note": "一路上，在（创作的）过程中。"},
                    {"term": "all the more", "note": "更加，愈发（用于加强比较级或形容词程度）。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "Like the majority of authors, he had to suffer many disappointments and rejections along the way",
                        "score": 1.0,
                        "guide": "the majority of 译为“大多数”；rejection 在出版语境下特指“退稿”；along the way 译为“一路上/在创作路上”。",
                        "vocab": [
                            {"word": "rejection", "pos": "n.", "common": "拒绝；退稿（出版语境）", "context": "出版社退回稿件"},
                            {"word": "along the way", "pos": "phr.", "common": "一路上；在此过程中", "context": "在漫长的创作道路上"}
                        ]
                    },
                    {
                        "phrase": "but these made him all the more determined to succeed",
                        "score": 1.0,
                        "guide": "all the more 译为“更加/愈发”；determined to succeed 译为“下定决心要取得成功”。",
                        "vocab": [
                            {"word": "all the more", "pos": "phr.", "common": "更加；愈发", "context": "用于加强形容词程度"},
                            {"word": "determined", "pos": "adj.", "common": "坚定的；下定决心的", "context": "矢志取得成功"}
                        ]
                    }
                ],
                "grammar_breakdown": "句子主干：but 连接的并列复合句。前句主干为 he had to suffer...；后句主干为 these made him... determined...（make + 宾语 + 形容词作宾补）。修饰成分：Like the majority of authors 作比较状语；along the way 作时间/过程状语。",
                "reassembly_notes": "rejections 结合 authors 语境精准译为“退稿”；these 增补名词译为“这些经历”。"
            },
            {
                "sid": 8,
                "pid": 0,
                "en": "Everything he achieved in life was earned the hard way and his success in the literary field was no exception.",
                "slashed_text": "Everything [he achieved in life] / was earned the hard way / and his success in the literary field / was no exception.",
                "literal_cn": "他在一生中取得的一切成就都是通过艰难的方式赢得的，而且他在文学领域的成功也不例外。",
                "refined_cn": "他一生所取得的一切成就皆得来不易，他在文学领域的成功同样也不例外。",
                "cn": "他一生所取得的一切成就皆得来不易，他在文学领域的成功同样也不例外。",
                "syntax_points": [
                    {"label": "句子主干", "text": "and 连接的并列句。前句主干为 Everything was earned the hard way；后句主干为 his success was no exception。"},
                    {"label": "修饰成分", "text": "he achieved in life 为省略关系代词 that 的定语从句，修饰 Everything；in the literary field 作后置定语修饰 success。"}
                ],
                "vocab_points": [
                    {"term": "earn the hard way", "note": "历尽艰辛才获得，得来不易（the hard way 作方式状语）。"},
                    {"term": "literary field", "note": "文学领域。"},
                    {"term": "be no exception", "note": "也不例外。"}
                ],
                "scoring_points": [
                    {
                        "phrase": "Everything he achieved in life was earned the hard way",
                        "score": 1.0,
                        "guide": "he achieved in life 定语从句前置修饰 Everything；was earned the hard way 译为“都是通过艰难的方式赢得的 / 皆得来不易”。",
                        "vocab": [{"word": "the hard way", "pos": "phr.", "common": "通过艰难的方式；历尽艰辛", "context": "靠苦干而非捷径赢得成就"}]
                    },
                    {
                        "phrase": "and his success in the literary field was no exception",
                        "score": 1.0,
                        "guide": "literary field 译为“文学领域”；was no exception 译为“也不例外”。",
                        "vocab": [
                            {"word": "literary", "pos": "adj.", "common": "文学的", "context": "the literary field 文学领域"},
                            {"word": "exception", "pos": "n.", "common": "例外", "context": "be no exception 毫无例外"}
                        ]
                    }
                ],
                "grammar_breakdown": "句子主干：and 连接的并列句。前句主干为 Everything was earned the hard way；后句主干为 his success was no exception。修饰成分：he achieved in life 为省略关系代词 that 的定语从句，修饰 Everything；in the literary field 作后置定语修饰 success。",
                "reassembly_notes": "was earned the hard way 意译为成语“得来不易”，与后半句“同样也不例外”呼应，收束全篇。"
            }
        ]
    }
}
