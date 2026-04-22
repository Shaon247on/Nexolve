"use client";

import Image from "next/image";
import ScrollVelocity from "@/components/element/ScrollVelocity";
import { CaseStudyGalleryItem } from "@/types/case-study";

type CaseStudyScrollGalleryProps = {
  items: CaseStudyGalleryItem[];
};

function getWidthClass(size?: CaseStudyGalleryItem["size"]) {
  switch (size) {
    case "sm":
      return "w-[220px] md:w-[280px] lg:w-[340px]";
    case "lg":
      return "w-[420px] md:w-[580px] lg:w-[760px]";
    case "md":
    default:
      return "w-[300px] md:w-[420px] lg:w-[520px]";
  }
}

function GalleryCard({ item }: { item: CaseStudyGalleryItem }) {
  return (
    <div
      className={[
        "mx-3 overflow-hidden rounded-[22px] border border-black/8 bg-white/80 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.05)]",
        getWidthClass(item.size),
      ].join(" ")}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 70vw, (max-width: 1280px) 40vw, 32vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function CaseStudyScrollGallery({
  items,
}: CaseStudyScrollGalleryProps) {
  const firstRow = items.map((item) => (
    <GalleryCard key={item.id} item={item} />
  ));

  const secondRow = [...items].reverse().map((item) => (
    <GalleryCard key={`${item.id}-reverse`} item={item} />
  ));

  return (
    <section className="overflow-hidden  py-10 md:py-14">
      <div className="space-y-4 md:space-y-5">
        <ScrollVelocity
          texts={[firstRow, secondRow]}
          velocity={28}
          numCopies={6}
          className="inline-flex! items-center!"
          parallaxClassName="py-1"
          scrollerClassName="flex items-center"
        />
      </div>
    </section>
  );
}