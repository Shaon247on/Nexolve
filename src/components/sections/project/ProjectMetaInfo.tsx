import Image from "next/image";
import { ProjectDetail } from "@/types/project";

type ProjectMetaInfoProps = {
  project: ProjectDetail;
};

export default function ProjectMetaInfo({ project }: ProjectMetaInfoProps) {
  return (
    <section className="  py-12 md:py-16">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-14 lg:px-8">
        <div>
          <p className="max-w-[720px] text-base leading-7 text-black/72 md:text-lg">
            {project.description}
          </p>

          <div className="relative mt-10 aspect-[4/4.8] overflow-hidden rounded-[20px] md:aspect-[4/3.8]">
            <Image
              src={project.introImage}
              alt={`${project.title} intro image`}
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <div className="bg-[#ececec]rounded-[20px] bg-transparent">
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-black">Introduction</p>
              </div>

              <div className="divide-y divide-black/10 rounded-[18px] border border-black/10 bg-gray-100">
                {project.infoRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 px-4 py-4 md:grid-cols-[160px_minmax(0,1fr)] md:px-6"
                  >
                    <span className="text-xs uppercase tracking-[0.08em] text-black/45">
                      {row.label}
                    </span>
                    <span className="text-sm text-right text-black/75 md:text-base">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <ContentBlock title="The Solution" text={project.solution} />
              <ContentBlock title="Outcome" text={project.outcome} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentBlock({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-black">{title}</p>
      <p className="max-w-[760px] text-base leading-7 text-black/72">{text}</p>
    </div>
  );
}