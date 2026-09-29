import { headers } from "next/headers";

import { prisma } from "@/lib/db";

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;

// Na Vercel o IP real do visitante chega em x-forwarded-for (o primeiro da lista).
// Localmente o cabeçalho não existe: devolvemos null e só limitamos por e-mail.
export async function getClientIp(): Promise<string | null> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || requestHeaders.get("x-real-ip") || null;
}

export async function isRateLimited(key: string, max: number, windowMs: number) {
  const count = await prisma.rateLimitEvent.count({
    where: { key, createdAt: { gte: new Date(Date.now() - windowMs) } },
  });
  return count >= max;
}

export async function recordAttempt(key: string) {
  await prisma.rateLimitEvent.create({ data: { key } });

  // Faxina oportunista: mantém a tabela pequena sem precisar de um job agendado.
  if (Math.random() < 0.05) {
    await prisma.rateLimitEvent
      .deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 24 * HOUR) } } })
      .catch(() => {});
  }
}

export async function clearAttempts(key: string) {
  await prisma.rateLimitEvent.deleteMany({ where: { key } });
}
