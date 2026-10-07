/**
 * generate_vocab_relations.cjs (v2 增强版)
 * 考研英语二（2010-2026）五维单词知识库离线挖掘与编译引擎
 * 1. 形近词 (Lookalikes / Easily Confused Words)
 * 2. 真题词组 (Phrases & Collocations)
 * 3. 考点近义词 (Synonyms)
 * 4. 对立反义词 (Antonyms)
 * 5. 真题原句 (Exam Sentences with Context & Highlighting)
 * 
 * 严格铁律：全部内容 100% 来源于英二历年真题（2010-2026）！
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 开始编译考研英语二五维单词知识库 (v2)...');

// 1. 读取基础词典与词库
const dictRaw = fs.readFileSync('data/vocab_dict.js', 'utf8')
  .replace(/^window\.KAOYAN_VOCAB_DICT\s*=\s*/, '')
  .replace(/;\s*$/, '');
const dict = JSON.parse(dictRaw);

const bankCode = fs.readFileSync('data/vocab_bank.js', 'utf8');
const bankFn = new Function('window', bankCode + '; return window.KAOYAN_VOCAB_BANK || compactVocabData;');
const bank = bankFn({});

// 2. 语料收集
const realExamTokens = new Set(); // 严格字面存在于 2010-2026 真题（文章、选项、完形、翻译、题干）中的所有词汇
for (let y = 2010; y <= 2026; y++) {
  const p = path.join('data', `${y}.json`);
  if (!fs.existsSync(p)) continue;
  const content = fs.readFileSync(p, 'utf8');
  (content.match(/[a-zA-Z]+/g) || []).forEach(w => realExamTokens.add(w.toLowerCase()));
}

const examWords = new Map(); // wordLow -> { word, pos, def, provs: Set, isCore: boolean }
const allExamSentences = []; // 全量句子库: { text, translation, year, textId, prov, sid }
const examPhrases = []; // 全量短语库: { phrase, def, prov, year, textId }
const properNouns = new Set(['adam', 'china', 'america', 'london', 'britain', 'europe', 'obama', 'trump', 'biden', 'clinton', 'google', 'facebook', 'apple', 'amazon', 'twitter', 'netflix', 'youtube', 'texas', 'california', 'york', 'paris', 'oxford', 'cambridge', 'harvard', 'mit', 'japan', 'france', 'germany', 'russia']);

function cleanDef(str) {
  if (!str) return '真题重点考查词汇';
  return str.replace(/^\[.*?\]\s*/, '').replace(/【.*?】/g, '').replace(/\s+/g, ' ').trim();
}

// 注册大纲词典词汇
for (const [w, info] of Object.entries(dict)) {
  const wLow = w.toLowerCase().trim();
  examWords.set(wLow, {
    word: w,
    pos: info.pos || '',
    def: cleanDef(info.def || info.full),
    provs: new Set(),
    isCore: true
  });
}

// 注册重点词库词汇
bank.forEach(([year, text, words]) => {
  const prov = `${year} · ${text}`;
  words.forEach(([w, meaning]) => {
    const rawW = w.trim();
    const wLow = rawW.toLowerCase();
    if (rawW.includes(' ')) {
      examPhrases.push({
        phrase: rawW,
        def: cleanDef(meaning),
        prov,
        year: parseInt(year),
        textId: text
      });
    } else {
      if (!examWords.has(wLow)) {
        examWords.set(wLow, { word: rawW, pos: '', def: cleanDef(meaning), provs: new Set(), isCore: true });
      } else {
        examWords.get(wLow).isCore = true;
      }
      examWords.get(wLow).provs.add(prov);
    }
  });
});

