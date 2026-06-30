#!/usr/bin/env bash
# Back up the Postgres database to a timestamped, gzipped SQL dump.
# Reads DATABASE_URL from the environment or .env.local.
#
# Config (optional, via env):
#   BACKUP_DIR        where to write dumps        (default: ./backups)
#   BACKUP_KEEP_DAYS  prune dumps older than this (default: 7)
#
# Restore a dump with:
#   gunzip -c backups/fogcodex-YYYYMMDD-HHMMSS.sql.gz | psql "$DATABASE_URL"
set -euo pipefail
cd "$(dirname "$0")/.."

# Pull the connection string from .env.local if not already set.
if [ -z "${DATABASE_URL:-}" ] && [ -f .env.local ]; then
  DATABASE_URL="$(grep -E '^DATABASE_URL=' .env.local | cut -d= -f2- || true)"
fi
if [ -z "${DATABASE_URL:-}" ]; then
  echo "Missing DATABASE_URL (set it in .env.local or the environment)." >&2
  exit 1
fi

if ! command -v pg_dump >/dev/null 2>&1; then
  echo "pg_dump not found. Install the Postgres client: sudo apt install -y postgresql-client" >&2
  exit 1
fi

BACKUP_DIR="${BACKUP_DIR:-backups}"
KEEP_DAYS="${BACKUP_KEEP_DAYS:-7}"
mkdir -p "$BACKUP_DIR"

stamp="$(date +%Y%m%d-%H%M%S)"
out="$BACKUP_DIR/fogcodex-$stamp.sql.gz"
tmp="$out.partial"

echo "==> Dumping database to $out"
# --no-owner / --no-privileges keep the dump portable across roles.
if pg_dump --no-owner --no-privileges "$DATABASE_URL" | gzip > "$tmp"; then
  mv "$tmp" "$out"
  size="$(du -h "$out" | cut -f1)"
  echo "✅ Backup written: $out ($size)"
else
  rm -f "$tmp"
  echo "❌ Backup failed." >&2
  exit 1
fi

# Prune old dumps.
pruned="$(find "$BACKUP_DIR" -name 'fogcodex-*.sql.gz' -type f -mtime "+$KEEP_DAYS" -print -delete | wc -l | tr -d ' ')"
if [ "$pruned" != "0" ]; then
  echo "==> Pruned $pruned backup(s) older than ${KEEP_DAYS} days."
fi

echo "==> Backups on disk:"
ls -1t "$BACKUP_DIR"/fogcodex-*.sql.gz 2>/dev/null | head -10
