'use client';

import { useRef, useCallback } from 'react';
import { Ball } from './engine/ball';
import { CircleBoundary } from './engine/circleBoundary';
import { integrate } from './engine/integrators';
import { useSimLoop } from './hooks/useSimLoop';
import { draw } from './renderers/canvasRenderer';

export function SimCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballRef = useRef<Ball>({
    position: { x: 150, y: 150 },
    velocity: { x: 60, y: 40 },
    radius: 20,
  });

  const boundary: CircleBoundary = {
    center: { x: 150, y: 150 },
    radius: 140,
  };

  const tick = useCallback((dt: number) => {
    const ball = ballRef.current;
    integrate(ball, boundary, dt);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      draw(ctx, ball);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(boundary.center.x, boundary.center.y, boundary.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, []);

  useSimLoop(tick);

  return <canvas ref={canvasRef} width={300} height={300} className="bg-black" />;
}
