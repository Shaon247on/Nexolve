"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";

/* ─────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────*/
interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "01",
    quote:
      "The collaboration was seamless from start to finish. Their UX decisions significantly improved our product engagement.",
    name: "Lucas Moreno",
    role: "Product Manager",
    location: "Barcelona, Spain",
    avatar:
      "https://i.pinimg.com/1200x/7e/a0/38/7ea038488e43e5fec504d17fedc52723.jpg",
    company: "Architect",
    rating: 4,
  },
  {
    id: "02",
    quote:
      "A rare combination of technical expertise and artistic vision. The final result felt premium and purposeful.",
    name: "Hannah Lee",
    role: "Creative Director",
    location: "Studio Kinetic",
    avatar:
      "https://i.pinimg.com/1200x/7e/a0/38/7ea038488e43e5fec504d17fedc52723.jpg",
    company: "Cloudly",
    rating: 5,
  },
  {
    id: "03",
    quote:
      "They delivered not just a design, but a complete brand experience. Strategic, creative, and incredibly detail-oriented.",
    name: "Amelia Wright",
    role: "Head of Marketing",
    location: "London, United Kingdom",
    avatar:
      "https://i.pinimg.com/1200x/7e/a0/38/7ea038488e43e5fec504d17fedc52723.jpg",
    company: "Techlify",
    rating: 5,
  },
  {
    id: "04",
    quote:
      "Working with this team transformed how we think about our digital presence. Every pixel had a reason behind it.",
    name: "James Okafor",
    role: "CEO & Founder",
    location: "Lagos, Nigeria",
    avatar:
      "https://i.pinimg.com/1200x/7e/a0/38/7ea038488e43e5fec504d17fedc52723.jpg",
    company: "Stackwave",
    rating: 5,
  },
  {
    id: "05",
    quote:
      "Exceptionally professional and wildly creative. They pushed us beyond what we thought was possible for our brand.",
    name: "Sofia Rein",
    role: "Brand Strategist",
    location: "Berlin, Germany",
    avatar:
      "https://i.pinimg.com/1200x/7e/a0/38/7ea038488e43e5fec504d17fedc52723.jpg",
    company: "Moodboard",
    rating: 5,
  },
];

/* ─────────────────────────────────────────────────
   Star Rating
───────────────────────────────────────────────────*/
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i < count ? "#f97316" : "transparent"}
          stroke={i < count ? "#f97316" : "#555"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Testimonial Card
───────────────────────────────────────────────────*/
function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div className="flex flex-col h-full p-7 rounded-2xl border border-neutral-700 bg-[#1e1e1e] select-none transition-colors duration-300 hover:border-orange-500/40">
        {/* Top row: avatar + company pill */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-orange-500/30">
              <Image
                src={item.avatar}
                alt={item.name}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Online dot */}
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-orange-500 ring-2 ring-[#1e1e1e]" />
          </div>

          {/* Company pill */}
          <div className="flex items-center gap-1.5 px-3 pt-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-xs font-medium text-neutral-300 tracking-wide">
              {item.company}
            </span>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="flex-1 text-sm md:text-[0.95rem] text-neutral-300 leading-relaxed mb-6">
          "{item.quote}"
        </blockquote>

        {/* Stars */}
        <div className="mb-5">
          <StarRating count={item.rating} />
        </div>

        {/* Divider */}
        <div className="w-8 h-px bg-neutral-600 mb-5" />

        {/* Author */}
        <div>
          <p className="text-sm font-bold text-white">{item.name}</p>
          <p className="text-xs text-neutral-500 mt-0.5">{item.role}</p>
          <p className="text-xs text-neutral-600 mt-0.5">{item.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────
   Main Section
───────────────────────────────────────────────────*/
export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.9, 1],
    [0, 1, 1, 0],
  );
  const headingY = useTransform(scrollYProgress, [0.05, 0.3], [40, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-neutral-950 pt-24 md:pt-22 max-w-400 mx-auto rounded-xl"
    >
      {/* ── Ambient atmosphere ── */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full bg-orange-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-100 h-100 rounded-full bg-orange-500/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-420 px-6 md:px-10 lg:px-16">
        {/* ── Header row ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <motion.div style={{ y: headingY }}>
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5"
            >
              <div className="w-9 h-9 relative">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[3px]">
                  <div className="bg-orange-600 rounded-[2px]" />
                  <div className="bg-orange-600 rounded-[2px] translate-x-0.5" />
                  <div className="bg-orange-600 rounded-[2px] -translate-y-0.5" />
                  <div className="bg-orange-600 rounded-[2px]" />
                </div>
              </div>
            </motion.div>

            <ScrollAnimatedText
              transformedColor="#ffffff"
              title="Trusted by Clients"
              className=" text-5xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.16,
              }}
              className="text-sm text-neutral-500 max-w-xs leading-relaxed -mt-16"
            >
              Real client experiences that speak to the strength of our work.
            </motion.p>
          </motion.div>

          {/* "Client Stories" flower badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex-shrink-0 self-center md:self-end"
          >
            <motion.div
              animate={{ rotate: [0, 8, -6, 4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-24 h-24 flex items-center justify-center"
            >
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
              >
                <path
                  d="M50,10 C58,10 65,18 65,26 C73,22 83,26 85,34 C87,42 81,50 73,52 C79,58 79,70 71,74 C63,78 55,72 50,66 C45,72 37,78 29,74 C21,70 21,58 27,52 C19,50 13,42 15,34 C17,26 27,22 35,26 C35,18 42,10 50,10 Z"
                  fill="#ea580c"
                />
              </svg>
              <span className="relative z-10 text-center text-[9px] font-black uppercase tracking-widest text-white leading-tight">
                Client
                <br />
                Stories
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── shadcn Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 pt-6">
              {testimonials.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3 px-6"
                >
                  <TestimonialCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom styled Prev / Next buttons to match design */}
            <div className="flex items-center justify-end gap-3 my-8">
              <CarouselPrevious
                className="
                  static translate-y-0
                  w-11 h-11 rounded-full
                  border border-neutral-700 bg-transparent
                  text-neutral-400
                  hover:border-orange-500 hover:text-orange-500 hover:bg-transparent
                  disabled:opacity-30
                  transition-colors duration-200
                "
              />
              <CarouselNext
                className="
                  static translate-y-0
                  w-11 h-11 rounded-full
                  border border-neutral-700 bg-transparent
                  text-neutral-400
                  hover:border-orange-500 hover:text-orange-500 hover:bg-transparent
                  disabled:opacity-30
                  transition-colors duration-200
                "
              />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
