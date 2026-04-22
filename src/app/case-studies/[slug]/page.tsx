import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyHero from "@/components/sections/case-study/CaseStudyHero";
import CaseStudyRichContent from "@/components/sections/case-study/CaseStudyRichContent";
import CaseStudyScrollGallery from "@/components/sections/case-study/CaseStudyScrollGallery";
import CaseStudyShowcaseGrid from "@/components/sections/case-study/CaseStudyShowcaseGrid";
import RelatedCaseStudies from "@/components/sections/case-study/RelatedCaseStudies";
import {
  caseStudies,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
} from "@/data/case-studies";

type CaseStudyDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    };
  }

  return {
    title: caseStudy.seoTitle,
    description: caseStudy.seoDescription,
    alternates: {
      canonical: `/case-studies/${caseStudy.slug}`,
    },
    openGraph: {
      title: caseStudy.seoTitle,
      description: caseStudy.seoDescription,
      url: `/case-studies/${caseStudy.slug}`,
      type: "article",
      images: [
        {
          url: caseStudy.coverImage,
          alt: caseStudy.coverAlt,
        },
      ],
    },
  };
}

export default async function CaseStudyDetailsPage({
  params,
}: CaseStudyDetailsPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedItems = getRelatedCaseStudies(
    caseStudy.relatedCaseStudySlugs
  ).map(
    ({
      seoTitle,
      seoDescription,
      client,
      duration,
      services,
      challenge,
      solution,
      outcome,
      heroSubtitle,
      intro,
      gallery,
      marqueeGallery,
      showcaseGallery,
      sections,
      relatedCaseStudySlugs,
      ...summary
    }) => summary
  );

  return (
    <main className="mt-10">
      <CaseStudyHero caseStudy={caseStudy} />
      <CaseStudyRichContent caseStudy={caseStudy} />

      <CaseStudyScrollGallery items={caseStudy.marqueeGallery} />

      <CaseStudyShowcaseGrid items={caseStudy.showcaseGallery} />

      <RelatedCaseStudies items={relatedItems} />
    </main>
  );
}