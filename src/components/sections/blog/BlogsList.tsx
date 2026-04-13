"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { blogs, blogCategories, type BlogCategory, type BlogPost } from "@/data/blogs";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ITEMS_PER_PAGE = 12;

function getPagination(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, currentPage, currentPage + 1, "...", totalPages];
}

function BlogCard({ blog, index }: { blog: BlogPost; index: number }) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <Link href={`/blogs/${blog.slug}`} className="group block" ref={cardRef}>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.65,
          delay: index * 0.04,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full"
      >
        <div className="relative aspect-[1.12/1] overflow-hidden bg-neutral-100">
          <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
            />
          </motion.div>
        </div>

        <div className="pt-5">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.04 + 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[95%] text-xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#2b221f] transition-colors duration-300 group-hover:text-black sm:text-xl xl:text-2xl"
          >
            {blog.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.04 + 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 text-sm font-medium text-[#6f6762] sm:text-base"
          >
            By {blog.author} — {blog.date}
          </motion.p>
        </div>
      </motion.article>
    </Link>
  );
}

export default function BlogsList() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const paginationInView = useInView(paginationRef, { once: true, margin: "-40px" });

  const filteredBlogs = useMemo(() => {
    if (activeCategory === "All") return blogs;
    return blogs.filter((blog) => blog.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE));

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const paginationItems = useMemo(
    () => getPagination(currentPage, totalPages),
    [currentPage, totalPages],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById("latest-news-section");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  return (
    <section
      id="latest-news-section"
      ref={sectionRef}
      className="bg-[#f5f5f3] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 xl:px-16"
    >
      <div className="mx-auto max-w-[1680px]">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 border-t border-[#cfd5d1] pt-3"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-tight text-[#242424]"
            >
              <span>Latest News</span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <motion.button
                initial={{ opacity: 0, y: 14 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08 }}
                type="button"
                onClick={() => setActiveCategory("All")}
                className={`rounded-full border px-5 py-3 text-sm font-medium transition-all duration-200 ${
                  activeCategory === "All"
                    ? "border-[#1d1d1d] bg-[#1d1d1d] text-white"
                    : "border-[#d7d7d3] bg-transparent text-[#2f2f2f] hover:border-[#bdbdb8]"
                }`}
                whileTap={{ scale: 0.97 }}
              >
                All
              </motion.button>

              {blogCategories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 14 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.12 + index * 0.04 }}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-5 py-3 text-sm font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? "border-[#1d1d1d] bg-[#1d1d1d] text-white"
                      : "border-[#d7d7d3] bg-transparent text-[#2f2f2f] hover:border-[#bdbdb8]"
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          key={`${activeCategory}-${currentPage}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 xl:grid-cols-4"
        >
          {paginatedBlogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </motion.div>

        <motion.div
          ref={paginationRef}
          initial={{ opacity: 0, y: 24 }}
          animate={paginationInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col gap-8 border-t border-transparent pt-2 sm:mt-20 lg:flex-row lg:items-center lg:justify-between"
        >
          <motion.button
            type="button"
            onClick={handlePrev}
            disabled={currentPage === 1}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-[18px] font-medium uppercase text-[#2c2c2c] transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Prev</span>
          </motion.button>

          <div className="flex items-center justify-center gap-3">
            {paginationItems.map((item, index) =>
              item === "..." ? (
                <motion.span
                  key={`ellipsis-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={paginationInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8d8d4] text-lg font-medium text-[#2c2c2c]"
                >
                  ...
                </motion.span>
              ) : (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={paginationInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.75, delay: index * 0.1 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => handlePageChange(item)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg font-medium transition-all duration-200 ${
                    currentPage === item
                      ? "border-[#1d1d1d] bg-[#1d1d1d] text-white"
                      : "border-[#d8d8d4] bg-transparent text-[#2c2c2c] hover:border-[#bdbdb8]"
                  }`}
                >
                  {item}
                </motion.button>
              ),
            )}
          </div>

          <motion.button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-[18px] font-medium uppercase text-[#2c2c2c] transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <span>Next</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}