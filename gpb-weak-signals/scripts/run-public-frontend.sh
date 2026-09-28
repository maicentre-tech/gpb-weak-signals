#!/usr/bin/env bash
set -euo pipefail

mode="${1:-}"
case "$mode" in
  dev | start)
    ;;
  *)
    echo "Usage: run-public-frontend.sh {dev|start}" >&2
    exit 2
    ;;
esac

: "${PORT:?PORT must be set by the service runtime}"

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/../frontend"
export NEXT_TELEMETRY_DISABLED=1

exec ./node_modules/.bin/next "$mode" --hostname 0.0.0.0 --port "$PORT"