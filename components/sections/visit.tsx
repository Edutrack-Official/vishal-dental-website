"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Navigation, Phone, Send } from "lucide-react";
import { Eyebrow, Reveal, Words } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { dayNames, fmt, openDays, sessions, useClinicStatus } from "@/lib/hours";
import { mapsEmbed, mapsLink, site, treatments, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const START = 8;
const END = 22;
const pct = (h: number) => ((h - START) / (END - START)) * 100;

/** Today's opening hours as a bar, with a live "now" marker. */
function DayTimeline() {
  const status = useClinicStatus();
  const today = status?.day ?? -1;
  const isOpenDay = openDays.includes(today);
  const now = status && status.hour >= START && status.hour <= END ? pct(status.hour) : null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="display text-xl">Today</p>
        <p className={cn("text-sm font-semibold", status?.open ? "text-accent" : "text-coral")}>{status?.label ?? " "}</p>
      </div>
      <div className="relative mt-9 h-10 rounded-full bg-surface-2">
        {isOpenDay || today === -1
          ? sessions.map((s) => (
              <motion.span
                key={s.label}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-1 origin-left rounded-full bg-gradient-to-r from-accent-2 to-accent"
                style={{ left: `${pct(s.from)}%`, width: `${pct(s.to) - pct(s.from)}%` }}
              />
            ))
          : (
              <span className="absolute inset-0 grid place-items-center text-sm font-semibold text-muted">Closed today — see you {dayNames[(today + 1) % 7]}</span>
            )}
        {now !== null && (
          <span className="absolute -top-1.5 bottom-[-0.375rem] w-0.5 bg-fg" style={{ left: `${now}%` }}>
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-fg px-1.5 py-0.5 text-[0.65rem] font-bold text-bg">NOW</span>
          </span>
        )}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>8 AM</span>
        <span>12 PM</span>
        <span>4 PM</span>
        <span>8 PM</span>
        <span>10 PM</span>
      </div>

      <ul className="mt-6 grid gap-1.5 text-sm">
        {[1, 2, 3, 4, 5, 6, 0].map((d) => (
          <li key={d} className={cn("flex justify-between rounded-xl px-3 py-2", d === today ? "bg-accent/10 font-semibold text-accent" : "text-muted")}>
            <span>{dayNames[d]}</span>
            <span>{openDays.includes(d) ? sessions.map((s) => `${fmt(s.from)}–${fmt(s.to)}`).join(" · ") : "Closed"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Visit() {
  const [name, setName] = useState("");
  const [concern, setConcern] = useState(treatments[0].name);
  const [date, setDate] = useState("");
  const [session, setSession] = useState<"Morning" | "Evening">("Evening");
  const [note, setNote] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hi Vishal Dental, I'd like to book an appointment.`,
      name && `Name: ${name}`,
      `For: ${concern}`,
      date && `Preferred date: ${date}`,
      `Preferred time: ${session} session`,
      note && `Note: ${note}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-2xl border border-fg/10 bg-bg/60 px-4 py-3.5 outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-fg/35 focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_15%,transparent)]";

  return (
    <section id="visit" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-mint/25 blur-[130px] dark:bg-mint/10" />
      <div className="wrap relative">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Visit the clinic</Eyebrow>
          </Reveal>
          <h2 className="display mt-5 text-[clamp(2.4rem,5.6vw,4.6rem)]">
            <Words text="Your new smile starts" accent="with a hello." />
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Booking form */}
          <Reveal>
            <form onSubmit={submit} className="h-full rounded-[2rem] border border-fg/8 bg-surface p-6 shadow-lift sm:p-9">
              <p className="display text-2xl">Request an appointment</p>
              <p className="mt-2 text-sm text-muted">Sends your request on WhatsApp — we&apos;ll reply to confirm a time.</p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Your name
                  <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Treatment
                  <select className={field} value={concern} onChange={(e) => setConcern(e.target.value)}>
                    {treatments.map((t) => (
                      <option key={t.id}>{t.name}</option>
                    ))}
                    <option>General check-up</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Preferred date
                  <input type="date" className={field} value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <fieldset className="grid gap-2 text-sm font-semibold">
                  <legend className="mb-2">Session</legend>
                  <div className="relative grid grid-cols-2 rounded-2xl border border-fg/10 bg-bg/60 p-1">
                    {(["Morning", "Evening"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSession(s)}
                        aria-pressed={session === s}
                        className={cn("relative rounded-xl py-2.5 transition-colors", session === s ? "text-accent-ink" : "text-muted")}
                      >
                        {session === s && (
                          <motion.span layoutId="session-pill" className="absolute inset-0 rounded-xl bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                        )}
                        <span className="relative">{s}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                  Anything we should know? <span className="sr-only">(optional)</span>
                  <textarea
                    className={cn(field, "min-h-24 resize-none")}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. pain on the lower left side for 3 days"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button type="submit">
                  <WhatsappIcon className="h-4 w-4" /> Send on WhatsApp
                  <Send className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" aria-hidden />
                </Button>
                <Button href={`tel:${site.phones[0].href}`} variant="secondary">
                  <Phone className="h-4 w-4" aria-hidden /> Call instead
                </Button>
              </div>
            </form>
          </Reveal>

          {/* Hours */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-[2rem] border border-fg/8 bg-surface p-6 shadow-card sm:p-9">
              <p className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                <Clock className="h-4 w-4" aria-hidden /> Clinic hours
              </p>
              <DayTimeline />
            </div>
          </Reveal>
        </div>

        {/* Map + address */}
        <Reveal delay={0.05}>
          <div className="mt-6 grid overflow-hidden rounded-[2rem] border border-fg/8 bg-surface shadow-card lg:grid-cols-[0.8fr_1.2fr]">
            <div className="p-6 sm:p-9">
              <MapPin className="h-6 w-6 text-accent" aria-hidden />
              <address className="display mt-4 text-2xl not-italic leading-snug">
                {site.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent">
                <Navigation className="h-3.5 w-3.5" aria-hidden /> {site.address.landmark}
              </p>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 flex w-fit items-center gap-1.5 font-semibold text-fg hover:text-accent"
              >
                Get directions
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
              </a>
            </div>
            <iframe
              title={`Map to ${site.legalName}`}
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0 grayscale-[0.3] lg:h-full lg:min-h-80"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
