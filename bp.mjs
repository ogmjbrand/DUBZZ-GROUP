import { chromium } from 'playwright';
const widths = [320, 375, 390, 430, 768, 1024, 1440, 1920];
const routes = ['/', '/about', '/wear', '/wine-resort', '/trade', '/after-dark', '/media', '/contact'];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 800 } });
  const out = [];
  for (const r of routes) {
    const p = await ctx.newPage();
    await p.goto('http://localhost:3000' + r, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await p.waitForTimeout(500);
    const d = await p.evaluate(() => {
      const over = document.documentElement.scrollWidth - window.innerWidth;
      // smallest rendered font size in visible text
      let min = 99;
      for (const el of document.querySelectorAll('p,span,li,a,h1,h2,h3,dt,dd')) {
        if (!el.textContent.trim() || el.offsetParent === null) continue;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs < min) min = fs;
      }
      return { over, min };
    });
    out.push(`${r}:${d.over > 1 ? 'OVER' + d.over : 'ok'}/${d.min}px`);
    await p.close();
  }
  console.log(`[${w}]`, out.join('  '));
  await ctx.close();
}
await b.close();
