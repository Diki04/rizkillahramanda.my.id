import React from 'react';
import { cn } from '@/common/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/50 dark:focus:ring-white/40 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] shadow-xs hover:shadow-sm cursor-pointer';

    const sizeStyles = {
      sm: 'h-9 px-3.5 text-xs gap-1.5 rounded-lg',
      md: 'h-11 px-5 text-sm gap-2 rounded-xl',
      lg: 'h-12 px-7 text-base gap-2.5 rounded-xl',
    };

    const variantStyles = {
      primary:
        'bg-slate-900 dark:bg-white text-white dark:text-black font-semibold hover:bg-slate-800 dark:hover:bg-zinc-200 border border-slate-900 dark:border-white shadow-sm',
      secondary:
        'bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-300 dark:border-white/10 shadow-sm',
      outline:
        'bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/15',
      ghost:
        'bg-transparent hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border-transparent',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
