import { ArrowRight, Search, Sparkles } from "lucide-react";
import brand_icon_1 from "@/assets/brand_icon_1.png";
import brand_icon_2 from "@/assets/brand_icon_2.png";
import brand_icon_3 from "@/assets/brand_icon_3.png";
import brand_icon_4 from "@/assets/brand_icon_4.png";
import { BsBarChartFill } from "react-icons/bs";
import { GiBrain } from "react-icons/gi";
import { FaDatabase } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";

export const NAV_LINKS = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "About", href: "/about", hasDropdown: false },
  { label: "Solutions", href: "/solutions", hasDropdown: false },
  { label: "Brands", href: "/brands", hasDropdown: false },
];

export const HERO_CONTENT = {
  eyebrow:
    "Unified Digital Ecosystem",

  title:
    "One Holding.",

  highlight:
    "Multiple Innovations.",

  subtitle:
    "Crediple powers scalable brands across healthcare, finance, legal, and data intelligence.",

  subtitle2:
    "Built for growth. Designed for impact.",

  cta1: {
    label: "Explore Brands",
    href: "/brands",
  },

  cta2: {
    label: "About Us",
    href: "/about",
  },
};

export const ABOUT_HERO_CONTENT = {
  eyebrow:
    "Driven By Innovation",

  title:
    "Building Businesses Through",

  highlight:
    "Technology & Strategy.",

  subtitle:
    "Crediple creates scalable digital ecosystems for modern industries and future-ready growth.",

  subtitle2:
    "Innovation powered by integration.",

  cta1: {
    label: "Our Ecosystem",
    href: "/brands",
  },

  cta2: {
    label: "Learn More",
    href: "/about",
  },
};

export const BRANDS_HERO_CONTENT = {
  eyebrow:
    "Our Brand Ecosystem",

  title:
    "Specialized Brands.",

  highlight:
    "Unified Vision.",

  subtitle:
    "Each Crediple brand solves industry-specific challenges with scalable digital solutions.",

  subtitle2:
    "Built to lead modern industries.",

  cta1: {
    label: "View Brands",
    href: "/brands",
  },

  cta2: {
    label: "Contact Us",
    href: "/contact",
  },
};

export const SERVICES_HERO_CONTENT = {
  eyebrow:
    "Smart Digital Solutions",

  title:
    "Scalable Systems For",

  highlight:
    "Modern Businesses.",

  subtitle:
    "We build intelligent platforms, automation systems, and enterprise-ready digital infrastructure.",

  subtitle2:
    "Fast. Scalable. Future-ready.",

  cta1: {
    label: "Our Solutions",
    href: "/solutions",
  },

  cta2: {
    label: "Start Project",
    href: "/contact",
  },
};

export const CONTACT_HERO_CONTENT = {
  eyebrow:
    "Let’s Build Together",

  title:
    "Create The Future With",

  highlight:
    "Crediple.",

  subtitle:
    "Partner with us to build scalable digital solutions and high-impact business ecosystems.",

  subtitle2:
    "Innovation starts here.",

  cta1: {
    label: "Get In Touch",
    href: "/contact",
  },

  cta2: {
    label: "Explore Brands",
    href: "/brands",
  },
};


export const BRANDS = [
  {
    name: "My Doctor Capsule",
    description:
      "Healthcare ecosystem focused on digital patient acquisition, healthcare visibility, and modern clinical growth systems.",
    href: "https://www.mydoctorcapsule.com",
    icon: brand_icon_1,
  },
  {
    name: "Loan Konnekt",
    description:
      "Structured financial intelligence and lending ecosystem simplifying credit analysis and borrower journeys.",
    href: "https://www.loankonnekt.com",
    icon: brand_icon_2,
  },
  {
    name: "Lawvix",
    description:
      "LegalTech platform focused on structured legal workflows, documentation automation, and digital legal access.",
    href: "https://www.lawvix.com",
    icon: brand_icon_3,
  },
  {
    name: "Iitil",
    description:
      "Data intelligence ecosystem transforming fragmented business data into strategic decision-making systems.",
    href: "https://www.iitil.com",
    icon: brand_icon_4,
  },
];


export const STATS = [
  { value: "50+",   label: "Global Brands"  },
  { value: "10K+",  label: "Happy Clients"  },
  { value: "25+",   label: "Countries"      },
  { value: "100%",  label: "Satisfaction"   },
];

export const TIMELINE = [
  {
    period:  "2018-2019",
    tag:     "STARTED IN",
    title:   "Foundation of Crediple",
    tagColor: "#f59e0b",
  },
  {
    period:  "2020-2022",
    tag:     "SUCCESSFULLY DONE",
    title:   "Healthcare service and Finances and digital Brands",
    tagColor: "#f59e0b",
  },
  {
    period:  "2022-2024",
    tag:     "FUTURE READY TECHNOLOGIES",
    title:   "Focused on Future ready solution",
    tagColor: "#f59e0b",
  },
  {
    period:  "2025-2026",
    tag:     "PRESENT",
    title:   "Service across India",
    tagColor: "#f59e0b",
  },
];

