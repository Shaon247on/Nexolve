"use client";

import TitleSection from "@/components/element/TitleSection";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";
import { useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Marcus Thorne",
    role: "CTO",
    company: "NexusTech",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote:
      '"Orisa doesn\'t just build models; he builds engines for growth. His ability to deploy complex architectures with 99.9% reliability is what sets his work apart."',
    stars: 5,
  },
  {
    id: 2,
    name: "Amelia Chen",
    role: "Lead Architect",
    company: "FlowData",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote:
      '"From start to finish, the transition from raw data to a production-ready API was seamless. The efficiency gains in our pipeline exceeded all expectations."',
    stars: 5,
  },
  {
    id: 3,
    name: "Elena Rossi",
    role: "Head of AI",
    company: "Synthetix Systems",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    quote:
      '"Orisa possesses a rare architectural intuition. He successfully optimized our legacy neural networks, reducing latency by 40% without compromising on accuracy."',
    stars: 5,
  },
];

// Collapsed names shown above each column's full card
const collapsedAbove = [
  { id: "a1", name: "Daniel Park" },
  { id: "a2", name: "Sarah Jenkins" },
  { id: "a3", name: "Lena Fischer" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mt-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#111">
          <path d="M8 1l1.796 3.638L14 5.528l-3 2.924.708 4.124L8 10.5l-3.708 2.076L5 8.452 2 5.528l4.204-.89L8 1z" />
        </svg>
      ))}
    </div>
  );
}

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

function CollapsedCard({ name, delay }: { name: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, 0.1);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(50px)",
        transition: `opacity 0.6s ease, transform 0.6s ease`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="font-semibold text-gray-900 text-base">{name}</span>
      <button className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-lg leading-none">
        +
      </button>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  delay,
}: {
  testimonial: (typeof testimonials)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, 0.1);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-5 flex flex-col"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(60px)",
        transition: `opacity 0.65s ease, transform 0.65s ease`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Top row: name + plus */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <span className="font-semibold text-gray-900 text-base">
          {testimonial.name}
        </span>
        <button className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-lg leading-none">
          +
        </button>
      </div>

      {/* Role + company — right aligned */}
      <div className="text-right mb-3">
        <p className="text-xs text-gray-500 leading-tight">
          {testimonial.role}
        </p>
        <p className="text-xs text-gray-500 leading-tight">
          {testimonial.company}
        </p>
      </div>

      {/* Avatar */}
      <div className="mb-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>

      {/* Quote */}
      <p className="text-gray-700 text-sm leading-relaxed flex-1">
        {testimonial.quote}
      </p>

      <Stars count={testimonial.stars} />
    </div>
  );
}

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(
    headerRef as React.RefObject<HTMLElement>,
    0.1,
  );

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });
  const imgInView = useInView(imgRef as React.RefObject<HTMLElement>, 0.15);

  return (
    <section className="w-full bg-[#f0efed] overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-14 sm:py-18 lg:py-20">
        <div
          className="max-w-420 mx-auto"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <TitleSection title="Feedback" scrollYProgress={scrollYProgress}  topClassName="top-10 md:-top-10"/>
          {/* ── Header ── */}
          <div
            ref={headerRef}
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10 sm:mb-14 pt-30"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <ScrollAnimatedText
              title="Insights from Industry Partners"
              className="my-0"
            />

            <div className="flex flex-col sm:flex-row gap-8 lg:gap-16 lg:pt-10 lg:text-right">
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  245 Fifth Avenue, Suite 1800
                </p>
                <p className="text-sm text-gray-700">New York, NY 10016, USA</p>
              </div>
              <div>
                <p className="text-sm text-gray-700">+212-555-7398</p>
                <p className="text-sm text-gray-700">hello@orisa.com</p>
              </div>
            </div>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.1fr] gap-3 sm:gap-4 items-start">
            {/* Col 1 — collapsed card above Marcus */}
            <div className="flex flex-col gap-3">
              <CollapsedCard name={collapsedAbove[0].name} delay={0} />
              <TestimonialCard testimonial={testimonials[0]} delay={80} />
            </div>

            {/* Col 2 — full card (Amelia) above collapsed card (Sarah) */}
            <div className="flex flex-col gap-3">
              <TestimonialCard testimonial={testimonials[1]} delay={160} />
              <CollapsedCard name={collapsedAbove[1].name} delay={200} />
            </div>

            {/* Col 3 — collapsed card above Elena */}
            <div className="flex flex-col gap-3">
              <CollapsedCard name={collapsedAbove[2].name} delay={240} />
              <TestimonialCard testimonial={testimonials[2]} delay={300} />
            </div>

            {/* Col 4 — Image panel */}
            <div
              ref={imgRef}
              className="relative rounded-2xl overflow-hidden min-h-[320px] lg:row-span-1"
              style={{
                opacity: imgInView ? 1 : 0,
                transform: imgInView ? "translateY(0px)" : "translateY(60px)",
                transition:
                  "opacity 0.65s ease 0.36s, transform 0.65s ease 0.36s",
                height: "100%",
                minHeight: "420px",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop"
                alt="Real world experience"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white text-xl sm:text-2xl font-semibold leading-snug max-w-[200px]">
                  Real‑world experience through projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
