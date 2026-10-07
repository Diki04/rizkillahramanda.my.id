'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/common/components/Container';
import { Button } from '@/common/components/Button';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { TypewriterText } from '@/common/components/TypewriterText';
import { RotatingText } from '@/common/components/RotatingText';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { mockProfile } from '@/services/data/mock-profile';
import {
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
  GraduationCap,
  ChevronDown,
  Terminal,
} from 'lucide-react';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isEn = locale === 'en';

  const roles = isEn
    ? [
        'Software Engineer',
        'Machine Learning Researcher',
        'Next.js & TypeScript Architect',
        'Informatics Undergrad @ UNRI',
      ]
    : [
        'Software Engineer',
        'Peneliti Machine Learning',
        'Arsitek Next.js & TypeScript',
        'Mahasiswa Teknik Informatika @ UNRI',
      ];

  return (
    <ScrollReveal
      id="hero"
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center py-12 md:py-16 overflow-hidden"
    >
      {/* Dynamic Background Floating Neon Orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full bg-sky-500/10 dark:bg-sky-400/10 blur-[100px] animate-pulse" />
      <div
        className="pointer-events-none absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full bg-blue-500/10 dark:bg-cyan-500/10 blur-[120px] animate-pulse"
        style={{ animationDelay: '1.8s' }}
      />

      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('status')}</span>
            </div>

            {/* Main Greeting & Name with DecryptedText */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sky-600 dark:text-accent-blue font-mono text-sm tracking-wide font-semibold">
                <Terminal className="w-4 h-4" />
                <span>{t('greeting')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                <TypewriterText
                  words={[
                    mockProfile.name,
                    'Rizkillah Ramanda',
                    'Rizkillah R. Sinyo',
                  ]}
                  typingSpeed={80}
                  deletingSpeed={45}
                  pauseDuration={2400}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-sky-600 to-blue-600 dark:from-white dark:via-sky-200 dark:to-sky-400"
                />
              </h1>

              {/* Dynamic Rotating Role */}
              <div className="text-xl sm:text-2xl font-bold font-mono text-sky-600 dark:text-sky-400">
                <RotatingText texts={roles} interval={3400} />
              </div>

              {/* Badges / University & Location */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-sm text-slate-500 dark:text-slate-400 font-mono">
                <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                  <GraduationCap className="w-4 h-4 text-sky-500" />
                  {mockProfile.university}
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {mockProfile.location}
                </span>
              </div>
            </div>

            {/* Summary Bio */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {isEn ? mockProfile.headline.en : mockProfile.headline.id}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/projects">
                <Button variant="secondary" size="md">
                  <span>{t('viewProjects')}</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="md">
                  <span>{t('contactMe')}</span>
                  <Mail className="w-4 h-4 ml-1.5 text-slate-500 dark:text-slate-400" />
                </Button>
              </Link>
              <a
                href={mockProfile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="md" className="border border-slate-200 dark:border-white/[0.08]">
                  <Github className="w-4 h-4 mr-2" />
                  <span>GitHub</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative group">
            {/* Ambient Background Aura */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-blue-600/20 to-emerald-400/20 blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none" />

            <SpotlightCard className="relative w-full max-w-sm p-6 space-y-6 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-sky-500/15">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-navy-950/80">
                <Image
                  src={mockProfile.avatar}
                  alt={mockProfile.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-navy-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-navy-950/90 border border-slate-200 dark:border-white/[0.1] text-sky-600 dark:text-accent-blue font-semibold shadow-sm">
                    @{mockProfile.nickname}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-navy-950/90 border border-slate-200 dark:border-white/[0.1] text-emerald-600 dark:text-emerald-400 font-semibold shadow-sm">
                    Active Dev
                  </span>
                </div>
              </div>

              {/* Quick Metrics Inside Hero Card */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-200 dark:border-white/[0.06]">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-navy-950/40 border border-slate-200/60 dark:border-transparent">
                  <p className="font-mono text-lg font-bold text-slate-900 dark:text-white">49</p>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Repos</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-navy-950/40 border border-slate-200/60 dark:border-transparent">
                  <p className="font-mono text-lg font-bold text-sky-600 dark:text-accent-blue">24+</p>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Projects</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-navy-950/40 border border-slate-200/60 dark:border-transparent">
                  <p className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">2+ Yrs</p>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Experience</p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Scroll Down Hint */}
        <div className="pt-12 flex justify-center">
          <a
            href="#tech-stack"
            className="group flex flex-col items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400" />
          </a>
        </div>
      </Container>
    </ScrollReveal>
  );
}
