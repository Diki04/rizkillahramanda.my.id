'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from '@/common/components/SpotlightCard';

interface DataPoint {
  x: string;
  y: number;
}

interface TrafficTrendsChartProps {
  data?: {
    pageviews?: DataPoint[];
    sessions?: DataPoint[];
  };
}

export const TrafficTrendsChart = ({ data }: TrafficTrendsChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultPageviews = [
    { x: '2026-05-01T00:00:00Z', y: 142 },
    { x: '2026-06-01T00:00:00Z', y: 285 },
    { x: '2026-07-01T00:00:00Z', y: 420 },
    { x: '2026-08-01T00:00:00Z', y: 630 },
    { x: '2026-09-01T00:00:00Z', y: 890 },
    { x: '2026-10-01T00:00:00Z', y: 1240 },
  ];

  const defaultSessions = [
    { x: '2026-05-01T00:00:00Z', y: 88 },
    { x: '2026-06-01T00:00:00Z', y: 170 },
    { x: '2026-07-01T00:00:00Z', y: 260 },
    { x: '2026-08-01T00:00:00Z', y: 390 },
    { x: '2026-09-01T00:00:00Z', y: 550 },
    { x: '2026-10-01T00:00:00Z', y: 780 },
  ];

  const pageviews = data?.pageviews && data.pageviews.length > 0 ? data.pageviews : defaultPageviews;
  const sessions = data?.sessions && data.sessions.length > 0 ? data.sessions : defaultSessions;

  const maxVal = Math.max(
    ...pageviews.map((p, i) => (p.y || 0) + (sessions[i]?.y || 0)),
    1500
  );

  const formatMonth = (isoDate: string) => {
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString('en-US', { month: 'short' });
    } catch {
      return isoDate;
    }
  };

  const formatFullDate = (isoDate: string) => {
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch {
      return isoDate;
    }
  };

  return (
    <SpotlightCard className="p-6">
      {/* Chart Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Traffic Trends</h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400">Monthly breakdown of visitors and page views</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-slate-400 dark:bg-zinc-600 inline-block" />
            <span className="text-slate-600 dark:text-zinc-400">Sessions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-slate-900 dark:bg-white inline-block" />
            <span className="text-slate-900 dark:text-white font-medium">Page views</span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64 w-full flex items-end gap-2 sm:gap-6 pt-6 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
        {/* Subtle Horizontal gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30 pb-6">
          <div className="w-full border-b border-dashed border-slate-300 dark:border-zinc-700" />
          <div className="w-full border-b border-dashed border-slate-300 dark:border-zinc-700" />
          <div className="w-full border-b border-dashed border-slate-300 dark:border-zinc-700" />
          <div className="w-full border-b border-dashed border-slate-300 dark:border-zinc-700" />
        </div>

        {/* Stacked Bars per Month */}
        {pageviews.map((pv, idx) => {
          const sess = sessions[idx] || { y: 0 };
          const sessHeightPercent = (sess.y / maxVal) * 100;
          const pvHeightPercent = (pv.y / maxVal) * 100;
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={pv.x || idx}
              className="relative flex-1 h-full flex flex-col justify-end items-center group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Floating Tooltip */}
              {isHovered && (
                <div className="absolute -top-16 z-20 bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs rounded-lg py-1.5 px-3 shadow-xl whitespace-nowrap pointer-events-none transition-all">
                  <div className="font-semibold">{formatFullDate(pv.x)}</div>
                  <div className="text-[11px] font-mono flex items-center gap-2 mt-0.5">
                    <span>Sessions: <b>{sess.y}</b></span>
                    <span>Views: <b>{pv.y}</b></span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 bg-slate-900 dark:bg-zinc-100 rotate-45" />
                </div>
              )}

              {/* Stacked Bars Container */}
              <div className="w-full max-w-[48px] flex flex-col justify-end rounded-t-md overflow-hidden transition-all duration-300 group-hover:scale-105">
                {/* Page views top stack */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pvHeightPercent}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="w-full bg-slate-900 dark:bg-white rounded-t-sm"
                />
                {/* Sessions bottom stack */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${sessHeightPercent}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="w-full bg-slate-400 dark:bg-zinc-600 border-t border-white/20 dark:border-black/20"
                />
              </div>

              {/* Month Label */}
              <span className={`text-[11px] font-mono mt-2 transition-colors ${isHovered ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-zinc-400'}`}>
                {formatMonth(pv.x)}
              </span>
            </div>
          );
        })}
      </div>
    </SpotlightCard>
  );
};

export default TrafficTrendsChart;
