import type { InflectionPointSlug } from "./inflectionPoints";

export type InflectionPointDetailSlug = InflectionPointSlug;

export interface InflectionPointDetailParagraph {
  type: "paragraph";
  text: string;
  emphasis?: "lead";
}

export interface InflectionPointDetailList {
  type: "list";
  heading?: string;
  intro?: string;
  items: readonly string[];
  outro?: string;
}

export interface InflectionPointDetailServiceItem {
  title: string;
  description: string;
}

export interface InflectionPointDetailServices {
  type: "services";
  heading: string;
  items: readonly InflectionPointDetailServiceItem[];
}

export interface InflectionPointDetailCallout {
  type: "callout";
  eyebrow?: string;
  text: string;
}

export type InflectionPointFinalSectionContent =
  | InflectionPointDetailParagraph
  | InflectionPointDetailList
  | InflectionPointDetailCallout;

export interface InflectionPointDetailFinalSection {
  type: "final-section";
  heading: string;
  content: readonly InflectionPointFinalSectionContent[];
}

export type InflectionPointDetailBlock =
  | InflectionPointDetailParagraph
  | InflectionPointDetailList
  | InflectionPointDetailServices
  | InflectionPointDetailCallout
  | InflectionPointDetailFinalSection;

export interface InflectionPointDetail {
  slug: InflectionPointDetailSlug;
  headline: string;
  subtitle?: string;
  blocks: readonly InflectionPointDetailBlock[];
}

