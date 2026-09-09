"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Scroll-driven mosaic that opens onto the hero.
 *
 * The page opens on a nine-cell grid. Eight cells carry stills from across the
 * Group; the ninth — the centre — is a hole, and what shows through it is the
 * hero itself, already playing. Scrolling scales the grid about that centre, so
 * the eight tiles travel outward past the edges of the viewport and the hero
 * goes full-bleed. Nothing crossfades and nothing is duplicated: there is one
 * hero underneath the whole time, and the mosaic is a frame being pulled off it.
 *
 * It is a frame rather than a stack of images for a practical reason too — the
 * centre cell would otherwise need a second copy of the film, decoding twice.
 *
 * `children` is the hero. It renders underneath at full size from the first
 * frame, so it is the LCP element and it is in the DOM for assistive tech
 * regardless of scroll position.
 */

interface Tile {
  src: string;
  alt: string;
  /** Grid placement, as `col-start / row-start`. The centre cell is left empty. */
  area: string;
}

/**
 * Eight stills, arranged around the hole. Alt text is empty because the
 * mosaic is decoration — it makes an argument about range, and every business
 * it gestures at is named in the division strip directly below it.
 */
const tiles: Tile[] = [
  { src: "/imagery/case-aureum.webp", alt: "", area: "1 / 1" },
  { src: "/posters/media-film.jpg", alt: "", area: "2 / 1" },
  { src: "/imagery/case-penthouse.webp", alt: "", area: "3 / 1" },
  { src: "/posters/wear-film.jpg", alt: "", area: "1 / 2" },
  { src: "/posters/trade-film.jpg", alt: "", area: "3 / 2" },
  { src: "/imagery/case-nightshade.webp", alt: "", area: "1 / 3" },
  { src: "/posters/resort-film.jpg", alt: "", area: "2 / 3" },
  { src: "/imagery/post-restraint.webp", alt: "", area: "3 / 3" },
];

/**
 * How far the grid scales. The centre cell is 50% of the viewport in each
 * axis (columns 1fr 2fr 1fr, rows the same), so 2.0 is the exact point where
 * it covers. The surplus carries the surrounding tiles fully past the corners
 * — at 2.35 their rounded inner edges still clipped into them.
 */
const MAX_SCALE = 2.7;

export default function MosaicReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Progress across the runway: 0 with the section's top at the viewport top,
  // 1 once it has been scrolled by the runway's full extra height.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Everything resolves by 0.8, so the last stretch of the runway is a settled
  // hero rather than a mosaic still finishing. Landing the animation exactly
  // as the sticky releases leaves the tiles visibly mid-exit.
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, MAX_SCALE]);
  // Faded as one layer rather than eight: the tiles never move relative to
  // each other, so this is a single composited surface instead of eight, and
  // it is gone before the runway ends rather than at the very last pixel.
  const mosaicOpacity = useTransform(scrollYProgress, [0, 0.42, 0.68], [1, 1, 0]);
  const gap = useTransform(scrollYProgress, [0, 0.6], ["0.75rem", "0rem"]);
  // The window's edge is the one line that says "this is a frame, and it is
  // opening". It goes before the tiles do.
  const ringOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  /**
   * Published to the subtree as `--reveal`, and read by the hero's copy.
   *
   * The headline cannot share the frame with the mosaic — at rest it starts
   * inside the window and runs out over the tiles, and no amount of scrim
   * fixes type crossing eight photographs. So it arrives with the room: held
   * back while the window is small, up to full by the time the tiles are
   * leaving. The default in the consuming rule is 1, so the copy is fully
   * visible with no JS and under reduced motion.
   */
  const reveal = useTransform(scrollYProgress, [0.12, 0.55], [0, 1]);

  if (reduced) {
    // The effect is entirely motion: with it removed there is no mosaic to
    // show, only the hero it opens onto. No runway either — the extra scroll
    // exists to drive an animation that is not running.
    return <>{children}</>;
  }

  return (
    <div ref={ref} className="relative h-[175svh]">
      <motion.div
        style={{ "--reveal": reveal } as React.CSSProperties}
        className="sticky top-0 h-svh overflow-hidden"
      >
        {children}

        {/* The frame. Decorative in full: it carries no information the
            division strip and headline underneath do not already state. */}
        <motion.div
          aria-hidden
          style={{ scale, gap, opacity: mosaicOpacity }}
          className="pointer-events-none absolute inset-0 grid grid-cols-[1fr_2fr_1fr] grid-rows-[1fr_2fr_1fr] bg-background will-change-transform"
        >
          {/* The centre cell stays empty — it is the window onto the hero.
              A gold hairline is what makes it read as one. */}
          <motion.span
            style={{ gridColumn: "2", gridRow: "2", opacity: ringOpacity }}
            className="rounded-lg ring-1 ring-inset ring-gold/30"
          />

          {tiles.map((tile) => {
            const [col, row] = tile.area.split(" / ");
            return (
              <div
                key={tile.src}
                style={{ gridColumn: col, gridRow: row }}
                className="relative overflow-hidden rounded-lg bg-surface"
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="34vw"
                  className="object-cover"
                />
                {/* Just enough to seat the tiles behind the headline that
                    crosses them. Heavier than this and the mosaic stops
                    reading as photography at all. */}
                <span className="absolute inset-0 bg-background/15" />
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
