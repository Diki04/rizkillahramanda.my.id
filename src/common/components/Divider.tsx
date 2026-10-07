import React from 'react';
import { cn } from '../utils/cn';

interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <hr className={cn('border-t border-dark-border my-8', className)} />;
  }

  return (
    <div className={cn('relative my-8', className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-dark-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase font-mono tracking-wider">
        <span className="bg-dark-bg px-3 text-slate-500">{label}</span>
      </div>
    </div>
  );
}
