"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Parallax from "../../shared/parallax";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";
import TitleSection from "@/components/element/TitleSection";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "01",
    title: "Nebula",
    description: "UI/UX & product design for digital platforms",
    image: "https://images.pexels.com/photos/374560/pexels-photo-374560.jpeg",
    tags: ["Branding", "Web Design", "Web Development"],
  },
  {
    id: "02",
    title: "Arcform",
    description: "Industrial design meets digital craftsmanship",
    image: "https://images.pexels.com/photos/7661492/pexels-photo-7661492.jpeg",
    tags: ["Promotion", "Branding"],
  },
  {
    id: "03",
    title: "Luminary",
    description: "Brand identity & motion for luxury fashion",
    image:
      "https://i.pinimg.com/736x/6d/54/75/6d54759dc968dcb9c961481b6253fd7e.jpg",
    tags: ["UI/UX Design", "Development"],
  },
  {
    id: "04",
    title: "Voidscape",
    description: "Immersive 3D experience for the metaverse",
    image: "https://images.pexels.com/photos/7504746/pexels-photo-7504746.jpeg",
    tags: ["3D Animation", "Web Design"],
  },
];

export default function SelectedWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Fade out the left panel as the section ends
  const leftOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
  const leftY = useTransform(scrollYProgress, [0.85, 1], [0, -24]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white pt-4 md:pt-6 lg:pt-10 xl:pt-32"
      // Give the section enough height so right side can scroll through all cards
      style={{ minHeight: `${projects.length * 10 + 40}vh` }}
    >
      <TitleSection
        scrollYProgress={scrollYProgress}
        title="our projects"
        className="text-5xl md:text-[7rem] lg:text-[9rem] xl:text-[12rem]"
        topClassName="top-0"
      />
      {/* ─── Inner wrapper: two columns ─── */}
      <div className="flex flex-col lg:flex-row w-full h-full max-w-7xl mx-auto">
        {/* ════════════════════════════════
            LEFT — sticky panel (40%)
        ════════════════════════════════ */}
        <div className="lg:w-[40%] lg:sticky lg:top-0 lg:h-screen flex items-start  py-16 lg:py-20 z-10">
          <motion.div
            style={{
              opacity: leftOpacity,
              y: leftY,
            }}
            className="max-w-lg"
          >
            {/* Heading */}
            <ScrollAnimatedText title="Selected work we're proud of" />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.18,
              }}
              className="text-sm md:text-base text-neutral-500 leading-relaxed mb-10 max-w-xs -mt-10"
            >
              A curated selection of projects where strategy, creativity, and
              craftsmanship come together to build meaningful and enduring brand
              experiences.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.25,
              }}
            >
              <Link href={"/projects"}>
                <button className="group inline-flex items-center gap-3 bg-neutral-950 text-white text-sm font-medium pl-6 pr-2 py-2 rounded-full transition-all duration-300 hover:bg-orange-600">
                  View Latest Projects
                  <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </Link>
            </motion.div>

            {/* Project counter */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-12 pt-8 border-t border-neutral-100 flex items-center gap-6"
            >
              <div>
                <div className="text-2xl font-bold text-neutral-950">38+</div>
                <div className="text-xs text-neutral-400 tracking-wide mt-0.5">
                  Projects delivered
                </div>
              </div>
              <div className=" h-8 bg-neutral-200" />
              <div>
                <div className="text-2xl font-bold text-neutral-950">12</div>
                <div className="text-xs text-neutral-400 tracking-wide mt-0.5">
                  Years of craft
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ════════════════════════════════
            RIGHT — scrollable cards (60%)
        ════════════════════════════════ */}
        <div className="lg:w-[60%] px-4 md:px-8 lg:px-10 py-10 lg:py-16 space-y-8 lg:space-y-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
          {/* Bottom breathing room so last card clears sticky panel */}
          <div className="h-8 lg:h-16" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   Project Card
   Image height expands as the card
   scrolls into the centre of the viewport
───────────────────────────────────── */
interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageHeight = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    ["270px", "440px", "580px", "440px", "270px"],
  );

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1]);

  const hasImage =
    typeof project.image === "string" && project.image.trim().length > 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px", amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border"
    >
      <motion.div
        className="relative w-full overflow-hidden bg-neutral-100"
        style={{ height: imageHeight }}
      >
        {hasImage ? (
          <Parallax
            className="absolute inset-0 h-full w-full"
            contentClassName="h-full w-full"
            effect="translate"
            axis="y"
            range={[-20, 20]}
            smooth
          >
            <motion.div
              className="relative h-full w-full"
              style={{ scale: imageScale }}
            >
              {project.image?.trim() ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  priority={index === 0}
                />
              ) : null}
            </motion.div>
          </Parallax>
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center">
            <div>
              <p className="text-lg font-semibold text-neutral-900">
                {project.title}
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                Preview image coming soon
              </p>
            </div>
          </div>
        )}

        {hasImage && (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-black"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0, 0.5, 1],
                [0.28, 0, 0.28],
              ),
            }}
          />
        )}
      </motion.div>

      <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-start sm:justify-between md:px-6 md:py-5">
        <div>
          <h3 className="text-lg font-bold leading-tight text-neutral-950 md:text-xl">
            {project.title}
          </h3>
          <p className="mt-0.5 text-xs leading-snug text-neutral-500 md:text-sm">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:max-w-[55%] sm:justify-end">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="whitespace-nowrap rounded-full border border-neutral-300 bg-white/70 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-neutral-600 md:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
        initial={{ opacity: 0, scale: 0.7 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowRight className="h-4 w-4 text-neutral-950" />
      </motion.div>
    </motion.div>
  );
}
