"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function ScrollNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between pt-5 px-5 pointer-events-none"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        {/* ── Logo slot ── */}
        <div className="min-w-[120px] flex items-center overflow-hidden">
          <AnimatePresence initial={false}>
            {!scrolled && (
              <motion.div
                key="logo"
                className="pointer-events-auto flex items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/"
                  className="flex items-center gap-2 group"
                  aria-label={`${SITE_NAME} home`}
                >
                  <div className="relative w-7 h-7 flex-shrink-0">
                    <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                      <rect x="2"  y="2"  width="11" height="11" rx="2" fill="white" fillOpacity="0.9" />
                      <rect x="15" y="2"  width="11" height="11" rx="2" fill="white" fillOpacity="0.6" />
                      <rect x="2"  y="15" width="11" height="11" rx="2" fill="white" fillOpacity="0.6" />
                      <rect x="15" y="15" width="11" height="11" rx="2" fill="white" fillOpacity="0.3" />
                    </svg>
                  </div>
                  <span className="font-body font-semibold text-white text-base tracking-wide">
                    {SITE_NAME}
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Center nav slot ── */}
        <div className="flex-1 hidden lg:flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false}>
            {!scrolled && (
              <motion.nav
                key="nav"
                className="pointer-events-auto flex items-center border-white/40 border-[0.25px] px-6 py-2 bg-white/15 backdrop-blur-md"
                initial={{ opacity: 0, y: -28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {NAV_LINKS.map((link) => (
                  <div key={link.label} className="relative">
                    {link.hasDropdown ? (
                      <button
                        onMouseEnter={() => setActiveDropdown(link.label)}
                        className={cn(
                          "flex items-center gap-1 px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200",
                          activeDropdown === link.label
                            ? "bg-white/20 text-white"
                            : "text-white hover:bg-white/10",
                        )}
                      >
                        {link.label}
                        <svg
                          className="w-3 h-3 opacity-60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="flex items-center gap-1 px-5 py-2 rounded-full text-sm font-body font-medium text-white hover:bg-white/10 transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    )}

                    {/* Mega dropdown */}
                    {link.hasDropdown && link.dropdown && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 mt-3 bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/10 border border-slate-100/80 p-6 min-w-[520px]"
                        onMouseEnter={() => setActiveDropdown(link.label)}
                      >
                        <div className="flex gap-8">
                          {link.dropdown.columns.map((col) => (
                            <div key={col.heading} className="flex-1">
                              <div className="flex items-center gap-1.5 mb-3">
                                <span className="font-body text-xs font-bold text-slate-900 tracking-widest uppercase">
                                  {col.heading}
                                </span>
                                <svg
                                  className="w-3 h-3 text-blue-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                              </div>
                              <div className="h-px bg-slate-100 mb-3" />
                              {col.items.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="block py-1.5 text-sm text-slate-500 hover:text-blue-600 font-body transition-colors"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>

        {/* ── Right: placeholder to maintain flex spacing ── */}
        <div className="min-w-[120px]" />
      </motion.header>

      {/*
        MobileMenu is ALWAYS mounted — never destroyed mid-animation.
        It receives `scrolled` and controls its own trigger visibility.
      */}
      <MobileMenu scrolled={scrolled} />
    </>
  );
}