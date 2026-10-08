'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useLayout } from '@/common/contexts/LayoutContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { layoutMode } = useLayout();
  const pathname = usePathname();
  const isLinksPage = pathname?.endsWith('/links') || pathname?.includes('/links');

  if (isLinksPage) {
    return (
      <div className="min-h-screen relative z-10 w-full flex flex-col justify-center">
        {children}
      </div>
    );
  }

  if (layoutMode === 'sidebar') {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 dark:bg-transparent dark:text-slate-100 selection:bg-white/20 selection:text-white scroll-smooth transition-colors duration-300">
        {/* Mobile Header (Visible on screens < md) */}
        <MobileHeader />

        {/* Desktop Sidebar (Fixed left navigation on md+) */}
        <div className="hidden md:block shrink-0">
          <Sidebar />
        </div>

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden scroll-smooth">
          <main className="flex-1 relative z-10 w-full px-4 sm:px-8 lg:px-12 py-6 md:py-10">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  // Topbar Mode (Classic top navigation bar)
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-transparent dark:text-slate-100 selection:bg-white/20 selection:text-white scroll-smooth transition-colors duration-300">
      <Navbar />
      <main className="flex-1 relative z-10 w-full px-4 sm:px-8 lg:px-12 py-6 md:py-10">{children}</main>
      <Footer />
    </div>
  );
}
