import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { ScrollProgress } from "@/components/scroll-progress";
import { Intro } from "@/components/intro";
import { CursorGlow } from "@/components/cursor-glow";
import { site } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

const title = `${site.legalName} — Dental Implants, Root Canal & Oral Surgery in Thudiyalur, Coimbatore`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.legalName}` },
  description: site.description,
  keywords: [
    "dentist Thudiyalur",
    "dental clinic Thudiyalur Coimbatore",
    "dental implants Coimbatore",
    "root canal treatment Thudiyalur",
    "oral and maxillofacial surgeon Coimbatore",
    "wisdom tooth removal Coimbatore",
    "full mouth rehabilitation Coimbatore",
    "cosmetic dentist Coimbatore",
    "kids dentist Thudiyalur",
    "emergency dentist Coimbatore",
    "dentist near Vishwanathapuram bus stop",
  ],
  openGraph: { title, description: site.description, url: site.url, siteName: site.legalName, locale: "en_IN", type: "website" },
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = { themeColor: "#062126", colorScheme: "light dark" };

const bootScript = `(function(){try{if(localStorage.getItem('vishal-theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.phones[0].href,
  medicalSpecialty: ["Dentistry", "Oral and Maxillofacial Surgery"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "City Building, HF 2, Subramaniya Layout, Rukkammal Colony",
    addressLocality: "Thudiyalur, Coimbatore",
    postalCode: "641034",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:30", closes: "14:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "17:00", closes: "21:00" },
  ],
  employee: { "@type": "Person", name: site.doctor, jobTitle: `${site.speciality} (${site.qualification})` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${bricolage.variable} ${instrument.variable} ${figtree.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only rounded-full bg-accent px-4 py-2 font-medium text-accent-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300]"
        >
          Skip to content
        </a>
        <Intro />
        <Providers>
          <CursorGlow />
          <ScrollProgress />
          <Navbar />
          <main id="main" className="relative z-[2]">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
        </Providers>
      </body>
    </html>
  );
}
