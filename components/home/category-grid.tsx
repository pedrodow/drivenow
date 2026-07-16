import Link from "next/link";
import { Car, CarFront, Gem, Truck } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getCategories } from "@/lib/data/fleet";
import { formatPrice } from "@/lib/format";

const ICONS: Record<string, typeof Car> = {
  entrada: Car,
  compacto: CarFront,
  suv: Truck,
  prestige: Gem,
};

export function CategoryGrid() {
  const categories = getCategories();

  return (
    <section id="categorias" className="px-5 py-20 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Escolha seu estilo"
            title="Uma categoria para cada viagem"
            description="Da economia à linha Prestige, cada categoria foi pensada para um jeito diferente de dirigir."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = ICONS[category.slug] ?? Car;
            return (
              <Reveal key={category.slug} delay={index * 80}>
                <Link
                  href={`/frota?categoria=${category.slug}`}
                  className="glass group flex h-full flex-col gap-4 rounded-lg p-6 transition-transform duration-500 ease-[var(--ease-weighted)] hover:-translate-y-1.5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-500">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-headline-lg text-ink">{category.name}</h3>
                  <p className="flex-1 text-body-md text-ink-muted">{category.description}</p>
                  <p className="text-label-md uppercase tracking-wider text-gold-500">
                    A partir de {formatPrice(category.priceFrom)}/dia
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
