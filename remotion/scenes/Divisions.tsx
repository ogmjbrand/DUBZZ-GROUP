import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Bloom } from "../lib/Atmosphere";
import { labelFont } from "../lib/fonts";
import { divisionTints, easeLuxe, palette } from "../lib/tokens";

/**
 * Chapter VI — Five divisions emerge.
 *
 * The undifferentiated skyline resolves into exactly five monoliths, each
 * taking its house tint. This is the narrative hinge of the film: everything
 * before it argues "one empire", and this frame reveals what it's made of.
 *
 * Columns rise on a stagger from centre outward rather than left-to-right, so
 * the composition stays balanced on every frame of the build.
 */
export const Divisions: React.FC = () => {
  const frame = useCurrentFrame();

  // Centre-out ordering: index 2 first, then 1 & 3, then 0 & 4.
  const orderOf = (i: number) => Math.abs(i - 2);

  return (
    <AbsoluteFill>
      <Bloom x={50} y={40} size={90} intensity={0.11} />

      <AbsoluteFill
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 78,
          paddingBottom: 190,
        }}
      >
        {divisionTints.map((d, i) => {
          const delay = orderOf(i) * 22;

          const grow = interpolate(frame, [delay, delay + 85], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: easeLuxe,
          });

          const labelIn = interpolate(frame, [delay + 60, delay + 105], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: easeLuxe,
          });

          // Tall, narrow and deliberately asymmetric. Five equal columns of
          // chart-like proportion read as a bar chart no matter how they are
          // coloured; an irregular skyline silhouette reads as architecture.
          const height = [512, 648, 470, 596, 418][i];
          const width = [92, 104, 86, 98, 88][i];

          return (
            <div
              key={d.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 40,
              }}
            >
              <div
                style={{
                  width,
                  height: height * grow,
                  // Light falls from above, so the tint concentrates at the
                  // crown and dissolves toward an unseen base.
                  background: `linear-gradient(180deg, ${d.hex}59 0%, ${d.hex}14 55%, transparent 100%)`,
                  borderTop: `2px solid ${d.hex}`,
                  boxShadow: `0 -18px 70px -18px ${d.hex}`,
                }}
              />
              <div
                style={{
                  fontFamily: labelFont,
                  fontSize: 21,
                  fontWeight: 600,
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: palette.white,
                  opacity: labelIn * 0.7,
                  translate: `0px ${(1 - labelIn) * 14}px`,
                  whiteSpace: "nowrap",
                  textIndent: "0.34em",
                }}
              >
                {d.name}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
