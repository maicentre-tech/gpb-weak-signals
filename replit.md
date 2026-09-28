# ETI — Emerging Technology Intelligence

Evidence-first platform for detecting and ranking emerging scientific and technology signals.

## Source repository

- Upstream: `maicentre-tech/gpb-weak-signals`, branch `main`
- Source snapshot: `gpb-weak-signals/`
- Imported revision: `11f8de45911a635433b819640e7eb409fc08f30d`
- The snapshot does not include Git history or a Git remote. Changes here do not automatically sync back to GitHub; use the connected GitHub integration when the user asks to sync or publish source changes.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `cd gpb-weak-signals && python -m pytest -q` — run the imported Python source tests
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `gpb-weak-signals/src/eti/` — FastAPI service, scoring, ingestion, ML, and RAG
- `gpb-weak-signals/frontend/` — Next.js interface
- `gpb-weak-signals/migrations/` — Alembic database migrations
- `gpb-weak-signals/tests/` — Python test suite
- `gpb-weak-signals/docs/ROADMAP.md` — current status and prioritized remaining work
- `gpb-weak-signals/README.md` — project setup and architecture overview

## Architecture decisions

- Ranking is based on measured signals and source evidence; the LLM is limited to structured explanations grounded in selected evidence.
- Missing measurements are distinct from zero values in scoring.
- Expert review is retained as training feedback and tied to the date of the reviewed claim.

## Product

The platform ingests scientific, technology, and news sources; detects candidate trends; ranks them using measurable signals; and presents evidence-backed explanations for expert review.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
