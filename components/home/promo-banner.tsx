import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

export function PromoBanner() {
  return (
    <section className="px-5 py-10 md:px-16">
      <Reveal className="mx-auto max-w-7xl">
        <div className="glass relative flex min-h-[22rem] items-center overflow-hidden rounded-lg px-8 py-12 md:px-16">
          <div className="absolute inset-y-0 right-0 w-full opacity-30 md:w-1/2 md:opacity-90">
            <Image
              src="/images/fleet/eletrico-prestige.png"
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover [mask-image:linear-gradient(to_right,transparent,black_35%)]"
            />
          </div>
          <div className="relative z-10 max-w-md">
            <span className="inline-block rounded-full bg-gold-500/10 px-3 py-1 text-label-md uppercase tracking-widest text-gold-500">
              Oferta exclusiva
            </span>
            <h2 className="mt-4 text-headline-xl leading-tight text-ink">
              Fim de semana com 20% de desconto
            </h2>
            <p className="mt-4 text-body-lg text-ink-muted">
              Reserve qualquer veículo por 3 diárias ou mais e garanta 20% de desconto
              com o cupom <strong className="text-ink">DRIVE20</strong>.
            </p>
            <Button
              size="lg"
              className="mt-8 golden-glow"
              render={<Link href="#buscar" />}
              nativeButton={false}
            >
              Aproveitar oferta
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
