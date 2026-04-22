import { notFound } from "next/navigation";
import { getProjectBySlug, getRelatedProjects } from "@/data/projects";
import ProjectHero from "@/components/sections/project/ProjectHero";
import ProjectMetaInfo from "@/components/sections/project/ProjectMetaInfo";
import ProjectScrollGallery from "@/components/sections/project/ProjectScrollGallery";
import ProjectGallery from "@/components/sections/project/ProjectGallery";
import RelatedProjects from "@/components/sections/project/RelatedProjects";

type ProjectDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.relatedProjectSlugs).map(
    ({
      subtitle,
      intro,
      overview,
      solution,
      outcome,
      quote,
      heroImage,
      introImage,
      gallery,
      marqueeGallery,
      infoRows,
      relatedProjectSlugs,
      ...summary
    }) => summary
  );

  return (
    <main className="mt-20">
      <ProjectHero project={project} />
      <ProjectMetaInfo project={project} />

      <ProjectScrollGallery items={project.marqueeGallery} />

      <ProjectGallery project={project} />
      <RelatedProjects projects={relatedProjects} />
    </main>
  );
}