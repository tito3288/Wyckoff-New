export interface InflectionPoint {
  num: string;
  slug: string;
  title: string;
  challenge: string;
  needed: string;
}

export const inflectionPoints = [
  {
    num: "01",
    slug: "growth-has-stalled",
    title: "Growth Has Stalled",
    challenge: "Revenue has plateaued. The pipeline is inconsistent. Growth has lost momentum.",
    needed: "A strategic reset, measurable KPIs, and a revenue-focused growth plan.",
  },
  {
    num: "02",
    slug: "marketing-leadership-gap",
    title: "Marketing Leadership Gap",
    challenge: "Your marketing leader is gone, and the team lacks senior direction.",
    needed: "Immediate Fractional CMO leadership, stability, and a clear path forward.",
  },
  {
    num: "03",
    slug: "entering-a-new-market",
    title: "Entering a New Market",
    challenge: "You’re expanding into a new industry, geography, service, or customer segment.",
    needed: "Sharp positioning, the right message, and a proven go-to-market strategy.",
  },
  {
    num: "04",
    slug: "no-marketing-function",
    title: "No Marketing Function",
    challenge: "Growth has been driven by sales, relationships, and the founder—not a marketing system.",
    needed: "A scalable marketing foundation aligned with sales and revenue.",
  },
  {
    num: "05",
    slug: "rebranding-or-repositioning",
    title: "Rebranding or Repositioning",
    challenge: "Your company has evolved, but your brand has not.",
    needed: "Stronger positioning, clearer messaging, and meaningful differentiation.",
  },
  {
    num: "06",
    slug: "preparing-for-sale",
    title: "Preparing for Sale",
    challenge: "You want to maximize valuation and reduce dependence on the owner.",
    needed: "Predictable revenue, a compelling growth story, and stronger enterprise value.",
  },
  {
    num: "07",
    slug: "merger-or-acquisition",
    title: "Merger or Acquisition",
    challenge: "Brands, teams, customers, and strategies must come together quickly.",
    needed: "Unified messaging, aligned go-to-market strategy, and confident communication.",
  },
  {
    num: "08",
    slug: "private-equity-venture-backed-companies",
    title: "Private Equity & Venture-Backed Companies",
    challenge: "Your portfolio company needs experienced leadership to accelerate growth and increase enterprise value.",
    needed: "Executive Fractional CMO leadership, strategic alignment, and a proven value creation plan.",
  },
] satisfies readonly InflectionPoint[];
