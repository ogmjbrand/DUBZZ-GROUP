import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { Grain, Vignette } from "../lib/Atmosphere";
import { easeLuxe, palette } from "../lib/tokens";

const MEDIA = "#b7bcc7";
const MEDIA_BRIGHT = "#e6e9ef";

const DURATION = 600;

/**
 * Editorial grid cells.
 *
 * Positions are on a 12-column baseline so the layout reads as a designed
 * page rather than a scatter — the whole point of the Media film is that it
 * looks composed. Each cell carries its own cycle offset so the grid is always
 * mid-recomposition and never resolves into a static arrangement.
 */
const cells = new Array(14).fill(0).map((_, i) => {
  const col = [0, 3, 7, 10, 1, 5, 8, 2, 6, 9, 4, 11, 0, 7][i];
  const row = [0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4][i];
  return {
    i,
    col,
    row,
    w: 1 + Math.floor(random(`cw${i}`) * 3),
    h: 1 + Math.floor(random(`ch${i}`) * 2),
    offset: random(`co${i}`),
  };
});

const COLS = 12;
const ROWS = 5;
const GUTTER = 18;

/**
 * Dubzz Media — ambient loop.
 *
 * A page laying itself out, forever. Cells fade and re-weight on independent
 * cycles so the composition is continuously reflowing without ever settling —
 * which is the honest visual for a creative studio's process, and avoids the
 * "finished layout" read that would make the loop point obvious.
 *
 * Deliberately monochrome: Media's tint is a near-neutral silver, and the
 * restraint is what separates it from the gold hero and the coloured division
 * films.
 */
export const MediaFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / DURATION;

  const fieldW = 1920 - 240;
  const fieldH = 1080 - 320;
  const cellW = (fieldW - GUTTER * (COLS - 1)) / COLS;
  const cellH = (fieldH - GUTTER * (ROWS - 1)) / ROWS;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0d" }}>
      <AbsoluteFill
        style={{
          background: "linear-gradient(160deg, #101116 0%, #0a0a0d 45%, #050505 100%)",
        }}
      />

      {/* Baseline grid — the page the cells are composed onto. */}
      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <g opacity={0.14}>
            {new Array(COLS + 1).fill(0).map((_, c) => (
              <line
                key={`c${c}`}
                x1={120 + c * (cellW + GUTTER)}
                y1={160}
                x2={120 + c * (cellW + GUTTER)}
                y2={1080 - 160}
                stroke={MEDIA}
                strokeWidth={1}
              />
            ))}
            {new Array(ROWS + 1).fill(0).map((_, r) => (
              <line
                key={`r${r}`}
                x1={120}
                y1={160 + r * (cellH + GUTTER)}
                x2={1920 - 120}
                y2={160 + r * (cellH + GUTTER)}
                stroke={MEDIA}
                strokeWidth={1}
              />
            ))}
          </g>
        </svg>
      </AbsoluteFill>

      {/* Cells */}
      <AbsoluteFill>
        {cells.map((c) => {
          // Each cell runs its own fade cycle, phase-shifted by `offset`.
          // Using a triangle wave over the loop keeps the value continuous at
          // the wrap point, so the loop has no seam.
          const phase = (t + c.offset) % 1;
          const wave = 1 - Math.abs(phase * 2 - 1);
          const presence = interpolate(wave, [0, 0.35, 1], [0, 0.85, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: easeLuxe,
          });

          // Subtle independent drift so cells breathe against the grid rather
          // than sitting locked to it.
          const dx = noise2D(`dx${c.i}`, t * 1.6, c.i * 0.4) * 7;
          const dy = noise2D(`dy${c.i}`, t * 1.6, c.i * 0.4) * 7;

          const x = 120 + c.col * (cellW + GUTTER);
          const y = 160 + c.row * (cellH + GUTTER);
          const w = c.w * cellW + (c.w - 1) * GUTTER;
          const h = c.h * cellH + (c.h - 1) * GUTTER;

          // One cell in four is a filled plate; the rest are outlines. An
          // all-filled grid reads as a dashboard, all-outline as a wireframe.
          const filled = c.i % 4 === 0;

          return (
            <div
              key={c.i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: w,
                height: h,
                opacity: presence * (filled ? 0.26 : 0.6),
                border: filled ? "none" : `1px solid ${MEDIA}`,
                background: filled
                  ? `linear-gradient(135deg, ${MEDIA_BRIGHT}, transparent 75%)`
                  : "none",
                translate: `${dx}px ${dy}px`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* Registration marks — the crop corners of a print layout. */}
      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          {([
            [120, 160],
            [1800, 160],
            [120, 920],
            [1800, 920],
          ] as const).map(([mx, my], i) => (
            <g key={i} stroke={MEDIA_BRIGHT} strokeWidth={1.4} opacity={0.62}>
              <line x1={mx - 22} y1={my} x2={mx + 22} y2={my} />
              <line x1={mx} y1={my - 22} x2={mx} y2={my + 22} />
            </g>
          ))}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, transparent 60%, ${palette.background} 100%)`,
        }}
      />
      <Vignette strength={0.78} />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

export const MEDIA_DURATION = DURATION;
