import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DriveNow | Aluguel de carros premium no Brasil",
    template: "%s | DriveNow",
  },
  description:
    "Alugue carros populares, SUVs e veículos de luxo com reserva 100% online, cancelamento grátis e entrega em domicílio. Confiança e rapidez em cada quilômetro.",
  keywords: [
    "aluguel de carros",
    "locadora de veículos",
    "aluguel de carro premium",
    "alugar carro online",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "DriveNow",
    title: "DriveNow | Aluguel de carros premium no Brasil",
    description:
      "Reserve em minutos e retire seu carro sem burocracia. Frota nacional popular até a linha Prestige.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DriveNow",
  url: siteUrl,
  description:
    "Locadora de veículos com frota nacional popular e linha Prestige, reserva online e entrega em domicílio.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-0800-555-0199",
    contactType: "customer service",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${plusJakartaSans.variable} dark h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-graphite-900 text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-gold-500 focus-visible:px-4 focus-visible:py-2 focus-visible:text-gold-950"
        >
          Pular para o conteúdo
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
