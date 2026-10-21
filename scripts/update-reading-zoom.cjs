const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../英二做题和复盘模式');

// 1. Update 做题模式 files
const practiceFiles = fs.readdirSync(dir).filter(f => f.endsWith('_做题模式.html'));
console.log(`Found ${practiceFiles.length} practice files.`);

let practiceUpdated = 0;
for (const file of practiceFiles) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let changed = false;
  if (content.includes('applyZoom(zoomLevel+15)')) {
    content = content.replace(/applyZoom\(zoomLevel\+15\)/g, 'applyZoom(zoomLevel+5)');
    changed = true;
  }
  if (content.includes('applyZoom(zoomLevel-15)')) {
    content = content.replace(/applyZoom\(zoomLevel-15\)/g, 'applyZoom(zoomLevel-5)');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    practiceUpdated++;
  }
}
console.log(`Updated ${practiceUpdated} practice files to 5% zoom step.`);

// 2. Update 复盘模式 files
const reviewFiles = fs.readdirSync(dir).filter(f => f.endsWith('_复盘模式.html'));
console.log(`Found ${reviewFiles.length} review files.`);

const zoomControlsHtml = `<div class="zoomControls" style="display:inline-flex;align-items:center;gap:6px;margin-right:auto"><span style="font-size:13px;color:var(--muted);font-weight:600">🔍 文章:</span><button id="zoomOut" class="btn" title="缩小文章 (A-)" style="padding:4px 9px;font-size:12px;line-height:1">A -</button><span id="zoomVal" style="font-size:12px;font-weight:700;color:var(--ink);min-width:38px;text-align:center">100%</span><button id="zoomIn" class="btn" title="放大文章 (A+)" style="padding:4px 9px;font-size:12px;line-height:1">A +</button><button id="zoomReset" class="btn" title="还原默认大小" style="padding:4px 8px;font-size:12px;line-height:1">↺</button></div>`;

const zoomJsStandard = `
let zoomLevel=Number(localStorage.getItem('reading_review_zoom')||localStorage.getItem('reading_article_zoom')||100);
if(isNaN(zoomLevel)||zoomLevel<70||zoomLevel>240)zoomLevel=100;
let currentPlace=null;
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
}
const zIn=document.getElementById('zoomIn');
if(zIn)zIn.onclick=()=>{applyZoom(zoomLevel+5);if(currentPlace)currentPlace();};
const zOut=document.getElementById('zoomOut');
if(zOut)zOut.onclick=()=>{applyZoom(zoomLevel-5);if(currentPlace)currentPlace();};
const zReset=document.getElementById('zoomReset');
if(zReset)zReset.onclick=()=>{applyZoom(100);if(currentPlace)currentPlace();};
setTimeout(()=>applyZoom(zoomLevel),60);
`;

let reviewUpdated = 0;
for (const file of reviewFiles) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has zoomControls
  if (content.includes('id="zoomIn"')) {
    console.log(`${file} already has zoom controls, skipping.`);
    continue;
  }

  // 1. Replace topbar spacer
  if (content.includes('<div class="spacer"></div>')) {
    content = content.replace('<div class="spacer"></div>', zoomControlsHtml);
  }

  // 2. CSS: Make .leftStage width:max-content;min-width:100%
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

  if (file === '2025_text2_复盘模式.html') {
    // 2025_text2 specific hooks
    content = content.replace(
      'leftStage.innerHTML=`<div class="scrollPad"',
      'leftStage.innerHTML=`<div class="scrollPad"'
    );
    // hook in renderImage
    content = content.replace(
      "const img=$('#leftImg'),page=$('#annotatedPage'),anchor=$('#focusAnchor'); img.src=DATA.assets[asset];",
      "const img=$('#leftImg'),page=$('#annotatedPage'),anchor=$('#focusAnchor'); img.src=DATA.assets[asset];if(zoomLevel!==100)applyZoom(zoomLevel);"
    );
    // hook place in renderImage
    content = content.replace(
      "const place=()=>{",
      "const place=()=>{currentPlace=place;"
    );
    // hook renderNewType
    content = content.replace(
      "leftStage.innerHTML=`<div class=\"newtypePaper\">${mode==='sorting'?DATA.newType.sorting:DATA.newType.smallTitle}</div>`;",
      "leftStage.innerHTML=`<div class=\"newtypePaper\">${mode==='sorting'?DATA.newType.sorting:DATA.newType.smallTitle}</div>`;if(zoomLevel!==100)applyZoom(zoomLevel);"
    );
    // insert zoom JS before render();
    if (!content.includes('applyZoom(zoomLevel+5)')) {
      content = content.replace(
        /render\(\);(\r?\n)?<\/script>/,
        zoomJsStandard + "\nrender();$1</script>"
      );
    }
  } else {
    // 31 standard review files
    // In renderContext: hook image focusPage zoom
    content = content.replace(
      "leftStage.innerHTML=padHtml+'<div class=\"focusPage '+(ctx.asset==='articleAnnotated'?'annotatedPdfPage':'')+'\" id=\"focusPage\"><img id=\"focusImg\" alt=\"'+escHtml(ctx.label)+'\" width=\"'+ctx.sourceW+'\" height=\"'+ctx.sourceH+'\"></div>'+padHtml;",
      "leftStage.innerHTML=padHtml+'<div class=\"focusPage '+(ctx.asset==='articleAnnotated'?'annotatedPdfPage':'')+'\" id=\"focusPage\"><img id=\"focusImg\" alt=\"'+escHtml(ctx.label)+'\" width=\"'+ctx.sourceW+'\" height=\"'+ctx.sourceH+'\"></div>'+padHtml;if(zoomLevel!==100)applyZoom(zoomLevel);"
    );
    // In renderContext: hook place
    content = content.replace(
      "const place=restoreOr(()=>{",
      "const place=restoreOr(()=>{currentPlace=place;"
    );
    // In renderContext: hook newtype
    content = content.replace(
      "leftStage.innerHTML='<div class=\"newtypePaper\">'+NEWTYPE[key]+'</div>';",
      "leftStage.innerHTML='<div class=\"newtypePaper\">'+NEWTYPE[key]+'</div>';if(zoomLevel!==100)applyZoom(zoomLevel);"
    );
    // In render: clear currentPlace when no context
    content = content.replace(
      "leftStage.innerHTML='';delete leftStage.dataset.kind;",
      "leftStage.innerHTML='';delete leftStage.dataset.kind;currentPlace=null;"
    );

    // Insert zoom JS before render();
    content = content.replace(
      "render();\n\n\n</script>",
      zoomJsStandard + "\nrender();\n\n\n</script>"
    );
    if (!content.includes('applyZoom(zoomLevel)')) {
      content = content.replace(
        "render();\n</script>",
        zoomJsStandard + "\nrender();\n</script>"
      );
    }
    if (!content.includes('applyZoom(zoomLevel)')) {
      content = content.replace(
        "render();</script>",
        zoomJsStandard + "\nrender();</script>"
      );
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  reviewUpdated++;
}

console.log(`Updated ${reviewUpdated} review files with zoom controls.`);
