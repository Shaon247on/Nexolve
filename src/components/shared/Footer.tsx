"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ScrollAnimatedText } from "./ScrollAnimatedText";

const navLinks = {
  left: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Works", href: "/projects" },
    { label: "Blog", href: "/blogs" },
    { label: "Contact", href: "/about/contact" },
  ],
};

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Dribbble", href: "https://dribbble.com" },
];

const services = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "App Development", href: "/services/app-development" },
  { label: "CMS Integration", href: "/services/cms-integration" },
  { label: "Product Design", href: "/services/product-design" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mx-auto mt-10 mb-2 max-w-420 rounded-2xl bg-black shadow-2xl">
      <div
        className="w-full overflow-hidden"
        style={{
          borderRadius: "16px 16px 0 0",
          background: "#0f0f0f",
        }}
      >
        <div className="px-8 pt-12 pb-10 md:px-12 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div className="flex max-w-xs flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px]"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <div
                    className="h-2.5 w-2.5 rounded-[2px]"
                    style={{ background: "#fff" }}
                  />
                </div>
                <span
                  className="text-sm font-medium tracking-wide text-white"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Nexolve
                </span>
              </div>

              <ScrollAnimatedText
                title="Let's Shape Your Next Idea"
                className="max-w-4xl text-5xl"
                transformedColor="#FFFFFF"
              />

              <p className="-mt-20 text-xs leading-relaxed text-gray-600">
                205 North Michigan Avenue, Suite 810
                <br />
                Chicago, 60601, USA
              </p>
            </div>

            <div className="flex flex-col gap-5 text-gray-400 lg:items-end">
              <div className="text-sm">(212) 555–7398</div>

              <a
                href="mailto:hello@Nexolve.com"
                className="font-medium transition-opacity duration-200 hover:opacity-70"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.25)",
                  paddingBottom: "2px",
                }}
              >
                hello@Nexolve.com
              </a>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1 px-3 py-1 text-xs transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.03)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.85)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(255,255,255,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.5)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(255,255,255,0.1)";
                    }}
                  >
                    {s.label}
                    <span style={{ fontSize: "9px", opacity: 0.5 }}>↗</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="mx-8 md:mx-12 lg:mx-16"
          style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
        />

        <div className="px-8 py-10 md:px-12 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-3">
              <p
                className="mb-2 text-xs uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.15em",
                }}
              >
                Navigation
              </p>
              <div className="grid grid-cols-2 gap-x-16 gap-y-2.5">
                {navLinks.left.map((link) => (
                  <NavLink key={link.href} label={link.label} href={link.href} />
                ))}
              </div>
            </div>

            <div className="overflow-hidden lg:text-right">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="leading-none text-white select-none"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(3.5rem, 9vw, 8rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                }}
              >
                Nexolve
                <sup
                  style={{
                    fontSize: "0.3em",
                    verticalAlign: "super",
                    opacity: 0.7,
                    letterSpacing: 0,
                  }}
                >
                  ®
                </sup>
              </motion.p>
            </div>
          </div>
        </div>

        <div
          className="mx-8 md:mx-12 lg:mx-16"
          style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
        />

        <div className="px-8 py-5 md:px-12 lg:px-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <span
              className="text-xs"
              style={{
                fontFamily: "var(--font-dm-sans)",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Nexolve © {year}
            </span>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center gap-1 text-xs transition-opacity duration-200 hover:opacity-80"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                  }}
                >
                  {s.label}
                  <span style={{ fontSize: "9px", opacity: 0.5 }}>↗</span>
                </Link>
              ))}
            </div>

            <span
              className="text-xs whitespace-nowrap"
              style={{
                fontFamily: "var(--font-dm-sans)",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              [ Since 2012 ]
            </span>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "120px",
          background:
            "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }}
      />
    </footer>
  );
}

function NavLink({
  label,
  href,
  style,
}: {
  label: string;
  href: string;
  style?: React.CSSProperties;
}) {
  return (
    <Link
      href={href}
      className="group flex w-fit items-center gap-1 text-sm transition-all duration-200"
      style={{
        fontFamily: "var(--font-dm-sans)",
        color: "rgba(255,255,255,0.5)",
        textDecoration: "none",
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "rgba(255,255,255,0.9)";
        el.style.textDecoration = "underline";
        el.style.textUnderlineOffset = "3px";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "rgba(255,255,255,0.5)";
        el.style.textDecoration = "none";
      }}
    >
      {label}
      <span
        className="text-[10px] opacity-0 transition-opacity duration-200 group-hover:opacity-60"
        style={{ marginLeft: "2px" }}
      >
        ↗
      </span>
    </Link>
  );
}