/**
 * ZY_English One-Page Essay Data (大作文一页纸核心价值观体系数据包)
 */
window.WRITING_ONEPAGE_DATA = {
  "meta": {
    "title": "27届考研大作文一页纸（南萧核心价值观宏大叙事体系）",
    "author": "Camellia / 南萧极简考研团队（南萧时刻自信冷静）",
    "version": "2026-11"
  },
  "templates": {
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
          {
            "slot": "【主题词】",
            "from": "7大价值观或向下细化",
            "grammar": "名词短语或动名词短语"
          },
          {
            "slot": "【图画/图表描述】",
            "from": "首段万能公式自写",
            "grammar": "完整陈述句或描述语句"
          },
          {
            "slot": "【具体行为】",
            "from": "语料库「个人行为」",
            "grammar": "接在 the way people 后，填动词原形短语"
          },
          {
            "slot": "【可见成果】",
            "from": "语料库「个人成果」",
            "grammar": "接在 contributing to 后，填名词或动名词短语"
          },
          {
            "slot": "【相关领域】",
            "from": "语料库「政策领域」",
            "grammar": "接在 National policies on 后，填名词短语"
          },
          {
            "slot": "【个人能力/行为】",
            "from": "语料库「政策能力」",
            "grammar": "接在 empowering individuals to 后，填动词原形短语"
          },
          {
            "slot": "【社会效果】",
            "from": "语料库「社会效果」",
            "grammar": "接在 by 后，填动名词短语 (V-ing)"
          },
          {
            "slot": "【相关战略】",
            "from": "语料库「相关战略」",
            "grammar": "接在 national strategies for 后，填名词/动名词短语"
          },
          {
            "slot": "【社会变化】",
            "from": "语料库「社会变化」",
            "grammar": "接在 takes root, 后，填完整主谓小句"
          }
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
          {
            "slot": "【图画/图表描述】",
            "from": "首段万能公式自写",
            "grammar": "根据材料自行描述"
          },
          {
            "slot": "【主题词】",
            "from": "7大价值观或向下细化",
            "grammar": "三段保持同一个主题短语"
          },
          {
            "slot": "【具体行为】",
            "from": "语料库「个人行为」",
            "grammar": "接在 the way people 后，填动词原形短语"
          },
          {
            "slot": "【相关领域】",
            "from": "语料库「政策领域」",
            "grammar": "接在 National policies on 后，填名词短语"
          },
          {
            "slot": "【社会效果】",
            "from": "语料库「社会效果」",
            "grammar": "接在 by 后，填动名词短语 (V-ing)"
          }
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
          {
            "slot": "【题面材料与描述】",
            "from": "this scene / this 【图表名称】 / this passage",
            "grammar": "填写图画、图表数据或文段大意"
          },
          {
            "slot": "【主题词】",
            "from": "7大价值观或材料直观提炼",
            "grammar": "贯穿第1、2、3段"
          },
          {
            "slot": "【具体行为】",
            "from": "语料库「个人行为」或自拟",
            "grammar": "接在 the way people 或 desire to 后，填动词原形短语"
          },
          {
            "slot": "【相关战略】",
            "from": "语料库「相关战略」",
            "grammar": "接在 strategies for 或 commitment to 后，填名词/动名词短语"
          },
          {
            "slot": "【权威机构/期刊】",
            "from": "可选 Beijing Normal University / Peking University / China Daily / People's Daily",
            "grammar": "充当研究发布机构增强说服力"
          }
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
  },
  "corpus": [
    {
      "id": "harmony",
      "index": 1,
      "name": "和谐",
      "enName": "Harmony",
      "isKey": true,
      "topics": "人际关系、社会和谐、民生改善、生活品质、人与自然、发展平衡",
      "exams": "英一：2015/2024年；英二： 2014/2015/2018/2020/2021/2022年",
      "slots": {
        "behavior": [
          {
            "raw": "balance competing demands and maintain healthy relationships 平衡各种相互冲突的需求，并维持良好的关系",
            "en": "balance competing demands and maintain healthy relationships",
            "zh": "平衡各种相互冲突的需求，并维持良好的关系"
          },
          {
            "raw": "resolve conflicts peacefully and prioritize what truly matters 和平解决争端，并优先考虑真正重要的事情",
            "en": "resolve conflicts peacefully and prioritize what truly matters",
            "zh": "和平解决争端，并优先考虑真正重要的事情"
          },
          {
            "raw": "connect genuinely with others and nurture community bonds 真诚地与他人建立联系，并加强社区间的纽带关系",
            "en": "connect genuinely with others and nurture community bonds",
            "zh": "真诚地与他人建立联系，并加强社区间的纽带关系"
          },
          {
            "raw": "make use of public services and facilities 利用公共服务和设施",
            "en": "make use of public services and facilities",
            "zh": "利用公共服务和设施"
          },
          {
            "raw": "conserve resources and protect the environment 节约资源并保护环境",
            "en": "conserve resources and protect the environment",
            "zh": "节约资源并保护环境"
          }
        ],
        "outcome": [
          {
            "raw": "inner peace and overall well-being 内心平静与整体福祉",
            "en": "inner peace and overall well-being",
            "zh": "内心平静与整体福祉"
          },
          {
            "raw": "stable relationships and reduced stress 稳定的关系和减轻的压力",
            "en": "stable relationships and reduced stress",
            "zh": "稳定的关系和减轻的压力"
          },
          {
            "raw": "a fulfilling life and personal satisfaction 充实的生活与个人满足感",
            "en": "a fulfilling life and personal satisfaction",
            "zh": "充实的生活与个人满足感"
          }
        ],
        "domain": [
          {
            "raw": "livable city development 宜居城市建设",
            "en": "livable city development",
            "zh": "宜居城市建设"
          },
          {
            "raw": "public health and well-being 公共健康与福祉",
            "en": "public health and well-being",
            "zh": "公共健康与福祉"
          },
          {
            "raw": "sustainable urban development 城市可持续发展",
            "en": "sustainable urban development",
            "zh": "城市可持续发展"
          }
        ],
        "ability": [
          {
            "raw": "balance work and life while maintaining harmonious relationships 在保持良好人际关系的同时平衡工作与生活",
            "en": "balance work and life while maintaining harmonious relationships",
            "zh": "在保持良好人际关系的同时平衡工作与生活"
          },
          {
            "raw": "access improved public services and recreational facilities 获得更完善的公共服务和娱乐设施",
            "en": "access improved public services and recreational facilities",
            "zh": "获得更完善的公共服务和娱乐设施"
          },
          {
            "raw": "pursue healthy lifestyles in well-designed environments 在精心设计的环境中追求健康的生活方式",
            "en": "pursue healthy lifestyles in well-designed environments",
            "zh": "在精心设计的环境中追求健康的生活方式"
          },
          {
            "raw": "make informed decisions about their health 依据充分信息作出健康决策",
            "en": "make informed decisions about their health",
            "zh": "依据充分信息作出健康决策"
          }
        ],
        "socialEffect": [
          {
            "raw": "reducing conflicts and fostering cooperation 减少冲突并促进合作",
            "en": "reducing conflicts and fostering cooperation",
            "zh": "减少冲突并促进合作"
          },
          {
            "raw": "creating livable environments and improving quality of life 创造宜居环境并提升生活质量",
            "en": "creating livable environments and improving quality of life",
            "zh": "创造宜居环境并提升生活质量"
          },
          {
            "raw": "fostering neighborhood ties and mutual support 加强邻里间的联系与相互支持",
            "en": "fostering neighborhood ties and mutual support",
            "zh": "加强邻里间的联系与相互支持"
          }
        ],
        "strategy": [
          {
            "raw": "以人民为中心的发展思想（people-centered development） ●",
            "en": "",
            "zh": "以人民为中心的发展思想（people-centered development） ●"
          },
          {
            "raw": "保障和改善民生（improving people's well-being） ●",
            "en": "",
            "zh": "保障和改善民生（improving people's well-being） ●"
          },
          {
            "raw": "幼有所育、学有所教、劳有所得、病有所医、老有所养、住有所居、弱有所扶 ●",
            "en": "",
            "zh": "幼有所育、学有所教、劳有所得、病有所医、老有所养、住有所居、弱有所扶 ●"
          },
          {
            "raw": "幼有所育（childcare provision） ○",
            "en": "",
            "zh": "幼有所育（childcare provision） ○"
          },
          {
            "raw": "学有所教（access to education） ○",
            "en": "",
            "zh": "学有所教（access to education） ○"
          },
          {
            "raw": "劳有所得（decent employment） ○",
            "en": "",
            "zh": "劳有所得（decent employment） ○"
          },
          {
            "raw": "病有所医（access to healthcare） ○",
            "en": "",
            "zh": "病有所医（access to healthcare） ○"
          },
          {
            "raw": "老有所养（elderly care） ○",
            "en": "",
            "zh": "老有所养（elderly care） ○"
          },
          {
            "raw": "住有所居（adequate housing） ○",
            "en": "",
            "zh": "住有所居（adequate housing） ○"
          },
          {
            "raw": "弱有所扶（support for vulnerable groups） ○",
            "en": "",
            "zh": "弱有所扶（support for vulnerable groups） ○"
          },
          {
            "raw": "健全社会保障体系（strengthening social security） ●",
            "en": "",
            "zh": "健全社会保障体系（strengthening social security） ●"
          },
          {
            "raw": "医疗卫生、健康中国建设（building a healthy China） ●",
            "en": "",
            "zh": "医疗卫生、健康中国建设（building a healthy China） ●"
          },
          {
            "raw": "采取惠民措施，解决群众急难愁盼问题（addressing people's pressing needs） ●",
            "en": "",
            "zh": "采取惠民措施，解决群众急难愁盼问题（addressing people's pressing needs） ●"
          },
          {
            "raw": "让发展成果更多更公平惠及全体人民（sharing development gains more equitably） ●",
            "en": "",
            "zh": "让发展成果更多更公平惠及全体人民（sharing development gains more equitably） ●"
          },
          {
            "raw": "平安中国建设（building a safer China） ●",
            "en": "",
            "zh": "平安中国建设（building a safer China） ●"
          },
          {
            "raw": "城乡融合和区域协调发展（integrated urban-rural and coordinated regional development） ●",
            "en": "",
            "zh": "城乡融合和区域协调发展（integrated urban-rural and coordinated regional development） ●"
          },
          {
            "raw": "全面推进乡村振兴（rural revitalization） ●",
            "en": "",
            "zh": "全面推进乡村振兴（rural revitalization） ●"
          },
          {
            "raw": "乡村产业、人才、文化、生态、组织振兴 ●",
            "en": "",
            "zh": "乡村产业、人才、文化、生态、组织振兴 ●"
          },
          {
            "raw": "产业振兴（rural industrial development） ○",
            "en": "",
            "zh": "产业振兴（rural industrial development） ○"
          },
          {
            "raw": "人才振兴（rural talent development） ○",
            "en": "",
            "zh": "人才振兴（rural talent development） ○"
          },
          {
            "raw": "文化振兴（rural cultural revitalization） ○",
            "en": "",
            "zh": "文化振兴（rural cultural revitalization） ○"
          },
          {
            "raw": "生态振兴（rural ecological revitalization） ○",
            "en": "",
            "zh": "生态振兴（rural ecological revitalization） ○"
          },
          {
            "raw": "组织振兴（strengthening rural organizations） ○",
            "en": "",
            "zh": "组织振兴（strengthening rural organizations） ○"
          },
          {
            "raw": "以人为核心的新型城镇化（people-centered urbanization） ●",
            "en": "",
            "zh": "以人为核心的新型城镇化（people-centered urbanization） ●"
          },
          {
            "raw": "宜居、韧性、智慧城市（building livable, resilient and smart cities） ●",
            "en": "",
            "zh": "宜居、韧性、智慧城市（building livable, resilient and smart cities） ●"
          },
          {
            "raw": "人与自然和谐共生（harmony between humanity and nature） ●",
            "en": "",
            "zh": "人与自然和谐共生（harmony between humanity and nature） ●"
          },
          {
            "raw": "生态文明建设（ecological civilization） ●",
            "en": "",
            "zh": "生态文明建设（ecological civilization） ●"
          },
          {
            "raw": "绿水青山就是金山银山（valuing nature as an economic asset） ●",
            "en": "",
            "zh": "绿水青山就是金山银山（valuing nature as an economic asset） ●"
          },
          {
            "raw": "发展方式绿色转型（a green transition） ●",
            "en": "",
            "zh": "发展方式绿色转型（a green transition） ●"
          },
          {
            "raw": "环境污染防治（pollution prevention and control） ●",
            "en": "",
            "zh": "环境污染防治（pollution prevention and control） ●"
          },
          {
            "raw": "现代环境治理体系（modern environmental governance） ●",
            "en": "",
            "zh": "现代环境治理体系（modern environmental governance） ●"
          },
          {
            "raw": "提升生态系统多样性、稳定性、持续性（enhancement of ecosystem diversity, stability and sustainability）",
            "en": "enhancement of ecosystem diversity, stability and sustainability",
            "zh": "提升生态系统多样性、稳定性、持续性"
          }
        ],
        "socialChange": [
          {
            "raw": "public facilities multiply and community spaces become more accessible 公共设施数量增多，社区空间也变得更加便捷易达",
            "en": "public facilities multiply and community spaces become more accessible",
            "zh": "公共设施数量增多，社区空间也变得更加便捷易达"
          },
          {
            "raw": "green areas expand and fitness facilities become more accessible 绿色空间扩大，健身设施更加便捷易达",
            "en": "green areas expand and fitness facilities become more accessible",
            "zh": "绿色空间扩大，健身设施更加便捷易达"
          },
          {
            "raw": "conflicts decrease and mutual care becomes commonplace 冲突减少，相互关爱变得司空见惯",
            "en": "conflicts decrease and mutual care becomes commonplace",
            "zh": "冲突减少，相互关爱变得司空见惯"
          }
        ]
      }
    },
    {
      "id": "prosperity",
      "index": 2,
      "name": "富强",
      "enName": "Prosperity",
      "isKey": true,
      "topics": "经济发展、基础设施、科技进步、国家实力、公共服务",
      "exams": "英一：2024年；英二： 2023年",
      "slots": {
        "behavior": [
          {
            "raw": "access improved public services and infrastructure 获得更完善的公共服务和基础设施条件",
            "en": "access improved public services and infrastructure",
            "zh": "获得更完善的公共服务和基础设施条件"
          },
          {
            "raw": "make use of economic opportunities and improved facilities 利用经济发展带来的机遇和改善后的设施",
            "en": "make use of economic opportunities and improved facilities",
            "zh": "利用经济发展带来的机遇和改善后的设施"
          },
          {
            "raw": "pursue opportunities enabled by national development 抓住国家发展所带来的机遇",
            "en": "pursue opportunities enabled by national development",
            "zh": "抓住国家发展所带来的机遇"
          },
          {
            "raw": "apply technology to solve practical problems 运用技术解决实际问题",
            "en": "apply technology to solve practical problems",
            "zh": "运用技术解决实际问题"
          }
        ],
        "outcome": [
          {
            "raw": "enhanced quality of life and expanded opportunities 生活质量的提升以及更多元化的机遇",
            "en": "enhanced quality of life and expanded opportunities",
            "zh": "生活质量的提升以及更多元化的机遇"
          },
          {
            "raw": "improved health, education, and living standards 健康水平，教育水平以及生活质量的提高",
            "en": "improved health, education, and living standards",
            "zh": "健康水平，教育水平以及生活质量的提高"
          },
          {
            "raw": "greater convenience and personal fulfillment 更大的便利性和个人成就感",
            "en": "greater convenience and personal fulfillment",
            "zh": "更大的便利性和个人成就感"
          }
        ],
        "domain": [
          {
            "raw": "infrastructure development 基础设施建设",
            "en": "infrastructure development",
            "zh": "基础设施建设"
          },
          {
            "raw": "public service improvement 公共服务改进",
            "en": "public service improvement",
            "zh": "公共服务改进"
          },
          {
            "raw": "urban-rural integration 城乡融合",
            "en": "urban-rural integration",
            "zh": "城乡融合"
          },
          {
            "raw": "economic development 经济发展",
            "en": "economic development",
            "zh": "经济发展"
          },
          {
            "raw": "scientific and technological innovation 科技创新",
            "en": "scientific and technological innovation",
            "zh": "科技创新"
          }
        ],
        "ability": [
          {
            "raw": "access better services and convenient public facilities 获得更好的服务并使用便捷的公共设施",
            "en": "access better services and convenient public facilities",
            "zh": "获得更好的服务并使用便捷的公共设施"
          },
          {
            "raw": "benefit from infrastructure upgrades and technological progress 受益于基础设施的升级以及技术的进步",
            "en": "benefit from infrastructure upgrades and technological progress",
            "zh": "受益于基础设施的升级以及技术的进步"
          },
          {
            "raw": "pursue healthier lifestyles in well-equipped environments 在设施完善的环境中追求更健康的生活方式",
            "en": "pursue healthier lifestyles in well-equipped environments",
            "zh": "在设施完善的环境中追求更健康的生活方式"
          }
        ],
        "socialEffect": [
          {
            "raw": "upgrading infrastructure and expanding public services 升级基础设施并扩大公共服务范围",
            "en": "upgrading infrastructure and expanding public services",
            "zh": "升级基础设施并扩大公共服务范围"
          },
          {
            "raw": "narrowing regional gaps and raising living standards 缩小地区差距并提高生活水平",
            "en": "narrowing regional gaps and raising living standards",
            "zh": "缩小地区差距并提高生活水平"
          },
          {
            "raw": "creating accessible facilities and livable environments 创建无障碍设施和适宜居住的环境",
            "en": "creating accessible facilities and livable environments",
            "zh": "创建无障碍设施和适宜居住的环境"
          },
          {
            "raw": "improving productivity and service quality 提高生产效率与服务质量",
            "en": "improving productivity and service quality",
            "zh": "提高生产效率与服务质量"
          }
        ],
        "strategy": [
          {
            "raw": "推进高质量发展（high-quality development） ●",
            "en": "",
            "zh": "推进高质量发展（high-quality development） ●"
          },
          {
            "raw": "扩大内需（expanding domestic demand） ●",
            "en": "",
            "zh": "扩大内需（expanding domestic demand） ●"
          },
          {
            "raw": "全体人民共同富裕（common prosperity for all） ●",
            "en": "",
            "zh": "全体人民共同富裕（common prosperity for all） ●"
          },
          {
            "raw": "完善分配制度（improving income distribution） ●",
            "en": "",
            "zh": "完善分配制度（improving income distribution） ●"
          },
          {
            "raw": "构建新发展格局，推动高质量发展 ●",
            "en": "",
            "zh": "构建新发展格局，推动高质量发展 ●"
          },
          {
            "raw": "新发展格局（a new development pattern） ○",
            "en": "",
            "zh": "新发展格局（a new development pattern） ○"
          },
          {
            "raw": "高质量发展（high-quality development） ○",
            "en": "",
            "zh": "高质量发展（high-quality development） ○"
          },
          {
            "raw": "建设现代化经济体系（a modern economy） ●",
            "en": "",
            "zh": "建设现代化经济体系（a modern economy） ●"
          },
          {
            "raw": "科教兴国（invigorating China through science and education） ●",
            "en": "",
            "zh": "科教兴国（invigorating China through science and education） ●"
          },
          {
            "raw": "人才强国（building national strength through talent development） ●",
            "en": "",
            "zh": "人才强国（building national strength through talent development） ●"
          },
          {
            "raw": "创新驱动发展（innovation-driven development） ●",
            "en": "",
            "zh": "创新驱动发展（innovation-driven development） ●"
          },
          {
            "raw": "教育优先、科技自立自强、人才引领驱动 ●",
            "en": "",
            "zh": "教育优先、科技自立自强、人才引领驱动 ●"
          },
          {
            "raw": "教育优先（prioritizing education） ○",
            "en": "",
            "zh": "教育优先（prioritizing education） ○"
          },
          {
            "raw": "科技自立自强（self-reliance and strength in science and technology） ○",
            "en": "",
            "zh": "科技自立自强（self-reliance and strength in science and technology） ○"
          },
          {
            "raw": "人才引领驱动（talent-led development） ○",
            "en": "",
            "zh": "人才引领驱动（talent-led development） ○"
          },
          {
            "raw": "加快科技自立自强（self-reliance and strength in science and technology） ●",
            "en": "",
            "zh": "加快科技自立自强（self-reliance and strength in science and technology） ●"
          },
          {
            "raw": "关键核心技术创新（innovation in core technologies） ●",
            "en": "",
            "zh": "关键核心技术创新（innovation in core technologies） ●"
          },
          {
            "raw": "战略性新兴产业及其发展（developing strategic emerging industries） ●",
            "en": "",
            "zh": "战略性新兴产业及其发展（developing strategic emerging industries） ●"
          },
          {
            "raw": "完善科技创新体系（strengthening the innovation system） ●",
            "en": "",
            "zh": "完善科技创新体系（strengthening the innovation system） ●"
          },
          {
            "raw": "新型工业化；制造、质量、航天、交通、网络强国及数字中国 ●",
            "en": "",
            "zh": "新型工业化；制造、质量、航天、交通、网络强国及数字中国 ●"
          },
          {
            "raw": "新型工业化（new industrialization） ○",
            "en": "",
            "zh": "新型工业化（new industrialization） ○"
          },
          {
            "raw": "制造强国（manufacturing strength） ○",
            "en": "",
            "zh": "制造强国（manufacturing strength） ○"
          },
          {
            "raw": "质量强国（quality improvement） ○",
            "en": "",
            "zh": "质量强国（quality improvement） ○"
          },
          {
            "raw": "航天强国（a strong space sector） ○",
            "en": "",
            "zh": "航天强国（a strong space sector） ○"
          },
          {
            "raw": "交通强国（a strong transport sector） ○",
            "en": "",
            "zh": "交通强国（a strong transport sector） ○"
          },
          {
            "raw": "网络强国（national cyber capability） ○",
            "en": "",
            "zh": "网络强国（national cyber capability） ○"
          },
          {
            "raw": "数字中国（building a digital China） ○",
            "en": "",
            "zh": "数字中国（building a digital China） ○"
          },
          {
            "raw": "数字经济发展及数字经济与实体经济融合 ●",
            "en": "",
            "zh": "数字经济发展及数字经济与实体经济融合 ●"
          },
          {
            "raw": "数字经济发展（developing the digital economy） ○",
            "en": "",
            "zh": "数字经济发展（developing the digital economy） ○"
          },
          {
            "raw": "数实融合（integrating digital and real economies） ○",
            "en": "",
            "zh": "数实融合（integrating digital and real economies） ○"
          },
          {
            "raw": "现代化基础设施体系（modern infrastructure development） ●",
            "en": "",
            "zh": "现代化基础设施体系（modern infrastructure development） ●"
          },
          {
            "raw": "教育普及（expanding access to education） ●",
            "en": "",
            "zh": "教育普及（expanding access to education） ●"
          },
          {
            "raw": "现代化产业体系（a modern industrial system） ●",
            "en": "",
            "zh": "现代化产业体系（a modern industrial system） ●"
          }
        ],
        "socialChange": [
          {
            "raw": "public facilities multiply citywide and service quality rises 全市范围内的公共设施数量大幅增加，服务质量和水平也有所提升",
            "en": "public facilities multiply citywide and service quality rises",
            "zh": "全市范围内的公共设施数量大幅增加，服务质量和水平也有所提升"
          },
          {
            "raw": "infrastructure gaps narrow and living conditions improve 基础设施差距缩小，生活条件得到改善",
            "en": "infrastructure gaps narrow and living conditions improve",
            "zh": "基础设施差距缩小，生活条件得到改善"
          },
          {
            "raw": "technology makes daily life more convenient 科技让日常生活更加便利",
            "en": "technology makes daily life more convenient",
            "zh": "科技让日常生活更加便利"
          }
        ]
      }
    },
    {
      "id": "civilization",
      "index": 3,
      "name": "文明",
      "enName": "Civilization",
      "isKey": true,
      "topics": "文化传承、教育、读书、城市文明、精神文明、现代生活方式",
      "exams": "英一：2016/2017/2018/2022/2023年；英二： 2016/2017年",
      "slots": {
        "behavior": [
          {
            "raw": "appreciate cultural heritage and cultivate refined tastes 欣赏文化遗产并培养高雅品味",
            "en": "appreciate cultural heritage and cultivate refined tastes",
            "zh": "欣赏文化遗产并培养高雅品味"
          },
          {
            "raw": "read consistently and study classic works 持续阅读并研读经典著作",
            "en": "read consistently and study classic works",
            "zh": "持续阅读并研读经典著作"
          },
          {
            "raw": "pursue knowledge actively and think critically 积极追求知识并进行批判性思考",
            "en": "pursue knowledge actively and think critically",
            "zh": "积极追求知识并进行批判性思考"
          },
          {
            "raw": "learn through observation and hands-on practice 通过观察与动手实践学习",
            "en": "learn through observation and hands-on practice",
            "zh": "通过观察与动手实践学习"
          }
        ],
        "outcome": [
          {
            "raw": "deeper cultural identity and broader worldviews 更深厚的文化认同感和更广阔的世界观",
            "en": "deeper cultural identity and broader worldviews",
            "zh": "更深厚的文化认同感和更广阔的世界观"
          },
          {
            "raw": "enhanced intellectual capacity and cultural confidence 增强的智力水平和文化自信",
            "en": "enhanced intellectual capacity and cultural confidence",
            "zh": "增强的智力水平和文化自信"
          },
          {
            "raw": "refined judgment and meaningful self-expression 成熟的判断力和富有意义的自我表达",
            "en": "refined judgment and meaningful self-expression",
            "zh": "成熟的判断力和富有意义的自我表达"
          }
        ],
        "domain": [
          {
            "raw": "cultural heritage preservation 文化遗产保护",
            "en": "cultural heritage preservation",
            "zh": "文化遗产保护"
          },
          {
            "raw": "quality education 素质教育",
            "en": "quality education",
            "zh": "素质教育"
          },
          {
            "raw": "cultural-ethical development 精神文明建设",
            "en": "cultural-ethical development",
            "zh": "精神文明建设"
          }
        ],
        "ability": [
          {
            "raw": "appreciate traditional wisdom and integrate it with modern life 尊重传统智慧，并将其与现代生活相结合",
            "en": "appreciate traditional wisdom and integrate it with modern life",
            "zh": "尊重传统智慧，并将其与现代生活相结合"
          },
          {
            "raw": "pursue lifelong learning and develop cultural literacy 追求终身学习，培养文化素养",
            "en": "pursue lifelong learning and develop cultural literacy",
            "zh": "追求终身学习，培养文化素养"
          },
          {
            "raw": "cultivate aesthetic appreciation and critical thinking 培养审美鉴赏力和批判性思维",
            "en": "cultivate aesthetic appreciation and critical thinking",
            "zh": "培养审美鉴赏力和批判性思维"
          }
        ],
        "socialEffect": [
          {
            "raw": "reviving traditions and elevating public discourse 复兴传统并提升公众舆论水平",
            "en": "reviving traditions and elevating public discourse",
            "zh": "复兴传统并提升公众舆论水平"
          },
          {
            "raw": "enriching cultural life and strengthening shared identity 丰富文化生活并增强共同认同感",
            "en": "enriching cultural life and strengthening shared identity",
            "zh": "丰富文化生活并增强共同认同感"
          },
          {
            "raw": "fostering creative expression and cultural vitality 促进创新表达和文化活力",
            "en": "fostering creative expression and cultural vitality",
            "zh": "促进创新表达和文化活力"
          },
          {
            "raw": "developing practical skills and a cooperative spirit 培养实践能力与合作精神",
            "en": "developing practical skills and a cooperative spirit",
            "zh": "培养实践能力与合作精神"
          }
        ],
        "strategy": [
          {
            "raw": "教育、科技、人才、文化、体育强国及健康中国 ●",
            "en": "",
            "zh": "教育、科技、人才、文化、体育强国及健康中国 ●"
          },
          {
            "raw": "教育强国（a strong education system） ○",
            "en": "",
            "zh": "教育强国（a strong education system） ○"
          },
          {
            "raw": "科技强国（scientific and technological strength） ○",
            "en": "",
            "zh": "科技强国（scientific and technological strength） ○"
          },
          {
            "raw": "人才强国（building national strength through talent development） ○",
            "en": "",
            "zh": "人才强国（building national strength through talent development） ○"
          },
          {
            "raw": "文化强国（cultural strength） ○",
            "en": "",
            "zh": "文化强国（cultural strength） ○"
          },
          {
            "raw": "体育强国（sporting excellence） ○",
            "en": "",
            "zh": "体育强国（sporting excellence） ○"
          },
          {
            "raw": "健康中国（building a healthy China） ○",
            "en": "",
            "zh": "健康中国（building a healthy China） ○"
          },
          {
            "raw": "立德树人，培养德智体美劳全面发展的人才 ●",
            "en": "",
            "zh": "立德树人，培养德智体美劳全面发展的人才 ●"
          },
          {
            "raw": "立德树人（fostering virtue through education） ○",
            "en": "",
            "zh": "立德树人（fostering virtue through education） ○"
          },
          {
            "raw": "全面发展（fostering well-rounded development） ○",
            "en": "",
            "zh": "全面发展（fostering well-rounded development） ○"
          },
          {
            "raw": "全民终身学习的学习型社会（building a learning society） ●",
            "en": "",
            "zh": "全民终身学习的学习型社会（building a learning society） ●"
          },
          {
            "raw": "文化自信自强（cultural confidence and strength） ●",
            "en": "",
            "zh": "文化自信自强（cultural confidence and strength） ●"
          },
          {
            "raw": "国家文化数字化（cultural digitalization） ●",
            "en": "",
            "zh": "国家文化数字化（cultural digitalization） ●"
          },
          {
            "raw": "繁荣文化事业与文化产业（developing cultural services and industries） ●",
            "en": "",
            "zh": "繁荣文化事业与文化产业（developing cultural services and industries） ●"
          },
          {
            "raw": "传承中华优秀传统文化（preserving China's cultural heritage） ●",
            "en": "",
            "zh": "传承中华优秀传统文化（preserving China's cultural heritage） ●"
          },
          {
            "raw": "中华文明传播力影响力（enhancing Chinese civilization's reach and influence） ●",
            "en": "",
            "zh": "中华文明传播力影响力（enhancing Chinese civilization's reach and influence） ●"
          },
          {
            "raw": "讲好中国故事、传播好中国声音（sharing China's stories and perspectives） ●",
            "en": "",
            "zh": "讲好中国故事、传播好中国声音（sharing China's stories and perspectives） ●"
          },
          {
            "raw": "文化和旅游深度融合（integrating culture and tourism） ●",
            "en": "",
            "zh": "文化和旅游深度融合（integrating culture and tourism） ●"
          },
          {
            "raw": "物质文明和精神文明相协调（balanced material and cultural-ethical progress） ●",
            "en": "",
            "zh": "物质文明和精神文明相协调（balanced material and cultural-ethical progress） ●"
          },
          {
            "raw": "良好网络生态（a sound online environment） ●",
            "en": "",
            "zh": "良好网络生态（a sound online environment） ●"
          },
          {
            "raw": "文明交流互鉴（mutual learning through exchanges among civilizations） ●",
            "en": "",
            "zh": "文明交流互鉴（mutual learning through exchanges among civilizations） ●"
          }
        ],
        "socialChange": [
          {
            "raw": "traditional arts gain modern audiences and creative industries flourish 传统艺术吸引了现代观众，创意产业也蓬勃发展起来",
            "en": "traditional arts gain modern audiences and creative industries flourish",
            "zh": "传统艺术吸引了现代观众，创意产业也蓬勃发展起来"
          },
          {
            "raw": "cultural activities proliferate and public libraries thrive 文化活动日益增多，公共图书馆也蓬勃发展起来",
            "en": "cultural activities proliferate and public libraries thrive",
            "zh": "文化活动日益增多，公共图书馆也蓬勃发展起来"
          },
          {
            "raw": "cultural heritage receives better protection and wider appreciation 文化遗产得到了更好的保护，并获得了更广泛的重视",
            "en": "cultural heritage receives better protection and wider appreciation",
            "zh": "文化遗产得到了更好的保护，并获得了更广泛的重视"
          },
          {
            "raw": "more people participate in lifelong learning 更多人参与终身学习",
            "en": "more people participate in lifelong learning",
            "zh": "更多人参与终身学习"
          }
        ]
      }
    },
    {
      "id": "dedication",
      "index": 4,
      "name": "敬业",
      "enName": "Dedication",
      "isKey": false,
      "topics": "工作态度、学习态度、行动力、执行力、务实精神、坚持",
      "exams": "英一：2017/2019/2020年；英二： 2019/2024年",
      "slots": {
        "behavior": [
          {
            "raw": "fulfill their duties and pursue excellence 履行职责并追求卓越",
            "en": "fulfill their duties and pursue excellence",
            "zh": "履行职责并追求卓越"
          },
          {
            "raw": "turn plans into action and replace excuses with effort 将计划化为行动，以努力代替借口",
            "en": "turn plans into action and replace excuses with effort",
            "zh": "将计划化为行动，以努力代替借口"
          },
          {
            "raw": "persist through obstacles and refine their skills consistently 坚持不懈地克服困难，并持续提升自己的技能",
            "en": "persist through obstacles and refine their skills consistently",
            "zh": "坚持不懈地克服困难，并持续提升自己的技能"
          }
        ],
        "outcome": [
          {
            "raw": "professional competence and career fulfillment 专业能力和职业成就",
            "en": "professional competence and career fulfillment",
            "zh": "专业能力和职业成就"
          },
          {
            "raw": "tangible achievements and growing capabilities 切实的成果和不断增强的能力",
            "en": "tangible achievements and growing capabilities",
            "zh": "切实的成果和不断增强的能力"
          },
          {
            "raw": "expertise and sustained progress 专业造诣与持续进步",
            "en": "expertise and sustained progress",
            "zh": "专业造诣与持续进步"
          }
        ],
        "domain": [
          {
            "raw": "talent development 人才培养",
            "en": "talent development",
            "zh": "人才培养"
          },
          {
            "raw": "vocational training and skill enhancement 职业培训与技能提升",
            "en": "vocational training and skill enhancement",
            "zh": "职业培训与技能提升"
          },
          {
            "raw": "innovation-driven development 创新驱动发展",
            "en": "innovation-driven development",
            "zh": "创新驱动发展"
          }
        ],
        "ability": [
          {
            "raw": "fulfill duties and consistently pursue excellence 履行职责并始终追求卓越",
            "en": "fulfill duties and consistently pursue excellence",
            "zh": "履行职责并始终追求卓越"
          },
          {
            "raw": "bridge the gap between knowing and doing 缩小认知与行动之间的差距",
            "en": "bridge the gap between knowing and doing",
            "zh": "缩小认知与行动之间的差距"
          },
          {
            "raw": "develop expertise through deliberate practice and learning 通过刻意练习和学习来培养专业技能",
            "en": "develop expertise through deliberate practice and learning",
            "zh": "通过刻意练习和学习来培养专业技能"
          }
        ],
        "socialEffect": [
          {
            "raw": "raising professional standards and driving innovation 提高专业标准并推动创新",
            "en": "raising professional standards and driving innovation",
            "zh": "提高专业标准并推动创新"
          },
          {
            "raw": "increasing productivity and accelerating breakthroughs 提高生产力和加快突破进程",
            "en": "increasing productivity and accelerating breakthroughs",
            "zh": "提高生产力和加快突破进程"
          },
          {
            "raw": "building a culture of excellence and accountability 建立一种追求卓越和注重责任的文化",
            "en": "building a culture of excellence and accountability",
            "zh": "建立一种追求卓越和注重责任的文化"
          }
        ],
        "strategy": [
          {
            "raw": "就业优先（an employment-first approach） ●",
            "en": "",
            "zh": "就业优先（an employment-first approach） ●"
          },
          {
            "raw": "劳动者权益保障（protecting workers' rights） ●",
            "en": "",
            "zh": "劳动者权益保障（protecting workers' rights） ●"
          },
          {
            "raw": "劳动、奋斗、奉献、创造、勤俭节约精神 ●",
            "en": "",
            "zh": "劳动、奋斗、奉献、创造、勤俭节约精神 ●"
          },
          {
            "raw": "劳动、奋斗与奉献（a spirit of hard work and dedication） ○",
            "en": "",
            "zh": "劳动、奋斗与奉献（a spirit of hard work and dedication） ○"
          },
          {
            "raw": "创造精神（a spirit of innovation） ○",
            "en": "",
            "zh": "创造精神（a spirit of innovation） ○"
          },
          {
            "raw": "勤俭节约（diligence and thrift） ○",
            "en": "",
            "zh": "勤俭节约（diligence and thrift） ○"
          },
          {
            "raw": "科学家精神与优良学风（scientific ethos and academic integrity） ●",
            "en": "",
            "zh": "科学家精神与优良学风（scientific ethos and academic integrity） ●"
          },
          {
            "raw": "谦虚谨慎、艰苦奋斗（humility, prudence and hard work） ●",
            "en": "",
            "zh": "谦虚谨慎、艰苦奋斗（humility, prudence and hard work） ●"
          }
        ],
        "socialChange": [
          {
            "raw": "productivity increases and technological breakthroughs accelerate 生产效率提高，技术突破不断加速",
            "en": "productivity increases and technological breakthroughs accelerate",
            "zh": "生产效率提高，技术突破不断加速"
          },
          {
            "raw": "craftsmanship improves and innovation becomes widespread 工艺水平得以提升，创新也得以广泛推广",
            "en": "craftsmanship improves and innovation becomes widespread",
            "zh": "工艺水平得以提升，创新也得以广泛推广"
          },
          {
            "raw": "professional standards rise across industries 各行业的职业标准普遍提高",
            "en": "professional standards rise across industries",
            "zh": "各行业的职业标准普遍提高"
          }
        ]
      }
    },
    {
      "id": "kindness",
      "index": 5,
      "name": "友善",
      "enName": "Kindness",
      "isKey": false,
      "topics": "人际关系、同情心、互助、社区凝聚、关爱弱势群体",
      "exams": "英一：2015年；英二：",
      "slots": {
        "behavior": [
          {
            "raw": "show empathy and build warm relationships 体谅他人并建立温暖的人际关系",
            "en": "show empathy and build warm relationships",
            "zh": "体谅他人并建立温暖的人际关系"
          },
          {
            "raw": "offer help proactively and care for those in need 主动提供帮助并关心有需要的人",
            "en": "offer help proactively and care for those in need",
            "zh": "主动提供帮助并关心有需要的人"
          },
          {
            "raw": "treat others with genuine respect and consideration 以真诚的尊重和关怀对待他人",
            "en": "treat others with genuine respect and consideration",
            "zh": "以真诚的尊重和关怀对待他人"
          }
        ],
        "outcome": [
          {
            "raw": "supportive networks and meaningful relationships 支持性的网络和有意义的人际关系",
            "en": "supportive networks and meaningful relationships",
            "zh": "支持性的网络和有意义的人际关系"
          },
          {
            "raw": "emotional fulfillment and strong social bonds 情感上的满足以及牢固的社会关系",
            "en": "emotional fulfillment and strong social bonds",
            "zh": "情感上的满足以及牢固的社会关系"
          },
          {
            "raw": "trust from others and reciprocal care 来自他人的信任以及相互之间的关爱",
            "en": "trust from others and reciprocal care",
            "zh": "来自他人的信任以及相互之间的关爱"
          }
        ],
        "domain": [
          {
            "raw": "community governance 社区管治",
            "en": "community governance",
            "zh": "社区管治"
          },
          {
            "raw": "social harmony 社会和谐",
            "en": "social harmony",
            "zh": "社会和谐"
          },
          {
            "raw": "volunteer service development 志愿服务发展",
            "en": "volunteer service development",
            "zh": "志愿服务发展"
          }
        ],
        "ability": [
          {
            "raw": "show empathy and build warm connections across differences 展现同理心，并跨越差异建立深厚联系",
            "en": "show empathy and build warm connections across differences",
            "zh": "展现同理心，并跨越差异建立深厚联系"
          },
          {
            "raw": "volunteer and help vulnerable groups 参与志愿服务并帮助弱势群体",
            "en": "volunteer and help vulnerable groups",
            "zh": "参与志愿服务并帮助弱势群体"
          },
          {
            "raw": "practice compassion and contribute to community welfare 培养慈悲之心，并为社区福祉做出贡献",
            "en": "practice compassion and contribute to community welfare",
            "zh": "培养慈悲之心，并为社区福祉做出贡献"
          }
        ],
        "socialEffect": [
          {
            "raw": "reducing isolation and encouraging mutual assistance 减少孤立状态，鼓励相互帮助",
            "en": "reducing isolation and encouraging mutual assistance",
            "zh": "减少孤立状态，鼓励相互帮助"
          },
          {
            "raw": "creating inclusive communities where everyone feels valued 创建包容性的社区，让每个人都能感到受到尊重",
            "en": "creating inclusive communities where everyone feels valued",
            "zh": "创建包容性的社区，让每个人都能感到受到尊重"
          },
          {
            "raw": "strengthening the social fabric and neighborhood cohesion 加强社会联系与邻里凝聚力",
            "en": "strengthening the social fabric and neighborhood cohesion",
            "zh": "加强社会联系与邻里凝聚力"
          }
        ],
        "strategy": [
          {
            "raw": "中华传统美德与家庭家教家风",
            "en": "",
            "zh": "中华传统美德与家庭家教家风"
          },
          {
            "raw": "传统美德（the cultivation of traditional virtues）",
            "en": "the cultivation of traditional virtues",
            "zh": "传统美德"
          },
          {
            "raw": "家庭家教家风（strengthening family education and traditions）",
            "en": "strengthening family education and traditions",
            "zh": "家庭家教家风"
          },
          {
            "raw": "人类命运共同体（a community with a shared future for mankind）",
            "en": "a community with a shared future for mankind",
            "zh": "人类命运共同体"
          },
          {
            "raw": "文明交流互鉴（mutual learning through exchanges among civilizations）",
            "en": "mutual learning through exchanges among civilizations",
            "zh": "文明交流互鉴"
          },
          {
            "raw": "高水平对外开放（high-standard opening up）",
            "en": "high-standard opening up",
            "zh": "高水平对外开放"
          }
        ],
        "socialChange": [
          {
            "raw": "mutual assistance becomes commonplace and social isolation declines 互助行为变得屡见不鲜，而社会孤立现象则有所减少",
            "en": "mutual assistance becomes commonplace and social isolation declines",
            "zh": "互助行为变得屡见不鲜，而社会孤立现象则有所减少"
          },
          {
            "raw": "vulnerable groups receive better care and community support strengthens 弱势群体得到了更好的照顾，社区的支持也更加有力了",
            "en": "vulnerable groups receive better care and community support strengthens",
            "zh": "弱势群体得到了更好的照顾，社区的支持也更加有力了"
          },
          {
            "raw": "volunteering flourishes and helping becomes natural 志愿服务蓬勃发展，助人行为也变得自然而然起来",
            "en": "volunteering flourishes and helping becomes natural",
            "zh": "志愿服务蓬勃发展，助人行为也变得自然而然起来"
          }
        ]
      }
    },
    {
      "id": "patriotism",
      "index": 6,
      "name": "爱国",
      "enName": "Patriotism",
      "isKey": false,
      "topics": "国家认同、文化认同、民族自豪、传统继承、集体意识",
      "exams": "英一：2021/2023年；英二：",
      "slots": {
        "behavior": [
          {
            "raw": "develop cultural identity and connect with national heritage 培养文化认同感，并与国家文化遗产建立联系",
            "en": "develop cultural identity and connect with national heritage",
            "zh": "培养文化认同感，并与国家文化遗产建立联系"
          },
          {
            "raw": "take pride in traditions and contribute to collective goals 以传统为荣，并为共同目标做出贡献",
            "en": "take pride in traditions and contribute to collective goals",
            "zh": "以传统为荣，并为共同目标做出贡献"
          },
          {
            "raw": "participate in cultural practices and preserve shared customs 参与文化活动并传承共同的习俗",
            "en": "participate in cultural practices and preserve shared customs",
            "zh": "参与文化活动并传承共同的习俗"
          }
        ],
        "outcome": [
          {
            "raw": "a stronger sense of belonging and purpose beyond personal gain 更强的归属感和超越个人利益的使命感",
            "en": "a stronger sense of belonging and purpose beyond personal gain",
            "zh": "更强的归属感和超越个人利益的使命感"
          },
          {
            "raw": "cultural confidence and national pride 文化自信与民族自豪感",
            "en": "cultural confidence and national pride",
            "zh": "文化自信与民族自豪感"
          },
          {
            "raw": "meaningful connections to history and community 与历史和社区之间有意义的联系",
            "en": "meaningful connections to history and community",
            "zh": "与历史和社区之间有意义的联系"
          }
        ],
        "domain": [
          {
            "raw": "ideological education 思想教育",
            "en": "ideological education",
            "zh": "思想教育"
          },
          {
            "raw": "cultural identity development 文化认同构建",
            "en": "cultural identity development",
            "zh": "文化认同构建"
          },
          {
            "raw": "patriotic education 爱国教育",
            "en": "patriotic education",
            "zh": "爱国教育"
          }
        ],
        "ability": [
          {
            "raw": "balance personal aspirations with national needs 在个人抱负与国家需求之间取得平衡",
            "en": "balance personal aspirations with national needs",
            "zh": "在个人抱负与国家需求之间取得平衡"
          },
          {
            "raw": "embrace cultural heritage and develop national consciousness 传承文化遗产并增强民族意识",
            "en": "embrace cultural heritage and develop national consciousness",
            "zh": "传承文化遗产并增强民族意识"
          },
          {
            "raw": "contribute to nation-building and collective progress 为国家建设与集体进步作出贡献",
            "en": "contribute to nation-building and collective progress",
            "zh": "为国家建设与集体进步作出贡献"
          }
        ],
        "socialEffect": [
          {
            "raw": "uniting diverse groups and mobilizing collective will 团结不同的群体并凝聚集体意志",
            "en": "uniting diverse groups and mobilizing collective will",
            "zh": "团结不同的群体并凝聚集体意志"
          },
          {
            "raw": "reviving traditions and strengthening national identity 复兴传统并强化民族认同感",
            "en": "reviving traditions and strengthening national identity",
            "zh": "复兴传统并强化民族认同感"
          },
          {
            "raw": "fostering cultural continuity and social cohesion 促进文化传承与社会团结",
            "en": "fostering cultural continuity and social cohesion",
            "zh": "促进文化传承与社会团结"
          }
        ],
        "strategy": [
          {
            "raw": "坚持和加强党的全面领导（strengthening the Party's overall leadership）",
            "en": "strengthening the Party's overall leadership",
            "zh": "坚持和加强党的全面领导"
          },
          {
            "raw": "坚持中国特色社会主义（upholding socialism with Chinese characteristics）",
            "en": "upholding socialism with Chinese characteristics",
            "zh": "坚持中国特色社会主义"
          },
          {
            "raw": "牢记初心使命（staying true to original aspirations and missions）",
            "en": "staying true to original aspirations and missions",
            "zh": "牢记初心使命"
          },
          {
            "raw": "维护国家安全（safeguarding national security）",
            "en": "safeguarding national security",
            "zh": "维护国家安全"
          },
          {
            "raw": "坚持一个中国（upholding the one-China principle）",
            "en": "upholding the one-China principle",
            "zh": "坚持一个中国"
          },
          {
            "raw": "坚持完善一国两制、推进祖国统一",
            "en": "",
            "zh": "坚持完善一国两制、推进祖国统一"
          },
          {
            "raw": "一国两制（upholding One Country, Two Systems）",
            "en": "upholding One Country, Two Systems",
            "zh": "一国两制"
          },
          {
            "raw": "国家统一（national reunification）",
            "en": "national reunification",
            "zh": "国家统一"
          },
          {
            "raw": "人类命运共同体（a community with a shared future for mankind）",
            "en": "a community with a shared future for mankind",
            "zh": "人类命运共同体"
          },
          {
            "raw": "负责任大国担当（fulfilling responsibilities as a major country）",
            "en": "fulfilling responsibilities as a major country",
            "zh": "负责任大国担当"
          }
        ],
        "socialChange": [
          {
            "raw": "cultural traditions revive and patriotic sentiment strengthens 文化传统得以复兴，爱国情感也愈发强烈",
            "en": "cultural traditions revive and patriotic sentiment strengthens",
            "zh": "文化传统得以复兴，爱国情感也愈发强烈"
          },
          {
            "raw": "national pride translates into concrete civic action 民族自豪感会转化为具体的公民行动",
            "en": "national pride translates into concrete civic action",
            "zh": "民族自豪感会转化为具体的公民行动"
          },
          {
            "raw": "younger generations embrace heritage with fresh enthusiasm 年轻一代以全新的热情来传承传统",
            "en": "younger generations embrace heritage with fresh enthusiasm",
            "zh": "年轻一代以全新的热情来传承传统"
          }
        ]
      }
    },
    {
      "id": "integrity",
      "index": 7,
      "name": "诚信",
      "enName": "Integrity",
      "isKey": false,
      "topics": "信任、诚实、信用体系、商业道德、承诺兑现",
      "exams": "英一：2019/2020年；英二：",
      "slots": {
        "behavior": [
          {
            "raw": "deal honestly and consistently honor commitments 诚实交往并始终履行承诺",
            "en": "deal honestly and consistently honor commitments",
            "zh": "诚实交往并始终履行承诺"
          },
          {
            "raw": "keep promises even when inconvenient and admit mistakes openly 即使在困难的情况下也要信守承诺，并且勇于公开承认错误",
            "en": "keep promises even when inconvenient and admit mistakes openly",
            "zh": "即使在困难的情况下也要信守承诺，并且勇于公开承认错误"
          },
          {
            "raw": "act transparently and maintain ethical standards 公开透明地行事并坚守道德标准",
            "en": "act transparently and maintain ethical standards",
            "zh": "公开透明地行事并坚守道德标准"
          }
        ],
        "outcome": [
          {
            "raw": "trustworthy reputations and stable relationships 值得信赖的声誉和稳定的关系",
            "en": "trustworthy reputations and stable relationships",
            "zh": "值得信赖的声誉和稳定的关系"
          },
          {
            "raw": "respect from others and lasting partnerships 来自他人的尊重以及长久的伙伴关系",
            "en": "respect from others and lasting partnerships",
            "zh": "来自他人的尊重以及长久的伙伴关系"
          },
          {
            "raw": "credibility that creates opportunities 能够带来机会的信誉",
            "en": "credibility that creates opportunities",
            "zh": "能够带来机会的信誉"
          }
        ],
        "domain": [
          {
            "raw": "social credit system development 社会信用体系建设",
            "en": "social credit system development",
            "zh": "社会信用体系建设"
          },
          {
            "raw": "market integrity 市场诚信",
            "en": "market integrity",
            "zh": "市场诚信"
          },
          {
            "raw": "business ethics 商业道德",
            "en": "business ethics",
            "zh": "商业道德"
          }
        ],
        "ability": [
          {
            "raw": "uphold honesty in transactions and honor commitments reliably 在交易中保持诚实，切实履行承诺",
            "en": "uphold honesty in transactions and honor commitments reliably",
            "zh": "在交易中保持诚实，切实履行承诺"
          },
          {
            "raw": "maintain ethical standards and build trustworthy reputations 保持道德标准并树立值得信赖的声誉",
            "en": "maintain ethical standards and build trustworthy reputations",
            "zh": "保持道德标准并树立值得信赖的声誉"
          },
          {
            "raw": "practice transparency and resist dishonest temptations 保持透明度，抵制不诚实的诱惑",
            "en": "practice transparency and resist dishonest temptations",
            "zh": "保持透明度，抵制不诚实的诱惑"
          }
        ],
        "socialEffect": [
          {
            "raw": "lowering transaction costs and facilitating cooperation 降低交易成本并促进顺畅合作",
            "en": "lowering transaction costs and facilitating cooperation",
            "zh": "降低交易成本并促进顺畅合作"
          },
          {
            "raw": "building trust-based relationships and reliable systems 建立基于信任的关系以及可靠的系统",
            "en": "building trust-based relationships and reliable systems",
            "zh": "建立基于信任的关系以及可靠的系统"
          },
          {
            "raw": "reducing fraud and strengthening market confidence 减少欺诈行为并增强市场信心",
            "en": "reducing fraud and strengthening market confidence",
            "zh": "减少欺诈行为并增强市场信心"
          }
        ],
        "strategy": [
          {
            "raw": "建设诚信社会（building a trustworthy society）",
            "en": "building a trustworthy society",
            "zh": "建设诚信社会"
          },
          {
            "raw": "弘扬诚信文化（a culture of integrity）",
            "en": "a culture of integrity",
            "zh": "弘扬诚信文化"
          },
          {
            "raw": "完善市场诚信体系（improving market integrity）",
            "en": "improving market integrity",
            "zh": "完善市场诚信体系"
          },
          {
            "raw": "反对形式主义（rejecting formalism）",
            "en": "rejecting formalism",
            "zh": "反对形式主义"
          },
          {
            "raw": "实事求是、与时俱进、求真务实（a fact-based, forward-looking and pragmatic approach）",
            "en": "a fact-based, forward-looking and pragmatic approach",
            "zh": "实事求是、与时俱进、求真务实"
          }
        ],
        "socialChange": [
          {
            "raw": "transaction costs decline and business cooperation flows smoothly 交易成本降低，商业合作得以顺利进行",
            "en": "transaction costs decline and business cooperation flows smoothly",
            "zh": "交易成本降低，商业合作得以顺利进行"
          },
          {
            "raw": "market fraud decreases and consumer confidence strengthens 市场欺诈行为减少，消费者信心增强",
            "en": "market fraud decreases and consumer confidence strengthens",
            "zh": "市场欺诈行为减少，消费者信心增强"
          },
          {
            "raw": "contracts are honored and promises are kept 合同得到履行，承诺得到兑现",
            "en": "contracts are honored and promises are kept",
            "zh": "合同得到履行，承诺得到兑现"
          }
        ]
      }
    },
    {
      "id": "supplementary",
      "index": 8,
      "name": "自主补充语料（选背）",
      "enName": "Advanced Policy & Systematic Thinking",
      "isKey": false,
      "topics": "统筹协调、以人为本、全过程人民民主、两个结合、系统观念等高阶时政论述",
      "exams": "通用高阶升华句（适用【相关战略】）",
      "slots": {
        "strategy": [
          {
            "raw": "统筹推进经济建设、政治建设、文化建设、社会建设、生态文明建设 (coordinating economic, political, cultural, social, and ecological development)",
            "en": "coordinating economic, political, cultural, social, and ecological development",
            "zh": "统筹推进经济建设、政治建设、文化建设、社会建设、生态文明建设"
          },
          {
            "raw": "发展全过程人民民主 (developing whole-process people's democracy)",
            "en": "developing whole-process people's democracy",
            "zh": "发展全过程人民民主"
          },
          {
            "raw": "以人为核心(在城镇化与公共服务中的贯彻) (a people-centered approach in urbanization and public services)",
            "en": "a people-centered approach in urbanization and public services",
            "zh": "以人为核心(在城镇化与公共服务中的贯彻)"
          },
          {
            "raw": "把马克思主义基本原理同中国具体实际相结合、同中华优秀传统文化相结合 (integrating the fundamental principles of Marxism with China's reality and fine traditional culture)",
            "en": "integrating the fundamental principles of Marxism with China's reality and fine traditional culture",
            "zh": "把马克思主义基本原理同中国具体实际相结合、同中华优秀传统文化相结合"
          },
          {
            "raw": "系统观念 (systematic thinking)",
            "en": "systematic thinking",
            "zh": "系统观念"
          },
          {
            "raw": "用普遍联系的、全面系统的、发展变化的观点观察事物，才能把握事物发展规律 (observing things from a perspective of universal connection, holistic understanding, and dynamic development to grasp their underlying laws)",
            "en": "observing things from a perspective of universal connection, holistic understanding, and dynamic development to grasp their underlying laws",
            "zh": "用普遍联系的、全面系统的、发展变化的观点观察事物，才能把握事物发展规律"
          }
        ]
      }
    }
  ],
  "practiceE2": [
    {
      "year": 2026,
      "title": "儿童户外活动与全面发展",
      "tier": "满分版",
      "tierKey": "full",
      "coreTheme": "fostering children's well-rounded development（促进儿童全面发展）",
      "wordCount": 184,
      "enEssay": "The figures in the bar chart reveal notable differences concerning fostering children's well-rounded development. In a survey of views on children's outdoor activities, satisfying curiosity accounts for the largest share, at 54.6%, followed by improving observation skills, building physical fitness and increasing parent-child interaction at 54.5%, 37.2% and 33.2% respectively.\n\nFostering children's well-rounded development has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people take children outdoors to explore and exercise, ultimately contributing to enhanced intellectual capacity and overall well-being. National policies on quality education likewise focus on empowering individuals to learn through observation and hands-on practice. Beyond personal advancement, this principle can strengthen communities by developing practical skills and a cooperative spirit, laying the groundwork for sustainable progress. This is in line with national strategies for strengthening family education: as this principle takes root, mutual care becomes commonplace.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when fostering children's well-rounded development guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "条形图中的数据揭示了有关促进儿童全面发展的显著差异。在一项关于儿童户外活动看法的调查中，满足好奇心占比最高，为54.6%；随后是促进观察力、强身健体和增强亲子互动，分别占54.5%、37.2%和33.2%。\n\n促进儿童全面发展受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们带儿童到户外探索和锻炼的做法中，最终有助于提升认知能力并增进整体安康。国家在素质教育方面的政策，同样着重于使个人能够通过观察与动手实践学习。除个人发展之外，这一原则还可以通过培养实践能力与合作精神增强社区，为可持续进步奠定基础。这与国家关于加强家庭教育的战略相契合：随着这一理念逐渐扎根，相互关爱逐渐成为普遍的风尚。\n\n总之，人们已经形成一种基于理性认识的共识，即当促进儿童全面发展这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、主题怎样从材料中提炼\n好奇心与观察力两项比例最高且非常接近；身体锻炼与亲子互动补充另外两个方面。好奇心和观察力联系认识世界，身体活动联系健康成长，亲子互动联系共同活动中的交流与陪伴。三层共同指向儿童多方面成长，因此选用 fostering children's well-rounded development。\n论述顺序： 家庭带儿童探索与锻炼 → 儿童获得认知和身心收益 → 素质教育支持观察与实践 → 培养实践能力和合作精神 → 家庭教育将陪伴与关爱落实到日常生活。\n二、第一段怎样组织\nIn a survey of views on children's outdoor activities, satisfying curiosity accounts for the largest share, at\n54.6%, followed by improving observation skills, building physical fitness and increasing parent-child interaction at 54.5%, 37.2% and 33.2% respectively.先交代调查对象，再以 accounts for the largest share 写最大项，以 followed by 连接其余类别，respectively 对应各项比例。\n条形图中的数据揭示了有关促进儿童全面发展的显著差异。在一项关于儿童户外活动看法的调查中，满足好奇心占比最高，为54.6%；随后是促进观察力、强身健体和增强亲子互动，分别占54.5%、37.2%和33.2%。\n三、第二段逐句拆解\n① 主题总起\nFostering children's well-rounded development has attracted attention, not least because of its far-reaching implications.以促进儿童全面发展总起，下面的行为、政策支持和社会作用逐层展开这一主题。\n② 个人行为与成果\nAt the individual level, it is reflected in the way people take children outdoors to explore and exercise, ultimately contributing to enhanced intellectual capacity and overall well-being.\n【具体行为】 take children outdoors to explore and exercise（带儿童到户外探索和锻炼）\n语料取用： 从首段 children's outdoor activities 出发，用 take children outdoors 写成人的具体行动，再以 explore and exercise 对应观察探索与身体活动。\n【可见成果】 enhanced intellectual capacity and overall well-being（提升认知能力并增进整体安康）\n语料取用： 文明类【可见成果】：enhanced intellectual capacity and cultural confidence，取 enhanced intellectual capacity；和谐类【可见成果】：inner peace and overall well-being，取 overall well-being。组合为 enhanced intellectual capacity and overall well-being。\n探索和锻炼对应儿童认知与身心收益，具体活动使全面发展的目标可见。\n③ 政策领域与个人能力\nNational policies on quality education likewise focus on empowering individuals to learn through observation and hands-on practice.\n【相关领域】 quality education（素质教育）\n语料取用： 文明类【相关领域】原句：quality education。\n【个人能力／行为】 learn through observation and hands-on practice（通过观察与动手实践学习）\n语料取用： 文明类【具体行为】完整原句：learn through observation and hands-on practice，用于个人能力位置。\n好奇心需要探索机会，观察力在接触实际事物时得到运用，因此教育支持指向观察与实践。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by developing practical skills and a cooperative spirit, laying the groundwork for sustainable progress.\n【社会效果】 developing practical skills and a cooperative spirit（培养实践能力与合作精神）\n语料取用： 文明类【社会效果】完整原句：developing practical skills and a cooperative spirit。\n实践能力承接探索与动手，合作精神从亲子共同活动的交流和配合进一步展开。\n⑤ 相关战略与社会变化\nThis is in line with national strategies for strengthening family education: as this principle takes root, mutual care becomes commonplace.\n【相关战略】 strengthening family education（加强家庭教育）\n语料取用： 友善类【相关战略】原句：strengthening family education and traditions。取 strengthening family education。\n【社会变化】 mutual care becomes commonplace（相互关爱逐渐成为普遍的风尚）\n语料取用： 和谐类【社会变化】原句：conflicts decrease and mutual care becomes commonplace。取后半个完整小句 mutual care becomes commonplace。\n家庭教育承接成人的陪伴与参与，相互关爱将共同活动中的倾听、回应和照顾扩展到家庭日常。\n四、第三段怎样收束\n以 fostering children's well-rounded development（促进儿童全面发展） 回扣个人与社区的共同收益，并提出倡导这一方向的必要性。"
    },
    {
      "year": 2026,
      "title": "儿童户外活动与全面发展",
      "tier": "简化版",
      "tierKey": "simplified",
      "coreTheme": "fostering children's well-rounded development（促进儿童全面发展）",
      "wordCount": 179,
      "enEssay": "The figures in the bar chart reveal notable differences concerning fostering children's well-rounded development. In a survey of views on children's outdoor activities, satisfying curiosity accounts for the largest share, at 54.6%, followed by improving observation skills, building physical fitness and increasing parent-child interaction at 54.5%, 37.2% and 33.2% respectively.\n\nFostering children's well-rounded development has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people take children outdoors to explore and exercise, ultimately contributing to personal development and well-being. National policies on quality education likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by developing practical skills and a cooperative spirit, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when fostering children's well-rounded development guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "条形图中的数据揭示了有关促进儿童全面发展的显著差异。在一项关于儿童户外活动看法的调查中，满足好奇心占比最高，为54.6%；随后是促进观察力、强身健体和增强亲子互动，分别占54.5%、37.2%和33.2%。\n\n促进儿童全面发展受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们带儿童到户外探索和锻炼的做法中，最终有助于个人发展与福祉。国家在素质教育方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过培养实践能力与合作精神增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n\n总之，人们已经形成一种基于理性认识的共识，即当促进儿童全面发展这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 提取材料信息图表统计人们对儿童户外活动的看法。满足好奇心占54.6%，促进观察力占54.5%，强身健体占37.2%，增强亲子互动占33.2%。前两项比例最高且非常接近。\n2. 从材料理解含义好奇心和观察力联系儿童认识世界，身体活动联系健康成长，亲子互动联系陪伴与共同参与。这几种价值可以从认知、身体及情感交往三个方面理解。\n3. 确定主题从文明类的素质教育与全面成长出发，确定 fostering children's well-rounded development。具体行为写带儿童探索和锻炼，社会作用落在实践能力和合作精神。\n本文主题： fostering children's well-rounded development（促进儿童全面发展）\n二、第一段怎样组织\nThe figures in the bar chart reveal notable differences concerning fostering children's well-rounded development. In a survey of views on children's outdoor activities, satisfying curiosity accounts for the largest share, at 54.6%, followed by improving observation skills, building physical fitness and increasing parent-child interaction at 54.5%, 37.2% and 33.2% respectively. In a survey of views on children's outdoor activities 说明调查内容。satisfying curiosity accounts for the largest share写54.6%的最高项，followed by 依次列出观察力、身体锻炼和亲子互动，respectively 对应54.5%、37.2%和\n33.2%。\n三、第二段逐句拆解\n① 主题总起\nFostering children's well-rounded development has attracted attention, not least because of its far-reaching implications.促进儿童全面发展受到关注，一个重要原因是其影响深远。\n以促进儿童全面发展总起，下文由个人行动进入政策支持，再展开本题的社会作用。\n② 个人行为与个人收益\nAt the individual level, it is reflected in the way people take children outdoors to explore and exercise, ultimately contributing to personal development and well-being.在个人层面，它体现在人们带儿童到户外探索和锻炼的做法中，最终有助于个人发展与福祉。\n【具体行为】 take children outdoors to explore and exercise（带儿童到户外探索和锻炼）\n语料取用： 从首段的 children's outdoor activities 出发，组织 take children outdoors，再用 explore and exercise 对应观察探索与身体活动，得到 take children outdoors to explore and exercise。\n成人带儿童共同参加户外活动，行为中直接保留儿童、户外、探索和锻炼，使全面成长有具体的活动内容。\npersonal development and well-being 将个人收益概括为发展与福祉。\n③ 政策领域与个人潜能\nNational policies on quality education likewise focus on empowering individuals to achieve their full potential.国家在素质教育方面的政策，同样着重于使个人能够充分发挥自身潜能。\n【相关领域】 quality education（素质教育）\n语料取用： 文明类【相关领域】原句：quality education。\n素质教育承接认知、身体与交往等多方面成长，将户外活动的教育价值联系到个人潜能的发展。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by developing practical skills and a cooperative spirit, laying the groundwork for sustainable progress.除个人发展之外，这一原则还可以通过培养实践能力与合作精神增强社区，为可持续进步奠定基础。\n【社会效果】 developing practical skills and a cooperative spirit（培养实践能力与合作精神）\n语料取用： 文明类【社会效果】完整原句：developing practical skills and a cooperative spirit。\n实践能力承接观察、探索和实际活动，合作精神从亲子互动中的共同参与进一步展开：儿童在交流、倾听和配合中学习与他人一起活动。社会价值落在成长中的能力和相处方式上。\n⑤ 宏观收束\nAs this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n从前一句的具体社会作用，进一步归纳这一理念对共同生活与长期发展的意义。\n四、第三段怎样收束\n从四项户外活动价值概括儿童的多方面成长，再以探索锻炼、素质教育和实践合作逐层展开，结尾归纳促进儿童全面发展的个人与社会意义。\n全文论述顺序： 带儿童探索与锻炼 → 个人发展与福祉 → 素质教育支持潜能 → 实践能力与合作精神 → 社会和谐与长期繁荣。"
    },
    {
      "year": 2026,
      "title": "儿童户外活动与全面发展",
      "tier": "速通·标准套写",
      "tierKey": "fast_std",
      "coreTheme": "fostering children's well-rounded development（促进儿童全面发展）",
      "wordCount": 197,
      "enEssay": "Though deceptively simple, this bar chart conveys a meaningful message: in a survey of views on children's outdoor activities, satisfying curiosity accounts for the largest share, at 54.6%, followed by improving observation skills, building physical fitness and increasing parent-child interaction at 54.5%, 37.2% and 33.2% respectively. It serves as a compelling testament to the significance of fostering children's well-rounded development.\n\nTo begin with, experience suggests that fostering children's well-rounded development finds direct expression in phenomena exemplified by the way people take children outdoors to explore and exercise. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for fostering well-rounded development that provides impetus for these developments. An article published by China National Children's Center lends support to the view that fostering children's well-rounded development plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when fostering children's well-rounded development guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管条形图看似简单，却传递出深刻的信息：在一项关于儿童户外活动看法的调查中，满足好奇心占比最高，为54.6%；随后是促进观察力、增强体质和增进亲子互动，分别占54.5%、37.2%和33.2%。它有力地证明了促进儿童全面发展的重要性。\n\n首先，从经验上讲，促进儿童全面发展直接体现在以人们带儿童到户外探索和锻炼为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在促进全面发展方面的战略倡导与推广，为这些发展变化提供了动力。中国儿童中心刊载的一篇文章支持这样一种观点，即促进儿童全面发展在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当促进儿童全面发展这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息图表调查对儿童户外活动的看法，列出满足好奇心54.6%、促进观察力54.5%、增强体质37.2%、增进亲子互动\n33.2%。前两项指向探索和认识世界，后两项涉及身体成长与亲子交流。\n2. 从材料提炼含义户外活动让儿童通过观察、探索和身体活动接触环境，也让亲子交流有具体的共同活动。认知、身体与关系几个方面同时出现，可以把它们理解为儿童多方面成长的需要。\n3. 价值观归类与主题选择从文明类的素质教育与全面成长出发，选择 fostering children's well-rounded development。个人行为写带儿童探索和锻炼，第④句以促进全面发展的教育方向承接认知、身体与交往方面的培养，第⑤句回到儿童成长的社会价值。\n本文主题： fostering children's well-rounded development（促进儿童全面发展）\n二、第一段怎样组织\n调查主题： a survey of views on children's outdoor activities。交代儿童户外活动和调查看法。\n最突出项目： satisfying curiosity accounts for the largest share, at 54.6%。先写好奇心，再接占比相近的观察力。\n其余维度： improving observation skills, building physical fitness and increasing parent-child interaction。按图中比例接入认知、体质和亲子交流三个具体方面。\n主题衔接： 探索认识、身体活动和亲子互动共同构成多方面成长，由此引出促进儿童全面发展。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that fostering children's well-rounded development finds direct expression in phenomena exemplified by the way people take children outdoors to explore and exercise.首先，从经验上讲，促进儿童全面发展直接体现在以人们带儿童到户外探索和锻炼为代表的现象之中。\n【具体行为】 take children outdoors to explore and exercise（带儿童到户外探索和锻炼）表达组织： 从首段 children's outdoor activities 提取 take children outdoors，再以 explore and exercise 概括观察探索与身体活动。\n探索承接好奇心与观察，锻炼承接体质，成人与儿童共同参加活动也回应亲子互动。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n成人希望儿童在探索中学习、在活动中锻炼，这种积极期待解释带儿童走向户外的选择。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n家庭的成长目标还需要教育理念与成人引导的支持，探索、锻炼和亲子交流由此联系到促进全面发展的教育方向。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for fostering well-rounded development that provides impetus for these developments.基于这一认识，正是国家在促进全面发展方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 fostering well-rounded development（促进全面发展）语料来源： 文明类【相关战略】：fostering well-rounded development。\n用全面发展统领认知、身体与社会交往几个方面的培养。\n⑤ 主题的社会价值\nAn article published by China National Children's Center lends support to the view that fostering children's well-rounded development plays an important role in fostering community prosperity.中国儿童中心刊载的一篇文章支持这样一种观点，即促进儿童全面发展在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 China National Children's Center（中国儿童中心）。\n【主题词】 fostering children's well-rounded development（促进儿童全面发展）。\n将探索、锻炼与共同活动归结到促进儿童全面发展的公共意义。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when fostering children's well-rounded development guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当促进儿童全面发展这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n促进儿童全面发展指导家庭安排探索、锻炼与交流，也指导教育重视认知、身体和交往方面的成长，结尾归纳个人与共同生活的收益。"
    },
    {
      "year": 2026,
      "title": "儿童户外活动与全面发展",
      "tier": "速通·无脑套写",
      "tierKey": "fast_ez",
      "coreTheme": "helping children grow in all areas（帮助儿童在各方面成长）",
      "wordCount": 204,
      "enEssay": "Though deceptively simple, this bar chart conveys a meaningful message: in a survey of views on children's outdoor activities, satisfying curiosity accounts for the largest share, at 54.6%, followed by improving observation skills, building physical fitness and increasing parent-child interaction at 54.5%, 37.2% and 33.2% respectively. It serves as a compelling testament to the significance of helping children grow in all areas.\n\nTo begin with, experience suggests that helping children grow in all areas finds direct expression in phenomena exemplified by the way people take children outside to learn and exercise. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for prioritizing education that provides impetus for these developments. An article published by China National Children's Center lends support to the view that helping children grow in all areas plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when helping children grow in all areas guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管条形图看似简单，却传递出深刻的信息：在一项关于儿童户外活动看法的调查中，满足好奇心占比最高，为54.6%；随后是促进观察力、增强体质和增进亲子互动，分别占54.5%、37.2%和33.2%。它有力地证明了帮助儿童在各方面成长的重要性。\n\n首先，从经验上讲，帮助儿童在各方面成长直接体现在以人们带儿童到户外学习和锻炼为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在教育优先方面的战略倡导与推广，为这些发展变化提供了动力。中国儿童中心刊载的一篇文章支持这样一种观点，即帮助儿童在各方面成长在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当帮助儿童在各方面成长这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息图表调查对儿童户外活动的看法，列出满足好奇心54.6%、促进观察力54.5%、增强体质37.2%、增进亲子互动\n33.2%。前两项指向探索和认识世界，后两项涉及身体成长与亲子交流。\n2. 从材料提炼含义户外活动让儿童通过观察、探索和身体活动接触环境，也让亲子交流有具体的共同活动。认知、身体与关系几个方面同时出现，可以把它们理解为儿童多方面成长的需要。\n3. 价值观归类与主题选择直接把图表的多方面益处概括为 helping children grow in all areas，保留儿童这一对象，用日常词表达全面成长。\n本文主题： helping children grow in all areas（帮助儿童在各方面成长）\n二、第一段怎样组织\n调查主题： a survey of views on children's outdoor activities。交代儿童户外活动和调查看法。\n最突出项目： satisfying curiosity accounts for the largest share, at 54.6%。先写好奇心，再接占比相近的观察力。\n其余维度： improving observation skills, building physical fitness and increasing parent-child interaction。按图中比例接入认知、体质和亲子交流三个具体方面。\n主题衔接： 探索认识、身体活动和亲子互动共同构成多方面成长，由此引出促进儿童全面发展。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that helping children grow in all areas finds direct expression in phenomena exemplified by the way people take children outside to learn and exercise.首先，从经验上讲，帮助儿童在各方面成长直接体现在以人们带儿童到户外学习和锻炼为代表的现象之中。\n【具体行为】 take children outside to learn and exercise（带儿童到户外学习和锻炼）表达组织： 复用 children's outdoor activities 的对象和场景，以 take children outside to learn and exercise 写出简单做法。\n用学习与锻炼两个简单动作概括认知和身体方面的需要。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n学习新事物、增强体质和共同活动，都是家庭期待户外活动带来的积极结果。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n儿童的学习和锻炼需要成人陪伴与教育引导，因此从家庭的具体行动转入教育支持。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for prioritizing education that provides impetus for these developments.基于这一认识，正是国家在教育优先方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 prioritizing education（教育优先）语料来源： 富强类【相关战略】：prioritizing education。\n以教育支持承接儿童的学习和成长。\n⑤ 主题的社会价值\nAn article published by China National Children's Center lends support to the view that helping children grow in all areas plays an important role in fostering community prosperity.中国儿童中心刊载的一篇文章支持这样一种观点，即帮助儿童在各方面成长在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 China National Children's Center（中国儿童中心）。\n【主题词】 helping children grow in all areas（帮助儿童在各方面成长）。\n以帮助儿童在各方面成长概括个人活动与社会支持的共同价值。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when helping children grow in all areas guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当帮助儿童在各方面成长这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n帮助儿童在各方面成长可以指导家庭选择学习与锻炼活动，也可以指导教育兼顾认知、身体和交往方面的需要。"
    },
    {
      "year": 2025,
      "title": "老年人休闲活动、身心健康与全面发展",
      "tier": "满分版",
      "tierKey": "full",
      "coreTheme": "promoting older adults' physical and mental well-being and all-round development（促进老年人身心健康与全面发展）",
      "wordCount": 203,
      "enEssay": "The figures in the bar chart reveal notable differences concerning promoting older adults' physical and mental well-being and all-round development. Among older residents in one community, watching television accounts for the largest share, at 90.8%, followed by taking walks, tending flowers, reading and playing chess at 68.3%, 34.7%, 31.8% and 18.4% respectively.\n\nPromoting older adults' physical and mental well-being and all-round development has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people pursue healthy lifestyles, ultimately contributing to inner peace and overall well-being. National policies on public health and well-being likewise focus on empowering individuals to access improved public services and recreational facilities. Beyond personal advancement, this principle can strengthen communities by creating livable environments and improving quality of life, laying the groundwork for sustainable progress. This is in line with national strategies for building a healthy China: as this principle takes root, green areas expand and fitness facilities become more accessible.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when promoting older adults' physical and mental well-being and all-round development guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "条形图中的数据揭示了有关促进老年人身心健康与全面发展的显著差异。在某社区的老年居民中，看电视占比最高，为90.8%；随后是散步、养花、阅读和下棋，分别占68.3%、34.7%、31.8%和18.4%。\n\n促进老年人身心健康与全面发展受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们追求健康生活方式的做法中，最终有助于获得内心平静与整体安康。国家在公共健康与福祉方面的政策，同样着重于使个人能够获得更完善的公共服务和休闲设施。除个人发展之外，这一原则还可以通过创造宜居环境、提升生活质量增强社区，为可持续进步奠定基础。这与国家建设健康中国的战略相契合：随着这一理念逐渐扎根，绿色空间扩大，健身设施更加便捷易达。\n\n总之，人们已经形成一种基于理性认识的共识，即当促进老年人身心健康与全面发展这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、主题怎样从材料中提炼\n题注把调查对象限定为某社区老年人。散步让身体得到适度活动；看电视可以提供娱乐和信息；阅读需要理解内容，下棋需要思考规则与应对；养花让老人持续照料植物、发展兴趣。不同活动回应的需要各有侧重。\n这些活动首先照顾老年人的身体与精神需要，也为他们继续学习、运用已有知识和发展兴趣提供日常机会。由这些具体用途，评论可以从身心健康进一步讨论晚年生活中的持续发展。因此主题用 promoting older adults'physical and mental well-being and all-round development，提出促进老年人身心健康与全面发展这一倡导方向。\n论述顺序： 老年人的身体活动、精神生活与兴趣发展 → 健康生活方式照顾身心需要 → 内心平静与整体安康→ 公共服务和休闲设施支持持续参与 → 宜居环境改善晚年生活 → 健康中国连接绿地与便捷的健身条件。\n二、第一段怎样组织\nAmong older residents in one community, watching television accounts for the largest share, at 90.8%, followed by taking walks, tending flowers, reading and playing chess at 68.3%, 34.7%, 31.8% and 18.4%respectively.先交代调查对象，再以 accounts for the largest share 写最大项，以 followed by 连接其余类别，respectively 对应各项比例。\n条形图中的数据揭示了有关促进老年人身心健康与全面发展的显著差异。在某社区的老年居民中，看电视占比最高，为90.8%；随后是散步、养花、阅读和下棋，分别占68.3%、34.7%、31.8%和18.4%。\n三、第二段逐句拆解\n① 主题总起\nPromoting older adults' physical and mental well-being and all-round development has attracted attention, not least because of its far-reaching implications.以促进老年人身心健康与全面发展总起：先说明老人如何安排身体活动与兴趣休闲，再讨论公共条件怎样支持他们持续参与、充实晚年生活。\n② 个人行为与成果\nAt the individual level, it is reflected in the way people pursue healthy lifestyles, ultimately contributing to inner peace and overall well-being.\n【具体行为】 pursue healthy lifestyles（追求健康生活方式）\n语料取用： 和谐类【个人能力／行为】原句：pursue healthy lifestyles in well-designed environments。取主干pursue healthy lifestyles，用于具体行为位置。\n【可见成果】 inner peace and overall well-being（内心平静与整体安康）\n语料取用： 和谐类【可见成果】完整原句：inner peace and overall well-being。\n适度活动身体、投入兴趣休闲，可以照顾老人的身体状态和精神感受，因此先用健康生活方式概括行为，再用内心平静与整体安康说明所期待的好处。阅读和下棋还提供继续学习、运用知识和思考的机会，养花则让兴趣在日常照料中得到发展，使健康生活与持续发展有了具体联系。\n③ 政策领域与个人能力\nNational policies on public health and well-being likewise focus on empowering individuals to access improved public services and recreational facilities.\n【相关领域】 public health and well-being（公共健康与福祉）\n语料取用： 和谐类【相关领域】原句：public health and well-being。\n【个人能力／行为】 access improved public services and recreational facilities（获得更完善的公共服务和休闲设施）\n语料取用： 和谐类【个人能力／行为】完整原句：access improved public services and recreational facilities。\n老人要参加散步、阅读和下棋，需要便于通行的场地、可使用的活动空间和参与机会。公共服务与休闲设施提供这些条件，就能支持他们保持身体活动、继续学习思考并发展兴趣。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by creating livable environments and improving quality of life, laying the groundwork for sustainable progress.\n【社会效果】 creating livable environments and improving quality of life（创造宜居环境、提升生活质量）\n语料取用： 和谐类【社会效果】完整原句：creating livable environments and improving quality of life。\n宜居环境为老人的散步、休闲和交往提供合适条件；更方便地参加活动，也能让日常生活更充实，使兴趣发展与共同生活相联系。由这些具体用途，解释环境改善怎样服务于老人的生活质量。\n⑤ 相关战略与社会变化\nThis is in line with national strategies for building a healthy China: as this principle takes root, green areas expand and fitness facilities become more accessible.\n【相关战略】 building a healthy China（建设健康中国）\n语料取用： 和谐类【相关战略】原句：building a healthy China。\n【社会变化】 green areas expand and fitness facilities become more accessible（绿色空间扩大，健身设施更加便捷易达）\n语料取用： 和谐类【社会变化】完整原句：green areas expand and fitness facilities become more accessible。\n老人参加散步和户外休闲需要合适的活动空间，因此可以把健康中国这一方向联系到绿地和便于到达的健身条件，讨论社会怎样支持他们保持活动、充实生活。\n四、第三段怎样收束\n以 promoting older adults' physical and mental well-being and all-round development（促进老年人身心健康与全面发展） 回扣全文：个人通过身体活动与兴趣休闲照顾身心、继续学习和思考，社区提供便于参与的服务与环境。结尾将健康生活、兴趣发展和持续参与合在一起，提出倡导这一方向的必要性。"
    },
    {
      "year": 2025,
      "title": "老年人休闲活动、身心健康与全面发展",
      "tier": "简化版",
      "tierKey": "simplified",
      "coreTheme": "promoting older adults' physical and mental well-being and all-round development（促进老年人身心健康与全面发展）",
      "wordCount": 192,
      "enEssay": "The figures in the bar chart reveal notable differences concerning promoting older adults' physical and mental well-being and all-round development. Among older residents in one community, watching television accounts for the largest share, at 90.8%, followed by taking walks, tending flowers, reading and playing chess at 68.3%, 34.7%, 31.8% and 18.4% respectively.\n\nPromoting older adults' physical and mental well-being and all-round development has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people pursue healthy lifestyles, ultimately contributing to personal development and well-being. National policies on public health and well-being likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by creating livable environments and improving quality of life, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when promoting older adults' physical and mental well-being and all-round development guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "条形图中的数据揭示了有关促进老年人身心健康与全面发展的显著差异。在某社区的老年居民中，看电视占比最高，为90.8%；随后是散步、养花、阅读和下棋，分别占68.3%、34.7%、31.8%和18.4%。\n\n促进老年人身心健康与全面发展受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们追求健康生活方式的做法中，最终有助于个人发展与福祉。国家在公共健康与福祉方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过创造宜居环境、提升生活质量增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n\n总之，人们已经形成一种基于理性认识的共识，即当促进老年人身心健康与全面发展这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 提取材料信息条形图调查某社区老年人的主要日常休闲活动。看电视占90.8%，散步占68.3%，养花占34.7%，阅读占31.8%，下棋占18.4%。\n2. 从材料理解含义题目讨论的是老年人的日常生活。散步让身体得到适度活动，看电视可以提供娱乐和信息，阅读、养花与下棋让老人投入兴趣，回应身体与精神两方面的需要。阅读需要理解内容，下棋需要思考规则和应对，养花需要持续观察与照料；这些做法也为老人继续学习、运用知识和发展兴趣提供机会。\n3. 确定主题由身体活动、精神休闲和兴趣中的持续投入，可以进一步讨论老人怎样在晚年保持健康、继续学习与发展兴趣。\n因此确定 promoting older adults' physical and mental well-being and all-round development，把身心需要与持续发展的机会连在一起。个人用健康生活方式概括行动，社会部分讨论宜居条件怎样支持老人参与活动、改善生活。\n本文主题： promoting older adults' physical and mental well-being and all-round development（促进老年人身心健康与全面发展）\n二、第一段怎样组织\nThe figures in the bar chart reveal notable differences concerning promoting older adults' physical and mental well-being and all-round development. Among older residents in one community, watching television accounts for the largest share, at 90.8%, followed by taking walks, tending flowers, reading and playing chess at 68.3%,\n34.7%, 31.8% and 18.4% respectively. Among older residents in one community 明确调查对象。watching television accounts for the largest share 写90.8%的最高项，followed by 连接散步、养花、阅读和下棋四类，分别填写68.3%、34.7%、31.8%和18.4%。\n三、第二段逐句拆解\n① 主题总起\nPromoting older adults' physical and mental well-being and all-round development has attracted attention, not least because of its far-reaching implications.促进老年人身心健康与全面发展受到关注，一个重要原因是其影响深远。\n以促进老年人身心健康与全面发展总起，下文先写老人安排身体活动与兴趣休闲，再解释公共支持怎样帮助他们继续学习、发展兴趣和参与共同生活。\n② 个人行为与个人收益\nAt the individual level, it is reflected in the way people pursue healthy lifestyles, ultimately contributing to personal development and well-being.在个人层面，它体现在人们追求健康生活方式的做法中，最终有助于个人发展与福祉。\n【具体行为】 pursue healthy lifestyles（追求健康生活方式）\n语料取用： 和谐类【个人能力／行为】原句：pursue healthy lifestyles in well-designed environments。取主干pursue healthy lifestyles，概括个人追求健康生活的行动。\n身体活动照顾老人的身体状态，兴趣休闲让精神生活更充实，因此用健康生活方式概括个人行动。阅读和下棋提供理解内容、运用知识与思考的机会，养花让兴趣在持续照料中得到发展，这些具体用途使个人发展与身心福祉能够联系起来。\npersonal development and well-being 将个人收益概括为发展与福祉。\n③ 政策领域与个人潜能\nNational policies on public health and well-being likewise focus on empowering individuals to achieve their full potential.国家在公共健康与福祉方面的政策，同样着重于使个人能够充分发挥自身潜能。\n【相关领域】 public health and well-being（公共健康与福祉）\n语料取用： 和谐类【相关领域】原句：public health and well-being。\n老人需要便于参加的活动、合适的场所与服务，才能把继续阅读、下棋或发展兴趣的愿望落实到生活中。公共健康与福祉连接这些个人需要和社会支持，后半句由此讨论老人怎样运用已有知识、发展兴趣并发挥潜能。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by creating livable environments and improving quality of life, laying the groundwork for sustainable progress.除个人发展之外，这一原则还可以通过创造宜居环境、提升生活质量增强社区，为可持续进步奠定基础。\n【社会效果】 creating livable environments and improving quality of life（创造宜居环境、提升生活质量）\n语料取用： 和谐类【社会效果】完整原句：creating livable environments and improving quality of life。\n宜居环境写适合老人散步、阅读、下棋和交往的生活条件；生活质量写这些条件怎样方便活动、充实日常体验。\n两部分连在一起，说明环境支持能够为身心健康、兴趣发展与持续参与提供条件。\n⑤ 宏观收束\nAs this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n前句讨论老人参加活动所需的环境；当更多人方便参与、保持日常联系时，社区交流与相互照应也有了具体机会。继续维护这些条件，就能把个人健康和兴趣发展与共同生活的持续改善联系起来。\n四、第三段怎样收束\n由老年人的日常休闲理解身体与精神需要，再通过阅读、下棋和养花说明继续学习、思考与发展兴趣的机会。\n公共支持为这些活动提供条件，结尾回到促进老年人身心健康与全面发展这一行动目标。\n全文论述顺序： 老年人的身体活动、精神生活与兴趣发展 → 健康生活方式连接个人发展与福祉 → 公共健康支持参与机会 → 宜居条件与生活质量 → 社区交往、社会和谐与长期繁荣。"
    },
    {
      "year": 2025,
      "title": "老年人休闲活动、身心健康与全面发展",
      "tier": "速通·标准套写",
      "tierKey": "fast_std",
      "coreTheme": "promoting older adults' physical and mental well-being and all-round development（促进老年人身心健康与全面发展）",
      "wordCount": 214,
      "enEssay": "Though deceptively simple, this bar chart conveys a meaningful message: among older residents in one community, watching television accounts for the largest share, at 90.8%, followed by taking walks, tending flowers, reading and playing chess at 68.3%, 34.7%, 31.8% and 18.4% respectively. It serves as a compelling testament to the significance of promoting older adults' physical and mental well-being and all-round development.\n\nTo begin with, experience suggests that promoting older adults' physical and mental well-being and all-round development finds direct expression in phenomena exemplified by the way people pursue healthy lifestyles. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for building a healthy China that provides impetus for these developments. An article published by the National Health Commission lends support to the view that promoting older adults' physical and mental well-being and all-round development plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when promoting older adults' physical and mental well-being and all-round development guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管条形图看似简单，却传递出深刻的信息：在某社区老年人的日常休闲活动中，看电视占比最高，为90.8%；随后是散步、养花、阅读和下棋，分别占68.3%、34.7%、31.8%和18.4%。它有力地证明了促进老年人身心健康与全面发展的重要性。\n\n首先，从经验上讲，促进老年人身心健康与全面发展直接体现在以人们追求健康的生活方式为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在建设健康中国方面的战略倡导与推广，为这些发展变化提供了动力。国家卫生健康委员会刊载的一篇文章支持这样一种观点，即促进老年人身心健康与全面发展在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当促进老年人身心健康与全面发展这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息图表统计某社区老年人的日常休闲活动：看电视90.8%、散步68.3%、养花34.7%、阅读31.8%、下棋18.4%。活动同时包含身体活动、日常兴趣与精神休闲。\n2. 从材料提炼含义调查对象是老年人。散步让身体得到适度活动，看电视可以提供娱乐和信息，阅读、下棋与养花让老人投入兴趣，回应身体与精神两方面的需要。阅读需要理解内容，下棋需要思考规则和应对，养花需要持续观察与照料；这些做法也为老人继续学习、运用知识和发展兴趣提供日常机会。\n3. 价值观归类与主题选择把身体活动、精神生活与兴趣中的持续投入联系起来，评论可以讨论老人怎样保持健康，并在晚年继续学习和发展兴趣。因此选择 promoting older adults' physical and mental well-being and all-round development。个人合理安排活动，社区完善服务、设施和环境，共同为身心健康与持续发展提供支持。\n本文主题： promoting older adults' physical and mental well-being and all-round development（促进老年人身心健康与全面发展）\n二、第一段怎样组织\n调查对象： Among older residents in one community。明确讨论的是某社区老年人的日常休闲生活。\n最大项： watching television accounts for the largest share, at 90.8%。先给出最常见的休闲活动。\n其余活动与比例： followed by taking walks, tending flowers, reading and playing chess。按图中比例从高到低写出其余四项，respectively 将每个活动与各自比例对应。\n主题衔接： 散步照顾身体需要，阅读、下棋与养花既充实精神生活，也提供继续学习、思考和发展兴趣的机会。由这些具体用途，将讨论引向促进老年人身心健康与全面发展。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that promoting older adults' physical and mental well-being and all-round development finds direct expression in phenomena exemplified by the way people pursue healthy lifestyles.首先，从经验上讲，促进老年人身心健康与全面发展直接体现在以人们追求健康的生活方式为代表的现象之中。\n【具体行为】 pursue healthy lifestyles（追求健康的生活方式）语料来源： 和谐类【个人能力/行为】：pursue healthy lifestyles in well-designed environments。取用 pursue healthy lifestyles。\n把适度散步与兴趣活动安排进日常生活，可以概括为追求健康的生活方式。阅读和下棋还需要理解与思考，养花让兴趣通过持续照料得到发展，因此这些生活安排能够同时联系老人的身心需要和持续发展。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n老人期待身体舒适、心情愉悦，也希望在阅读、下棋和养花中保持思考、发展兴趣。这些期待可以解释他们为什么愿意选择相应的身体活动与精神休闲。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n老人要把散步、阅读和下棋等活动持续安排进生活，需要社区服务、适合使用的场所与参与机会。后面由健康中国连接这些社会条件，讨论怎样支持身心健康与持续参与。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for building a healthy China that provides impetus for these developments.基于这一认识，正是国家在建设健康中国方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 building a healthy China（建设健康中国）语料来源： 和谐类【相关战略】：building a healthy China。\n老人保持身体活动、参加兴趣休闲需要合适的公共环境和服务。因此由建设健康中国连接个人的健康愿望与社会提供的活动条件，使学习、思考和兴趣活动能够持续开展。\n⑤ 主题的社会价值\nAn article published by the National Health Commission lends support to the view that promoting older adults'physical and mental well-being and all-round development plays an important role in fostering community prosperity.国家卫生健康委员会刊载的一篇文章支持这样一种观点，即促进老年人身心健康与全面发展在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 the National Health Commission（国家卫生健康委员会）。\n【主题词】 promoting older adults' physical and mental well-being and all-round development（促进老年人身心健康与全面发展）。\n老人有合适条件参加身体活动和兴趣休闲，便有更多机会保持日常联系、交流所学与参与共同生活。由这层联系，回扣促进老年人身心健康与全面发展对个人和社区的共同价值。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when promoting older adults' physical and mental well-being and all-round development guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当促进老年人身心健康与全面发展这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n促进老年人身心健康与全面发展可以指导老人选择日常活动，也可以指导社区提供适合参与的服务与环境。结尾将身体活动、精神生活、继续学习与兴趣发展合在一起，并说明个人的持续参与需要共同生活条件支持。"
    },
    {
      "year": 2025,
      "title": "老年人休闲活动、身心健康与全面发展",
      "tier": "速通·无脑套写",
      "tierKey": "fast_ez",
      "coreTheme": "promoting older adults' physical and mental well-being and all-round development（促进老年人身心健康与全面发展）",
      "wordCount": 215,
      "enEssay": "Though deceptively simple, this bar chart conveys a meaningful message: among older residents in one community, watching television accounts for the largest share, at 90.8%, followed by taking walks, tending flowers, reading and playing chess at 68.3%, 34.7%, 31.8% and 18.4% respectively. It serves as a compelling testament to the significance of promoting older adults' physical and mental well-being and all-round development.\n\nTo begin with, experience suggests that promoting older adults' physical and mental well-being and all-round development finds direct expression in phenomena exemplified by the way people take walks and enjoy their hobbies. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for elderly care that provides impetus for these developments. An article published by the National Health Commission lends support to the view that promoting older adults' physical and mental well-being and all-round development plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when promoting older adults' physical and mental well-being and all-round development guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管条形图看似简单，却传递出深刻的信息：在某社区老年人的日常休闲活动中，看电视占比最高，为90.8%；随后是散步、养花、阅读和下棋，分别占68.3%、34.7%、31.8%和18.4%。它有力地证明了促进老年人身心健康与全面发展的重要性。\n\n首先，从经验上讲，促进老年人身心健康与全面发展直接体现在以人们散步并享受自己的兴趣爱好为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在养老保障方面的战略倡导与推广，为这些发展变化提供了动力。国家卫生健康委员会刊载的一篇文章支持这样一种观点，即促进老年人身心健康与全面发展在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当促进老年人身心健康与全面发展这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息图表统计某社区老年人的日常休闲活动：看电视90.8%、散步68.3%、养花34.7%、阅读31.8%、下棋18.4%。活动同时包含身体活动、日常兴趣与精神休闲。\n2. 从材料提炼含义调查对象是老年人。散步让身体得到适度活动，看电视可以提供娱乐和信息，阅读、下棋与养花让老人投入兴趣，回应身体与精神两方面的需要。阅读需要理解内容，下棋需要思考规则和应对，养花需要持续观察与照料；这些做法也为老人继续学习、运用知识和发展兴趣提供日常机会。\n3. 价值观归类与主题选择散步回应老人的身体需要，兴趣活动充实精神生活；其中阅读和下棋提供学习与思考的机会，养花可以让兴趣持续发展。由这些具体用途，主题确定为 promoting older adults' physical and mental well-being and all-round development。个人写散步和爱好，社会写养老支持，用具体做法说明老人怎样获得健康、充实且能够继续发展的晚年生活。\n本文主题： promoting older adults' physical and mental well-being and all-round development（促进老年人身心健康与全面发展）\n二、第一段怎样组织\n调查对象： Among older residents in one community。明确讨论的是某社区老年人的日常休闲生活。\n最大项： watching television accounts for the largest share, at 90.8%。先给出最常见的休闲活动。\n其余活动与比例： followed by taking walks, tending flowers, reading and playing chess。按图中比例从高到低写出其余四项，respectively 将每个活动与各自比例对应。\n主题衔接： 散步照顾身体需要，阅读、下棋与养花既充实精神生活，也提供继续学习、思考和发展兴趣的机会。由这些具体用途，将讨论引向促进老年人身心健康与全面发展。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that promoting older adults' physical and mental well-being and all-round development finds direct expression in phenomena exemplified by the way people take walks and enjoy their hobbies.首先，从经验上讲，促进老年人身心健康与全面发展直接体现在以人们散步并享受自己的兴趣爱好为代表的现象之中。\n【具体行为】 take walks and enjoy their hobbies（散步并享受自己的兴趣爱好）表达组织： 从首段 taking walks 提取 take walks，用 enjoy their hobbies 概括其余日常休闲活动。\n散步对应老人的身体活动，爱好概括养花、阅读、下棋和看电视等休闲。其中阅读与下棋提供理解内容、运用知识和思考的机会，养花需要持续观察与照料；这些具体用途把兴趣活动与持续发展联系起来。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n老人选择散步和兴趣活动，可以期待身体活动带来的舒适、休闲带来的愉悦，以及学习、思考和持续培养爱好带来的充实。这些期待接到固定句所说的积极结果。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n老人有参加活动的愿望，还需要便于到达的场所、合适的服务与参与机会。养老支持和适合活动的环境，能让他们更方便地安排身体活动、继续学习与发展兴趣。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for elderly care that provides impetus for these developments.基于这一认识，正是国家在养老保障方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 elderly care（养老保障）语料来源： 和谐类【相关战略】：elderly care。\n题中的群体是老年人。养老保障可以联系他们日常生活所需的服务与活动条件，帮助把散步、阅读和兴趣活动的愿望落实为可参与的生活安排，因此用这一方向承接身心健康与持续发展的支持条件。\n⑤ 主题的社会价值\nAn article published by the National Health Commission lends support to the view that promoting older adults'physical and mental well-being and all-round development plays an important role in fostering community prosperity.国家卫生健康委员会刊载的一篇文章支持这样一种观点，即促进老年人身心健康与全面发展在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 the National Health Commission（国家卫生健康委员会）。\n【主题词】 promoting older adults' physical and mental well-being and all-round development（促进老年人身心健康与全面发展）。\n老人保持身体活动、继续发展兴趣，需要能够参与的社区环境；参加共同活动又为交流知识、结识同伴与互相照应提供机会。由此归纳身心健康、持续发展与社区生活之间的联系。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when promoting older adults' physical and mental well-being and all-round development guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当促进老年人身心健康与全面发展这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n促进老年人身心健康与全面发展既指导老人选择身体活动和兴趣休闲，也指导社区完善服务与参与条件。结尾将健康生活、继续学习和兴趣发展合在一起，回应老人晚年生活可以持续充实的目标。"
    },
    {
      "year": 2024,
      "title": "劳动实践与全面素质教育",
      "tier": "满分版",
      "tierKey": "full",
      "coreTheme": "comprehensive quality education（全面素质教育）",
      "wordCount": 197,
      "enEssay": "The figures in the bar chart reveal notable differences concerning comprehensive quality education. Among gains reported by students taking labour practice courses at one university, acquiring relevant knowledge accounts for the largest share, at 91.3%, followed by improving practical skills, feeling relaxed and enhancing cooperation at 84.8%, 54.4% and 32.6% respectively.\n\nComprehensive quality education has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people bridge the gap between knowing and doing through labour practice, ultimately contributing to enhanced intellectual capacity and personal satisfaction. National policies on quality education likewise focus on empowering individuals to connect genuinely with others and nurture community bonds. Beyond personal advancement, this principle can strengthen communities by fostering cooperation and strengthening the social fabric, laying the groundwork for sustainable progress. This is in line with national strategies for fostering virtue through education and fostering well-rounded development: as this principle takes root, mutual assistance becomes commonplace and community support strengthens.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when comprehensive quality education guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "条形图中的数据揭示了有关全面素质教育的显著差异。在某高校参加劳动实践课程的学生所报告的收获中，学习相关知识占比最高，为91.3%；随后是提高动手能力、感到心情舒畅和增强合作能力，分别占84.8%、54.4%和32.6%。\n\n全面素质教育受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们通过劳动实践缩小认知与行动之间差距的做法中，最终有助于提升认知能力、获得个人满足感。国家在素质教育方面的政策，同样着重于使个人能够真诚地与他人建立联系，并培育群体纽带。除个人发展之外，这一原则还可以通过促进合作、加强社会联系增强社区，为可持续进步奠定基础。这与国家关于立德树人和促进全面发展的战略相契合：随着这一理念逐渐扎根，相互帮助成为普遍的风尚，社区支持也更加有力。\n\n总之，人们已经形成一种基于理性认识的共识，即当全面素质教育指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、主题怎样从材料中提炼\n四项收获可以分为两组：相关知识与动手能力体现认知和实践的结合，心情舒畅与合作能力体现参与感、情绪体验和人与人的联系。因此采用“全面素质教育”，个人层面写知行结合与满足感，社会层面写交往、合作和互助。\n论述顺序： 劳动让知识进入实践 → 学生获得能力与满足感 → 共同劳动建立联系 → 合作成为社会作用 → 全面教育培养互助与支持。\n二、第一段怎样组织\nAmong gains reported by students taking labour practice courses at one university, acquiring relevant knowledge accounts for the largest share, at 91.3%, followed by improving practical skills, feeling relaxed and enhancing cooperation at 84.8%, 54.4% and 32.6% respectively.先交代调查对象，再以 accounts for the largest share 写最大项，以 followed by 连接其余类别，respectively 对应各项比例。\n条形图中的数据揭示了有关全面素质教育的显著差异。在某高校参加劳动实践课程的学生所报告的收获中，学习相关知识占比最高，为91.3%；随后是提高动手能力、感到心情舒畅和增强合作能力，分别占84.8%、54.4%和32.6%。\n三、第二段逐句拆解\n① 主题总起\nComprehensive quality education has attracted attention, not least because of its far-reaching implications.以全面素质教育总起，下面的行为、政策支持和社会作用逐层展开这一主题。\n② 个人行为与成果\nAt the individual level, it is reflected in the way people bridge the gap between knowing and doing through labour practice, ultimately contributing to enhanced intellectual capacity and personal satisfaction.\n【具体行为】 bridge the gap between knowing and doing through labour practice（通过劳动实践缩小认知与行动之间的差距）\n语料取用： 敬业类【个人能力／行为】原句：bridge the gap between knowing and doing。补上题面的 through labour practice，用于具体行为位置。\n【可见成果】 enhanced intellectual capacity and personal satisfaction（提升认知能力、获得个人满足感）\n语料取用： 文明类【可见成果】：enhanced intellectual capacity and cultural confidence，取 enhanced intellectual capacity；和谐类【可见成果】：a fulfilling life and personal satisfaction，取 personal satisfaction。组合为enhanced intellectual capacity and personal satisfaction。\n劳动实践连接学习与动手，能力提升和个人满足分别回应知识、技能与心情方面的收获。\n③ 政策领域与个人能力\nNational policies on quality education likewise focus on empowering individuals to connect genuinely with others and nurture community bonds.\n【相关领域】 quality education（素质教育）\n语料取用： 文明类【相关领域】原句：quality education。\n【个人能力／行为】 connect genuinely with others and nurture community bonds（真诚地与他人建立联系，并培育群体纽带）\n语料取用： 和谐类【具体行为】完整原句：connect genuinely with others and nurture community bonds，用于个人能力位置。\n共同劳动使学生接触他人、建立联系，将素质教育展开到交往能力。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by fostering cooperation and strengthening the social fabric, laying the groundwork for sustainable progress.\n【社会效果】 fostering cooperation and strengthening the social fabric（促进合作、加强社会联系）\n语料取用： 和谐类【社会效果】：reducing conflicts and fostering cooperation，取 fostering cooperation；友善类\n【社会效果】：strengthening the social fabric and neighborhood cohesion，取 strengthening the social fabric。组合为 fostering cooperation and strengthening the social fabric。\n社会效果延续合作能力这一调查维度，说明共同劳动对群体联系的意义。\n⑤ 相关战略与社会变化\nThis is in line with national strategies for fostering virtue through education and fostering well-rounded development: as this principle takes root, mutual assistance becomes commonplace and community support strengthens.\n【相关战略】 fostering virtue through education and fostering well-rounded development（立德树人和促进全面发展）\n语料取用： 文明类【相关战略】：fostering virtue through education 与 fostering well-rounded development，以and 连接。\n【社会变化】 mutual assistance becomes commonplace and community support strengthens（相互帮助成为普遍的风尚，社区支持也更加有力）\n语料取用： 友善类【社会变化】：mutual assistance becomes commonplace and social isolation declines，取mutual assistance becomes commonplace；同栏 vulnerable groups receive better care and community support strengthens，取 community support strengthens。两小句用 and 组合。\n立德树人与全面发展涵盖能力、体验和交往，互助与社区支持进一步展开共同生活的变化。\n四、第三段怎样收束\n以 comprehensive quality education（全面素质教育） 回扣个人与社区的共同收益，并提出倡导这一方向的必要性。"
    },
    {
      "year": 2024,
      "title": "劳动实践与全面素质教育",
      "tier": "简化版",
      "tierKey": "simplified",
      "coreTheme": "comprehensive quality education（全面素质教育）",
      "wordCount": 181,
      "enEssay": "The figures in the bar chart reveal notable differences concerning comprehensive quality education. Among gains reported by students taking labour practice courses at one university, acquiring relevant knowledge accounts for the largest share, at 91.3%, followed by improving practical skills, feeling relaxed and enhancing cooperation at 84.8%, 54.4% and 32.6% respectively.\n\nComprehensive quality education has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people bridge the gap between knowing and doing through labour practice, ultimately contributing to personal development and well-being. National policies on quality education likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by fostering cooperation and strengthening the social fabric, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when comprehensive quality education guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "条形图中的数据揭示了有关全面素质教育的显著差异。在某高校参加劳动实践课程的学生所报告的收获中，学习相关知识占比最高，为91.3%；随后是提高动手能力、感到心情舒畅和增强合作能力，分别占84.8%、54.4%和32.6%。\n\n全面素质教育受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们通过劳动实践缩小认知与行动之间差距的做法中，最终有助于个人发展与福祉。国家在素质教育方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过促进合作、加强社会联系增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n\n总之，人们已经形成一种基于理性认识的共识，即当全面素质教育指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 提取材料信息图表呈现某高校劳动实践课程的主要收获：学习相关知识占91.3%，提高动手能力占84.8%，感到心情舒畅占\n54.4%，增强合作能力占32.6%。\n2. 从材料理解含义知识与动手能力联系认知和实践，心情舒畅与合作能力联系个人体验和共同参与。由这两组收获，可以分别展开知行结合，以及劳动中的合作与交往。\n3. 确定主题从文明类的教育发展与和谐类的人际合作相结合，确定 comprehensive quality education。个人行为对应知与行，社会效果对应合作与联系，共同体现素质教育的多方面目标。\n本文主题： comprehensive quality education（全面素质教育）\n二、第一段怎样组织\nThe figures in the bar chart reveal notable differences concerning comprehensive quality education. Among gains reported by students taking labour practice courses at one university, acquiring relevant knowledge accounts for the largest share, at 91.3%, followed by improving practical skills, feeling relaxed and enhancing cooperation at 84.8%, 54.4% and 32.6% respectively. Among gains reported by students taking labour practice courses at one university 限定调查内容和人群。acquiring relevant knowledge accounts for the largest share 写91.3%的最高项，followed by 依次连接动手能力、心情舒畅与合作能力，分别对应84.8%、54.4%和32.6%。\n三、第二段逐句拆解\n① 主题总起\nComprehensive quality education has attracted attention, not least because of its far-reaching implications.全面素质教育受到关注，一个重要原因是其影响深远。\n以全面素质教育总起，下文由个人行动进入政策支持，再展开本题的社会作用。\n② 个人行为与个人收益\nAt the individual level, it is reflected in the way people bridge the gap between knowing and doing through labour practice, ultimately contributing to personal development and well-being.在个人层面，它体现在人们通过劳动实践缩小认知与行动之间差距的做法中，最终有助于个人发展与福祉。\n【具体行为】 bridge the gap between knowing and doing through labour practice（通过劳动实践缩小认知与行动之间差距）\n语料取用： 敬业类【个人能力／行为】原句：bridge the gap between knowing and doing。保留原句，补入题面的 through labour practice，得到 bridge the gap between knowing and doing through labour practice。\n劳动实践让学到的知识进入具体行动，行为直接对应图表中知识与动手能力两项收获。\npersonal development and well-being 将个人收益概括为发展与福祉。\n③ 政策领域与个人潜能\nNational policies on quality education likewise focus on empowering individuals to achieve their full potential.国家在素质教育方面的政策，同样着重于使个人能够充分发挥自身潜能。\n【相关领域】 quality education（素质教育）\n语料取用： 文明类【相关领域】原句：quality education。\n素质教育统摄知识、动手能力、参与体验与合作等不同方面，潜能发展由图表中的多方面收获具体展开。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by fostering cooperation and strengthening the social fabric, laying the groundwork for sustainable progress.除个人发展之外，这一原则还可以通过促进合作、加强社会联系增强社区，为可持续进步奠定基础。\n【社会效果】 fostering cooperation and strengthening the social fabric（促进合作、加强社会联系）\n语料取用： 和谐类【社会效果】原句：reducing conflicts and fostering cooperation，取 fostering cooperation；友善类【社会效果】原句：strengthening the social fabric and neighborhood cohesion，取 strengthening the social fabric。组合为 fostering cooperation and strengthening the social fabric。\n合作直接承接图表中的合作能力；共同劳动中的沟通、分工与配合进一步形成人与人的联系。由个人知行结合，论述转向共同活动的社会价值。\n⑤ 宏观收束\nAs this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n从前一句的具体社会作用，进一步归纳这一理念对共同生活与长期发展的意义。\n四、第三段怎样收束\n个人层面写知识进入实践，社会层面写合作建立联系，结尾以全面素质教育概括能力培养与共同生活的收益。\n全文论述顺序： 劳动促进知行结合 → 个人发展与福祉 → 素质教育支持潜能 → 合作与社会联系 → 社会和谐与长期繁荣。"
    },
    {
      "year": 2024,
      "title": "劳动实践与全面素质教育",
      "tier": "速通·标准套写",
      "tierKey": "fast_std",
      "coreTheme": "comprehensive quality education（全面素质教育）",
      "wordCount": 207,
      "enEssay": "Though deceptively simple, this bar chart conveys a meaningful message: among gains reported from labour practice courses at one university, acquiring knowledge accounts for the largest share, at 91.3%, followed by improving practical skills, feeling happier and enhancing cooperation at 84.8%, 54.4% and 32.6% respectively. It serves as a compelling testament to the significance of comprehensive quality education.\n\nTo begin with, experience suggests that comprehensive quality education finds direct expression in phenomena exemplified by the way people bridge the gap between knowing and doing through labour practice. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, a shared commitment to fostering virtue through education and fostering well-rounded development can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress. An article published by Beijing Normal University lends support to the view that comprehensive quality education plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when comprehensive quality education guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管条形图看似简单，却传递出深刻的信息：在某高校劳动实践课程的主要收获中，学习相关知识占比最高，为91.3%；随后是提高动手能力、感觉心情舒畅和增强合作能力，分别占84.8%、54.4%和32.6%。它有力地证明了全面素质教育的重要性。\n\n首先，从经验上讲，全面素质教育直接体现在以人们通过劳动实践缩小认知与行动之间的差距为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，对立德树人与促进全面发展的共同坚持能够为社区和国家在和谐中蓬勃发展创造条件，为可持续进步奠定基础。北京师范大学刊载的一篇文章支持这样一种观点，即全面素质教育在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当全面素质教育指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息图表呈现劳动实践课程的四类主要收获：知识91.3%、动手能力84.8%、心情舒畅54.4%、合作能力32.6%。前两项侧重知识与实践，后两项侧重情绪体验和人际合作。\n2. 从材料提炼含义课程把学习知识与亲身实践联系起来，同时带来愉悦体验和合作机会。因而可以从“把知识变成行动”写起，再进入个人满足和共同参与中的互助关系。\n3. 价值观归类与主题选择从文明类的教育和敬业类的行动出发，结合和谐类的合作关系，选择 comprehensive quality education。它统领知识、能力、心理体验和合作素养这几方面的成长。\n本文主题： comprehensive quality education（全面素质教育）\n二、第一段怎样组织\n统计对象： Among gains reported from labour practice courses at one university。交代调查的是课程收获。\n最高项目： acquiring knowledge accounts for the largest share, at 91.3%。先写知识这一最大项。\n分类比较： followed by improving practical skills, feeling happier and enhancing cooperation。把实践能力、情绪感受、合作能力依比例接入，并以 respectively 对应数据。\n主题衔接： 四项收获共同呈现多方面成长，引出全面素质教育。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that comprehensive quality education finds direct expression in phenomena exemplified by the way people bridge the gap between knowing and doing through labour practice.首先，从经验上讲，全面素质教育直接体现在以人们通过劳动实践缩小认知与行动之间的差距为代表的现象之中。\n【具体行为】 bridge the gap between knowing and doing through labour practice（通过劳动实践缩小认知与行动之间的差距）语料来源： 敬业类【个人能力/行为】：bridge the gap between knowing and doing。\n表达组织： 在原句后接 through labour practice，具体对应第一段的劳动实践课程。\n知识和动手能力两项比例较高，用知行结合概括两项收获之间的联系。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n把知识用于实践能带来能力提升与完成活动的满足，因此可以用对积极结果的期待承接。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n实践机会、课程组织和共同活动为个人的学习与合作提供条件，随后进入育人与全面发展的社会方向。\n④ 相关战略\nFrom this perspective, a shared commitment to fostering virtue through education and fostering well-rounded development can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress.基于这一认识，对立德树人与促进全面发展的共同坚持能够为社区和国家在和谐中蓬勃发展创造条件，为可持续进步奠定基础。\n【相关战略】 fostering virtue through education and fostering well-rounded development（立德树人与促进全面发展）语料来源： 文明类【相关战略】：fostering virtue through education。\n语料来源： 文明类【相关战略】：fostering well-rounded development。\n组合结果： fostering virtue through education and fostering well-rounded development。\n德育承接共同参与和互助，全面发展承接知识、动手能力与情绪体验。\n⑤ 主题的社会价值\nAn article published by Beijing Normal University lends support to the view that comprehensive quality education plays an important role in fostering community prosperity.北京师范大学刊载的一篇文章支持这样一种观点，即全面素质教育在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 Beijing Normal University（北京师范大学）。\n【主题词】 comprehensive quality education（全面素质教育）。\n将知识、实践和合作的多重收获归结到全面素质教育对社会的意义。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when comprehensive quality education guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当全面素质教育指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n全面素质教育指导课程重视知识、实践、心理体验和合作，个人成长与群体互助在结尾汇合。"
    },
    {
      "year": 2024,
      "title": "劳动实践与全面素质教育",
      "tier": "速通·无脑套写",
      "tierKey": "fast_ez",
      "coreTheme": "learning through practice（在实践中学习）",
      "wordCount": 201,
      "enEssay": "Though deceptively simple, this bar chart conveys a meaningful message: among gains reported from labour practice courses at one university, acquiring knowledge accounts for the largest share, at 91.3%, followed by improving practical skills, feeling happier and enhancing cooperation at 84.8%, 54.4% and 32.6% respectively. It serves as a compelling testament to the significance of learning through practice.\n\nTo begin with, experience suggests that learning through practice finds direct expression in phenomena exemplified by the way people gain knowledge and work with others in labour courses. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, a shared commitment to fostering well-rounded development can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress. An article published by Beijing Normal University lends support to the view that learning through practice plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when learning through practice guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管条形图看似简单，却传递出深刻的信息：在某高校劳动实践课程的主要收获中，学习相关知识占比最高，为91.3%；随后是提高动手能力、感觉心情舒畅和增强合作能力，分别占84.8%、54.4%和32.6%。它有力地证明了在实践中学习的重要性。\n\n首先，从经验上讲，在实践中学习直接体现在以人们在劳动课程中学习知识并与他人合作为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，对促进全面发展的共同坚持能够为社区和国家在和谐中蓬勃发展创造条件，为可持续进步奠定基础。北京师范大学刊载的一篇文章支持这样一种观点，即在实践中学习在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当在实践中学习这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息图表呈现劳动实践课程的四类主要收获：知识91.3%、动手能力84.8%、心情舒畅54.4%、合作能力32.6%。前两项侧重知识与实践，后两项侧重情绪体验和人际合作。\n2. 从材料提炼含义课程把学习知识与亲身实践联系起来，同时带来愉悦体验和合作机会。因而可以从“把知识变成行动”写起，再进入个人满足和共同参与中的互助关系。\n3. 价值观归类与主题选择从劳动课程直接概括为 learning through practice。主题突出实践学习，具体行为保留知识与合作，社会层面再联系全面发展。\n本文主题： learning through practice（在实践中学习）\n二、第一段怎样组织\n统计对象： Among gains reported from labour practice courses at one university。交代调查的是课程收获。\n最高项目： acquiring knowledge accounts for the largest share, at 91.3%。先写知识这一最大项。\n分类比较： followed by improving practical skills, feeling happier and enhancing cooperation。把实践能力、情绪感受、合作能力依比例接入，并以 respectively 对应数据。\n主题衔接： 四项收获共同呈现多方面成长，引出全面素质教育。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that learning through practice finds direct expression in phenomena exemplified by the way people gain knowledge and work with others in labour courses.首先，从经验上讲，在实践中学习直接体现在以人们在劳动课程中学习知识并与他人合作为代表的现象之中。\n【具体行为】 gain knowledge and work with others in labour courses（在劳动课程中学习知识并与他人合作）表达组织： 复用首段 knowledge、cooperation 与 labour practice courses，组织为 gain knowledge and work with others in labour courses。\n用知识和合作两个简单内容概括课程的重要收获。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n实践中的知识收获、合作体验和愉悦感，解释人们为何愿意参与此类学习。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n把学习放进实践，需要课程设计、活动机会和共同参与的环境。\n④ 相关战略\nFrom this perspective, a shared commitment to fostering well-rounded development can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress.基于这一认识，对促进全面发展的共同坚持能够为社区和国家在和谐中蓬勃发展创造条件，为可持续进步奠定基础。\n【相关战略】 fostering well-rounded development（促进全面发展）语料来源： 文明类【相关战略】：fostering well-rounded development。\n把学习、实践、愉悦与合作归入多方面成长。\n⑤ 主题的社会价值\nAn article published by Beijing Normal University lends support to the view that learning through practice plays an important role in fostering community prosperity.北京师范大学刊载的一篇文章支持这样一种观点，即在实践中学习在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 Beijing Normal University（北京师范大学）。\n【主题词】 learning through practice（在实践中学习）。\n由个人实践学习拓展到合作素养和社区共同成长。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when learning through practice guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当在实践中学习这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n在实践中学习能够指导学生参与活动，也能指导教育和社区提供有意义的实践机会。"
    },
    {
      "year": 2023,
      "title": "健康素养与健康中国",
      "tier": "满分版",
      "tierKey": "full",
      "coreTheme": "building a healthy China（建设健康中国）",
      "wordCount": 188,
      "enEssay": "The figures in the line chart reveal notable changes concerning building a healthy China. Between 2012 and 2021, the proportion of Chinese residents aged 15 to 69 with basic health literacy rose from about 8.8% to around 25.4%, nearly tripling during this period.\n\nBuilding a healthy China has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people learn about health and share useful knowledge with others, ultimately contributing to improved health and overall well-being. National policies on public health and well-being likewise focus on empowering individuals to make informed decisions about their health. Beyond personal advancement, this principle can strengthen communities by improving quality of life and encouraging mutual assistance, laying the groundwork for sustainable progress. This is in line with national strategies for access to healthcare and improving people's well-being: as this principle takes root, service quality rises and community support strengthens.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when building a healthy China guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "折线图中的数据揭示了有关建设健康中国的显著变化。从2012年到2021年，我国15至69岁居民中具备基本健康素养的比例从约8.8%上升到约25.4%，在这一时期内接近原来的三倍。\n\n建设健康中国受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们学习健康知识并与他人分享有用知识的做法中，最终有助于改善健康状况、增进整体安康。国家在公共健康与福祉方面的政策，同样着重于使个人能够依据充分信息作出健康决策。除个人发展之外，这一原则还可以通过提升生活质量、鼓励相互帮助增强社区，为可持续进步奠定基础。这与国家关于保障病有所医和改善人民福祉的战略相契合：随着这一理念逐渐扎根，服务质量得到提升，社区支持更加有力。\n\n总之，人们已经形成一种基于理性认识的共识，即当建设健康中国指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、主题怎样从材料中提炼\n题下注释将健康素养解释为获取和理解基本健康信息与服务，并运用这些信息与服务作出正确决策、维护和促进自身健康的能力。因此，评论围绕学习健康知识、作出健康选择和日常运用展开，再将这一能力的普及联系到建设健康中国。\n论述顺序： 健康知识的获取与分享 → 作出有依据的健康决策 → 改善生活并相互帮助 → 医疗健康服务与社区支持 → 建设健康中国。\n二、第一段怎样组织\nBetween 2012 and 2021, the proportion of Chinese residents aged 15 to 69 with basic health literacy rose from about 8.8% to around 25.4%, nearly tripling during this period.以时间、统计对象和起止数据写出变化，趋势词与程度表达概括主要特征。\n折线图中的数据揭示了有关建设健康中国的显著变化。从2012年到2021年，我国15至69岁居民中具备基本健康素养的比例从约8.8%上升到约25.4%，在这一时期内接近原来的三倍。\n三、第二段逐句拆解\n① 主题总起\nBuilding a healthy China has attracted attention, not least because of its far-reaching implications.以建设健康中国总起，下面的行为、政策支持和社会作用逐层展开这一主题。\n② 个人行为与成果\nAt the individual level, it is reflected in the way people learn about health and share useful knowledge with others, ultimately contributing to improved health and overall well-being.\n【具体行为】 learn about health and share useful knowledge with others（学习健康知识并与他人分享有用知识）\n语料取用： 根据健康素养的含义组织。learn about health 写获取知识，share useful knowledge with others 展开家庭和社区中的交流。\n【可见成果】 improved health and overall well-being（改善健康状况、增进整体安康）\n语料取用： 富强类【可见成果】：improved health, education, and living standards，取 improved health；和谐类\n【可见成果】：inner peace and overall well-being，取 overall well-being。组合为 improved health and overall well-being。\n个人不仅掌握健康知识，也将有用的信息与他人交流，使健康收益同时具有个人与共同生活的联系。\n③ 政策领域与个人能力\nNational policies on public health and well-being likewise focus on empowering individuals to make informed decisions about their health.\n【相关领域】 public health and well-being（公共健康与福祉）\n语料取用： 和谐类【相关领域】原句：public health and well-being。\n【个人能力／行为】 make informed decisions about their health（依据充分信息作出健康决策）\n语料取用： 和谐类【个人能力／行为】原句：make informed decisions about their health。\n“作出健康决策”直接承接题下注释中的能力含义。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by improving quality of life and encouraging mutual assistance, laying the groundwork for sustainable progress.\n【社会效果】 improving quality of life and encouraging mutual assistance（提升生活质量、鼓励相互帮助）\n语料取用： 和谐类【社会效果】：creating livable environments and improving quality of life，取 improving quality of life；友善类【社会效果】：reducing isolation and encouraging mutual assistance，取 encouraging mutual assistance。组合为 improving quality of life and encouraging mutual assistance。\n生活质量说明知识的实际价值，互助承接前面的分享与支持。\n⑤ 相关战略与社会变化\nThis is in line with national strategies for access to healthcare and improving people's well-being: as this principle takes root, service quality rises and community support strengthens.\n【相关战略】 access to healthcare and improving people's well-being（保障病有所医和改善人民福祉）\n语料取用： 和谐类【相关战略】：access to healthcare 与 improving people's well-being，两项以 and 连接。前者将支持落在医疗健康服务上，后者说明改善民生的目标。\n【社会变化】 service quality rises and community support strengthens（服务质量得到提升，社区支持更加有力）\n语料取用： 富强类【社会变化】：public facilities multiply citywide and service quality rises，取 service quality rises；友善类【社会变化】：vulnerable groups receive better care and community support strengthens，取community support strengthens。两部分都是完整主谓小句，组合为 service quality rises and community support strengthens。\nservice quality 承接前面的公共健康与医疗服务；community support 承接健康知识分享和相互帮助。服务质量提升与社区支持增强，共同说明居民维护健康时可以获得怎样的帮助。\n四、第三段怎样收束\n以 building a healthy China（建设健康中国） 回扣个人与社区的共同收益，并提出倡导这一方向的必要性。"
    },
    {
      "year": 2023,
      "title": "健康素养与健康中国",
      "tier": "简化版",
      "tierKey": "simplified",
      "coreTheme": "building a healthy China（建设健康中国）",
      "wordCount": 177,
      "enEssay": "The figures in the line chart reveal notable changes concerning building a healthy China. Between 2012 and 2021, the proportion of Chinese residents aged 15 to 69 with basic health literacy rose from about 8.8% to around 25.4%, nearly tripling during this period.\n\nBuilding a healthy China has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people learn about health and share useful knowledge with others, ultimately contributing to personal development and well-being. National policies on public health and well-being likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by improving quality of life and encouraging mutual assistance, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when building a healthy China guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "折线图中的数据揭示了有关建设健康中国的显著变化。从2012年到2021年，我国15至69岁居民中具备基本健康素养的比例从约8.8%上升到约25.4%，在这一时期内接近原来的三倍。\n\n建设健康中国受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们学习健康知识并与他人分享有用知识的做法中，最终有助于个人发展与福祉。国家在公共健康与福祉方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过提升生活质量、鼓励相互帮助增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n\n总之，人们已经形成一种基于理性认识的共识，即当建设健康中国指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 提取材料信息折线图显示，2012—2021年我国15至69岁居民的健康素养水平从8.8%上升至25.4%，接近原来的三倍。题下注释说明，健康素养涉及获取、理解健康信息与服务，并运用这些信息和服务作出健康决策。\n2. 从材料理解含义从健康素养的含义出发，个人层面可以写学习健康知识，并在生活中运用和交流。掌握知识服务自身健康，与他人分享则将个人学习延伸到共同生活中的支持。\n3. 确定主题将个人健康知识与更广泛的健康目标联系起来，选定 building a healthy China。具体行为写获取和分享知识，政策领域写公共健康，社会效果写生活质量与相互帮助。\n本文主题： building a healthy China（建设健康中国）\n二、第一段怎样组织\nThe figures in the line chart reveal notable changes concerning building a healthy China. Between 2012 and 2021, the proportion of Chinese residents aged 15 to 69 with basic health literacy rose from about 8.8% to around 25.4%, nearly tripling during this period. Between 2012 and 2021 交代时期，the proportion of Chinese residents aged 15 to 69 with basic health literacy 明确统计人群和指标。rose from about 8.8% to around 25.4% 写起止比例，nearly tripling during this period 概括总体增幅。\n三、第二段逐句拆解\n① 主题总起\nBuilding a healthy China has attracted attention, not least because of its far-reaching implications.建设健康中国受到关注，一个重要原因是其影响深远。\n以建设健康中国总起，下文由个人行动进入政策支持，再展开本题的社会作用。\n② 个人行为与个人收益\nAt the individual level, it is reflected in the way people learn about health and share useful knowledge with others, ultimately contributing to personal development and well-being.在个人层面，它体现在人们学习健康知识并与他人分享有用知识的做法中，最终有助于个人发展与福祉。\n【具体行为】 learn about health and share useful knowledge with others（学习健康知识并与他人分享有用知识）\n语料取用： 根据健康素养的含义组织：learn about health 写学习健康知识；share useful knowledge with others写知识交流，合为 learn about health and share useful knowledge with others。\n学习知识是理解健康信息的起点，分享知识则为后文的相互帮助提供具体承接。\npersonal development and well-being 将个人收益概括为发展与福祉。\n③ 政策领域与个人潜能\nNational policies on public health and well-being likewise focus on empowering individuals to achieve their full potential.国家在公共健康与福祉方面的政策，同样着重于使个人能够充分发挥自身潜能。\n【相关领域】 public health and well-being（公共健康与福祉）\n语料取用： 和谐类【相关领域】原句：public health and well-being。\n公共健康与福祉承接健康知识和生活需要，从社会支持层面回应个人发展的条件。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by improving quality of life and encouraging mutual assistance, laying the groundwork for sustainable progress.除个人发展之外，这一原则还可以通过提升生活质量、鼓励相互帮助增强社区，为可持续进步奠定基础。\n【社会效果】 improving quality of life and encouraging mutual assistance（提升生活质量、鼓励相互帮助）\n语料取用： 和谐类【社会效果】原句：creating livable environments and improving quality of life，取 improving quality of life；友善类【社会效果】原句：reducing isolation and encouraging mutual assistance，取 encouraging mutual assistance。组合为 improving quality of life and encouraging mutual assistance。\n生活质量对应健康知识用于日常生活的价值，相互帮助承接分享知识、共同理解信息和支持彼此的健康选择。\n社会作用继续围绕人如何学习、生活和交往展开。\n⑤ 宏观收束\nAs this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n从前一句的具体社会作用，进一步归纳这一理念对共同生活与长期发展的意义。\n四、第三段怎样收束\n以健康素养的提高为材料基础，讨论个人学习、公共健康支持及知识交流的共同价值，最后回扣建设健康中国。\n全文论述顺序： 学习和分享健康知识 → 个人发展与福祉 → 公共健康支持 → 生活质量与相互帮助 → 社会和谐与长期繁荣。"
    },
    {
      "year": 2023,
      "title": "居民健康素养与健康中国",
      "tier": "速通·标准套写",
      "tierKey": "fast_std",
      "coreTheme": "building a healthy China（建设健康中国）",
      "wordCount": 189,
      "enEssay": "Though deceptively simple, this line chart conveys a meaningful message: between 2012 and 2021, the proportion of Chinese residents aged 15 to 69 with basic health literacy rose from about 8.8% to around 25.4%, nearly tripling during this period. It serves as a compelling testament to the significance of building a healthy China.\n\nTo begin with, experience suggests that building a healthy China finds direct expression in phenomena exemplified by the way people make informed decisions about their health. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for access to healthcare that provides impetus for these developments. An article published by the National Health Commission lends support to the view that building a healthy China plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when building a healthy China guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管这张折线图看似简单，却传递出深刻的信息：2012—2021年，中国15至69岁居民中具备基本健康素养的比例从约8.8%上升至约25.4%，这一时期内接近原来的三倍。它有力地证明了建设健康中国的重要性。\n\n首先，从经验上讲，建设健康中国直接体现在以人们依据充分信息作出健康决策为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在病有所医方面的战略倡导与推广，为这些发展变化提供了动力。国家卫生健康委员会刊载的一篇文章支持这样一种观点，即建设健康中国在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当建设健康中国这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息折线图显示2012—2021年我国居民健康素养水平由8.80%升至25.40%。题下注释将健康素养解释为获取、理解基本健康信息和服务，并据此作出正确决策、维护和促进健康的能力。\n2. 从材料提炼含义题下注释把获取健康信息、理解信息与作出正确决策联系起来。由此先讨论居民怎样维护健康，再进入可获得的医疗健康服务及其对日常健康实践的支持。\n3. 价值观归类与主题选择从和谐类的公共健康与民生改善出发，选择 building a healthy China。个人的健康决策与医疗健康服务分别体现居民实践和社会支持，共同服务于建设健康中国。\n本文主题： building a healthy China（建设健康中国）\n二、第一段怎样组织\n时间范围： Between 2012 and 2021。先界定九年间的变化。\n统计对象： Chinese residents aged 15 to 69 with basic health literacy。将题下注释中的人群范围与指标名称写清。\n起止比例： rose from about 8.8% to around 25.4%。用上升句架呈现连续增长的总体结果。\n幅度补充： nearly tripling during this period。用接近三倍概括两端数字的数量关系。\n主题衔接： 健康素养的提升引出个人能力与公共支持共同服务于健康中国建设。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that building a healthy China finds direct expression in phenomena exemplified by the way people make informed decisions about their health.首先，从经验上讲，建设健康中国直接体现在以人们依据充分信息作出健康决策为代表的现象之中。\n【具体行为】 make informed decisions about their health（依据充分信息作出健康决策）语料来源： 和谐类【个人能力/行为】：make informed decisions about their health。\n直接承接题下注释中的获取信息、理解信息并作出健康决策。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n人们重视健康信息，是因为希望据此改善生活和维护健康。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n作出健康选择还需要能接触到知识和服务，因此由个人能力进入公共医疗健康条件。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for access to healthcare that provides impetus for these developments.基于这一认识，正是国家在病有所医方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 access to healthcare（病有所医）语料来源： 和谐类【相关战略】：access to healthcare。\n以可获得的医疗健康服务承接个人运用健康知识的需要。\n⑤ 主题的社会价值\nAn article published by the National Health Commission lends support to the view that building a healthy China plays an important role in fostering community prosperity.国家卫生健康委员会刊载的一篇文章支持这样一种观点，即建设健康中国在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 the National Health Commission（国家卫生健康委员会）。\n【主题词】 building a healthy China（建设健康中国）。\n回到建设健康中国这一共同目标，归纳居民能力与公共服务的意义。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when building a healthy China guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当建设健康中国这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n建设健康中国同时指导居民作出有依据的健康选择，以及社会提供医疗健康服务，个人与社区由此共同受益。"
    },
    {
      "year": 2023,
      "title": "居民健康素养与健康中国",
      "tier": "速通·无脑套写",
      "tierKey": "fast_ez",
      "coreTheme": "making China healthier（让中国更加健康）",
      "wordCount": 186,
      "enEssay": "Though deceptively simple, this line chart conveys a meaningful message: between 2012 and 2021, the proportion of Chinese residents aged 15 to 69 with basic health literacy rose from about 8.8% to around 25.4%, nearly tripling during this period. It serves as a compelling testament to the significance of making China healthier.\n\nTo begin with, experience suggests that making China healthier finds direct expression in phenomena exemplified by the way people learn about health and live healthier lives. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for access to healthcare that provides impetus for these developments. An article published by the National Health Commission lends support to the view that making China healthier plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when making China healthier guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管这张折线图看似简单，却传递出深刻的信息：2012—2021年，中国15至69岁居民中具备基本健康素养的比例从约8.8%上升至约25.4%，这一时期内接近原来的三倍。它有力地证明了让中国更加健康的重要性。\n\n首先，从经验上讲，让中国更加健康直接体现在以人们学习健康知识并过更健康的生活为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在病有所医方面的战略倡导与推广，为这些发展变化提供了动力。国家卫生健康委员会刊载的一篇文章支持这样一种观点，即让中国更加健康在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当让中国更加健康这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息折线图显示2012—2021年我国居民健康素养水平由8.80%升至25.40%。题下注释将健康素养解释为获取、理解基本健康信息和服务，并据此作出正确决策、维护和促进健康的能力。\n2. 从材料提炼含义题下注释把获取健康信息、理解信息与作出正确决策联系起来。由此先讨论居民怎样维护健康，再进入可获得的医疗健康服务及其对日常健康实践的支持。\n3. 价值观归类与主题选择用 making China healthier 表达健康中国的直接含义，保留全国居民这一范围，个人动作写学习健康知识与健康生活。\n本文主题： making China healthier（让中国更加健康）\n二、第一段怎样组织\n时间范围： Between 2012 and 2021。先界定九年间的变化。\n统计对象： Chinese residents aged 15 to 69 with basic health literacy。将题下注释中的人群范围与指标名称写清。\n起止比例： rose from about 8.8% to around 25.4%。用上升句架呈现连续增长的总体结果。\n幅度补充： nearly tripling during this period。用接近三倍概括两端数字的数量关系。\n主题衔接： 健康素养的提升引出个人能力与公共支持共同服务于健康中国建设。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that making China healthier finds direct expression in phenomena exemplified by the way people learn about health and live healthier lives.首先，从经验上讲，让中国更加健康直接体现在以人们学习健康知识并过更健康的生活为代表的现象之中。\n【具体行为】 learn about health and live healthier lives（学习健康知识并过更健康的生活）表达组织： 从首段 health literacy 概括出 learn about health，再接 live healthier lives 表达知识的使用方向。\n把健康素养写成学习知识和改善生活两个容易理解的动作。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n学习健康知识的积极期待是更好地照顾自己、维护健康。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n个人学习和实践要有健康服务支持，因此接入病有所医。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for access to healthcare that provides impetus for these developments.基于这一认识，正是国家在病有所医方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 access to healthcare（病有所医）语料来源： 和谐类【相关战略】：access to healthcare。\n直接写为健康生活提供服务支持。\n⑤ 主题的社会价值\nAn article published by the National Health Commission lends support to the view that making China healthier plays an important role in fostering community prosperity.国家卫生健康委员会刊载的一篇文章支持这样一种观点，即让中国更加健康在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 the National Health Commission（国家卫生健康委员会）。\n【主题词】 making China healthier（让中国更加健康）。\n以让中国更加健康归纳个人学习与社会支持的共同价值。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when making China healthier guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当让中国更加健康这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n让中国更加健康既能指导居民的生活选择，也能指导公共服务安排。"
    },
    {
      "year": 2022,
      "title": "乡村快递与乡村振兴",
      "tier": "满分版",
      "tierKey": "full",
      "coreTheme": "rural revitalization（乡村振兴）",
      "wordCount": 180,
      "enEssay": "The figures in the bar chart reveal notable changes concerning rural revitalization. Between 2018 and 2020, the number of parcels delivered nationwide rose from about 51 billion to around 83 billion, while that of parcels delivered in rural areas increased sharply from roughly 12 billion to approximately 30 billion.\n\nRural revitalization has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people use delivery services to buy and sell goods in rural areas, ultimately contributing to greater convenience and expanded opportunities. National policies on urban-rural integration likewise focus on empowering individuals to benefit from infrastructure upgrades and technological progress. Beyond personal advancement, this principle can strengthen communities by improving productivity and service quality, laying the groundwork for sustainable progress. This is in line with national strategies for rural industrial development: as this principle takes root, living conditions improve.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when rural revitalization guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "条形图中的数据揭示了有关乡村振兴的显著变化。从2018年到2020年，全国快递业务量从约510亿件增加到约830亿件，而农村快递业务量则从约120亿件大幅增加到约300亿件。\n\n乡村振兴受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们在农村利用快递服务买卖商品的做法中，最终带来更大的便利与更多的发展机会。国家在城乡融合方面的政策，同样着重于使个人能够受益于基础设施升级与技术进步。除个人发展之外，这一原则还可以通过提高生产效率与服务质量增强社区，为可持续进步奠定基础。这与国家关于乡村产业发展的战略相契合：随着这一理念逐渐扎根，生活条件得到改善。\n\n总之，人们已经形成一种基于理性认识的共识，即当乡村振兴指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、主题怎样从材料中提炼\n2018—2020年，全国与农村快递业务量都增长，农村一项由120亿件增加到300亿件，增长尤其突出。评论从快递服务向农村深入切入，联系农村居民购物的便利，以及乡村生产经营连接市场的机会，选定“乡村振兴”。\n论述顺序： 农村居民利用寄递买卖商品 → 获得便利与机会 → 城乡融合提供网络与技术条件 → 改善生产经营和服务 → 乡村产业发展惠及生活。\n二、第一段怎样组织\nBetween 2018 and 2020, the number of parcels delivered nationwide rose from about 51 billion to around 83 billion, while that of parcels delivered in rural areas increased sharply from roughly 12 billion to approximately 30 billion.以时间、统计对象和起止数据写出变化，趋势词与程度表达概括主要特征。\n条形图中的数据揭示了有关乡村振兴的显著变化。从2018年到2020年，全国快递业务量从约510亿件增加到约830亿件，而农村快递业务量则从约120亿件大幅增加到约300亿件。\n三、第二段逐句拆解\n① 主题总起\nRural revitalization has attracted attention, not least because of its far-reaching implications.以乡村振兴总起，下面的行为、政策支持和社会作用逐层展开这一主题。\n② 个人行为与成果\nAt the individual level, it is reflected in the way people use delivery services to buy and sell goods in rural areas, ultimately contributing to greater convenience and expanded opportunities.\n【具体行为】 use delivery services to buy and sell goods in rural areas（在农村利用快递服务买卖商品）\n语料取用： 根据快递业务量这一对象组织。use delivery services 写工具，buy and sell goods 同时覆盖消费与经营，in rural areas 保留农村对象。\n【可见成果】 greater convenience and expanded opportunities（更大的便利与更多的发展机会）\n语料取用： 富强类【可见成果】：greater convenience and personal fulfillment，取 greater convenience；同栏enhanced quality of life and expanded opportunities，取 expanded opportunities。组合为 greater convenience and expanded opportunities。\n买卖商品分别体现消费便利与连接市场的机会，说明快递增长怎样进入个人生活。\n③ 政策领域与个人能力\nNational policies on urban-rural integration likewise focus on empowering individuals to benefit from infrastructure upgrades and technological progress.\n【相关领域】 urban-rural integration（城乡融合）\n语料取用： 富强类【相关领域】原句：urban-rural integration。\n【个人能力／行为】 benefit from infrastructure upgrades and technological progress（受益于基础设施升级与技术进步）\n语料取用： 富强类【个人能力／行为】完整原句：benefit from infrastructure upgrades and technological progress。\n城乡融合为农村与外部市场的联系提供网络和技术支持。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by improving productivity and service quality, laying the groundwork for sustainable progress.\n【社会效果】 improving productivity and service quality（提高生产效率与服务质量）\n语料取用： 富强类【社会效果】完整原句：improving productivity and service quality。\n从个人交易进一步讨论生产经营的效率和寄递服务的质量。\n⑤ 相关战略与社会变化\nThis is in line with national strategies for rural industrial development: as this principle takes root, living conditions improve.\n【相关战略】 rural industrial development（乡村产业发展）\n语料取用： 和谐类【相关战略】中乡村产业振兴的表达：rural industrial development。\n【社会变化】 living conditions improve（生活条件得到改善）\n语料取用： 富强类【社会变化】原句：infrastructure gaps narrow and living conditions improve。取后半个完整小句 living conditions improve。\n乡村产业发展承接交易和经营机会，最终以生活条件改善归纳居民收益。\n四、第三段怎样收束\n以 rural revitalization（乡村振兴） 回扣个人与社区的共同收益，并提出倡导这一方向的必要性。"
    },
    {
      "year": 2022,
      "title": "乡村快递与乡村振兴",
      "tier": "简化版",
      "tierKey": "simplified",
      "coreTheme": "rural revitalization（乡村振兴）",
      "wordCount": 176,
      "enEssay": "The figures in the bar chart reveal notable changes concerning rural revitalization. Between 2018 and 2020, the number of parcels delivered nationwide rose from about 51 billion to around 83 billion, while that of parcels delivered in rural areas increased sharply from roughly 12 billion to approximately 30 billion.\n\nRural revitalization has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people use delivery services to buy and sell goods in rural areas, ultimately contributing to personal development and well-being. National policies on urban-rural integration likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by improving productivity and service quality, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when rural revitalization guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "条形图中的数据揭示了有关乡村振兴的显著变化。从2018年到2020年，全国快递业务量从约510亿件增加到约830亿件，而农村快递业务量则从约120亿件大幅增加到约300亿件。\n\n乡村振兴受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们在农村利用快递服务买卖商品的做法中，最终有助于个人发展与福祉。国家在城乡融合方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过提高生产效率与服务质量增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n\n总之，人们已经形成一种基于理性认识的共识，即当乡村振兴指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 提取材料信息条形图统计2018—2020年全国与农村快递业务量。全国业务量依次为510亿、640亿、830亿件，农村业务量依次为120亿、150亿、300亿件。两类都增长，农村一项的相对增幅更大。\n2. 从材料理解含义快递联系商品购买与销售。农村寄递业务的增长，可以从居民购物便利和生产经营连接市场两个方面展开，进而讨论乡村发展的机会与服务能力。\n3. 确定主题从富强类的经济机会、城乡联系出发，选定 rural revitalization。个人行为写在农村利用快递买卖商品，社会作用进一步联系生产经营和服务质量。\n本文主题： rural revitalization（乡村振兴）\n二、第一段怎样组织\nThe figures in the bar chart reveal notable changes concerning rural revitalization. Between 2018 and 2020, the number of parcels delivered nationwide rose from about 51 billion to around 83 billion, while that of parcels delivered in rural areas increased sharply from roughly 12 billion to approximately 30 billion. Between 2018 and 2020 交代起止时间；the number of parcels delivered nationwide rose from about 51 billion to around 83 billion 描述全国业务量。while that of parcels delivered in rural areas increased sharply 连接农村一项，填写12 billion到30 billion，突出其较大的相对增幅。\n三、第二段逐句拆解\n① 主题总起\nRural revitalization has attracted attention, not least because of its far-reaching implications.乡村振兴受到关注，一个重要原因是其影响深远。\n以乡村振兴总起，下文由个人行动进入政策支持，再展开本题的社会作用。\n② 个人行为与个人收益\nAt the individual level, it is reflected in the way people use delivery services to buy and sell goods in rural areas, ultimately contributing to personal development and well-being.在个人层面，它体现在人们在农村利用快递服务买卖商品的做法中，最终有助于个人发展与福祉。\n【具体行为】 use delivery services to buy and sell goods in rural areas（在农村利用快递服务买卖商品）\n语料取用： 结合题面组织：用 delivery services 指快递服务，以 buy and sell goods 写消费和销售两个方面，再用 in rural areas 限定乡村场景，组成 use delivery services to buy and sell goods in rural areas。\n个人既可以通过快递获得所需商品，也可以借助寄递销售商品。行为把乡村振兴落在日常交易与经济参与上。\npersonal development and well-being 将个人收益概括为发展与福祉。\n③ 政策领域与个人潜能\nNational policies on urban-rural integration likewise focus on empowering individuals to achieve their full potential.国家在城乡融合方面的政策，同样着重于使个人能够充分发挥自身潜能。\n【相关领域】 urban-rural integration（城乡融合）\n语料取用： 富强类【相关领域】原句：urban-rural integration。\n城乡融合将农村居民的交易活动与更广泛的市场联系起来，使个人能够获得更多参与发展的机会。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by improving productivity and service quality, laying the groundwork for sustainable progress.除个人发展之外，这一原则还可以通过提高生产效率与服务质量增强社区，为可持续进步奠定基础。\n【社会效果】 improving productivity and service quality（提高生产效率与服务质量）\n语料取用： 富强类【社会效果】完整原句：improving productivity and service quality。\n个人的商品交易进一步联系生产经营。寄递环节与生产销售相衔接，可以从组织效率和服务体验两方面讨论其社会作用：productivity 对应生产经营，service quality 对应寄递服务。\n⑤ 宏观收束\nAs this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n从前一句的具体社会作用，进一步归纳这一理念对共同生活与长期发展的意义。\n四、第三段怎样收束\n从全国与农村业务量的变化出发，围绕农村商品流通、市场联系和服务能力展开，最后以乡村振兴统摄个人与社区的收益。\n全文论述顺序： 农村利用寄递买卖商品 → 个人发展与福祉 → 城乡融合提供发展机会 → 生产效率与服务质量→ 社会和谐与长期繁荣。"
    },
    {
      "year": 2022,
      "title": "乡村快递发展与乡村振兴",
      "tier": "速通·标准套写",
      "tierKey": "fast_std",
      "coreTheme": "rural revitalization（乡村振兴）",
      "wordCount": 189,
      "enEssay": "Though deceptively simple, this bar chart conveys a meaningful message: between 2018 and 2020, the number of parcels delivered nationwide rose from about 51 billion to around 83 billion, while that in rural areas increased sharply from roughly 12 billion to approximately 30 billion. It serves as a compelling testament to the significance of rural revitalization.\n\nTo begin with, experience suggests that this trend can be explained in part by people's desire to make use of delivery services to buy and sell goods more easily. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for rural industrial development that provides impetus for these developments. An article published by Nankai University lends support to the view that rural revitalization plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when rural revitalization guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管条形图看似简单，却传递出深刻的信息：2018—2020年，全国快递业务量从约510亿件增至约830亿件，其中农村快递业务量从约120亿件大幅增至约300亿件。它有力地证明了乡村振兴的重要性。\n\n首先，从经验上讲，这一趋势可以部分归因于人们希望利用快递服务更方便地买卖商品。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在乡村产业振兴方面的战略倡导与推广，为这些发展变化提供了动力。南开大学刊载的一篇文章支持这样一种观点，即乡村振兴在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当乡村振兴指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息图表给出2018—2020年全国与农村快递业务量。全国分别为510、640、830亿件，农村分别为120、150、300亿件。全国总量增长的同时，农村寄递规模也明显扩大。\n2. 从材料提炼含义快递服务进入乡村，意味着买入商品和寄出产品拥有更方便的途径。由寄递规模增长，可以讨论农村居民怎样获得便利和发展机会，以及公共服务与产业发展怎样提供支持。\n3. 价值观归类与主题选择从和谐类的乡村生活与富强类的服务发展结合，选择 rural revitalization。主题将快递这一具体渠道与乡村生活改善、经济联系和产业机会连接起来。\n本文主题： rural revitalization（乡村振兴）\n二、第一段怎样组织\n年份与全国总量： Between 2018 and 2020。先写全国快递业务量由51 billion增至83 billion。\n乡村比较： while that in rural areas increased sharply。以 while 接入农村的12 billion至30 billion，突出其明显增长。\n指标接续： that in rural areas。that 回指前面的 number of parcels delivered，构成同一指标的比较。\n主题衔接： 全国与农村寄递业务的发展，把基础服务与乡村经济生活联系起来。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that this trend can be explained in part by people's desire to make use of delivery services to buy and sell goods more easily.首先，从经验上讲，这一趋势可以部分归因于人们希望利用快递服务更方便地买卖商品。\n【具体行为】 make use of delivery services to buy and sell goods more easily（利用快递服务更方便地买卖商品）语料来源： 和谐类【具体行为】：make use of public services and facilities。取用 make use of。\n表达组织： 保留 make use of，将对象具体写成 delivery services，再接 to buy and sell goods more easily 交代用途。\n写出寄递业务进入农村后，居民可以实际采取的行动。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n更方便地买卖和收寄，是居民使用寄递服务的重要积极期待。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n个人需要还要通过站点、网络和产业流通条件实现，因此转入乡村产业支持。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for rural industrial development that provides impetus for these developments.基于这一认识，正是国家在乡村产业振兴方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 rural industrial development（乡村产业振兴）语料来源： 和谐类【相关战略】：rural industrial development。\n将方便买卖和寄递的个人需要与乡村产业的流通条件联系起来。\n⑤ 主题的社会价值\nAn article published by Nankai University lends support to the view that rural revitalization plays an important role in fostering community prosperity.南开大学刊载的一篇文章支持这样一种观点，即乡村振兴在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 Nankai University（南开大学）。\n【主题词】 rural revitalization（乡村振兴）。\n回扣乡村振兴，使寄递便利与更广泛的乡村发展联系起来。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when rural revitalization guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当乡村振兴指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n乡村振兴将居民的便利、发展机会与服务条件相联系，结尾汇合个人和社区的收益。"
    },
    {
      "year": 2022,
      "title": "乡村快递发展与乡村振兴",
      "tier": "速通·无脑套写",
      "tierKey": "fast_ez",
      "coreTheme": "improving rural life（改善乡村生活）",
      "wordCount": 186,
      "enEssay": "Though deceptively simple, this bar chart conveys a meaningful message: between 2018 and 2020, the number of parcels delivered nationwide rose from about 51 billion to around 83 billion, while that in rural areas increased sharply from roughly 12 billion to approximately 30 billion. It serves as a compelling testament to the significance of improving rural life.\n\nTo begin with, experience suggests that this trend can be explained in part by people's desire to buy and send goods through delivery services. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for rural revitalization that provides impetus for these developments. An article published by Nankai University lends support to the view that improving rural life plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when improving rural life guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管条形图看似简单，却传递出深刻的信息：2018—2020年，全国快递业务量从约510亿件增至约830亿件，其中农村快递业务量从约120亿件大幅增至约300亿件。它有力地证明了改善乡村生活的重要性。\n\n首先，从经验上讲，这一趋势可以部分归因于人们希望通过快递购买和寄送商品。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在乡村振兴方面的战略倡导与推广，为这些发展变化提供了动力。南开大学刊载的一篇文章支持这样一种观点，即改善乡村生活在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当改善乡村生活这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息图表给出2018—2020年全国与农村快递业务量。全国分别为510、640、830亿件，农村分别为120、150、300亿件。全国总量增长的同时，农村寄递规模也明显扩大。\n2. 从材料提炼含义快递服务进入乡村，意味着买入商品和寄出产品拥有更方便的途径。由寄递规模增长，可以讨论农村居民怎样获得便利和发展机会，以及公共服务与产业发展怎样提供支持。\n3. 价值观归类与主题选择从乡村快递增加直接概括 improving rural life，个人写购买和寄送，社会层面写乡村振兴。\n本文主题： improving rural life（改善乡村生活）\n二、第一段怎样组织\n年份与全国总量： Between 2018 and 2020。先写全国快递业务量由51 billion增至83 billion。\n乡村比较： while that in rural areas increased sharply。以 while 接入农村的12 billion至30 billion，突出其明显增长。\n指标接续： that in rural areas。that 回指前面的 number of parcels delivered，构成同一指标的比较。\n主题衔接： 全国与农村寄递业务的发展，把基础服务与乡村经济生活联系起来。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that this trend can be explained in part by people's desire to buy and send goods through delivery services.首先，从经验上讲，这一趋势可以部分归因于人们希望通过快递购买和寄送商品。\n【具体行为】 buy and send goods through delivery services（通过快递购买和寄送商品）表达组织： 由 parcels delivered 和 rural areas 提取寄递场景，组织为 buy and send goods through delivery services。\n直接把快递业务写成居民的日常使用。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n通过寄递买卖商品能够让日常生活更方便，解释居民使用这些服务的动力。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n便捷的收寄需要乡村服务网络与发展条件，因此转入社会支持。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for rural revitalization that provides impetus for these developments.基于这一认识，正是国家在乡村振兴方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 rural revitalization（乡村振兴）语料来源： 和谐类【相关战略】：rural revitalization。\n直接承接农村居民的服务与生活需要。\n⑤ 主题的社会价值\nAn article published by Nankai University lends support to the view that improving rural life plays an important role in fostering community prosperity.南开大学刊载的一篇文章支持这样一种观点，即改善乡村生活在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 Nankai University（南开大学）。\n【主题词】 improving rural life（改善乡村生活）。\n将快递这种生活服务的变化归结到改善乡村生活。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when improving rural life guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当改善乡村生活这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n改善乡村生活既指导居民利用新服务，也指导乡村完善发展条件。"
    },
    {
      "year": 2021,
      "title": "锻炼方式与健康意识",
      "tier": "满分版",
      "tierKey": "full",
      "coreTheme": "greater health awareness（更强的健康意识）",
      "wordCount": 186,
      "enEssay": "The figures in the bar chart reveal notable differences concerning greater health awareness. Among residents surveyed in one city, exercising alone accounts for the largest share, at 54.3%, followed by exercising with friends, with family members and in organised groups at 47.7%, 23.9% and 15.8% respectively.\n\nGreater health awareness has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people exercise alone or with others to maintain their health, ultimately contributing to inner peace and overall well-being. National policies on public health and well-being likewise focus on empowering individuals to make informed decisions about their health. Beyond personal advancement, this principle can strengthen communities by fostering neighborhood ties and mutual support, laying the groundwork for sustainable progress. This is in line with national strategies for building a healthy China: as this principle takes root, green areas expand and fitness facilities become more accessible.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when greater health awareness guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "条形图中的数据揭示了有关更强健康意识的显著差异。在受访的某市居民中，独自锻炼占比最高，为54.3%；随后是与朋友一起、与家人一起以及参加团体锻炼，分别占47.7%、23.9%和15.8%。\n\n更强的健康意识受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们独自或与他人一起锻炼以维护健康的做法中，最终有助于获得内心平静与整体安康。国家在公共健康与福祉方面的政策，同样着重于使个人能够依据充分信息作出健康决策。除个人发展之外，这一原则还可以通过加强邻里联系与相互支持增强社区，为可持续进步奠定基础。这与国家建设健康中国的战略相契合：随着这一理念逐渐扎根，绿色空间扩大，健身设施更加便捷易达。\n\n总之，人们已经形成一种基于理性认识的共识，即当更强的健康意识指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、主题怎样从材料中提炼\n图表比较居民采取的不同锻炼方式：既有独自锻炼，也有与朋友、家人及团体共同锻炼。这些形式共同体现人们将健康需要落实为日常行动，因此以“更强的健康意识”组织评论。个人部分讨论锻炼和健康选择，社会部分利用结伴锻炼讨论交往与支持。\n论述顺序： 个人进行锻炼 → 获得身心收益并作出健康选择 → 共同活动促进交往 → 健康中国为日常活动提供支持。\n二、第一段怎样组织\nAmong residents surveyed in one city, exercising alone accounts for the largest share, at 54.3%, followed by exercising with friends, with family members and in organised groups at 47.7%, 23.9% and 15.8%respectively.先交代调查对象，再以 accounts for the largest share 写最大项，以 followed by 连接其余类别，respectively 对应各项比例。\n条形图中的数据揭示了有关更强健康意识的显著差异。在受访的某市居民中，独自锻炼占比最高，为54.3%；\n随后是与朋友一起、与家人一起以及参加团体锻炼，分别占47.7%、23.9%和15.8%。\n三、第二段逐句拆解\n① 主题总起\nGreater health awareness has attracted attention, not least because of its far-reaching implications.以更强的健康意识总起，下面的行为、政策支持和社会作用逐层展开这一主题。\n② 个人行为与成果\nAt the individual level, it is reflected in the way people exercise alone or with others to maintain their health, ultimately contributing to inner peace and overall well-being.\n【具体行为】 exercise alone or with others to maintain their health（独自或与他人一起锻炼以维护健康）\n语料取用： 根据首段的锻炼方式组织。exercise alone or with others 概括独自与结伴锻炼，to maintain their health 写目的。\n【可见成果】 inner peace and overall well-being（内心平静与整体安康）\n语料取用： 和谐类【可见成果】完整原句：inner peace and overall well-being。\n独自或结伴锻炼是健康意识的行动表现，成果兼顾心理感受和整体安康。\n③ 政策领域与个人能力\nNational policies on public health and well-being likewise focus on empowering individuals to make informed decisions about their health.\n【相关领域】 public health and well-being（公共健康与福祉）\n语料取用： 和谐类【相关领域】原句：public health and well-being。\n【个人能力／行为】 make informed decisions about their health（依据充分信息作出健康决策）\n语料取用： 和谐类【个人能力／行为】原句：make informed decisions about their health。\n从重视健康推进到了解自身需要、选择合适的健康做法。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by fostering neighborhood ties and mutual support, laying the groundwork for sustainable progress.\n【社会效果】 fostering neighborhood ties and mutual support（加强邻里联系与相互支持）\n语料取用： 和谐类【社会效果】完整原句：fostering neighborhood ties and mutual support。\n朋友、家人和团体共同锻炼，使健康活动与交流、陪伴及相互支持发生联系。\n⑤ 相关战略与社会变化\nThis is in line with national strategies for building a healthy China: as this principle takes root, green areas expand and fitness facilities become more accessible.\n【相关战略】 building a healthy China（建设健康中国）\n语料取用： 和谐类【相关战略】原句：building a healthy China。\n【社会变化】 green areas expand and fitness facilities become more accessible（绿色空间扩大，健身设施更加便捷易达）\n语料取用： 和谐类【社会变化】完整原句：green areas expand and fitness facilities become more accessible。\n健康中国的共同目标进一步落实为绿色空间与便捷的健身条件。\n四、第三段怎样收束\n以 greater health awareness（更强的健康意识） 回扣个人与社区的共同收益，并提出倡导这一方向的必要性。"
    },
    {
      "year": 2021,
      "title": "锻炼方式与健康意识",
      "tier": "简化版",
      "tierKey": "simplified",
      "coreTheme": "greater health awareness（更强的健康意识）",
      "wordCount": 176,
      "enEssay": "The figures in the bar chart reveal notable differences concerning greater health awareness. Among residents surveyed in one city, exercising alone accounts for the largest share, at 54.3%, followed by exercising with friends, with family members and in organised groups at 47.7%, 23.9% and 15.8% respectively.\n\nGreater health awareness has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people exercise alone or with others to maintain their health, ultimately contributing to personal development and well-being. National policies on public health and well-being likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by fostering neighborhood ties and mutual support, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when greater health awareness guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "条形图中的数据揭示了有关更强健康意识的显著差异。在受访的某市居民中，独自锻炼占比最高，为54.3%；随后是与朋友一起、与家人一起以及参加团体锻炼，分别占47.7%、23.9%和15.8%。\n\n更强的健康意识受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们独自或与他人一起锻炼以维护健康的做法中，最终有助于个人发展与福祉。国家在公共健康与福祉方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过加强邻里联系与相互支持增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n\n总之，人们已经形成一种基于理性认识的共识，即当更强的健康意识指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 提取材料信息条形图比较某市居民的体育锻炼方式。独自锻炼占54.3%，与朋友一起占47.7%，与家人一起占23.9%，参加团体活动占15.8%。\n2. 从材料理解含义这些方式虽有独自和结伴之分，共同点都是将健康需要落实为日常锻炼。结伴与团体活动还包含与他人交往、共同参与的内容，因此可以分别展开个人健康行动和社会联系。\n3. 确定主题从和谐类的健康生活出发，选定 greater health awareness。具体行为涵盖独自与结伴锻炼，社会效果承接朋友、家人和团体共同参与这一侧面。\n本文主题： greater health awareness（更强的健康意识）\n二、第一段怎样组织\nThe figures in the bar chart reveal notable differences concerning greater health awareness. Among residents surveyed in one city, exercising alone accounts for the largest share, at 54.3%, followed by exercising with friends, with family members and in organised groups at 47.7%, 23.9% and 15.8% respectively. Among residents surveyed in one city 交代调查对象。exercising alone accounts for the largest share 写独自锻炼这一最高项；followed by exercising with friends, with family members and in organised groups 按比例列出另外三种方式，最后依次填写47.7%、23.9%和15.8%。\n三、第二段逐句拆解\n① 主题总起\nGreater health awareness has attracted attention, not least because of its far-reaching implications.更强的健康意识受到关注，一个重要原因是其影响深远。\n以更强的健康意识总起，下文由个人行动进入政策支持，再展开本题的社会作用。\n② 个人行为与个人收益\nAt the individual level, it is reflected in the way people exercise alone or with others to maintain their health, ultimately contributing to personal development and well-being.在个人层面，它体现在人们独自或与他人一起锻炼以维护健康的做法中，最终有助于个人发展与福祉。\n【具体行为】 exercise alone or with others to maintain their health（独自或与他人一起锻炼以维护健康）\n语料取用： 根据题面组织：保留首段的 exercise、alone 及与他人共同活动的含义，写成 exercise alone or with others to maintain their health。\n独自锻炼与结伴锻炼都可以体现对自身健康的重视，行动目的用 maintain their health 直接说明。\npersonal development and well-being 将个人收益概括为发展与福祉。\n③ 政策领域与个人潜能\nNational policies on public health and well-being likewise focus on empowering individuals to achieve their full potential.国家在公共健康与福祉方面的政策，同样着重于使个人能够充分发挥自身潜能。\n【相关领域】 public health and well-being（公共健康与福祉）\n语料取用： 和谐类【相关领域】原句：public health and well-being。\n公共健康与福祉连接个人的锻炼需要与更广泛的健康支持，潜能发展在这里联系积极、健康的日常生活。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by fostering neighborhood ties and mutual support, laying the groundwork for sustainable progress.除个人发展之外，这一原则还可以通过加强邻里联系与相互支持增强社区，为可持续进步奠定基础。\n【社会效果】 fostering neighborhood ties and mutual support（加强邻里联系与相互支持）\n语料取用： 和谐类【社会效果】完整原句：fostering neighborhood ties and mutual support。\n社会部分从结伴与团体锻炼展开。共同参加活动提供相识、交流、陪伴与相互鼓励的机会，因此论述由个人锻炼延伸到邻里联系和互相支持。\n⑤ 宏观收束\nAs this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n从前一句的具体社会作用，进一步归纳这一理念对共同生活与长期发展的意义。\n四、第三段怎样收束\n以健康意识推动锻炼为起点，分别讨论个人生活与共同活动。结尾将个人收益和社区联系收束到健康意识这一主题。\n全文论述顺序： 健康意识落实为锻炼 → 个人发展与福祉 → 公共健康支持 → 共同活动促进联系和支持 → 社会和谐与长期繁荣。"
    },
    {
      "year": 2021,
      "title": "体育锻炼方式与健康意识",
      "tier": "速通·标准套写",
      "tierKey": "fast_std",
      "coreTheme": "greater health awareness（更强的健康意识）",
      "wordCount": 191,
      "enEssay": "Though deceptively simple, this bar chart conveys a meaningful message: among residents surveyed in one city, exercising alone accounts for the largest share, at 54.3%, followed by exercising with friends, family members and organised groups at 47.7%, 23.9% and 15.8% respectively. It serves as a compelling testament to the significance of greater health awareness.\n\nTo begin with, experience suggests that greater health awareness finds direct expression in phenomena exemplified by the way people exercise alone or with others to maintain their health. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for building a healthy China that provides impetus for these developments. An article published by the National Health Commission lends support to the view that greater health awareness plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when greater health awareness guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管条形图看似简单，却传递出深刻的信息：在某市受访居民中，独自锻炼的比例最高，为54.3%；随后是与朋友、家人和团体一起锻炼，分别占47.7%、23.9%和15.8%。它有力地证明了更强的健康意识的重要性。\n\n首先，从经验上讲，更强的健康意识直接体现在以人们独自或与他人一起锻炼以维护健康为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在建设健康中国方面的战略倡导与推广，为这些发展变化提供了动力。国家卫生健康委员会刊载的一篇文章支持这样一种观点，即更强的健康意识在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当更强的健康意识指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息调查列出某市居民四种体育锻炼方式：独自锻炼54.3%，和朋友一起47.7%，和家人一起23.9%，团体活动\n15.8%。独自与结伴的形式不同，共同点都是进行体育锻炼。\n2. 从材料提炼含义居民选择适合自己的锻炼方式，可以从中讨论将健康放入日常安排的意识。个人既有身体活动的需要，也可以通过结伴锻炼获得交流与支持。\n3. 价值观归类与主题选择从和谐类的公共健康与身心协调出发，选择 greater health awareness。个人层面写独自或结伴锻炼，社会层面写服务、环境和设施怎样支持健康选择。\n本文主题： greater health awareness（更强的健康意识）\n二、第一段怎样组织\n调查人群： Among residents surveyed in one city。限定为某市受访居民。\n最大方式： exercising alone accounts for the largest share, at 54.3%。先写独自锻炼这一最大项。\n结伴方式： followed by exercising with friends, family members and organised groups。完整列出朋友、家庭和团体三种结伴方式，并依次对应比例。\n主题衔接： 不同形式都以锻炼为共同内容，主题由此进入更重视健康的生活意识。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that greater health awareness finds direct expression in phenomena exemplified by the way people exercise alone or with others to maintain their health.首先，从经验上讲，更强的健康意识直接体现在以人们独自或与他人一起锻炼以维护健康为代表的现象之中。\n【具体行为】 exercise alone or with others to maintain their health（独自或与他人一起锻炼以维护健康）表达组织： 由 exercising alone 与 exercising with friends、family members、organised groups，组合为 exercise alone or with others，再接 to maintain their health。\n把不同锻炼方式放入同一个健康目的下，直接承接图表对象。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n居民以不同方式锻炼，背后共同的积极期待是维护健康和改善生活体验。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n个人有锻炼意识，还需要便利的场地、设施和健康服务支持。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for building a healthy China that provides impetus for these developments.基于这一认识，正是国家在建设健康中国方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 building a healthy China（建设健康中国）语料来源： 和谐类【相关战略】：building a healthy China。\n将居民主动锻炼与更广泛的健康建设相联系。\n⑤ 主题的社会价值\nAn article published by the National Health Commission lends support to the view that greater health awareness plays an important role in fostering community prosperity.国家卫生健康委员会刊载的一篇文章支持这样一种观点，即更强的健康意识在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 the National Health Commission（国家卫生健康委员会）。\n【主题词】 greater health awareness（更强的健康意识）。\n从不同锻炼选择归结到健康意识对个人与社区生活的意义。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when greater health awareness guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当更强的健康意识指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n更强的健康意识指导个人安排锻炼，也促使社区关注适合活动的空间和服务。"
    },
    {
      "year": 2021,
      "title": "体育锻炼方式与健康意识",
      "tier": "速通·无脑套写",
      "tierKey": "fast_ez",
      "coreTheme": "paying more attention to health（更加关注健康）",
      "wordCount": 196,
      "enEssay": "Though deceptively simple, this bar chart conveys a meaningful message: among residents surveyed in one city, exercising alone accounts for the largest share, at 54.3%, followed by exercising with friends, family members and organised groups at 47.7%, 23.9% and 15.8% respectively. It serves as a compelling testament to the significance of paying more attention to health.\n\nTo begin with, experience suggests that paying more attention to health finds direct expression in phenomena exemplified by the way people exercise alone or with friends and family. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for improving people's well-being that provides impetus for these developments. An article published by the National Health Commission lends support to the view that paying more attention to health plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when paying more attention to health guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管条形图看似简单，却传递出深刻的信息：在某市受访居民中，独自锻炼的比例最高，为54.3%；随后是与朋友、家人和团体一起锻炼，分别占47.7%、23.9%和15.8%。它有力地证明了更加关注健康的重要性。\n\n首先，从经验上讲，更加关注健康直接体现在以人们独自或与朋友和家人一起锻炼为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在保障和改善民生方面的战略倡导与推广，为这些发展变化提供了动力。国家卫生健康委员会刊载的一篇文章支持这样一种观点，即更加关注健康在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当更加关注健康这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息调查列出某市居民四种体育锻炼方式：独自锻炼54.3%，和朋友一起47.7%，和家人一起23.9%，团体活动\n15.8%。独自与结伴的形式不同，共同点都是进行体育锻炼。\n2. 从材料提炼含义居民选择适合自己的锻炼方式，可以从中讨论将健康放入日常安排的意识。个人既有身体活动的需要，也可以通过结伴锻炼获得交流与支持。\n3. 价值观归类与主题选择从居民选择锻炼方式直接写 paying more attention to health，个人行为用独自或结伴锻炼，社会层面写改善生活条件。\n本文主题： paying more attention to health（更加关注健康）\n二、第一段怎样组织\n调查人群： Among residents surveyed in one city。限定为某市受访居民。\n最大方式： exercising alone accounts for the largest share, at 54.3%。先写独自锻炼这一最大项。\n结伴方式： followed by exercising with friends, family members and organised groups。完整列出朋友、家庭和团体三种结伴方式，并依次对应比例。\n主题衔接： 不同形式都以锻炼为共同内容，主题由此进入更重视健康的生活意识。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that paying more attention to health finds direct expression in phenomena exemplified by the way people exercise alone or with friends and family.首先，从经验上讲，更加关注健康直接体现在以人们独自或与朋友和家人一起锻炼为代表的现象之中。\n【具体行为】 exercise alone or with friends and family（独自或与朋友和家人一起锻炼）表达组织： 复用 exercising alone、friends 和 family members，组织为 exercise alone or with friends and family。\n用题面出现的方式直接说明关注健康的行动。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n把锻炼放入生活安排，是为了获得健康与积极体验。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n锻炼方式能否落实，还要看身边的场地、设施和服务。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for improving people's well-being that provides impetus for these developments.基于这一认识，正是国家在保障和改善民生方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 improving people's well-being（保障和改善民生）语料来源： 和谐类【相关战略】：improving people's well-being。\n用改善民生承接适合锻炼的环境和生活支持。\n⑤ 主题的社会价值\nAn article published by the National Health Commission lends support to the view that paying more attention to health plays an important role in fostering community prosperity.国家卫生健康委员会刊载的一篇文章支持这样一种观点，即更加关注健康在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 the National Health Commission（国家卫生健康委员会）。\n【主题词】 paying more attention to health（更加关注健康）。\n以更加关注健康回扣居民生活与社区福祉的联系。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when paying more attention to health guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当更加关注健康这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n更加关注健康能够指导个人安排锻炼，也能指导公共服务满足健康生活需要。"
    },
    {
      "year": 2020,
      "title": "手机阅读与终身学习",
      "tier": "满分版",
      "tierKey": "full",
      "coreTheme": "lifelong learning（终身学习）",
      "wordCount": 183,
      "enEssay": "The figures in the pie chart reveal notable differences concerning lifelong learning. In a survey of mobile reading purposes among students at one university, acquiring knowledge accounts for the largest share, at 59.5%, followed by passing time, obtaining information and other purposes at 21.3%, 17.0% and 2.2% respectively.\n\nLifelong learning has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people use mobile phones to acquire knowledge through reading, ultimately contributing to enhanced intellectual capacity and broader worldviews. National policies on quality education likewise focus on empowering individuals to pursue lifelong learning and develop cultural literacy. Beyond personal advancement, this principle can strengthen communities by enriching cultural life and fostering creative expression, laying the groundwork for sustainable progress. This is in line with national strategies for building a learning society: as this principle takes root, more people participate in lifelong learning.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when lifelong learning guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "饼图中的数据揭示了有关终身学习的显著差异。在一项针对某高校学生手机阅读目的的调查中，学习知识占比最高，为59.5%；随后是消磨时间、获取信息和其他目的，分别占21.3%、17.0%和2.2%。\n\n终身学习受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们利用手机通过阅读获取知识的做法中，最终有助于提升认知能力、拓宽视野。国家在素质教育方面的政策，同样着重于使个人能够持续学习并培养文化素养。除个人发展之外，这一原则还可以通过丰富文化生活、促进创意表达增强社区，为可持续进步奠定基础。这与国家建设学习型社会的战略相契合：随着这一理念逐渐扎根，更多人参与终身学习。\n\n总之，人们已经形成一种基于理性认识的共识，即当终身学习指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、主题怎样从材料中提炼\n图表中，“学习知识”占59.5%，明显高于其他阅读目的。手机是阅读工具，获取知识是最突出的使用目的，因此评论可以从“利用手机学习”进一步展开到将学习融入日常生活，选定“终身学习”。题面中的手机元素直接保留在具体行为中。\n论述顺序： 借助手机阅读求知 → 提升认知、拓宽视野 → 持续学习与文化素养 → 丰富社会文化生活 → 建设学习型社会。\n二、第一段怎样组织\nIn a survey of mobile reading purposes among students at one university, acquiring knowledge accounts for the largest share, at 59.5%, followed by passing time, obtaining information and other purposes at 21.3%, 17.0%and 2.2% respectively.先交代调查对象，再以 accounts for the largest share 写最大项，以 followed by 连接其余类别，respectively 对应各项比例。\n饼图中的数据揭示了有关终身学习的显著差异。在一项针对某高校学生手机阅读目的的调查中，学习知识占比最高，为59.5%；随后是消磨时间、获取信息和其他目的，分别占21.3%、17.0%和2.2%。\n三、第二段逐句拆解\n① 主题总起\nLifelong learning has attracted attention, not least because of its far-reaching implications.以终身学习总起，下面的行为、政策支持和社会作用逐层展开这一主题。\n② 个人行为与成果\nAt the individual level, it is reflected in the way people use mobile phones to acquire knowledge through reading, ultimately contributing to enhanced intellectual capacity and broader worldviews.\n【具体行为】 use mobile phones to acquire knowledge through reading（利用手机通过阅读获取知识）\n语料取用： 根据题面组织。mobile phones 对应手机，acquire knowledge 对应学习知识，through reading 交代具体途径。\n【可见成果】 enhanced intellectual capacity and broader worldviews（提升认知能力、拓宽视野）\n语料取用： 文明类【可见成果】：enhanced intellectual capacity and cultural confidence，取 enhanced intellectual capacity；同栏 deeper cultural identity and broader worldviews，取 broader worldviews。组合为 enhanced intellectual capacity and broader worldviews。\n利用手机阅读这一具体途径承接首段的调查对象，认知能力和视野则说明求知的收益。\n③ 政策领域与个人能力\nNational policies on quality education likewise focus on empowering individuals to pursue lifelong learning and develop cultural literacy.\n【相关领域】 quality education（素质教育）\n语料取用： 文明类【相关领域】原句：quality education。\n【个人能力／行为】 pursue lifelong learning and develop cultural literacy（持续学习并培养文化素养）\n语料取用： 文明类【个人能力／行为】完整原句：pursue lifelong learning and develop cultural literacy。\n素质教育把即时的阅读行为与持续学习、文化素养联系起来。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by enriching cultural life and fostering creative expression, laying the groundwork for sustainable progress.\n【社会效果】 enriching cultural life and fostering creative expression（丰富文化生活、促进创意表达）\n语料取用： 文明类【社会效果】：enriching cultural life and strengthening shared identity，取 enriching cultural life；同栏 fostering creative expression and cultural vitality，取 fostering creative expression。组合为 enriching cultural life and fostering creative expression。\n个人知识积累可以进入文化参与和表达，使学习产生更广泛的社会作用。\n⑤ 相关战略与社会变化\nThis is in line with national strategies for building a learning society: as this principle takes root, more people participate in lifelong learning.\n【相关战略】 building a learning society（建设学习型社会）\n语料取用： 文明类【相关战略】原句：building a learning society。\n【社会变化】 more people participate in lifelong learning（更多人参与终身学习）\n语料取用： 文明类【社会变化】原句：more people participate in lifelong learning。\n以学习型社会对应个人求知，再以更多人持续参与学习展开社会变化。\n四、第三段怎样收束\n以 lifelong learning（终身学习） 回扣个人与社区的共同收益，并提出倡导这一方向的必要性。"
    },
    {
      "year": 2020,
      "title": "手机阅读与终身学习",
      "tier": "简化版",
      "tierKey": "simplified",
      "coreTheme": "lifelong learning（终身学习）",
      "wordCount": 174,
      "enEssay": "The figures in the pie chart reveal notable differences concerning lifelong learning. In a survey of mobile reading purposes among students at one university, acquiring knowledge accounts for the largest share, at 59.5%, followed by passing time, obtaining information and other purposes at 21.3%, 17.0% and 2.2% respectively.\n\nLifelong learning has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people use mobile phones to acquire knowledge through reading, ultimately contributing to personal development and well-being. National policies on quality education likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by enriching cultural life and fostering creative expression, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when lifelong learning guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "饼图中的数据揭示了有关终身学习的显著差异。在一项针对某高校学生手机阅读目的的调查中，学习知识占比最高，为59.5%；随后是消磨时间、获取信息和其他目的，分别占21.3%、17.0%和2.2%。\n\n终身学习受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们利用手机通过阅读获取知识的做法中，最终有助于个人发展与福祉。国家在素质教育方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过丰富文化生活、促进创意表达增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n\n总之，人们已经形成一种基于理性认识的共识，即当终身学习指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 提取材料信息饼图统计某高校学生手机阅读的目的。学习知识占59.5%，消磨时间占21.3%，获取信息占17.0%，其他目的占\n2.2%。学习知识是比例最高的一项。\n2. 从材料理解含义手机是阅读工具，获取知识是最突出的阅读目的。由这种使用方式，可以讨论人们怎样把求知融入日常生活：\n随时接触信息，通过阅读积累知识，并形成持续学习的习惯。\n3. 确定主题从文明类的教育与求知出发，将主题确定为 lifelong learning。正文以手机阅读为具体行动，个人收益归纳为发展与福祉，社会部分展开文化生活与表达。\n本文主题： lifelong learning（终身学习）\n二、第一段怎样组织\nThe figures in the pie chart reveal notable differences concerning lifelong learning. In a survey of mobile reading purposes among students at one university, acquiring knowledge accounts for the largest share, at\n59.5%, followed by passing time, obtaining information and other purposes at 21.3%, 17.0% and 2.2%respectively.先用 pie chart 交代图表类型，再以 In a survey of mobile reading purposes among students at one university 限定统计对象与目的。acquiring knowledge accounts for the largest share 写最大类别，followed by 依次连接另外三类，respectively 对应21.3%、17.0%和2.2%。\n三、第二段逐句拆解\n① 主题总起\nLifelong learning has attracted attention, not least because of its far-reaching implications.终身学习受到关注，一个重要原因是其影响深远。\n以终身学习总起，下文由个人行动进入政策支持，再展开本题的社会作用。\n② 个人行为与个人收益\nAt the individual level, it is reflected in the way people use mobile phones to acquire knowledge through reading, ultimately contributing to personal development and well-being.在个人层面，它体现在人们利用手机通过阅读获取知识的做法中，最终有助于个人发展与福祉。\n【具体行为】 use mobile phones to acquire knowledge through reading（利用手机通过阅读获取知识）\n语料取用： 结合题面组织：mobile phones 对应手机，acquire knowledge 对应学习知识，through reading 说明获取知识的途径，组成 use mobile phones to acquire knowledge through reading。\n将持续学习落实为使用手机阅读求知，既回应工具，也回应图表中占比最高的目的。\npersonal development and well-being 将个人收益概括为发展与福祉。\n③ 政策领域与个人潜能\nNational policies on quality education likewise focus on empowering individuals to achieve their full potential.国家在素质教育方面的政策，同样着重于使个人能够充分发挥自身潜能。\n【相关领域】 quality education（素质教育）\n语料取用： 文明类【相关领域】原句：quality education。\n素质教育承接个人求知，将阅读和知识积累联系到能力与潜能的发展。\n④ 社会效果\nBeyond personal advancement, this principle can strengthen communities by enriching cultural life and fostering creative expression, laying the groundwork for sustainable progress.除个人发展之外，这一原则还可以通过丰富文化生活、促进创意表达增强社区，为可持续进步奠定基础。\n【社会效果】 enriching cultural life and fostering creative expression（丰富文化生活、促进创意表达）\n语料取用： 文明类【社会效果】原句一：enriching cultural life and strengthening shared identity，取 enriching cultural life；原句二：fostering creative expression and cultural vitality，取 fostering creative expression。组合为enriching cultural life and fostering creative expression。\n阅读积累为文化参与和表达提供内容。前半项写共同文化生活的丰富，后半项写个人运用知识表达想法的可能性，由个人求知延伸到社会文化生活。\n⑤ 宏观收束\nAs this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。\n从前一句的具体社会作用，进一步归纳这一理念对共同生活与长期发展的意义。\n四、第三段怎样收束\n由手机阅读中的求知行为出发，先写个人发展的收益，再讨论教育支持和文化表达。结尾回到终身学习，归纳个人与社区的共同价值。\n全文论述顺序： 手机阅读求知 → 个人发展与福祉 → 教育支持潜能发展 → 文化生活与创意表达 → 社会和谐与长期繁荣。"
    },
    {
      "year": 2020,
      "title": "手机阅读与终身学习",
      "tier": "速通·标准套写",
      "tierKey": "fast_std",
      "coreTheme": "lifelong learning（终身学习）",
      "wordCount": 190,
      "enEssay": "Though deceptively simple, this pie chart conveys a meaningful message: in a survey of mobile reading purposes among students at one university, acquiring knowledge accounts for the largest share, at 59.5%, followed by passing time, obtaining information and other purposes at 21.3%, 17.0% and 2.2% respectively. It serves as a compelling testament to the significance of lifelong learning.\n\nTo begin with, experience suggests that lifelong learning finds direct expression in phenomena exemplified by the way people use mobile phones to acquire knowledge through reading. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for building a learning society that provides impetus for these developments. An article published by Beijing Normal University lends support to the view that lifelong learning plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when lifelong learning guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管饼图看似简单，却传递出深刻的信息：在某高校学生手机阅读目的的调查中，学习知识占比最高，为59.5%；随后是消磨时间、获取信息和其他目的，分别占21.3%、17.0%和2.2%。它有力地证明了终身学习的重要性。\n\n首先，从经验上讲，终身学习直接体现在以人们使用手机通过阅读获取知识为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在建设学习型社会方面的战略倡导与推广，为这些发展变化提供了动力。北京师范大学刊载的一篇文章支持这样一种观点，即终身学习在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当终身学习指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息饼图调查某高校学生手机阅读的目的：学习知识59.5%，消磨时间21.3%，获取信息17.0%，其他2.2%。学习知识所占比例最大，手机是材料明确给出的阅读途径。\n2. 从材料提炼含义学生把手机用于获取知识和信息，学习由此进入更灵活的日常阅读场景。可以从新的阅读途径写起，讨论持续求知、能力积累和共同学习的社会环境。\n3. 价值观归类与主题选择从文明类的阅读与教育出发，选择 lifelong learning。手机作为具体工具保留在行为中，终身学习概括借助不同途径持续获得知识的方向。\n本文主题： lifelong learning（终身学习）\n二、第一段怎样组织\n调查对象与途径： mobile reading purposes among students at one university。同时交代学生、手机阅读和目的。\n最大目的： acquiring knowledge accounts for the largest share, at 59.5%。突出知识学习这一最主要的阅读目的。\n其他目的： followed by passing time, obtaining information and other purposes。将其余三项依次对应21.3%、\n17.0%和2.2%。\n主题衔接： 由手机阅读中突出的求知目的，过渡到借助多种途径持续学习。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that lifelong learning finds direct expression in phenomena exemplified by the way people use mobile phones to acquire knowledge through reading.首先，从经验上讲，终身学习直接体现在以人们使用手机通过阅读获取知识为代表的现象之中。\n【具体行为】 use mobile phones to acquire knowledge through reading（使用手机通过阅读获取知识）表达组织： 复用首段 mobile reading 和 acquiring knowledge，组织为 use mobile phones to acquire knowledge through reading。\n完整保留手机这一具体途径，并把最高比例的学习知识写成行动。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n借助手机阅读能够获得知识和信息，这种积极期待解释学生为何选择这一用途。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n持续学习也需要阅读资源、教育支持和便捷的学习途径，因而转向学习型社会的建设。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for building a learning society that provides impetus for these developments.基于这一认识，正是国家在建设学习型社会方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 building a learning society（建设学习型社会）语料来源： 文明类【相关战略】：building a learning society。\n把个人借助手机持续学习与社会提供学习机会的方向联系起来。\n⑤ 主题的社会价值\nAn article published by Beijing Normal University lends support to the view that lifelong learning plays an important role in fostering community prosperity.北京师范大学刊载的一篇文章支持这样一种观点，即终身学习在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 Beijing Normal University（北京师范大学）。\n【主题词】 lifelong learning（终身学习）。\n由手机求知回到终身学习对文化生活和共同进步的价值。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when lifelong learning guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当终身学习指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n终身学习既指导个人如何使用手机阅读，也指导教育和社会提供持续求知的机会。"
    },
    {
      "year": 2020,
      "title": "手机阅读与终身学习",
      "tier": "速通·无脑套写",
      "tierKey": "fast_ez",
      "coreTheme": "learning through mobile reading（通过手机阅读学习）",
      "wordCount": 198,
      "enEssay": "Though deceptively simple, this pie chart conveys a meaningful message: in a survey of mobile reading purposes among students at one university, acquiring knowledge accounts for the largest share, at 59.5%, followed by passing time, obtaining information and other purposes at 21.3%, 17.0% and 2.2% respectively. It serves as a compelling testament to the significance of learning through mobile reading.\n\nTo begin with, experience suggests that learning through mobile reading finds direct expression in phenomena exemplified by the way people read on their phones to learn new things. This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences. However, we should recognise that social conditions fundamentally shape the choices available to individuals. From this perspective, it is the promotion of national strategies for building a learning society that provides impetus for these developments. An article published by Beijing Normal University lends support to the view that learning through mobile reading plays an important role in fostering community prosperity.\n\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when learning through mobile reading guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
      "cnEssay": "尽管饼图看似简单，却传递出深刻的信息：在某高校学生手机阅读目的的调查中，学习知识占比最高，为59.5%；随后是消磨时间、获取信息和其他目的，分别占21.3%、17.0%和2.2%。它有力地证明了通过手机阅读学习的重要性。\n\n首先，从经验上讲，通过手机阅读学习直接体现在以人们在手机上阅读以学习新知识为代表的现象之中。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在建设学习型社会方面的战略倡导与推广，为这些发展变化提供了动力。北京师范大学刊载的一篇文章支持这样一种观点，即通过手机阅读学习在促进社区繁荣方面发挥着重要作用。\n\n总之，人们已经形成一种基于理性认识的共识，即当通过手机阅读学习这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
      "analysis": "一、审题与主题分析\n1. 材料信息饼图调查某高校学生手机阅读的目的：学习知识59.5%，消磨时间21.3%，获取信息17.0%，其他2.2%。学习知识所占比例最大，手机是材料明确给出的阅读途径。\n2. 从材料提炼含义学生把手机用于获取知识和信息，学习由此进入更灵活的日常阅读场景。可以从新的阅读途径写起，讨论持续求知、能力积累和共同学习的社会环境。\n3. 价值观归类与主题选择直接把题面的工具与最高比例目的组合成 learning through mobile reading。主题表达具体，个人行为也可由原图词语组织。\n本文主题： learning through mobile reading（通过手机阅读学习）\n二、第一段怎样组织\n调查对象与途径： mobile reading purposes among students at one university。同时交代学生、手机阅读和目的。\n最大目的： acquiring knowledge accounts for the largest share, at 59.5%。突出知识学习这一最主要的阅读目的。\n其他目的： followed by passing time, obtaining information and other purposes。将其余三项依次对应21.3%、\n17.0%和2.2%。\n主题衔接： 由手机阅读中突出的求知目的，过渡到借助多种途径持续学习。\n三、第二段逐句拆解\n① 个人行为与主题／动机\nTo begin with, experience suggests that learning through mobile reading finds direct expression in phenomena exemplified by the way people read on their phones to learn new things.首先，从经验上讲，通过手机阅读学习直接体现在以人们在手机上阅读以学习新知识为代表的现象之中。\n【具体行为】 read on their phones to learn new things（在手机上阅读以学习新知识）表达组织： 将 mobile reading 改写成 read on their phones，再用 to learn new things 表达学习目的。\n直接保留手机、阅读和求知三个元素。\n② 个人选择的解释\nThis is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。\n学生期待通过阅读了解新知识，积极结果就是学习带来的收获。\n③ 转入社会条件\nHowever, we should recognise that social conditions fundamentally shape the choices available to individuals.然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。\n手机上的学习同样依赖内容、资源和教育环境，因此接入社会学习支持。\n④ 相关战略\nFrom this perspective, it is the promotion of national strategies for building a learning society that provides impetus for these developments.基于这一认识，正是国家在建设学习型社会方面的战略倡导与推广，为这些发展变化提供了动力。\n【相关战略】 building a learning society（建设学习型社会）语料来源： 文明类【相关战略】：building a learning society。\n用学习机会与资源支持承接手机阅读。\n⑤ 主题的社会价值\nAn article published by Beijing Normal University lends support to the view that learning through mobile reading plays an important role in fostering community prosperity.北京师范大学刊载的一篇文章支持这样一种观点，即通过手机阅读学习在促进社区繁荣方面发挥着重要作用。\n【权威机构／期刊】 Beijing Normal University（北京师范大学）。\n【主题词】 learning through mobile reading（通过手机阅读学习）。\n将手机阅读学习放入知识传播和共同成长的社会意义中。\n四、第三段怎样收束\nIn conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when learning through mobile reading guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.总之，人们已经形成一种基于理性认识的共识，即当通过手机阅读学习这一目标指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。\n通过手机阅读学习可以指导个人使用手机的方式，也可以引导教育提供更方便的学习资源。"
    }
  ],
  "guideAndMethods": {
    "title": "27届大作文一页纸 · 模板思路解析与使用步骤",
    "sections": [
      {
        "id": "step0_truth",
        "icon": "🎯",
        "title": "01 考纲真相：为什么必须“宏大叙事化”？",
        "items": [
          {
            "subtitle": "三大核心阅卷情报（出自教育部官方《试题分析》）",
            "content": "1. **题型彻底打通**：自 23 年考纲改革起，英一、英二均可能出现【图画 / 图表 / 文本】及混合考察（如 24 英一图画+图表，25 英一纯图表），切忌抱“英一必图画、英二必图表”的侥幸心理。\n2. **阅卷节奏与得分档**：批阅一篇大作文往往仅十余秒到几十秒，第一眼看书写、辞藻与三段式结构；决定能否在旱区冲进高分档的核心，是**思辨高度（价值取向）、论证严密与具体支撑**。\n3. **命题趋势宏大叙事化**：无论是科技、老龄化、劳动教育、公园建设还是国民素养，全部立足**国家战略与民生福祉（利他/社会视角）**，切勿停留在个人小情绪的“看图写话”。"
          }
        ]
      },
      {
        "id": "step1_stance",
        "icon": "🧭",
        "title": "02 第一步：确定立意（正面积极 + 多图归一）",
        "items": [
          {
            "subtitle": "条件反射思维：国家做了什么 / 会做什么？",
            "content": "拿到任何题目，先问自己：**“国家做了什么才出现这种成果，或看到这个现象国家会推动什么？”**\n• **正向主题词铁律**：无论图画/图表展示正面、负面还是争议话题，**立意与主题词一律写正面积极的正确做法**。\n  - 图画不自信 → 主题词写`自信`；乱扔垃圾 → 写`保护环境`；讽刺拖延/逃避 → 写`立刻行动 / 脚踏实地`。\n  - 图表呈现社会争论（如养老机器人）→ 不纠结正反争议，只要契合国家大力推动的科技与民生方向，直接站在**支持与规范发展**一边。"
          },
          {
            "subtitle": "文本评论 & 多图/混合题审题铁律",
            "content": "• **文本评论**：无论原作者态度是支持、反对还是中立，都从正面角度切入，直接赞同或提炼其中积极合理的部分。\n• **多图 / 双表 / 混合考察（切忌双边跑偏）**：不管题目给出多少幅图或多少组数据，命题人要表达的核心永远只有**一个中心大主题**！两幅图要么同为表面现象，要么一表一里，各自一句话交代后，迅速收束到同一个中心主题上。"
          }
        ]
      },
      {
        "id": "step2_theme",
        "icon": "⚖️",
        "title": "03 主题词定调：向上对齐价值观，向下具体化",
        "items": [
          {
            "subtitle": "两步定位法（防止生硬拔高 / 假大空）",
            "content": "• **向上对齐**：先对应「七类核心价值观」（**和谐、富强、文明、敬业、友善、爱国、诚信**）及国家政策词库，`【相关战略】`里的短语经常可直接用作主题词。\n• **向下顺藤摸瓜**：若直接用宏观大词略显空泛，就往具体行为细化一层——例如 2020 英一可将“敬业”细化为“克服拖延、养成规律习惯”，2021 英二可将“健康中国”细化为“坚持日常体育锻炼”，既贴题面，又能自然接上第二段政策与战略支撑。\n• **全篇一贯原则**：确定主题词短语后，第一段末尾、第二段开头（或⑤句）及第三段尽量使用**同一英文短语**，保持全文首尾呼应。"
          }
        ]
      },
      {
        "id": "step3_p1_frames",
        "icon": "📐",
        "title": "04 第二步：选择第一段写法（高级版 vs 简速通用版）",
        "items": [
          {
            "subtitle": "高级版 / 满分版（按题型分立句架）",
            "content": "**1. 图画题**\n[formula]Though deceptively simple, this scene conveys a meaningful message: 【图画描述】. It serves as a compelling testament to the significance of 【主题词】.[/formula]\n**2. 图表题（总起句 + 数据描述句）**\n[formula]The figures in the bar chart/line chart/pie chart/table reveal notable changes/differences concerning 【主题词】.[/formula]\n**3. 文本评论**\n[formula]【主题词】 has long been a subject of public debate. The passage offers a fresh perspective on this issue, arguing that 【提炼文段大意】. While this view may not convince everyone, I find it original and illuminating, and I agree with it wholeheartedly.[/formula]"
          },
          {
            "subtitle": "简化版 & 速通版（同一句架通杀图画/图表/文本）",
            "content": "若希望一套到底不换句架，直接背下面这句通用框架（替换载体名称即可）：\n[formula]Though deceptively simple, this scene / this 【图表名称】 / this passage conveys a meaningful message: 【图画／图表／文本描述】. It serves as a compelling testament to the significance of 【主题词】.[/formula]\n其中 `【图表名称】` 对应填写 `bar chart`（条形图）/ `line chart`（折线图）/ `pie chart`（饼图）/ `table`（表格）。"
          }
        ]
      },
      {
        "id": "step4_p1_picture",
        "icon": "🎨",
        "title": "05 第三步（图画类）：描述万能公式与表情动作库",
        "items": [
          {
            "subtitle": "第一类：单主语图画万能公式",
            "content": "[formula]地点状语, 主语 + 定语从句 (who seems 表情 / who is 动作) + 谓宾, doing…（补充伴随动作或结果）.[/formula]\n• **示例（23 英一·龙舟赛）**：`By the river, an elderly resident who seems delighted watches a dragon boat race, saying that the event in the village is becoming livelier.`\n• **三步操作**：① 找主体人物（`an elderly resident`） → ② 填地点与主动作（`By the river` + `watches a dragon boat race`，并用 `who seems delighted` 补表情；写不出定语从句可直接删掉） → ③ 用 `saying that…` / `doing…` 补图中文字或伴随状态（用**一般现在时**，注意主谓单复数一致）。"
          },
          {
            "subtitle": "第二类：双主语对比 / 双幅图万能公式",
            "content": "[formula]句1, while 句2.\n句1 = 地点 + 主语1 + 定语从句 + 主要动作\n句2 = 地点 + 主语2 + 主要动作, doing…[/formula]\n• **示例（20 英一·习惯对比）**：`At a desk, a girl who is working attentively wants to finish early, while a boy sits back at another desk, saying that he will not start until the last minute.`\n• **三步操作**：① 分开提炼左/右或两人物的对比核心 → ② 用 `while` 并列对比连接 → ③ 各补一个定语或 `saying that…` 细节。"
          },
          {
            "subtitle": "考场高频表情与动作速查词库",
            "content": "• **表情（接 `seem / look`）**：高兴 `joyful / delighted`；吃惊 `shocked / surprised`；困惑 `confused / puzzled`；疲惫 `tired / exhausted`；沮丧失望 `sad / depressed / disappointed / frustrated`；专注 `concentrate fully on sth / be absorbed in sth`。\n• **高频动作**：`stand`（站）、`sit`（坐）、`lie / lying`（躺）、`walk`（走）、`run`（跑）、`curl up`（蜷缩）、`say to oneself`（自言自语）、`think aloud`（说出想法）、`imagine`（想象）、`decide to do sth`（决定做某事）。"
          }
        ]
      },
      {
        "id": "step5_p1_chart_mix",
        "icon": "📊",
        "title": "06 第三步（图表/文本/混合类）：万能公式与应急救命句",
        "items": [
          {
            "subtitle": "动态图万能公式 + 应急救命句",
            "content": "[formula]Between 【起始时间】 and 【终止时间】, the number/proportion of 【类别一】 rose/fell from about 【数据1】 to around 【数据2】, while that of 【类别二】 increased/decreased slightly/sharply from roughly 【数据3】 to approximately 【数据4】. By contrast, the figure for 【类别三】 remained broadly stable at around 【数据5】.[/formula]\n• **要点**：只填起止年份，不必罗列中间年份；数量用 `number`，比例用 `proportion`；若无稳定项，末句改为 `The figure for … also rose/fell, from … to …`。\n• **救命句（类别英文不会拼时）**：`Between 【起始时间】 and 【终止时间】, the figure for the first category rose/fell from 【数据1】 to 【数据2】.`（绝不胡乱造词）。"
          },
          {
            "subtitle": "静态图万能公式 + 多选注记 + 应急救命句",
            "content": "[formula]【类别一】 accounts for the largest share, at 【最大比例】, followed by 【类别二】, 【类别三】 and 【类别四】 at 【第二比例】, 【第三比例】 and 【第四比例】 respectively.[/formula]\n• **注**：若题目是**多选调查**（各百分比之和不等于 100%），把 `accounts for the largest share` 换成 `has the highest percentage`。\n• **救命句（类别不会拼时）**：`The largest share is 【最大比例】, while the second-largest is 【第二比例】.` 或直接用 `the first category / the second category` 指代。"
          },
          {
            "subtitle": "文本评论 & 多材料混合考察公式",
            "content": "• **文本评论万能公式**：`【主题词/某种做法】 can help us (to) 【达到某种结果】.`（例：`Acknowledging uncertainty and admitting mistakes can help us build trust.`；先抓高频词，再看 `But / studies found` 后的作者认可点）。\n• **混合考察（图画+图表 / 双图 / 文本+图）**：按单材料公式各写 1 句，再用并列（`and` / `In addition,`）或对比（`while` / `By contrast,`）衔接；切换材料载体时直接用 `The accompanying chart/table shows that…` 或 `The passage states that…` 引出。\n• **混合示例（24 英一）**：`In a newly built park, residents are walking and exercising, with one praising the park near his home. The accompanying bar chart shows that the number of parks in a city rose from 406 in 2020 to 670 in 2022.`"
          }
        ]
      },
      {
        "id": "step6_p2_full",
        "icon": "🏛️",
        "title": "07 第四步（第二段·满分/高级版）：五句框架与 9 类填空表",
        "items": [
          {
            "subtitle": "五句宏观逻辑架构（总述 → 个人+政策 → 社会+战略）",
            "content": "[formula]① 【主题词】 has attracted attention, not least because of its far-reaching implications.\n② At the individual level, it is reflected in the way people 【具体行为】, ultimately contributing to 【可见成果】.\n③ National policies on 【相关领域】 likewise focus on empowering individuals to 【个人能力/行为】.\n④ Beyond personal advancement, this principle can strengthen communities by 【社会效果】, laying the groundwork for sustainable progress.\n⑤ This is in line with national strategies for 【相关战略】: as this principle takes root, 【社会变化】.[/formula]"
          },
          {
            "subtitle": "高级版 9 类填空清单与语法形式速查",
            "content": "[table]\n序号 | 填空项 | 从哪里找 | 语法要求\n1 | 【图画/题面描述】 | 结合题面自己写 | 完整句或表数据描述\n2 | 【主题词】 | 7选1或向下细化（全篇一致） | 名词/动名词短语\n3 | 【具体行为】 | 语料包「个人行为」（也可自拟） | 动词原形短语（接 the way people 后）\n4 | 【可见成果】 | 语料包「个人成果」（建议背诵） | 名词或动名词短语（接 to 后）\n5 | 【相关领域】 | 语料包「政策领域」（如 education） | 名词或动名词短语（接 on 后）\n6 | 【个人能力/行为】 | 语料包「政策能力」（直接背） | 动词原形短语（接 empowering…to 后）\n7 | 【社会效果】 | 语料包「社会效果」（直接背） | 动名词短语（接 by 后）\n8 | 【相关战略】 | 语料包「相关战略」（直接背） | 名词或动名词短语（接 for 后）\n9 | 【社会变化】 | 语料包「社会变化」（直接背） | 完整主谓小句\n[/table]"
          }
        ]
      },
      {
        "id": "step7_p2_lite_fast",
        "icon": "⚡",
        "title": "08 第四步（第二段·简化版 & 速通版）：减负 5 类填空",
        "items": [
          {
            "subtitle": "简化版（共 5 类填空，背诵量减半，结构同样严密）",
            "content": "相比满分版，简化版将②的成果固定为 `personal development and well-being`、③的能力固定为 `achieve their full potential`、⑤固定为社会和谐连锁效应句，因此**只需准备 5 类填空**：`【图画/题面描述】`、`【主题词】`、`【具体行为】`、`【相关领域】`、`【社会效果】`。\n[formula]⑤ 固定宏观收束：As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.[/formula]"
          },
          {
            "subtitle": "速通版（共 5 类填空，按材料优先级选句，考场极速默写）",
            "content": "速通版第二段**只需 5 项填空**（`【题面描述】`、`【主题词】`、`【具体行为】`、`【相关战略】`、`【权威机构/期刊】`），按材料特征从左至右选分支：\n• **①句（二选一）**：图画偏`主题体现`（`…that 【主题词】 finds direct expression in phenomena exemplified by the way people 【具体行为】.`）；图表偏`趋势/分布动机`（`…that this trend/pattern can be explained in part by people's desire to 【具体行为】.`）。\n• **②句（零填空任选其一）**：`This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.` 或 `Those who value such practices are exemplars of self-improvement and higher achievement.`\n• **③句（固定转向）**：`However, we should recognise that social conditions fundamentally shape the choices available to individuals.`\n• **④句（按 `【相关战略】` 二选一）**：图表优先 `it is the promotion of national strategies for 【相关战略】 that provides impetus for these developments.`；图画优先 `a shared commitment to 【相关战略】 can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress.`（若偏个人成长难以挂战略，可填入契合的价值观）。\n• **⑤句（权威出处回扣主题）**：`A study / An article published by 【权威机构/期刊】 lends support to the view that 【主题词】 plays an important role in driving this trend / fostering community prosperity.`（或替换为 `societies placing greater emphasis on 【主题词】 enjoy higher levels of vitality and prosperity, a pattern consistent across multiple indicators.`）。"
          }
        ]
      },
      {
        "id": "step8_p3_checklist",
        "icon": "✅",
        "title": "09 第五步：第三段收束与考前最小背诵清单",
        "items": [
          {
            "subtitle": "第三段万能总结（高级版 / 简化版 / 速通版三档统一）",
            "content": "[formula]In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when 【主题词】 guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.[/formula]\n注意：此处填入的 `【主题词】` 在句中作从句主语，需与 `guides`（单数谓语）保持语法搭配一致（不可数名词或动名词短语均天然契合）。"
          },
          {
            "subtitle": "考前最小背诵包 & 四步提分训练法",
            "content": "**最小背诵包（背透这三样即可上考场）**：\n1. 至少背熟 **3 个最高频价值观**（推荐：**文明、和谐、敬业**，可覆盖绝大多数真题）。\n2. 每个价值观记住 **2–3 个【具体行为】**。\n3. 选定版本对应记忆：高级版/速通版背熟对应**【相关战略】**；简化版背熟**【相关领域】**与**【社会效果】**。\n\n**肌肉记忆练习节奏**：\n① 先在「模板与套写稿纸」熟悉每空语法角色 → ② 用「20-26英二实操」或「Part B 大作文」看真题先自己**用中文按步理清思路** → ③ 再用英文套写全篇 → ④ 可交给 AI（如 DeepSeek / Kimi）按「任务完成度 + 逻辑 + 语言」三维度打分润色，练透几篇即可考场 **20 分钟默写全篇**。"
          }
        ]
      },
      {
        "id": "step9_variants",
        "icon": "🔄",
        "title": "10 进阶防撞车：第二段高分句式同义替换库",
        "items": [
          {
            "subtitle": "高级版 / 简化版 ①–⑤ 句同义替换变体",
            "content": "• **① 主题受关注**：\n  - `The far-reaching implications of 【主题词】 have helped bring it to centre stage.`\n  - `Interest in 【主题词】 stems in no small part from the breadth of its implications.`\n• **② 个人行为与成果**：\n  - `At the individual level, the way people 【具体行为】 gives expression to it, ultimately contributing to 【可见成果】.`\n  - `At the individual level, it manifests itself in how people 【具体行为】, ultimately contributing to 【可见成果】.`\n• **③ 政策与个人能力**：\n  - `National policies on 【相关领域】 are likewise geared towards empowering individuals to 【个人能力/行为】.`\n  - `At the heart of national policies on 【相关领域】 is the same concern with enabling individuals to 【个人能力/行为】.`\n• **④ 扩展到社会效果**：\n  - `The benefits of this principle extend beyond personal advancement: by 【社会效果】, it can strengthen communities and lay the groundwork for sustainable progress.`\n  - `Beyond personal advancement, this principle can help build stronger communities through 【社会效果】, thereby creating a foundation for sustainable progress.`\n• **⑤ 战略契合 / 宏观收束**：\n  - 高级版：`This reflects the priorities of national strategies for 【相关战略】; as this principle takes hold, 【社会变化】.`\n  - 简化版：`As this principle becomes established across society, it sets in motion a chain of effects that benefits social harmony and long-term prosperity.`"
          },
          {
            "subtitle": "速通版 ①–⑤ 句核心同义替换变体",
            "content": "• **①A/①B 体现或动机**：\n  - `To begin with, experience suggests that 【主题词】 is directly reflected in a range of phenomena; a case in point is the way people 【具体行为】.`\n  - `To begin with, experience suggests that part of the explanation for this trend/pattern lies in people's desire to 【具体行为】.`\n• **②A/②B 固定句替换**：\n  - `This is readily understandable: the prospect of desirable consequences tends to make a course of action more appealing.`\n  - `In those who value such practices, we find exemplars of self-improvement and higher achievement.`\n• **③ 转向社会条件**：\n  - `Yet the choices available to individuals are themselves shaped by social conditions, whose fundamental influence we should recognise.`\n• **④A/④B 战略推动/和谐繁荣**：\n  - `Seen in this light, the promotion of national strategies for 【相关战略】 acts as a catalyst for these developments.`\n  - `From this perspective, a shared commitment to 【相关战略】 can foster an environment in which communities and nations flourish in harmony, paving the way for sustainable progress.`\n• **⑤ 权威研究支持**：\n  - `The view that 【主题词】 plays an important role in driving this trend / fostering community prosperity finds support in a study / an article published by 【权威机构/期刊】.`\n  - `A study / An article published by 【权威机构/期刊】 lends support to a consistent pattern across multiple indicators: societies in which 【主题词】 carries greater weight enjoy higher levels of vitality and prosperity.`"
          }
        ]
      }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.WRITING_ONEPAGE_DATA;
}
