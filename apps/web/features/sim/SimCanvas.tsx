'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useSimStore } from './store';
import { Ball } from './engine/ball';
import { CircleBoundary } from './engine/circleBoundary';
import { integrate } from './engine/integrators';
import { useSimLoop } from './hooks/useSimLoop';
import { draw } from './renderers/canvasRenderer';

export function SimCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialBall: Ball = {
    position: { x: 150, y: 150 },
    velocity: { x: 60, y: 40 },
    radius: 20,
  };
  const ballRef = useRef<Ball>({ ...initialBall });

  const boundary: CircleBoundary = {
    center: { x: 150, y: 150 },
    radius: 140,
  };

  const { gravity, speed, trail, guides, paused, resetCount } = useSimStore();

  useEffect(() => {
    ballRef.current = { ...initialBall };
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, [resetCount]);

  const tick = useCallback(
    (dt: number) => {
      if (paused) return;
      dt *= speed;
      const ball = ballRef.current;
      ball.velocity.y += gravity * dt;
      integrate(ball, boundary, dt);
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        if (!trail) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        draw(ctx, ball);
        if (guides) {
          ctx.save();
          if (trail) ctx.globalCompositeOperation = 'destination-over';
          ctx.strokeStyle = 'rgba(255,255,255,0.2)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(boundary.center.x, boundary.center.y, boundary.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }
    },
    [gravity, speed, trail, guides, paused]
  );

  useSimLoop(tick);

  return <canvas ref={canvasRef} width={300} height={300} className="bg-black" />;
}
