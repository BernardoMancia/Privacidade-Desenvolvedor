# Histórico de Versões e Backups — Mancia Studios (`pagina-politica-app` / `manciastudios.com`)

Documento oficial de rastreabilidade de versões, backups e implantações.

---

## Versão `v3.2.0` — Oficialização do `Hive` como Descontinuado (`Sem versão estável`) + Página `/policies/hive-chat/` + Arquivamento do Repositório GitHub

- **Versão do Projeto:** `v3.2.0`
- **Data e Hora da Atualização:** `2026-11-24 10:24:00 (BRT)`
- **Versão / Arquivo do Backup:**
  - **Local (Pré-atualização `v3.1.6`):** `backups/backup_v3.1.6_pre_v3.2.0_2026-11-24_101437.zip`
  - **Local (Versão `v3.2.0` final):** `backups/backup_v3.2.0_2026-11-24_102400.zip`
  - **Cofre Repositório `Hive` (`F:/Projetos/backups/hive_discontinued_2026-11-24_101437/`):** `Hive_git_history_2026-11-24_101437.bundle` + `Hive_working_tree_2026-11-24_101437.zip` + `Hive_discontinued_sanitized_2026-11-24.zip`
  - **VPS (`manciastudios`):** `backups/backup_pre_v3.2.0_2026-11-24.tar.gz` e `backups/backup_v3.2.0_2026-11-24.tar.gz`
- **Artefato / Publicação:** Aplicação Web Estática Institucional & Políticas (`https://manciastudios.com` — build de assets `?v=3.2.0`) + Repositório Arquivado `BernardoMancia/Hive`
- **O que foi feito:**
  1. **Card `Hive` Descontinuado (`#apps-dev` em `index.html` + `main.js`):** adicionado o card do protótipo **Hive** com estilo dedicado `.is-discontinued` e selo **`DESCONTINUADO · Sem versão estável`**, informando o encerramento definitivo sem publicação em loja e apontando o **NyxMesh** como sucessor (preservando `#stat-dev-apps-count` em `5` apps ativos/revisão via `:not(.is-discontinued)`).
  2. **Página Dedicada `/policies/hive-chat/index.html` (`HTTP 200`):** substituído o redirecionamento `301` antigo em `deploy/nginx.conf` por página bilíngue (PT/EN) própria contendo o banner `.discontinued-banner` de encerramento definitivo sem versão estável, inexistência de servidores/coleta e link direto para `/policies/nyxmesh/`.
  3. **Sanitização & Arquivamento Oficial de `BernardoMancia/Hive`:** auditado o repositório completo no GitHub, removidos caminhos/domínios/histórico legado, adicionado aviso `[!CAUTION]` bilíngue no topo do `README.md` e arquivado o repositório em modo somente-leitura (`archived: true`).
  4. **SEO, Cache-Busting & Monitoramento:** adicionada `https://manciastudios.com/policies/hive-chat/` ao `sitemap.xml`, sincronizadas todas as chaves PT/EN em `assets/js/translations.js` e atualizados `?v=3.2.0`, `GET /health` e `deploy/sync_logs.py`.

---

## Versão `v3.1.6` — Atualização `OfferFlow` (`v2.1`) em `#projects` + Página Dedicada `/offerflow/` + Hardening Responsivo (PC, Tablet & Celular)

- **Versão do Projeto:** `v3.1.6`
- **Data e Hora da Atualização:** `2026-11-23 23:26:00 (BRT)`
- **Versão / Arquivo do Backup:**
  - **Local (Pré-atualização `v3.1.5`):** `backups/backup_v3.1.5_pre_v3.1.6_2026-11-23_232100.zip`
  - **Local (Versão `v3.1.6` final):** `backups/backup_v3.1.6_2026-11-23_232600.zip`
