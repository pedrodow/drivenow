import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-24 text-center md:px-16">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10">
        <Compass className="h-8 w-8 text-gold-500" aria-hidden="true" />
      </span>
      <p className="mt-6 text-label-sm uppercase tracking-wider text-gold-500">Erro 404</p>
      <h1 className="mt-2 text-headline-xl text-ink">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-body-md text-ink-muted">
        O endereço que você tentou acessar não existe ou foi movido. Que tal encontrar seu
        próximo carro?
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" render={<Link href="/frota" />} nativeButton={false}>
          Ver a frota
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/" />} nativeButton={false}>
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}
