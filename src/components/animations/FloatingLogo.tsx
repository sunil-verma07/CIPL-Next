"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import enterprise_light from '@/assets/enterprise_light.png';
import enterprise_dark from '@/assets/enterprise_dark.png';
import Image from "next/image";


const NAV_H        = 64;
const SCROLL_START = 50;
const SCROLL_END   = 240;
const HERO_LG = 80;  const NAV_LG = 34;
const HERO_SM = 60;  const NAV_SM = 28;

interface FloatingLogoProps {
  loaderDone: boolean;
  isHome?: boolean;
  /** Called with scroll progress 0–1 so Navbar can sync its yaka icon */
  onScrollProgress?: (p: number) => void;
}

export default function FloatingLogo({ loaderDone, isHome = false, onScrollProgress }: FloatingLogoProps) {
  const { isDark } = useTheme();

  const [winW, setWinW]         = useState(0);
  const [winH, setWinH]         = useState(0);
  const [measured, setMeasured] = useState(false);

  const rawProgress = useMotionValue(0);
  const progress    = useSpring(rawProgress, { stiffness: 130, damping: 24, mass: 0.8 });

  const isSm     = winW >= 768 && winW < 900;
  const logoHero = isSm ? HERO_SM : HERO_LG;
  const logoNav  = isSm ? NAV_SM  : NAV_LG;
  const rightPad = winW < 900 ? 24 : 40;

  const heroLeft = Math.max(0, winW - rightPad - logoHero);
  const heroTop  = NAV_H + 16;

  // Must align with Navbar's yaka icon position:
  // right edge minus padding + contactBtn(~108) + gap(12) + themeToggle(36) + gap(12) + icon
  const navRight = rightPad + 108 + 12 + 36 + 12;
  const navLeft  = Math.max(0, winW - navRight - logoNav);
  const navTop   = (NAV_H - logoNav) / 2;

  const scrollX    = useTransform(progress, [0, 1], [heroLeft, navLeft]);
  const scrollY    = useTransform(progress, [0, 1], [heroTop,  navTop]);
  const scrollSize = useTransform(progress, [0, 1], [logoHero, logoNav]);

  // Fades out 0.65→0.80; Navbar yaka fades IN at 0.72 — seamless handoff.
  // z-index 48 (< navbar z-50) means it slides behind the bar naturally.
  const floatOpacity = useTransform(progress, [0.65, 0.80], [1, 0]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => { setWinW(window.innerWidth); setWinH(window.innerHeight); setMeasured(true); };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!loaderDone || !measured) return;
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, (window.scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START)));
      rawProgress.set(p);
      onScrollProgress?.(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaderDone, measured, rawProgress, onScrollProgress]);

  if (!measured || !loaderDone || winW < 768) return null;

  const initX = isHome ? winW / 2 - logoHero / 2 : heroLeft;
  const initY = isHome ? winH / 2 - logoHero / 2 : heroTop;

  return (
    <motion.div
      initial={{ x: initX, y: initY, width: logoHero, height: logoHero, opacity: 1 }}
      animate={{ x: heroLeft, y: heroTop, width: logoHero, height: logoHero, opacity: 1 }}
      transition={isHome ? { type: "spring", stiffness: 110, damping: 20, mass: 1 } : { duration: 0 }}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 48, pointerEvents: "none" }}
    >
      <motion.div
        style={{
          position: "absolute",
          left: scrollX,
          top:  scrollY,
          translateX: -heroLeft,
          translateY: -heroTop,
          width:   scrollSize,
          height:  scrollSize,
          opacity: floatOpacity,
        }}
      >
      <Image src={isDark ? enterprise_dark : enterprise_light} alt="Crediple" fill className="object-contain" priority />

      </motion.div>
    </motion.div>
  );
}