- **Artefato / Publicação:** Aplicação Web Estática Institucional (`manciastudios.com` — assets `?v=3.1.6`, aguardando confirmação para deploy na VPS)
- **O que foi feito:**
  1. **Projetos Desenvolvidos (`#projects` — OfferFlow):** atualizado o card público do **OfferFlow** (sem duplicação) com emblema 3D otimizado (`assets/img/offerflow/hub.jpg`), nova descrição bilíngue (PT/EN) refletindo o ecossistema 100% Mercado Livre Afiliados (Hub central + 8 canais temáticos), novas tags (`Python`, `Mercado Livre`, `Telegram Hub`, `8 Canais`) e botões públicos **`Acessar comunidade`** (`offerflow/`), **`Telegram`** (`https://t.me/ComunidadeOfferFlow`) e **`GitHub`** (`https://github.com/BernardoMancia/OfferFlow`).
  2. **Nova Página Pública Responsiva (`/offerflow/index.html`):** criada a landing page bilíngue (PT/EN) dedicada à Comunidade OfferFlow com os 9 avatares 3D otimizados (`assets/img/offerflow/*.jpg`, ~9–19 KB cada), seção multiplataforma (**Celular Android/iOS**, **Tablet iPadOS/Android** e **PC Windows/macOS/Linux**), grade responsiva dos 8 canais (1 coluna no celular, 2 no tablet, 4 no PC — mantendo canais privados protegidos via acesso pelo Hub público, sem expor links privados `t.me/+...` nem comandos administrativos) e guia dos comandos públicos do `@OfferFlowMLBot` (`/alerta`, `/meus_alertas`, `/historico`).
  3. **Responsividade Global (PC, Tablet & Celular):** ajustados `.apps-grid` e `.projects-grid` em `index.html` para `minmax(min(100%, 320px), 1fr)`, adicionado breakpoint dedicado de Tablet (`601px–1024px`, 2 colunas), reforçadas áreas de toque (`min-height: 42px–48px`), `viewport-fit=cover` + `env(safe-area-inset-*)` e `@media (hover: none)` para telas touch.
  4. **SEO, Cache-Busting & Monitoramento:** adicionada rota `https://manciastudios.com/offerflow/` ao `sitemap.xml`, atualizado `?v=3.1.6` em todos os arquivos HTML, `/health` em `deploy/nginx.conf` e `APP_VERSION` em `deploy/sync_logs.py`.

---

## Versão `v3.1.5` — Atualização `FurryCore Network` (`v4.0.0`, `FurPass` + Link Público `https://furrycore.com.br`)

- **Versão do Projeto:** `v3.1.5`
- **Data e Hora da Atualização:** `2026-11-23 20:16:18 (BRT)`
- **Versão / Arquivo do Backup:**
  - **Local (Pré-atualização `v3.1.4`):** `backups/backup_v3.1.4_pre_v3.1.5_2026-11-23_201527.zip`
  - **Local (Versão `v3.1.5` final):** `backups/backup_v3.1.5_2026-11-23_201618.zip`
  - **VPS (Pré-atualização):** `manciastudios/backups/backup_v3.1.4_pre_v3.1.5_2026-11-23_201618.tar.gz`
  - **VPS (Versão `v3.1.5` publicada):** `manciastudios/backups/backup_v3.1.5_2026-11-23_201618.tar.gz`
- **Artefato / Publicação:** Aplicação Web Estática Institucional (`https://manciastudios.com` — assets `?v=3.1.5`, publicado em `manciastudios/public` com `/health` em `v3.1.5`)
- **O que foi feito:**
  1. **Projetos Desenvolvidos (`#projects` — FurryCore Network):** promovido o card público do **FurryCore Network** para **`Em produção`** (`status-prod`), atualizada a descrição bilíngue (PT/EN) substituindo `Portal CGRF 3D` por **`Passaporte FurPass 3D com Multi-Fursona DNA e Sparks`** (`v4.0.0`), adicionado botão público **`Acessar site`** (`https://furrycore.com.br`, nova chave `proj.visit_site` em `assets/js/translations.js`) ao lado de `Código proprietário`, mantendo isolamento estrito de rotas administrativas.
  2. **Cache-Busting & Monitoramento:** atualizado `?v=3.1.5` em todos os arquivos HTML (`index.html`, `404.html` e `policies/*/index.html`), `/health` em `deploy/nginx.conf` e `APP_VERSION` em `deploy/sync_logs.py`.

---

## Versão `v3.1.4` — Adição do Projeto Público `Delphye Luke 3D` (`v2.0.0`) em `#projects`

