import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Bloom } from "../lib/Atmosphere";
import { easeLuxe, easePrecise, palette } from "../lib/tokens";

const CX = 960;
const CY = 540;

/** Regular n-gon as an SVG points string. */
const polygon = (sides: number, radius: number, rotation = 0) =>
  new Array(sides)
    .fill(0)
    .map((_, i) => {
      const a = (i / sides) * Math.PI * 2 + rotation;
      return `${CX + Math.cos(a) * radius},${CY + Math.sin(a) * radius}`;
    })
    .join(" ");

/**
 * Chapter III — Geometry.
 *
 * Order emerges from the light. Concentric rings draw themselves on, each one
 * a little slower and a little dimmer than the last, so the eye reads depth
 * rather than a flat target.
 *
 * Rings are drawn with `strokeDashoffset` against a known perimeter, which is
 * why each ring's dash length is computed rather than guessed — a wrong
 * perimeter leaves a visible gap where the stroke fails to close.
 */
export const Geometry: React.FC = () => {
  const frame = useCurrentFrame();

  const rings = [
    { sides: 6, radius: 150, width: 1.4, delay: 0 },
    { sides: 6, radius: 260, width: 1.1, delay: 18 },
    { sides: 12, radius: 370, width: 0.9, delay: 36 },
    { sides: 12, radius: 480, width: 0.7, delay: 54 },
  ];

  const globalRotation = interpolate(frame, [0, 210], [0, 14], { easing: easeLuxe });

  const bloomIntensity = interpolate(frame, [0, 60, 210], [0.15, 0.11, 0.08], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Bloom x={50} y={55} size={80} intensity={bloomIntensity} />

      <AbsoluteFill style={{ rotate: `${globalRotation}deg` }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          {rings.map((ring, i) => {
            // Perimeter of a regular n-gon: n * 2r * sin(pi/n).
            const perimeter = ring.sides * 2 * ring.radius * Math.sin(Math.PI / ring.sides);

            const draw = interpolate(
              frame,
              [ring.delay, ring.delay + 90],
              [perimeter, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easePrecise },
            );

            const opacity = interpolate(
              frame,
              [ring.delay, ring.delay + 40, 180, 210],
              [0, 0.9 - i * 0.16, 0.9 - i * 0.16, 0.25],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );

            // Counter-rotating alternate rings keeps the form from reading as
            // one rigid object.
            const spin = interpolate(frame, [0, 210], [0, i % 2 === 0 ? 8 : -8], {
              easing: easeLuxe,
            });

            return (
              <polygon
                key={i}
                points={polygon(ring.sides, ring.radius, (i * Math.PI) / ring.sides)}
                fill="none"
                stroke={palette.gold}
                strokeWidth={ring.width}
                strokeDasharray={perimeter}
                strokeDashoffset={draw}
                opacity={opacity}
                style={{
                  transformOrigin: `${CX}px ${CY}px`,
                  rotate: `${spin}deg`,
                }}
              />
            );
          })}

          {/* Vertices catch the light as the rings complete. */}
          {rings.map((ring, i) =>
            new Array(ring.sides).fill(0).map((_, v) => {
              const a = (v / ring.sides) * Math.PI * 2 + (i * Math.PI) / ring.sides;
              const appear = ring.delay + 60 + v * 2;
              return (
                <circle
                  key={`${i}-${v}`}
                  cx={CX + Math.cos(a) * ring.radius}
                  cy={CY + Math.sin(a) * ring.radius}
                  r={2}
                  fill={palette.goldBright}
                  opacity={interpolate(frame, [appear, appear + 24, 190, 210], [0, 0.8, 0.8, 0.1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })}
                />
              );
            }),
          )}
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
