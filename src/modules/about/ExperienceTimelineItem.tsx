import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { Experience } from '../../services/types';

interface ExperienceTimelineItemProps {
  item: Experience;
}

export function ExperienceTimelineItem({ item }: ExperienceTimelineItemProps) {
  return (
    <div className="relative pl-6 pb-8 border-l border-dark-border last:border-l-0 last:pb-0">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dark-bg border-2 border-sky-400 flex items-center justify-center" />
      <div className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-base font-semibold text-white">{item.role}</h4>
          <span className="inline-flex items-center text-xs font-mono text-slate-500">
            <Calendar className="w-3 h-3 mr-1" />
            {item.period}
          </span>
        </div>
        <p className="text-xs font-mono text-sky-400">{item.company}</p>
        <p className="text-xs text-slate-400 leading-relaxed pt-1">{item.description}</p>
      </div>
    </div>
  );
}