- **Versão do Projeto:** `v3.1.4`
- **Data e Hora da Atualização:** `2026-11-23 17:32:00 (BRT)`
- **Versão / Arquivo do Backup:**
  - **Local (Pré-atualização `v3.1.3`):** `backups/backup_v3.1.3_pre_v3.1.4_2026-11-23_172956.zip`
  - **Local (Versão `v3.1.4` final):** `backups/backup_v3.1.4_2026-11-23.zip`
  - **VPS (Pré-atualização):** `manciastudios/backups/backup_v3.1.3_pre_v3.1.4.tar.gz`
- **Artefato / Publicação:** Aplicação Web Estática Institucional (`https://manciastudios.com` — assets `?v=3.1.4`, publicado em `manciastudios/public`)
- **O que foi feito:**
  1. **Projetos Desenvolvidos (`#projects` — Delphye Luke 3D):** adicionado o card público **Delphye Luke 3D** (*Em produção*, `data-category="ready"`) com link exclusivo para a vitrine pública `https://delphyeluke3d.com.br` (mantendo isolamento estrito de rotas administrativas), tags `React / Vite`, `Node.js / Express`, `PostgreSQL / Prisma` e `Impressão 3D`.
  2. **Traduções Bilíngues & Contador:** adicionadas as chaves `proj.delphye3d.desc` e `proj.visit` (PT/EN) em `assets/js/translations.js`, atualizado `#stat-projects-count` (`16 → 17`) e incrementado cache-busting em `index.html` para `?v=3.1.4`.

---

## Versão `v3.1.3` — Atualização `FurryCore Network` (`v3.3.0`, Código Proprietário) + Adição do App `Boop` (`v1.0.0`) em `#apps-dev` e Política `/policies/boop/`

- **Versão do Projeto:** `v3.1.3`
- **Data e Hora da Atualização:** `2026-11-23 16:42:06 (BRT)`
- **Versão / Arquivo do Backup:**
  - **Local (Pré-atualização `v3.1.2`):** `backups/backup_v3.1.2_pre_v3.1.3_2026-11-23_163255.zip`
  - **Local (Versão `v3.1.3` final):** `backups/backup_v3.1.3_2026-11-23_163700.zip`
  - **VPS (Pré-atualização):** `backups/backup_v3.1.2_pre_v3.1.3_2026-11-23_164206.tar.gz`
  - **VPS (Versão `v3.1.3` publicada):** `backups/backup_v3.1.3_2026-11-23_164206.tar.gz`
- **Artefato / Publicação:** Aplicação Web Estática Institucional & Políticas (`https://manciastudios.com` — build de assets `?v=3.1.3`, publicado na VPS com Nginx e Central de Monitoramento em `v3.1.3`)
- **O que foi feito:**
  1. **Projetos Desenvolvidos (`#projects` — FurryCore Network):** atualizado o card do **FurryCore Network** de *Sob revisão* para **`Versão estável`** (`data-category="ready"`), removido o link público do GitHub (repositório definido como privado) em favor do selo **`Código proprietário`**, e atualizada a descrição bilíngue (PT/EN) para refletir o ecossistema público `v3.3.0` (Portal `FurryCore`, rede social `Boop`, registro `CGRF`, `FurryShop`, compliance **ECA Digital Lei nº 15.211/2025** + **LGPD** e verificação etária on-device zero-retention), mantendo isolamento estrito de painéis administrativos.
  2. **Aplicativos em Desenvolvimento (`#apps-dev` — Boop `v1.0.0`):** adicionado o card oficial do aplicativo móvel Android **Boop (`v1.0.0`)** (*Em desenvolvimento / Aguardando publicação oficial*) com ícone `.app-icon-boop`, traduções completas PT/EN, incremento do contador `#stat-dev-apps-count` (`4 → 5`) e link no rodapé.
  3. **Nova Política de Privacidade (`/policies/boop/`):** criada a página bilíngue `policies/boop/index.html` para `com.furrycore.boop v1.0.0+` (detalhando processamento 100% on-device via CameraX, ML Kit e ONNX Runtime com zero retenção biométrica e conformidade ECA Digital / LGPD) e adicionada a rota ao `sitemap.xml`.
  4. **Cache-Busting, Healthcheck & Central de Monitoramento:** atualizado `?v=3.1.3` em todos os arquivos HTML (`index.html`, `404.html` e todas as páginas em `policies/*/`), além do endpoint `GET /health` (`deploy/nginx.conf`) e do manifesto `central-app.json` (`deploy/sync_logs.py`) para `v3.1.3`.

