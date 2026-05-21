"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Check } from "lucide-react";
import About from "@/sections/about/hero";

// ─── Reusable animation variants ───────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Glow Card ───────────────────────────────────────────────────────────────
function GlowCard({
  children,
  className = "",
  glowVar = "var(--glow-cyan)",
}: {
  children: React.ReactNode;
  className?: string;
  glowVar?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-[18px] p-[1.5px] ${className}`}
      style={{
        background: hovered
          ? `radial-gradient(160px circle at ${glow.x}% ${glow.y}%, ${glowVar}, var(--glow-secondary) 45%, var(--card-glow-base) 100%)`
          : "var(--card-glow-base)",
        transition: "background 0.08s ease",
      }}
    >
      <div
        className="relative rounded-[17px] h-full overflow-hidden"
        style={{ background: "var(--card-inner)" }}
      >
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[17px]"
            style={{
              background: `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--icon-accent) 5%, transparent) 0%, transparent 70%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}

// ─── Accent Card (replaces gradient cards that had invisible text) ─────────
// Uses icon-accent-bg + icon-accent colour — same palette as ServeCard chips
function AccentCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[18px] h-full ${className}`}
      style={{
        background: "var(--icon-accent-bg)",
        border: "1px solid var(--icon-accent-border)",
      }}
    >
      {children}
    </div>
  );
}

export default function AboutUs() {
  return (
    // Single unified background for the entire page — no more striping
    <div className="w-full overflow-x-hidden" style={{ background: "var(--background)" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <About />

      {/* ── FOUNDATION ───────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, var(--glow-primary) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p
              className="text-xs font-semibold uppercase tracking-[0.25rem] mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              Our Foundation
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold leading-tight mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              More Than a{" "}
              <span
                style={{
                  background: "var(--heading-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Holding <br /> Company
              </span>{" "}
              — A system builder across industries
            </h2>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p
              className="text-lg md:text-xl leading-relaxed mb-4 font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Crediple transforms traditional business models into scalable,
              technology driven ecosystems. We bring structure, intelligence,
              and scalability to every industry we build in.
            </p>
            <p
              className="text-sm font-light text-center"
              style={{ color: "var(--icon-accent)" }}
            >
              We are not just building Brands. We are building systems that power industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      {/* ── PHILOSOPHY ───────────────────────────────────────────────────── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, var(--glow-secondary) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          aria-hidden
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl text-center mb-4 sm:text-4xl font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Our Operating Philosophy
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="text-center text-sm md:text-base mb-12"
            style={{ color: "var(--text-secondary)" }}
          >
            We do not run businesses in isolation. We design interconnected ecosystems.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
          >
            <GlowCard glowVar="var(--glow-cyan)">
              <div className="px-6 sm:px-8 py-8">
                <p
                  className="text-center text-sm mb-12"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Every vertical we enter is evaluated on three principles:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-6">
                  {[
                    "Can it be systemised?",
                    "Can it be scaled through technology?",
                    "Can it improve decision making or access?",
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      custom={i}
                      className="flex flex-col items-center text-center gap-4"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-md"
                        style={{
                          background: "var(--heading-gradient)",
                          color: "var(--primary-foreground)",
                        }}
                      >
                        {i + 1}
                      </div>
                      <p
                        className="text-sm font-semibold leading-snug max-w-[160px]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {text}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div
                  className="border-t mb-4"
                  style={{ borderColor: "var(--border-subtle)" }}
                />
                <p
                  className="text-center font-bold text-base md:text-lg"
                  style={{ color: "var(--icon-accent)" }}
                >
                  If the answer is yes — we build it.
                </p>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* ── divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      {/* ── APPROACH ─────────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, var(--hero-glow) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          aria-hidden
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl text-center mb-4 sm:text-4xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Our Approach
            </h2>
            <p
              className="font-medium text-lg"
              style={{ color: "var(--icon-accent)" }}
            >
              A system-first approach, not a product-first approach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* ✕ card — was using heading-gradient causing invisible text */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <GlowCard glowVar="var(--glow-secondary)" className="h-full">
                <div className="p-8 h-full">
                  <span
                    className="text-2xl font-bold mb-4 block"
                    style={{ color: "var(--destructive)" }}
                  >
                    ✕
                  </span>
                  <h3
                    className="text-base font-bold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Instead of asking:
                  </h3>
                  <p
                    className="text-sm italic"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    What service should we offer?
                  </p>
                </div>
              </GlowCard>
            </motion.div>

            {/* ✓ card — replaced gradient bg with AccentCard for readable text */}
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <AccentCard className="p-8">
                <span
                  className="text-2xl font-bold mb-4 block"
                  style={{ color: "var(--icon-accent)" }}
                >
                  ✓
                </span>
                <h3
                  className="text-base font-bold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  We ask:
                </h3>
                <p
                  className="text-sm italic"
                  style={{ color: "var(--text-secondary)" }}
                >
                  What system needs to exist to solve this industry problem at scale?
                </p>
              </AccentCard>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
          >
            <GlowCard glowVar="var(--glow-cyan)">
              <div className="px-8 py-8 flex flex-col items-center gap-5">
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  This approach allows us to build:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Long-term infrastructure", "Repeatable models", "Scalable ecosystems"].map((label) => (
                    <span
                      key={label}
                      className="px-6 py-3 rounded-full text-sm font-medium"
                      style={{
                        background: "var(--icon-accent-bg)",
                        color: "var(--icon-accent)",
                        border: "1px solid var(--icon-accent-border)",
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* ── divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      {/* ── DIFFERENT ────────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 80% 20%, var(--glow-primary) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl text-center mb-4 sm:text-4xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              What Makes Crediple Different
            </h2>
          </motion.div>

          <div className="flex flex-col gap-4">
            {[
              { left: "Most companies operate vertically", right: "We operate horizontally across industries" },
              { left: "Most brands sell services", right: "We design frameworks that deliver services at scale" },
              { left: "Most systems are disconnected", right: "We connect intelligence across domains" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
              >
                <GlowCard glowVar="var(--glow-cyan)" className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 rounded-[17px] overflow-hidden">
                    <div
                      className="px-6 sm:px-8 py-6 flex items-center"
                      style={{ background: "var(--card-inner)" }}
                    >
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.left}
                      </p>
                    </div>
                    <div
                      className="relative overflow-hidden flex items-center px-6 sm:px-8 py-6"
                      style={{ background: "var(--icon-accent-bg)" }}
                    >
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-2/3"
                        style={{ background: "var(--border)" }}
                      />
                      <p
                        className="font-semibold text-sm pl-4 sm:pl-0"
                        style={{ color: "var(--icon-accent)" }}
                      >
                        {item.right}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      {/* ── STRUCTURE ────────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, var(--glow-primary) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
          aria-hidden
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl text-center mb-4 sm:text-4xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              How We Are Structured
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Crediple operates through a Hub &amp; Ecosystem model
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-6 max-w-4xl mx-auto">
            {/* Central Intelligence — replaced gradient bg with AccentCard */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <AccentCard className="p-8 h-full">
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Central Intelligence Layer
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  A unified strategic and technology backbone that governs:
                </p>
                <ul className="space-y-4">
                  {["Product architecture", "Data systems", "Brand frameworks", "Growth strategy"].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "var(--icon-accent)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </AccentCard>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <GlowCard glowVar="var(--glow-cyan)" className="h-full">
                <div className="p-8 h-full">
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Independent Business Units
                  </h3>
                  <p
                    className="text-sm mb-5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Each business operates as an independent brand ecosystem:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {["HealthTech systems", "FinTech systems", "LegalTech systems", "DataTech systems"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: "var(--icon-accent)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="border-t pt-4"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <p
                      className="text-sm font-semibold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Each business has:
                    </p>
                    <ul className="space-y-1">
                      {["Its own operational focus", "Its own customer journey", "Its own performance metrics"].map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-1 my-2 text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span style={{ color: "var(--icon-accent)" }}>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="p-5 rounded-2xl text-center"
            style={{
              background: "var(--icon-accent-bg)",
              border: "1px solid var(--icon-accent-border)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              But all are powered by the{" "}
              <span className="font-semibold" style={{ color: "var(--icon-accent)" }}>
                same core intelligence layer
              </span>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      {/* ── COMMITMENT ───────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, var(--glow-secondary) 0%, transparent 65%)",
            filter: "blur(55px)",
          }}
          aria-hidden
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Our Commitment
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              We are committed to building:
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {[
              "Transparent systems",
              "Scalable digital infrastructure",
              "Industry ready technology frameworks",
              "Long term ecosystem value",
            ].map((item, i) => (
              <motion.div key={item} variants={fadeUp} custom={i}>
                <GlowCard glowVar="var(--glow-cyan)">
                  <div className="flex items-center gap-4 p-5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "var(--heading-gradient)" }}
                    >
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                      {item}
                    </span>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      {/* ── FUTURE DIRECTION ─────────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, var(--glow-primary) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <GlowCard glowVar="var(--glow-cyan)">
              <div className="px-8 sm:px-14 py-10 text-center">
                <h2
                  className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Future Direction
                </h2>
                <p
                  className="text-md sm:text-lg mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Our focus is not just expansion. It is{" "}
                  <strong className="font-bold" style={{ color: "var(--icon-accent)" }}>
                    ecosystem convergence
                  </strong>
                  .
                </p>
                <p
                  className="text-sm mb-10 mx-auto leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  Where healthcare, finance, legal systems, and data intelligence begin to interact seamlessly under one{" "}
                  <br className="hidden sm:block" />
                  unified structure.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Healthcare", "Finance", "Legal Systems", "Data Intelligence"].map((tag) => (
                    <span
                      key={tag}
                      className="px-5 py-2.5 rounded-full text-sm"
                      style={{
                        background: "var(--icon-accent-bg)",
                        color: "var(--icon-accent)",
                        border: "1px solid var(--icon-accent-border)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER SIGN-OFF ───────────────────────────────────────────────── */}
      <section className="relative py-20 text-center overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, var(--glow-primary) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />
        <div className="max-w-xl mx-auto px-6 relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl font-black tracking-widest mb-4"
            style={{
              background: "var(--heading-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            CREDIPLE
          </motion.h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="w-12 h-0.5 mx-auto mb-8"
            style={{ background: "var(--icon-accent)" }}
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="text-sm mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Crediple is not a traditional holding company.
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={3}
            className="font-bold text-lg leading-snug mb-12"
            style={{ color: "var(--text-primary)" }}
          >
            It is a multi-domain system architecture designed to transform how industries operate.
          </motion.p>
          <div
            className="border-t pt-6"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              © 2026 Crediple. Building systems that power industries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}