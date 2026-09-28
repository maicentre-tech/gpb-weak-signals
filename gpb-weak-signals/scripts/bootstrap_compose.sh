#!/bin/sh
set -eu

test -f /app/data/ontology/ai_pilot.json || {
  echo "Missing bundled pilot ontology: /app/data/ontology/ai_pilot.json" >&2
  exit 1
}

alembic upgrade head
python scripts/seed_sources.py --preserve-existing
python scripts/seed_ontology.py /app/data/ontology/ai_pilot.json --preserve-existing