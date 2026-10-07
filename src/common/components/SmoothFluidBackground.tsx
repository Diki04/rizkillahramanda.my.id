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
      speed: 0,
      active: false,
    };

    let prevMouseX = width / 2;
    let prevMouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.active = true;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      mouse.speed = Math.min(Math.sqrt(dx * dx + dy * dy), 40);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
      mouse.speed = 0;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Thick, vibrant, high-contrast ambient orbs
    const orbs: Orb[] = [
      {
        x: width * 0.25,
        y: height * 0.25,
        radius: Math.min(width, height) * 0.48,
        vx: 0.18,
        vy: 0.14,
        color: 'rgba(56, 189, 248, 0.26)', // Electric Cyan (Thick)
        phase: 0,
        phaseSpeed: 0.007,
      },
      {
        x: width * 0.78,
        y: height * 0.35,
        radius: Math.min(width, height) * 0.52,
        vx: -0.16,
        vy: 0.18,
        color: 'rgba(37, 99, 235, 0.24)', // Royal Blue (Thick)
        phase: Math.PI / 2,
        phaseSpeed: 0.006,
      },
      {
        x: width * 0.45,
        y: height * 0.8,
        radius: Math.min(width, height) * 0.55,
        vx: 0.2,
        vy: -0.16,
        color: 'rgba(99, 102, 241, 0.20)', // Deep Indigo / Violet (Thick)
        phase: Math.PI,
        phaseSpeed: 0.007,
      },
      {
        x: width * 0.85,
        y: height * 0.88,
        radius: Math.min(width, height) * 0.42,
        vx: -0.18,
        vy: -0.12,
        color: 'rgba(14, 165, 233, 0.18)', // Sky Blue (Thick)
        phase: Math.PI * 1.5,
        phaseSpeed: 0.008,
      },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.055;
      mouse.y += (mouse.targetY - mouse.y) * 0.055;
      mouse.speed *= 0.92;

      // 1. Draw floating thick orbs
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        orb.phase += orb.phaseSpeed;

        orb.x += orb.vx + Math.sin(orb.phase) * 0.45;
        orb.y += orb.vy + Math.cos(orb.phase * 0.85) * 0.45;

        // Bounce gently inside canvas bounds
        if (orb.x < -orb.radius * 0.4) orb.vx = Math.abs(orb.vx);
        if (orb.x > width + orb.radius * 0.4) orb.vx = -Math.abs(orb.vx);
        if (orb.y < -orb.radius * 0.4) orb.vy = Math.abs(orb.vy);
        if (orb.y > height + orb.radius * 0.4) orb.vy = -Math.abs(orb.vy);

        // Magnetic attraction to cursor
        if (mouse.active) {
          const dx = mouse.x - orb.x;
          const dy = mouse.y - orb.y;
          orb.x += dx * 0.0025;
          orb.y += dy * 0.0025;
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
        radGrad.addColorStop(0.45, orb.color.replace(/[\d\.]+\)$/, '0.08)'));
        radGrad.addColorStop(1, 'rgba(7, 10, 18, 0)');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. High-Contrast Mouse Hover Following Aura
      if (mouse.active) {
        const dynamicRadius = Math.min(width, height) * 0.38 + mouse.speed * 4;

        // Core bright spotlight
        const coreGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          dynamicRadius * 0.4
        );
        coreGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)'); // Bright luminous electric cyan
        coreGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.20)');
        coreGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, dynamicRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Broad outer glow
        const outerGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          dynamicRadius
        );
        outerGrad.addColorStop(0, 'rgba(37, 99, 235, 0.28)'); // Royal Blue
        outerGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.16)'); // Indigo
        outerGrad.addColorStop(0.75, 'rgba(14, 165, 233, 0.06)'); // Sky Blue
        outerGrad.addColorStop(1, 'rgba(7, 10, 18, 0)');

        ctx.fillStyle = outerGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, dynamicRadius, 0, Math.PI * 2);
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
      {/* High-Contrast Canvas Fluid Glow */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-95 transition-opacity duration-700"
        aria-hidden="true"
      />
      {/* High-tech micro dot matrix pattern overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.25] [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />
    </>
  );
}
