import { AbsoluteFill, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { Bloom, GoldParticles, Grain, Vignette } from "../lib/Atmosphere";
import { palette } from "../lib/tokens";

const WEAR = "#e8e3d8";
const WEAR_DEEP = "#8c8578";

const DURATION = 600;

/** Vertical drape count. Each is an independent hanging panel of cloth. */
const DRAPES = 7;

/**
 * One drape, as an SVG path.
 *
 * Built as a closed shape between two vertical edges whose x-offset is driven
 * by noise sampled *down* the panel. Sampling along the length is what makes
 * the edge undulate like hanging fabric; a single offset per panel would just
 * translate a rigid rectangle.
 *
 * Amplitude grows toward the bottom because a hanging panel is constrained at
 * the top and free at the hem — fabric that sways equally at both ends reads
 * as a flag, not a drape.
 */
const drapePath = (
  cx: number,
  width: number,
  t: number,
  seed: number,
  amplitude: number,
) => {
  const STEPS = 14;
  const top = -40;
  const bottom = 1120;

  const edge = (side: -1 | 1) => {
    const pts: string[] = [];
    for (let i = 0; i <= STEPS; i++) {
      const p = i / STEPS;
      const y = top + (bottom - top) * p;
      // Free-hem weighting: near zero at the top, full at the bottom.
      const freedom = Math.pow(p, 1.4);
      const n = noise2D(`d${seed}${side}`, p * 2.1, t * 1.4) * amplitude * freedom;
      pts.push(`${cx + side * (width / 2) + n},${y}`);
    }
    return side === 1 ? pts : pts.reverse();
  };

  return `M ${edge(1).join(" L ")} L ${edge(-1).join(" L ")} Z`;
};

/**
 * Dubzz Wear — ambient loop.
 *
 * Floating textiles under a single raking light. Bone and warm grey only: the
 * house rule is that gold is spent where only the owner finds it, so the
 * fashion film withholds it almost entirely — a few motes and nothing more.
 *
 * Loops by construction: every panel is a function of `frame / DURATION` on a
 * closed noise cycle, so there is no seam to match.
 */
export const WearFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / DURATION;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0b0a" }}>
      <AbsoluteFill
        style={{
          background: "linear-gradient(150deg, #171613 0%, #0c0b0a 45%, #050505 100%)",
        }}
      />

      {/* Raking key light from upper left — the studio setup this whole frame implies. */}
      <Bloom x={22} y={12} size={85} intensity={0.24} color={WEAR} />

      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            {new Array(DRAPES).fill(0).map((_, i) => (
              // Each drape gets its own gradient so the light falls across the
              // set rather than identically on every panel.
              <linearGradient key={i} id={`cloth${i}`} x1="0" y1="0" x2="1" y2="0.3">
                <stop offset="0%" stopColor={WEAR_DEEP} stopOpacity="0.09" />
                <stop offset="45%" stopColor={WEAR} stopOpacity={0.32 - i * 0.022} />
                <stop offset="100%" stopColor={WEAR_DEEP} stopOpacity="0.03" />
              </linearGradient>
            ))}
          </defs>

          {new Array(DRAPES).fill(0).map((_, i) => {
            // Panels are unevenly spaced and unevenly wide. An even row of
            // identical drapes reads as a barcode.
            const cx = 180 + i * 268 + noise2D(`px${i}`, t * 0.9, 0) * 26;
            const width = 190 + ((i * 37) % 90);
            const amplitude = 34 + ((i * 19) % 26);

            return (
              <g key={i}>
                <path
                  d={drapePath(cx, width, t, i, amplitude)}
                  fill={`url(#cloth${i})`}
                />
                {/* Lit selvedge — the specular edge that sells it as cloth
                    rather than as a translucent slab. */}
                <path
                  d={drapePath(cx, width, t, i, amplitude)}
                  fill="none"
                  stroke={WEAR}
                  strokeWidth={1}
                  opacity={0.36 - i * 0.024}
                />
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* The one concession to gold, and deliberately almost invisible. */}
      <GoldParticles count={26} opacity={0.3} drift={16} color={palette.goldBright} />

      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, transparent 58%, ${palette.background} 100%)`,
        }}
      />
      <Vignette strength={0.82} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};

export const WEAR_DURATION = DURATION;
