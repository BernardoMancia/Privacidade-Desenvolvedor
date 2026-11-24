# Mancia Studios — Portfólio & Políticas de Privacidade (`v3.2.0`)

Site institucional estático oficial para [manciastudios.com](https://manciastudios.com) — landing page organizada em **3 vitrines independentes** (**Aplicativos Publicados**, **Aplicativos em Desenvolvimento** e **Projetos Desenvolvidos**) e políticas de privacidade bilíngues (PT-BR / EN) em conformidade com a LGPD e com o Google Play Data Safety.

---

## Arquitetura das 3 Vitrines (`index.html`)

| Seção | Âncora | Regra de Conteúdo |
|---|---|---|
| **1. Aplicativos Publicados** | `#apps-published` | Somente aplicativos móveis já publicados oficialmente nas lojas, com link direto da loja + Política de Privacidade. Exibe estado vazio automático quando há `0` apps publicados. |
| **2. Aplicativos em Desenvolvimento** | `#apps-dev` | Aplicativos móveis em desenvolvimento, em homologação para lançamento (ex.: **NyxMesh `v2.3.0`**) ou legados marcados como `OBSOLETE` aguardando atualização (**GuardaLinha**, **Sentio**). |
| **3. Projetos Desenvolvidos** | `#projects` | Somente projetos públicos que **não** são especificamente aplicativos móveis (plataformas EDR/segurança, backends, web apps, jogos, automações). |

> **Regra Estrita de Privacidade:** Aplicativos de Admin, painéis de Admin e projetos privados **jamais** são listados neste repositório ou no site publicado.

---

## Rotas Publicadas

| Rota | Descrição | Status |
|---|---|---|
| `/` | Landing page principal (Sobre, Apps Publicados, Apps em Dev, Projetos e Contato) | Em produção |
| `/health` | Endpoint JSON de healthcheck (`{"status":"ok","app_name":"manciastudios-site","version":"v3.2.0"}`) | Em produção |
| `/policies/nyxmesh/` | Política de Privacidade do **NyxMesh** (`com.nyxmesh.client` · `v2.3.0+`) | Em homologação |
| `/policies/lupystudio/` | Política de Privacidade do **Lupy Studio** (`com.aclupy.lupystudio` · `v2.1.0+`) | Em homologação |
| `/policies/guardalinha/` | Política de Privacidade do **GuardaLinha** (ativa com aviso `OBSOLETE`) | Obsoleto / Em revisão |
| `/policies/sentio/` | Política de Privacidade do **Sentio** (ativa com aviso `OBSOLETE`) | Obsoleto / Em revisão |
| `/offerflow/` | Página dedicada da Comunidade OfferFlow (Mercado Livre Afiliados) | Em produção |
| `/policies/boop/` | Política de Privacidade do **Boop** (`com.furrycore.boop` · `v1.0.0+`) | Em desenvolvimento |
| `/policies/hive-chat/` | Aviso Oficial de Encerramento Definitivo (sem versão estável) & Política Histórica do **Hive** | Descontinuado |
| `/404.html` | Página de erro `404` dedicada com caminhos absolutos | Em produção |
| `/robots.txt` & `/sitemap.xml` | Indexação SEO e mapa de URLs para mecanismos de busca | Em produção |

---

## Estrutura do Projeto

```text
pagina-politica-app/
├── GEMINI.md                         ← Regras locais de taxonomia e segurança do portfólio
├── index.html                        ← Landing page v3.2.0 (3 vitrines + contadores dinâmicos)
├── 404.html                          ← Página de erro 404 dedicada
├── robots.txt                        ← Diretivas para crawlers
├── sitemap.xml                       ← Sitemap XML oficial
├── policies/
│   ├── nyxmesh/index.html            ← Política do NyxMesh (Zero-Storage P2P)
│   ├── guardalinha/index.html        ← Política do GuardaLinha (com aviso OBSOLETE)
│   └── sentio/index.html             ← Política do Sentio (com aviso OBSOLETE)
├── assets/
│   ├── css/global.css                ← Design system dark/glassmorphism + estado vazio
│   ├── css/policy.css                ← Layout das páginas de política
│   ├── js/translations.js            ← Dicionário completo PT-BR / EN
│   ├── js/i18n.js                    ← Motor i18n com detecção automática de idioma
│   └── js/main.js                    ← Partículas otimizadas, contadores dinâmicos e menu mobile
├── deploy/
│   ├── nginx.conf                    ← Configuração Nginx endurecida (/health + TLS + CSP + 301)
│   ├── deploy.sh                     ← Script automatizado de publicação isolada
│   └── sync_logs.py                  ← Sincronizador Nginx -> SQLite + manifesto central-app.json
├── backups/                          ← Backups versionados locais (ignorados no Git)
└── HISTORICO_VERSOES_E_BACKUPS.md    ← Registro oficial de versões, auditorias e backups
```
