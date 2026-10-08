'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/common/contexts/ThemeContext';

/**
 * Pilihan 4: Organic Liquid Viscous Metaballs / Lava Blobs
 * Simulates soft merging fluid blobs with gravitational hover attraction.
 */
export function LiquidMetaballsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isDark = theme === 'dark';

    // Blob parameters
    interface Blob {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      pulseSpeed: number;
      phase: number;
    }

    const numBlobs = 7;
    const blobs: Blob[] = [];

    const paletteDark = [
      'rgba(255, 255, 255, 0.08)',
      'rgba(240, 240, 245, 0.06)',
      'rgba(210, 210, 215, 0.07)',
      'rgba(180, 180, 190, 0.06)',
      'rgba(255, 255, 255, 0.05)',
    ];

    const paletteLight = [
      'rgba(0, 0, 0, 0.04)',
      'rgba(20, 20, 25, 0.03)',
      'rgba(40, 40, 45, 0.04)',
      'rgba(60, 60, 65, 0.03)',
      'rgba(0, 0, 0, 0.03)',
    ];

    const palette = isDark ? paletteDark : paletteLight;

    for (let i = 0; i < numBlobs; i++) {
      const radius = Math.min(width, height) * (0.18 + Math.random() * 0.14);
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius,
        baseRadius: radius,
        color: palette[i % palette.length],
        pulseSpeed: 0.015 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Mouse tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let mouseBlobRadius = Math.min(width, height) * 0.22;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Draw cursor interactive liquid aura
      const mouseGrad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        mouseBlobRadius
      );
      mouseGrad.addColorStop(
        0,
        isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(56, 189, 248, 0.18)'
      );
      mouseGrad.addColorStop(
        0.5,
        isDark ? 'rgba(14, 165, 233, 0.12)' : 'rgba(14, 165, 233, 0.08)'
      );
      mouseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = mouseGrad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, mouseBlobRadius, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw floating organic blobs
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];

        // Gravitational pull towards cursor
        const dx = mouseX - b.x;
        const dy = mouseY - b.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < 450 && distToMouse > 10) {
          const pull = (1 - distToMouse / 450) * 0.25;
          b.vx += (dx / distToMouse) * pull;
          b.vy += (dy / distToMouse) * pull;
        }

        // Apply velocities with viscous damping
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.985;
        b.vy *= 0.985;

        // Keep inside screen bounds with soft bounce
        const margin = 100;
        if (b.x < -margin) b.vx += 0.3;
        if (b.x > width + margin) b.vx -= 0.3;
        if (b.y < -margin) b.vy += 0.3;
        if (b.y > height + margin) b.vy -= 0.3;

        // Organic pulsating radius
        b.radius =
          b.baseRadius +
          Math.sin(time * b.pulseSpeed + b.phase) * (b.baseRadius * 0.15);

        // Render soft radial blob with smooth blend
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(0.7, b.color.replace(/[\d\.]+\)$/, '0.04)'));
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 filter blur-xl opacity-90 dark:opacity-85 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
