'use client';

import React from 'react';
import { Briefcase, Award } from 'lucide-react';
import { cn } from '../../common/utils/cn';

interface AdminTabNavProps {
  activeTab: 'projects' | 'achievements';
  onChange: (tab: 'projects' | 'achievements') => void;
}

export function AdminTabNav({ activeTab, onChange }: AdminTabNavProps) {
  return (
    <div className="flex border-b border-dark-border mb-8">
      <button
        onClick={() => onChange('projects')}
        className={cn(
          'flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-colors',
          activeTab === 'projects'
            ? 'border-sky-400 text-sky-400'
            : 'border-transparent text-slate-400 hover:text-slate-200'
        )}
      >
        <Briefcase className="w-4 h-4" />
        Projects
      </button>
      <button
        onClick={() => onChange('achievements')}
        className={cn(
          'flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-colors',
          activeTab === 'achievements'
            ? 'border-sky-400 text-sky-400'
            : 'border-transparent text-slate-400 hover:text-slate-200'
        )}
      >
        <Award className="w-4 h-4" />
        Certificates
      </button>
    </div>
  );
}
