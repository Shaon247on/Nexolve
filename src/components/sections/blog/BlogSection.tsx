"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type Article = {
  id: string;
  title: string;
  author: string;
  date: string;
  category?: string;
  image: string;
  href: string;
  featured?: boolean;
};

const articles: Article[] = [
  {
    id: "1",
    title: "Lessons Learned from Large-Scale LLM",
    author: "Olivia",
    date: "July 3, 2026",
    category: "Generative AI",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop",
    href: "/blogs/lessons-learned-from-large-scale-llm",
    featured: true,
  },
  {
    id: "2",
    title:
      "Beyond the Accuracy Score: Why Scalability is the True Metric of Production AI",
    author: "Olivia",
    date: "July 3, 2026",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
    href: "/blogs/beyond-the-accuracy-score",
  },
  {
    id: "3",
    title:
      "Optimizing Real-Time Detection: Strategies for Reducing Latency in Edge Computing",
    author: "Lucas",
    date: "July 17, 2026",
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1400&auto=format&fit=crop",
    href: "/blogs/optimizing-real-time-detection",
  },
];

function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link href={article.href} className="group block h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative h-full overflow-hidden"
      >
        <div className="relative h-[420px] sm:h-[520px] lg:h-[720px] xl:h-[760px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 34vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8">
            {article.category ? (
              <div className="mb-4">
                <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  {article.category}
                </span>
              </div>
            ) : null}

            <h3 className="max-w-[90%] text-[34px] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[44px] lg:text-[56px]">
              {article.title}
            </h3>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={article.href} className="group block">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="h-full"
      >
        <div className="relative overflow-hidden">
          <div className="relative h-[260px] sm:h-[320px] lg:h-[360px] xl:h-[380px]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </div>

        <div className="pt-5 sm:pt-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold leading-[1.04] tracking-[-0.05em] text-[#2a1f1a] sm:text-3xl lg:text-4xl">
              {article.title}
            </h3>

            <span className="mt-2 hidden h-2.5 w-2.5 shrink-0 rounded-full bg-[#756660] lg:block" />
          </div>

          <p className="mt-5 text-sm font-medium text-[#6d625d] sm:text-base">
            By {article.author} – {article.date}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}

export default function BlogSection() {
  const featuredArticle = articles.find((article) => article.featured);
  const sideArticles = articles.filter((article) => !article.featured);

  return (
    <section className=" px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16 xl:px-16">
      <div className="mx-auto max-w-[1680px]">
        <div className="flex flex-col gap-6 border-t border-[#cfd8d3] pt-2">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-tight text-[#262626]">
              <span>Blog & Resources</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="max-w-[950px] text-[56px] font-semibold leading-[0.9] tracking-[-0.08em] text-[#151515] sm:text-[78px] md:text-[96px] lg:text-[112px] xl:text-[124px]">
              Insights & Articles
            </h2>

            <p className="max-w-[560px] text-base leading-[1.2] text-[#2f2f2f] sm:text-lg lg:pt-8 lg:text-right xl:text-[18px]">
              Articles and insights shaped by real projects, strategic thinking,
              and a passion for thoughtful design.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-[1.02fr_1fr_1fr] lg:gap-5 xl:gap-6">
          {featuredArticle ? (
            <div className="lg:row-span-1">
              <FeaturedArticleCard article={featuredArticle} />
            </div>
          ) : null}

          {sideArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}