"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { CaseStudySummary } from "@/types/case-study";

type CaseStudyCardProps = {
  caseStudy: CaseStudySummary;
  index?: number;
};

export default function CaseStudyCard({
  caseStudy,
  index = 0,
}: CaseStudyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.04 }}
      className="group overflow-hidden rounded-[28px] border border-black/10 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1"
    >
      <Link href={`/case-studies/${caseStudy.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={caseStudy.coverImage}
            alt={caseStudy.coverAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

          {caseStudy.stat ? (
            <div className="absolute left-4 top-4 rounded-[20px] bg-black/50 px-5 py-4 text-white backdrop-blur-md md:left-6 md:top-6">
              <p className="text-2xl font-semibold tracking-[-0.05em] md:text-4xl">
                {caseStudy.stat.value}
              </p>
              <p className="mt-1 text-xs text-white/85 md:text-sm">
                {caseStudy.stat.label}
              </p>
            </div>
          ) : null}
        </div>

        <div className="space-y-4 p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-black/55">
            <span>{caseStudy.category}</span>
            <span className="h-1 w-1 rounded-full bg-black/30" />
            <span>{caseStudy.industry}</span>
            <span className="h-1 w-1 rounded-full bg-black/30" />
            <span>{caseStudy.readTime}</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <h3 className="max-w-[90%] text-xl font-medium leading-tight tracking-[-0.05em] text-black md:text-[28px]">
              {caseStudy.title}
            </h3>
            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-black/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>

          <p className="text-sm leading-6 text-black/65 md:text-base">
            {caseStudy.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}