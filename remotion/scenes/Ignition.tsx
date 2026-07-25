import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Bloom, GoldParticles } from "../lib/Atmosphere";
import { easeExit, easeLuxe, palette } from "../lib/tokens";

/**
 * Chapter II — Ignition.
 *
 * One point of light becomes a source. The horizontal streak is the moment the
 * film declares its aspect ratio and its anamorphic vocabulary; everything
 * afterwards is lit by this single source, from the same direction.
 */
export const Ignition: React.FC = () => {
  const frame = useCurrentFrame();

  // The core: a hard, small, very bright point. It never grows much — the
  // *bloom* around it grows, which is how real over-exposure behaves.
  const coreScale = interpolate(frame, [0, 26, 180], [0, 1, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeLuxe,
  });

  const coreOpacity = interpolate(frame, [0, 22, 140, 180], [0, 1, 1, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Anamorphic streak — snaps wide fast, then holds and decays.
  const streakWidth = interpolate(frame, [14, 52], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExit,
  });

  const streakOpacity = interpolate(frame, [14, 40, 120, 180], [0, 0.85, 0.35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bloomIntensity = interpolate(frame, [10, 90, 180], [0, 0.26, 0.19], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeLuxe,
  });

  // Dust only becomes visible once there is light to catch it.
  const dust = interpolate(frame, [60, 160], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Bloom x={50} y={62} size={90} intensity={bloomIntensity} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {/* Streak */}
        <div
          style={{
            position: "absolute",
            top: "62%",
            width: `${streakWidth}%`,
            height: 2,
            opacity: streakOpacity,
            background: `linear-gradient(90deg, transparent 0%, ${palette.goldBright} 50%, transparent 100%)`,
            filter: "blur(1px)",
          }}
        />

        {/* Core */}
        <div
          style={{
            position: "absolute",
            top: "62%",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: palette.white,
            opacity: coreOpacity,
            scale: coreScale,
            boxShadow: `0 0 24px ${palette.goldBright}, 0 0 80px ${palette.gold}, 0 0 160px ${palette.gold}`,
          }}
        />
      </AbsoluteFill>

      <GoldParticles count={50} opacity={dust} drift={26} />
    </AbsoluteFill>
  );
};
