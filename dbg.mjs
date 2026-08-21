import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 860 } });
p.on('console', m => console.log('CONSOLE', m.type(), m.text().slice(0,300)));
p.on('pageerror', e => console.log('PAGEERROR', e.message.slice(0,500)));
await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(2000);
console.log(await p.evaluate(() => ({ body: document.body.scrollHeight, html: document.documentElement.scrollHeight, sections: document.querySelectorAll('section').length })));
await b.close();
