"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Phone, Plus } from "lucide-react";
import { Eyebrow, EASE, Reveal, Words } from "@/components/ui/reveal";
import { ToothDot, TreatmentIcon } from "@/components/ui/treatment-icon";
import { site, treatments, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

function Detail({ t }: { t: (typeof treatments)[number] }) {
  const emergency = t.id === "emergency";
  return (
    <>
      <p className="serif text-2xl text-accent sm:text-3xl">{t.line}</p>
      <p className="mt-4 leading-relaxed text-muted">{t.body}</p>
      <ul className="mt-6 grid gap-2.5">
        {t.points.map((p) => (
          <li key={p} className="flex items-center gap-3 font-medium">
            <ToothDot className="h-3.5 w-3.5 shrink-0 text-accent-2" />
            {p}
          </li>
        ))}
      </ul>
      <a
        href={emergency ? `tel:${site.phones[0].href}` : whatsappLink(`Hi Vishal Dental, I'd like to ask about ${t.name.toLowerCase()}.`)}
        target={emergency ? undefined : "_blank"}
        rel={emergency ? undefined : "noopener noreferrer"}
        className={cn(
          "group mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-500 ease-out-expo hover:-translate-y-0.5",
          emergency ? "bg-coral text-white" : "bg-accent text-accent-ink",
        )}
      >
        {emergency ? <Phone className="h-4 w-4" aria-hidden /> : null}
        {emergency ? `Call now · ${site.phones[0].display}` : `Ask about ${t.name.toLowerCase()}`}
        {!emergency && <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />}
      </a>
    </>
  );
}

export function Treatments() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const t = treatments[active];

  return (
    <section id="treatments" className="relative py-24 sm:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>Treatments</Eyebrow>
            </Reveal>
            <h2 className="display mt-5 max-w-3xl text-[clamp(2.4rem,5.6vw,4.6rem)]">
              <Words text="Everything your smile needs," accent="under one roof." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-muted">From a simple filling to complex surgery — with the same specialist hands, start to finish.</p>
          </Reveal>
        </div>

        {/* Desktop: hover list + sticky preview */}
        <div className="mt-16 hidden gap-12 lg:grid lg:grid-cols-[1.15fr_1fr]">
          <ul>
            {treatments.map((item, i) => {
              const on = i === active;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group relative flex w-full items-center gap-6 border-b border-fg/10 py-6 text-left"
                  >
                    <span className={cn("w-8 text-sm font-semibold tabular-nums transition-colors duration-500", on ? "text-accent" : "text-fg/30")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "display text-[clamp(1.8rem,2.8vw,2.7rem)] transition-all duration-700 ease-out-expo",
                        on ? "translate-x-3 text-fg" : "text-fg/35 group-hover:text-fg/60",
                      )}
                    >
                      {item.name}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "ml-auto h-6 w-6 transition-all duration-700 ease-out-expo",
                        on ? "rotate-45 text-accent opacity-100" : "-rotate-12 opacity-0",
                      )}
                      aria-hidden
                    />
                    {on && (
                      <motion.span
                        layoutId="treat-line"
                        className="absolute -bottom-px left-0 h-0.5 w-full origin-left bg-gradient-to-r from-accent to-accent-2"
                        transition={{ type: "spring", stiffness: 260, damping: 32 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative">
            <div className="sticky top-28 overflow-hidden rounded-[2rem] border border-fg/8 bg-surface p-10 shadow-lift">
              <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-mint/30 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-36 w-36 place-items-center rounded-[1.75rem] bg-gradient-to-br from-surface-2 to-transparent">
                      <TreatmentIcon icon={t.icon} className="h-28 w-28" />
                    </div>
                    <span className="display text-7xl text-fg/[0.06]">{String(active + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="display mt-8 text-3xl">{t.name}</h3>
                  <div className="mt-3">
                    <Detail t={t} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: accordion */}
        <ul className="mt-12 grid gap-3 lg:hidden">
          {treatments.map((item, i) => {
            const on = open === i;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.9, delay: i * 0.04, ease: EASE }}
                className={cn("overflow-hidden rounded-3xl border transition-colors duration-500", on ? "border-accent/30 bg-surface shadow-lift" : "border-fg/8 bg-surface/60")}>
                  <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center gap-4 p-5 text-left">
                    <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-colors duration-500", on ? "bg-accent/12" : "bg-surface-2")}>
                      <TreatmentIcon key={on ? "on" : "off"} icon={item.icon} className="h-9 w-9" />
                    </span>
                    <span className="display flex-1 text-xl">{item.name}</span>
                    <Plus className={cn("h-5 w-5 shrink-0 text-accent transition-transform duration-500 ease-out-expo", on && "rotate-45")} aria-hidden />
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                      >
                        <div className="px-5 pb-6">
                          <Detail t={item} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
