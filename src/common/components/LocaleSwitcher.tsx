'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { GlideSelect, type GlideSelectOption } from '@/common/components/reactbits';
import { cn } from '@/common/utils/cn';

const options: GlideSelectOption[] = [
  { value: 'id', label: 'ID' },
  { value: 'en', label: 'EN' },
];

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

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
      surfaceColor="#09090b"
      highlightColor="#27272a"
      accentColor="#ffffff"
      textColor="#ffffff"
      ariaLabel="Switch language"
      className={cn('w-[78px] min-w-[78px]', className)}
    />
  );
}