export const ABOUT_MISSION = {
  title: "MISSION",
  text: "To engineer the digital infrastructure of tomorrow. Crediple exists to bridge the gap between complex industry challenges and streamlined technological solutions. By nurturing a powerhouse portfolio of fintech, healthtech and legal platforms, we dismantle barriers to efficiency and empower professionals to operate at their absolute peak.",
};

export const ABOUT_VISION = {
  title: "VISION",
  text: "To become the definitive global benchmark for multi sector digital transformation. Our vision is a future where the Crediple ecosystem is the invisible engine driving professional success across every major industry, turning high level complexity into accessible, high performance growth.",
};

export const CORE_VALUES = [
  {
    icon: "award",
    title: "Architectural Excellence",
    desc: "We don't just build businesses; we build ecosystems. Every solution under the Crediple umbrella must be scalable, secure and sophisticated.",
  },
  {
    icon: "shield",
    title: "Uncompromising Integrity",
    desc: "In health, finance, law, data and technology, trust is our primary currency. We lead with transparency and professional rigor in every transaction.",
  },
  {
    icon: "zap",
    title: "Strategic Synergy",
    desc: "We believe the whole is greater than the sum of its parts. We leverage cross industry insights to create a unique competitive advantage for our partners.",
  },
  {
    icon: "star",
    title: "Relentless Innovation",
    desc: "We reject the status quo. We are committed to constant iteration, ensuring our SaaS platforms remain the gold standard in a rapidly shifting global economy.",
  },
];

export const WHO_WE_SERVE = [
  {
    title: "Healthcare Professionals",
    heading: "Digitising clinical workflows",
    desc: "From independent practitioners to multi-specialty hospitals, we deliver HIPAA-aligned platforms that streamline patient management, billing, and compliance.",
    icon: "heart-pulse",
  },
  {
    title: "Finance & Fintech",
    heading: "Powering next-gen financial ops",
    desc: "Banks, NBFCs, and fintech startups rely on our infrastructure to automate reconciliation, reporting, and regulatory compliance at scale.",
    icon: "bar-chart-2",
  },
  {
    title: "Legal Practices",
    heading: "Technology meets jurisprudence",
    desc: "Law firms and solo advocates use our tools to manage case files, automate documentation, and serve clients faster with end-to-end legal tech.",
    icon: "scale",
  },
  {
    title: "Tech Startups",
    heading: "Launch faster, scale smarter",
    desc: "Early-stage and growth-stage teams plug into our ecosystem to access shared infrastructure, reducing time-to-market without sacrificing quality.",
    icon: "rocket",
  },
  {
    title: "Education Institutions",
    heading: "Reinventing learning systems",
    desc: "From edtech platforms to traditional institutions, we build adaptive learning systems and administrative tools that handle thousands of users seamlessly.",
    icon: "graduation-cap",
  },
  {
    title: "Enterprise & Corporates",
    heading: "Enterprise-grade digital backbone",
    desc: "Large organisations trust Crediple to modernise legacy systems, integrate cross-functional data pipelines, and maintain operational continuity.",
    icon: "building-2",
  },
];


export const TESTIMONIALS = [
  {
    name: "Rajiv Sharma",
    role: "CEO, MediTech Solutions",
    company: "Healthcare",
    text: "Crediple transformed our entire clinical workflow. What used to take days now takes hours. Their infrastructure is rock solid and the support team genuinely understands enterprise healthcare needs.",
    avatar: "RS",
    accent: "#22d3ee",
  },
  {
    name: "Priya Nair",
    role: "CFO, FinVault India",
    company: "Finance",
    text: "We integrated Crediple's fintech platform across 3 cities in under a month. The reconciliation automation alone saved us 40 hours a week. Truly a game changer for our operations.",
    avatar: "PN",
    accent: "#a78bfa",
  },
  {
    name: "Arjun Mehta",
    role: "Founder, LexCore",
    company: "Legal Tech",
    text: "Our firm was drowning in paperwork. Crediple built us a case management system that feels like it was made specifically for us. Client satisfaction has never been higher.",
    avatar: "AM",
    accent: "#34d399",
  },
  {
    name: "Sunita Reddy",
    role: "CTO, EduBridge",
    company: "Education",
    text: "Scaling our platform from 500 to 50,000 students was seamless with Crediple. The architecture they recommended was future proof from day one. Exceptional technical depth.",
    avatar: "SR",
    accent: "#f59e0b",
  },
  {
    name: "Vikram Joshi",
    role: "MD, NexaCorp",
    company: "Enterprise",
    text: "Legacy modernisation is painful — unless you have Crediple in your corner. They migrated 8 years of data without a single hour of downtime. Absolutely professional throughout.",
    avatar: "VJ",
    accent: "#f472b6",
  },
  {
    name: "Deepa Krishnan",
    role: "Head of Product, CloudNine",
    company: "Tech Startup",
    text: "As a startup we needed speed without sacrificing quality. Crediple gave us enterprise grade infrastructure at a scale that made sense for us. We launched 3 months ahead of schedule.",
    avatar: "DK",
    accent: "#22d3ee",
  },
];


