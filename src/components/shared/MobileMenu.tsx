"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { X } from "lucide-react";

const SOCIALS = [
  { label: "Twitter",   href: "#", icon: "𝕏" },
  { label: "Facebook",  href: "#", icon: "f" },
  { label: "LinkedIn",  href: "#", icon: "in" },
  { label: "Instagram", href: "#", icon: "◎" },
  { label: "Youtube",   href: "#", icon: "▶" },
];

// inset(top right bottom left)
// "button": show only the top-right pill region — clip away bottom 92% and left 75%
// "panel":  show everything — no clip
const containerVariants = {
  button: {
    clipPath: "inset(0% 0% 92% 75% round 999px)",
    transition: {
      duration: 0.52,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  panel: {
    clipPath: "inset(0% 0% 0% 0% round 28px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  hidden: {
    clipPath: "inset(0% 0% 100% 100% round 999px)",
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

const navListVariants = {
  hidden: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 as const },
  },
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const navItemVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const footerVariants = {
  hidden: {
    opacity: 0,
    y: 14,
    transition: { duration: 0.18, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.32,
    },
  },
};

interface MobileMenuProps {
  scrolled: boolean;
}

export default function MobileMenu({ scrolled }: MobileMenuProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  const handleClose = useCallback(() => {
    setNavVisible(false);
    setTimeout(() => setPanelOpen(false), 280);
  }, []);

  const handleOpen = () => {
    setPanelOpen(true);
    setTimeout(() => setNavVisible(true), 560);
  };

  // Collapse panel when user scrolls back to top
  useEffect(() => {
    if (!scrolled && panelOpen) handleClose();
  }, [scrolled, panelOpen, handleClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = panelOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [panelOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && panelOpen) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [panelOpen, handleClose]);

  // Derive which variant to show
  const containerState = !scrolled ? "hidden" : panelOpen ? "panel" : "button";

  return (
    <div
      className="fixed z-[70]"
      style={{
        top: 12,
        right: 12,
        width: "min(560px, calc(100vw - 24px))",
        height: "calc(100vh - 24px)",
        pointerEvents: "none",
      }}
    >
      {/* Backdrop */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[-1] bg-black/30 backdrop-blur-sm"
            style={{ pointerEvents: "auto" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Morphing surface */}
      <motion.div
        className="absolute top-0 right-0 w-full h-full overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #f0f0ef 0%, #e8e8e7 100%)",
          borderRadius: 28,
          boxShadow: panelOpen
            ? "0 32px 80px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.08)"
            : "0 2px 12px rgba(0,0,0,0.10)",
          pointerEvents: scrolled ? "auto" : "none",
        }}
        variants={containerVariants}
        initial="hidden"
        animate={containerState}
      >
        {/* Pill trigger button */}
        <AnimatePresence>
          {scrolled && !panelOpen && (
            <motion.button
              key="trigger-btn"
              onClick={handleOpen}
              aria-label="Open menu"
              className="absolute top-0 py-6.5 px-8 right-0 rounded-full w-35 flex items-center gap-2 text-sm font-body font-medium text-[#1a1a1a]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.1, delay: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
            >
              <span className="hidden lg:inline text-sm w-full tracking-wider uppercase font-semibold">
                Menu
              </span>
              <svg className="size-6" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.85" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.85" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Full panel content */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              key="panel-body"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.18, delay: 0.28 } }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 pt-8 pb-2 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6">
                    <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                      <rect x="2"  y="2"  width="11" height="11" rx="2" fill="#333" fillOpacity="0.85" />
                      <rect x="15" y="2"  width="11" height="11" rx="2" fill="#333" fillOpacity="0.55" />
                      <rect x="2"  y="15" width="11" height="11" rx="2" fill="#333" fillOpacity="0.55" />
                      <rect x="15" y="15" width="11" height="11" rx="2" fill="#333" fillOpacity="0.25" />
                    </svg>
                  </div>
                  <span className="font-body font-semibold text-[#222] text-base tracking-wide">
                    {SITE_NAME}
                  </span>
                </div>
                <motion.button
                  onClick={handleClose}
                  aria-label="Close menu"
                  className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/8 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="hover:rotate-90 transform duration-300"/>
                </motion.button>
              </div>

              {/* Divider */}
              <motion.div
                className="mx-8 h-px bg-black/10 mt-4 mb-2 shrink-0"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center px-8 py-4 gap-1 overflow-hidden">
                <motion.div
                  variants={navListVariants}
                  initial="hidden"
                  animate={navVisible ? "visible" : "hidden"}
                >
                  {NAV_LINKS.map((link) => (
                    <motion.div
                      key={link.label}
                      variants={navItemVariants}
                      className="group flex items-center justify-between py-3 border-b border-black/[0.07] last:border-0 cursor-pointer"
                    >
                      <Link
                        href={link.href}
                        onClick={handleClose}
                        className="font-body font-black text-[#1a1a1a] group-hover:text-blue-400 tracking-tight leading-none group-hover:translate-x-2 transition-all duration-300"
                        style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}
                      >
                        {link.label}
                      </Link>
                      <span className="text-[#888] text-2xl font-light leading-none group-hover:rotate-45 group-hover:text-[#333] transition-all duration-300 shrink-0 ml-4">
                        +
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </nav>

              {/* Footer */}
              <motion.div
                className="px-8 pb-8 pt-4 shrink-0"
                variants={footerVariants}
                initial="hidden"
                animate={navVisible ? "visible" : "hidden"}
              >
                <div className="h-px bg-black/10 mb-5" />
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {SOCIALS.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      className="flex items-center gap-1.5 text-[#555] hover:text-[#111] transition-colors duration-200 group"
                    >
                      <span className="text-xs font-bold text-[#888] group-hover:text-[#333] transition-colors font-mono w-4 text-center">
                        {s.icon}
                      </span>
                      <span className="font-body text-sm font-medium tracking-wide">
                        {s.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}