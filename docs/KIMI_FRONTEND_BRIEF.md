# Kimi Frontend Execution Brief — Dubzz Group Digital Empire

This is the execution bridge between the master creative brief (`docs/DESIGN_BRIEF.md` — read that first, in full, before anything here) and the actual codebase. Claude owns project scaffolding, backend, CI/CD, and git; **everything below is Kimi's scope**: design system, Tailwind, components, pages, motion, accessibility.

## 1. What's already in place (do not re-scaffold)

- Next.js **16.2.11** (Turbopack) + React **19.2.4** + TypeScript, App Router, ESLint — already runs (`npm run build` / `npm run dev`) at the repo root.
- Tailwind **v4**, CSS-first config (no `tailwind.config.ts`) — tokens live in `app/globals.css` via `@theme inline`, currently the untouched default (Geist fonts, light/dark placeholder colors). **This is the first thing to replace** with the Cinematic Noir / Dubzz Group system below.
- `app/layout.tsx` currently loads placeholder Geist fonts and has default metadata — replace with Playfair Display / Inter / Montserrat and real site metadata.
- **Next.js 16 has breaking changes vs. older training data.** Before using any Next.js API you're not 100% sure of, check `node_modules/next/dist/docs/01-app/` in this repo — it ships the version-matched docs.
- No component library, pages, or content exist yet beyond the default starter page — this is a clean slate.

## 2. Design tokens (Cinematic Noir → Tailwind v4 `@theme`)

