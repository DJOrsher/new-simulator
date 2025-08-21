# Incremental Build Roadmap

## Step 0 – Project Scaffolding & CI
- Initialize pnpm monorepo with the project structure.
- Create all documentation (.md) files in a docs/ directory.
- Set up TypeScript, Vite, and Vitest configurations.
- Create a "hello world" test in core that passes.
- Configure linting (ESLint) and type-checking scripts.
- Ensure pnpm -w test, pnpm -w lint, and pnpm -w build all work.

## Step A – Deterministic Core & Base Tests
- Implement the deterministic World/Systems and fixed dt simulation loop.
- Implement the ModeMachine and test its transitions.
- Implement the CharacterMovementSystem for basic capsule movement.
- Write and pass ACCEPTANCE_TESTS.md scenario WLK-001.
- Set up schema validation (Zod) for data formats.

## Step B – Minimal Arcade Flight & Visualization
- Implement FlightPhysicsSystem with a simple stall model.
- Implement the logical ChaseCameraSystem and its tests.
- Now, build the adapter-three to render a simple plane model and ground.

## Step C – Collision & CCD
- Implement a Grid broadphase and AABB narrowphase.
- Implement velocity-based substeps for basic Continuous Collision Detection (CCD).

## Step D – Autopilot
- Implement a PI/PID system for maintaining heading/altitude/speed.