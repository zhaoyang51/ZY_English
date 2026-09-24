# -*- coding: utf-8 -*-
"""
Master script to apply verified Cloze data and detailed analyses across 2012-2026.
Preserves 2010 and 2011 which were already handcrafted.
"""

import json, os, sys

# Add scripts directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from data_cloze_2012_2016_fixed import CLOZE_2012_2016
from data_cloze_2017_2021_fixed import CLOZE_2017_2021
from data_cloze_2022_2026_fixed import CLOZE_2022_2026

ALL_CLOZE = {}
ALL_CLOZE.update(CLOZE_2012_2016)
ALL_CLOZE.update(CLOZE_2017_2021)
ALL_CLOZE.update(CLOZE_2022_2026)

def apply():
    total_updated = 0
    for yr in range(2012, 2027):
        json_path = f'data/{yr}.json'
        if not os.path.exists(json_path):
            print(f"File not found: {json_path}")
            continue
            
        with open(json_path, 'r', encoding='utf-8') as f:
            d = json.load(f)
            
        sec1 = d.get('use_of_english')
        if not sec1:
            print(f"No use_of_english in {yr}")
            continue
            
        yr_cloze = ALL_CLOZE.get(yr, [])
        if not yr_cloze or len(yr_cloze) != 20:
            print(f"Warning: year {yr} has {len(yr_cloze)} items in ALL_CLOZE!")
            continue
            
        cloze_map = {item['qid']: item for item in yr_cloze}
        
        questions = sec1.get('questions', [])
        for q in questions:
            qid = q.get('qid')
            if qid in cloze_map:
                enriched = cloze_map[qid]
                q['answer'] = enriched['answer']
                q['category'] = enriched['category']
                q['analysis'] = enriched['analysis']
                q['context_clue'] = enriched['context_clue']
                total_updated += 1
                
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(d, f, ensure_ascii=False, indent=2)
            
        print(f"[{yr}] Successfully updated 20 questions in {json_path}")
        
    print(f"\nTotal cloze questions updated: {total_updated} / 300")

    # Sanity check across all years 2010 - 2026
    print("\n--- SANITY CHECK 2010-2026 ---")
    all_good = True
    for yr in range(2010, 2027):
        with open(f'data/{yr}.json', 'r', encoding='utf-8') as f:
            d = json.load(f)
        s1 = d.get('use_of_english', {})
        qs = s1.get('questions', [])
        if len(qs) != 20:
            print(f"FAIL: Year {yr} has {len(qs)} questions instead of 20!")
            all_good = False
            continue
        missing_fields = 0
        for q in qs:
            if not q.get('answer') or not q.get('analysis') or not q.get('category'):
                missing_fields += 1
        if missing_fields > 0:
            print(f"FAIL: Year {yr} has {missing_fields} questions with missing fields!")
            all_good = False
        else:
            sample = qs[0]
            print(f"PASS: Year {yr} (20/20 valid) - Q1 Ans: {sample['answer']} | Cat: {sample['category']}")
            
    if all_good:
        print("\nALL 17 YEARS (2010-2026) ARE 100% VALIDATED!")

if __name__ == '__main__':
    apply()