---

## Versão `v3.1.2` — Remoção do Projeto `Radar da Semana — YouTube AI` da Vitrine Pública

- **Versão do Projeto:** `v3.1.2`
- **Data e Hora da Atualização:** `2026-11-23 10:30:00 (BRT)`
- **Versão / Arquivo do Backup:**
  - **Local (Versão `v3.1.2`):** `backups/backup_v3.1.2_2026-11-23_103000.zip`
  - **VPS (Pré-atualização):** `backups/backup_v3.1.1_pre_v3.1.2_2026-11-23_113631.tar.gz`
  - **VPS (Versão `v3.1.2` publicada):** `backups/backup_v3.1.2_2026-11-23_113631.tar.gz`
- **Artefato / Publicação:** Aplicação Web Estática Institucional (`https://manciastudios.com` — build de assets `?v=3.1.2`)
- **O que foi feito:**
  1. Removido o card **Radar da Semana — YouTube AI** da seção `#projects` em `index.html` (mantendo `AegisCVE-Radar` intacto), totalizando 16 projetos públicos;
  2. Removida a chave de tradução `proj.radar.desc` (PT/EN) em `assets/js/translations.js`;
  3. Atualizado o contador inicial `#stat-projects-count` para `16` e incrementado cache-busting dos assets para `?v=3.1.2`.

---

## Versão `v3.1.1` — Blindagem de `.gitignore` e Sanitização Integral do Histórico Git (`Privacidade-Desenvolvedor`)

- **Versão do Projeto:** `v3.1.1`
- **Data e Hora da Atualização:** `2026-11-22 21:50:00 (BRT)`
- **Versão / Arquivo do Backup:**
  - **Local (Pré-sanitização Git + Bundle completo):** `backups/backup_pre_sanitize_2026-11-22_214200.bundle` e `backups/backup_pre_sanitize_2026-11-22_214200.zip`
  - **Local (Versão `v3.1.1` sanitizada):** `backups/backup_v3.1.1_sanitized_2026-11-22_215000.zip`
- **Artefato / Publicação:** Repositório Git público `BernardoMancia/Privacidade-Desenvolvedor` + Site `https://manciastudios.com`
- **O que foi feito:**
  1. **Blindagem de `.gitignore`:** bloqueio explícito de `*.zip`, `*.tar.gz`, `*.bundle`, `*.db`, `*.sqlite*` e `.env.*`.
  2. **Expurgo de Histórico Legado no GitHub:** substituída a árvore de commits antigos que continham referências legadas de infraestrutura e artefato `.zip` por commit raiz limpo auditado com zero vazamentos.

---

## Versão `v3.1.0` — Curadoria Completa das Vitrines (`Lupy Studio` em `#apps-dev` + 17 Projetos em `#projects` + Barra de Filtros)

- **Versão do Projeto:** `v3.1.0`
- **Data e Hora da Atualização:** `2026-11-22 21:34:00 (BRT)`
- **Versão / Arquivo do Backup:**
  - **Local (Pré-atualização `v3.0.0`):** `backups/backup_v3.0.0_2026-11-22_210300.zip`
  - **Local (Versão `v3.1.0` final):** `backups/backup_v3.1.0_2026-11-22_213400.zip`
  - **VPS (Pré-atualização):** `backups/backup_v3.0.0_pre_v3.1_2026-11-22_213400.tar.gz`
  - **VPS (Versão `v3.1.0` publicada):** `backups/backup_v3.1.0_2026-11-22_213400.tar.gz`
