const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function extractYuqueBook(url, password, outputFileName) {
  console.log(`\n========================================`);
  console.log(`Extracting: ${url}`);
  
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDataDir = `C:\\Users\\夜斗\\AppData\\Local\\Temp\\chrome_ext_${Date.now()}`;
  const port = 9334;
  
  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const target = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json/list`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const arr = JSON.parse(data);
        const page = arr.find(t => t.type === 'page') || arr[0];
        resolve(page);
      });
    }).on('error', reject);
  });

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let msgId = 1;
  const pending = new Map();
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise(r => ws.onopen = r);
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const resolve = pending.get(msg.id);
      pending.delete(msg.id);
      resolve(msg.result);
    }
  };

  await send('Page.enable');
  await send('Runtime.enable');

  await send('Page.navigate', { url });
  await new Promise(r => setTimeout(r, 3500));

  // Enter password
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const input = document.querySelector('input');
        if (input) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(input, '${password}');
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      })()
    `
  });

  // Wait for unlock & reload
  await new Promise(r => setTimeout(r, 5000));

  // Fetch book TOC and docs using the in-page fetch
  const bookData = await send('Runtime.evaluate', {
    expression: `
      (async () => {
        const book = window.appData?.book;
        const bookId = book?.id;
        const docsRes = await fetch('/api/docs?book_id=' + bookId).then(r => r.json());
        return {
          book: {
            id: book?.id,
            name: book?.name,
            slug: book?.slug,
            toc: book?.toc || []
          },
          docsList: docsRes?.data || []
        };
      })()
    `,
    awaitPromise: true,
    returnByValue: true
  });

  const data = bookData.result.value;
  console.log(`Book: "${data.book.name}", ID: ${data.book.id}, TOC items: ${data.book.toc.length}, Docs count: ${data.docsList.length}`);

  // Now fetch each doc content
  const allDocs = [];
  for (let i = 0; i < data.docsList.length; i++) {
    const docMeta = data.docsList[i];
    console.log(`[${i + 1}/${data.docsList.length}] Fetching doc: ${docMeta.title} (${docMeta.slug})`);
    
    const docContent = await send('Runtime.evaluate', {
      expression: `
        (async () => {
          try {
            const res = await fetch('/api/docs/${docMeta.slug}?book_id=${data.book.id}&include_contributors=true').then(r => r.json());
            return res.data;
          } catch(e) {
            return { error: e.message };
          }
        })()
      `,
      awaitPromise: true,
      returnByValue: true
    });

    const fullDoc = docContent.result.value || {};
    allDocs.push({
      id: docMeta.id,
      title: docMeta.title,
      slug: docMeta.slug,
      body: fullDoc.body || fullDoc.body_html || fullDoc.body_asl || '',
      body_draft: fullDoc.body_draft || '',
      description: fullDoc.description || ''
    });

    // small pause to avoid rate limiting
    await new Promise(r => setTimeout(r, 200));
  }

  const result = {
    book: data.book,
    docs: allDocs
  };

  const outPath = path.resolve(__dirname, '..', 'data', outputFileName);
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`Saved ${allDocs.length} docs to ${outPath}`);

  ws.close();
  chromeProc.kill();
}

async function run() {
  try {
    await extractYuqueBook('https://www.yuque.com/nanxiao_fighters/zq78i4', 'pyme', 'yuque_daxue_raw.json');
    await extractYuqueBook('https://www.yuque.com/nanxiao_fighters/pm1wwt', 'tbvt', 'yuque_sucheng_raw.json');
    console.log("\nALL BOOKS EXTRACTED SUCCESSFULLY!");
  } catch (err) {
    console.error("Extraction error:", err);
  }
}

run();
