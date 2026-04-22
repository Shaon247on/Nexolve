import type { Metadata } from "next";
import CaseStudiesSection from "@/components/sections/case-study/CaseStudiesSection";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore case studies covering strategy, design, SEO, and development outcomes across modern digital projects.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies",
    description:
      "Explore case studies covering strategy, design, SEO, and development outcomes across modern digital projects.",
    url: "/case-studies",
    type: "website",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesSection />;
}