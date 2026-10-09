'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressProps {
  data: {
    name: string;
    percent?: number;
    text?: string;
  };
}

export const CodingProgress = ({ data }: ProgressProps) => {
  const { name, percent = 0, text = '' } = data;

  return (
    <div className="flex flex-col gap-1.5 py-1">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="font-medium text-slate-800 dark:text-zinc-200">{name}</span>
        <span className="text-slate-500 dark:text-zinc-400">
          {percent.toFixed(1)}% {text ? `(${text})` : ''}
        </span>
      </div>

      <div className="relative h-2.5 w-full rounded-full bg-slate-100 dark:bg-black/60 overflow-hidden border border-slate-200 dark:border-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-slate-700 to-slate-900 dark:from-zinc-500 dark:to-white"
        />
      </div>
    </div>
  );
};

export default CodingProgress;
