import FAQ from "@/components/sections/landing/FAQ";
import AppDevFlowStack from "@/components/sections/services/app-development/AppDevFlowStack";
import AppDevIntroSection from "@/components/sections/services/app-development/AppDevIntroSection";
import AppDevProcessTimeline from "@/components/sections/services/app-development/AppDevProcessTimeline";
import AppDevTechHighlights from "@/components/sections/services/app-development/AppDevTechHighlights";

export const metadata = {
  title: "App Development Service",
  description:
    "Modern app development services focused on scalable architecture, mobile-first UX, performance, and reliable production delivery.",
};

export default function Page() {
  return (
    <section>
      <AppDevIntroSection />

      <div>
        <AppDevProcessTimeline />
        <AppDevFlowStack />
        <AppDevTechHighlights />
        <FAQ />
      </div>
    </section>
  );
}