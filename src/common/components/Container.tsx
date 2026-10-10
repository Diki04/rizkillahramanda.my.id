import React from 'react';
import { cn } from '@/common/utils/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({
  children,
  size = 'lg',
  className,
  ...props
}: ContainerProps) {
  const sizeStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl 2xl:max-w-5xl',
    lg: 'max-w-6xl 2xl:max-w-7xl',
    xl: 'max-w-7xl 2xl:max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12',
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
