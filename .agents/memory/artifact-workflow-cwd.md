---
name: Artifact workflow working directory
description: Working directory behavior for managed Replit artifact services.
---

Managed artifact workflows can start with their current directory at `artifacts/<slug>/`, not the workspace root. Relative commands such as `cd gpb-weak-signals/frontend` can fail even though the sibling project exists.

**Why:** ETI's initial artifact workflows failed because sibling paths were resolved from the artifact directory.

**How to apply:** Resolve the workspace root by walking upward to `pnpm-workspace.yaml` before commands that reference sibling projects; runtime scripts should derive their own paths from `BASH_SOURCE`.