import { founder } from "./site";

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  dek: string;
  visual: string;
  /** Editorial photography under /public. Optional — the backdrop carries the card until one exists. */
  image?: string;
  /** Alt text for `image`. Required whenever `image` is set. */
  imageAlt?: string;
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
    image: "/imagery/post-restraint.webp",
    imageAlt:
      "A sweeping board-formed concrete staircase curving through an empty gallery, lit by a single shaft of warm daylight.",
    body: [
      "Every brand says less is more. Almost none can afford to prove it. Restraint is expensive — it means declining the collaboration, cutting the third colourway, ending the campaign one film early. It means building a hotel with fewer rooms than the land allows.",
      "At Dubzz, restraint is not an aesthetic preference; it is a governance rule. Each venture operates under a standard we call the single-regret test: every element that ships must be one we would regret removing, not one we would survive removing. The difference sounds subtle. Applied over five ventures and a decade, it compounds into identity.",
      "The gold in our identity system is governed the same way. It appears rarely enough that when it does, it means something — an accent, never a wallpaper. A precious resource, spent deliberately.",
      "This is also why the group grows slowly. A sixth venture will exist the day it can carry the same standard as the first five — and not one quarter sooner.",
    ],
  },
  {
    slug: "harvest-notes-first-vintage",
    title: "Building Toward the First Vintage",
    category: "Wines Resort",
    date: "2026-06-14",
    readTime: "5 min",
    dek: "What it takes to plant a wine culture before the first harvest ever happens — and why Dubzz Wines Resort is in no hurry to bottle anything.",
    visual:
      "linear-gradient(150deg, #170b0e 0%, #0c0608 50%, #050505 100%), radial-gradient(70% 55% at 25% 20%, rgba(158,58,77,0.3) 0%, transparent 60%)",
    body: [
      "A vineyard teaches patience before it teaches anything about wine. Dubzz Wines Resort is still in development — the land, the plantings, and the rituals that will define the estate are being built deliberately, in the order a serious estate is built in, not the order a launch calendar would prefer.",
      "The vision is not a hotel with a vineyard attached. It's hospitality organised around wine culture itself — cellar, table, and terrace treated as one experience rather than three amenities bolted together.",
      "We'd rather publish that plainly than invent a harvest we haven't had yet. When the first vintage exists, it will be told properly — sorting tables, rejected fruit, whichever barrel nobody expected to love. Until then, this is the plan, not the diary.",
      "Guests who'd rather watch this get built than arrive after it's finished can register interest through the group — an estate remembers the people who came for the beginning.",
    ],
  },
  {
    slug: "pre-visualising-in-the-dark",
    title: "Pre-Visualising in the Dark",
    category: "Media",
    date: "2026-05-20",
    readTime: "5 min",
    dek: "Why Dubzz Media storyboards every frame before a single call sheet goes out — especially on the night shoots that don't forgive a second take.",
    visual:
      "linear-gradient(160deg, #0b0d14 0%, #060710 50%, #050505 100%), radial-gradient(70% 50% at 70% 25%, rgba(74,109,140,0.35) 0%, transparent 60%)",
    body: [
      "Constraints are gifts wearing disguises. Tell a crew a film can only be shot after dark and the room goes quiet — then the ideas get better. Darkness stops being a limitation and becomes the visual language.",
      "Night sets run on light the city already owns: sodium vapour, shopfront neon, whatever passes overhead. No HMIs, no daylight balance, no mercy — and no do-overs once the weather or the permit window closes.",
      "The discipline that makes this survivable is pre-visualisation: every frame exists as an animated storyboard before anyone calls action. At night, you don't get second chances with weather, permits, or a client's patience.",
      "It's a slower way to plan a film and a faster way to shoot one. Most of the hard decisions get made in a dark room with a laptop, weeks before anyone stands in the actual dark.",
    ],
  },
  {
    slug: "the-supply-chain-is-the-brand",
    title: "The Supply Chain Is the Brand",
    category: "Trade",
    date: "2026-04-08",
    readTime: "6 min",
    dek: "Traceability used to be a compliance line-item. For Dubzz Trade, it's the product we're building around from day one.",
    visual:
      "linear-gradient(145deg, #0a0f14 0%, #06090d 50%, #050505 100%), radial-gradient(70% 55% at 30% 15%, rgba(74,109,140,0.3) 0%, transparent 60%)",
    body: [
      "Ask a commodity buyer what they pay for and they'll say quality and reliability. Increasingly, a third answer appears: certainty of origin. Documentation is becoming the differentiation, not a compliance line-item.",
      "That's the standard we're building Dubzz Trade around from the first shipment: product graded and checked against specification before it moves, producer relationships that support the growers we work with rather than squeeze them, and a contract that behaves the way it was written.",
      "We're early. The desk is building the routes, documentation, and relationships that move palm oil, cocoa, ginger, and charcoal out of Nigeria and into the hands of buyers who need reliable access to them — transparency designed in from the start, not bolted on once something goes wrong.",
      "The bar of chocolate that can prove its own biography will not sit on the same shelf as the one that can't — or at the same price. That's where we intend to arrive. We're telling you the route, not claiming we're already there.",
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
      "Dubzz Group exists because one conviction kept proving itself true across every venture we tried: the standard is the strategy. We are in the foundation year of formalising that conviction into five houses — Media, Wear, Wines Resort, Trade, and After Dark — under one holding company.",
      "We are often asked when we will raise, exit, or franchise. The honest answer is that the group is being structured to make those questions optional forever. Patient capital is not a constraint we tolerate; it is the moat we are building from year one.",
      "The next few years are about depth, not breadth: bringing Dubzz Wear properly to launch, developing Wines Resort deliberately rather than quickly, and growing Dubzz Media and Dubzz Trade on relationships built to last rather than quarters to hit. A sixth house will exist the day it can carry the same standard as the first five — not before.",
      `To our partners, guests, clients, and the inner circle: the standard holds. — ${founder.name}, ${founder.role}`,
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
