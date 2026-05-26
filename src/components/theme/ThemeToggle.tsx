"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      className="relative w-9 h-9 min-w-9 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
      style={{
        background: "var(--muted)",
        border: "1px solid var(--border)",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 40, scale: 0.6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute flex items-center justify-center"
          >
            <Moon
              size={16}
              strokeWidth={1.8}
              style={{
                color: "var(--nav-link-hover)",
                filter: "drop-shadow(0 0 5px rgba(34,211,238,0.6))",
              }}
            />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 40, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -40, scale: 0.6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute flex items-center justify-center"
          >
            <Sun
              size={16}
              strokeWidth={1.8}
              style={{
                color: "var(--nav-link-hover)",
                filter: "drop-shadow(0 0 5px rgba(251,191,36,0.7))",
              }}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}