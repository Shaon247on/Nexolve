"use client";

import { motion } from "framer-motion";
import { cmsIntegrationServiceData } from "@/data/cms-integration-service";

export default function CmsIntegrationTechHighlights() {
  const { techTitle, techDescription, techItems } = cmsIntegrationServiceData;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
              Technical Foundation
            </p>
            <h2 className="mt-4 text-4xl md:text-6xl xl:text-7xl font-semibold tracking-[-0.06em] leading-none text-black">
              {techTitle}
            </h2>
          </div>

          <p className="max-w-2xl text-sm md:text-lg leading-7 md:leading-8 text-neutral-700">
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
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.04 }}
              className="rounded-[24px] border border-black/10 bg-[#f7f7f5] p-6"
            >
              <h3 className="text-2xl font-semibold tracking-[-0.04em] leading-tight text-black">
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