'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { GlideSelect, type GlideSelectOption } from '@/common/components/reactbits';
import { useTheme } from '@/common/contexts/ThemeContext';
import { cn } from '@/common/utils/cn';

const options: GlideSelectOption[] = [
  { value: 'id', label: 'ID' },
  { value: 'en', label: 'EN' },
];

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();

  const isDark = theme !== 'light';

  const handleSelect = (newLocale: string) => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale as 'id' | 'en' });
    });
  };

  return (
    <GlideSelect
      options={options}
      value={locale}
      onChange={handleSelect}
      disabled={isPending}
      size="sm"
      surfaceColor={isDark ? '#09090b' : '#f1f5f9'}
      highlightColor={isDark ? '#27272a' : '#ffffff'}
      accentColor={isDark ? '#ffffff' : '#0f172a'}
      textColor={isDark ? '#ffffff' : '#0f172a'}
      ariaLabel="Switch language"
      className={cn('w-[78px] min-w-[78px] border-slate-200 dark:border-white/10', className)}
    />
  );
}
