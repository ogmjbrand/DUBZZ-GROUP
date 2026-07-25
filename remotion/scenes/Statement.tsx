import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Bloom } from "../lib/Atmosphere";
import { displayFont, labelFont } from "../lib/fonts";
import { easeLuxe, palette } from "../lib/tokens";

/**
 * Chapter VII — The statement.
 *
 * The film's only real copy. Both lines rise and defocus in, but the second
 * lands a beat late and in gold: the pause between "Five houses." and "One
 * standard." is the whole proposition, so the timing carries the meaning.
 */
export const Statement: React.FC = () => {
  const frame = useCurrentFrame();

  const line = (delay: number) => {
    const t = interpolate(frame, [delay, delay + 55], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeLuxe,
    });
    return {
      opacity: t,
      translate: `0px ${(1 - t) * 34}px`,
      filter: `blur(${(1 - t) * 14}px)`,
    };
  };

  const overline = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeLuxe,
  });

  // The whole block drifts up almost imperceptibly through the hold, so the
  // frame never feels frozen while the viewer reads.
  const drift = interpolate(frame, [0, 180], [0, -18], { easing: easeLuxe });

  return (
    <AbsoluteFill>
      <Bloom x={50} y={50} size={85} intensity={0.10} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          translate: `0px ${drift}px`,
        }}
      >
        <div
          style={{
            fontFamily: labelFont,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: palette.gold,
            opacity: overline * 0.9,
            marginBottom: 54,
          }}
        >
          A Multi-Venture Luxury Ecosystem
        </div>

        <div
          style={{
            fontFamily: displayFont,
            fontSize: 148,
            lineHeight: 1.02,
            textAlign: "center",
            color: palette.white,
            ...line(28),
          }}
        >
          Five houses.
        </div>

        <div
          style={{
            fontFamily: displayFont,
            fontSize: 148,
            lineHeight: 1.02,
            textAlign: "center",
            backgroundImage: `linear-gradient(120deg, ${palette.goldBright} 0%, ${palette.gold} 40%, #b8912a 60%, ${palette.goldBright} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            ...line(72),
          }}
        >
          One standard.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
