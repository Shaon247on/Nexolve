
import { projectSummaries } from "@/data/projects";
import ProjectGrid from "./ProjectGrid";

export default function ProjectsSection() {
  return (
    <section className=" py-14 md:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">
              Selected Work
            </p>
            <h2 className="mt-3 text-4xl font-medium tracking-[-0.06em] text-black md:text-6xl xl:text-7xl">
              Projects
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-black/60 md:text-base">
            A curated collection of product, brand, and systems work built with
            a strong focus on clarity, motion, scalability, and measurable
            business outcomes.
          </p>
        </div>
        <ProjectGrid projects={projectSummaries} />
      </div>
    </section>
  );
}