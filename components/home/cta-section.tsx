import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="px-5 pb-24 md:px-16">
      <Reveal className="mx-auto max-w-7xl">
        <div className="glass golden-glow flex flex-col items-center gap-6 rounded-lg px-8 py-16 text-center">
          <h2 className="max-w-2xl text-headline-xl text-ink">
            Pronto para sua próxima viagem?
          </h2>
          <p className="max-w-xl text-body-md text-ink-muted">
            Reserve agora e retire seu carro hoje mesmo. Sem burocracia, sem taxas
            escondidas — só você e a estrada.
          </p>
          <Button size="lg" className="golden-glow" render={<a href="#buscar" />} nativeButton={false}>
            Reservar agora
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
