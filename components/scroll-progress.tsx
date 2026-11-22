"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin brand-gradient bar across the top that tracks reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-2"
      style={{ scaleX }}
    />
  );
}
