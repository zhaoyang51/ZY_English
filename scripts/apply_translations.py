# -*- coding: utf-8 -*-
"""
Script to apply Cloze and Part B translations to data/*.json for all years 2010-2026.
"""
import json
import os
import re
from scripts.data_cloze_translations import CLOZE_TRANSLATIONS
from scripts.data_partb_translations import PARTB_TRANSLATIONS

def apply_translations():
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    
    for year in range(2010, 2027):
        file_path = os.path.join(data_dir, f"{year}.json")
        if not os.path.exists(file_path):
            print(f"Skipping {year}: file not found")
            continue
            
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        # 1. Apply Cloze translations
        c_trans = CLOZE_TRANSLATIONS.get(year)
        if c_trans and "use_of_english" in data:
            uoe = data["use_of_english"]
            # Paragraph translations
            uoe_paras = uoe.get("paragraphs", [])
            for i, p in enumerate(uoe_paras):
                if i < len(c_trans["paragraphs"]):
                    p["translation"] = c_trans["paragraphs"][i]
            
            # Options Chinese meanings
            uoe_questions = uoe.get("questions", [])
            c_opts_cn = c_trans.get("options_cn", {})
            for q in uoe_questions:
                qid = q.get("qid")
                if qid in c_opts_cn:
                    q["options_cn"] = c_opts_cn[qid]
                    
        # 2. Apply Part B translations
        pb_trans = PARTB_TRANSLATIONS.get(year)
        if pb_trans and "part_b" in data:
            pb = data["part_b"]
            # Paragraph translations
            pb_paras = pb.get("paragraphs", [])
            for i, p in enumerate(pb_paras):
                if i < len(pb_trans["paragraphs"]):
                    p["translation"] = pb_trans["paragraphs"][i]
                    
            # Item title_cn and clean corrupt titles
            pb_items = pb.get("items", [])
            pb_items_cn = pb_trans.get("items_cn", {})
            for it in pb_items:
                qid = it.get("qid")
                if qid in pb_items_cn:
                    it["title_cn"] = pb_items_cn[qid]
                # Clean corrupt garbled titles like " 41 С (ѡѶС)"
                curr_title = it.get("title", "")
                if "\ufffd" in curr_title or "" in curr_title or "С" in curr_title or "" in curr_title:
                    it["title"] = f"【第 {qid} 题】 (选择对应小标题)"
                    
            # Options Chinese meanings
            pb["options_cn"] = pb_trans.get("options_cn", {})
            
        # Save back to JSON
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
        print(f"Applied translations to {year}.json successfully.")

if __name__ == "__main__":
    apply_translations()
