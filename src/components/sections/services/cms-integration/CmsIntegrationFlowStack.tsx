"use client";

import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { cmsIntegrationServiceData } from "@/data/cms-integration-service";
import type { CmsIntegrationWorkflowStep } from "@/types/cms-integration-service";

function CmsIntegrationFlowCardItem({
  item,
  index,
  total,
  progress,
}: {
  item: CmsIntegrationWorkflowStep;
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
  const scale = useTransform(progress, [start, end], [1, 0.94]);
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
      className="absolute inset-0 will-change-transform bg-white"
    >
      <div className="flex h-screen w-full items-center justify-center bg-[#f5f4ef] px-4 py-4 md:px-6 lg:px-8">
        <div className="grid h-[calc(100vh-2rem)] w-full max-w-[1680px] grid-cols-1 overflow-hidden rounded-[2rem] border border-black/10 bg-[#fbfaf6] shadow-[0_24px_80px_rgba(0,0,0,0.08)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative h-[52vh] min-h-[340px] overflow-hidden lg:h-full">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              priority={index < 2}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-6 lg:p-8">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                {item.eyebrow}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 lg:p-8">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  CMS Integration Flow
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-4xl xl:text-5xl">
                  {item.title}
                </h2>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
                    Phase
                  </p>
                  <p className="font-medium text-black/80 text-3xl">
                    {item.eyebrow}
                  </p>
                </div>
              </div>

              <p className="mt-8 max-w-2xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8 xl:text-lg">
                {item.description}
              </p>

              <div className="mt-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
                  Deliverables
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {item.deliverables.map((deliverable) => (
                    <div
                      key={deliverable}
                      className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3"
                    >
                      <span className="h-2 w-2 rounded-full bg-black/70" />
                      <span className="text-sm font-medium text-black/75">
                        {deliverable}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between gap-4 border-t border-black/10 pt-6 text-sm text-black/40">
              <span>Scroll to continue</span>
              <span className="inline-flex items-center gap-2 font-medium text-black/55">
                Next phase
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CmsIntegrationFlowStack() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { steps } = cmsIntegrationServiceData;

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
            <CmsIntegrationFlowCardItem
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