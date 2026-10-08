'use client';

import React from 'react';
import { useSpotlight } from '@/common/hooks/useSpotlight';
import { cn } from '@/common/utils/cn';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  [key: `data-${string}`]: unknown;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(255, 255, 255, 0.14)',
  ...props
}: SpotlightCardProps) {
  const { coords, handleMouseMove, handleMouseEnter, handleMouseLeave } = useSpotlight();

  return React.createElement(
    'div',
    {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      className: cn(
        'group relative rounded-xl border border-slate-300 dark:border-white/10 bg-white/95 dark:bg-zinc-950/80 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-slate-400 dark:hover:border-white/20 hover:shadow-lg hover:shadow-slate-300/40 dark:hover:shadow-white/5',
        className
      ),
      ...props,
    },
    // Outer border & surface illumination
    React.createElement('div', {
      className:
        'pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10',
      style: {
        background: coords.isHovered
          ? `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 70%)`
          : 'none',
      },
    }),
    // Subtle inner ambient reflection
    React.createElement('div', {
      className:
        'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0',
      style: {
        background: coords.isHovered
          ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.04), transparent 80%)`
          : 'none',
      },
    }),
    // Content wrapper
    React.createElement('div', { className: 'relative z-20 h-full' }, children)
  );
}

export default SpotlightCard;
