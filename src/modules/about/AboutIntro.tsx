import React from 'react';
import { useTranslations } from 'next-intl';
import { AuthorSignature } from './AuthorSignature';

export function AboutIntro() {
  const t = useTranslations('about');

  return React.createElement(
    'section',
    {
      className:
        'w-full rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 bg-white/95 backdrop-blur-xl border border-slate-300/90 shadow-xl shadow-slate-900/5 dark:bg-transparent dark:border-transparent dark:shadow-none dark:backdrop-blur-none dark:p-0',
    },
    React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        { className: 'text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white' },
        t('title')
      ),
      React.createElement(
        'p',
        { className: 'text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-2 font-normal' },
        t('subtitle')
      )
    ),
    React.createElement('div', {
      className: 'border-t border-dashed border-slate-300 dark:border-zinc-800 my-6 sm:my-8',
    }),
    React.createElement(
      'div',
      {
        className:
          'space-y-5 sm:space-y-6 text-sm sm:text-base text-slate-800 dark:text-zinc-300 leading-relaxed font-normal',
      },
      React.createElement('p', null, t('introP1')),
      React.createElement('p', null, t('introP2')),
      React.createElement('p', null, t('introP3'))
    ),
    React.createElement(
      'div',
      { className: 'mt-8 flex flex-col items-start gap-2' },
      React.createElement(
        'p',
        { className: 'text-sm sm:text-base text-slate-800 dark:text-zinc-300 font-medium' },
        t('closing')
      ),
      React.createElement(AuthorSignature, { name: t('signatureName') })
    )
  );
}
