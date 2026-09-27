const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2026.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

const allSentences = {
  // ================= TEXT 1 =================
  '1:0': {
    slashed_text: "When people imagine a public library , / the image that instinctively springs to mind / is often one of dusty shelves , / quiet reading rooms , / and old-fashioned librarians shushing patrons.",
    chunk_translation: "当人们想象一座公共图书馆时， / 本能地浮现在脑海中的形象 / 往往是落满灰尘的书架、 / 安静的阅览室， / 以及示意读者安静的老派图书管理员。"
  },
  '1:1': {
    slashed_text: "For decades , / popular culture has reduced these civic sanctuaries / to nostalgic relics of a pre-digital age , / sort of quaint municipal luxuries / that modern society can easily do without anyway.",
    chunk_translation: "数十年来， / 流行文化将这些公共圣所贬低 / 为前数字时代的怀旧遗存， / 算是一种古雅的市政奢侈品， / 现代社会无论如何都可以轻易舍弃。"
  },
  '1:2': {
    slashed_text: "Startlingly , however , / a comprehensive investigation tells a vastly different story.",
    chunk_translation: "然而令人震惊的是， / 一项全面的调查却展现出截然不同的图景。"
  },
  '1:3': {
    slashed_text: "A recent independent review / commissioned by the culture department / and conducted across branches up and down the country / reveals that modern libraries have quietly transformed / into indispensable engines of community empowerment.",
    chunk_translation: "最近一项由文化部门委托进行、 / 并在全国各地分馆开展的 / 独立审查显示， / 现代图书馆已悄然转变为 / 社区赋能不可或缺的引擎。"
  },
  '1:4': {
    slashed_text: "Far from being sleepy book repositories , / local library branches are today / a vibrant hive of activity.",
    chunk_translation: "当地图书馆分馆远非沉寂的书籍储藏室， / 如今已是 / 充满活力的活动中心。"
  },
  '1:5': {
    slashed_text: "Visitors learn / that modern branches offer / a multitude of essential public provisions / that bridge contemporary social divides.",
    chunk_translation: "来访者了解到， / 现代分馆提供了 / 大量必不可少的公共服务， / 弥合了当代的社会鸿沟。"
  },
  '1:6': {
    slashed_text: "In an economy where high-speed broadband is essential for survival , / libraries provide free digital access / to job seekers submitting employment applications.",
    chunk_translation: "在一个高速宽带对生存至关重要的经济环境中， / 图书馆提供免费的数字网络接入， / 供求职者提交求职申请。"
  },
  '1:7': {
    slashed_text: "For budding local entrepreneurs / who cannot afford commercial office space , / specialized business hubs within libraries / provide vital guidance / on patents and intellectual property.",
    chunk_translation: "对于初露头角的当地创业者， / 他们负担不起商业办公空间， / 图书馆内的专门商务中心 / 提供了重要指导， / 涉及专利和知识产权方面。"
  },
  '1:8': {
    slashed_text: "Furthermore , community health teams regularly carry out / preventative blood pressure checks / and routine GP surgery clinics / within library meeting rooms , / bringing healthcare directly to vulnerable residents.",
    chunk_translation: "此外，社区健康团队定期开展 / 预防性血压检测 / 以及常规全科医生门诊， / 在图书馆的会议室里， / 将医疗保健直接带给弱势居民。"
  },
  '1:9': {
    slashed_text: "The scope of innovation does not stop / at conventional community services.",
    chunk_translation: "创新的范围并未止步于 / 传统的社区服务。"
  },
  '1:10': {
    slashed_text: "To engage disaffected teenagers / who might otherwise roam streets unsupervised , / several forward-looking branches have introduced / Fifa-standard esports arenas / and creative media production suites.",
    chunk_translation: "为了吸引叛逆的青少年， / 他们原本可能在无人监管的情况下在街头游荡， / 几家具有前瞻性的分馆引入了 / 国际足联标准的电竞赛场， / 以及创意媒体制作套件。"
  },
  '1:11': {
    slashed_text: "Remarkably , all of these amenities / are delivered completely free of charge.",
    chunk_translation: "值得注意的是，所有这些便民设施 / 都是完全免费提供的。"
  },
  '1:12': {
    slashed_text: "In return for this open hospitality , / libraries ask for nothing more than civic respect , / offering a truly unconditional sanctuary / where citizens are permitted to simply exist , / read , learn , or rest / without any commercial pressure to purchase a coffee / or justify their presence.",
    chunk_translation: "作为对这种开放热情的答谢， / 图书馆只要求公民的基本尊重， / 提供了一个真正无条件的庇护所， / 在这里公民被允许单纯停留、 / 阅读、学习或休息， / 而无需面临购买咖啡的商业压力， / 也不必证明自己在此的合理性。"
  },
  '1:13': {
    slashed_text: "It is precisely this absence of a price tag / that justifies why public libraries matter so profoundly / to civic life.",
    chunk_translation: "恰恰是这种价格标签的缺失， / 证明了为何公共图书馆对公民生活 / 具有如此深远的意义。"
  },
  '1:14': {
    slashed_text: "In an increasingly privatized society / where almost every public square has been commodified / into commercial real estate , / libraries stand as the last truly egalitarian civic institutions.",
    chunk_translation: "在一个日益私有化的社会中， / 几乎所有的公共广场都被商品化 / 转化为商业地产， / 图书馆作为最后真正平等的公民机构而立。"
  },
  '1:15': {
    slashed_text: "Here , an unemployed mother applying for social benefits / sits beside a retired university professor browsing poetry ; / a homeless teenager seeking warmth / shares a high-speed terminal / with a tech entrepreneur researching market trends.",
    chunk_translation: "在这里，申请社会救济金的失业母亲 / 坐在浏览诗歌的退休大学教授身旁； / 寻求温暖的无家可归少年 / 与研究市场趋势的科技创业者 / 共享高速终端。"
  },
  '1:16': {
    slashed_text: "By treating every individual with equal dignity , / libraries cultivate social cohesion / and foster democratic solidarity / in ways that private markets can never replicate.",
    chunk_translation: "通过以平等的尊严对待每个人， / 图书馆培养了社会凝聚力， / 并促进了民主团结， / 以私人市场永远无法复制的方式。"
  },
  '1:17': {
    slashed_text: "Yet despite these remarkable contributions , / overall library networks across the country / continue to struggle against chronic underfunding / and municipal neglect.",
    chunk_translation: "然而尽管做出了这些显著贡献， / 全国的整体图书馆网络 / 仍在与长期的资金匮乏 / 以及市政忽视作斗争。"
  },
  '1:18': {
    slashed_text: "Local authorities facing budget deficits / too often treat branch closures / as an easy fiscal remedy , / overlooking the catastrophic social void left behind.",
    chunk_translation: "面临预算赤字的地方当局 / 常常将关闭分馆 / 视为一种轻而易举的财政补救措施， / 忽视了由此留下的灾难性社会真空。"
  },
  '1:19': {
    slashed_text: "It is dangerously short-sighted / to underappreciate an institution / that returns far more value to communities / than it consumes in state subsidies.",
    chunk_translation: "这是极其危险的短视行为， / 如果低估这样一个机构， / 它回馈给社区的价值， / 远多于它所消耗的政府补贴。"
  },
  '1:20': {
    slashed_text: "Rather than starving libraries of vital resources / or leaving them to wither on the margins , / central and regional authorities must recognize libraries / as essential public infrastructure , / providing them with robust , sustained funding / to ensure they remain open to all.",
    chunk_translation: "与其让图书馆缺乏关键资源， / 或任由它们在边缘凋零， / 中央和地方当局必须将图书馆视为 / 必不可少的公共基础设施， / 为其提供充足且持续的资金支持， / 以确保它们继续向所有人开放。"
  },

  // ================= TEXT 2 =================
  '2:0': {
    slashed_text: "In modern corporate environments , / employees navigating complex career challenges / are increasingly turning to generative artificial intelligence / for guidance.",
    chunk_translation: "在现代企业环境中， / 应对复杂职业挑战的员工 / 正日益求助于生成式人工智能 / 来获取指导。"
  },
  '2:1': {
    slashed_text: "Whether drafting sensitive emails , / troubleshooting programming errors , / or seeking advice on office interpersonal conflicts , / workers engage with AI chatbots / not merely as automated search tools , / but as empathetic personal and professional mentors.",
    chunk_translation: "无论是起草敏感邮件、 / 排查程序错误， / 还是在办公室人际冲突上寻求建议， / 员工与AI聊天机器人的互动 / 不仅将其作为自动搜索工具， / 更是将其视作具有同理心的个人和职业导师。"
  },
  '2:2': {
    slashed_text: "The immediate , non-judgmental responses / provided by conversational algorithms / leave workers feeling genuinely heard and understood , / reducing the sense of being isolated / in high-pressure corporate hierarchies.",
    chunk_translation: "即时且不带评判色彩的回答， / 由对话算法提供， / 让员工感到真正被倾听与理解， / 减少了孤立感， / 在充满高压的企业层级结构中。"
  },
  '2:3': {
    slashed_text: "Yet behind this newfound emotional connection / lies an alarming organizational blind spot : / in their eagerness to solicit advice , / employees routinely share sensitive , highly confidential information / without pausing to consider the broader implications.",
    chunk_translation: "然而，在这种新建立的情感连接背后， / 隐藏着一个令人担忧的组织盲区： / 在急于寻求建议的过程中， / 员工常常分享敏感且高度机密的信息， / 而没有停下来思考更广泛的潜在影响。"
  },
  '2:4': {
    slashed_text: "Many workers fail to realise / that commercial AI platforms are fundamentally built / on data aggregation.",
    chunk_translation: "许多员工未能意识到， / 商业AI平台从根本上 / 是建立在数据聚合之上的。"
  },
  '2:5': {
    slashed_text: "While chatbots appear to be good at conversing / like discreet human confidants , / they are not designed to keep secrets.",
    chunk_translation: "虽然聊天机器人看似善于交谈， / 就像谨慎的人类密友一样， / 但它们的设计初衷并非为了保守秘密。"
  },
  '2:6': {
    slashed_text: "Most popular platforms routinely log user inputs / and algorithmic outputs / to further train subsequent models , / retaining the right to analyze conversations / or share anonymized data with third parties / as tech developers see fit.",
    chunk_translation: "大多数流行平台都会常规记录用户输入 / 和算法输出， / 以进一步训练后续模型， / 并保留分析对话的权利， / 或与第三方共享匿名化数据， / 在技术开发者认为适当时。"
  },
  '2:7': {
    slashed_text: "This means that proprietary product roadmaps , / unreleased financial earnings , / privileged legal documents , / and private client communications / entered into prompt windows / are potentially exposed / to external security vulnerabilities / and competitive espionage.",
    chunk_translation: "这意味着专有的产品路线图、 / 未发布的财务收益、 / 享有特权的法律文件， / 以及输入的私密客户通讯， / 一旦录入提示词窗口， / 就有可能暴露于 / 外部安全漏洞 / 和商业竞争间谍活动之下。"
  },
  '2:8': {
    slashed_text: "As reports of corporate data leaks proliferate , / senior executives and risk officers / are finally beginning to take note.",
    chunk_translation: "随着企业数据泄露事件的报告不断增多， / 高管和风险管理人员 / 终于开始注意到这一问题。"
  },
  '2:9': {
    slashed_text: "Alarmed by the prospect of losing intellectual property / or violating stringent data protection laws like GDPR , / several multinational investment banks and technology conglomerates / initially reacted with heavy-handed measures , / taking immediate action / to enforce an outright ban on employee access / to commercial AI tools from company hardware.",
    chunk_translation: "鉴于失去知识产权 / 或违反GDPR等严格数据保护法律的前景， / 几家跨国投资银行和技术企业集团 / 最初采取了严厉的应对措施， / 立即采取行动， / 彻底禁止员工使用公司硬件设备 / 访问商业AI工具。"
  },
  '2:10': {
    slashed_text: "However , such prohibitive policies have largely backfired ; / workers simply switched to personal smartphones on corporate Wi-Fi , / driving AI usage into an unmonitored shadow economy / where data breaches become even harder to detect.",
    chunk_translation: "然而，此类禁令政策在很大程度上适得其反； / 员工只是改用公司Wi-Fi连接个人智能手机， / 从而将AI使用推向了未受监管的阴影地带， / 在那里数据泄露变得更加难以察觉。"
  },
  '2:11': {
    slashed_text: "Recognizing the futility of total prohibition , / forward-thinking enterprises are choosing a more pragmatic course : / establishing clear , comprehensive regulatory frameworks / in place of blanket prohibitions.",
    chunk_translation: "认识到全面禁止的徒劳无功， / 具有前瞻性思维的企业正选择一条更为务实的道路： / 建立清晰、全面的监管框架， / 以取代一刀切的禁令。"
  },
  '2:12': {
    slashed_text: "Instead of attempting to suppress / an indispensable productivity tool , / progressive organizations are procuring enterprise-grade AI licenses / that contractually guarantee zero data retention / and strict isolation from public training sets.",
    chunk_translation: "与其试图压制 / 这样一种不可或缺的生产力工具， / 进步的组织正采购企业级AI许可， / 这些许可在合同上保证零数据保留， / 并与公共训练集严格隔离。"
  },
  '2:13': {
    slashed_text: "Furthermore , companies are conducting mandatory digital literacy seminars , / educating employees on how to anonymize sensitive parameters / before submitting prompts / and instituting transparent guardrails / that clearly delineate / between permissible assistance / and proprietary hazards.",
    chunk_translation: "此外，企业正在举办强制性的数字素养研讨会， / 教育员工如何在提交提示词之前 / 对敏感参数进行匿名化处理， / 并建立透明的规范防线， / 清晰划分出 / 允许的辅助行为 / 与专有机密风险之间的界限。"
  },
  '2:14': {
    slashed_text: "Ultimately , / generative AI in the workplace / reflects a delicate double-edged sword.",
    chunk_translation: "归根结底， / 职场中的生成式人工智能 / 展现为一把微妙的双刃剑。"
  },
  '2:15': {
    slashed_text: "When deployed conscientiously , / AI mentors can elevate human capability , / alleviate professional anxiety , / and foster unprecedented operational efficiency.",
    chunk_translation: "如果运用得当， / AI导师可以提升人类的能力， / 缓解职业焦虑， / 并促进前所未有的运营效率。"
  },
  '2:16': {
    slashed_text: "Yet employees must never lose sight / of the technological reality governing these platforms : / a chatbot is neither an authentic colleague / nor a sworn confidant bound by professional ethics.",
    chunk_translation: "然而员工绝不能忽视 / 主导这些平台的技术现实： / 聊天机器人既不是真正的同事， / 也不是受职业道德约束的宣誓知己。"
  },
  '2:17': {
    slashed_text: "Only when organizations establish robust privacy safeguards / and individual workers cultivate rigorous data hygiene / can businesses safely harness the transformative power of generative AI / without exposing their most treasured corporate secrets.",
    chunk_translation: "唯有当组织建立健全的隐私保护措施， / 且员工个体养成严格的数据卫生习惯时， / 企业才能安全地利用生成式AI的变革力量， / 而不至于泄露其最宝贵的核心商业机密。"
  },

  // ================= TEXT 3 =================
  '3:0': {
    slashed_text: "When state authorities and railway operators launched high-speed train networks / across the continent , / they were hailed as the preferred means of modern travel.",
    chunk_translation: "当国家当局和铁路运营商在整个大陆推出高铁网络时， / 它们被誉为 / 现代出行的首选方式。"
  },
  '3:1': {
    slashed_text: "Promoted as an environmentally sustainable and punctual alternative / to domestic aviation , / passenger rail was designed / to seamlessly cover vast distances / for both corporate business and leisure journeys.",
    chunk_translation: "作为国内航空一种环境可持续且准时的替代方案， / 客运铁路的设计初衷 / 是无缝覆盖广阔的距离， / 无论是针对商务公务出行， / 还是休闲旅游行程。"
  },
  '3:2': {
    slashed_text: "Today , however , / that optimistic vision is being severely tested.",
    chunk_translation: "然而在今天， / 这一乐观愿景正经受严峻考验。"
  },
  '3:3': {
    slashed_text: "Across numerous major regional corridors , / relentless delays and unexpected service cancellations / have thrown everyday travel into chaos , / transforming what was once a source of civic pride / into a subject of bitter public recrimination.",
    chunk_translation: "在许多主要的区域交通走廊上， / 持续不断的延误和突发的班次取消 / 让日常出行陷入混乱， / 将曾经的公民自豪感源泉 / 变成了公众严厉指责的对象。"
  },
  '3:4': {
    slashed_text: "To understand why rail delays matter so acutely , / one must examine their scale and frequency.",
    chunk_translation: "要理解为什么铁路延误如此受到关注， / 人们必须审视其规模和发生频率。"
  },
  '3:5': {
    slashed_text: "Service disruptions have become a frequent fixture / of daily news coverage , / eroding public trust in transit operators.",
    chunk_translation: "班次中断已成为常见现象 / 在每日新闻报道中， / 侵蚀着公众对交通运营商的信任。"
  },
  '3:6': {
    slashed_text: "While railway management publicly points to scheduled track upgrades / and emergency maintenance work / to explain delays , / independent transit analysts highlight a more sobering systemic reality.",
    chunk_translation: "尽管铁路管理层公开指出计划内的轨道升级 / 以及紧急维护工程 / 来解释延误， / 独立的交通分析师却指出了一个更发人深省的系统性现实。"
  },
  '3:7': {
    slashed_text: "Decades of chronic underinvestment have left operators saddled / with obsolete infrastructure — / from Victorian-era signaling equipment / and deteriorating track beds / to aging power cables — / that cannot cope with the sheer volume of modern rail traffic.",
    chunk_translation: "数十年长期的投资不足使运营商承受着 / 陈旧的基础设施负担—— / 从维多利亚时代的信号设备 / 和不断恶化的轨道基础， / 到老化的电力线缆—— / 这些设施无法应对现代铁路交通的庞大运量。"
  },
  '3:8': {
    slashed_text: "Compounding this vulnerability / is a critical shortage of network capacity.",
    chunk_translation: "加剧这种脆弱性的， / 是网络运力的严重短缺。"
  },
  '3:9': {
    slashed_text: "In an effort to maximize operational revenue , / railway timetables are calibrated / with zero margin for error , / leaving the network with virtually no spare capacity.",
    chunk_translation: "为了实现运营收入最大化， / 铁路时刻表的校准 / 几乎不留容错余地， / 使得整个网络实际上没有任何多余的富余运力。"
  },
  '3:10': {
    slashed_text: "In this ultra-congested environment , / a minor hiccup — / such as a single faulty door sensor , / a momentary signal failure , / or a brief mechanical snag on a commuter train — / triggers an inevitable chain reaction of delays.",
    chunk_translation: "在这种极其拥堵的环境中， / 一个微小的意外—— / 例如单个车门传感器故障、 / 瞬间的信号失效， / 或是通勤列车上的短暂机械故障—— / 都会引发不可避免的延误连锁反应。"
  },
  '3:11': {
    slashed_text: "Because regular high-speed expresses must pass through / the same congested transit bottlenecks / as slow-moving freight and local stopping trains , / a localized incident quickly radiates / across entire regional grids , / making timetable recovery mathematically impossible.",
    chunk_translation: "因为常规高速特快列车必须经过 / 同样的拥堵枢纽瓶颈， / 与慢速货运列车和站站停的慢车共用线路， / 局部事件会迅速扩散 / 遍及整个区域电网路网， / 使时刻表的恢复在数学上变得不可能。"
  },
  '3:12': {
    slashed_text: "In the meantime , / the mixed composition of modern rail traffic / frustrates both operators and passengers alike.",
    chunk_translation: "与此同时， / 现代铁路交通的混合构成 / 让运营商和乘客同样感到沮丧。"
  },
  '3:13': {
    slashed_text: "Unlike dedicated high-speed corridors in East Asia , / many European and North American networks force high-speed , / regional commuter , / and industrial freight locomotives / to share identical tracks.",
    chunk_translation: "与东亚的专用高铁走廊不同， / 许多欧美网络迫使高速列车、 / 区域通勤列车 / 和工业货运机车 / 共用相同的轨道。"
  },
  '3:14': {
    slashed_text: "The primary beneficiary of recent infrastructure improvements / has often been high-profile vanity projects , / while the unglamorous , foundational plumbing / of local switches and passing loops / has been starved of capital.",
    chunk_translation: "近年来基础设施改善的主要受益者 / 往往是引人注目的形象工程， / 而不起眼的底层基础设施 / 如当地道岔和避让待避线 / 却一直极度缺乏资金。"
  },
  '3:15': {
    slashed_text: "As a consequence , / whenever maintenance teams take tracks out of service / to fix obsolete equipment , / entire commuter corridors are paralyzed , / forcing passengers onto replacement buses.",
    chunk_translation: "结果就是， / 每当维修团队停运轨道 / 以维修过时设备时， / 整条通勤走廊便会陷入瘫痪， / 迫使乘客改乘替代大巴。"
  },
  '3:16': {
    slashed_text: "Ultimately , / restoring reliability to passenger rail / requires policymakers to abandon cosmetic fixes / and confront structural realities.",
    chunk_translation: "归根结底， / 恢复客运铁路的可靠性 / 要求政策制定者放弃表面修补， / 直面深层的结构性现实。"
  },
  '3:17': {
    slashed_text: "Announcing ambitious speed records / or launching glossy marketing campaigns / will do nothing to solve daily travel chaos / as long as the underlying physical plant remains decrepit.",
    chunk_translation: "宣布雄心勃勃的速度纪录， / 或发起光鲜的营销宣传活动， / 都无助于解决日常的出行混乱， / 只要底层的物理设施依然破旧衰败。"
  },
  '3:18': {
    slashed_text: "True improvement demands sustained , long-term capital investment / dedicated to modernizing obsolete infrastructure , / expanding network capacity through dedicated bypass tracks , / and building genuine redundancy into scheduling systems.",
    chunk_translation: "真正的改善需要持续的长期资本投资， / 专门用于对过时基础设施进行现代化改造， / 通过专用绕行轨道扩大网络运力， / 并在运行排图系统中建立真正的冗余缓冲。"
  },
  '3:19': {
    slashed_text: "Only when transit authorities prioritize robust network resilience / over short-term financial squeezing / can railways fulfill their promise / as the reliable backbone of modern sustainable mobility.",
    chunk_translation: "只有当交通当局将强大的网络韧性 / 置于短期的财政削减之上时， / 铁路才能兑现其承诺， / 作为现代可持续出行的可靠骨干。"
  },

  // ================= TEXT 4 =================
  '4:0': {
    slashed_text: "Every summer , / across cities and small towns alike , / beloved neighborhood street festivals and block parties / have traditionally brought neighbors together / to celebrate local culture , music , and food.",
    chunk_translation: "每年夏天， / 无论在大城市还是小城镇， / 备受喜爱的邻里街头节日和街区派对 / 传统上都会把邻居聚集在一起， / 共同庆祝当地的文化、音乐与美食。"
  },
  '4:1': {
    slashed_text: "Over the past decade , / many of these modest grassroots gatherings / have blossomed into massive civic events , / drawing tens of thousands of attendees / from across metropolitan regions.",
    chunk_translation: "在过去的十年里， / 许多这类不起眼的草根集会 / 已发展壮大为大型公民活动， / 吸引了成千上万的参与者， / 他们来自整个大都市地区。"
  },
  '4:2': {
    slashed_text: "Yet in recent months , / a wave of disheartening news has swept through communities : / organizers of long-running festivals have abruptly announced cancellations / or scaled down their programs.",
    chunk_translation: "然而近几个月来， / 一波令人沮丧的消息席卷了社区： / 长期举办的节日活动的组织者突然宣布取消， / 或缩减了其活动规模。"
  },
  '4:3': {
    slashed_text: "From historic cultural parades / to neighborhood street fairs , / community committees consistently point to / the same insurmountable obstacle : / the soaring financial burden / required to stage and produce these events / in the post-pandemic era.",
    chunk_translation: "从历史悠久的文化游行， / 到邻里街头集市， / 社区委员会一致指向 / 同样不可逾越的障碍： / 举办和制作这些活动所需的 / 飙升的财政负担， / 在后疫情时代。"
  },
  '4:4': {
    slashed_text: "The underlying economics of street gatherings / have changed dramatically.",
    chunk_translation: "街头集会的底层经济学逻辑 / 已经发生了巨大的变化。"
  },
  '4:5': {
    slashed_text: "While attendees casually enjoy free live entertainment / and browse food stalls , / organizers face production expenditures / that have skyrocketed beyond all historical precedent.",
    chunk_translation: "当参与者悠闲地享受免费现场娱乐活动 / 并浏览小吃摊位时， / 组织者面临的制作支出 / 却以前所未有的速度飙升。"
  },
  '4:6': {
    slashed_text: "Municipal regulations now mandate / elaborate crowd control protocols , / requiring costly portable security fencing , / private security guards , / and extensive street closures / staffed by off-duty police officers.",
    chunk_translation: "市政法规现在强制推行 / 细致的人群控制方案， / 要求配备昂贵的便携式安全护栏、 / 私人保安人员， / 以及由休班警官执勤的 / 大面积封路措施。"
  },
  '4:7': {
    slashed_text: "Furthermore , commercial liability insurance premiums / have surged by triple-digit percentages , / while the baseline costs / for stage lighting , / portable sanitation units , / and waste management / have surged alongside general inflation.",
    chunk_translation: "此外，商业责任保险费 / 激增了三位数的百分比， / 而基础成本 / 如舞台灯光、 / 移动卫生设施 / 以及垃圾清理管理， / 也伴随普遍通胀一同上涨。"
  },
  '4:8': {
    slashed_text: "For community non-profits dependent on modest attendee donations / and vendor booth fees , / balancing the books / has become an agonizing arithmetic impossibility.",
    chunk_translation: "对于依赖微薄的参与者捐款 / 和摊位费的社区非营利组织而言， / 保持账目收支平衡 / 已成为一件痛苦且在算术上不可能完成的事。"
  },
  '4:9': {
    slashed_text: "This crisis highlights a profound contradiction / in how municipal governments evaluate the value of public gatherings.",
    chunk_translation: "这场危机凸显了深刻的矛盾， / 存在于市政当局评估公众集会价值的方式之中。"
  },
  '4:10': {
    slashed_text: "While city councils frequently laud street festivals / as vital cultural assets , / they simultaneously treat event production / as a commercial enterprise / that must pay its own way.",
    chunk_translation: "尽管市议会经常称赞街头节日 / 为重要的文化资产， / 但他们同时又将活动的制作 / 视作一种商业活动， / 必须自负盈亏。"
  },
  '4:11': {
    slashed_text: "Civic authorities rarely hesitate / to bill community organizers / exorbitant municipal permit fees / and police staffing charges.",
    chunk_translation: "市政当局几乎从不犹豫 / 向社区组织者收取账单， / 包括高昂的市政许可费用 / 以及警力人员配备开支。"
  },
  '4:12': {
    slashed_text: "Yet urban economists point out / that block parties are far more than just fun weekend entertainment ; / they function as powerful economic engines / that drive intense foot traffic / to local brick-and-mortar storefronts , / boosting small businesses / and fostering long-term neighborhood vibrancy / that reverberates throughout the municipal tax base.",
    chunk_translation: "然而城市经济学家指出， / 街区派对绝不仅仅是有趣的周末娱乐； / 它们充当着强劲的经济引擎， / 为当地的实体临街店铺 / 带来密集的客流， / 提振了小型企业， / 并培育出长期的街区活力， / 这反过来会惠及整个市政税基。"
  },
  '4:13': {
    slashed_text: "To prevent beloved traditions / from disappearing permanently , / community coalitions are actively fighting back.",
    chunk_translation: "为了防止备受喜爱的传统 / 永久消失， / 社区联盟正积极采取行动。"
  },
  '4:14': {
    slashed_text: "In several progressive cities , / organizers are aggressively soliciting municipal emergency funding , / requesting city councils / to waive administrative permitting fees / and subsidize essential public safety costs.",
    chunk_translation: "在几座进步的城市中， / 组织者正积极争取市政紧急救济资金， / 请求市议会 / 免除行政许可费用， / 并补贴基本的公共安全支出。"
  },
  '4:15': {
    slashed_text: "Concurrently , organizers are cultivating commercial sponsorships , / partnering with local corporate benefactors and commercial vendors / to cover anticipated budgetary shortfalls / without compromising the open , non-ticketed character / of the festivals.",
    chunk_translation: "与此同时，组织者正在拓展商业赞助， / 与当地企业捐助者和商业商户合作， / 以弥补预期的预算缺口， / 同时不损害节日开放免票 / 的公益特质。"
  },
  '4:16': {
    slashed_text: "Ultimately , / the quiet demise of neighborhood block parties / represents a perilous erosion of the social fabric.",
    chunk_translation: "归根结底， / 社区街区派对的无声消逝， / 代表着社会纽带的危险侵蚀。"
  },
  '4:17': {
    slashed_text: "In an increasingly fragmented and digitally isolated society , / street festivals provide rare , tangible spaces / where diverse citizens forge authentic human connections / across racial and socioeconomic lines.",
    chunk_translation: "在一个日益破碎且数字化孤立的社会中， / 街头节日提供了难得的实体空间， / 让不同背景的公民跨越种族和社会经济界限， / 建立起真实的人际连接。"
  },
  '4:18': {
    slashed_text: "Allowing these civic anchors to wither / under the weight of municipal bureaucracy / and runaway insurance inflation / would impoverish urban community life.",
    chunk_translation: "任由这些公共支柱凋零， / 在市政官僚作风 / 以及失控的保险通胀重压之下， / 将会使城市社区生活变得贫瘠。"
  },
  '4:19': {
    slashed_text: "Cities must recognize / that preserving grassroots cultural vibrancy / is not a luxury expense , / but a fundamental public duty / worthy of sustained public investment.",
    chunk_translation: "城市必须认识到， / 保护草根基层的文化活力 / 并不是一项奢侈的支出， / 而是一项基本的公共职责， / 值得持续的公共投资。"
  }
};

