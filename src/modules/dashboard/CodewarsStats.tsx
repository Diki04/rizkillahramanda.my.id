import React from 'react';
import { Terminal, Trophy } from 'lucide-react';
import { SpotlightCard } from '../../common/components/SpotlightCard';

export function CodewarsStats() {
  return (
    <SpotlightCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-rose-400" />
          <h3 className="text-base font-semibold text-white">Problem Solving</h3>
        </div>
        <span className="text-xs font-mono text-slate-500">Codewars</span>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950/60 border border-dark-border">
        <div>
          <span className="text-xs text-slate-400 font-mono">Current Rank</span>
          <div className="text-xl font-bold font-mono text-white">4 Kyu</div>
        </div>
        <div className="flex items-center gap-1.5 text-rose-400 text-xs font-mono">
          <Trophy className="w-4 h-4" />
          Top 8%
        </div>
      </div>
    </SpotlightCard>
  );
}
