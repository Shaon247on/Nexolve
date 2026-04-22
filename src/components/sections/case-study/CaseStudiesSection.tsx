import CaseStudyFilterBar from "@/components/sections/case-study/CaseStudyFilterBar";
import { caseStudySummaries } from "@/data/case-studies";
import Image from "next/image";
import Link from "next/link";

export default function CaseStudiesSection() {
  const featured = caseStudySummaries.find((item) => item.featured);
  const rest = caseStudySummaries.filter((item) => !item.featured);

  return (
    <section className=" py-14 md:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
              Insights & Results
            </p>
            <h1 className="mt-3 text-4xl font-medium tracking-[-0.07em] text-black md:text-6xl xl:text-7xl">
              Case Studies
            </h1>
          </div>

          <p className="max-w-xl text-sm leading-6 text-black/65 md:text-base">
            A closer look at how strategy, design, and development decisions
            translate into measurable business outcomes across different
            industries.
          </p>
        </div>

        {featured ? (
          <div className="mb-12 overflow-hidden rounded-[32px] border border-black/10 bg-white/70 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[300px] overflow-hidden rounded-[24px] md:min-h-[440px]">
                <Image
                  width={1920}
                  height={1080}
                  src={featured.coverImage}
                  alt={featured.coverAlt}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center p-2 md:p-6">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-black/55">
                  <span>Featured</span>
                  <span className="h-1 w-1 rounded-full bg-black/30" />
                  <span>{featured.category}</span>
                  <span className="h-1 w-1 rounded-full bg-black/30" />
                  <span>{featured.industry}</span>
                </div>

                <h2 className="text-3xl font-medium leading-tight tracking-[-0.06em] text-black md:text-5xl">
                  {featured.title}
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-black/65 md:text-base">
                  {featured.excerpt}
                </p>

                <Link
                  href={`/case-studies/${featured.slug}`}
                  className="mt-8 inline-flex w-fit rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/90"
                >
                  View Case Study
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <CaseStudyFilterBar caseStudies={rest} />
      </div>
    </section>
  );
}
