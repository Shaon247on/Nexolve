"use client";

import TitleSection from "@/components/element/TitleSection";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";
import { Button } from "@/components/ui/button";
import { useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const team = [
  {
    id: 1,
    name: "Darrell Steward",
    role: "UI/UX Designer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    tag: "Conversion-focused",
  },
  {
    id: 2,
    name: "Amelia Courtney",
    role: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    tag: "Data-driven",
  },
  {
    id: 3,
    name: "Esther Howard",
    role: "Software Developer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    tag: "Built for scale",
  },
  {
    id: 4,
    name: "Jacob Jones",
    role: "Marketing CEO",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    tag: "User-centric",
  },
];

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

function TeamCard({
  member,
  index,
}: {
  member: (typeof team)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef as React.RefObject<HTMLElement>, 0.2);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-3"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(72px)",
        transition: `opacity 0.6s ease, transform 0.6s ease`,
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{ aspectRatio: "3/4" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Clean image — no filter, no overlay by default */}
        <Image
          width={50}
          height={100}
          src={member.image}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        {/* Glassmorphism blue overlay — only on hover */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(37,99,235,0.55) 100%)",
            backdropFilter: hovered ? "blur(6px) saturate(1.4)" : "blur(0px)",
            WebkitBackdropFilter: hovered
              ? "blur(6px) saturate(1.4)"
              : "blur(0px)",
            opacity: hovered ? 1 : 0,
            transition:
              "opacity 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease",
          }}
        />

        {/* Glass card info panel — slides up on hover */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(12px)",
            opacity: hovered ? 1 : 0,
            transition: "transform 0.4s ease, opacity 0.4s ease",
          }}
        >
          <div
            className="m-3 px-4 py-3 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <p className="text-white font-semibold text-sm sm:text-base leading-tight">
              {member.name}
            </p>
            <p className="text-blue-100 text-xs sm:text-sm mt-0.5">
              {member.role}
            </p>
          </div>
        </div>

        {/* Arrow button — top right, appears on hover */}
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.35)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.8)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 11L11 2M11 2H4M11 2V9"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Default: subtle name overlay at bottom — always visible, no blur */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <p className="text-white font-semibold text-sm sm:text-base leading-tight">
            {member.name}
          </p>
          <p className="text-white/70 text-xs sm:text-sm mt-0.5">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function TagRow() {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef as React.RefObject<HTMLElement>, 0.5);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 sm:mt-8 border-t border-gray-200 pt-6"
    >
      {team.map((member, i) => (
        <div
          key={member.id}
          className="text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(28px)",
            transition: `opacity 0.5s ease, transform 0.5s ease`,
            transitionDelay: `${i * 100}ms`,
          }}
        >
          <span className="text-gray-500 text-sm tracking-wide">
            [ {member.tag} ]
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TeamSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef as React.RefObject<HTMLElement>, 0.1);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });
  return (
    <section ref={headerRef} className="w-full">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div
          className="max-w-420 mx-auto "
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Header row */}
          <TitleSection
            scrollYProgress={scrollYProgress}
            title="Our Team"
            className="text-7xl md:text-9xl xl:text-[12rem]"
            topClassName="-top-10 md:-top-20"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-10 sm:mb-14">
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <ScrollAnimatedText title="Behind the Visionaries" className="" />
            </div>

            <div
              className="flex flex-col justify-end gap-6 lg:pt-32"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition:
                  "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
              }}
            >
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
                Creative experts designing meaningful digital experiences that
                help ambitious brands grow faster and lead their markets.
              </p>
              <div className="flex items-center gap-3">
                <Button>Join Our Team</Button>
              </div>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {team.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>

          {/* Tags row */}
          <TagRow />
        </div>
      </div>
    </section>
  );
}
