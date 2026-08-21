import { chromium } from 'playwright';

// Relative luminance / contrast per WCAG.
const lum = ([r,g,b]) => { const f = c => { c/=255; return c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)**2.4; }; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
const ratio = (a,b) => { const [l1,l2] = [lum(a),lum(b)].sort((x,y)=>y-x); return (l1+0.05)/(l2+0.05); };

const routes = ['/', '/about', '/wear', '/wine-resort', '/trade', '/after-dark', '/media', '/contact', '/careers', '/blog'];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const seen = new Map();
for (const r of routes) {
  const p = await ctx.newPage();
  await p.goto('http://localhost:3000' + r, { waitUntil: 'networkidle', timeout: 45000 });
  await p.waitForTimeout(600);
  const samples = await p.evaluate(() => {
    const out = [];
    // Tailwind v4 emits oklch(), which no regex on the string will give us in
    // sRGB. Painting the colour and reading the pixel back is exact.
    const cv = document.createElement('canvas');
    cv.width = cv.height = 1;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const parseRGB = (s) => {
      cx.clearRect(0, 0, 1, 1);
      cx.fillStyle = '#000';
      cx.fillStyle = s;
      cx.fillRect(0, 0, 1, 1);
      const d = cx.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2]];
    };
    const alphaOf = (s) => {
      cx.clearRect(0, 0, 1, 1);
      cx.fillStyle = s;
      cx.fillRect(0, 0, 1, 1);
      return cx.getImageData(0, 0, 1, 1).data[3] / 255;
    };
    const bgOf = el => {
      let n = el;
      while (n && n !== document.documentElement) {
        const c = getComputedStyle(n).backgroundColor;
        if (c && c !== 'rgba(0, 0, 0, 0)' && alphaOf(c) > 0.85) return parseRGB(c);
        n = n.parentElement;
      }
      return [0,0,0];
    };
    for (const el of document.querySelectorAll('p,span,li,a,h1,h2,h3,h4,dt,dd,label,button')) {
      const t = el.textContent?.trim();
      if (!t || el.children.length || el.offsetParent === null) continue;
      const cs = getComputedStyle(el);
      // Gradient-clipped headings paint through a background, so `color` is
      // transparent and tells us nothing. Measured separately, by eye.
      if (alphaOf(cs.color) < 0.05) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) continue;
      const bg = bgOf(el);
      const fgRaw = parseRGB(cs.color);
      const fa = alphaOf(cs.color);
      // A translucent colour is only as light as what shows through it.
      const fg = fgRaw.map((c, i) => Math.round(c * fa + bg[i] * (1 - fa)));
      out.push({ fg, bg, size: parseFloat(cs.fontSize), weight: cs.fontWeight, text: t.slice(0, 34) });
    }
    return out;
  });
  for (const s of samples) {
    const cr = ratio(s.fg, s.bg);
    const large = s.size >= 24 || (s.size >= 18.66 && Number(s.weight) >= 700);
    const need = large ? 3 : 4.5;
    if (cr < need) {
      const key = s.text + '|' + s.size;
      if (!seen.has(key)) seen.set(key, `${cr.toFixed(2)}:1 need ${need} — ${s.size}px "${s.text}" (${r})`);
    }
  }
  await p.close();
}
console.log([...seen.values()].slice(0, 40).join('\n') || 'No contrast failures');
console.log('total distinct:', seen.size);
await b.close();
