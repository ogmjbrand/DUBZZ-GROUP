export interface Sanctuary {
  slug: string;
  name: string;
  tagline: string;
  rate: number;
  size: string;
  occupancy: string;
  features: string[];
  visual: string;
}

export const sanctuaries: Sanctuary[] = [
  {
    slug: "vineyard-villa",
    name: "The Vineyard Villa",
    tagline: "A private residence set inside the rows themselves.",
    rate: 1850,
    size: "180 m²",
    occupancy: "Up to 4 guests",
    features: [
      "Private plunge pool facing the east slope",
      "Dedicated estate host",
      "Cellar allocation included",
      "Outdoor fire terrace",
    ],
    visual:
      "linear-gradient(150deg, #170b0e 0%, #0d0709 45%, #050505 100%), radial-gradient(80% 55% at 70% 20%, rgba(158,58,77,0.35) 0%, transparent 60%)",
  },
  {
    slug: "cellar-suite",
    name: "The Cellar Suite",
    tagline: "Carved into the hillside, one floor above the barrels.",
    rate: 1200,
    size: "95 m²",
    occupancy: "Up to 2 guests",
    features: [
      "Stone bath cut from estate rock",
      "Direct cellar access",
      "Nightly barrel tasting",
      "Sunrise terrace",
    ],
    visual:
      "linear-gradient(155deg, #120d0a 0%, #0a0706 45%, #050505 100%), radial-gradient(75% 55% at 30% 25%, rgba(212,175,55,0.2) 0%, transparent 60%)",
  },
  {
    slug: "terrace-residence",
    name: "The Terrace Residence",
    tagline: "The estate's crown — a full floor above the valley.",
    rate: 2600,
    size: "260 m²",
    occupancy: "Up to 6 guests",
    features: [
      "Panoramic 270° valley terrace",
      "Private chef's kitchen & dining",
      "In-residence spa suite",
      "Helipad transfer available",
    ],
    visual:
      "linear-gradient(145deg, #14100d 0%, #0b0808 45%, #050505 100%), radial-gradient(85% 60% at 75% 15%, rgba(158,58,77,0.28) 0%, transparent 55%)",
  },
];

export interface Experience {
  slug: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  visual: string;
}

export const experiences: Experience[] = [
  {
    slug: "barrel-room-tasting",
    name: "Barrel Room Tasting",
    duration: "2 hours",
    price: 180,
    description:
      "Six wines drawn directly from barrel with the cellar master — including lots that will never be bottled under their own name.",
    visual:
      "linear-gradient(150deg, #170b0e 0%, #0c0608 50%, #050505 100%)",
  },
  {
    slug: "harvest-immersion",
    name: "Harvest Immersion",
    duration: "Full day",
    price: 420,
    description:
      "One day inside the harvest: dawn picking, the sorting table, and lunch in the rows with the vineyard team. Seasonal, by application.",
    visual:
      "linear-gradient(145deg, #14110a 0%, #0b0906 50%, #050505 100%)",
  },
  {
    slug: "estate-spa-ritual",
    name: "Estate Spa Ritual",
    duration: "3 hours",
    price: 340,
    description:
      "Vinotherapy treatments built on the estate's own pressings, ending in the stone steam room overlooking the valley.",
    visual:
      "linear-gradient(155deg, #100d10 0%, #090709 50%, #050505 100%)",
  },
  {
    slug: "private-cellar-dinner",
    name: "Private Cellar Dinner",
    duration: "Evening",
    price: 560,
    description:
      "Eight courses at a single table set between the barrels, each paired from the estate library — including verticals that never leave the property.",
    visual:
      "linear-gradient(150deg, #12100a 0%, #0a0906 50%, #050505 100%)",
  },
];

export const resortEvents = [
  {
    name: "The Midnight Vintage",
    date: "2026-09-12",
    description:
      "The release of the estate's flagship vintage, tasted at midnight in the barrel room. Black tie, forty seats.",
    status: "By invitation",
  },
  {
    name: "Autumn Harvest Weekend",
    date: "2026-10-03",
    description:
      "Two days inside the working harvest — picking, sorting, and the harvest table dinner that ends the season.",
    status: "Applications open",
  },
  {
    name: "Winter Solstice Dinner",
    date: "2026-12-21",
    description:
      "The longest night, answered with the deepest cellar. A single-table dinner in candlelight, menu undisclosed.",
    status: "Waitlist",
  },
];

export const diningVenues = [
  {
    name: "Meridian",
    type: "Fine Dining",
    description:
      "The estate's flagship restaurant — a tasting menu written each morning from the kitchen garden and the valley's hunters, fishers, and foragers.",
    detail: "Eight courses · Estate pairing · Dinner only",
    visual:
      "linear-gradient(150deg, #14100a 0%, #0b0806 50%, #050505 100%), radial-gradient(70% 50% at 75% 20%, rgba(212,175,55,0.22) 0%, transparent 60%)",
  },
  {
    name: "The Rows",
    type: "Vineyard Table",
    description:
      "Long-table lunches set directly in the vines — fire-cooked, family-served, and finished with whatever the cellar master is proud of that week.",
    detail: "Lunch · Seasonal · Weather permitting",
    visual:
      "linear-gradient(150deg, #101208 0%, #090a06 50%, #050505 100%), radial-gradient(70% 50% at 25% 25%, rgba(158,58,77,0.25) 0%, transparent 60%)",
  },
  {
    name: "Cellar Bar",
    type: "Wine Bar",
    description:
      "Unlabelled pours, rare verticals, and the quietest room on the estate. Ask for the east slope barrel — if it's your year, it will be poured.",
    detail: "Evenings · Guests & members",
    visual:
      "linear-gradient(155deg, #120b0d 0%, #0a0608 50%, #050505 100%), radial-gradient(70% 55% at 60% 20%, rgba(158,58,77,0.3) 0%, transparent 60%)",
  },
];

export const galleryScenes = [
  { caption: "East slope, first light", visual: "linear-gradient(140deg, #1a1410 0%, #0c0908 60%, #050505 100%)", span: "wide" },
  { caption: "The barrel room", visual: "linear-gradient(150deg, #170b0e 0%, #0b0608 60%, #050505 100%)", span: "tall" },
  { caption: "Harvest, hour one", visual: "linear-gradient(145deg, #14110a 0%, #0a0906 60%, #050505 100%)", span: "std" },
  { caption: "Meridian, service", visual: "linear-gradient(150deg, #12100a 0%, #0a0806 60%, #050505 100%)", span: "std" },
  { caption: "The stone bath", visual: "linear-gradient(155deg, #100d10 0%, #090709 60%, #050505 100%)", span: "tall" },
  { caption: "Valley, blue hour", visual: "linear-gradient(160deg, #0b0d14 0%, #060710 60%, #050505 100%)", span: "wide" },
  { caption: "The sorting table", visual: "linear-gradient(145deg, #120d0a 0%, #0a0706 60%, #050505 100%)", span: "std" },
  { caption: "Terrace, midnight", visual: "linear-gradient(150deg, #0d0a10 0%, #080609 60%, #050505 100%)", span: "std" },
] as const;
