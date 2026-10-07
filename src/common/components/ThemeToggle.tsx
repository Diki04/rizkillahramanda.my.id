'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/common/utils/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    // Check saved theme or default to dark
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        'p-2 rounded-lg border border-white/[0.08] bg-navy-800/80 hover:bg-navy-700 text-slate-300 hover:text-white transition-all duration-200 active:scale-95',
        className
      )}
    >
      {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-sky-400" />}
    </button>
  );
}
