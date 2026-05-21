"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/yaka_logo.png";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 3 000ms total: overlay fades at 3 000ms (600ms fade) → onComplete at 3 600ms
    // FloatingLogo mounts at onComplete with opacity:1 from the same center spot
    const t1 = setTimeout(() => setVisible(false), 3000);
    const t2 = setTimeout(() => onComplete(), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "var(--loader-bg)" }}
        >
          {/* Ambient glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 400, height: 400,
              background: "radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(59,130,246,0.08) 45%, transparent 70%)",
              filter: "blur(28px)",
            }}
          />

          {/* Logo — zooms in once, then stays. FloatingLogo picks it up seamlessly. */}
          <motion.div
            initial={{ scale: 3.5, opacity: 0, filter: "blur(18px)" }}
            animate={{ scale: 1,   opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            <div style={{ width: 110, height: 110, position: "relative" }}>
              <Image src={Logo} alt="Crediple" fill className="object-contain" priority />
            </div>

            {/* Shimmer bar */}
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 80, height: 2, background: "var(--border)" }}
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="h-full w-1/2 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--accent-color), var(--accent-secondary), transparent)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
