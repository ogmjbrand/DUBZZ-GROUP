import { Composition } from "remotion";
import { HeroFilm } from "./compositions/HeroFilm";
import { FPS, HERO_DURATION } from "./lib/tokens";

/**
 * Composition registry.
 *
 * The film is authored once at 1920×1080. Higher-resolution deliverables come
 * from `--scale` at render time rather than from a second composition, so
 * layout has exactly one source of truth and cannot drift between sizes.
 *
 * Poster frames are pulled from this same timeline via
 * `remotion still HeroFilm --frame=N`, which guarantees a poster can never
 * disagree with the video it stands in for.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HeroFilm"
      component={HeroFilm}
      durationInFrames={HERO_DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
