"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { safeRedirectPath } from "@/lib/auth/redirect";
import { createSession, destroySession } from "@/lib/auth/session";
import { loginSchema, registerSchema } from "@/lib/validation/auth-schema";

const SALT_ROUNDS = 12;

type ActionResult = { error?: string };

export async function registerAction(values: unknown): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dados inválidos." };
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

  const user = await prisma.user.findUnique({ where: { email } });
  const passwordMatches = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!user || !passwordMatches) {
    return { error: "E-mail ou senha incorretos." };
  }

  await createSession(user.id);
  redirect(safeRedirectPath(redirectTo));
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
