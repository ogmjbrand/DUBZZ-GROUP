/**
 * Corporate content — Dubzz Group Corporate Profile, 2026 Edition.
 *
 * The profile is the source of truth for everything in this file. Nothing here
 * is written for effect: no metrics, no client names, no offices, no awards,
 * no partnerships presented as concluded. Where the Group has stated intent
 * rather than achievement, the copy says intent.
 *
 * Sections the site previously carried in an invented voice — "the
 * single-regret test", "gold is a budget", "patient capital" — are replaced
 * by what the Group actually publishes: its purpose, vision, mission, values,
 * advantages, growth strategy, and five-year roadmap.
 */

/** The philosophy the profile identifies as the Group's core idea. */
export const philosophy = {
  words: ["Building Brands.", "Creating Experiences.", "Inspiring Culture."],
  body: "Three commitments, applied in order. A brand is built before it is launched, an experience is designed before it is sold, and culture is what remains once both are done well.",
};

export const purpose = {
  label: "Purpose",
  statement:
    "To build businesses that leave a lasting legacy of excellence, opportunity, and impact.",
};

export const vision = {
  label: "Vision",
  statement:
    "To become Africa's leading creative and lifestyle holding company, recognised globally for trusted brands, world-class experiences, and sustainable value.",
};

export const mission = {
  label: "Mission",
  statement:
    "To build innovative businesses that deliver exceptional products, services, and experiences, while empowering communities and creating economic opportunities across Africa.",
};

/**
 * "Why Dubzz" — the profile's competitive advantage.
 *
 * The Group's stated position is that the advantage is not the businesses it
 * owns but the way they work together, so each point carries the mechanism
 * rather than the adjective.
 */
export const advantages = [
  {
    title: "An Integrated Ecosystem",
    body: "Five businesses built to strengthen one another rather than operate in isolation — sharing creativity, audience, infrastructure, and opportunity.",
  },
  {
    title: "Creative Excellence",
    body: "Creativity is the Group's origin and its operating discipline. Every business is built to the standard set inside Dubzz Media.",
  },
  {
    title: "A Diversified Model",
    body: "Media, fashion, hospitality, entertainment, and trade — sectors that carry different cycles, and together carry the Group through them.",
  },
  {
    title: "Long-Term Vision",
    body: "The Group is structured to be built over decades, not quarters. Its published roadmap runs to 2030 and its ambition runs past it.",
  },
  {
    title: "A People-Centred Approach",
    body: "Businesses succeed when the people around them do — customers, partners, teams, and the communities each business operates in.",
  },
  {
    title: "Commitment to Africa",
    body: "Headquartered in Abuja and built to show that African businesses can compete at a global standard without leaving home to do it.",
  },
];

/**
 * The ecosystem, expressed as what each business contributes to the others.
 *
 * This is the profile's own argument for the holding-company structure, and
 * the reason the site draws it as a system rather than listing five cards.
 */
export const ecosystemFlows = [
  { from: "media", contribution: "Creates visibility", detail: "Media builds the brands, campaigns, and content every other business goes to market with." },
  { from: "wear", contribution: "Creates identity", detail: "Wear turns the Group's culture into something people can wear, own, and be seen in." },
  { from: "after-dark", contribution: "Creates experience", detail: "After Dark gathers the audience in person — the nights where the ecosystem is felt rather than described." },
  { from: "wine-resort", contribution: "Creates destination", detail: "Wines Resort gives the experiences somewhere to live, and the Group a place of its own." },
  { from: "trade", contribution: "Creates commerce", detail: "Trade connects the Group to markets beyond the creative economy, and African producers to buyers beyond Africa." },
];

/** The shared foundation the profile says the ecosystem runs on. */
export const ecosystemShared = [
  "Shared creativity",
  "Shared audience",
  "Shared infrastructure",
  "Shared opportunity",
  "Shared growth",
];

/**
 * The Five-Year Strategic Roadmap.
 *
 * Phases and intent are the profile's. No milestone has been added, no date
 * moved forward, and nothing is written in the past tense — 2026 is the
 * foundation year and the Group has said so.
 */
export const roadmap = [
  {
    year: "2026",
    phase: "Foundation",
    focus: "Establish operations",
    body: "Establish the Group's operations, strengthen Dubzz Media, prepare the launch of Dubzz Wear, and introduce the first After Dark experiences.",
  },
  {
    year: "2027",
    phase: "Expansion",
    focus: "Grow across Nigeria",
    body: "Grow across Nigeria through stronger partnerships, wider brand visibility, and commercial momentum in every division.",
  },
  {
    year: "2028",
    phase: "Regional Growth",
    focus: "Enter African markets",
    body: "Enter key African markets while building out hospitality, lifestyle experiences, and the export business.",
  },
  {
    year: "2029",
    phase: "Institutional Growth",
    focus: "Build at scale",
    body: "Advance flagship hospitality developments and larger-scale entertainment under a standard of operational excellence.",
  },
  {
    year: "2030",
    phase: "Global Positioning",
    focus: "Compete globally",
    body: "Stand as one of Africa's leading creative and lifestyle holding companies, recognised well beyond the continent.",
  },
];

/**
 * Strategic partnerships.
 *
 * These are the organisations the Group is open to working with — an
 * invitation, not a client list. Nothing here implies an existing agreement.
 */
export const partnershipAudiences = [
  { group: "Institutional", items: ["Government Institutions", "Development Agencies", "Educational Institutions"] },
  { group: "Commercial", items: ["Corporate Organisations", "International Trade Partners", "Technology Companies"] },
  { group: "Capital", items: ["Investors", "Strategic Alliances"] },
  { group: "Creative & Hospitality", items: ["Hospitality Groups", "Hotels & Resorts", "Event Organisers", "Media Organisations", "Creative Professionals"] },
];

/**
 * The founder, as the profile presents him.
 *
 * No biography beyond what the Group publishes: entrepreneur, creative
 * strategist, institution builder. Where the profile is silent — education,
 * previous ventures, tenure — so is this.
 */
export const founderNarrative = {
  standfirst:
    "Dubzz Group was founded by a creative who kept asking what came after the work was delivered.",
  paragraphs: [
    "Prince Chidubem Nwahiri is a Nigerian entrepreneur and creative strategist. He built Dubzz Media first — visual storytelling, brand identity, and digital content for businesses, institutions, and entrepreneurs — and it remains the discipline the rest of the Group is measured against.",
    "What followed was structural rather than opportunistic. Fashion, hospitality, entertainment, and trade were each developed as businesses that could stand alone and be stronger together, held inside a single institution rather than run as separate ventures.",
    "That structure is the point. The Group is being built to outlast the person who started it — an institution, on purpose, from the first year.",
  ],
};