// 扫描 2010-2026 真题文件
for (let y = 2010; y <= 2026; y++) {
  const p = path.join('data', `${y}.json`);
  if (!fs.existsSync(p)) continue;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  // 阅读理解
  if (data.texts) {
    data.texts.forEach(t => {
      const textId = t.text_id;
      const prov = `${y} 年 · Text ${textId}`;

      (t.sentences || []).forEach((s, idx) => {
        if (!s.text) return;
        const sentObj = {
          text: s.text.trim(),
          translation: (s.translation || '').trim(),
          year: y,
          textId: textId,
          prov: prov,
          sid: s.sid !== undefined ? s.sid : idx
        };
        allExamSentences.push(sentObj);

        const tokens = s.text.match(/[a-zA-Z]+/g) || [];
        tokens.forEach(tk => {
          const tkLow = tk.toLowerCase();
          if (tkLow.length < 2) return;
          if (!examWords.has(tkLow)) {
            examWords.set(tkLow, { word: tk, pos: '', def: '真题考点重点词汇', provs: new Set(), isCore: false });
          }
          examWords.get(tkLow).provs.add(prov);
        });
      });

      // 段落词汇与词组
      (t.paragraphs || []).forEach(pg => {
        (pg.vocabulary || []).forEach(v => {
          const rawW = (v.word || '').trim();
          const def = cleanDef(v.definition || '');
          if (!rawW || rawW.startsWith('【')) return;
          if (rawW.includes(' ') && rawW.split(/\s+/).length <= 6) {
            examPhrases.push({
              phrase: rawW,
              def: def,
              prov: prov,
              year: y,
              textId: textId
            });
          } else {
            const wLow = rawW.toLowerCase();
            if (!examWords.has(wLow)) {
              examWords.set(wLow, { word: rawW, pos: v.pos || '', def: def, provs: new Set(), isCore: true });
            } else {
              examWords.get(wLow).isCore = true;
              if (def && examWords.get(wLow).def.length < def.length) {
                examWords.get(wLow).def = def;
              }
            }
            examWords.get(wLow).provs.add(prov);
          }
        });
      });
    });
  }

  // 完形填空
  if (data.cloze && data.cloze.paragraphs) {
    data.cloze.paragraphs.forEach(pg => {
      const text = pg.text || '';
      const sents = text.split(/(?<=[.?!])\s+/);
      sents.forEach(s => {
        if (s.trim().length < 15) return;
        const sentObj = {
          text: s.trim(),
          translation: pg.translation || '',
          year: y,
          textId: 'Cloze',
          prov: `${y} 年 · 完形填空`,
          sid: 0
        };
        allExamSentences.push(sentObj);
        (s.match(/[a-zA-Z]+/g) || []).forEach(tk => {
          const tkLow = tk.toLowerCase();
          if (tkLow.length >= 2) {
            if (!examWords.has(tkLow)) {
              examWords.set(tkLow, { word: tk, pos: '', def: '真题考点重点词汇', provs: new Set(), isCore: false });
            }
            examWords.get(tkLow).provs.add(`${y} 年 · 完形填空`);
          }
        });
      });
    });
  }

  // 翻译
  if (data.translation && data.translation.sentences) {
    data.translation.sentences.forEach((s, idx) => {
      const en = (s.en || s.text || '').trim();
      const zh = (s.zh || s.translation || '').trim();
      if (!en) return;
      const sentObj = {
        text: en,
        translation: zh,
        year: y,
        textId: 'Translation',
        prov: `${y} 年 · 翻译`,
        sid: idx
      };
      allExamSentences.push(sentObj);
      (en.match(/[a-zA-Z]+/g) || []).forEach(tk => {
        const tkLow = tk.toLowerCase();
        if (tkLow.length >= 2) {
          if (!examWords.has(tkLow)) {
            examWords.set(tkLow, { word: tk, pos: '', def: '真题考点重点词汇', provs: new Set(), isCore: false });
          }
          examWords.get(tkLow).provs.add(`${y} 年 · 翻译`);
        }
      });
    });
  }
}

console.log(`✅ 真题句子库共 ${allExamSentences.length} 句，短语库共 ${examPhrases.length} 条，词汇总数 ${examWords.size} 个.`);

// 3. 构建高精度的真题词根与屈折映射表 (Stemming Map)
function getBaseStem(w) {
  let s = w.toLowerCase().trim();
  if (s.endsWith('ies') && s.length > 4) return s.slice(0, -3) + 'y';
  if (s.endsWith('ing') && s.length > 5) return s.replace(/ing$/, '');
  if (s.endsWith('ed') && s.length > 4) return s.replace(/ed$/, '');
  if (s.endsWith('es') && s.length > 4) return s.replace(/es$/, '');
  if (s.endsWith('s') && !s.endsWith('ss') && s.length > 3) return s.replace(/s$/, '');
  return s;
}

// 4. 精心挑选的考研高频形近词辨析族群 (Curated Confusables)
const CURATED_LOOKALIKE_CLUSTERS = [
  ['interfere', 'interrupt', 'interpret', 'intervene', 'interact', 'interface'],
  ['adapt', 'adopt', 'adept', 'adjust'],
  ['affect', 'effect'],
  ['access', 'assess', 'excess'],
  ['precede', 'proceed', 'exceed', 'recede', 'succeed'],
  ['stationery', 'stationary'],
  ['principal', 'principle'],
  ['complement', 'compliment'],
  ['confirm', 'conform', 'confine'],
  ['contact', 'contract', 'contrast'],
  ['expand', 'expend', 'extend', 'extent'],
  ['perceive', 'conceive', 'deceive', 'receive'],
  ['inspire', 'aspire', 'expire', 'conspire'],
  ['respect', 'inspect', 'suspect', 'expect', 'prospect', 'retrospect'],
  ['compel', 'impel', 'repel', 'propel'],
  ['attribute', 'contribute', 'distribute'],
  ['statute', 'status', 'stature', 'state'],
  ['counsel', 'council'],
  ['loose', 'lose'],
  ['emigrate', 'immigrate', 'migrate'],
  ['eminent', 'imminent', 'prominent'],
  ['explicit', 'implicit'],
  ['continual', 'continuous'],
  ['considerable', 'considerate'],
  ['sensible', 'sensitive'],
  ['historic', 'historical'],
  ['economic', 'economical'],
  ['electric', 'electrical', 'electronic'],
  ['industrial', 'industrious'],
  ['intellectual', 'intelligent'],
  ['confident', 'confidential'],
  ['incident', 'accident', 'coincidence'],
  ['preserve', 'reserve', 'conserve', 'deserve', 'observe'],
  ['oppose', 'suppose', 'propose', 'impose', 'expose', 'compose', 'dispose'],
  ['consume', 'resume', 'assume', 'presume'],
  ['retain', 'contain', 'attain', 'maintain', 'obtain', 'sustain', 'detain'],
  ['emit', 'admit', 'commit', 'permit', 'submit', 'transmit', 'omit'],
  ['evoke', 'revoke', 'provoke', 'invoke'],
  ['evolve', 'revolve', 'involve', 'resolve', 'dissolve'],
  ['mean', 'means', 'meaning', 'meanwhile'],
  ['convert', 'divert', 'invert', 'revert', 'subvert'],
  ['deduce', 'induce', 'reduce', 'produce', 'introduce', 'seduce'],
  ['ascribe', 'describe', 'prescribe', 'subscribe', 'transcribe'],
  ['persist', 'insist', 'resist', 'assist', 'consist'],
  ['comprehend', 'apprehend', 'reprehend'],
  ['dominate', 'predominate', 'terminate', 'eliminate'],
  ['discreet', 'discrete'],
  ['allude', 'elude', 'delude', 'collude'],
  ['collision', 'collusion'],
  ['illusion', 'delusion', 'allusion'],
  ['ingenious', 'ingenuous'],
  ['persecute', 'prosecute'],
  ['precedent', 'president'],
  ['device', 'devise'],
  ['flourish', 'nourish'],
  ['infect', 'affect', 'defect'],
  ['later', 'latter', 'latest', 'last'],
  ['lay', 'lie'],
  ['moral', 'morale'],
  ['personal', 'personnel'],
  ['physician', 'physicist'],
  ['quite', 'quiet'],
  ['rise', 'raise', 'arise'],
  ['shadow', 'shade'],
  ['strike', 'stroke'],
  ['wander', 'wonder']
];

const curatedLookalikesMap = new Map();
CURATED_LOOKALIKE_CLUSTERS.forEach(cluster => {
  const valid = cluster.filter(w => realExamTokens.has(w.toLowerCase()) && !properNouns.has(w.toLowerCase()));
  valid.forEach(w1 => {
    const w1Low = w1.toLowerCase();
    if (!curatedLookalikesMap.has(w1Low)) curatedLookalikesMap.set(w1Low, new Set());
    valid.forEach(w2 => {
      const w2Low = w2.toLowerCase();
      if (w1Low !== w2Low) curatedLookalikesMap.get(w1Low).add(w2Low);
    });
  });
});

// 编辑距离
function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

function isSameLemma(w1, w2) {
  if (w1 === w2) return true;
  const s1 = getBaseStem(w1);
  const s2 = getBaseStem(w2);
  if (s1 === s2) return true;
  if (s1.startsWith(s2) && s1.length - s2.length <= 2) return true;
  if (s2.startsWith(s1) && s2.length - s1.length <= 2) return true;
  return false;
}

