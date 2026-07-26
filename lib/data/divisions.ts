/**
 * The Group's operating businesses.
 *
 * Per the 2026 Corporate Profile, Dubzz Group is the *holding company* — it
 * sits above these five and is not itself one of them. An earlier version
 * listed "Dubzz Group" as division 01, which contradicted the Group's own
 * structure; corporate pages now live under /group/* without a division entry.
 */

export type DivisionKey =
  | "media"
  | "wear"
  | "wine-resort"
  | "trade"
  | "after-dark";

export interface Division {
  key: DivisionKey;
  index: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  href: string;
  /** CSS custom-property reference, for use in stylesheets and inline styles. */
  accent: string;
  /**
   * The same colour as a literal hex. WebGL and canvas contexts cannot resolve
   * `var(--color-*)`, so anything drawing outside the DOM reads this instead.
   * Must be kept in step with the matching token in globals.css.
   */
  accentHex: string;
  facets: string[];
}

export const divisions: Division[] = [
  {
    key: "media",
    index: "01",
    name: "Dubzz Media",
    short: "Media",
    tagline: "Stories engineered to be unforgettable.",
    description:
      "The Group's flagship creative business, and the foundation it was built on — visual storytelling, strategic branding, and digital content for businesses, institutions, and entrepreneurs.",
    href: "/media",
    accent: "var(--color-media)",
    accentHex: "#ffffff",
    facets: ["Brand", "Film", "Digital"],
  },
  {
    key: "wear",
    index: "02",
    name: "Dubzz Wear",
    short: "Wear",
    tagline: "Fashion inspired by purpose.",
    description:
      "The lifestyle fashion division — premium apparel drawn from simplicity, functionality, and contemporary African culture, made for people who move with confidence.",
    href: "/wear",
    accent: "var(--color-wear)",
    accentHex: "#f0d98c",
    facets: ["Apparel", "Accessories", "Limited Editions"],
  },
  {
    key: "wine-resort",
    index: "03",
    name: "Dubzz Wines Resort",
    short: "Wines Resort",
    tagline: "Redefining hospitality through lifestyle and experience.",
    description:
      "The hospitality and lifestyle division — premium destinations where luxury, wine culture, leisure, and meaningful experiences come together.",
    href: "/wine-resort",
    accent: "var(--color-wine)",
    accentHex: "#d4af37",
    facets: ["Hospitality", "Wine Culture", "Events"],
  },
  {
    key: "trade",
    index: "04",
    name: "Dubzz Trade",
    short: "Trade",
    tagline: "Connecting African products to global markets.",
    description:
      "The international trade division — building trusted supply chains between African producers and buyers across regional and global markets.",
    href: "/trade",
    accent: "var(--color-trade)",
    accentHex: "#a8a8a8",
    facets: ["Commodities", "Export", "Sourcing"],
  },
  {
    key: "after-dark",
    index: "05",
    name: "After Dark",
    short: "After Dark",
    tagline: "Where culture comes alive.",
    description:
      "The Group's signature entertainment and lifestyle experience platform — curated nights where music, fashion, food, creativity, and connection meet.",
    href: "/after-dark",
    accent: "var(--color-afterdark)",
    accentHex: "#8a6d1d",
    facets: ["Experiences", "Culture", "Nightlife"],
  },
];

export function getDivision(key: DivisionKey): Division {
  return divisions.find((d) => d.key === key)!;
}
