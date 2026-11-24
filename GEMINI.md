# Regras do Repositório — Mancia Studios (`pagina-politica-app`)

Estas diretrizes regem a estrutura, segurança e curadoria de conteúdo do site institucional `manciastudios.com`.

## 1. Taxonomia Estrita das 3 Seções da Vitrine (`index.html`)

O portfólio é dividido em **três seções independentes e sem repetição de itens**:

1. **Aplicativos Publicados (`#apps-published`):**
   - Contém **somente** aplicativos móveis que já foram publicados oficialmente (ex.: Google Play Store).
   - Todo card nesta seção deve possuir **link oficial da loja** + **botão de Política de Privacidade** (`policies/<app>/`).
   - Quando houver `0` cards `<article>` dentro de `#published-apps-grid`, o estado vazio `#published-apps-empty` é exibido automaticamente; ao adicionar `>= 1` card, `main.js` oculta o estado vazio automaticamente.

2. **Aplicativos em Desenvolvimento (`#apps-dev`):**
   - Contém aplicativos móveis públicos que **ainda não concluíram a publicação oficial** (em desenvolvimento, em homologação/testes na loja), aplicativos legados marcados como **`OBSOLETE · Aguardando melhoria e atualização`** ou protótipos mobile encerrados marcados como **`DESCONTINUADO · Sem versão estável`** (`.is-discontinued`, excluídos automaticamente do contador ativo `#stat-dev-apps-count`).
   - Assim que um aplicativo em desenvolvimento desta seção for oficialmente publicado na loja, **mova-o para `#apps-published`** adicionando o link oficial.

3. **Projetos Desenvolvidos (`#projects`):**
   - Contém **somente** projetos públicos que **não são especificamente aplicativos móveis** (sistemas web, APIs/backends, plataformas EDR/segurança, jogos web/desktop, bots públicos, etc.).
   - Nunca repita aplicativos móveis nesta seção.

## 2. Proibições de Segurança e Privacidade

- **PROIBIDO** listar, mencionar ou linkar qualquer **aplicativo de Admin** (`*Admin*`), **painel/página de Admin** ou **projeto privado**.
- **PROIBIDO** comitar endereços IP brutos da VPS, nomes de usuários SSH internos, senhas, tokens ou arquivos `.zip`/`.tar.gz` fora de `backups/` (que deve permanecer ignorada no `.gitignore`).
- Antes de incluir qualquer novo projeto, confirme sempre com o usuário:
  1. Se o projeto é **privado ou público**;
  2. Se deve **entrar no site**;
  3. Se for aplicativo, se **já está publicado** (`#apps-published`) ou **ainda será publicado** (`#apps-dev`).

## 3. Checklist Técnico a Cada Atualização

- Sincronizar todos os textos em **Português (`pt`)** e **Inglês (`en`)** em `assets/js/translations.js`.
- Ao criar ou alterar status de políticas em `policies/<app>/index.html`, atualizar `sitemap.xml` e preservar `HTTP 200` para URLs cadastradas no Google Play Console.
- Incrementar o parâmetro de cache-busting (`?v=X.Y.Z`) em todos os CSS/JS e registrar o backup em `backups/` + `HISTORICO_VERSOES_E_BACKUPS.md`.
