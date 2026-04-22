import Image from "next/image";
import { CaseStudyDetail } from "@/types/case-study";
import DynamicParallaxImage from "../landing/DynamicParallaxImage";

type CaseStudyHeroProps = {
  caseStudy: CaseStudyDetail;
};

export default function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  return (
    <section className=" pt-10 md:pt-14">
      <div className="mx-auto max-w-420 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
            {caseStudy.heroSubtitle}
          </p>
          <h1 className="mt-4 text-4xl font-medium leading-[0.95] tracking-[-0.07em] text-black md:text-6xl xl:text-7xl">
            {caseStudy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-black/65 md:text-base">
            {caseStudy.intro}
          </p>
        </div>

        <div className="relative max-h-[calc(100vh-200px)] overflow-hidden rounded-[30px] border-2">
          <div className="relative aspect-16/10 md:aspect-[16/8.2]">
            {/* <Image
              src={caseStudy.coverImage}
              alt={caseStudy.coverAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            /> */}
            <DynamicParallaxImage
            src={caseStudy.coverImage}
            alt={caseStudy.coverAlt}
            containerClassName="aspect-16/10 md:aspect-[16/8.2] w-full h-[110%]"
            contentClassName="relative "
            imageClassName="object-cover object-top"
            range={[-240, 150]}
          />
          </div>

          {caseStudy.stat ? (
            <div className="absolute left-4 top-4 rounded-[20px] bg-black/50 px-5 py-4 text-white backdrop-blur-md md:left-8 md:top-8 md:px-7 md:py-5">
              <p className="text-3xl font-semibold tracking-[-0.06em] md:text-[56px]">
                {caseStudy.stat.value}
              </p>
              <p className="text-sm text-white/85 md:text-lg">
                {caseStudy.stat.label}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}