"use server";

import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { getClientIp, HOUR, isRateLimited, recordAttempt } from "@/lib/auth/rate-limit";
import { hashToken } from "@/lib/auth/reset-token";
import { prisma } from "@/lib/db";
import { passwordResetEmail, sendEmail } from "@/lib/email";
import { siteUrl } from "@/lib/site";
import { forgotPasswordSchema, resetPasswordSchema } from "@/lib/validation/auth-schema";

const SALT_ROUNDS = 12;
const TOKEN_TTL_MS = HOUR;
const MAX_REQUESTS_PER_EMAIL = 3;
const MAX_REQUESTS_PER_IP = 10;

type ForgotResult = { error?: string; sent?: boolean };
type ResetResult = { error?: string };

export async function requestPasswordResetAction(values: unknown): Promise<ForgotResult> {
  const parsed = forgotPasswordSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "E-mail inválido." };
  }

  const email = parsed.data.email.trim().toLowerCase();

  // O pedido é contado para QUALQUER e-mail, exista conta ou não — assim o limite
  // não revela quais e-mails estão cadastrados.
  const ip = await getClientIp();
  const emailKey = `reset:email:${email}`;
  const ipKey = ip ? `reset:ip:${ip}` : null;
  if (
    (await isRateLimited(emailKey, MAX_REQUESTS_PER_EMAIL, HOUR)) ||
    (ipKey && (await isRateLimited(ipKey, MAX_REQUESTS_PER_IP, HOUR)))
  ) {
    return { error: "Muitos pedidos. Aguarde um pouco e tente novamente." };
  }
  await recordAttempt(emailKey);
  if (ipKey) await recordAttempt(ipKey);

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const token = randomBytes(32).toString("hex");

    // Só o link mais recente vale: apaga os anteriores.
    await prisma.$transaction([
      prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }),
      prisma.passwordResetToken.create({
        data: {
          tokenHash: hashToken(token),
          userId: user.id,
          expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
        },
      }),
    ]);

    const link = `${siteUrl}/redefinir-senha?token=${token}`;
    const message = passwordResetEmail(user.name, link);

    // `after` envia o e-mail depois de responder: o tempo de resposta é o mesmo
    // exista a conta ou não (não vaza quem está cadastrado).
    after(() => sendEmail({ to: user.email, ...message }));
  }

  // Mesma resposta nos dois casos, de propósito.
  return { sent: true };
}

export async function resetPasswordAction(
  token: string,
  values: unknown
): Promise<ResetResult> {
  const parsed = resetPasswordSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dados inválidos." };
  }

  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(String(token)) },
  });

  if (!record || record.expiresAt < new Date()) {
    return { error: "Este link é inválido ou expirou. Peça um novo." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, SALT_ROUNDS);

  // Tudo ou nada: troca a senha, invalida o(s) link(s) e derruba as sessões
  // abertas (quem roubou uma sessão perde o acesso).
  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.deleteMany({ where: { userId: record.userId } }),
    prisma.session.deleteMany({ where: { userId: record.userId } }),
  ]);

  redirect("/entrar?redefinida=1");
}
