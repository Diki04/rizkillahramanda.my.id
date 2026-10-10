'use client';

import React from 'react';
import {
  MagicBento,
  type BentoProps,
  type BentoCardProps,
} from '@/common/components/reactbits/MagicBento';
import { cn } from '@/common/utils/cn';
import { Sparkles } from 'lucide-react';

export interface MagicBentoSectionProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  bentoProps?: BentoProps;
  cards?: BentoCardProps[];
}

export function MagicBentoSection({
  id = 'magic-bento',
  className = '',
  title = 'System Architecture & Engineering Highlights',
  subtitle = 'High-throughput fullstack architecture, agentic AI workflows, and strict quality engineering metrics rendered in an interactive 3D grid.',
  badge = 'Engineering Matrix',
  bentoProps,
  cards,
}: MagicBentoSectionProps) {
  return React.createElement(
    'section',
    {
      id,
      'aria-label': title,
      className: cn(
        'relative min-h-[calc(100vh-5rem)] flex flex-col justify-center py-16 sm:py-20 lg:py-24 border-t border-slate-300 dark:border-white/[0.08] bg-slate-100/60 dark:bg-black text-slate-950 dark:text-white overflow-hidden',
        className
      ),
    },
    React.createElement('div', {
      className:
        'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(67,75,206,0.06),transparent)] dark:bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.06),transparent)]',
      'aria-hidden': 'true',
    }),
    React.createElement(
      'div',
      {
        className: 'w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10 flex flex-col gap-8 sm:gap-10',
      },
      React.createElement(
        'div',
        { className: 'flex flex-col items-start max-w-3xl' },
        React.createElement(
          'div',
          {
            className:
              'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 dark:border-white/10 bg-white/95 dark:bg-white/5 text-slate-950 dark:text-zinc-200 text-xs font-mono font-bold mb-3 shadow-xs',
          },
          React.createElement(Sparkles, { className: 'w-3.5 h-3.5 text-slate-800 dark:text-zinc-300' }),
          React.createElement('span', null, badge)
        ),
        React.createElement(
          'h2',
          {
            className:
              'text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight',
          },
          title
        ),
        React.createElement(
          'p',
          {
            className:
              'mt-2 text-sm sm:text-base text-slate-950 dark:text-zinc-200 leading-relaxed font-semibold max-w-2xl',
          },
          subtitle
        )
      ),
      React.createElement(
        'div',
        { className: 'w-full' },
        React.createElement(MagicBento, { cards, ...bentoProps })
      )
    )
  );
}

export default MagicBentoSection;
