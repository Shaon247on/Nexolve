"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NUM_BARS = 9;

export default function LoadingReveal() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 18;
      });
    }, 120);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center pointer-events-none"
          exit={{ opacity: 1 }}
        >
          {/* Loading content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 flex flex-col items-center"
            >
              {/* Geometric logo */}
              <div className="relative w-14 h-14 mb-6">
                <motion.div
                  className="absolute inset-0 bg-blue-600 rounded-lg"
                  animate={{ rotate: [0, 45, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-2 bg-white rounded"
                  animate={{ rotate: [0, -45, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-4 bg-blue-600 rounded-sm"
                />
              </div>
              <motion.span
                className="font-display text-white text-3xl font-bold tracking-[0.15em] uppercase"
                initial={{ opacity: 0, letterSpacing: "0.4em" }}
                animate={{ opacity: 1, letterSpacing: "0.15em" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Nexus
              </motion.span>
              <motion.span
                className="font-body text-blue-200/60 text-xs tracking-[0.3em] uppercase mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Design & Strategy
              </motion.span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-48 h-px bg-white/10 relative overflow-hidden"
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-blue-400"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut" }}
              />
            </motion.div>
            <motion.span
              className="font-body text-white/30 text-xs tracking-widest mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.span>
          </motion.div>

          {/* Bars overlay */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: NUM_BARS }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 h-full loading-bar"
                style={{
                  background: i % 2 === 0
                    ? `rgb(10, 20, 60)`
                    : `rgb(15, 30, 80)`,
                }}
                initial={{ y: "0%" }}
                exit={{
                  y: "-100%",
                  transition: {
                    duration: 0.75,
                    delay: i * 0.055,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}