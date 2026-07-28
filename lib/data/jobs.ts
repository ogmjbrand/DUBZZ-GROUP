/**
 * Roles are illustrative of the kind of hiring the group's foundation year
 * calls for, not a live requisition feed. Locations are bound to the 2026
 * Corporate Profile's actual head office (Abuja, Nigeria) rather than the
 * earlier placeless-European set (London, Porto, Accra, "the Estate") —
 * offices and cities that were never in the profile. Summaries are written
 * for a group still building each house, not one with an existing cellar,
 * atelier, or trade corridor to hand over.
 */
export interface Job {
  id: string;
  title: string;
  division: string;
  location: string;
  type: string;
  summary: string;
}

export const jobs: Job[] = [
  {
    id: "senior-brand-designer",
    title: "Senior Brand Designer",
    division: "Dubzz Media",
    location: "Abuja / Remote",
    type: "Full-time",
    summary:
      "Own identity systems end-to-end for clients who measure work in decades. Portfolio over CV; craft over volume.",
  },
  {
    id: "wine-programme-lead",
    title: "Wine Programme Lead",
    division: "Dubzz Wines Resort",
    location: "Nigeria",
    type: "Full-time",
    summary:
      "Help build the wine programme from the ground up — sourcing, cellar design, and the rituals that will define the estate once it opens.",
  },
  {
    id: "supply-chain-lead",
    title: "Supply Chain Lead",
    division: "Dubzz Trade",
    location: "Lagos",
    type: "Full-time",
    summary:
      "Build the export routes and producer relationships for palm oil, cocoa, ginger, and charcoal — precision and reliability from the first shipment.",
  },
  {
    id: "production-manager",
    title: "Production Manager",
    division: "Dubzz Wear",
    location: "Nigeria",
    type: "Full-time",
    summary:
      "Build the production model from the ground up — sourcing, quality control, and the standard every numbered run will be held to.",
  },
  {
    id: "executive-assistant-group",
    title: "Executive Assistant to the Founder",
    division: "Dubzz Group",
    location: "Abuja",
    type: "Full-time",
    summary:
      "The calendar behind five ventures. Absolute discretion, surgical prioritisation, and the judgement to say no on the founder's behalf.",
  },
];
