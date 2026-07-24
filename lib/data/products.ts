export interface Product {
  slug: string;
  name: string;
  price: number;
  category: "Outerwear" | "Essentials" | "Tailoring" | "Accessories";
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
    slug: "obsidian-hoodie",
    name: "Obsidian Hoodie",
    price: 285,
    category: "Essentials",
    colorway: "Obsidian Black",
    description:
      "Our signature heavyweight hoodie in 480gsm loopback cotton, garment-dyed to a depth of black that swallows light. Cut oversized through the body with a sculpted hood and bonded seams.",
    details: [
      "480gsm Portuguese loopback cotton",
      "Garment-dyed, enzyme-washed",
      "Bonded interior seams, tonal embroidery",
      "Limited run of 300 pieces",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    visual:
      "radial-gradient(120% 90% at 30% 20%, #2a2a2e 0%, #121214 45%, #050505 100%)",
    badge: "Signature",
  },
  {
    slug: "eclipse-bomber",
    name: "Eclipse Bomber",
    price: 480,
    category: "Outerwear",
    colorway: "Midnight",
    description:
      "A technical bomber in matte Japanese nylon with a removable quilted liner. Hardware finished in brushed gold — the only place the light is allowed in.",
    details: [
      "Matte Japanese ripstop nylon",
      "Removable quilted liner",
      "Brushed-gold YKK Excella hardware",
      "Interior passport pocket",
    ],
    sizes: ["S", "M", "L", "XL"],
    visual:
      "radial-gradient(130% 100% at 70% 15%, #23262e 0%, #101116 50%, #050507 100%)",
    badge: "New",
  },
  {
    slug: "aurum-tee",
    name: "Aurum Tee",
    price: 120,
    category: "Essentials",
    colorway: "Bone",
    description:
      "A 240gsm supima tee in washed bone, with a single thread of gold embroidery at the hem. The quietest flex in the collection.",
    details: [
      "240gsm supima cotton",
      "Washed bone colorway",
      "Single gold hem thread",
      "Pre-shrunk, boxy fit",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    visual:
      "radial-gradient(120% 90% at 40% 25%, #3a3733 0%, #1d1b18 50%, #0a0908 100%)",
  },
  {
    slug: "noir-overshirt",
    name: "Noir Overshirt",
    price: 320,
    category: "Tailoring",
    colorway: "Ink",
    description:
      "Part shirt, part jacket, entirely deliberate. Brushed wool-blend twill with horn buttons and a chest pocket set at a cartographer's angle.",
    details: [
      "Italian wool-blend twill",
      "Genuine horn buttons",
      "Double-needle topstitching",
      "Cut for layering",
    ],
    sizes: ["S", "M", "L", "XL"],
    visual:
      "radial-gradient(120% 100% at 25% 30%, #1c1f26 0%, #0e1014 55%, #050506 100%)",
  },
  {
    slug: "midnight-cargo",
    name: "Midnight Cargo",
    price: 240,
    category: "Tailoring",
    colorway: "Midnight Black",
    description:
      "Tailored cargo trousers that answer the question nobody dared ask: what if utility dressed for dinner? Tapered, pressed, and pocketed with intent.",
    details: [
      "Stretch cotton-nylon twill",
      "Pressed front crease",
      "Six-pocket configuration",
      "Adjustable bungee hem",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    visual:
      "radial-gradient(140% 100% at 60% 20%, #202024 0%, #101012 50%, #050505 100%)",
  },
  {
    slug: "gilt-crewneck",
    name: "Gilt Crewneck",
    price: 210,
    category: "Essentials",
    colorway: "Charcoal / Gold",
    description:
      "A merino-blend crewneck in deep charcoal with a gilt-tipped collar seam. Warm enough for the harbour, sharp enough for the boardroom above it.",
    details: [
      "Extra-fine merino blend",
      "Gilt-tipped collar seam",
      "Fully-fashioned knit",
      "Naturally temperature-regulating",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    visual:
      "radial-gradient(120% 90% at 35% 20%, #26241e 0%, #131210 50%, #060505 100%)",
  },
  {
    slug: "shadow-trousers",
    name: "Shadow Trousers",
    price: 260,
    category: "Tailoring",
    colorway: "Graphite",
    description:
      "Wide-leg trousers in fluid graphite wool that move half a second after you do. Waistband finished with a hidden gold bar-tack — for you, not for them.",
    details: [
      "Fluid tropical wool",
      "Wide-leg, cropped break",
      "Hidden gold bar-tack",
      "Side-adjuster waistband",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    visual:
      "radial-gradient(130% 100% at 50% 15%, #232326 0%, #111113 55%, #050505 100%)",
  },
  {
    slug: "veil-cap",
    name: "Veil Cap",
    price: 95,
    category: "Accessories",
    colorway: "Black on Black",
    description:
      "A six-panel cap in dry-waxed cotton with tonal embroidery you only catch in raking light. The logo whispers; the silhouette doesn't have to.",
    details: [
      "Dry-waxed British cotton",
      "Tonal 3D embroidery",
      "Antique-brass closure",
      "One size, adjustable",
    ],
    sizes: ["OS"],
    visual:
      "radial-gradient(120% 90% at 45% 30%, #1b1b1d 0%, #0d0d0e 55%, #050505 100%)",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
