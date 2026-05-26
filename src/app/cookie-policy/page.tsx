"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Cookie, ArrowLeft, ChevronRight } from "lucide-react";

interface Section {
  id: string;
  title: string;
  subsections: { subtitle: string; content: string[] }[];
}

const SECTIONS: Section[] = [
  {
    id: "use-of-cookies",
    title: "1. Use of Cookies",
    subsections: [
      {
        subtitle: "We use cookies to:",
        content: [
          "Keep you signed in",
          "Improve website performance",
          "Analyse user behaviour",
          "Personalise content",
        ],
      },
    ],
  },
  {
    id: "types-of-cookies",
    title: "2. Types of Cookies",
    subsections: [
      {
        subtitle: "We use the following types of cookies:",
        content: [
          "Essential cookies (required for operation) — these cannot be disabled as they are necessary for the website to function",
          "Analytics cookies — help us understand how visitors interact with our website by collecting and reporting information anonymously",
          "Preference cookies — enable our website to remember information that changes the way the site behaves or looks",
          "Marketing cookies — used to track visitors across websites to display relevant and engaging advertisements",
        ],
      },
    ],
  },
  {
    id: "cookie-control",
    title: "3. Cookie Control",
    subsections: [
      {
        subtitle: "",
        content: [
          "Users may disable cookies via browser settings; however, some features may not function properly.",
          "Most web browsers allow some control of most cookies through the browser settings.",
          "To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org.",
        ],
      },
    ],
  },
  {
    id: "user-consent",
    title: "4. User Consent Policy",
    subsections: [
      {
        subtitle: "By using our services, you consent to:",
        content: [
          "Collection and processing of your data",
          "Sharing data with authorised parties",
          "Receiving communications from Crediple",
          "Use of cookies and tracking technologies",
          "Consent can be withdrawn by contacting us, subject to legal limitations",
        ],
      },
    ],
  },
  {
    id: "third-party-cookies",
    title: "5. Third-Party Cookies",
    subsections: [
      {
        subtitle: "",
        content: [
          "We may use third-party services that set their own cookies (e.g. analytics providers, advertising networks).",
          "We do not control these third-party cookies and recommend reviewing their respective privacy policies.",
          "Third-party cookies are subject to the respective third-party's privacy policies.",
        ],
      },
    ],
  },
  {
    id: "policy-updates",
    title: "6. Updates to This Policy",
    subsections: [
      {
        subtitle: "",
        content: [
          "Crediple India may update this Cookie Policy periodically.",
          "Continued use of services implies acceptance of the revised policy.",
          "We will notify users of significant changes through the platform or via email.",
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
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-6 sm:p-8 mb-5"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      }}
    >
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
        style={{ background: "linear-gradient(180deg, #22d3ee, #8b5cf6)" }}
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

export default function CookiePolicyPage() {
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
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{
              backgroundImage: isDark
                ? "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
              filter: "blur(50px)",
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
                <Cookie className="w-6 h-6" style={{ color: "var(--accent-color)" }} />
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
                  Cookie Policy
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
                { label: "Terms of Service", href: "/terms" },
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
            This Cookie Policy explains how Crediple India Private Limited uses cookies and similar
            tracking technologies on our website and digital platforms. By continuing to use our
            services, you consent to our use of cookies as described in this policy.
          </motion.p>

          {SECTIONS.map((section, i) => (
            <PolicySection key={section.id} section={section} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}