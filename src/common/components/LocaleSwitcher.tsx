'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Languages, Loader2 } from 'lucide-react';
import { cn } from '@/common/utils/cn';

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const nextLocale = locale === 'id' ? 'en' : 'id';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      aria-label="Switch language"
      title={locale === 'id' ? 'Ganti ke Bahasa Inggris' : 'Switch to Indonesian'}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all duration-200 active:scale-95',
        'border-slate-200 bg-white/80 hover:bg-slate-100 text-slate-700 shadow-sm',
        'dark:border-white/[0.08] dark:bg-navy-800/80 dark:hover:bg-navy-700 dark:text-slate-300 dark:hover:text-white',
        isPending && 'opacity-60 cursor-wait',
        className
      )}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 text-sky-500 animate-spin" />
      ) : (
        <Languages className="w-3.5 h-3.5 text-sky-500" />
      )}
      <span className="uppercase font-semibold">{locale}</span>
    </button>
  );
}
