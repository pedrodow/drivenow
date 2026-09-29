export const DEFAULT_AFTER_LOGIN = "/minha-drivenow";

// `redirectTo` vem da query string, então nunca confie nele às cegas: só
// aceitamos caminhos internos ("/algo"). "//evil.com" e "/\evil.com" seriam
// interpretados pelo navegador como outro domínio (open redirect).
export function safeRedirectPath(value: unknown, fallback = DEFAULT_AFTER_LOGIN) {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }
  return value;
}
