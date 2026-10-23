const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const yuqueDir = path.join(rootDir, '英二做题和复盘模式');

const zoomControlsHtml = `<div class="zoomControls" style="display:inline-flex;align-items:center;gap:5px;margin-right:auto"><span style="font-size:13px;color:var(--muted);font-weight:600">🔍 文章:</span><button id="zoomOut" class="btn" title="缩小文章 (A-)" style="padding:4px 8px;font-size:12px;line-height:1">A -</button><span id="zoomVal" style="font-size:12px;font-weight:700;color:var(--ink);min-width:38px;text-align:center">100%</span><button id="zoomIn" class="btn" title="放大文章 (A+)" style="padding:4px 8px;font-size:12px;line-height:1">A +</button><button id="zoomReset" class="btn" title="还原默认大小" style="padding:4px 7px;font-size:12px;line-height:1">↺</button><span style="color:#d1d5db;font-size:12px;margin:0 1px">|</span><button id="panLeft" class="btn" title="向左平移画布 (也可直接按住鼠标拖拽)" style="padding:4px 7px;font-size:12px;line-height:1">◀</button><button id="panCenter" class="btn" title="恢复水平居中" style="padding:4px 8px;font-size:12px;line-height:1">居中</button><button id="panRight" class="btn" title="向右平移画布 (也可直接按住鼠标拖拽)" style="padding:4px 7px;font-size:12px;line-height:1">▶</button></div>`;

const practiceScrollCss = `#leftPane{overflow-x:auto!important;overflow-y:auto!important}#leftPane::-webkit-scrollbar{width:8px;height:8px}#leftPane::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}#leftPane::-webkit-scrollbar-thumb:hover{background:#94a3b8}#leftPane img{user-select:none;-webkit-user-drag:none}`;

const reviewScrollCss = `#leftScroll{overflow-x:auto!important;overflow-y:auto!important}#leftScroll::-webkit-scrollbar{width:8px;height:8px}#leftScroll::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}#leftScroll::-webkit-scrollbar-thumb:hover{background:#94a3b8}#leftScroll img{user-select:none;-webkit-user-drag:none}`;

