# Mancia Studios — Portfolio & App Policies

Static website for [manciastudios.com](https://manciastudios.com) — portfolio landing page and individual privacy policies for Google Play apps.

---

## 🇧🇷 Português

### Visão Geral

Site estático hospedado na VPS com Nginx + TLS (Let's Encrypt). Inclui:

- **`/`** — Landing page de portfólio com apresentação, apps e contato
- **`/policies/sentio`** — Política de privacidade do app Sentio
- **`/policies/guardalinha`** — Política de privacidade do GuardaLinha
- **`/policies/hive-chat`** — Política de privacidade do Hive Chat

### Estrutura

```
pagina-politica-app/
├── index.html                  ← Landing page principal
├── policies/
│   ├── sentio/index.html       ← Política do Sentio
│   ├── guardalinha/index.html  ← Política do GuardaLinha
│   └── hive-chat/index.html    ← Política do Hive Chat
├── assets/
│   ├── css/global.css          ← Design system
│   ├── css/policy.css          ← Estilos das páginas de política
│   └── js/main.js              ← Animações e interatividade
└── deploy/
    ├── nginx.conf              ← Configuração Nginx completa
    └── deploy.sh               ← Script de deploy automático
```

O site é servido na VPS a partir de `/home/[user]/sites/[site-name]`.

### Adicionar novo app

1. Copie `policies/sentio/` para `policies/[nome-do-app]/`
2. Edite o `index.html` copiado com os dados do novo app
3. Adicione o card do app em `index.html` (seção `#apps`)
4. Execute o deploy: `bash deploy/deploy.sh`

### Deploy na VPS

> **Pré-requisito:** SSH configurado com chave para `root@82.112.245.99`

```bash
bash deploy/deploy.sh
```

O script:
1. Sincroniza arquivos via `rsync`
2. Instala a configuração Nginx
3. Emite/renova o certificado TLS (Certbot + Let's Encrypt)
4. Recarrega o Nginx

### Personalização

Antes do deploy, edite conforme necessário:

| Arquivo | O que personalizar |
|---|---|
| `index.html` | Nome, bio, redes sociais, links da Play Store |
| `policies/[app]/index.html` | Dados específicos do app, permissões, etc. |
| `deploy/nginx.conf` | Domínio, paths, configurações de segurança |
| `deploy/deploy.sh` | Usuário SSH, IP da VPS |

---

## 🇺🇸 English

### Overview

Static website hosted on VPS with Nginx + TLS (Let's Encrypt). Includes:

- **`/`** — Portfolio landing page with presentation, apps, and contact
- **`/policies/sentio`** — Sentio app privacy policy
- **`/policies/guardalinha`** — GuardaLinha privacy policy
- **`/policies/hive-chat`** — Hive Chat privacy policy

### Structure

```
pagina-politica-app/
├── index.html                  ← Main landing page
├── policies/
│   ├── sentio/index.html       ← Sentio policy
│   ├── guardalinha/index.html  ← GuardaLinha policy
│   └── hive-chat/index.html    ← Hive Chat policy
├── assets/
│   ├── css/global.css          ← Design system
│   ├── css/policy.css          ← Policy page styles
│   └── js/main.js              ← Animations and interactivity
└── deploy/
    ├── nginx.conf              ← Full Nginx configuration
    └── deploy.sh               ← Automated deploy script
```

The site is served on the VPS from `/home/[user]/sites/[site-name]`.

### Add a New App

1. Copy `policies/sentio/` to `policies/[app-name]/`
2. Edit the copied `index.html` with your new app's details
3. Add the app card in `index.html` (section `#apps`)
4. Run deploy: `bash deploy/deploy.sh`

### Deploy to VPS

> **Prerequisite:** SSH key configured for `root@82.112.245.99`

```bash
bash deploy/deploy.sh
```

The script:
1. Syncs files via `rsync`
2. Installs the Nginx configuration
3. Issues/renews the TLS certificate (Certbot + Let's Encrypt)
4. Reloads Nginx

### Customization

Before deploying, edit as needed:

| File | What to customize |
|---|---|
| `index.html` | Name, bio, social links, Play Store URLs |
| `policies/[app]/index.html` | App-specific data, permissions, etc. |
| `deploy/nginx.conf` | Domain, paths, security settings |
| `deploy/deploy.sh` | SSH user, VPS IP |

---

## Policy URLs (Google Play)

| App | Policy URL |
|---|---|
| Sentio | `https://manciastudios.com/policies/sentio` |
| GuardaLinha | `https://manciastudios.com/policies/guardalinha` |
| Hive Chat | `https://manciastudios.com/policies/hive-chat` |

## Tech Stack

- Pure HTML + CSS + JavaScript (no framework)
- Nginx + Let's Encrypt (TLS)
- Design: Dark mode · Glassmorphism · Cybersecurity/Fluent UI
- Typography: Inter + Space Grotesk (Google Fonts)
- Compliant with: LGPD (Brazilian Data Protection Law)
