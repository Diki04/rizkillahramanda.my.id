import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import { LayoutProvider } from '@/common/contexts/LayoutContext';
import { AppShell } from '@/common/layouts/AppShell';
import { SmoothFluidBackground } from '@/common/components/SmoothFluidBackground';
import { ClickSpark } from '@/common/components/ClickSpark';
import { ScrollProgressBar } from '@/common/components/ScrollProgressBar';
import { BackToTop } from '@/common/components/BackToTop';
import { CommandPalette } from '@/common/components/CommandPalette';
import { RadialGradientBackground } from '@/common/components/RadialGradientBackground';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  title: 'Rizkillah Ramanda Sinyo | Portfolio & Engineering Showcase',
  description:
    'Informatics Engineering student at Universitas Riau. Fullstack developer specialized in Next.js, TypeScript, and AI integrations.',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${inter.variable} ${mono.variable} font-sans bg-navy-950 text-slate-100 antialiased min-h-screen flex flex-col relative selection:bg-sky-500/20 selection:text-sky-300`}
      >
        <NextIntlClientProvider messages={messages}>
          <LayoutProvider>
            <ScrollProgressBar />
            <RadialGradientBackground />
            <SmoothFluidBackground />
            <ClickSpark />
            <CommandPalette />
            <AppShell>{children}</AppShell>
            <BackToTop />
          </LayoutProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
