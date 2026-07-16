import type { FaqItem } from "@/lib/types";

const faq: FaqItem[] = [
  {
    question: "Qual a idade mínima para alugar um carro na DriveNow?",
    answer:
      "É preciso ter no mínimo 21 anos e Carteira Nacional de Habilitação (CNH) válida há pelo menos 2 anos. Para veículos da linha Prestige, a idade mínima é 25 anos.",
  },
  {
    question: "Quais documentos preciso apresentar na retirada?",
    answer:
      "CNH válida (física ou digital), CPF e um cartão de crédito com limite disponível para a caução. Reservas feitas com CPF de terceiros exigem autorização prévia.",
  },
  {
    question: "Existe taxa de cancelamento?",
    answer:
      "Não. Cancelamentos feitos com até 24 horas de antecedência da retirada são gratuitos e o valor é estornado em até 5 dias úteis.",
  },
  {
    question: "Posso retirar o carro em uma cidade e devolver em outra?",
    answer:
      "Sim, oferecemos devolução em outra unidade DriveNow mediante uma taxa de deslocamento, calculada automaticamente ao finalizar sua reserva.",
  },
  {
    question: "O seguro já está incluso na diária?",
    answer:
      "Todas as diárias incluem proteção contra colisão com franquia reduzida. Você pode contratar a Proteção Total na reserva para rodar com franquia zero.",
  },
  {
    question: "Vocês oferecem entrega em domicílio ou no aeroporto?",
    answer:
      "Sim, fazemos entrega e retirada em domicílio, hotéis e aeroportos nas principais capitais, sem custo adicional para reservas de 3 diárias ou mais.",
  },
];

export function getFaq(): FaqItem[] {
  return faq;
}
