'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LayoutMode = 'sidebar' | 'topbar';
export type WaterEffectMode = 'auto' | 'ripple' | 'mesh3d';

interface LayoutContextType {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  toggleLayoutMode: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  waterEffectMode: WaterEffectMode;
  setWaterEffectMode: (mode: WaterEffectMode) => void;
  cycleWaterEffectMode: () => void;
  activeWaterEffect: 1 | 2;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layoutMode, setLayoutModeState] = useState<LayoutMode>('sidebar');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [waterEffectMode, setWaterEffectModeState] = useState<WaterEffectMode>('auto');

  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('portfolio_layout_mode') as LayoutMode;
      if (savedMode === 'sidebar' || savedMode === 'topbar') {
        setLayoutModeState(savedMode);
      }
      const savedWater = localStorage.getItem('portfolio_water_effect') as WaterEffectMode;
      if (savedWater === 'auto' || savedWater === 'ripple' || savedWater === 'mesh3d') {
        setWaterEffectModeState(savedWater);
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

  const setWaterEffectMode = (mode: WaterEffectMode) => {
    setWaterEffectModeState(mode);
    try {
      localStorage.setItem('portfolio_water_effect', mode);
    } catch {
      // ignore
    }
  };

  const cycleWaterEffectMode = () => {
    const next: WaterEffectMode =
      waterEffectMode === 'auto'
        ? 'ripple'
        : waterEffectMode === 'ripple'
        ? 'mesh3d'
        : 'auto';
    setWaterEffectMode(next);
  };

  const toggleLayoutMode = () => {
    setLayoutMode(layoutMode === 'sidebar' ? 'topbar' : 'sidebar');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const activeWaterEffect: 1 | 2 =
    waterEffectMode === 'ripple'
      ? 1
      : waterEffectMode === 'mesh3d'
      ? 2
      : layoutMode === 'sidebar'
      ? 1
      : 2;

  return (
    <LayoutContext.Provider
      value={{
        layoutMode,
        setLayoutMode,
        toggleLayoutMode,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        waterEffectMode,
        setWaterEffectMode,
        cycleWaterEffectMode,
        activeWaterEffect,
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
