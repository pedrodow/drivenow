import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth/session";

// Usada pelo navbar para saber se há alguém logado sem tornar todas as páginas
// dinâmicas (ler cookies() num layout desativaria a geração estática do site).
// Só expõe nome e e-mail — nunca o hash da senha nem o id da sessão.
export async function GET() {
  const session = await getSession();

  return NextResponse.json(
    { user: session ? { name: session.user.name, email: session.user.email } : null },
    { headers: { "Cache-Control": "no-store" } }
  );
}
