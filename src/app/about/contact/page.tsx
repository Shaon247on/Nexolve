import ContactUsForm from "@/components/sections/about/contact/ContactUsForm";
import OurTeam from "@/components/sections/about/team/OurTeam";
import Testimonials from "@/components/sections/about/team/Testimonials";
import DynamicParallaxImage from "@/components/sections/landing/DynamicParallaxImage";
import React from "react";

function page() {
  return (
    <div>
      <div className="w-full py-12 md:py-16 lg:py-24">
        <div className="">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 md:gap-10 xl:gap-16 mb-8 md:mb-12 lg:mb-16">
            <h1 className="text-5xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-[8rem] 2xl:text-[10rem] leading-none font-semibold tracking-tight max-w-full xl:max-w-[55%]">
              Contact Us
            </h1>

            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-neutral-700 max-w-full sm:max-w-2xl xl:max-w-xl">
              Every successful project begins with a conversation. Whether you
              need expert guidance, a reliable development partner, or support
              for your next digital initiative, our team is ready to understand
              your needs and provide the right solutions to help your business
              grow.
            </p>
          </div>

          <DynamicParallaxImage
            src="https://i.pinimg.com/1200x/e1/d9/51/e1d951f1151c7c0e8d74ccefa3ce8f58.jpg"
            alt="Hero image"
            containerClassName="w-full h-[280px] sm:h-[380px] md:h-[500px] lg:h-[750px] xl:h-[calc(100vh-100px)]"
            contentClassName="relative w-full h-full"
            imageClassName="object-cover object-top grayscale"
            range={[-240, 150]}
          />
        </div>
      </div>
      <ContactUsForm/>
    </div>
  );
}

export default page;
