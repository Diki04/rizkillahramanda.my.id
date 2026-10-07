'use client';

import { useState, useCallback, MouseEvent } from 'react';

export function useSpotlight() {
  const [coords, setCoords] = useState<{ x: number; y: number; isHovered: boolean }>({
    x: 0,
    y: 0,
    isHovered: false,
  });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setCoords((prev) => ({ ...prev, isHovered: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCoords((prev) => ({ ...prev, isHovered: false }));
  }, []);

  return {
    coords,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
