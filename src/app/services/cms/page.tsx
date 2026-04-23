import FAQ from "@/components/sections/landing/FAQ";
import CmsIntegrationFlowStack from "@/components/sections/services/cms-integration/CmsIntegrationFlowStack";
import CmsIntegrationIntroSection from "@/components/sections/services/cms-integration/CmsIntegrationIntroSection";
import CmsIntegrationProcessTimeline from "@/components/sections/services/cms-integration/CmsIntegrationProcessTimeline";
import CmsIntegrationTechHighlights from "@/components/sections/services/cms-integration/CmsIntegrationTechHighlights";

export const metadata = {
  title: "CMS Integration Service",
  description:
    "Flexible CMS integration services focused on structured content modeling, scalable frontend architecture, and editor-friendly publishing workflows.",
};

export default function Page() {
  return (
    <section>
      <CmsIntegrationIntroSection />

      <div>
        <CmsIntegrationProcessTimeline />
        <CmsIntegrationFlowStack />
        <CmsIntegrationTechHighlights />
        <FAQ />
      </div>
    </section>
  );
}