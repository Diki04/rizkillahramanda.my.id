'use client';

import React, { useEffect, useState, useRef } from 'react';

type CursorMode = 'default' | 'interactive' | 'card' | 'grab' | 'grabbing' | 'text';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on fine-pointer devices (desktop mouse/trackpad)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    setMounted(true);
    document.documentElement.classList.add('custom-cursor-enabled');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant 1:1 hardware-accelerated update for the precision dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Contextual target detection
      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorMode('default');
        return;
      }

      // Check if dragging or hovering 3D Lanyard
      const lanyardEl = target.closest('[data-cursor="grabbing"]') || target.closest('canvas');
      if (document.body.style.cursor === 'grabbing' || target.closest('[data-cursor="grabbing"]')) {
        setCursorMode('grabbing');
      } else if (
        document.body.style.cursor === 'grab' ||
        target.closest('[data-cursor="grab"]') ||
        (lanyardEl && (lanyardEl.classList.contains('pointer-events-auto') || lanyardEl.tagName === 'CANVAS'))
      ) {
        setCursorMode('grab');
      } else if (
        target.closest('.group\\/img') ||
        target.closest('[data-cursor="card"]') ||
        (target.closest('.cursor-pointer') && target.closest('article'))
      ) {
        setCursorMode('card');
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursorMode('interactive');
      } else {
        setCursorMode('default');
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);
      if (cursorMode === 'grab') setCursorMode('grabbing');
    };

    const onMouseUp = () => {
      setIsClicking(false);
      if (cursorMode === 'grabbing') setCursorMode('grab');
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Ultra-smooth spring lerp loop for the trailing fluid ring
    const renderLoop = () => {
      ringX += (mouseX - ringX) * 0.24;
      ringY += (mouseY - ringY) * 0.24;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, cursorMode]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* 1. Fluid Magnetic Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color,opacity] duration-200 ease-out flex items-center justify-center will-change-transform"
        style={{
          width:
            cursorMode === 'grab' || cursorMode === 'grabbing'
              ? '64px'
              : cursorMode === 'card'
              ? '60px'
              : cursorMode === 'interactive'
              ? '48px'
              : '28px',
          height:
            cursorMode === 'grab' || cursorMode === 'grabbing'
              ? '64px'
              : cursorMode === 'card'
              ? '60px'
              : cursorMode === 'interactive'
              ? '48px'
              : '28px',
        }}
      >
        <div
          className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-200 ${
            cursorMode === 'grabbing'
              ? 'border-2 border-cyan-300 bg-sky-500/35 shadow-[0_0_24px_rgba(56,189,248,0.85)] scale-90'
              : cursorMode === 'grab'
              ? 'border-2 border-sky-400 bg-sky-500/20 backdrop-blur-[2px] shadow-[0_0_20px_rgba(56,189,248,0.5)] scale-100'
              : cursorMode === 'card'
              ? 'border-2 border-sky-400 bg-sky-500/25 backdrop-blur-[2px] shadow-[0_0_20px_rgba(56,189,248,0.5)] scale-100'
              : cursorMode === 'interactive'
              ? 'border-2 border-sky-400 bg-sky-400/20 backdrop-blur-[1px] shadow-[0_0_16px_rgba(56,189,248,0.4)] scale-105'
              : 'border border-sky-400/70 bg-sky-400/5 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
          } ${isClicking ? 'scale-75' : ''}`}
        >
          {cursorMode === 'grab' && (
            <span className="text-[10px] font-mono font-extrabold text-cyan-200 tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              DRAG
            </span>
          )}
          {cursorMode === 'grabbing' && (
            <span className="text-[10px] font-mono font-black text-white tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              PULL
            </span>
          )}
          {cursorMode === 'card' && (
            <span className="text-[10px] font-mono font-extrabold text-sky-200 tracking-wider">
              VIEW
            </span>
          )}
        </div>
      </div>

      {/* 2. Precision Ultra-HD Core Dot (Zero Latency) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center pointer-events-none"
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            cursorMode === 'grabbing'
              ? 'w-3 h-3 bg-white shadow-[0_0_12px_#38bdf8]'
              : cursorMode === 'grab'
              ? 'w-2 h-2 bg-sky-300 shadow-[0_0_8px_#38bdf8]'
              : cursorMode === 'interactive'
              ? 'w-2.5 h-2.5 bg-white shadow-[0_0_10px_#38bdf8]'
              : cursorMode === 'card'
              ? 'w-0 h-0 opacity-0'
              : 'w-2 h-2 bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]'
          } ${isClicking ? 'scale-50' : 'scale-100'}`}
        />
      </div>
    </div>
  );
}
