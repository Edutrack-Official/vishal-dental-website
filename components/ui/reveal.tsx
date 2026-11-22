"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & { children: ReactNode; delay?: number; distance?: number };

/** Soft-focus reveal: fades in from a blur while rising, once. */
export function Reveal({ children, delay = 0, distance = 30, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Heading reveal: each word comes into focus in turn. `accent` is set in the
 * italic serif, in the brand gradient.
 */
export function Words({ text, accent, className }: { text: string; accent?: string; className?: string }) {
  const plain = text.split(" ").filter(Boolean);
  const tinted = accent ? accent.split(" ").filter(Boolean) : [];
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ staggerChildren: 0.06 }}
    >
      {[...plain, ...tinted].map((word, i) => (
        <span key={`${word}-${i}`}>
          <motion.span
            className={i >= plain.length ? "serif text-gradient inline-block pr-[0.06em]" : "inline-block"}
            variants={{
              hidden: { opacity: 0, y: "0.4em", filter: "blur(12px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: EASE } },
            }}
          >
            {word}
          </motion.span>{" "}
        </span>
      ))}
    </motion.span>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full border border-fg/10 bg-surface/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
      {children}
    </p>
  );
}