// 5. 考研经典近义词库
const CURATED_SYNONYMS = [
  ['advocate', 'support', 'promote', 'champion', 'uphold', 'endorse'],
  ['decline', 'decrease', 'drop', 'fall', 'diminish', 'downturn'],
  ['interfere', 'disrupt', 'disturb', 'intervene', 'meddle', 'hinder'],
  ['interrupt', 'disrupt', 'disturb', 'suspend', 'break'],
  ['interpret', 'explain', 'clarify', 'decode', 'construe', 'understand'],
  ['crucial', 'essential', 'critical', 'vital', 'key', 'pivotal'],
  ['eliminate', 'remove', 'eradicate', 'abolish', 'discard'],
  ['enhance', 'improve', 'boost', 'strengthen', 'upgrade'],
  ['abandon', 'discard', 'quit', 'desert', 'relinquish'],
  ['alter', 'change', 'modify', 'shift', 'transform'],
  ['compel', 'force', 'oblige', 'require', 'mandate'],
  ['convey', 'express', 'communicate', 'transmit', 'impart'],
  ['diminish', 'reduce', 'lessen', 'decrease', 'shrink'],
  ['dispute', 'controversy', 'debate', 'argument', 'conflict'],
  ['distinct', 'different', 'separate', 'discrete', 'unique'],
  ['dominate', 'control', 'govern', 'rule', 'monopolize'],
  ['drastic', 'radical', 'extreme', 'severe', 'dramatic'],
  ['elaborate', 'detailed', 'complex', 'sophisticated', 'intricate'],
  ['emphasize', 'stress', 'highlight', 'underline', 'accentuate'],
  ['encounter', 'meet', 'face', 'confront', 'experience'],
  ['endure', 'persist', 'withstand', 'bear', 'tolerate'],
  ['evaluate', 'assess', 'appraise', 'judge', 'rate'],
  ['evident', 'obvious', 'apparent', 'clear', 'manifest'],
  ['exceed', 'surpass', 'outperform', 'transcend', 'outstrip'],
  ['expand', 'extend', 'broaden', 'widen', 'enlarge'],
  ['exploit', 'utilize', 'harness', 'employ', 'capitalize'],
  ['feasible', 'practical', 'viable', 'workable', 'achievable'],
  ['flourish', 'thrive', 'prosper', 'boom', 'blossom'],
  ['foster', 'nurture', 'promote', 'encourage', 'cultivate'],
  ['fundamental', 'basic', 'essential', 'underlying', 'elementary'],
  ['generate', 'produce', 'create', 'yield', 'breed'],
  ['hamper', 'hinder', 'impede', 'obstruct', 'block'],
  ['hazard', 'danger', 'risk', 'peril', 'threat'],
  ['highlight', 'emphasize', 'stress', 'spotlight', 'underline'],
  ['identify', 'recognize', 'detect', 'distinguish', 'discern'],
  ['ignore', 'neglect', 'overlook', 'disregard'],
  ['illuminate', 'clarify', 'explain', 'enlighten'],
  ['impact', 'influence', 'effect', 'repercussion'],
  ['impede', 'delay', 'hinder', 'hamper', 'block'],
  ['incentive', 'motivation', 'stimulus', 'inducement', 'encouragement'],
  ['inevitable', 'unavoidable', 'inescapable', 'certain'],
  ['innovative', 'novel', 'creative', 'groundbreaking', 'original'],
  ['insight', 'understanding', 'perception', 'comprehension', 'intuition'],
  ['inspect', 'examine', 'check', 'scrutinize', 'investigate'],
  ['integrate', 'combine', 'merge', 'unite', 'incorporate'],
  ['intense', 'acute', 'severe', 'fierce', 'extreme'],
  ['isolate', 'separate', 'detach', 'segregate', 'insulate'],
  ['justify', 'rationalize', 'validate', 'defend', 'vindicate'],
  ['lucrative', 'profitable', 'rewarding', 'gainful'],
  ['manifest', 'display', 'demonstrate', 'reveal', 'exhibit'],
  ['manipulate', 'control', 'influence', 'maneuver', 'exploit'],
  ['modify', 'alter', 'adjust', 'adapt', 'revise'],
  ['monitor', 'track', 'observe', 'oversee', 'supervise'],
  ['motivate', 'inspire', 'encourage', 'stimulate', 'drive'],
  ['mean', 'means', 'signify', 'indicate', 'imply', 'suggest'],
  ['negotiate', 'bargain', 'confer', 'mediate'],
  ['notable', 'remarkable', 'striking', 'outstanding', 'prominent'],
  ['objective', 'impartial', 'unbiased', 'neutral', 'fair'],
  ['obtain', 'acquire', 'gain', 'get', 'procure'],
  ['obvious', 'evident', 'clear', 'apparent', 'plain'],
  ['occur', 'happen', 'arise', 'take place', 'transpire'],
  ['opponent', 'rival', 'competitor', 'adversary'],
  ['optimistic', 'positive', 'confident', 'hopeful', 'sanguine'],
  ['overlook', 'neglect', 'ignore', 'miss', 'disregard'],
  ['participate', 'join', 'partake', 'engage', 'involve'],
  ['perceive', 'notice', 'sense', 'discern', 'recognize'],
  ['perform', 'execute', 'conduct', 'implement', 'carry out'],
  ['persistent', 'tenacious', 'enduring', 'relentless', 'constant'],
  ['phenomenon', 'occurrence', 'event', 'trend', 'happening'],
  ['plausible', 'reasonable', 'believable', 'credible', 'likely'],
  ['potential', 'possible', 'prospective', 'capability', 'capacity'],
  ['precede', 'predate', 'antecede', 'lead'],
  ['predict', 'forecast', 'foresee', 'anticipate', 'project'],
  ['predominant', 'dominant', 'prevailing', 'primary', 'major'],
  ['preserve', 'protect', 'maintain', 'conserve', 'safeguard'],
  ['prevalent', 'widespread', 'common', 'pervasive', 'dominant'],
  ['primary', 'principal', 'main', 'chief', 'prime'],
  ['priority', 'precedence', 'preference', 'urgency'],
  ['prohibit', 'ban', 'forbid', 'outlaw', 'bar'],
  ['prominent', 'eminent', 'notable', 'conspicuous', 'famous'],
  ['prosperous', 'thriving', 'booming', 'flourishing', 'wealthy'],
  ['pursue', 'chase', 'seek', 'follow', 'strive for'],
  ['radical', 'fundamental', 'drastic', 'revolutionary', 'extreme'],
  ['rational', 'reasonable', 'logical', 'sensible', 'sound'],
  ['reinforce', 'strengthen', 'fortify', 'bolster', 'solidify'],
  ['reluctant', 'unwilling', 'hesitant', 'loath'],
  ['remarkable', 'extraordinary', 'notable', 'impressive', 'striking'],
  ['remedy', 'cure', 'solution', 'treatment', 'fix'],
  ['resolve', 'settle', 'solve', 'determine', 'conclude'],
  ['restrain', 'restrict', 'limit', 'constrain', 'curb'],
  ['reveal', 'disclose', 'uncover', 'expose', 'show'],
  ['reward', 'bonus', 'prize', 'compensation', 'recompense'],
  ['scarce', 'rare', 'insufficient', 'sparse', 'limited'],
  ['scrutinize', 'examine', 'inspect', 'investigate', 'analyze'],
  ['severe', 'harsh', 'grave', 'serious', 'acute'],
  ['shift', 'change', 'alteration', 'move', 'transition'],
  ['significant', 'meaningful', 'important', 'notable', 'momentous'],
  ['simultaneous', 'concurrent', 'coincident', 'synchronous'],
  ['skeptical', 'doubtful', 'suspicious', 'cynical', 'distrustful'],
  ['sophisticated', 'advanced', 'complex', 'refined', 'elaborate'],
  ['stimulate', 'encourage', 'inspire', 'trigger', 'provoke'],
  ['substantial', 'considerable', 'significant', 'sizeable', 'massive'],
  ['substitute', 'replace', 'alternative', 'surrogate'],
  ['superficial', 'shallow', 'surface', 'cursory'],
  ['suppress', 'repress', 'restrain', 'quell', 'stifle'],
  ['sustain', 'maintain', 'support', 'uphold', 'preserve'],
  ['tackle', 'address', 'handle', 'deal with', 'confront'],
  ['temporary', 'transient', 'short-term', 'provisional'],
  ['tolerate', 'endure', 'bear', 'stand', 'put up with'],
  ['transform', 'convert', 'alter', 'revolutionize', 'reshape'],
  ['trigger', 'cause', 'spark', 'provoke', 'prompt'],
  ['ultimate', 'final', 'eventual', 'fundamental', 'supreme'],
  ['unbiased', 'impartial', 'objective', 'neutral', 'fair'],
  ['undermine', 'weaken', 'sabotage', 'damage', 'erode'],
  ['uniform', 'consistent', 'homogeneous', 'standard', 'regular'],
  ['urgent', 'pressing', 'critical', 'imperative', 'acute'],
  ['utilize', 'use', 'employ', 'exploit', 'apply'],
  ['valid', 'legitimate', 'sound', 'effective', 'authentic'],
  ['vulnerable', 'susceptible', 'exposed', 'weak', 'defenseless'],
  ['widespread', 'prevalent', 'extensive', 'broad', 'rampant'],
  ['yield', 'produce', 'provide', 'surrender', 'generate']
];

