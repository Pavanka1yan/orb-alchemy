export interface Vec2 {
  x: number;
  y: number;
}

export interface Ball {
  position: Vec2;
  velocity: Vec2;
  radius: number;
}

/**
 * Advances the ball's position using its velocity and delta time.
 */
export function step(ball: Ball, dt: number): void {
  ball.position.x += ball.velocity.x * dt;
  ball.position.y += ball.velocity.y * dt;
}
