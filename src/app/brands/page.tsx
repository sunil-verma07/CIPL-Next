"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BRANDS_PAGE_DATA, UNIFIED_ADVANTAGE } from "@/utils/siteData";
import BrandHero from "@/sections/brand/hero";

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Glow Card ───────────────────────────────────────────────────────────────

function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
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
      className={`relative rounded-[18px] p-[1.5px] cursor-pointer ${className}`}
      style={{
        background: hovered
          ? `radial-gradient(160px circle at ${glow.x}% ${glow.y}%, rgba(34,211,238,0.7), rgba(139,92,246,0.4) 45%, var(--card-glow-base, rgba(255,255,255,0.08)) 100%)`
          : "var(--card-glow-base, rgba(255,255,255,0.08))",
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
              background: `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, rgba(34,211,238,0.06) 0%, transparent 70%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BrandsPage() {
  return (
    <div className="w-full overflow-x-hidden" style={{ background: "var(--background)" }}>
      <BrandHero />

      {/* ── BRAND SECTIONS ────────────────────────────────────────────────── */}
      {BRANDS_PAGE_DATA.map((brand, index) => {
        const isLast = index === BRANDS_PAGE_DATA.length - 1;
        const imageRight = index % 2 === 0;

        return (
          <div key={brand.id}>

            {/* thin divider between brand blocks (skip before first) */}
            {index > 0 && (
              <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div style={{ height: "1px", background: "rgba(34,211,238,0.08)" }} />
              </div>
            )}

            {/* ── Brand Hero Content + Image ─────────────────────────────── */}
            <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
              {/* ambient glow alternates side */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-[450px] h-[350px] pointer-events-none"
                style={{
                  [imageRight ? "left" : "right"]: "-80px",
                  background: "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 65%)",
                  filter: "blur(70px)",
                }}
                aria-hidden
              />

              <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  className={`flex flex-col gap-10 items-start md:items-center ${
                    imageRight ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Text Content */}
                  <motion.div
                    variants={imageRight ? fadeLeft : fadeRight}
                    className="w-full md:w-1/2 flex flex-col justify-center"
                  >
                    <p
                      className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]"
                      style={{ color: "rgba(34,211,238,0.5)" }}
                    >
                      Brand 0{index + 1}
                    </p>

                    <h2
                      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {brand.name}
                    </h2>

                    <div className="mb-5 space-y-1">
                      {brand.taglines.map((line) => (
                        <p
                          key={line}
                          className="text-[11px] font-semibold uppercase tracking-[0.16rem]"
                          style={{ color: "rgba(34,211,238,0.45)" }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>

                    <div
                      className="w-10 h-px mb-6"
                      style={{ background: "rgba(34,211,238,0.2)" }}
                    />

                    <div className="space-y-4">
                      {brand.description.map((para, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    variants={imageRight ? fadeRight : fadeLeft}
                    className="w-full md:w-1/2"
                  >
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{ border: "1px solid rgba(34,211,238,0.12)" }}
                    >
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* subtle inner divider */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div style={{ height: "1px", background: "rgba(34,211,238,0.06)" }} />
            </div>

            {/* ── What We Build ─────────────────────────────────────────── */}
            <section className="relative py-14 sm:py-16 px-4 overflow-hidden">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 65%)",
                  filter: "blur(60px)",
                }}
                aria-hidden
              />
              <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  className="mb-10"
                >
                  <p
                    className="mb-2 text-xs font-semibold uppercase tracking-[0.22em]"
                    style={{ color: "rgba(34,211,238,0.5)" }}
                  >
                    Deliverables
                  </p>
                  <h3
                    className="text-2xl sm:text-3xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    What We Build
                  </h3>
                </motion.div>

                {/* Row 1 — first 3 */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className="flex flex-col sm:flex-row gap-4 mb-4"
                >
                  {brand.whatWeBuild.slice(0, 3).map((item) => (
                    <motion.div
                      key={item}
                      variants={cardVariant}
                      whileHover={{ y: -3 }}
                      className="flex-1"
                    >
                      <GlowCard className="h-full">
                        <div className="px-6 py-5 flex items-center justify-center h-full">
                          <span
                            className="text-sm sm:text-[15px] font-semibold text-center"
                            style={{ color: "#22d3ee" }}
                          >
                            {item}
                          </span>
                        </div>
                      </GlowCard>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Row 2 — remaining, centered */}
                {brand.whatWeBuild.length > 3 && (
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                  >
                    {brand.whatWeBuild.slice(3).map((item) => (
                      <motion.div
                        key={item}
                        variants={cardVariant}
                        whileHover={{ y: -3 }}
                        className="sm:w-[calc(33.333%-0.5rem)]"
                      >
                        <GlowCard className="h-full">
                          <div className="px-6 py-5 flex items-center justify-center h-full">
                            <span
                              className="text-sm sm:text-[15px] font-semibold text-center"
                              style={{ color: "#22d3ee" }}
                            >
                              {item}
                            </span>
                          </div>
                        </GlowCard>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </section>

            {/* subtle inner divider */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div style={{ height: "1px", background: "rgba(34,211,238,0.06)" }} />
            </div>

            {/* ── Core Focus ────────────────────────────────────────────── */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="relative py-12 px-4 overflow-hidden"
            >
              <div className="max-w-3xl mx-auto text-center relative z-10">
                <p
                  className="text-xs font-bold uppercase tracking-[0.22em] mb-4"
                  style={{ color: "rgba(34,211,238,0.5)" }}
                >
                  Core Focus
                </p>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--text-primary)" }}
                >
                  {brand.coreFocus}
                </p>
              </div>

              {/* bottom divider — skip on last brand */}
              {!isLast && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-12">
                  <div style={{ height: "1px", background: "rgba(34,211,238,0.1)" }} />
                </div>
              )}
            </motion.section>

          </div>
        );
      })}

      {/* ── UNIFIED ADVANTAGE ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div style={{ height: "1px", background: "rgba(34,211,238,0.08)" }} />
      </div>

      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(34,211,238,0.05) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
          aria-hidden
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(34,211,238,0.5)" }}
            >
              Ecosystem
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Unified Advantage
            </h2>
            <p
              className="text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              Every brand in our ecosystem benefits from the same central intelligence layer.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {UNIFIED_ADVANTAGE.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} variants={cardVariant}>
                  <GlowCard className="h-full">
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="flex items-center gap-4 px-6 py-5 h-full"
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: "rgba(34,211,238,0.1)",
                          border: "1px solid rgba(34,211,238,0.2)",
                        }}
                      >
                        <Icon size={20} style={{ color: "#22d3ee" }} />
                      </div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER CTA ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div style={{ height: "1px", background: "rgba(34,211,238,0.08)" }} />
      </div>

      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            One Intelligence.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #22d3ee, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Many Ecosystems.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            Each brand is distinct. Each ecosystem is independent. But all are powered by the same Crediple
            intelligence layer — a unified backbone that accelerates growth across every domain.
          </motion.p>
        </div>
      </section>
    </div>
  );
}