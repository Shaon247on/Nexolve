import { blogs, type BlogPost } from "@/data/blogs";

export type BlogDetailSection = {
  type: "paragraph" | "two-image" | "large-image" | "two-column";
  content?: string;
  leftImage?: string;
  rightImage?: string;
  image?: string;
  imageCaption?: string;
  leftTitle?: string;
  leftText?: string;
  rightTitle?: string;
  rightText?: string;
};

export type BlogDetail = {
  id: number;
  slug: string;
  breadcrumb: string;
  authorRole?: string;
  publishedAgo: string;
  heroImage: string;
  shareLabel: string;
  sections: BlogDetailSection[];
  tags: string[];
  previousPost: {
    slug: string;
    title: string;
  };
  nextPost: {
    slug: string;
    title: string;
  };
};

export type BlogDetailPageData = BlogPost & BlogDetail;

export const blogDetails: BlogDetail[] = [
  {
    id: 1,
    slug: "designing-digital-experiences",
    breadcrumb: "Blog > The World is Changing",
    publishedAgo: "25 minutes ago",
    heroImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop",
    shareLabel: "Share this article",
    sections: [
      {
        type: "paragraph",
        content:
          "In a digital landscape that evolves at an unprecedented pace, designing experiences that remain relevant over time has become a meaningful challenge. Trends come and go, technologies shift, and user expectations continuously rise. Yet, truly successful digital experiences are those built on principles that endure.",
      },
      {
        type: "two-image",
        leftImage:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
        rightImage:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
      },
      {
        type: "paragraph",
        content:
          "Visual trends can spark attention, but longevity comes from purpose-driven design. Experiences that stand the test of time prioritize clarity, usability, and intent over fleeting aesthetics. When design decisions are guided by function and meaning, products remain effective long after trends fade.\n\nTimeless digital experiences are rooted in a deep understanding of user needs and behaviors. By focusing on real problems, natural interactions, and intuitive flows, designers create solutions that feel relevant regardless of changing interfaces or technologies.\n\nScalability and adaptability are essential to long-term success. Well-structured design systems, modular components, and consistent patterns allow digital products to evolve without losing coherence. Flexibility ensures that growth and change feel seamless rather than disruptive.",
      },
      {
        type: "large-image",
        image:
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1600&auto=format&fit=crop",
        imageCaption: "Image by AI Studio",
      },
      {
        type: "two-column",
        leftTitle: "Clarity as a Design Principle",
        leftText:
          "As digital products become more complex, clarity becomes increasingly valuable. Clear hierarchies, thoughtful spacing, and purposeful interactions reduce cognitive load and enhance usability. Simplicity, when applied with intention, creates experiences that remain approachable over time.",
        rightTitle: "Aligning Design with Strategy",
        rightText:
          "Enduring digital experiences are not created in isolation. They are the result of close alignment between design, business goals, and technology. When strategy guides design decisions, products stay relevant, scalable, and aligned with long-term objectives.",
      },
    ],
    tags: ["UI / UX Design", "Photography", "Digital Marketing"],
    previousPost: {
      slug: "clear-positioning-before-growth",
      title: "Aligning Design Strategy with Business Goals for Lasting Impact",
    },
    nextPost: {
      slug: "from-concept-to-launch",
      title:
        "From Idea to Experience: Translating Vision into Digital Products",
    },
  },
  {
    id: 2,
    slug: "from-concept-to-launch",
    breadcrumb: "Blog > Product Strategy",
    publishedAgo: "2 hours ago",
    heroImage:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop",
    shareLabel: "Share this article",
    sections: [
      {
        type: "paragraph",
        content:
          "Turning an idea into a successful product requires more than execution. It demands alignment across research, design, engineering, and business strategy. The most effective launches are built through clarity, iteration, and a deep understanding of what the market actually needs.",
      },
      {
        type: "two-image",
        leftImage:
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
        rightImage:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      },
      {
        type: "paragraph",
        content:
          "From discovery workshops to MVP planning, each phase should reduce uncertainty and sharpen direction. Teams that define their priorities early move faster later, because decisions are grounded in purpose instead of assumptions.",
      },
      {
        type: "large-image",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
        imageCaption: "Visualizing the roadmap from data to delivery.",
      },
      {
        type: "two-column",
        leftTitle: "Start with the Core Problem",
        leftText:
          "Strong products are built around a clear understanding of the problem being solved. Before features are defined, teams should validate the pain point and the outcome users actually value.",
        rightTitle: "Ship with Confidence",
        rightText:
          "A thoughtful launch is not about perfection. It is about releasing the right thing at the right level of quality, then learning quickly through feedback and real-world usage.",
      },
    ],
    tags: ["Business Strategy", "Web Development", "App Development"],
    previousPost: {
      slug: "designing-digital-experiences",
      title: "Designing Digital Experiences That Connect Brands and People",
    },
    nextPost: {
      slug: "impactful-interfaces-design-systems",
      title: "Creating Impactful Interfaces Through Thoughtful Design Systems",
    },
  },
  {
    id: 3,
    slug: "impactful-interfaces-design-systems",
    breadcrumb: "Blog > UI Systems",
    publishedAgo: "1 day ago",
    heroImage:
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=1600&auto=format&fit=crop",
    shareLabel: "Share this article",
    sections: [
      {
        type: "paragraph",
        content:
          "Design systems create consistency, but their real value lies in speed, clarity, and shared understanding. When teams use well-defined components and patterns, they reduce duplication and build more confidently across products and platforms.",
      },
      {
        type: "two-image",
        leftImage:
          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop",
        rightImage:
          "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop",
      },
      {
        type: "paragraph",
        content:
          "The most effective systems are flexible enough to support growth while maintaining visual and functional coherence. This balance allows teams to move faster without sacrificing quality.",
      },
      {
        type: "large-image",
        image:
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop",
        imageCaption:
          "A unified library of components ensures seamless scalability.",
      },
      {
        type: "two-column",
        leftTitle: "Consistency Builds Trust",
        leftText:
          "Users move through products more confidently when familiar patterns repeat in meaningful ways. Consistency lowers friction and improves comprehension.",
        rightTitle: "Systems Support Scale",
        rightText:
          "As teams and products grow, shared systems make collaboration easier. They reduce decision fatigue and create a strong foundation for future expansion.",
      },
    ],
    tags: ["UI / UX Design", "Web Development"],
    previousPost: {
      slug: "from-concept-to-launch",
      title: "From Concept to Launch: Building Products That Truly Matter",
    },
    nextPost: {
      slug: "strong-visual-identity-modern-brands",
      title: "Why Strong Visual Identity Is the Foundation of Modern Brands",
    },
  },
];

export function getBlogDetailBySlug(slug: string): BlogDetailPageData | null {
  const blog = blogs.find((item) => item.slug === slug);
  const detail = blogDetails.find((item) => item.slug === slug);

  if (!blog || !detail) return null;

  return {
    ...blog,
    ...detail,
  };
}
