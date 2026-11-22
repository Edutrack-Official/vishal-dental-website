import { useId } from "react";
import { cn } from "@/lib/utils";

export const TOOTH_PATH =
  "M200 40C150 20 90 30 70 80C52 125 60 175 78 215C92 250 96 300 104 360C110 420 130 455 150 450C168 446 172 400 180 350C186 315 192 300 200 300C208 300 214 315 220 350C228 400 232 446 250 450C270 455 290 420 296 360C304 300 308 250 322 215C340 175 348 125 330 80C310 30 250 20 200 40Z";

/** Tooth crest: a tooth in a soft rounded tile with a sparkle. */
export function LogoMark({ className }: { className?: string }) {
  const id = `lm-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 48 48" className={cn("h-10 w-10", className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="15" fill={`url(#${id})`} />
      <g transform="translate(10.5 8.5) scale(0.068)">
        <path d={TOOTH_PATH} fill="#fff" />
      </g>
      <path d="M36 9.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="#fff" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="display text-[1.2rem] tracking-[-0.03em]">Vishal Dental</span>
        <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-muted">&amp; Implant Centre</span>
      </span>
    </span>
  );
}
