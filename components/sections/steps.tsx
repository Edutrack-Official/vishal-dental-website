"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ClipboardList, HeartPulse, MessageCircle, Smile } from "lucide-react";
import { Eyebrow, Reveal, Words } from "@/components/ui/reveal";
import { visitSteps } from "@/lib/site";

const ICONS = [MessageCircle, ClipboardList, HeartPulse, Smile];

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section className="relative py-24 sm:py-28">
      <div className="wrap">
        <div className="text-center">
          <Reveal>
            <Eyebrow>Your visit</Eyebrow>
          </Reveal>
          <h2 className="display mx-auto mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4rem)]">
            <Words text="No rush, no surprises —" accent="just four calm steps." />
          </h2>
        </div>

        <div ref={ref} className="relative mt-16">
          {/* Track: horizontal on desktop, vertical on phones */}
          <div aria-hidden className="absolute left-[1.6rem] top-0 h-full w-0.5 rounded-full bg-fg/8 md:left-0 md:top-[1.6rem] md:h-0.5 md:w-full">
            <motion.div className="h-full w-full origin-top rounded-full bg-gradient-to-b from-accent-2 to-accent md:hidden" style={{ scaleY: fill }} />
            <motion.div className="hidden h-full w-full origin-left rounded-full bg-gradient-to-r from-accent-2 to-accent md:block" style={{ scaleX: fill }} />
          </div>

          <div className="relative grid gap-10 md:grid-cols-4 md:gap-8">
            {visitSteps.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal key={s.title} delay={i * 0.1}>
                  <div className="flex gap-5 md:block">
                    <span className="relative z-10 grid h-[3.2rem] w-[3.2rem] shrink-0 place-items-center rounded-2xl border border-fg/10 bg-surface text-accent shadow-card">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="block md:mt-7">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Step {i + 1}</span>
                      <span className="display mt-1.5 block text-2xl">{s.title}</span>
                      <span className="mt-2 block leading-relaxed text-muted">{s.body}</span>
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
