import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Quais dados a DriveNow (projeto de portfólio) guarda e como eles são protegidos.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      updatedAt="29/09/2026"
      intro="Explicamos, sem juridiquês, quais dados este site guarda, para quê, e o que nunca é coletado."
      sections={[
        {
          title: "O que guardamos",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink">Conta:</strong> nome, e-mail e a senha em forma de
                hash (bcrypt) — a senha em si nunca é armazenada.
              </li>
              <li>
                <strong className="text-ink">Reservas:</strong> veículo, locais, datas, extras e
                valor total de cada reserva feita na sua conta.
              </li>
              <li>
                <strong className="text-ink">Sessão:</strong> um cookie de login
                (<code>drivenow_session</code>, inacessível a scripts, válido por 30 dias) e o
                registro correspondente no banco.
              </li>
              <li>
                <strong className="text-ink">Segurança:</strong> contadores de tentativas de
                login, cadastro e recuperação de senha, ligados ao e-mail ou ao endereço IP, por
                curto período, para bloquear abusos.
              </li>
            </ul>
          ),
        },
        {
          title: "O que NÃO coletamos",
          body: (
            <p>
              Dados de cartão de crédito. O checkout é uma demonstração: os campos de pagamento
              são validados no seu navegador e nunca são enviados ao servidor. Também não usamos
              cookies de publicidade nem ferramentas de rastreamento.
            </p>
          ),
        },
        {
          title: "Serviços que participam",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>Vercel — hospedagem do site.</li>
              <li>Turso — banco de dados onde ficam conta e reservas.</li>
              <li>Resend — envio do e-mail de recuperação de senha.</li>
            </ul>
          ),
        },
        {
          title: "Recuperação de senha",
          body: (
            <p>
              O link enviado por e-mail vale por 1 hora e só pode ser usado uma vez. No banco
              guardamos apenas um hash dele. Ao redefinir a senha, todas as sessões abertas da
              conta são encerradas.
            </p>
          ),
        },
        {
          title: "Seus direitos",
          body: (
            <p>
              Você pode pedir acesso, correção ou exclusão dos seus dados. Como este é um projeto
              pessoal, o pedido é feito pelo repositório do projeto no GitHub
              (github.com/pedrodow/drivenow). Você também pode cancelar suas reservas a qualquer
              momento dentro do prazo, em Minha DriveNow.
            </p>
          ),
        },
        {
          title: "Uso recomendado",
          body: (
            <p>
              Por ser um site de demonstração, use uma senha que você não utiliza em outros
              serviços e evite informar dados pessoais sensíveis.
            </p>
          ),
        },
      ]}
    />
  );
}
