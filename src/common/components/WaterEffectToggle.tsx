'use client';

import React from 'react';
import { Waves, Droplets } from 'lucide-react';
import { useLayout } from '@/common/contexts/LayoutContext';
import { cn } from '@/common/utils/cn';

interface WaterEffectToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function WaterEffectToggle({ className, showLabel = false }: WaterEffectToggleProps) {
  const { waterEffectMode, cycleWaterEffectMode, activeWaterEffect } = useLayout();

  const getTitle = () => {
    switch (waterEffectMode) {
      case 'auto':
        return `Efek Air: Auto Sync (Sidebar = 2D Ripple, Topbar = 3D Mesh). Mode aktif: ${
          activeWaterEffect === 1 ? 'Pilihan 1 (Ripple)' : 'Pilihan 2 (3D Mesh)'
        }. Klik untuk override manual.`;
      case 'ripple':
        return 'Efek Air: Pilihan 1 (2D Ripple Fisika - Terkunci). Klik untuk ganti ke 3D Mesh.';
      case 'mesh3d':
        return 'Efek Air: Pilihan 2 (Three.js 3D Wave Mesh - Terkunci). Klik untuk kembali ke Auto Sync.';
    }
  };

  const getLabel = () => {
    switch (waterEffectMode) {
      case 'auto':
        return activeWaterEffect === 1 ? 'Auto (Ripple)' : 'Auto (3D Mesh)';
      case 'ripple':
        return '2D Ripple';
      case 'mesh3d':
        return '3D Mesh';
    }
  };

  return (
    <button
      onClick={cycleWaterEffectMode}
      title={getTitle()}
      aria-label="Toggle water animation effect"
      className={cn(
        'group relative inline-flex items-center gap-1.5 p-2 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-950/80 hover:bg-slate-100 dark:hover:bg-navy-800 hover:border-sky-400/50 text-slate-600 dark:text-slate-300 transition-all text-xs font-mono shadow-sm',
        waterEffectMode !== 'auto' && 'border-sky-500/40 text-sky-600 dark:text-sky-300',
        className
      )}
    >
      {activeWaterEffect === 1 ? (
        <Waves className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" />
      ) : (
        <Droplets className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
      )}

      {/* Auto vs Manual indicator dot */}
      {waterEffectMode === 'auto' ? (
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-navy-950 shadow-sm"
          title="Auto Sync Layout Aktif"
        />
      ) : (
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-sky-400 border border-white dark:border-navy-950 shadow-sm animate-pulse"
          title="Manual Mode"
        />
      )}

      {showLabel && <span className="hidden sm:inline font-mono">{getLabel()}</span>}
    </button>
  );
}
