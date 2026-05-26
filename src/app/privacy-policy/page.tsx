"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Shield, ArrowLeft, ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Section {
  id: string;
  title: string;
  subsections: { subtitle: string; content: string[] }[];
}

// ─── Content ──────────────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    subsections: [
      {
        subtitle: "1.1 Personal Information",
        content: [
          "Name and contact details (phone, email, ID proofs)",
          "Financially-related data",
          "Device / transactional data",
          "Communication records",
        ],
      },
    ],
  },
  {
    id: "purpose-of-data",
    title: "2. Purpose of Data Collection",
    subsections: [
      {
        subtitle: "Data is collected for:",
        content: [
          "Service delivery and processing",
          "Credit analysis and facilitation support",
          "Improving our platform",
          "Compliance with legal requirements",
        ],
      },
    ],
  },
  {
    id: "data-sharing",
    title: "3. Data Sharing",
    subsections: [
      {
        subtitle: "We share data with:",
        content: [
          "Lending partners (for service only)",
          "Financial institutions (when required)",
          "Technology service providers",
          "Government or regulatory authorities (if legally required)",
          "We do NOT sell data to unauthorised third parties",
        ],
      },
    ],
  },
  {
    id: "data-security",
    title: "4. Data Security",
    subsections: [
      {
        subtitle: "We implement industry security measures including:",
        content: [
          "Encryption systems",
          "Secure servers",
          "Access control procedures",
          "Authentication protocols",
          "However, absolute security cannot be guaranteed in digital environments",
        ],
      },
    ],
  },
  {
    id: "user-rights",
    title: "5. User Rights",
    subsections: [
      {
        subtitle: "You may:",
        content: [
          "Access your data",
          "Request correction of inaccurate data",
          "Request deletion (subject to legal obligations)",
          "Withdraw consent where applicable",
        ],
      },
    ],
  },
  {
    id: "data-protection",
    title: "6. Data Protection Policy",
    subsections: [
      {
        subtitle: "6.1 Data Storage",
        content: ["Data is stored in secure environments with restricted access."],
      },
      {
        subtitle: "6.2 Retention Policy",
        content: [
          "Data is retained only as long as necessary for:",
          "Service fulfilment",
          "Legal compliance",
          "Dispute resolution",
        ],
      },
      {
        subtitle: "6.3 Cross-Border Data",
        content: [
          "If data is processed or stored outside India, it will be handled under equivalent security safeguards.",
        ],
      },
      {
        subtitle: "6.4 Breach Handling",
        content: [
          "In case of data breach:",
          "Authorities will be immediately notified",
          "Affected users may be notified if legally required",
          "Corrective measures are implemented immediately",
        ],
      },
    ],
  },
  {
    id: "contact",
    title: "7. Contact Information",
    subsections: [
      {
        subtitle: "Crediple India Private Limited",
        content: [
          "Lakhs Knowledge City, Hi-Tec City, Hyderabad 500 081, Telangana, India",
          "www.crediple.com",
        ],
      },
    ],
  },
];

// ─── Animated Section ─────────────────────────────────────────────────────────
function PolicySection({ section, index }: { section: Section; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-6 sm:p-8 mb-5"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      }}
    >
      {/* accent bar */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
        style={{ background: "var(--timeline-inner-dot)" }}
      />
      <h2
        className="text-base sm:text-lg font-bold mb-4 pl-4"
        style={{ color: "var(--accent-color)" }}
      >
        {section.title}
      </h2>
      <div className="pl-4 space-y-5">
        {section.subsections.map((sub, si) => (
          <div key={si}>
            <h3
              className="text-sm font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {sub.subtitle}
            </h3>
            <ul className="space-y-1.5">
              {sub.content.map((line, li) => (
                <li key={li} className="flex items-start gap-2">
                  <ChevronRight
                    className="mt-0.5 shrink-0 w-3.5 h-3.5"
                    style={{ color: "var(--accent-color)", opacity: 0.7 }}
                  />
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const update = () =>
      setIsDark(!document.documentElement.classList.contains("light"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{
          scaleX,
          backgroundImage: "var(--timeline-inner-dot)",
          background: "linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6)",
        }}
      />

      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Hero Header */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(160deg, #050e1e 0%, #020617 100%)"
              : "linear-gradient(160deg, #dde9ff 0%, #eef4ff 100%)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {/* decorative orb */}
          <div
            aria-hidden
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              backgroundImage: isDark
                ? "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(29,78,216,0.1) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-80 transition-opacity"
                style={{ color: "var(--accent-color)" }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4"
            >
              <div
                className="mt-1 p-3 rounded-xl shrink-0"
                style={{
                  backgroundColor: "var(--icon-accent-bg)",
                  border: "1px solid var(--icon-accent-border)",
                }}
              >
                <Shield className="w-6 h-6" style={{ color: "var(--accent-color)" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: "var(--accent-color)" }}
                >
                  Legal
                </p>
                <h1
                  className="text-2xl sm:text-4xl font-bold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Privacy Policy
                </h1>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Last updated: May 2026 &nbsp;·&nbsp; Crediple India Private Limited
                </p>
              </div>
            </motion.div>

            {/* nav links to other legal pages */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {[
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="px-4 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    backgroundColor: "var(--card-bg)",
                  }}
                >
                  {p.label}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* intro */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm leading-relaxed mb-8 p-5 rounded-xl"
            style={{
              color: "var(--text-secondary)",
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border)",
            }}
          >
            This Privacy Policy describes how Crediple India Private Limited collects, uses, and
            protects your personal information when you use our platform, services, or technology
            solutions. By accessing or using our services, you consent to the practices described
            in this policy.
          </motion.p>

          {SECTIONS.map((section, i) => (
            <PolicySection key={section.id} section={section} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}