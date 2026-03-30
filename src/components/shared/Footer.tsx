"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ScrollAnimatedText } from "./ScrollAnimatedText";

const navLinks = {
  left: ["Home", "About", "Works", "Blog", "Contact"],
  right: ["Shop", "Pricing", "Cart", "Checkout"],
};

const socialLinks = [
  "Twitter",
  "Facebook",
  "Instagram",
  "Linkedin",
  "Behance",
  "Dribbble",
];
const services = [
  "Web Development",
  "Motion Graphics",
  "Brand Strategy",
  "Product Design",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative max-w-420 mx-auto rounded-2xl bg-black shadow-2xl mt-10 mb-2"
    >
      {/* Rounded top corners */}
      <div
        className="w-full"
        style={{
          borderRadius: "16px 16px 0 0",
          overflow: "hidden",
          background: "#0f0f0f",
        }}
      >
        {/* ── Top section ── */}
        <div className="px-8 md:px-12 lg:px-16 pt-12 pb-10">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
            {/* Left — brand + address */}
            <div className="flex flex-col gap-4 max-w-xs">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-5 h-5 rounded-[3px] flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-[2px]"
                    style={{ background: "#fff" }}
                  />
                </div>
                <span
                  className="text-white text-sm font-medium tracking-wide"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Orisa
                </span>
              </div>

              {/* Headline */}
              <ScrollAnimatedText
              title="Let's Shape Your Next Idea"
              className="max-w-4xl text-5xl"
              transformedColor="#FFFFFF"
              />

              {/* Address */}
              <p
                className="text-xs leading-relaxed text-gray-600 -mt-20"
              >
                205 North Michigan Avenue, Suite 810
                <br />
                Chicago, 60601, USA
              </p>
            </div>

            {/* Right — contact + socials */}
            <div className="flex flex-col gap-5 lg:items-end text-gray-400">
              <div
                className="text-sm"

              >
                (212) 555–7398
              </div>

              <a
                href="mailto:hello@orisa.com"
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
                hello@orisa.com
              </a>

              {/* Social pills */}
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s}
                    href="#"
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
                    {s}
                    <span style={{ fontSize: "9px", opacity: 0.5 }}>↗</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="mx-8 md:mx-12 lg:mx-16"
          style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
        />

        {/* ── Middle section — nav + wordmark ── */}
        <div className="px-8 md:px-12 lg:px-16 py-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10">
            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <p
                className="text-xs mb-2 tracking-widest uppercase"
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
                  <NavLink key={link} label={link} />
                ))}
                {navLinks.right.map((link, i) => (
                  <NavLink
                    key={link}
                    label={link}
                    active={link === "Pricing"}
                    style={{ gridColumn: 2, gridRow: i + 1 }}
                  />
                ))}
              </div>
            </div>

            {/* Giant wordmark */}
            <div className="lg:text-right overflow-hidden">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-white leading-none select-none"
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

        {/* ── Divider ── */}
        <div
          className="mx-8 md:mx-12 lg:mx-16"
          style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
        />

        {/* ── Bottom bar ── */}
        <div className="px-8 md:px-12 lg:px-16 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span
              className="text-xs"
              style={{
                fontFamily: "var(--font-dm-sans)",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Orisa © {year}
            </span>

            {/* Services */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {services.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex items-center gap-1 text-xs transition-opacity duration-200 hover:opacity-80"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                  }}
                >
                  {s}
                  <span style={{ fontSize: "9px", opacity: 0.5 }}>↗</span>
                </a>
              ))}
            </div>

            <span
              className="text-xs"
              style={{
                fontFamily: "var(--font-dm-sans)",
                color: "rgba(255,255,255,0.2)",
                whiteSpace: "nowrap",
              }}
            >
              [ Since 2012 ]
            </span>
          </div>
        </div>
      </div>

      {/* Bottom glow shadow punch */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
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
  active,
  style,
}: {
  label: string;
  active?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <Link
      href="#"
      className="group flex items-center gap-1 text-sm w-fit transition-all duration-200"
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
        className="text-[10px] opacity-0 group-hover:opacity-60 transition-opacity duration-200"
        style={{ marginLeft: "2px" }}
      >
        ↗
      </span>
    </Link>
  );
}
