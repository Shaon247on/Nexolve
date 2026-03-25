import { ParallaxImageSection } from "@/components/shared/ParallaxImage";
import { ScrollAnimatedText } from "@/components/shared/SectionTitle";

const cardsData = [
  {
    id: "1",
    title: "Creative Expertise",
    description:
      "With over a decade of design expertise, we create tailored solutions that engage audiences, build meaningful connections, and elevate brands with creativity and intent.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=600&fit=crop",
    alt: "Creative Expertise",
  },
  {
    id: "2",
    title: "Experience & Innovation",
    description:
      "Backed by a decade of creative experience, we craft visual experiences that bring together strategy, design and technology to grow brands, inspire audiences, and create meaningful impact.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop",
    alt: "Experience & Innovation",
  },
  {
    id: "3",
    title: "Digital Excellence",
    description:
      "We build bold, resilient brands designed to leave a lasting mark on the world through thoughtful design, fluid motion, and exceptional digital craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=600&fit=crop",
    alt: "Digital Excellence",
  },
];

export default function AboutSection() {
  return (
    <section className="min-h-screen bg-white">
      {/* Animated Text Example 1 */}
      <ScrollAnimatedText
        title="We shape animated stories that inspire and engage, uniting thoughtful design, fluid motion, and digital craftsmanship."
        href="/about"
        hrefText="About Us"
      />
      {/* Parallax Image Section */}
      <ParallaxImageSection
        sectionTitle="We shape animated stories that inspire and engage"
        sectionSubtitle="Uniting thoughtful design, fluid motion, and digital craftsmanship"
        cards={cardsData}
      />

      {/* Spacer */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-50">
        <div className="text-center">
          <p className="text-slate-500">End of demo</p>
        </div>
      </div>
    </section>
  );
}
