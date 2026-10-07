'use client';

import React from 'react';
import { PanelLeft, PanelTop } from 'lucide-react';
import { useLayout } from '@/common/contexts/LayoutContext';
import { cn } from '@/common/utils/cn';

interface LayoutToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function LayoutToggle({ className, showLabel = false }: LayoutToggleProps) {
  const { layoutMode, toggleLayoutMode } = useLayout();
  const isSidebar = layoutMode === 'sidebar';

  return (
    <button
      onClick={toggleLayoutMode}
      title={isSidebar ? 'Ganti ke Mode Topbar' : 'Ganti ke Mode Sidebar'}
      aria-label="Toggle layout mode"
      className={cn(
        'group inline-flex items-center gap-2 p-2 rounded-xl border border-white/[0.08] bg-navy-950/80 hover:bg-navy-800 hover:border-accent-blue/40 text-slate-400 hover:text-white transition-all text-xs font-mono',
        className
      )}
    >
      {isSidebar ? (
        <PanelTop className="w-4 h-4 text-accent-blue group-hover:scale-110 transition-transform" />
      ) : (
        <PanelLeft className="w-4 h-4 text-accent-blue group-hover:scale-110 transition-transform" />
      )}
      {showLabel && (
        <span className="hidden sm:inline">
          {isSidebar ? 'Topbar Mode' : 'Sidebar Mode'}
        </span>
      )}
    </button>
  );
}
