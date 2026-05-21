"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "@/assets/footer_logo.png";
import {
  FOOTER_QUICK_LINKS,
  FOOTER_BRANDS,
  FOOTER_LEGAL,
  FOOTER_TAGLINE,
  FOOTER_COPYRIGHT,
} from "@/utils/siteData";

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeIn = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ── Social links ──────────────────────────────────────────────────────────────
const SOCIALS = [
  { Icon: FaXTwitter,   href: "#", label: "X / Twitter" },
  { Icon: FaInstagram,  href: "#", label: "Instagram" },
  { Icon: FaFacebookF,  href: "#", label: "Facebook" },
  { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

// ── Reusable link column ──────────────────────────────────────────────────────
function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-0">
      <h4
        className="text-[15px] font-semibold mb-5 tracking-wide"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h4>
      <ul className="flex flex-col gap-[14px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[14px] leading-none transition-colors duration-150 no-underline"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-color)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Main footer ───────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(3,7,18,0.92), rgba(2,6,23,1))",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[620px] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center, rgba(96,165,250,0.16), transparent 66%)",
          filter: "blur(54px)",
        }}
        aria-hidden
      />

      {/* ── Main content row ── */}
      <div className="relative z-10 py-14 px-6">
        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-12 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >

          {/* ── LEFT: Brand block ── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 max-w-[300px]"
          >
            <div
              className="inline-flex gap-3 py-3 rounded-full w-fit"
            >

              <span
                className="text-[1.75rem] font-bold tracking-tight"
                style={{
                  color: "var(--accent-secondary)",
                }}
              >
                Crediple
              </span>
            </div>

            {/* Tagline */}
            <p
              className="text-[13px] leading-[1.75] mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {FOOTER_TAGLINE}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-1 mt-1">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-150"
                  style={{
                    background: "var(--muted)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--accent-color)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--icon-accent-border)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Link columns — pushed to the right with ml-auto on md ── */}
          <div className="flex flex-row gap-16 md:gap-24 lg:gap-32 md:ml-auto">
            <LinkColumn title="Quick Links" links={FOOTER_QUICK_LINKS} />
            <LinkColumn title="Our Brands"  links={FOOTER_BRANDS} />
          </div>

        </motion.div>
      </div>

      {/* ── Divider ── */}
      <div
        className="mx-6"
        style={{ height: 1, background: "var(--border)" }}
      />

      {/* ── Bottom bar ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 py-4 px-6"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p
            className="text-[13px] order-2 sm:order-1"
            style={{ color: "var(--text-muted)" }}
          >
            {FOOTER_COPYRIGHT}
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-1 order-1 sm:order-2 flex-wrap justify-center sm:justify-end">
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
                  className="text-[13px] transition-colors duration-150 no-underline"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
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
