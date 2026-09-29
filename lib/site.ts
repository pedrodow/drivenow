// URL pública do site, usada em metadados, sitemap, robots e JSON-LD.
// Ordem: NEXT_PUBLIC_SITE_URL (defina se tiver domínio próprio) → domínio de
// produção que a própria Vercel injeta no build → localhost no desenvolvimento.
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelProductionHost ? `https://${vercelProductionHost}` : "http://localhost:3000")
).replace(/\/$/, "");
