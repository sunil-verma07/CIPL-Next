"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/shared/header";
import { TESTIMONIALS } from "@/utils/siteData";

const INTERVAL = 3000;

// ── single card ───────────────────────────────────────────────────────────
function TestimonialCard({ item }: { item: (typeof TESTIMONIALS)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
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
      className="relative rounded-2xl overflow-hidden flex-1 min-w-0"
      style={{ background: "var(--card-inner)" }}
    >
      {/* magnetic border glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${mouse.x}% ${mouse.y}%, rgba(34,211,238,0.12) 0%, transparent 65%)`,
        }}
      />

      {/* circular overlay from top-right */}
      <div
        className="absolute pointer-events-none z-10 rounded-full"
        style={{
          width: hovered ? "140%" : "32px",
          height: hovered ? "140%" : "32px",
          top: hovered ? "-20%" : "14px",
          right: hovered ? "-20%" : "14px",
          background: `radial-gradient(circle at center, ${item.accent}18 0%, ${item.accent}0a 40%, transparent 65%)`,
          transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          filter: "blur(2px)",
        }}
      />

      {/* border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        style={{
          boxShadow: hovered
            ? `inset 0 0 0 1px rgba(34,211,238,0.25)`
            : `inset 0 0 0 1px var(--card-border)`,
          transition: "box-shadow 0.35s ease",
        }}
      />

      {/* content */}
      <div className="relative z-20 p-6 sm:p-8 flex flex-col gap-5 h-full">
        {/* title row */}
        <div className="flex items-start justify-between gap-4">
          <h3
            className="font-semibold text-[1.05rem] leading-snug flex-1"
            style={{ color: "var(--testimonial-name)" }}
          >
            {item.company}
          </h3>
          {/* large faded quote mark */}
          <span
            className="text-[52px] leading-none font-serif shrink-0 select-none mt-[-6px]"
            style={{
              color: "var(--testimonial-quote)",
              fontFamily: "Georgia, serif",
            }}
          >
            "
          </span>
        </div>

        {/* body text — uses CSS var so it switches in light mode */}
        <p
          className="text-[14px] leading-[1.85] flex-1"
          style={{ color: "var(--testimonial-text)" }}
        >
          {item.text}
        </p>

        {/* author row */}
        <div className="flex items-center gap-3 pt-1">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 border-2"
            style={{
              background: `linear-gradient(135deg, ${item.accent}40, ${item.accent}18)`,
              borderColor: `${item.accent}50`,
              color: item.accent,
            }}
          >
            {item.avatar}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span
              className="font-bold text-[13px] uppercase tracking-wide leading-tight"
              style={{ color: "var(--testimonial-name)" }}
            >
              {item.name}
            </span>
            <span
              className="text-[12px] leading-tight truncate"
              style={{ color: "var(--testimonial-role)" }}
            >
              {item.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── main ──────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = TESTIMONIALS.length;

  // On mobile show 1 card at a time, on desktop show 2
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const perPage = isMobile ? 1 : 2;
  const pages = Math.ceil(total / perPage);

  const advance = useCallback(() => {
    setIndex((c) => (c + 1) % pages);
  }, [pages]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, INTERVAL);
  }, [advance]);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(advance, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, advance]);

  // Reset index when perPage changes so we don't land out of bounds
  useEffect(() => {
    setIndex(0);
  }, [perPage]);

  const goTo = (i: number) => {
    setIndex(i);
    resetTimer();
  };

  // Slice the visible cards for current page
  const visibleCards = Array.from({ length: perPage }, (_, i) =>
    TESTIMONIALS[(index * perPage + i) % total]
  );

  return (
    <section
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto">
        <Header
          heading="What Our"
          highlight="Clients Say"
          subheading="Trusted by professionals across healthcare, finance, legal and tech."
        />

        {/* slider */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
          style={{ minHeight: 260 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`${index}-${perPage}`}
              initial={{ opacity: 0, x: 80, scale: 0.96 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
              }}
              exit={{
                opacity: 0,
                x: -80,
                scale: 0.95,
                transition: { duration: 0.45, ease: [0.4, 0, 0.6, 1] as const },
              }}
              className="flex gap-4 sm:gap-5 w-full"
            >
              {visibleCards.map((card, i) => (
                <TestimonialCard key={`${index}-${i}`} item={card} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* dots */}
        <div className="flex flex-col items-center gap-3 mt-8">
          <div className="flex items-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="rounded-full focus:outline-none transition-all duration-300"
                style={{
                  width: i === index ? 24 : 7,
                  height: 7,
                  background:
                    i === index
                      ? "linear-gradient(135deg, #22d3ee, #3b82f6)"
                      : "var(--border)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}