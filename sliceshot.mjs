import { chromium } from 'playwright';
// Capture viewport-sized frames while scrolling, which reviews far better than
// one enormous full-page PNG.
const [width, path, label, count] = [Number(process.argv[2]), process.argv[3], process.argv[4], Number(process.argv[5] || 6)];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width, height: 860 } });
await page.goto('http://localhost:3000' + path, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1000);
const total = await page.evaluate(() => document.body.scrollHeight);
for (let i = 0; i < count; i++) {
  const y = Math.round((total - 860) * (i / (count - 1)));
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/tmp/shots/${label}-${width}-f${i}.png` });
}
console.log('total height', total);
await browser.close();
