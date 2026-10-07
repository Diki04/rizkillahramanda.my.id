'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../utils/cn';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setVisible(window.scrollY > 300 || document.documentElement.scrollTop > 300);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    // Also check on interval initially
    checkScroll();

    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Kembali ke atas"
      className={cn(
        'fixed bottom-6 right-6 z-50 p-3 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 ease-out active:scale-95 group',
        'border-slate-300 bg-white/90 text-slate-700 hover:text-sky-500 hover:border-sky-400 hover:shadow-sky-500/20',
        'dark:border-white/[0.12] dark:bg-navy-900/90 dark:text-slate-200 dark:hover:text-sky-300 dark:hover:border-sky-400 dark:hover:shadow-cyan-950/40',
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-75 pointer-events-none'
      )}
    >
      <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
