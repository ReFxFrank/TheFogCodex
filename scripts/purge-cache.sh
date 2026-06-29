#!/usr/bin/env bash
# Purge the Cloudflare edge cache for the zone.
# Reads CF_API_TOKEN and CF_ZONE_ID from the environment or from .env.local.
set -euo pipefail
cd "$(dirname "$0")/.."

# Pull creds from .env.local if not already in the environment.
if [ -f .env.local ]; then
  CF_API_TOKEN="${CF_API_TOKEN:-$(grep -E '^CF_API_TOKEN=' .env.local | cut -d= -f2- || true)}"
  CF_ZONE_ID="${CF_ZONE_ID:-$(grep -E '^CF_ZONE_ID=' .env.local | cut -d= -f2- || true)}"
fi

if [ -z "${CF_API_TOKEN:-}" ] || [ -z "${CF_ZONE_ID:-}" ]; then
  echo "Missing CF_API_TOKEN or CF_ZONE_ID. Set them in .env.local — see README (Cloudflare cache purge)." >&2
  exit 1
fi

resp="$(curl -sS -X POST \
  "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}')"

if echo "$resp" | grep -q '"success":true'; then
  echo "✅ Cloudflare cache purged."
else
  echo "❌ Cloudflare purge failed:" >&2
  echo "$resp" >&2
  exit 1
fi
