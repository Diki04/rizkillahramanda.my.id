'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useLayout } from '@/common/contexts/LayoutContext';

const SmoothFluidBackground = dynamic(
  () => import('@/common/components/SmoothFluidBackground').then((mod) => mod.SmoothFluidBackground),
  { ssr: false }
);

const ThreeWaterMeshBackground = dynamic(
  () => import('@/common/components/ThreeWaterMeshBackground').then((mod) => mod.ThreeWaterMeshBackground),
  { ssr: false }
);

/**
 * Otomatis Sinkron dengan Layout:
 * - Mode Sidebar => Pilihan 1: Smooth 2D Water Ripple Physics Canvas
 * - Mode Topbar  => Pilihan 2: Three.js WebGL 3D Water Surface Wave Mesh
 */
export function DynamicBackgroundShowcase() {
  const { layoutMode } = useLayout();

  return layoutMode === 'sidebar' ? (
    <SmoothFluidBackground />
  ) : (
    <ThreeWaterMeshBackground />
  );
}
