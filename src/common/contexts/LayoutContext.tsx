'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LayoutMode = 'sidebar' | 'topbar';

interface LayoutContextType {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  toggleLayoutMode: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layoutMode, setLayoutModeState] = useState<LayoutMode>('sidebar');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('portfolio_layout_mode') as LayoutMode;
      if (savedMode === 'sidebar' || savedMode === 'topbar') {
        setLayoutModeState(savedMode);
      }
    } catch {
      // localStorage unavailable or restricted
    }
  }, []);

  const setLayoutMode = (mode: LayoutMode) => {
    setLayoutModeState(mode);
    try {
      localStorage.setItem('portfolio_layout_mode', mode);
    } catch {
      // ignore
    }
  };

  const toggleLayoutMode = () => {
    setLayoutMode(layoutMode === 'sidebar' ? 'topbar' : 'sidebar');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <LayoutContext.Provider
      value={{
        layoutMode,
        setLayoutMode,
        toggleLayoutMode,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
