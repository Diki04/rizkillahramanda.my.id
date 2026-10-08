import React from 'react';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/common/utils/cn';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  color?: 'blue' | 'emerald' | 'amber' | 'purple';
}

export function MetricsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
}: MetricsCardProps) {
  const colorStyles = {
    blue: 'text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/20',
    emerald: 'text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/20',
    amber: 'text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/20',
    purple: 'text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/20',
  };

  return (
    <SpotlightCard className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={cn('p-2 rounded-lg border', colorStyles[color])}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-4">
        <p className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </p>
        {(subtitle || trend) && (
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400 mt-1">
            {subtitle && <span>{subtitle}</span>}
            {trend && <span className="text-slate-900 dark:text-zinc-200 font-semibold">{trend}</span>}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
