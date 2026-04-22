"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectSummary } from "@/types/project";

type ProjectCardProps = {
  project: ProjectSummary;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      className="group"
    >
      <Link href={project.href} className="block">
        <div className="rounded-[22px] border border-black/8  p-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-transform duration-500 group-hover:-translate-y-1">
          <div className="relative overflow-hidden rounded-[18px]">
            <div
              className={[
                "relative w-full overflow-hidden rounded-[18px]",
                project.size === "feature"
                  ? "aspect-[4/4.8] md:aspect-[4/3.35]"
                  : "aspect-[4/4.7] md:aspect-[4/3.3]",
              ].join(" ")}
            >
              <Image
                src={project.coverImage}
                alt={project.coverAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority={index < 2}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 rounded-[18px] bg-black/45 px-5 py-4 text-white backdrop-blur-md md:left-6 md:top-6 md:px-6 md:py-5">
                <p className="text-[28px] font-semibold tracking-[-0.05em] md:text-[38px]">
                  {project.metric.value}
                </p>
                <p className="mt-1 text-sm text-white/85 md:text-lg">
                  {project.metric.label}
                </p>
              </div>

              <div className="absolute bottom-4 right-4 flex max-w-[72%] flex-wrap justify-end gap-2 md:bottom-5 md:right-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.02em] text-white backdrop-blur-md md:px-4 md:py-1.5 md:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-[18px] bg-[#f4f4f4] px-4 py-4 md:px-6 md:py-5">
              <h3 className="text-[18px] font-medium leading-none tracking-[-0.05em] text-black md:text-[28px]">
                {project.title}
              </h3>

              <div className="flex shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.02em] text-black/70 md:text-xs">
                <span>{project.ctaLabel}</span>
                <Plus className="h-4 w-4 md:h-4 md:w-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}