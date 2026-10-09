'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import { SpotlightCard } from '@/common/components/SpotlightCard';

interface OverviewItemProps {
  label: string;
  value: number | string;
  unit?: string;
  className?: string;
}

export const OverviewItem = ({ label, value, unit = '', className = '' }: OverviewItemProps) => {
  const isNumber = typeof value === 'number';
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isNumber || !countRef.current) return;
    const node = countRef.current;
    const formatter = new Intl.NumberFormat('id-ID');

    const controls = animate(0, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (latest) => {
        if (node) {
          node.textContent = formatter.format(Math.floor(latest));
        }
      },
    });

    return () => controls.stop();
  }, [value, isNumber]);

  return (
    <SpotlightCard className={`p-4 flex flex-col justify-center items-center text-center transition-all duration-300 ${className}`}>
      <span className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium line-clamp-1">
        {label}
      </span>
      <div className="flex items-baseline justify-center gap-1 mt-1">
        {isNumber ? (
          <span
            ref={countRef}
            className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white"
          >
            {value}
          </span>
        ) : (
          <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {value}
          </span>
        )}
        {unit && (
          <span className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-mono">
            {unit}
          </span>
        )}
      </div>
    </SpotlightCard>
  );
};

export default OverviewItem;
