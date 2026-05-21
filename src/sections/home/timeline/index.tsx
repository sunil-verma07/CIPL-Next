"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TIMELINE } from "@/utils/siteData";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 44 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const dotVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  show:   { opacity: 1, scale: 1,   transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const } },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  show:   { scaleX: 1, opacity: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 } },
};

function TimelineDot({ delay }: { delay: number }) {
  return (
    <motion.div
      variants={dotVariants}
      transition={{ delay }}
      className="relative flex items-center justify-center mb-6 shrink-0"
    >
      {/* outer ring */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 50% 30%, #0d2a4a 0%, #071525 60%, #050e1a 100%)",
          border: "1.5px solid rgba(59,130,246,0.25)",
          boxShadow: "0 0 24px rgba(34,211,238,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* inner dot */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "linear-gradient(135deg, #22d3ee, #3b82f6)", boxShadow: "0 0 10px rgba(34,211,238,0.7)" }}
        />
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 overflow-hidden"
    >
      {/* faint background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto">

        {/* connecting line — desktop only */}
        <div className="hidden md:block relative mb-0">
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="absolute top-[28px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-[1px] origin-left"
            style={{ background: "linear-gradient(to right, rgba(59,130,246,0.3), rgba(34,211,238,0.3), rgba(59,130,246,0.3))" }}
            aria-hidden
          />
        </div>

        {/* items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6"
        >
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.period}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <TimelineDot delay={i * 0.12} />

              {/* period */}
              <motion.span
                className="font-[Jost] font-bold mb-2 leading-tight"
                style={{
                  fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
                  background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {item.period}
              </motion.span>

              {/* tag */}
              <span
                className="font-semibold text-[11px] tracking-[0.18em] uppercase mb-2"
                style={{ color: item.tagColor }}
              >
                {item.tag}
              </span>

              {/* description */}
              <p className="text-white/40 text-[13.5px] leading-relaxed max-w-[200px] mx-auto">
                {item.title}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}