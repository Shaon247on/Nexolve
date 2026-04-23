"use client";

import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import TitleSection from "@/components/element/TitleSection";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";
import { performanceAuditServiceData } from "@/data/performance-audit-service";

export default function PerformanceAuditTechHighlights() {
  const { techTitle, techDescription, techItems } = performanceAuditServiceData;

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
      className="relative bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
    >
      <TitleSection scrollYProgress={scrollYProgress} title="Foundation" />

      <div className="mx-auto mt-10 max-w-[1500px]">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <ScrollAnimatedText title={techTitle} />
          </div>

          <p className="max-w-2xl text-sm leading-7 text-neutral-700 md:text-lg md:leading-8">
            {techDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {techItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.04,
              }}
              className="rounded-[24px] border border-black/10 bg-[#f7f7f5] p-6"
            >
              <h3 className="text-2xl leading-tight font-semibold tracking-[-0.04em] text-black">
                {item.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}