import { create } from 'zustand';

export type Mode = 'bounce' | 'gravity';

interface SimState {
  mode: Mode;
  gravity: number;
  speed: number;
  trail: boolean;
  guides: boolean;
  paused: boolean;
  resetCount: number;
  setMode: (mode: Mode) => void;
  setGravity: (gravity: number) => void;
  setSpeed: (speed: number) => void;
  toggleTrail: () => void;
  toggleGuides: () => void;
  togglePause: () => void;
  reset: () => void;
}

export const useSimStore = create<SimState>((set) => ({
  mode: 'bounce',
  gravity: 0,
  speed: 1,
  trail: false,
  guides: true,
  paused: false,
  resetCount: 0,
  setMode: (mode) => set({ mode }),
  setGravity: (gravity) => set({ gravity }),
  setSpeed: (speed) => set({ speed }),
  toggleTrail: () => set((s) => ({ trail: !s.trail })),
  toggleGuides: () => set((s) => ({ guides: !s.guides })),
  togglePause: () => set((s) => ({ paused: !s.paused })),
  reset: () => set((s) => ({ resetCount: s.resetCount + 1, paused: false })),
}));
