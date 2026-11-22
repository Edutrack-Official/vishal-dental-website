"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { Eyebrow, Reveal, Words } from "@/components/ui/reveal";

type Tooth = { x: number; w: number; h: number };

// Upper arch, left to right, centred on x = 300.
const UPPER: Tooth[] = [
  { x: 146, w: 30, h: 40 },
  { x: 178, w: 34, h: 46 },
  { x: 214, w: 36, h: 52 },
  { x: 252, w: 46, h: 60 },
  { x: 302, w: 46, h: 60 },
  { x: 350, w: 36, h: 52 },
  { x: 388, w: 34, h: 46 },
  { x: 424, w: 30, h: 40 },
];
const LOWER: Tooth[] = [
  { x: 186, w: 30, h: 30 },
  { x: 218, w: 30, h: 34 },
  { x: 250, w: 32, h: 36 },
  { x: 284, w: 32, h: 36 },
  { x: 318, w: 32, h: 36 },
  { x: 352, w: 30, h: 34 },
  { x: 384, w: 30, h: 30 },
];

const INNER = "M140 150C200 104 400 104 460 150C400 228 200 228 140 150Z";

function Mouth({ after }: { after: boolean }) {
  const id = after ? "a" : "b";
  return (
    <svg viewBox="100 72 400 190" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`t-${id}`} x1="0" y1="0" x2="0" y2="1">
          {after ? (
            <>
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#e6f4f1" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#efdfae" />
              <stop offset="1" stopColor="#d4b874" />
            </>
          )}
        </linearGradient>
        <clipPath id={`in-${id}`}>
          <path d={INNER} />
        </clipPath>
      </defs>
      <path d={INNER} fill="#3a1820" />
      <g clipPath={`url(#in-${id})`}>
        {/* tongue */}
        <ellipse cx="300" cy="222" rx="120" ry="34" fill="#c4545c" />
        {UPPER.map((t, i) => {
          // "Before": a gap between the front teeth, a chipped and a rotated lateral, stains.
          const gap = !after && (i === 3 ? -4 : i === 4 ? 4 : 0);
          const rot = !after && i === 2 ? -7 : 0;
          const chip = !after && i === 5;
          const cx = t.x + (gap || 0);
          return (
            <g key={i} transform={`rotate(${rot} ${cx + t.w / 2} 110)`}>
              <path
                d={
                  chip
                    ? `M${cx} 100V${100 + t.h - 14}L${cx + t.w * 0.55} ${100 + t.h - 2}H${cx + t.w - 8}Q${cx + t.w} ${100 + t.h} ${cx + t.w} ${100 + t.h - 10}V100Z`
                    : `M${cx} 100V${100 + t.h - 10}Q${cx} ${100 + t.h} ${cx + 10} ${100 + t.h}H${cx + t.w - 10}Q${cx + t.w} ${100 + t.h} ${cx + t.w} ${100 + t.h - 10}V100Z`
                }
                fill={`url(#t-${id})`}
                stroke={after ? "#cfe6e1" : "#b89c5c"}
                strokeWidth="1.5"
              />
              {after && <rect x={cx + t.w * 0.2} y={112} width={t.w * 0.18} height={t.h * 0.5} rx="4" fill="#fff" opacity="0.9" />}
              {!after && i % 3 === 0 && <ellipse cx={cx + t.w / 2} cy={100 + t.h - 14} rx={t.w * 0.25} ry="4" fill="#a8873f" opacity="0.5" />}
            </g>
          );
        })}
        {LOWER.map((t, i) => {
          const y = 218 - t.h;
          const tilt = !after && i === 3 ? 5 : 0;
          return (
            <g key={i} transform={`rotate(${tilt} ${t.x + t.w / 2} 218)`}>
              <path
                d={`M${t.x} 226V${y + 8}Q${t.x} ${y} ${t.x + 8} ${y}H${t.x + t.w - 8}Q${t.x + t.w} ${y} ${t.x + t.w} ${y + 8}V226Z`}
                fill={`url(#t-${id})`}
                stroke={after ? "#cfe6e1" : "#b89c5c"}
                strokeWidth="1.5"
              />
            </g>
          );
        })}
      </g>
      {/* lips */}
      <path d="M110 150C170 82 250 86 300 100C350 86 430 82 490 150C430 110 380 104 300 110C220 104 170 110 110 150Z" fill="#d46a6c" />
      <path d="M110 150C200 232 400 232 490 150C440 262 160 262 110 150Z" fill="#c95b5f" />
      <path d="M200 236C260 248 340 248 400 236" stroke="#fff" strokeOpacity="0.3" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Smile() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  const [touched, setTouched] = useState(false);
  const raw = useMotionValue(50);
  const pos = useSpring(raw, { stiffness: 220, damping: 30, mass: 0.6 });
  const clip = useTransform(pos, (v) => `inset(0 0 0 ${v}%)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const [value, setValue] = useState(50);

  // One gentle sweep to show it can be dragged.
  useEffect(() => {
    if (!inView || touched) return;
    const controls = animate(raw, [50, 18, 82, 50], { duration: 3.2, ease: "easeInOut", delay: 0.4 });
    return () => controls.stop();
  }, [inView, touched, raw]);

  return (
    <section id="smile" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-mint/30 blur-[120px] dark:bg-mint/10" />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <Eyebrow>Cosmetic dentistry</Eyebrow>
          </Reveal>
          <h2 className="display mt-5 text-[clamp(2.4rem,5.4vw,4.4rem)]">
            <Words text="Imagine your" accent="brightest smile." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Whitening, veneers, bonding and tooth-coloured fillings can close gaps, repair chips and lift stains — planned to suit your face, not a
              template.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Gap closing", "Chip repair", "Whitening", "Alignment", "Veneers"].map((t) => (
                <span key={t} className="rounded-full border border-fg/10 bg-surface px-4 py-2 text-sm font-medium shadow-card">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div ref={ref} className="relative overflow-hidden rounded-[2rem] border border-fg/8 bg-gradient-to-br from-[#fbe9e1] via-[#f7ddd2] to-[#f0cfc3] shadow-lift dark:from-[#3a2a28] dark:via-[#33241f] dark:to-[#2b1d1a]">
            <div className="relative aspect-[440/260] w-full select-none">
              <div className="absolute inset-0 p-[4%]">
                <Mouth after={false} />
              </div>
              <motion.div className="absolute inset-0 bg-gradient-to-br from-[#e9fbf6] via-[#dff5ef] to-[#cdeee6] p-[4%] dark:from-[#14332f] dark:via-[#112c29] dark:to-[#0d2522]" style={{ clipPath: clip }}>
                <Mouth after />
              </motion.div>

              <motion.div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_20px_rgba(0,0,0,0.25)]" style={{ left }}>
                <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-accent shadow-lift">
                  <MoveHorizontal className="h-5 w-5" aria-hidden />
                </span>
              </motion.div>

              <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                Before
              </span>
              <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-ink">
                After
              </span>

              <input
                type="range"
                min={0}
                max={100}
                step={0.5}
                value={value}
                aria-label="Compare before and after smile"
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setTouched(true);
                  setValue(v);
                  raw.set(v);
                }}
                onPointerDown={() => setTouched(true)}
                className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-muted">Illustration only — drag to compare. Your result depends on your teeth and the treatment chosen.</p>
        </Reveal>
      </div>
    </section>
  );
}
