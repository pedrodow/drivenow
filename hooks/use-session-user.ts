"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type SessionUser = { name: string; email: string };

// "loading" evita mostrar "Entrar" por um instante para quem já está logado.
export type SessionState = "loading" | SessionUser | null;

export function useSessionUser() {
  const pathname = usePathname();
  const [user, setUser] = useState<SessionState>("loading");

  // O navbar vive no layout e não remonta ao navegar; refazer a consulta a cada
  // mudança de rota pega login/cadastro (que redirecionam) sem recarregar a página.
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/session", { cache: "no-store", signal: controller.signal })
      .then((response) => response.json())
      .then((data: { user: SessionUser | null }) => setUser(data.user))
      .catch((error) => {
        if (error.name !== "AbortError") setUser(null);
      });

    return () => controller.abort();
  }, [pathname]);

  return { user, clear: () => setUser(null) };
}
