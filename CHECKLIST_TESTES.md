# Checklist de testes

Marque `[x]` o que passou. Onde algo falhar ou parecer estranho, escreva ao lado
(ex.: `[ ] ... → botão some no celular`) e me passe a lista: é assim que
decidimos o que mudar.

> Dica: para não sujar o banco de produção com testes, use uma conta só para isso
> (ex.: `teste@exemplo.com`) e apague-a depois no painel do Turso.

## 0. Preparação

- [ ] `npm install` roda sem erro (também gera o client do Prisma)
- [ ] `.env` tem `DATABASE_URL` e `DATABASE_AUTH_TOKEN` (Turso) — modelo em `.env.example`
- [ ] `npm run db:migrate` diz "Nada a aplicar" (as tabelas já estão criadas)
- [ ] `npm run dev` sobe em http://localhost:3000
- [ ] No painel do Turso aparecem as tabelas `User`, `Session`, `Reservation`, `RateLimitEvent` e `PasswordResetToken`

## 1. Home (`/`)

- [ ] Página carrega sem erro no console do navegador (F12)
- [ ] Hero com busca: escolher cidade + datas e clicar em buscar leva para `/frota` com cidade e datas na URL
- [ ] Categorias, frota em destaque, diferenciais, banner, depoimentos e FAQ aparecem
- [ ] FAQ abre e fecha (também com teclado: Tab + Enter)
- [ ] Links do menu (Frota, Como funciona, Depoimentos, Ajuda) navegam certo
- [ ] Botão "Reservar agora" do menu leva à busca
- [ ] Rodapé: aviso de projeto de portfólio; links Central de Ajuda, Privacidade, Termos e Contato funcionam

## 2. Frota (`/frota` e `/frota/[slug]`)

- [ ] Lista mostra todos os veículos
- [ ] Filtros de categoria, câmbio e preço funcionam e mudam a URL
- [ ] Recarregar a página (F5) mantém os filtros
- [ ] Filtro sem resultado mostra mensagem amigável (não tela em branco)
- [ ] Detalhe de um veículo com foto (ex.: HB20) mostra specs e "veículos parecidos"
- [ ] Detalhe de Kwid / Mobi / Onix mostra o card "Foto em breve" (até as fotos serem adicionadas)
- [ ] `/frota/qualquer-coisa` mostra a página 404 personalizada

## 3. Cadastro (`/cadastro`)

- [ ] Menu tem o link "Entrar" (desktop e menu do celular)
- [ ] Enviar vazio mostra os erros de cada campo
- [ ] Nome com menos de 3 letras, e-mail inválido, senha com menos de 8 (ou mais de 72), senhas diferentes → cada um dá o erro certo
- [ ] Aviso "use uma senha que você não usa em outros sites" aparece
- [ ] Cadastro válido cria a conta e leva a `/minha-drivenow`
- [ ] No painel do Turso: o usuário aparece em `User` com `passwordHash` ilegível (nunca a senha em texto)
- [ ] Cadastrar o **mesmo e-mail** de novo mostra "Já existe uma conta com este e-mail"
- [ ] `MAIUSCULA@x.com` e depois `maiuscula@x.com` é tratado como o mesmo e-mail

## 4. Login e área logada

- [ ] `/entrar` com senha errada → "E-mail ou senha incorretos" (a mesma mensagem para e-mail inexistente)
- [ ] Login correto leva a `/minha-drivenow` com "Olá, <primeiro nome>!" e o e-mail
- [ ] Logado, o menu troca "Entrar" por **seu primeiro nome** (leva ao perfil) + ícone de sair — desktop e celular
- [ ] Ao logar/cadastrar o menu muda sozinho; ao clicar em sair, volta a mostrar "Entrar"
- [ ] Botão "Sair" volta para a home e encerra a sessão
- [ ] Depois de sair, abrir `/minha-drivenow` redireciona para `/entrar`
- [ ] Logado, abrir `/entrar` ou `/cadastro` manda direto para `/minha-drivenow`
- [ ] Fechar e reabrir o navegador mantém o login (cookie de 30 dias)
- [ ] Segurança: `/entrar?redirectTo=//google.com`, logar → vai para `/minha-drivenow`, **nunca** para o Google

## 5. Reserva (`/reservar/[slug]`)

