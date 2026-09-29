# DriveNow — Notas do projeto

Site de aluguel de carros da locadora fictícia "DriveNow" (projeto de estudo e portfólio),
reconstruído em Next.js a partir de mockups gerados no Stitch (pasta `referencias/`).
Este arquivo existe para que qualquer sessão nova (em qualquer computador) consiga se
situar rápido.

## Onde paramos (atualizado em 2026-09-29)

**Estado:** o site já foi publicado na Vercel e funciona. Nesta sessão foram feitos, em ordem:
avisos de demonstração e URL configurável, reservas salvas no banco, limite de tentativas de
login, recuperação de senha por e-mail e Central de Ajuda (+ Privacidade e Termos). Tudo isso
está commitado, mas **5 commits ainda não foram enviados ao GitHub** (de `da15d49` até o commit
destas notas, e o que vier depois):
confira com `git status -sb` / `git log origin/master..HEAD`. Enquanto não houver push, o site
publicado NÃO tem essas funcionalidades.

**Banco:** uma única base Turso é usada tanto pelo `.env` local quanto pela Vercel. As migrations
foram aplicadas nela até `20260929200000_add_password_reset` (as tabelas já existem, então o
push é seguro). Sugestão: criar um segundo banco Turso só para testes e deixar o de produção só
para a Vercel. O banco já contém **1 conta real do dono do projeto**: não apague os dados por
engano ao limpar testes (use contas de teste separadas e apague só elas).

### Próximos passos (em ordem)

1. **Fazer o push** (`git push origin master`) e conferir que o deploy da Vercel ficou "Ready".
2. **Resend** (recuperação de senha): criar conta em resend.com, gerar a API key e colocar
   `RESEND_API_KEY` na Vercel (Settings → Environment Variables) e no `.env`. Sem isso o e-mail
   não é enviado em produção. Sem domínio próprio, só chega ao e-mail dono da conta Resend.
3. **Rodar o `CHECKLIST_TESTES.md`** (local e depois no link da Vercel) e anotar o que mudar.
4. **Fotos de Kwid, Mobi e Onix:** o usuário vai baixar/gerar e colocar em
   `public/images/fleet/`; então ligar as imagens em `lib/data/fleet.ts` (campo `image`).
   Alternativa: tirar os 3 veículos da frota.
5. **Confirmar a migration escrita à mão:** rodar `npx prisma migrate dev` no terminal do
   usuário (aqui o Windows bloqueia o executável do Prisma — ver "Gotchas"). Deve dizer que o
   schema já está em sincronia; se acusar divergência, ajustar.
6. **GitHub (site):** em About preencher Website (link da Vercel), descrição e Topics
   (`nextjs`, `react`, `typescript`, `tailwindcss`, `prisma`, `turso`, `portfolio`, `car-rental`).
7. **README:** colocar o link da demo no topo (ainda não existe, não inventar URL).
8. Opcionais: confirmação de e-mail no cadastro, ícones sociais do rodapé (apontam para `#`),
   `.gitattributes` (avisos LF/CRLF do Git no Windows), licença (ex.: MIT), Lighthouse nas
   páginas novas.
9. 💤 **Pagamento real:** deliberadamente adiado pelo usuário. Quando for implementar:
   **Mercado Pago** (Pix, confiança do consumidor BR) ou Stripe, com checkout hospedado ou
   componentes embutidos deles — o formulário de cartão atual deve ser **substituído por
   inteiro** (não estendido) por questão de PCI-DSS.

### Como o usuário gosta de trabalhar

Em fases, com checklist ao final de cada uma; servidor de dev (`npm run dev`) só quando pedir;
commit/push só quando pedir; e explicar o passo a passo manual de comandos (git, etc.), porque
está aprendendo.

## Status das fases

- ✅ **Fase 0** — Fundação: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript,
  design system "Graphite & Gold" (ver `referencias/stitch_drivenow_premium_car_rental/luxe_velocity/DESIGN.md`).
- ✅ **Fase 1** — Home: hero com busca funcional, categorias, frota em destaque,
  diferenciais, banner promocional, depoimentos, FAQ.
- ✅ **Fase 2** — `/frota` (listagem com filtros por categoria/câmbio/preço, sincronizados
  na URL) + `/frota/[slug]` (detalhe do veículo, specs, veículos parecidos).
- ✅ **Fase 3** — `/reservar/[slug]`: fluxo de reserva em 3 etapas (datas/retirada →
  extras/proteção → dados/pagamento) + confirmação. **O pagamento continua sendo só
  interface**: os campos de cartão são validados no navegador e nunca são enviados ao
  servidor nem guardados. (A reserva em si é salva no banco — ver Fase 5.)
- ✅ **Fase 4** — Polimento: auditoria de acessibilidade (axe-core, 0 violações WCAG 2.1 AA)
  e Lighthouse (99-100 em performance/a11y/boas práticas/SEO em todas as páginas — a
  exceção proposital é o SEO de `/reservar/[slug]`, que é `noindex` de propósito por
  ser uma página de checkout). 404 e erro personalizados, skeletons de loading,
  breadcrumbs compartilhados com JSON-LD. (Não reauditado depois das páginas novas.)
