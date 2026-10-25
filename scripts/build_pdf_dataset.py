import sys
import os
import re
import json
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = '英语二_纯净版单词大观（带真题例句和构词）_b站up主南萧时刻自信冷静.pdf'
reader = pypdf.PdfReader(pdf_path)

words_list = []
words_dict = {}

source_re = re.compile(r'^\d{4}\s*·\s*英语[一二]')
item_num_re = re.compile(r'^(\d+)\.\s*(.*)')

def get_freq_band(freq):
    if freq >= 40:
        return '超高频 (40-209次)'
    elif freq >= 20:
        return '高频 (20-39次)'
    elif freq >= 10:
        return '重点 (10-19次)'
    elif freq >= 5:
        return '中频 (5-9次)'
    elif freq >= 2:
        return '次频 (2-4次)'
    else:
        return '基础 (1次)'

for p in range(1, len(reader.pages)):
    text = reader.pages[p].extract_text()
    raw_lines = [l.strip() for l in text.split('\n') if l.strip()]
    
    # 1. Header
    h_end = 0
    page_freq_range = ''
    for i, l in enumerate(raw_lines[:15]):
        if '考频' in l and '次' in l:
            page_freq_range = l
        if '真题例句与译文' in l:
            h_end = i + 1
            break
            
    # 2. Footer
    f_start = len(raw_lines)
    for i in range(len(raw_lines)-1, max(0, len(raw_lines)-6), -1):
        if re.search(r'\d+\s*/\s*516', raw_lines[i]):
            f_start = i - 1 if '第' in raw_lines[i-1] else i
            break
            
    body = raw_lines[h_end:f_start]
    
    i = 0
    current_key = None
    
    while i < len(body):
        line = body[i]
        
        # Check continuation: e.g. "good\n（续）\n117"
        if i + 1 < len(body) and body[i+1] == '（续）':
            w_name = line
            i += 2
            if i < len(body) and body[i].isdigit():
                i += 1
            current_key = w_name.lower().strip()
            continue
            
        # Check new word: English word followed by integer freq
        if i + 1 < len(body) and body[i+1].isdigit() and not line.startswith('[') and not re.match(r'^\d+\.', line) and re.match(r'^[a-zA-Z0-9\s\-\'/\(\)\.]+$', line):
            parts = line.split()
            if len(parts) <= 4:
                w_name = line
                w_freq = int(body[i+1])
                w_key = w_name.lower().strip()
                current_key = w_key
                
                if w_key not in words_dict:
                    entry = {
                        'word': w_name,
                        'freq': w_freq,
                        'morphology': '',
                        'examUses': [],
                        'freqRange': page_freq_range,
                        'freqBand': get_freq_band(w_freq),
                        'page': p + 1
                    }
                    words_dict[w_key] = entry
                    words_list.append(entry)
                i += 2
                continue
                
        # If inside a word, parse sense or morphology
        if current_key and current_key in words_dict:
            cur = words_dict[current_key]
            
            m_sense = item_num_re.match(line)
            if m_sense:
                item_num = int(m_sense.group(1))
                def_parts = [m_sense.group(2)]
                
                # Consume lines until definition ends
                j = i + 1
                while j < len(body):
                    sub = body[j]
                    if re.search(r'（\d+）|\d+）', def_parts[-1]):
                        break
                    if item_num_re.match(sub) or source_re.match(sub):
                        break
                    if any('\u4e00' <= c <= '\u9fff' for c in sub) or '）' in sub or '（' in sub or re.match(r'^\(?[a-zA-Z\.\/]+\)?', sub):
                        def_parts.append(sub)
                        j += 1
                        if re.search(r'（\d+）|\d+）', sub):
                            break
                    else:
                        break
                        
                pos_and_def = ''.join(def_parts).strip()
                i = j
                
                # Now collect English sentence, Chinese translation, and Source
                en_parts = []
                zh_parts = []
                src_line = ''
                note_line = ''
                
                while i < len(body):
                    c_line = body[i]
                    if item_num_re.match(c_line):
                        break
                    if i + 1 < len(body) and body[i+1].isdigit() and not c_line.startswith('[') and re.match(r'^[a-zA-Z\s\-\'/\(\)\.]+$', c_line):
                        break
                    if i + 1 < len(body) and body[i+1] == '（续）':
                        break
                    if c_line.startswith('原表义项待核'):
                        note_line = c_line
                        i += 1
                        break
                    if source_re.match(c_line):
                        src_line = c_line
                        i += 1
                        break
                    else:
                        has_cn = any('\u4e00' <= c <= '\u9fff' for c in c_line)
                        if has_cn and not c_line.startswith('[ B ]') and not c_line.startswith('[ A ]') and not c_line.startswith('[ C ]') and not c_line.startswith('[ D ]') and not c_line.startswith('[ E ]') and not c_line.startswith('[ F ]') and not c_line.startswith('[ G ]') and len(en_parts) > 0:
                            zh_parts.append(c_line)
                        elif c_line.startswith('[') and has_cn:
                            zh_parts.append(c_line)
                        elif len(zh_parts) == 0:
                            en_parts.append(c_line)
                        else:
                            zh_parts.append(c_line)
                        i += 1
                        
                cur['examUses'].append({
                    'itemNum': item_num,
                    'posAndDef': pos_and_def,
                    'sentence': ' '.join(en_parts).strip(),
                    'translation': ''.join(zh_parts).strip(),
                    'source': src_line,
                    'note': note_line
                })
                continue
            elif not cur['examUses']:
                if not cur['morphology']:
                    cur['morphology'] = line
                else:
                    cur['morphology'] += ' ' + line
                i += 1
                continue
                
        i += 1

