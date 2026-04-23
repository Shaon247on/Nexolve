import DynamicParallaxImage from "@/components/sections/landing/DynamicParallaxImage";
import { cmsIntegrationServiceData } from "@/data/cms-integration-service";

export default function CmsIntegrationIntroSection() {
  const data = cmsIntegrationServiceData;

  return (
    <div className="w-full py-12 md:py-16 lg:py-20">
      <div className="flex px-4 sm:px-6 lg:px-10 flex-col xl:flex-row xl:items-start xl:justify-between gap-8 md:gap-10 xl:gap-16 mb-8 md:mb-12 lg:mb-16">
        <h1 className="text-5xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-[8rem] 2xl:text-[10rem] leading-none font-semibold tracking-tight max-w-full xl:max-w-[55%]">
          {data.heroTitle}
        </h1>

        <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-neutral-700 max-w-full sm:max-w-2xl xl:max-w-xl">
          {data.heroDescription}
        </p>
      </div>

      <DynamicParallaxImage
        src={data.heroImage}
        alt="CMS integration service hero image"
        containerClassName="w-full h-[280px] sm:h-[380px] md:h-[500px] lg:h-[750px] xl:h-[calc(100vh-100px)]"
        contentClassName="relative w-full h-full"
        imageClassName="object-cover"
        range={[-240, 150]}
      />
    </div>
  );
}