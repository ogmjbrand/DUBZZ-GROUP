/**
 * Group identity.
 *
 * Source of truth is the 2026 Dubzz Group Corporate Profile. Nothing in this
 * file may be invented: the Group is early-stage, and placeholder metrics or
 * credentials presented as fact are a liability rather than a design detail.
 * If a number or claim is not in the profile, it does not belong here.
 */

export const site = {
  name: "Dubzz Group",
  title: "Dubzz Group — Building Brands. Creating Experiences. Inspiring Culture.",
  description:
    "Dubzz Group is a diversified creative, lifestyle, and business holding company headquartered in Abuja, Nigeria — operating across media, fashion, hospitality, entertainment, and international trade.",
  url: "https://dubzzgroup.com",
  tagline: "Building Brands. Creating Experiences. Inspiring Culture.",
};

/** Head office, per the profile's Contact page. */
export const contact = {
  company: "Dubzz Group",
  office: "Head Office",
  city: "Abuja",
  region: "Federal Capital Territory",
  country: "Nigeria",
  // Marked "to be activated" in the profile — kept because it is the address
  // the Group publishes, but treat delivery as unverified.
  email: "hello@dubzzgroup.com",
  enquiries: [
    "Partnerships",
    "Corporate Collaborations",
    "Investment Opportunities",
    "Media Relations",
    "Strategic Alliances",
  ],
};

export const founder = {
  name: "Prince Chidubem Nwahiri",
  role: "Founder & Group Chief Executive Officer",
  quote:
    "Legacy is not measured by what we own, but by the opportunities we create and the lives we inspire.",
};

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/media" },
  { label: "Journal", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns = [
  {
    heading: "Divisions",
    links: [
      { label: "Dubzz Media", href: "/media" },
      { label: "Dubzz Wear", href: "/wear" },
      { label: "Dubzz Wines Resort", href: "/wine-resort" },
      { label: "Dubzz Trade", href: "/trade" },
      { label: "After Dark", href: "/after-dark" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Journal", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Investor Relations", href: "/group/investors" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Experiences",
    links: [
      { label: "The Collection", href: "/wear" },
      { label: "Book a Stay", href: "/wine-resort/booking/sanctuary" },
      { label: "Start a Project", href: "/media/booking" },
      { label: "Trade Inquiry", href: "/trade/inquiry" },
      { label: "Search", href: "/search" },
    ],
  },
];

/** Only the two channels the profile publishes. */
export const socials = [
  { label: "Instagram", href: "https://instagram.com/dubzzgroup", handle: "@dubzzgroup" },
  { label: "LinkedIn", href: "https://linkedin.com", handle: "Dubzz Group" },
];

/**
 * Key Milestones, verbatim in substance from the profile.
 *
 * These replace the invented "14 markets / 120+ specialists / 98% retention"
 * counters. The Group states it is "in the early stages of its journey", so
 * what it has to show is foundations laid — not performance metrics. Stated
 * plainly, that reads as confidence; fabricated numbers read as a bluff the
 * first time anyone asks.
 */
export const milestones = [
  {
    area: "Corporate Development",
    items: [
      "Established the vision and strategic direction of Dubzz Group.",
      "Developed a diversified holding company structure.",
      "Created the Group's long-term business ecosystem.",
    ],
  },
  {
    area: "Creative Services",
    items: [
      "Established Dubzz Media as the Group's flagship creative business.",
      "Delivered creative solutions for businesses and international clients.",
      "Continued building expertise across media production, editing, branding, and digital content.",
    ],
  },
  {
    area: "Brand Development",
    items: [
      "Developed the Dubzz Wear concept and brand identity.",
      "Established the vision for Dubzz Wines Resort.",
      "Created the After Dark entertainment platform.",
      "Developed Dubzz Trade as the Group's international commerce division.",
    ],
  },
  {
    area: "Strategic Growth",
    items: [
      "Built relationships with partners across the creative, hospitality, and event industries.",
      "Continued expanding the Group's long-term business strategy.",
    ],
  },
];

/** The five strategic pillars from the profile's Growth Strategy. */
export const growthPillars = [
  {
    title: "Strengthen Our Portfolio",
    body: "Invest in every business within the Group so each has the operational capacity, leadership, and market positioning to grow sustainably.",
  },
  {
    title: "Expand Through Strategic Partnerships",
    body: "Partner with organizations that share our values to accelerate innovation, broaden market access, and create mutual value.",
  },
  {
    title: "Invest in Creativity & Innovation",
    body: "Embrace technology, creative thinking, and digital transformation to improve customer experiences and strengthen our businesses.",
  },
  {
    title: "Develop Exceptional Brands",
    body: "Build every company with a clear identity, consistent quality standards, and a long-term commitment to customer trust.",
  },
  {
    title: "Build an Enduring Institution",
    body: "Lead responsibly, grow sustainably, and leave a legacy that keeps creating opportunities for generations.",
  },
];

/** Core values, per the profile. */
export const coreValues = [
  { title: "Excellence", lede: "Excellence is our standard, not our ambition." },
  { title: "Innovation", lede: "Innovation drives our future." },
  { title: "Integrity", lede: "Integrity defines our character." },
  { title: "Leadership", lede: "Leadership begins with responsibility." },
  { title: "Community", lede: "Businesses succeed when communities thrive." },
  { title: "Boldness", lede: "Progress requires courage." },
];
