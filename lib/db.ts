import { PrismaLibSql } from "@prisma/adapter-libsql";

import { PrismaClient } from "@/lib/generated/prisma/client";

// Evita esgotar conexões durante hot-reload do `next dev`, que recarrega
// módulos a cada mudança de arquivo — sem isso, cada reload criaria um novo
// PrismaClient (e um novo pool) por cima do anterior.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  // Local: "file:./prisma/dev.db" (sem token). Produção: "libsql://...turso.io"
  // + DATABASE_AUTH_TOKEN (o Turso exige o token; arquivo local ignora).
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
