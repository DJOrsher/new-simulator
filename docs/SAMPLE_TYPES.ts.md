# Code Examples: TypeScript Core Types

```ts
// packages/core/src/math/vec.ts
export interface Vec3 { x: number; y: number; z: number }
export interface Quat { x: number; y: number; z: number; w: number }

// packages/core/src/ecs/entity.ts
export type EntityId = number
export interface Transform { position: Vec3; orientation: Quat }
export interface Kinematics { velocity: Vec3; angularVelocity: Vec3 }
```