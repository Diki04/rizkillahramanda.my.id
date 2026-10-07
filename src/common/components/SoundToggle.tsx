'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundEffect } from '../hooks/useSoundEffect';

export function SoundToggle() {
  const [enabled, setEnabled] = useState(true);
  const { playSound } = useSoundEffect();

  const toggleSound = () => {
    const next = !enabled;
    setEnabled(next);
    if (next) {
      playSound('blip');
    }
  };

  return (
    <button
      onClick={toggleSound}
      title={enabled ? 'Sound FX Enabled' : 'Sound FX Muted'}
      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
      aria-label="Toggle Sound"
    >
      {enabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4" />}
    </button>
  );
}
