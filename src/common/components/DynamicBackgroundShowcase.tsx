'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Sparkles, Waves, Compass, Orbit, Droplets } from 'lucide-react';

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
    desc: 'Simulasi riak gelombang air 2D interaktif (Aktif di Beranda)',
    icon: Waves,
  },
  2: {
    title: 'Pilihan 2: Three.js 3D Water Mesh',
    desc: 'Permukaan air 3D WebGL dengan vertex displacement (Aktif di Tentang)',
    icon: Droplets,
  },
  3: {
    title: 'Pilihan 3: Fluid Dynamics Particles',
    desc: 'Aliran partikel fluida Navier-Stokes & vorteks kursor (Aktif di Portofolio)',
    icon: Compass,
  },
  4: {
    title: 'Pilihan 4: Liquid Metaballs',
    desc: 'Metaball cairan organik dengan gravitasi hover (Aktif di Pencapaian)',
    icon: Orbit,
  },
};

export function DynamicBackgroundShowcase() {
  const pathname = usePathname();
  const [selectedOption, setSelectedOption] = useState<BackgroundOption>(1);
  const [userOverride, setUserOverride] = useState<BackgroundOption | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-switch based on page route as requested
  useEffect(() => {
    if (userOverride !== null) return;

    if (pathname?.includes('/about')) {
      setSelectedOption(2);
    } else if (pathname?.includes('/projects')) {
      setSelectedOption(3);
    } else if (pathname?.includes('/achievements')) {
      setSelectedOption(4);
    } else {
      setSelectedOption(1);
    }
  }, [pathname, userOverride]);

  const activeOption = userOverride ?? selectedOption;
  const ActiveIcon = OPTION_DETAILS[activeOption].icon;

  return (
    <>
      {/* Background Rendering */}
      {activeOption === 1 && <SmoothFluidBackground />}
      {activeOption === 2 && <ThreeWaterMeshBackground />}
      {activeOption === 3 && <FluidDynamicsBackground />}
      {activeOption === 4 && <LiquidMetaballsBackground />}

      {/* Floating Background Selector Badge for easy testing */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <div className="bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border border-slate-200 dark:border-white/[0.1] rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-sky-500 transition-colors"
              title="Ganti pilihan animasi background"
            >
              <ActiveIcon className="w-4 h-4 text-sky-500 animate-spin-slow" />
              <span>{OPTION_DETAILS[activeOption].title}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-500 border border-sky-500/20">
                Pilih
              </span>
            </button>
          ) : (
            <div className="p-3 space-y-2 w-72">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.08] pb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Animasi Background</span>
                </span>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-[10px] text-slate-400 hover:text-slate-200 px-1.5 py-0.5 rounded"
                >
                  Tutup
                </button>
              </div>

              <div className="grid grid-cols-1 gap-1.5 pt-1">
                {([1, 2, 3, 4] as BackgroundOption[]).map((num) => {
                  const item = OPTION_DETAILS[num];
                  const Icon = item.icon;
                  const isSelected = activeOption === num;

                  return (
                    <button
                      key={num}
                      onClick={() => {
                        setUserOverride(num);
                        setSelectedOption(num);
                      }}
                      className={`flex items-start gap-2.5 p-2 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-300'
                          : 'hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-600 dark:text-slate-400 border border-transparent'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-sky-500' : ''}`} />
                      <div>
                        <p className="text-xs font-semibold leading-tight">{item.title}</p>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {userOverride !== null && (
                <button
                  onClick={() => setUserOverride(null)}
                  className="w-full text-center text-[10px] font-mono text-sky-500 hover:underline pt-1"
                >
                  Reset ke background default halaman
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
