/**
 * Derives committed web deliverables from local Remotion masters.
 *
 * The pipeline is master/delivery, not one-file-fits-all:
 *
 *   remotion render  ->  remotion/out/<film>.mp4   (1080p CRF18, gitignored)
 *   this script      ->  public/videos/<film>.{mp4,webm}  (720p, committed)
 *
 * Masters stay out of git because every film is procedural and deterministic
 * — `npm run film:<name>` reproduces one byte-for-byte from source, so
 * committing 1080p masters was storing 30MB of something the repo can already
 * generate. Only the deliverables the browser actually fetches are versioned.
 *
 * Encode settings were chosen empirically against the hero's bloom, which is
 * the worst banding case in the set (a wide gold falloff on a #050505 ground):
 *
 *   - 720p. These are full-bleed backgrounds behind a vignette, a gradient
 *     mask and a grain pass. The extra vertical resolution was not survivable
 *     detail, it was just bitrate.
 *   - CRF 21 with `-tune grain`. Counter-intuitively this lands SMALLER than
 *     plain CRF 21 *and* visibly cleaner: the tune preserves the grain the
 *     films already carry, and that grain dithers the gradient. Plain CRF 21
 *     at 720p put concentric rings in the bloom halo; this does not.
 *
 * Do not "optimise" by dropping `-tune grain` — it is load-bearing.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const FILMS = ["hero", "trade", "resort", "media", "wear"];

const MASTER_DIR = "remotion/out";
const OUT_DIR = "public/videos";

// Resolve the platform binary directly rather than going through a shell.
// `shell: true` with an argument array concatenates instead of escaping, which
// Node flags as a security footgun (DEP0190) and which would break on any path
// containing a space — this repo's own path has one.
const NPX = process.platform === "win32" ? "npx.cmd" : "npx";

const ff = (args) =>
  execFileSync(NPX, ["remotion", "ffmpeg", ...args], {
    stdio: ["ignore", "ignore", "pipe"],
  });

const mb = (p) => (statSync(p).size / 1_048_576).toFixed(2);

mkdirSync(OUT_DIR, { recursive: true });

let before = 0;
let after = 0;

for (const film of FILMS) {
  const master = join(MASTER_DIR, `${film}-film.mp4`);
  if (!existsSync(master)) {
    console.log(`SKIP ${film} — no master at ${master} (run: npm run film:${film})`);
    continue;
  }

  const mp4 = join(OUT_DIR, `${film}-film.mp4`);
  const webm = join(OUT_DIR, `${film}-film.webm`);

  // H.264 — the universal fallback.
  ff(["-i", master, "-vf", "scale=1280:720", "-c:v", "libx264", "-crf", "21",
      "-preset", "slow", "-tune", "grain", "-pix_fmt", "yuv420p", "-an", "-y", mp4]);

  // VP9 — offered first; typically 30-50% under the H.264 for the same frame.
  // `-b:v 0` puts libvpx in constant-quality mode, without it CRF is ignored.
  ff(["-i", master, "-vf", "scale=1280:720", "-c:v", "libvpx-vp9", "-crf", "32",
      "-b:v", "0", "-row-mt", "1", "-an", "-y", webm]);

  before += statSync(master).size;
  after += statSync(mp4).size + statSync(webm).size;

  console.log(`${film.padEnd(7)} master ${mb(master)}MB -> mp4 ${mb(mp4)}MB + webm ${mb(webm)}MB`);
}

console.log(
  `\ntotal: ${(before / 1_048_576).toFixed(1)}MB of masters -> ` +
    `${(after / 1_048_576).toFixed(1)}MB committed`,
);
