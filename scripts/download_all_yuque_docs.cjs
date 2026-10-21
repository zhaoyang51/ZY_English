const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function getCookiesForBook(url, password, port) {
  const userDataDir = `C:\\Users\\夜斗\\AppData\\Local\\Temp\\chrome_fetch_${Date.now()}_${port}`;
  const chromeProc = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
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
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  };

  await send('Network.enable');
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

  await new Promise(r => setTimeout(r, 4500));

  const cookiesRes = await send('Network.getCookies');
  const cookieHeader = cookiesRes.cookies.map(c => `${c.name}=${c.value}`).join('; ');

  ws.close();
  chromeProc.kill();
  return cookieHeader;
}

async function fetchAllDocsForBook(bookInfo, docsList, cookie, outputName) {
  console.log(`\nFetching ${docsList.length} docs for "${bookInfo.name}"...`);
  const fullDocs = [];

  for (let i = 0; i < docsList.length; i++) {
    const docMeta = docsList[i];
    const url = `https://www.yuque.com/api/docs/${docMeta.slug}?include_contributors=true&include_like=true&include_hits=true&merge_dynamic_data=false&book_id=${bookInfo.id}`;
    
    try {
      const res = await fetch(url, {
        headers: {
          'Cookie': cookie,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': `https://www.yuque.com/nanxiao_fighters/${bookInfo.slug}`
        }
      });

      if (!res.ok) {
        console.error(`  [${i + 1}/${docsList.length}] Failed to fetch doc ${docMeta.title}: ${res.status}`);
        continue;
      }

      const json = await res.json();
      const docData = json.data || {};
      
      // Extract SVGs from content
      const content = docData.content || '';
      const cardValues = content.match(/data-card-value="([^"]+)"/g) || [];
      const svgs = [];
      for (const cv of cardValues) {
        try {
          const decoded = decodeURIComponent(cv.replace('data-card-value="', '').slice(0, -1));
          const parsed = JSON.parse(decoded);
          if (parsed.src && parsed.src.includes('.svg')) {
            svgs.push(parsed.src);
          }
        } catch(e) {}
      }

      // Also regex fallback
      const directMatches = content.match(/https:\/\/cdn\.nlark\.com\/yuque\/[^\s"'\\]+\.svg/g) || [];
      for (const m of directMatches) {
        if (!svgs.includes(m)) svgs.push(m);
      }

      fullDocs.push({
        id: docData.id,
        title: docData.title,
        slug: docData.slug,
        description: docData.description,
        content: content,
        svgs: svgs
      });

      if ((i + 1) % 10 === 0 || i === docsList.length - 1) {
        console.log(`  Progress: ${i + 1}/${docsList.length} docs (Total SVGs so far: ${fullDocs.reduce((acc, d) => acc + d.svgs.length, 0)})`);
      }
    } catch(err) {
      console.error(`  Error fetching ${docMeta.title}:`, err.message);
    }

    // small sleep
    await new Promise(r => setTimeout(r, 80));
  }

  const outPath = path.resolve(__dirname, '..', 'data', outputName);
  fs.writeFileSync(outPath, JSON.stringify({ book: bookInfo, docs: fullDocs }, null, 2), 'utf-8');
  console.log(`Saved ${fullDocs.length} full docs with ${fullDocs.reduce((acc, d) => acc + d.svgs.length, 0)} SVGs to ${outputName}`);
}

async function main() {
  const daxueRaw = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'yuque_daxue_raw.json'), 'utf-8'));
  const suchengRaw = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'yuque_sucheng_raw.json'), 'utf-8'));

  console.log("Step 1: Unlocking Daxue book...");
  const cookieDaxue = await getCookiesForBook('https://www.yuque.com/nanxiao_fighters/zq78i4', 'pyme', 9337);
  console.log("Got Daxue cookie, length:", cookieDaxue.length);

  await fetchAllDocsForBook(daxueRaw.book, daxueRaw.docs, cookieDaxue, 'yuque_daxue_full.json');

  console.log("\nStep 2: Unlocking Sucheng book...");
  const cookieSucheng = await getCookiesForBook('https://www.yuque.com/nanxiao_fighters/pm1wwt', 'tbvt', 9338);
  console.log("Got Sucheng cookie, length:", cookieSucheng.length);

  await fetchAllDocsForBook(suchengRaw.book, suchengRaw.docs, cookieSucheng, 'yuque_sucheng_full.json');

  console.log("\nALL FULL DOCS DOWNLOADED SUCCESSFULLY!");
}

main().catch(console.error);