const synonymsMap = new Map();
CURATED_SYNONYMS.forEach(group => {
  const valid = group.filter(w => realExamTokens.has(w.toLowerCase()));
  valid.forEach(w1 => {
    const w1Low = w1.toLowerCase();
    if (!synonymsMap.has(w1Low)) synonymsMap.set(w1Low, new Set());
    valid.forEach(w2 => {
      const w2Low = w2.toLowerCase();
      if (w1Low !== w2Low) synonymsMap.get(w1Low).add(w2Low);
    });
  });
});

// 6. 考研经典反义词库
const CURATED_ANTONYMS = [
  ['optimistic', 'pessimistic'],
  ['positive', 'negative'],
  ['increase', 'decrease'],
  ['increase', 'reduce'],
  ['increase', 'decline'],
  ['boom', 'slump'],
  ['boom', 'recession'],
  ['objective', 'subjective'],
  ['temporary', 'permanent'],
  ['explicit', 'implicit'],
  ['advantage', 'disadvantage'],
  ['advantage', 'drawback'],
  ['reward', 'punish'],
  ['expand', 'shrink'],
  ['expand', 'contract'],
  ['benefit', 'harm'],
  ['benefit', 'damage'],
  ['accept', 'reject'],
  ['accept', 'refuse'],
  ['strengthen', 'weaken'],
  ['strengthen', 'undermine'],
  ['encourage', 'discourage'],
  ['encourage', 'deter'],
  ['reveal', 'conceal'],
  ['reveal', 'hide'],
  ['superior', 'inferior'],
  ['conscious', 'unconscious'],
  ['rational', 'irrational'],
  ['abundant', 'scarce'],
  ['interfere', 'support'],
  ['interfere', 'assist'],
  ['interrupt', 'continue'],
  ['advance', 'recede'],
  ['advance', 'retreat'],
  ['prosperous', 'impoverished'],
  ['constructive', 'destructive'],
  ['flexible', 'rigid'],
  ['compulsory', 'voluntary'],
  ['compulsory', 'optional'],
  ['genuine', 'fake'],
  ['genuine', 'artificial'],
  ['majority', 'minority'],
  ['visible', 'invisible'],
  ['internal', 'external'],
  ['domestic', 'foreign'],
  ['domestic', 'international'],
  ['active', 'passive'],
  ['innocent', 'guilty'],
  ['prohibit', 'permit'],
  ['prohibit', 'allow'],
  ['chaos', 'order'],
  ['poverty', 'wealth'],
  ['poverty', 'prosperity'],
  ['success', 'failure'],
  ['victory', 'defeat'],
  ['profit', 'loss'],
  ['supply', 'demand'],
  ['seller', 'buyer'],
  ['producer', 'consumer'],
  ['export', 'import'],
  ['inflation', 'deflation'],
  ['complex', 'simple'],
  ['sophisticated', 'primitive'],
  ['precise', 'vague'],
  ['accurate', 'inaccurate'],
  ['crucial', 'trivial'],
  ['essential', 'unimportant'],
  ['vital', 'secondary'],
  ['stable', 'volatile'],
  ['steady', 'erratic'],
  ['permanent', 'transient'],
  ['inevitable', 'preventable'],
  ['unique', 'common'],
  ['rare', 'common'],
  ['dense', 'sparse'],
  ['hostile', 'friendly'],
  ['generous', 'selfish'],
  ['modest', 'arrogant'],
  ['bold', 'timid'],
  ['cautious', 'reckless'],
  ['brave', 'cowardly'],
  ['calm', 'anxious'],
  ['peaceful', 'turbulent'],
  ['harmony', 'conflict'],
  ['unity', 'division'],
  ['concentrate', 'distract'],
  ['gather', 'scatter'],
  ['preserve', 'destroy'],
  ['conserve', 'waste'],
  ['create', 'demolish'],
  ['produce', 'consume'],
  ['construct', 'dismantle'],
  ['integrate', 'isolate'],
  ['combine', 'separate'],
  ['unite', 'divide'],
  ['include', 'exclude'],
  ['admit', 'deny'],
  ['confirm', 'refute'],
  ['support', 'oppose'],
  ['endorse', 'condemn'],
  ['praise', 'criticize'],
  ['applaud', 'blame'],
  ['reward', 'penalize'],
  ['guarantee', 'endanger'],
  ['accelerate', 'decelerate'],
  ['accelerate', 'delay'],
  ['ascend', 'descend'],
  ['climb', 'plunge'],
  ['soar', 'plummet'],
  ['thrive', 'perish'],
  ['survive', 'succumb'],
  ['persist', 'quit'],
  ['endure', 'give up'],
  ['resist', 'yield'],
  ['obey', 'defy'],
  ['conform', 'deviate'],
  ['compliment', 'insult'],
  ['cooperate', 'compete']
];

