# ThreeFlightSim

A modular flight simulator based on TypeScript + Three.js, with a hybrid Hexagonal/ECS architecture, testable deterministic logic, and support for multiple game modes:

*   **Walking**
*   **Flying**
*   **Autopilot**
*   *(Future)* **Control Room**, **Hangar**, **Car Driving**

## Guiding Principles

*   **Strict Separation:** Core simulation logic is completely decoupled from adapters (rendering, input, audio).
*   **Determinism:** The core uses a fixed timestep and has no dependency on `Date.now()` or `requestAnimationFrame`.
*   **Unit Tested:** All mathematical calculations, physics, and state transitions are covered by unit tests.
*   **Data-Driven:** Aircraft types, airport layouts, and camera profiles are defined in external data files.
*   **Lightweight ECS:** An Entity-Component-System architecture allows for easy extension with new game modes.

## Proposed Monorepo Structure
.
├─ docs/ # All .md planning files will go here
├─ packages/
│ ├─ core/ # Deterministic logic (pure TS)
│ ├─ adapter-three/ # Rendering adapter for three.js
│ └─ adapter-input-dom/ # Input adapter
└─ apps/
└─ sim-client/ # Browser client bootstrap```
Technologies
TypeScript, Vite, Three.js (in adapter layer only), Vitest, fast-check, Zod.
Commands
code
Code
pnpm i
pnpm -w run test          # Runs core tests
pnpm -w run dev           # Starts the browser client