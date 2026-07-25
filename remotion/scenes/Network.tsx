import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { Bloom } from "../lib/Atmosphere";
import { easeLuxe, easePrecise, palette } from "../lib/tokens";

const NODES = 26;

/** Deterministic node field, biased toward the horizon band for a world-map read. */
const nodes = new Array(NODES).fill(0).map((_, i) => ({
  id: i,
  x: 180 + random(`nx${i}`) * 1560,
  // Compressed vertically so the field reads as a globe's surface seen edge-on
  // rather than as an evenly-scattered starfield.
  y: 340 + random(`ny${i}`) * 400,
  size: 2 + random(`ns${i}`) * 3,
}));

/**
 * Edges connect each node to its two nearest neighbours. Nearest-neighbour
 * linking (rather than random pairs) is what makes the graph look like
 * infrastructure instead of noise — real corridors follow proximity.
 */
const edges = nodes.flatMap((a) =>
  nodes
    .filter((b) => b.id !== a.id)
    .map((b) => ({ b, d: Math.hypot(a.x - b.x, a.y - b.y) }))
    .sort((m, n) => m.d - n.d)
    .slice(0, 2)
    .map(({ b, d }) => ({ a, b, d })),
);

/**
 * Chapter IV — Network.
 *
 * Isolated points discover each other. Nodes arrive first, then corridors draw
 * between them, then pulses run the corridors — the sequence matters, because
 * a network that lights up all at once reads as decoration rather than growth.
 */
export const Network: React.FC = () => {
  const frame = useCurrentFrame();

  const bloomIntensity = interpolate(frame, [0, 100, 210], [0.09, 0.14, 0.11], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Bloom x={50} y={48} size={95} intensity={bloomIntensity} />

      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Corridors */}
        {edges.map((e, i) => {
          const delay = 20 + (i % 18) * 3;
          const drawn = interpolate(frame, [delay, delay + 55], [e.d, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: easePrecise,
          });
          const opacity = interpolate(frame, [delay, delay + 30], [0, 0.3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <line
              key={`e${i}`}
              x1={e.a.x}
              y1={e.a.y}
              x2={e.b.x}
              y2={e.b.y}
              stroke={palette.gold}
              strokeWidth={0.8}
              strokeDasharray={e.d}
              strokeDashoffset={drawn}
              opacity={opacity}
            />
          );
        })}

        {/* Traffic — a bright mote running each corridor on its own phase. */}
        {edges.slice(0, 20).map((e, i) => {
          const cycle = 90;
          const phase = ((frame + i * 11) % cycle) / cycle;
          const t = interpolate(phase, [0, 1], [0, 1]);
          const visible = interpolate(frame, [70, 100], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          // Fade in and out at the corridor ends so motes emerge and arrive
          // rather than popping into existence mid-line.
          const travelFade = Math.sin(phase * Math.PI);

          return (
            <circle
              key={`t${i}`}
              cx={e.a.x + (e.b.x - e.a.x) * t}
              cy={e.a.y + (e.b.y - e.a.y) * t}
              r={1.8}
              fill={palette.goldBright}
              opacity={visible * travelFade * 0.9}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const delay = i * 4;
          const scale = interpolate(frame, [delay, delay + 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: easeLuxe,
          });
          // Slow independent breathing keeps the field alive during the hold.
          const breathe = 0.7 + noise2D(`nb${i}`, frame * 0.02, 0) * 0.3;

          return (
            <g key={`n${i}`} style={{ transformOrigin: `${n.x}px ${n.y}px`, scale }}>
              <circle cx={n.x} cy={n.y} r={n.size * 4} fill={palette.gold} opacity={breathe * 0.12} />
              <circle cx={n.x} cy={n.y} r={n.size} fill={palette.goldBright} opacity={breathe} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
