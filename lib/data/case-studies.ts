export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  year: string;
  discipline: string;
  summary: string;
  /** Art-directed CSS backdrop. Sits behind `image`, and stands alone without it. */
  visual: string;
  /** Hero photography under /public. Optional — the backdrop carries the card until one exists. */
  image?: string;
  /** Alt text for `image`. Required whenever `image` is set. */
  imageAlt?: string;
  accent: string;
  challenge: string;
  approach: string;
  outcome: string;
  results: { value: string; label: string }[];
  services: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "aureum-global-rebrand",
    title: "Aureum Global Rebrand",
    client: "Aureum Global",
    year: "2025",
    discipline: "Brand Identity",
    summary:
      "A complete identity rebuild for a private wealth firm managing three generations of quiet money — from wordmark to motion system to a 200-page brand codex.",
    visual:
      "linear-gradient(135deg, #1a1409 0%, #0d0a04 40%, #050505 100%), radial-gradient(80% 60% at 80% 10%, rgba(212,175,55,0.25) 0%, transparent 60%)",
    image: "/imagery/case-aureum.webp",
    imageAlt:
      "Brand collateral arranged on a dark walnut boardroom table — gold-edged black cards, a brass paperweight and an open codex under a single warm light.",
    accent: "var(--color-gold)",
    challenge:
      "Aureum's equity was invisible by design — a firm that had spent forty years cultivating discretion suddenly needed presence without volume. The brief demanded a brand that could sit beside centuries-old private banks and feel inevitable, not new.",
    approach:
      "We began in the archive, not the mood board: forty years of correspondence, certificates, and ledgers became the typographic DNA. The new wordmark is drawn from the firm's 1987 letterhead, redrawn at display weight. A motion language of slow reveals and metallic light passes gives the identity its pulse, and a strict gold-on-black art direction gives it its silence.",
    outcome:
      "The rebrand launched across four offices and three continents in a single coordinated week. Within a quarter, inbound mandates from family offices had doubled, and the firm's brand tracked as 'established decades ago' in blind perception testing.",
    results: [
      { value: "2×", label: "Inbound mandates in one quarter" },
      { value: "200", label: "Page brand codex delivered" },
      { value: "4", label: "Offices launched simultaneously" },
    ],
    services: ["Strategy", "Identity", "Motion System", "Brand Codex", "Launch Film"],
  },
  {
    slug: "project-nightshade",
    title: "Project Nightshade",
    client: "Confidential — Automotive",
    year: "2026",
    discipline: "Campaign & Film",
    summary:
      "A global launch campaign for a limited-run hypercar that was never allowed to be photographed in daylight — twelve films, one city, zero sunrises.",
    visual:
      "linear-gradient(160deg, #0b0d14 0%, #060710 45%, #050505 100%), radial-gradient(70% 50% at 20% 20%, rgba(74,109,140,0.3) 0%, transparent 60%)",
    image: "/imagery/case-nightshade.webp",
    imageAlt:
      "A deserted rain-slicked city street before dawn, sodium streetlight reflecting off wet asphalt through thin fog.",
    accent: "var(--color-trade)",
    challenge:
      "The client's constraint was absolute: the car exists only at night. Every frame, every asset, every activation had to be composed inside darkness while still rendering £2.1M of carbon and titanium legible to an audience of 40 collectors.",
    approach:
      "We treated darkness as the medium, not the obstacle. A twelve-film anthology shot across one city over three weeks, using only practical light — sodium vapour, neon, headlights, lightning. Each film ends at the moment before reveal; the full car appears only in person, at a single invitation-only viewing staged in a decommissioned observatory.",
    outcome:
      "All forty commissions were allocated before the third film released. The anthology took Gold at two international craft shows and has been cited by the client as the reason the next commission is already ours.",
    results: [
      { value: "40/40", label: "Commissions allocated pre-launch" },
      { value: "12", label: "Films in the anthology" },
      { value: "2", label: "International craft Golds" },
    ],
    services: ["Campaign Strategy", "Film Production", "Experiential", "CGI & Post"],
  },
  {
    slug: "obsidian-penthouse",
    title: "Obsidian Penthouse",
    client: "Dubzz Group × Meridian Estates",
    year: "2025",
    discipline: "Virtual Experience",
    summary:
      "A fully explorable real-time 3D twin of a £30M penthouse, built for buyers who tour by night from three time zones away.",
    visual:
      "linear-gradient(150deg, #12100d 0%, #0a0908 45%, #050505 100%), radial-gradient(90% 60% at 75% 15%, rgba(212,175,55,0.18) 0%, transparent 55%)",
    image: "/imagery/case-penthouse.webp",
    imageAlt:
      "A dark penthouse interior at dusk, floor-to-ceiling glass overlooking a distant city grid, lit by one warm floor lamp.",
    accent: "var(--color-gold)",
    challenge:
      "The penthouse existed only as drawings; the buyers existed only on other continents. Meridian needed a sales instrument that could carry a £30M decision across a screen without a single physical viewing.",
    approach:
      "We built the residence twice: once in millimetre-accurate real-time 3D, and once as a cinematic layer — a time-of-day system that walks the sun across the marble, a soundscape recorded in comparable spaces, and a guided narrative mode voiced like a private viewing. The experience runs in-browser, gated behind a single-use key couriered to each prospect in an obsidian card.",
    outcome:
      "The penthouse sold to the second key-holder, sight unseen, in eleven days. The platform now anchors Meridian's off-plan programme, and the obsidian key has become the most photographed object in their sales funnel.",
    results: [
      { value: "11", label: "Days from key to contract" },
      { value: "£30M", label: "Sold sight unseen" },
      { value: "1", label: "Physical viewing required" },
    ],
    services: ["Real-time 3D", "Experience Design", "Sound Design", "Narrative Direction"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