export const BRANDS_PAGE_DATA = [
  {
    id: 1,
    name: "My Doctor Capsule",
    taglines: [
      "Transforming Healthcare Services",
      "Into a Digital First Patient Ecosystem",
    ],
    description: [
      "My Doctor Capsule is designed to transform how healthcare service providers connect with, engage and grow their patient base in a digitally driven world. It focuses on building a complete healthcare visibility and patient acquisition ecosystem for clinics, hospitals, and independent practitioners.",
      "In today's healthcare environment, trust, visibility, and accessibility are as important as treatment itself. My Doctor Capsule bridges this gap by enabling healthcare providers to establish a strong and credible digital identity.",
    ],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=85",
    whatWeBuild: [
      "End-to-end digital presence systems",
      "Structured patient acquisition funnels",
      "Healthcare branding",
      "Profile optimization",
      "Engagement systems",
    ],
    coreFocus:
      "We do not just market healthcare services — we build structured patient connection systems that improve discovery, trust, and conversion into care.",
  },
  {
    id: 2,
    name: "Loan Konnekt",
    taglines: [
      "Building Structured Intelligence for Credit &",
      "Lending Ecosystems",
    ],
    description: [
      "Loan Konnekt is a financial intelligence ecosystem focused on simplifying and structuring credit, lending and financial decision making processes. It is built to bridge the gap between borrowers, financial understanding, and lending systems through structured advisory and analytical frameworks.",
      "The financial world is complex, fragmented, and often inaccessible to the average individual or business. Loan Konnekt simplifies this through system-driven financial clarity and credit intelligence models.",
    ],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&q=85",
    whatWeBuild: [
      "Credit analysis frameworks",
      "Borrower profiling systems",
      "Lending ecosystem facilitation",
      "Financial intelligence dashboards",
      "Credit improvement pathways",
    ],
    coreFocus:
      "We transform financial complexity into structured clarity and actionable credit intelligence, enabling better decisions for individuals and institutions.",
  },
  {
    id: 3,
    name: "Lawvix",
    taglines: [
      "Digitizing Legal Access Through",
      "Structured Workflow Systems",
    ],
    description: [
      "Lawvix is a legalTech ecosystem focused on simplifying legal access, improving case management and enabling structured legal service delivery through digital transformation.",
      "Legal systems are often slow, fragmented and difficult to navigate. Lawvix is designed to bring structure, transparency, and accessibility into legal workflows using technology-enabled systems.",
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=85",
    whatWeBuild: [
      "Digital case management",
      "Client onboarding workflows",
      "Legal documentation automation",
      "Legal service access platforms",
      "Workflow optimization tools",
    ],
    coreFocus:
      "We enable a shift from traditional legal handling to structured, process-driven legal ecosystems that improve efficiency, clarity, and accessibility.",
  },
  {
    id: 4,
    name: "Iitil",
    taglines: [
      "Turning Data Into Strategic Business",
      "Intelligence",
    ],
    description: [
      "Iitil is a data intelligence-driven ecosystem focused on transforming raw, unstructured data into meaningful business insights that drive strategic decision-making across industries.",
      "In a modern business environment, data is everywhere—but intelligence is missing. Iitil bridges this gap by building structured analytical systems and decision intelligence frameworks.",
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85",
    whatWeBuild: [
      "Data aggregation systems",
      "Business analytics dashboards",
      "Cross-industry insights",
      "Predictive analytics models",
      "Decision support systems",
    ],
    coreFocus:
      "We convert fragmented data into structured intelligence that powers better business decisions, operational efficiency, and strategic growth.",
  },
];
 
export const UNIFIED_ADVANTAGE = [
  { label: "Scalability", icon: BsBarChartFill },
  { label: "Cross-industry intelligence", icon: GiBrain },
  { label: "Unified data systems", icon: FaDatabase },
  { label: "Faster innovation cycles", icon: FaClock },
];


export const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Brands", href: "/brands" },
  { label: "Solutions", href: "/solutions" },
  { label: "Contact", href: "/contact" },
];
 
export const FOOTER_BRANDS = [
  {
    label: "My Doctor Capsule",
    href: "https://www.mydoctorcapsule.com",
  },
  {
    label: "Loan Konnekt",
    href: "https://www.loankonnekt.com",
  },
  {
    label: "Lawvix",
    href: "https://www.lawvix.com",
  },
  {
    label: "Iitil",
    href: "https://www.iitil.com",
  },
];
 
export const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];
 
export const FOOTER_TAGLINE =
  "Building the future through innovation, excellence, and unified brand power. The Core That Connects Every Venture.";

export const FOOTER_COPYRIGHT =
  "© 2018 Crediple. All rights reserved.";