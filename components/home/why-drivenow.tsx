import { Handshake, ShieldCheck, Star } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const PILLARS = [
  {
    icon: Star,
    title: "Frota cuidada",
    description:
      "Cada veículo passa por revisão e higienização completa antes de chegar até você, do popular ao Prestige.",
  },
  {
    icon: Handshake,
    title: "Atendimento de verdade",
    description:
      "Suporte humano 24 horas por telefone e WhatsApp. Sem robôs, sem espera — sua viagem não pode esperar.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança em primeiro lugar",
    description:
      "Proteção contra colisão inclusa em todas as diárias, com upgrade para franquia zero quando você quiser.",
  },
];

export function WhyDriveNow() {
  return (
    <section id="como-funciona" className="scroll-mt-24 px-5 py-20 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Por que a DriveNow"
            title="Confiança que se sente na estrada"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 100} className="flex flex-col items-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10">
                <Icon className="h-7 w-7 text-gold-500" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-headline-lg text-ink">{title}</h3>
              <p className="mt-3 text-body-md text-ink-muted">{description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
