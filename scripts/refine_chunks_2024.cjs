const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data/2024.json');
const d = JSON.parse(fs.readFileSync(file, 'utf8'));

const allSentences = {
  // ================= TEXT 1 =================
  '1:0': {
    slashed_text: "The digital economy is often hailed / as a boundless engine of modern economic progress , / yet its fruits are distributed / with alarming inequality.",
    chunk_translation: "数字经济常被称赞 / 为现代经济进步的无限引擎， / 然而其成果的分配 / 却伴随着令人担忧的不平等。"
  },
  '1:1': {
    slashed_text: "In her incisive book Cogs and Monsters : / What Economics Is , and What It Should Be , / Cambridge economist Diane Coyle warns / that if the gains from transformative technological advances / are captured exclusively by a handful of tech titans and prosperous elites , / the entire economic edifice / will face an existential legitimacy crisis.",
    chunk_translation: "在她深刻的著作《齿轮与怪兽： / 经济学是什么，应该是什么》中， / 剑桥大学经济学家戴安·科伊尔警告称， / 如果变革性技术进步所带来的收益 / 被少数科技巨头和富裕精英独占， / 整个经济大厦 / 将面临生死存亡的合法性危机。"
  },
  '1:2': {
    slashed_text: "For decades , / economic policymakers have adhered to the orthodox assumption / that rapid technological innovation / automatically translates into widespread social prosperity.",
    chunk_translation: "几十年来， / 经济政策制定者一直秉持着正统的假设， / 即快速的技术创新 / 会自动转化为广泛的社会繁荣。"
  },
  '1:3': {
    slashed_text: "Yet empirical evidence paints a far more troubling picture : / while automation and algorithm-driven platforms have dramatically boosted labor productivity / in tech-dense hubs , / wages for ordinary gig workers and service laborers / have stagnated.",
    chunk_translation: "然而实证证据描绘了一幅令人不安得多的图景： / 尽管自动化和算法驱动的平台显著提高了劳动生产率 / 在科技密集型中心， / 但普通零工工人和服务业劳动者的工资 / 却陷入了停滞。"
  },
  '1:4': {
    slashed_text: "Digitalization , rather than lifting all boats , / has deepened the chasm / between capital owners and precarious workers.",
    chunk_translation: "数字化非但没有使所有船只水涨船高， / 反而加深了鸿沟， / 在资本所有者与不稳定劳动者之间。"
  },
  '1:5': {
    slashed_text: "This widening disparity / poses a direct roadblock / to the sustained deployment of artificial intelligence.",
    chunk_translation: "这种不断扩大的差距 / 构成了直接的阻碍， / 对人工智能的持续部署而言。"
  },
  '1:6': {
    slashed_text: "Coyle argues that deploying artificial intelligence / on a national scale / demands tremendous public investment / and civic infrastructure , / which fundamentally relies on broad social buy-in.",
    chunk_translation: "科伊尔认为，在全国范围内 / 部署人工智能 / 需要巨大的公共投资 / 和市政基础设施， / 这从根本上依赖于广泛的社会支持认同。"
  },
  '1:7': {
    slashed_text: "When the majority of citizens perceive / that technological breakthroughs enrich only a protected billionaire class / while leaving them vulnerable to job displacement , / simmering resentment inevitably spills over / into institutional distrust.",
    chunk_translation: "当大多数公民察觉到 / 技术突破只让受到保护的亿万富翁阶层发财， / 同时却让自己易受失业下岗冲击时， / 暗流涌动的怨气便不可避免地蔓延 / 转化为对体制的不信任。"
  },
  '1:8': {
    slashed_text: "Geographical concentration / intensifies these social tensions.",
    chunk_translation: "地理上的高度集中 / 加剧了这些社会紧张局势。"
  },
  '1:9': {
    slashed_text: "In Britain and the United States alike , / high-value digital assets and patents / are heavily clustered in a few prosperous metropolitan regions , / leaving post-industrial rust belts and rural communities / economically stranded.",
    chunk_translation: "在英国和美国同样如此， / 高价值的数字资产和专利 / 高度聚集在少数繁荣的大都市地区， / 使得后工业锈带和乡村社区 / 在经济上陷入困境。"
  },
  '1:10': {
    slashed_text: "Without conscious policy interventions / to loosen Big Tech’s stranglehold over essential data pipelines , / regional inequalities will continue to sour public sentiment / and foster anti-tech political backlash.",
    chunk_translation: "如果没有自觉的政策干预 / 来打破大型科技公司对核心数据通道的垄断控制， / 区域不平等将继续恶化公众情绪， / 并催生反科技的政治抵制反弹。"
  },
  '1:11': {
    slashed_text: "Coyle ultimately stresses / that economics itself must evolve / beyond narrow market efficiency metrics.",
    chunk_translation: "科伊尔最终强调， / 经济学本身必须向前演进， / 超越狭隘的市场效率指标。"
  },
  '1:12': {
    slashed_text: "GDP growth alone cannot measure genuine social well-being / when prosperity is hoarded at the apex.",
    chunk_translation: "单靠国内生产总值增长无法衡量真正的社会福祉， / 当繁荣被顶层所独占聚敛之时。"
  },
  '1:13': {
    slashed_text: "To forge a sustainable digital future , / governments must redesign market architecture , / guarantee fair compensation for creative contributors , / and channel technological power into collective public flourishing / rather than concentrated private accumulation.",
    chunk_translation: "为了开创可持续的数字未来， / 政府必须重新设计市场结构， / 保障对创新贡献者的公平报酬， / 并引导技术力量促进公众的整体繁荣， / 而非少数私人的财富积累。"
  },

  // ================= TEXT 2 =================
  '2:0': {
    slashed_text: "Britain's ambitious construction industry is facing an acute structural crisis / due to its chronic failure / to cultivate a resilient domestic forestry sector.",
    chunk_translation: "英国雄心勃勃的建筑业正面临着严峻的结构性危机， / 由于其长期未能 / 培育出一个具有韧性的本土林业部门。"
  },
  '2:1': {
    slashed_text: "Forestry bodies are urgently calling / for a decisive reduction / in the nation's overwhelming reliance on timber imports.",
    chunk_translation: "林业机构正紧急呼吁 / 采取果断措施减少 / 该国对木材进口的过度依赖。"
  },
  '2:2': {
    slashed_text: "Currently , Britain imports more than eighty percent of its construction timber , / a staggering proportion / that leaves housebuilders dangerously vulnerable / to international price fluctuations / and geopolitical supply shocks.",
    chunk_translation: "目前，英国80%以上的建筑木材依赖进口， / 这一惊人的比例 / 让房屋建造商处于极其脆弱的境地， / 极易受到国际价格波动 / 和地缘政治供应冲击的影响。"
  },
  '2:3': {
    slashed_text: "To avert an impending supply breakdown , / industry executives argue / that mandatory requirements for using home-grown timber / in low-carbon housing must be introduced.",
    chunk_translation: "为了避免迫在眉睫的供应断裂， / 行业高管认为， / 必须引入在低碳住房中 / 使用本土种植木材的强制性要求。"
  },
  '2:4': {
    slashed_text: "Fresh financial incentives are essential / to motivate private landowners / to invest in domestic commercial woodland.",
    chunk_translation: "新的财政激励措施至关重要， / 以便激励私人土地所有者 / 投资于本土商业林地。"
  },
  '2:5': {
    slashed_text: "Timber is an unparalleled carbon-storing material , / and expanding sustainably managed domestic forests / would simultaneously accelerate Britain's net-zero strategy / and generate durable wealth for the struggling rural economy.",
    chunk_translation: "木材是一种无可比拟的储碳材料， / 扩大可持续管理的本土森林面积， / 既能推进英国的净零排放战略， / 又能为举步维艰的农村经济创造持久的财富。"
  },
  '2:6': {
    slashed_text: "However , commercial tree planting faces stubborn institutional hurdles / and cultural resistance.",
    chunk_translation: "然而，商业植树面临着顽固的制度障碍 / 和文化阻力。"
  },
  '2:7': {
    slashed_text: "Landowners frequently encounter tangled planning regulations / and lengthy bureaucratic delays / when attempting to afforest their estates.",
    chunk_translation: "土地所有者经常遭遇复杂的规划法规 / 和漫长的官僚拖延， / 当试图在自己的地产上植树造林时。"
  },
  '2:8': {
    slashed_text: "Furthermore , productive commercial conifers are burdened / by outdated public perceptions / that equate productive timber forests with ecological decimation , / despite evidence that modern certified forests harbor rich wildlife / and even protect endangered species like the native red squirrel.",
    chunk_translation: "此外，高产的商业针叶树林还背负着 / 过时的公众偏见， / 这些偏见将木材林与生态破坏画上等号， / 尽管有证据表明现代认证森林蕴育着丰富的野生动物， / 甚至保护着像本土红松鼠这样的濒危物种。"
  },
  '2:9': {
    slashed_text: "The situation is further complicated / by a polarizing clash / between timber production and radical rewilding campaigns.",
    chunk_translation: "这一局面由于两极分化的冲突 / 而进一步复杂化， / 即木材生产与激进的再野化运动之间的冲突。"
  },
  '2:10': {
    slashed_text: "Many environmental groups advocate exclusively for biodiversity-focused native broadleaf restoration , / viewing commercial forestry as an unwelcome intrusion.",
    chunk_translation: "许多环保组织专门倡导恢复以生物多样性为重点的本土阔叶林， / 将商业林业视为不受欢迎的侵扰。"
  },
  '2:11': {
    slashed_text: "Forestry leaders argue / that this either-or dichotomy is fundamentally misguided : / commercial timber and ecological conservation are complementary partners , / not irreconcilable adversaries.",
    chunk_translation: "林业领袖们认为， / 这种非此即彼的二元对立从根本上是被误导的： / 商业木材与生态保护是相辅相成的伙伴， / 而不是不可调和的对手。"
  },
  '2:12': {
    slashed_text: "Without coherent government leadership / to bridge these conflicting aspirations , / Britain will remain shackled / to foreign supply chains.",
    chunk_translation: "如果没有政府统筹有力的领导 / 来调和这些冲突诉求， / 英国将继续受制于 / 外国供应链。"
  },
  '2:13': {
    slashed_text: "Ministers must articulate a holistic national land-use framework / that integrates timber self-sufficiency / into wider climate targets.",
    chunk_translation: "部长们必须明确一个全面的国家土地利用框架， / 将木材自给自足 / 纳入更广泛的气候目标之中。"
  },
  '2:14': {
    slashed_text: "Only by harmonizing commercial output / with environmental stewardship / can the country secure the foundational materials / required to build a green economy on home ground.",
    chunk_translation: "唯有将商业产出 / 与环境管理协调起来， / 该国才能确保获得基础原材料， / 用于在本土建立绿色经济。"
  },

  // ================= TEXT 3 =================
  '3:0': {
    slashed_text: "As the global population ages rapidly , / governments and medical associations are wrestling / with a deeply sensitive public safety challenge : / when and how to convince older drivers / to turn over their car keys.",
    chunk_translation: "随着全球人口迅速老龄化， / 政府和医学协会正在应对 / 一项高度敏感的公共安全挑战： / 何时以及如何说服老年驾驶员 / 交出车钥匙。"
  },
  '3:1': {
    slashed_text: "While mobility represents independence and self-worth , / severe physical or cognitive impairments in elderly motorists / pose a substantial risk to road users.",
    chunk_translation: "尽管出行能力代表着独立与自我价值， / 但老年驾驶员严重的身体或认知损伤 / 却对道路使用者构成了巨大风险。"
  },
  '3:2': {
    slashed_text: "Consequently , a growing number of jurisdictions are debating / whether physicians should be legally mandated / to notify motor vehicle licensing authorities / when patients suffer from conditions that impair safe driving.",
    chunk_translation: "因此，越来越多的司法管辖区正在争论， / 是否应依法强制要求医生 / 通知机动车驾驶证管理部门， / 当患者患有损害安全驾驶的疾病时。"
  },
  '3:3': {
    slashed_text: "For doctors , however , / mandatory reporting creates a painful ethical minefield.",
    chunk_translation: "然而对医生而言， / 强制报告造成了痛苦的伦理雷区。"
  },
  '3:4': {
    slashed_text: "The cornerstone of the doctor-patient relationship / has long been absolute confidentiality.",
    chunk_translation: "医患关系的基石 / 长期以来一直是绝对保密。"
  },
  '3:5': {
    slashed_text: "If senior patients realize / that candidly disclosing lapses in vision , sudden memory blackouts , or chronic neurological tremors / might result in the immediate forfeiture of their driving privileges , / many will simply conceal their symptoms / or avoid seeing a doctor altogether.",
    chunk_translation: "如果老年患者意识到， / 如实透露视力减退、突发性记忆缺失或慢性神经性震颤 / 可能会导致立即被剥夺驾驶资格， / 许多人就会直接隐瞒病情， / 或者干脆完全避免就医看病。"
  },
  '3:6': {
    slashed_text: "In attempting to eliminate traffic hazards , / coercive laws might inadvertently inflict / far graver health damage on vulnerable seniors.",
    chunk_translation: "在试图消除交通隐患的过程中， / 强制性法律可能会无意中造成 / 对脆弱老年人群体更严重的健康伤害。"
  },
  '3:7': {
    slashed_text: "Furthermore , medical professionals emphasize / that chronological age alone / is an unreliable proxy / for driving competence.",
    chunk_translation: "此外，医疗专业人士强调， / 单凭生理年龄 / 并不是衡量驾驶能力的 / 可靠指标。"
  },
  '3:8': {
    slashed_text: "Aging affects individuals unevenly : / an octogenarian may possess exceptional reflexes , / while a much younger driver might suffer from debilitating fatigue / or substance abuse.",
    chunk_translation: "衰老对每个人的影响并不均衡： / 一位八十多岁的老人可能拥有出色的反应能力， / 而一位年轻得多的驾驶员却可能遭受极度疲劳 / 或药物滥用的困扰。"
  },
  '3:9': {
    slashed_text: "Rather than burdening individual clinicians / with conflicting policing roles , / experts suggest that state licensing bureaus should implement standardized , objective testing protocols — / such as mandatory on-road assessments and specialized reaction tests — / for all drivers seeking license renewals / beyond a specified age threshold.",
    chunk_translation: "与其让当事医生承受 / 冲突的执法者角色负担， / 专家建议各州车管部门应推行标准化、客观的测试规程—— / 诸如强制路考和专项反应能力测试—— / 针对所有寻求换领驾照的驾驶员， / 只要超过规定的年龄门槛。"
  },
  '3:10': {
    slashed_text: "Technological advancements / also offer promising alternatives / to abrupt license revocation.",
    chunk_translation: "技术的进步 / 也提供了充满希望的替代方案， / 避免突然吊销驾照。"
  },
  '3:11': {
    slashed_text: "Automotive engineers are actively designing adaptive driver-assistance systems / and advanced sensors / that can monitor driver alertness , / correct unintentional lane departures , / and automatically apply emergency braking / when collisions are imminent.",
    chunk_translation: "汽车工程师正在积极设计自适应辅助驾驶系统 / 和先进传感器， / 能够监测驾驶员的警觉状态， / 纠正无意的车道偏离， / 并在发生碰撞在即时 / 自动实施紧急制动。"
  },
  '3:12': {
    slashed_text: "Looking forward , / the maturation of autonomous vehicles / promises to comfortably resolve the tension / between public road safety and personal freedom , / allowing aging seniors to retain seamless mobility / without ever touching a steering wheel.",
    chunk_translation: "展望未来， / 自动驾驶汽车的成熟 / 有望妥善化解这种紧张关系， / 即在公共道路安全与个人自由之间， / 让老年人无需触碰方向盘 / 就能保持顺畅的出行能力。"
  },
  '3:13': {
    slashed_text: "Until autonomous transportation becomes universally accessible , / however , / society must adopt a compassionate , multifaceted strategy.",
    chunk_translation: "然而，在自动驾驶交通工具普惠普及之前， / 社会必须采取兼顾关怀 / 与多维度的综合策略。"
  },
  '3:14': {
    slashed_text: "Addressing senior driving requires replacing fragmented , piecemeal mandates / with collaborative community transit solutions , / subsidized ride-sharing programs , / and objective functional evaluations.",
    chunk_translation: "解决老年人驾驶问题需要取代零散片面的行政命令， / 转向社区协同公共交通方案、 / 补贴拼车出行项目 / 以及客观的功能评估。"
  },
  '3:15': {
    slashed_text: "True road safety / should never be achieved / by converting trusted healthcare healers / into reluctant law enforcement proxies.",
    chunk_translation: "真正的道路安全 / 绝不应当通过 / 将值得信赖的医护救治者 / 变成不情愿的执法代理人来实现。"
  },

  // ================= TEXT 4 =================
  '4:0': {
    slashed_text: "Millions of health-conscious consumers today / take advantage of connected fitness trackers and wellness applications / to keep track of their sleep patterns , / heart rates , / and mental well-being.",
    chunk_translation: "当今数百万注重健康的消费者 / 利用联网的健康运动追踪器和健康类应用 / 来记录自己的睡眠模式、 / 心率 / 以及心理健康状况。"
  },
  '4:1': {
    slashed_text: "However , while users readily input a great deal of intimate biometric data / into these digital devices , / few realize / that existing legal frameworks fail to safeguard their privacy.",
    chunk_translation: "然而，尽管用户欣然将大量私密的生物特征数据输入 / 这些数字化设备中， / 却很少有人意识到 / 现有的法律框架未能有效保障他们的隐私。"
  },
  '4:2': {
    slashed_text: "Most consumers assume their health metrics enjoy comprehensive legal shields , / yet the reality is / that non-clinical health data / remains largely exposed / to unregulated commercial exploitation.",
    chunk_translation: "大多数消费者假定自己的健康指标受到全面的法律保护， / 但现实却是， / 非临床健康数据 / 基本上暴露于 / 未受监管的商业化利用之中。"
  },
  '4:3': {
    slashed_text: "This dangerous vulnerability / stems primarily / from the narrow scope of traditional legislation.",
    chunk_translation: "这种危险的漏洞脆弱性 / 主要源于 / 传统法律条文适用的狭隘范围。"
  },
  '4:4': {
    slashed_text: "In the United States , / the venerable Health Insurance Portability and Accountability Act (HIPAA) / strictly restricts / how hospitals , clinics , and insurance companies manage medical records.",
    chunk_translation: "在美国， / 具有悠久历史的《健康保险可携性与责任法案》（HIPAA） / 严格限制了 / 医院、诊所和保险公司管理医疗记录的方式。"
  },
  '4:5': {
    slashed_text: "Crucially , however , / HIPAA was drafted / long before the dawn of the smartphone era.",
    chunk_translation: "然而至关重要的一点是， / 该法案起草的时间 / 远在智能手机时代来临之前。"
  },
  '4:6': {
    slashed_text: "Because wearable manufacturers and app developers / are not considered 'covered medical entities' / under the statute , / they operate in a legal gray zone , / freely analyzing and monetizing sensitive user data / without explicit consent.",
    chunk_translation: "由于可穿戴设备制造商和应用程序开发商 / 不被视为“受保护的医疗实体” / 在该法规的管辖下， / 他们在法律灰色地带运作， / 随意分析敏感用户数据并将其变现， / 而无需取得用户的明示同意。"
  },
  '4:7': {
    slashed_text: "Regulators are belatedly attempting / to rein in these pervasive abuses.",
    chunk_translation: "监管机构迟延地试图 / 遏制这些普遍存在的滥用行为。"
  },
  '4:8': {
    slashed_text: "The Federal Trade Commission (FTC) recently concluded / high-profile investigations / alleging that prominent fertility tracking platforms / shared users' sensitive menstrual cycles / and ovulation dates / with third-party advertisers.",
    chunk_translation: "美国联邦贸易委员会（FTC）近期结束了 / 引人注目的调查， / 指控知名的经期追踪平台 / 将用户敏感的月经周期 / 和排卵日期 / 共享给了第三方广告商。"
  },
  '4:9': {
    slashed_text: "By issuing stern consent orders , / the commission mandated deceptive firms / to purge illicitly gathered databases / and prohibited future disclosures / without express affirmative consent , / signaling a more aggressive regulatory posture / toward digital health brokers.",
    chunk_translation: "通过发布严厉的同意令， / 该委员会勒令具有欺诈行为的公司 / 清除违规收集的数据库， / 并禁止未来在未经明示肯定同意的情况下披露数据， / 这一举措标志着 / 针对数字健康数据经纪人 / 采取了更加积极严厉的监管姿态。"
  },
  '4:10': {
    slashed_text: "Yet enforcement actions alone cannot compensate / for the absence / of comprehensive federal privacy legislation.",
    chunk_translation: "然而仅靠执法行动无法弥补 / 缺少 / 全面联邦隐私立法的空白。"
  },
  '4:11': {
    slashed_text: "Critics contend that / ad-hoc FTC settlements / merely slap wrist penalties / on bad actors / after catastrophic privacy violations / have already occurred.",
    chunk_translation: "批评人士主张， / 联邦贸易委员会临时的和解协议 / 仅仅是隔靴搔痒般的轻微处罚， / 施加给不良违规者， / 在灾难性的隐私侵犯事件 / 已经发生之后。"
  },
  '4:12': {
    slashed_text: "In the absence of an overarching digital rights statute , / users are left with / the impossible burden / of deciphering impenetrable terms-of-service agreements / that bury data-sharing clauses / under mountains of legal jargon.",
    chunk_translation: "在缺乏具有统领性的数字权利法规的情况下， / 用户不得不承担 / 这一不可能完成的沉重负担： / 解读难以理解的服务条款协议， / 这些协议将数据共享条款 / 掩埋在堆积如山的法律术语之下。"
  },
  '4:13': {
    slashed_text: "True protection requires / enacting modern laws / that recognize biometric and wellness metrics / as sensitive human data / by default.",
    chunk_translation: "真正的保护需要 / 制定现代法律， / 将生物特征和健康指标 / 认定为敏感的个人数据， / 在默认情况下。"
  },
  '4:14': {
    slashed_text: "Policymakers must shift the responsibility / away from individual consumers / and directly onto commercial entities / by restricting secondary data monetization , / enforcing strict data minimization standards , / and holding tech executives legally accountable / for breaches.",
    chunk_translation: "政策制定者必须将责任 / 从个体消费者身上移开， / 直接落实到商业实体身上， / 通过限制次级数据商业化变现、 / 推行严格的数据最小化标准， / 并追究科技高管的法律责任 / 对于违规泄露行为。"
  },
  '4:15': {
    slashed_text: "Until consumer wearables are governed / by the same ethical rigor / as clinical medicine , / personal health autonomy / will remain / an empty illusion.",
    chunk_translation: "直到消费级可穿戴设备 / 受到同样严格的伦理规范监管 / 就像临床医学一样， / 个人健康自主权 / 就将始终 / 是一场空洞的幻象。"
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
console.log(`Successfully refined 2024.json! Applied ${appliedCount} sentence fixes across 61 sentences.`);
