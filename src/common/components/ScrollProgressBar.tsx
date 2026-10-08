'use client';

import React, { useState, useEffect } from 'react';

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight === 0) return;
      const scrollVal = (totalScroll / windowHeight) * 100;
      setProgress(scrollVal);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-zinc-500 via-zinc-200 to-white shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
