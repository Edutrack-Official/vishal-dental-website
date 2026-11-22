"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Light is the default. The choice is stored and re-applied before first paint
 * by the inline script in app/layout.tsx. Where the browser supports view
 * transitions, the new theme grows out of this button.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("vishal-theme", next);
      } catch {}
    };

    const rect = e.currentTarget.getBoundingClientRect();
    root.style.setProperty("--vt-x", `${rect.left + rect.width / 2}px`);
    root.style.setProperty("--vt-y", `${rect.top + rect.height / 2}px`);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && "startViewTransition" in document) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className={cn(
        "group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-fg/12 text-fg/75 transition-colors duration-300 hover:border-accent/50 hover:text-accent",
        className,
      )}
    >
      <Sun className="absolute h-[1.05rem] w-[1.05rem] transition-all duration-500 ease-out-expo dark:translate-y-6 dark:rotate-90 dark:opacity-0" />
      <Moon className="absolute h-[1.05rem] w-[1.05rem] -translate-y-6 -rotate-90 opacity-0 transition-all duration-500 ease-out-expo dark:translate-y-0 dark:rotate-0 dark:opacity-100" />
    </button>
  );
}
