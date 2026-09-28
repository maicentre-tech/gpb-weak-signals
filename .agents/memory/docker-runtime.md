---
name: Nested Docker runtime limitation
description: Distinguish project build failures from Docker-in-Docker healthcheck and bridge-network failures in this workspace.
---

When testing Docker Compose from this workspace, image builds may succeed while running nested containers is unreliable. On 2026-09-25, PostgreSQL logged that it was ready, but Compose health checks and `docker exec` failed before launching their probe with an OCI runtime process-start error; a sibling container also could not reach PostgreSQL over the bridge network. Treat this as a workspace runtime limitation unless the same failure reproduces on a regular Docker host.

On 2026-09-26, a Next.js container returned HTTP 200 to local shell requests but Replit still did not register its port as open, both with bridge publishing and host networking. A native workspace Next.js process on port 5000 was detected correctly.

**Why:** Nested Docker can make a service reachable from the workspace shell without exposing it to Replit's workflow/preview port monitor; earlier healthcheck and bridge failures also occurred before application startup.

**How to apply:** For browser-facing apps, prefer a native workspace process on `0.0.0.0:5000` and verify the workflow reports the port open; a local HTTP 200 from a container is insufficient. Do not change application health routes or remove user volumes based only on nested-runtime failures.