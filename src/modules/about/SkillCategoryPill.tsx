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
          ? 'bg-sky-500/20 border border-sky-500/50 text-sky-400'
          : 'bg-slate-900/40 border border-dark-border text-slate-400 hover:text-white hover:border-slate-700'
      )}
    >
      <span>{label}</span>
      <span className="text-[10px] opacity-70">({count})</span>
    </button>
  );
}
