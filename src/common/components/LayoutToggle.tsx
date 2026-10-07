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
        'group inline-flex items-center gap-2 p-2 rounded-lg border text-xs font-mono transition-all duration-200 active:scale-95',
        'border-slate-200 bg-white/80 hover:bg-slate-100 text-slate-700 shadow-sm',
        'dark:border-white/[0.08] dark:bg-navy-800/80 dark:hover:bg-navy-700 dark:text-slate-300 dark:hover:text-white',
        className
      )}
    >
      {isSidebar ? (
        <PanelTop className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" />
      ) : (
        <PanelLeft className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" />
      )}
      {showLabel && (
        <span className="hidden sm:inline font-semibold">
          {isSidebar ? 'Topbar Mode' : 'Sidebar Mode'}
        </span>
      )}
    </button>
  );
}
