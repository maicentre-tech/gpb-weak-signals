#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

: "${PORT:?PORT must be set by the service runtime}"

database_url="${ETI_DATABASE_URL:-${DATABASE_URL:-}}"
if [[ -z "$database_url" ]]; then
  echo "ETI requires DATABASE_URL or ETI_DATABASE_URL." >&2
  exit 1
fi

case "$database_url" in
  postgresql+psycopg://*)
    ;;
  postgresql://*)
    database_url="postgresql+psycopg://${database_url#postgresql://}"
    ;;
  postgres://*)
    database_url="postgresql+psycopg://${database_url#postgres://}"
    ;;
  *)
    echo "ETI database URL must use PostgreSQL." >&2
    exit 1
    ;;
esac

export ETI_DATABASE_URL="$database_url"
export ETI_ENVIRONMENT="${ETI_ENVIRONMENT:-production}"
export ETI_PUBLIC_READ_ONLY=true
export ETI_EXPERT_LIVE_SEARCH_ENABLED=false
export ETI_DEBUG=false
export PYTHONPATH="$PWD/src"

exec python3 -m uvicorn eti.api.app:app --host 0.0.0.0 --port "$PORT"