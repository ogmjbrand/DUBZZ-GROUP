export interface Commodity {
  id: string;
  name: string;
  origin: string;
  grade: string;
  description: string;
  visual: string;
}

export const commodities: Commodity[] = [
  {
    id: "cocoa",
    name: "Cocoa",
    origin: "Ghana · Côte d'Ivoire",
    grade: "Premium fermented, Grade I",
    description:
      "Single-cooperative lots with full farm-gate traceability, fermented and dried to specification for fine-flavour buyers.",
    visual:
      "linear-gradient(145deg, #14100a 0%, #0b0806 55%, #050505 100%)",
  },
  {
    id: "coffee",
    name: "Coffee",
    origin: "Ethiopia · Rwanda",
    grade: "Specialty, 85+ cup score",
    description:
      "Washed and natural microlots sourced at origin by our own agronomists, shipped in hermetic liners under temperature watch.",
    visual:
      "linear-gradient(150deg, #120d0a 0%, #0a0706 55%, #050505 100%)",
  },
  {
    id: "cashew",
    name: "Cashew",
    origin: "Benin · Tanzania",
    grade: "W240 / W320",
    description:
      "Raw and processed kernels with in-country value addition, moving through our own quality-control lab before port.",
    visual:
      "linear-gradient(145deg, #14120c 0%, #0b0a07 55%, #050505 100%)",
  },
  {
    id: "shea",
    name: "Shea",
    origin: "Northern Ghana",
    grade: "Unrefined, cosmetic grade",
    description:
      "Women's-cooperative shea butter with certified fair pricing, batch-tested for cosmetic and food applications.",
    visual:
      "linear-gradient(150deg, #14110d 0%, #0b0908 55%, #050505 100%)",
  },
  {
    id: "sesame",
    name: "Sesame",
    origin: "Nigeria · Sudan",
    grade: "99.5% purity, hulled",
    description:
      "Machine-cleaned and colour-sorted sesame for food manufacturers, contracted against forward positions to stabilise supply.",
    visual:
      "linear-gradient(145deg, #13110b 0%, #0a0907 55%, #050505 100%)",
  },
  {
    id: "fine-wine",
    name: "Fine Wine",
    origin: "Dubzz Estate & partners",
    grade: "Allocation only",
    description:
      "The estate's own vintages and a brokered cellar of partner producers, moving under bonded, temperature-controlled custody.",
    visual:
      "linear-gradient(150deg, #170b0e 0%, #0c0608 55%, #050505 100%)",
  },
];

export const tradeCorridors = [
  { from: "Accra", to: "Rotterdam", cargo: "Cocoa", transit: "18 days" },
  { from: "Addis Ababa", to: "Hamburg", cargo: "Coffee", transit: "24 days" },
  { from: "Lagos", to: "Shenzhen", cargo: "Sesame", transit: "31 days" },
  { from: "Dar es Salaam", to: "Ho Chi Minh", cargo: "Cashew", transit: "22 days" },
  { from: "Tema", to: "New Jersey", cargo: "Shea", transit: "16 days" },
];

export const tradeStats = [
  { value: 42, suffix: "", label: "Active trade corridors" },
  { value: 14, suffix: "", label: "Origin & destination markets" },
  { value: 99.2, suffix: "%", label: "On-spec delivery rate" },
  { value: 100, suffix: "%", label: "Farm-gate traceability" },
];

export const shipments = [
  { id: "DZT-4821", cargo: "Cocoa · 250MT", route: "Accra → Rotterdam", eta: "Aug 02", status: "In transit" },
  { id: "DZT-4819", cargo: "Coffee · 40MT", route: "Addis → Hamburg", eta: "Aug 11", status: "In transit" },
  { id: "DZT-4816", cargo: "Cashew · 120MT", route: "Dar → Ho Chi Minh", eta: "Jul 30", status: "Customs" },
  { id: "DZT-4812", cargo: "Shea · 60MT", route: "Tema → New Jersey", eta: "Jul 26", status: "Arriving" },
  { id: "DZT-4808", cargo: "Sesame · 180MT", route: "Lagos → Shenzhen", eta: "Delivered", status: "Complete" },
] as const;
