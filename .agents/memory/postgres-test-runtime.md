---
name: ETI test database runtime
description: PostgreSQL extension requirements and safe isolation for ETI backend tests.
---

The Nix-provided native PostgreSQL server can run, but it does not include the `vector` extension required by ETI migrations. A temporary native database therefore cannot run the full schema migration. The Replit-managed development database has `vector`, but it holds shared ETI Preview state and is not a safe substitute for an isolated test database.

**Why:** Backend tests write review and mapping data, and the ETI schema enables pgvector during migration; using a live or Preview database risks changing project data.

**How to apply:** Use API unit tests with mocked sessions when an isolated PostgreSQL image containing pgvector is unavailable. Never point mutating tests at the active Preview or production database.