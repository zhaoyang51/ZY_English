const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function loadYear(y) {
  const file = path.join(root, `data/${y}.json`);
  return { file, data: JSON.parse(fs.readFileSync(file, 'utf8')) };
}

function saveYear(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

function updateParagraph(textObj, pIdx) {
  const p = textObj.paragraphs[pIdx];
  if (!p) return;
  const sents = textObj.sentences.filter(s => s.pid === pIdx);
  p.slashed_text = sents.map(s => s.slashed_text).filter(Boolean).join(' / ');
  p.chunk_translation = sents.map(s => s.chunk_translation).filter(Boolean).join(' / ');
}

// 1. 2014
{
  const { file, data } = loadYear(2014);
  const sent = data.texts[0].sentences[9]; // Text 1, sid: 9
  sent.slashed_text = 'This slim volume is packed / with tips to help wage slaves as well as lottery winners get the most “happiness bang / for your buck .” / It seems most people would be better off / if they could shorten their commutes to work , / spend more time / with friends and family and less of it watching television / (something the average American spends a whopping two months a year doing , / and is hardly jollier for it) .';
  sent.chunk_translation = '这本轻薄的书满载着 / 各种实用建议，帮助工薪族和中奖者获得最大的“快乐性价比—— / 每一分钱带来的幸福回报”。 / 似乎大多数人的生活都会更美好， / 如果他们能缩短上下班通勤时间， / 花更多时间 / 陪伴家人和朋友，并减少看电视的时间 / （美国人平均每年花整整两个月的时间看电视， / 而且并没有因此感到更快乐）。';
  updateParagraph(data.texts[0], sent.pid);
  saveYear(file, data);
  console.log('Fixed 2014 Text 1 s9');
}

// 2. 2015
{
  const { file, data } = loadYear(2015);
  // Text 1 sid: 4 (User reported bug)
  const s1_4 = data.texts[0].sentences[4];
  s1_4.slashed_text = '“It is men , / not women , / who report being happier / at home than at work .” / Another surprise is / that the findings hold true / for both those / with children and without , / but more so / for nonparents .';
  s1_4.chunk_translation = '“正是男性， / 而非女性， / 报告称感到更快乐 / 在家里相比在工作中。” / 另一项令人意外的发现是， / 这些研究结果同样适用 / 于两类人群， / 无论是有孩子的人还是没有孩子的人， / 但这种现象更为明显 / 对于没有孩子的人来说。';
  updateParagraph(data.texts[0], s1_4.pid);

  // Text 2 sid: 4
  const s2_4 = data.texts[1].sentences[4];
  s2_4.slashed_text = 'But the article is actually quite optimistic , / as it outlines a potential solution to this problem , / suggesting that an approach / (which involves a one-hour , next-to-no-cost program) / can close 63 percent of the achievement gap / (measured by such factors as grades) / between first-generation and other students .';
  s2_4.chunk_translation = '但这篇文章实际上相当乐观， / 因为它概述了该问题的一个潜在解决方案， / 表明一种方法 / （该方法涉及一项耗时一小时、几乎无成本的方案） / 能够缩小63%的学业成绩差距 / （通过学业成绩等指标衡量） / 在第一代大学生与其他学生之间。';
  s2_4.translation = '但这篇文章实际上相当乐观，因为它概述了该问题的一个潜在解决方案，表明一种方法（该方法涉及一项耗时一小时、几乎无成本的方案）能够缩小第一代大学生与其他学生之间63%的学业成绩差距（通过学业成绩等指标衡量）。';
  updateParagraph(data.texts[1], s2_4.pid);

  // Text 2 sid: 7
  const s2_7 = data.texts[1].sentences[7];
  s2_7.slashed_text = 'Most of the first-generation students (59.1 percent) were recipients of Pell Grants , / a federal grant / for undergraduates with financial need , / while this was true only for 8.6 percent of the students / with at least one parent with a four-year degree .';
  s2_7.chunk_translation = '大多数第一代大学生（59.1%）是佩尔助学金的获得者， / 这是一项联邦助学金， / 资助有经济困难的本科生， / 而这一比例在那些学生中仅为8.6%， / 针对父母中至少有一位拥有四年制学位的群体。';
  s2_7.translation = '大多数第一代大学生（59.1%）是佩尔助学金（一项针对有经济困难本科生的联邦助学金）的获得者，而在父母中至少有一位拥有四年制学位的学生中，这一比例仅为8.6%。';
  updateParagraph(data.texts[1], s2_7.pid);

  saveYear(file, data);
  console.log('Fixed 2015 Text 1 s4, Text 2 s4, s7');
}

// 3. 2016
{
  const { file, data } = loadYear(2016);
  // Text 3 sid: 3
  const s3_3 = data.texts[2].sentences[3];
  s3_3.slashed_text = 'The web’s full of articles offering tips / on making time to read : / “Give up TV” or “Carry a book with you at all times .” / But in my experience , / using such methods to free up the odd 30 minutes / doesn’t work .';
  s3_3.chunk_translation = '网络上充斥着提供建议的文章， / 关于如何挤出时间用来阅读： / “戒掉电视”或者“随身带一本书”。 / 但依我的经验， / 使用这类方法去腾出零碎的30分钟 / 是行不通的。';
  s3_3.translation = '网络上充斥着提供如何挤出时间阅读的建议文章：“戒掉电视”或“随身带一本书”。但依我的经验，使用这类方法去腾出零碎的30分钟是行不通的。';
  updateParagraph(data.texts[2], s3_3.pid);

  // Text 3 sid: 5
  const s3_5 = data.texts[2].sentences[5];
  s3_5.slashed_text = 'The modern mind , / Tim Parks , / a novelist and critic , / writes , / “is overwhelmingly inclined toward communication … It is not simply / that one is interrupted ; / it is / that one is actually inclined to interruption .” / Deep reading requires not just time , / but a special kind of time / which can’t be obtained merely / by becoming more efficient .';
  s3_5.chunk_translation = '现代人的心智， / 蒂姆·帕克斯， / 一位小说家兼评论家， / 写道， / “具有极其强烈的交流沟通倾向……这不仅仅在于 / 一个人会被打断； / 而在于 / 一个人实际上主动倾向于被打断。” / 深度阅读需要的不仅仅是时间， / 而是一种特别的时间， / 这种时间是无法仅仅通过 / 变得更加高效而获取的。';
  updateParagraph(data.texts[2], s3_5.pid);

  saveYear(file, data);
  console.log('Fixed 2016 Text 3 s3, s5');
}

// 4. 2017
{
  const { file, data } = loadYear(2017);
  // Text 1 sid: 13
  const s1_13 = data.texts[0].sentences[13];
  s1_13.slashed_text = 'Official retrospections continue / as to why London 2012 failed to “inspire a generation .” / The success of Parkrun / offers answers .';
  s1_13.chunk_translation = '官方的反思仍在继续， / 关于为何2012年伦敦奥运会未能“激励一代人”。 / 公园跑（Parkrun）的成功 / 提供了答案。';
  s1_13.translation = '关于为何2012年伦敦奥运会未能“激励一代人”的官方反思仍在继续。公园跑（Parkrun）的成功提供了答案。';
  updateParagraph(data.texts[0], s1_13.pid);

  // Text 2 sid: 3 quote fix
  const s2_3 = data.texts[1].sentences[3];
  s2_3.chunk_translation = '”';
  updateParagraph(data.texts[1], s2_3.pid);

  saveYear(file, data);
  console.log('Fixed 2017 Text 1 s13, Text 2 s3');
}

// 5. 2019
{
  const { file, data } = loadYear(2019);
  // Text 4 sid: 12
  const s4_12 = data.texts[3].sentences[12];
  s4_12.slashed_text = 'India has just announced / it will “eliminate all single-use plastic in the country by 2022 .” / There are also incentive-based ways / of making better environmental choices easier , / such as ensuring recycling is / at least as easy as trash disposal .';
  s4_12.chunk_translation = '印度刚刚宣布 / 将于“2022年前在全国范围内消除所有一次性塑料制品”。 / 此外还存在基于激励的方法， / 让人们更容易做出环保的选择， / 例如确保垃圾回收 / 至少与倾倒垃圾一样方便。';
  updateParagraph(data.texts[3], s4_12.pid);

  saveYear(file, data);
  console.log('Fixed 2019 Text 4 s12');
}

// 6. 2020
{
  const { file, data } = loadYear(2020);
  // Text 2 sid: 5
  const s2_5 = data.texts[1].sentences[5];
  s2_5.slashed_text = 'Today’s CEO , / at least / for major American firms , / must have many more skills / than simply being able to “run the company .” / CEOs must have a good sense of financial markets / and maybe even how the company should trade / in them .';
  s2_5.chunk_translation = '当今的首席执行官， / 至少 / 对于美国大企业而言， / 必须掌握更多的技能， / 远不止于仅仅能够“管理公司”。 / 首席执行官必须对金融市场有敏锐的洞察力， / 甚至还要精通公司应如何参与 / 金融市场的交易运作。';
  updateParagraph(data.texts[1], s2_5.pid);

  saveYear(file, data);
  console.log('Fixed 2020 Text 2 s5');
}

// 7. 2022
{
  const { file, data } = loadYear(2022);
  // Text 3 sid: 13
  const s3_13 = data.texts[2].sentences[13];
  s3_13.slashed_text = 'In March , / the California Attorney General announced the approval of additional regulations / under the California Consumer Privacy Act (CCPA) / that “ensure / that consumers will not be confused or misled / when seeking to exercise their data privacy rights .” / The regulations aim to ban dark patterns — / this means prohibiting companies / from using “confusing language or unnecessary steps / such as forcing them to click through multiple screens / or listen to reasons why they shouldn’t opt out .”';
  s3_13.chunk_translation = '在三月份， / 加州总检察长宣布批准了补充规章， / 依据《加州消费者隐私法案》（CCPA）， / 旨在“确保 / 消费者不会受到困惑或误导 / 在行使其数据隐私权利时。” / 这些规章旨在禁止黑暗模式—— / 这意味着禁止企业 / 使用“混淆性语言或不必要的步骤， / 例如强迫用户点击跳转多个界面， / 或听取他们不应选择退出的说辞。”';
  s3_13.translation = '三月份，加州总检察长宣布批准了《加州消费者隐私法案》（CCPA）项下的补充规章，旨在“确保消费者在行使其数据隐私权利时不会受到困惑或误导。”这些规章旨在禁止黑暗模式——这意味着禁止企业使用“混淆性语言或不必要的步骤，例如强迫用户点击跳转多个界面，或听取他们不应选择退出的说辞。”';
  updateParagraph(data.texts[2], s3_13.pid);

  saveYear(file, data);
  console.log('Fixed 2022 Text 3 s13');
}

// 8. 2023
{
  const { file, data } = loadYear(2023);
  // Text 3 sid: 8
  const s3_8 = data.texts[2].sentences[8];
  s3_8.slashed_text = 'In a very practical way , / the Internet is becoming an external hard drive for our memories , / a process known as “cognitive offloading .” / Traditionally , / this role was fulfilled / by data banks , / libraries , / and other humans .';
  s3_8.chunk_translation = '在非常切实的意义上， / 互联网正在成为我们记忆的外部硬盘， / 这一过程被称为“认知卸载”。 / 在传统时代， / 这一角色主要是由 / 资料库、 / 图书馆 / 以及其他人来承担的。';
  updateParagraph(data.texts[2], s3_8.pid);

  // Text 3 sid: 14 translation fix
  const s3_14 = data.texts[2].sentences[14];
  s3_14.translation = '例如，心理学家克里斯托弗·查布里斯和丹尼尔·J·写道，目前尚无确凿的实验证据表明互联网干扰了我们的专注力。';

  // Text 4 sid: 4 translation fix
  const s4_4 = data.texts[3].sentences[4];
  s4_4.translation = '但与此同时，曾经温顺听话的孩童也蜕变为了桀骜不驯、热衷冒险的叛逆少年。';

  // Text 4 sid: 13 translation fix
  const s4_13 = data.texts[3].sentences[13];
  s4_13.translation = '相比年幼儿童或成年人，青少年更倾向于报告自己曾做出诸如无私帮助朋友等亲社会行为。';

  // Text 4 sid: 18
  const s4_18 = data.texts[3].sentences[18];
  s4_18.slashed_text = 'One idea is / that teenage behavior is related to what researchers call “reward sensitivity .” / Decision-making always involves / balancing rewards and risks , / benefits and costs .';
  s4_18.chunk_translation = '一种观点是， / 青少年的行为与研究人员所谓的“奖励敏感性”相关。 / 决策制定始终涉及到 / 权衡回报与风险， / 以及收益与代价。';
  updateParagraph(data.texts[3], s4_18.pid);

  saveYear(file, data);
  console.log('Fixed 2023 Text 3 s8, s14, Text 4 s4, s13, s18');
}

console.log('ALL FIXES APPLIED SUCCESSFULLY!');
