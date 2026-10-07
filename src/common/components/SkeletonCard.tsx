import React from 'react';
import { cn } from '../utils/cn';

interface SkeletonCardProps {
  className?: string;
  lines?: number;
}

export function SkeletonCard({ className, lines = 3 }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-xl border border-dark-border bg-dark-card/50 animate-pulse space-y-4',
        className
      )}
    >
      <div className="h-4 bg-slate-800 rounded w-2/5" />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-slate-800/60 rounded"
            style={{ width: `${100 - i * 15}%` }}
          />
        ))}
      </div>
      <div className="pt-2 flex gap-2">
        <div className="h-6 w-16 bg-slate-800 rounded-full" />
        <div className="h-6 w-20 bg-slate-800 rounded-full" />
      </div>
    </div>
  );
}
