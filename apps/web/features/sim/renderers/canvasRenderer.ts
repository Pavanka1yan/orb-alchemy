import type { Ball } from '../engine/ball';

export function draw(ctx: CanvasRenderingContext2D, ball: Ball) {
  const { position, radius } = ball;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
  ctx.fill();
}
