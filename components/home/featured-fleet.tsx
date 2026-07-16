import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { VehicleCard } from "@/components/fleet/vehicle-card";
import { getFeaturedFleet } from "@/lib/data/fleet";

export function FeaturedFleet() {
  const vehicles = getFeaturedFleet(6);

  return (
    <section id="frota" className="scroll-mt-24 bg-graphite-950/40 px-5 py-20 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="A coleção"
              title="Frota em destaque"
              description="Modelos populares e a linha Prestige, prontos para reserva imediata."
            />
            <Button
              variant="outline"
              render={<Link href="/frota" />}
              nativeButton={false}
              className="hidden md:inline-flex"
            >
              Ver frota completa
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle, index) => (
            <Reveal key={vehicle.slug} delay={index * 60}>
              <VehicleCard vehicle={vehicle} />
            </Reveal>
          ))}
        </div>

        <Button
          variant="outline"
          render={<Link href="/frota" />}
          nativeButton={false}
          className="mt-10 w-full md:hidden"
        >
          Ver frota completa
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
