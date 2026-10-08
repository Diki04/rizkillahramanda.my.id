import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import { ThemeProvider } from '@/common/contexts/ThemeContext';
import { LayoutProvider } from '@/common/contexts/LayoutContext';
import { AppShell } from '@/common/layouts/AppShell';
import { ScrollProgressBar } from '@/common/components/ScrollProgressBar';
import { BackToTop } from '@/common/components/BackToTop';
import { CommandPalette } from '@/common/components/CommandPalette';

import { GlobalBackground } from '@/common/components/GlobalBackground';

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
    <html lang={locale} suppressHydrationWarning className="dark selection:bg-slate-500/20">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}else{document.documentElement.classList.add('dark');}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${mono.variable} font-sans bg-[#dbd7d7] dark:bg-black text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col relative selection:bg-slate-500/20 transition-colors duration-300`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <LayoutProvider>
              <GlobalBackground />
              <ScrollProgressBar />
              <CommandPalette />
              <AppShell>{children}</AppShell>
              <BackToTop />
            </LayoutProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
