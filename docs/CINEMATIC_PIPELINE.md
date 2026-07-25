# Cinematic Pipeline

How the site's film assets are authored, rendered, and consumed.

Every moving background on this site is **generated from our own design system** — procedural CSS, SVG and canvas driven by Remotion. There is no stock footage and no third-party visual asset anywhere in the pipeline. Assets are rendered locally and committed, so the site has no runtime dependency on any media service.

## Where things live

| Path | Contents |
|---|---|
| `remotion/index.ts` | Remotion entry point (`registerRoot`) |
| `remotion/Root.tsx` | Composition registry |
| `remotion/lib/tokens.ts` | Palette, easing curves, chapter map, fps |
| `remotion/lib/fonts.ts` | Shared typography (Playfair Display, Montserrat) |
| `remotion/lib/Atmosphere.tsx` | Grain, vignette, bloom, particle field |
| `remotion/scenes/*.tsx` | One file per chapter |
| `remotion/compositions/HeroFilm.tsx` | Chapter assembly + grade |
| `remotion.config.ts` | Render settings (CRF, image format, GL renderer) |
| `public/videos/` | Rendered masters (committed) |
| `public/posters/` | Poster frames pulled from the film timeline (committed) |

## The design system boundary

`remotion/lib/tokens.ts` **restates** the values in `app/globals.css` rather than importing them. Remotion compiles a separate bundle with no access to the site's CSS custom properties, and the compositions need literal values to hand to SVG and inline styles.

This means the two files must be changed together. If you change `--color-gold` or `--ease-luxe` in `app/globals.css`, change `palette.gold` / `easeLuxe` in `remotion/lib/tokens.ts` in the same commit. The point of the duplication is that a card settling on the page and a monolith settling in the film decelerate on identical curves — that only holds if both sides are kept in sync.

## Commands

```bash
npm run film:studio        # Interactive editor at localhost:3000
npm run film:render        # 1080p H.264 master  → public/videos/hero-film-1080.mp4
npm run film:render:webm   # 1080p VP9           → public/videos/hero-film-1080.webm
npm run film:render:4k     # 2160p master (--scale=2)
npm run film:poster        # Poster frame        → public/posters/hero-film.jpg
npm run film:all           # mp4 + webm + poster
```

Rendering is **not** part of `npm run build`. The Next.js build never invokes Remotion; it only consumes the committed files in `public/`. Re-render deliberately, review the output, and commit the result.

### Inspecting a single frame

Far cheaper than a full render when checking layout or grade:

```bash
npx remotion still remotion/index.ts HeroFilm out/check.png --frame=900 --scale=0.4
```

## The flagship film

`HeroFilm` — 1260 frames at 30fps (42s), 1920×1080, seamlessly loopable.

| # | Chapter | Frames | Beat |
|---|---|---|---|
| I | Darkness | 0–120 | Holds true black. Earns the first photon. |
| II | Ignition | 90–270 | One light source, anamorphic streak. |
| III | Geometry | 240–450 | Order emerges — concentric rings draw on. |
| IV | Network | 420–630 | Nodes connect; traffic runs the corridors. |
| V | Empire | 600–810 | The network acquires mass. Skyline rises. |
| VI | Divisions | 780–1020 | Five monoliths, each in its house tint. |
| VII | Statement | 990–1170 | "Five houses. One standard." |
| VIII | Signature | 1140–1260 | Wordmark, then decay to black. |

Chapters **overlap by design**. Each `from` starts before the previous chapter's light has decayed, so the film dissolves rather than cuts. The overlap is what makes it read as continuous; hard cuts between these scenes look like a slideshow.

### The loop seam

Signature resolves to exactly `palette.background`, the same value Darkness opens on. That equality is what makes the loop invisible. **If you edit either chapter, preserve it** — any residual light on the final frame shows up as a visible flash when the video wraps to frame 0.

Verify with:

```bash
npx remotion still remotion/index.ts HeroFilm out/first.png --frame=0
npx remotion still remotion/index.ts HeroFilm out/last.png  --frame=1259
```

## Consuming a film on the site

Use `components/effects/CinematicVideo.tsx`. Never drop a raw `<video>` into a page — the component exists to enforce three things that are easy to forget:

- **Reduced motion.** Users who ask for less motion get the poster and the video is never fetched. Checked before mount, so the bytes are genuinely not spent.
- **Off-screen suspension.** Playback pauses when the element leaves the viewport.
- **Save-Data.** Honoured the same way as reduced motion.

```tsx
<CinematicVideo name="hero-film-1080" poster="/posters/hero-film.jpg" />
```

`name` is the basename under `public/videos/`; the component offers `.webm` first and falls back to `.mp4`.

## Adding a new film

1. Add scenes under `remotion/scenes/`, one file per chapter.
2. Assemble in `remotion/compositions/`, reusing `Grain` / `Vignette` / `Bloom` so the grade matches.
3. Register the composition in `remotion/Root.tsx`.
4. Add `film:render:<name>` and poster scripts to `package.json`.
5. Render, review the output, then commit the media.
6. Add a row to the table above.

## Conventions

- **Author at 1920×1080 only.** Higher resolutions come from `--scale` at render time, so layout has one source of truth and cannot drift between sizes.
- **Posters come from the film's own timeline** via `remotion still --frame=N`. A separately-authored poster eventually disagrees with the video it stands in for.
- **No CSS transitions or animations in compositions.** They do not render correctly. Animate from `useCurrentFrame()` through `interpolate()`.
- **Keep motion deterministic.** Use Remotion's seeded `random()` and `noise2D`, never `Math.random()`. Frame N must render identically on every pass or distributed and resumed renders break.
- **Pin font weights** in `remotion/lib/fonts.ts`. A bare `loadFont()` pulls every weight and subset — around 200 requests, paid on every frame.

## Repository weight

Rendered masters are committed, which is a deliberate trade: the site gains no runtime media dependency, and the cost is repo size. Keep an eye on it — if the library grows past a few hundred MB, move `public/videos/` to Git LFS rather than dropping the commit-the-artifact rule.

Check current cost with:

```bash
du -sh public/videos public/posters
```
