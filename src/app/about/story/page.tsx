import ServicesSection from "@/components/sections/about/story/ServicesSection";
import StackedProcessSection from "@/components/sections/about/story/StackedProcessSection";
import DynamicParallaxImage from "@/components/sections/landing/DynamicParallaxImage";

export default function Page() {
  return (
    <section>
      <div className="w-full px-4 sm:px-6 lg:px-10 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1680px] mx-auto">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 md:gap-10 xl:gap-16 mb-8 md:mb-12 lg:mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem] leading-none font-semibold tracking-tight max-w-full xl:max-w-[55%]">
              Our Story
            </h1>

            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-neutral-700 max-w-full sm:max-w-2xl xl:max-w-xl xl:pt-24 2xl:pt-32">
              We started with a simple belief: great technology should solve
              real business problems, not create more complexity. What began as
              a small team of passionate developers, designers, and
              problem-solvers has grown into an IT company focused on building
              reliable, scalable, and high-performing digital solutions.
            </p>
          </div>

          <DynamicParallaxImage
            src="https://i.pinimg.com/736x/b7/c8/d4/b7c8d40387f0752e6f603f0bc475ebb8.jpg"
            alt="Hero image"
            containerClassName="w-full h-[280px] sm:h-[380px] md:h-[500px] lg:h-[650px] xl:h-[calc(100vh-220px)] rounded-2xl md:rounded-3xl"
            contentClassName="relative w-full h-full"
            imageClassName="object-cover object-center"
            range={[-40, 40]}
          />
        </div>
      </div>
      <ServicesSection />
      <StackedProcessSection />
    </section>
  );
}
