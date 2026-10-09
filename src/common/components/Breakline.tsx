import React from 'react';
import clsx from 'clsx';

interface BreaklineProps {
  className?: string;
  [propName: string]: any;
}

export const Breakline = ({ className = '', ...others }: BreaklineProps) => {
  return (
    <div
      className={clsx('my-8 border-t border-slate-200 dark:border-white/10', className)}
      {...others}
    />
  );
};

export default Breakline;
