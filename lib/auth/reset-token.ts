import { createHash } from "node:crypto";

// O banco guarda só o hash: o token "de verdade" existe apenas no link do e-mail.
export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
