"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/ui/logo-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { navLinks, site } from "@/lib/site";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hidden, setHidden] = useState(false);

  // Glass once scrolled; slides away while scrolling down, returns on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 480);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href.slice(1));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-700 ease-out-expo sm:px-5",
        hidden && !open && "-translate-y-[120%]",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[78rem] items-center justify-between gap-4 rounded-full px-4 py-2 transition-all duration-500 ease-out-expo sm:px-5",
          scrolled || open ? "border border-fg/10 bg-surface/80 shadow-card backdrop-blur-xl" : "border border-transparent bg-transparent",
        )}
      >
        <a href="#top" onClick={(e) => go(e, "#top")} aria-label={`${site.name}, back to top`}>
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => {
              const on = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      on ? "text-accent" : "text-fg/70 hover:text-fg",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-accent/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Magnetic className="hidden sm:inline-flex" strength={0.2}>
            <Button href={`tel:${site.phones[0].href}`} className="px-5 py-2.5 text-sm">
              <Phone className="h-4 w-4" aria-hidden />
              {site.phones[0].display}
            </Button>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/12 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-[78rem] overflow-y-auto rounded-3xl border border-fg/10 bg-surface/95 p-4 shadow-lift backdrop-blur-xl lg:hidden"
          >
            <ul className="grid gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className="display block rounded-2xl px-4 py-3 text-2xl hover:bg-accent/10 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-3 grid gap-2 border-t border-fg/10 pt-4">
              {site.phones.map((p) => (
                <Button key={p.href} href={`tel:${p.href}`} variant="secondary">
                  <Phone className="h-4 w-4" aria-hidden />
                  Call {p.display}
                </Button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
