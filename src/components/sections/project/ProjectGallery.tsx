import Image from "next/image";
import { ProjectDetail } from "@/types/project";

type ProjectGalleryProps = {
  project: ProjectDetail;
};

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <section className="  py-6 md:py-10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {project.gallery.slice(0, 3).map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative aspect-[4/4.6] overflow-hidden rounded-[18px]"
            >
              <Image
                src={image}
                alt={`${project.title} gallery image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-[680px] text-center">
          <p className="text-sm leading-7 text-black/65 md:text-base">
            “{project.quote.text}”
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.08em] text-black/50">
            {project.quote.author} — {project.quote.role}
          </p>
        </div>

        <div className="mt-10 space-y-4 md:space-y-6">
          {project.gallery.slice(3).map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative aspect-[16/10] overflow-hidden rounded-[20px] md:aspect-[16/8]"
            >
              <Image
                src={image}
                alt={`${project.title} full gallery image ${index + 4}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}