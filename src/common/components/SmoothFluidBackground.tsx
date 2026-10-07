'use client';

import React, { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  phase: number;
  phaseSpeed: number;
}

export function SmoothFluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with spring lerp
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.active = true;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Organic floating aura orbs
    const orbs: Orb[] = [
      {
        x: width * 0.25,
        y: height * 0.3,
        radius: Math.min(width, height) * 0.45,
        vx: 0.15,
        vy: 0.12,
        color: 'rgba(56, 189, 248, 0.13)', // Cyan
        phase: 0,
        phaseSpeed: 0.008,
      },
      {
        x: width * 0.75,
        y: height * 0.4,
        radius: Math.min(width, height) * 0.48,
        vx: -0.12,
        vy: 0.16,
        color: 'rgba(37, 99, 235, 0.11)', // Royal Blue
        phase: Math.PI / 2,
        phaseSpeed: 0.006,
      },
      {
        x: width * 0.5,
        y: height * 0.75,
        radius: Math.min(width, height) * 0.52,
        vx: 0.18,
        vy: -0.14,
        color: 'rgba(99, 102, 241, 0.09)', // Indigo
        phase: Math.PI,
        phaseSpeed: 0.007,
      },
      {
        x: width * 0.8,
        y: height * 0.85,
        radius: Math.min(width, height) * 0.38,
        vx: -0.15,
        vy: -0.1,
        color: 'rgba(20, 184, 166, 0.07)', // Teal
        phase: Math.PI * 1.5,
        phaseSpeed: 0.009,
      },
    ];

    let t = 0;

    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // 1. Draw floating orbs
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        orb.phase += orb.phaseSpeed;

        orb.x += orb.vx + Math.sin(orb.phase) * 0.4;
        orb.y += orb.vy + Math.cos(orb.phase * 0.8) * 0.4;

        // Bounce gently inside canvas bounds
        if (orb.x < -orb.radius * 0.5) orb.vx = Math.abs(orb.vx);
        if (orb.x > width + orb.radius * 0.5) orb.vx = -Math.abs(orb.vx);
        if (orb.y < -orb.radius * 0.5) orb.vy = Math.abs(orb.vy);
        if (orb.y > height + orb.radius * 0.5) orb.vy = -Math.abs(orb.vy);

        // Slight attraction toward cursor
        if (mouse.active) {
          const dx = mouse.x - orb.x;
          const dy = mouse.y - orb.y;
          orb.x += dx * 0.0015;
          orb.y += dy * 0.0015;
        }

        const radGrad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        radGrad.addColorStop(0, orb.color);
        radGrad.addColorStop(0.5, orb.color.replace(/[\d\.]+\)$/, '0.04)'));
        radGrad.addColorStop(1, 'rgba(7, 10, 18, 0)');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Cursor radiant spotlight aura
      if (mouse.active) {
        const cursorRadius = Math.min(width, height) * 0.42;
        const cursorGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          cursorRadius
        );
        cursorGrad.addColorStop(0, 'rgba(56, 189, 248, 0.16)');
        cursorGrad.addColorStop(0.35, 'rgba(37, 99, 235, 0.08)');
        cursorGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.02)');
        cursorGrad.addColorStop(1, 'rgba(7, 10, 18, 0)');

        ctx.fillStyle = cursorGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, cursorRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Canvas Fluid Glow */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-85 transition-opacity duration-1000"
        aria-hidden="true"
      />
      {/* High-tech micro dot matrix pattern overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.22] [background-image:radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />
    </>
  );
}
