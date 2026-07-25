import { Config } from "@remotion/cli/config";

/**
 * Remotion render configuration.
 *
 * This config governs only the film pipeline (`npm run film:*`). It has no
 * effect on the Next.js build — Remotion compiles the `remotion/` entry with
 * its own bundler and never touches `app/`.
 */

Config.setVideoImageFormat("jpeg");

// The film is dark, high-contrast and grainy. CRF 18 is the point where the
// gradient banding in the bloom stops being visible; higher values are cheaper
// but the banding shows immediately on a #050505 ground.
Config.setCrf(18);

// Every visual is procedural CSS/SVG — no GPU-backed WebGL in these
// compositions — so the software renderer avoids a class of headless-Chrome
// driver differences without costing anything.
Config.setChromiumOpenGlRenderer("swangle");

Config.setOverwriteOutput(true);
