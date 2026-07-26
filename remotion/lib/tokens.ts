import { Easing } from "remotion";

/**
 * Cinematic tokens — the film's half of the design system.
 *
 * These deliberately restate the values in app/globals.css and
 * lib/motion/tokens.ts rather than importing them: Remotion renders in a
 * separate bundle with no access to the site's CSS custom properties, and the
 * film needs literals it can hand to SVG, canvas and inline styles.
 *
 * If a colour or curve changes in globals.css, change it here too. The whole
 * point is that a monolith settling on the site and one settling in the film
 * decelerate identically.
 */

export const palette = {
  background: "#000000",
  surface: "#0d0d0d",
  surface2: "#141414",
  gold: "#d4af37",
  goldBright: "#f0d98c",
  goldDeep: "#8a6d1d",
  white: "#ffffff",
  neutral: "#a1a1aa",
} as const;

/** Division tints, in narrative order. Mirrors the accents in lib/data/divisions.ts. */
export const divisionTints = [
  { name: "Group", hex: "#d4af37" },
  { name: "Media", hex: "#ffffff" },
  { name: "Wear", hex: "#f0d98c" },
  { name: "Wines Resort", hex: "#d4af37" },
  { name: "Trade", hex: "#a8a8a8" },
] as const;

/**
 * The house curve. Identical control points to --ease-luxe in globals.css:
 * a long confident settle with no overshoot.
 */
export const easeLuxe = Easing.bezier(0.16, 1, 0.3, 1);
export const easeEntrance = Easing.bezier(0.22, 1, 0.36, 1);
export const easeExit = Easing.bezier(0.4, 0, 1, 1);
export const easePrecise = Easing.bezier(0.65, 0, 0.35, 1);

export const FPS = 30;

/**
 * Chapter map for the flagship film, in frames at 30fps.
 *
 * Scenes overlap by design — each `from` starts before the previous scene's
 * light has fully decayed, so the film dissolves rather than cuts. Cutting
 * between these scenes reads as a slideshow; the overlap is what makes it
 * feel continuous.
 */
export const chapters = {
  darkness: { from: 0, duration: 120 },
  ignition: { from: 90, duration: 180 },
  geometry: { from: 240, duration: 210 },
  network: { from: 420, duration: 210 },
  empire: { from: 600, duration: 210 },
  divisions: { from: 780, duration: 240 },
  statement: { from: 990, duration: 180 },
  signature: { from: 1140, duration: 120 },
} as const;

/** Total film length: 1260 frames / 30fps = 42s. The last chapter ends exactly here. */
export const HERO_DURATION = 1260;
