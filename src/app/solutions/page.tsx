"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  CircleDollarSign,
  DatabaseZap,
  HeartPulse,
  Layers3,
  Scale,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SolutionsHero from "@/sections/solutions/hero";

// ── animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -34 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 34 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

// ── data ──────────────────────────────────────────────────────────────────────
const solutionDomains = [
  {
    title: "HealthTech Systems",
    text: "Patient acquisition, provider visibility, care workflows, and clinic operations shaped into one connected digital journey.",
    icon: HeartPulse,
  },
  {
    title: "FinTech Intelligence",
    text: "Credit clarity, borrower profiling, lending workflows, and financial decision systems built for structured growth.",
    icon: CircleDollarSign,
  },
  {
    title: "LegalTech Workflows",
    text: "Case handling, client onboarding, documentation, and service delivery brought into cleaner digital operating models.",
    icon: Scale,
  },
  {
    title: "Data Intelligence",
    text: "Dashboards, aggregation layers, predictive signals, and decision support systems that turn scattered data into action.",
    icon: DatabaseZap,
  },
];

const processSteps = [
  {
    title: "Discover",
    text: "We map the industry problem, operational friction, user journey, and scale requirement before defining the system.",
  },
  {
    title: "Architect",
    text: "We design the workflows, intelligence layer, data movement, and brand experience that make the solution repeatable.",
  },
  {
    title: "Build",
    text: "We turn the model into digital infrastructure, dashboards, tools, and growth systems with measurable outcomes.",
  },
  {
    title: "Scale",
    text: "We refine adoption, performance loops, automation, and expansion paths so every solution can grow beyond a single use case.",
  },
];

const capabilities = [
  "Digital presence systems",
  "Workflow automation",
  "Data dashboards",
  "Customer acquisition funnels",
  "Operational intelligence",
  "Brand ecosystem design",
];

