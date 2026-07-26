import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { Bloom, GoldParticles, Grain, Vignette } from "../lib/Atmosphere";
import { palette } from "../lib/tokens";

const TRADE = "#a8a8a8";
const TRADE_BRIGHT = "#e4e4e4";

/** Ports, placed to read as a plate-carrée world map rather than a random scatter. */
const ports = [
  { x: 300, y: 400 }, { x: 470, y: 520 }, { x: 640, y: 360 },
  { x: 820, y: 470 }, { x: 980, y: 330 }, { x: 1130, y: 560 },
  { x: 1290, y: 420 }, { x: 1470, y: 500 }, { x: 1650, y: 380 },
  { x: 560, y: 660 }, { x: 1010, y: 690 }, { x: 1400, y: 650 },
];

/** Named corridors. Explicit pairs, not nearest-neighbour: trade routes are chosen, not proximate. */
const corridors: [number, number][] = [
  [0, 2], [2, 4], [4, 6], [6, 8], [1, 3], [3, 5],
  [5, 7], [9, 1], [10, 5], [11, 7], [0, 9], [10, 11],
];

/**
 * Great-circle-ish arc between two ports.
 *
 * A straight line between ports reads as a network diagram; the bowed arc is
 * what makes it read as a *route* over a curved surface. Bow scales with
 * distance so short hops stay nearly flat, as they would on a real projection.
 */
const arc = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const bow = Math.hypot(b.x - a.x, b.y - a.y) * 0.22;
  return { d: `M ${a.x} ${a.y} Q ${mx} ${my - bow} ${b.x} ${b.y}`, cx: mx, cy: my - bow };
};

/** Quadratic Bézier point at t — used to run cargo along the same curve the arc draws. */
const along = (
  a: { x: number; y: number },
  c: { x: number; y: number },
  b: { x: number; y: number },
  t: number,
) => {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
  };
};

const DURATION = 600;

/**
 * Dubzz Trade — ambient loop.
 *
 * Global logistics as continuous state rather than narrative: the graticule
 * drifts, corridors carry cargo, and a market pulse runs along the floor. Unlike
 * HeroFilm there is no story arc, because this sits behind a page the visitor
 * is reading — it has to stay legible at a glance and never pull focus.
 *
 * Loops by construction: every animation is a function of `frame % cycle`, so
 * there is no seam to match at the ends.
 */
export const TradeFilm: React.FC = () => {
  const frame = useCurrentFrame();

  // Graticule drift. One full 60px cell per loop, so the wrap is invisible.
  const drift = (frame / DURATION) * 60;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(155deg, #141414 0%, #0a0a0a 45%, #000000 100%)",
        }}
      />
      <Bloom x={78} y={14} size={85} intensity={0.24} color={TRADE} />

      {/* Wrapped in AbsoluteFill deliberately. A bare <svg> here is a static,
          in-flow element, and in-flow content paints in an *earlier* stacking
          layer than positioned siblings — so the absolutely-positioned
          background gradient above would paint straight over the whole map
          regardless of DOM order. Positioning the svg puts it in the same layer,
          where DOM order decides. */}
      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
          <linearGradient id="corridor" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={TRADE} stopOpacity="0.08" />
            <stop offset="50%" stopColor={TRADE_BRIGHT} stopOpacity="0.9" />
            <stop offset="100%" stopColor={TRADE} stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Graticule — the map plate the corridors sit on. */}
        <g opacity={0.17}>
          {new Array(33).fill(0).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 60 + drift}
              y1={0}
              x2={i * 60 + drift}
              y2={1080}
              stroke={TRADE}
              strokeWidth={1}
            />
          ))}
          {new Array(19).fill(0).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 60} x2={1920} y2={i * 60} stroke={TRADE} strokeWidth={1} />
          ))}
        </g>

        {/* Corridors */}
        {corridors.map(([ai, bi], i) => (
          <path
            key={`c${i}`}
            d={arc(ports[ai], ports[bi]).d}
            fill="none"
            stroke="url(#corridor)"
            strokeWidth={2.4}
            opacity={0.75 + noise2D(`co${i}`, frame * 0.01, 0) * 0.35}
          />
        ))}

        {/* Cargo. Each corridor runs on its own phase and its own speed multiple,
            so the field never syncs up into a visible pulse. */}
        {corridors.map(([ai, bi], i) => {
          const a = ports[ai];
          const b = ports[bi];
          const { cx, cy } = arc(a, b);
          const speed = 1 + Math.floor(random(`sp${i}`) * 2);
          const phase = ((frame * speed + i * 47) % DURATION) / DURATION;
          const p = along(a, { x: cx, y: cy }, b, phase);
          const fade = Math.sin(phase * Math.PI);

          return (
            <g key={`g${i}`}>
              <circle cx={p.x} cy={p.y} r={12} fill={TRADE_BRIGHT} opacity={fade * 0.28} />
              <circle cx={p.x} cy={p.y} r={3.6} fill={TRADE_BRIGHT} opacity={fade} />
            </g>
          );
        })}

        {/* Ports */}
        {ports.map((p, i) => {
          const pulse = 0.55 + noise2D(`pp${i}`, frame * 0.018, 0) * 0.45;
          return (
            <g key={`p${i}`}>
              <circle cx={p.x} cy={p.y} r={22} fill={TRADE} opacity={pulse * 0.22} />
              <circle cx={p.x} cy={p.y} r={5} fill={TRADE_BRIGHT} opacity={pulse} />
            </g>
          );
        })}

        {/* Market pulse — a ticker line along the floor. Values come from noise,
            so it reads as a live instrument without pretending to be real data. */}
        <polyline
          points={new Array(97)
            .fill(0)
            .map((_, i) => {
              const x = i * 20;
              const v = noise2D("mkt", i * 0.09, frame * 0.012);
              return `${x},${928 + v * 46}`;
            })
            .join(" ")}
          fill="none"
          stroke={TRADE_BRIGHT}
          strokeWidth={2.2}
          opacity={0.5}
          />
        </svg>
      </AbsoluteFill>

      <GoldParticles count={34} opacity={0.4} drift={18} color={TRADE_BRIGHT} />

      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, transparent 72%, ${palette.background} 100%)`,
        }}
      />
      <Vignette strength={0.7} />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

export const TRADE_DURATION = DURATION;
