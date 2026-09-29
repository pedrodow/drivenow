import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Esqueci minha senha",
  robots: { index: false, follow: false },
};

export default function EsqueciSenhaPage() {
  return (
    <AuthShell
      title="Esqueci minha senha"
      description="Informe o e-mail da sua conta e enviaremos um link para criar uma nova senha."
      footer={
        <Link href="/entrar" className="text-gold-500 underline-offset-4 hover:underline">
          Voltar para o login
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
