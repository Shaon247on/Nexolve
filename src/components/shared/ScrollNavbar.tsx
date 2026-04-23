"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function ScrollNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeNested, setActiveNested] = useState<string | null>(null);
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";

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
        <div className="min-w-30 flex items-center overflow-hidden">
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
                  {/* <div className="relative w-7 h-7shrink-0">
                    <svg
                      viewBox="0 0 28 28"
                      fill="none"
                      className="w-full h-full"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="11"
                        height="11"
                        rx="2"
                        fill="white"
                        fillOpacity="0.9"
                      />
                      <rect
                        x="15"
                        y="2"
                        width="11"
                        height="11"
                        rx="2"
                        fill="white"
                        fillOpacity="0.6"
                      />
                      <rect
                        x="2"
                        y="15"
                        width="11"
                        height="11"
                        rx="2"
                        fill="white"
                        fillOpacity="0.6"
                      />
                      <rect
                        x="15"
                        y="15"
                        width="11"
                        height="11"
                        rx="2"
                        fill="white"
                        fillOpacity="0.3"
                      />
                    </svg>
                  </div> */}
                  <div className="relative w-7 h-7 shrink-0">
                    <Image
                      src="/fav-icon.png"
                      alt="logo icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span
                    className={cn(
                      "font-body font-semibold text-base tracking-wide",
                      isHomeRoute ? "text-white" : "text-black",
                    )}
                  >
                    {SITE_NAME}
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 hidden lg:flex items-center justify-center overflow-visible">
          <AnimatePresence initial={false}>
            {!scrolled && (
              <motion.nav
                key="nav"
                className="pointer-events-auto flex items-center border-white/40 border-[0.25px] px-6 py-2 bg-white/15 backdrop-blur-md overflow-visible"
                initial={{ opacity: 0, y: -28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setActiveNested(null);
                }}
              >
                {NAV_LINKS.map((link) => (
                  <div key={link.label} className="relative">
                    {link.hasDropdown ? (
                      <button
                        onMouseEnter={() => {
                          setActiveDropdown(link.label);
                          setActiveNested(null);
                        }}
                        className={cn(
                          "flex items-center gap-1 px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200",
                          activeDropdown === link.label
                            ? isHomeRoute
                              ? "bg-white/20 text-white"
                              : "bg-black/5 text-black"
                            : isHomeRoute
                              ? "text-white hover:bg-white/10"
                              : "text-black hover:bg-black/5",
                        )}
                      >
                        {link.label}
                        <motion.svg
                          className="w-3 h-3 opacity-60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          animate={{
                            rotate: activeDropdown === link.label ? 180 : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </motion.svg>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-1 px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200",
                          activeDropdown === link.label
                            ? isHomeRoute
                              ? "bg-white/20 text-white"
                              : "bg-black/5 text-black"
                            : isHomeRoute
                              ? "text-white hover:bg-white/10"
                              : "text-black hover:bg-black/5",
                        )}
                      >
                        {link.label}
                      </Link>
                    )}

                    <AnimatePresence>
                      {link.hasDropdown &&
                        link.dropdown &&
                        activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{
                              duration: 0.25,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute top-full left-0 mt-3 bg-white backdrop-blur-xl shadow-2xl shadow-black/10 border border-slate-100/80 p-6 min-w-130 overflow-visible origin-top"
                            onMouseEnter={() => setActiveDropdown(link.label)}
                          >
                            <div className="flex gap-8">
                              {link.dropdown.columns.map((col, colIndex) => (
                                <motion.div
                                  key={col.heading}
                                  className="flex-1"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: colIndex * 0.05,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                >
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
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 17L17 7M17 7H7M17 7v10"
                                      />
                                    </svg>
                                  </div>

                                  <div className="h-px bg-slate-100 mb-3" />

                                  <div className="space-y-1">
                                    {col.items.map((item, itemIndex) => {
                                      const hasChildren =
                                        "children" in item &&
                                        Array.isArray(item.children) &&
                                        item.children.length > 0;

                                      return (
                                        <motion.div
                                          key={item.label}
                                          className="relative"
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{
                                            duration: 0.25,
                                            delay:
                                              colIndex * 0.05 +
                                              itemIndex * 0.03,
                                            ease: [0.22, 1, 0.36, 1],
                                          }}
                                          onMouseEnter={() => {
                                            if (hasChildren) {
                                              setActiveNested(
                                                `${link.label}-${item.label}`,
                                              );
                                            } else {
                                              setActiveNested(null);
                                            }
                                          }}
                                        >
                                          <Link
                                            href={item.href}
                                            className="flex items-center justify-between py-2 px-2 rounded-md text-sm text-slate-500 hover:text-blue-600 hover:bg-slate-50 font-body transition-colors"
                                          >
                                            <span>{item.label}</span>

                                            {hasChildren && (
                                              <motion.svg
                                                className="w-4 h-4 text-slate-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                animate={{
                                                  x:
                                                    activeNested ===
                                                    `${link.label}-${item.label}`
                                                      ? 2
                                                      : 0,
                                                }}
                                                transition={{ duration: 0.2 }}
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M9 5l7 7-7 7"
                                                />
                                              </motion.svg>
                                            )}
                                          </Link>
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>

        <div className="min-w-30" />
      </motion.header>

      <MobileMenu scrolled={scrolled} />
    </>
  );
}
