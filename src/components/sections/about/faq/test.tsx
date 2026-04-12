"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type CardItem = {
  id: number;
  title: string;
  description: string;
  tag: string;
};

const cards: CardItem[] = [
  {
    id: 1,
    title: "Strategy Review",
    description:
      "High-level planning card with a clean scroll interaction and full-screen presentation.",
    tag: "Planning",
  },
  {
    id: 2,
    title: "Design System",
    description:
      "A reusable card layout that scales down slightly and shifts downward as it reaches the top.",
    tag: "Design",
  },
  {
    id: 3,
    title: "Frontend Delivery",
    description:
      "Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion for a modern production-ready flow.",
    tag: "Frontend",
  },
  {
    id: 4,
    title: "Performance Audit",
    description:
      "Smooth motion behavior with a light visual system and strong readability across sections.",
    tag: "Optimization",
  },
  {
    id: 5,
    title: "Launch Support",
    description:
      "Each card occupies the full viewport for a strong storytelling and presentation-focused layout.",
    tag: "Launch",
  },
];

function StackedCard({
  item,
  index,
  total,
  progress,
}: {
  item: CardItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;

  const prevStart = Math.max(0, start - segment);
  const prevEnd = start;

  const y =
    index === 0
      ? useTransform(progress, [0, segment], ["0%", "0%"])
      : useTransform(progress, [prevStart, start, end], ["100%", "0%", "0%"]);

  const scale = useTransform(progress, [start, end], [1, 0.9]);
  const opacity = useTransform(progress, [start, end], [1, 0.96]);

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
      <div className="flex h-screen w-full items-center justify-center bg-neutral-100 px-4 py-6 md:px-8">
        <div className="flex h-[calc(100vh-2rem)] w-full flex-col justify-between rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-12">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
              {item.tag}
            </span>

            <span className="text-sm font-medium text-neutral-400">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-6xl">
              {item.title}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
              {item.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-neutral-400">
            <span>Scroll to continue</span>
            <span>Card stack effect</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Test() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-neutral-100 text-neutral-900"
      style={{
        height: `${cards.length * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full w-full">
          {cards.map((item, index) => (
            <StackedCard
              key={item.id}
              item={item}
              index={index}
              total={cards.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}