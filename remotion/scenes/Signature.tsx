import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { labelFont } from "../lib/fonts";
import { palette } from "../lib/tokens";

/**
 * Chapter VIII — Signature, and the loop seam.
 *
 * The wordmark resolves, holds, then everything decays to exactly
 * `palette.background` — the same value Darkness opens on. That equality is
 * what makes the loop invisible: any residual light on the final frame shows
 * up as a visible flash when the video wraps to frame 0.
 *
 * The trailing black hold is deliberate. It gives the wrap somewhere to happen
 * where there is nothing on screen to betray a cut.
 */
export const Signature: React.FC = () => {
  const frame = useCurrentFrame();

  const markIn = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decay begins well before the end so the fade is a settle, not a cut.
  const decay = interpolate(frame, [62, 108], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rule = interpolate(frame, [16, 60], [0, 240], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glow = interpolate(frame, [0, 50, 108], [0.13, 0.09, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: palette.background }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 50% at 50% 50%, ${palette.gold} 0%, transparent 70%)`,
          opacity: glow,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          opacity: markIn * decay,
        }}
      >
        <div
          style={{
            fontFamily: labelFont,
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: "0.46em",
            textTransform: "uppercase",
            color: palette.white,
            // Optical centring: the trailing letter-space on the last glyph
            // pushes the word right unless it is compensated.
            textIndent: "0.46em",
          }}
        >
          Dubzz Group
        </div>

        <div
          style={{
            width: rule,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${palette.gold}, transparent)`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
