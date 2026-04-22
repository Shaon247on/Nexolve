import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectDetail } from "@/types/project";

type ProjectHeroProps = {
  project: ProjectDetail;
};

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="  pt-8 md:pt-10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-medium leading-none tracking-[-0.07em] text-black md:text-6xl xl:text-7xl">
              {project.title}
            </h1>
            <p className="mt-2 text-sm text-black/65 md:text-base">
              {project.subtitle}
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-black/60 transition hover:text-black"
          >
            All Projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] md:aspect-[16/8.5]">
          <Image
            src={project.heroImage}
            alt={project.coverAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute left-4 top-4 rounded-[18px] bg-black/45 px-5 py-4 text-white backdrop-blur-md md:left-8 md:top-8 md:px-7 md:py-5">
            <p className="text-[36px] font-semibold tracking-[-0.06em] md:text-[58px]">
              {project.metric.value}
            </p>
            <p className="text-base text-white/85 md:text-[20px]">
              {project.metric.label}
            </p>
          </div>

          <div className="absolute bottom-4 right-4 flex max-w-[70%] flex-wrap justify-end gap-2 md:bottom-8 md:right-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.02em] text-white backdrop-blur-md md:px-4 md:py-2 md:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}