// ── GlowCard — matches ServeCard border glow style exactly ───────────────────
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
        className="relative h-full overflow-hidden rounded-[17px]"
        style={{ background: "var(--card-inner)" }}
      >
        {hovered && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[17px]"
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

// ── page ──────────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  return (
    <div className="w-full overflow-x-hidden" style={{ background: "var(--background)" }}>
      <SolutionsHero />

      {/* ── What We Solve ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* ambient glow — left */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-[340px] w-[500px] -translate-y-1/2 -translate-x-1/3"
          style={{
            background: "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p
              className="mb-5 text-xs font-semibold uppercase tracking-[0.25rem]"
              style={{ color: "rgba(34,211,238,0.5)" }}
            >
              What We Solve
            </p>
            <h2
              className="mb-4 text-3xl font-semibold leading-tight sm:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              We turn fragmented operations into{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #22d3ee, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                connected ecosystems
              </span>
              .
            </h2>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p
              className="mb-4 text-base leading-relaxed md:text-lg"
              style={{ color: "var(--text-secondary, rgba(255,255,255,0.65))" }}
            >
              Our solutions sit between strategy, technology, and operational execution. Instead of building
              isolated tools, we design systems that help teams acquire users, manage workflows, interpret data,
              and scale decision making.
            </p>
            <p className="text-sm font-medium" style={{ color: "#22d3ee" }}>
              Every solution is built to be repeatable, measurable, and ready for multi-domain expansion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* thin divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div style={{ height: "1px", background: "rgba(34,211,238,0.08)" }} />
      </div>

      {/* ── Solution Domains ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px]"
          style={{
            background: "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.07) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(34,211,238,0.5)" }}
            >
              Domains
            </p>
            <h2
              className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              Solution Domains
            </h2>
            <p
              className="mx-auto max-w-2xl text-sm leading-relaxed"
              style={{ color: "var(--text-secondary, rgba(255,255,255,0.55))" }}
            >
              Each domain is distinct, but all are powered by the same Crediple approach: structured workflows,
              intelligent data, and scalable digital infrastructure.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {solutionDomains.map((domain) => {
              const Icon = domain.icon;
              return (
                <motion.div key={domain.title} variants={cardVariant} whileHover={{ y: -4 }}>
                  <GlowCard className="h-full">
                    <div className="flex h-full flex-col p-6 gap-4">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl shrink-0"
                        style={{
                          background: "rgba(34,211,238,0.1)",
                          border: "1px solid rgba(34,211,238,0.2)",
                        }}
                      >
                        <Icon className="h-5 w-5" style={{ color: "#22d3ee" }} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3
                          className="text-[15px] font-semibold leading-snug"
                          style={{ color: "#22d3ee" }}
                        >
                          {domain.title}
                        </h3>
                      </div>
                      <p
                        className="text-[13px] leading-relaxed flex-1"
                        style={{ color: "var(--card-text-secondary, rgba(255,255,255,0.55))" }}
                      >
                        {domain.text}
                      </p>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* thin divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div style={{ height: "1px", background: "rgba(34,211,238,0.08)" }} />
      </div>

      {/* ── How We Build ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[260px] w-[640px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center, rgba(34,211,238,0.05) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(34,211,238,0.5)" }}
            >
              Our Process
            </p>
            <h2
              className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              How We Build Solutions
            </h2>
            <p
              className="text-sm"
              style={{ color: "var(--text-secondary, rgba(255,255,255,0.55))" }}
            >
              A system-first process from problem discovery to scalable execution.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4 md:grid-cols-4"
          >
            {processSteps.map((step, index) => (
              <motion.div key={step.title} variants={cardVariant} whileHover={{ y: -4 }}>
                <GlowCard className="h-full">
                  <div className="flex h-full flex-col p-6 gap-4">
                    {/* numbered badge */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shrink-0"
                      style={{
                        background: "rgba(34,211,238,0.1)",
                        border: "1px solid rgba(34,211,238,0.25)",
                        color: "#22d3ee",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3
                        className="text-[15px] font-semibold leading-snug"
                        style={{ color: "#22d3ee" }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p
                      className="text-[13px] leading-relaxed flex-1"
                      style={{ color: "var(--card-text-secondary, rgba(255,255,255,0.55))" }}
                    >
                      {step.text}
                    </p>
                    {/* bottom accent line — always visible as a step indicator */}
                    <div
                      className="h-[1.5px] rounded-full mt-auto"
                      style={{
                        width: `${(index + 1) * 25}%`,
                        background: "linear-gradient(to right, #22d3ee, transparent)",
                      }}
                    />
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* thin divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div style={{ height: "1px", background: "rgba(34,211,238,0.08)" }} />
      </div>

      {/* ── Core Capabilities ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <GlowCard>
              <div className="px-6 py-10 text-center sm:px-12">
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "rgba(34,211,238,0.5)" }}
                >
                  What We Deliver
                </p>
                <h2
                  className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  Core Capabilities
                </h2>
                <p
                  className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary, rgba(255,255,255,0.55))" }}
                >
                  Our solutions combine design, infrastructure, automation, and intelligence into practical
                  systems that teams can use every day.
                </p>

                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {capabilities.map((capability, index) => (
                    <motion.div
                      key={capability}
                      variants={cardVariant}
                      custom={index}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-left"
                      style={{
                        background: "rgba(34,211,238,0.06)",
                        border: "1px solid rgba(34,211,238,0.15)",
                      }}
                    >
                      <Check className="h-4 w-4 shrink-0" style={{ color: "#22d3ee" }} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {capability}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[520px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-2xl px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            Build the system behind your next{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #22d3ee, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              industry solution.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="mb-8 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary, rgba(255,255,255,0.55))" }}
          >
            Whether the challenge is visibility, workflow speed, data clarity, or scale, Crediple designs the
            operating layer that makes progress repeatable.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
          >
            <Button asChild size="md" className="h-14 rounded-2xl px-7 text-sm">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}