"use client";

import Image from "next/image";
import ScrollVelocity from "@/components/element/ScrollVelocity";
import { ProjectMarqueeItem } from "@/types/project";

type ProjectScrollGalleryProps = {
  items: ProjectMarqueeItem[];
};

function getWidthClass(width?: ProjectMarqueeItem["width"]) {
  switch (width) {
    case "sm":
      return "w-[220px] md:w-[280px] lg:w-[360px]";
    case "lg":
      return "w-[420px] md:w-[560px] lg:w-[760px]";
    case "md":
    default:
      return "w-[300px] md:w-[420px] lg:w-[520px]";
  }
}

function GalleryCard({ item }: { item: ProjectMarqueeItem }) {
  return (
    <div
      className={[
        "mx-3 overflow-hidden rounded-[20px] border border-black/8 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
        getWidthClass(item.width),
      ].join(" ")}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px]">
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

export default function ProjectScrollGallery({
  items,
}: ProjectScrollGalleryProps) {
  const firstRow = items.map((item) => (
    <GalleryCard key={item.id} item={item} />
  ));

  const secondRow = [...items].reverse().map((item) => (
    <GalleryCard key={`${item.id}-reverse`} item={item} />
  ));

  return (
    <section className="overflow-hidden   py-10 md:py-14 lg:py-16">
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