const newPracticeJs = `let zoomLevel=Number(localStorage.getItem('reading_article_zoom')||100);
if(isNaN(zoomLevel)||zoomLevel<70||zoomLevel>240)zoomLevel=100;
function centerHorizontal(){
  requestAnimationFrame(()=>{
    if(!leftPane)return;
    if(zoomLevel>100&&leftPane.scrollWidth>leftPane.clientWidth){
      leftPane.scrollLeft=Math.max(0,Math.round((leftPane.scrollWidth-leftPane.clientWidth)/2));
    }else{
      leftPane.scrollLeft=0;
    }
    updateDragCursor();
  });
}
function updateDragCursor(){
  if(!leftPane)return;
  if(zoomLevel>100&&(leftPane.scrollWidth>leftPane.clientWidth||leftPane.scrollHeight>leftPane.clientHeight)){
    leftPane.style.cursor='grab';
  }else{
    leftPane.style.cursor='';
  }
}
function setupDragToPan(scrollEl){
  if(!scrollEl)return;
  let isDown=false,startX=0,startY=0,sl=0,st=0;
  scrollEl.addEventListener('mousedown',e=>{
    if(e.button!==0)return;
    const tag=(e.target&&e.target.tagName)||'';
    if(tag==='BUTTON'||tag==='SELECT'||tag==='INPUT'||tag==='A')return;
    if(zoomLevel<=100&&scrollEl.scrollWidth<=scrollEl.clientWidth&&scrollEl.scrollHeight<=scrollEl.clientHeight)return;
    isDown=true;
    startX=e.clientX;
    startY=e.clientY;
    sl=scrollEl.scrollLeft;
    st=scrollEl.scrollTop;
    scrollEl.style.cursor='grabbing';
    scrollEl.style.userSelect='none';
    e.preventDefault();
  });
  window.addEventListener('mousemove',e=>{
    if(!isDown)return;
    scrollEl.scrollLeft=sl-(e.clientX-startX);
    scrollEl.scrollTop=st-(e.clientY-startY);
  });
  const up=()=>{
    if(!isDown)return;
    isDown=false;
    scrollEl.style.userSelect='';
    updateDragCursor();
  };
  window.addEventListener('mouseup',up);
  window.addEventListener('mouseleave',up);
  scrollEl.querySelectorAll('img').forEach(img=>{img.setAttribute('draggable','false');img.style.userSelect='none';});
}
function applyZoom(val){
  zoomLevel=Math.max(70,Math.min(240,val));
  try{localStorage.setItem('reading_article_zoom',String(zoomLevel));}catch(e){}
  const zVal=document.getElementById('zoomVal');
  if(zVal)zVal.textContent=zoomLevel+'%';
  const baseW=Math.max(500,(leftPane.clientWidth||800)-24);
  const targetW=Math.round(baseW*(zoomLevel/100));
  const wraps=document.querySelectorAll('.pageWrap');
  wraps.forEach(w=>{
    if(zoomLevel===100){
      w.style.width='100%';
      w.style.maxWidth='1150px';
    }else{
      w.style.setProperty('width',targetW+'px','important');
      w.style.setProperty('max-width','none','important');
    }
  });
  if(typeof ready==='undefined'||ready){
    if(!fullMode){
      const st=DATA.steps[idx];
      highlight('articleWrap',st?st.articleRects:[]);
      highlight('questionWrap',st?st.questionRects:[]);
    }
  }
  centerHorizontal();
}
document.getElementById('zoomIn').onclick=()=>applyZoom(zoomLevel+5);
document.getElementById('zoomOut').onclick=()=>applyZoom(zoomLevel-5);
document.getElementById('zoomReset').onclick=()=>applyZoom(100);
const pLeft=document.getElementById('panLeft');
if(pLeft)pLeft.onclick=()=>{if(leftPane)leftPane.scrollLeft=Math.max(0,leftPane.scrollLeft-120);};
const pRight=document.getElementById('panRight');
if(pRight)pRight.onclick=()=>{if(leftPane)leftPane.scrollLeft=Math.min(leftPane.scrollWidth-leftPane.clientWidth,leftPane.scrollLeft+120);};
const pCenter=document.getElementById('panCenter');
if(pCenter)pCenter.onclick=()=>centerHorizontal();
setupDragToPan(document.getElementById('leftPane'));
setTimeout(()=>applyZoom(zoomLevel),60);
window.addEventListener('keydown',e=>{
  if(fullMode||e.altKey||e.ctrlKey||e.metaKey)return;
  const tag=(e.target&&e.target.tagName)||'';
  if(tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA'||(e.target&&e.target.isContentEditable))return;
  if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();next();}
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();prev();}
});
`;

