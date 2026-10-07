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
    blue: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  };

  return (
    <SpotlightCard className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
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
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
            {subtitle && <span>{subtitle}</span>}
            {trend && <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{trend}</span>}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
