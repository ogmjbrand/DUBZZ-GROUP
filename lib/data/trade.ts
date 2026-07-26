/**
 * Dubzz Trade.
 *
 * Content is bound to the 2026 Corporate Profile. The earlier version of this
 * file carried an invented commodity list (coffee, cashew, shea, sesame, fine
 * wine), fabricated performance metrics ("42 active corridors", "99.2% on-spec
 * delivery"), and a live shipment ledger with made-up consignment IDs. None of
 * it was real, and a live operations view is the most misleading thing a
 * pre-operational trade desk can publish. Replaced with what the Group has
 * actually stated.
 */

export interface Commodity {
  id: string;
  name: string;
  origin: string;
  grade: string;
  description: string;
  visual: string;
}

/** The profile's "Current Product Portfolio" — exactly these four. */
export const commodities: Commodity[] = [
  {
    id: "palm-oil",
    name: "Palm Oil",
    origin: "Nigeria",
    grade: "Crude & refined",
    description:
      "Sourced through producer relationships built on quality assurance and ethical sourcing, for food manufacturers and industrial buyers.",
    visual: "linear-gradient(145deg, #1a1207 0%, #0c0806 55%, #050505 100%)",
  },
  {
    id: "cocoa",
    name: "Cocoa",
    origin: "Nigeria · West Africa",
    grade: "Fermented beans",
    description:
      "Fermented and dried to buyer specification, moving through supply chains that prioritise transparency from farm to port.",
    visual: "linear-gradient(145deg, #14100a 0%, #0b0806 55%, #050505 100%)",
  },
  {
    id: "ginger",
    name: "Ginger",
    origin: "Kaduna · Northern Nigeria",
    grade: "Dried split & whole",
    description:
      "One of Nigeria's strongest export crops, prepared for spice, beverage, and pharmaceutical buyers across regional and global markets.",
    visual: "linear-gradient(150deg, #16130b 0%, #0a0907 55%, #050505 100%)",
  },
  {
    id: "charcoal",
    name: "Charcoal",
    origin: "Nigeria",
    grade: "Hardwood, BBQ & industrial",
    description:
      "Hardwood charcoal for barbecue and industrial use, sourced under the same reliability and long-term partnership standards as every line.",
    visual: "linear-gradient(145deg, #0f0e0d 0%, #090808 55%, #050505 100%)",
  },
];

/** Core Focus Areas, per the profile. */
export const tradeFocusAreas = [
  {
    title: "Agricultural Commodities",
    body: "Sourcing quality African agricultural produce for regional and international buyers.",
  },
  {
    title: "Export Development",
    body: "Building the routes, documentation, and relationships that move product out of origin markets.",
  },
  {
    title: "Supply Chain Coordination",
    body: "Coordinating producers, processors, and logistics so a contract behaves the way it was written.",
  },
  {
    title: "International Procurement",
    body: "Acting for international buyers who need reliable access to African supply.",
  },
  {
    title: "Market Development",
    body: "Opening new destination markets for African commodities and expanding producer access.",
  },
  {
    title: "Strategic Trade Partnerships",
    body: "Long-term partnerships with producers, cooperatives, and trade organisations.",
  },
];

/**
 * Operating Principles — what the profile says every trading relationship is
 * built on. These replace the fabricated metric counters: the Group is early
 * enough that its standards are the honest thing to lead with, not its numbers.
 */
export const operatingPrinciples = [
  {
    title: "Quality Assurance",
    body: "Product is graded and checked against specification before it moves.",
  },
  {
    title: "Ethical Sourcing",
    body: "Producer relationships that support local growers rather than squeeze them.",
  },
  {
    title: "Operational Reliability",
    body: "Doing what the contract says, on the timeline the contract says.",
  },
  {
    title: "Transparency",
    body: "Both sides of a trade can see the same picture at the same time.",
  },
  {
    title: "Long-Term Partnership",
    body: "We trade to build a relationship, not to clear a single cargo.",
  },
];
