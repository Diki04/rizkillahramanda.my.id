'use client';

import React, { useState } from 'react';
import { SpotlightCard } from '@/common/components/SpotlightCard';

export interface PersonalBestRecord {
  wpm: number;
  raw?: number;
  acc?: number;
  consistency?: number;
  timestamp?: number;
}

interface OverviewItemProps {
  data?: Record<string, PersonalBestRecord[]>;
  type: string;
}

export const MonkeytypeOverviewItem = ({ data, type }: OverviewItemProps) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  if (!data || typeof data !== 'object') {
    return null;
  }

  const items = Object.keys(data).map((key) => {
    const list = data[key] || [];
    const best = list.reduce(
      (prev, curr) => (curr.wpm > prev.wpm ? curr : prev),
      list[0] || { wpm: 0, raw: 0, acc: 0, consistency: 0, timestamp: Date.now() }
    );
    return { key, best };
  });

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '';
    try {
      return new Date(timestamp).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <SpotlightCard className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
      {items.map(({ key, best }) => {
        const isHovered = hoveredKey === key;

        return (
          <div
            key={key}
            onMouseEnter={() => setHoveredKey(key)}
            onMouseLeave={() => setHoveredKey(null)}
            className="flex flex-col items-center justify-center h-28 p-2 rounded-lg transition-all duration-200 cursor-pointer hover:bg-slate-100/70 dark:hover:bg-zinc-800/60"
          >
            {isHovered ? (
              <div className="flex flex-col items-center justify-center text-center text-[11px] font-mono leading-tight space-y-0.5 animate-fadeIn">
                <span className="text-slate-400 font-semibold mb-0.5">{key} {type}</span>
                <span className="font-bold text-slate-900 dark:text-white text-xs">{Math.round(best.wpm)} wpm</span>
                <span className="text-slate-500 dark:text-zinc-400">{Math.round(best.raw || best.wpm)} raw</span>
                <span className="text-slate-500 dark:text-zinc-400">{Math.floor(best.acc || 98)}% acc</span>
                <span className="text-slate-500 dark:text-zinc-400">{Math.floor(best.consistency || 80)}% con</span>
                <span className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">{formatDate(best.timestamp)}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                  {key} {type}
                </span>
                <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white my-1">
                  {Math.round(best.wpm)}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                  {Math.floor(best.acc || 98)}%
                </span>
              </div>
            )}
          </div>
        );
      })}
    </SpotlightCard>
  );
};

export default MonkeytypeOverviewItem;
