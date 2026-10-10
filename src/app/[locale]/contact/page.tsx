import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { SocialLinks } from '@/modules/contact/SocialLinks';
import { ContactForm } from '@/modules/contact/ContactForm';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="w-full flex-1 min-h-[calc(100vh-5rem)] flex flex-col justify-center py-6 sm:py-8 lg:py-12">
      <Container size="xl" className="flex flex-col justify-center flex-1">
        {/* Header */}
        <ScrollReveal className="space-y-3 max-w-3xl mb-6 lg:mb-8">
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
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            {t('subtitle')}
          </p>
        </ScrollReveal>

        {/* Content Grid */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start" delay={0.15}>
          <div className="lg:col-span-5 flex flex-col">
            <SocialLinks />
          </div>
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm />
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
