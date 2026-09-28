---
name: Transient package install side effects
description: Keep one-off inspection tools from changing the workspace runtime configuration.
---

A one-off Python package install through Replit's package manager can update the workspace root `.replit`, `pyproject.toml`, and `uv.lock`, even when the package is only needed to inspect a nested artifact. Uninstalling the package may leave generated system dependencies or platform wheel entries in the lockfile.

**Why:** A temporary PDF-inspection dependency unexpectedly changed the shared runtime configuration, which could affect unrelated artifacts.

**How to apply:** Before adding an inspection-only dependency, check whether an existing tool is sufficient. If installation is necessary, inspect the workspace diff afterward and remove only installer-generated configuration changes after uninstalling the package.