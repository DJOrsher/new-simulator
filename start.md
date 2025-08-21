FILE: README.md

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
FILE: AGENTS.md
Agents Guide
This document is for AI coding assistants (Cursor, Claude, etc.) and new teammates. It explains what to change, where, and how to verify changes without guessing. Keep changes small, reversible, and test‑driven.
Project overview
Goal: Modular, testable flight simulator with a deterministic core and thin adapters for rendering/input.
Architecture style: Hexagonal + lightweight ECS. The core is TypeScript only.
Coordinate system: In the core, +Z = forward, +Y = up, +X = right. The adapter-three is responsible for converting to Three.js's coordinate system (-Z = forward).
Build and test commands
code
Bash
# bootstrap
pnpm i

# run unit/property tests (core only by default)
pnpm -w test

# dev web client
pnpm -w dev
Workflow & Commits
Each change should be committed to Git. After successfully completing a distinct task (e.g., setting up a system, passing a new test), commit the changes. Use the Conventional Commits format (feat:, fix:, chore:, test:, etc.). This creates a clean, step-by-step history.
Golden rules for AI agents
Do not move physics into adapters. All mechanics live in packages/core.
Respect axes: Core +Z forward → three −Z via adapter. If a bug flips controls/camera, fix the adapter mapping first.
Write tests before code for any behavior change.
Communicate via Events. The core simulation is a black box. Adapters send InputEvents in and receive OutputEvents out.
Prefer quaternions; never introduce Euler in core APIs.
Use fixed timestep integration in the core.
Keep scope minimal. One behavior per change, with corresponding tests.
If uncertain, state your assumption in a comment: // ASSUMPTION: ...
FILE: CONVENTIONS.md
Critical Conventions (To Prevent Directional Confusion)
Coordinate System (RHS): X is right, Y is up, Z is forward (+Z).
Core: We define forward = +Z for mathematical convenience.
Three.js Adapter: This adapter is responsible for converting our logical +Z forward to Three.js's -Z forward.
Units: Meters, seconds, radians, kilograms. Gravity g = 9.81 m/s^2.
Orientation: Quaternions only.
Positive Yaw -> Turn right (around +Y).
Positive Pitch -> Nose up (around +X).
Positive Roll -> Right wing down (around +Z).
Timing: Fixed timestep dt = 1/60 (configurable).
FILE: ARCHITECTURE.md
Hexagonal/ECS Architecture
Core (Domain)
World: Holds all entities and components.
Systems: Pure functions: (world, dt, inputEvents) => { newWorld, outputEvents }.
ModeMachine: An explicit state machine for Walking/Flying/Autopilot.
Event Queues: The primary communication channel between core and adapters.
Core/Adapter Communication via Event Queues
Input Events: Adapters (e.g., adapter-input-dom) create logical InputEvent objects and push them into an InputQueue.
Core Tick: The core consumes the InputQueue, updates the world, and generates OutputEvents.
Output Events: These describe state changes (e.g., { type: 'EntityLanded' }).
Adapters: Rendering and audio adapters subscribe to the OutputEvent stream. They never read the core world state directly.
Boundaries
Contracts: Clear DTOs between core and adapters. No THREE.Vector3 in the core.
Anti-corruption Layer: The adapter-three converts between our logical Vec3 and THREE.Vector3.
FILE: ROADMAP.md
Incremental Build Roadmap
Step 0 – Project Scaffolding & CI
Initialize pnpm monorepo with the project structure.
Create all documentation (.md) files in a docs/ directory.
Set up TypeScript, Vite, and Vitest configurations.
Create a "hello world" test in core that passes.
Configure linting (ESLint) and type-checking scripts.
Ensure pnpm -w test, pnpm -w lint, and pnpm -w build all work.
Step A – Deterministic Core & Base Tests
Implement the deterministic World/Systems and fixed dt simulation loop.
Implement the ModeMachine and test its transitions.
Implement the CharacterMovementSystem for basic capsule movement.
Write and pass ACCEPTANCE_TESTS.md scenario WLK-001.
Set up schema validation (Zod) for data formats.
Step B – Minimal Arcade Flight & Visualization
Implement FlightPhysicsSystem with a simple stall model.
Implement the logical ChaseCameraSystem and its tests.
Now, build the adapter-three to render a simple plane model and ground.
Step C – Collision & CCD
Implement a Grid broadphase and AABB narrowphase.
Implement velocity-based substeps for basic Continuous Collision Detection (CCD).
Step D – Autopilot
Implement a PI/PID system for maintaining heading/altitude/speed.
FILE: NEXT_ACTIONS.md
First Practical Steps (Recommended Order)
Execute Step 0: Set up the monorepo and all build/test tooling. Place all documentation files into a docs/ folder.
Implement Core Systems: Inside packages/core, implement the ModeMachine and CharacterMovementSystem.
Write Headless Test: Write and pass the WLK-001 acceptance test.
Implement Flight Physics: Add the FlightPhysicsSystem and the core tests for stall behavior (FLY-020).
Connect Visuals: Only now, connect a minimal adapter-three to render a cube on a plane.
FILE: ACCEPTANCE_TESTS.md
High-Level Acceptance Tests
WLK-001: Character starts at (0,0,0), receives "move forward" input for 2 seconds, moves approximately 10m along +Z, and does not pass through a wall placed at (0,0,10).
FLY-010: Plane takes off and maintains an altitude of 1000m ± 10m.
FLY-020: Plane is flying level, throttle is reduced. Altitude begins to decrease once speed drops below stallSpeed.
CAM-005: During a 30° roll, the plane's key points remain inside the logical camera frustum.
FILE: DATA_FORMATS.md
Data Formats (JSON)
Note: All external data loaded into the simulation (aircraft, airports, keybindings) must be validated against a formal schema using a library like Zod.
Aircraft
code
JSON
{
  "id": "basic_plane", "mass": 1200, "wingArea": 16.2, "stallSpeed": 28, "maxThrust": 3500
}
Airport
code
JSON
{
  "runways": [{ "start":, "end": }],
  "hangars": [{ "pos":, "size": }]
}
FILE: SAMPLE_TYPES.ts.md
Code Examples: TypeScript Core Types
code
Ts
// packages/core/src/math/vec.ts
export interface Vec3 { x: number; y: number; z: number }
export interface Quat { x: number; y: number; z: number; w: number }

// packages/core/src/ecs/entity.ts
export type EntityId = number
export interface Transform { position: Vec3; orientation: Quat }
export interface Kinematics { velocity: Vec3; angularVelocity: Vec3 }
FILE: SAMPLE_TESTS.spec.ts.md
Code Examples: Vitest Tests
code
Ts
import { describe, it, expect } from 'vitest'
import { transition } from '../src/modes/modeMachine'

describe('mode transitions', () => {
  it('allows walking to flying on EnterPlane event', () => {
    const startState = { mode: 'WALKING' };
    const event = { type: 'EnterPlane' };
    const endState = transition(startState, event);
    expect(endState.mode).toBe('FLYING');
  });
});
(Additional files like MODES.md, SYSTEMS.md, PHYSICS_FLIGHT_MODEL.md, etc., would follow the same pattern if included. This set provides the essential foundation.)
