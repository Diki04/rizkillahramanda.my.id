'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/common/contexts/ThemeContext';

export function SmoothFluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Grid resolution for wave equation
    const cols = 90;
    const rows = 55;
    let cellW = width / cols;
    let cellH = height / rows;

    // Buffer 1 and Buffer 2 for 2D wave heightfield simulation
    let buffer1 = new Float32Array(cols * rows);
    let buffer2 = new Float32Array(cols * rows);
    const damping = 0.975;

    // Active ripples pool for continuous smooth mouse wake
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      intensity: number;
      speed: number;
    }
    const ripples: Ripple[] = [];

    let prevMouseX = width / 2;
    let prevMouseY = height / 2;
    let mouseSpeed = 0;
    let isMouseActive = false;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cellW = width / cols;
      cellH = height / rows;
      buffer1 = new Float32Array(cols * rows);
      buffer2 = new Float32Array(cols * rows);
    };

    const addDisturbance = (clientX: number, clientY: number, power = 18) => {
      const col = Math.floor((clientX / width) * cols);
      const row = Math.floor((clientY / height) * rows);
      const radius = 3;

      for (let r = -radius; r <= radius; r++) {
        for (let c = -radius; c <= radius; c++) {
          const targetCol = col + c;
          const targetRow = row + r;
          if (
            targetCol > 0 &&
            targetCol < cols - 1 &&
            targetRow > 0 &&
            targetRow < rows - 1
          ) {
            const dist = Math.sqrt(c * c + r * r);
            if (dist <= radius) {
              const falloff = 1 - dist / radius;
              buffer1[targetRow * cols + targetCol] += power * falloff;
            }
          }
        }
      }

      // Also trigger a smooth visual ripple ring
      if (ripples.length < 18) {
        ripples.push({
          x: clientX,
          y: clientY,
          radius: 4,
          maxRadius: Math.min(width, height) * 0.45,
          intensity: Math.min(power * 0.04, 0.65),
          speed: 2.2 + mouseSpeed * 0.08,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      isMouseActive = true;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      mouseSpeed = Math.min(Math.sqrt(dx * dx + dy * dy), 35);

      // Deposit water ripple impulse
      addDisturbance(e.clientX, e.clientY, 12 + mouseSpeed * 0.8);

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      // 1. Natural idle ambient water currents (gentle organic swelling)
      for (let c = 2; c < cols - 2; c += 4) {
        for (let r = 2; r < rows - 2; r += 4) {
          const wave =
            Math.sin(c * 0.15 + time * 0.8) *
            Math.cos(r * 0.18 + time * 0.6) *
            0.45;
          buffer1[r * cols + c] += wave;
        }
      }

      // 2. Wave equation propagation: update heightfield
      for (let r = 1; r < rows - 1; r++) {
        const rowOffset = r * cols;
        for (let c = 1; c < cols - 1; c++) {
          const idx = rowOffset + c;
          const val =
            (buffer1[idx - 1] +
              buffer1[idx + 1] +
              buffer1[idx - cols] +
              buffer1[idx + cols]) /
              2 -
            buffer2[idx];
          buffer2[idx] = val * damping;
        }
      }

      // Swap buffers
      const temp = buffer1;
      buffer1 = buffer2;
      buffer2 = temp;

      // 3. Render organic water ripple mesh lines (horizontal water contours)
      ctx.lineWidth = 1.2;
      const strokeAlpha = isDark ? 0.22 : 0.15;
      const primaryColor = isDark
        ? `rgba(56, 189, 248, ${strokeAlpha})`
        : `rgba(14, 165, 233, ${strokeAlpha})`;
      const peakColor = isDark
        ? 'rgba(125, 211, 252, 0.45)'
        : 'rgba(2, 132, 199, 0.35)';

      for (let r = 2; r < rows - 2; r += 2) {
        ctx.beginPath();
        const yBase = r * cellH;

        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const displacement = buffer1[idx] * 2.2;
          const x = c * cellW;
          const y = yBase + displacement;

          if (c === 0) {
            ctx.moveTo(x, y);
          } else {
            // Smooth bezier through wave points
            const prevX = (c - 1) * cellW;
            const prevIdx = r * cols + (c - 1);
            const prevY = yBase + buffer1[prevIdx] * 2.2;
            const midX = (prevX + x) / 2;
            const midY = (prevY + y) / 2;
            ctx.quadraticCurveTo(prevX, prevY, midX, midY);
          }
        }

        ctx.strokeStyle = primaryColor;
        ctx.stroke();
      }

      // 4. Render concentric expanding water droplets / wake ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += rp.speed;
        rp.intensity *= 0.965;

        if (rp.intensity <= 0.01 || rp.radius >= rp.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw refractive liquid ring
        const ringGrad = ctx.createRadialGradient(
          rp.x,
          rp.y,
          Math.max(0, rp.radius - 24),
          rp.x,
          rp.y,
          rp.radius
        );

        if (isDark) {
          ringGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
          ringGrad.addColorStop(
            0.6,
            `rgba(56, 189, 248, ${rp.intensity * 0.28})`
          );
          ringGrad.addColorStop(
            0.85,
            `rgba(125, 211, 252, ${rp.intensity * 0.45})`
          );
          ringGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        } else {
          ringGrad.addColorStop(0, 'rgba(14, 165, 233, 0)');
          ringGrad.addColorStop(
            0.6,
            `rgba(14, 165, 233, ${rp.intensity * 0.22})`
          );
          ringGrad.addColorStop(
            0.85,
            `rgba(2, 132, 199, ${rp.intensity * 0.35})`
          );
          ringGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
        }

        ctx.fillStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.fill();

        // Thin caustic rim line
        ctx.strokeStyle = isDark
          ? `rgba(186, 230, 253, ${rp.intensity * 0.5})`
          : `rgba(3, 105, 161, ${rp.intensity * 0.35})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius * 0.95, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5. Cursor liquid spotlight glow
      if (isMouseActive) {
        const mouseGlow = ctx.createRadialGradient(
          prevMouseX,
          prevMouseY,
          0,
          prevMouseX,
          prevMouseY,
          180
        );
        if (isDark) {
          mouseGlow.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
          mouseGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)');
          mouseGlow.addColorStop(1, 'rgba(7, 10, 18, 0)');
        } else {
          mouseGlow.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
          mouseGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.06)');
          mouseGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(prevMouseX, prevMouseY, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90 transition-opacity duration-500"
        aria-hidden="true"
      />
      {/* Subtle depth overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.18] [background-image:radial-gradient(rgba(56,189,248,0.2)_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />
    </>
  );
}
