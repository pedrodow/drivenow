import type { Testimonial } from "@/lib/types";

const testimonials: Testimonial[] = [
  {
    name: "Marina Costa",
    location: "São Paulo, SP",
    rating: 5,
    quote:
      "Reservei pelo celular em menos de 3 minutos e retirei o carro sem nenhuma burocracia. Atendimento impecável do início ao fim.",
    vehicle: "Jeep Compass S-Series",
  },
  {
    name: "Rafael Almeida",
    location: "Belo Horizonte, MG",
    rating: 5,
    quote:
      "Já aluguei em várias locadoras e a DriveNow é a mais transparente: sem taxa escondida e o carro chegou impecável.",
    vehicle: "Fiat Fastback Limited",
  },
  {
    name: "Juliana Prado",
    location: "Curitiba, PR",
    rating: 5,
    quote:
      "Precisei estender a reserva de última hora e resolveram tudo pelo WhatsApp em minutos. Isso é confiança.",
    vehicle: "Hyundai HB20 Platinum Plus",
  },
  {
    name: "Eduardo Nogueira",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    quote:
      "Aluguei o Sedã Esportivo Prestige para um evento e me senti tratado como cliente VIP. Vale cada centavo.",
    vehicle: "Sedã Esportivo Prestige",
  },
];

export function getTestimonials(): Testimonial[] {
  return testimonials;
}
