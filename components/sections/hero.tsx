"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, MapPin, Phone, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { OpenStatus } from "@/components/open-status";
import { TOOTH_PATH } from "@/components/ui/logo-mark";
import { site, treatments } from "@/lib/site";
import { scrollToId } from "@/lib/scroll";

/** Entrances start as the intro "lips" part. */
const T = 1.25;

/** Deterministic pseudo-random so server and client markup match. */
function prng(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const r2 = (n: number) => Math.round(n * 100) / 100;
const rand = prng(7);
const BUBBLES = Array.from({ length: 16 }, () => ({
  left: r2(rand() * 100),
  size: r2(6 + rand() * 22),
  t: r2(10 + rand() * 12),
  d: r2(-rand() * 20),
  o: r2(0.25 + rand() * 0.45),
}));

const SPARKLES = [
  { x: "12%", y: "18%", s: 22, d: 0 },
  { x: "84%", y: "12%", s: 16, d: 0.9 },
  { x: "90%", y: "58%", s: 24, d: 1.7 },
  { x: "8%", y: "70%", s: 14, d: 2.3 },
  { x: "62%", y: "4%", s: 12, d: 1.2 },
];

function Sparkle({ size, delay }: { size: number; delay: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className="twinkle text-accent-2" style={{ animationDelay: `${delay}s` }} aria-hidden>
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" fill="currentColor" />
    </svg>
  );
}

function Tooth() {
  return (
    <svg viewBox="0 0 400 480" className="relative h-full w-full overflow-visible drop-shadow-[0_24px_36px_rgb(11_122_112/0.28)]" aria-hidden>
      <defs>
        <radialGradient id="enamel" cx="38%" cy="26%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.42" stopColor="#f6fcfb" />
          <stop offset="0.78" stopColor="#d3ece7" />
          <stop offset="1" stopColor="#9fd0c7" />
        </radialGradient>
        <linearGradient id="root-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.45" stopColor="#0b7a70" stopOpacity="0" />
          <stop offset="1" stopColor="#0b7a70" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="tooth-clip">
          <path d={TOOTH_PATH} />
        </clipPath>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <ellipse cx="200" cy="470" rx="120" ry="16" fill="#0b7a70" opacity="0.18" filter="url(#soft)" />
      <path d={TOOTH_PATH} fill="url(#enamel)" />
      <path d={TOOTH_PATH} fill="url(#root-shade)" />
      <g clipPath="url(#tooth-clip)">
        <ellipse cx="140" cy="110" rx="46" ry="74" fill="#fff" opacity="0.9" filter="url(#soft)" transform="rotate(-22 140 110)" />
        <path d="M140 74Q200 118 262 74" fill="none" stroke="#0b7a70" strokeOpacity="0.1" strokeWidth="8" strokeLinecap="round" />
        <rect className="sweep" x="0" y="0" width="140" height="480" fill="url(#shine)" opacity="0.75" style={{ transformBox: "fill-box" }} />
      </g>
      <path d={TOOTH_PATH} fill="none" stroke="#0b7a70" strokeOpacity="0.16" strokeWidth="2" />
    </svg>
  );
}

function Card({
  children,
  className,
  px,
  py,
  depth,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  px: MotionValue<number>;
  py: MotionValue<number>;
  depth: number;
  delay: number;
}) {
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={`absolute z-20 ${className}`}>
      <div className="float" style={{ animationDelay: `${-delay * 4}s` }}>
        <div
          className="enter flex items-center gap-2.5 rounded-2xl border border-white/60 bg-surface/75 px-3 py-2.5 text-[0.8rem] shadow-lift backdrop-blur-xl dark:border-white/10 sm:px-4 sm:py-3 sm:text-sm"
          style={{ "--d": `${T + delay}s` } as React.CSSProperties}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 18, mass: 0.8 });
  const sy = useSpring(py, { stiffness: 70, damping: 18, mass: 0.8 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scroll = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 });

  // Tooth turns toward the pointer and gently spins away as the hero scrolls off.
  const rotateY = useTransform(() => sx.get() * 26 + scroll.get() * 40);
  const rotateX = useTransform(() => -sy.get() * 20 + scroll.get() * 12);
  const toothY = useTransform(scroll, [0, 1], [0, 120]);
  const toothScale = useTransform(scroll, [0, 1], [1, 0.82]);
  const textY = useTransform(scroll, [0, 1], [0, -80]);
  const textOpacity = useTransform(scroll, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [px, py]);

  const words1 = ["Smiles", "built"];
  const words2 = ["last", "a", "lifetime."];

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pb-10 pt-24 sm:pt-32 lg:min-h-svh lg:pb-0">
      {/* Background: aurora, fading dot grid, rising bubbles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora absolute -left-[10%] -top-[20%] h-[38rem] w-[38rem] rounded-full bg-mint/40 blur-[110px] dark:bg-mint/15" />
        <div className="aurora absolute -right-[15%] top-[20%] h-[34rem] w-[34rem] rounded-full bg-accent/20 blur-[120px] [animation-delay:-8s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,var(--fg)_1px,transparent_1.4px)] bg-[size:28px_28px] opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="bubble absolute bottom-0 rounded-full border border-accent/30 bg-gradient-to-br from-white/80 to-mint/20 dark:from-white/20"
            style={{ left: `${b.left}%`, width: b.size, height: b.size, "--t": `${b.t}s`, "--d": `${b.d}s`, "--o": b.o } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="wrap relative grid items-center gap-6 sm:gap-10 lg:grid-cols-[1.05fr_1fr]">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 text-center lg:text-left">
          <p
            className="enter mx-auto inline-flex items-center gap-2 rounded-full border border-fg/10 bg-surface/70 py-1.5 pl-1.5 pr-4 text-xs font-semibold backdrop-blur lg:mx-0 sm:text-sm"
            style={{ "--d": `${T}s` } as React.CSSProperties}
          >
            <span className="rounded-full bg-accent px-2.5 py-1 text-[0.7rem] uppercase tracking-wider text-accent-ink">{site.qualification}</span>
            {site.doctor} · {site.speciality}
          </p>

          <h1 className="display mt-5 text-[clamp(3rem,8.4vw,7.2rem)] sm:mt-7">
            <span className="block">
              {words1.map((w, i) => (
                <span key={w} className="blur-in inline-block pr-[0.22em]" style={{ "--d": `${T + 0.1 + i * 0.09}s` } as React.CSSProperties}>
                  {w}
                </span>
              ))}
            </span>
            <span className="block">
              <span className="blur-in inline-block pr-[0.22em]" style={{ "--d": `${T + 0.28}s` } as React.CSSProperties}>
                to
              </span>
              {words2.map((w, i) => (
                <span
                  key={w}
                  className="blur-in serif text-gradient inline-block pr-[0.2em] text-[1.08em] leading-[0.9]"
                  style={{ "--d": `${T + 0.37 + i * 0.09}s` } as React.CSSProperties}
                >
                  {w}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="enter mx-auto mt-6 max-w-[34rem] text-[1.02rem] leading-relaxed text-muted sm:text-lg lg:mx-0"
            style={{ "--d": `${T + 0.6}s` } as React.CSSProperties}
          >
            Implants, root canals, oral surgery and complete smile makeovers — planned and performed by a specialist surgeon, right here in{" "}
            {site.address.short}.
          </p>

          <div
            className="enter mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            style={{ "--d": `${T + 0.72}s` } as React.CSSProperties}
          >
            <Magnetic strength={0.25}>
              <Button
                href="#visit"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("visit");
                }}
              >
                Book an appointment
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
              </Button>
            </Magnetic>
            <Button href={`tel:${site.phones[0].href}`} variant="secondary">
              <Phone className="h-4 w-4" aria-hidden /> {site.phones[0].display}
            </Button>
          </div>

          <div
            className="enter mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-muted lg:justify-start"
            style={{ "--d": `${T + 0.84}s` } as React.CSSProperties}
          >
            <OpenStatus className="text-fg" />
            <span className="inline-flex items-center gap-1.5 text-sm">
              <MapPin className="h-4 w-4 text-accent" aria-hidden /> 100 m from Vishwanathapuram bus stop
            </span>
          </div>
        </motion.div>

        {/* Visual */}
        <div className="relative order-first mx-auto aspect-square w-full max-w-[20rem] sm:max-w-[30rem] lg:order-none lg:max-w-[36rem]">
          <div className="enter absolute inset-0" style={{ "--d": `${T - 0.15}s` } as React.CSSProperties}>
            <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_40%_35%,var(--pearl),var(--surface-2)_70%)] shadow-[inset_0_-20px_60px_-20px_rgb(11_122_112/0.25)]" />
            {[0, 1.5, 3].map((d) => (
              <span key={d} className="ripple absolute inset-[10%] rounded-full border border-accent/40" style={{ animationDelay: `${d}s` }} />
            ))}
            <div className="spin-ring absolute inset-[2%] rounded-full border border-dashed border-accent/25">
              <span className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2 shadow-[0_0_20px_4px_var(--accent-2)]" />
            </div>
            {SPARKLES.map((s, i) => (
              <span key={i} className="absolute" style={{ left: s.x, top: s.y }}>
                <Sparkle size={s.s} delay={s.d} />
              </span>
            ))}
          </div>

          <motion.div style={{ y: toothY, scale: toothScale }} className="absolute inset-[18%] [perspective:900px]">
            <div className="float h-full w-full">
              <div className="blur-in h-full w-full" style={{ "--d": `${T - 0.1}s` } as React.CSSProperties}>
                <motion.div style={{ rotateX, rotateY }} className="h-full w-full [transform-style:preserve-3d]">
                  <Tooth />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <Card px={sx} py={sy} depth={-36} delay={0.5} className="-left-3 top-[2%] sm:left-0 sm:top-[12%]">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent/12 text-accent">
              <Stethoscope className="h-4 w-4" aria-hidden />
            </span>
            <span className="leading-tight">
              <b className="block font-semibold">Specialist surgeon</b>
              <span className="hidden text-muted sm:block">Oral &amp; maxillofacial</span>
            </span>
          </Card>
          <Card px={sx} py={sy} depth={-56} delay={0.7} className="-right-3 bottom-[3%] sm:right-0 sm:bottom-[14%]">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent/12 text-accent">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M8 3h8l-1 5H9z M10 8v4h4V8 M9 13h6l-1 4h-4z M11 17v4h2v-4" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="leading-tight">
              <b className="block font-semibold">Dental implants</b>
              <span className="hidden text-muted sm:block">Fixed, natural-feel teeth</span>
            </span>
          </Card>
        </div>
      </div>

      {/* Calm treatments ticker */}
      <div
        className="enter relative mt-10 overflow-hidden border-y border-fg/8 py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] lg:mt-6"
        style={{ "--d": `${T + 1}s` } as React.CSSProperties}
      >
        <div className="ticker flex w-max items-center gap-10 pr-10">
          {[...treatments, ...treatments].map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="display text-xl text-fg/70 sm:text-2xl">{t.name}</span>
              <svg viewBox="0 0 400 480" className="h-4 w-4 text-accent-2" aria-hidden>
                <path d={TOOTH_PATH} fill="currentColor" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
