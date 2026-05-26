"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";

import Loader from "@/components/animations/Loader";
import FloatingLogo from "@/components/animations/FloatingLogo";
import ScrollButton from "@/components/ui/ScrollButton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  /**
   * Prevent:
   * - loader replay
   * - blank screen on back button
   * - bfcache restore issues
   */
  const [loaderDone, setLoaderDone] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return !isHome;
    }

    const alreadyRan =
      sessionStorage.getItem("crediple-loader-done") === "1";

    return !isHome || alreadyRan;
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  /**
   * Global page scroll progress
   */
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  });

  /**
   * Fix external-site back navigation blank screen
   */
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setLoaderDone(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setLoaderDone(true);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener(
        "pageshow",
        handlePageShow
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  /**
   * Save loader completion
   */
  const handleLoaderComplete = () => {
    sessionStorage.setItem("crediple-loader-done", "1");
    setLoaderDone(true);
  };

  return (
    <>
      {/* Global top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] origin-left h-[3px] pointer-events-none"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6)",
        }}
      />

      {/* First homepage loader only */}
      {isHome && !loaderDone && (
        <Loader onComplete={handleLoaderComplete} />
      )}

      {/* Floating logo */}
      <FloatingLogo
        loaderDone={loaderDone}
        isHome={isHome}
        onScrollProgress={setScrollProgress}
      />

      {/* Main App */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
          }}
          style={{
            visibility: loaderDone ? "visible" : "hidden",
          }}
          className="relative flex min-h-screen flex-col overflow-hidden"
        >
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar scrollProgress={scrollProgress} />

            <main className="flex-1">{children}</main>

            <Footer />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Scroll To Top */}
      <ScrollButton />
    </>
  );
}