import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { safeRedirectPath } from "@/lib/auth/redirect";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default async function EntrarPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;
  const destination = safeRedirectPath(redirectTo);

  // Quem já está logado não precisa ver o formulário.
  if (await getSession()) {
    redirect(destination);
  }

  return (
    <AuthShell
      title="Entrar"
      description="Acesse sua conta para acompanhar suas reservas."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="text-gold-500 underline-offset-4 hover:underline">
            Criar conta
          </Link>
        </>
      }
    >
      <LoginForm redirectTo={destination} />
    </AuthShell>
  );
}