- [ ] **Deslogado**, clicar em reservar leva ao login e, depois de entrar, volta para a reserva (com as datas da busca preservadas)
- [ ] Etapa 1: datas inválidas (devolução antes da retirada) mostram erro
- [ ] Resumo do pedido atualiza o preço ao mudar as datas
- [ ] Etapa 2: extras e proteção somam no resumo
- [ ] Etapa 3: nome e e-mail vêm preenchidos com a sua conta; campos vazios/inválidos (CPF, telefone, cartão) mostram erro
- [ ] Aviso de demonstração no pagamento; o cartão `4111 1111 1111 1111` (validade futura, qualquer CVV) é aceito
- [ ] Botão Voltar mantém o que já foi preenchido
- [ ] Confirmação mostra código (`DN-XXXXXX`), veículo, datas e total, e diz que nenhum e-mail foi enviado
- [ ] O total da confirmação bate com o do resumo do pedido
- [ ] "Ver minhas reservas" leva a `/minha-drivenow` e a reserva **aparece** lá (código, período, locais, extras, total, "Confirmada")
- [ ] No Turso, a tabela `Reservation` tem a reserva, e **nenhum dado de cartão** está em lugar nenhum
- [ ] Recarregar a página da confirmação (F5) não cria reserva duplicada (volta à etapa 1)
- [ ] Data de retirada no passado é recusada com mensagem
- [ ] Período maior que 60 dias é recusado com mensagem
- [ ] "Cancelar reserva" (retirada a 2+ dias): a reserva vira "Cancelada" e o botão some
- [ ] Reserva com retirada hoje ou amanhã **não** mostra o botão de cancelar (regra: até 1 dia antes)
- [ ] Com 10 reservas ativas, a 11ª é recusada com mensagem

## 6. Limite de tentativas

- [ ] 5 senhas erradas seguidas para o mesmo e-mail → a 6ª mostra "Muitas tentativas…" (mesmo com a senha certa)
- [ ] Depois de ~15 minutos o login volta a funcionar
- [ ] Um login correto antes da 5ª falha zera o contador
- [ ] ⚠️ Efeito conhecido: alguém pode travar o login de outra pessoa por 15 min errando de propósito (troca comum em sistemas com esse limite)

## 7. Recuperação de senha

- [ ] `/entrar` tem o link "Esqueci minha senha"
- [ ] Pedir o link com e-mail inexistente e com existente mostra a **mesma** mensagem
- [ ] O e-mail chega (com a chave do Resend configurada; sem ela, o link aparece no terminal do `npm run dev`)
- [ ] O link abre "Nova senha"; um link adulterado mostra "Link inválido"
- [ ] Senhas diferentes ou curtas dão erro; senha válida leva a `/entrar` com "Senha redefinida com sucesso"
- [ ] A senha nova funciona e a antiga não
- [ ] Usar o mesmo link uma segunda vez mostra "Link inválido"
- [ ] Um segundo pedido invalida o link do primeiro
- [ ] Depois de redefinir, outros navegadores logados na conta são deslogados
- [ ] Mais de 3 pedidos por hora para o mesmo e-mail mostram "Muitos pedidos…"

## 8. Central de Ajuda e páginas legais

- [ ] `/ajuda` mostra 4 categorias com perguntas em acordeão (abrem/fecham, também pelo teclado)
- [ ] A busca filtra ao digitar (ignora acentos: "protecao" acha "Proteção") e mostra mensagem quando não há resultado
- [ ] Seções "Sobre" e "Contato" aparecem, com o aviso de que os canais são ilustrativos
- [ ] `/privacidade` e `/termos` abrem e o texto bate com o que o site realmente faz
- [ ] `/sitemap.xml` inclui essas páginas

## 9. Celular e acessibilidade

- [ ] Testar em largura de celular (F12 → ícone de dispositivo → 375px): home, frota, reserva, entrar, cadastro, esqueci-senha, área logada, ajuda
- [ ] Nada estoura para o lado (sem rolagem horizontal)
- [ ] Menu hambúrguer abre, mostra Ajuda e Entrar/perfil, e fecha ao tocar num link
- [ ] Navegar login, cadastro e reserva só com teclado (Tab, Enter) e ver o foco dourado
- [ ] Botão de envio desabilita e muda o texto enquanto envia
- [ ] (Opcional) rodar o Lighthouse do Chrome em `/`, `/ajuda` e `/entrar`

## 10. Build de produção

- [ ] `npm run lint` sem erros
- [ ] `npm run build` termina com sucesso
- [ ] (Opcional) `npm run start` e repetir as seções 3 a 5 — o comportamento pode diferir do `dev`

## 11. Pendências conhecidas

- [ ] **Resend:** criar conta, gerar a API key e colocar `RESEND_API_KEY` na Vercel (e no `.env`). Sem domínio próprio, o e-mail só chega ao dono da conta Resend.
- [ ] **Fotos** de Kwid, Mobi e Onix (você vai adicionar).
- [ ] Ícones sociais do rodapé (WhatsApp, e-mail, galeria) ainda apontam para `#`.
- [ ] Sem confirmação de e-mail no cadastro e sem exclusão de conta pelo site (o pedido é feito pelo GitHub, como diz a Política de Privacidade).
- [ ] Pagamento real: adiado de propósito.

## 12. Anotações livres — o que você gostaria de mudar?

- Visual:
- Textos:
- Funcionalidades:
