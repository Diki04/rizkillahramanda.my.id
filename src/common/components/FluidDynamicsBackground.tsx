'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/common/contexts/ThemeContext';

/**
 * Pilihan 3: Navier-Stokes Inspired Fluid Dynamics Particle Flow
 * Simulates fluid velocity currents and vortex circulation around the cursor.
 */
export function FluidDynamicsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle system
    const numParticles = 140;
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      hue: number;
    }

    const particles: Particle[] = [];
    const isDark = theme === 'dark';

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2.2 + 1,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 150,
        hue: isDark ? 190 + Math.random() * 35 : 200 + Math.random() * 25,
      });
    }

    // Mouse velocity state
    let mouseX = width / 2;
    let mouseY = height / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let mouseSpeedX = 0;
    let mouseSpeedY = 0;
    let isMouseActive = false;
    let mouseIdleTimer: NodeJS.Timeout;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseSpeedX = (mouseX - prevMouseX) * 0.35;
      mouseSpeedY = (mouseY - prevMouseY) * 0.35;
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      isMouseActive = true;

      clearTimeout(mouseIdleTimer);
      mouseIdleTimer = setTimeout(() => {
        isMouseActive = false;
      }, 1200);
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
      time += 0.012;

      // Subtle background fade for soft motion blur trails
      ctx.fillStyle = isDark ? 'rgba(7, 10, 18, 0.22)' : 'rgba(248, 250, 252, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Decay mouse velocity
      mouseSpeedX *= 0.92;
      mouseSpeedY *= 0.92;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Fluid vector field noise (perlin-like curling currents)
        const angle =
          Math.sin(p.x * 0.003 + time) * Math.cos(p.y * 0.003 + time) * Math.PI * 2;
        const fieldVx = Math.cos(angle) * 0.8;
        const fieldVy = Math.sin(angle) * 0.8;

        // Mouse influence: vorticity and repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 220;

        if (dist < radius && dist > 1) {
          const force = (1 - dist / radius) * 2.5;
          // Perpendicular swirling vortex force
          const swirlX = -dy / dist * force * 1.8;
          const swirlY = dx / dist * force * 1.8;

          p.vx += swirlX + mouseSpeedX * force * 0.08;
          p.vy += swirlY + mouseSpeedY * force * 0.08;
        }

        // Apply velocities with damping
        p.vx = p.vx * 0.95 + fieldVx * 0.05;
        p.vy = p.vy * 0.95 + fieldVy * 0.05;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw glowing particle
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * (isDark ? 0.6 : 0.45);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, ${isDark ? 60 : 45}%, ${alpha})`;
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 55%, 0.5)`;
        ctx.fill();

        // Connect nearby particles with subtle fluid filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const connDist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (connDist < 75) {
            const lineAlpha = (1 - connDist / 75) * (isDark ? 0.2 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(${p.hue}, 80%, ${isDark ? 65 : 45}%, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        p.life++;
        if (p.life > p.maxLife) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.life = 0;
        }
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(mouseIdleTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 dark:opacity-60 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