- **Artefato / Publicação:** Aplicação Web Estática Institucional & Políticas Google Play (`https://manciastudios.com` — build de assets `?v=3.1.0`)
- **O que foi feito:**
  1. **Aplicativos em Desenvolvimento (`#apps-dev`):** adicionado o card oficial do **Lupy Studio (`v2.1.0`)** (*Aguardando publicação oficial*) com link para `/policies/lupystudio/`, somando 4 apps na vitrine (`NyxMesh`, `Lupy Studio`, `GuardaLinha [OBSOLETE]`, `Sentio [OBSOLETE]`).
  2. **Projetos Desenvolvidos (`#projects`):** aplicadas todas as decisões de curadoria individual do portfólio, exibindo os 17 projetos públicos aprovados (`Aegis Endpoint Defense`, `AegisCVE-Radar`, `Córtex IA`, `Córtex Cripto`, `OfferFlow`, `TechOS`, `VeilGuard`, `Kitsune Game Hub`, `Auto-Yiff`, `Relógio Tempo de Planck`, `Radar da Semana — YouTube AI`, `Drive Watchdog & VsCodeMusic`, `FurryCore Network [Sob revisão]`, `Telemetria de Sinais Vitais [Em ajustes]`, `LukeFlix [Work in Progress]`, `WolfTV [Work in Progress]` e `Badge Digital ESP32-S3 & WiFi Scanner [Em desenvolvimento]`), mantendo fora todos os projetos privados (`P`), Admin e descontinuados.
  3. **Filtro Interativo por Categoria/Status:** adicionada barra de filtros rápidos (`Todos`, `Em Produção & Estáveis`, `Em Desenvolvimento & WIP`, `Código Aberto GitHub`) em `#projects`.

---

## Versão `v3.0.0` — Arquitetura de 3 Vitrines (`Apps Publicados`, `Apps em Dev`, `Projetos`), Regra Global de Governança, GuardaLinha `OBSOLETE` e Integração Central de Monitoramento

- **Versão do Projeto:** `v3.0.0`
- **Data e Hora da Atualização:** `2026-11-22 21:03:00 (BRT)`
- **Versão / Arquivo do Backup:**
  - **Local (Pré-atualização `v2.0.0`):** `backups/backup_v2.0.0_pre_v3_2026-11-22_205300.zip` e `backups/AGENTS_global_pre_v3_2026-11-22_205300.md`
  - **Local (Versão `v3.0.0` final):** `backups/backup_v3.0.0_2026-11-22_210300.zip`
  - **VPS (Pré-atualização `v2.0.0`):** `backups/backup_v2.0.0_pre_v3_2026-11-22_210300.tar.gz`
  - **VPS (Versão `v3.0.0` publicada):** `backups/backup_v3.0.0_2026-11-22_210300.tar.gz`
- **Artefato / Publicação:** Aplicação Web Estática Institucional & Políticas Google Play (`https://manciastudios.com` — build de assets `?v=3.0.0`)
- **O que foi feito:**
  1. **Reestruturação Completa em 3 Vitrines Independentes (`index.html`, `global.css`, `main.js`, `translations.js`):**
     - **Seção 1 — Aplicativos Publicados (`#apps-published`):** dedicada exclusivamente a aplicativos já publicados nas lojas oficiais com link direto + política. Implementado card glassmorphic de estado vazio automático (`#published-apps-empty`) enquanto há `0` apps publicados, ocultado automaticamente via `syncShowcaseState()` assim que o primeiro app entrar na grade.
     - **Seção 2 — Aplicativos em Desenvolvimento (`#apps-dev`):** configurada com **NyxMesh (`v2.3.0`)** (*Aguardando publicação oficial / Em homologação na loja*), **GuardaLinha** (*`OBSOLETE · Aguardando melhoria e atualização`*) e **Sentio** (*`OBSOLETE · Aguardando melhoria e atualização`*).
     - **Seção 3 — Projetos Desenvolvidos (`#projects`):** reservada exclusivamente a sistemas e projetos públicos que não são apps móveis, removendo duplicações de apps e projetos privados (`Alastor`) e exibindo inicialmente **Aegis Endpoint Defense** e **AegisCVE-Radar**.
     - **Hero com Contadores Dinâmicos:** removido o número fixo antigo (`3+ Apps publicados`) em favor de contadores calculados dinamicamente a partir dos cards reais (`Apps publicados`, `Apps em dev / revisão`, `Projetos públicos`, `Ativo desde 2024`).
  2. **Regra Global Permanente (`AGENTS.md` Seção 7) & Regra Local (`GEMINI.md`):**
     - Instituída a **Seção 7** nas Regras Globais determinando bloqueio absoluto de aplicativos Admin, páginas Admin e projetos privados, além da sequência obrigatória de perguntas (*Privado vs. Público* → *Incluir no site?* → *Publicado vs. Será publicado?*).
  3. **Política do GuardaLinha (`OBSOLETE`) & Cache-Busting `?v=3.0.0`:**
     - Adicionado o selo e banner informativo `OBSOLETE (Aguardando melhoria e atualização)` em `policies/guardalinha/index.html` (mantendo `HTTP 200` para conformidade com a Google Play) e atualizado `?v=3.0.0` em todos os arquivos HTML.
  4. **Integração com a Central de Monitoramento & Preservação Integral do Lupy Studio (`v2.0.1`):**
     - Adicionado endpoint leve `GET /health` em `deploy/nginx.conf` e geração automática do manifesto `/LOGS-PROJETOS/manciastudios/central-app.json` em `deploy/sync_logs.py`.
     - Preservada integralmente a política oficial `/policies/lupystudio/` (`com.aclupy.lupystudio`) recém-adicionada na `v2.0.1`, sincronizada para `?v=3.0.0`.

