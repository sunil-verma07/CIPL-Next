"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HERO_CONTENT as heroContent } from "@/utils/siteData";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Sparkles } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ctaContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.85 } },
};

const ctaItem = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden flex items-center"
      style={{
        background:
          "linear-gradient(180deg, #050816 0%, #020617 52%, #020617 100%)",
      }}
    >
      {/* Layer 1 — wide background bloom (the purple light source behind the planet) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-185%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "110vw",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(51, 115, 234, 0) 0%, rgba(51, 109, 234, 0) 38%, rgba(51, 72, 234, 0.55) 52%, rgba(40, 69, 217, 0.4) 62%, rgba(29, 57, 149, 0.2) 74%, transparent 86%)",
          filter: "blur(18px)",
          animation: "planetGlow 5s ease-in-out infinite",
        }}
      />

      {/* Layer 2 — the dark planet body itself */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-228%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120vw",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          pointerEvents: "none",
          // border: "1px solid #fff",
         background:
  "radial-gradient(circle at 50% 80%, #04070f 0%, #07101f 34%, #0b1530 52%, #14254f 66%, rgba(59,130,246,0.10) 72%, rgba(99,102,241,0.16) 78%, rgba(214, 197, 255, 0.87) 84%, rgba(255, 255, 255, 0.93) 90%, rgba(255, 255, 255, 0.8) 96%, #ffffff 100%)",
          // removed heavy inset shadow causing dark edges
          boxShadow:
            "0 0 25px rgba(255,255,255,0.28), 0 0 60px rgba(255,255,255,0.18), 0 0 140px rgba(168,85,247,0.16)",


          animation: "planetPulse 5s ease-in-out infinite",
        }}
      />
      {/* Layer 3 — rim light arc (brighter purple strip around the top edge) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-55%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120vw",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          pointerEvents: "none",
          /* Only the outer ring visible — transparent center */
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 90%, transparent 60%, rgba(167,139,250,0.08) 70%, rgba(167,139,250,0.22) 78%, rgba(196,181,253,0.35) 84%, rgba(221,214,254,0.5) 88%, rgba(237,233,254,0.3) 92%, transparent 98%)",
          animation: "planetRim 5s ease-in-out infinite 0.4s",
        }}
      />

      {/* Layer 4 — bloom that rises UP from the planet into the hero content area */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(100vw, 760px)",
          height: "420px",
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.28) 0%, rgba(109,40,217,0.14) 35%, rgba(76,29,149,0.06) 60%, transparent 80%)",
          filter: "blur(28px)",
          animation: "planetBloom 5s ease-in-out infinite 1s",
        }}
      />

      {/* ══════════════════════════════════════════ */}

      {/* Mouse-follow radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, var(--hero-glow), transparent 65%)`,
          transition: "background 0.12s ease",
        }}
        aria-hidden
      />

      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--glow-secondary) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, var(--background), transparent)",
        }}
        aria-hidden
      />

      {/* Logo placeholder */}
      <div
        className="absolute top-[80px] right-[40px] pointer-events-none"
        style={{ width: 80, height: 80 }}
        aria-hidden
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full flex items-center justify-center px-6 py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-6xl text-center"
        >
          {/* Eyebrow badge */}
          <motion.div variants={item} className="mb-8 flex justify-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-xl"
              style={{
                border:
                  "1px solid color-mix(in srgb, var(--accent-color) 20%, transparent)",
                background:
                  "color-mix(in srgb, var(--accent-color) 8%, transparent)",
              }}
            >
              <Sparkles
                className="h-4 w-4"
                style={{ color: "var(--accent-color)" }}
              />
              <span
                className="text-xs font-medium tracking-wide"
                style={{ color: "var(--accent-color)" }}
              >
                {heroContent.eyebrow}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="mx-auto max-w-4xl font-bold leading-[1.03] tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            {heroContent.title}
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {heroContent.highlight}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={item} className="mt-7 max-w-xl mx-auto">
            <p
              className="leading-relaxed font-light text-sm md:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              {heroContent.subtitle}
            </p>
            
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={ctaContainer}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.div variants={ctaItem}>
              <Button
                asChild
                size="md"
                className="h-14 rounded-2xl px-6 text-xs md:text-sm font-normal text-white bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:scale-[1.02] hover:shadow-[0_0_44px_rgba(14,165,233,0.5)] transition-all duration-200"
              >
                <Link href={heroContent.cta1.href}>
                  <Search className="mr-3 h-5 w-5" />
                  {heroContent.cta1.label}
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={ctaItem}>
              <Button
                asChild
                variant="secondary"
                size="md"
                className="h-14 rounded-2xl px-6 text-xs md:text-sm font-normal transition-colors duration-200"
                style={{
                  color: "var(--text-primary)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-elevated)",
                }}
              >
                <Link href={heroContent.cta2.href}>
                  {heroContent.cta2.label}
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}