- ✅ **Fase 5 (concluída em 2026-09-29, exceto fotos)** — banco de dados, login, reservas
  e ajuda.
  - ✅ Prisma 7 + SQLite (via adapter libsql), models `User`, `Session`, `Reservation`,
    `RateLimitEvent` e `PasswordResetToken`; migrations em `prisma/migrations/`.
  - ✅ Auth: `lib/actions/auth.ts` (cadastro/login/logout), sessão por cookie httpOnly em
    `lib/auth/session.ts`, `proxy.ts` protegendo `/minha-drivenow/*`. E-mail normalizado
    (trim + minúsculas). `redirectTo` validado em `lib/auth/redirect.ts` (evita open redirect).
  - ✅ Telas `/entrar`, `/cadastro`, `/esqueci-senha`, `/redefinir-senha` e `/minha-drivenow`
    (nome, e-mail, lista de reservas com cancelamento, sair). O navbar mostra perfil + sair
    quando logado, via `/api/session` (o layout não lê cookies, para manter as páginas estáticas).
  - ✅ Reservas (`lib/actions/reservations.ts`): exige login, recalcula o total no servidor
    (nunca confia no navegador), limite de 60 dias e 10 reservas ativas. Cancelamento só do dono
    e até 1 dia antes da retirada (mesma regra do FAQ).
  - ✅ Limite de tentativas (`lib/auth/rate-limit.ts`, guardado no banco porque serverless não
    tem memória compartilhada): login 5/e-mail e 20/IP em 15 min; cadastro 5/IP/h;
    recuperação 3/e-mail/h e 10/IP/h. Efeito conhecido: alguém pode travar o login de outra
    pessoa por 15 min errando a senha de propósito (troca comum nesse tipo de limite).
  - ✅ Recuperação de senha: token de 256 bits guardado só como hash sha256, 1h, uso único; o
    link novo invalida os anteriores; redefinir derruba as sessões. E-mail via Resend
    (`lib/email.ts`, sem SDK); sem `RESEND_API_KEY` o link é impresso no terminal em dev.
  - ✅ Central de Ajuda (`/ajuda`, dados em `lib/data/help.ts`, busca sem acento), `/privacidade`
    e `/termos` (o texto diz que exclusão de dados é pedida pelo GitHub do projeto).
  - ✅ Avisos de "demonstração" (checkout com cartão fictício `4111 1111 1111 1111`, cadastro,
    rodapé); URL do site em `lib/site.ts` (env `NEXT_PUBLIC_SITE_URL` → domínio da Vercel → localhost).
  - ⏳ Fotos de Kwid/Mobi/Onix.

## Deploy na Vercel

- ✅ `postinstall: prisma generate` (o client gerado não é versionado), `dotenv` declarado,
  `.env.example`.
- ✅ Banco remoto **Turso** (SQLite hospedado): SQLite em arquivo não funciona na Vercel
  (disco somente leitura/efêmero). `lib/db.ts` aceita `DATABASE_AUTH_TOKEN`.
- `npm run db:migrate` (`scripts/apply-migrations.mjs`) aplica o SQL de `prisma/migrations/` em
  qualquer banco libsql/Turso, de forma idempotente (o `prisma migrate` não fala com libsql).
  **Migration nova: aplicar no Turso ANTES de publicar o código que a usa.**
- Variáveis de ambiente na Vercel: `DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `RESEND_API_KEY`
  (pendente), `RESEND_FROM` (opcional), `NEXT_PUBLIC_SITE_URL` (só se tiver domínio próprio).
- Push no GitHub → a Vercel publica sozinha. Build quebrado não derruba o site no ar.

## Gotchas de ambiente (Windows)

- O `schema-engine` do Prisma pode ser bloqueado por política do Windows (`prisma migrate dev`
  falha com `spawn UNKNOWN`). Nesse caso, escreva o SQL da migration à mão em
  `prisma/migrations/<timestamp>_nome/migration.sql`, rode `npx prisma generate` e
  `npm run db:migrate`; depois confirme no terminal do usuário com `npx prisma migrate dev`.
- Parar o `npm run dev` pode deixar o processo `node` segurando a porta 3000; confira e encerre
  esse processo antes de reiniciar. Depois de mudar o schema, reinicie o servidor (o client
  antigo fica em memória).
- Não há Python, `gh`, `vercel` nem `turso` instalados: use os sites (Turso, Vercel, GitHub).
- Os arquivos do projeto usam CRLF; ao editar por script, normalize as quebras de linha.

## Stack técnica real (importante: diferente do que normalmente se espera)

- **Next.js 16** (não 14/15) + **React 19** + **Turbopack** (bundler padrão, sem config extra).
  Leia `node_modules/next/dist/docs/` antes de usar APIs (ver `AGENTS.md`).
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
  Variáveis em `.env` (modelo em `.env.example`). Arquivos `"use server"` só podem exportar
  funções `async`.
- Auth própria (bcryptjs + sessão no banco), sem NextAuth.
- No Next 16, `middleware.ts` virou **`proxy.ts`**.
- Dados (frota, depoimentos, FAQ, ajuda, extras/proteção) em `lib/data/*.ts`, sempre expostos
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
npm install                 # também roda `prisma generate` (postinstall)
cp .env.example .env        # e preencha DATABASE_URL (arquivo local ou Turso)
npm run db:migrate          # cria/atualiza as tabelas no banco do .env
npm run dev                 # http://localhost:3000
npm run build               # build de produção + checagem de tipos
npm run lint
```

## Onde encontrar as coisas

- Referências visuais originais (Stitch): `referencias/stitch_drivenow_premium_car_rental/`
- Design system de origem: `referencias/.../luxe_velocity/DESIGN.md`
- Fotos dos veículos: `public/images/fleet/`
- Roteiro de testes manuais: `CHECKLIST_TESTES.md`
