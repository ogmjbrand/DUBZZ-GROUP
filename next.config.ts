import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 defaults this allowlist to [75] and rejects any other `quality`,
     * so a value has to be declared here before a component can ask for it.
     * 62 is for the hero mosaic tiles: they sit behind a scrim, never exceed a
     * third of the viewport, and scroll away within one gesture.
     */
    qualities: [62, 75],
  },
};

export default nextConfig;
