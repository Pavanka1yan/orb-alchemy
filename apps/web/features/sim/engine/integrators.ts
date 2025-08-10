import type { Ball } from './ball';
import type { CircleBoundary } from './circleBoundary';
import { step } from './ball';
import { resolveCollision } from './circleBoundary';

/**
 * Advances the ball and resolves collision against a single boundary.
 */
export function integrate(ball: Ball, boundary: CircleBoundary, dt: number): void {
  step(ball, dt);
  resolveCollision(ball, boundary);
}
