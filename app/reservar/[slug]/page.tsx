import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { getSession } from "@/lib/auth/session";
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
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  // Reservar exige conta: depois do login a pessoa volta exatamente para cá,
  // com as datas e a etapa da URL preservadas.
  const session = await getSession();
  if (!session) {
    const backParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (typeof value === "string") backParams.set(key, value);
    }
    const qs = backParams.toString();
    const backTo = `/reservar/${slug}${qs ? `?${qs}` : ""}`;
    redirect(`/entrar?redirectTo=${encodeURIComponent(backTo)}`);
  }

  const first = (value: string | string[] | undefined) =>
    typeof value === "string" ? value : undefined;

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
            pickupLocation: first(query.local),
            returnLocation: first(query.local),
            pickupDate: first(query.retirada),
            returnDate: first(query.devolucao),
          }}
          user={{ name: session.user.name, email: session.user.email }}
        />
      </div>
    </div>
  );
}
