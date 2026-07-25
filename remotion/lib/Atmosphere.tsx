import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { palette } from "./tokens";

/**
 * Film grain.
 *
 * The noise texture is generated once and then *translated* per frame rather
 * than re-seeding feTurbulence every frame. Re-seeding forces the filter to
 * recompute on every one of the 1260 frames, which dominates render time;
 * translating a cached tile gives the same perceptual shimmer for free.
 */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  const frame = useCurrentFrame();

  // Step in whole pixels on a 4-frame cycle: sub-pixel drift reads as a smear,
  // while a hard 4-frame step reads as photochemical grain.
  const step = Math.floor(frame / 4);
  const x = (step * 7) % 160;
  const y = (step * 13) % 160;

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none", mixBlendMode: "overlay" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <filter id="grain-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={4} />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
        </filter>
        <rect
          x={-160}
          y={-160}
          width="200%"
          height="200%"
          filter="url(#grain-noise)"
          style={{ translate: `${x}px ${y}px` }}
        />
      </svg>
    </AbsoluteFill>
  );
};

/** Vignette. Keeps the eye centred and hides the frame edges. */
export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.9 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(120% 100% at 50% 50%, transparent 30%, rgba(0,0,0,${strength}) 100%)`,
    }}
  />
);

/**
 * A single warm light source. Every scene in the film is lit by one of these —
 * the brief's "luxury lighting" is really just consistency about where light
 * comes from.
 */
export const Bloom: React.FC<{
  x?: number;
  y?: number;
  size?: number;
  intensity?: number;
  color?: string;
}> = ({ x = 50, y = 50, size = 70, intensity = 0.5, color = palette.gold }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(${size}% ${size}% at ${x}% ${y}%, ${color}${Math.round(
        intensity * 255,
      )
        .toString(16)
        .padStart(2, "0")} 0%, transparent 70%)`,
    }}
  />
);

/**
 * Floating gold particulate — dust caught in the light, not confetti.
 *
 * Positions are driven by `noise2D` over a seeded base point, so motion is
 * organic but fully deterministic: frame N renders identically on every pass,
 * which is what makes distributed/resumable rendering safe.
 */
export const GoldParticles: React.FC<{
  count?: number;
  opacity?: number;
  drift?: number;
  /** Mote colour. Defaults to the house gold; division films pass their tint. */
  color?: string;
  /** Halo colour. Defaults to `color`. */
  glow?: string;
}> = ({ count = 70, opacity = 1, drift = 40, color = palette.goldBright, glow }) => {
  const frame = useCurrentFrame();
  const halo = glow ?? color;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      {new Array(count).fill(0).map((_, i) => {
        const seed = `p${i}`;
        const baseX = random(`${seed}x`) * 100;
        const baseY = random(`${seed}y`) * 100;
        const scale = 0.4 + random(`${seed}s`) * 1.6;
        const speed = 0.0006 + random(`${seed}v`) * 0.0014;

        // Two decorrelated noise fields so drift is never a straight line.
        const dx = noise2D(`${seed}dx`, frame * speed, i * 0.1) * drift;
        const dy = noise2D(`${seed}dy`, frame * speed, i * 0.1) * drift;

        // Each mote breathes on its own phase, so the field never pulses in unison.
        const twinkle = interpolate(
          Math.sin((frame * 0.04 + i) % (Math.PI * 2)),
          [-1, 1],
          [0.15, 0.75],
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${baseX}%`,
              top: `${baseY}%`,
              width: scale * 3,
              height: scale * 3,
              borderRadius: "50%",
              background: color,
              opacity: twinkle,
              boxShadow: `0 0 ${scale * 8}px ${halo}`,
              translate: `${dx}px ${dy}px`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
