import { useEffect, useRef } from 'react';

export function useSimLoop(callback: (dt: number) => void) {
  const last = useRef<number | undefined>(undefined);

  useEffect(() => {
    let frame: number;
    const loop = (time: number) => {
      if (last.current === undefined) last.current = time;
      const dt = (time - last.current) / 1000;
      last.current = time;
      callback(dt);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [callback]);
}
