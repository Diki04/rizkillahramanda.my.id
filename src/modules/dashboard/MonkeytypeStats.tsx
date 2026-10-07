import React from 'react';
import { Keyboard, Zap, Award } from 'lucide-react';
import { SpotlightCard } from '../../common/components/SpotlightCard';

export function MonkeytypeStats() {
  return (
    <SpotlightCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Typing Metrics</h3>
        </div>
        <span className="text-xs font-mono text-slate-500">Monkeytype</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Top Speed
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            104 <span className="text-xs font-normal text-slate-500">WPM</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Accuracy
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            98.5 <span className="text-xs font-normal text-slate-500">%</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
