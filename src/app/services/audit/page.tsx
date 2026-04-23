import FAQ from "@/components/sections/landing/FAQ";
import PerformanceAuditFlowStack from "@/components/sections/services/performance-audit/PerformanceAuditFlowStack";
import PerformanceAuditIntroSection from "@/components/sections/services/performance-audit/PerformanceAuditIntroSection";
import PerformanceAuditProcessTimeline from "@/components/sections/services/performance-audit/PerformanceAuditProcessTimeline";
import PerformanceAuditTechHighlights from "@/components/sections/services/performance-audit/PerformanceAuditTechHighlights";

export const metadata = {
  title: "Performance Audit Service",
  description:
    "Performance audit services focused on Core Web Vitals, rendering bottlenecks, delivery strategy, and practical optimization roadmaps.",
};

function page() {
  return (
    <section>
      <PerformanceAuditIntroSection />

      <div>
        <PerformanceAuditProcessTimeline />
        <PerformanceAuditFlowStack />
        <PerformanceAuditTechHighlights />
        <FAQ />
      </div>
    </section>
  );
}

export default page;