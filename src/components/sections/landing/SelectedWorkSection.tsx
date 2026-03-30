"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Parallax from "../../shared/parallax";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";
import TitleSection from "@/components/element/TitleSection";

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
    image:
      "https://i.pinimg.com/736x/6d/54/75/6d54759dc968dcb9c961481b6253fd7e.jpg",
    tags: ["Branding", "Web Design", "Web Development"],
  },
  {
    id: "02",
    title: "Arcform",
    description: "Industrial design meets digital craftsmanship",
    image:
      "https://i.pinimg.com/1200x/2f/06/60/2f066025445ff8455d9bda820e7c28c9.jpg",
    tags: ["3D Animation", "Branding"],
  },
  {
    id: "03",
    title: "Luminary",
    description: "Brand identity & motion for luxury fashion",
    image:
      "https://i.pinimg.com/736x/1d/9c/48/1d9c4826925892f6829cc3945b9f8b41.jpg",
    tags: ["UI/UX Design", "Development"],
  },
  {
    id: "04",
    title: "Voidscape",
    description: "Immersive 3D experience for the metaverse",
    image:
      "https://i.pinimg.com/736x/6b/56/11/6b5611a98cd8787de790ec9dfacc54bc.jpg",
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
            <ScrollAnimatedText
              title="Selected work we're proud of"
            />

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
              <button className="group inline-flex items-center gap-3 bg-neutral-950 text-white text-sm font-medium pl-6 pr-2 py-2 rounded-full transition-all duration-300 hover:bg-orange-600">
                View Latest Projects
                <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
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

  // Track this card's scroll position relative to the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    // 0 = card bottom hits viewport bottom  |  1 = card top hits viewport top
    offset: ["start end", "end start"],
  });

  // Peak when the card centre aligns with viewport centre (progress ≈ 0.5)
  // Collapsed height at edges → expanded height at centre
  const imageHeight = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    ["270px", "440px", "580px", "440px", "270px"],
  );

  // Slight scale-up at peak for extra depth
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1]);

  // Reveal the card itself on enter
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
      className="group relative rounded-2xl overflow-hidden border cursor-pointer"
    >
      {/* ── Image wrapper: height driven by scroll ── */}
      <motion.div
        className="relative w-full overflow-hidden"
        style={{ height: imageHeight }}
      >
        {/* Inner image: parallax translate + scroll scale */}
        <Parallax
          className="absolute inset-0 w-full h-full"
          contentClassName="w-full h-full"
          effect="translate"
          axis="y"
          range={[-20, 20]}
          smooth
        >
          <motion.div
            className="relative w-full h-full"
            style={{ scale: imageScale }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority={index === 0}
            />
          </motion.div>
        </Parallax>

        {/* Vignette overlay — lightens as card centres */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{
            opacity: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.28, 0, 0.28],
            ),
          }}
        />
      </motion.div>

      {/* Card footer */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 px-5 py-5 md:px-6 md:py-5">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-neutral-950 leading-tight">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-neutral-500 mt-0.5 leading-snug">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:justify-end sm:max-w-[55%]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] md:text-xs font-medium tracking-wide uppercase px-3 py-1 rounded-full border border-neutral-300 text-neutral-600 bg-white/70 whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow reveal on hover */}
      <motion.div
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.7 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowRight className="w-4 h-4 text-neutral-950" />
      </motion.div>
    </motion.div>
  );
}