let appliedCount = 0;
d.texts.forEach((textObj) => {
  const tid = textObj.text_id;
  textObj.sentences.forEach((s, sIdx) => {
    const key = `${tid}:${sIdx}`;
    if (allSentences[key]) {
      s.slashed_text = allSentences[key].slashed_text;
      s.chunk_translation = allSentences[key].chunk_translation;
      appliedCount++;
    }

    // Verify 1:1 chunk count between slashed_text and chunk_translation
    const slChunks = s.slashed_text.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    const ckChunks = s.chunk_translation.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    if (slChunks.length !== ckChunks.length) {
      throw new Error(`Text ${tid} Sentence ${sIdx+1} chunk count mismatch: ${slChunks.length} vs ${ckChunks.length}\nSL: ${s.slashed_text}\nCK: ${s.chunk_translation}`);
    }
  });

  // Re-assemble paragraphs
  for (const para of textObj.paragraphs) {
    const sentsInPara = textObj.sentences.filter(s => s.pid === para.pid);
    para.slashed_text = sentsInPara.map(s => s.slashed_text).filter(Boolean).join(' / ');
    para.chunk_translation = sentsInPara.map(s => s.chunk_translation).filter(Boolean).join(' / ');
  }
});

fs.writeFileSync(file, JSON.stringify(d, null, 2) + '\n', 'utf8');
console.log(`Successfully refined 2026.json! Applied ${appliedCount} sentence fixes across 79 sentences.`);
