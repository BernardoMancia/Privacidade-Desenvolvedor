#!/bin/bash
set -euo pipefail

VPS_IP="82.112.245.99"
VPS_USER="adm_luke"
DOMAIN="manciastudios.com"
REMOTE_DIR="/home/adm_luke/sites/manciastudios"
LOCAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NGINX_CONF="/etc/nginx/sites-available/manciastudios"
NGINX_ENABLED="/etc/nginx/sites-enabled/manciastudios"

echo "========================================"
echo "  Mancia Studios — Deploy Script"
echo "  Target: $VPS_USER@$VPS_IP"
echo "  Domain: https://$DOMAIN"
echo "========================================"

echo ""
echo "[1/5] Criando diretório remoto..."
ssh "$VPS_USER@$VPS_IP" "mkdir -p $REMOTE_DIR"

echo "[2/5] Sincronizando arquivos..."
rsync -avz --delete \
  --exclude '.git' \
  --exclude 'deploy/' \
  --exclude 'README.md' \
  --exclude '.gitignore' \
  "$LOCAL_DIR/" "$VPS_USER@$VPS_IP:$REMOTE_DIR/"

echo "[3/5] Instalando configuração Nginx..."
ssh "$VPS_USER@$VPS_IP" "
  cp /dev/stdin $NGINX_CONF
  ln -sf $NGINX_CONF $NGINX_ENABLED
  nginx -t
" < "$LOCAL_DIR/deploy/nginx.conf"

echo "[4/5] Verificando/instalando TLS (Certbot)..."
ssh "$VPS_USER@$VPS_IP" "
  if ! command -v certbot &>/dev/null; then
    apt-get update -qq
    apt-get install -y certbot python3-certbot-nginx
  fi

  if [ ! -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
    certbot --nginx \
      -d $DOMAIN \
      -d www.$DOMAIN \
      --non-interactive \
      --agree-tos \
      --email privacidade@$DOMAIN \
      --redirect
  else
    certbot renew --quiet --nginx
  fi
"

echo "[5/5] Recarregando Nginx..."
ssh "$VPS_USER@$VPS_IP" "systemctl reload nginx"

echo ""
echo "========================================"
echo "  Deploy concluído com sucesso!"
echo "  Site: https://$DOMAIN"
echo "========================================"
