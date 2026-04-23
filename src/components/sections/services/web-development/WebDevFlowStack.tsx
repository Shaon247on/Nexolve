"use client";

import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

type WebDevFlowCard = {
  id: number;
  step: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  alt: string;
  deliverables: string[];
};

const webDevFlowCards: WebDevFlowCard[] = [
  {
    id: 1,
    step: "01",
    tag: "Discovery",
    title: "We start with business goals, user needs, and technical clarity",
    description:
      "Every strong product starts with alignment. We define requirements, understand the audience, evaluate the product direction, and map the technical scope before design and development begin.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    alt: "Team in a discovery workshop discussing product strategy",
    deliverables: [
      "Requirement mapping",
      "Feature scope",
      "User journey planning",
      "Technical direction",
    ],
  },
  {
    id: 2,
    step: "02",
    tag: "UX & UI",
    title: "We shape the interface before moving into production code",
    description:
      "We organize content, define flows, and create interface patterns that feel intuitive, scalable, and visually aligned with the brand. This creates a clearer path to development.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
    alt: "Designer working on wireframes and interface layouts",
    deliverables: [
      "Wireframes",
      "Responsive layouts",
      "Design system rules",
      "Interaction planning",
    ],
  },
  {
    id: 3,
    step: "03",
    tag: "Development",
    title: "We build fast, maintainable, and production-ready systems",
    description:
      "Using modern frontend architecture and scalable development practices, we turn approved designs into performant digital products with reusable components and clean code structure.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop",
    alt: "Developer writing code on a laptop in a modern workspace",
    deliverables: [
      "Reusable components",
      "API integration",
      "Responsive development",
      "Performance optimization",
    ],
  },
  {
    id: 4,
    step: "04",
    tag: "Testing",
    title: "We refine quality, responsiveness, and real-world usability",
    description:
      "Before launch, we validate the product across devices, browsers, and user flows. We remove friction, improve loading performance, and make sure the experience feels polished everywhere.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
    alt: "Team testing product performance and reviewing UX on multiple screens",
    deliverables: [
      "Cross-device QA",
      "Bug fixing",
      "Accessibility review",
      "Performance checks",
    ],
  },
  {
    id: 5,
    step: "05",
    tag: "Launch",
    title: "We prepare the platform for deployment, growth, and iteration",
    description:
      "A successful launch is not the end of the process. We help ensure deployment readiness, search performance, stability, and a strong foundation for future scaling and updates.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    alt: "Analytics dashboard and launch metrics on large display",
    deliverables: [
      "Deployment readiness",
      "SEO foundation",
      "Analytics setup",
      "Post-launch support",
    ],
  },
];

function WebDevFlowCardItem({
  item,
  index,
  total,
  progress,
}: {
  item: WebDevFlowCard;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;
  const prevStart = Math.max(0, start - segment);

  const firstCardY = useTransform(progress, [0, segment], ["0%", "0%"]);
  const stackedCardY = useTransform(
    progress,
    [prevStart, start, end],
    ["100%", "0%", "0%"]
  );

  const y = index === 0 ? firstCardY : stackedCardY;

  const scale = useTransform(progress, [start, end], [1, 0.92]);
  const opacity = useTransform(progress, [start, end], [1, 0.96]);
  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: index + 1,
        transformOrigin: "top center",
      }}
      className="absolute inset-0 will-change-transform"
    >
      <div className="flex h-screen w-full items-center justify-center bg-[#f7f7f5]">
        <div className="grid h-[calc(100vh-2rem)] w-full grid-cols-1 overflow-hidden border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative h-[50vh] min-h-[320px] lg:h-full">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              priority={index < 2}
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/5 to-transparent" />

            <div className="absolute left-4 top-4 flex items-center gap-3 md:left-6 md:top-6">
              <span className="inline-flex rounded-full border border-white/20 bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                {item.tag}
              </span>
              <span className="text-sm font-medium text-white">
                {item.step} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-10 xl:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                Web Development Flow
              </p>

              <h2 className="mt-4 max-w-[14ch] text-3xl leading-[0.95] font-semibold tracking-[-0.06em] text-black md:text-5xl xl:text-6xl">
                {item.title}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                {item.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {item.deliverables.map((deliverable) => (
                  <span
                    key={deliverable}
                    className="rounded-full border border-black/10 bg-[#f7f7f5] px-4 py-2 text-xs font-medium text-black/75 md:text-sm"
                  >
                    {deliverable}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 text-sm text-black/40">
              <span>Scroll to continue</span>
              <span className="inline-flex items-center gap-2">
                Next phase
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WebDevFlowStack() {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#f7f7f5] text-neutral-900"
      style={{
        height: `${webDevFlowCards.length * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full w-full">
          {webDevFlowCards.map((item, index) => (
            <WebDevFlowCardItem
              key={item.id}
              item={item}
              index={index}
              total={webDevFlowCards.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
