import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { hashToken } from "@/lib/auth/reset-token";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Redefinir senha",
  robots: { index: false, follow: false },
};

export default async function RedefinirSenhaPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  // Confere já ao abrir o link, para avisar cedo (a action confere de novo ao enviar).
  const record =
    typeof token === "string" && token.length > 0
      ? await prisma.passwordResetToken.findUnique({ where: { tokenHash: hashToken(token) } })
      : null;
  const valid = !!record && record.expiresAt > new Date();

  if (!valid) {
    return (
      <AuthShell
        title="Link inválido"
        description="Este link de redefinição não é válido ou já expirou."
        footer={
          <Link href="/entrar" className="text-gold-500 underline-offset-4 hover:underline">
            Voltar para o login
          </Link>
        }
      >
        <Link
          href="/esqueci-senha"
          className="text-body-md text-gold-500 underline-offset-4 hover:underline"
        >
          Pedir um novo link
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Nova senha"
      description="Escolha uma senha nova para a sua conta."
      footer={
        <Link href="/entrar" className="text-gold-500 underline-offset-4 hover:underline">
          Voltar para o login
        </Link>
      }
    >
      <ResetPasswordForm token={token!} />
    </AuthShell>
  );
}
