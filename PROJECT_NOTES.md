# DriveNow — Notas do projeto

Site de aluguel de carros da locadora fictícia "DriveNow", reconstruído em Next.js
a partir de mockups gerados no Stitch (pasta `referencias/`). Este arquivo existe
para que qualquer sessão nova (em qualquer computador) consiga se situar rápido.

## Status das fases

- ✅ **Fase 0** — Fundação: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript,
  design system "Graphite & Gold" (ver `referencias/stitch_drivenow_premium_car_rental/luxe_velocity/DESIGN.md`).
- ✅ **Fase 1** — Home: hero com busca funcional, categorias, frota em destaque,
  diferenciais, banner promocional, depoimentos, FAQ.
- ✅ **Fase 2** — `/frota` (listagem com filtros por categoria/câmbio/preço, sincronizados
  na URL) + `/frota/[slug]` (detalhe do veículo, specs, veículos parecidos).
- ✅ **Fase 3** — `/reservar/[slug]`: fluxo de reserva em 3 etapas (datas/retirada →
  extras/proteção → pagamento) + confirmação. **O pagamento é só interface** — não há
  gateway, backend ou envio/armazenamento de dado real de cartão em nenhum lugar.
- ✅ **Fase 4** — Polimento: auditoria de acessibilidade (axe-core, 0 violações WCAG 2.1 AA)
  e Lighthouse (99-100 em performance/a11y/boas práticas/SEO em todas as páginas — a
  exceção proposital é o SEO de `/reservar/[slug]`, que é `noindex` de propósito por
  ser uma página de checkout). 404 e erro personalizados, skeletons de loading,
  breadcrumbs compartilhados com JSON-LD.
- 🚧 **Fase 5 (em andamento)** — banco de dados + login, para chegar na área do cliente
  logado ("Minha DriveNow", baseada em `referencias/.../my_drivenow_dashboard*`).
  - ✅ Prisma 7 + SQLite (via adapter libsql), models `User` e `Session`, migration `init`.
  - ✅ Backend de auth: `lib/actions/auth.ts` (cadastro/login/logout), sessão por cookie
    httpOnly em `lib/auth/session.ts`, `proxy.ts` protegendo `/minha-drivenow/*`.
  - ✅ Telas `/entrar`, `/cadastro` e `/minha-drivenow` (mínima: nome, e-mail, sair).
    `redirectTo` é validado em `lib/auth/redirect.ts` (evita open redirect).
  - ⏳ Testes manuais: ver `CHECKLIST_TESTES.md`.
  - ⏳ Central de Ajuda (`about_drivenow_help_center*`) segue como futuro.

## Plano para o deploy na Vercel

1. ✅ Correções: `postinstall: prisma generate` (o client gerado não é versionado),
   `dotenv` declarado, `.env.example`, `.gitignore` das cópias de skills.
2. ✅ Telas de login/cadastro e área logada mínima.
3. ⏳ Banco remoto: **Turso** (SQLite hospedado). SQLite em arquivo não funciona na
   Vercel (disco somente leitura/efêmero). Falta: `authToken` em `lib/db.ts` e aplicar
   o SQL de `prisma/migrations/` no Turso (o `prisma migrate` não fala com libsql).
4. ⏳ Deploy: variáveis `DATABASE_URL` e `DATABASE_AUTH_TOKEN` na Vercel, teste em produção.
- 💤 **Pagamento real** — deliberadamente adiado. Quando for implementar: **Mercado Pago**
  (recomendado por causa do Pix e confiança do consumidor BR) ou Stripe, via checkout
  hospedado/componentes embutidos deles — o formulário de cartão atual precisa ser
  **substituído por inteiro** (não estendido) por questão de PCI-DSS.

## Stack técnica real (importante: diferente do que normalmente se espera)

- **Next.js 16** (não 14/15) + **React 19** + **Turbopack** (bundler padrão, sem config extra).
- **Tailwind CSS v4** — não existe `tailwind.config.ts`. Os tokens de design (cores,
  tipografia, radii) ficam em `app/globals.css` dentro de blocos `@theme { ... }`
  (CSS-first, não JS config).
- **shadcn/ui** na variante mais nova ("base-nova"), construído sobre **Base UI**
  (`@base-ui/react`), não Radix. Componentes ficam em `components/ui/`.
- **lucide-react** para ícones (essa versão instalada não tem ícones de marca tipo
  Instagram/Facebook — foram removidos do pacote).
- **react-hook-form + zod v4** para os formulários da reserva e de auth.
- **Prisma 7** (`prisma-client` generator, client gerado em `lib/generated/prisma`, que
  é ignorado pelo git e recriado no `postinstall`). Prisma 7 exige driver adapter
  (`@prisma/adapter-libsql`) e a URL do banco vive em `prisma.config.ts`, não no schema.
  Variáveis em `.env` (modelo em `.env.example`).
- Auth própria (bcryptjs + sessão no banco), sem NextAuth.
- No Next 16, `middleware.ts` virou **`proxy.ts`**.
- Dados (frota, depoimentos, FAQ, extras/proteção) em `lib/data/*.ts`, sempre expostos
  via funções (`getFleet()`, `getVehicleBySlug()` etc.) para facilitar trocar por uma
  API/CMS no futuro sem mexer nos componentes.

## Catálogo de veículos

Mistura carros nacionais populares reais (com fotos geradas: HB20, Polo GTS, Fastback,
Compass) + linha "Entrada" (Kwid, Mobi, Onix — sem foto ainda, mostrados com um card de
fallback "Foto em breve") + linha fictícia "Prestige Collection" (usa renders genéricos
de carro de luxo, propositalmente **sem** usar marcas reais tipo BMW/Rolls-Royce, já que
não há foto licenciada para elas).

## Como rodar

```bash
npm install      # também roda `prisma generate` (postinstall)
cp .env.example .env
npx prisma migrate deploy   # cria prisma/dev.db com as tabelas
npm run dev      # http://localhost:3000
npm run build    # build de produção + checagem de tipos/lint
npm run lint
```

## Onde encontrar as coisas

- Referências visuais originais (Stitch): `referencias/stitch_drivenow_premium_car_rental/`
- Design system de origem: `referencias/.../luxe_velocity/DESIGN.md`
- Fotos reais dos veículos: `public/images/fleet/`
