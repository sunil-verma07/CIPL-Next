"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  HeartPulse, BarChart2, Scale, Rocket, GraduationCap, Building2,
} from "lucide-react";
import Header from "@/shared/header";
import { WHO_WE_SERVE } from "@/utils/siteData";

// ── icon map ─────────────────────────────────────────────────────────────────
const ICONS: Record<string, React.ReactNode> = {
  "heart-pulse":    <HeartPulse    size={22} />,
  "bar-chart-2":    <BarChart2     size={22} />,
  "scale":          <Scale         size={22} />,
  "rocket":         <Rocket        size={22} />,
  "graduation-cap": <GraduationCap size={22} />,
  "building-2":     <Building2     size={22} />,
};

// ── variants ─────────────────────────────────────────────────────────────────
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as const } },
};

// ── glow card ─────────────────────────────────────────────────────────────────
function ServeCard({ item, glowVar = "var(--glow-cyan)", }: { item: typeof WHO_WE_SERVE[0], glowVar?: string; }) {
  const cardRef                     = useRef<HTMLDivElement>(null);
  const [glow, setGlow]             = useState({ x: 50, y: 50 });
  const [hovered, setHovered]       = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setGlow({
      x: ((e.clientX - r.left) / r.width)  * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
    });
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } }}
      className="relative rounded-[18px] p-[1.5px] cursor-pointer"
      style={{
        background: hovered
          ? `radial-gradient(160px circle at ${glow.x}% ${glow.y}%, ${glowVar}, var(--glow-secondary) 45%, var(--card-glow-base) 100%)`
          : "var(--card-glow-base)",
        transition: "background 0.08s ease",
      }}
    >
      {/* inner */}
      <div
        className="relative rounded-[17px] h-full p-6 flex flex-col gap-4 overflow-hidden"
         style={{ background: "var(--card-inner)" }}
      >
        {/* inner glow */}
        {hovered && (
          <div
            className="absolute inset-0 rounded-[17px] pointer-events-none"
            style={{
              background: `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--icon-accent) 5%, transparent) 0%, transparent 70%)`,
            }}
          />
        )}

        {/* icon */}
        <motion.div
          variants={iconVariants}
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: "rgba(34,211,238,0.1)",
            border: "1px solid rgba(34,211,238,0.2)",
            color: "#22d3ee",
          }}
        >
          {ICONS[item.icon]}
        </motion.div>

        {/* title */}
        <div className="flex flex-col gap-1">
          <h3
            className="font-semibold text-[15px] leading-snug"
            style={{ color: "#22d3ee" }}
          >
            {item.title}
          </h3>
          <p className="text-[13px] font-medium leading-snug" style={{ color: "var(--icon-accent)" }}>
            {item.heading}
          </p>
        </div>

        {/* desc */}
        <p className="text-[13px] leading-relaxed flex-1" style={{ color: "var(--card-text-secondary)" }}>
          {item.desc}
        </p>

        {/* bottom accent line */}
        <motion.div
          className="h-[1.5px] w-0 rounded-full mt-auto"
          animate={{ width: hovered ? "40%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ background: "linear-gradient(to right, #22d3ee, transparent)" }}
        />
      </div>
    </motion.div>
  );
}

// ── main ──────────────────────────────────────────────────────────────────────
export default function WhoWeServe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef,    { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.05) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      {/* decorative side blobs */}
      <div
        className="absolute top-1/3 -left-32 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Header
            heading="Who We"
            highlight="Serve"
            subheading="Powering professionals across every major industry with scalable, trusted digital solutions."
          />
        </motion.div>

        {/* eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex justify-center mb-10 -mt-6"
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "rgba(34,211,238,0.5)" }}
          >
            WHY US?
          </span>
        </motion.div>

        {/* grid */}
        <motion.div
          ref={gridRef}
          variants={gridVariants}
          initial="hidden"
          animate={gridInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {WHO_WE_SERVE.map((item) => (
            <ServeCard key={item.title} item={item} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}