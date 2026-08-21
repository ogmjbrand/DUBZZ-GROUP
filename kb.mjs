import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

// 1. Keyboard: tab order reaches the ecosystem ring and the roadmap tablist,
//    and the roadmap responds to arrow keys.
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(2500);

const focusables = await p.evaluate(() => document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])').length);
console.log('focusable elements on /:', focusables);

// skip link
await p.keyboard.press('Tab');
console.log('first tab stop:', await p.evaluate(() => document.activeElement?.textContent?.trim().slice(0,30)));

// roadmap tablist keyboard behaviour
const tab = await p.$('[role="tablist"] [role="tab"][aria-selected="true"]');
await tab.focus();
const before = await p.$eval('[role="tabpanel"]', el => el.id);
await p.keyboard.press('ArrowRight');
await p.waitForTimeout(700);
const after = await p.$eval('[role="tabpanel"]', el => el.id);
console.log('roadmap arrow key:', before, '->', after, before !== after ? 'OK' : 'NO CHANGE');
await p.keyboard.press('End');
await p.waitForTimeout(700);
console.log('roadmap End key:', await p.$eval('[role="tabpanel"]', el => el.id));

// ecosystem nodes are focusable and update the live region
const nodeCount = await p.evaluate(() => document.querySelectorAll('[aria-pressed]').length);
console.log('ecosystem focusable nodes:', nodeCount);
await p.close();

// 2. Reduced motion: no Lenis, video not fetched, reveals resolve to visible.
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const p2 = await ctx.newPage();
const videoReqs = [];
p2.on('request', r => { if (/\.(webm|mp4)$/.test(r.url())) videoReqs.push(r.url()); });
await p2.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
await p2.waitForTimeout(1500);
console.log('reduced-motion video requests:', videoReqs.length);
console.log('lenis active:', await p2.evaluate(() => document.documentElement.classList.contains('lenis-active')));
console.log('hero h1 visible opacity:', await p2.$eval('h1', el => getComputedStyle(el.closest('div')).opacity));
await b.close();
