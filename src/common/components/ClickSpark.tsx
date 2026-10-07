'use client';

import React, { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkCount?: number;
  duration?: number;
}

export function ClickSpark({
  sparkColor = '#38BDF8',
  sparkSize = 8,
  sparkCount = 8,
  duration = 450,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [sparkColor, '#60A5FA', '#93C5FD', '#FFFFFF'];

    const handleClick = (e: MouseEvent) => {
      // Don't trigger if target is an interactive slider or audio
      const clickX = e.clientX;
      const clickY = e.clientY;

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 2.5 + 1.8;
        sparksRef.current.push({
          x: clickX,
          y: clickY,
          angle,
          speed,
          size: Math.random() * (sparkSize - 3) + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 1000 / (duration * 60),
        });
      }

      if (!animFrameRef.current) {
        animate();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const spark = sparksRef.current[i];
        spark.x += Math.cos(spark.angle) * spark.speed;
        spark.y += Math.sin(spark.angle) * spark.speed;
        spark.alpha -= spark.decay;
        spark.speed *= 0.94; // friction

        if (spark.alpha <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, spark.alpha);
        ctx.strokeStyle = spark.color;
        ctx.fillStyle = spark.color;
        ctx.lineWidth = 1.5;

        // Draw spark line
        const tailX = spark.x - Math.cos(spark.angle) * (spark.size * 1.5);
        const tailY = spark.y - Math.sin(spark.angle) * (spark.size * 1.5);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(spark.x, spark.y);
        ctx.stroke();

        // Tip glow
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      if (sparksRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        animFrameRef.current = null;
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [sparkColor, sparkSize, sparkCount, duration]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      aria-hidden="true"
    />
  );
}
