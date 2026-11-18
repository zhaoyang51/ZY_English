/**
 * ZY_English Fine-Tuned Simplified 5-Template Suite
 * 基于《大作文套写》HTML 简化版模板微调生成的 5 套高通用模板（2020-2026英二全套写适配）
 */
window.WRITING_SIMPLIFIED5_DATA = {
  meta: {
    title: '新简化版5套微调模板（基于HTML简化版 · 2020–2026全适配）',
    subtitle: '严格保留原 HTML 简化版核心骨架，仅做局部固化与防撞车微调 · 极大减少需要背诵的【】槽位'
  },

  slotsMeta: [
    { key: 'chartType', label: '图表类型', hint: 'pie chart / bar chart / line chart / table' },
    { key: 'relation', label: '比较关系', hint: 'differences（静态占比对比）/ changes（动态趋势变化）' },
    { key: 'theme', label: '主题词', hint: '名词或动名词短语（第一、二、三段保持同一表达）' },
    { key: 'behavior', label: '具体行为', hint: '动词原形短语（接在 people / how people 后）' },
    { key: 'domain', label: '相关领域', hint: '仅模板5需要：education / public health / urban-rural integration 等' }
  ],

  templates: [
    {
      id: 's5_t1',
      shortName: '微调 1 · 极简固化版',
      name: '微调模板一：HTML简化版 · 双槽极简固化版',
      badge: 'P2/P3 仅填【主题词】【具体行为】',
      tweakNote: '在 HTML 简化版原句基础上，将原 S05【相关领域】固化为 public livelihoods and social services，原 S06【社会效果】固化为 improving quality of life and strengthening social cohesion，其余句子逐字保留，P2/P3 仅需替换 2 个【】。',
      grammarNote: '【具体行为】接在 the way people 后，填动词原形短语；【主题词】用单数名词或动名词短语。',
      p1_blank: 'The figures in the {{chartType}} reveal notable {{relation}} concerning {{theme}}. Among {{surveyTarget}}, {{topItem}} accounts for the largest share, at {{topPct}}, followed by {{item2}}, {{item3}} and {{item4}} at {{pct2}}, {{pct3}} and {{pct4}} respectively.',
      p2: '{{themeCap}} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people {{behavior}}, ultimately contributing to personal development and well-being. National policies on public livelihoods and social services likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by improving quality of life and strengthening social cohesion, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.',
      p3: 'In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when {{theme}} guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.',
      cn: {
        p1: '【图表类型】中的数据揭示了有关【主题词】的显著【比较关系】。在【调查对象】中，【最大类别】占比最高，达【最大比例】，其次是【第二类别】、【第三类别】和【第四类别】，分别占【第二比例】、【第三比例】和【第四比例】（动态图按起止年份写变化）。',
        p2: '【主题词】受到关注，一个重要原因就是其影响深远。在个人层面，它体现在人们【具体行为】的方式之中，最终有助于个人发展与福祉。国家在改善民生与公共服务方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过提升生活质量、增强社会凝聚力来增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。',
        p3: '总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。'
      }
    },
    {
      id: 's5_t2',
      shortName: '微调 2 · 公共服务版',
      name: '微调模板二：HTML简化版 · 教育民生同义微调版',
      badge: '轻度润色 · 适配学习/健康/城乡/养老',
      tweakNote: '保持 HTML 简化版全部句序不变，微调 S01(reveal→show)、S03(attracted→attracted growing, not least→largely)、S05 固化为 education and public services、S06 固化为 fostering mutual support and shared progress、S09(Promoting→Advocating)。',
      grammarNote: '【具体行为】接在 the way people 后，填动词原形短语；首尾【主题词】保持一致。',
      p1_blank: 'The figures in the {{chartType}} show notable {{relation}} concerning {{theme}}. Among {{surveyTarget}}, {{topItem}} accounts for the largest share, at {{topPct}}, followed by {{item2}}, {{item3}} and {{item4}} at {{pct2}}, {{pct3}} and {{pct4}} respectively.',
      p1Lead: 'The figures in the {{chartType}} show notable {{relation}} concerning {{theme}}.',
      p2: '{{themeCap}} has attracted growing attention, largely because of its far-reaching implications. At the individual level, it is reflected in the way people {{behavior}}, ultimately contributing to personal development and well-being. National policies on education and public services likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by fostering mutual support and shared progress, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.',
      p3: 'In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when {{theme}} guides action. Advocating this principle is therefore not merely advisable but essential for holistic development.',
      cn: {
        p1: '【图表类型】中的数据显示出有关【主题词】的显著【比较关系】。（后接具体分类占比或起止年份变化描述）。',
        p2: '【主题词】受到越来越广泛的关注，很大程度上是因为其深远影响。在个人层面，它体现在人们【具体行为】的方式之中，最终有助于个人发展与福祉。国家在教育与公共服务方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过促进互助与共同进步增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。',
        p3: '总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。'
      }
    },
    {
      id: 's5_t3',
      shortName: '微调 3 · 社会发展版',
      name: '微调模板三：HTML简化版 · 社会活力精简微调版',
      badge: '极稳句式 · 零额外领域词',
      tweakNote: '几乎完全延续 HTML 简化版原句，仅将 S05【相关领域】固化为 social development（社会发展）、S06【社会效果】固化为 encouraging active participation and improving daily life（鼓励积极参与并改善日常生活），S09 holistic→all-round development。',
      grammarNote: '【具体行为】接在 the way people 后，填动词原形短语；结构与 HTML 简化版 1:1 对应。',
      p1_blank: 'The figures in the {{chartType}} reveal notable {{relation}} concerning {{theme}}. Among {{surveyTarget}}, {{topItem}} accounts for the largest share, at {{topPct}}, followed by {{item2}}, {{item3}} and {{item4}} at {{pct2}}, {{pct3}} and {{pct4}} respectively.',
      p2: '{{themeCap}} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people {{behavior}}, ultimately contributing to personal development and well-being. National policies on social development likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by encouraging active participation and improving daily life, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.',
      p3: 'In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when {{theme}} guides action. Promoting this principle is therefore not merely advisable but essential for all-round development.',
      cn: {
        p1: '【图表类型】中的数据揭示了有关【主题词】的显著【比较关系】。（后接具体分类占比或起止年份变化描述）。',
        p2: '【主题词】受到关注，一个重要原因就是其影响深远。在个人层面，它体现在人们【具体行为】的方式之中，最终有助于个人发展与福祉。国家在社会发展方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过鼓励积极参与和改善日常生活增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。',
        p3: '总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。'
      }
    },
    {
      id: 's5_t4',
      shortName: '微调 4 · 官方替换版',
      name: '微调模板四：HTML简化版 · 同义高亮防撞车微调版',
      badge: '官方同义句微调 · 高识别度',
      tweakNote: '将 HTML 简化版的 S03/S04/S07 微调为配套《大观》同义替换句（bring it to centre stage / manifests itself in how people / generates a cascade of benefits），S05 固化为 public well-being，S06 固化为 creating supportive environments and raising living standards。',
      grammarNote: '【具体行为】接在 in how people 后，填动词原形短语；【主题词】全篇使用同一短语。',
      p1_blank: 'The figures in the {{chartType}} illustrate notable {{relation}} concerning {{theme}}. Among {{surveyTarget}}, {{topItem}} accounts for the largest share, at {{topPct}}, followed by {{item2}}, {{item3}} and {{item4}} at {{pct2}}, {{pct3}} and {{pct4}} respectively.',
      p1Lead: 'The figures in the {{chartType}} illustrate notable {{relation}} concerning {{theme}}.',
      p2: 'The far-reaching implications of {{theme}} have helped bring it to centre stage. At the individual level, it manifests itself in how people {{behavior}}, ultimately contributing to personal development and well-being. National policies on public well-being likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by creating supportive environments and raising living standards, laying the groundwork for sustainable progress. As this principle becomes established across society, it generates a cascade of benefits for social harmony and long-term prosperity.',
      p3: 'In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when {{theme}} guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.',
      cn: {
        p1: '【图表类型】中的数据说明了有关【主题词】的显著【比较关系】。（后接具体分类占比或起止年份变化描述）。',
        p2: '【主题词】的深远影响促使其成为关注焦点。在个人层面，它体现在人们如何【具体行为】之中，最终有助于个人发展与福祉。国家在公共福祉方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过营造支持性环境、提高生活水平来增强社区，为可持续进步奠定基础。随着这一理念在全社会逐步确立，它带来层层积极效应，有利于社会和谐与长期繁荣。',
        p3: '总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。'
      }
    },
    {
      id: 's5_t5',
      shortName: '微调 5 · 贴题3槽版',
      name: '微调模板五：HTML简化版 · 轻度贴题微调版（保留【相关领域】）',
      badge: '贴题度最高 · 仅多1个短词槽',
      tweakNote: '在微调模板的基础上仅多保留 1 个极短的【相关领域】（如 quality education / public health / urban-rural integration），将 S05 微调为官方同义句 At the heart of national policies on 【相关领域】 is the same concern with...，并把 S06 固化为 enhancing social vitality and public well-being。',
      grammarNote: '【相关领域】填 2-3 个英文名词短语即可；【具体行为】填动词原形短语。',
      p1_blank: 'The figures in the {{chartType}} reveal notable {{relation}} concerning {{theme}}. Among {{surveyTarget}}, {{topItem}} accounts for the largest share, at {{topPct}}, followed by {{item2}}, {{item3}} and {{item4}} at {{pct2}}, {{pct3}} and {{pct4}} respectively.',
      p2: '{{themeCap}} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people {{behavior}}, ultimately contributing to personal development and well-being. At the heart of national policies on {{domain}} is the same concern with empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by enhancing social vitality and public well-being, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.',
      p3: 'In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when {{theme}} guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.',
      cn: {
        p1: '【图表类型】中的数据揭示了有关【主题词】的显著【比较关系】。（后接具体分类占比或起止年份变化描述）。',
        p2: '【主题词】受到关注，一个重要原因就是其影响深远。在个人层面，它体现在人们【具体行为】的方式之中，最终有助于个人发展与福祉。国家在【相关领域】方面政策的核心同样在于赋能个人充分发挥自身潜能。除个人发展之外，这一原则还可以通过增强社会活力与公共福祉来增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。',
        p3: '总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。'
      }
    }
  ],

  /**
   * 2020-2026 English II real exam slot mappings grounded directly in 大作文套写/英二_*_简化版.html
   * Each year preserves the exact HTML 简化版 P1 sentence pattern (static Among/In... or dynamic Between...and...)
   */
  examMappings: {
    2026: {
      year: 2026,
      title: '儿童户外活动四方面看法',
      topicZh: '促进儿童全面发展',
      chartInfo: '静态条形图：好奇心 54.6% · 观察力 54.5% · 体质 37.2% · 亲子互动 33.2%',
      p1BodyTpl: 'In {{surveyTarget}}, {{topItem}} accounts for the largest share, at {{topPct}}, followed by {{item2}}, {{item3}} and {{item4}} at {{pct2}}, {{pct3}} and {{pct4}} respectively.',
      slots: {
        chartType: 'bar chart',
        relation: 'differences',
        theme: 'fostering children\'s well-rounded development',
        themeCap: 'Fostering children\'s well-rounded development',
        surveyTarget: 'a survey of views on children\'s outdoor activities',
        topItem: 'satisfying curiosity',
        topPct: '54.6%',
        item2: 'improving observation skills',
        item3: 'building physical fitness',
        item4: 'increasing parent-child interaction',
        pct2: '54.5%',
        pct3: '37.2%',
        pct4: '33.2%',
        behavior: 'take children outdoors to explore and exercise',
        domain: 'quality education'
      }
    },
    2025: {
      year: 2025,
      title: '某社区老年人五种日常休闲活动',
      topicZh: '促进老年人身心健康与全面发展',
      chartInfo: '静态条形图：看电视 90.8% · 散步 68.3% · 养花 34.7% · 阅读 31.8% · 下棋 18.4%',
      p1BodyTpl: 'Among {{surveyTarget}}, {{topItem}} accounts for the largest share, at {{topPct}}, followed by {{item2}}, {{item3}}, {{item4}} and {{item5}} at {{pct2}}, {{pct3}}, {{pct4}} and {{pct5}} respectively.',
      slots: {
        chartType: 'bar chart',
        relation: 'differences',
        theme: 'promoting older adults\' physical and mental well-being',
        themeCap: 'Promoting older adults\' physical and mental well-being',
        surveyTarget: 'older residents in one community',
        topItem: 'watching television',
        topPct: '90.8%',
        item2: 'taking walks',
        item3: 'tending flowers',
        item4: 'reading',
        item5: 'playing chess',
        pct2: '68.3%',
        pct3: '34.7%',
        pct4: '31.8%',
        pct5: '18.4%',
        behavior: 'pursue healthy lifestyles',
        domain: 'public health and well-being'
      }
    },
    2024: {
      year: 2024,
      title: '某高校劳动实践课学生主要收获',
      topicZh: '全面素质教育',
      chartInfo: '静态条形图：知识 91.3% · 动手能力 84.8% · 放松 54.4% · 合作 32.6%',
      p1BodyTpl: 'Among {{surveyTarget}}, {{topItem}} accounts for the largest share, at {{topPct}}, followed by {{item2}}, {{item3}} and {{item4}} at {{pct2}}, {{pct3}} and {{pct4}} respectively.',
      slots: {
        chartType: 'bar chart',
        relation: 'differences',
        theme: 'comprehensive quality education',
        themeCap: 'Comprehensive quality education',
        surveyTarget: 'gains reported by students taking labour practice courses at one university',
        topItem: 'acquiring relevant knowledge',
        topPct: '91.3%',
        item2: 'improving practical skills',
        item3: 'feeling relaxed',
        item4: 'enhancing cooperation',
        pct2: '84.8%',
        pct3: '54.4%',
        pct4: '32.6%',
        behavior: 'bridge the gap between knowing and doing through labour practice',
        domain: 'quality education'
      }
    },
    2023: {
      year: 2023,
      title: '2012–2021 年我国居民健康素养水平变化',
      topicZh: '建设健康中国',
      chartInfo: '动态折线图：2012 年 8.8% 上升至 2021 年 25.4%（近乎翻三倍）',
      p1BodyTpl: 'Between {{startYear}} and {{endYear}}, the {{metric}} of {{subject}} {{trendVerb}} from about {{startVal}} to around {{endVal}}, {{trendNote}}.',
      slots: {
        chartType: 'line chart',
        relation: 'changes',
        theme: 'building a healthy China',
        themeCap: 'Building a healthy China',
        startYear: '2012',
        endYear: '2021',
        metric: 'proportion',
        subject: 'Chinese residents aged 15 to 69 with basic health literacy',
        trendVerb: 'rose',
        startVal: '8.8%',
        endVal: '25.4%',
        trendNote: 'nearly tripling during this period',
        behavior: 'learn about health and share useful knowledge with others',
        domain: 'public health and well-being'
      }
    },
    2022: {
      year: 2022,
      title: '2018–2020 年全国与农村快递业务量变化',
      topicZh: '乡村振兴',
      chartInfo: '动态柱状图：全国快递 510亿→830亿件；农村快递 120亿→300亿件',
      p1BodyTpl: 'Between {{startYear}} and {{endYear}}, the {{metric}} of {{item1}} {{verb1}} from about {{start1}} to around {{end1}}, while that of {{item2}} {{verb2}} {{degree2}} from roughly {{start2}} to approximately {{end2}}.',
      slots: {
        chartType: 'bar chart',
        relation: 'changes',
        theme: 'rural revitalization',
        themeCap: 'Rural revitalization',
        startYear: '2018',
        endYear: '2020',
        metric: 'number',
        item1: 'parcels delivered nationwide',
        verb1: 'rose',
        start1: '51 billion',
        end1: '83 billion',
        item2: 'parcels delivered in rural areas',
        verb2: 'increased',
        degree2: 'sharply',
        start2: '12 billion',
        end2: '30 billion',
        behavior: 'use delivery services to buy and sell goods in rural areas',
        domain: 'urban-rural integration'
      }
    },
    2021: {
      year: 2021,
      title: '某市居民四种锻炼方式比例',
      topicZh: '更强的健康意识',
      chartInfo: '静态条形图：独自锻炼 54.3% · 和朋友 47.7% · 和家人 23.9% · 参加团体 15.8%',
      p1BodyTpl: 'Among {{surveyTarget}}, {{topItem}} accounts for the largest share, at {{topPct}}, followed by {{item2}}, {{item3}} and {{item4}} at {{pct2}}, {{pct3}} and {{pct4}} respectively.',
      slots: {
        chartType: 'bar chart',
        relation: 'differences',
        theme: 'greater health awareness',
        themeCap: 'Greater health awareness',
        surveyTarget: 'residents surveyed in one city',
        topItem: 'exercising alone',
        topPct: '54.3%',
        item2: 'exercising with friends',
        item3: 'with family members',
        item4: 'in organised groups',
        pct2: '47.7%',
        pct3: '23.9%',
        pct4: '15.8%',
        behavior: 'exercise alone or with others to maintain their health',
        domain: 'public health and well-being'
      }
    },
    2020: {
      year: 2020,
      title: '某高校学生手机阅读四类目的',
      topicZh: '终身学习',
      chartInfo: '静态饼图：学习知识 59.5% · 消磨时间 21.3% · 获取信息 17.0% · 其他目的 2.2%',
      p1BodyTpl: 'In {{surveyTarget}}, {{topItem}} accounts for the largest share, at {{topPct}}, followed by {{item2}}, {{item3}} and {{item4}} at {{pct2}}, {{pct3}} and {{pct4}} respectively.',
      slots: {
        chartType: 'pie chart',
        relation: 'differences',
        theme: 'lifelong learning',
        themeCap: 'Lifelong learning',
        surveyTarget: 'mobile reading purposes among students at one university',
        topItem: 'acquiring knowledge',
        topPct: '59.5%',
        item2: 'passing time',
        item3: 'obtaining information',
        item4: 'other purposes',
        pct2: '21.3%',
        pct3: '17.0%',
        pct4: '2.2%',
        behavior: 'use mobile phones to acquire knowledge through reading',
        domain: 'quality education'
      }
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.WRITING_SIMPLIFIED5_DATA;
}
