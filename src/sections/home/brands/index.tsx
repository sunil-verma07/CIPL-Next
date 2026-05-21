"use client";

import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { BRANDS } from "@/utils/siteData";
import Header from "@/shared/header";
import BrandCard from "./brandCard";

// ── animation variants ──────────────────────────────────────────────────────
const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const headingItem = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};


// ── main section ────────────────────────────────────────────────────────────
export default function Brands() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* faint background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        {/* heading */}
        <Header
          heading="Our"
          highlight="Brands"
          subheading="Access specialized solutions, unified under one powerful ecosystem"
        />
        

        {/* cards grid */}
        <motion.div
          variants={sectionVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {BRANDS.map((brand, i) => (
            <BrandCard key={brand.name} brand={brand} index={i} />
          ))}
        </motion.div>

        <div
          className="relative mt-12 overflow-hidden rounded-full border py-3"
          style={{
            borderColor: "var(--border)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(96,165,250,0.04))",
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <motion.div
            className="flex w-max items-center gap-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {[...BRANDS, ...BRANDS].map((brand, index) => (
              <span
                key={`${brand.name}-${index}`}
                className="rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.18em]"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "var(--border-subtle)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {brand.name}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
