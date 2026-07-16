import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { getFleet, getVehicleBySlug } from "@/lib/data/fleet";

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

  return {
    title: vehicle ? `Reservar ${vehicle.name}` : "Reservar veículo",
    robots: { index: false, follow: false },
  };
}

export default async function ReservarPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ local?: string; retirada?: string; devolucao?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="px-5 py-12 md:px-16">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Início", href: "/" },
            { label: "Frota", href: "/frota" },
            { label: vehicle.name, href: `/frota/${vehicle.slug}` },
            { label: "Reservar" },
          ]}
        />

        <h1 className="mb-8 text-headline-xl text-ink">
          Reservar {vehicle.brand} {vehicle.name}
        </h1>

        <BookingWizard
          vehicle={vehicle}
          initialDetails={{
            pickupLocation: query.local,
            returnLocation: query.local,
            pickupDate: query.retirada,
            returnDate: query.devolucao,
          }}
        />
      </div>
    </div>
  );
}
