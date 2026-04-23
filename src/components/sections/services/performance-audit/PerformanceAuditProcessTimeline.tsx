"use client";

import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import TitleSection from "@/components/element/TitleSection";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";
import { performanceAuditServiceData } from "@/data/performance-audit-service";

export default function PerformanceAuditProcessTimeline() {
  const { processTitle, processDescription, steps } = performanceAuditServiceData;

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, {
    amount: 0.1,
    once: false,
  });

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={headerRef}
      style={{
        opacity: headerInView ? 1 : 0,
        transform: headerInView ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
      className="bg-[#f7f7f5] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
    >
      <TitleSection scrollYProgress={scrollYProgress} title="Process" />

      <div className="mx-auto mt-10 max-w-[1600px]">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <ScrollAnimatedText
              title={processTitle}
              className="text-4xl md:text-6xl xl:text-7xl"
            />
          </div>

          <p className="max-w-2xl text-sm leading-7 text-neutral-700 md:text-lg md:leading-8">
            {processDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {steps.slice(0, 3).map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.05,
              }}
              className="rounded-[24px] border border-black/10 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                {String(step.id).padStart(2, "0")}
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-black/45">
                {step.eyebrow}
              </p>

              <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.04em] text-black">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-4 grid max-w-[66%] grid-cols-1 gap-4 md:grid-cols-2">
          {steps.slice(3, 5).map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.05,
              }}
              className="rounded-[24px] border border-black/10 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                {String(step.id).padStart(2, "0")}
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-black/45">
                {step.eyebrow}
              </p>

              <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.04em] text-black">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}