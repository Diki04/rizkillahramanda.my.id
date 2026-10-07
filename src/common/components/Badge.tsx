import React from 'react';
import { cn } from '@/common/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline' | 'success';
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  children,
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-navy-800 text-slate-300 border-white/[0.06]',
    accent: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
    outline: 'bg-transparent text-slate-400 border-white/[0.1]',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border tracking-wide transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
