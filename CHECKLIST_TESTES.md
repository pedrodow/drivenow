# Checklist de testes — antes do deploy

Marque `[x]` o que passou. Onde algo falhar ou parecer estranho, escreva ao lado
(ex.: `[ ] ... → botão some no celular`) e me passe a lista: é assim que
decidimos o que mudar antes de subir.

## 0. Preparação

- [ ] `npm install` roda sem erro (também gera o client do Prisma)
- [ ] Arquivo `.env` existe com `DATABASE_URL="file:./prisma/dev.db"`
- [ ] `npx prisma migrate deploy` aplica a migration (cria as tabelas)
- [ ] `npm run dev` sobe em http://localhost:3000
- [ ] Para espiar o banco: `npx prisma studio` (abre uma tela com as tabelas User e Session)

## 1. Home (`/`)

- [ ] Página carrega sem erro no console do navegador (F12)
- [ ] Hero com busca: escolher cidade + datas e clicar em buscar leva para `/frota` com cidade e datas na URL
- [ ] Categorias, frota em destaque, diferenciais, banner, depoimentos e FAQ aparecem
- [ ] FAQ abre e fecha (também com teclado: Tab + Enter)
- [ ] Links do menu (Frota, Como funciona, Depoimentos, FAQ) rolam/navegam certo
- [ ] Botão "Reservar agora" do menu leva à busca

## 2. Frota (`/frota` e `/frota/[slug]`)

- [ ] Lista mostra todos os veículos
- [ ] Filtros de categoria, câmbio e preço funcionam e mudam a URL
- [ ] Recarregar a página (F5) mantém os filtros
- [ ] Filtro sem resultado mostra mensagem amigável (não tela em branco)
- [ ] Detalhe de um veículo com foto (ex.: HB20) mostra specs e "veículos parecidos"
- [ ] Detalhe de Kwid / Mobi / Onix mostra o card "Foto em breve" (sem foto real ainda)
- [ ] `/frota/qualquer-coisa` mostra a página 404 personalizada

## 3. Reserva (`/reservar/[slug]`)

- [ ] Etapa 1: datas inválidas (devolução antes da retirada) mostram erro
- [ ] Resumo do pedido atualiza o preço ao mudar as datas
- [ ] Etapa 2: extras e proteção somam no resumo
- [ ] Etapa 3: campos vazios/inválidos (CPF, telefone, cartão) mostram erro
- [ ] Botão Voltar mantém o que já foi preenchido
- [ ] Confirmação mostra código da reserva, veículo, datas e total
- [ ] ⚠️ Esperado por enquanto: pagamento é só interface e a reserva **não é salva**

## 4. Cadastro (`/cadastro`)

- [ ] Menu tem o link "Entrar" (desktop e menu do celular)
- [ ] Enviar vazio mostra os erros de cada campo
- [ ] Nome com menos de 3 letras, e-mail inválido, senha com menos de 8, senhas diferentes → cada um dá o erro certo
- [ ] Cadastro válido cria a conta e leva a `/minha-drivenow`
- [ ] No Prisma Studio: aparece o usuário em `User`, com `passwordHash` ilegível (nunca a senha em texto) e a sessão em `Session`
- [ ] Cadastrar o **mesmo e-mail** de novo mostra "Já existe uma conta com este e-mail"
- [ ] Cadastrar `MAIUSCULA@x.com` e depois `maiuscula@x.com` é tratado como o mesmo e-mail

## 5. Login e área logada

- [ ] `/entrar` com senha errada → "E-mail ou senha incorretos" (a mesma mensagem para e-mail inexistente)
- [ ] Login correto leva a `/minha-drivenow` com "Olá, <primeiro nome>!" e o e-mail
- [ ] Botão "Sair" volta para a home e encerra a sessão
- [ ] Depois de sair, abrir `/minha-drivenow` manualmente redireciona para `/entrar`
- [ ] Logado, abrir `/entrar` ou `/cadastro` manda direto para `/minha-drivenow`
- [ ] Deslogado, abrir `/minha-drivenow` → vai para `/entrar?redirectTo=/minha-drivenow` e, após o login, volta para `/minha-drivenow`
- [ ] Fechar e reabrir o navegador mantém o login (cookie de 30 dias)
- [ ] Sessão inválida: no Prisma Studio apague a linha de `Session`, recarregue `/minha-drivenow` → cai em `/entrar` (sem loop de redirecionamento)
- [ ] Segurança: abrir `/entrar?redirectTo=//google.com`, logar → deve ir para `/minha-drivenow`, **nunca** para o Google

## 6. Celular e acessibilidade

- [ ] Testar em largura de celular (F12 → ícone de dispositivo → 375px): home, frota, reserva, entrar, cadastro, área logada
- [ ] Nada estoura para o lado (sem rolagem horizontal)
- [ ] Menu hambúrguer abre, mostra "Entrar" e fecha ao tocar num link
- [ ] Navegar as telas de login/cadastro só com teclado (Tab, Enter) e ver o foco dourado
- [ ] Botão de envio desabilita e muda o texto enquanto envia

## 7. Build de produção (o que a Vercel vai rodar)

- [ ] `npm run lint` sem erros
- [ ] `npm run build` termina com sucesso e lista `/entrar`, `/cadastro`, `/minha-drivenow`
- [ ] (Opcional) `npm run start` e repetir as seções 4 e 5 — comportamento pode diferir do `dev`

## 8. Pendências que já sei (decidir se resolvemos antes do deploy)

- [ ] **Banco na Vercel:** o SQLite em arquivo não funciona lá; a Fase 3 troca para Turso. Sem isso, login não funciona em produção.
- [ ] **Confirmação da reserva diz "Enviamos os detalhes para o seu e-mail"**, mas nenhum e-mail é enviado. Trocar o texto ou implementar envio?
- [ ] **Reserva não é salva** e não aparece em "Suas reservas". Salvar no banco antes do deploy ou deixar para depois?
- [ ] **Pagamento real** segue adiado (Mercado Pago/Stripe). No site público, deixar aviso de "demonstração"?
- [ ] **Fotos** de Kwid, Mobi e Onix.
- [ ] **Domínio:** o código usa `https://www.drivenow.com.br` (layout, sitemap, robots). Vamos usar esse domínio ou o `.vercel.app` por enquanto?
- [ ] **Recuperar senha** e **confirmação de e-mail** não existem.
- [ ] **Limite de tentativas de login** não existe (qualquer um pode tentar senhas à vontade).
- [ ] **Central de Ajuda** (Fase 5 restante) e mais conteúdo na área logada.

## 9. Anotações livres — o que você gostaria de mudar?

- Visual:
- Textos:
- Funcionalidades:
