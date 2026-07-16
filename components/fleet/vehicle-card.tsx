import Image from "next/image";
import Link from "next/link";
import { Car, Gauge, Settings2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { Vehicle } from "@/lib/types";

const TRANSMISSION_LABEL: Record<Vehicle["transmission"], string> = {
  manual: "Manual",
  automatico: "Automático",
};

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="glass group flex flex-col overflow-hidden rounded-lg transition-transform duration-500 ease-[var(--ease-weighted)] hover:-translate-y-1.5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-graphite-700">
        {vehicle.image ? (
          <Image
            src={vehicle.image}
            alt={vehicle.imageAlt}
            fill
            quality={90}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-weighted)] group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-graphite-700 to-graphite-900 text-ink-faint">
            <Car className="h-10 w-10" aria-hidden="true" />
            <span className="text-label-sm uppercase tracking-wider">Foto em breve</span>
          </div>
        )}
        {vehicle.available && (
          <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-label-sm uppercase tracking-wider text-gold-950">
            Disponível
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-label-sm uppercase tracking-wider text-gold-500">
              {vehicle.category}
            </p>
            <h3 className="text-headline-lg text-ink">{vehicle.name}</h3>
          </div>
          <p className="whitespace-nowrap text-right text-headline-lg text-ink">
            {formatPrice(vehicle.pricePerDay)}
            <span className="ml-1 text-label-sm font-normal text-ink-faint">/dia</span>
          </p>
        </div>

        <p className="text-body-md text-ink-muted">{vehicle.highlight}</p>

        <dl className="flex flex-wrap gap-x-4 gap-y-2 border-y border-white/5 py-3 text-label-sm uppercase tracking-wide text-ink-faint">
          <div className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4" aria-hidden="true" />
            <dt className="sr-only">Potência</dt>
            <dd>{vehicle.horsepower} cv</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden="true" />
            <dt className="sr-only">Lugares</dt>
            <dd>{vehicle.seats} lugares</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings2 className="h-4 w-4" aria-hidden="true" />
            <dt className="sr-only">Câmbio</dt>
            <dd>{TRANSMISSION_LABEL[vehicle.transmission]}</dd>
          </div>
        </dl>

        <Button
          render={<Link href={`/frota/${vehicle.slug}`} />}
          nativeButton={false}
          className="mt-auto w-full"
        >
          Ver detalhes
        </Button>
      </div>
    </article>
  );
}
