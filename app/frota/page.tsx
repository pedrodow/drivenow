import { Suspense } from "react";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FleetFilters } from "@/components/fleet/fleet-filters";
import { VehicleCard } from "@/components/fleet/vehicle-card";
import { getCategories, getFleet } from "@/lib/data/fleet";
import type { Vehicle } from "@/lib/types";

export const metadata: Metadata = {
  title: "Frota completa",
  description:
    "Veja toda a frota DriveNow: carros de entrada, compactos, SUVs e a linha Prestige. Filtre por categoria, câmbio e preço e reserve online.",
};

type FrotaSearchParams = {
  categoria?: string;
  cambio?: string;
  ordenar?: string;
  local?: string;
  retirada?: string;
  devolucao?: string;
};

function sortVehicles(vehicles: Vehicle[], sort?: string) {
  if (sort === "menor-preco") {
    return [...vehicles].sort((a, b) => a.pricePerDay - b.pricePerDay);
  }
  if (sort === "maior-preco") {
    return [...vehicles].sort((a, b) => b.pricePerDay - a.pricePerDay);
  }
  return vehicles;
}

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(date);
}

export default async function FrotaPage({
  searchParams,
}: {
  searchParams: Promise<FrotaSearchParams>;
}) {
  const params = await searchParams;
  const categories = getCategories();

  let vehicles = getFleet();
  if (params.categoria) {
    vehicles = vehicles.filter((vehicle) => vehicle.categorySlug === params.categoria);
  }
  if (params.cambio && params.cambio !== "todos") {
    vehicles = vehicles.filter((vehicle) => vehicle.transmission === params.cambio);
  }
  vehicles = sortVehicles(vehicles, params.ordenar);

  const pickup = formatDate(params.retirada);
  const dropoff = formatDate(params.devolucao);

  return (
    <div className="px-5 py-12 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Frota" }]} />

        <div className="max-w-2xl">
          <h1 className="text-headline-xl text-ink">Nossa frota completa</h1>
          <p className="mt-3 text-body-md text-ink-muted">
            Do popular ao Prestige: filtre por categoria e câmbio para encontrar o carro certo
            para sua viagem.
          </p>
          {params.local && (
            <p className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-label-sm text-gold-500">
              Disponibilidade em {params.local}
              {pickup && dropoff ? ` · ${pickup} → ${dropoff}` : null}
            </p>
          )}
        </div>

        <div className="mt-10 border-b border-white/5 pb-8">
          <Suspense fallback={<div className="h-24" />}>
            <FleetFilters categories={categories} />
          </Suspense>
        </div>

        {vehicles.length > 0 ? (
          <>
            <h2 className="mt-10 text-label-md uppercase tracking-wider text-ink-faint">
              {vehicles.length} {vehicles.length === 1 ? "veículo encontrado" : "veículos encontrados"}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.slug} vehicle={vehicle} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-2 text-center">
            <h2 className="text-headline-lg text-ink">Nenhum veículo encontrado</h2>
            <p className="text-body-md text-ink-muted">
              Ajuste os filtros para ver outras opções da nossa frota.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
