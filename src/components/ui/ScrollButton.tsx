"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function ScrollButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heroVisible, setHeroVisible]     = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollDown = useCallback(() => {
    const hero = document.getElementById("hero");
    const next = hero?.nextElementSibling as HTMLElement | null;
    next?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Down arrow — hero bottom center */}
      <AnimatePresence>
        {heroVisible && !showScrollTop && (
          <motion.button
            key="down"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            onClick={scrollDown}
            aria-label="Scroll to next section"
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200"
              style={{
                border: "1px solid var(--border)",
                background: "var(--bg-elevated)",
                opacity: 0.85,
              }}
            >
              <ArrowDown size={16} style={{ color: "var(--text-secondary)" }} />
            </motion.div>
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              scroll
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll-to-top FAB */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="top"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollTop}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-md"
            style={{
              border: "1px solid rgba(34,211,238,0.22)",
              background: "var(--bg-elevated)",
              boxShadow: "0 0 20px rgba(34,211,238,0.12), 0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <ArrowUp size={16} style={{ color: "var(--text-primary)" }} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}