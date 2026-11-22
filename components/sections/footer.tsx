import { MapPin, Phone } from "lucide-react";
import { Wordmark } from "@/components/ui/logo-mark";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { navLinks, site, treatments, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="deep grain relative overflow-hidden pb-28 pt-20 sm:pb-12">
      <div aria-hidden className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-[120px]" />
      <div className="wrap relative">
        <p aria-hidden className="display pointer-events-none select-none text-[clamp(4rem,15vw,13rem)] leading-[0.85] text-fg/[0.06]">
          Smile <span className="serif">wide.</span>
        </p>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {site.doctor}, {site.qualification} — {site.speciality}. Implants, root canals and complete dental care in {site.address.short}.
            </p>
            <a
              href={whatsappLink("Hi Vishal Dental, I'd like to book an appointment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform duration-500 ease-out-expo hover:-translate-y-0.5"
            >
              <WhatsappIcon className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-fg/40">Explore</p>
            <ul className="mt-4 grid gap-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-fg/75 transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-fg/40">Treatments</p>
            <ul className="mt-4 grid gap-2.5">
              {treatments.map((t) => (
                <li key={t.id}>
                  <a href="#treatments" className="text-fg/75 transition-colors hover:text-accent">
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-fg/40">Visit</p>
            <address className="mt-4 flex gap-3 not-italic text-fg/75">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span>
                {site.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </address>
            <p className="mt-3 pl-7 text-sm text-muted">{site.address.landmark}</p>
            <div className="mt-4 flex gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <a href={`tel:${site.phones[0].href}`} className="font-semibold hover:text-accent">
                {site.phones[0].display}
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">
              Mon–Sat · 10:30 AM–2:30 PM
              <br />
              and 5–9 PM
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-fg/10 pt-8 text-sm text-fg/45">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
