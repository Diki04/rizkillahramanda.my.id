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
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-2.5 text-base gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-navy-800 hover:bg-navy-700 text-slate-100 border border-white/[0.12] hover:border-accent-blue/40 shadow-sm hover:shadow-cyan-500/10',
      secondary:
        'bg-accent-blue text-navy-950 font-semibold hover:bg-sky-400 border border-transparent shadow-sm shadow-accent-blue/20',
      outline:
        'bg-transparent hover:bg-navy-800/80 text-slate-300 hover:text-white border border-white/[0.1] hover:border-white/[0.2]',
      ghost:
        'bg-transparent hover:bg-white/[0.05] text-slate-400 hover:text-slate-200 border-transparent',
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
