"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/utils/siteData";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const valueVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Stats() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-16 px-6 overflow-hidden"
      style={{ background: "var(--section-alt)" }}
    >
      {/* top separator */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(600px,80vw)] h-[1px] origin-center"
        style={{ background: "var(--separator)" }}
        aria-hidden
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="flex flex-col items-center gap-2"
          >
            <motion.span
              variants={valueVariants}
              className="font-bold leading-none"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                background: "var(--stat-value-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {stat.value}
            </motion.span>
            <span
              className="text-sm md:text-[15px] tracking-wide"
              style={{ color: "var(--stat-label)" }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* bottom separator */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(600px,80vw)] h-[1px] origin-center"
        style={{ background: "var(--separator)" }}
        aria-hidden
      />
    </section>
  );
}