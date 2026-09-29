// Aplica os arquivos de prisma/migrations/*/migration.sql num banco libsql/Turso.
//
// Por que existe: `prisma migrate deploy` só entende banco em arquivo local; para
// o Turso (libsql://...) aplicamos o mesmo SQL "na mão". O script é idempotente:
// registra o que já rodou na tabela _applied_migrations e pula o que já foi aplicado.
//
// Uso:  npm run db:migrate          (usa DATABASE_URL / DATABASE_AUTH_TOKEN do .env)
import "dotenv/config";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@libsql/client";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL não definida (veja .env.example).");
  process.exit(1);
}

const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });
const migrationsDir = join(process.cwd(), "prisma", "migrations");

await client.execute(
  `CREATE TABLE IF NOT EXISTS _applied_migrations (
     name TEXT NOT NULL PRIMARY KEY,
     appliedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
   )`
);

const applied = new Set(
  (await client.execute("SELECT name FROM _applied_migrations")).rows.map((row) => row.name)
);

const folders = readdirSync(migrationsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort(); // os nomes começam com timestamp, então ordem alfabética = ordem cronológica

let count = 0;
for (const name of folders) {
  const file = join(migrationsDir, name, "migration.sql");
  if (!existsSync(file) || applied.has(name)) continue;

  console.log(`Aplicando ${name}...`);
  // executeMultiple roda vários comandos SQL de uma vez; a migration inteira é
  // aplicada e só então registrada.
  await client.executeMultiple(readFileSync(file, "utf8"));
  await client.execute({ sql: "INSERT INTO _applied_migrations (name) VALUES (?)", args: [name] });
  count++;
}

console.log(count === 0 ? "Nada a aplicar: banco já está atualizado." : `${count} migration(s) aplicada(s).`);
client.close();
