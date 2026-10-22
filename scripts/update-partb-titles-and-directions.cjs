const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');

const directionsTranslations = {
  true_false: '阅读下列短文，并判断各项陈述的正误。若陈述符合原文，选 T（正确）；若不符合，选 F（错误）。请将答案填涂在答题卡 1 上。（共 10 分）',
  multiple_matching: '阅读下列短文，将左栏中编号的项目与右栏中对应的信息进行配对。右栏中有两个多余选项。请将答案填涂在答题卡上。（共 10 分）',
  heading_matching: '阅读下列短文，从选项 A-G 中为编号段落（41-45）选出最合适的小标题。选项中有两个多余的小标题无需使用。请将答案填涂在答题卡上。（共 10 分）'
};

const articleTitles = {
  2010: {
    title: 'Copying Birds May Save Aircraft Fuel',
    title_cn: '仿鸟飞行或可节省客机燃油'
  },
  2015: {
    title: 'Some Old Truths to Help You Overcome Tough Times',
    title_cn: '助你渡过难关的人生箴言'
  },
  2016: {
    title: 'Act Your Shoe Size, Not Your Age',
    title_cn: '活出你的童心，而不是你的实际岁数'
  },
  2018: {
    title: 'Five ways to make conversation with anyone',
    title_cn: '无论与谁交谈都能侃侃而谈的五种沟通法'
  },
  2020: {
    title: 'Five Ways to Win Over Everyone in the Office',
    title_cn: '职场中赢得所有人好感的五大法则'
  },
  2021: {
    title: 'How to disagree with someone more powerful than you',
    title_cn: '如何与比你更有权势的人得体地表达不同意见'
  },
  2022: {
    title: 'How to Get Active Again',
    title_cn: '如何科学重拾运动活力'
  },
  2023: {
    title: 'Net-Zero Rules Set to Send Cost of New Homes and Extensions Soaring',
    title_cn: '净零碳排放新规或将导致新建房屋及扩建成本大幅飙升'
  },
  2025: {
    title: "Five Steps to Suggesting a Change at Work That'll Actually Get Taken Seriously",
    title_cn: '在工作中提出革新建议并真正获得重视的五个步骤——如何让你的好点子不再石沉大海'
  }
};

for (let y = 2010; y <= 2026; y++) {
  const filePath = path.join(dataDir, `${y}.json`);
  if (!fs.existsSync(filePath)) continue;
  const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const pb = d.part_b;
  if (!pb) continue;

  // 1. Directions Translation
  pb.directions_cn = directionsTranslations[pb.subtype] || directionsTranslations.multiple_matching;

  // 2. Article Title & is_title marking
  if (articleTitles[y]) {
    pb.article_title = articleTitles[y].title;
    pb.article_title_cn = articleTitles[y].title_cn;

    if (y === 2010) {
      // 2010 had title concatenated with p[0] body
      if (pb.paragraphs && pb.paragraphs[0]) {
        let p0Text = pb.paragraphs[0].text || '';
        let p0Trans = pb.paragraphs[0].translation || '';
        p0Text = p0Text.replace(/^Copying Birds May Save Aircraft Fuel\s*\n?/, '').trim();
        p0Trans = p0Trans.replace(/^仿鸟飞行或可节省客机燃油[。，\s]*/, '').trim();
        pb.paragraphs[0].text = p0Text;
        pb.paragraphs[0].translation = p0Trans;
      }
    } else if (y === 2025) {
      // 2025: p[0] is title, p[1] is subtitle
      if (pb.paragraphs && pb.paragraphs[0]) pb.paragraphs[0].is_title = true;
      if (pb.paragraphs && pb.paragraphs[1]) pb.paragraphs[1].is_title = true;
    } else {
      // Other title-bearing years: p[0] is title
      if (pb.paragraphs && pb.paragraphs[0]) {
        pb.paragraphs[0].is_title = true;
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(d, null, 2) + '\n', 'utf8');
  console.log(`Updated Part B in ${y}.json`);
}

console.log('Finished updating data/*.json.');
