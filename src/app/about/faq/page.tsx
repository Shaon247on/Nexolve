import BrowseByTopicSection from "@/components/sections/about/faq/BrowseByTopicSection";
import FAQSection from "@/components/sections/about/faq/FaqCardsSection";
import Test from "@/components/sections/about/faq/test";
import DynamicParallaxImage from "@/components/sections/landing/DynamicParallaxImage";
import React from "react";

function page() {
  return (
    <section>
      <div className="w-full  py-12 md:py-16 lg:py-20">
        <div className="">
          <div className="flex px-4 sm:px-6 lg:px-10  flex-col xl:flex-row xl:items-start xl:justify-between gap-8 md:gap-10 xl:gap-16 mb-8 md:mb-12 lg:mb-16">
            <h1 className="text-5xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-[8rem] 2xl:text-[10rem] leading-none font-semibold tracking-tight max-w-full xl:max-w-[55%]">
              FAQ
            </h1>

            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-neutral-700 max-w-full sm:max-w-2xl xl:max-w-xl">
              We started with a simple belief: great technology should solve
              real business problems, not create more complexity. What began as
              a small team of passionate developers, designers, and
              problem-solvers has grown into an IT company focused on building
              reliable, scalable, and high-performing digital solutions.
            </p>
          </div>

          <DynamicParallaxImage
            src="https://i.pinimg.com/1200x/9f/eb/5d/9feb5dd4f5706b48acc3d12f5755f5fc.jpg"
            alt="Hero image"
            containerClassName="w-full h-[280px] sm:h-[380px] md:h-[500px] lg:h-[750px] xl:h-[calc(100vh-100px)]"
            contentClassName="relative w-full h-full"
            imageClassName="object-cover object-top"
            range={[-240, 150]}
          />
        </div>
      </div>

      <div>
        <BrowseByTopicSection />
        <FAQSection />
      </div>
    </section>
  );
}

export default page;
