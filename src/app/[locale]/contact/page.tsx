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
    <div className="py-16 md:py-20 space-y-12">
      <Container size="xl">
        {/* Header */}
        <ScrollReveal className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/20 bg-sky-400/10 text-sky-600 dark:text-accent-blue text-xs font-mono font-medium">
            <Mail className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">{t('subtitle')}</p>
        </ScrollReveal>

        {/* Content Grid */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4" delay={0.15}>
          <div className="lg:col-span-5">
            <SocialLinks />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
