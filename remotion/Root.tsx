import { Composition } from "remotion";
import { HeroFilm } from "./compositions/HeroFilm";
import { TradeFilm, TRADE_DURATION } from "./compositions/TradeFilm";
import { ResortFilm, RESORT_DURATION } from "./compositions/ResortFilm";
import { MediaFilm, MEDIA_DURATION } from "./compositions/MediaFilm";
import { WearFilm, WEAR_DURATION } from "./compositions/WearFilm";
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
    <>
      <Composition
        id="HeroFilm"
        component={HeroFilm}
        durationInFrames={HERO_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Division loops. Shorter than HeroFilm and deliberately without a
          narrative arc — these sit behind pages the visitor is reading, so they
          hold a continuous state instead of pulling focus through a story. */}
      <Composition
        id="TradeFilm"
        component={TradeFilm}
        durationInFrames={TRADE_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />

      <Composition
        id="ResortFilm"
        component={ResortFilm}
        durationInFrames={RESORT_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />

      <Composition
        id="MediaFilm"
        component={MediaFilm}
        durationInFrames={MEDIA_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />

      <Composition
        id="WearFilm"
        component={WearFilm}
        durationInFrames={WEAR_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
