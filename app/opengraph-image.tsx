import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const alt = "Dubzz Group — Building Brands. Creating Experiences. Inspiring Culture.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card.
 *
 * Generated rather than shipped as a flat file so the tagline stays bound to
 * `site.tagline` — a share image that quietly disagrees with the site is a
 * brand inconsistency nobody ever notices in review.
 *
 * Type is set in the platform serif stack: ImageResponse would need the
 * Playfair binary fetched and embedded per render, which is a network
 * dependency on the build for a difference of a few glyph widths at this size.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 2, background: "#d4af37" }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#d4af37",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", color: "#ffffff" }}>
          {site.tagline.split(" ").reduce<string[]>((lines, word) => {
            // The tagline is three sentences; break after each full stop.
            const last = lines[lines.length - 1];
            if (!last || last.endsWith(".")) lines.push(word);
            else lines[lines.length - 1] = `${last} ${word}`;
            return lines;
          }, []).map((line, i) => (
            <div
              key={line}
              style={{
                fontSize: 76,
                lineHeight: 1.08,
                color: i === 2 ? "#d4af37" : "#ffffff",
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#a8a8a8",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div>Abuja · Nigeria</div>
          <div>Media · Wear · Wines Resort · Trade · After Dark</div>
        </div>
      </div>
    ),
    size
  );
}