const antonymsMap = new Map();
CURATED_ANTONYMS.forEach(([w1, w2]) => {
  const w1Low = w1.toLowerCase();
  const w2Low = w2.toLowerCase();
  if (realExamTokens.has(w1Low) && realExamTokens.has(w2Low)) {
    if (!antonymsMap.has(w1Low)) antonymsMap.set(w1Low, new Set());
    if (!antonymsMap.has(w2Low)) antonymsMap.set(w2Low, new Set());
    antonymsMap.get(w1Low).add(w2Low);
    antonymsMap.get(w2Low).add(w1Low);
  }
});

// 7. 词组模糊词根匹配
function matchPhrasesForWord(target) {
  const tLow = target.toLowerCase();
  const stem = getBaseStem(tLow);
  const matched = [];
  const seen = new Set();

  for (const p of examPhrases) {
    const pLow = p.phrase.toLowerCase();
    if (seen.has(pLow)) continue;

    // 检查词组中的单词是否有同源/包含关系
    const tokens = pLow.match(/[a-zA-Z]+/g) || [];
    let isHit = false;
    for (const tk of tokens) {
      if (tk === tLow || getBaseStem(tk) === stem) {
        isHit = true;
        break;
      }
    }

    if (isHit) {
      seen.add(pLow);
      matched.push({
        phrase: p.phrase,
        def: p.def,
        prov: p.prov,
        year: p.year,
        textId: p.textId
      });
      if (matched.length >= 4) break;
    }
  }
  return matched;
}

