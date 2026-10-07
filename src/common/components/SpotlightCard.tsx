'use client';

import React from 'react';
import { useSpotlight } from '@/common/hooks/useSpotlight';
import { cn } from '@/common/utils/cn';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(56, 189, 248, 0.18)',
  ...props
}: SpotlightCardProps) {
  const { coords, handleMouseMove, handleMouseEnter, handleMouseLeave } = useSpotlight();

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative rounded-xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-navy-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/[0.18] hover:shadow-lg hover:shadow-cyan-950/20',
        className
      )}
      {...props}
    >
      {/* Outer border & surface illumination */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: coords.isHovered
            ? `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 70%)`
            : 'none',
        }}
      />

      {/* Subtle inner ambient reflection */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{
          background: coords.isHovered
            ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(56, 189, 248, 0.05), transparent 80%)`
            : 'none',
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
