/**
 * The Dubzz Wear collection.
 *
 * The product line is the one the corporate profile publishes: premium
 * T-shirts, hoodies, polo shirts, joggers, caps, accessories, and limited
 * edition collections. Positioning follows the profile too — confidence,
 * creativity, ambition, and contemporary African culture.
 *
 * An earlier version of this file described a European luxury label that does
 * not exist: 480gsm Portuguese loopback cotton, matte Japanese ripstop,
 * Italian wool twill, dry-waxed British cotton, YKK Excella hardware, an
 * atelier in Porto, and runs "limited to 300 pieces". None of it is in the
 * profile, none of it is verifiable, and sourcing claims are the kind of
 * detail a buyer checks. Details now describe design decisions the brand
 * actually controls — fit, construction, finish — and stop there.
 */

export interface Product {
  slug: string;
  name: string;
  price: number;
  category: "T-Shirts" | "Hoodies" | "Polos" | "Joggers" | "Caps" | "Accessories";
  colorway: string;
  description: string;
  details: string[];
  sizes: string[];
  /** CSS background standing in for product photography */
  visual: string;
  badge?: string;
}

export const products: Product[] = [
  {
    slug: "signature-hoodie",
    name: "Signature Hoodie",
    price: 120,
    category: "Hoodies",
    colorway: "Midnight Black",
    description:
      "The anchor of the collection. A heavyweight hoodie cut with a relaxed body and a structured hood, finished with a tonal Dubzz wordmark that reads as texture before it reads as a logo.",
    details: [
      "Heavyweight brushed-back fleece",
      "Relaxed fit, dropped shoulder",
      "Ribbed cuffs and hem",
      "Tonal embroidered wordmark",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    visual:
      "radial-gradient(120% 90% at 30% 20%, #2a2a2e 0%, #121214 45%, #050505 100%)",
    badge: "Signature",
  },
  {
    slug: "ambition-hoodie",
    name: "Ambition Hoodie",
    price: 135,
    category: "Hoodies",
    colorway: "Black / Gold",
    description:
      "The Signature silhouette in its limited-edition finish — gold embroidery at the chest and cuff, produced as a numbered collection rather than a standing line.",
    details: [
      "Heavyweight brushed-back fleece",
      "Gold embroidery at chest and cuff",
      "Relaxed fit, dropped shoulder",
      "Released as a numbered collection",
    ],
    sizes: ["S", "M", "L", "XL"],
    visual:
      "radial-gradient(130% 100% at 70% 15%, #2b2718 0%, #14120c 50%, #050505 100%)",
    badge: "Limited Edition",
  },
  {
    slug: "essential-tee",
    name: "Essential Tee",
    price: 45,
    category: "T-Shirts",
    colorway: "Bone",
    description:
      "The everyday piece the rest of the collection is built around. A boxy, mid-weight tee in washed bone with a single line of gold thread at the hem.",
    details: [
      "Mid-weight combed cotton",
      "Boxy fit, reinforced neckline",
      "Single gold hem thread",
      "Pre-shrunk",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    visual:
      "radial-gradient(120% 90% at 40% 25%, #3a3733 0%, #1d1b18 50%, #0a0908 100%)",
  },
  {
    slug: "statement-tee",
    name: "Statement Tee",
    price: 55,
    category: "T-Shirts",
    colorway: "Obsidian",
    description:
      "Built for the loud version of the brand. A heavier tee in deep black with an oversized front graphic drawn from the Dubzz mark — confidence worn plainly.",
    details: [
      "Heavier-weight combed cotton",
      "Oversized front graphic",
      "Straight body, standard sleeve",
      "Unisex sizing",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    visual:
      "radial-gradient(120% 100% at 25% 30%, #1c1f26 0%, #0e1014 55%, #050506 100%)",
  },
  {
    slug: "heritage-polo",
    name: "Heritage Polo",
    price: 75,
    category: "Polos",
    colorway: "Charcoal",
    description:
      "A polo cut closer to tailoring than to sportswear. Ribbed collar, three-button placket, and a clean drop through the body — as comfortable in a meeting as out of one.",
    details: [
      "Fine-gauge piqué knit",
      "Ribbed collar and cuffs",
      "Three-button placket",
      "Tailored through the body",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    visual:
      "radial-gradient(120% 90% at 35% 20%, #26241e 0%, #131210 50%, #060505 100%)",
  },
  {
    slug: "gold-line-polo",
    name: "Gold Line Polo",
    price: 85,
    category: "Polos",
    colorway: "Black / Gold",
    description:
      "The Heritage Polo with a gold tipping line at the collar and cuff. One accent, placed once — the whole argument for how the brand uses gold.",
    details: [
      "Fine-gauge piqué knit",
      "Gold tipping at collar and cuff",
      "Three-button placket",
      "Tailored through the body",
    ],
    sizes: ["S", "M", "L", "XL"],
    visual:
      "radial-gradient(140% 100% at 60% 20%, #262218 0%, #14120d 50%, #050505 100%)",
  },
  {
    slug: "movement-joggers",
    name: "Movement Joggers",
    price: 95,
    category: "Joggers",
    colorway: "Graphite",
    description:
      "Tapered joggers with a clean front and a considered break at the ankle. Designed to hold their shape through the day rather than only through the morning.",
    details: [
      "Brushed-back fleece",
      "Tapered leg, elasticated cuff",
      "Drawcord waist, side pockets",
      "Zip back pocket",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    visual:
      "radial-gradient(130% 100% at 50% 15%, #232326 0%, #111113 55%, #050505 100%)",
  },
  {
    slug: "emblem-cap",
    name: "Emblem Cap",
    price: 40,
    category: "Caps",
    colorway: "Black on Black",
    description:
      "A six-panel cap with tonal embroidery you only catch in raking light. The mark whispers; the silhouette does the rest.",
    details: [
      "Structured six-panel crown",
      "Tonal raised embroidery",
      "Metal closure, adjustable",
      "One size",
    ],
    sizes: ["OS"],
    visual:
      "radial-gradient(120% 90% at 45% 30%, #1b1b1d 0%, #0d0d0e 55%, #050505 100%)",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
