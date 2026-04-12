"use client";

import Image from "next/image";
import { ArrowUpRight, Grid2x2 } from "lucide-react";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import TitleSection from "@/components/element/TitleSection";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";

type TopicCard = {
  id: string;
  index: string;
  title: string;
  description: string;
  image: string;
};

const topics: TopicCard[] = [
  {
    id: "overview",
    index: "01",
    title: "Overview",
    description:
      "Essential questions to understand who we are, what we do, and who we work.",
    image:
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "services",
    index: "02",
    title: "Services",
    description:
      "Details about our solutions, consulting offerings, and system capabilities.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "process",
    index: "03",
    title: "Process",
    description:
      "How we approach problems, execute projects, and collaborate with clients.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "support",
    index: "04",
    title: "Support",
    description:
      "Post-launch support, maintenance, updates, and system optimization.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
];

function TopicCardItem({ item }: { item: TopicCard }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative overflow-hidden border border-neutral-200 bg-white p-5 sm:p-6"
    >
      <div className="mb-6">
        <span className="text-[18px] font-semibold tracking-tight text-neutral-300 sm:text-[22px]">
          [{item.index}]
        </span>
      </div>

      <div className="max-w-[18rem]">
        <h3 className="text-[34px] font-semibold leading-none tracking-[-0.04em] text-neutral-900 sm:text-[42px]">
          {item.title}
        </h3>

        <p className="mt-4 text-[15px] leading-[1.35] text-neutral-700 sm:text-base">
          {item.description}
        </p>
      </div>

      <div className="relative mt-8 overflow-hidden rounded">
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative aspect-[16/9] w-full "
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px)  50vw, 25vw"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </motion.article>
  );
}

export default function BrowseByTopicSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(
    headerRef as React.RefObject<HTMLElement>,
    0.1,
  );

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={headerRef}
      className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-16"
      style={{
        opacity: headerInView ? 1 : 0,
        transform: headerInView ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <TitleSection
        title="FAQ"
        scrollYProgress={scrollYProgress}
        topClassName="top-10 md:-top-14"
      />

      <div className="mx-auto max-w-420">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <ScrollAnimatedText title="Browse by topic" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {topics.map((item) => (
            <TopicCardItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
