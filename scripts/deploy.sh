#!/usr/bin/env bash
# One-command deploy: pull, install, migrate, build, restart, and purge the
# Cloudflare edge cache so visitors get the new version immediately.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> Pulling latest code"
git pull

echo "==> Installing dependencies"
npm install

echo "==> Applying database migrations"
DATABASE_URL="$(grep -E '^DATABASE_URL=' .env.local | cut -d= -f2-)" npm run db:migrate

echo "==> Building"
npm run build

echo "==> Restarting app (pm2)"
pm2 restart fog-codex --update-env

echo "==> Purging Cloudflare cache"
bash scripts/purge-cache.sh

echo "==> Deploy complete."
