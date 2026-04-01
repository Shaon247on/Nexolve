"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Plus, ArrowUpRight } from "lucide-react";
import TitleSection from "@/components/element/TitleSection";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";

const processSteps = [
  {
    id: "01",
    title: "System Audit & Discovery",
    time: "2-3 Weeks",
    tag: "Audit",
    description:
      "Deep-dive analysis of existing infrastructure to identify bottlenecks and scaling opportunities.",
    image:
      "https://i.pinimg.com/736x/0e/fd/b0/0efdb0798a911b1e1cc0782fc1a31777.jpg",
  },
  {
    id: "02",
    title: "Architectural Strategy",
    time: "3-4 Weeks",
    tag: "Strategy",
    description:
      "Designing the high-level roadmap and neural architecture for the upcoming implementation.",
    image:
      "https://i.pinimg.com/736x/30/8b/b9/308bb9e69ee6303d20f9dffb676a20dd.jpg",
  },
  {
    id: "03",
    title: "Neural Network Design",
    time: "4-5 Weeks",
    tag: "Design",
    description:
      "Custom model training and layer optimization tailored to your business dataset.",
    image:
      "https://i.pinimg.com/1200x/80/84/d7/8084d7646dace8e54f3ecd2b1e8b7b7e.jpg",
  },
  {
    id: "04",
    title: "Data Pipeline Engineering",
    time: "3-5 Weeks",
    tag: "Data",
    description:
      "Constructing high-throughput ETL pipelines for real-time inference processing.",
    image:
      "https://i.pinimg.com/736x/2f/53/42/2f5342f9630657148b0d24c859f27861.jpg",
  },
  {
    id: "05",
    title: "Production Deployment",
    time: "2-3 Weeks",
    tag: "DevOps",
    description:
      "Cloud-native deployment with automated scaling and container orchestration.",
    image:
      "https://i.pinimg.com/1200x/52/07/b0/5207b06e14a275c3ae5081e6746756dd.jpg",
  },
  {
    id: "06",
    title: "Optimization & Support",
    time: "Ongoing Continuous optimization",
    tag: "Support",
    description:
      "Continuous monitoring and iterative model retraining to ensure peak performance.",
    image:
      "https://i.pinimg.com/736x/8f/73/7c/8f737c10fcb682a7f67203f4487f0dcf.jpg",
  },
];

const CARD_TOP_OFFSET = 30; // px from top for first card
const CARD_STACK_GAP = 20; // px each subsequent card shifts down
const CARD_HEIGHT = 390; // px — must match the h-[600px] below

export default function StackedProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
 const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });
  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f6f6f6] py-24"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.03]">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-black" />
        ))}
      </div>

        <TitleSection
        title="Our Process"
        scrollYProgress={scrollYProgress}
        className="text-[4rem] md:text-[7rem] lg:text-[10rem] xl:text-[13rem]"
        topClassName="top-2"
        opacityRange={[0, 0.4]}
        />
      <div className="max-w-420 mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start mb-40 gap-10 mt-20">
          <div className="space-y-4">
            <ScrollAnimatedText
            title="How We Work"
            />
          </div>
          <p className="text-xl text-gray-500 max-w-sm leading-tight pt-4">
            A systematic approach to building production-ready AI solutions from
            the ground up.
          </p>
        </header>

        {/*
          Each card needs its own scroll room to animate into the stack.
          We give every card a wrapper that is tall enough to drive its sticky scroll.
          The last card gets extra room so it fully settles before the section ends.
        */}
        <div className="relative">
          {processSteps.map((step, index) => (
            <Card
              key={step.id}
              step={step}
              index={index}
              total={processSteps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  step,
  index,
  total,
}: {
  step: (typeof processSteps)[0];
  index: number;
  total: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,

    offset: ["start end", "end end"],
  });

  const cardsAbove = total - 1 - index; // how many cards will stack on top
  const targetScale = 1 - cardsAbove * 0.04;

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.85 - cardsAbove * 0.03],
  );

  const stickyTop = CARD_TOP_OFFSET + index * CARD_STACK_GAP;

  return (
    <div
      ref={wrapperRef}
      style={{
        height:
          index === total - 1
            ? `calc(${CARD_HEIGHT}px + 10vh)`
            : `calc(${CARD_HEIGHT}px + 15vh)`,

        position: "relative",
        zIndex: index + 1,
      }}
    >
      <div
        className="sticky w-full flex items-start justify-center"
        style={{ top: stickyTop }}
      >
        <motion.div
          style={{ scale, opacity, transformOrigin: "top center", height: CARD_HEIGHT }}
          className="relative w-full bg-white  shadow-[0_-20px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-black/5 flex flex-col lg:flex-row p-4"
          // Fixed pixel height so the scale shrink is visually consistent
          // and the sticky top offsets line up predictably
        //   st={{  }}
          // ↑ Tailwind can't use a JS variable, so use inline style:
          // replace the line above with the style prop below ↓
        >
          {/* Left Side: Image */}
          <div className="relative w-full lg:w-[30%] h-64 lg:h-full bg-gray-200 overflow-hidden ">
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side: Content */}
          <div className="flex-1 p-8 md:p-16 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h3 className="text-3xl md:text-5xl font-semibold tracking-tighter text-black flex items-baseline">
                  <span className="text-xl md:text-2xl text-gray-300 font-medium mr-4">
                    {step.id}
                  </span>
                  {step.title}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
                    {step.time}
                  </span>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50  border border-gray-100">
                    <span className="text-[10px] font-black uppercase text-black">
                      {step.tag}
                    </span>
                    <Plus className="w-3.5 h-3.5 text-black" />
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-gray-100 w-full" />

              <p className="text-gray-500 text-lg md:text-2xl leading-snug max-w-2xl font-light">
                {step.description}
              </p>
            </div>

            <div className="flex items-center justify-end mt-12">
              <button className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-black">
                Explore Detail
                <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
