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
    default: 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-white/[0.08]',
    accent: 'bg-slate-900 text-white dark:bg-white dark:text-black border-slate-900 dark:border-white font-semibold',
    outline: 'bg-transparent text-slate-600 dark:text-zinc-400 border-slate-300 dark:border-white/[0.12]',
    success: 'bg-white/10 text-white border-white/20',
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
