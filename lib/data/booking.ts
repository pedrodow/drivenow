export type ProtectionPlan = {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
};

export type ExtraItem = {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
};

export const PROTECTION_PLANS: ProtectionPlan[] = [
  {
    id: "standard",
    name: "Proteção Standard",
    description: "Inclusa em todas as diárias. Cobre colisão com franquia reduzida.",
    pricePerDay: 0,
  },
  {
    id: "total",
    name: "Proteção Total",
    description: "Franquia zero em colisão, incêndio e roubo. Tranquilidade completa.",
    pricePerDay: 45,
  },
];

export const EXTRAS: ExtraItem[] = [
  {
    id: "cadeira-infantil",
    name: "Cadeira infantil",
    description: "Cadeira homologada para crianças de até 4 anos.",
    pricePerDay: 15,
  },
  {
    id: "gps",
    name: "GPS satelital",
    description: "Navegação em tempo real com alerta de radares.",
    pricePerDay: 12,
  },
  {
    id: "condutor-adicional",
    name: "Condutor adicional",
    description: "Adicione outra pessoa habilitada para dirigir o veículo.",
    pricePerDay: 15,
  },
  {
    id: "wifi",
    name: "Wi-Fi portátil",
    description: "Internet ilimitada a bordo para até 5 dispositivos.",
    pricePerDay: 20,
  },
];

export function getProtectionPlans(): ProtectionPlan[] {
  return PROTECTION_PLANS;
}

export function getExtras(): ExtraItem[] {
  return EXTRAS;
}

export function calculateBookingTotal({
  pricePerDay,
  days,
  protectionPlanId,
  extraIds,
}: {
  pricePerDay: number;
  days: number;
  protectionPlanId: string;
  extraIds: string[];
}): number {
  const protectionPlan = PROTECTION_PLANS.find((plan) => plan.id === protectionPlanId);
  const extrasTotal = EXTRAS.filter((extra) => extraIds.includes(extra.id)).reduce(
    (sum, extra) => sum + extra.pricePerDay * days,
    0
  );

  return pricePerDay * days + (protectionPlan?.pricePerDay ?? 0) * days + extrasTotal;
}
