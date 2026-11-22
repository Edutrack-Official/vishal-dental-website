"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Eyebrow, EASE } from "@/components/ui/reveal";
import { implantStages } from "@/lib/site";
import { TOOTH_PATH } from "@/components/ui/logo-mark";
import { cn } from "@/lib/utils";

/** Scroll windows (0–1) for each stage. */
const WINDOWS = [
  [0.04, 0.3],
  [0.32, 0.54],
  [0.56, 0.8],
  [0.82, 0.96],
] as const;

const THREADS = Array.from({ length: 15 }, (_, i) => 318 + i * 12);

function Scene({ p }: { p: MotionValue<number> }) {
  const screwY = useTransform(p, [0.04, 0.3], [-380, 0], { clamp: true });
  const screwOpacity = useTransform(p, [0.03, 0.08], [0, 1]);
  // Threads slide inside the post as it descends: reads as the screw turning.
  const threadY = useTransform(p, (v) => -((v * 900) % 12));
  const socket = useTransform(p, [0.02, 0.12], [0, 1]);
  const abutY = useTransform(p, [0.32, 0.54], [-360, 0], { clamp: true });
  const abutOpacity = useTransform(p, [0.31, 0.36], [0, 1]);
  const crownY = useTransform(p, [0.56, 0.8], [-420, 0], { clamp: true });
  const crownOpacity = useTransform(p, [0.55, 0.6], [0, 1]);
  const crownRotate = useTransform(p, [0.56, 0.8], [-14, 0], { clamp: true });
  const glow = useTransform(p, [0.8, 0.9], [0, 1]);
  const glowScale = useTransform(p, [0.8, 0.96], [0.6, 1.15]);

  const neighbour = (x: number) => `translate(${x} 161) scale(0.38 0.62)`;

  return (
    <svg viewBox="0 0 420 560" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="ti" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6f8187" />
          <stop offset="0.45" stopColor="#eef4f5" />
          <stop offset="0.6" stopColor="#c9d5d8" />
          <stop offset="1" stopColor="#5f7177" />
        </linearGradient>
        <radialGradient id="crown-enamel" cx="35%" cy="25%" r="85%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#eef8f6" />
          <stop offset="1" stopColor="#b9ddd6" />
        </radialGradient>
        <linearGradient id="bone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9dcc2" />
          <stop offset="1" stopColor="#cdb994" />
        </linearGradient>
        <linearGradient id="gum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6a9a6" />
          <stop offset="1" stopColor="#e2827f" />
        </linearGradient>
        <radialGradient id="halo">
          <stop offset="0" stopColor="#5ee8cb" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5ee8cb" stopOpacity="0" />
        </radialGradient>
        <clipPath id="thread-env">
          <path d="M174 316H246L238 462Q224 496 210 498Q196 496 182 462Z" />
        </clipPath>
      </defs>

      {/* Halo once complete */}
      <motion.circle cx="210" cy="240" r="190" fill="url(#halo)" style={{ opacity: glow, scale: glowScale, transformOrigin: "210px 240px" }} />

      {/* Neighbouring teeth */}
      <g opacity="0.95">
        <path d={TOOTH_PATH} transform={neighbour(-5)} fill="url(#crown-enamel)" />
        <path d={TOOTH_PATH} transform={neighbour(287)} fill="url(#crown-enamel)" />
      </g>

      {/* Bone (slightly see-through, like an X-ray) and gum */}
      <rect x="-40" y="338" width="500" height="260" fill="url(#bone)" opacity="0.88" />
      {[
        [40, 400, 5],
        [90, 450, 3],
        [130, 520, 6],
        [300, 410, 4],
        [350, 480, 6],
        [390, 530, 3],
        [250, 530, 4],
        [70, 500, 3],
      ].map(([cx, cy, rr], i) => (
        <circle key={i} cx={cx} cy={cy} r={rr} fill="#b49f78" opacity="0.5" />
      ))}
      <motion.path d="M184 340H236L230 466Q222 494 210 496Q198 494 190 466Z" fill="#8e7a55" style={{ opacity: socket }} />
      <path d="M-40 300C20 284 80 292 120 300C150 306 170 310 210 310C250 310 270 306 300 300C340 292 400 284 460 300V352H-40Z" fill="url(#gum)" />

      {/* Titanium post */}
      <motion.g style={{ y: screwY, opacity: screwOpacity }}>
        <path d="M182 312H238L232 462Q222 490 210 492Q198 490 188 462Z" fill="url(#ti)" />
        <g clipPath="url(#thread-env)">
          <motion.g style={{ y: threadY }}>
            {THREADS.map((y) => (
              <path key={y} d={`M170 ${y}L250 ${y + 7}`} stroke="#5d6f75" strokeWidth="3.2" strokeLinecap="round" />
            ))}
            {THREADS.map((y) => (
              <path key={`h${y}`} d={`M170 ${y - 2}L250 ${y + 5}`} stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.2" />
            ))}
          </motion.g>
        </g>
        <rect x="190" y="306" width="40" height="8" rx="2" fill="#93a4aa" />
      </motion.g>

      {/* Abutment */}
      <motion.g style={{ y: abutY, opacity: abutOpacity }}>
        <path d="M190 266H230L236 314H184Z" fill="url(#ti)" />
        <rect x="196" y="258" width="28" height="10" rx="3" fill="#b6c4c8" />
      </motion.g>

      {/* Crown */}
      <motion.g style={{ y: crownY, opacity: crownOpacity, rotate: crownRotate, transformOrigin: "210px 240px" }}>
        <path
          d="M148 292C142 248 146 206 166 186C180 172 196 180 210 172C224 180 240 172 254 186C274 206 278 248 272 292C250 306 170 306 148 292Z"
          fill="url(#crown-enamel)"
          stroke="#0b7a70"
          strokeOpacity="0.15"
          strokeWidth="1.5"
        />
        <ellipse cx="184" cy="214" rx="12" ry="26" fill="#fff" opacity="0.9" transform="rotate(-18 184 214)" />
        <path d="M176 196Q210 216 244 196" fill="none" stroke="#0b7a70" strokeOpacity="0.1" strokeWidth="4" strokeLinecap="round" />
      </motion.g>

      {/* Finish sparkles */}
      {[
        [150, 170, 14],
        [282, 200, 10],
        [262, 150, 7],
      ].map(([x, y, s], i) => (
        <motion.path
          key={i}
          d={`M${x} ${y - s}C${x + s * 0.1} ${y - s * 0.1} ${x + s * 0.1} ${y - s * 0.1} ${x + s} ${y}C${x + s * 0.1} ${y + s * 0.1} ${x + s * 0.1} ${y + s * 0.1} ${x} ${y + s}C${x - s * 0.1} ${y + s * 0.1} ${x - s * 0.1} ${y + s * 0.1} ${x - s} ${y}C${x - s * 0.1} ${y - s * 0.1} ${x - s * 0.1} ${y - s * 0.1} ${x} ${y - s}Z`}
          fill="#b4f5e4"
          style={{ opacity: glow, scale: glow, transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
}

function StepBar({ p, i }: { p: MotionValue<number>; i: number }) {
  const [a, b] = WINDOWS[i];
  const scaleY = useTransform(p, [a, b], [0, 1], { clamp: true });
  return (
    <span className="absolute inset-y-0 left-0 w-0.5 overflow-hidden rounded-full bg-fg/10">
      <motion.span className="absolute inset-0 origin-top bg-gradient-to-b from-accent-2 to-accent" style={{ scaleY }} />
    </span>
  );
}

const LABELS = [
  { text: "Titanium post", top: "71%" },
  { text: "Abutment", top: "50%" },
  { text: "Ceramic crown", top: "38%" },
];

export function ImplantStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5, restDelta: 0.0005 });
  const [stage, setStage] = useState(0);

  useMotionValueEvent(p, "change", (v) => {
    const s = v < 0.31 ? 0 : v < 0.55 ? 1 : v < 0.81 ? 2 : 3;
    setStage((prev) => (prev === s ? prev : s));
  });

  return (
    <section ref={ref} id="implants" className="deep grain relative h-[380vh]">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(var(--fg)_1px,transparent_1px),linear-gradient(90deg,var(--fg)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.04]" />
        </div>

        <div className="wrap relative grid h-full grid-rows-[auto_1fr_auto] gap-4 pb-6 pt-24 lg:grid-cols-[1fr_1.1fr] lg:grid-rows-1 lg:items-center lg:gap-14 lg:py-0">
          {/* Copy + steps */}
          <div>
            <Eyebrow className="!bg-white/5">How an implant works</Eyebrow>
            <h2 className="display mt-4 text-[clamp(2rem,4.6vw,4rem)] lg:mt-6">
              A new tooth, <span className="serif text-gradient">built from the root up.</span>
            </h2>

            <ol className="mt-10 hidden gap-1 lg:grid">
              {implantStages.map((s, i) => (
                <li key={s.title} className="relative pl-6">
                  <StepBar p={p} i={i} />
                  <div className={cn("py-3 transition-all duration-700 ease-out-expo", stage === i ? "opacity-100" : "opacity-40")}>
                    <p className="flex items-baseline gap-3">
                      <span className="text-xs font-semibold tabular-nums text-accent">0{i + 1}</span>
                      <span className="display text-2xl">{s.title}</span>
                    </p>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-700 ease-out-expo",
                        stage === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <p className="overflow-hidden pt-1 text-muted">{s.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Scene */}
          <div className="relative mx-auto h-full max-h-[min(36rem,52svh)] w-full lg:max-h-[42rem]">
            <div className="relative mx-auto aspect-[420/560] h-full">
              <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_52%_58%_at_50%_44%,black_62%,transparent_100%)]">
                <Scene p={p} />
              </div>
              {LABELS.map((l, i) => (
                <motion.span
                  key={l.text}
                  className="absolute left-[64%] flex -translate-y-1/2 items-center gap-2 whitespace-nowrap"
                  style={{ top: l.top }}
                  initial={false}
                  animate={stage >= i && stage < 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
                  <span className="-ml-2 h-px w-6 bg-accent sm:w-10" />
                  <span className="rounded-full border border-accent/40 bg-[#072a2f]/90 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:text-sm">
                    {l.text}
                  </span>
                </motion.span>
              ))}
              <motion.span
                className="absolute left-1/2 top-[6%] -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-ink shadow-[0_0_40px_-6px_var(--accent)]"
                initial={false}
                animate={stage === 3 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                Looks, feels &amp; works like yours ✦
              </motion.span>
            </div>
          </div>

          {/* Mobile caption */}
          <div className="min-h-[7.5rem] lg:hidden">
            <div className="mb-3 flex gap-1.5">
              {implantStages.map((s, i) => (
                <span key={s.title} className="relative h-1 flex-1 overflow-hidden rounded-full bg-fg/10">
                  <span
                    className={cn("absolute inset-0 origin-left bg-accent transition-transform duration-700 ease-out-expo", stage >= i ? "scale-x-100" : "scale-x-0")}
                  />
                </span>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="display text-xl">
                  <span className="mr-2 text-sm text-accent">0{stage + 1}</span>
                  {implantStages[stage].title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{implantStages[stage].body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
