"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Eyebrow, EASE, Reveal, Words } from "@/components/ui/reveal";
import { faqs, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
          </Reveal>
          <h2 className="display mt-5 text-[clamp(2.4rem,5vw,4rem)]">
            <Words text="Good to" accent="know." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-muted">
              Can&apos;t find your answer? Call{" "}
              <a href={`tel:${site.phones[0].href}`} className="font-semibold text-accent underline-offset-4 hover:underline">
                {site.phones[0].display}
              </a>{" "}
              during clinic hours.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-3">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05} distance={18}>
                <div className={cn("rounded-3xl border transition-all duration-500", on ? "border-accent/25 bg-surface shadow-lift" : "border-fg/8 bg-surface/50")}>
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    className="flex w-full items-center justify-between gap-6 p-5 text-left sm:p-6"
                  >
                    <span className="display text-lg sm:text-xl">{f.q}</span>
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-out-expo",
                        on ? "rotate-45 bg-accent text-accent-ink" : "bg-surface-2 text-accent",
                      )}
                    >
                      <Plus className="h-4 w-4" aria-hidden />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 leading-relaxed text-muted sm:px-6">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
