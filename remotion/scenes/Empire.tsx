import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { Bloom, GoldParticles } from "../lib/Atmosphere";
import { easeLuxe, palette } from "../lib/tokens";

const TOWERS = 34;
const HORIZON = 800;

/**
 * A skyline built from a deterministic seed. Towers are ordered by depth band
 * so the back rows can be drawn dimmer and shorter — atmospheric perspective
 * is doing the work here, not a real 3D camera.
 */
const towers = new Array(TOWERS).fill(0).map((_, i) => {
  const depth = random(`td${i}`); // 0 = near, 1 = far
  return {
    id: i,
    x: 60 + random(`tx${i}`) * 1800,
    width: 22 + (1 - depth) * 58,
    height: 90 + random(`th${i}`) * (1 - depth * 0.55) * 520,
    depth,
    delay: Math.floor(random(`tl${i}`) * 70),
  };
});

// Far towers first so near ones overlap them correctly.
const ordered = [...towers].sort((a, b) => b.depth - a.depth);

/**
 * Chapter V — Empire.
 *
 * The network stops being abstract and acquires mass. Towers rise from the
 * horizon on staggered delays, scaling from their base so they read as being
 * built rather than sliding into frame.
 */
export const Empire: React.FC = () => {
  const frame = useCurrentFrame();

  // A slow push-in. The whole scene creeps toward the viewer, which sells scale
  // more cheaply than animating every tower's perspective.
  const push = interpolate(frame, [0, 210], [1, 1.08], { easing: easeLuxe });

  const haze = interpolate(frame, [0, 90, 210], [0, 0.5, 0.62], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Bloom x={50} y={72} size={110} intensity={0.13} />

      <AbsoluteFill style={{ scale: push }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="tower-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.gold} stopOpacity="0.30" />
              <stop offset="65%" stopColor={palette.goldDeep} stopOpacity="0.10" />
              <stop offset="100%" stopColor={palette.background} stopOpacity="0" />
            </linearGradient>

            {/* Ground haze. A solid fill leaves a hard seam straight across the
                frame where its top edge cuts the towers; ramping the alpha
                dissolves the bases into the floor instead. */}
            <linearGradient id="ground-haze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.background} stopOpacity="0" />
              <stop offset="45%" stopColor={palette.background} stopOpacity="0.75" />
              <stop offset="100%" stopColor={palette.background} stopOpacity="1" />
            </linearGradient>
          </defs>

          {ordered.map((t) => {
            const grow = interpolate(frame, [t.delay, t.delay + 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easeLuxe,
            });

            const h = t.height * grow;
            // Far towers sit closer to the base opacity of the haze.
            const opacity = (1 - t.depth * 0.7) * interpolate(frame, [t.delay, t.delay + 50], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <g key={t.id} opacity={opacity}>
                <rect
                  x={t.x}
                  y={HORIZON - h}
                  width={t.width}
                  height={h}
                  fill="url(#tower-face)"
                />
                {/* Lit crown — the single warm source catching the top edge. */}
                <rect
                  x={t.x}
                  y={HORIZON - h}
                  width={t.width}
                  height={1.6}
                  fill={palette.goldBright}
                  opacity={0.9}
                />
              </g>
            );
          })}

          {/* Ground plane: dissolves the tower bases so nothing sits on a hard line. */}
          <rect
            x={0}
            y={HORIZON - 190}
            width={1920}
            height={1080 - HORIZON + 190}
            fill="url(#ground-haze)"
            opacity={haze}
          />
        </svg>
      </AbsoluteFill>

      <GoldParticles count={40} opacity={0.5} drift={20} />
    </AbsoluteFill>
  );
};
