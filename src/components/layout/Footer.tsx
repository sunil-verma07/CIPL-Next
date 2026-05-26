"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  FOOTER_QUICK_LINKS,
  FOOTER_BRANDS,
  FOOTER_LEGAL,
  FOOTER_TAGLINE,
  FOOTER_COPYRIGHT,
} from "@/utils/siteData";
import crediple_light from "@/assets/crediple_light.png";
import crediple_dark from "@/assets/crediple_dark.png";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const SOCIALS = [
  { Icon: FaXTwitter, href: "#", label: "X / Twitter" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const update = () =>
      setIsDark(!document.documentElement.classList.contains("light"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-0">
      <h4
        className="text-[14px] sm:text-[15px] font-semibold mb-4 sm:mb-5 tracking-wide"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h4>
      <ul className="flex flex-col gap-3 sm:gap-[14px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[13px] sm:text-[14px] leading-none transition-colors duration-150 no-underline"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent-color)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(180deg, rgba(3,7,18,0.95) 0%, rgba(2,6,23,1) 100%)"
          : "linear-gradient(180deg, #e8f0ff 0%, #eef4ff 100%)",
        borderTop: `1px solid ${isDark ? "rgba(147,197,253,0.1)" : "rgba(29,78,216,0.1)"}`,
        transition: "background 0.5s ease, border-color 0.5s ease",
      }}
    >
      {/* Top ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[220px] w-[600px] -translate-x-1/2"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, rgba(96,165,250,0.14), transparent 66%)"
            : "radial-gradient(ellipse at center, rgba(29,78,216,0.08), transparent 66%)",
          filter: "blur(54px)",
          transition: "background 0.5s ease",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 py-12 sm:py-14 px-5 sm:px-8">
        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-10 sm:gap-12 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Brand block */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 max-w-[280px] sm:max-w-[300px]"
          >
            {/* Logo / name */}
            <div className="inline-flex items-start gap-2 flex-col">
              <Image
                src={isDark ? crediple_dark : crediple_light}
                alt="Crediple"
                width={100}
              />
              <p style={{ color: "var(--text-secondary)", fontSize: "12px" }}>
                A{" "}
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                  YAKA
                </span>{" "}
                Brand
              </p>
            </div>

            {/* Tagline */}
            <p
              className="text-[13px] leading-[1.75]"
              style={{
                color: "var(--text-secondary)",
                transition: "color 0.4s ease",
              }}
            >
              {FOOTER_TAGLINE}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(29,78,216,0.06)",
                    border: `1px solid ${isDark ? "rgba(147,197,253,0.14)" : "rgba(29,78,216,0.14)"}`,
                    color: isDark
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(12,26,53,0.55)",
                    transition:
                      "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = isDark ? "#93c5fd" : "#1d4ed8";
                    el.style.borderColor = isDark
                      ? "rgba(147,197,253,0.4)"
                      : "rgba(29,78,216,0.4)";
                    el.style.background = isDark
                      ? "rgba(96,165,250,0.1)"
                      : "rgba(29,78,216,0.09)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = isDark
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(12,26,53,0.55)";
                    el.style.borderColor = isDark
                      ? "rgba(147,197,253,0.14)"
                      : "rgba(29,78,216,0.14)";
                    el.style.background = isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(29,78,216,0.06)";
                  }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          <div className="flex flex-row gap-10 sm:gap-16 md:gap-24 lg:gap-32 md:ml-auto">
            <LinkColumn title="Quick Links" links={FOOTER_QUICK_LINKS} />
            <LinkColumn title="Our Brands" links={FOOTER_BRANDS} />
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div
        className="mx-5 sm:mx-8"
        style={{
          height: 1,
          background: isDark ? "rgba(147,197,253,0.1)" : "rgba(29,78,216,0.1)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Bottom bar */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 py-4 sm:py-5 px-5 sm:px-8"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Copyright */}
          <p
            className="text-[12px] sm:text-[13px] order-2 sm:order-1 text-center sm:text-left"
            style={{
              color: "var(--text-muted)",
              transition: "color 0.4s ease",
            }}
          >
            {FOOTER_COPYRIGHT}
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-1 order-1 sm:order-2 flex-wrap justify-center">
            {FOOTER_LEGAL.map((link, i) => (
              <span key={link.href} className="flex items-center gap-1">
                {i > 0 && (
                  <span
                    className="text-[10px] select-none"
                    style={{ color: "var(--text-muted)" }}
                    aria-hidden
                  >
                    •
                  </span>
                )}
                <Link
                  href={link.href}
                  className="text-[12px] sm:text-[13px] transition-colors duration-150 no-underline"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
