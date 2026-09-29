import type { FaqItem } from "@/lib/types";

export type HelpCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

// Dados sempre atrás de função (como a frota): trocar por CMS no futuro não
// exige mexer nos componentes.
const categories: HelpCategory[] = [
  {
    id: "reservas",
    title: "Reservas",
    items: [
      {
        question: "Como faço uma reserva?",
        answer:
          "Escolha um veículo na frota, clique em reservar e siga as 3 etapas: datas e locais, extras e proteção, e seus dados. É preciso estar logado; se ainda não tiver conta, você cria uma em menos de um minuto e volta exatamente para a reserva.",
      },
      {
        question: "Como cancelo uma reserva?",
        answer:
          "Em Minha DriveNow, clique em Cancelar reserva. O cancelamento é gratuito até 1 dia antes da data de retirada. Depois disso, o botão deixa de aparecer.",
      },
      {
        question: "Posso alterar as datas de uma reserva?",
        answer:
          "Ainda não há edição de reservas. Se precisar mudar as datas, cancele a reserva (dentro do prazo) e faça uma nova.",
      },
      {
        question: "Existe um período máximo de aluguel?",
        answer:
          "Sim. Cada reserva pode ter até 60 diárias. Para períodos maiores, faça reservas consecutivas.",
      },
    ],
  },
  {
    id: "retirada",
    title: "Retirada e devolução",
    items: [
      {
        question: "Qual a idade mínima para alugar?",
        answer:
          "É preciso ter no mínimo 21 anos e CNH válida há pelo menos 2 anos. Para veículos da linha Prestige, a idade mínima é 25 anos.",
      },
      {
        question: "Quais documentos preciso apresentar na retirada?",
        answer:
          "CNH válida (física ou digital), CPF e um cartão de crédito com limite disponível para a caução. Reservas feitas com CPF de terceiros exigem autorização prévia.",
      },
      {
        question: "Posso retirar em uma cidade e devolver em outra?",
        answer:
          "Sim. Você escolhe locais diferentes de retirada e devolução na primeira etapa da reserva. A devolução em outra unidade tem taxa de deslocamento.",
      },
      {
        question: "Vocês entregam em domicílio ou no aeroporto?",
        answer:
          "Sim, fazemos entrega e retirada em domicílio, hotéis e aeroportos nas principais capitais, sem custo adicional para reservas de 3 diárias ou mais.",
      },
    ],
  },
  {
    id: "protecao",
    title: "Proteção, extras e pagamento",
    items: [
      {
        question: "O seguro já está incluso na diária?",
        answer:
          "Todas as diárias incluem a Proteção Standard, com cobertura de colisão e franquia reduzida. Na reserva você pode contratar a Proteção Total (R$ 45 por dia) para rodar com franquia zero em colisão, incêndio e roubo.",
      },
      {
        question: "Quais extras posso adicionar?",
        answer:
          "Cadeira infantil, GPS satelital, condutor adicional e Wi-Fi portátil, todos cobrados por diária e somados ao total antes de você confirmar.",
      },
      {
        question: "O pagamento é real neste site?",
        answer:
          "Não. A DriveNow é um projeto de estudo e portfólio: o checkout é uma demonstração, nenhum pagamento é processado e os dados do cartão nunca saem do seu navegador. Use o cartão fictício indicado na tela de pagamento.",
      },
    ],
  },
  {
    id: "conta",
    title: "Conta e segurança",
    items: [
      {
        question: "Esqueci minha senha. O que faço?",
        answer:
          "Na tela de login, clique em Esqueci minha senha e informe o e-mail da conta. Enviamos um link de uso único, válido por 1 hora. Ao redefinir, todas as sessões abertas são encerradas.",
      },
      {
        question: "Como meus dados são protegidos?",
        answer:
          "A senha é guardada apenas em forma de hash (bcrypt), nunca em texto. Dados de cartão não são coletados nem armazenados, e há limite de tentativas de login para dificultar ataques de força bruta. Veja a Política de Privacidade para os detalhes.",
      },
      {
        question: "Onde vejo minhas reservas?",
        answer:
          "Em Minha DriveNow, no menu do site, depois de entrar na sua conta. Lá aparecem o código, o período, os extras, o total e o status de cada reserva.",
      },
    ],
  },
];

export function getHelpCategories(): HelpCategory[] {
  return categories;
}
