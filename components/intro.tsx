import { LogoMark } from "@/components/ui/logo-mark";

/**
 * Opening: a smile draws on deep teal, then the two halves part like lips.
 * Pure CSS so it plays before hydration and never blocks the page.
 */
export function Intro() {
  return (
    <div aria-hidden>
      <div className="lip lip-top flex items-end justify-center pb-6">
        <div className="intro-mark flex flex-col items-center gap-4">
          <LogoMark className="h-14 w-14" />
          <span className="display text-lg text-white">Vishal Dental</span>
        </div>
      </div>
      <div className="lip lip-bottom flex items-start justify-center pt-2">
        <svg viewBox="0 0 200 40" className="intro-mark w-40" fill="none">
          <path
            className="intro-smile"
            pathLength={1}
            d="M10 8 Q100 62 190 8"
            stroke="#5ee8cb"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
