'use client';

import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { Link } from '@/i18n/routing';
import { Container } from '@/common/components/Container';
import { Button } from '@/common/components/Button';
import { RotatingText } from '@/common/components/RotatingText';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { TechText, SpecularButton } from '@/common/components/reactbits';
import { useTheme } from '@/common/contexts/ThemeContext';
import { useLayout } from '@/common/contexts/LayoutContext';
import { cn } from '@/common/utils/cn';
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
  const { theme } = useTheme();
  const { layoutMode } = useLayout();
  const isEn = locale === 'en';
  const isDark = theme !== 'light';
  const isTopbar = layoutMode === 'topbar';

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
      {/* Layer 0 (Paling belakang): Subtle Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white/[0.04] blur-[100px] animate-pulse z-0" />
      <div
        className="pointer-events-none absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full bg-zinc-800/[0.08] blur-[120px] animate-pulse z-0"
        style={{ animationDelay: '1.8s' }}
      />
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-white/[0.04] via-zinc-800/[0.08] to-white/[0.02] blur-3xl opacity-40 z-0" />

      {/* Layer 1 (Tengah): 3D Lanyard ID Badge - In topbar mode starts behind floating navbar; in sidebar mode pierces top edge */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 z-[5] pointer-events-auto transition-all duration-300',
          isTopbar ? 'top-0 md:top-2' : '-top-16 md:-top-24'
        )}
      >
        <Lanyard
          position={[0, 0, 20]}
          fov={24}
          anchorPosition={isTopbar ? [3.2, 5.0, 0] : undefined}
          ropeLength={isTopbar ? 4.2 : 5.0}
          className="pointer-events-auto"
        />
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

            {/* Main Greeting & Name with TechText */}
            <div className="space-y-3 pointer-events-none select-none">
              <div className="flex items-center gap-2 text-slate-800 dark:text-zinc-300 font-mono text-sm tracking-wide font-semibold">
                <Terminal className="w-4 h-4 text-slate-700 dark:text-zinc-400" />
                <span>{t('greeting')}</span>
              </div>

              <div className="pointer-events-auto py-1 flex flex-col items-start gap-1">
                <TechText
                  text="Rizkillah"
                  color={isDark ? '#ffffff' : '#09090b'}
                  accentColor={isDark ? '#a1a1aa' : '#4f46e5'}
                  fontSize={84}
                  fontWeight={800}
                  dashLength={6}
                  dashGap={6}
                  lineStyle="dashed"
                  className="font-extrabold tracking-tight leading-none"
                />
                <TechText
                  text="Ramanda"
                  color={isDark ? '#ffffff' : '#09090b'}
                  accentColor={isDark ? '#a1a1aa' : '#4f46e5'}
                  fontSize={84}
                  fontWeight={800}
                  dashLength={6}
                  dashGap={6}
                  lineStyle="dashed"
                  className="font-extrabold tracking-tight leading-none"
                />
              </div>

              {/* Dynamic Rotating Role */}
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-800 dark:text-zinc-200">
                <RotatingText texts={roles} interval={3400} />
              </div>

              {/* Badges / University & Location */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-sm text-slate-600 dark:text-slate-400 font-mono">
                <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                  <GraduationCap className="w-4 h-4 text-slate-900 dark:text-white" />
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
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed pointer-events-none select-none">
              {isEn ? mockProfile.headline.en : mockProfile.headline.id}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2 pointer-events-auto">
              <Link href="/projects">
                <SpecularButton
                  size="md"
                  baseColor={isDark ? '#18181b' : '#09090b'}
                  lineColor={isDark ? '#ffffff' : '#6366f1'}
                  textColor="#ffffff"
                  className="shadow-sm hover:shadow-md"
                >
                  <span>{t('viewProjects')}</span>
                  <ArrowUpRight className="w-4 h-4 ml-0.5 shrink-0" />
                </SpecularButton>
              </Link>
              <Link href="/contact">
                <SpecularButton
                  size="md"
                  baseColor={isDark ? '#09090b' : '#ffffff'}
                  lineColor={isDark ? '#a1a1aa' : '#09090b'}
                  textColor={isDark ? '#ffffff' : '#09090b'}
                  className="shadow-sm hover:shadow-md"
                >
                  <span>{t('contactMe')}</span>
                  <Mail className="w-4 h-4 ml-0.5 shrink-0 text-slate-400" />
                </SpecularButton>
              </Link>
              <a
                href={mockProfile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="md"
                  className="h-11 px-5 rounded-xl border border-slate-300 dark:border-white/[0.1] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-800 dark:text-slate-200 font-medium text-sm"
                >
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
                <div className="p-3 rounded-xl bg-white/85 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-200/90 dark:border-white/[0.08] shadow-sm hover:border-slate-300 dark:hover:border-white/30 transition-colors">
                  <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">49</p>
                  <p className="text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wide">Repos</p>
                </div>
                <div className="p-3 rounded-xl bg-white/85 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-200/90 dark:border-white/[0.08] shadow-sm hover:border-slate-300 dark:hover:border-white/30 transition-colors">
                  <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">24+</p>
                  <p className="text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wide">Projects</p>
                </div>
                <div className="p-3 rounded-xl bg-white/85 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-200/90 dark:border-white/[0.08] shadow-sm hover:border-slate-300 dark:hover:border-white/30 transition-colors">
                  <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">2+ Yrs</p>
                  <p className="text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wide">Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Hint */}
        <div className="pt-8 flex justify-center pointer-events-auto">
          <a
            href="#tech-stack"
            className="group flex flex-col items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-white dark:hover:text-white transition-colors"
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-slate-400 group-hover:text-white dark:group-hover:text-white" />
          </a>
        </div>
      </Container>
    </ScrollReveal>
  );
}
