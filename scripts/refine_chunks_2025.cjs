const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2025.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

const allSentences = {
  // ================= TEXT 1 =================
  '1:0': {
    slashed_text: "For generations , / tipping in American society was anchored in a clear social contract : / customers rewarded restaurant servers at the conclusion of a meal / based on the perceived quality of service.",
    chunk_translation: "几代人以来， / 美国社会中的小费习惯都植根于一份明确的社会契约： / 顾客在就餐结束时向餐厅服务员发放赏钱， / 取决于所感受到的服务质量高低。"
  },
  '1:1': {
    slashed_text: "Historically , this custom assumed / that tips functioned as an essential supplement / to low base wages / in sit-down dining.",
    chunk_translation: "在历史上，这一习俗假定 / 小费发挥着必不可少的补充作用， / 针对较低的基本工资， / 在堂食餐饮服务中。"
  },
  '1:2': {
    slashed_text: "Today , however , / the ubiquity of digital payment terminals / has thoroughly dismantled this traditional norm , / ushering in an era of pervasive 'tip creep' / that prompts consumers to tip / before receiving any service / across almost every casual transaction.",
    chunk_translation: "然而在今天， / 数字支付终端的无处不在 / 彻底瓦解了这一传统规范， / 开启了一个普遍“小费泛滥蔓延”的时代， / 促使消费者给小费 / 在接受任何服务之前， / 在几乎每一笔日常随意的交易中。"
  },
  '1:3': {
    slashed_text: "The mechanics of this shift / are driven by software design / rather than spontaneous hospitality.",
    chunk_translation: "这种转变的运作机制 / 是由软件设计所驱动的， / 而非自发的热情好客。"
  },
  '1:4': {
    slashed_text: "When buying a simple takeout coffee or pastry , / consumers are routinely confronted / with a swivel screen / displaying pre-set tip percentages / ranging from eighteen to thirty percent.",
    chunk_translation: "当购买一杯简单的外带咖啡或糕点时， / 消费者通常会面对 / 一个旋转屏幕， / 上面显示着预设的小费比例， / 从18%到30%不等。"
  },
  '1:5': {
    slashed_text: "Faced with the awkward gaze of the cashier , / customers succumb to social embarrassment and guilt , / tapping generous default buttons / even when no specialized assistance was provided.",
    chunk_translation: "面对收银员尴尬的注视， / 顾客往往屈从于社交难堪与内疚心理， / 点击慷慨的默认选项按钮， / 即使并未获得任何专门的协助。"
  },
  '1:6': {
    slashed_text: "What was once a discretionary token of gratitude / has morphed into a coercive psychological toll.",
    chunk_translation: "曾经作为表达谢意的自愿之举， / 如今已演变为一种强迫性的心理负担代价。"
  },
  '1:7': {
    slashed_text: "Behind this digital manipulation / lies a calculated employer strategy / to offload labor compensation / onto patrons.",
    chunk_translation: "在这种数字化操纵的背后， / 隐藏着雇主精打细算的策略， / 即将劳动力报酬的负担转嫁 / 给顾客。"
  },
  '1:8': {
    slashed_text: "Facing soaring inflation / and intense pressure to raise wages , / business owners exploit customer tips / to subsidize operational payrolls / without raising posted menu prices.",
    chunk_translation: "面对不断飙升的通胀 / 以及提高工资的巨大压力， / 企业主利用顾客的小费 / 来补贴日常运营的薪酬支出， / 而无需提高标示的菜单价格。"
  },
  '1:9': {
    slashed_text: "By relying on customer largesse / to bridge the gap between inadequate legal minimum wages and a livable income , / employers effectively convert voluntary patronage / into an unpaid subsidy for corporate overhead.",
    chunk_translation: "通过依赖顾客的慷慨解囊 / 来弥补过低的法定最低工资与维持生计所需收入之间的差距， / 雇主实际上将自愿消费 / 转化为了对企业日常管理成本的无偿补贴。"
  },
  '1:10': {
    slashed_text: "Earlier attempts by progressive restaurateurs / to abolish tipping and guarantee fair base pay / have largely fizzled out.",
    chunk_translation: "早前一些开明餐饮经营者所做的尝试—— / 即废除小费制度并保障公平的基本工资—— / 大多已经以失败告终。"
  },
  '1:11': {
    slashed_text: "Pioneers who eliminated tips and raised menu prices / often suffered sharp customer revolts and high staff turnover , / as experienced servers realized / they could earn substantially more / in tip-fueled establishments elsewhere.",
    chunk_translation: "取消小费并提高菜单价格的先行者 / 往往遭遇顾客的强烈抵触和高员工离职率， / 因为经验丰富的服务员意识到， / 他们在其他依靠小费维持收入的场所 / 能够赚得明显更多。"
  },
  '1:12': {
    slashed_text: "Because piecemeal reforms leave conscientious businesses / at a commercial disadvantage , / the no-tipping movement collapsed / under competitive market realities.",
    chunk_translation: "由于零星片面的改革让有良知的企业 / 处于商业竞争劣势， / 无小费运动便崩溃了， / 在残酷的市场竞争现实面前。"
  },
  '1:13': {
    slashed_text: "True resolution requires comprehensive statutory reform / rather than reliance on consumer goodwill.",
    chunk_translation: "真正的解决途径需要全面的法定制度改革， / 而不是依赖消费者的善意好心。"
  },
  '1:14': {
    slashed_text: "Lawmakers must eliminate outdated sub-minimum wage loopholes / that allow employers to pay service workers poverty-level wages , / while standardizing transparent all-inclusive pricing.",
    chunk_translation: "立法者必须消除过时的低于最低工资标准的法律漏洞， / 这些漏洞允许雇主向服务行业员工支付贫困线水平的工资， / 与此同时应推行透明规范的全包标价模式。"
  },
  '1:15': {
    slashed_text: "Only when fair compensation is treated / as an unconditional employer obligation / will tipping return to its authentic role : / an occasional , voluntary expression of appreciation / rather than an institutionalized guilt trip.",
    chunk_translation: "唯有将公平报酬视为 / 雇主无条件的法定义务时， / 小费才能回归其本真角色： / 一种偶尔的、出于自愿的感激表达， / 而非制度化的内疚心理折磨。"
  },

  // ================= TEXT 2 =================
  '2:0': {
    slashed_text: "When Britain's National Health Service (NHS) was established in 1948 , / it was hailed as a visionary institution / designed to provide timely and universal care / to meet the pressing medical needs / of the dominant population it served.",
    chunk_translation: "当英国国家医疗服务体系（NHS）于1948年建立时， / 它被誉为一个有远见的机构， / 旨在提供及时且普惠的医疗服务， / 以满足紧迫的医疗需求， / 针对其所服务的主要人口。"
  },
  '2:1': {
    slashed_text: "Over seven decades later , however , / this post-war model / has grown profoundly out of date.",
    chunk_translation: "然而，七十多年后， / 这种战后模式 / 已经严重过时。"
  },
  '2:2': {
    slashed_text: "While British life expectancy has stalled / and survival rates for conditions like cancer / and infant mortality / increasingly lag behind peer nations , / NHS waitlists have ballooned / to unprecedented highs.",
    chunk_translation: "尽管英国的人口预期寿命停滞不前， / 且癌症等疾病的生存率 / 以及婴儿死亡率 / 日益落后于同行国家， / NHS候诊名单已急剧增加 / 达到前所未有的高点。"
  },
  '2:3': {
    slashed_text: "As specialized healthcare becomes increasingly inaccessible for millions , / frustrated patients are routinely forced / to opt for private alternatives / or endure agonizing delays.",
    chunk_translation: "随着专科医疗对数以百万计的人而言变得越来越难以企及， / 感到沮丧的患者通常被迫 / 选择私立医疗替代方案， / 或忍受痛苦的延误。"
  },
  '2:4': {
    slashed_text: "The roots of this crisis stem from / decades of squeezed capital investment / and a chronic staffing shortage / that has pushed the clinical workforce / to its breaking point.",
    chunk_translation: "这场危机的根源在于 / 数十年被压缩的资本投资， / 以及长期的员工短缺， / 这已将临床医护人员推向 / 其承受极限。"
  },
  '2:5': {
    slashed_text: "Faced with overwhelmed acute hospitals , / policy experts have long rehearsed a familiar answer : / modern healthcare must systematically divert resources / away from acute hospital wards / to manage patients / within primary care and community care settings.",
    chunk_translation: "面对不堪重负的急诊医院， / 政策专家长期以来给出一个熟悉的答案： / 现代医疗必须系统性地转移资源， / 远离急症医院病房， / 以便管理患者 / 在初级医疗和社区护理环境中。"
  },
  '2:6': {
    slashed_text: "By expanding local clinics / and investing in general practitioners , / reformers argue , / the system could alleviate reliance on hospital capacity / and better support an aging population / living with complex , long-term conditions.",
    chunk_translation: "通过扩建当地诊所 / 并投资于全科医生， / 改革者认为， / 该体系可以减轻对医院容量的依赖， / 并更好地支持老龄化人口， / 这些人口伴有复杂的长期慢性疾病。"
  },
  '2:7': {
    slashed_text: "Yet successive rounds of government strategy / and top-down reform / have persistently failed / to deliver meaningful transformation.",
    chunk_translation: "然而，连续几轮的政府战略 / 和自上而下的改革， / 始终未能 / 带来有意义的转变。"
  },
  '2:8': {
    slashed_text: "A recent landmark study / by a healthcare think tank , / under a programme entitled 'Reimagining the NHS ,' / calls for an honest and urgent rethink / of why prior efforts floundered.",
    chunk_translation: "最近的一项里程碑式研究 / 由一家医疗智库开展， / 在名为“重构NHS”的项目下， / 呼吁进行坦诚而紧迫的反思 / 反思先前的努力为何陷入困境。"
  },
  '2:9': {
    slashed_text: "The report concludes / that previous initiatives merely tinkered at the margins / while retaining an entrenched hospital-centric bias.",
    chunk_translation: "该报告总结道， / 先前的举措仅仅是在边缘进行修补， / 同时保留了根深蒂固的以医院为中心的偏向。"
  },
  '2:10': {
    slashed_text: "Because political pressure prioritizes / short-term hospital targets / and emergency room headlines , / acute trusts continue to absorb / lion's shares of state revenue , / leaving community care underfunded / and barely able to cope.",
    chunk_translation: "因为政治压力优先考虑 / 短期的医院指标 / 和急诊室新闻头条， / 急诊信托基金继续吸收 / 国家财政收入的大部分， / 导致社区护理资金不足， / 勉强能够应付。"
  },
  '2:11': {
    slashed_text: "Crucially , / this hospital-centric orientation / is ill-suited to modern public health challenges.",
    chunk_translation: "关键在于， / 这种以医院为中心的导向 / 不适应现代公共卫生的挑战。"
  },
  '2:12': {
    slashed_text: "Medical institutions are primarily organized / to fix acute physical illnesses , / yet epidemiological studies estimate / that healthcare interventions account for / barely twenty percent of overall health outcomes.",
    chunk_translation: "医疗机构主要用于组织 / 治疗急性的身体疾病， / 然而流行病学研究估计， / 医疗干预仅仅占到 / 总体健康结局的百分之二十。"
  },
  '2:13': {
    slashed_text: "The overwhelming majority of modern morbidities / are shaped by broader social determinants , / such as substandard housing , / air pollution , / and commercial food environments / that aggravate chronic ailments / like obesity and Type 2 diabetes.",
    chunk_translation: "现代发病率的绝大多数 / 都受到更广泛的社会决定因素塑造， / 例如不达标的住房、 / 空气污染、 / 以及商业食品环境， / 这些环境加剧了慢性病， / 比如肥胖症和2型糖尿病。"
  },
  '2:14': {
    slashed_text: "Treating patients repeatedly / in specialized hospital wards / without remedying these underlying social conditions / is neither clinically effective / nor economically sustainable.",
    chunk_translation: "反复治疗患者 / 在专门的医院病房中， / 却不纠正这些潜在的社会条件， / 既在临床上没有效果， / 也在经济上无法持续。"
  },
  '2:15': {
    slashed_text: "To build a resilient healthcare system / for the twenty-first century , / policymakers must move beyond / simply scrapping nominal price tags / or announcing cosmetic structural reshuffles.",
    chunk_translation: "为了构建一个有韧性的医疗体系 / 面向二十一世纪， / 政策制定者必须超越 / 仅仅取消名义收费标签， / 或宣布表面上的结构重组。"
  },
  '2:16': {
    slashed_text: "Real reform demands / that authorities radically restructure power / and redistribute budgetary resources / across administrative tiers , / devolving clinical functions / to integrated community teams.",
    chunk_translation: "真正的改革要求 / 当局从根本上重组权力， / 并重新分配预算资源 / 跨越各个行政层级， / 将临床职能下放 / 给综合社区团队。"
  },
  '2:17': {
    slashed_text: "Rather than continuing to pour capital exclusively / into acute hospital infrastructure , / the state must pay due attention / to social determinants / and create an empathetic understanding / of preventative medicine.",
    chunk_translation: "与其继续一味将资金 / 投入到急诊医院基础设施中， / 国家必须给予应有的重视 / 于社会决定因素， / 并建立起感同身受的理解 / 对预防医学。"
  },
  '2:18': {
    slashed_text: "Only when healthcare leaders exercise / a bold sense of collective responsibility / can the NHS overcome structural deficiencies / and truly fulfill its founding promise.",
    chunk_translation: "只有当医疗领导者展现出 / 果敢的集体责任感时， / NHS才能克服结构性缺陷， / 并真正兑现其建构之初的承诺。"
  },

  // ================= TEXT 3 =================
  '3:0': {
    slashed_text: "As catastrophic summer heatwaves proliferate across the globe / with alarming regularity , / governments are scrambling to spell out / comprehensive contingency plans.",
    chunk_translation: "随着破坏性的夏季热浪以令人担忧的频率 / 在全球各地频繁出现， / 各国政府正争先恐后地制定 / 全面的应急预案。"
  },
  '3:1': {
    slashed_text: "When public health officials issue extreme heat warnings , / their primary goal is to alert civic institutions and medical facilities / to prepare for an inevitable surge in casualties.",
    chunk_translation: "当公共卫生官员发布极端高温预警时， / 其首要目标是提醒市政机构和医疗设施 / 为不可避免的伤亡人数激增做好准备。"
  },
  '3:2': {
    slashed_text: "Emergency guidance frequently calls for hospitals / to set aside specialized wards / and reserve dedicated clinical staff / to treat heatstroke and acute cardiovascular distress.",
    chunk_translation: "应急指导常常呼吁医院 / 预留专门的病房， / 并配备专门的临床医护人员， / 用以救治中暑和急性心血管疾病患者。"
  },
  '3:3': {
    slashed_text: "Yet beneath these official pronouncements , / the construction and actual implementation of such heat response plans under existing policies / remain frustratingly uneven.",
    chunk_translation: "然而在这些官方声明的背后， / 现有政策下此类高温应对计划的制定与实际执行 / 依然极不均衡，令人沮丧。"
  },
  '3:4': {
    slashed_text: "A major impediment to timely intervention / lies in the rigid trigger thresholds / that activate emergency protocols.",
    chunk_translation: "及时干预的一大阻碍 / 在于启动应急方案的 / 僵化触发阈值。"
  },
  '3:5': {
    slashed_text: "In most municipal jurisdictions , / heat action plans require thermometer readings to exceed a predetermined , static temperature / before emergency measures — such as opening cooled shelters or halting outdoor construction — / are formally enacted.",
    chunk_translation: "在大多数市政辖区中， / 高温行动计划要求温度计读数超过预设的静态温度， / 然后诸如开放避暑降温庇护所或暂停户外施工等应急措施 / 才会正式启动。"
  },
  '3:6': {
    slashed_text: "However , meteorological authorities increasingly highlight / that simple temperature gauges offer a flawed and un-nuanced measure / of human thermal stress.",
    chunk_translation: "然而气象部门日益强调指出， / 单纯的气温测量指标在衡量人体的热压力时 / 存在缺陷且不够细致。"
  },
  '3:7': {
    slashed_text: "In humid coastal regions , / high atmospheric moisture prevents the evaporation of sweat , / amplifying bodily strain / even when raw temperatures remain roughly shy of official alert thresholds.",
    chunk_translation: "在潮湿的沿海地区， / 较高的大气湿度阻碍了汗液蒸发， / 加剧了身体的生理负荷， / 即使原始气温略低于官方预警阈值。"
  },
  '3:8': {
    slashed_text: "Furthermore , the physical impacts of extreme heat / are not distributed equitably across urban landscapes.",
    chunk_translation: "此外，极端高温造成的实际生理影响 / 在城市各个区域的分布并不均衡。"
  },
  '3:9': {
    slashed_text: "Recent demographic analyses demonstrate / that heat-related morbidity is disproportionately concentrated / in impoverished neighborhoods and informal dwellings.",
    chunk_translation: "近期的人口学分析表明， / 与高温相关的发病率不成比例地集中在 / 贫困社区和简陋住所之中。"
  },
  '3:10': {
    slashed_text: "These densely populated communities suffer from severe heat island effects , / where asphalt and concrete trap radiation during daylight hours / and release it slowly at night , / offering residents no nocturnal respite.",
    chunk_translation: "这些人口稠密的社区饱受严重的热岛效应之苦， / 柏油路面和混凝土在白天吸收热辐射， / 并在夜间缓慢释放， / 让居民在夜间也得不到片刻清凉喘息。"
  },
  '3:11': {
    slashed_text: "Compounding this vulnerability is a chronic lack of adequate funding / for basic urban amenities , / leaving lower-income districts with neglected shade , treeless sidewalks , and uninsulated housing.",
    chunk_translation: "加剧这种脆弱性的是基本城市公共设施 / 长期缺乏充足资金支持， / 导致低收入街区遮阳设施失修、人行道缺乏树木庇荫、房屋隔热不良。"
  },
  '3:12': {
    slashed_text: "Addressing this public health crisis / requires policymakers to transition / from reactive crisis management / to proactive , localized infrastructure adaptation.",
    chunk_translation: "应对这场公共卫生危机 / 要求政策制定者实现转型， / 即从被动的事后危机应对 / 转向主动的因地制宜基础设施改造。"
  },
  '3:13': {
    slashed_text: "Relying solely on hospital wards to treat the heat-stricken / is a downstream palliative / that ignores root environmental causes.",
    chunk_translation: "单靠医院病房救治中暑患者 / 是一种下游治标手段， / 忽视了根本的环境诱因。"
  },
  '3:14': {
    slashed_text: "Instead , municipal authorities must customize heat alerts / based on combined temperature-humidity indices / that reflect localized physiological risk.",
    chunk_translation: "相反，市政当局必须根据综合温湿度指数 / 来量身定制高温预警， / 该指数能更真实反映局部的生理健康风险。"
  },
  '3:15': {
    slashed_text: "Simultaneously , cities must direct targeted funding / toward retrofitting informal dwellings with reflective roofing , / expanding urban tree canopies , / and installing accessible shade structures / throughout vulnerable neighborhoods.",
    chunk_translation: "与此同时，城市必须引导专项资金， / 用于为简陋住所改建反光屋顶、 / 扩大城市绿树树冠覆盖面、 / 并安装便利的遮阳设施 / 遍及脆弱街区。"
  },
  '3:16': {
    slashed_text: "Ultimately , extreme heat can no longer be dismissed / as a temporary meteorological nuisance / or an unavoidable act of nature.",
    chunk_translation: "归根结底，极端高温再也不能被轻描淡写地视为 / 一时烦人的气象琐事， / 或不可抗拒的自然天灾。"
  },
  '3:17': {
    slashed_text: "It represents a systemic climate threat / that tests the resilience / of urban governance and social equity.",
    chunk_translation: "它代表着一种系统性的气候威胁， / 严峻考验着 / 城市治理的韧性与社会公平。"
  },
  '3:18': {
    slashed_text: "Only by spelling out forward-looking policies / that integrate nuanced scientific thresholds / with sustained capital investment in physical shading and architectural retrofits / can cities hope to safeguard their most vulnerable citizens / against an increasingly sweltering future.",
    chunk_translation: "唯有制定出具有前瞻性的政策， / 将科学严谨的复合指标阈值 / 与在遮阳设施及建筑改造方面的持续资金投入结合起来， / 城市才有希望保护好最脆弱的市民群落， / 抵御日益酷热难耐的未来。"
  },

  // ================= TEXT 4 =================
  '4:0': {
    slashed_text: "Every day , / millions of pedestrians navigate the meticulously organised pavements / of modern urban environments.",
    chunk_translation: "每一天， / 数以百万计的行人穿行在规划严整的人行道上， / 在现代城市的空间环境之中。"
  },
  '4:1': {
    slashed_text: "Yet look closely / at almost any public park , university campus , or suburban development , / and another geography emerges / in the footprints left by the community.",
    chunk_translation: "然而仔细观察 / 几乎任何一处公园、大学校园或郊区开发区， / 就会发现另一种空间地理格局显现出来， / 烙印在公众留下的足迹之中。"
  },
  '4:2': {
    slashed_text: "Across manicured lawns and landscaped flowerbeds , / dirt tracks reveal / where walkers consistently deviate from formal concrete walkways / to forge intuitive shortcuts.",
    chunk_translation: "穿过精心修剪的草坪和景观花坛， / 泥土小径清晰展现出 / 行人经常偏离规范水泥步道的地方， / 去踩出直觉上的捷径。"
  },
  '4:3': {
    slashed_text: "Known to urbanists and landscape architects as 'desire paths' — or 'desire lines' — / these beaten earth trails are carved out by the collective tread of ordinary citizens / seeking more efficient routes / than those planned by municipal authorities.",
    chunk_translation: "这些小径被城市规划学者和景观设计师称为“欲望路径”或“欲望线条”， / 这些被踏平的泥土小路是由普通市民的脚步共同踩出来的， / 他们试图寻找更高效的路线， / 相比于市政当局所规划的那些道路。"
  },
  '4:4': {
    slashed_text: "Historically , conventional urban planners routinely interpreted these informal tracks / as acts of civil disobedience / or unsightly signs of public laziness / that cut corners across designed landscapes.",
    chunk_translation: "在历史上，传统城市规划者通常将这些自发小道解读为 / 违规不遵纪守法的行为， / 或是公众偷懒图省事的难看痕迹， / 破坏了精心设计的景观布局。"
  },
  '4:5': {
    slashed_text: "Eager to preserve aesthetic order , / authorities erected wire fences , planted thorny shrubbery , / or posted punitive signs / warning pedestrians to keep off the grass.",
    chunk_translation: "为了极力维护景观秩序的美观， / 管理部门竖立起铁丝围栏、种上带刺灌木， / 或设立惩罚性的警示牌， / 警告行人请勿践踏草坪。"
  },
  '4:6': {
    slashed_text: "Yet these coercive measures / rarely succeed.",
    chunk_translation: "然而这些强迫手段 / 却极少能奏效。"
  },
  '4:7': {
    slashed_text: "Human movement possesses a natural capability to assert its own spatial logic ; / when a desire path bisects an expansive lawn , / it does not signify deliberate defiance , / but rather exposes a fundamental design flaw / where designated routes fail to meet human needs / for convenient transit.",
    chunk_translation: "人类的走动具有主张其自身空间逻辑的自然能力； / 当一条欲望小径横穿大片草坪时， / 它并不意味着故意对抗规矩， / 而是暴露了一个根本性的设计缺陷， / 即规定的路线未能满足人们 / 对便捷通行的需求。"
  },
  '4:8': {
    slashed_text: "Far from being random vandalism , / desire lines provide invaluable insights / into the living dynamics of pedestrian behavior.",
    chunk_translation: "它们绝非随意的蓄意破坏， / 欲望小道为我们提供了宝贵的洞见， / 帮助理解行人行为的真实动态规律。"
  },
  '4:9': {
    slashed_text: "A celebrated counter-example to this top-down rigidity / can be found at Ohio State University's historic central lawn , / known as the Oval.",
    chunk_translation: "一个打破这种自上而下僵化规划的著名成功范例， / 可以在俄亥俄州立大学历史悠久的中心草坪找到， / 即著名的“椭圆广场”。"
  },
  '4:10': {
    slashed_text: "When the campus was redesigned in the twentieth century , / university administrators deliberately held off / on laying paved walkways across the massive green space.",
    chunk_translation: "当20世纪对该校区进行重新规划设计时， / 大学管理层特意推迟了 / 在这片巨大绿地上铺设硬化步道的决定。"
  },
  '4:11': {
    slashed_text: "Instead , they waited / until students and faculty naturally traversed the open grounds , / allowing their daily routines / to carve clear desire paths into the turf.",
    chunk_translation: "相反，他们耐心等待， / 直到师生们自然穿行在这片开阔的草地上， / 任由他们的日常通行习惯 / 在草皮上踏出清晰的欲望路径。"
  },
  '4:12': {
    slashed_text: "Only after these patterns had fully established themselves / did planners proceed to pave over the dirt tracks / with permanent cobblestones.",
    chunk_translation: "只有在这些行走路线完全定型之后， / 规划人员才着手在泥土小径上 / 铺设永久性的鹅卵石步道。"
  },
  '4:13': {
    slashed_text: "By embracing organic human movement / rather than fighting it , / the university created a harmonious / and deeply functional campus landscape.",
    chunk_translation: "通过接纳自发的人类活动规律， / 而不是与之对抗， / 该大学打造出了一处既和谐 / 又极具实用功能的校园景观。"
  },
  '4:14': {
    slashed_text: "Despite such proven successes , / a persistent reluctance to integrate desire paths / remains common throughout modern urban planning.",
    chunk_translation: "尽管有这样被证明成功的先例， / 但吸纳整合欲望路径的犹豫抵触心理 / 在现代城市规划中依然十分普遍。"
  },
  '4:15': {
    slashed_text: "Many landscape architects remain stubbornly devoted / to formal geometric aesthetics , / boasting symmetrical showcase plazas / that photograph brilliantly in architectural journals / but prove awkward and frustrating / for pedestrians in real life.",
    chunk_translation: "许多景观设计师依然固执地偏爱 / 形式主义的几何美学， / 夸耀那些对称的展示性广场， / 它们在建筑杂志的照片中显得美轮美奂， / 但在现实生活中却给行人 / 带来了尴尬别扭与困扰。"
  },
  '4:16': {
    slashed_text: "When planners rigidly adhere to preconceived blueprints / and designate sterile corridors / while ignoring natural human paths , / an inherent clash / between artistic vanity and organic utility / is underscored.",
    chunk_translation: "当规划者死板地坚持预先设想的图纸、 / 划定死板冰冷的通道， / 同时忽视自然的行人走动轨迹时， / 一种固有的冲突 / 即艺术虚荣与实用需求之间的矛盾 / 就被凸显出来。"
  },
  '4:17': {
    slashed_text: "This clash is not new ; / indeed , urban history cites famous precedents / where organic trails outlived rigid geometric grids.",
    chunk_translation: "这种冲突并不新鲜； / 事实上，城市史中记载了著名的先例， / 其中自发形成的小道存续时间超越了僵化的几何网格街道。"
  },
  '4:18': {
    slashed_text: "In New York City , / Broadway famously began as the Wickquasgeck Trail , / an organic Native American pathway / that meandered naturally across Manhattan's topography.",
    chunk_translation: "在纽约市， / 闻名遐迩的百老汇大道最初正是“威克夸斯格克小道”， / 一条自然形成的美洲原住民步道， / 顺应着曼哈顿的地形自然蜿蜒穿行。"
  },
  '4:19': {
    slashed_text: "When the Commissioners' Plan of 1811 / imposed an uncompromising rectangular street grid / onto the island , / Broadway proved too vital to erase , / persistently slicing diagonally across Manhattan to this day.",
    chunk_translation: "当1811年的《专员规划案》 / 将毫不妥协的矩形方格街道网络 / 强加于曼哈顿岛之上时， / 百老汇大道被证明过于重要而无法被抹除， / 至今依然斜切穿过整个曼哈顿。"
  },
  '4:20': {
    slashed_text: "Ultimately , / desire paths remind us / that cities are not static monuments / created for top-down admiration , / but living ecosystems animated by the people / who walk them.",
    chunk_translation: "归根结底， / 欲望小径提醒我们， / 城市绝非静止的纪念碑， / 为了自上而下的观赏赞叹而建造， / 而是充满生机的生态系统，由在其中穿行的人们 / 赋予活力。"
  },
  '4:21': {
    slashed_text: "True urban design / should not suppress human movement , / but humbly follow in its footprints.",
    chunk_translation: "真正的城市设计 / 不应当压制人类的活动步调， / 而应谦逊地追随人们的足迹。"
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
console.log(`Successfully refined 2025.json! Applied ${appliedCount} sentence fixes across 76 sentences.`);
