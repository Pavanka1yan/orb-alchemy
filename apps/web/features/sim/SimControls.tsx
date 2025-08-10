'use client';

import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useSimStore, Mode } from './store';

export function SimControls() {
  const {
    mode,
    setMode,
    gravity,
    setGravity,
    speed,
    setSpeed,
    trail,
    toggleTrail,
    guides,
    toggleGuides,
    paused,
    togglePause,
    reset,
  } = useSimStore();

  return (
    <motion.div
      className="glass p-4 rounded-md flex flex-col gap-2 text-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <label className="flex items-center gap-2">
        Mode
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="bg-neutral-800 rounded"
        >
          <option value="bounce">Bounce</option>
          <option value="gravity">Gravity</option>
        </select>
      </label>
      <label className="flex items-center gap-2">
        Gravity
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={gravity}
          onChange={(e) => setGravity(Number(e.target.value))}
        />
        <span>{gravity.toFixed(0)}</span>
      </label>
      <label className="flex items-center gap-2">
        Speed
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <span>{speed.toFixed(1)}</span>
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={trail} onChange={toggleTrail} /> Trail
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={guides} onChange={toggleGuides} /> Guides
      </label>
      <div className="mt-2 flex gap-2">
        <button
          onClick={togglePause}
          className="flex items-center gap-1 rounded bg-neutral-800 px-2 py-1"
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1 rounded bg-neutral-800 px-2 py-1"
        >
          Reset
        </button>
      </div>
    </motion.div>
  );
}
