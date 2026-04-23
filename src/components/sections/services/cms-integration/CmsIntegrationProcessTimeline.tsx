"use client";

import { motion } from "framer-motion";
import { cmsIntegrationServiceData } from "@/data/cms-integration-service";

export default function CmsIntegrationProcessTimeline() {
  const { processTitle, processDescription, steps } = cmsIntegrationServiceData;

  return (
    <section className="bg-[#f7f7f5] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
              Process
            </p>
            <h2 className="mt-4 text-4xl md:text-6xl xl:text-7xl font-semibold tracking-[-0.06em] leading-none text-black">
              {processTitle}
            </h2>
          </div>

          <p className="max-w-2xl text-sm md:text-lg leading-7 md:leading-8 text-neutral-700">
            {processDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
              className="rounded-[24px] border border-black/10 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white text-sm font-semibold">
                {String(step.id).padStart(2, "0")}
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-black/45">
                {step.eyebrow}
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] leading-tight text-black">
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