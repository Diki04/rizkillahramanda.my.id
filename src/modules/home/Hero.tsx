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
import Image from 'next/image';
import {
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
  GraduationCap,
  ChevronDown,
  Terminal,
  BadgeCheck,
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

      {/* Layer 1 (Tengah): 3D Lanyard ID Badge - Desktop only (>= 1024px) */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 z-[5] pointer-events-auto transition-all duration-300 hidden lg:block',
          isTopbar ? '-top-10 md:-top-16' : '-top-16 md:-top-24'
        )}
      >
        <Lanyard
          position={[0, 0, 20]}
          fov={24}
          anchorPosition={isTopbar ? [3.85, 6.1, 0] : [3.85, 6.4, 0]}
          ropeLength={isTopbar ? 4.1 : 5.0}
          className="pointer-events-auto"
        />
      </div>

      {/* Layer 2 (Paling depan): Foreground Typography & Controls */}
      <Container size="xl" className="relative z-10 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-8 flex flex-col items-start gap-5 sm:gap-6 pointer-events-none">
            {/* Mobile Profile Photo Card (Replaces 3D Lanyard on Mobile) */}
            <div className="flex lg:hidden items-center gap-3.5 p-3 rounded-2xl border border-slate-300 dark:border-white/15 bg-white/95 dark:bg-zinc-950/90 shadow-md shadow-slate-900/5 backdrop-blur-xl pointer-events-auto w-full max-w-sm">
              <div className="relative shrink-0">
                <div className="p-0.5 rounded-2xl bg-gradient-to-tr from-slate-400 via-indigo-600 to-slate-500 dark:from-zinc-600 dark:via-indigo-500 dark:to-zinc-700 shadow-sm">
                  <div className="w-16 h-16 rounded-[14px] overflow-hidden bg-slate-100 dark:bg-zinc-900 relative">
                    <Image
                      src={mockProfile.avatar}
                      alt={mockProfile.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
                <span
                  title="Online & Ready"
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black animate-pulse shadow-xs"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                    {mockProfile.name}
                  </span>
                  <BadgeCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                </div>
                <p className="text-xs font-mono font-medium text-slate-700 dark:text-zinc-300 truncate">
                  Full-Stack & ML Engineer
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-zinc-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">{mockProfile.location}</span>
                </div>
              </div>
            </div>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-600/30 dark:border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 text-xs font-mono font-bold shadow-xs pointer-events-auto">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('status')}</span>
            </div>

            {/* Main Greeting & Name with TechText */}
            <div className="space-y-3 pointer-events-none select-none w-full">
              <div className="flex items-center gap-2 text-slate-900 dark:text-zinc-200 font-mono text-sm tracking-wide font-bold">
                <Terminal className="w-4 h-4 text-slate-800 dark:text-zinc-400" />
                <span>{t('greeting')}</span>
              </div>

              <div className="pointer-events-auto py-1 w-full max-w-full lg:max-w-none overflow-visible">
                <TechText
                  text="Rizkillah Ramanda Sinyo"
                  color={isDark ? '#ffffff' : '#020617'}
                  accentColor={isDark ? '#a1a1aa' : '#3730a3'}
                  fontSize={60}
                  fontWeight={800}
                  dashLength={5}
                  dashGap={5}
                  lineStyle="dashed"
                  autoAnimate={true}
                  autoWaveSpeed={1.6}
                  speed={1.2}
                  fontFamily="var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
                  className="font-extrabold tracking-tight"
                />
              </div>

              {/* Dynamic Rotating Role */}
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-950 dark:text-zinc-100">
                <RotatingText texts={roles} interval={3400} />
              </div>

              {/* Badges / University & Location */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-sm text-slate-800 dark:text-slate-300 font-mono font-semibold">
                <span className="inline-flex items-center gap-1.5 text-slate-900 dark:text-slate-200 font-semibold">
                  <GraduationCap className="w-4 h-4 text-slate-950 dark:text-white" />
                  {mockProfile.university}
                </span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1.5 text-slate-800 dark:text-slate-300 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  {mockProfile.location}
                </span>
              </div>
            </div>

            {/* Summary Bio */}
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 max-w-2xl leading-relaxed pointer-events-none select-none font-normal">
              {isEn ? mockProfile.headline.en : mockProfile.headline.id}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2 pointer-events-auto w-full sm:w-auto">
              <Link href="/projects" className="w-full sm:w-auto">
                <SpecularButton
                  size="md"
                  baseColor={isDark ? '#18181b' : '#ffffff'}
                  lineColor={isDark ? '#ffffff' : '#434bce'}
                  textColor={isDark ? '#ffffff' : '#09090b'}
                  className="w-full sm:w-auto shadow-sm hover:shadow-md font-semibold"
                >
                  <span>{t('viewProjects')}</span>
                  <ArrowUpRight className="w-4 h-4 ml-0.5 shrink-0" />
                </SpecularButton>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <SpecularButton
                  size="md"
                  baseColor={isDark ? '#09090b' : '#ffffff'}
                  lineColor={isDark ? '#a1a1aa' : '#434bce'}
                  textColor={isDark ? '#ffffff' : '#09090b'}
                  className="w-full sm:w-auto shadow-sm hover:shadow-md font-semibold"
                >
                  <span>{t('contactMe')}</span>
                  <Mail className="w-4 h-4 ml-0.5 shrink-0 text-slate-400" />
                </SpecularButton>
              </Link>
              <a
                href={mockProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto h-11 px-5 rounded-xl border border-slate-300 dark:border-white/[0.1] bg-white/95 dark:bg-zinc-900/80 hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-900 dark:text-slate-200 font-semibold text-sm"
                >
                  <Github className="w-4 h-4 mr-2" />
                  <span>GitHub</span>
                </Button>
              </a>
            </div>

            {/* Quick Metrics on Mobile */}
            <div className="grid grid-cols-3 gap-2.5 text-center pointer-events-auto w-full max-w-sm pt-2 lg:hidden">
              <div className="p-2.5 rounded-xl bg-white/95 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-300 dark:border-white/[0.08] shadow-xs">
                <p className="font-mono text-lg font-bold text-slate-950 dark:text-white">49</p>
                <p className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wide">Repos</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/95 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-300 dark:border-white/[0.08] shadow-xs">
                <p className="font-mono text-lg font-bold text-slate-950 dark:text-white">24+</p>
                <p className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wide">Projects</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/95 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-300 dark:border-white/[0.08] shadow-xs">
                <p className="font-mono text-lg font-bold text-slate-950 dark:text-white">2+ Yrs</p>
                <p className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wide">Exp</p>
              </div>
            </div>
          </div>

          {/* Right Column: Lanyard Space & Quick Metrics - Desktop only (>= 1024px) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col items-end justify-center pointer-events-none">
            {/* Visual Spacer so grid maintains natural desktop height */}
            <div className="w-full max-w-[420px] xl:max-w-[440px] h-[480px] sm:h-[520px] lg:h-[560px] flex flex-col justify-end pointer-events-none">
              {/* Quick Metrics Below Lanyard */}
              <div className="grid grid-cols-3 gap-2.5 text-center px-2 pointer-events-auto">
                <div className="p-3 rounded-xl bg-white/95 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-300 dark:border-white/[0.08] shadow-sm hover:border-slate-400 dark:hover:border-white/30 transition-colors">
                  <p className="font-mono text-xl font-bold text-slate-950 dark:text-white">49</p>
                  <p className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wide">Repos</p>
                </div>
                <div className="p-3 rounded-xl bg-white/95 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-300 dark:border-white/[0.08] shadow-sm hover:border-slate-400 dark:hover:border-white/30 transition-colors">
                  <p className="font-mono text-xl font-bold text-slate-950 dark:text-white">24+</p>
                  <p className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wide">Projects</p>
                </div>
                <div className="p-3 rounded-xl bg-white/95 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-300 dark:border-white/[0.08] shadow-sm hover:border-slate-400 dark:hover:border-white/30 transition-colors">
                  <p className="font-mono text-xl font-bold text-slate-950 dark:text-white">2+ Yrs</p>
                  <p className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wide">Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Hint - Desktop / Tablet only */}
        <div className="pt-8 hidden md:flex justify-center pointer-events-auto">
          <a
            href="#tech-stack"
            className="group flex flex-col items-center gap-1.5 text-xs font-mono text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-slate-500 group-hover:text-slate-950 dark:group-hover:text-white" />
          </a>
        </div>
      </Container>
    </ScrollReveal>
  );
}
