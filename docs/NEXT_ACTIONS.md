# First Practical Steps (Recommended Order)

1. Execute Step 0: Set up the monorepo and all build/test tooling. Place all documentation files into a docs/ folder.
2. Implement Core Systems: Inside packages/core, implement the ModeMachine and CharacterMovementSystem.
3. Write Headless Test: Write and pass the WLK-001 acceptance test.
4. Implement Flight Physics: Add the FlightPhysicsSystem and the core tests for stall behavior (FLY-020).
5. Connect Visuals: Only now, connect a minimal adapter-three to render a cube on a plane.