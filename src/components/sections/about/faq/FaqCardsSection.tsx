"use client";

import { useRef, useEffect, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";

const faqSections = [
  {
    id: "general",
    index: "01",
    title: "General Questions",
    description:
      "Essential questions to understand who we are, what we do, and who we work with.",
    faqs: [
      {
        q: "What does your company do?",
        a: "We are a full-service IT company specializing in web development, mobile app development, DevOps, UI/UX design, and business strategy consulting. We help ambitious brands build reliable digital products and grow faster.",
      },
      {
        q: "Who do you typically work with?",
        a: "We work with startups, scale-ups, and established enterprises across industries. Whether you're launching your first product or modernizing a legacy system, we tailor our approach to your stage and goals.",
      },
      {
        q: "Are you a full-service digital agency?",
        a: "Yes. From ideation and design to development, deployment, and ongoing support — we handle the full product lifecycle under one roof.",
      },
      {
        q: "Do you work with international clients?",
        a: "Absolutely. Our team operates across time zones and we have active clients in North America, Europe, the Middle East, and Southeast Asia.",
      },
    ],
  },
  {
    id: "services",
    index: "02",
    title: "Services & Solutions",
    description:
      "Everything you need to know about what we build and how we deliver value.",
    faqs: [
      {
        q: "What web development services do you offer?",
        a: "We build everything from marketing websites and SaaS platforms to complex enterprise portals. Our stack includes Next.js, React, Node.js, and more — always chosen for your specific needs.",
      },
      {
        q: "Do you build mobile applications?",
        a: "Yes. We develop native iOS and Android apps as well as cross-platform solutions using React Native and Flutter, ensuring smooth performance across all devices.",
      },
      {
        q: "What does your DevOps service include?",
        a: "Our DevOps team handles CI/CD pipeline setup, infrastructure as code, containerization with Docker and Kubernetes, cloud architecture on AWS/GCP/Azure, and 24/7 monitoring.",
      },
      {
        q: "Can you help with UI/UX design only?",
        a: "Absolutely. We offer standalone design services including user research, wireframing, prototyping, design systems, and full visual design — whether or not we're building the product.",
      },
      {
        q: "Do you offer business strategy consulting?",
        a: "Yes. Our strategy team helps you define product roadmaps, go-to-market strategies, technology audits, and digital transformation plans aligned with your business objectives.",
      },
    ],
  },
  {
    id: "process",
    index: "03",
    title: "Process & Collaboration",
    description:
      "How we work, communicate, and deliver projects — transparently and efficiently.",
    faqs: [
      {
        q: "What does your project process look like?",
        a: "We follow an agile approach: Discovery → Design → Development → Testing → Launch → Support. Each phase has clear deliverables, timelines, and checkpoints so you're never in the dark.",
      },
      {
        q: "How do you handle communication during a project?",
        a: "We assign a dedicated project manager as your single point of contact. We use Slack for day-to-day communication, Jira or Linear for task tracking, and hold weekly video syncs.",
      },
      {
        q: "Can we be involved in the design and development process?",
        a: "Yes — and we encourage it. We share Figma prototypes, staging environments, and sprint demos so you can give feedback early and often before anything is finalized.",
      },
      {
        q: "How long does a typical project take?",
        a: "It depends on scope. A landing site takes 2–4 weeks. A full SaaS product typically takes 3–6 months. We provide a detailed timeline after the discovery phase.",
      },
    ],
  },
  {
    id: "engagement",
    index: "04",
    title: "Engagement & Support",
    description:
      "Pricing, contracts, and what happens after your product goes live.",
    faqs: [
      {
        q: "How do you structure pricing?",
        a: "We offer fixed-price projects for well-defined scopes and time-and-materials for evolving engagements. We're transparent about costs upfront with no hidden fees.",
      },
      {
        q: "Do you offer retainer or ongoing support plans?",
        a: "Yes. We have monthly retainer packages covering maintenance, feature development, performance monitoring, and priority support — ideal for clients who want a long-term technology partner.",
      },
      {
        q: "What happens after the project launches?",
        a: "We provide a warranty period post-launch to fix any bugs at no cost. After that, you can opt into one of our support plans or hand off to your internal team with full documentation.",
      },
      {
        q: "Do you sign NDAs and offer IP ownership?",
        a: "Yes. We sign NDAs before any discovery conversation. All code, designs, and assets produced for your project are fully owned by you upon final payment.",
      },
    ],
  },
];

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

function FAQStackCard({
  section,
  index,
  total,
  progress,
}: {
  section: (typeof faqSections)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;
  const prevStart = Math.max(0, start - segment);

  const y =
    index === 0
      ? useTransform(progress, [0, segment], ["0%", "0%"])
      : useTransform(progress, [prevStart, start, end], ["100%", "0%", "0%"]);

  const scale =
    index === total - 1
      ? useTransform(progress, [start, end], [1, 1])
      : useTransform(progress, [start, end], [1, 0.9]);

  const opacity =
    index === total - 1
      ? useTransform(progress, [start, end], [1, 1])
      : useTransform(progress, [start, end], [1, 0.96]);

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
      <div className="flex h-screen w-full items-center justify-center py-4">
        <div className="h-[calc(100vh-2rem)] w-full overflow-hidden border border-gray-200 bg-white shadow-[0_2px_24px_0_rgba(0,0,0,0.06)]">
          <div className="flex min-h-full flex-col lg:flex-row">
            <div className="flex w-full shrink-0 flex-col justify-start border-b border-gray-100 px-6 py-10 sm:px-10 lg:w-[38%] lg:border-b-0 lg:border-r lg:px-14 lg:py-16">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xs font-mono tracking-widest text-gray-400">
                  [{section.index}]
                </span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M2 11L11 2M11 2H4M11 2V9"
                    stroke="#aaa"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <ScrollAnimatedText title={section.title} />

              <p className="max-w-xs text-sm leading-relaxed text-gray-500 sm:text-base">
                {section.description}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {section.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`${section.id}-${i}`}
                    className="rounded-xl border border-gray-200 px-5 data-[state=open]:border-gray-300"
                  >
                    <AccordionTrigger className="py-5 text-left hover:no-underline">
                      <div className="flex items-center gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs font-semibold text-white">
                          {i + 1}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 sm:text-base">
                          {faq.q}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pl-11 text-sm leading-relaxed text-gray-600 sm:text-base">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StillHaveQuestions() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, 0.2);

  return (
    <div
      ref={ref}
      className="relative z-20 bg-gray-50 px-4 pb-8 sm:px-6 lg:px-8"
    >
      <div
        className="flex flex-col items-center rounded-[2rem] border border-gray-200 bg-gray-100 px-4 py-20 text-center sm:px-8 sm:py-24"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          Still have a question?
        </h3>

        <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
          If you cannot find an answer in our FAQ, you can always reach out
          directly. We&apos;ll get back to you shortly — meet our support team.
        </p>

        <div className="mb-10 flex flex-col items-center gap-1">
          <a
            href="mailto:hello@orisa.com"
            className="text-lg font-bold text-gray-900 transition-colors hover:text-gray-600 sm:text-xl"
          >
            hello@orisa.com
          </a>
          <a
            href="tel:+12125557398"
            className="text-base font-semibold text-gray-700 transition-colors hover:text-gray-500 sm:text-lg"
          >
            (212) 555-7398
          </a>
        </div>

        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
        >
          Contact Us
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 12L12 2M12 2H5M12 2V9"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
export default function FAQSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const stackProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (faqSections.length - 1) / faqSections.length],
  );

  return (
    <section className="bg-white">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${faqSections.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative h-full w-full">
            {faqSections.map((section, index) => (
              <FAQStackCard
                key={section.id}
                section={section}
                index={index}
                total={faqSections.length}
                progress={stackProgress}
              />
            ))}
          </div>
        </div>
      </div>

      <StillHaveQuestions />
    </section>
  );
}
