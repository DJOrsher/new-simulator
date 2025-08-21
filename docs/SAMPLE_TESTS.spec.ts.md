# Code Examples: Vitest Tests

```ts
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
```