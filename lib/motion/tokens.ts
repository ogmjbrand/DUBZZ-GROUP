/**
 * Motion tokens — the JS mirror of the `--ease-*` / `--duration-*` custom
 * properties in globals.css. CSS transitions read the custom properties;
 * Framer Motion, GSAP and R3F read these. Both must stay in sync so a card
 * settling under CSS and a mesh settling under R3F share one deceleration.
 */

/** Cubic-bezier control points, in Framer Motion's array form. */
export const ease = {
  /** The house curve — long confident settle, no overshoot. */
  luxe: [0.16, 1, 0.3, 1],
  entrance: [0.22, 1, 0.36, 1],
  exit: [0.4, 0, 1, 1],
  precise: [0.65, 0, 0.35, 1],
} as const;

/** Seconds, because Framer Motion works in seconds and CSS in milliseconds. */
export const duration = {
  instant: 0.12,
  quick: 0.26,
  base: 0.46,
  slow: 0.9,
  cinematic: 1.4,
} as const;

/**
 * Physics presets. `weighted` carries visible mass — the brief's "expensive"
 * feel comes from things that resist being moved, not from things that snap.
 */
export const spring = {
  weighted: { type: "spring", stiffness: 120, damping: 22, mass: 1.1 },
  responsive: { type: "spring", stiffness: 300, damping: 30, mass: 0.6 },
  magnetic: { type: "spring", stiffness: 220, damping: 18, mass: 0.5 },
} as const;

/** Stagger steps in seconds, for orchestrating lists and grids. */
export const stagger = {
  tight: 0.045,
  base: 0.08,
  loose: 0.13,
} as const;
