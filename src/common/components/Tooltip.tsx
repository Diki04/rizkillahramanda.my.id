'use client';

import React, { useState } from 'react';
import { cn } from '../utils/cn';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/2 z-50 px-2 py-1 text-[11px] font-mono text-white bg-slate-900 border border-dark-border rounded shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-150',
            position === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
