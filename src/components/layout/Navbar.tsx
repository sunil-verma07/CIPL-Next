"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV_LINKS as navLinks } from "@/utils/siteData";

const ctaVariant = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.65 } },
};

const mobileDrawer = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.2 } },
};

const mobileContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const mobileItem = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Navbar({ logoInNavbar: _logoInNavbar }: { logoInNavbar?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isScrolled = mounted && scrolled;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* ── Scrolled: glass bar ── */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              key="glass-bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
              style={{
                background: 'rgba(2, 6, 23, 0.72)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(147,197,253,0.10)',
                boxShadow: '0 4px 40px rgba(0,0,0,0.35)',
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="shrink-0 no-underline z-10" aria-label="Crediple home">
            <span
              className="text-[2.15rem] font-bold tracking-tight select-none"
              style={{
                fontFamily: "'Jost', sans-serif",
                background: "linear-gradient(135deg, #ffffff, #93c5fd 55%, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Crediple
            </span>
          </Link>

          {/* Desktop nav — individual pill buttons */}
          <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
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
                    className="relative inline-flex items-center gap-1 px-5 py-2 rounded-full text-[0.88rem] font-medium tracking-wide no-underline transition-all duration-200"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      color: active ? '#ffffff' : 'rgba(255,255,255,0.58)',
                      background: active
                        ? 'rgba(255,255,255,0.12)'
                        : 'rgba(255,255,255,0.04)',
                      border: active
                        ? '1px solid rgba(147,197,253,0.28)'
                        : '1px solid rgba(255,255,255,0.07)',
                      boxShadow: active
                        ? '0 0 20px rgba(96,165,250,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.88)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.borderColor = 'rgba(147,197,253,0.18)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.58)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      }
                    }}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown size={12} className="opacity-50 mt-px" />}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Desktop right actions */}
          <motion.div
            variants={ctaVariant}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center gap-3 z-10"
          >
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-[0.88rem] font-semibold tracking-wide no-underline transition-all duration-200 active:scale-95"
              style={{
                fontFamily: "'Jost', sans-serif",
                background: 'rgba(255,255,255,0.95)',
                color: '#020617',
                boxShadow: '0 0 24px rgba(147,197,253,0.20)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.95)')}
            >
              Contact us
            </Link>
          </motion.div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2 z-10">
            <button
              className="p-2 rounded-full transition-colors duration-150"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
              }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block leading-none"
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              variants={mobileDrawer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-16 left-4 right-4 z-50 md:hidden rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(8, 15, 35, 0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(147,197,253,0.12)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
              }}
            >
              <motion.nav
                variants={mobileContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col p-3 gap-1"
              >
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div key={link.label} variants={mobileItem}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-[0.92rem] font-medium no-underline transition-all duration-150"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          color: active ? '#ffffff' : 'rgba(255,255,255,0.60)',
                          background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
                          border: active ? '1px solid rgba(147,197,253,0.18)' : '1px solid transparent',
                        }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                        {link.hasDropdown && <ChevronDown size={14} className="opacity-40" />}
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.nav>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(147,197,253,0.08)', margin: '0 12px' }} />

              {/* CTA */}
              <motion.div variants={mobileItem} className="p-3">
                <Link
                  href="/contact"
                  className="block text-center px-4 py-3 rounded-xl text-[0.92rem] font-semibold no-underline transition-opacity duration-150 hover:opacity-90 active:scale-[0.98]"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    background: 'rgba(255,255,255,0.95)',
                    color: '#020617',
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