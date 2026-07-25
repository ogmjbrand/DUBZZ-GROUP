import { AbsoluteFill, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { Bloom, GoldParticles, Grain, Vignette } from "../lib/Atmosphere";
import { palette } from "../lib/tokens";

const WINE = "#9e3a4d";
const WINE_LIGHT = "#d98fa0";
const SUN = "#e8b45f";

const DURATION = 600;
const HORIZON = 430;

/** Reflection bands below the horizon. Denser near the waterline, sparser toward the viewer. */
const BANDS = 46;

/**
 * Dubzz Wine Resort — ambient loop.
 *
 * Golden hour over water. The entire scene is two ideas: a low warm sun, and a
 * surface that breaks its light into bands.
 *
 * The reflection is built from horizontal slices whose x-offset is driven by
 * noise — the standard way to fake a water surface without simulating one.
 * Band height and displacement both grow toward the viewer, which is what
 * produces the perspective read; uniform bands look like venetian blinds.
 *
 * Loops by construction: every value is a function of `frame / DURATION`
 * evaluated on a closed cycle, so there is no seam to match.
 */
export const ResortFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / DURATION;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0e070a" }}>
      {/* Sky */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, #12070b 0%, #2a1018 42%, ${WINE}55 72%, ${SUN}44 100%)`,
          height: HORIZON,
        }}
      />

      {/* The sun, sitting just above the waterline. */}
      <Bloom x={62} y={38} size={62} intensity={0.34} color={SUN} />

      {/* Water body */}
      <div
        style={{
          position: "absolute",
          top: HORIZON,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(180deg, ${SUN}30 0%, ${WINE}22 22%, #0e070a 78%, ${palette.background} 100%)`,
        }}
      />

      {/* Reflection bands */}
      <div style={{ position: "absolute", top: HORIZON, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
        {new Array(BANDS).fill(0).map((_, i) => {
          // Non-linear spacing: bands bunch up at the horizon and open out
          // toward the viewer, which is what sells depth on a flat surface.
          const p = i / BANDS;
          const y = Math.pow(p, 1.7) * (1080 - HORIZON);
          const height = 2 + p * 9;

          // Two decorrelated noise fields: one for lateral slip, one for
          // brightness, so bands never shimmer in lockstep.
          const slip = noise2D(`slip${i}`, t * 2.2, i * 0.22) * (18 + p * 96);
          const bright = 0.5 + noise2D(`br${i}`, t * 2.6, i * 0.3) * 0.5;

          // The sun's reflected column is brightest directly under it and
          // falls off to the sides — a specular path, not an even wash.
          const column = Math.exp(-Math.pow((i / BANDS - 0.0) * 1.6, 2));

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: y,
                left: `${18 + slip * 0.06}%`,
                width: `${64 - p * 14}%`,
                height,
                background: `linear-gradient(90deg, transparent 0%, ${SUN} 22%, ${WINE_LIGHT} 50%, ${SUN} 78%, transparent 100%)`,
                opacity: bright * column * 0.5 * (1 - p * 0.55),
                filter: "blur(1.5px)",
                translate: `${slip}px 0px`,
              }}
            />
          );
        })}
      </div>

      {/* Horizon line — the only hard edge in the frame. */}
      <div
        style={{
          position: "absolute",
          top: HORIZON,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${SUN}cc 40%, ${SUN} 62%, transparent)`,
          opacity: 0.65,
        }}
      />

      {/* Evening particulate drifting over the water. */}
      <GoldParticles count={46} opacity={0.55} drift={26} color={SUN} glow={WINE_LIGHT} />

      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, transparent 50%, ${palette.background} 100%)`,
        }}
      />
      <Vignette strength={0.86} />
      <Grain opacity={0.055} />
    </AbsoluteFill>
  );
};

export const RESORT_DURATION = DURATION;
