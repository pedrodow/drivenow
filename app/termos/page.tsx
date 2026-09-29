import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do site de demonstração DriveNow.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      updatedAt="29/09/2026"
      intro="Ao usar este site você concorda com as condições abaixo. Elas existem para deixar claro o que ele é — e o que não é."
      sections={[
        {
          title: "O que é a DriveNow",
          body: (
            <p>
              Um projeto de estudo e portfólio que simula uma locadora de veículos. Não existe
              frota, nem contrato, nem cobrança: reservas e valores servem apenas para demonstrar
              o funcionamento do site.
            </p>
          ),
        },
        {
          title: "Reservas e pagamento",
          body: (
            <p>
              As reservas ficam salvas na sua conta, mas nenhum veículo é de fato separado e
              nenhum pagamento é processado. O cancelamento é gratuito até 1 dia antes da data de
              retirada.
            </p>
          ),
        },
        {
          title: "Sua conta",
          body: (
            <p>
              Você é responsável por manter sua senha em segurança. Podemos limitar tentativas de
              acesso e bloquear contas ou endereços que apresentem comportamento abusivo.
            </p>
          ),
        },
        {
          title: "Uso aceitável",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>Não tente derrubar, sobrecarregar ou invadir o site.</li>
              <li>Não crie contas ou reservas em massa.</li>
              <li>Não publique nem informe dados de terceiros sem permissão.</li>
            </ul>
          ),
        },
        {
          title: "Imagens e marcas",
          body: (
            <p>
              As imagens dos veículos foram geradas por inteligência artificial. Marcas e nomes
              de modelos pertencem aos seus respectivos donos e são citados apenas de forma
              ilustrativa, sem qualquer vínculo com este projeto.
            </p>
          ),
        },
        {
          title: "Disponibilidade e mudanças",
          body: (
            <p>
              O site é oferecido “como está”, sem garantia de disponibilidade. Funcionalidades,
              dados e estes termos podem mudar, e contas e reservas de demonstração podem ser
              apagadas a qualquer momento.
            </p>
          ),
        },
      ]}
    />
  );
}
