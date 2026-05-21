"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import Image from "next/image";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import Logo from "@/assets/yaka_logo.png";

const NAV_H        = 64;   // matches h-16
const SCROLL_START = 50;
const SCROLL_END   = 220;

// Size tiers
const HERO_LG = 80;  // ≥ 900px
const NAV_LG  = 34;
const HERO_SM = 60;  // 768–899px
const NAV_SM  = 28;

interface FloatingLogoProps {
  loaderDone: boolean;
  onNavbarArrival?: (arrived: boolean) => void;
  /** True when on the homepage — enables the fly-in from loader center */
  isHome?: boolean;
}

export default function FloatingLogo({ loaderDone, onNavbarArrival, isHome = false }: FloatingLogoProps) {
  const [winW, setWinW]         = useState(0);
  const [winH, setWinH]         = useState(0);
  const [measured, setMeasured] = useState(false);

  const rawProgress = useMotionValue(0);
  const progress    = useSpring(rawProgress, { stiffness: 130, damping: 24, mass: 0.8 });

  // ── All hooks must be unconditional ──────────────────────────────────────
  // Compute derived values (safe even when winW=0)
  const isSm     = winW >= 768 && winW < 900;
  const logoHero = isSm ? HERO_SM : HERO_LG;
  const logoNav  = isSm ? NAV_SM  : NAV_LG;
  const rightPad = winW < 900 ? 24 : 40;

  const heroLeft = Math.max(0, winW - rightPad - logoHero);
  const heroTop  = NAV_H + 16;
  const navLeft  = Math.max(0, winW - rightPad - logoNav);
  const navTop   = (NAV_H - logoNav) / 2;

  // ALL useTransform calls here — never inside conditionals
  const scrollX       = useTransform(progress, [0, 1], [heroLeft, navLeft]);
  const scrollY       = useTransform(progress, [0, 1], [heroTop,  navTop]);
  const scrollSize    = useTransform(progress, [0, 1], [logoHero, logoNav]);
  const floatOpacity  = useTransform(progress, [0.82, 1], [1, 0]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => {
      setWinW(window.innerWidth);
      setWinH(window.innerHeight);
      setMeasured(true);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!loaderDone || !measured) return;
    const onScroll = () => {
      const p = Math.min(1, Math.max(0,
        (window.scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START)
      ));
      rawProgress.set(p);
      onNavbarArrival?.(p > 0.92);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaderDone, measured, rawProgress, onNavbarArrival]);

  // ── Early returns AFTER all hooks ────────────────────────────────────────
  if (!measured || !loaderDone || winW < 768) return null;

  // On homepage: fly in from viewport center (loader just faded from there)
  // On other pages: appear directly at heroLeft/heroTop with no fly-in
  const initX = isHome ? winW / 2 - logoHero / 2 : heroLeft;
  const initY = isHome ? winH / 2 - logoHero / 2 : heroTop;

  return (
    <motion.div
      initial={{
        x: initX,
        y: initY,
        width: logoHero,
        height: logoHero,
        opacity: 1,
      }}
      animate={{
        x: heroLeft,
        y: heroTop,
        width: logoHero,
        height: logoHero,
        opacity: 1,
      }}
      transition={
        isHome
          ? { type: "spring", stiffness: 110, damping: 20, mass: 1 }
          : { duration: 0 } // instant on other pages
      }
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 48,           // one below navbar z-50 → slides behind it on scroll
        pointerEvents: "none",
      }}
    >
      {/* Scroll-driven overlay — moves + shrinks as user scrolls */}
      <motion.div
        style={{
          position: "absolute",
          left: scrollX,
          top:  scrollY,
          // Counteract the parent's fixed position so scroll values are in viewport space
          translateX: -heroLeft,
          translateY: -heroTop,
          width:   scrollSize,
          height:  scrollSize,
          opacity: floatOpacity,
        }}
      >
        <Image src={Logo} alt="Crediple" fill className="object-contain" priority />
      </motion.div>
    </motion.div>
  );
}