"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// ─── Responsive tokens ────────────────────────────────────────────────────────
// All sizing decisions live here. Change one value → every usage updates.
const PANEL = {
  // Outer container inset from the viewport edge (px)
  edgeGap: 12,
  // Maximum panel width before it clips to the viewport
  maxWidth: 560,
  // Border radius of the expanded panel
  radius: 28,
} as const;

// Horizontal padding used consistently for every panel section
const PX = "px-6 sm:px-8";
// The big nav link font size — clamp keeps it fluid between screen sizes
const NAV_FONT = "clamp(1.75rem, 6vw, 3rem)";

// ─── Static data ──────────────────────────────────────────────────────────────
const SOCIALS = [
  { label: "Twitter",   href: "#", icon: "𝕏"  },
  { label: "Facebook",  href: "#", icon: "f"   },
  { label: "LinkedIn",  href: "#", icon: "in"  },
  { label: "Instagram", href: "#", icon: "◎"  },
  { label: "Youtube",   href: "#", icon: "▶"  },
];

// ─── Framer Motion variants ───────────────────────────────────────────────────
// Kept 100 % identical to the original — zero animation changes.

type Easing = [number, number, number, number];
const EASE_IN:  Easing = [0.76, 0, 0.24, 1];
const EASE_OUT: Easing = [0.22, 1, 0.36, 1];

const containerVariants = {
  button: {
    clipPath: "inset(0% 0% 93% 75% round 999px)",
    transition: { duration: 0.52, ease: EASE_IN },
  },
  panel: {
    clipPath: `inset(0% 0% 0% 0% round ${PANEL.radius}px)`,
    transition: { duration: 0.6,  ease: EASE_OUT },
  },
  hidden: {
    clipPath: "inset(0% 0% 100% 100% round 999px)",
    transition: { duration: 0.3,  ease: EASE_IN },
  },
};

