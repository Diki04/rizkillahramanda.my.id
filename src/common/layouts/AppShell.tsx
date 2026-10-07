'use client';

import React from 'react';
import { useLayout } from '@/common/contexts/LayoutContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { layoutMode } = useLayout();

  if (layoutMode === 'sidebar') {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-navy-950 text-slate-100 selection:bg-accent-blue/30 selection:text-white scroll-smooth">
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
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-accent-blue/30 selection:text-white scroll-smooth">
      <Navbar />
      <main className="flex-1 relative z-10 w-full px-4 sm:px-8 lg:px-12 py-6 md:py-10">{children}</main>
      <Footer />
    </div>
  );
}