const newReviewJs = `let zoomLevel=Number(localStorage.getItem('reading_review_zoom')||localStorage.getItem('reading_article_zoom')||100);
if(isNaN(zoomLevel)||zoomLevel<70||zoomLevel>240)zoomLevel=100;
let currentPlace=null;
function centerHorizontal(){
  requestAnimationFrame(()=>{
    if(!leftScroll)return;
    if(zoomLevel>100&&leftScroll.scrollWidth>leftScroll.clientWidth){
      leftScroll.scrollLeft=Math.max(0,Math.round((leftScroll.scrollWidth-leftScroll.clientWidth)/2));
    }else{
      leftScroll.scrollLeft=0;
    }
    updateDragCursor();
  });
}
function updateDragCursor(){
  if(!leftScroll)return;
  if(zoomLevel>100&&(leftScroll.scrollWidth>leftScroll.clientWidth||leftScroll.scrollHeight>leftScroll.clientHeight)){
    leftScroll.style.cursor='grab';
  }else{
    leftScroll.style.cursor='';
  }
}
function setupDragToPan(scrollEl){
  if(!scrollEl)return;
  let isDown=false,startX=0,startY=0,sl=0,st=0;
  scrollEl.addEventListener('mousedown',e=>{
    if(e.button!==0)return;
    const tag=(e.target&&e.target.tagName)||'';
    if(tag==='BUTTON'||tag==='SELECT'||tag==='INPUT'||tag==='A')return;
    if(zoomLevel<=100&&scrollEl.scrollWidth<=scrollEl.clientWidth&&scrollEl.scrollHeight<=scrollEl.clientHeight)return;
    isDown=true;
    startX=e.clientX;
    startY=e.clientY;
    sl=scrollEl.scrollLeft;
    st=scrollEl.scrollTop;
    scrollEl.style.cursor='grabbing';
    scrollEl.style.userSelect='none';
    e.preventDefault();
  });
  window.addEventListener('mousemove',e=>{
    if(!isDown)return;
    scrollEl.scrollLeft=sl-(e.clientX-startX);
    scrollEl.scrollTop=st-(e.clientY-startY);
  });
  const up=()=>{
    if(!isDown)return;
    isDown=false;
    scrollEl.style.userSelect='';
    updateDragCursor();
  };
  window.addEventListener('mouseup',up);
  window.addEventListener('mouseleave',up);
  scrollEl.querySelectorAll('img').forEach(img=>{img.setAttribute('draggable','false');img.style.userSelect='none';});
}
function applyZoom(val){
  zoomLevel=Math.max(70,Math.min(240,val));
  try{
    localStorage.setItem('reading_review_zoom',String(zoomLevel));
    localStorage.setItem('reading_article_zoom',String(zoomLevel));
  }catch(e){}
  const zVal=document.getElementById('zoomVal');
  if(zVal)zVal.textContent=zoomLevel+'%';
  const page=document.getElementById('focusPage')||document.getElementById('annotatedPage');
  if(page){
    const baseW=Math.max(500,(leftScroll.clientWidth||800)-24);
    const targetW=Math.round(baseW*(zoomLevel/100));
    if(zoomLevel===100){
      page.style.width='';
      page.style.maxWidth='';
    }else{
      page.style.setProperty('width',targetW+'px','important');
      page.style.setProperty('max-width','none','important');
    }
  }
  const paper=leftStage?leftStage.querySelector('.newtypePaper'):null;
  if(paper){
    if(zoomLevel===100){
      paper.style.fontSize='';
      paper.style.width='';
      paper.style.maxWidth='';
    }else{
      paper.style.fontSize=(20*(zoomLevel/100)).toFixed(1)+'px';
      const baseW=Math.max(500,(leftScroll.clientWidth||800)-24);
      paper.style.setProperty('width',Math.round(baseW*(zoomLevel/100))+'px','important');
      paper.style.setProperty('max-width','none','important');
    }
  }
  centerHorizontal();
}
const zIn=document.getElementById('zoomIn');
if(zIn)zIn.onclick=()=>{applyZoom(zoomLevel+5);if(currentPlace)currentPlace();};
const zOut=document.getElementById('zoomOut');
if(zOut)zOut.onclick=()=>{applyZoom(zoomLevel-5);if(currentPlace)currentPlace();};
const zReset=document.getElementById('zoomReset');
if(zReset)zReset.onclick=()=>{applyZoom(100);if(currentPlace)currentPlace();};
const pLeft=document.getElementById('panLeft');
if(pLeft)pLeft.onclick=()=>{if(leftScroll)leftScroll.scrollLeft=Math.max(0,leftScroll.scrollLeft-120);};
const pRight=document.getElementById('panRight');
if(pRight)pRight.onclick=()=>{if(leftScroll)leftScroll.scrollLeft=Math.min(leftScroll.scrollWidth-leftScroll.clientWidth,leftScroll.scrollLeft+120);};
const pCenter=document.getElementById('panCenter');
if(pCenter)pCenter.onclick=()=>centerHorizontal();
setupDragToPan(document.getElementById('leftScroll'));
setTimeout(()=>applyZoom(zoomLevel),60);
window.addEventListener('keydown',e=>{
 if(all||e.altKey||e.ctrlKey||e.metaKey)return;
 const tag=(e.target&&e.target.tagName)||'';
 if(tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA'||(e.target&&e.target.isContentEditable))return;
 if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();if(!next.disabled)next.click();}
 else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();if(!prev.disabled)prev.click();}
});
`;

