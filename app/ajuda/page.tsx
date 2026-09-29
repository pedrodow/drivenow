import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MessageCircle, Phone } from "lucide-react";

import { HelpCenter } from "@/components/help/help-center";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { DemoNotice } from "@/components/shared/demo-notice";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { getHelpCategories } from "@/lib/data/help";

export const metadata: Metadata = {
  title: "Central de Ajuda",
  description:
    "Tire dúvidas sobre reservas, retirada e devolução, proteção, extras, pagamento e segurança da sua conta DriveNow.",
  alternates: { canonical: "/ajuda" },
};

export default function AjudaPage() {
  const categories = getHelpCategories();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      }))
    ),
  };

  return (
    <div className="px-5 py-12 md:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Central de Ajuda" }]} />

        <div className="text-center">
          <SectionHeading
            align="center"
            eyebrow="Central de Ajuda"
            title="Como podemos ajudar?"
            description="Respostas rápidas sobre reservas, retirada, proteção e a sua conta."
            className="mx-auto"
          />
        </div>

        <div className="mt-10">
          <HelpCenter categories={categories} />
        </div>

        <section id="sobre" className="mt-20 scroll-mt-24">
          <SectionHeading
            eyebrow="Sobre"
            title="Quem é a DriveNow"
            description="Uma locadora pensada para tirar a burocracia do caminho: reserva 100% online, frota de populares a modelos Prestige e atendimento que responde de verdade."
          />
          <div className="mt-6">
            <DemoNotice>
              A DriveNow é uma locadora <strong className="text-ink">fictícia</strong>, criada
              como projeto de estudo e portfólio. Nenhuma reserva ou pagamento é real, e os canais
              de contato abaixo são ilustrativos.
            </DemoNotice>
          </div>
        </section>

        <section id="contato" className="mt-20 scroll-mt-24">
          <SectionHeading
            eyebrow="Contato"
            title="Ainda com dúvidas?"
            description="Nossos canais de atendimento (ilustrativos)."
          />
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <li className="glass rounded-lg p-6">
              <Phone className="h-5 w-5 text-gold-500" aria-hidden="true" />
              <h3 className="mt-3 text-body-lg text-ink">Telefone</h3>
              <p className="mt-1 text-body-md text-ink-muted">0800 555 0199</p>
            </li>
            <li className="glass rounded-lg p-6">
              <MessageCircle className="h-5 w-5 text-gold-500" aria-hidden="true" />
              <h3 className="mt-3 text-body-lg text-ink">WhatsApp</h3>
              <p className="mt-1 text-body-md text-ink-muted">(11) 90000-0199</p>
            </li>
            <li className="glass rounded-lg p-6">
              <Clock className="h-5 w-5 text-gold-500" aria-hidden="true" />
              <h3 className="mt-3 text-body-lg text-ink">Horário</h3>
              <p className="mt-1 text-body-md text-ink-muted">24 horas, todos os dias</p>
            </li>
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/frota" />} nativeButton={false} size="lg">
              Ver a frota
            </Button>
            <Button
              render={<Link href="/minha-drivenow" />}
              nativeButton={false}
              size="lg"
              variant="outline"
            >
              Minhas reservas
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
