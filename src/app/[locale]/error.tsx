'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/common/components/Container';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  useEffect(() => {
    console.error('Unhandled Application Runtime Error:', error);
  }, [error]);

  return (
    <div className="py-24 sm:py-32">
      <Container size="md">
        <SpotlightCard className="p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-navy-950 border border-white/[0.08] text-amber-400">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <p className="font-mono text-sm uppercase tracking-wider text-amber-400 font-semibold">
              Status 500 • Exception Caught
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t('errorOccurred')}
            </h1>
            <p className="text-xs text-slate-400 font-mono max-w-md mx-auto leading-relaxed">
              Terjadi kendala saat memproses permintaan. Anda dapat mencoba memuat ulang komponen.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => reset()}
              variant="secondary"
              size="md"
              className="text-xs font-mono"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              <span>{t('tryAgain')}</span>
            </Button>
            <Link href="/">
              <Button variant="outline" size="md" className="text-xs font-mono">
                <Home className="w-4 h-4 mr-1.5" />
                <span>{t('backToHome')}</span>
              </Button>
            </Link>
          </div>
        </SpotlightCard>
      </Container>
    </div>
  );
}
