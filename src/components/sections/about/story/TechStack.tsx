"use client";

import { ScrollAnimatedText } from "@/components/shared/ScrollAnimatedText";
import Image from "next/image";
import { useRef, useEffect } from "react";

const techCategories = [
  {
    id: "languages",
    label: "Languages",
    score: 98,
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=200&auto=format&fit=crop",
    tools: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    score: 96,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200&auto=format&fit=crop",
    tools: [
      {
        name: "PyTorch",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
      },
      {
        name: "TensorFlow",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      },
      {
        name: "Scikit-learn",
        icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
      },
    ],
  },
  {
    id: "data",
    label: "Data",
    score: 99,
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=200&auto=format&fit=crop",
    tools: [
      {
        name: "Pandas",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
      },
      {
        name: "NumPy",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
      },
      {
        name: "Spark",
        icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg",
      },
    ],
  },
  {
    id: "mlops",
    label: "MLOps",
    score: 82,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=200&auto=format&fit=crop",
    tools: [
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Kubernetes",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      },
      {
        name: "MLflow",
        icon: "https://avatars.githubusercontent.com/u/39938107?s=200&v=4",
      },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    score: 86,
    image:
      "https://i.pinimg.com/736x/07/04/99/070499f6b3da11d851b1d3302cfbeeea.jpg",
    tools: [
      {
        name: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      },
      {
        name: "GCP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
      },
      {
        name: "Azure",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
      },
    ],
  },
];

const MIN_GAP = 8;
const MAX_GAP = 56;

// Directly mutates DOM — zero React re-render lag, frame-perfect with scroll
function StackCard({ category }: { category: (typeof techCategories)[0] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let rafId: number;

    function update() {
      const rect = el!.getBoundingClientRect();
      const vh = window.innerHeight;
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;

      // 0 = card is at viewport center, 1 = card is at top or bottom edge
      const distNorm = Math.min(
        1,
        Math.abs(cardCenter - viewportCenter) / (vh / 2),
      );

      // Max gap when at center, min gap when at edges
      const gap = MIN_GAP + (1 - distNorm) * (MAX_GAP - MIN_GAP);

      // Direct DOM mutation — no state, no re-render, no transition delay
      el!.style.marginBottom = `${gap}px`;

      rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={wrapperRef} style={{ marginBottom: `${MIN_GAP}px` }}>
      <div className="bg-white rounded-2xl px-4 sm:px-6 py-4 flex items-center gap-3 sm:gap-5 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-shadow duration-200">
        {/* Thumbnail */}
        <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl overflow-hidden">
          <Image
            width={60}
            height={60}
            src={category.image}
            alt={category.label}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Label */}
        <div className="shrink-0 w-20 sm:w-28 md:w-32">
          <span className="text-gray-900 font-semibold text-sm sm:text-base md:text-lg tracking-tight">
            {category.label}
          </span>
        </div>

        {/* Tool pills */}
        <div className="flex-1 flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {category.tools.map((tool) => (
            <span
              key={tool.name}
              className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap"
            >
              <Image
                width={60}
                height={60}
                src={tool.icon}
                alt={tool.name}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {tool.name}
            </span>
          ))}
        </div>

        {/* Score */}
        <div className="shrink-0 ml-auto pl-2 sm:pl-4">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            {category.score}
          </span>
          <span className="text-xs sm:text-sm text-gray-400 font-medium">
            /100
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="w-full bg-gray-100 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-420 mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8 mb-12">
            {/* <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-none">
              
            </h2> */}
            <ScrollAnimatedText title="Tech Stack / Tools" />
            <p className="text-sm sm:text-base text-gray-500 max-w-sm sm:text-right leading-relaxed">
              I fuse scalable AI architecture, data‑driven strategy, and
              real‑world deployment expertise to build reliable intelligent
              systems.
            </p>
          </div>

          {/* Cards */}
          <div>
            {techCategories.map((category) => (
              <StackCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
