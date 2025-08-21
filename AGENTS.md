# Agents Guide

This document is for AI coding assistants (Cursor, Claude, etc.) and new teammates. It explains what to change, where, and how to verify changes without guessing. Keep changes small, reversible, and test‑driven.

## Project overview

Goal: Modular, testable flight simulator with a deterministic core and thin adapters for rendering/input.

Architecture style: Hexagonal + lightweight ECS. The core is TypeScript only.

Coordinate system: In the core, +Z = forward, +Y = up, +X = right. The adapter-three is responsible for converting to Three.js's coordinate system (-Z = forward).

## Documentation Guide

Use these documentation files to understand the project:

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)**: Hexagonal/ECS architecture details, core systems, and adapter boundaries
- **[CONVENTIONS.md](docs/CONVENTIONS.md)**: Critical conventions for coordinate systems, units, and orientation
- **[ACCEPTANCE_TESTS.md](docs/ACCEPTANCE_TESTS.md)**: High-level acceptance tests that define expected behavior
- **[DATA_FORMATS.md](docs/DATA_FORMATS.md)**: JSON schemas for aircraft, airports, and other data files
- **[ROADMAP.md](docs/ROADMAP.md)**: Incremental build plan and project milestones
- **[NEXT_ACTIONS.md](docs/NEXT_ACTIONS.md)**: Recommended next steps in priority order
- **[SAMPLE_TYPES.ts.md](docs/SAMPLE_TYPES.ts.md)**: TypeScript core type examples
- **[SAMPLE_TESTS.spec.ts.md](docs/SAMPLE_TESTS.spec.ts.md)**: Example test patterns using Vitest

When implementing new features or fixing bugs:
1. First check **ROADMAP.md** and **NEXT_ACTIONS.md** to understand current priorities
2. Review **ARCHITECTURE.md** and **CONVENTIONS.md** to ensure your changes follow project patterns
3. Write tests according to **ACCEPTANCE_TESTS.md** and **SAMPLE_TESTS.spec.ts.md** patterns
4. Implement types following **SAMPLE_TYPES.ts.md** conventions

## Build and test commands

```bash
# bootstrap
pnpm i

# run unit/property tests (core only by default)
pnpm -w test

# dev web client
pnpm -w dev
```

## Workflow & Commits

Each change should be committed to Git. After successfully completing a distinct task (e.g., setting up a system, passing a new test), commit the changes. Use the Conventional Commits format (feat:, fix:, chore:, test:, etc.). This creates a clean, step-by-step history.

## Golden rules for AI agents

1. Do not move physics into adapters. All mechanics live in packages/core.
2. Respect axes: Core +Z forward → three −Z via adapter. If a bug flips controls/camera, fix the adapter mapping first.
3. Write tests before code for any behavior change.
4. Communicate via Events. The core simulation is a black box. Adapters send InputEvents in and receive OutputEvents out.
5. Prefer quaternions; never introduce Euler in core APIs.
6. Use fixed timestep integration in the core.
7. Keep scope minimal. One behavior per change, with corresponding tests.
8. If uncertain, state your assumption in a comment: // ASSUMPTION: ...

## Bootstrapping Learnings

- **pnpm on WSL**: Prefer Corepack or a per-user install. If PATH isn’t updated, call pnpm via `~/.local/share/pnpm/pnpm` or `source ~/.bashrc`.
  - Avoid global `npm i -g pnpm` on WSL due to EACCES; install Node via `nvm` and enable pnpm with Corepack or the per-user installer.
- **ESLint v9 flat config**: `.eslintrc.*` is no longer supported. Use a flat config (CJS is simplest): `eslint.config.cjs` with the TS parser. Keep rules minimal initially so lint can run.
- **Vitest config**: Add `packages/core/vitest.config.ts` using `defineConfig` from `vitest/config`. If esbuild throws syntax errors, ensure the file content wasn’t mangled by the shell and uses proper quotes.
- **Shell quoting and file writes**: When generating files from scripts, use single-quoted heredocs (e.g., `<< 'EOF'`) or base64-encode content to avoid interpolation and quote breakage in WSL.
- **pnpm filter quoting**: Quote filters in root scripts to prevent shell glob expansion:
  - `"pnpm -r --filter \"./packages/*\" run test"` and same for build/typecheck.
- **No-op tests for adapters (early stage)**: Until adapter packages have tests, set their `test` script to `"echo no tests"` so `pnpm -w test` focuses on core.
- **Git via SSH**: Use SSH remotes and conventional commits. Push only after green `test`, `lint`, and `build`.