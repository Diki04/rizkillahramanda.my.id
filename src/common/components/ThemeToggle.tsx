'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/common/contexts/ThemeContext';
import { cn } from '@/common/utils/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light/dark theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={cn(
        'p-2 rounded-lg border transition-all duration-200 active:scale-95',
        'border-slate-200 bg-white/80 hover:bg-slate-100 text-slate-700 shadow-sm',
        'dark:border-white/[0.08] dark:bg-navy-800/80 dark:hover:bg-navy-700 dark:text-slate-300 dark:hover:text-white',
        className
      )}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-sky-600 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
