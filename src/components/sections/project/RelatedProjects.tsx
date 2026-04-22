import { ProjectSummary } from "@/types/project";
import ProjectCard from "./ProjectCard";

type RelatedProjectsProps = {
  projects: ProjectSummary[];
};

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects.length) return null;

  return (
    <section className=" py-14 md:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">
            Related Projects
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}