import { describe, it, expect } from 'vitest';
import { helloCore } from '../src/index';

describe('helloCore', () => {
  it('returns readiness text', () => {
    expect(helloCore()).toBe('core-ready');
  });
});
