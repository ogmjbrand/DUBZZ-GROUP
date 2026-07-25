import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Grain, Vignette } from "../lib/Atmosphere";
import { chapters, palette } from "../lib/tokens";
import { Darkness } from "../scenes/Darkness";
import { Ignition } from "../scenes/Ignition";
import { Geometry } from "../scenes/Geometry";
import { Network } from "../scenes/Network";
import { Empire } from "../scenes/Empire";
import { Divisions } from "../scenes/Divisions";
import { Statement } from "../scenes/Statement";
import { Signature } from "../scenes/Signature";

const CROSSFADE = 34;

/**
 * Wraps a chapter in its own fade envelope.
 *
 * Because consecutive chapters overlap in the timeline, the outgoing scene's
 * fade-out and the incoming scene's fade-in run simultaneously — that is the
 * dissolve. `useCurrentFrame` inside a Sequence is already sequence-local, so
 * these offsets are relative to the chapter, not the film.
 */
const Chapter: React.FC<{
  children: React.ReactNode;
  duration: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
}> = ({ children, duration, fadeIn = true, fadeOut = true }) => {
  const frame = useCurrentFrame();

  // Composed as two independent factors rather than one four-point ramp:
  // disabling a fade would collapse that ramp's input range to a duplicate
  // value ([0, 0, ...] or [..., d, d]), which interpolate rejects because the
  // range must be strictly increasing.
  const enter = fadeIn
    ? interpolate(frame, [0, CROSSFADE], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const exit = fadeOut
    ? interpolate(frame, [duration - CROSSFADE, duration], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return <AbsoluteFill style={{ opacity: enter * exit }}>{children}</AbsoluteFill>;
};

/**
 * The flagship film — 42s at 30fps, seamlessly loopable.
 *
 * Narrative: darkness → a single light → order → connection → mass → the five
 * houses → the proposition → the mark. Grain and vignette sit above every
 * chapter so the whole film is graded as one piece rather than eight.
 */
export const HeroFilm: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: palette.background }}>
      <Sequence name="I · Darkness" from={chapters.darkness.from} durationInFrames={chapters.darkness.duration}>
        <Chapter duration={chapters.darkness.duration} fadeIn={false}>
          <Darkness />
        </Chapter>
      </Sequence>

      <Sequence name="II · Ignition" from={chapters.ignition.from} durationInFrames={chapters.ignition.duration}>
        <Chapter duration={chapters.ignition.duration}>
          <Ignition />
        </Chapter>
      </Sequence>

      <Sequence name="III · Geometry" from={chapters.geometry.from} durationInFrames={chapters.geometry.duration}>
        <Chapter duration={chapters.geometry.duration}>
          <Geometry />
        </Chapter>
      </Sequence>

      <Sequence name="IV · Network" from={chapters.network.from} durationInFrames={chapters.network.duration}>
        <Chapter duration={chapters.network.duration}>
          <Network />
        </Chapter>
      </Sequence>

      <Sequence name="V · Empire" from={chapters.empire.from} durationInFrames={chapters.empire.duration}>
        <Chapter duration={chapters.empire.duration}>
          <Empire />
        </Chapter>
      </Sequence>

      <Sequence name="VI · Divisions" from={chapters.divisions.from} durationInFrames={chapters.divisions.duration}>
        <Chapter duration={chapters.divisions.duration}>
          <Divisions />
        </Chapter>
      </Sequence>

      <Sequence name="VII · Statement" from={chapters.statement.from} durationInFrames={chapters.statement.duration}>
        <Chapter duration={chapters.statement.duration}>
          <Statement />
        </Chapter>
      </Sequence>

      {/* No fade-out: Signature resolves to the background colour itself, which
          is what closes the loop back onto Darkness frame 0. */}
      <Sequence name="VIII · Signature" from={chapters.signature.from} durationInFrames={chapters.signature.duration}>
        <Chapter duration={chapters.signature.duration} fadeOut={false}>
          <Signature />
        </Chapter>
      </Sequence>

      {/* Grade — applied once, over everything. */}
      <Vignette strength={0.88} />
      <Grain opacity={0.055} />
    </AbsoluteFill>
  );
};
