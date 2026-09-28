---
name: Frontend test runtime
description: A reliable way to test TypeScript helpers without adding a frontend test runner.
---

**Rule:** In this workspace, Node 24.13 rejected `--experimental-default-type=module`; compile focused TypeScript modules to CommonJS and run `.cjs` tests with the built-in `node:test` runner.

**Why:** Native TypeScript/ESM test loading was not portable despite the installed Node version. A small `tsc`-to-temporary-output step avoids changing Next's module configuration or adding test dependencies.

**How to apply:** For focused tests of frontend utilities, compile only the relevant modules into `/tmp`, run the `.cjs` test file with `node --test`, and restore any mocked global `fetch`.