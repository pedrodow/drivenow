import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { DEFAULT_AFTER_LOGIN } from "@/lib/auth/redirect";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Criar conta",
  robots: { index: false, follow: false },
};

export default async function CadastroPage() {
  if (await getSession()) {
    redirect(DEFAULT_AFTER_LOGIN);
  }

  return (
    <AuthShell
      title="Criar conta"
      description="Leva menos de um minuto. Depois é só reservar."
      footer={
        <>
          Já tem conta?{" "}
          <Link href="/entrar" className="text-gold-500 underline-offset-4 hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
