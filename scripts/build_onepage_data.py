# -*- coding: utf-8 -*-
"""
Build data/writing_onepage_data.js for the 27考研大作文一页纸 (南萧核心价值观体系)
Combines:
- Three-tier universal templates (满分版 / 简化版 / 速通版) + first-paragraph formulas
- Interactive builder slot schema & quick presets
- Seven core values corpus + supplementary political expressions (parsed cleanly)
- 2026-2020 English II 28 full practice essays across 4 tiers (parsed cleanly)
- Comprehensive methodology & usage guide (宏大叙事、多图审题、表情动作词库、应急写法)
"""
import json
import os

raw_json = r"C:\Users\夜斗\.gemini\antigravity\brain\8cb7cb76-76f1-45bd-ba86-0370310fb665\scratch\parsed_clean_data.json"
with open(raw_json, "r", encoding="utf-8") as f:
    parsed = json.load(f)

templates_data = {
    "intro": "由南萧极简考研团队（南萧时刻自信冷静）依据教育部官方《试题分析》与社会主义核心价值观打造的“一页纸”宏大叙事化大作文体系。根据自身英语基础与备考时间，只需背熟三档模板中的任意一档，配合语料库或题面词汇填槽，即可高效应对图画、图表、文本及混合题型。",
    "firstParagraphFormulas": [
        {
            "id": "picture",
            "name": "图画类首段",
            "badge": "图画 / 双图画",
            "en": "Though deceptively simple, this scene conveys a meaningful message: 【图画描述】. It serves as a compelling testament to the significance of 【主题词】.",
            "cn": "尽管画面看似简单，却传递出深刻的寓意：【图画描述】。它有力地证明了【主题词】的重要性。",
            "tips": "一个主语公式：地点状语 + 主语 + 定语从句（动作/表情） + 谓宾 + doing…；两个主语对比公式：句1（地点+主语1+动作），while 句2（地点+主语2+动作）。"
        },
        {
            "id": "dynamic_chart",
            "name": "动态图表首段",
            "badge": "折线图 / 多年份柱图",
            "en": "The figures in the bar chart/line chart/pie chart/table reveal notable changes/differences concerning 【主题词】. Between 【起始时间】 and 【终止时间】, the number/proportion of 【类别一】 rose/fell from about 【数据1】 to around 【数据2】, while that of 【类别二】 increased/decreased slightly/sharply from roughly 【数据3】 to approximately 【数据4】. By contrast, the figure for 【类别三】 remained broadly stable at around 【数据5】.",
            "cn": "条形图／折线图／饼图／表格中的数据，揭示了有关【主题词】的显著变化／差异。从【起始时间】到【终止时间】，【类别一】的数量／比例从约【数据1】上升／下降至约【数据2】；【类别二】则从约【数据3】小幅／大幅增加／减少至约【数据4】。相比之下，【类别三】的相应数值保持在约【数据5】，总体稳定。",
            "tips": "若无稳定项，可将第三句改为 The figure for 【类别三】 also rose/fell, from 【数据】 to 【数据】.；类别名称不会写时，可用 the first category / the second category 应急代替。"
        },
        {
            "id": "static_chart",
            "name": "静态图表首段",
            "badge": "饼图 / 单年占比柱图/表",
            "en": "The figures in the bar chart/line chart/pie chart/table reveal notable changes/differences concerning 【主题词】. 【类别一】 accounts for the largest share, at 【最大比例】, followed by 【类别二】, 【类别三】 and 【类别四】 at 【第二比例】, 【第三比例】 and 【第四比例】 respectively.",
            "cn": "条形图／折线图／饼图／表格中的数据，揭示了有关【主题词】的显著变化／差异。【类别一】占比最高，达到【最大比例】；随后是【类别二】、【类别三】和【类别四】，分别占【第二比例】、【第三比例】和【第四比例】。",
            "tips": "若为多选题（各比例之和超过 100%），把 accounts for the largest share 改为 has the highest percentage；类别少则删去多余位置。"
        },
        {
            "id": "passage",
            "name": "文本评论首段",
            "badge": "文字材料作文",
            "en": "【主题词】 has long been a subject of public debate. The passage offers a fresh perspective on this issue, arguing that 【提炼文段大意】. While this view may not convince everyone, I find it original and illuminating, and I agree with it wholeheartedly.",
            "cn": "长期以来，【主题词】一直是公众讨论的议题。上述文段为这一问题提供了新的视角，主张【提炼文段大意】。虽然这一观点未必能说服所有人，但我认为它新颖而富有启发性，并完全赞同。",
            "tips": "万能提炼公式：【主题词/某种做法】 can help us (to) 【达到某种结果】.；注意无论原文作者态度如何，均可从积极正向部分切入赞同。"
        }
    ],
    "tiers": [
        {
            "key": "full",
            "name": "满分版本",
            "badge": "高阶思辨 · 旱区冲高分",
            "slotCount": 9,
            "summary": "个人行为 + 可见成果 + 政策领域 + 政策能力 + 社会效果 + 国家战略 + 社会变化，论证链条极其饱满，思想深度与政治站位兼具。",
            "slotsInfo": [
                {"slot": "【主题词】", "from": "7大价值观或向下细化", "grammar": "名词短语或动名词短语"},
                {"slot": "【图画/图表描述】", "from": "首段万能公式自写", "grammar": "完整陈述句或描述语句"},
                {"slot": "【具体行为】", "from": "语料库「个人行为」", "grammar": "接在 the way people 后，填动词原形短语"},
                {"slot": "【可见成果】", "from": "语料库「个人成果」", "grammar": "接在 contributing to 后，填名词或动名词短语"},
                {"slot": "【相关领域】", "from": "语料库「政策领域」", "grammar": "接在 National policies on 后，填名词短语"},
                {"slot": "【个人能力/行为】", "from": "语料库「政策能力」", "grammar": "接在 empowering individuals to 后，填动词原形短语"},
                {"slot": "【社会效果】", "from": "语料库「社会效果」", "grammar": "接在 by 后，填动名词短语 (V-ing)"},
                {"slot": "【相关战略】", "from": "语料库「相关战略」", "grammar": "接在 national strategies for 后，填名词/动名词短语"},
                {"slot": "【社会变化】", "from": "语料库「社会变化」", "grammar": "接在 takes root, 后，填完整主谓小句"}
            ],
            "en": {
                "p1_picture": "Though deceptively simple, this scene conveys a meaningful message: 【图画描述】. It serves as a compelling testament to the significance of 【主题词】.",
                "p1_chart": "The figures in the 【图表名称】 reveal notable 【changes/differences】 concerning 【主题词】. 【图表数据描述】.",
                "p1_passage": "【主题词】 has long been a subject of public debate. The passage offers a fresh perspective on this issue, arguing that 【提炼文段大意】. While this view may not convince everyone, I find it original and illuminating, and I agree with it wholeheartedly.",
                "p2": "【主题词】 has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people 【具体行为】, ultimately contributing to 【可见成果】. National policies on 【相关领域】 likewise focus on empowering individuals to 【个人能力/行为】. Beyond personal advancement, this principle can strengthen communities by 【社会效果】, laying the groundwork for sustainable progress. This is in line with national strategies for 【相关战略】: as this principle takes root, 【社会变化】.",
                "p3": "In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when 【主题词】 guides action. Promoting this principle is therefore not merely advisable but essential for holistic development."
            },
            "cn": {
                "p1": "（图画）尽管画面看似简单，却传递出深刻的寓意：【图画描述】。它有力地证明了【主题词】的重要性。\n（图表）条形图／折线图／饼图／表格中的数据，揭示了有关【主题词】的显著变化／差异。【图表数据描述】。\n（文本）长期以来，【主题词】一直是公众讨论的议题。上述文段为这一问题提供了新的视角，主张【提炼文段大意】。虽然这一观点未必能说服所有人，但我认为它新颖而富有启发性，并完全赞同。",
                "p2": "【主题词】受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们【具体行为】的方式之中，最终有助于【可见成果】。国家在【相关领域】方面的政策，同样着重于使个人能够【个人能力/行为】。除个人发展之外，这一原则还可以通过【社会效果】增强社区，为可持续进步奠定基础。这与国家的【相关战略】相契合：随着这一理念逐渐扎根，【社会变化】。",
                "p3": "总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。"
            }
        },
        {
            "key": "simplified",
            "name": "简化版本",
            "badge": "高性价比 · 仅需5个槽位",
            "slotCount": 5,
            "summary": "保留满分版的骨架逻辑，把“可见成果、个人能力、相关战略与社会变化”写死为万能高分句，只需填【题面描述 / 主题词 / 具体行为 / 相关领域 / 社会效果】5类空。",
            "slotsInfo": [
                {"slot": "【图画/图表描述】", "from": "首段万能公式自写", "grammar": "根据材料自行描述"},
                {"slot": "【主题词】", "from": "7大价值观或向下细化", "grammar": "三段保持同一个主题短语"},
                {"slot": "【具体行为】", "from": "语料库「个人行为」", "grammar": "接在 the way people 后，填动词原形短语"},
                {"slot": "【相关领域】", "from": "语料库「政策领域」", "grammar": "接在 National policies on 后，填名词短语"},
                {"slot": "【社会效果】", "from": "语料库「社会效果」", "grammar": "接在 by 后，填动名词短语 (V-ing)"}
            ],
            "en": {
                "p1_picture": "Though deceptively simple, this scene conveys a meaningful message: 【图画描述】. It serves as a compelling testament to the significance of 【主题词】.",
                "p1_chart": "The figures in the 【图表名称】 reveal notable 【changes/differences】 concerning 【主题词】. 【图表数据描述】.",
                "p1_passage": "【主题词】 has long been a subject of public debate. The passage offers a fresh perspective on this issue, arguing that 【提炼文段大意】. While this view may not convince everyone, I find it original and illuminating, and I agree with it wholeheartedly.",
                "p2": "【主题词】 has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people 【具体行为】, ultimately contributing to personal development and well-being. National policies on 【相关领域】 likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by 【社会效果】, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.",
                "p3": "In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when 【主题词】 guides action. Promoting this principle is therefore not merely advisable but essential for holistic development."
            },
            "cn": {
                "p1": "第一段与满分版相同：按图画、图表或文本评论选用对应首段。",
                "p2": "【主题词】受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们【具体行为】的方式之中，最终有助于个人发展与福祉。国家在【相关领域】方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过【社会效果】增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。",
                "p3": "总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。"
            }
        },
        {
            "key": "fast",
            "name": "速通版本",
            "badge": "考前速成 · 全题型通用首段",
            "slotCount": 5,
            "summary": "第一段采用全能通用句架（scene / chart / passage 自由切换），第二段内置“主观行为+社会条件+国家战略+权威研究引证”五步推进，零基础也可快速套出高质量范文。",
            "slotsInfo": [
                {"slot": "【题面材料与描述】", "from": "this scene / this 【图表名称】 / this passage", "grammar": "填写图画、图表数据或文段大意"},
                {"slot": "【主题词】", "from": "7大价值观或材料直观提炼", "grammar": "贯穿第1、2、3段"},
                {"slot": "【具体行为】", "from": "语料库「个人行为」或自拟", "grammar": "接在 the way people 或 desire to 后，填动词原形短语"},
                {"slot": "【相关战略】", "from": "语料库「相关战略」", "grammar": "接在 strategies for 或 commitment to 后，填名词/动名词短语"},
                {"slot": "【权威机构/期刊】", "from": "可选 Beijing Normal University / Peking University / China Daily / People's Daily", "grammar": "充当研究发布机构增强说服力"}
            ],
            "en": {
                "p1_all": "Though deceptively simple, this 【scene / bar chart / line chart / pie chart / table / passage】 conveys a meaningful message: 【题面描述】. It serves as a compelling testament to the significance of 【主题词】.",
                "p2_branches": {
                    "s1_theme": "To begin with, experience suggests that 【主题词】 finds direct expression in phenomena exemplified by the way people 【具体行为】.",
                    "s1_trend": "To begin with, experience suggests that this trend/pattern can be explained in part by people's desire to 【具体行为】.",
                    "s2_reason": "This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.",
                    "s2_exemplar": "Those who value such practices are exemplars of self-improvement and higher achievement.",
                    "s3_social": "However, we should recognise that social conditions fundamentally shape the choices available to individuals.",
                    "s4_impetus": "From this perspective, it is the promotion of national strategies for 【相关战略】 that provides impetus for these developments.",
                    "s4_harmony": "From this perspective, a shared commitment to 【相关战略】 can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress.",
                    "s5_role": "A study / An article published by 【权威机构／期刊】 lends support to the view that 【主题词】 plays an important role in driving this trend / fostering community prosperity.",
                    "s5_vitality": "A study / An article published by 【权威机构／期刊】 lends support to the view that societies placing greater emphasis on 【主题词】 enjoy higher levels of vitality and prosperity, a pattern consistent across multiple indicators."
                },
                "p3": "In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when 【主题词】 guides action. Promoting this principle is therefore not merely advisable but essential for holistic development."
            },
            "cn": {
                "p1": "尽管画面／【图表名称】／文本看似简单，却传递出深刻的寓意／信息：【题面描述】。它有力地证明了【主题词】的重要性。",
                "p2": "〔1〕首先，从经验上讲，【主题词】直接体现在以人们【具体行为】为代表的现象之中。 ／ 这一趋势可部分归因于人们【具体行为】的愿望。\n〔2〕这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。 ／ 重视这类做法的人，是自我完善和更高成就的典范。\n〔3〕然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n〔4〕基于这一认识，正是国家在【相关战略】方面的战略倡导与推广，为这些发展变化提供了动力。 ／ 对【相关战略】的共同坚持能够为社区和国家在和谐中蓬勃发展创造条件，为可持续进步奠定基础。\n〔5〕【权威机构／期刊】刊载的一项研究支持这样一种观点，即【主题词】在推动这一趋势／促进社区繁荣方面发挥着重要作用（或：更重视【主题词】的社会拥有更高水平的活力与繁荣）。",
                "p3": "总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。"
            }
        }
    ]
}

