import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Per-visitor and transactional routes. Nothing here is useful in a
      // search result, and indexing them leaks session-shaped URLs.
      disallow: [
        "/api/",
        "/group/profile",
        "/group/settings",
        "/group/investors/vault",
        "/login",
        "/signup",
        "/search",
        "/wear/account",
        "/wear/bag",
        "/wear/checkout/",
        "/wear/order-confirmed",
        "/wear/wishlist",
        "/wine-resort/booking/",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
