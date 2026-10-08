'use client';

import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { Link } from '@/i18n/routing';
import { Container } from '@/common/components/Container';
import { Button } from '@/common/components/Button';
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

const Lanyard = dynamic(
  () => import('@/common/components/Lanyard'),
  {
    ssr: false,
    loading: () => null,
  }
);

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
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center py-12 md:py-16 overflow-x-clip"
    >
      {/* Layer 0 (Paling belakang): Immersive Blue & Cyan Neon Glow piercing through top */}
      {/* 1. Giant luminous Sky-Blue Corona piercing through the upper edge behind the lanyard */}
      <div
        className="pointer-events-none absolute -top-48 md:-top-64 right-[-10%] sm:right-[-5%] lg:right-[5%] w-[600px] sm:w-[850px] lg:w-[1000px] h-[950px] rounded-full bg-gradient-to-b from-sky-400/35 via-blue-600/30 to-transparent blur-[140px] z-0 animate-pulse"
        style={{ animationDuration: '6s' }}
      />
      {/* 2. Focused vibrant cyan backlight behind strap top entry point */}
      <div className="pointer-events-none absolute -top-36 right-[8%] sm:right-[18%] lg:right-[22%] w-80 sm:w-96 h-[480px] rounded-full bg-cyan-400/35 dark:bg-sky-400/40 blur-[100px] z-0" />
      {/* 3. Ambient blue halo centered behind the 3D card resting zone */}
      <div
        className="pointer-events-none absolute top-1/4 right-[5%] sm:right-[12%] lg:right-[15%] w-[480px] sm:w-[580px] h-[580px] rounded-full bg-blue-600/25 dark:bg-cyan-500/30 blur-[120px] z-0 animate-pulse"
        style={{ animationDuration: '8s', animationDelay: '1.5s' }}
      />
      {/* 4. Left accent glow behind headline */}
      <div className="pointer-events-none absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-sky-500/20 dark:bg-sky-400/20 blur-[120px] animate-pulse z-0" />
      {/* 5. Sub-gradient backdrop layer */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-blue-600/20 to-emerald-400/15 blur-3xl opacity-60 z-0" />

      {/* Layer 1 (Tengah): 3D Lanyard ID Badge - Spans full hero without bounds, BEHIND text and IN FRONT of background */}
      <div className="absolute -top-16 md:-top-24 inset-x-0 bottom-0 z-[5] pointer-events-none">
        <Lanyard position={[0, 0, 20]} fov={24} />
      </div>

      {/* Layer 2 (Paling depan): Foreground Typography & Controls */}
      <Container size="xl" className="relative z-10 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 pointer-events-none">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium shadow-sm pointer-events-auto">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('status')}</span>
            </div>

            {/* Main Greeting & Name with Typewriter */}
            <div className="space-y-3 pointer-events-none select-none">
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
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed pointer-events-none select-none">
              {isEn ? mockProfile.headline.en : mockProfile.headline.id}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2 pointer-events-auto">
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

          {/* Right Column: Lanyard Space & Quick Metrics */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center pointer-events-none">
            {/* Visual Spacer so grid maintains natural desktop height */}
            <div className="w-full max-w-[460px] xl:max-w-[480px] h-[480px] sm:h-[520px] lg:h-[560px] flex flex-col justify-end pointer-events-none">
              {/* Quick Metrics Below Lanyard */}
              <div className="grid grid-cols-3 gap-2.5 text-center px-2 pointer-events-auto">
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-navy-900/60 backdrop-blur-md border border-slate-200/80 dark:border-white/[0.08] shadow-sm hover:border-sky-500/30 transition-colors">
                  <p className="font-mono text-lg font-bold text-slate-900 dark:text-white">49</p>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Repos</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-navy-900/60 backdrop-blur-md border border-slate-200/80 dark:border-white/[0.08] shadow-sm hover:border-sky-500/30 transition-colors">
                  <p className="font-mono text-lg font-bold text-sky-600 dark:text-accent-blue">24+</p>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Projects</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-navy-900/60 backdrop-blur-md border border-slate-200/80 dark:border-white/[0.08] shadow-sm hover:border-sky-500/30 transition-colors">
                  <p className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">2+ Yrs</p>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Hint */}
        <div className="pt-8 flex justify-center pointer-events-auto">
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
