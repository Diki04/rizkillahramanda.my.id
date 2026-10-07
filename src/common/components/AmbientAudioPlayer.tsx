'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { cn } from '@/common/utils/cn';

export function AmbientAudioPlayer({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const startAmbient = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.connect(ctx.destination);
      gainNodeRef.current = gain;

      // Soft low harmonic drone
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 note
      osc1.connect(gain);
      osc1.start();
      osc1Ref.current = osc1;

      // Binaural soothing pulse
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(114, ctx.currentTime); // 4Hz theta wave beat
      osc2.connect(gain);
      osc2.start();
      osc2Ref.current = osc2;

      setIsPlaying(true);
    } catch {
      // Audio autoplay restrictions
    }
  };

  const stopAmbient = () => {
    if (osc1Ref.current) {
      try { osc1Ref.current.stop(); } catch {}
      osc1Ref.current = null;
    }
    if (osc2Ref.current) {
      try { osc2Ref.current.stop(); } catch {}
      osc2Ref.current = null;
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch {}
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbient();
    } else {
      startAmbient();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbient();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? 'Hentikan Lo-Fi Focus Drone' : 'Putar Lo-Fi Focus Drone'}
      aria-label="Toggle ambient focus sound"
      className={cn(
        'group flex items-center gap-2 p-2 rounded-xl border border-white/[0.08] bg-navy-950/80 hover:bg-navy-800 hover:border-accent-blue/40 text-slate-400 hover:text-white transition-all text-xs font-mono',
        isPlaying && 'border-accent-blue/40 bg-navy-900/90 text-accent-blue',
        className
      )}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-accent-blue" />
          <div className="flex items-end gap-[2px] h-3 w-4">
            <span className="w-[2px] bg-accent-blue rounded-full h-full animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-[2px] bg-accent-blue rounded-full h-2/3 animate-[pulse_0.5s_ease-in-out_infinite]" />
            <span className="w-[2px] bg-accent-blue rounded-full h-4/5 animate-[pulse_0.7s_ease-in-out_infinite]" />
          </div>
        </>
      ) : (
        <>
          <Music className="w-4 h-4 text-slate-400 group-hover:text-accent-blue transition-colors" />
        </>
      )}
    </button>
  );
}
