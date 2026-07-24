export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  dek: string;
  visual: string;
  body: string[];
}

export const posts: Post[] = [
  {
    slug: "the-architecture-of-restraint",
    title: "The Architecture of Restraint",
    category: "Perspective",
    date: "2026-07-02",
    readTime: "6 min",
    dek: "Why the most expensive decision in luxury is the one you don't make — and how restraint became the operating system of every Dubzz venture.",
    visual:
      "linear-gradient(140deg, #14110a 0%, #0a0806 50%, #050505 100%), radial-gradient(70% 50% at 80% 20%, rgba(212,175,55,0.2) 0%, transparent 60%)",
    body: [
      "Every brand says less is more. Almost none can afford to prove it. Restraint is expensive — it means declining the collaboration, cutting the third colourway, ending the campaign one film early. It means building a hotel with fewer rooms than the land allows.",
      "At Dubzz, restraint is not an aesthetic preference; it is a governance rule. Each venture operates under a standard we call the single-regret test: every element that ships must be one we would regret removing, not one we would survive removing. The difference sounds subtle. Applied over five ventures and a decade, it compounds into identity.",
      "The gold in our identity system is governed the same way. It appears rarely enough that when it does, it means something — an accent, never a wallpaper. A precious resource, spent deliberately.",
      "This is also why the group grows slowly. A sixth venture will exist the day it can carry the same standard without diluting the other five — and not one quarter sooner.",
    ],
  },
  {
    slug: "harvest-notes-first-vintage",
    title: "Harvest Notes: The First Vintage",
    category: "Wine Resort",
    date: "2026-06-14",
    readTime: "5 min",
    dek: "Notes from the estate's first full harvest — early mornings, obsessive sorting tables, and the vintage we almost didn't bottle.",
    visual:
      "linear-gradient(150deg, #170b0e 0%, #0c0608 50%, #050505 100%), radial-gradient(70% 55% at 25% 20%, rgba(158,58,77,0.3) 0%, transparent 60%)",
    body: [
      "The first harvest teaches you the difference between owning a vineyard and being owned by one. For three weeks the estate ran on vineyard time: picking at 5am while the fruit was cold, sorting until the light went, tasting tank samples at hours no cellar master will admit to.",
      "We rejected forty percent of the fruit. On paper this is madness for a first vintage; in the glass it is the entire story. What remained went into small-lot fermentations — enough variation to learn the land parcel by parcel.",
      "The vintage we almost didn't bottle became the one we are proudest of: a single barrel from the east slope that spent the season underperforming and the winter becoming the most complete wine in the cellar.",
      "Guests visiting this autumn will taste it in the cellar bar, unlabelled, by request. Some things should be earned in person.",
    ],
  },
  {
    slug: "inside-project-nightshade",
    title: "Inside Project Nightshade",
    category: "Media",
    date: "2026-05-20",
    readTime: "7 min",
    dek: "Twelve films, one city, zero sunrises — the production diary behind our most constrained campaign to date.",
    visual:
      "linear-gradient(160deg, #0b0d14 0%, #060710 50%, #050505 100%), radial-gradient(70% 50% at 70% 25%, rgba(74,109,140,0.35) 0%, transparent 60%)",
    body: [
      "Constraints are gifts wearing disguises. When the client told us the car could never be filmed in daylight, the room went quiet — and then the ideas got better. Darkness stopped being a limitation and became the entire visual language.",
      "We shot for three weeks using only light the city already owned: sodium vapour, shopfront neon, a storm we chased for two nights. No HMIs, no daylight balance, no mercy.",
      "The discipline that saved us was pre-visualisation. Every frame of all twelve films existed as animated storyboards before a single call sheet went out. At night, you don't get second chances with weather, permits, or forty collectors' patience.",
      "The full anthology is in our portfolio. The car, as agreed, appears nowhere in full — some reveals belong to the room they were made for.",
    ],
  },
  {
    slug: "the-supply-chain-is-the-brand",
    title: "The Supply Chain Is the Brand",
    category: "Trade",
    date: "2026-04-08",
    readTime: "6 min",
    dek: "Traceability used to be a compliance line-item. For Dubzz Trade, it's the product — and buyers are finally pricing it that way.",
    visual:
      "linear-gradient(145deg, #0a0f14 0%, #06090d 50%, #050505 100%), radial-gradient(70% 55% at 30% 15%, rgba(74,109,140,0.3) 0%, transparent 60%)",
    body: [
      "Ask a commodity buyer what they pay for and they'll say quality and reliability. Watch what they actually pay a premium for and a third answer appears: certainty of origin. The documentation is becoming the differentiation.",
      "Every Dubzz Trade shipment carries a full custody chain from farm-gate to port to destination — not as a PDF afterthought, but as live data our partners can query mid-voyage.",
      "This changed our economics in a way we didn't predict: disputes collapsed. When both sides of a contract watch the same data, the argument surface area approaches zero.",
      "The next step is opening parts of that ledger to the end consumer. The bar of chocolate that can prove its own biography will not sit on the same shelf as the one that can't — or at the same price.",
    ],
  },
  {
    slug: "wear-ss26-obsidian",
    title: "SS26: The Obsidian Standard",
    category: "Wear",
    date: "2026-03-11",
    readTime: "4 min",
    dek: "The thinking behind the collection: one colour, twelve silhouettes, and a refusal to shout.",
    visual:
      "linear-gradient(135deg, #121212 0%, #0a0a0a 50%, #050505 100%), radial-gradient(80% 60% at 75% 20%, rgba(232,227,216,0.12) 0%, transparent 60%)",
    body: [
      "The SS26 collection began with a deletion. We removed colour from the table entirely and asked what was left to design with: weight, drape, proportion, and the way black behaves in different fibres — which, it turns out, is a full palette.",
      "Twelve silhouettes made the cut from over sixty prototypes. Each is cut to be recognised by shape alone, at distance, in bad light — the conditions real clothes actually live in.",
      "Gold appears exactly once per garment, usually where only the owner will find it: a hem thread, a bar-tack, the underside of a collar. Luxury that performs for an audience of one.",
      "The collection releases in numbered runs. When a run closes, it closes — the archive is the only restock we do.",
    ],
  },
  {
    slug: "investor-letter-2026",
    title: "A Letter on the Next Decade",
    category: "Group",
    date: "2026-02-01",
    readTime: "8 min",
    dek: "From the founder's desk: why we're building slowly, what we'll never sell, and where the ecosystem goes from here.",
    visual:
      "linear-gradient(140deg, #14110a 0%, #0b0906 50%, #050505 100%), radial-gradient(80% 55% at 20% 25%, rgba(212,175,55,0.22) 0%, transparent 60%)",
    body: [
      "Ten years ago, Dubzz was one venture and a conviction: that the standard is the strategy. Today it is five ventures, fourteen markets, and the same conviction — with better evidence.",
      "We are often asked when we will raise, exit, or franchise. The honest answer is that the group is structured to make those questions optional forever. Patient capital is not a constraint we tolerate; it is the moat.",
      "The next decade is about depth, not breadth: the estate's second phase, the atelier's move to full in-house production, and a media division that increasingly builds equity in what it creates rather than renting its craft.",
      "To our partners, guests, clients, and the inner circle: the standard holds. — D.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
