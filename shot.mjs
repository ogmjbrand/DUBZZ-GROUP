import { chromium } from 'playwright';

const widths = process.argv[2] ? process.argv[2].split(',').map(Number) : [375, 768, 1440];
const path = process.argv[3] || '/';
const label = process.argv[4] || 'home';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  await page.goto('http://localhost:3000' + path, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1200);
  // scroll through to trigger reveals
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 180));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
  const overflow = await page.evaluate(() => ({
    docWidth: document.documentElement.scrollWidth,
    winWidth: window.innerWidth,
    offenders: [...document.querySelectorAll('body *')]
      .filter(el => el.getBoundingClientRect().right > window.innerWidth + 2)
      .slice(0, 6)
      .map(el => el.tagName + '.' + (typeof el.className === 'string' ? el.className.slice(0, 70) : '')),
  }));
  await page.screenshot({ path: `/tmp/shots/${label}-${w}.png`, fullPage: true });
  console.log(`[${w}] overflow doc=${overflow.docWidth} win=${overflow.winWidth}`, overflow.offenders.length ? overflow.offenders : '', errors.length ? '\n  ERRORS: ' + errors.slice(0,4).join(' | ') : '');
  await page.close();
}
await browser.close();