export const inflectionPointDetails = {
  "growth-has-stalled": {
    slug: "growth-has-stalled",
    headline: "Revenue Growth Strategy for Companies Experiencing Stalled Growth",
    blocks: [
      {
        type: "paragraph",
        text: "Has your company’s growth plateaued?",
        emphasis: "lead",
      },
      {
        type: "paragraph",
        text: "Many businesses reach a point where the strategies that fueled their initial success no longer produce the same results. Revenue levels off, customer acquisition slows, and leadership teams struggle to identify the next path forward.",
      },
      {
        type: "paragraph",
        text: "Wyckoff Consulting helps companies from $3 million to $50 million+ in revenue break through growth plateaus by providing executive-level marketing leadership through a Fractional Chief Marketing Officer (CMO) model.",
      },
      {
        type: "paragraph",
        text: "We begin by identifying the root causes of stalled growth, including market positioning challenges, ineffective messaging, lead generation issues, sales and marketing misalignment, or changing customer behavior. From there, we develop and execute a strategic growth plan focused on increasing revenue, improving profitability, and creating sustainable demand.",
      },
      {
        type: "paragraph",
        text: "Whether your organization has hit a ceiling or simply needs a fresh perspective, Wyckoff Consulting provides the strategic leadership necessary to reignite growth and build momentum.",
      },
      {
        type: "list",
        heading: "Common Signs You Need a Growth Strategy",
        items: [
          "Revenue has flattened over the last 12 to 24 months",
          "Lead generation has become inconsistent",
          "Marketing activities lack measurable ROI",
          "Competitors are gaining market share",
          "Sales teams are struggling to reach goals",
          "Leadership lacks confidence in current marketing efforts",
        ],
      },
      {
        type: "list",
        heading: "How Wyckoff Consulting Helps",
        items: [
          "Revenue growth planning",
          "Market analysis and competitive positioning",
          "Customer acquisition strategies",
          "Sales and marketing alignment",
          "Demand generation programs",
          "Marketing performance measurement",
        ],
      },
      {
        type: "callout",
        text: "If your business has stopped growing, it may be time for a new strategy—not more tactics.",
      },
    ],
  },
  "marketing-leadership-gap": {
    slug: "marketing-leadership-gap",
    headline: "Fractional CMO Services for Companies Facing a Marketing Leadership Gap",
    blocks: [
      {
        type: "paragraph",
        text: "Has your marketing leader left the organization?",
        emphasis: "lead",
      },
      {
        type: "paragraph",
        text: "Whether your Chief Marketing Officer, Marketing Director, or senior marketing leader has resigned, retired, or been terminated, the business cannot afford to lose momentum while searching for a replacement.",
      },
      {
        type: "paragraph",
        text: "Wyckoff Consulting provides experienced Fractional CMO leadership to bridge the gap between marketing executives. We step in quickly to stabilize operations, lead internal teams, manage vendors, maintain strategic initiatives, and provide executive-level guidance during the transition.",
      },
      {
        type: "paragraph",
        text: "This allows business owners and CEOs to continue focusing on operations and growth while ensuring marketing remains aligned with organizational goals.",
      },
      {
        type: "list",
        heading: "Ideal Situations for Fractional CMO Support",
        items: [
          "Marketing executive departure",
          "Unexpected leadership vacancy",
          "Company restructuring",
          "Executive search in progress",
          "Rapid growth requiring interim leadership",
        ],
      },
      {
        type: "list",
        heading: "Benefits of an Interim Fractional CMO",
        items: [
          "Immediate executive-level expertise",
          "No long-term employment commitment",
          "Strategic continuity",
          "Team leadership and accountability",
          "Objective outside perspective",
        ],
      },
      {
        type: "callout",
        text: "When your marketing leadership changes, your growth strategy should not.",
      },
    ],
  },
  "entering-a-new-market": {
    slug: "entering-a-new-market",
    headline: "Go-To-Market Strategy for Companies Entering New Markets",
    blocks: [
      {
        type: "paragraph",
        text: "Expanding into a new market presents significant opportunity—and significant risk.",
        emphasis: "lead",
      },
      {
        type: "paragraph",
        text: "Whether your organization is launching a new service, targeting a new customer segment, expanding geographically, or entering a new industry vertical, success requires more than marketing tactics. It requires a strategic go-to-market plan.",
      },
      {
        type: "paragraph",
        text: "Wyckoff Consulting helps organizations develop and execute market entry strategies that reduce risk and accelerate growth.",
      },
      {
        type: "paragraph",
        text: "Our team evaluates market opportunities, competitive landscapes, customer needs, positioning strategies, messaging frameworks, and sales enablement requirements to ensure your expansion efforts are successful.",
      },
      {
        type: "list",
        heading: "Common Market Expansion Challenges",
        items: [
          "Unclear customer demand",
          "Lack of market intelligence",
          "Weak differentiation",
          "Inconsistent messaging",
          "Misaligned sales and marketing efforts",
        ],
      },
      {
        type: "list",
        heading: "Our Market Entry Services Include",
        items: [
          "Market research",
          "Customer segmentation",
          "Competitive analysis",
          "Positioning strategy",
          "Go-to-market planning",
          "Sales enablement",
        ],
      },
      {
        type: "callout",
        text: "Entering a new market should be a calculated growth strategy—not a guessing game.",
      },
    ],
  },
  "no-marketing-function": {
    slug: "no-marketing-function",
    headline: "Fractional CMO Services for Companies Without a Marketing Department",
    blocks: [
      {
        type: "paragraph",
        text: "Many successful companies reach $3 million, $10 million, or even $20 million in revenue without ever hiring a dedicated marketing leader.",
        emphasis: "lead",
      },
      {
        type: "paragraph",
        text: "Growth often comes from founder relationships, referrals, networking, or sales-driven efforts. Eventually, however, organizations need a scalable marketing engine to support continued growth.",
      },
      {
        type: "paragraph",
        text: "Wyckoff Consulting helps businesses establish their first formal marketing function.",
      },
      {
        type: "paragraph",
        text: "We provide executive leadership, strategic planning, marketing systems, performance measurement, and operational structure that create long-term scalability.",
      },
      {
        type: "list",
        heading: "We Help Companies Build",
        items: [
          "Marketing strategy",
          "Brand positioning",
          "Lead generation systems",
          "Marketing technology stacks",
          "Performance dashboards",
          "Internal marketing teams",
        ],
      },
      {
        type: "list",
        heading: "Who This Is For",
        items: [
          "Founder-led companies",
          "Family-owned businesses",
          "Growing organizations without a marketing leader",
          "Businesses preparing for expansion",
        ],
      },
      {
        type: "callout",
        text: "Building a marketing department is one of the most important investments a growing company can make. We help ensure it is built correctly from the start.",
      },
    ],
  },
  "rebranding-or-repositioning": {
    slug: "rebranding-or-repositioning",
    headline: "Corporate Rebranding and Market Positioning Services",
    blocks: [
      {
        type: "paragraph",
        text: "Your brand should reflect who your company is today—not who it was ten years ago.",
        emphasis: "lead",
      },
      {
        type: "paragraph",
        text: "As organizations grow, acquire companies, launch new services, or evolve their business models, their brand often falls behind.",
      },
      {
        type: "paragraph",
        text: "Wyckoff Consulting helps companies modernize their market positioning, messaging, and brand strategy to better align with current business objectives and future growth goals.",
      },
      {
        type: "paragraph",
        text: "Our approach goes beyond logos and colors. We focus on creating a strategic market position that strengthens customer perception, supports sales efforts, and drives business growth.",
      },
      {
        type: "list",
        heading: "Reasons Companies Rebrand",
        items: [
          "Growth and expansion",
          "New leadership",
          "Mergers and acquisitions",
          "Outdated brand image",
          "New product offerings",
          "Competitive pressures",
        ],
      },
      {
        type: "list",
        heading: "Our Rebranding Services Include",
        items: [
          "Brand strategy",
          "Positioning development",
          "Messaging architecture",
          "Customer perception analysis",
          "Visual identity guidance",
          "Internal brand adoption",
        ],
      },
      {
        type: "callout",
        text: "A successful rebrand creates clarity, confidence, and competitive advantage.",
      },
    ],
  },
  "preparing-for-sale": {
    slug: "preparing-for-sale",
    headline: "Marketing Strategy for Business Owners Preparing to Sell Their Company",
    blocks: [
      {
        type: "paragraph",
        text: "A company’s value is not determined solely by financial performance.",
        emphasis: "lead",
      },
      {
        type: "paragraph",
        text: "Buyers evaluate market position, customer relationships, growth potential, brand strength, and the predictability of future revenue.",
      },
      {
        type: "paragraph",
        text: "Wyckoff Consulting helps business owners prepare their companies for sale by strengthening the marketing and growth systems that drive valuation.",
      },
      {
        type: "paragraph",
        text: "We work with owners 12 to 36 months before a planned exit to improve market perception, reduce founder dependency, document growth processes, and create a compelling growth story for potential buyers.",
      },
      {
        type: "list",
        heading: "How Marketing Impacts Company Valuation",
        items: [
          "Brand equity",
          "Customer acquisition systems",
          "Revenue predictability",
          "Market differentiation",
          "Customer retention",
          "Growth opportunities",
        ],
      },
      {
        type: "list",
        heading: "Exit Readiness Services",
        items: [
          "Strategic positioning",
          "Growth planning",
          "Brand strengthening",
          "Marketing infrastructure development",
          "Customer experience optimization",
          "Investor and buyer presentation support",
        ],
      },
      {
        type: "callout",
        text: "The best time to prepare your business for sale is long before it goes to market.",
      },
    ],
  },
  "merger-or-acquisition": {
    slug: "merger-or-acquisition",
    headline: "Marketing Leadership for Mergers and Acquisitions",
    blocks: [
      {
        type: "paragraph",
        text: "Mergers and acquisitions create opportunities for growth, but they also create uncertainty.",
        emphasis: "lead",
      },
      {
        type: "paragraph",
        text: "Customers, employees, vendors, and stakeholders often have questions about the future direction of the organization. Without a clear communication and branding strategy, confusion can slow momentum and reduce value.",
      },
      {
        type: "paragraph",
        text: "Wyckoff Consulting helps organizations navigate marketing, branding, and communication challenges during mergers, acquisitions, and business integrations.",
      },
      {
        type: "paragraph",
        text: "We provide executive-level guidance to align brands, messaging, customer communications, and go-to-market strategies across newly combined organizations.",
      },
      {
        type: "list",
        heading: "Common M&A Marketing Challenges",
        items: [
          "Multiple brands and identities",
          "Conflicting market positions",
          "Customer confusion",
          "Internal communication gaps",
          "Sales team alignment issues",
        ],
      },
      {
        type: "list",
        heading: "How We Help",
        items: [
          "Brand integration strategy",
          "Customer communication planning",
          "Market positioning",
          "Internal communication support",
          "Sales and marketing alignment",
          "Post-acquisition growth planning",
        ],
      },
      {
        type: "callout",
        text: "Successful integrations require more than operational alignment—they require market alignment.",
      },
    ],
  },
  "private-equity-venture-backed-companies": {
    slug: "private-equity-venture-backed-companies",
    headline: "Fractional CMO Services for Private Equity and Venture-Backed Portfolio Companies",
    subtitle: "Accelerating Growth, Increasing Enterprise Value, and Preparing Portfolio Companies for Successful Exits",
    blocks: [
      {
        type: "paragraph",
        text: "Private equity firms and venture capital investors don’t invest in marketing.",
        emphasis: "lead",
      },
      {
        type: "callout",
        text: "They invest in growth.",
      },
      {
        type: "paragraph",
        text: "When a portfolio company isn’t reaching its revenue potential, lacks experienced marketing leadership, or needs to accelerate growth before the next funding round or exit, bringing in an experienced executive can create immediate impact.",
      },
      {
        type: "paragraph",
        text: "Wyckoff Consulting partners with private equity firms, venture capital firms, family offices, independent sponsors, and their portfolio companies by providing executive-level Fractional Chief Marketing Officer (CMO) leadership focused on increasing enterprise value.",
      },
      {
        type: "paragraph",
        text: "Rather than hiring a full-time executive for every portfolio company, investment firms gain access to proven strategic marketing leadership that can quickly assess the business, identify growth opportunities, align sales and marketing, and implement scalable revenue systems.",
      },
      {
        type: "callout",
        eyebrow: "Our objective is simple:",
        text: "Increase company value while reducing execution risk.",
      },
      {
        type: "list",
        heading: "How Wyckoff Consulting Supports Portfolio Companies",
        intro: "Every portfolio company is different, but the challenges are often remarkably similar.",
        items: [
          "Growth has stalled following an acquisition.",
          "Sales and marketing operate independently.",
          "The company lacks executive marketing leadership.",
          "Customer acquisition costs continue to rise.",
          "The organization is preparing for a recapitalization or exit.",
          "Leadership needs an objective outside perspective.",
          "Multiple portfolio companies require strategic oversight without adding permanent executive headcount.",
        ],
        outro: "Wyckoff Consulting becomes an extension of both the investment firm and the portfolio company’s leadership team, providing strategic direction while helping management execute with confidence.",
      },
      {
        type: "services",
        heading: "Strategic Services for Investors and Portfolio Companies",
        items: [
          {
            title: "Executive Marketing Leadership",
            description: "Provide experienced Fractional CMO leadership without the cost or commitment of a full-time executive.",
          },
          {
            title: "Growth Strategy Development",
            description: "Identify the highest-impact opportunities to accelerate revenue, improve profitability, and strengthen competitive positioning.",
          },
          {
            title: "Due Diligence Support",
            description: "Evaluate a company’s marketing capabilities, competitive position, customer acquisition systems, brand strength, and growth potential before or after acquisition.",
          },
          {
            title: "100-Day Growth Planning",
            description: "Develop and execute strategic initiatives that establish momentum immediately following an acquisition or investment.",
          },
          {
            title: "Sales and Marketing Alignment",
            description: "Create measurable systems that improve lead quality, increase conversion rates, and support scalable growth.",
          },
          {
            title: "Brand and Market Positioning",
            description: "Clarify market differentiation, strengthen messaging, and improve customer perception to support long-term value creation.",
          },
          {
            title: "Exit Preparation",
            description: "Prepare portfolio companies for recapitalization, acquisition, or sale by strengthening marketing infrastructure, documenting growth systems, and building a compelling investment story.",
          },
        ],
      },
      {
        type: "final-section",
        heading: "Why Private Equity Firms Choose Wyckoff Consulting",
        content: [
          {
            type: "paragraph",
            text: "Investment firms need experienced operators—not agencies.",
            emphasis: "lead",
          },
          {
            type: "paragraph",
            text: "Wyckoff Consulting provides executive-level leadership built on decades of experience helping organizations navigate periods of rapid growth, organizational change, market expansion, and strategic transformation.",
          },
          {
            type: "paragraph",
            text: "Because every engagement is customized, investors gain the flexibility to deploy executive marketing leadership exactly where it creates the greatest return—whether that’s one portfolio company or an entire portfolio.",
          },
          {
            type: "paragraph",
            text: "Our role is to help management teams make better strategic decisions, execute with greater confidence, and create measurable improvements that increase enterprise value.",
          },
        ],
      },
      {
        type: "final-section",
        heading: "Ideal Clients",
        content: [
          {
            type: "list",
            intro: "Wyckoff Consulting works with:",
            items: [
              "Private Equity Firms",
              "Venture Capital Firms",
              "Family Offices",
              "Independent Sponsors",
              "Search Funds",
              "Holding Companies",
              "Portfolio Companies generating $3 million to $50 million+ in annual revenue",
            ],
          },
        ],
      },
      {
        type: "final-section",
        heading: "Common Engagement Scenarios",
        content: [
          {
            type: "list",
            intro: "Organizations typically engage Wyckoff Consulting when:",
            items: [
              "A newly acquired company needs strategic marketing leadership.",
              "Revenue growth has slowed across a portfolio company.",
              "An investment firm wants an independent assessment of marketing performance.",
              "A portfolio company is preparing for its next funding round.",
              "Leadership is preparing for an acquisition, recapitalization, or exit.",
              "Multiple portfolio companies require executive marketing expertise without adding permanent overhead.",
            ],
          },
        ],
      },
      {
        type: "final-section",
        heading: "Build Stronger Companies. Create Greater Enterprise Value.",
        content: [
          {
            type: "paragraph",
            text: "Successful investments require more than operational improvements—they require sustainable revenue growth, differentiated market positioning, and executive leadership capable of transforming strategy into measurable results.",
          },
          {
            type: "paragraph",
            text: "Wyckoff Consulting helps investment firms and portfolio company leadership teams build stronger businesses, accelerate growth, and maximize long-term enterprise value.",
          },
        ],
      },
    ],
  },
} satisfies Record<InflectionPointDetailSlug, InflectionPointDetail>;