Source values (from the original Stitch design system + the master brief — the brief's flatter palette below is the one to implement; the Stitch version had a few extra tonal steps if more nuance is wanted):

```
--color-background: #050505
--color-surface: #0D0D0D
--color-gold: #D4AF37        /* primary accent, use sparingly — "precious resource" */
--color-white: #FFFFFF
--color-neutral: #A1A1AA
--color-success: #10B981
--color-error: #EF4444
```

Fonts: **Playfair Display** (display/headlines), **Inter** (body), **Montserrat** (buttons/nav/labels/overlines, uppercase, tracked-out). Load via `next/font/google` and expose as CSS variables the same way the current placeholder Geist fonts are wired, then swap them into `@theme inline`.

Shape: max 8px corner radius on all components (buttons, cards, inputs) — "the Sharp Rule," no exceptions except pill-shaped search bars/status chips.

Site is **dark-mode-only** — remove the `prefers-color-scheme` light-mode branch entirely rather than supporting both, unless the user asks for a light theme later (brief lists it as optional/low priority).

## 3. Component library to build first

Before pages, build the shared primitives so all ~40+ routes stay consistent:
- `Navbar` — venture switcher across the 5 divisions, sticky, glass-on-scroll
- `Footer` — premium multi-column (nav, newsletter, socials, legal)
- `Button` (primary gold/black, secondary gold-outline, ghost) with the magnetic-cursor hover effect described in the brief
- `Card` (glass surface, gold-gradient border on hover, 4px lift)
- Form primitives (input, select, textarea) — underlined minimalist + gold focus glow
- `GoldShaderBackground` — see §4, a ready-made animated hero background
- Motion primitives: fade-reveal-on-scroll wrapper, animated counter (for the Statistics section), page-transition wrapper

## 4. Reusable asset: liquid-gold WebGL shader

One of the 36 original Stitch screens (id `9f079b42a44245809f16cb0b0a0624fd`, titled "Shader") is not a page — it's a standalone animated background: a mouse-reactive WebGL fragment shader producing a "liquid gold" effect, matching the brief's "animated background" / "luxury cursor interactions" requirements for the Hero. Recommend wrapping it as `components/effects/GoldShaderBackground.tsx` (a full-viewport `<canvas>`, React-ified via `useEffect` + `useRef` instead of raw DOM script injection) and reusing it behind the homepage hero and any other division hero that wants it. The GLSL:

```glsl
// vertex shader
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
```

```glsl
// fragment shader
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    float t = u_time * 0.2;

    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    float wave = sin(p.x * 2.0 + t) * 0.5 + sin(p.y * 3.0 - t * 1.5) * 0.5;
    wave += sin((p.x + p.y) * 4.0 + t * 0.8) * 0.3;

    vec3 baseGold = vec3(0.83, 0.68, 0.21);       // #D4AF37
    vec3 deepGold = vec3(0.3, 0.2, 0.05);
    vec3 highlightGold = vec3(1.0, 0.9, 0.6);

    float detail = smoothstep(-1.0, 1.0, wave);
    vec3 color = mix(deepGold, baseGold, detail);
    color = mix(color, highlightGold, pow(detail, 4.0) * 0.5);

    float vignette = 1.0 - length(p * 0.5);
    color *= smoothstep(0.0, 1.0, vignette);

    gl_FragColor = vec4(color * 0.6, 1.0);
}
```
`u_mouse` is in pixel coordinates matching `u_resolution` (ShaderToy convention); normalize with `u_mouse / u_resolution` inside the shader as shown.

## 5. Route map

The original Stitch export (36 screens, project "Dubzz Digital Empire") only covers the 5 division sub-pages/flows — it has **no** homepage-as-ecosystem-hub, About, Blog, Careers, Contact, Search, Privacy, Terms, or 404. Those are net-new per the master brief's "Inner Pages" section and should be designed fresh from `DESIGN_BRIEF.md`, not derived from Stitch. Where a route does map to an original Stitch screen, treat that screen as **content/reference only** (real copy, structure ideas) — the brief's quality bar supersedes the original screen's visual design; don't just port it 1:1.

Stitch had separate desktop/mobile screens per concept — collapse each pair into **one responsive route** (Tailwind breakpoints), not separate pages.

| Route | Source | Notes |
|---|---|---|
| `/` | New (brief §HOMEPAGE STRUCTURE) | Hero, About Dubzz, Five Divisions, Featured Work, Statistics, Testimonials, Latest News, Final CTA |
| `/about` | New | Extended editorial story, separate from homepage's About section |
| `/blog`, `/blog/[slug]` | New | Luxury blog cards + post template |
| `/careers` | New | |
| `/contact` | New | |
| `/search` | New | |
| `/privacy`, `/terms` | New | |
| `app/not-found.tsx` (404) | New | Custom-designed, on-brand |
| `/group/story` | Stitch: "Dubzz Group \| Our Story & Vision" | |
| `/group/investors` | Stitch: "Dubzz Group \| Investor Relations Portal" | |
| `/group/investors/vault` | Stitch: "...Expanded Resource Vault" | |
| `/group/profile` | Stitch: "...Guest Profile: Inner Circle Hub" | |
| `/group/settings` | Stitch: "...Investor Account Settings" | |
| `/wear` | Stitch: "Dubzz Wear \| Luxury Fashion Store" | product grid |
| `/wear/product/[slug]` | Stitch: "...Obsidian Hoodie" (1 of N products) | |
| `/wear/bag` | Stitch: "...Your Bag & Identity" | |
| `/wear/wishlist` | New (brief §E-COMMERCE) | |
| `/wear/checkout/identity` | Stitch: "...Checkout: Identity & Bag" | |
| `/wear/checkout/shipping` | Stitch: "...Checkout: Shipping Details" | |
| `/wear/checkout/payment` | Stitch: "...Checkout: Payment Terminal" | |
| `/wear/order-confirmed` | Stitch: "...Order Confirmed" | |
| `/wear/account`, `/wear/account/orders` | New (brief: account dashboard, order history) | |
| `/media` | Stitch: "Dubzz Media \| Creative Agency Portfolio" | |
| `/media/case-studies/aureum-global-rebrand` | Stitch case study | |
| `/media/case-studies/project-nightshade` | Stitch case study | |
| `/media/case-studies/obsidian-penthouse` | Stitch: "...Virtual Experience" | |
| `/media/booking` | New (brief lists "Booking" under Media) | |
| `/trade` | Stitch: "Dubzz Trade \| Global Commerce & Logistics" | + commodity showcase, global map (new) |
| `/trade/dashboard` | Stitch: "...Global Commerce Dashboard" | |
| `/trade/inquiry` | New | |
| `/wine-resort` | Stitch: "Dubzz Wine Resort \| Luxury Hospitality" | |
| `/wine-resort/experiences`, `/events`, `/dining`, `/gallery` | New (brief §WINE RESORT) | |
| `/wine-resort/booking/sanctuary` | Stitch: "...Select Your Sanctuary" | |
| `/wine-resort/booking/experience` | Stitch: "...Tailor Your Experience" | |
| `/wine-resort/booking/review` | Stitch: "...Review Your Stay" | |

**Getting the original Stitch reference content:** the Stitch project is "Dubzz Digital Empire" (owned, private). Ask Claude (in the Claude Code session that has Stitch MCP access) to pull fresh screenshots/HTML for any specific screen if you need the original reference — download links are signed/short-lived so they aren't reproduced here. The route map and titles above are stable regardless.

## 6. Forms are UI-only for now

Checkout, booking, contact, and inquiry forms should be built as real, accessible, client-validated form markup, but **not wired to a backend yet** — no real payment/booking/auth logic. Claude will define the API contract once backend scope is settled and wire these forms up to real endpoints in a follow-up pass. Build them so that swapping a `console.log`/local-state submit handler for a real `fetch('/api/...')` call is a small, contained change (i.e., keep submit handlers isolated, don't hardcode fake success states deep in the UI).

## 7. Images

Stitch screens reference externally-hosted placeholder photography (Google-hosted URLs). For this build, either source new imagery/`next/image` static assets, or if reusing any Stitch-hosted images, flag the hostname(s) to Claude so `next.config.ts` `images.remotePatterns` can be updated (that file is shared infrastructure — don't edit it directly to avoid conflicting with backend/CI work happening in parallel).

## 8. Verification

`npm run build`, `npx tsc --noEmit`, and `npm run lint` must all pass clean before handing back. Spot-check responsive behavior at mobile/tablet/desktop/ultra-wide per the brief's §RESPONSIVE, and run an accessibility pass (keyboard nav, contrast) per §ACCESSIBILITY.
