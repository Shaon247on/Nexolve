// "use client"
import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import HeroSection from "@/components/sections/landing/HeroSection";
import AboutSection from "@/components/sections/landing/AboutSection";
import SolutionsSection from "@/components/sections/landing/ServicesSection";
import SelectedWorksSection from "@/components/sections/landing/SelectedWorkSection";
import TestimonialsSection from "@/components/sections/landing/TestimonialsSection";
import LogoLooper from "@/components/shared/LogoLooper";
import WhyChooseUs from "@/components/sections/landing/WhyChooseUs";
import LetsCreate from "@/components/sections/landing/LetsCreate";
import FAQ from "@/components/sections/landing/FAQ";
import ProcessSection from "@/components/sections/landing/HowWeWork";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Premium B2B Design & Strategy`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ProcessSection/>
        <LogoLooper/>
        <SolutionsSection />
        <SelectedWorksSection />
        <TestimonialsSection />
        <LetsCreate/>
        <WhyChooseUs/>
        <FAQ/>
      </main>
    </>
  );
}
