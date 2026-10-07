'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Sparkles, Waves, Compass, Orbit, Droplets, RefreshCw } from 'lucide-react';
import { useLayout, WaterEffectMode } from '@/common/contexts/LayoutContext';

const SmoothFluidBackground = dynamic(
  () => import('@/common/components/SmoothFluidBackground').then((mod) => mod.SmoothFluidBackground),
  { ssr: false }
);

const ThreeWaterMeshBackground = dynamic(
  () => import('@/common/components/ThreeWaterMeshBackground').then((mod) => mod.ThreeWaterMeshBackground),
  { ssr: false }
);

const FluidDynamicsBackground = dynamic(
  () => import('@/common/components/FluidDynamicsBackground').then((mod) => mod.FluidDynamicsBackground),
  { ssr: false }
);

const LiquidMetaballsBackground = dynamic(
  () => import('@/common/components/LiquidMetaballsBackground').then((mod) => mod.LiquidMetaballsBackground),
  { ssr: false }
);

type BackgroundOption = 1 | 2 | 3 | 4;

const OPTION_DETAILS: Record<BackgroundOption, { title: string; desc: string; icon: any }> = {
  1: {
    title: 'Pilihan 1: Water Ripple Physics',
    desc: 'Simulasi riak gelombang air 2D interaktif (Aktif otomatis di Mode Sidebar)',
    icon: Waves,
  },
  2: {
    title: 'Pilihan 2: Three.js 3D Water Mesh',
    desc: 'Permukaan air 3D WebGL dengan vertex wave displacement (Aktif otomatis di Mode Topbar)',
    icon: Droplets,
  },
  3: {
    title: 'Pilihan 3: Fluid Dynamics Particles',
    desc: 'Aliran partikel fluida Navier-Stokes & vorteks kursor interaktif',
    icon: Compass,
  },
  4: {
    title: 'Pilihan 4: Liquid Metaballs',
    desc: 'Metaball cairan organik dengan gravitasi hover kursor',
    icon: Orbit,
  },
};

export function DynamicBackgroundShowcase() {
  const { layoutMode, waterEffectMode, setWaterEffectMode, activeWaterEffect } = useLayout();
  const [previewOption, setPreviewOption] = useState<BackgroundOption | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // If user is currently previewing option 3 or 4, use that; otherwise use activeWaterEffect (1 or 2)
  const currentRenderOption: BackgroundOption = previewOption ?? activeWaterEffect;
  const ActiveIcon = OPTION_DETAILS[currentRenderOption].icon;

  const handleSelectOption = (num: BackgroundOption) => {
    if (num === 1) {
      setWaterEffectMode('ripple');
      setPreviewOption(null);
    } else if (num === 2) {
      setWaterEffectMode('mesh3d');
      setPreviewOption(null);
    } else {
      setPreviewOption(num);
    }
  };

  const handleResetToAuto = () => {
    setWaterEffectMode('auto');
    setPreviewOption(null);
  };

  return (
    <>
      {/* Background Rendering */}
      {currentRenderOption === 1 && <SmoothFluidBackground />}
      {currentRenderOption === 2 && <ThreeWaterMeshBackground />}
      {currentRenderOption === 3 && <FluidDynamicsBackground />}
      {currentRenderOption === 4 && <LiquidMetaballsBackground />}

      {/* Floating Background Selector Badge for easy testing & control */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <div className="bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-slate-200 dark:border-white/[0.1] rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-sky-500 transition-colors"
              title="Atur sinkronisasi atau ganti efek animasi air"
            >
              <ActiveIcon className="w-4 h-4 text-sky-500 animate-spin-slow" />
              <span>
                {waterEffectMode === 'auto'
                  ? `Auto (${layoutMode === 'sidebar' ? 'Pilihan 1: Ripple' : 'Pilihan 2: 3D Mesh'})`
                  : OPTION_DETAILS[currentRenderOption].title}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-500 border border-sky-500/20">
                Atur
              </span>
            </button>
          ) : (
            <div className="p-3.5 space-y-3 w-80">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.08] pb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Pengaturan Animasi Air</span>
                </span>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-[10px] text-slate-400 hover:text-slate-200 px-1.5 py-0.5 rounded"
                >
                  Tutup
                </button>
              </div>

              {/* Status Banner */}
              <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.06] text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">Mode Sinkron:</span>
                  <span
                    className={`font-semibold text-[11px] ${
                      waterEffectMode === 'auto' ? 'text-emerald-500' : 'text-sky-500'
                    }`}
                  >
                    {waterEffectMode === 'auto'
                      ? 'Otomatis (Sesuai Layout)'
                      : 'Manual (Terkunci)'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {waterEffectMode === 'auto'
                    ? `Sedang di mode "${layoutMode}". Otomatis menggunakan ${
                        layoutMode === 'sidebar' ? 'Pilihan 1 (2D Ripple)' : 'Pilihan 2 (Three.js 3D Mesh)'
                      }.`
                    : `Terkunci pada ${
                        currentRenderOption === 1
                          ? 'Pilihan 1 (2D Ripple)'
                          : currentRenderOption === 2
                          ? 'Pilihan 2 (3D Mesh)'
                          : `Pilihan ${currentRenderOption}`
                      }.`}
                </p>
              </div>

              {/* Quick Options */}
              <div className="grid grid-cols-1 gap-1.5">
                <button
                  onClick={handleResetToAuto}
                  className={`flex items-start gap-2.5 p-2 rounded-xl text-left transition-all ${
                    waterEffectMode === 'auto' && previewOption === null
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                      : 'hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-600 dark:text-slate-400 border border-transparent'
                  }`}
                >
                  <RefreshCw className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                  <div>
                    <p className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                      <span>Auto Sync dengan Layout</span>
                      <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                        Rekomendasi
                      </span>
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      Sidebar = Pilihan 1 (2D Ripple) • Topbar = Pilihan 2 (3D Mesh)
                    </p>
                  </div>
                </button>

                {([1, 2, 3, 4] as BackgroundOption[]).map((num) => {
                  const item = OPTION_DETAILS[num];
                  const Icon = item.icon;
                  const isSelected =
                    (waterEffectMode === 'ripple' && num === 1 && previewOption === null) ||
                    (waterEffectMode === 'mesh3d' && num === 2 && previewOption === null) ||
                    previewOption === num;

                  return (
                    <button
                      key={num}
                      onClick={() => handleSelectOption(num)}
                      className={`flex items-start gap-2.5 p-2 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-300'
                          : 'hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-600 dark:text-slate-400 border border-transparent'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-sky-500' : ''}`} />
                      <div>
                        <p className="text-xs font-semibold leading-tight">{item.title}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 line-clamp-1">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
