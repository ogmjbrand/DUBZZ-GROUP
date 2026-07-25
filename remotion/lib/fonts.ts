import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

/**
 * Shared typography for the film.
 *
 * Loaded once here, with the weights and subsets pinned to exactly what the
 * scenes use. Calling `loadFont()` bare pulls every weight and every subset —
 * ~200 font requests per render — which is paid on every one of the 1260
 * frames. Pinning them cuts that to four.
 *
 * Mirrors the site's typographic roles: Playfair Display for display copy,
 * Montserrat for labels and the wordmark. Inter is body copy and never appears
 * in the film, so it is not loaded.
 */

const playfair = loadPlayfair("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

const montserrat = loadMontserrat("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});

/** Display voice — headlines and the statement. */
export const displayFont = playfair.fontFamily;

/** Label voice — overlines, division names, the wordmark. */
export const labelFont = montserrat.fontFamily;
