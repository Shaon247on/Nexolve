import DynamicParallaxImage from "@/components/sections/landing/DynamicParallaxImage";
import { productDesignServiceData } from "@/data/product-design-service";

export default function ProductDesignIntroSection() {
  const data = productDesignServiceData;

  return (
    <div className="w-full py-12 md:py-16 lg:py-20">
      <div className="mb-8 flex flex-col gap-8 px-4 sm:px-6 md:mb-12 md:gap-10 lg:mb-16 lg:px-10 xl:flex-row xl:items-start xl:justify-between xl:gap-16">
        <h1 className="max-w-full text-5xl leading-none font-semibold tracking-tight sm:text-3xl md:text-5xl lg:text-6xl xl:max-w-[55%] xl:text-[8rem] 2xl:text-[10rem]">
          {data.heroTitle}
        </h1>

        <p className="max-w-full text-sm leading-7 text-neutral-700 sm:max-w-2xl sm:text-base md:text-lg md:leading-8 xl:max-w-xl">
          {data.heroDescription}
        </p>
      </div>

      <DynamicParallaxImage
        src={data.heroImage}
        alt="Product design service hero image"
        containerClassName="w-full h-[280px] sm:h-[380px] md:h-[500px] lg:h-[750px] xl:h-[calc(100vh-100px)]"
        contentClassName="relative w-full h-full"
        imageClassName="object-cover"
        range={[-240, 150]}
      />
    </div>
  );
}