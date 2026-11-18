/**
 * ZY_English New Simplified 5-Template Suite (新简化版5套万能模板 · 2020-2026英二全适配)
 * Grounded in 2020-2026 English II real exams & simplified macro-narrative skeletons,
 * engineered to minimize replaceable 【】 slots while maximizing cross-topic adaptability.
 */
window.WRITING_SIMPLIFIED5_DATA = {
  meta: {
    title: '新简化版5套万能模板（2020–2026英二全适配）',
    subtitle: '基于原简化版进一步压缩可变槽位 · 全篇仅需替换少量【】即可适配20-26全部真题'
  },

  slotsMeta: [
    { key: 'chartType', label: '图表类型', hint: 'pie chart / bar chart / line chart / table' },
    { key: 'relation', label: '趋势/差异', hint: 'differences（静态对比）/ changes（动态变化）' },
    { key: 'theme', label: '主题词', hint: '名词或动名词短语（三段保持同一表达）' },
    { key: 'dataDesc', label: '图表数据描述', hint: '用1句话写清最高/次高或起止变化数据' },
    { key: 'behavior', label: '具体行为', hint: '动词原形短语（接在 people ... / to ... 后）' }
  ],

  templates: [
    {
      id: 's5_t1',
      shortName: '模板 1 · 全能极简版',
      name: '模板一：全能通用极简版（原简化版直改）',
      badge: '最稳基线 · 仅需3类核心替换',
      summary: '直接保留原简化版最稳妥的三段式逻辑，将原本还要单背的“相关领域”与“社会效果”固化为“改善民生 + 提升生活质量与凝聚力”，考场只需替换【主题词】【具体行为】与首段数据。',
      grammarNote: '【具体行为】接在 the way people 后，填动词原形短语；【主题词】用名词/动名词短语（单数谓语）。',
      p1: 'The figures in the {{chartType}} reveal notable {{relation}} concerning {{theme}}. {{dataDesc}}.',
      p2: '{{themeCap}} has attracted growing public attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people {{behavior}}, ultimately contributing to personal development and well-being. National initiatives aimed at improving public livelihoods likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this positive trend can strengthen communities by improving quality of life and strengthening social cohesion, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.',
      p3: 'In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when {{theme}} guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.',
      cn: {
        p1: '【图表类型】中的数据揭示了有关【主题词】的显著【变化/差异】。【图表数据描述】。',
        p2: '【主题词】日益受到公众关注，一个重要原因在于其深远影响。在个人层面，这体现在人们【具体行为】的方式之中，最终促进个人发展与身心福祉。旨在保障和改善民生的国家举措同样着重于赋能个人发挥潜能。除个人成长之外，这一积极趋势还能通过提升生活质量、增强社会凝聚力来夯实社区基础，为可持续发展铺路。随着这一理念在全社会扎根，它将产生连锁效应，促进社会和谐与长期繁荣。',
        p3: '总之，人们已形成理性共识：当【主题词】指导行动时，个人与社区都将获益匪浅。因此，倡导这一原则不仅明智可取，更是实现全面发展的必由之路。'
      }
    },
    {
      id: 's5_t2',
      shortName: '模板 2 · 民生福祉版',
      name: '模板二：生活品质与民生福祉版（英二高频通用）',
      badge: '民生服务 · 设施政策自然衔接',
      summary: '专为英语二高频考向（阅读学习、健身健康、城乡便利、劳动实践、养老育儿）打造。将“公共政策与设施升级、缩小差距”直接写入模板固定句，无需单背政策领域词库。',
      grammarNote: '【具体行为】接在 conscious efforts to 后，填动词原形短语；【主题词】贯穿首尾段。',
      p1: 'As is clearly shown in the {{chartType}}, there are notable {{relation}} regarding {{theme}}. {{dataDesc}}.',
      p2: '{{themeCap}} has gained increasing prominence in modern society, largely due to its profound influence on everyday life. On a personal level, this trend is embodied in people\'s conscious efforts to {{behavior}}, which enriches their daily experience and promotes overall well-being. Meanwhile, supportive public policies and upgraded facilities continue to empower citizens to turn practical needs into lasting progress. More importantly, from a broader perspective, such positive practices help build more vibrant communities by enhancing quality of life and narrowing social gaps. Once widely embraced across the country, this mindset will generate sustained momentum for social harmony and shared prosperity.',
      p3: 'To sum up, there is a widespread consensus that prioritizing {{theme}} brings lasting rewards to both individuals and society at large. Therefore, sustained support from both the public and institutions is essential for turning this positive trend into long-term progress.',
      cn: {
        p1: '如【图表类型】清晰所示，在【主题词】方面呈现出显著的【变化/差异】。【图表数据描述】。',
        p2: '【主题词】在现代社会中日益凸显，很大程度上归因于它对日常生活的深远影响。在个人层面，这一趋势体现为人们有意识地去【具体行为】，从而丰富日常体验并增进整体福祉。与此同时，配套公共政策与升级后的设施条件持续赋能民众，将现实需求转化为持久进步。更重要的是，从更宏观的视角来看，此类积极实践有助于提升生活品质、缩小发展差距，进而建设更有活力的社区。一旦这一理念在全国范围内广泛深入人心，必将为社会和谐与共同繁荣注入持久动力。',
        p3: '综上所述，社会已普遍认同：高度重视【主题词】能为个人与整个社会带来持久回报。因此，来自公众与社会各界的持续支持，对于将这一向好趋势转化为长远进步至关重要。'
      }
    },
    {
      id: 's5_t3',
      shortName: '模板 3 · 知行成长版',
      name: '模板三：理念与能力提升版（设问起段·高思辨）',
      badge: '设问句开篇 · 阅卷识别度高',
      summary: '第二段采用设问句领起，将英二各类民生/教育/健康/城乡主题统一收束到“个人自我提升 + 公共投入赋能 + 社会韧性与活力”，句型灵活且零模板痕迹。',
      grammarNote: '【具体行为】接在 how individuals 后，填动词原形短语；【主题词】接在 Why does 后，用单数名词/动名词短语。',
      p1: 'The data presented in the {{chartType}} illustrates marked {{relation}} concerning {{theme}}. {{dataDesc}}.',
      p2: 'Why does {{theme}} matter so much in contemporary society? First and foremost, it shapes how individuals {{behavior}}, thereby fostering self-improvement and a greater sense of fulfilment. Equally important, public investment in education, infrastructure, and community services creates favourable conditions for people to pursue higher goals. Beyond individual benefits, when more citizens embrace this practice, society as a whole becomes more cohesive, resilient, and forward-looking. In this way, everyday choices by ordinary people gradually translate into durable social vitality and sustainable development.',
      p3: 'In conclusion, {{theme}} serves as a vital bridge between personal growth and national progress. Only by cultivating this awareness and backing it with practical action can we build a more dynamic and prosperous future.',
      cn: {
        p1: '【图表类型】呈现的数据揭示了有关【主题词】的显著【变化/差异】。【图表数据描述】。',
        p2: '为何【主题词】在当今社会如此重要？首先，它塑造着人们如何【具体行为】，从而促进自我提升并增强获得感与满足感。同样重要的是，社会在教育、基础设施与社区服务方面的公共投入，为人们追求更高目标创造了有利条件。除个人受益外，当更多民众践行这一理念时，整个社会也会变得更具凝聚力、韧性与前瞻性。由此，普通人的日常选择正逐步转化为持久的社会活力与可持续发展动能。',
        p3: '总之，【主题词】是连接个人成长与国家进步的重要桥梁。唯有培育这一意识并辅以切实行动，我们才能共创更加充满活力与繁荣的未来。'
      }
    },
    {
      id: 's5_t4',
      shortName: '模板 4 · 超短精背版',
      name: '模板四：考场超短精背版（词数精炼 · 极速默写）',
      badge: '背诵量最少 · 约155词稳健拿分',
      summary: '专为考场时间紧张或基础薄弱设计，压缩多余修饰并直接借用简化版主干句，句短易背、不易写错语法，考场 15 分钟即可稳稳默写完毕。',
      grammarNote: '【具体行为】接在 the way people 后，填动词原形短语；首尾两处【主题词】保持一致即可。',
      p1: 'Though deceptively simple, this {{chartType}} conveys a meaningful message regarding {{theme}}. {{dataDesc}}.',
      p2: '{{themeCap}} has drawn wide attention mainly because of its far-reaching value. At the individual level, it is reflected in the way people {{behavior}}, which directly supports personal growth and mental well-being. At the policy level, national efforts to improve public services and social environments focus on enabling everyone to reach their full potential. Beyond personal advancement, this positive pattern strengthens communities by encouraging active participation and shared progress. As it gradually takes hold throughout society, it paves the way for lasting vitality and common prosperity.',
      p3: 'All in all, both individuals and communities stand to gain significantly when {{theme}} guides everyday practice. Promoting this positive value is thus vital for balanced and sustainable development.',
      cn: {
        p1: '尽管这份【图表类型】看似简洁，却传达了关于【主题词】的深刻信息。【图表数据描述】。',
        p2: '【主题词】之所以引发广泛关注，主要在于其深远价值。在个人层面，它体现在人们【具体行为】的方式中，直接助力个人成长与身心健康。在政策层面，国家改善公共服务与社会环境的举措着眼于让每个人充分发挥潜能。除个人发展外，这一良性模式还能通过鼓励积极参与和共同进步来增强社区活力。随着它在全社会逐步普及，必将为持久活力与共同繁荣铺平道路。',
        p3: '总而言之，当【主题词】指导日常实践时，个人与社区都将大受裨益。因此，弘扬这一正向价值对于实现均衡和可持续发展至关重要。'
      }
    },
    {
      id: 's5_t5',
      shortName: '模板 5 · 防撞车变体',
      name: '模板五：因果双轮驱动变体（全句式替换防撞车）',
      badge: '拒绝千篇一律 · 高地道表达',
      summary: '完全保留“简化版”的个人与宏观双层推进逻辑，但把每一句的句首框架与衔接词全部替换为地道高阶表达（stems largely from / ongoing national strategies 等），彻底避免模板撞车。',
      grammarNote: '【具体行为】接在 ordinary people to 后，填动词原形短语；【主题词】接在 Interest in / prioritizing 后。',
      p1: 'As depicted in the {{chartType}}, notable {{relation}} have emerged in relation to {{theme}}. {{dataDesc}}.',
      p2: 'Interest in {{theme}} stems largely from the breadth of its positive impact. Specifically, it encourages ordinary people to {{behavior}}, ultimately leading to healthier, more fulfilling lives. At the same time, ongoing national strategies for improving livelihoods and public welfare continue to widen opportunities for individuals to thrive. More than just benefiting single households, this trend reinforces community cohesion and drives high-quality social progress. Over time, as more people put this idea into daily practice, society enjoys stronger vitality and long-term prosperity.',
      p3: 'On the whole, a clear consensus has formed that prioritizing {{theme}} yields enduring benefits for both personal well-being and social advancement. Embracing this principle is therefore key to achieving well-rounded development.',
      cn: {
        p1: '如【图表类型】所描绘，围绕【主题词】已呈现出显著的【变化/差异】。【图表数据描述】。',
        p2: '人们对【主题词】的关注很大程度上源于其广泛而积极的影响。具体而言，它激励普通民众去【具体行为】，最终过上更健康、更充实的生活。与此同时，国家持续推进的改善民生与公共福祉战略不断拓宽个人发展的机遇。这一趋势不仅惠及千家万户，更增强了社区凝聚力，推动社会高质量发展。假以时日，随着越来越多人将这一理念付诸日常实践，社会将收获更强劲的活力与长远繁荣。',
        p3: '总体而言，各方已形成明确共识：将【主题词】置于优先位置能够为个人福祉与社会进步带来持久收益。因此，践行这一原则是实现全面发展的关键所在。'
      }
    }
  ],

  examMappings: {
    2026: {
      year: 2026,
      title: '儿童户外活动四方面看法',
      topicZh: '促进儿童全面发展',
      chartInfo: '条形图：满足好奇心 54.6%，培养观察力 54.5%，增强体质 37.2%，增进亲子互动 33.2%',
      slots: {
        chartType: 'bar chart',
        relation: 'differences',
        theme: 'fostering children\'s well-rounded development',
        themeCap: 'Fostering children\'s well-rounded development',
        dataDesc: 'In a survey of views on children\'s outdoor activities, satisfying curiosity accounts for the largest share, at 54.6%, followed by improving observation skills, building physical fitness and increasing parent-child interaction at 54.5%, 37.2% and 33.2% respectively',
        behavior: 'take children outdoors to explore nature and build physical fitness'
      }
    },
    2025: {
      year: 2025,
      title: '某社区老年人五种日常休闲活动',
      topicZh: '促进老年人身心健康与全面发展',
      chartInfo: '条形图：看电视 90.8%，散步 68.3%，养花 34.7%，阅读 31.8%，下棋 18.4%',
      slots: {
        chartType: 'bar chart',
        relation: 'differences',
        theme: 'promoting older adults\' physical and mental well-being',
        themeCap: 'Promoting older adults\' physical and mental well-being',
        dataDesc: 'Among older residents in one community, watching television accounts for the largest share, at 90.8%, followed by taking walks, tending flowers, reading and playing chess at 68.3%, 34.7%, 31.8% and 18.4% respectively',
        behavior: 'pursue healthy lifestyles and enriching daily hobbies'
      }
    },
    2024: {
      year: 2024,
      title: '某高校劳动实践课学生主要收获',
      topicZh: '推进劳动教育与全面素质教育',
      chartInfo: '条形图：学到相关知识 91.3%，提升动手能力 84.8%，感到放松 54.4%，增强合作 32.6%',
      slots: {
        chartType: 'bar chart',
        relation: 'differences',
        theme: 'comprehensive quality education',
        themeCap: 'Comprehensive quality education',
        dataDesc: 'Among gains reported by students taking labour practice courses at one university, acquiring relevant knowledge accounts for the largest share, at 91.3%, followed by improving practical skills, feeling relaxed and enhancing cooperation at 84.8%, 54.4% and 32.6% respectively',
        behavior: 'bridge the gap between knowing and doing through hands-on practice'
      }
    },
    2023: {
      year: 2023,
      title: '2012–2021 年我国居民健康素养水平变化',
      topicZh: '提高全民健康素养与建设健康中国',
      chartInfo: '折线图：2012 年 8.8% 上升至 2021 年 25.4%，近乎翻了三倍',
      slots: {
        chartType: 'line chart',
        relation: 'changes',
        theme: 'improving public health literacy',
        themeCap: 'Improving public health literacy',
        dataDesc: 'Between 2012 and 2021, the proportion of Chinese residents aged 15 to 69 with basic health literacy rose from about 8.8% to around 25.4%, nearly tripling during this period',
        behavior: 'learn scientific health knowledge and adopt healthier daily habits'
      }
    },
    2022: {
      year: 2022,
      title: '2018–2020 年全国与农村快递业务量变化',
      topicZh: '推进乡村振兴与城乡便利融合',
      chartInfo: '柱状图：全国快递 510亿→830亿件；农村快递 120亿→300亿件',
      slots: {
        chartType: 'bar chart',
        relation: 'changes',
        theme: 'rural revitalization',
        themeCap: 'Rural revitalization',
        dataDesc: 'Between 2018 and 2020, the number of parcels delivered nationwide rose from about 51 billion to around 83 billion, while that of parcels delivered in rural areas increased sharply from roughly 12 billion to approximately 30 billion',
        behavior: 'make use of modern logistics and digital platforms to boost rural development'
      }
    },
    2021: {
      year: 2021,
      title: '某市居民四种锻炼方式比例',
      topicZh: '增强全民健康意识与体育锻炼',
      chartInfo: '条形图（多选）：独自锻炼 54.3%，和朋友 47.7%，和家人 23.9%，参加团体 15.8%',
      slots: {
        chartType: 'bar chart',
        relation: 'differences',
        theme: 'greater health awareness',
        themeCap: 'Greater health awareness',
        dataDesc: 'Among residents surveyed in one city, exercising alone has the highest percentage, at 54.3%, followed by exercising with friends, with family members and in organised groups at 47.7%, 23.9% and 15.8% respectively',
        behavior: 'exercise regularly either alone or alongside friends and family'
      }
    },
    2020: {
      year: 2020,
      title: '某高校学生手机阅读四类目的',
      topicZh: '终身学习与善用数字工具获取知识',
      chartInfo: '饼图：学习知识 59.5%，消磨时间 21.3%，获取信息 17.0%，其他目的 2.2%',
      slots: {
        chartType: 'pie chart',
        relation: 'differences',
        theme: 'lifelong learning',
        themeCap: 'Lifelong learning',
        dataDesc: 'In a survey of mobile reading purposes among students at one university, acquiring knowledge accounts for the largest share, at 59.5%, followed by passing time, obtaining information and other purposes at 21.3%, 17.0% and 2.2% respectively',
        behavior: 'use digital devices purposefully to acquire knowledge and broaden horizons'
      }
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.WRITING_SIMPLIFIED5_DATA;
}
