import FAQ from "@/components/sections/landing/FAQ";
import UiUxFlowStack from "@/components/sections/services/ui-ux/UiUxFlowStack";
import UiUxIntroSection from "@/components/sections/services/ui-ux/UiUxIntroSection";
import UiUxProcessTimeline from "@/components/sections/services/ui-ux/UiUxProcessTimeline";
import UiUxTechHighlights from "@/components/sections/services/ui-ux/UiUxTechHighlights";

export const metadata = {
  title: "UI/UX Design Service",
  description:
    "UI/UX design services focused on user journeys, interface clarity, responsive systems, and developer-ready design handoff.",
};

function page() {
  return (
    <section>
      <UiUxIntroSection />

      <div>
        <UiUxProcessTimeline />
        <UiUxFlowStack />
        <UiUxTechHighlights />
        <FAQ />
      </div>
    </section>
  );
}

export default page;