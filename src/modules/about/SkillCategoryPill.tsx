import React from 'react';
import { cn } from '../../common/utils/cn';

interface SkillCategoryPillProps {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}

export function SkillCategoryPill({ active, label, count, onClick }: SkillCategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5',
        active
          ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-semibold border border-slate-900 dark:border-white'
          : 'bg-white/5 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/30'
      )}
    >
      <span>{label}</span>
      <span className="text-[10px] opacity-70">({count})</span>
    </button>
  );
}
