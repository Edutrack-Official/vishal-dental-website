"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import type { IconKey } from "@/lib/site";
import { TOOTH_PATH } from "@/components/ui/logo-mark";

/** Line illustrations that draw themselves each time they mount. */
const PATHS: Record<IconKey, string[]> = {
  implant: [
    "M70 20 C55 14 38 18 34 34 C30 48 38 56 42 62 L98 62 C102 56 110 48 106 34 C102 18 85 14 70 20Z",
    "M56 62 L84 62 L80 76 L60 76Z",
    "M60 80 L80 80 M58 88 L82 88 M60 96 L80 96 M62 104 L78 104 M64 112 L76 112",
    "M60 76 L64 122 L70 128 L76 122 L80 76",
  ],
  canal: [
    "M70 18 C50 10 26 16 22 38 C18 56 28 68 32 82 C36 98 38 116 44 126 C50 132 56 120 58 104 C60 92 64 86 70 86 C76 86 80 92 82 104 C84 120 90 132 96 126 C102 116 104 98 108 82 C112 68 122 56 118 38 C114 16 90 10 70 18Z",
    "M58 50 C56 70 52 96 48 118",
    "M82 50 C84 70 88 96 92 118",
    "M58 50 C62 42 78 42 82 50",
  ],
  jaw: [
    "M30 30 C30 70 40 98 62 116 C78 128 100 126 116 112",
    "M30 30 C40 26 48 30 52 40 C56 52 54 64 62 72",
    "M70 92 L74 100 M82 96 L85 104 M94 98 L96 106 M106 96 L107 104",
    "M98 24 L118 44 M118 24 L98 44",
  ],
  arch: [
    "M24 36 C24 92 44 120 70 120 C96 120 116 92 116 36",
    "M34 40 C34 84 50 106 70 106 C90 106 106 84 106 40",
    "M29 56 L39 54 M33 76 L43 72 M42 94 L50 88 M56 106 L60 98 M70 112 L70 106 M84 106 L80 98 M98 94 L90 88 M107 76 L97 72 M111 56 L101 54",
  ],
  sparkle: [
    "M62 30 C48 24 32 30 30 46 C28 60 36 70 38 82 C40 96 42 110 48 116 C54 120 58 108 60 98 C62 90 64 86 68 86 C72 86 74 90 76 98 C78 108 82 120 88 116 C94 110 96 96 98 82 C100 70 108 60 106 46 C104 30 88 24 74 30 C70 32 66 32 62 30Z",
    "M110 14 C111 22 116 27 124 28 C116 29 111 34 110 42 C109 34 104 29 96 28 C104 27 109 22 110 14Z",
    "M24 104 C24.6 108 27 110.4 31 111 C27 111.6 24.6 114 24 118 C23.4 114 21 111.6 17 111 C21 110.4 23.4 108 24 104Z",
  ],
  kid: [
    "M70 28 C54 20 30 24 28 46 C26 64 36 74 38 88 C40 102 44 116 52 118 C58 120 60 106 62 98 C64 92 66 90 70 90 C74 90 76 92 78 98 C80 106 82 120 88 118 C96 116 100 102 102 88 C104 74 114 64 112 46 C110 24 86 20 70 28Z",
    "M54 56 L54 60 M86 56 L86 60",
    "M56 70 C62 78 78 78 84 70",
    "M40 66 C42 64 46 64 48 66 M92 66 C94 64 98 64 100 66",
  ],
  bolt: [
    "M64 24 C50 18 30 22 28 42 C26 58 34 68 36 80 C38 94 42 110 48 114 C54 116 56 104 58 96 C60 90 62 86 66 86",
    "M76 22 C90 18 110 22 112 42 C114 58 106 68 104 80 C102 94 98 110 92 114 C86 116 84 104 82 96",
    "M74 30 L60 62 L74 62 L64 92 L88 54 L74 54 L84 30Z",
  ],
};

export function TreatmentIcon({ icon, className }: { icon: IconKey; className?: string }) {
  const gid = `ti-${icon}-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 140 140" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      {PATHS[icon].map((d, i) => (
        <motion.path
          key={`${icon}-${i}`}
          d={d}
          stroke={`url(#${gid})`}
          strokeWidth={i === 0 ? 3.2 : 2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.12 * i, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </svg>
  );
}

/** Tiny filled tooth glyph used as a bullet. */
export function ToothDot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 480" className={className} aria-hidden>
      <path d={TOOTH_PATH} fill="currentColor" />
    </svg>
  );
}
