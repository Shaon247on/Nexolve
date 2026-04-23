"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";
import { performanceAuditServiceData } from "@/data/performance-audit-service";
import type { PerformanceAuditWorkflowStep } from "@/types/performance-audit-service";

function PerformanceAuditFlowCardItem({
  item,
  index,
  total,
  progress,
}: {
  item: PerformanceAuditWorkflowStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;
  const prevStart = Math.max(0, start - segment);

  const firstCardY = useTransform(progress, [0, segment], ["0%", "0%"]);
  const stackedCardY = useTransform(
    progress,
    [prevStart, start, end],
    ["100%", "0%", "0%"]
  );

  const y = index === 0 ? firstCardY : stackedCardY;
  const scale = useTransform(progress, [start, end], [1, 0.93]);
  const opacity = useTransform(progress, [start, end], [1, 0.97]);

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: index + 1,
        transformOrigin: "top center",
      }}
      className="absolute inset-0 will-change-transform"
    >
      <div className="flex h-screen w-full items-center justify-center bg-[#f7f7f5] px-4 py-4 md:px-6 lg:px-8">
        <div className="grid h-[calc(100vh-2rem)] w-full max-w-[1600px] grid-cols-1 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex h-full flex-col justify-between border-b border-black/10 p-6 md:p-8 lg:border-b-0 lg:border-r lg:p-10 xl:p-12">
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex rounded-full border border-black/10 bg-[#f7f7f5] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/65">
                  {item.eyebrow}
                </span>

                <span className="text-sm font-medium text-black/35">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                Performance Audit Flow
              </p>

              <h2 className="mt-4 max-w-[13ch] text-3xl leading-[0.95] font-semibold tracking-[-0.06em] text-black md:text-5xl xl:text-6xl">
                {item.title}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                {item.description}
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
                Audit Output
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {item.deliverables.map((deliverable) => (
                  <div
                    key={deliverable}
                    className="rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 py-3"
                  >
                    <span className="text-sm font-medium text-black/75">
                      {deliverable}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/10 pt-6 text-sm text-black/40">
              <span>Scroll to continue</span>
              <span className="inline-flex items-center gap-2">
                Next finding
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          <div className="relative h-[42vh] min-h-[300px] lg:h-full">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              priority={index < 2}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

            <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md md:left-6 md:top-6">
              Audit Snapshot
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PerformanceAuditFlowStack() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { steps } = performanceAuditServiceData;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#f7f7f5] text-neutral-900"
      style={{
        height: `${steps.length * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full w-full">
          {steps.map((item, index) => (
            <PerformanceAuditFlowCardItem
              key={item.id}
              item={item}
              index={index}
              total={steps.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}