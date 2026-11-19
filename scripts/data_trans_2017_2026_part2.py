# -*- coding: utf-8 -*-
"""
Part 2: Rich Translation Data for 2020, 2021, 2022, 2023
"""

TRANSLATION_DATA_PART2 = {
    2020: {
        "title": "2020 年考研英语（二）英译汉 Translation",
        "qid": 46,
        "points": 15,
        "directions": "Translate the following text into Chinese. Write your translation on the ANSWER SHEET. (15 points)",
        "source_text": "It's almost impossible to go through life without experiencing some kind of failure. But, the wonderful thing about failure is that it's entirely up to us to decide how to look at it.\n\nWe can choose to see failure as \"the end of the world\". Or, we can look at failure as the incredible learning experience that it often is. Every time we fail at something, we can choose to look for the lesson we're meant to learn. These lessons are very important; they're how we grow, and how we keep from making that same mistake again. Failures stop us only if we let them.\n\nFailure can also teach us things about ourselves that we would never have learned otherwise. For instance, failure can help you discover how strong a person you are. Failing at something can help you discover your truest friends, or help you find unexpected motivation to succeed.",
        "full_literal_translation": "在一生中不经历某种失败几乎是不可能的。但是，关于失败的美妙之处在于，完全由我们来决定如何看待它。\n\n我们可以选择把失败看作“世界末日”。或者，我们可以把失败看作它经常所是的那种极好的学习经历。每次我们在某件事上失败时，我们都可以选择去寻找我们应该吸取的教训。这些教训非常重要；它们是我们成长的方式，也是我们避免再犯同样错误的方式。只有当我们允许失败阻止我们时，它们才会阻止我们。\n\n失败还能教给我们关于我们自己的、否则我们永远不会学到的东西。例如，失败可以帮助你发现你是一个多么坚强的人。在某件事上失败可以帮助你发现你最真正的朋友，或者帮助你找到意想不到的成功动力。",
        "full_refined_translation": "人这一生，几乎不可能不经历某种形式的失败。但失败的可贵之处在于，究竟如何看待它，完全取决于我们自己。\n\n我们可以选择将失败视作“世界末日”，也可以把它看作一段难能可贵的学习经历——事实上它往往正是如此。每当我们在某件事上遭遇挫败，都可以选择从中探寻我们本该汲取的教训。这些教训至关重要：它们是我们成长的阶梯，也是我们避免重蹈覆辙的关键。唯有在我们任由失败摆布时，它才会阻挡我们前行的脚步。\n\n此外，失败还能让我们认清自身，学到若非如此便无从知晓的道理。比如，失败能帮你发掘自己究竟有多坚强；某次失利也能帮你识得谁才是真正的朋友，或是帮你找到意想不到的动力去走向成功。",
        "reference_translation": "人这一生，几乎不可能不经历某种形式的失败。但失败的可贵之处在于，究竟如何看待它，完全取决于我们自己。\n\n我们可以选择将失败视作“世界末日”，也可以把它看作一段难能可贵的学习经历——事实上它往往正是如此。每当我们在某件事上遭遇挫败，都可以选择从中探寻我们本该汲取的教训。这些教训至关重要：它们是我们成长的阶梯，也是我们避免重蹈覆辙的关键。唯有在我们任由失败摆布时，它才会阻挡我们前行的脚步。\n\n此外，失败还能让我们认清自身，学到若非如此便无从知晓的道理。比如，失败能帮你发掘自己究竟有多坚强；某次失利也能帮你识得谁才是真正的朋友，或是帮你找到意想不到的动力去走向成功。",
        "paragraphs": [
            {
                "pid": 0,
                "text": "It's almost impossible to go through life without experiencing some kind of failure. But, the wonderful thing about failure is that it's entirely up to us to decide how to look at it."
            },
            {
                "pid": 1,
                "text": "We can choose to see failure as \"the end of the world\". Or, we can look at failure as the incredible learning experience that it often is. Every time we fail at something, we can choose to look for the lesson we're meant to learn. These lessons are very important; they're how we grow, and how we keep from making that same mistake again. Failures stop us only if we let them."
            },
            {
                "pid": 2,
                "text": "Failure can also teach us things about ourselves that we would never have learned otherwise. For instance, failure can help you discover how strong a person you are. Failing at something can help you discover your truest friends, or help you find unexpected motivation to succeed."
            }
        ],
        "sentences": [
            {
                "sid": 1,
                "pid": 0,
                "en": "It's almost impossible to go through life without experiencing some kind of failure.",
                "slashed_text": "It's almost impossible / to go through life / without experiencing some kind of failure.",
                "literal_cn": "在一生中不经历某种失败几乎是不可能的。",
                "refined_cn": "人这一生，几乎不可能不经历某种形式的失败。",
                "cn": "人这一生，几乎不可能不经历某种形式的失败。",
                "syntax_points": [
                    {"label": "句子主干", "text": "It 为形式主语，is 为系动词，almost impossible 为表语，不定式短语 to go through life... 为真正主语。"},
                    {"label": "修饰成分", "text": "without experiencing some kind of failure 为介词短语作伴随/条件状语，与前面的 impossible 构成双重否定。"}
                ],
                "vocab_points": [
                    {"term": "go through life", "note": "走过一生，度过人生。"},
                    {"term": "some kind of", "note": "某种（形式的）。"}
                ],
                "scoring_points": [
                    {"phrase": "It's almost impossible to go through life", "score": 0.5, "guide": "It 作形式主语，译为“人这一生几乎不可能……”。", "vocab": [{"word": "go through", "pos": "phr.", "common": "经历；度过", "context": "度过人生"}]},
                    {"phrase": "without experiencing some kind of failure", "score": 1.0, "guide": "without 表否定，与 impossible 构成“几乎不可能不……”。", "vocab": [{"word": "failure", "pos": "n.", "common": "失败", "context": "某种形式的失败"}]}
                ],
                "grammar_breakdown": "句子主干：It 为形式主语，不定式 to go through life... 为真正主语。without 介词短语表伴随否定。",
                "reassembly_notes": "将“almost impossible... without...”双重否定顺译为“几乎不可能不经历……”，自然流畅。"
            },
            {
                "sid": 2,
                "pid": 0,
                "en": "But, the wonderful thing about failure is that it's entirely up to us to decide how to look at it.",
                "slashed_text": "But, / the wonderful thing about failure / is / that it's entirely up to us / to decide how to look at it.",
                "literal_cn": "但是，关于失败的美妙之处在于，完全由我们来决定如何看待它。",
                "refined_cn": "但失败的可贵之处在于，究竟如何看待它，完全取决于我们自己。",
                "cn": "但失败的可贵之处在于，究竟如何看待它，完全取决于我们自己。",
                "syntax_points": [
                    {"label": "句子主干", "text": "the wonderful thing 为主语，is 为系动词，that 引导表语从句。"},
                    {"label": "从句结构", "text": "表语从句中 it 为形式主语，to decide how to look at it 为真正主语；how to look at it 为“疑问词+不定式”作 decide 的宾语。"}
                ],
                "vocab_points": [
                    {"term": "be up to sb.", "note": "由某人决定，取决于某人。"},
                    {"term": "look at", "note": "看待，审视。"}
                ],
                "scoring_points": [
                    {"phrase": "the wonderful thing about failure", "score": 0.5, "guide": "wonderful thing 结合语境译为“美妙之处/可贵之处”。", "vocab": []},
                    {"phrase": "entirely up to us to decide how to look at it", "score": 1.0, "guide": "up to us 译为“由我们决定/取决于我们自己”。", "vocab": [{"word": "entirely", "pos": "adv.", "common": "完全地", "context": "完全取决于自己"}]}
                ],
                "grammar_breakdown": "句子主干：the wonderful thing is that...（表语从句）。从句内部使用 it's up to us to do sth. 句型。",
                "reassembly_notes": "将表语从句中的 decide how to look at it 拆开调整语序，译为“究竟如何看待它，完全取决于我们自己”。"
            },
            {
                "sid": 3,
                "pid": 1,
                "en": "We can choose to see failure as \"the end of the world\".",
                "slashed_text": "We can choose / to see failure as \"the end of the world\".",
                "literal_cn": "我们可以选择把失败看作“世界末日”。",
                "refined_cn": "我们可以选择将失败视作“世界末日”，",
                "cn": "我们可以选择将失败视作“世界末日”。",
                "syntax_points": [
                    {"label": "句子主干", "text": "We 为主语，can choose 为谓语，不定式短语 to see failure as... 为宾语。"}
                ],
                "vocab_points": [
                    {"term": "see A as B", "note": "把 A 视作 B，把 A 看作 B。"},
                    {"term": "the end of the world", "note": "世界末日（比喻无可挽回的绝境）。"}
                ],
                "scoring_points": [
                    {"phrase": "see failure as \"the end of the world\"", "score": 1.0, "guide": "see... as... 译为“把……看作/视作……”；the end of the world 保留引号译为“世界末日”。", "vocab": []}
                ],
                "grammar_breakdown": "简单句：choose to do sth. + see A as B 结构。",
                "reassembly_notes": "在全文中可与下一句 Or... 合并断句，形成“可以……，也可以……”的并列选择感。"
            },
            {
                "sid": 4,
                "pid": 1,
                "en": "Or, we can look at failure as the incredible learning experience that it often is.",
                "slashed_text": "Or, / we can look at failure / as the incredible learning experience / [that it often is].",
                "literal_cn": "或者，我们可以把失败看作它经常所是的那种极好的学习经历。",
                "refined_cn": "也可以把它看作一段难能可贵的学习经历——事实上它往往正是如此。",
                "cn": "也可以把它看作一段难能可贵的学习经历——事实上它往往正是如此。",
                "syntax_points": [
                    {"label": "句子主干", "text": "we 为主语，can look at 为谓语，failure 为宾语，as... 为介词短语。"},
                    {"label": "修饰成分", "text": "that it often is 为定语从句，修饰先行词 learning experience，关系代词 that 在从句中作表语。"}
                ],
                "vocab_points": [
                    {"term": "look at A as B", "note": "把 A 看作 B（与前句 see A as B 对应）。"},
                    {"term": "incredible", "note": "极好的，难能可贵的，了不起的（此处非“难以置信的”贬义，而是正向赞叹）。"}
                ],
                "scoring_points": [
                    {"phrase": "the incredible learning experience", "score": 1.0, "guide": "incredible 在此意为“极好的/难能可贵的”。", "vocab": [{"word": "incredible", "pos": "adj.", "common": "极好的；惊人的", "context": "宝贵的学习经历"}]},
                    {"phrase": "that it often is", "score": 0.5, "guide": "定语从句表“事实上它往往正是如此”，用破折号独立成句更符合汉语习惯。", "vocab": []}
                ],
                "grammar_breakdown": "核心难点在于句尾定语从句 that it often is（省略了表语 learning experience），直接前置修饰会非常拗口。",
                "reassembly_notes": "采用“后置破折号分译法”处理 that it often is，译为“——事实上它往往正是如此”。"
            },
            {
                "sid": 5,
                "pid": 1,
                "en": "Every time we fail at something, we can choose to look for the lesson we're meant to learn.",
                "slashed_text": "Every time we fail at something, / we can choose to look for the lesson / [we're meant to learn].",
                "literal_cn": "每次我们在某件事上失败时，我们都可以选择去寻找我们应该吸取的教训。",
                "refined_cn": "每当我们在某件事上遭遇挫败，都可以选择从中探寻我们本该汲取的教训。",
                "cn": "每当我们在某件事上遭遇挫败，都可以选择从中探寻我们本该汲取的教训。",
                "syntax_points": [
                    {"label": "句子主干", "text": "we can choose to look for the lesson。"},
                    {"label": "修饰成分", "text": "Every time 引导时间状语从句（“每当……”）；we're meant to learn 为省略关系代词 that/which 的定语从句，修饰 the lesson。"}
                ],
                "vocab_points": [
                    {"term": "fail at something", "note": "在某件事上失败/遭遇挫败。"},
                    {"term": "be meant to do", "note": "应当做，本该做，注定要……"}
                ],
                "scoring_points": [
                    {"phrase": "Every time we fail at something", "score": 0.5, "guide": "Every time 作连词引导时间状语从句，译为“每当……”。", "vocab": []},
                    {"phrase": "the lesson we're meant to learn", "score": 1.0, "guide": "be meant to learn 译为“本该汲取的/应该学到的”，lesson 译为“教训”。", "vocab": [{"word": "lesson", "pos": "n.", "common": "教训；经验", "context": "从失败中汲取的教训"}]}
                ],
                "grammar_breakdown": "Every time 引导时间状语从句；句末为省略关系代词的定语从句。",
                "reassembly_notes": "定语从句 we're meant to learn 前置修饰 lesson，译为“我们本该汲取的教训”。"
            },
            {
                "sid": 6,
                "pid": 1,
                "en": "These lessons are very important; they're how we grow, and how we keep from making that same mistake again.",
                "slashed_text": "These lessons are very important; / they're how we grow, / and how we keep from making that same mistake again.",
                "literal_cn": "这些教训非常重要；它们是我们成长的方式，也是我们避免再犯同样错误的方式。",
                "refined_cn": "这些教训至关重要：它们是我们成长的阶梯，也是我们避免重蹈覆辙的关键。",
                "cn": "这些教训至关重要：它们是我们成长的阶梯，也是我们避免重蹈覆辙的关键。",
                "syntax_points": [
                    {"label": "句子主干", "text": "分号连接两个并列分句。后半句中 they 为主语，are 为系动词，两个并列的 how 引导表语从句。"}
                ],
                "vocab_points": [
                    {"term": "keep from doing sth.", "note": "阻止/避免做某事（此处为避免犯错）。"},
                    {"term": "make that same mistake again", "note": "再犯同样的错误，精译可用成语“重蹈覆辙”。"}
                ],
                "scoring_points": [
                    {"phrase": "they're how we grow", "score": 0.5, "guide": "how 引导表语从句，可增译名词译为“成长的方式/阶梯”。", "vocab": []},
                    {"phrase": "how we keep from making that same mistake again", "score": 1.0, "guide": "keep from doing 译为“避免做……”；making that same mistake again 可译为“重蹈覆辙”。", "vocab": [{"word": "keep from", "pos": "phr.", "common": "阻止；克制；避免", "context": "避免再次犯错"}]}
                ],
                "grammar_breakdown": "分号前后为解释关系（可译为冒号）；how 引导两个并列表语从句。",
                "reassembly_notes": "将抽象的 how 表语从句具象化增词为“成长的阶梯”与“避免重蹈覆辙的关键”。"
            },
            {
                "sid": 7,
                "pid": 1,
                "en": "Failures stop us only if we let them.",
                "slashed_text": "Failures stop us / only if we let them.",
                "literal_cn": "只有当我们允许失败阻止我们时，它们才会阻止我们。",
                "refined_cn": "唯有在我们任由失败摆布时，它才会阻挡我们前行的脚步。",
                "cn": "唯有在我们任由失败摆布时，它才会阻挡我们前行的脚步。",
                "syntax_points": [
                    {"label": "句子主干", "text": "Failures stop us 为主句。"},
                    {"label": "修饰成分", "text": "only if 引导条件状语从句（“只有当……”）；let them 后省略了动词原形 stop us，避免重复。"}
                ],
                "vocab_points": [
                    {"term": "only if", "note": "只有当……才，唯有在……时。"},
                    {"term": "let them [stop us]", "note": "允许/任由它们（阻止我们）。"}
                ],
                "scoring_points": [
                    {"phrase": "Failures stop us only if we let them", "score": 1.5, "guide": "only if 译为“只有当/唯有在……”；注意句末省略了 stop us，且汉语通常先说条件后说结果。", "vocab": []}
                ],
                "grammar_breakdown": "only if 条件状语从句后置，且从句使用省略结构 let them (stop us)。",
                "reassembly_notes": "汉语重条件前置，将 only if we let them 提前，译为“唯有在我们任由失败摆布时，它才会……”。"
            },
            {
                "sid": 8,
                "pid": 2,
                "en": "Failure can also teach us things about ourselves that we would never have learned otherwise.",
                "slashed_text": "Failure can also teach us things about ourselves / [that we would never have learned otherwise].",
                "literal_cn": "失败还能教给我们关于我们自己的、否则我们永远不会学到的东西。",
                "refined_cn": "此外，失败还能让我们认清自身，学到若非如此便无从知晓的道理。",
                "cn": "此外，失败还能让我们认清自身，学到若非如此便无从知晓的道理。",
                "syntax_points": [
                    {"label": "句子主干", "text": "Failure can also teach us things（双宾语结构：teach sb. sth.）。"},
                    {"label": "修饰成分", "text": "about ourselves 后置修饰 things；that 引导定语从句同样修饰 things。"},
                    {"label": "虚拟语气", "text": "otherwise（否则/要不然）提示与过去或假设情况相反的虚拟语气 would never have learned。"}
                ],
                "vocab_points": [
                    {"term": "things about ourselves", "note": "关于我们自己的道理/真相。"},
                    {"term": "otherwise", "note": "否则，不然，若非如此（含虚拟条件）。"}
                ],
                "scoring_points": [
                    {"phrase": "teach us things about ourselves", "score": 0.5, "guide": "译为“教给我们关于自己的东西/让我们认清自身”。", "vocab": []},
                    {"phrase": "that we would never have learned otherwise", "score": 1.0, "guide": "定语从句含虚拟语气，otherwise 译为“否则/若非如此”。", "vocab": [{"word": "otherwise", "pos": "adv.", "common": "否则；不然", "context": "若没有经历失败的话"}]}
                ],
                "grammar_breakdown": "things 同时被介词短语 about ourselves 和长定语从句 that... 修饰，形成双重后置定语。",
                "reassembly_notes": "采用分译法将 teach us things about ourselves 与定语从句拆开，先说“让我们认清自身”，再说“学到若非如此便无从知晓的道理”。"
            },
            {
                "sid": 9,
                "pid": 2,
                "en": "For instance, failure can help you discover how strong a person you are.",
                "slashed_text": "For instance, / failure can help you discover / how strong a person you are.",
                "literal_cn": "例如，失败可以帮助你发现你是一个多么坚强的人。",
                "refined_cn": "比如，失败能帮你发掘自己究竟有多坚强；",
                "cn": "比如，失败能帮你发掘自己究竟有多坚强。",
                "syntax_points": [
                    {"label": "句子主干", "text": "failure can help you discover...。"},
                    {"label": "宾语从句", "text": "how strong a person you are 为感叹句语序作 discover 的宾语从句（how + adj. + a/an + n. + 主 + 谓）。"}
                ],
                "vocab_points": [
                    {"term": "for instance", "note": "例如，比如。"},
                    {"term": "strong", "note": "（性格、意志）坚强的，而非“强壮的”。"}
                ],
                "scoring_points": [
                    {"phrase": "how strong a person you are", "score": 1.0, "guide": "how + adj. + a + n. 感叹语序，strong 译为“坚强的”，译为“你是一个多么坚强的人/自己究竟有多坚强”。", "vocab": []}
                ],
                "grammar_breakdown": "discover 后接 how 引导的感叹形式宾语从句。",
                "reassembly_notes": "“how strong a person you are”可压缩精译为“自己究竟有多坚强”，简洁有力。"
            },
            {
                "sid": 10,
                "pid": 2,
                "en": "Failing at something can help you discover your truest friends, or help you find unexpected motivation to succeed.",
                "slashed_text": "Failing at something / can help you discover your truest friends, / or help you find unexpected motivation to succeed.",
                "literal_cn": "在某件事上失败可以帮助你发现你最真正的朋友，或者帮助你找到意想不到的成功动力。",
                "refined_cn": "某次失利也能帮你识得谁才是真正的朋友，或是帮你找到意想不到的动力去走向成功。",
                "cn": "某次失利也能帮你识得谁才是真正的朋友，或是帮你找到意想不到的动力去走向成功。",
                "syntax_points": [
                    {"label": "句子主干", "text": "动名词短语 Failing at something 作主语；谓语为并列结构 can help... or help...。"},
                    {"label": "修饰成分", "text": "不定式 to succeed 作后置定语修饰 motivation。"}
                ],
                "vocab_points": [
                    {"term": "truest friends", "note": "最真正的朋友，患难见真情的朋友。"},
                    {"term": "unexpected motivation", "note": "意想不到的动力。"}
                ],
                "scoring_points": [
                    {"phrase": "Failing at something", "score": 0.5, "guide": "动名词短语作主语，译为“在某件事上失败/某次失利”。", "vocab": []},
                    {"phrase": "discover your truest friends", "score": 0.5, "guide": "truest friends 译为“最真正的朋友/谁才是真正的朋友”。", "vocab": []},
                    {"phrase": "find unexpected motivation to succeed", "score": 0.5, "guide": "unexpected motivation 译为“意想不到的动力”。", "vocab": [{"word": "motivation", "pos": "n.", "common": "动力；动机", "context": "取得成功的动力"}]}
                ],
                "grammar_breakdown": "动名词短语作主语 + or 连接的两个并列谓语结构。",
                "reassembly_notes": "discover your truest friends 略作润色译为“识得谁才是真正的朋友”，呼应中文表达习惯。"
            }
        ]
    },
    2021: {
        "title": "2021 年考研英语（二）英译汉 Translation",
        "qid": 46,
        "points": 15,
        "directions": "Translate the following text into Chinese. Write your translation on the ANSWER SHEET. (15 points)",
        "source_text": "We tend to think that friends and family members are our biggest sources of connection, laughter, and warmth. While that may well be true, researchers have also recently found that interacting with strangers actually brings a boost in mood and feelings of belonging that we didn't expect.\n\nIn one series of studies, researchers instructed Chicago-area commuters using public transportation to strike up a conversation with someone near them. On average, participants who followed this instruction felt better than those who had been told to stand or sit in silence. The researchers also argued that when we shy away from casual interactions with strangers, it is often due to a misplaced anxiety that they might not want to talk to us. Much of the time, however, this belief is false. As it turns out, many people are actually perfectly willing to talk—and may even be flattered to receive your attention.",
        "full_literal_translation": "我们倾向于认为朋友和家人是我们联系、欢笑和温暖的最大来源。虽然这很可能是真的，但研究人员最近也发现，与陌生人互动实际上会带来我们没有预料到的情绪提升和归属感。\n\n在一系列研究中，研究人员指示乘坐公共交通工具的芝加哥地区通勤者与他们附近的某个人开始交谈。平均而言，遵循这一指示的参与者比那些被告知静静站着或坐着的人感觉更好。研究人员还认为，当我们回避与陌生人的随意互动时，这往往是因为一种放错了地方的焦虑，即他们可能不想和我们说话。然而，很多时候，这种想法是错误的。事实证明，许多人实际上非常愿意交谈——甚至可能会因为受到你的关注而感到受宠若惊。",
        "full_refined_translation": "我们通常认为，亲友才是情感联结、欢声笑语与温暖关怀的最大源泉。诚然如此，但研究人员近期却发现，与陌生人交流互动，实则能带来出乎意料的情绪提振与归属感。\n\n在一系列研究中，研究人员要求芝加哥地区乘坐公共交通的通勤者主动与身旁的人攀谈。总体来看，照做的人比那些被要求全程静立或默坐的人心情更愉悦。研究人员还指出，我们之所以回避与陌生人随口搭讪，往往源于一种无谓的担忧——总觉得对方或许不愿和我们说话。然而多数情况下，这种顾虑纯属多虑。事实证明，其实很多人都非常乐意聊天——甚至可能因得到你的关注而倍感荣幸。",
        "reference_translation": "我们通常认为，亲友才是情感联结、欢声笑语与温暖关怀的最大源泉。诚然如此，但研究人员近期却发现，与陌生人交流互动，实则能带来出乎意料的情绪提振与归属感。\n\n在一系列研究中，研究人员要求芝加哥地区乘坐公共交通的通勤者主动与身旁的人攀谈。总体来看，照做的人比那些被要求全程静立或默坐的人心情更愉悦。研究人员还指出，我们之所以回避与陌生人随口搭讪，往往源于一种无谓的担忧——总觉得对方或许不愿和我们说话。然而多数情况下，这种顾虑纯属多虑。事实证明，其实很多人都非常乐意聊天——甚至可能因得到你的关注而倍感荣幸。",
        "paragraphs": [
            {
                "pid": 0,
                "text": "We tend to think that friends and family members are our biggest sources of connection, laughter, and warmth. While that may well be true, researchers have also recently found that interacting with strangers actually brings a boost in mood and feelings of belonging that we didn't expect."
            },
            {
                "pid": 1,
                "text": "In one series of studies, researchers instructed Chicago-area commuters using public transportation to strike up a conversation with someone near them. On average, participants who followed this instruction felt better than those who had been told to stand or sit in silence. The researchers also argued that when we shy away from casual interactions with strangers, it is often due to a misplaced anxiety that they might not want to talk to us. Much of the time, however, this belief is false. As it turns out, many people are actually perfectly willing to talk—and may even be flattered to receive your attention."
            }
        ],
        "sentences": [
            {
                "sid": 1,
                "pid": 0,
                "en": "We tend to think that friends and family members are our biggest sources of connection, laughter, and warmth.",
                "slashed_text": "We tend to think / that friends and family members / are our biggest sources / of connection, laughter, and warmth.",
                "literal_cn": "我们倾向于认为朋友和家人是我们联系、欢笑和温暖的最大来源。",
                "refined_cn": "我们通常认为，亲友才是情感联结、欢声笑语与温暖关怀的最大源泉。",
                "cn": "我们通常认为，亲友才是情感联结、欢声笑语与温暖关怀的最大源泉。",
                "syntax_points": [
                    {"label": "句子主干", "text": "We tend to think that...（that 引导宾语从句）。"},
                    {"label": "修饰成分", "text": "of connection, laughter, and warmth 为并列介词短语作后置定语，修饰 sources。"}
                ],
                "vocab_points": [
                    {"term": "tend to think", "note": "倾向于认为，通常会认为。"},
                    {"term": "connection", "note": "（人与人之间的）情感联结，亲近感。"}
                ],
                "scoring_points": [
                    {"phrase": "tend to think", "score": 0.5, "guide": "译为“往往认为/通常认为”，避免生硬直译“倾向于认为”。", "vocab": []},
                    {"phrase": "sources of connection, laughter, and warmth", "score": 1.0, "guide": "connection 译为“情感联结/联系”，三大抽象名词可适当四字化润色。", "vocab": [{"word": "connection", "pos": "n.", "common": "联系；情感联结", "context": "人际情感纽带"}]}
                ],
                "grammar_breakdown": "主谓宾从句结构，后置定语包含三个并列抽象名词。",
                "reassembly_notes": "将 friends and family members 简明译为“亲友”，三大抽象名词顺畅对仗。"
            },
            {
                "sid": 2,
                "pid": 0,
                "en": "While that may well be true, researchers have also recently found that interacting with strangers actually brings a boost in mood and feelings of belonging that we didn't expect.",
                "slashed_text": "While that may well be true, / researchers have also recently found / that interacting with strangers / actually brings a boost in mood and feelings of belonging / [that we didn't expect].",
                "literal_cn": "虽然这很可能是真的，但研究人员最近也发现，与陌生人互动实际上会带来我们没有预料到的情绪提升和归属感。",
                "refined_cn": "诚然如此，但研究人员近期却发现，与陌生人交流互动，实则能带来出乎意料的情绪提振与归属感。",
                "cn": "诚然如此，但研究人员近期却发现，与陌生人交流互动，实则能带来出乎意料的情绪提振与归属感。",
                "syntax_points": [
                    {"label": "句子主干", "text": "researchers have also recently found that...（that 引导宾语从句）。"},
                    {"label": "让步状语", "text": "While that may well be true 为让步状语从句（While 译为“虽然/诚然”）。"},
                    {"label": "定语从句", "text": "句末 that we didn't expect 修饰先行词 a boost in mood and feelings of belonging。"}
                ],
                "vocab_points": [
                    {"term": "may well be true", "note": "很可能是真的，诚然如此（may well 表“很有可能”）。"},
                    {"term": "a boost in mood", "note": "情绪的提升/提振，心情变好。"},
                    {"term": "feelings of belonging", "note": "归属感。"}
                ],
                "scoring_points": [
                    {"phrase": "While that may well be true", "score": 0.5, "guide": "While 表让步，may well 译为“很可能/诚然”。", "vocab": []},
                    {"phrase": "interacting with strangers actually brings a boost in mood", "score": 1.0, "guide": "动名词短语作主语；a boost in mood 译为“情绪的提振”。", "vocab": [{"word": "boost", "pos": "n.", "common": "提升；推动", "context": "情绪提振"}]},
                    {"phrase": "feelings of belonging that we didn't expect", "score": 1.0, "guide": "feelings of belonging 译为“归属感”；that we didn't expect 译为“出乎意料的/始料未及的”。", "vocab": [{"word": "belonging", "pos": "n.", "common": "归属感", "context": "社会归属感"}]}
                ],
                "grammar_breakdown": "While 让步状语从句 + 主句 + that 宾语从句（动名词作主语） + that 定语从句。",
                "reassembly_notes": "定语从句 that we didn't expect 凝练为四字定语“出乎意料的”前置修饰宾语。"
            },
            {
                "sid": 3,
                "pid": 1,
                "en": "In one series of studies, researchers instructed Chicago-area commuters using public transportation to strike up a conversation with someone near them.",
                "slashed_text": "In one series of studies, / researchers instructed Chicago-area commuters [using public transportation] / to strike up a conversation / with someone near them.",
                "literal_cn": "在一系列研究中，研究人员指示乘坐公共交通工具的芝加哥地区通勤者与他们附近的某个人开始交谈。",
                "refined_cn": "在一系列研究中，研究人员要求芝加哥地区乘坐公共交通的通勤者主动与身旁的人攀谈。",
                "cn": "在一系列研究中，研究人员要求芝加哥地区乘坐公共交通的通勤者主动与身旁的人攀谈。",
                "syntax_points": [
                    {"label": "句子主干", "text": "researchers instructed Chicago-area commuters... to strike up a conversation...（instruct sb. to do sth. 指示/要求某人做某事）。"},
                    {"label": "修饰成分", "text": "using public transportation 为现在分词短语作后置定语，修饰 commuters；near them 修饰 someone。"}
                ],
                "vocab_points": [
                    {"term": "commuters", "note": "通勤者（每天往返于住处和工作地的人）。"},
                    {"term": "strike up a conversation", "note": "主动搭话，开始攀谈（高频固定搭配）。"}
                ],
                "scoring_points": [
                    {"phrase": "Chicago-area commuters using public transportation", "score": 1.0, "guide": "分词短语前置修饰 commuters，译为“芝加哥地区乘坐公共交通的通勤者”。", "vocab": [{"word": "commuter", "pos": "n.", "common": "通勤者", "context": "上下班乘车人群"}]},
                    {"phrase": "strike up a conversation with someone near them", "score": 1.0, "guide": "strike up a conversation 译为“主动攀谈/发起交谈”。", "vocab": [{"word": "strike up", "pos": "phr.", "common": "开始（交谈/友谊）", "context": "主动搭讪攀谈"}]}
                ],
                "grammar_breakdown": "instruct sb. to do sth. 核心句型，中间插入现在分词短语作宾语后置定语。",
                "reassembly_notes": "将 using public transportation 前置修饰 commuters，避免译文拖沓。"
            },
            {
                "sid": 4,
                "pid": 1,
                "en": "On average, participants who followed this instruction felt better than those who had been told to stand or sit in silence.",
                "slashed_text": "On average, / participants [who followed this instruction] / felt better / than those [who had been told to stand or sit in silence].",
                "literal_cn": "平均而言，遵循这一指示的参与者比那些被告知静静站着或坐着的人感觉更好。",
                "refined_cn": "总体来看，照做的人比那些被要求全程静立或默坐的人心情更愉悦。",
                "cn": "总体来看，照做的人比那些被要求全程静立或默坐的人心情更愉悦。",
                "syntax_points": [
                    {"label": "句子主干", "text": "participants felt better than those...（比较级结构）。"},
                    {"label": "修饰成分", "text": "两个 who 引导的定语从句分别修饰 participants 和指示代词 those。"}
                ],
                "vocab_points": [
                    {"term": "on average", "note": "平均而言，总体来看。"},
                    {"term": "in silence", "note": "安静地，沉默地（stand or sit in silence 静立或默坐）。"}
                ],
                "scoring_points": [
                    {"phrase": "participants who followed this instruction", "score": 0.5, "guide": "译为“遵循这一指示的参与者/照做的人”。", "vocab": []},
                    {"phrase": "than those who had been told to stand or sit in silence", "score": 1.0, "guide": "those 指代同类人群，in silence 译为“静静地/沉默地”。", "vocab": []}
                ],
                "grammar_breakdown": "对称比较结构，前后各自带一个 who 引导的定语从句。",
                "reassembly_notes": "将 stand or sit in silence 精炼为“静立或默坐”，节奏工整。"
            },
            {
                "sid": 5,
                "pid": 1,
                "en": "The researchers also argued that when we shy away from casual interactions with strangers, it is often due to a misplaced anxiety that they might not want to talk to us.",
                "slashed_text": "The researchers also argued / that [when we shy away from casual interactions with strangers], / it is often due to a misplaced anxiety / [that they might not want to talk to us].",
                "literal_cn": "研究人员还认为，当我们回避与陌生人的随意互动时，这往往是因为一种放错了地方的焦虑，即他们可能不想和我们说话。",
                "refined_cn": "研究人员还指出，我们之所以回避与陌生人随口搭讪，往往源于一种无谓的担忧——总觉得对方或许不愿和我们说话。",
                "cn": "研究人员还指出，我们之所以回避与陌生人随口搭讪，往往源于一种无谓的担忧——总觉得对方或许不愿和我们说话。",
                "syntax_points": [
                    {"label": "句子主干", "text": "The researchers also argued that...（that 引导宾语从句）。"},
                    {"label": "内部结构", "text": "宾语从句中含 when 引导的时间/条件状语从句，主句为 it is often due to a misplaced anxiety；末尾 that 引导同位语从句，解释说明 anxiety 的具体内容。"}
                ],
                "vocab_points": [
                    {"term": "shy away from", "note": "回避，躲避，因胆怯而避开。"},
                    {"term": "casual interactions", "note": "随意的互动，随口搭讪。"},
                    {"term": "misplaced anxiety", "note": "毫无必要的担忧，放错地方的焦虑（考研高频熟词僻义）。"}
                ],
                "scoring_points": [
                    {"phrase": "shy away from casual interactions", "score": 1.0, "guide": "shy away from 译为“回避/避开”；casual interactions 译为“随意的互动/搭讪”。", "vocab": [{"word": "shy away from", "pos": "phr.", "common": "回避；退缩", "context": "因害羞或担心而避开交谈"}]},
                    {"phrase": "due to a misplaced anxiety that they might not want to talk to us", "score": 1.5, "guide": "misplaced anxiety 译为“无谓的担忧/不必要的焦虑”；that 同位语从句用破折号引出。", "vocab": [{"word": "misplaced", "pos": "adj.", "common": "放错地方的；不合时宜的；无谓的", "context": "不必要的担忧"}]}
                ],
                "grammar_breakdown": "宾语从句内嵌状语从句 + 同位语从句，属于三层嵌套长难句，是2021年真题的核心得分点。",
                "reassembly_notes": "when... it is often due to... 处理为“之所以……往往源于……”因果句式；同位语从句用破折号顺译。"
            },
            {
                "sid": 6,
                "pid": 1,
                "en": "Much of the time, however, this belief is false.",
                "slashed_text": "Much of the time, / however, / this belief is false.",
                "literal_cn": "然而，很多时候，这种想法是错误的。",
                "refined_cn": "然而多数情况下，这种顾虑纯属多虑。",
                "cn": "然而多数情况下，这种顾虑纯属多虑。",
                "syntax_points": [
                    {"label": "句子主干", "text": "this belief is false。however 为插入副词表转折；Much of the time 作时间状语。"}
                ],
                "vocab_points": [
                    {"term": "much of the time", "note": "很多时候，多数情况下。"},
                    {"term": "belief", "note": "想法，看法，顾虑（结合前文指“对方不愿交谈”的预设想法）。"}
                ],
                "scoring_points": [
                    {"phrase": "Much of the time, however, this belief is false", "score": 1.0, "guide": "however 提至句首译为“然而”；belief 结合语境可译为“想法/顾虑”。", "vocab": []}
                ],
                "grammar_breakdown": "简单句，插入语 however 需调至句首翻译。",
                "reassembly_notes": "将 this belief is false 结合上下文润色为“这种顾虑纯属多虑”或“这种想法往往是错的”。"
            },
            {
                "sid": 7,
                "pid": 1,
                "en": "As it turns out, many people are actually perfectly willing to talk—and may even be flattered to receive your attention.",
                "slashed_text": "As it turns out, / many people are actually perfectly willing to talk / —and may even be flattered / to receive your attention.",
                "literal_cn": "事实证明，许多人实际上非常愿意交谈——甚至可能会因为受到你的关注而感到受宠若惊。",
                "refined_cn": "事实证明，其实很多人都非常乐意聊天——甚至可能因得到你的关注而倍感荣幸。",
                "cn": "事实证明，其实很多人都非常乐意聊天——甚至可能因得到你的关注而倍感荣幸。",
                "syntax_points": [
                    {"label": "句子主干", "text": "many people are... willing to talk and may even be flattered...。"},
                    {"label": "修饰成分", "text": "As it turns out 为固定非限制性定语从句/插入语（“事实证明/结果发现”）；to receive your attention 为不定式作原因状语，说明 flattered 的原因。"}
                ],
                "vocab_points": [
                    {"term": "as it turns out", "note": "事实证明，结果发现。"},
                    {"term": "perfectly willing", "note": "非常愿意，十分乐意（perfectly 作程度副词，意为“完全地，非常”）。"},
                    {"term": "be flattered to do", "note": "因……而感到荣幸/受宠若惊/高兴。"}
                ],
                "scoring_points": [
                    {"phrase": "As it turns out", "score": 0.5, "guide": "固定搭配，译为“事实证明/结果发现”。", "vocab": []},
                    {"phrase": "perfectly willing to talk", "score": 0.5, "guide": "perfectly 修饰 willing 表程度“非常/十分”，译为“非常乐意聊天”。", "vocab": []},
                    {"phrase": "flattered to receive your attention", "score": 1.0, "guide": "flattered 译为“倍感荣幸/受宠若惊/开心”；不定式表原因。", "vocab": [{"word": "flattered", "pos": "adj.", "common": "感到荣幸的；受宠若惊的", "context": "被人关注而感到高兴"}]}
                ],
                "grammar_breakdown": "As it turns out 作评注性状语；破折号后不定式表原因状语。",
                "reassembly_notes": "perfectly 在此不译为“完美地”，而作程度副词译为“非常、完全”。"
            }
        ]
    },
    2022: {
        "title": "2022 年考研英语（二）英译汉 Translation",
        "qid": 46,
        "points": 15,
        "directions": "Translate the following text into Chinese. Write your translation on the ANSWER SHEET. (15 points)",
        "source_text": "Although we try our best, sometimes our paintings rarely turn out as originally planned. Changes in the light, the limitations of your painting materials, and the lack of experience and technique mean that what you start out trying to achieve may not come to life the way that you expected.\n\nAlthough this can be frustrating and disappointing, it turns out that this can actually be good for you. Unexpected results have two benefits: you pretty quickly learn to deal with disappointment and realise that when one door closes, another opens. You also quickly learn to adapt and come up with creative solutions to the problems the painting presents, and thinking outside the box will become your second nature.\n\nIn fact, creative problem-solving skills are incredibly useful in daily life, with which you're more likely to be able to find a solution when a problem arises.",
        "full_literal_translation": "尽管我们尽了最大努力，有时我们的画作也很少会像最初计划的那样呈现。光线的变化、你绘画材料的局限性以及经验和技巧的缺乏，意味着你一开始试图实现的效果可能不会以你预期的方式呈现出来。\n\n虽然这可能会令人沮丧和失望，但事实证明这实际上可能对你有好处。意想不到的结果有两个好处：你会很快学会应对失望，并意识到当一扇门关闭时，另一扇门会打开。你还会很快学会适应并想出创造性的解决方案来解决画作带来的问题，跳出框框思考将成为你的第二天性。\n\n事实上，创造性解决问题的能力在日常生活中非常有用，凭借这种能力，当问题出现时，你更有可能找到解决方案。",
        "full_refined_translation": "尽管我们竭尽全力，有时画作的最终效果却很难如最初设想的那般呈现。光影的变化、绘画材料的局限，加之经验与技法的不足，都意味着你起初力求达成的画面，未必会按照你预想的方式跃然纸上。\n\n虽然这不免让人感到沮丧与失望，但事实证明，这种状况其实大有裨益。出乎意料的结果有两大好处：你会很快学会坦然面对失望，并悟出“一扇门关上，另一扇门便会开启”的道理；你还会迅速学会随机应变，针对画作中出现的问题想出富有创意的解决办法，跳出固有思维模式也会逐渐成为你的第二天性。\n\n事实上，创造性解决问题的能力在日常生活中可谓大有用处——凭借这种能力，每当难题出现时，你便更有可能找到化解之道。",
        "reference_translation": "尽管我们竭尽全力，有时画作的最终效果却很难如最初设想的那般呈现。光影的变化、绘画材料的局限，加之经验与技法的不足，都意味着你起初力求达成的画面，未必会按照你预想的方式跃然纸上。\n\n虽然这不免让人感到沮丧与失望，但事实证明，这种状况其实大有裨益。出乎意料的结果有两大好处：你会很快学会坦然面对失望，并悟出“一扇门关上，另一扇门便会开启”的道理；你还会迅速学会随机应变，针对画作中出现的问题想出富有创意的解决办法，跳出固有思维模式也会逐渐成为你的第二天性。\n\n事实上，创造性解决问题的能力在日常生活中可谓大有用处——凭借这种能力，每当难题出现时，你便更有可能找到化解之道。",
        "paragraphs": [
            {
                "pid": 0,
                "text": "Although we try our best, sometimes our paintings rarely turn out as originally planned. Changes in the light, the limitations of your painting materials, and the lack of experience and technique mean that what you start out trying to achieve may not come to life the way that you expected."
            },
            {
                "pid": 1,
                "text": "Although this can be frustrating and disappointing, it turns out that this can actually be good for you. Unexpected results have two benefits: you pretty quickly learn to deal with disappointment and realise that when one door closes, another opens. You also quickly learn to adapt and come up with creative solutions to the problems the painting presents, and thinking outside the box will become your second nature."
            },
            {
                "pid": 2,
                "text": "In fact, creative problem-solving skills are incredibly useful in daily life, with which you're more likely to be able to find a solution when a problem arises."
            }
        ],
        "sentences": [
            {
                "sid": 1,
                "pid": 0,
                "en": "Although we try our best, sometimes our paintings rarely turn out as originally planned.",
                "slashed_text": "Although we try our best, / sometimes our paintings / rarely turn out / as originally planned.",
                "literal_cn": "尽管我们尽了最大努力，有时我们的画作也很少会像最初计划的那样呈现。",
                "refined_cn": "尽管我们竭尽全力，有时画作的最终效果却很难如最初设想的那般呈现。",
                "cn": "尽管我们竭尽全力，有时画作的最终效果却很难如最初设想的那般呈现。",
                "syntax_points": [
                    {"label": "句子主干", "text": "our paintings rarely turn out...。"},
                    {"label": "修饰成分", "text": "Although 引导让步状语从句；as originally planned 为方式状语从句的省略形式（省略了 they were）。"}
                ],
                "vocab_points": [
                    {"term": "turn out", "note": "结果是，最终呈现为。"},
                    {"term": "as originally planned", "note": "如最初计划的那样。"}
                ],
                "scoring_points": [
                    {"phrase": "Although we try our best", "score": 0.5, "guide": "Although 引导让步，英语不用 but，汉语可加“却”呼应。", "vocab": []},
                    {"phrase": "rarely turn out as originally planned", "score": 1.0, "guide": "turn out 译为“结果/最终呈现”；as originally planned 译为“如最初设想的那样”。", "vocab": [{"word": "turn out", "pos": "phr.", "common": "结果是；最终证明", "context": "画作最终呈现效果"}]}
                ],
                "grammar_breakdown": "Although 让步状语从句 + 主句 + 省略式方式状语从句 as originally planned。",
                "reassembly_notes": "英文 Although 不与 but 连用，但译成中文“尽管……（却）……”更符合汉语语感。"
            },
            {
                "sid": 2,
                "pid": 0,
                "en": "Changes in the light, the limitations of your painting materials, and the lack of experience and technique mean that what you start out trying to achieve may not come to life the way that you expected.",
                "slashed_text": "Changes in the light, / the limitations of your painting materials, / and the lack of experience and technique / mean / that [what you start out trying to achieve] / may not come to life / [the way that you expected].",
                "literal_cn": "光线的变化、你绘画材料的局限性以及经验和技巧的缺乏，意味着你一开始试图实现的效果可能不会以你预期的方式呈现出来。",
                "refined_cn": "光影的变化、绘画材料的局限，加之经验与技法的不足，都意味着你起初力求达成的画面，未必会按照你预想的方式跃然纸上。",
                "cn": "光影的变化、绘画材料的局限，加之经验与技法的不足，都意味着你起初力求达成的画面，未必会按照你预想的方式跃然纸上。",
                "syntax_points": [
                    {"label": "句子主干", "text": "三个并列名词短语共同作主语，谓语动词为 mean，后接 that 引导的宾语从句。"},
                    {"label": "宾语从句内部", "text": "what you start out trying to achieve 为主语从句；may not come to life 为谓语；the way that you expected 为方式状语（the way 后接定语从句）。"}
                ],
                "vocab_points": [
                    {"term": "limitations", "note": "局限性，限制。"},
                    {"term": "come to life", "note": "变得栩栩如生，呈现出来（绘画语境可雅译为“跃然纸上”）。"}
                ],
                "scoring_points": [
                    {"phrase": "Changes in the light, the limitations of your painting materials, and the lack of experience and technique", "score": 1.0, "guide": "三个并列主语准确翻译：光线变化、材料局限、经验与技巧不足。", "vocab": []},
                    {"phrase": "what you start out trying to achieve may not come to life", "score": 1.0, "guide": "what 主语从句译为“你起初试图实现的效果/画面”；come to life 译为“呈现/栩栩如生/跃然纸上”。", "vocab": [{"word": "come to life", "pos": "phr.", "common": "苏醒；栩栩如生；呈现", "context": "画作达到理想效果"}]},
                    {"phrase": "the way that you expected", "score": 0.5, "guide": "the way 作方式状语，译为“按照你预想的方式”。", "vocab": []}
                ],
                "grammar_breakdown": "三并列主语 + mean + 宾语从句（内嵌 what 主语从句 + the way 定语从句），是2022年最核心的长难句。",
                "reassembly_notes": "英语第二人称泛指 your 可根据汉语习惯适当弱化（如“你的绘画材料”略去“你的”）。"
            },
            {
                "sid": 3,
                "pid": 1,
                "en": "Although this can be frustrating and disappointing, it turns out that this can actually be good for you.",
                "slashed_text": "Although this can be frustrating and disappointing, / it turns out / that this can actually be good for you.",
                "literal_cn": "虽然这可能会令人沮丧和失望，但事实证明这实际上可能对你有好处。",
                "refined_cn": "虽然这不免让人感到沮丧与失望，但事实证明，这种状况其实大有裨益。",
                "cn": "虽然这不免让人感到沮丧与失望，但事实证明，这种状况其实大有裨益。",
                "syntax_points": [
                    {"label": "句子主干", "text": "it turns out that...（it 为形式主语，that 引导主语从句，意为“事实证明/结果发现”）。"},
                    {"label": "修饰成分", "text": "Although 引导让步状语从句。"}
                ],
                "vocab_points": [
                    {"term": "frustrating and disappointing", "note": "令人沮丧和失望的（-ing 形容词修饰事物）。"},
                    {"term": "be good for you", "note": "对你有好处，大有裨益。"}
                ],
                "scoring_points": [
                    {"phrase": "frustrating and disappointing", "score": 0.5, "guide": "译为“令人沮丧与失望的”。", "vocab": [{"word": "frustrating", "pos": "adj.", "common": "令人沮丧的；令人受挫的", "context": "画作未达预期的挫败感"}]},
                    {"phrase": "it turns out that this can actually be good for you", "score": 1.0, "guide": "it turns out that 译为“事实证明”；be good for you 译为“对你有好处/大有裨益”。", "vocab": []}
                ],
                "grammar_breakdown": "Although 让步状语从句 + it turns out that... 形式主语从句。",
                "reassembly_notes": "this 指代前文“画作不如预期”这件事，可具象化译为“这种状况”。"
            },
            {
                "sid": 4,
                "pid": 1,
                "en": "Unexpected results have two benefits: you pretty quickly learn to deal with disappointment and realise that when one door closes, another opens.",
                "slashed_text": "Unexpected results have two benefits: / you pretty quickly learn to deal with disappointment / and realise / that [when one door closes], / another opens.",
                "literal_cn": "意想不到的结果有两个好处：你会很快学会应对失望，并意识到当一扇门关闭时，另一扇门会打开。",
                "refined_cn": "出乎意料的结果有两大好处：你会很快学会坦然面对失望，并悟出“一扇门关上，另一扇门便会开启”的道理；",
                "cn": "出乎意料的结果有两大好处：你会很快学会坦然面对失望，并悟出“一扇门关上，另一扇门便会开启”的道理。",
                "syntax_points": [
                    {"label": "句子主干", "text": "冒号前为主句；冒号后解释第一个好处：you... learn... and realise that...。"},
                    {"label": "从句结构", "text": "realise 后接 that 宾语从句，其中包含 when 引导的时间状语从句。"}
                ],
                "vocab_points": [
                    {"term": "pretty quickly", "note": "相当快地，很快（pretty 作副词表“相当，很”）。"},
                    {"term": "deal with disappointment", "note": "应对失望，面对失落情绪。"},
                    {"term": "when one door closes, another opens", "note": "一扇门关上，另一扇门会打开（西方谚语，比喻绝处逢生、柳暗花明）。"}
                ],
                "scoring_points": [
                    {"phrase": "pretty quickly learn to deal with disappointment", "score": 1.0, "guide": "pretty quickly 译为“很快”；deal with disappointment 译为“应对失望/面对挫败”。", "vocab": []},
                    {"phrase": "when one door closes, another opens", "score": 1.0, "guide": "谚语直译即可保留形象感，“一扇门关上，另一扇门便会开启”。", "vocab": []}
                ],
                "grammar_breakdown": "冒号引出具体阐述，realise 后嵌套时间状语从句。",
                "reassembly_notes": "realise that... 后增补“……的道理”使中文动词宾语更完整。"
            },
            {
                "sid": 5,
                "pid": 1,
                "en": "You also quickly learn to adapt and come up with creative solutions to the problems the painting presents, and thinking outside the box will become your second nature.",
                "slashed_text": "You also quickly learn to adapt / and come up with creative solutions / to the problems [the painting presents], / and thinking outside the box / will become your second nature.",
                "literal_cn": "你还会很快学会适应并想出创造性的解决方案来解决画作带来的问题，跳出框框思考将成为你的第二天性。",
                "refined_cn": "你还会迅速学会随机应变，针对画作中出现的问题想出富有创意的解决办法，跳出固有思维模式也会逐渐成为你的第二天性。",
                "cn": "你还会迅速学会随机应变，针对画作中出现的问题想出富有创意的解决办法，跳出固有思维模式也会逐渐成为你的第二天性。",
                "syntax_points": [
                    {"label": "句子主干", "text": "and 连接两个并列分句。前句为 You... learn to adapt and come up with...；后句为动名词短语 thinking outside the box 作主语，will become your second nature 为系表结构。"},
                    {"label": "修饰成分", "text": "the painting presents 为省略关系代词 that/which 的定语从句，修饰 the problems。"}
                ],
                "vocab_points": [
                    {"term": "come up with", "note": "想出，提出（办法、主意）。"},
                    {"term": "solutions to...", "note": "……的解决办法（注意介词搭配用 to）。"},
                    {"term": "think outside the box", "note": "跳出固有思维，打破常规思考（习语）。"},
                    {"term": "second nature", "note": "第二天性，习以为常的本能。"}
                ],
                "scoring_points": [
                    {"phrase": "come up with creative solutions to the problems the painting presents", "score": 1.0, "guide": "come up with 译为“想出”；定语从句前置译为“画作中出现的问题”。", "vocab": [{"word": "adapt", "pos": "v.", "common": "适应；随机应变", "context": "根据画面变化调整思路"}]},
                    {"phrase": "thinking outside the box will become your second nature", "score": 1.5, "guide": "thinking outside the box 译为“跳出固有思维模式/打破常规思考”；second nature 译为“第二天性”。", "vocab": [{"word": "outside the box", "pos": "idiom", "common": "打破常规；跳出框架", "context": "创造性思维"}]}
                ],
                "grammar_breakdown": "并列复合句，前半句含定语从句，后半句动名词作主语 + 习语表达。",
                "reassembly_notes": "将定语从句 the painting presents 前置修饰 problems；thinking outside the box 意译为“跳出固有思维模式”。"
            },
            {
                "sid": 6,
                "pid": 2,
                "en": "In fact, creative problem-solving skills are incredibly useful in daily life, with which you're more likely to be able to find a solution when a problem arises.",
                "slashed_text": "In fact, / creative problem-solving skills are incredibly useful in daily life, / with which you're more likely to be able to find a solution / [when a problem arises].",
                "literal_cn": "事实上，创造性解决问题的能力在日常生活中非常有用，凭借这种能力，当问题出现时，你更有可能找到解决方案。",
                "refined_cn": "事实上，创造性解决问题的能力在日常生活中可谓大有用处——凭借这种能力，每当难题出现时，你便更有可能找到化解之道。",
                "cn": "事实上，创造性解决问题的能力在日常生活中可谓大有用处——凭借这种能力，每当难题出现时，你便更有可能找到化解之道。",
                "syntax_points": [
                    {"label": "句子主干", "text": "creative problem-solving skills are incredibly useful in daily life。"},
                    {"label": "非限定从", "text": "with which 引导非限制性定语从句，which 指代前面的 creative problem-solving skills（“凭借这些能力”）；从句内部还嵌套了 when 引导的时间状语从句。"}
                ],
                "vocab_points": [
                    {"term": "problem-solving skills", "note": "解决问题的能力。"},
                    {"term": "incredibly", "note": "极其，非常，令人难以置信地。"},
                    {"term": "arise", "note": "出现，产生（问题、困难等）。"}
                ],
                "scoring_points": [
                    {"phrase": "creative problem-solving skills are incredibly useful", "score": 1.0, "guide": "译为“创造性解决问题的能力极其有用/大有用处”。", "vocab": []},
                    {"phrase": "with which you're more likely to be able to find a solution when a problem arises", "score": 1.5, "guide": "with which 译为“凭借这种能力”；when 从句提前，译为“当难题出现时，你更有可能找到解决之道”。", "vocab": [{"word": "arise", "pos": "v.", "common": "出现；产生", "context": "when a problem arises 当问题出现时"}]}
                ],
                "grammar_breakdown": "介词 + 关系代词（with which）引导非限制性定语从句，且内嵌时间状语从句。",
                "reassembly_notes": "用破折号衔接 with which 从句，并将时间状语从句 when a problem arises 移至“更有可能”之前。"
            }
        ]
    },
    2023: {
        "title": "2023 年考研英语（二）英译汉 Translation",
        "qid": 46,
        "points": 15,
        "directions": "Translate the following text into Chinese. Write your translation on the ANSWER SHEET. (15 points)",
        "source_text": "In the late 18th century, William Wordsworth became famous for his poems about nature. And he was one of the founders of a movement called Romanticism, which celebrated the wonders of the natural world.\n\nPoetry is powerful. Its energy and rhythm can capture a reader, transport them to another world and make them see things differently. Through carefully selected words and phrases, poems can be dramatic, funny, beautiful, moving and inspiring.\n\nNo one knows for sure when poetry began but it has been around for thousands of years, even before people could write. It was a way to tell stories and pass down history. It is closely related to song and even when written it is usually created to be performed out loud. Poems really come to life when they are recited. This can also help with understanding them too, because the rhythm and sounds of the words become clearer.",
        "full_literal_translation": "18世纪末，威廉·华兹华斯因他关于自然的诗歌而闻名。他是一个名为浪漫主义运动的创始人之一，该运动赞美自然界的奇观。\n\n诗歌是充满力量的。它的能量和节奏可以吸引读者，将他们带到另一个世界，让他们以不同的方式看待事物。通过精心挑选的词句，诗歌可以是戏剧性的、有趣的、美丽的、动人的和鼓舞人心的。\n\n没有人确切知道诗歌是何时开始的，但它已经存在了数千年，甚至在人们会写字之前。它是一种讲述故事和传承历史的方式。它与歌曲密切相关，即使在被写下来的时候，通常也是为了被大声表演而创作的。诗歌在被朗诵时才真正变得生动起来。这也有助于理解它们，因为文字的节奏和声音变得更加清晰。",
        "full_refined_translation": "18世纪末，威廉·华兹华斯凭借描绘自然的诗作声名鹊起。他亦是“浪漫主义”运动的奠基人之一，该运动热情讴歌自然界的奇观。\n\n诗歌极具感染力。其蕴含的能量与韵律能够抓住读者的心弦，将他们带入另一个世界，令其以全新的视角看待万物。借由精挑细选的字词句段，诗歌或跌宕起伏，或诙谐幽默，或唯美隽永，或催人泪下，或振奋人心。\n\n无人确知诗歌究竟起源于何时，但它已绵延数千年——甚至早在人类掌握文字之前便已存在。它曾是人们讲故事、传历史的一种方式。诗歌与歌谣渊源颇深；即便见诸文字，创作之初也往往是为了高声吟诵。当诗歌被朗诵出来时，才真正焕发出勃勃生机。不仅如此，朗诵还有助于领会诗意，因为字句的节奏与音韵会随之愈发清晰。",
        "reference_translation": "18世纪末，威廉·华兹华斯凭借描绘自然的诗作声名鹊起。他亦是“浪漫主义”运动的奠基人之一，该运动热情讴歌自然界的奇观。\n\n诗歌极具感染力。其蕴含的能量与韵律能够抓住读者的心弦，将他们带入另一个世界，令其以全新的视角看待万物。借由精挑细选的字词句段，诗歌或跌宕起伏，或诙谐幽默，或唯美隽永，或催人泪下，或振奋人心。\n\n无人确知诗歌究竟起源于何时，但它已绵延数千年——甚至早在人类掌握文字之前便已存在。它曾是人们讲故事、传历史的一种方式。诗歌与歌谣渊源颇深；即便见诸文字，创作之初也往往是为了高声吟诵。当诗歌被朗诵出来时，才真正焕发出勃勃生机。不仅如此，朗诵还有助于领会诗意，因为字句的节奏与音韵会随之愈发清晰。",
        "paragraphs": [
            {
                "pid": 0,
                "text": "In the late 18th century, William Wordsworth became famous for his poems about nature. And he was one of the founders of a movement called Romanticism, which celebrated the wonders of the natural world."
            },
            {
                "pid": 1,
                "text": "Poetry is powerful. Its energy and rhythm can capture a reader, transport them to another world and make them see things differently. Through carefully selected words and phrases, poems can be dramatic, funny, beautiful, moving and inspiring."
            },
            {
                "pid": 2,
                "text": "No one knows for sure when poetry began but it has been around for thousands of years, even before people could write. It was a way to tell stories and pass down history. It is closely related to song and even when written it is usually created to be performed out loud. Poems really come to life when they are recited. This can also help with understanding them too, because the rhythm and sounds of the words become clearer."
            }
        ],
        "sentences": [
            {
                "sid": 1,
                "pid": 0,
                "en": "In the late 18th century, William Wordsworth became famous for his poems about nature.",
                "slashed_text": "In the late 18th century, / William Wordsworth / became famous for / his poems about nature.",
                "literal_cn": "18世纪末，威廉·华兹华斯因他关于自然的诗歌而闻名。",
                "refined_cn": "18世纪末，威廉·华兹华斯凭借描绘自然的诗作声名鹊起。",
                "cn": "18世纪末，威廉·华兹华斯凭借描绘自然的诗作声名鹊起。",
                "syntax_points": [
                    {"label": "句子主干", "text": "William Wordsworth became famous for his poems...。"},
                    {"label": "修饰成分", "text": "In the late 18th century 作时间状语；about nature 作后置定语修饰 poems。"}
                ],
                "vocab_points": [
                    {"term": "William Wordsworth", "note": "威廉·华兹华斯（英国浪漫主义著名诗人）。"},
                    {"term": "become famous for", "note": "因……而闻名，凭借……声名鹊起。"}
                ],
                "scoring_points": [
                    {"phrase": "In the late 18th century", "score": 0.5, "guide": "译为“18世纪末”或“18世纪晚期”。", "vocab": []},
                    {"phrase": "became famous for his poems about nature", "score": 1.0, "guide": "译为“因关于自然的诗歌而闻名/凭借描绘自然的诗作声名鹊起”。", "vocab": []}
                ],
                "grammar_breakdown": "简单句，时间状语前置，主系表 + 介词短语作后置定语。",
                "reassembly_notes": "将 his poems about nature 调整为“描绘自然的诗作”，行文更典雅。"
            },
            {
                "sid": 2,
                "pid": 0,
                "en": "And he was one of the founders of a movement called Romanticism, which celebrated the wonders of the natural world.",
                "slashed_text": "And he was one of the founders / of a movement called Romanticism, / [which celebrated the wonders of the natural world].",
                "literal_cn": "他是一个名为浪漫主义运动的创始人之一，该运动赞美自然界的奇观。",
                "refined_cn": "他亦是“浪漫主义”运动的奠基人之一，该运动热情讴歌自然界的奇观。",
                "cn": "他亦是“浪漫主义”运动的奠基人之一，该运动热情讴歌自然界的奇观。",
                "syntax_points": [
                    {"label": "句子主干", "text": "he was one of the founders of a movement...。"},
                    {"label": "修饰成分", "text": "过去分词短语 called Romanticism 作后置定语修饰 movement；which 引导非限制性定语从句，修饰 a movement。"}
                ],
                "vocab_points": [
                    {"term": "Romanticism", "note": "浪漫主义（文学艺术思潮）。"},
                    {"term": "celebrate", "note": "赞美，歌颂，讴歌（注意熟词僻义，此处非“庆祝”）。"},
                    {"term": "wonders", "note": "奇观，奇迹，奇妙之处。"}
                ],
                "scoring_points": [
                    {"phrase": "founders of a movement called Romanticism", "score": 1.0, "guide": "founders 译为“创始人/奠基人”；Romanticism 译为“浪漫主义”。", "vocab": [{"word": "Romanticism", "pos": "n.", "common": "浪漫主义", "context": "文学艺术运动"}]},
                    {"phrase": "which celebrated the wonders of the natural world", "score": 1.0, "guide": "celebrate 必须译为“赞美/歌颂/讴歌”，不可译为“庆祝”。", "vocab": [{"word": "celebrate", "pos": "v.", "common": "庆祝；歌颂；赞美", "context": "热情讴歌自然奇观"}]}
                ],
                "grammar_breakdown": "过去分词短语作后置定语 + 非限制性定语从句 which...。",
                "reassembly_notes": "非限制性定语从句采用顺译法，重复先行词译为“该运动热情讴歌……”。"
            },
            {
                "sid": 3,
                "pid": 1,
                "en": "Poetry is powerful.",
                "slashed_text": "Poetry / is powerful.",
                "literal_cn": "诗歌是充满力量的。",
                "refined_cn": "诗歌极具感染力。",
                "cn": "诗歌极具感染力。",
                "syntax_points": [
                    {"label": "句子主干", "text": "主系表结构，Poetry 为主语，is powerful 为系表。"}
                ],
                "vocab_points": [
                    {"term": "powerful", "note": "有力量的，极具感染力的。"}
                ],
                "scoring_points": [
                    {"phrase": "Poetry is powerful", "score": 0.5, "guide": "短小精悍的段落主题句，可译为“诗歌充满力量/极具感染力”。", "vocab": []}
                ],
                "grammar_breakdown": "主系表三词主题句，统领第二段。",
                "reassembly_notes": "结合文学语境，powerful 意译为“极具感染力”最为贴切。"
            },
            {
                "sid": 4,
                "pid": 1,
                "en": "Its energy and rhythm can capture a reader, transport them to another world and make them see things differently.",
                "slashed_text": "Its energy and rhythm / can capture a reader, / transport them to another world / and make them see things differently.",
                "literal_cn": "它的能量和节奏可以吸引读者，将他们带到另一个世界，让他们以不同的方式看待事物。",
                "refined_cn": "其蕴含的能量与韵律能够抓住读者的心弦，将他们带入另一个世界，令其以全新的视角看待万物。",
                "cn": "其蕴含的能量与韵律能够抓住读者的心弦，将他们带入另一个世界，令其以全新的视角看待万物。",
                "syntax_points": [
                    {"label": "句子主干", "text": "Its energy and rhythm 为主语，can capture..., transport..., and make... 为三个并列谓语动词。"},
                    {"label": "代词指代", "text": "them 指代前文的单数泛指名词 a reader（英语常用复数代词指代单数泛指人称以避免性别倾向）。"}
                ],
                "vocab_points": [
                    {"term": "capture", "note": "吸引，俘获（注意力或心灵）。"},
                    {"term": "transport sb. to another world", "note": "将某人带入另一个世界。"},
                    {"term": "see things differently", "note": "以不同的眼光看待事物。"}
                ],
                "scoring_points": [
                    {"phrase": "capture a reader, transport them to another world", "score": 1.0, "guide": "capture 译为“吸引/抓住……的心”；transport 译为“带到/带入”。", "vocab": [{"word": "transport", "pos": "v.", "common": "运输；使身临其境，把……带入", "context": "带入另一个精神世界"}]},
                    {"phrase": "make them see things differently", "score": 0.5, "guide": "译为“让他们以不同的方式看待事物/以全新的视角看待万物”。", "vocab": []}
                ],
                "grammar_breakdown": "三连动并列谓语结构，注意单数名词 a reader 用复数代词 them 回指。",
                "reassembly_notes": "在汉语中统一译为复数概念“读者 / 他们”，避免前后单复数突兀。"
            },
            {
                "sid": 5,
                "pid": 1,
                "en": "Through carefully selected words and phrases, poems can be dramatic, funny, beautiful, moving and inspiring.",
                "slashed_text": "Through carefully selected words and phrases, / poems can be dramatic, funny, beautiful, moving and inspiring.",
                "literal_cn": "通过精心挑选的词句，诗歌可以是戏剧性的、有趣的、美丽的、动人的和鼓舞人心的。",
                "refined_cn": "借由精挑细选的字词句段，诗歌或跌宕起伏，或诙谐幽默，或唯美隽永，或催人泪下，或振奋人心。",
                "cn": "借由精挑细选的字词句段，诗歌或跌宕起伏，或诙谐幽默，或唯美隽永，或催人泪下，或振奋人心。",
                "syntax_points": [
                    {"label": "句子主干", "text": "poems can be + 五个并列形容词作表语。"},
                    {"label": "修饰成分", "text": "Through carefully selected words and phrases 作方式状语。"}
                ],
                "vocab_points": [
                    {"term": "dramatic", "note": "戏剧性的，跌宕起伏的，震撼人心的。"},
                    {"term": "moving and inspiring", "note": "动人的和鼓舞人心的。"}
                ],
                "scoring_points": [
                    {"phrase": "Through carefully selected words and phrases", "score": 0.5, "guide": "译为“通过精心挑选的词句”。", "vocab": []},
                    {"phrase": "dramatic, funny, beautiful, moving and inspiring", "score": 1.0, "guide": "五个形容词逐一准确译出，使用“或……，或……”四字格更佳。", "vocab": []}
                ],
                "grammar_breakdown": "方式状语前置 + 主系五并列表语。",
                "reassembly_notes": "连续五个形容词采用“或……，或……”排比四字格，极富汉语韵律美。"
            },
            {
                "sid": 6,
                "pid": 2,
                "en": "No one knows for sure when poetry began but it has been around for thousands of years, even before people could write.",
                "slashed_text": "No one knows for sure / when poetry began / but it has been around for thousands of years, / even before people could write.",
                "literal_cn": "没有人确切知道诗歌是何时开始的，但它已经存在了数千年，甚至在人们会写字之前。",
                "refined_cn": "无人确知诗歌究竟起源于何时，但它已绵延数千年——甚至早在人类掌握文字之前便已存在。",
                "cn": "无人确知诗歌究竟起源于何时，但它已绵延数千年——甚至早在人类掌握文字之前便已存在。",
                "syntax_points": [
                    {"label": "句子主干", "text": "but 连接的并列句。前句主干为 No one knows for sure + when 宾语从句；后句主干为 it has been around for thousands of years。"},
                    {"label": "修饰成分", "text": "even before people could write 作时间状语从句补充说明。"}
                ],
                "vocab_points": [
                    {"term": "know for sure", "note": "确切地知道。"},
                    {"term": "be around", "note": "存在，流传，活跃于世。"}
                ],
                "scoring_points": [
                    {"phrase": "No one knows for sure when poetry began", "score": 0.5, "guide": "for sure 译为“确切地”，译为“无人确知诗歌何时起源”。", "vocab": []},
                    {"phrase": "it has been around for thousands of years, even before people could write", "score": 1.0, "guide": "be around 译为“存在/流传”；before people could write 译为“在人们会写字/掌握文字之前”。", "vocab": []}
                ],
                "grammar_breakdown": "but 转折并列复合句，前半句含宾语从句，后半句含时间状语从句。",
                "reassembly_notes": "even before people could write 用破折号引出并补充“便已存在”，呼应前句。"
            },
            {
                "sid": 7,
                "pid": 2,
                "en": "It was a way to tell stories and pass down history.",
                "slashed_text": "It was a way / to tell stories and pass down history.",
                "literal_cn": "它是一种讲述故事和传承历史的方式。",
                "refined_cn": "它曾是人们讲故事、传历史的一种方式。",
                "cn": "它曾是人们讲故事、传历史的一种方式。",
                "syntax_points": [
                    {"label": "句子主干", "text": "It was a way...；不定式短语 to tell stories and pass down history 作后置定语修饰 a way。"}
                ],
                "vocab_points": [
                    {"term": "pass down", "note": "传承，流传下来，代代相传。"}
                ],
                "scoring_points": [
                    {"phrase": "a way to tell stories and pass down history", "score": 1.0, "guide": "pass down 译为“传承/流传”，不定式前置修饰 way。", "vocab": [{"word": "pass down", "pos": "phr.", "common": "传承；传给后代", "context": "传承历史记忆"}]}
                ],
                "grammar_breakdown": "简单句，并列不定式作后置定语。",
                "reassembly_notes": "“讲故事、传历史”四字对仗，自然地道。"
            },
            {
                "sid": 8,
                "pid": 2,
                "en": "It is closely related to song and even when written it is usually created to be performed out loud.",
                "slashed_text": "It is closely related to song / and even when written / it is usually created to be performed out loud.",
                "literal_cn": "它与歌曲密切相关，即使在被写下来的时候，通常也是为了被大声表演而创作的。",
                "refined_cn": "诗歌与歌谣渊源颇深；即便见诸文字，创作之初也往往是为了高声吟诵。",
                "cn": "诗歌与歌谣渊源颇深；即便见诸文字，创作之初也往往是为了高声吟诵。",
                "syntax_points": [
                    {"label": "句子主干", "text": "and 连接两个并列分句。前句为 It is closely related to song；后句为 it is usually created to be performed out loud。"},
                    {"label": "省略结构", "text": "even when written 为时间/让步状语从句的省略形式（完整为 even when it is written）。"}
                ],
                "vocab_points": [
                    {"term": "be closely related to", "note": "与……密切相关，渊源颇深。"},
                    {"term": "perform out loud", "note": "大声朗诵/演唱/表演出来。"}
                ],
                "scoring_points": [
                    {"phrase": "closely related to song", "score": 0.5, "guide": "译为“与歌曲/歌谣密切相关”。", "vocab": []},
                    {"phrase": "even when written it is usually created to be performed out loud", "score": 1.0, "guide": "even when written 译为“即便写成文字”；被动不定式 to be performed out loud 译为“为了大声表演/高声吟诵”。", "vocab": []}
                ],
                "grammar_breakdown": "并列句，后句含状语从句省略（even when written）及被动不定式作目的状语。",
                "reassembly_notes": "被动语态 it is created to be performed 转为汉语主动或无主句式，避免“被……被……”的翻译腔。"
            },
            {
                "sid": 9,
                "pid": 2,
                "en": "Poems really come to life when they are recited.",
                "slashed_text": "Poems really come to life / when they are recited.",
                "literal_cn": "诗歌在被朗诵时才真正变得生动起来。",
                "refined_cn": "当诗歌被朗诵出来时，才真正焕发出勃勃生机。",
                "cn": "当诗歌被朗诵出来时，才真正焕发出勃勃生机。",
                "syntax_points": [
                    {"label": "句子主干", "text": "Poems really come to life。"},
                    {"label": "修饰成分", "text": "when they are recited 为时间状语从句。"}
                ],
                "vocab_points": [
                    {"term": "come to life", "note": "苏醒过来，变得生动，焕发生机。"},
                    {"term": "recite", "note": "朗诵，背诵，吟诵。"}
                ],
                "scoring_points": [
                    {"phrase": "Poems really come to life when they are recited", "score": 1.0, "guide": "come to life 译为“变得生动/焕发生机”；recite 译为“朗诵”。", "vocab": [{"word": "recite", "pos": "v.", "common": "朗诵；背诵", "context": "出声朗诵诗歌"}]}
                ],
                "grammar_breakdown": "主句 + when 时间状语从句。",
                "reassembly_notes": "先译时间从句“当诗歌被朗诵出来时”，再接主句“才真正焕发出勃勃生机”。"
            },
            {
                "sid": 10,
                "pid": 2,
                "en": "This can also help with understanding them too, because the rhythm and sounds of the words become clearer.",
                "slashed_text": "This can also help with understanding them too, / because the rhythm and sounds of the words / become clearer.",
                "literal_cn": "这也有助于理解它们，因为文字的节奏和声音变得更加清晰。",
                "refined_cn": "不仅如此，朗诵还有助于领会诗意，因为字句的节奏与音韵会随之愈发清晰。",
                "cn": "不仅如此，朗诵还有助于领会诗意，因为字句的节奏与音韵会随之愈发清晰。",
                "syntax_points": [
                    {"label": "句子主干", "text": "This can also help with understanding them too。"},
                    {"label": "修饰成分", "text": "because 引导原因状语从句。"}
                ],
                "vocab_points": [
                    {"term": "help with", "note": "有助于，在……方面起帮助作用。"},
                    {"term": "rhythm and sounds", "note": "节奏与声音/音韵。"}
                ],
                "scoring_points": [
                    {"phrase": "help with understanding them", "score": 0.5, "guide": "them 指代 poems，译为“有助于理解诗歌/领会诗意”。", "vocab": []},
                    {"phrase": "because the rhythm and sounds of the words become clearer", "score": 1.0, "guide": "译为“因为字词的节奏和声音变得更加清晰”。", "vocab": [{"word": "rhythm", "pos": "n.", "common": "节奏；韵律", "context": "诗歌朗诵的韵律感"}]}
                ],
                "grammar_breakdown": "主句 + because 原因状语从句。",
                "reassembly_notes": "将 This 明确化为“朗诵”，them 明确化为“诗意”，衔接自然。"
            }
        ]
    }
}
