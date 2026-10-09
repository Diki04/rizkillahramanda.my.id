import React from 'react';
import clsx from 'clsx';

interface SectionHeadingProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

export const SectionHeading = ({ title, icon, className = '' }: SectionHeadingProps) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white',
        className
      )}
    >
      {icon && <span className="text-slate-900 dark:text-white flex items-center justify-center">{icon}</span>}
      <h2 className="tracking-tight">{title}</h2>
    </div>
  );
};

export default SectionHeading;
