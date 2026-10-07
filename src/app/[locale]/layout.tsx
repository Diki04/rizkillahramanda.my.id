import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { Navbar } from '../../modules/layout/Navbar';
import { Footer } from '../../modules/layout/Footer';
import { InteractiveCanvas } from '../../common/components/InteractiveCanvas';
import { ScrollProgressBar } from '../../common/components/ScrollProgressBar';
import { BackToTop } from '../../common/components/BackToTop';
import { CommandPalette } from '../../common/components/CommandPalette';
import { RadialGradientBackground } from '../../common/components/RadialGradientBackground';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Rizkillah Ramanda Sinyo | Portfolio & Engineering Showcase',
  description: 'Informatics Engineering student at Universitas Riau. Fullstack developer specialized in Next.js, TypeScript, and AI integrations.',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} className="dark">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-dark-bg text-dark-text antialiased min-h-screen flex flex-col relative selection:bg-sky-500/20 selection:text-sky-300`}>
        <ScrollProgressBar />
        <RadialGradientBackground />
        <InteractiveCanvas />
        <CommandPalette />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
