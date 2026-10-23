const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../英二做题和复盘模式');

const oldZoomControls = `<div class="zoomControls" style="display:inline-flex;align-items:center;gap:6px;margin-right:auto"><span style="font-size:13px;color:var(--muted);font-weight:600">🔍 文章:</span><button id="zoomOut" class="btn" title="缩小文章 (A-)" style="padding:4px 9px;font-size:12px;line-height:1">A -</button><span id="zoomVal" style="font-size:12px;font-weight:700;color:var(--ink);min-width:38px;text-align:center">100%</span><button id="zoomIn" class="btn" title="放大文章 (A+)" style="padding:4px 9px;font-size:12px;line-height:1">A +</button><button id="zoomReset" class="btn" title="还原默认大小" style="padding:4px 8px;font-size:12px;line-height:1">↺</button></div>`;

const newZoomControls = `<div class="zoomControls" style="display:inline-flex;align-items:center;gap:5px;margin-right:auto"><span style="font-size:13px;color:var(--muted);font-weight:600">🔍 文章:</span><button id="zoomOut" class="btn" title="缩小文章 (A-)" style="padding:4px 8px;font-size:12px;line-height:1">A -</button><span id="zoomVal" style="font-size:12px;font-weight:700;color:var(--ink);min-width:38px;text-align:center">100%</span><button id="zoomIn" class="btn" title="放大文章 (A+)" style="padding:4px 8px;font-size:12px;line-height:1">A +</button><button id="zoomReset" class="btn" title="还原默认大小" style="padding:4px 7px;font-size:12px;line-height:1">↺</button><span style="color:#d1d5db;font-size:12px;margin:0 1px">|</span><button id="panLeft" class="btn" title="向左平移画布 (也可直接按住鼠标拖拽)" style="padding:4px 7px;font-size:12px;line-height:1">◀</button><button id="panCenter" class="btn" title="恢复水平居中" style="padding:4px 8px;font-size:12px;line-height:1">居中</button><button id="panRight" class="btn" title="向右平移画布 (也可直接按住鼠标拖拽)" style="padding:4px 7px;font-size:12px;line-height:1">▶</button></div>`;

const practiceScrollCss = `#leftPane{overflow-x:auto!important;overflow-y:auto!important}#leftPane::-webkit-scrollbar{width:8px;height:8px}#leftPane::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}#leftPane::-webkit-scrollbar-thumb:hover{background:#94a3b8}#leftPane img{user-select:none;-webkit-user-drag:none}`;

const reviewScrollCss = `#leftScroll{overflow-x:auto!important;overflow-y:auto!important}#leftScroll::-webkit-scrollbar{width:8px;height:8px}#leftScroll::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}#leftScroll::-webkit-scrollbar-thumb:hover{background:#94a3b8}#leftScroll img{user-select:none;-webkit-user-drag:none}`;

// ==========================================
// 1. UPDATE 做题模式 FILES (32 files)
// ==========================================
const practiceFiles = fs.readdirSync(dir).filter(f => f.endsWith('_做题模式.html'));
let pCount = 0;

for (const file of practiceFiles) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace toolbar controls
  if (content.includes(oldZoomControls)) {
    content = content.replace(oldZoomControls, newZoomControls);
  }

  // Inject CSS if not already present
  if (!content.includes('#leftPane{overflow-x:auto!important')) {
    content = content.replace('</style>', `${practiceScrollCss}</style>`);
  }

  // Update zoom JS
  const oldPracticeJsRegex = /let zoomLevel=Number\(localStorage\.getItem\('reading_article_zoom'\)\|\|100\);[\s\S]*?setTimeout\(\(\)=>applyZoom\(zoomLevel\),60\);/;
  
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
setTimeout(()=>applyZoom(zoomLevel),60);`;

  if (oldPracticeJsRegex.test(content)) {
    content = content.replace(oldPracticeJsRegex, newPracticeJs);
  }

  // Ensure scrollToWrap and centerRects do not reset scrollLeft
  content = content.replace(
    /leftPane\.scrollTo\(\{top:target,behavior:'smooth'\}\)/g,
    "leftPane.scrollTo({top:target,left:leftPane.scrollLeft,behavior:'smooth'})"
  );
  content = content.replace(
    /leftPane\.scrollTo\(\{top:target,behavior\}\)/g,
    "leftPane.scrollTo({top:target,left:leftPane.scrollLeft,behavior})"
  );

  fs.writeFileSync(filePath, content, 'utf8');
  pCount++;
}
console.log(`Updated ${pCount} Practice files with horizontal pan & center.`);

// ==========================================
// 2. UPDATE 复盘模式 FILES (32 files)
// ==========================================
const reviewFiles = fs.readdirSync(dir).filter(f => f.endsWith('_复盘模式.html'));
let rCount = 0;

for (const file of reviewFiles) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace toolbar controls
  if (content.includes(oldZoomControls)) {
    content = content.replace(oldZoomControls, newZoomControls);
  }

  // Inject CSS if not already present
  if (!content.includes('#leftScroll{overflow-x:auto!important')) {
    content = content.replace('</style>', `${reviewScrollCss}</style>`);
  }

  // Update zoom JS
  const oldReviewJsRegex = /let zoomLevel=Number\(localStorage\.getItem\('reading_review_zoom'\)\|\|localStorage\.getItem\('reading_article_zoom'\)\|\|100\);[\s\S]*?setTimeout\(\(\)=>applyZoom\(zoomLevel\),60\);/;

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
setTimeout(()=>applyZoom(zoomLevel),60);`;

  if (oldReviewJsRegex.test(content)) {
    content = content.replace(oldReviewJsRegex, newReviewJs);
  }

  // Hook place in review files to center horizontally if zoomed
  if (content.includes('leftScroll.scrollTop=imageTarget(ctx,{top,height,view:leftScroll.clientHeight,max:leftScroll.scrollHeight-leftScroll.clientHeight});')) {
    content = content.replace(
      'leftScroll.scrollTop=imageTarget(ctx,{top,height,view:leftScroll.clientHeight,max:leftScroll.scrollHeight-leftScroll.clientHeight});',
      'leftScroll.scrollTop=imageTarget(ctx,{top,height,view:leftScroll.clientHeight,max:leftScroll.scrollHeight-leftScroll.clientHeight});if(zoomLevel>100)centerHorizontal();'
    );
  }

  // 2025 Text 2 specific hook
  if (file === '2025_text2_复盘模式.html') {
    if (content.includes('leftScroll.scrollTop=top-view*.3;')) {
      content = content.replace(
        'leftScroll.scrollTop=top-view*.3;',
        'leftScroll.scrollTop=top-view*.3;if(zoomLevel>100)centerHorizontal();'
      );
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  rCount++;
}
console.log(`Updated ${rCount} Review files with horizontal pan & center.`);