---

## Versão `v2.0.1` — Publicação da Política de Privacidade do Lupy Studio (`/policies/lupystudio/`)

- **Versão do Projeto:** `v2.0.1`
- **Data e Hora da Atualização:** `2026-11-22 21:00:00 (BRT)`
- **Versão / Arquivo do Backup:**
  - **Local (Pré-atualização):** `backups/backup_v2.0.0_pre_lupystudio_policy_2026-11-22_2057.zip`
  - **Local (Versão `v2.0.1`):** `backups/backup_v2.0.1_lupystudio_policy_2026-11-22_2101.zip`
- **O que foi feito:** Criada a página oficial `/policies/lupystudio/index.html` (`com.aclupy.lupystudio` · `v2.1.0+`) em PT-BR/EN e adicionada ao `sitemap.xml`.

---

## Versão `v2.0.0` — Substituição Hive → NyxMesh, Sentio OBSOLETE, Blindagem Nginx/VPS, SEO, Menu Mobile e Logs Centralizados

- **Versão do Projeto:** `v2.0.0`
- **Data e Hora da Atualização:** `2026-11-17 16:24:00 (BRT)`
- **Versão / Arquivo do Backup:**
  - **Local (Pré-atualização `v1.0.0`):** `backups/backup_v1.0.0_pre_update_2026-11-17_160800.zip`
  - **Local (Arquivo legado movido da raiz):** `backups/manciastudios-site_legacy_2026-04-21.zip`
  - **Local (Versão `v2.0.0` final):** `backups/backup_v2.0.0_2026-11-17_162400.zip`
  - **VPS (Pré-migração):** `backups/backup_v1.0.0_pre_update_2026-11-17_162400.tar.gz`
  - **VPS (Versão `v2.0.0` publicada):** `backups/backup_v2.0.0_2026-11-17_162400.tar.gz`
- **Artefato / Publicação:** Aplicação Web Estática Institucional & Políticas Google Play (`https://manciastudios.com` — build de assets `?v=2.0.0`)
- **O que foi feito:**
  1. **Substituição Completa do Hive Chat pelo NyxMesh (`v2.3.0` · `com.nyxmesh.client`):**
     - Criada `/policies/nyxmesh/index.html` e redirecionamento `HTTP 301` de `/policies/hive-chat/` para `/policies/nyxmesh/`.
  2. **Marcação do Sentio como `OBSOLETE (aguardando melhoria e atualização)`:**
     - Mantida `/policies/sentio/` online (`HTTP 200`) com banner de status informativo em PT-BR e EN.
  3. **Correções de Bugs, Menu Mobile, SEO (`404.html`, `robots.txt`, `sitemap.xml`) e Blindagem na VPS:**
     - Migrado o projeto na VPS para diretório isolado (`manciastudios/public/`), eliminando exposição pública de `.git/`, `deploy/`, `README.md` e `.zip`, e ativado `/LOGS-PROJETOS/manciastudios/logs.db`.

---

## Versão `v1.0.0` (Estado Original Auditado — Commit `9725282`)

- **Versão do Projeto:** `v1.0.0` (`9725282` — `2026-05-01`)
- **Data do Snapshot Pré-Atualização:** `2026-11-17 16:08:00 (BRT)`
- **Backup Gerado:** `backups/backup_v1.0.0_pre_update_2026-11-17_160800.zip`
- **Descrição:** Versão anterior contendo landing page inicial e políticas do Sentio, GuardaLinha e Hive Chat.
