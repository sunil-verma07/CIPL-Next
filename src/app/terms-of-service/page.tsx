"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { FileText, ArrowLeft, ChevronRight } from "lucide-react";

interface Section {
  id: string;
  title: string;
  subsections: { subtitle: string; content: string[] }[];
}

const SECTIONS: Section[] = [
  {
    id: "nature-of-services",
    title: "1. Nature of Services",
    subsections: [
      {
        subtitle: "Crediple provides a structured ecosystem of services including:",
        content: [
          "Creditworthiness facilitation, credit analysis support, financial awareness services, and technology-driven solutions",
          "The company does not lend directly",
          "Does not act as a bank or NBFC",
          "Does not guarantee credit approval or score improvement",
          "Facilitates services through internal systems and authorised partners",
        ],
      },
    ],
  },
  {
    id: "user-eligibility",
    title: "2. User Eligibility",
    subsections: [
      {
        subtitle: "Users must be:",
        content: [
          "Legally competent to contract under Indian law",
          "Providing accurate and complete information",
          "Using services for lawful purposes only",
        ],
      },
    ],
  },
  {
    id: "user-responsibilities",
    title: "3. User Responsibilities",
    subsections: [
      {
        subtitle: "Users must agree:",
        content: [
          "Not to misuse the platform",
          "Not to submit false or misleading data",
          "Not to attempt unauthorised access or hacking",
          "Using services for lawful purposes only",
        ],
      },
    ],
  },
  {
    id: "service-modification",
    title: "4. Service Modification",
    subsections: [
      {
        subtitle: "",
        content: [
          "Crediple reserves the right to modify, suspend, or discontinue services at any time without prior notice.",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "5. Intellectual Property Rights",
    subsections: [
      {
        subtitle: "All content including:",
        content: [
          "Brand name 'Crediple'",
          "Logos, software, designs",
          "Processes, frameworks, and methodologies",
          "Proprietary credit scoring approaches",
          "Are the exclusive property of Crediple India Private Limited or its licensors. Unauthorised use is strictly prohibited.",
        ],
      },
    ],
  },
  {
    id: "channel-disclaimer",
    title: "6. Channel / Partner Disclaimer",
    subsections: [
      {
        subtitle: "",
        content: [
          "Channel partners and associates are independent entities unless explicitly stated.",
          "Their actions do not legally bind Crediple India.",
          "Misrepresentation by partners is not the responsibility of the company.",
          "Users must verify official communications only through authorised channels.",
        ],
      },
    ],
  },
  {
    id: "no-financial-institution",
    title: "7. No Financial Institution Status",
    subsections: [
      {
        subtitle: "Crediple India Private Limited is:",
        content: [
          "Not a bank",
          "Not an NBFC",
          "Not a credit bureau",
          "It only: provides information, drives loans, guarantee approvals, control lending decisions",
        ],
      },
    ],
  },
  {
    id: "disclaimer-warranties",
    title: "8. Disclaimer of Warranties",
    subsections: [
      {
        subtitle: "",
        content: [
          'All services are provided on an "as is" and "as available" basis without warranties of any kind.',
        ],
      },
    ],
  },
  {
    id: "indemnification",
    title: "9. Indemnification",
    subsections: [
      {
        subtitle: "Users agree to indemnify Crediple India against:",
        content: [
          "Misuse of services",
          "Violation of these terms",
          "Legal claims arising from own action",
        ],
      },
    ],
  },
  {
    id: "termination",
    title: "10. Termination of Access",
    subsections: [
      {
        subtitle: "Crediple India reserves the right to suspend or terminate access if:",
        content: [
          "Terms are violated",
          "Fraudulent activity is detected",
          "Legal compliance requires termination",
        ],
      },
    ],
  },
  {
    id: "force-majeure",
    title: "11. Force Majeure",
    subsections: [
      {
        subtitle: "The company is not responsible for delays or failures due to:",
        content: [
          "Natural disasters",
          "Government restrictions",
          "Technical failures",
          "Other events beyond control",
        ],
      },
    ],
  },
  {
    id: "governing-law",
    title: "12. Governing Law & Jurisdiction",
    subsections: [
      {
        subtitle: "",
        content: [
          "These terms shall be governed under Indian law and fall under the exclusive jurisdiction of courts in India.",
        ],
      },
    ],
  },
  {
    id: "policy-updates",
    title: "13. Policy Updates",
    subsections: [
      {
        subtitle: "",
        content: [
          "Crediple India may update these policies periodically. Continued use of services implies acceptance of revised policies.",
        ],
      },
    ],
  },
  {
    id: "contact",
    title: "14. Contact Information",
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
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
        style={{ background: "linear-gradient(180deg, #22d3ee, #3b82f6)" }}
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
            {sub.subtitle && (
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {sub.subtitle}
              </h3>
            )}
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

export default function TermsOfServicePage() {
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
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6)",
        }}
      />

      <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
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
          <div
            aria-hidden
            className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              backgroundImage: isDark
                ? "radial-gradient(circle, rgba(129,140,248,0.14) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
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
                <FileText className="w-6 h-6" style={{ color: "var(--accent-color)" }} />
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
                  Terms of Service
                </h1>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Last updated: May 2026 &nbsp;·&nbsp; Crediple India Private Limited
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {[
                { label: "Privacy Policy", href: "/privacy" },
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
            By accessing or using the Crediple India Private Limited website, platforms, or services
            ("Services"), you agree to be bound by these Terms & Conditions. If you do not agree,
            you must not use the Services.
          </motion.p>

          {SECTIONS.map((section, i) => (
            <PolicySection key={section.id} section={section} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}