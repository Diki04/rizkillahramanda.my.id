'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Languages } from 'lucide-react';
import { cn } from '@/common/utils/cn';

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = () => {
    const nextLocale = locale === 'id' ? 'en' : 'id';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Switch language"
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-navy-800/80 hover:bg-navy-700 text-xs font-mono font-medium text-slate-300 hover:text-white transition-all duration-200 active:scale-95',
        className
      )}
    >
      <Languages className="w-3.5 h-3.5 text-accent-blue" />
      <span className="uppercase">{locale}</span>
    </button>
  );
}
