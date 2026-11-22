"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { HeartHandshake, ScanFace, ShieldCheck } from "lucide-react";
import { Eyebrow, Reveal, Words } from "@/components/ui/reveal";
import { site } from "@/lib/site";

const VALUES = [
  {
    icon: ScanFace,
    title: "Surgeon-level precision",
    body: "Implants, wisdom teeth and jaw procedures planned by a specialist trained in surgery of the mouth, jaw and face.",
  },
  {
    icon: ShieldCheck,
    title: "Honest treatment plans",
    body: "You'll know your options, the time each takes and the cost before we begin — and only what you actually need.",
  },
  {
    icon: HeartHandshake,
    title: "Comfort, always",
    body: "Gentle technique, proper numbing and a pace that suits you. Nervous patients and children are welcome.",
  },
];

export function Doctor() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const s = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const ringRotate = useTransform(s, [0, 1], [-90, 90]);
  const cardY = useTransform(s, [0, 1], [60, -60]);

  return (
    <section ref={ref} id="doctor" className="relative py-24 sm:py-32">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* Portrait card */}
        <motion.div style={{ y: cardY }} className="relative mx-auto w-full max-w-md">
          <Reveal>
            <div className="deep grain relative aspect-[4/5] overflow-hidden rounded-[2.25rem] shadow-lift">
              <div aria-hidden className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
              <div aria-hidden className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-mint/15 blur-3xl" />

              <div className="absolute inset-x-0 top-0 bottom-24 grid place-items-center">
                <div className="relative grid aspect-square w-[72%] place-items-center">
                  <motion.svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" style={{ rotate: ringRotate }} aria-hidden>
                    <defs>
                      <path id="ring" d="M100 100m-86 0a86 86 0 1 1 172 0a86 86 0 1 1 -172 0" />
                    </defs>
                    <text className="fill-[var(--accent-2)] text-[10.5px] font-semibold uppercase tracking-[0.32em]">
                      <textPath href="#ring">Oral · Maxillofacial · Surgeon · {site.qualification} · Implants · </textPath>
                    </text>
                  </motion.svg>
                  <div className="grid aspect-square w-[70%] place-items-center rounded-full bg-gradient-to-br from-accent-2 to-accent shadow-[0_0_80px_-10px_var(--accent)]">
                    <span className="serif text-[clamp(4rem,9vw,6rem)] leading-none text-accent-ink">V</span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <p className="display text-2xl">{site.doctor}</p>
                <p className="mt-1 text-sm text-muted">
                  {site.qualification} · {site.speciality}
                </p>
              </div>
            </div>
          </Reveal>
        </motion.div>

        <div>
          <Reveal>
            <Eyebrow>Your doctor</Eyebrow>
          </Reveal>
          <h2 className="display mt-5 text-[clamp(2.4rem,5.4vw,4.4rem)]">
            <Words text="Specialist care," accent="close to home." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {site.doctor} holds an MDS in Oral &amp; Maxillofacial Surgery — the dental speciality for surgery of the mouth, jaws and face. That
              surgical training is behind every implant, extraction and smile rebuilt here.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.12 + i * 0.08}>
                <div className="group flex gap-5 rounded-3xl border border-fg/8 bg-surface p-5 shadow-card transition-all duration-700 ease-out-expo hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift sm:p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent transition-all duration-700 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-ink">
                    <v.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="display block text-xl">{v.title}</span>
                    <span className="mt-1.5 block leading-relaxed text-muted">{v.body}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
