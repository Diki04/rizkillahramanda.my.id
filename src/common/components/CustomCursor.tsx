'use client';

import React, { useEffect, useState } from 'react';

type CursorMode = 'default' | 'interactive' | 'card' | 'text';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setMounted(true);
    document.documentElement.classList.add('custom-cursor-enabled');

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPosition({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorMode('default');
        return;
      }

      // Check for card / showcase hover
      if (
        target.closest('.group\\/img') ||
        target.closest('[data-cursor="card"]') ||
        target.closest('.cursor-pointer') && target.closest('article')
      ) {
        setCursorMode('card');
      }
      // Check for clickable interactive buttons/links
      else if (
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

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.22;
      trailY += (mouseY - trailY) * 0.22;
      setTrailPosition({ x: trailX, y: trailY });
      animId = requestAnimationFrame(animateTrail);
    };

    animId = requestAnimationFrame(animateTrail);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring / Morphing Shape */}
      <div
        className={`pointer-events-none fixed z-[9999] rounded-full transition-all duration-200 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
          cursorMode === 'card'
            ? 'w-16 h-16 border-2 border-sky-400 bg-sky-500/25 backdrop-blur-sm shadow-[0_0_24px_rgba(56,189,248,0.5)] scale-100'
            : cursorMode === 'interactive'
            ? 'w-12 h-12 border-2 border-sky-400 bg-sky-400/20 backdrop-blur-[1px] shadow-[0_0_16px_rgba(56,189,248,0.4)] scale-110'
            : 'w-7 h-7 border border-sky-400/70 bg-sky-400/5'
        } ${isClicking ? 'scale-75' : ''}`}
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
        }}
        aria-hidden="true"
      >
        {cursorMode === 'card' && (
          <span className="text-[10px] font-mono font-bold text-sky-200 tracking-wider">
            VIEW
          </span>
        )}
      </div>

      {/* Center Precision Core Dot */}
      <div
        className={`pointer-events-none fixed z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
          cursorMode === 'interactive'
            ? 'w-2 h-2 bg-sky-300 scale-125 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
            : cursorMode === 'card'
            ? 'w-0 h-0 opacity-0'
            : 'w-2 h-2 bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.6)]'
        } ${isClicking ? 'scale-50' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        aria-hidden="true"
      />
    </>
  );
}
