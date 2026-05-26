"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";

// Floating particles for atmosphere
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 8 + (i / 14) * 84,
  delay: (i * 0.5) % 6,
  duration: 6 + (i % 4) * 1.5,
  size: 1.5 + (i % 3) * 0.8,
}));

// Glitchy number animation
const glitchVariants = {
  normal: { x: 0, opacity: 1, skewX: 0 },
  glitch1: { x: [-2, 3, -1, 0], opacity: [1, 0.8, 1, 1], skewX: [-2, 1, 0] },
};

export default function NotFoundPage() {
  const [isDark, setIsDark] = useState(true);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const update = () =>
      setIsDark(!document.documentElement.classList.contains("light"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Trigger glitch effect periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 400);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const bgGradient = isDark
    ? "linear-gradient(180deg, #050816 0%, #020617 60%, #020617 100%)"
    : "linear-gradient(180deg, #dde9ff 0%, #eaf1ff 50%, #f0f4fa 100%)";

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      style={{ backgroundImage: bgGradient }}
    >
      {/* ── Floating particles ─────────────────────────────── */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            bottom: "-8px",
            width: p.size,
            height: p.size,
            backgroundColor: isDark
              ? "rgba(147,197,253,0.45)"
              : "rgba(37,99,235,0.22)",
          }}
          animate={{
            y: [0, -(220 + p.id * 12)],
            opacity: [0, 0.6, 0],
            x: [0, p.id % 2 === 0 ? 18 : -18],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* ── Background glow orbs ───────────────────────────── */}
      <div
        aria-hidden
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(ellipse at 50% 50%, rgba(96,165,250,0.12) 0%, transparent 65%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(29,78,216,0.07) 0%, transparent 65%)",
          filter: "blur(48px)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 left-1/4 w-72 h-72 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Main content ──────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

        {/* 404 number */}
        <motion.div
          className="relative mb-2 select-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="font-bold leading-none"
            style={{
              fontSize: "clamp(6rem, 22vw, 11rem)",
              backgroundImage: isDark
                ? "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(96,165,250,0.5) 50%, rgba(139,92,246,0.4) 100%)"
                : "linear-gradient(135deg, rgba(12,26,53,0.1) 0%, rgba(29,78,216,0.45) 50%, rgba(124,58,237,0.35) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              display: "block",
              letterSpacing: "-0.04em",
            }}
            animate={glitching ? {
              x: [-3, 4, -2, 0],
              skewX: [-3, 2, 0],
              transition: { duration: 0.4, ease: "easeInOut" }
            } : {}}
          >
            404
          </motion.span>

          {/* glitch layer */}
          {glitching && (
            <motion.span
              aria-hidden
              className="absolute inset-0 font-bold leading-none pointer-events-none"
              style={{
                fontSize: "clamp(6rem, 22vw, 11rem)",
                backgroundImage: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                letterSpacing: "-0.04em",
                opacity: 0.35,
                mixBlendMode: "screen",
              }}
              initial={{ x: 4, opacity: 0.35 }}
              animate={{ x: -4, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              404
            </motion.span>
          )}
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="w-16 h-[2px] rounded-full mb-7"
          style={{
            background: "linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* Title */}
        <motion.h1
          className="font-bold mb-3"
          style={{
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            color: "var(--text-primary)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          Page Not Found
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-sm leading-relaxed mb-10 max-w-sm"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Primary — Go Home */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              href="/"
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3 rounded-2xl text-sm font-semibold text-white"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #8b5cf6 100%)"
                  : "linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #7c3aed 100%)",
                boxShadow: isDark
                  ? "0 0 28px rgba(34,211,238,0.32), 0 4px 16px rgba(0,0,0,0.3)"
                  : "0 0 20px rgba(2,132,199,0.22), 0 4px 14px rgba(0,0,0,0.12)",
              }}
            >
              <Home className="w-4 h-4 shrink-0" />
              Go Back Home
            </Link>
          </motion.div>

          {/* Secondary — Go Back */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3 rounded-2xl text-sm font-medium cursor-pointer"
              style={{
                color: isDark ? "rgba(255,255,255,0.82)" : "#0c1a35",
                border: `1px solid ${isDark ? "rgba(147,197,253,0.2)" : "rgba(12,26,53,0.14)"}`,
                backgroundColor: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(14px)",
              }}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              Go Back
            </button>
          </motion.div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-xs font-medium tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>
            Or explore
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "About", href: "/about" },
              { label: "Solutions", href: "/solutions" },
              { label: "Brands", href: "/brands" },
              { label: "Contact", href: "/contact" },
            ].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.75 + i * 0.06 }}
              >
                <Link
                  href={link.href}
                  className="px-4 py-1.5 rounded-full text-xs font-medium hover:scale-105 transition-transform"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    backgroundColor: "var(--card-bg)",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom brand mark ─────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Crediple
        </span>
      </motion.div>
    </div>
  );
}