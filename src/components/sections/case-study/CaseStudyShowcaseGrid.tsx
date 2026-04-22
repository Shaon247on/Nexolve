"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CaseStudyGalleryItem } from "@/types/case-study";

type CaseStudyShowcaseGridProps = {
  items: CaseStudyGalleryItem[];
};

function getGridSpan(size?: CaseStudyGalleryItem["size"]) {
  switch (size) {
    case "lg":
      return "md:col-span-2";
    case "sm":
      return "md:col-span-1";
    case "md":
    default:
      return "md:col-span-1";
  }
}

function getAspect(size?: CaseStudyGalleryItem["size"]) {
  switch (size) {
    case "lg":
      return "aspect-[16/10]";
    case "sm":
      return "aspect-[4/5]";
    case "md":
    default:
      return "aspect-[4/4.5]";
  }
}

export default function CaseStudyShowcaseGrid({
  items,
}: CaseStudyShowcaseGridProps) {
  return (
    <section className=" py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
            Visual Highlights
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-[-0.06em] text-black md:text-5xl">
            Design in Motion
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.06 }}
              className={getGridSpan(item.size)}
            >
              <div
                className={[
                  "relative overflow-hidden rounded-[24px]",
                  getAspect(item.size),
                ].join(" ")}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}