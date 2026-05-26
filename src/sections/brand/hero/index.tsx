"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRANDS_HERO_CONTENT as heroContent } from "@/utils/siteData";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Sparkles } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};
const ctaContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } },
};
const ctaItem = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 5 + (i / 18) * 90,
  delay: (i * 0.4) % 7,
  duration: 7 + (i % 5) * 1.8,
  size: 1 + (i % 3) * 0.8,
}));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const update = () =>
      setIsDark(!document.documentElement.classList.contains("light"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

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

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, -50]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Gradient strings kept as separate variables — never mixed with `background` shorthand
  const sectionBg = isDark
    ? "linear-gradient(180deg, #050816 0%, #020617 55%, #020617 100%)"
    : "linear-gradient(180deg, #dde9ff 0%, #eaf1ff 45%, #f0f4fa 100%)";

  const highlightGradient = isDark
    ? "linear-gradient(135deg, #67e8f9 0%, #60a5fa 45%, #a78bfa 100%)"
    : "linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #7c3aed 100%)";

  const cta1Shadow = isDark
    ? "0 0 32px rgba(34,211,238,0.38), 0 4px 24px rgba(0,0,0,0.35)"
    : "0 0 22px rgba(2,132,199,0.28), 0 4px 18px rgba(0,0,0,0.13)";

  const cta1Gradient = isDark
    ? "linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #8b5cf6 100%)"
    : "linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #7c3aed 100%)";

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden flex items-center"
      style={{ backgroundImage: sectionBg, transition: "background-image 0.5s ease" }}
    >
      {/* Planet Layer 1 — bloom halo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-185%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "110vw",
          aspectRatio: "1/1",
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundImage: isDark
            ? "radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(51,72,234,0.55) 52%, rgba(40,69,217,0.4) 62%, rgba(29,57,149,0.2) 74%, transparent 86%)"
            : "radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(80,120,255,0.18) 52%, rgba(60,100,220,0.12) 62%, rgba(40,80,180,0.06) 74%, transparent 86%)",
          filter: "blur(18px)",
          animation: "planetGlow 5s ease-in-out infinite",
        }}
      />

      {/* Planet Layer 2 — body */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-228%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120vw",
          aspectRatio: "1/1",
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundImage: isDark
            ? "radial-gradient(circle at 50% 80%, #04070f 0%, #07101f 34%, #0b1530 52%, #14254f 66%, rgba(59,130,246,0.10) 72%, rgba(99,102,241,0.16) 78%, rgba(214,197,255,0.87) 84%, rgba(255,255,255,0.93) 90%, #ffffff 100%)"
            : "radial-gradient(circle at 50% 80%, #b8cef5 0%, #9ab8ef 30%, #7aa0e5 50%, #5882d8 65%, rgba(100,148,230,0.6) 72%, rgba(160,190,255,0.7) 78%, rgba(220,232,255,0.92) 85%, rgba(255,255,255,0.97) 92%, #ffffff 100%)",
          boxShadow: isDark
            ? "0 0 30px rgba(255,255,255,0.25), 0 0 70px rgba(255,255,255,0.15), 0 0 150px rgba(168,85,247,0.14)"
            : "0 0 30px rgba(80,130,255,0.22), 0 0 70px rgba(60,110,240,0.12), 0 0 140px rgba(40,90,220,0.07)",
          animation: "planetPulse 5s ease-in-out infinite",
        }}
      />

      {/* Planet Layer 3 — rim arc */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-55%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120vw",
          aspectRatio: "1/1",
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundImage: isDark
            ? "radial-gradient(ellipse at 50% 40%, transparent 60%, rgba(167,139,250,0.08) 70%, rgba(196,181,253,0.35) 84%, rgba(237,233,254,0.3) 92%, transparent 98%)"
            : "radial-gradient(ellipse at 50% 40%, transparent 60%, rgba(100,140,255,0.05) 70%, rgba(150,180,255,0.2) 84%, rgba(210,225,255,0.26) 92%, transparent 98%)",
          animation: "planetRim 5s ease-in-out infinite 0.4s",
        }}
      />

      {/* Planet Layer 4 — upward bloom */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(100vw, 800px)",
          height: "440px",
          pointerEvents: "none",
          backgroundImage: isDark
            ? "radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.26) 0%, rgba(109,40,217,0.12) 38%, rgba(76,29,149,0.05) 62%, transparent 82%)"
            : "radial-gradient(ellipse at 50% 100%, rgba(80,120,220,0.14) 0%, rgba(60,100,200,0.07) 38%, rgba(40,80,180,0.03) 62%, transparent 82%)",
          filter: "blur(28px)",
          animation: "planetBloom 5s ease-in-out infinite 1s",
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          aria-hidden
          style={{
            position: "absolute",
            left: `${p.x}%`,
            bottom: "-8px",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            pointerEvents: "none",
            backgroundColor: isDark ? "rgba(147,197,253,0.55)" : "rgba(37,99,235,0.28)",
          }}
          animate={{
            y: [0, -(260 + p.id * 16)],
            opacity: [0, 0.7, 0],
            x: [0, p.id % 2 === 0 ? 22 : -22],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {/* Mouse-follow glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(550px circle at ${mouse.x}% ${mouse.y}%, ${
            isDark ? "rgba(96,165,250,0.11)" : "rgba(29,78,216,0.06)"
          }, transparent 65%)`,
        }}
      />

      {/* Ambient top glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(ellipse at 50% 0%, rgba(129,140,248,0.15) 0%, transparent 62%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(29,78,216,0.08) 0%, transparent 62%)",
          filter: "blur(50px)",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          backgroundImage: `linear-gradient(to top, ${isDark ? "#020617" : "#f0f4fa"}, transparent)`,
        }}
      />

      {/* ══ CONTENT ══ */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 py-24 sm:py-28"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-5xl text-center"
        >
          {/* Eyebrow badge */}
          <motion.div variants={item} className="mb-7 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 cursor-default backdrop-blur-xl"
              style={{
                border: `1px solid ${isDark ? "rgba(147,197,253,0.22)" : "rgba(29,78,216,0.2)"}`,
                backgroundColor: isDark ? "rgba(96,165,250,0.09)" : "rgba(29,78,216,0.07)",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 18, -12, 0], scale: [1, 1.2, 0.95, 1] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              >
                <Sparkles
                  className="h-3.5 w-3.5"
                  style={{ color: isDark ? "#93c5fd" : "#1d4ed8" }}
                />
              </motion.div>
              <span
                className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase"
                style={{ color: isDark ? "#93c5fd" : "#1d4ed8" }}
              >
                {heroContent.eyebrow}
              </span>
            </motion.div>
          </motion.div>

          {/* Heading line 1 */}
          <motion.h1
            variants={item}
            className="mx-auto max-w-4xl font-bold leading-[1.06] tracking-tight"
            style={{
              color: isDark ? "rgba(255,255,255,0.96)" : "#0c1a35",
              fontSize: "clamp(2.1rem, 6vw, 3.8rem)",
            }}
          >
            {heroContent.title}
          </motion.h1>

          {/* 
            FIX #3 — Gradient highlight text.
            Root cause: React warns when `background` shorthand and `backgroundClip`
            are set on the same element during re-renders because the shorthand resets
            backgroundClip on every paint. Fix: use `backgroundImage` (longhand) instead
            of `background` shorthand, so the two properties never conflict.
            Also add `color: transparent` as a fallback alongside WebkitTextFillColor
            so the text is invisible (shows gradient) in all engines.
          */}
          <motion.div variants={item} className="mt-0.5">
            <span
              className="font-bold leading-[1.1] tracking-tight"
              style={{
                fontSize: "clamp(2.1rem, 6vw, 3.8rem)",
                backgroundImage: highlightGradient,   // ← longhand, not `background`
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",                 // ← fallback for non-webkit
                display: "inline-block",
              }}
            >
              {heroContent.highlight}
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={item} className="mt-6 max-w-lg mx-auto px-2">
            <p
              className="leading-relaxed font-light text-sm sm:text-[15px]"
              style={{
                color: isDark ? "rgba(255,255,255,0.6)" : "rgba(12,26,53,0.65)",
              }}
            >
              {heroContent.subtitle}
            </p>
          </motion.div>

          {/* CTAs — FIX #4: fully responsive, w-full on mobile, auto on sm+ */}
          <motion.div
            variants={ctaContainer}
            initial="hidden"
            animate="show"
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
          >
            {/* Primary CTA */}
            <motion.div variants={ctaItem} className="w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto rounded-2xl font-medium text-white border-0 shadow-none"
                style={{
                  backgroundImage: cta1Gradient,
                  boxShadow: cta1Shadow,
                }}
              >
                <Link
                  href={heroContent.cta1.href}
                  className="flex items-center justify-center gap-2.5"
                >
                  <Search className="h-4 w-4 shrink-0" />
                  <span>{heroContent.cta1.label}</span>
                </Link>
              </Button>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div variants={ctaItem} className="w-full sm:w-auto">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto rounded-2xl font-medium"
                style={{
                  color: isDark ? "rgba(255,255,255,0.88)" : "#0c1a35",
                  border: `1px solid ${isDark ? "rgba(147,197,253,0.22)" : "rgba(12,26,53,0.15)"}`,
                  backgroundColor: isDark ? "rgba(15,23,42,0.65)" : "rgba(255,255,255,0.82)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <Link
                  href={heroContent.cta2.href}
                  className="flex items-center justify-center gap-2.5"
                >
                  <span>{heroContent.cta2.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}