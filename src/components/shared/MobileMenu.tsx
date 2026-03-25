"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Plus } from "lucide-react";
import { MOBILE_NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-[#F7F6F2] shadow-2xl flex flex-col"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/60">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7">
                  <div className="absolute inset-0 bg-blue-600 rounded-md" />
                  <div className="absolute inset-1.5 bg-white rounded-sm" />
                  <div className="absolute inset-2.5 bg-blue-600 rounded-[2px]" />
                </div>
                <span className="font-display font-bold text-slate-900">{SITE_NAME}</span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-200/60 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-6 pt-6 overflow-y-auto">
              {MOBILE_NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-5 border-b border-slate-200/60 group"
                  >
                    <span className="font-display text-3xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {link.label}
                    </span>
                    <Plus className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:rotate-45 transition-all duration-200" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="px-6 py-6 border-t border-slate-200/60"
            >
              <p className="text-xs font-body text-slate-400 uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex items-center gap-5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-body text-slate-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
