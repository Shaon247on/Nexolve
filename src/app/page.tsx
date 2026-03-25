// "use client"
import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import LoadingReveal from "@/components/element/loading-reveal";
import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/sections/landing/HeroSection";
import { ScrollAnimatedText } from "@/components/shared/SectionTitle";
import AboutSection from "@/components/sections/landing/AboutSection";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Premium B2B Design & Strategy`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <LoadingReveal />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection/>
      </main>
    </>
  );
}
