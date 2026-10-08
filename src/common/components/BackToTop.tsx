'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../utils/cn';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop || window.scrollY;
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = winHeightPx > 0 ? Math.min(100, Math.max(0, (scrollPx / winHeightPx) * 100)) : 0;
      setProgress(scrolled);
      setVisible(scrollPx > 240);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circumference = 2 * Math.PI * 19; // ~119.38
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out',
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-75 pointer-events-none'
      )}
    >
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        title={`Kembali ke atas (${Math.round(progress)}%)`}
        className={cn(
          'relative w-12 h-12 flex items-center justify-center rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 ease-out active:scale-90 group',
          'border-slate-300/80 bg-white/95 text-slate-700 hover:text-black hover:border-black hover:shadow-2xl hover:shadow-black/10',
          'dark:border-white/[0.12] dark:bg-zinc-950/95 dark:text-slate-200 dark:hover:text-white dark:hover:border-white dark:hover:shadow-2xl dark:hover:shadow-white/20'
        )}
      >
        {/* Circular Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 44 44"
        >
          <circle
            cx="22"
            cy="22"
            r="19"
            className="stroke-slate-200/50 dark:stroke-white/[0.06]"
            strokeWidth="2.5"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r="19"
            className="stroke-slate-900 dark:stroke-white transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110 text-slate-900 dark:text-white" />
      </button>
    </div>
  );
}
