// "use client"
import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import LoadingReveal from "@/components/element/loading-reveal";
import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/sections/HeroSection";

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
        <section
          className="min-h-screen bg-white flex items-center justify-center"
          aria-label="Coming soon"
        >
          <p className="font-body text-slate-300 text-sm tracking-widest uppercase">
            More sections — coming soon
          </p>
        </section>
      </main>
    </>
  );
}
