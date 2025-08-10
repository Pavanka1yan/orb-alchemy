import { describe, it, expect } from 'vitest';
import { resolveCollision, CircleBoundary } from '../circleBoundary';
import { Ball } from '../ball';

describe('resolveCollision', () => {
  it('reflects velocity across normal when ball overlaps boundary', () => {
    const boundary: CircleBoundary = { center: { x: 0, y: 0 }, radius: 2 };
    const ball: Ball = {
      position: { x: 1.5, y: 0 },
      velocity: { x: 1, y: 0 },
      radius: 1,
    };

    resolveCollision(ball, boundary);

    expect(ball.velocity.x).toBeCloseTo(-1);
    expect(ball.velocity.y).toBeCloseTo(0);
    expect(ball.position.x).toBeCloseTo(1);
    expect(ball.position.y).toBeCloseTo(0);
  });
});
