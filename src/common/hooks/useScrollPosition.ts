'use client';

import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : currentScrollY < lastScrollY ? 'up' : null;
      setScrollPosition({
        x: window.scrollX,
        y: currentScrollY,
        direction,
      });
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}
