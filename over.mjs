import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 320, height: 800 } });
await p.goto('http://localhost:3000/wine-resort', { waitUntil: 'networkidle', timeout: 45000 });
await p.waitForTimeout(800);
console.log(await p.evaluate(() => [...document.querySelectorAll('body *')]
  .filter(el => { const r = el.getBoundingClientRect(); return r.right > window.innerWidth + 1 && r.width > 0 && getComputedStyle(el).position !== 'fixed'; })
  .slice(0, 8)
  .map(el => `${el.tagName}.${(typeof el.className === 'string' ? el.className : '').slice(0,90)} right=${Math.round(el.getBoundingClientRect().right)} text=${(el.textContent||'').trim().slice(0,40)}`)));
await b.close();
