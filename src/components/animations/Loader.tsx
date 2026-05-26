"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import enterprise_light from '@/assets/enterprise_light.png';
import enterprise_dark from '@/assets/enterprise_dark.png';
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [visible, setVisible] = useState(true);
  const { isDark } = useTheme();

  /**
   * FIX — Hydration mismatch
   *
   * The server always renders with isDark=true (the SSR default). On the
   * client, ThemeScript has already set the correct class on <html> before
   * React hydrates, so isDark may be false — causing src/srcSet to differ
   * between the server HTML and the first client render, which triggers the
   * "A tree hydrated but some attributes didn't match" warning.
   *
   * Solution: render a blank placeholder on the first paint (SSR + hydration),
   * then swap in the real themed image after mount. Since `mounted` starts
   * false on both server and client, the initial HTML always matches.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 3000);
    const t2 = setTimeout(() => onComplete(),      3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  const logoSrc = mounted
    ? (isDark ? enterprise_dark : enterprise_light)
    : enterprise_dark; // matches the SSR default (html.dark)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "var(--loader-bg)" }}
        >
          {/* Ambient glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(59,130,246,0.08) 45%, transparent 70%)",
              filter: "blur(28px)",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 3.5, opacity: 0, filter: "blur(18px)" }}
            animate={{ scale: 1,   opacity: 1, filter: "blur(0px)"  }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            <div style={{ width: 110, height: 110, position: "relative" }}>
              {/*
               * key={String(mounted && isDark)} forces React to remount the
               * <Image> when the logo src changes after mount, avoiding a
               * stale srcSet being patched in-place (which also logs warnings).
               */}
              <Image
                key={String(mounted && isDark)}
                src={logoSrc}
                alt="Crediple"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Shimmer progress bar */}
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 80, height: 2, background: "var(--border)" }}
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="h-full w-1/2 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--accent-color, #93c5fd), var(--accent-secondary, #818cf8), transparent)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}