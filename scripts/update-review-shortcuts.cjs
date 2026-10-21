const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../英二做题和复盘模式');
const reviewFiles = fs.readdirSync(dir).filter(f => f.endsWith('_复盘模式.html'));

console.log(`Found ${reviewFiles.length} review files.`);

const standardListener = `window.addEventListener('keydown',e=>{
 if(all||e.altKey||e.ctrlKey||e.metaKey)return;
 const tag=(e.target&&e.target.tagName)||'';
 if(tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA'||(e.target&&e.target.isContentEditable))return;
 if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();if(!next.disabled)next.click();}
 else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();if(!prev.disabled)prev.click();}
});`;

const listener2025 = `window.addEventListener('keydown',e=>{
 if(allMode||e.altKey||e.ctrlKey||e.metaKey)return;
 const tag=(e.target&&e.target.tagName)||'';
 if(tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA'||(e.target&&e.target.isContentEditable))return;
 if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();if(!next.disabled)next.click();}
 else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();if(!prev.disabled)prev.click();}
});`;

let count = 0;
for (const file of reviewFiles) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Update button titles for clear UX
  if (content.includes('id="prev">上一步</button>')) {
    content = content.replace('id="prev">上一步</button>', 'id="prev" title="上一步 (快捷键: ←)">上一步</button>');
  }
  if (content.includes('id="next" class="primary">下一步</button>')) {
    content = content.replace('id="next" class="primary">下一步</button>', 'id="next" class="primary" title="下一步 (快捷键: →)">下一步</button>');
  } else if (content.includes('id="next">下一步</button>')) {
    content = content.replace('id="next">下一步</button>', 'id="next" title="下一步 (快捷键: →)">下一步</button>');
  }

  // 2. Replace keydown listener
  const regex = /(?:document|window)\.addEventListener\('keydown'[\s\S]*?\}\);/;
  if (file === '2025_text2_复盘模式.html') {
    if (regex.test(content)) {
      content = content.replace(regex, listener2025);
    }
  } else {
    if (regex.test(content)) {
      content = content.replace(regex, standardListener);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
  }
}

console.log(`Updated shortcuts in ${count} of ${reviewFiles.length} review files.`);
