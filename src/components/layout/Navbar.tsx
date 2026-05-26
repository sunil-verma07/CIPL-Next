"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV_LINKS as navLinks } from "@/utils/siteData";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import enterprise_light from '@/assets/yaka_light.png';
import enterprise_dark from '@/assets/yaka_dark.png';
import crediple_light from '@/assets/crediple_light.png';
import crediple_dark from '@/assets/crediple_dark.png';
import Image from "next/image";

// ── Animation variants ────────────────────────────────────────────────────────
const mobileDrawer = {
  hidden: { opacity: 0, y: -10, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1,  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
  exit:   { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.2 } },
};
const mobileContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.065, delayChildren: 0.06 } },
};
const mobileItem = {
  hidden: { opacity: 0, x: -14 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const } },
};

interface NavbarProps {
  scrollProgress?: number;
}

export default function Navbar({ scrollProgress = 0 }: NavbarProps) {
  const pathname = usePathname();
  const { isDark } = useTheme();

  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted,    setMounted]    = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isScrolled   = mounted && scrolled;
  const yakaVisible  = mounted && scrollProgress > 0.72;
  const yakaArrived  = mounted && scrollProgress > 0.85;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Glass bar */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              key="glass-bar"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
              style={{
                background:           isDark ? "rgba(2,6,23,0.75)"    : "rgba(248,250,252,0.88)",
                backdropFilter:       "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom:         isDark ? "1px solid rgba(147,197,253,0.10)" : "1px solid rgba(15,23,42,0.08)",
                boxShadow:            isDark ? "0 4px 40px rgba(0,0,0,0.35)"      : "0 4px 24px rgba(0,0,0,0.08)",
              }}
            />
          )}
        </AnimatePresence>


        <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 h-16 flex items-center gap-4">

          {/* ── Crediple logo (left) ── */}
          <Link href="/" className="shrink-0 no-underline z-10 flex items-center" aria-label="Crediple home">
            <Image
              src={isDark ? crediple_dark : crediple_light}
              alt="Crediple"
              width={100}
              height={76}
            />
          </Link>

          {/* ── Desktop: nav links + ThemeToggle + Contact (fills space, right-aligned to Yaka) ── */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-3 z-10">

            {/* Nav links — spring left when yaka arrives */}
            <motion.nav
              className="flex items-center gap-4"
              animate={{ x: yakaArrived ? -6 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
            >
              {navLinks.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="relative inline-flex items-center gap-3 px-4 py-2 rounded-full text-[0.88rem] font-medium tracking-wide no-underline transition-all duration-200"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        color:      active ? (isDark ? "#ffffff" : "#0f172a")                            : (isDark ? "rgba(255,255,255,0.58)" : "rgba(15,23,42,0.50)"),
                        background: active ? (isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.07)") : (isDark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.03)"),
                        border:     active ? (isDark ? "1px solid rgba(147,197,253,0.28)" : "1px solid rgba(15,23,42,0.14)") : (isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(15,23,42,0.06)"),
                        boxShadow:  active ? (isDark ? "0 0 20px rgba(96,165,250,0.15),inset 0 1px 0 rgba(255,255,255,0.10)" : "0 0 12px rgba(15,23,42,0.06)") : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.color       = isDark ? "rgba(255,255,255,0.88)" : "rgba(15,23,42,0.85)";
                          e.currentTarget.style.background  = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)";
                          e.currentTarget.style.borderColor = isDark ? "rgba(147,197,253,0.18)" : "rgba(15,23,42,0.12)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.color       = isDark ? "rgba(255,255,255,0.58)" : "rgba(15,23,42,0.50)";
                          e.currentTarget.style.background  = isDark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.03)";
                          e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.06)";
                        }
                      }}
                    >
                      {link.label}
                      {link.hasDropdown && <ChevronDown size={12} className="opacity-50 mt-px" />}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Divider */}
            <div
              className="h-5 w-px shrink-0 mx-14"
              style={{ background: isDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.10)" }}
            />

            <ThemeToggle />

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-[0.88rem] font-semibold tracking-wide no-underline transition-all duration-200 active:scale-95 shrink-0"
              style={{
                fontFamily: "'Jost', sans-serif",
                background: isDark ? "rgba(255,255,255,0.95)" : "#0f172a",
                color:      isDark ? "#020617"                : "#f8fafc",
                boxShadow:  isDark ? "0 0 24px rgba(147,197,253,0.20)" : "0 2px 12px rgba(15,23,42,0.18)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Contact us
            </Link>
          </div>

          {/* ── Yaka icon — far right, slides in from below on scroll ── */}
          <AnimatePresence>
            {yakaVisible && (
              <motion.div
                key="yaka-nav"
                initial={{ opacity: 0, y: 20, scale: 0.6  }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0, y: 14,  scale: 0.75 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
                className="hidden md:flex items-center shrink-0 z-10"
                style={{ marginLeft: 4 }}
              >
                <Image
                  src={isDark ? enterprise_dark : enterprise_light}
                  alt="Yaka"
                  width={34}
                  height={34}
                  style={{ display: "block" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Mobile: ThemeToggle + Hamburger ── */}
          <div className="md:hidden flex items-center gap-2 z-10 ml-auto">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.88 }}
              className="p-2.5 rounded-xl flex items-center justify-center"
              style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.05)",
                border:     isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(15,23,42,0.10)",
                color:      isDark ? "rgba(255,255,255,0.8)"  : "rgba(15,23,42,0.8)",
                cursor:     "pointer",
              }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block leading-none"
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

        </div>
      </motion.header>

      {/* ── Mobile Drawer ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: isDark ? "rgba(0,0,0,0.55)" : "rgba(15,23,42,0.30)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="drawer"
              variants={mobileDrawer} initial="hidden" animate="show" exit="exit"
              className="fixed top-[72px] left-3 right-3 z-50 md:hidden rounded-2xl overflow-hidden"
              style={{
                background:           isDark ? "rgba(6,12,30,0.96)"    : "rgba(248,250,252,0.97)",
                backdropFilter:       "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border:               isDark ? "1px solid rgba(147,197,253,0.14)" : "1px solid rgba(15,23,42,0.10)",
                boxShadow:            isDark ? "0 28px 80px rgba(0,0,0,0.55)"     : "0 20px 60px rgba(15,23,42,0.12)",
              }}
            >
              {/* Brand strip */}
              <div
                className="flex items-center gap-3 px-4 pt-4 pb-3"
                style={{ borderBottom: isDark ? "1px solid rgba(147,197,253,0.08)" : "1px solid rgba(15,23,42,0.07)" }}
              >
                <Image src={isDark ? enterprise_dark : enterprise_light} alt="Yaka" width={28} height={28} />
                <Image
                  src={isDark ? crediple_dark : crediple_light}
                  alt="Crediple"
                  width={100}
                  height={38}
                  style={{ height: 22, width: "auto" }}
                />
              </div>

              <motion.nav variants={mobileContainer} initial="hidden" animate="show" className="flex flex-col p-3 gap-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div key={link.label} variants={mobileItem}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[0.93rem] font-medium no-underline transition-all duration-150"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          color:      active ? (isDark ? "#ffffff" : "#0f172a") : (isDark ? "rgba(255,255,255,0.58)" : "rgba(15,23,42,0.55)"),
                          background: active ? (isDark ? "rgba(147,197,253,0.12)" : "rgba(15,23,42,0.07)") : "transparent",
                          border:     active ? (isDark ? "1px solid rgba(147,197,253,0.20)" : "1px solid rgba(15,23,42,0.10)") : "1px solid transparent",
                        }}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{link.label}</span>
                        {link.hasDropdown && <ChevronDown size={14} style={{ opacity: 0.4, color: isDark ? "#fff" : "#0f172a" }} />}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <div style={{ height: "1px", background: isDark ? "rgba(147,197,253,0.08)" : "rgba(15,23,42,0.07)", margin: "0 12px" }} />

              <motion.div variants={mobileItem} className="p-3">
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-4 py-3.5 rounded-xl text-[0.93rem] font-semibold no-underline transition-all duration-150 active:scale-[0.98]"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    background: isDark ? "rgba(255,255,255,0.95)" : "#0f172a",
                    color:      isDark ? "#020617"                : "#f8fafc",
                    boxShadow:  isDark ? "0 0 28px rgba(147,197,253,0.18)" : "0 4px 16px rgba(15,23,42,0.22)",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  Contact us
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}