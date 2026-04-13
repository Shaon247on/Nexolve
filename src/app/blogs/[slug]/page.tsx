import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailsContent from "@/components/sections/blog/BlogDetailsContent";
import { getBlogDetailBySlug } from "@/data/blog-details";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  console.log("the slug:",slug)
  const blog = getBlogDetailBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog article could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const metaDescription =
    typeof blog.sections[0]?.content === "string"
      ? blog.sections[0].content.slice(0, 155)
      : blog.description;

  return {
    title: `${blog.title} | Nexolve Blog`,
    description: metaDescription,
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: metaDescription,
      url: `/blogs/${blog.slug}`,
      siteName: "Nexolve",
      images: [
        {
          url: blog.heroImage,
          width: 1600,
          height: 1000,
          alt: blog.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: metaDescription,
      images: [blog.heroImage],
    },
  };
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogDetailBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailsContent blog={blog} />;
}