"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Shield, Zap, Star, Target, Eye } from "lucide-react";
import Header from "@/shared/header";
import { ABOUT_MISSION, ABOUT_VISION, CORE_VALUES } from "@/utils/siteData";

const ICON_MAP: Record<string, React.ReactNode> = {
  award:  <Award  size={22} />,
  shield: <Shield size={22} />,
  zap:    <Zap    size={22} />,
  star:   <Star   size={22} />,
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeUpSlow = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

const iconPop = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const } },
};

const valuesContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

const valueCard = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

// ── Glow card — border gradient reacts to mouse, inner surface uses --card-inner ──
function GlowCard({
  children,
  className = "",
  glowVar = "var(--glow-cyan)",
  variants: v = valueCard,
}: {
  children: React.ReactNode;
  className?: string;
  glowVar?: string;
  variants?: typeof valueCard | typeof fadeUp | typeof fadeUpSlow;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow]     = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, []);

  return (
    <motion.div
      variants={v}
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
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mvRef      = useRef<HTMLDivElement>(null);
  const valuesRef  = useRef<HTMLDivElement>(null);

  const mvInView     = useInView(mvRef,      { once: true, margin: "-60px" });
  const valuesInView = useInView(valuesRef,  { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden px-6 py-24" style={{ background: "var(--background)" }}>
      {/* ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, var(--glow-primary) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto">
        <Header
          heading="About"
          highlight="Us"
          subheading="The holding hub of trusted brands, building tomorrow's digital infrastructure today."
        />

        {/* Mission + Vision */}
        <motion.div
          ref={mvRef}
          variants={containerVariants}
          initial="hidden"
          animate={mvInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"
        >
          <GlowCard glowVar="var(--glow-cyan)" variants={fadeUpSlow}>
            <div className="p-8 md:p-10 flex flex-col items-center text-center">
              <motion.div
                variants={iconPop}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{
                  background: "color-mix(in srgb, #34d399 12%, var(--card-inner))",
                  border: "1.5px solid rgba(52,211,153,0.25)",
                  boxShadow: "0 0 28px rgba(52,211,153,0.12)",
                }}
              >
                <Target size={26} style={{ color: "#34d399" }} />
              </motion.div>

              <motion.h3
                variants={fadeUp}
                className="font-bold text-[1.2rem] mb-4 tracking-widest uppercase"
                style={{ color: "var(--icon-accent)" }}
              >
                Mission
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="text-[13px] leading-[1.85] max-w-md"
                style={{ color: "var(--card-text-secondary)" }}
              >
                {ABOUT_MISSION.text}
              </motion.p>
            </div>
          </GlowCard>

          <GlowCard glowVar="var(--glow-purple)" variants={fadeUpSlow}>
            <div className="p-8 md:p-10 flex flex-col items-center text-center">
              <motion.div
                variants={iconPop}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{
                  background: "color-mix(in srgb, #a78bfa 12%, var(--card-inner))",
                  border: "1.5px solid rgba(139,92,246,0.3)",
                  boxShadow: "0 0 28px rgba(139,92,246,0.14)",
                }}
              >
                <Eye size={26} style={{ color: "#a78bfa" }} />
              </motion.div>

              <motion.h3
                variants={fadeUp}
                className="font-bold text-[1.2rem] mb-4 tracking-widest uppercase"
                style={{ color: "var(--icon-accent)" }}
              >
                Vision
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="text-[13px] leading-[1.85] max-w-md"
                style={{ color: "var(--card-text-secondary)" }}
              >
                {ABOUT_VISION.text}
              </motion.p>
            </div>
          </GlowCard>
        </motion.div>

        {/* Core Values heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center my-12"
        >
          <span
            className="font-bold text-xl md:text-2xl"
            style={{
              background: "var(--heading-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Core Values
          </span>
        </motion.div>

        {/* Values grid */}
        <motion.div
          ref={valuesRef}
          variants={valuesContainer} 
          initial="hidden"
          animate={valuesInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {CORE_VALUES.map((val) => (
            <GlowCard key={val.title} glowVar="var(--glow-cyan)">
              <div className="p-6 md:p-7 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <motion.div
                    variants={iconPop}
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: "var(--icon-accent-bg)",
                      border: "1px solid var(--icon-accent-border)",
                      color: "var(--icon-accent)",
                    }}
                  >
                    {ICON_MAP[val.icon]}
                  </motion.div>
                  <h4
                    className="font-semibold text-[15px]"
                    style={{ color: "var(--icon-accent)" }}
                  >
                    {val.title}
                  </h4>
                </div>
                <p
                  className="text-[13px] leading-relaxed pl-[48px]"
                  style={{ color: "var(--card-text-muted)" }}
                >
                  {val.desc}
                </p>
              </div>
            </GlowCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