guide_methods = {
    "title": "27届大作文一页纸 · 宏大叙事化考纲真相与实操宝典",
    "sections": [
        {
            "id": "exam_truth",
            "icon": "🎯",
            "title": "01 考纲真相：为什么必须走向“宏大叙事化”？",
            "items": [
                {
                    "subtitle": "三大核心阅卷情报（出自教育部官方《试题分析》）",
                    "content": "1. 题型彻底打通：从 23 年考纲改革起，英一、英二均可能出现【图画 / 图表 / 文本】以及混合考察（如 24 英一考了图画+图表，25 英一考了纯图表）。绝不能抱“英一一定图画、英二一定图表”的侥幸心理。\n2. 阅卷节奏与得分档：老师批阅一篇大作文往往仅十几秒到几十秒，决定档次的第一眼是书写、辞藻与结构，而决定能否在旱区冲进高分档的是**思辨高度（价值取向）、论证严密与具体论据**。\n3. 命题趋势宏大叙事化：无论是以人为本发展科技、老龄化、劳动教育、乡村振兴、宜居城市还是国民素养，全部立足于国家发展与民生福祉（利他/社会视角），而不是只停留在个人小情绪的“看图写话”。"
                },
                {
                    "subtitle": "避坑铁律：立意必须正面，且绝不“双边跑偏”",
                    "content": "• 正向主题词原则：无论是正面现象、负面现象（如不自信、乱扔垃圾、拖延），还是有争议的双图表，都必须从**正面积极的做法**提炼主题词（例如图画讽刺拖延，主题词写“立刻行动/自律”；图表对科技有争论，直接站在支持“以人为本发展科技”一边）。\n• 多图/混合图审题法：无论题目给多少幅图或多少组数据，命题人要你表达的核心永远只有**一个中心大主题**！两幅图要么全是表面现象，要么一表一里，各用一句话描述信息后，迅速收束到同一个宏大主题词上。"
                }
            ]
        },
        {
            "id": "theme_selection",
            "icon": "🧭",
            "title": "02 主题词定调：向上对标价值观，向下具体化落地",
            "items": [
                {
                    "subtitle": "两步定位法（防止拔高假大空）",
                    "content": "• 向上对齐：拿到题目，先思考“7 大核心价值观”（和谐、富强、文明、敬业、友善、爱国、诚信）中最贴近哪一类，以及国家为此推出了什么战略政策（语料库【相关战略】中的短语往往可直接拿来做主题词）。\n• 向下细化：若直接写宏大词汇显得生硬拔高（如 2020 年考研坚持/习惯、2021 年锻炼方式），则顺藤摸瓜“向下细化”——例如把“敬业”落地为“脚踏实地、克服拖延”，把“健康中国”落地为“养成规律锻炼习惯”，既紧扣题面，又顺理成章接上第二段的政策与战略支撑。"
                }
            ]
        },
        {
            "id": "vocab_helper",
            "icon": "🎭",
            "title": "03 首段图画描写速成：动作与表情高频词库",
            "items": [
                {
                    "subtitle": "单主语与双主语描写万能公式",
                    "content": "• 单主语：地点状语 + 主语 + 定语从句 (who seems + 表情 / who is + 动作) + 谓宾, doing…（如：By the river, an elderly resident who seems delighted watches a dragon boat race, saying that the event is becoming livelier.）\n• 双主语对比：地点状语 + 主语1 + 动作, while + 主语2 + 动作。（注意：人物动作用一般现在时，主谓单复数保持一致。）"
                },
                {
                    "subtitle": "考场常用表情词汇（接在 seem / look 后）",
                    "content": "• 高兴/欣喜：joyful / delighted / cheerful\n• 吃惊/困惑：shocked / surprised / confused / puzzled\n• 疲惫/失望：tired / exhausted / sad / depressed / disappointed / frustrated\n• 专注投入：concentrate fully on sth / be absorbed in sth"
                },
                {
                    "subtitle": "考场常用动作与图表应急表达",
                    "content": "• 常用动作：stand（站）、sit（坐）、lie / lying（躺）、walk（走）、run（跑）、curl up（蜷缩）、say to oneself（自言自语）、imagine（想象）、decide to do sth（决定做某事）。\n• 图表应急救命句：万一图表中某个专业类别词实在不会拼写，可用 **the first category / the second category**（第一类/第二类）指代，宁可笼统指代也绝不胡乱生造错误单词！"
                }
            ]
        }
    ]
}

onepage_obj = {
    "meta": {
        "title": "27届考研大作文一页纸（南萧核心价值观宏大叙事体系）",
        "author": "Camellia / 南萧极简考研团队（南萧时刻自信冷静）",
        "version": "2026-11"
    },
    "templates": templates_data,
    "corpus": parsed["corpus"],
    "practiceE2": parsed["practiceE2"],
    "guideAndMethods": guide_methods
}

out_js = os.path.join("data", "writing_onepage_data.js")
with open(out_js, "w", encoding="utf-8") as f:
    f.write("/**\n * ZY_English One-Page Essay Data (大作文一页纸核心价值观体系数据包)\n */\n")
    f.write("window.WRITING_ONEPAGE_DATA = ")
    json.dump(onepage_obj, f, ensure_ascii=False, indent=2)
    f.write(";\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = window.WRITING_ONEPAGE_DATA;\n}\n")

print(f"Successfully generated {out_js} ({os.path.getsize(out_js)} bytes)")
