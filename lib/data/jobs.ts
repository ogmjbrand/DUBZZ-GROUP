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
    location: "London / Remote",
    type: "Full-time",
    summary:
      "Own identity systems end-to-end for clients who measure work in decades. Portfolio over CV; craft over volume.",
  },
  {
    id: "head-sommelier",
    title: "Head Sommelier",
    division: "Dubzz Wines Resort",
    location: "The Estate",
    type: "Full-time",
    summary:
      "Curate a cellar that guests cross oceans for. You'll shape the list, the rituals, and the next decade of the estate's palate.",
  },
  {
    id: "supply-chain-lead",
    title: "Supply Chain Lead",
    division: "Dubzz Trade",
    location: "Accra",
    type: "Full-time",
    summary:
      "Run origin operations across three corridors with full custody-chain data. Precision under pressure, measured in on-spec deliveries.",
  },
  {
    id: "atelier-production-manager",
    title: "Atelier Production Manager",
    division: "Dubzz Wear",
    location: "Porto",
    type: "Full-time",
    summary:
      "Bring the atelier's limited runs fully in-house — from fabric sourcing to the final gold bar-tack, at a standard of one regret per zero garments.",
  },
  {
    id: "executive-assistant-group",
    title: "Executive Assistant to the Founder",
    division: "Dubzz Group",
    location: "London",
    type: "Full-time",
    summary:
      "The calendar behind five ventures. Absolute discretion, surgical prioritisation, and the judgement to say no on the founder's behalf.",
  },
];
