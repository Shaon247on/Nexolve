"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogs } from "@/data/blogs";
import type { BlogDetailPageData } from "@/data/blog-details";

interface BlogDetailsContentProps {
  blog: BlogDetailPageData;
}

function ParagraphSection({ content }: { content?: string }) {
  if (!content?.trim()) return null;

  const paragraphs = content
    .split("\n\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6 text-[15px] leading-[1.5] text-[#2f2f2f] sm:text-base">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export default function BlogDetailsContent({
  blog,
}: BlogDetailsContentProps) {
  const relatedBlogs = blogs.filter((item) => item.slug !== blog.slug).slice(0, 4);

  const authorImage =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop";

  return (
    <section className=" mt-20">
      <div className="mx-auto max-w-420 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto max-w-390">
          {blog.breadcrumb ? (
            <p className="text-xs text-[#7c7c7c] sm:text-sm">{blog.breadcrumb}</p>
          ) : null}

          <h1 className="mt-3 max-w-[980px] text-[38px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#1d1d1d] sm:text-[54px] lg:text-[72px]">
            {blog.title}
          </h1>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full bg-neutral-200">
                <Image
                  src={authorImage}
                  alt={blog.author || "Author"}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>

              <div>
                <p className="text-[15px] font-semibold text-[#1e1e1e]">
                  {blog.author}
                </p>
                <p className="text-xs text-[#777777]">
                  {blog.publishedAgo || blog.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[#6b6b6b]">
              <span className="text-[10px] uppercase tracking-[0.14em]">
                {blog.shareLabel || "Share this article"}
              </span>
              {/* <Twitter className="h-4 w-4" />
              <Facebook className="h-4 w-4" /> */}
            </div>
          </div>

          {blog.heroImage ? (
            <div className="mt-8">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                <Image
                  src={blog.heroImage}
                  alt={blog.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1160px"
                />
              </div>
            </div>
          ) : null}

          <div className="mx-auto mt-10 max-w-360">
            <div className="space-y-10">
              {blog.sections?.map((section, index) => {
                if (section.type === "paragraph") {
                  return <ParagraphSection key={index} content={section.content} />;
                }

                if (
                  section.type === "two-image" &&
                  section.leftImage &&
                  section.rightImage
                ) {
                  return (
                    <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="relative aspect-[0.95/1] overflow-hidden bg-neutral-200">
                        <Image
                          src={section.leftImage}
                          alt={`${blog.title} visual left`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>

                      <div className="relative aspect-[0.95/1] overflow-hidden bg-neutral-200">
                        <Image
                          src={section.rightImage}
                          alt={`${blog.title} visual right`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  );
                }

                if (section.type === "large-image" && section.image) {
                  return (
                    <div key={index}>
                      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-200">
                        <Image
                          src={section.image}
                          alt={`${blog.title} large visual`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1280px) 100vw, 760px"
                        />
                      </div>

                      {section.imageCaption ? (
                        <p className="mt-2 text-center text-xs italic text-[#777777]">
                          {section.imageCaption}
                        </p>
                      ) : null}
                    </div>
                  );
                }

                if (section.type === "two-column") {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-1 gap-8 sm:grid-cols-2"
                    >
                      <div>
                        {section.leftTitle ? (
                          <h3 className="text-[22px] font-semibold leading-tight text-[#1e1e1e]">
                            {section.leftTitle}
                          </h3>
                        ) : null}

                        {section.leftText ? (
                          <p className="mt-3 text-[15px] leading-[1.5] text-[#2f2f2f] sm:text-base">
                            {section.leftText}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        {section.rightTitle ? (
                          <h3 className="text-[22px] font-semibold leading-tight text-[#1e1e1e]">
                            {section.rightTitle}
                          </h3>
                        ) : null}

                        {section.rightText ? (
                          <p className="mt-3 text-[15px] leading-[1.5] text-[#2f2f2f] sm:text-base">
                            {section.rightText}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>

            <div className="mt-12 border-t border-[#dddddd] pt-8">
              {!!blog.tags?.length && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#d6d6d6] px-4 py-1.5 text-xs text-[#3a3a3a]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {blog.previousPost?.slug ? (
                  <Link href={`/blogs/${blog.previousPost.slug}`} className="group">
                    <div className="text-xs uppercase tracking-[0.14em] text-[#777777]">
                      <span className="inline-flex items-center gap-1">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Prev
                      </span>
                    </div>
                    <h4 className="mt-3 text-[22px] font-semibold leading-tight text-[#1f1f1f] transition-colors group-hover:text-black">
                      {blog.previousPost.title}
                    </h4>
                  </Link>
                ) : (
                  <div />
                )}

                {blog.nextPost?.slug ? (
                  <Link
                    href={`/blogs/${blog.nextPost.slug}`}
                    className="group text-left sm:text-right"
                  >
                    <div className="text-xs uppercase tracking-[0.14em] text-[#777777]">
                      <span className="inline-flex items-center gap-1">
                        Next
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <h4 className="mt-3 text-[22px] font-semibold leading-tight text-[#1f1f1f] transition-colors group-hover:text-black">
                      {blog.nextPost.title}
                    </h4>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>

        {!!relatedBlogs.length && (
          <div className="mt-20 border-t border-[#e5e5e5] pt-10">
            <div className="mx-auto max-w-[1560px]">
              <div className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2b2b2b]">
                <span>Latest News</span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {relatedBlogs.map((item) => (
                  <Link key={item.id} href={`/blogs/${item.slug}`} className="group">
                    <article>
                      <div className="relative aspect-[1.08/1] overflow-hidden bg-neutral-200">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        />
                      </div>

                      <h3 className="mt-4 text-[24px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#2b221f] sm:text-[26px]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm text-[#6f6762]">
                        By {item.author} — {item.date}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}