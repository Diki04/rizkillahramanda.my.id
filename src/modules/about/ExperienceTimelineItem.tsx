import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { Experience } from '../../services/types';

interface ExperienceTimelineItemProps {
  item: Experience;
}

export function ExperienceTimelineItem({ item }: ExperienceTimelineItemProps) {
  return (
    <div className="relative pl-6 pb-8 border-l border-slate-200 dark:border-white/10 last:border-l-0 last:pb-0">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-slate-900 dark:border-white flex items-center justify-center" />
      <div className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-base font-semibold text-slate-900 dark:text-white">{item.role}</h4>
          <span className="inline-flex items-center text-xs font-mono text-slate-500 dark:text-zinc-400">
            <Calendar className="w-3 h-3 mr-1" />
            {item.period}
          </span>
        </div>
        <p className="text-xs font-mono text-slate-700 dark:text-zinc-300 font-medium">{item.company}</p>
        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed pt-1">{item.description}</p>
      </div>
    </div>
  );
}
