"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/sections/project/ProjectCard";
import { ProjectSummary } from "@/types/project";

type ProjectGridProps = {
  projects: ProjectSummary[];
  initialCount?: number;
  loadCount?: number;
};

export default function ProjectGrid({
  projects,
  initialCount = 4,
  loadCount = 2,
}: ProjectGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const visibleProjects = useMemo(
    () => projects.slice(0, visibleCount),
    [projects, visibleCount]
  );

  const hasMore = visibleCount < projects.length;

  return (
    <div className="space-y-10 md:space-y-14">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + loadCount)}
            className="h-12 rounded-full bg-black px-8 text-sm font-medium text-white hover:bg-black/90"
          >
            Load More Projects
          </Button>
        </div>
      )}
    </div>
  );
}