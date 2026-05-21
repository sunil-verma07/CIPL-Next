"use client";

import { motion } from "framer-motion";

type HeaderProps = {
  heading: string;
  highlight?: string;
  subheading: string;
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Header({ heading, highlight, subheading }: HeaderProps) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center text-center mb-12">
      <motion.h2
        variants={item}
        className="font-bold leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl"
        style={{ color: "var(--text-primary)" }}
      >
        {heading}{" "}
        {highlight && (
          <span
            style={{
              background: "var(--heading-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {highlight}
          </span>
        )}
      </motion.h2>

      <motion.p
        variants={item}
        className="mt-4 max-w-xl leading-relaxed font-light text-sm md:text-base"
        style={{ color: "var(--text-secondary)" }}
      >
        {subheading}
      </motion.p>
    </div>
  );
}