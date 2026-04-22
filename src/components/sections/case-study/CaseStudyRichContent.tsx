import Image from "next/image";
import FadeInSection from "@/components/shared/FadeInSection";
import { CaseStudyDetail } from "@/types/case-study";

type CaseStudyRichContentProps = {
  caseStudy: CaseStudyDetail;
};

export default function CaseStudyRichContent({
  caseStudy,
}: CaseStudyRichContentProps) {
  return (
    <section className=" py-12 md:py-16">
      <div className="mx-auto max-w-420 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <FadeInSection className="space-y-8">
            <InfoBlock title="Client" content={caseStudy.client} />
            <InfoBlock title="Duration" content={caseStudy.duration} />
            <InfoBlock title="Services" content={caseStudy.services.join(", ")} />
            <InfoBlock title="Industry" content={caseStudy.industry} />
          </FadeInSection>

          <div className="space-y-10">
            <FadeInSection delay={0.05}>
              <ContentBlock title="The Challenge" content={caseStudy.challenge} />
            </FadeInSection>

            <FadeInSection delay={0.08}>
              <ContentBlock title="The Solution" content={caseStudy.solution} />
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <ContentBlock title="The Outcome" content={caseStudy.outcome} />
            </FadeInSection>
          </div>
        </div>

        <FadeInSection className="mt-14" delay={0.12}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {caseStudy.gallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative aspect-[4/5] overflow-hidden rounded-[24px]"
              >
                <Image
                  src={image}
                  alt={`${caseStudy.title} gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </FadeInSection>

        <div className="mx-auto mt-14 max-w-4xl space-y-10">
          {caseStudy.sections.map((section, index) => {
            if (section.type === "paragraph") {
              return (
                <FadeInSection key={index} delay={index * 0.04}>
                  <div>
                    {section.title ? (
                      <h2 className="mb-4 text-2xl font-medium tracking-[-0.05em] text-black md:text-3xl">
                        {section.title}
                      </h2>
                    ) : null}
                    <p className="text-sm leading-7 text-black/70 md:text-base">
                      {section.content}
                    </p>
                  </div>
                </FadeInSection>
              );
            }

            if (section.type === "bulletList") {
              return (
                <FadeInSection key={index} delay={index * 0.04}>
                  <div>
                    {section.title ? (
                      <h2 className="mb-4 text-2xl font-medium tracking-[-0.05em] text-black md:text-3xl">
                        {section.title}
                      </h2>
                    ) : null}
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-7 text-black/70 md:text-base"
                        >
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInSection>
              );
            }

            return (
              <FadeInSection key={index} delay={index * 0.04}>
                <blockquote className="rounded-[28px] border border-black/10 bg-white/70 p-6 md:p-8">
                  <p className="text-lg leading-8 tracking-[-0.03em] text-black md:text-2xl">
                    “{section.quote}”
                  </p>
                  <footer className="mt-5 text-sm text-black/55">
                    {section.author} — {section.role}
                  </footer>
                </blockquote>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="border-b border-black/10 pb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">
        {title}
      </p>
      <p className="mt-3 text-base text-black/75 md:text-lg">{content}</p>
    </div>
  );
}

function ContentBlock({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-medium tracking-[-0.05em] text-black md:text-3xl">
        {title}
      </h2>
      <p className="text-sm leading-7 text-black/70 md:text-base">{content}</p>
    </div>
  );
}