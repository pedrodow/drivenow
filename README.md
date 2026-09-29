<div align="center">

# DRIVENOW

**Site de aluguel de carros com reserva online, login e visual premium.**

Projeto de estudo e portfólio — uma locadora fictícia construída do zero, do design ao banco de dados.

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2d3748?logo=prisma&logoColor=white)
![Turso](https://img.shields.io/badge/Turso-libSQL-4ff8d2?logo=turso&logoColor=black)

</div>

---

## Sobre o projeto

A **DriveNow** não existe: é uma locadora inventada para eu praticar o ciclo completo de
um produto web — partir de mockups, montar um design system, construir as telas, ligar um
banco de dados, autenticar usuários e preparar tudo para produção.

O foco é **aprender fazendo** e mostrar código legível, decisões explicadas e um resultado
que parece um produto real. Por isso o repositório também guarda as
[notas do projeto](PROJECT_NOTES.md) (o que foi feito, o que foi adiado e por quê).

> ⚠️ **Não é uma locadora de verdade.** As reservas são de demonstração, o pagamento é só
> interface (nenhum dado de cartão é enviado ou guardado) e as fotos dos carros foram geradas
> por IA. Marcas citadas pertencem a seus donos e não têm relação com este projeto.

## O que já funciona

| Área | O que tem |
| --- | --- |
| **Home** | Hero com busca funcional, categorias, frota em destaque, diferenciais, depoimentos e FAQ |
| **Frota** (`/frota`) | Listagem com filtros por categoria, câmbio e preço — os filtros ficam na URL e podem ser compartilhados |
| **Veículo** (`/frota/[slug]`) | Detalhes, especificações e veículos parecidos (páginas geradas estaticamente) |
| **Reserva** (`/reservar/[slug]`) | Fluxo em 3 etapas (datas → extras/proteção → dados) com validação e resumo de preço em tempo real |
| **Conta** | Cadastro, login e logout com sessão por cookie; área "Minha DriveNow" protegida |
| **Qualidade** | 404 e erro personalizados, skeletons de carregamento, SEO (metadados, JSON-LD, sitemap), acessibilidade WCAG 2.1 AA |

Na auditoria da Fase 4 (axe-core + Lighthouse), as páginas públicas ficaram com nota 99–100
em desempenho, acessibilidade, boas práticas e SEO.

## Stack e por que cada escolha

- **Next.js 16 (App Router) + React 19 + TypeScript** — Server Components, Server Actions e
  geração estática onde faz sentido.
- **Tailwind CSS v4** — tokens de design em CSS (`@theme` em `app/globals.css`), sem arquivo de config.
- **shadcn/ui sobre Base UI** — componentes acessíveis e customizáveis, em `components/ui/`.
- **react-hook-form + Zod** — formulários com validação tipada, também reaproveitada no servidor.
- **Prisma 7 + libSQL (Turso)** — SQLite em arquivo no desenvolvimento e SQLite hospedado em produção,
  com o mesmo schema.
- **Autenticação própria** (bcryptjs + sessão salva no banco + cookie `httpOnly`) — feita à mão de
  propósito, para entender o que bibliotecas como NextAuth escondem.

### Decisões que valem destacar

- **Navbar sabe quem está logado sem tornar o site dinâmico:** em vez de ler cookies no layout
  (o que desligaria a geração estática de todas as páginas), o menu consulta uma rota leve
  (`/api/session`). Home e frota continuam estáticas.
- **`redirectTo` validado:** o parâmetro de retorno pós-login só aceita caminhos internos,
  evitando *open redirect*.
- **Migrations em banco remoto:** o `prisma migrate` não conversa com libSQL/Turso, então o script
  `npm run db:migrate` aplica o mesmo SQL, de forma idempotente.
- **Dados atrás de funções** (`getFleet()`, `getVehicleBySlug()`…): trocar o arquivo por API/CMS
  no futuro não exige mexer nos componentes.

## Como rodar localmente

Pré-requisito: **Node.js 20.9+**.

```bash
git clone https://github.com/pedrodow/drivenow.git
cd drivenow

npm install                  # também gera o client do Prisma (postinstall)
cp .env.example .env         # usa um banco SQLite local por padrão
npx prisma migrate deploy    # cria o banco local com as tabelas
npm run dev                  # http://localhost:3000
```

| Comando | Para que serve |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `npm start` | Build e execução de produção |
| `npm run lint` | Checagem de código com ESLint |
| `npm run db:migrate` | Aplica as migrations no banco definido em `DATABASE_URL` (local ou Turso) |
| `npx prisma studio` | Interface para ver/editar os dados do banco |

Para usar um banco Turso, veja os exemplos comentados em [`.env.example`](.env.example).

## Estrutura

```
app/            Rotas (home, frota, reservar, entrar, cadastro, minha-drivenow, api)
components/     UI: home, frota, reserva, auth, layout e componentes base (shadcn)
lib/            Dados da frota, validações (Zod), ações de servidor, sessão e cliente do banco
prisma/         Schema e migrations
scripts/        Utilitários (aplicar migrations no Turso)
referencias/    Mockups originais (Stitch) e design system usados como base
```

## Roadmap

- [x] Fundação, design system e home
- [x] Frota, filtros e página do veículo
- [x] Fluxo de reserva em 3 etapas
- [x] Acessibilidade, SEO e desempenho
- [x] Banco de dados, cadastro e login
- [ ] Deploy na Vercel
- [ ] Salvar reservas no banco e listá-las em "Minha DriveNow"
- [ ] Pagamento real (Mercado Pago com Pix, ou Stripe)
- [ ] Recuperação de senha e confirmação de e-mail
- [ ] Central de Ajuda

## Sobre o autor

Feito por **Pedro** ([@pedrodow](https://github.com/pedrodow)) como projeto de estudo.
Sugestões e feedback são bem-vindos — abra uma *issue*.
