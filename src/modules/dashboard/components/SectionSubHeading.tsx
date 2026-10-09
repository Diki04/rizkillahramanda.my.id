import React from 'react';
import clsx from 'clsx';

interface SectionSubHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionSubHeading = ({ children, className = '' }: SectionSubHeadingProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mb-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionSubHeading;