// =============================================
// PROCESS ALL PRACTICE FILES
// =============================================
const practiceFiles = fs.readdirSync(yuqueDir).filter(f => f.endsWith('_做题模式.html')).sort();
console.log(`Processing ${practiceFiles.length} practice files...`);
let pUpdated = 0;

for (const file of practiceFiles) {
  const filePath = path.join(yuqueDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Layout width
  if (content.includes('grid-template-columns:minmax(430px,44fr) minmax(600px,56fr);')) {
    content = content.replace(
      'grid-template-columns:minmax(430px,44fr) minmax(600px,56fr);',
      'grid-template-columns:minmax(520px,1.25fr) minmax(420px,1fr);'
    );
  }

  // 2. CSS scroll
  if (!content.includes('#leftPane{overflow-x:auto!important')) {
    content = content.replace('</style>', `${practiceScrollCss}</style>`);
  }

  // 3. leftDocBlock width
  if (!content.includes('.leftDocBlock{width:max-content')) {
    if (content.includes('.leftDocBlock+.leftDocBlock{')) {
      content = content.replace(
        '.leftDocBlock+.leftDocBlock{',
        '.leftDocBlock{width:max-content;min-width:100%}.leftDocBlock+.leftDocBlock{'
      );
    }
  }

  // 4. pageWrap max-width
  if (content.includes('width:min(100%,820px);')) {
    content = content.replace('width:min(100%,820px);', 'width:100%;max-width:1150px;');
  }

  // 5. topbar zoom controls
  if (!content.includes('id="zoomIn"')) {
    content = content.replace('<div class="topbar">', `<div class="topbar">${zoomControlsHtml}`);
  }

  // 6. button titles
  if (content.includes('id="prev" class="btn">上一步</button>')) {
    content = content.replace('id="prev" class="btn">上一步</button>', 'id="prev" class="btn" title="上一步 (← 方向键)">上一步</button>');
  }
  if (content.includes('id="next" class="btn primary">下一步</button>')) {
    content = content.replace('id="next" class="btn primary">下一步</button>', 'id="next" class="btn primary" title="下一步 (→ 方向键)">下一步</button>');
  }

  // 7. scrollToWrap & centerRects preserve scrollLeft
  content = content.replace(
    /leftPane\.scrollTo\(\{top:target,behavior:'smooth'\}\)/g,
    "leftPane.scrollTo({top:target,left:leftPane.scrollLeft,behavior:'smooth'})"
  );
  content = content.replace(
    /leftPane\.scrollTo\(\{top:target,behavior\}\)/g,
    "leftPane.scrollTo({top:target,left:leftPane.scrollLeft,behavior})"
  );

  // 8. JS injection
  if (!content.includes('setupDragToPan(document.getElementById(\'leftPane\'))')) {
    // If has old zoom script, replace it
    const oldPracticeJsRegex = /let zoomLevel=Number\(localStorage\.getItem\('reading_article_zoom'\)\|\|100\);[\s\S]*?setTimeout\(\(\)=>applyZoom\(zoomLevel\),60\);/;
    if (oldPracticeJsRegex.test(content)) {
      content = content.replace(oldPracticeJsRegex, newPracticeJs);
    } else {
      // Raw file without zoom JS: insert before const jump
      content = content.replace(
        /const jump=document\.getElementById\('jump'\);/,
        `${newPracticeJs}\nconst jump=document.getElementById('jump');`
      );
    }
  }

  // 9. resize hook
  if (content.includes('window.addEventListener(\'resize\',()=>{if(ready&&!fullMode)render()});')) {
    content = content.replace(
      'window.addEventListener(\'resize\',()=>{if(ready&&!fullMode)render()});',
      'window.addEventListener(\'resize\',()=>{if((typeof ready===\'undefined\'||ready)&&!fullMode){if(zoomLevel!==100)applyZoom(zoomLevel);render()}});'
    );
  }

  // 10. Promise.all hook
  if (content.includes('ready=true;setControls();render()')) {
    content = content.replace(
      'ready=true;setControls();render()',
      'ready=true;if(zoomLevel!==100)applyZoom(zoomLevel);setControls();render()'
    );
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    pUpdated++;
  }
}
console.log(`Updated ${pUpdated} of ${practiceFiles.length} practice files.`);

// =============================================
// PROCESS ALL REVIEW FILES
// =============================================
const reviewFiles = fs.readdirSync(yuqueDir).filter(f => f.endsWith('_复盘模式.html')).sort();
console.log(`Processing ${reviewFiles.length} review files...`);
let rUpdated = 0;

for (const file of reviewFiles) {
  const filePath = path.join(yuqueDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. CSS scroll
  if (!content.includes('#leftScroll{overflow-x:auto!important')) {
    content = content.replace('</style>', `${reviewScrollCss}</style>`);
  }

  // 2. leftStage width
  if (content.includes('.leftStage{min-height:100%;background:#f5f7fa;padding:10px}')) {
    content = content.replace(
      '.leftStage{min-height:100%;background:#f5f7fa;padding:10px}',
      '.leftStage{min-height:100%;background:#f5f7fa;padding:10px;width:max-content;min-width:100%}'
    );
  } else if (!content.includes('width:max-content')) {
    content = content.replace(
      '.leftStage{',
      '.leftStage{width:max-content;min-width:100%;'
    );
  }

  // 3. topbar spacer replacement
  if (content.includes('<div class="spacer"></div>')) {
    content = content.replace('<div class="spacer"></div>', zoomControlsHtml);
  }

  // 4. button titles
  if (content.includes('id="prev">上一步</button>')) {
    content = content.replace('id="prev">上一步</button>', 'id="prev" title="上一步 (快捷键: ←)">上一步</button>');
  }
  if (content.includes('id="next" class="primary">下一步</button>')) {
    content = content.replace('id="next" class="primary">下一步</button>', 'id="next" class="primary" title="下一步 (快捷键: →)">下一步</button>');
  }

  // 5. context & place hooks
  if (!content.includes('currentPlace=place')) {
    // Legacy review files
    content = content.replace(
      "leftStage.innerHTML=padHtml+'<div class=\"focusPage '+(ctx.asset==='articleAnnotated'?'annotatedPdfPage':'')+'\" id=\"focusPage\"><img id=\"focusImg\" alt=\"'+escHtml(ctx.label)+'\" width=\"'+ctx.sourceW+'\" height=\"'+ctx.sourceH+'\"></div>'+padHtml;",
      "leftStage.innerHTML=padHtml+'<div class=\"focusPage '+(ctx.asset==='articleAnnotated'?'annotatedPdfPage':'')+'\" id=\"focusPage\"><img id=\"focusImg\" alt=\"'+escHtml(ctx.label)+'\" width=\"'+ctx.sourceW+'\" height=\"'+ctx.sourceH+'\"></div>'+padHtml;if(zoomLevel!==100)applyZoom(zoomLevel);"
    );
    content = content.replace(
      "const place=restoreOr(()=>{",
      "const place=restoreOr(()=>{currentPlace=place;"
    );
    content = content.replace(
      "leftStage.innerHTML='<div class=\"newtypePaper\">'+NEWTYPE[key]+'</div>';",
      "leftStage.innerHTML='<div class=\"newtypePaper\">'+NEWTYPE[key]+'</div>';if(zoomLevel!==100)applyZoom(zoomLevel);"
    );
    content = content.replace(
      "leftStage.innerHTML='';delete leftStage.dataset.kind;",
      "leftStage.innerHTML='';delete leftStage.dataset.kind;currentPlace=null;"
    );

    // Newer review files (template literals & standard place)
    content = content.replace(
      /leftStage\.innerHTML=`<div class="newtypePaper">\$\{body\}<\/div>`;/g,
      'leftStage.innerHTML=`<div class="newtypePaper">${body}</div>`;if(zoomLevel!==100)applyZoom(zoomLevel);'
    );
    content = content.replace(
      /img\.src=src;\r?\n\s*const place=/g,
      "img.src=src;if(zoomLevel!==100)applyZoom(zoomLevel);\n const place="
    );
    content = content.replaceAll(
      "const place=()=>{",
      "const place=()=>{currentPlace=place;"
    );
    content = content.replace(
      /leftScroll\.scrollTo\(\{top:target,behavior:'auto'\}\);/g,
      "leftScroll.scrollTo({top:target,left:leftScroll.scrollLeft,behavior:'auto'});if(zoomLevel>100&&leftScroll.scrollLeft===0)centerHorizontal();"
    );
    content = content.replace(
      /leftStage\.innerHTML\s*=\s*'';\s*\}/g,
      "leftStage.innerHTML='';currentPlace=null;}"
    );
  }

  // 6. JS injection
  if (!content.includes('setupDragToPan(document.getElementById(\'leftScroll\'))')) {
    const oldReviewJsRegex = /let zoomLevel=Number\(localStorage\.getItem\('reading_review_zoom'\)\|\|localStorage\.getItem\('reading_article_zoom'\)\|\|100\);[\s\S]*?setTimeout\(\(\)=>applyZoom\(zoomLevel\),60\);/;
    const keydownRegex = /(?:document|window)\.addEventListener\('keydown'[\s\S]*?\}\);\s*render\(\);/;

    if (oldReviewJsRegex.test(content)) {
      content = content.replace(oldReviewJsRegex, newReviewJs);
    } else if (keydownRegex.test(content)) {
      content = content.replace(keydownRegex, `${newReviewJs}\nrender();`);
    } else if (content.includes('render();\n\n\n</script>')) {
      content = content.replace('render();\n\n\n</script>', `${newReviewJs}\nrender();\n\n\n</script>`);
    } else if (content.includes('render();\n</script>')) {
      content = content.replace('render();\n</script>', `${newReviewJs}\nrender();\n</script>`);
    } else if (content.includes('render();</script>')) {
      content = content.replace('render();</script>', `${newReviewJs}\nrender();</script>`);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    rUpdated++;
  }
}
console.log(`Updated ${rUpdated} of ${reviewFiles.length} review files.`);

// =============================================
// GENERATE YUQUE MANIFEST
// =============================================
const manifest = {
  practice: {},
  review: {}
};

for (const file of practiceFiles) {
  const key = file.replace('_做题模式.html', '');
  manifest.practice[key] = file;
}

for (const file of reviewFiles) {
  const key = file.replace('_复盘模式.html', '');
  manifest.review[key] = file;
}

const manifestPath = path.join(rootDir, 'js/yuque_manifest.js');
const manifestContent = `window.YuqueManifest = ${JSON.stringify(manifest, null, 2)};\n`;
fs.writeFileSync(manifestPath, manifestContent, 'utf8');
console.log(`Successfully generated js/yuque_manifest.js with ${Object.keys(manifest.practice).length} practice and ${Object.keys(manifest.review).length} review entries.`);