const navListVariants = {
  hidden:   { transition: { staggerChildren: 0.04, staggerDirection: -1 as const } },
  visible:  { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const navItemVariants = {
  hidden:  { opacity: 0, y: -20, transition: { duration: 0.2,  ease: EASE_IN  } },
  visible: { opacity: 1, y:   0, transition: { duration: 0.4,  ease: EASE_OUT } },
};

const footerVariants = {
  hidden:  { opacity: 0, y: 14, transition: { duration: 0.18, ease: EASE_IN  } },
  visible: { opacity: 1, y:  0, transition: { duration: 0.38, ease: EASE_OUT, delay: 0.32 } },
};

const nestedMenuVariants = {
  closed: { height: 0,      opacity: 0, marginTop: 0,  transition: { duration: 0.28, ease: EASE_IN  } },
  open:   { height: "auto", opacity: 1, marginTop: 12, transition: { duration: 0.34, ease: EASE_OUT } },
};

const nestedItemVariants = {
  closed: { opacity: 0, y: -6, transition: { duration: 0.18 } },
  open: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, delay: index * 0.04, ease: EASE_OUT },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

interface MobileMenuProps {
  scrolled: boolean;
}

export default function MobileMenu({ scrolled }: MobileMenuProps) {
  const [panelOpen,    setPanelOpen]    = useState(false);
  const [navVisible,   setNavVisible]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    setNavVisible(false);
    setOpenDropdown(null);
    setTimeout(() => setPanelOpen(false), 280);
  }, []);

  const handleOpen = () => {
    setPanelOpen(true);
    setTimeout(() => setNavVisible(true), 560);
  };

  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  // Close when navbar hides
  useEffect(() => {
    if (!scrolled && panelOpen) handleClose();
  }, [scrolled, panelOpen, handleClose]);

  // Lock body scroll while panel is open
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

  const containerState = !scrolled ? "hidden" : panelOpen ? "panel" : "button";

  // Derived layout values from the single PANEL token object
  const panelWidth  = `min(${PANEL.maxWidth}px, calc(100vw - ${PANEL.edgeGap * 2}px))`;
  const panelHeight = `calc(100vh - ${PANEL.edgeGap * 2}px)`;

  return (
    <div
      className="fixed z-[70]"
      style={{
        top:          PANEL.edgeGap,
        right:        PANEL.edgeGap,
        width:        panelWidth,
        height:       panelHeight,
        pointerEvents: "none",
      }}
    >
      {/* ── Backdrop ── */}
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

      {/* ── Morphing container ── */}
      <motion.div
        className="absolute top-0 right-0 w-full h-full overflow-hidden"
        style={{
          background:  "linear-gradient(160deg, #f0f0ef 0%, #e8e8e7 100%)",
          borderRadius: PANEL.radius,
          boxShadow:    panelOpen
            ? "0 32px 80px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.08)"
            : "0 2px 12px rgba(0,0,0,0.10)",
          pointerEvents: scrolled ? "auto" : "none",
        }}
        variants={containerVariants}
        initial="hidden"
        animate={containerState}
      >
        {/* ── Trigger button ── */}
        {/*
          The container's clipPath in "button" state is:
            inset(0% 0% 93% 75% round 999px)
          meaning the visible pill is:
            - height: 7% of the full container  (100vh - 24px)
            - width:  25% of the full container (min(560px, 100vw-24px))
          We position the button to exactly match that pill region
          and center its contents inside it.
        */}
        <AnimatePresence>
          {scrolled && !panelOpen && (
            <motion.button
              key="trigger-btn"
              onClick={handleOpen}
              aria-label="Open menu"
              className="absolute top-0 right-0 flex items-center justify-center gap-2 font-body font-medium text-[#1a1a1a]"
              style={{
                width:  "25%",
                height: "7%",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.1, delay: 0.5 } }}
              exit={{    opacity: 0, transition: { duration: 0.1 } }}
              whileHover={{ scale: 1.04 }}
              whileTap={{  scale: 0.94 }}
            >
              {/* Label only on large screens */}
              <span className="hidden lg:inline text-sm tracking-wider uppercase font-semibold">
                Menu
              </span>

              {/* Grid icon */}
              <svg className="size-6" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.85" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.85" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4"  />
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4"  />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Panel body ── */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              key="panel-body"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.18, delay: 0.28 } }}
              exit={{    opacity: 0, transition: { duration: 0.12 } }}
            >
              {/* Header */}
              <PanelHeader siteName={SITE_NAME} onClose={handleClose} />

              {/* Divider */}
              <motion.div
                className={`mx-6 sm:mx-8 h-px bg-black/10 mt-4 mb-2 shrink-0`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ delay: 0.1, duration: 0.45, ease: EASE_OUT }}
              />

              {/* Nav links — ScrollArea handles overflow when submenus expand */}
              <nav className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                  <div className={`${PX} py-4`}>
                    <motion.div
                      variants={navListVariants}
                      initial="hidden"
                      animate={navVisible ? "visible" : "hidden"}
                    >
                      {NAV_LINKS.map((link) => {
                        const hasNested   = !!link.hasDropdown && !!link.dropdown?.columns?.length;
                        const isOpen      = openDropdown === link.label;
                        const nestedItems = link.dropdown?.columns?.flatMap((c) => c.items) ?? [];

                        return (
                          <NavItem
                            key={link.label}
                            link={link}
                            hasNested={hasNested}
                            isOpen={isOpen}
                            nestedItems={nestedItems}
                            navFont={NAV_FONT}
                            onToggle={toggleDropdown}
                            onClose={handleClose}
                          />
                        );
                      })}
                    </motion.div>
                  </div>
                </ScrollArea>
              </nav>

              {/* Footer socials */}
              <PanelFooter navVisible={navVisible} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
// Extracted so each has a single, clear layout responsibility.
// No design or animation changes — just organised into maintainable pieces.

function PanelHeader({
  siteName,
  onClose,
}: {
  siteName: string;
  onClose: () => void;
}) {
  return (
    <div className={`flex items-center justify-between ${PX} pt-6 sm:pt-8 pb-2 shrink-0`}>
      {/* Logo + site name */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 shrink-0">
          <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
            <rect x="2"  y="2"  width="11" height="11" rx="2" fill="#333" fillOpacity="0.85" />
            <rect x="15" y="2"  width="11" height="11" rx="2" fill="#333" fillOpacity="0.55" />
            <rect x="2"  y="15" width="11" height="11" rx="2" fill="#333" fillOpacity="0.55" />
            <rect x="15" y="15" width="11" height="11" rx="2" fill="#333" fillOpacity="0.25" />
          </svg>
        </div>
        <span className="font-body font-semibold text-[#222] text-base tracking-wide">
          {siteName}
        </span>
      </div>

      {/* Close button */}
      <motion.button
        onClick={onClose}
        aria-label="Close menu"
        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/8 transition-colors shrink-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{  scale: 0.9  }}
      >
        <X className="hover:rotate-90 transform duration-300" />
      </motion.button>
    </div>
  );
}

function NavItem({
  link,
  hasNested,
  isOpen,
  nestedItems,
  navFont,
  onToggle,
  onClose,
}: {
  link: (typeof NAV_LINKS)[number];
  hasNested: boolean;
  isOpen: boolean;
  nestedItems: { href: string; label: string }[];
  navFont: string;
  onToggle: (label: string) => void;
  onClose: () => void;
}) {
  // text-left is critical — <button> defaults to center-aligned text,
  // which caused "Services" / "About" to appear misaligned vs plain links
  const linkClass =
    "flex-1 text-left font-body font-black text-[#1a1a1a] group-hover:text-blue-400 tracking-tight leading-none group-hover:translate-x-2 transition-all duration-300";

  return (
    <motion.div
      variants={navItemVariants}
      className="border-b border-black/[0.07] last:border-0"
    >
      <div className="group flex items-center justify-between py-3 cursor-pointer">
        {hasNested ? (
          <>
            <button
              type="button"
              onClick={() => onToggle(link.label)}
              className={linkClass}
              style={{ fontSize: navFont }}
            >
              {link.label}
            </button>

            <motion.button
              type="button"
              onClick={() => onToggle(link.label)}
              aria-label={`Toggle ${link.label} submenu`}
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.28 }}
              className="text-[#888] text-2xl font-light leading-none group-hover:text-[#333] transition-all duration-300 shrink-0 ml-4"
            >
              +
            </motion.button>
          </>
        ) : (
          <Link
            href={link.href}
            onClick={onClose}
            className={linkClass}
            style={{ fontSize: navFont }}
          >
            {link.label}
          </Link>
        )}
      </div>

      {/* Nested submenu */}
      {hasNested && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key={`${link.label}-submenu`}
              variants={nestedMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden pl-2 pb-4"
            >
              <div className="grid gap-3">
                {nestedItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    custom={index}
                    variants={nestedItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block text-base md:text-lg font-body font-medium text-[#4a4a4a] hover:text-blue-400 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

function PanelFooter({ navVisible }: { navVisible: boolean }) {
  return (
    <motion.div
      className={`${PX} pb-6 sm:pb-8 pt-4 shrink-0`}
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
  );
}