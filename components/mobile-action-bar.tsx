"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { site, whatsappLink } from "@/lib/site";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/** Thumb-reach actions on phones, shown once the hero has scrolled away. */
export function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const visit = document.getElementById("visit");
      const nearVisit = visit ? visit.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setShow(window.scrollY > 600 && !nearVisit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 transition-all duration-500 ease-out-expo sm:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
      )}
    >
      <div className="grid grid-cols-3 gap-1.5 rounded-full border border-fg/10 bg-surface/90 p-1.5 shadow-lift backdrop-blur-xl">
        <a href={`tel:${site.phones[0].href}`} className="flex items-center justify-center gap-1.5 rounded-full py-3 text-sm font-semibold">
          <Phone className="h-4 w-4" aria-hidden /> Call
        </a>
        <a
          href={whatsappLink("Hi Vishal Dental, I'd like to book an appointment.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-full py-3 text-sm font-semibold"
        >
          <WhatsappIcon className="h-4 w-4" /> Chat
        </a>
        <a
          href="#visit"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("visit");
          }}
          className="flex items-center justify-center gap-1.5 rounded-full bg-accent py-3 text-sm font-semibold text-accent-ink"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden /> Book
        </a>
      </div>
    </div>
  );
}
