import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { SocialLinks } from '@/modules/contact/SocialLinks';
import { ContactForm } from '@/modules/contact/ContactForm';
import { Mail, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="w-full flex-1 min-h-[calc(100vh-5rem)] py-8 sm:py-12 lg:py-16">
      <Container size="xl" className="max-w-5xl 2xl:max-w-6xl w-full mx-auto space-y-12 sm:space-y-16">
        {/* Header Section */}
        <ScrollReveal className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white text-xs font-mono font-medium shadow-xs">
              <Mail className="w-3.5 h-3.5" />
              <span>{t('badge')}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open to Opportunities</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-mono">
            {t('subtitle')}
          </p>
        </ScrollReveal>

        {/* Section 1: Temukan Saya di Media Sosial (Fullscreen Bento Grid) */}
        <ScrollReveal className="space-y-5" delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-dashed border-slate-300 dark:border-white/10">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t('socialMediaTitle')}
            </h2>
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-400">
              {t('socialMediaSubtitle')}
            </p>
          </div>

          <SocialLinks />
        </ScrollReveal>

        {/* Section 2: Form Kirim Pesan Langsung */}
        <ScrollReveal className="space-y-6 pt-4" delay={0.2}>
          <div className="flex items-center gap-2 pb-3 border-b border-dashed border-slate-300 dark:border-white/10">
            <MessageSquare className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t('orMessage')}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            <ContactForm />
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
