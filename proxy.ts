import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE } from "@/lib/auth/constants";

// Next.js 16 renomeou `middleware.ts` para `proxy.ts`. Roda em runtime nodejs
// (não edge), mas mantemos aqui só a checagem barata do cookie — a validação
// completa da sessão (expiração etc.) acontece em getSession(), chamado pelo
// layout de /minha-drivenow.
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  if (!hasSession) {
    const loginUrl = new URL("/entrar", request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/minha-drivenow/:path*"],
};
