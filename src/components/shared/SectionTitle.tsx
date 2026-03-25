"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ScrollAnimatedTextProps {
  title: string;
  subtitle?: string;
  textColor?: string;
  href?: string;
  hrefText?: string;
  position?: "text-start" | "text-center" | "text-end";
  className?: string;
}

export function ScrollAnimatedText({
  title,
  subtitle,
  href,
  hrefText,
  position = "text-start",
  className = "text-4xl md:text-6xl",
}: ScrollAnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [charCount, setCharCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    setCharCount(title.length + (subtitle ? subtitle.length : 0));
  }, [title, subtitle]);

  const renderAnimatedText = (text: string, startIndex: number) => {
    return text.split("").map((char, index) => {
      const charIndex = startIndex + index;
      const progress = useTransform(scrollYProgress, [0, 1], [0, charCount]);

      const opacity = useTransform(progress, (value) => {
        const charProgress = value - charIndex;
        if (charProgress < 0) return 0;
        if (charProgress > 1) return 1;
        return charProgress;
      });

      const x = useTransform(progress, (value) => {
        const charProgress = value - charIndex;
        if (charProgress < 0) return 0;
        if (charProgress > 1) return 8;
        return charProgress * 8;
      });

      const color = useTransform(progress, (value) => {
        const charProgress = value - charIndex;
        if (charProgress < 0) return `rgb(156, 163, 175)`; // gray-400
        if (charProgress > 1) return `rgb(0, 0, 0)`; // black
        return `rgb(${Math.round(156 + charProgress * (0 - 156))}, ${Math.round(163 + charProgress * (0 - 163))}, ${Math.round(175 + charProgress * (0 - 175))})`; // interpolate from gray-400 to black
      });

      return (
        <motion.span
          key={`${charIndex}-${char}`}
          style={{
            x,
            height: "1em",
            color,
          }}
          className="inline-block whitespace-pre align-baseline will-change-transform"
          
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      );
    });
  };

  return (
    <div ref={containerRef} className={`relative py-20 ${position}`}>
      {/* Title */}
      {href && (
        <Button variant={"link"} className="text-start group">
          <Link href={href}>
            {hrefText}
            <ArrowUpRight className="size-5 group-hover:rotate-360 transition-all duration-400" />
          </Link>
        </Button>
      )}
      <h1 className={`${className} font-bold`}>
        {renderAnimatedText(title, 0)}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 text-lg md:text-2xl">
          {renderAnimatedText(subtitle, title.length)}
        </p>
      )}
    </div>
  );
}
