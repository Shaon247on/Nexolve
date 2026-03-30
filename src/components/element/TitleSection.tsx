"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface TitleSectionProps {
  title: string;
  scrollYProgress: MotionValue<number>;
  className?: string;
  wrapperClassName?: string;
  from?: number;
  to?: number;
  opacityRange?: [number, number];
  topClassName?: string;
}

export default function TitleSection({
  title,
  scrollYProgress,
  className = "text-[18vw]",
  wrapperClassName = "",
  from = 0,
  to = 0.4,
  opacityRange = [0, 0.04],
  topClassName = "-top-4",
}: TitleSectionProps) {
  const opacity = useTransform(scrollYProgress, [from, to], opacityRange);

  return (
    <motion.div
      className={`pointer-events-none absolute ${topClassName} left-0 w-full select-none overflow-hidden ${wrapperClassName}`}
      style={{ opacity }}
    >
      <span
        className={`whitespace-nowrap  leading-none font-black uppercase tracking-tighter text-neutral-900 ${className}`}
      >
        {title}
      </span>
    </motion.div>
  );
}
