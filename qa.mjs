import { chromium } from 'playwright';

const routes = [
  '/', '/about', '/media', '/media/booking', '/wear', '/wear/product/signature-hoodie',
  '/wear/bag', '/wear/wishlist', '/wine-resort', '/wine-resort/experiences', '/wine-resort/dining',
  '/wine-resort/events', '/wine-resort/gallery', '/wine-resort/booking/sanctuary',
  '/trade', '/trade/inquiry', '/after-dark', '/blog', '/blog/the-architecture-of-restraint',
  '/careers', '/contact', '/group/investors', '/group/story', '/login', '/signup',
  '/search', '/privacy', '/terms', '/nonexistent-page',
];
const widths = [375, 1440];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0;
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  for (const r of routes) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
    page.on('pageerror', e => errors.push('PAGEERROR ' + e.message.slice(0, 160)));
    let status = 0;
    try {
      const resp = await page.goto('http://localhost:3000' + r, { waitUntil: 'domcontentloaded', timeout: 45000 });
      status = resp?.status() ?? 0;
      await page.waitForTimeout(700);
    } catch (e) { errors.push('NAV ' + e.message.slice(0, 120)); }
    const info = await page.evaluate(() => {
      const doc = document.documentElement;
      const h1s = [...document.querySelectorAll('h1')].map(h => h.textContent.trim().slice(0, 40));
      const imgsNoAlt = [...document.querySelectorAll('img:not([alt])')].length;
      const emptyLinks = [...document.querySelectorAll('a')].filter(a => !a.textContent.trim() && !a.getAttribute('aria-label')).length;
      const btnNoName = [...document.querySelectorAll('button')].filter(b => !b.textContent.trim() && !b.getAttribute('aria-label')).length;
      return { over: doc.scrollWidth - window.innerWidth, h1: h1s.length, h1text: h1s[0] || '', imgsNoAlt, emptyLinks, btnNoName };
    }).catch(() => ({ over: -1, h1: -1 }));
    const bad = status >= 400 && r !== '/nonexistent-page' || info.over > 1 || info.h1 !== 1 || errors.length || info.imgsNoAlt || info.emptyLinks || info.btnNoName;
    if (bad) fails++;
    console.log(`${bad ? 'FAIL' : ' ok '} [${w}] ${status} ${r} h1=${info.h1} over=${info.over}` +
      (info.imgsNoAlt ? ` imgsNoAlt=${info.imgsNoAlt}` : '') +
      (info.emptyLinks ? ` emptyLinks=${info.emptyLinks}` : '') +
      (info.btnNoName ? ` btnNoName=${info.btnNoName}` : '') +
      (errors.length ? `\n      ${errors.slice(0, 2).join(' | ')}` : ''));
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(fails ? `\n${fails} route/viewport combinations flagged` : '\nAll clean');
