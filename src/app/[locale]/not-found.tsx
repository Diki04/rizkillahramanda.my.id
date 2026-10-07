import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/common/components/Container';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { Terminal, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const t = useTranslations('common');

  return (
    <div className="py-24 sm:py-32">
      <Container size="md">
        <SpotlightCard className="p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-navy-950 border border-white/[0.08] text-accent-blue">
            <Terminal className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <p className="font-mono text-sm uppercase tracking-wider text-accent-blue font-semibold">
              Error 404 • Resource Missing
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t('pageNotFound')}
            </h1>
            <p className="text-sm text-slate-400 font-mono max-w-md mx-auto leading-relaxed">
              Halaman atau rute yang Anda tuju tidak ditemukan atau telah dipindahkan ke direktori lain.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <Link href="/">
              <Button variant="secondary" size="md" className="text-xs font-mono">
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
