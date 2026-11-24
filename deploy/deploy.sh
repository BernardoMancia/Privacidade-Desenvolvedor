#!/bin/bash
set -euo pipefail

VPS_IP="${VPS_IP:?Defina VPS_IP antes de executar (ex: VPS_IP=seu_ip bash deploy/deploy.sh)}"
VPS_USER="${VPS_USER:?Defina VPS_USER antes de executar (ex: VPS_USER=seu_usuario bash deploy/deploy.sh)}"
DOMAIN="manciastudios.com"
REMOTE_BASE="/home/${VPS_USER}/manciastudios"
REMOTE_PUBLIC="${REMOTE_BASE}/public"
LOCAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NGINX_CONF="/etc/nginx/sites-available/manciastudios"
NGINX_ENABLED="/etc/nginx/sites-enabled/manciastudios"
TIMESTAMP="$(date +%Y-%m-%d_%H%M%S)"

echo "========================================"
echo "  Mancia Studios v3.2.0 — Deploy Script"
echo "  Target: ${VPS_USER}@${VPS_IP}"
echo "  Domain: https://${DOMAIN}"
echo "========================================"

echo "[1/6] Criando diretórios e backup remoto..."
ssh "${VPS_USER}@${VPS_IP}" "
  mkdir -p '${REMOTE_PUBLIC}' '${REMOTE_BASE}/deploy' '${REMOTE_BASE}/backups' '/LOGS-PROJETOS/manciastudios'
  if [ -d '${REMOTE_PUBLIC}' ] && [ \"\$(ls -A '${REMOTE_PUBLIC}' 2>/dev/null)\" ]; then
    tar -czf '${REMOTE_BASE}/backups/backup_pre_deploy_${TIMESTAMP}.tar.gz' -C '${REMOTE_BASE}' public
  fi
"

echo "[2/6] Sincronizando apenas arquivos públicos para ${REMOTE_PUBLIC}..."
rsync -avz --delete \
  --exclude '.git/' \
  --exclude '.gitignore' \
  --exclude 'deploy/' \
  --exclude 'backups/' \
  --exclude 'README.md' \
  --exclude 'GEMINI.md' \
  --exclude 'HISTORICO_VERSOES_E_BACKUPS.md' \
  --exclude '*.zip' \
  --exclude '*.tar.gz' \
  "${LOCAL_DIR}/" "${VPS_USER}@${VPS_IP}:${REMOTE_PUBLIC}/"

echo "[3/6] Sincronizando utilitários de operação e documentação..."
rsync -avz \
  "${LOCAL_DIR}/deploy/" "${VPS_USER}@${VPS_IP}:${REMOTE_BASE}/deploy/"
rsync -avz \
  "${LOCAL_DIR}/README.md" "${LOCAL_DIR}/HISTORICO_VERSOES_E_BACKUPS.md" \
  "${VPS_USER}@${VPS_IP}:${REMOTE_BASE}/"

echo "[4/6] Ajustando permissões isoladas para www-data e Nginx..."
ssh "${VPS_USER}@${VPS_IP}" "
  sudo setfacl -m u:www-data:x '/home/${VPS_USER}' || sudo chmod 751 '/home/${VPS_USER}'
  sudo chown -R ${VPS_USER}:www-data '${REMOTE_PUBLIC}'
  sudo chmod 750 '${REMOTE_BASE}' '${REMOTE_PUBLIC}'
  sudo find '${REMOTE_PUBLIC}' -type d -exec chmod 750 {} +
  sudo find '${REMOTE_PUBLIC}' -type f -exec chmod 640 {} +
  sudo chmod 700 '${REMOTE_BASE}/deploy' '${REMOTE_BASE}/backups'
  sudo sed \"s|__VPS_USER__|${VPS_USER}|g\" '${REMOTE_BASE}/deploy/nginx.conf' | sudo tee '${NGINX_CONF}' >/dev/null
  sudo ln -sf '${NGINX_CONF}' '${NGINX_ENABLED}'
  sudo nginx -t
  sudo systemctl reload nginx
"

echo "[5/6] Atualizando coletor centralizado de logs SQLite..."
ssh "${VPS_USER}@${VPS_IP}" "
  sudo python3 '${REMOTE_BASE}/deploy/sync_logs.py'
  sudo chown -R ${VPS_USER}:${VPS_USER} /LOGS-PROJETOS/manciastudios
"

echo "[6/6] Verificando certificado TLS..."
ssh "${VPS_USER}@${VPS_IP}" "
  sudo certbot renew --quiet --nginx || true
"

echo "========================================"
echo "  Deploy concluído com sucesso!"
echo "  Site: https://${DOMAIN}"
echo "========================================"
