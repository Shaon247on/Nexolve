import CaseStudyCard from "@/components/sections/case-study/CaseStudyCard";
import { CaseStudySummary } from "@/types/case-study";

type RelatedCaseStudiesProps = {
  items: CaseStudySummary[];
};

export default function RelatedCaseStudies({
  items,
}: RelatedCaseStudiesProps) {
  if (!items.length) return null;

  return (
    <section className=" py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
            Related Case Studies
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <CaseStudyCard key={item.id} caseStudy={item} />
          ))}
        </div>
      </div>
    </section>
  );
}