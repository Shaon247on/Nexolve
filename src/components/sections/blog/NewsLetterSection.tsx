"use client";

import Image from "next/image";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";

export default function NewsletterSection() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16 xl:px-16">
      <div className="mx-auto max-w-[1740px]">
        <div className="rounded-[28px] bg-[#f3f3f1] px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 xl:px-14 xl:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)_minmax(420px,530px)] lg:items-center lg:gap-10 xl:grid-cols-[220px_minmax(0,1fr)_530px] xl:gap-14">
            <div className="order-1">
              <div className="relative h-[140px] w-full max-w-[206px] overflow-hidden rounded-[10px] sm:h-[150px] sm:max-w-[220px]">
                <Image
                  src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=900&auto=format&fit=crop"
                  alt="Newsletter preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 206px, 220px"
                />
              </div>
            </div>

            <div className="order-2 max-w-[720px]">
              <div className="mb-4 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-tight text-[#222222] sm:mb-5">
                <span>Newsletter</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>

              <ScrollAnimatedText
              title="Stay ahead"
              className="sm:text-[58px] md:text-[72px] lg:text-[82px] xl:text-[92px]"
              />

              <p className=" max-w-[780px] text-[20px] leading-[1.12] tracking-[-0.03em] text-[#666666] sm:-mt-20 sm:text-[24px] md:text-[28px] lg:text-[34px] xl:text-[38px]">
                Get practical insights, trends, and strategies we use to help brands
                grow—delivered monthly, no spam.
              </p>
            </div>

            <div className="order-3 w-full lg:justify-self-end">
              <form className="w-full">
                <div className="flex items-center rounded-[12px] bg-white p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.03)] sm:p-4">
                  <input
                    type="email"
                    placeholder="Enter you mail .."
                    className="h-14 w-full border-0 bg-transparent px-3 text-base text-[#222222] outline-none placeholder:text-[#7a7a7a] sm:h-16 sm:px-4 sm:text-lg"
                  />

                  <button
                    type="submit"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] bg-[#1f1f1f] text-white transition-colors duration-200 hover:bg-black sm:h-16 sm:w-16"
                    aria-label="Submit email"
                  >
                    <MoveRight className="h-5 w-5" />
                  </button>
                </div>

                <p className="mt-5 max-w-[520px] text-[16px] leading-[1.15] tracking-[-0.02em] text-[#555555] sm:text-[18px] md:text-[20px]">
                  By clicking the button, you are agreeing with our Term &
                  Conditions
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}