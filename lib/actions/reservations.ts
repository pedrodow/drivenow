"use server";

import { randomInt } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getSession } from "@/lib/auth/session";
import { calculateBookingTotal, EXTRAS, PROTECTION_PLANS } from "@/lib/data/booking";
import { getVehicleBySlug } from "@/lib/data/fleet";
import { prisma } from "@/lib/db";
import { diffInDays, todayInBrazil } from "@/lib/format";
import { detailsSchema, extrasSchema } from "@/lib/validation/booking-schema";

const MAX_DAYS = 60;
const MAX_ACTIVE_RESERVATIONS = 10;
// Sem I, O, 0 e 1: o código é lido/digitado por pessoas na retirada.
const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const createReservationSchema = z.object({
  vehicleSlug: z.string().min(1),
  details: detailsSchema,
  extras: extrasSchema,
});

type CreateResult = { error: string } | { reference: string; total: number };

function isRealDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function generateReference() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += REFERENCE_ALPHABET[randomInt(REFERENCE_ALPHABET.length)];
  }
  return `DN-${code}`;
}

export async function createReservationAction(values: unknown): Promise<CreateResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Faça login para concluir a reserva." };
  }

  const parsed = createReservationSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dados da reserva inválidos." };
  }

  const { vehicleSlug, details, extras } = parsed.data;

  const vehicle = getVehicleBySlug(vehicleSlug);
  if (!vehicle || !vehicle.available) {
    return { error: "Este veículo não está disponível." };
  }

  if (!isRealDate(details.pickupDate) || !isRealDate(details.returnDate)) {
    return { error: "Datas inválidas." };
  }
  if (details.pickupDate < todayInBrazil()) {
    return { error: "A data de retirada não pode ser no passado." };
  }

  const days = diffInDays(details.pickupDate, details.returnDate);
  if (days > MAX_DAYS) {
    return { error: `O período máximo de aluguel é de ${MAX_DAYS} dias.` };
  }

  if (!PROTECTION_PLANS.some((plan) => plan.id === extras.protectionPlan)) {
    return { error: "Plano de proteção inválido." };
  }
  const validExtraIds = new Set(EXTRAS.map((extra) => extra.id));
  const extraIds = [...new Set(extras.extras)];
  if (extraIds.some((id) => !validExtraIds.has(id))) {
    return { error: "Item extra inválido." };
  }

  // Limite simples para o banco da demonstração não ser enchido por uma conta só.
  const activeCount = await prisma.reservation.count({
    where: { userId: session.userId, status: "confirmed" },
  });
  if (activeCount >= MAX_ACTIVE_RESERVATIONS) {
    return { error: "Você atingiu o limite de reservas ativas. Cancele alguma para continuar." };
  }

  // O total NUNCA vem do navegador: é recalculado aqui com o preço do catálogo.
  const total = calculateBookingTotal({
    pricePerDay: vehicle.pricePerDay,
    days,
    protectionPlanId: extras.protectionPlan,
    extraIds,
  });

  // O código é aleatório e único no banco; em caso raro de colisão, tenta de novo.
  for (let attempt = 0; attempt < 5; attempt++) {
    const reference = generateReference();
    try {
      await prisma.reservation.create({
        data: {
          reference,
          userId: session.userId,
          vehicleSlug: vehicle.slug,
          vehicleName: `${vehicle.brand} ${vehicle.name}`,
          pickupLocation: details.pickupLocation,
          returnLocation: details.returnLocation,
          pickupDate: details.pickupDate,
          returnDate: details.returnDate,
          days,
          protectionPlan: extras.protectionPlan,
          extras: JSON.stringify(extraIds),
          total,
        },
      });
      revalidatePath("/minha-drivenow");
      return { reference, total };
    } catch (error) {
      const isCollision = (error as { code?: string }).code === "P2002";
      if (!isCollision) {
        console.error("Falha ao salvar reserva", error);
        return { error: "Não foi possível salvar a reserva. Tente novamente." };
      }
    }
  }

  return { error: "Não foi possível gerar o código da reserva. Tente novamente." };
}

export async function cancelReservationAction(reservationId: string): Promise<void> {
  const session = await getSession();
  if (!session) return;

  // `userId` no filtro garante que ninguém cancela a reserva de outra pessoa.
  // Regra publicada no FAQ: cancelamento grátis com pelo menos 1 dia de antecedência
  // (a retirada precisa ser depois de hoje).
  await prisma.reservation.updateMany({
    where: {
      id: reservationId,
      userId: session.userId,
      status: "confirmed",
      pickupDate: { gt: todayInBrazil() },
    },
    data: { status: "cancelled" },
  });

  revalidatePath("/minha-drivenow");
}
