"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

const leftImages = [
  { src: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&auto=format&fit=crop", alt: "Abstract white cylinders" },
  { src: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=800&auto=format&fit=crop", alt: "Astronaut figure" },
  { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop", alt: "Dark tablet devices" },
  { src: "https://images.unsplash.com/photo-1636955825064-a7f84f03c886?q=80&w=800&auto=format&fit=crop", alt: "White texture surface" },
];

const centerImages = [
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop", alt: "Circuit board macro" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop", alt: "Product on pedestal" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", alt: "Portrait" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop", alt: "Minimal watch" },
];

const rightImages = [
  { src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop", alt: "Industrial machine" },
  { src: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop", alt: "Dark room with device" },
  { src: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=800&auto=format&fit=crop", alt: "Amber smoke abstract" },
  { src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop", alt: "Tech product close-up" },
];

function GalleryTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-900">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 33vw, 160px"
        className="object-cover"
      />
    </div>
  );
}

export default function ParallaxGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollHeight - el.clientHeight;
    const next = maxScroll > 0 ? el.scrollTop / maxScroll : 0;
    progress.set(next);
  }, [progress]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  // Stronger movement so it is actually visible
  const sideY = useTransform(progress, [0, 1], [0, 220]);
  const centerY = useTransform(progress, [0, 1], [120, -220]);

  return (
    <div className="relative w-full max-w-460 mx-auto h-screen rounded-2xl overflow-hidden bg-[#0c0c0c]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-[#0c0c0c] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-[#0c0c0c] to-transparent" />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute inset-0 z-10 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="h-[300vh]" />
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden px-3 py-6 md:px-4 md:py-8">
        <div className="grid h-full grid-cols-3 gap-2 md:gap-3">
          <motion.div style={{ y: sideY }} className="flex flex-col gap-2 md:gap-3">
            {leftImages.map((img, i) => (
              <GalleryTile key={`left-${i}`} {...img} />
            ))}
          </motion.div>

          <motion.div style={{ y: centerY }} className="flex flex-col gap-2 md:gap-3">
            {centerImages.map((img, i) => (
              <GalleryTile key={`center-${i}`} {...img} />
            ))}
          </motion.div>

          <motion.div style={{ y: sideY }} className="flex flex-col gap-2 md:gap-3">
            {rightImages.map((img, i) => (
              <GalleryTile key={`right-${i}`} {...img} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}