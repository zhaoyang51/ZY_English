# ZY_English · 英语阅读精读与复盘

原生 HTML / CSS / JavaScript 静态学习平台。当前项目收录 2010—2026 年共 68 篇阅读材料，提供做题、阅读复盘和词汇管理。

[在线使用](https://zhaoyang51.github.io/ZY_English/)

## 复盘模式：以阅读讲解为中心

1. **重点词汇**：语境释义、原文或题项出处、搭配与辨析；保留卡片、表格及收藏。
2. **逐句精读**：原句、主干速览、意群与译文、句法和篇章逻辑说明。
3. **题目复盘**：直接展示答案、题型说明、定位证据、同义对应和选项偏差。
4. **语篇逻辑**：全文主旨、各段功能与衔接、小标题对应关系及理由，不要求重新选择答案。
5. **写作表达**：原文依据与教学改写分开呈现，说明搭配、使用范围、句式和例句，支持分类与复制。

复盘无需重新答题、填写笔记或完成任务解锁。原有做题模式仍独立保留。可导出五部分 Markdown 讲义或 Anki 词汇。

## 内容维护与验证

年度数据位于 `data/YYYY.json`，修改后同步首页数据包：

```sh
node scripts/build-data.cjs
node --test tests/review-content.test.cjs
```

浏览器检查使用独立无头 Chrome，不操作用户浏览器；需要 Node 22+ 及 Chrome/Chromium，可通过 `REVIEW_CHROME_PATH` 指定路径：

```sh
node tests/browser-reading.cjs
```

推送 `main` 后由 GitHub Actions 验证并部署至 GitHub Pages。

本轮通用显示和数据验证覆盖 68 篇，人工内容修订重点为 2024—2026 年 12 篇及部分早期篇目。修订依据是项目内英文全文，尚未完成所有材料与官方试卷的逐篇真实性核验。详细范围见[复盘内容优化计划](docs/REVIEW_CONTENT_PLAN.md)。