# Post-processing: clean meanings and primary examples
clean_dataset = []
for idx, entry in enumerate(words_list):
    defs = []
    seen_defs = set()
    for u in entry['examUses']:
        p_def = u['posAndDef']
        p_def_clean = re.sub(r'^\d+\.\s*', '', p_def)
        p_def_clean = re.sub(r'（\d+）|\(\d+\)', '', p_def_clean).strip()
        if p_def_clean and p_def_clean not in seen_defs:
            defs.append(p_def_clean)
            seen_defs.add(p_def_clean)
            
    combined_meaning = '；'.join(defs) if defs else entry['word']
    
    first_use = entry['examUses'][0] if entry['examUses'] else {}
    primary_sentence = first_use.get('sentence', '')
    primary_trans = first_use.get('translation', '')
    primary_src = first_use.get('source', '')
    
    clean_item = {
        'id': idx + 1,
        'word': entry['word'],
        'freq': entry['freq'],
        'freqBand': entry['freqBand'],
        'meaning': combined_meaning,
        'morphology': entry['morphology'],
        'sentence': primary_sentence,
        'translation': primary_trans,
        'source': f"{primary_src} [{primary_trans}]" if primary_src and primary_trans else primary_src,
        'year': entry['freqBand'],
        'text': f"P{entry['page']} ({entry['freqRange']})" if entry['freqRange'] else f"P{entry['page']}",
        'examUses': entry['examUses'],
        'page': entry['page']
    }
    clean_dataset.append(clean_item)

print(f"Total parsed words: {len(clean_dataset)}")
print(f"Sample word with morphology: {clean_dataset[2]['word']} -> {clean_dataset[2]['morphology']}")
print(f"Sample meaning for will: {clean_dataset[0]['meaning']}")
print(f"Sample uses count for will: {len(clean_dataset[0]['examUses'])}")

out_json_path = 'data/vocab_pdf_full.json'
with open(out_json_path, 'w', encoding='utf-8') as f:
    json.dump(clean_dataset, f, ensure_ascii=False, indent=2)
print(f"Saved {out_json_path} ({os.path.getsize(out_json_path)} bytes)")

out_js_path = 'data/vocab_pdf.js'
with open(out_js_path, 'w', encoding='utf-8') as f:
    f.write("/** 考研英语二 · 全网最高效率单词速刷表 (2,872 词)\n * 来源：b站up主南萧时刻自信冷静\n */\n")
    f.write("window.KAOYAN_PDF_VOCAB = ")
    json.dump(clean_dataset, f, ensure_ascii=False)
    f.write(";\n")
print(f"Saved {out_js_path} ({os.path.getsize(out_js_path)} bytes)")
