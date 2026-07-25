import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { easeLuxe, palette } from "../lib/tokens";

/**
 * Chapter I — Darkness.
 *
 * The film opens on nothing and earns its first photon. Holding true black for
 * a beat is what gives the ignition its impact; opening on an image would
 * spend that impact immediately.
 *
 * This scene is also the loop seam: its opening frames are what the closing
 * signature has to dissolve back into, so the base colour here and the final
 * frame of Signature must match exactly.
 */
export const Darkness: React.FC = () => {
  const frame = useCurrentFrame();

  // A warmth that is felt before it is seen — still sub-perceptual at frame 40.
  const emberOpacity = interpolate(frame, [20, 90, 120], [0, 0.18, 0.34], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeLuxe,
  });

  const emberScale = interpolate(frame, [20, 120], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeLuxe,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: palette.background }}>
      <AbsoluteFill
        style={{
          opacity: emberOpacity,
          scale: emberScale,
          background: `radial-gradient(38% 30% at 50% 62%, ${palette.goldDeep} 0%, transparent 68%)`,
        }}
      />
    </AbsoluteFill>
  );
};
