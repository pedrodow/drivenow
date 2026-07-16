import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchWidget } from "@/components/home/search-widget";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-16 md:px-16 md:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_80%_-10%,rgba(233,196,0,0.16),transparent)]"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-label-sm uppercase tracking-wider text-gold-500">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Locadora nº 1 em satisfação no Brasil
          </span>
          <h1 className="mt-6 text-display-mobile text-ink md:text-display-lg">
            Dirija sua ambição.
          </h1>
          <p className="mt-6 text-body-lg text-ink-muted">
            Da economia ao topo de linha: reserve em minutos, retire sem burocracia e
            viaje com a confiança de uma locadora consolidada em todo o Brasil.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="golden-glow"
              render={<a href="#buscar" />}
              nativeButton={false}
            >
              Reservar agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/frota" />}
              nativeButton={false}
            >
              Ver a frota
            </Button>
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-[4/3] w-full max-w-lg lg:block">
          <div
            aria-hidden="true"
            className="absolute inset-8 rounded-full bg-gold-500/20 blur-3xl"
          />
          <Image
            src="/images/fleet/suv-prestige.png"
            alt="SUV de luxo da frota Prestige DriveNow"
            fill
            preload
            quality={90}
            sizes="(min-width: 1024px) 32rem, 0px"
            className="relative object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl">
        <SearchWidget />
      </div>
    </section>
  );
}
