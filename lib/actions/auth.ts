"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { safeRedirectPath } from "@/lib/auth/redirect";
import {
  clearAttempts,
  getClientIp,
  HOUR,
  isRateLimited,
  MINUTE,
  recordAttempt,
} from "@/lib/auth/rate-limit";
import { createSession, destroySession } from "@/lib/auth/session";
import { loginSchema, registerSchema } from "@/lib/validation/auth-schema";

const SALT_ROUNDS = 12;

const LOGIN_MAX_PER_EMAIL = 5;
const LOGIN_MAX_PER_IP = 20;
const LOGIN_WINDOW = 15 * MINUTE;
const REGISTER_MAX_PER_IP = 5;
const TOO_MANY = "Muitas tentativas. Aguarde alguns minutos e tente novamente.";

type ActionResult = { error?: string };

export async function registerAction(values: unknown): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dados inválidos." };
  }

  // Limita criação de contas por IP para o banco não ser enchido em massa.
  const ip = await getClientIp();
  const registerKey = ip ? `register:ip:${ip}` : null;
  if (registerKey && (await isRateLimited(registerKey, REGISTER_MAX_PER_IP, HOUR))) {
    return { error: TOO_MANY };
  }

  const { name, password } = parsed.data;
  // E-mail é único e comparado exatamente: normalizar evita "Ana@x.com" e
  // "ana@x.com" virarem duas contas.
  const email = parsed.data.email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Já existe uma conta com este e-mail." };
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });
  if (registerKey) await recordAttempt(registerKey);

  await createSession(user.id);
  redirect("/minha-drivenow");
}

export async function loginAction(
  values: unknown,
  redirectTo?: string
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dados inválidos." };
  }

  const { password } = parsed.data;
  const email = parsed.data.email.trim().toLowerCase();

  // Bloqueia força bruta: por e-mail (alguém adivinhando a senha de uma conta) e
  // por IP (alguém testando muitos e-mails). Checa ANTES do bcrypt, que é caro.
  const ip = await getClientIp();
  const emailKey = `login:email:${email}`;
  const ipKey = ip ? `login:ip:${ip}` : null;
  if (
    (await isRateLimited(emailKey, LOGIN_MAX_PER_EMAIL, LOGIN_WINDOW)) ||
    (ipKey && (await isRateLimited(ipKey, LOGIN_MAX_PER_IP, LOGIN_WINDOW)))
  ) {
    return { error: TOO_MANY };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  const passwordMatches = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!user || !passwordMatches) {
    await recordAttempt(emailKey);
    if (ipKey) await recordAttempt(ipKey);
    return { error: "E-mail ou senha incorretos." };
  }

  await clearAttempts(emailKey);
  await createSession(user.id);
  redirect(safeRedirectPath(redirectTo));
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
