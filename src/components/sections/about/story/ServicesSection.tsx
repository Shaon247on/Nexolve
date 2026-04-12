"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import TitleSection from "@/components/element/TitleSection";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";

// ─────────────────────────────────────────────
// Data structure for IT Services
// ─────────────────────────────────────────────
const services = [
  {
    id: "01",
    title: "Enterprise AI & Neural Dynamics",
    description:
      "Architecting distributed training systems and leading the deployment of production-grade LLM pipelines for global scale.",
    pillGradient: "from-blue-500 via-indigo-500 to-purple-600",
    glowColor: "220 80 70", // HSL
    glowColors: ["#4f8ef7", "#60a5fa", "#93c5fd"],
  },
  {
    id: "02",
    title: "Cloud Native Infrastructure",
    description:
      "Optimizing large-scale data ingestion and automated MLOps workflows for high-frequency trading and fintech models.",
    pillGradient: "from-purple-500 via-pink-500 to-red-500",
    glowColor: "270 80 75",
    glowColors: ["#a78bfa", "#c084fc", "#e879f9"],
  },
  {
    id: "03",
    title: "Cybersecurity & Cryptography",
    description:
      "Developing state-of-the-art zero-trust architectures and edge computing protocols for autonomous drone navigation.",
    pillGradient: "from-orange-400 via-amber-500 to-yellow-500",
    glowColor: "38 90 65",
    glowColors: ["#f59e0b", "#fb923c", "#fcd34d"],
  },
  {
    id: "04",
    title: "Data Analytics & Insight Corp",
    description:
      "Built predictive analytics dashboards and performed feature engineering on multi-terabyte datasets for Fortune 500s.",
    pillGradient: "from-emerald-400 via-cyan-500 to-blue-500",
    glowColor: "190 85 65",
    glowColors: ["#06b6d4", "#22d3ee", "#67e8f9"],
  },
];

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  // Smooth out the line growth
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-white py-24 px-6 md:px-12 lg:px-20"
    >
      <TitleSection title="Our Experties" className="text-6xl md:text-8xl lg:text-[128px] xl:text-[200px]" scrollYProgress={scrollYProgress} />
      <div className="max-w-420 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-12 lg:gap-0 mt-30">
        {/* LEFT COLUMN: Sticky Context */}
        <div className="lg:sticky lg:top-32 h-fit space-y-6 lg:pr-20">
          <h2 className="text-6xl md:text-8xl font-medium tracking-tighter text-black">
            Expertise
          </h2>
          <ScrollAnimatedText
            className="text-base md:text-lg lg:text-xl font-normal max-w-lg tracking-normal -mt-16"
            title="Building the backbone of modern IT—delivering production-grade systems with mathematical rigor and operational excellence."
          />
        </div>

        {/* MIDDLE COLUMN: Animated Line */}
        <div className="hidden mt-20 lg:block relative h-full bg-gray-100">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute inset-0 bg-black"
          />
        </div>

        {/* RIGHT COLUMN: Stacked Cards */}
        <div className="lg:pl-20 space-y-32 lg:py-20">
          {services.map((item, index) => (
            <ServiceRow key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Individual Service Item Row
// ─────────────────────────────────────────────

function ServiceRow({
  item,
  index,
}: {
  item: (typeof services)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="flex flex-col md:flex-row items-start gap-8 group"
    >
      <span className="text-lg font-bold text-black">{item.id}</span>
      {/* 1. PILL PORTION: Only this part has BorderGlow */}

      {/* 2. TEXT CONTENT: Clean, No Borders */}
      <div className="flex-1 space-y-4 pt-4 relative">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl md:text-3xl font-semibold text-black tracking-tight group-hover:text-gray-600 transition-colors">
            {item.title}
          </h3>
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            className="opacity-20 group-hover:opacity-100 transition-opacity"
          >
            <path
              d="M3 11L11 3M11 3H5M11 3V9"
              stroke="black"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-lg">
          {item.description}
        </p>

        {/* Subtle separator line (optional, mimics your 2nd image) */}
        <div className="w-full h-[1px] bg-gray-100 mt-8" />
      </div>
    </motion.div>
  );
}
