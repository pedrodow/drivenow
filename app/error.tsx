"use client";

import Link from "next/link";
import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-24 text-center md:px-16">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10">
        <TriangleAlert className="h-8 w-8 text-gold-500" aria-hidden="true" />
      </span>
      <p className="mt-6 text-label-sm uppercase tracking-wider text-gold-500">
        Algo deu errado
      </p>
      <h1 className="mt-2 text-headline-xl text-ink">Não conseguimos carregar esta página</h1>
      <p className="mt-4 max-w-md text-body-md text-ink-muted">
        Foi um erro inesperado do nosso lado. Você pode tentar novamente ou voltar para o
        início.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset}>
          Tentar novamente
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/" />} nativeButton={false}>
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}
