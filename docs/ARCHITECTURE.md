# Hexagonal/ECS Architecture

## Core (Domain)
- **World**: Holds all entities and components.
- **Systems**: Pure functions: (world, dt, inputEvents) => { newWorld, outputEvents }.
- **ModeMachine**: An explicit state machine for Walking/Flying/Autopilot.
- **Event Queues**: The primary communication channel between core and adapters.

## Core/Adapter Communication via Event Queues
- **Input Events**: Adapters (e.g., adapter-input-dom) create logical InputEvent objects and push them into an InputQueue.
- **Core Tick**: The core consumes the InputQueue, updates the world, and generates OutputEvents.
- **Output Events**: These describe state changes (e.g., { type: 'EntityLanded' }).
- **Adapters**: Rendering and audio adapters subscribe to the OutputEvent stream. They never read the core world state directly.

## Boundaries
- **Contracts**: Clear DTOs between core and adapters. No THREE.Vector3 in the core.
- **Anti-corruption Layer**: The adapter-three converts between our logical Vec3 and THREE.Vector3.