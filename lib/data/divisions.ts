export type DivisionKey = "group" | "media" | "wear" | "wine-resort" | "trade";

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
    key: "group",
    index: "01",
    name: "Dubzz Group",
    short: "Group",
    tagline: "The house above the houses.",
    description:
      "The corporate heart of the ecosystem — strategy, capital, and a single uncompromising standard applied across every venture we build.",
    href: "/group/story",
    accent: "var(--color-gold)",
    accentHex: "#d4af37",
    facets: ["Strategy", "Capital", "Governance"],
  },
  {
    key: "media",
    index: "02",
    name: "Dubzz Media",
    short: "Media",
    tagline: "Stories engineered to be unforgettable.",
    description:
      "A creative agency operating at the intersection of film, brand, and technology — building identities and campaigns for names that intend to last.",
    href: "/media",
    accent: "var(--color-media)",
    accentHex: "#b7bcc7",
    facets: ["Brand", "Film", "Digital"],
  },
  {
    key: "wear",
    index: "03",
    name: "Dubzz Wear",
    short: "Wear",
    tagline: "Quiet luxury, cut sharp.",
    description:
      "A fashion house built on restraint — limited runs, architectural silhouettes, and fabrics chosen the way collectors choose art.",
    href: "/wear",
    accent: "var(--color-wear)",
    accentHex: "#e8e3d8",
    facets: ["Apparel", "Limited Runs", "Atelier"],
  },
  {
    key: "wine-resort",
    index: "04",
    name: "Dubzz Wine Resort",
    short: "Wine Resort",
    tagline: "Where the vine meets the horizon.",
    description:
      "An estate of vineyards, sanctuaries, and fine dining — hospitality composed like cinema, poured like a rare vintage.",
    href: "/wine-resort",
    accent: "var(--color-wine)",
    accentHex: "#9e3a4d",
    facets: ["Estate", "Dining", "Experiences"],
  },
  {
    key: "trade",
    index: "05",
    name: "Dubzz Trade",
    short: "Trade",
    tagline: "Commerce that moves continents.",
    description:
      "Global sourcing, export, and logistics — moving premium commodities between markets with executive precision and total traceability.",
    href: "/trade",
    accent: "var(--color-trade)",
    accentHex: "#4a6d8c",
    facets: ["Commodities", "Logistics", "Export"],
  },
];

export function getDivision(key: DivisionKey): Division {
  return divisions.find((d) => d.key === key)!;
}
