import type { Ball } from './ball';

export interface CircleBoundary {
  center: { x: number; y: number };
  radius: number;
}

/**
 * Reflect the ball off the boundary if it penetrates the circle.
 */
export function resolveCollision(ball: Ball, boundary: CircleBoundary): void {
  const dx = ball.position.x - boundary.center.x;
  const dy = ball.position.y - boundary.center.y;
  const dist = Math.hypot(dx, dy);

  if (dist + ball.radius <= boundary.radius) return;

  // Normal pointing from boundary center to ball
  const nx = dx / dist;
  const ny = dy / dist;

  // Reflect velocity across normal
  const dot = ball.velocity.x * nx + ball.velocity.y * ny;
  ball.velocity.x -= 2 * dot * nx;
  ball.velocity.y -= 2 * dot * ny;

  // Reposition ball on edge of circle to avoid sinking
  const allowed = boundary.radius - ball.radius;
  ball.position.x = boundary.center.x + nx * allowed;
  ball.position.y = boundary.center.y + ny * allowed;
}
