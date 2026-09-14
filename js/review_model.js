/** Shared, source-preserving helpers for review, practice and exports. */
(function () {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
  const normalize = value => String(value || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();

  function contains(text, expression) {
    const term = normalize(expression);
    if (!term) return false;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z])${escaped}(?=$|[^a-z])`, 'i').test(normalize(text));
  }

  function context(text, word, pid) {
    const sentences = text.sentences || [];
    const sentence = sentences.find(s => s.pid === pid && contains(s.text, word))
      || sentences.find(s => contains(s.text, word));
    if (sentence) return { text: sentence.text, translation: sentence.translation || '', sid: sentence.sid, label: `原文第 ${sentence.pid + 1} 段` };
    for (const q of text.questions || []) {
      for (const opt of q.options || []) {
        if (contains(opt.text, word)) return { text: opt.text, translation: opt.text_cn || '', label: `第 ${q.qid} 题选项 ${opt.key}（题项表达）` };
      }
    }
    return null;
  }

  function analysis(q, opt) {
    const a = opt.analysis || {};
    return {
      position: a.position || '',
      source: a.source_sentence || q.locate_sentence || '',
      comparison: a.locator_comparison || a.logic_check || '',
      perspective: a.writing_perspective || '',
      theme: a.theme_validation || '',
      verdict: a.verdict || (opt.is_correct ? `答案：${opt.key}。结合定位句核对表达范围。` : `排除 ${opt.key}：${opt.trap_type || '核对它与原文的差异'}。`)
    };
  }

  function pairs(q) {
    return (q.synonym_pairs || []).map(p => ({
      source: p.text_term || p.source || '', target: p.opt_term || p.target || '',
      logic: p.logic || '核对主体、动作、范围与语气是否保持一致。'
    })).filter(p => p.source && p.target);
  }

  function strategy(type) {
    if (/主旨|标题|大意/.test(type)) return '先概括全文反复讨论的对象与核心判断，再检查标题是否覆盖主要段落；排除只概括一个例子或扩大话题的选项。';
    if (/态度/.test(type)) return '区分作者、被引用者和研究者的声音。用评价词、转折和结尾判断态度强弱，不把文章讨论的问题自动当成作者的情绪。';
    if (/推断|推理/.test(type)) return '写出“原文事实 → 必要推论”，检查推论是否新增前提。可能发生、符合常识，不等于能由本文推出。';
    if (/例证/.test(type)) return '分别写下例子讲了什么、它服务于哪个观点；向前后句寻找论点，避免用例子中的具体事实代替论证目的。';
    if (/词义|语义/.test(type)) return '先用上下文提出一个临时释义，再代回原句检查逻辑和搭配。熟悉的常见义不一定适合本句。';
    return '先圈出题干限定，再核对原文中的主体、动作、时间、程度和因果。转折词帮助定位，不能代替证据；含绝对词也不能直接判错。';
  }

  function vocabulary(text, paragraph) {
    const seen = new Set();
    return (paragraph.vocabulary || []).filter(v => {
      const key = normalize(v.word);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(v => ({ ...v, context: context(text, v.word, paragraph.pid) }));
  }

  window.ReviewModel = { escape, contains, context, analysis, pairs, strategy, vocabulary };
})();
