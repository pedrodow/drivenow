// Isolado de session.ts porque este arquivo também é importado por proxy.ts
// (middleware), que não pode importar `next/headers`.
export const SESSION_COOKIE = "drivenow_session";
