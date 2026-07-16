import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Car, Check, Fuel, Gauge, Settings2, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { VehicleCard } from "@/components/fleet/vehicle-card";
import { getFleet, getVehicleBySlug, getVehiclesByCategory } from "@/lib/data/fleet";
import { formatPrice } from "@/lib/format";

const TRANSMISSION_LABEL = {
  manual: "Manual",
  automatico: "Automático",
} as const;

const FUEL_LABEL = {
  flex: "Flex",
  hibrido: "Híbrido",
  eletrico: "Elétrico",
} as const;

const INCLUDED_ITEMS = [
  "Proteção contra colisão com franquia reduzida",
  "Assistência 24 horas em qualquer lugar do Brasil",
  "Cancelamento grátis até 24h antes da retirada",
  "Quilometragem livre em todas as diárias",
];

export function generateStaticParams() {
  return getFleet().map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return { title: "Veículo não encontrado" };
  }

  return {
    title: `${vehicle.name} — a partir de ${formatPrice(vehicle.pricePerDay)}/dia`,
    description: `${vehicle.highlight} Reserve o ${vehicle.brand} ${vehicle.name} online, com cancelamento grátis e retirada sem burocracia.`,
    openGraph: vehicle.image ? { images: [{ url: vehicle.image }] } : undefined,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const related = getVehiclesByCategory(vehicle.categorySlug)
    .filter((item) => item.slug !== vehicle.slug)
    .slice(0, 3);

  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${vehicle.brand} ${vehicle.name}`,
    category: vehicle.category,
    description: vehicle.highlight,
    ...(vehicle.image ? { image: vehicle.image } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: vehicle.pricePerDay,
      availability: vehicle.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="px-5 py-12 md:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(vehicleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { label: "Início", href: "/" },
            { label: "Frota", href: "/frota" },
            { label: vehicle.name },
          ]}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-graphite-700 sm:aspect-[16/9]">
              {vehicle.image ? (
                <Image
                  src={vehicle.image}
                  alt={vehicle.imageAlt}
                  fill
                  priority
                  quality={90}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-graphite-700 to-graphite-900 text-ink-faint">
                  <Car className="h-14 w-14" aria-hidden="true" />
                  <span className="text-label-sm uppercase tracking-wider">Foto em breve</span>
                </div>
              )}
            </div>

            <div className="mt-8">
              <p className="text-label-sm uppercase tracking-wider text-gold-500">
                {vehicle.category}
              </p>
              <h1 className="mt-2 text-headline-xl text-ink">
                {vehicle.brand} {vehicle.name}
              </h1>
              <p className="mt-4 max-w-2xl text-body-lg text-ink-muted">{vehicle.highlight}</p>

              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { icon: Gauge, label: "Potência", value: `${vehicle.horsepower} cv` },
                  { icon: Users, label: "Lugares", value: `${vehicle.seats} lugares` },
                  { icon: Settings2, label: "Câmbio", value: TRANSMISSION_LABEL[vehicle.transmission] },
                  { icon: Fuel, label: "Combustível", value: FUEL_LABEL[vehicle.fuel] },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="glass rounded-lg p-4">
                    <Icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
                    <dt className="mt-2 text-label-sm uppercase tracking-wide text-ink-faint">
                      {label}
                    </dt>
                    <dd className="text-body-md text-ink">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                <h2 className="text-headline-lg text-ink">O que está incluso</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {INCLUDED_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-body-md text-ink-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass golden-glow rounded-lg p-6">
              <p className="text-label-sm uppercase tracking-wider text-ink-faint">Diária a partir de</p>
              <p className="mt-1 text-display-mobile text-ink">
                {formatPrice(vehicle.pricePerDay)}
                <span className="text-label-md font-normal text-ink-faint">/dia</span>
              </p>
              <p className="mt-4 flex items-center gap-2 text-label-sm text-ink-muted">
                <ShieldCheck className="h-4 w-4 text-gold-500" aria-hidden="true" />
                Proteção contra colisão inclusa
              </p>
              <Button
                size="lg"
                className="mt-6 w-full"
                render={<Link href={`/reservar/${vehicle.slug}`} />}
                nativeButton={false}
              >
                Reservar agora
              </Button>
              <p className="mt-3 text-center text-label-sm text-ink-faint">
                Cancelamento grátis até 24h antes da retirada
              </p>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-headline-lg text-ink">Veículos parecidos</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <VehicleCard key={item.slug} vehicle={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
