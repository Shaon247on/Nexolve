import FAQ from "@/components/sections/landing/FAQ";
import ProductDesignFlowStack from "@/components/sections/services/product-design/ProductDesignFlowStack";
import ProductDesignIntroSection from "@/components/sections/services/product-design/ProductDesignIntroSection";
import ProductDesignProcessTimeline from "@/components/sections/services/product-design/ProductDesignProcessTimeline";
import ProductDesignTechHighlights from "@/components/sections/services/product-design/ProductDesignTechHighlights";

export const metadata = {
  title: "Product Design Service",
  description:
    "Product design services focused on user journeys, scalable interface systems, responsive design thinking, and implementation-ready handoff.",
};

function page() {
  return (
    <section>
      <ProductDesignIntroSection />

      <div>
        <ProductDesignProcessTimeline />
        <ProductDesignFlowStack />
        <ProductDesignTechHighlights />
        <FAQ />
      </div>
    </section>
  );
}

export default page;