// 8. 原句匹配 (支持词根衍生，如 interfere 匹配 interferes / interference / interfered)
function matchSentencesForWord(target) {
  const tLow = target.toLowerCase();
  const stem = getBaseStem(tLow);
  
  // 构造智能匹配正则
  // 匹配单词本身或常见屈折/派生词
  const escapedBase = stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\b${escapedBase}(?:e|es|s|ed|d|ing|ion|ions|ence|ences|ent|ents|ive|ively)?\\b`, 'i');

  const matched = [];
  // 优先选取阅读文章 Text 1-4 且有中文翻译的句子
  const candidateSents = allExamSentences.filter(s => s.translation && s.translation.length > 2);

  for (const s of candidateSents) {
    if (re.test(s.text)) {
      matched.push({
        text: s.text,
        translation: s.translation,
        year: s.year,
        textId: s.textId,
        prov: s.prov,
        sid: s.sid
      });
      if (matched.length >= 3) break;
    }
  }

  // 如果还没找齐，放宽至全句库
  if (matched.length < 2) {
    for (const s of allExamSentences) {
      if (matched.some(m => m.text === s.text)) continue;
      if (re.test(s.text)) {
        matched.push({
          text: s.text,
          translation: s.translation,
          year: s.year,
          textId: s.textId,
          prov: s.prov,
          sid: s.sid
        });
        if (matched.length >= 3) break;
      }
    }
  }

  return matched;
}

function getWordProv(wLow) {
  const wObj = examWords.get(wLow);
  if (wObj && wObj.provs && wObj.provs.size > 0) {
    return Array.from(wObj.provs)[0];
  }
  return '考研真题';
}

function getWordDef(wLow) {
  const wObj = examWords.get(wLow);
  return wObj ? wObj.def : '真题考查核心词汇';
}

// 目标构建集合：包含全部考研生词库、大纲核心词与真题高频核心词
const targetWordsSet = new Set();
bank.forEach(([y, t, words]) => {
  words.forEach(([w]) => {
    if (!w.includes(' ')) targetWordsSet.add(w.toLowerCase().trim());
  });
});
for (const [w, info] of examWords.entries()) {
  if (info.isCore) targetWordsSet.add(w);
}

console.log(`🎯 目标处理核心词汇量: ${targetWordsSet.size} 个.`);

// 预选所有核心考研词（用于算法形近词配对，严格限制在真题中真实出现且排除专有词）
const coreWordKeys = Array.from(targetWordsSet).filter(w => realExamTokens.has(w) && !properNouns.has(w) && w.length >= 4);

const finalVocabRelations = {};
let count = 0;

for (const target of targetWordsSet) {
  if (target.length < 2) continue;

  // 1. 形近词 (Lookalikes)
  const lookalikeList = [];
  const seenLookalikes = new Set([target]);

  // (1) 精选形近词群
  if (curatedLookalikesMap.has(target)) {
    for (const conf of curatedLookalikesMap.get(target)) {
      if (!seenLookalikes.has(conf) && examWords.has(conf)) {
        seenLookalikes.add(conf);
        lookalikeList.push({
          word: examWords.get(conf).word || conf,
          def: getWordDef(conf),
          prov: getWordProv(conf)
        });
      }
    }
  }

  // (2) 动态智能形近词配对 (编辑距离 <= 2，长度差 <= 1，排除同根屈折)
  if (lookalikeList.length < 3 && target.length >= 4) {
    const candidates = [];
    for (const w of coreWordKeys) {
      if (seenLookalikes.has(w) || isSameLemma(target, w)) continue;

      let commonPrefix = 0;
      while (commonPrefix < target.length && commonPrefix < w.length && target[commonPrefix] === w[commonPrefix]) {
        commonPrefix++;
      }

      const dist = levenshtein(target, w);
      const lenDiff = Math.abs(target.length - w.length);

      if (commonPrefix >= 4 && dist <= 3 && lenDiff <= 2) {
        candidates.push({ word: w, dist, prefix: commonPrefix });
      } else if (dist <= 2 && lenDiff <= 1 && commonPrefix >= 2) {
        candidates.push({ word: w, dist, prefix: commonPrefix });
      }
    }

    candidates.sort((a, b) => a.dist - b.dist || b.prefix - a.prefix);
    for (const c of candidates) {
      if (lookalikeList.length >= 3) break;
      if (!seenLookalikes.has(c.word)) {
        seenLookalikes.add(c.word);
        lookalikeList.push({
          word: examWords.get(c.word).word || c.word,
          def: getWordDef(c.word),
          prov: getWordProv(c.word)
        });
      }
    }
  }

  // 2. 词组 (Phrases)
  const phrasesList = matchPhrasesForWord(target);

  // 3. 近义词 (Synonyms)
  const synonymsList = [];
  if (synonymsMap.has(target)) {
    for (const syn of synonymsMap.get(target)) {
      if (examWords.has(syn)) {
        synonymsList.push({
          word: examWords.get(syn).word || syn,
          def: getWordDef(syn),
          prov: getWordProv(syn)
        });
      }
    }
  }

  // 4. 反义词 (Antonyms)
  const antonymsList = [];
  if (antonymsMap.has(target)) {
    for (const ant of antonymsMap.get(target)) {
      if (examWords.has(ant)) {
        antonymsList.push({
          word: examWords.get(ant).word || ant,
          def: getWordDef(ant),
          prov: getWordProv(ant)
        });
      }
    }
  }

  // 5. 真题原句 (Sentences)
  const sentencesList = matchSentencesForWord(target);

  // 写入结果表
  if (lookalikeList.length > 0 || phrasesList.length > 0 || synonymsList.length > 0 || antonymsList.length > 0 || sentencesList.length > 0) {
    finalVocabRelations[target] = {
      lookalikes: lookalikeList,
      phrases: phrasesList,
      synonyms: synonymsList,
      antonyms: antonymsList,
      sentences: sentencesList
    };
    count++;
  }
}

console.log(`✨ 构建完成！共收录 ${count} 个高价值真题考点词的多维知识扩展.`);

// 测试用户重点词
['interfere', 'interrupt', 'interpret', 'adopt', 'adapt', 'optimistic'].forEach(w => {
  console.log(`\n=================== [${w}] ===================`);
  console.log(JSON.stringify(finalVocabRelations[w], null, 2));
});

// 输出至 data/vocab_relations.js
const outputPath = 'data/vocab_relations.js';
const jsContent = `/**
 * 考研英语二全真题五维单词拓展数据库 (2010-2026)
 * 1. 形近词 (Lookalikes)
 * 2. 词组 (Phrases)
 * 3. 近义词 (Synonyms)
 * 4. 反义词 (Antonyms)
 * 5. 真题原句 (Exam Sentences)
 * 严格保证：所有拓展内容 100% 出现于历年英语二真题语料中！
 */
window.KAOYAN_VOCAB_RELATIONS = ${JSON.stringify(finalVocabRelations)};
`;

fs.writeFileSync(outputPath, jsContent, 'utf8');
const stat = fs.statSync(outputPath);
console.log(`\n💾 知识库已保存至: ${outputPath} (大小: ${(stat.size / 1024).toFixed(1)} KB)`);
