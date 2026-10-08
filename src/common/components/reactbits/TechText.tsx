'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import { cn } from '@/common/utils/cn';

export type LineStyle = 'dashed' | 'solid' | 'dotted';

export interface TechTextProps {
  /** Text content to render on the canvas. Defaults to "Rizkillah Ramanda" */
  text?: string;
  /** Primary solid fill color for text glyphs. Defaults to "#ffffff" */
  color?: string;
  /** Accent color for dashed vector paths and technical HUD markers. Defaults to "#a1a1aa" */
  accentColor?: string;
  /** Vector line style when hovered. Defaults to "dashed" */
  lineStyle?: LineStyle;
  /** Base font size in pixels. Defaults to 48 */
  fontSize?: number;
  /** Font family for glyph rendering. Defaults to JetBrains Mono with monospace fallbacks */
  fontFamily?: string;
  /** Font weight for text rendering. Defaults to 700 */
  fontWeight?: string | number;
  /** Dash length in pixels for dashed lines. Defaults to 4 */
  dashLength?: number;
  /** Gap between dashes in pixels. Defaults to 4 */
  dashGap?: number;
  /** Radius in pixels around pointer where vector morphing activates. Defaults to 85 */
  hoverRadius?: number;
  /** Speed multiplier for crawling dash animation. Defaults to 1 */
  speed?: number;
  /** Whether dashed lines crawl along letter contours when hovered. Defaults to true */
  animateDashes?: boolean;
  /** Whether mouse and touch hover interactions are enabled. Defaults to true */
  interactive?: boolean;
  /** Whether to render subtle technical corner brackets on hovered glyphs. Defaults to true */
  showBorders?: boolean;
  /** Whether to render tiny technical index tags above hovered glyphs. Defaults to false */
  showCoordinates?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Inline CSS styles */
  style?: React.CSSProperties;
  /** HTML element wrapper tag. Defaults to "div" */
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'p';
  /** Accessible label for screen readers. Defaults to the text prop */
  ariaLabel?: string;
}

interface CharGlyph {
  char: string;
  x: number;
  width: number;
  hoverProgress: number;
  targetHover: number;
}

/**
 * Converts a hex, rgb, or rgba color string to an rgba string with custom alpha.
 */
export function toRgbaString(colorStr: string, alpha: number): string {
  if (!colorStr) return `rgba(255, 255, 255, ${alpha})`;
  const trimmed = colorStr.trim();

  if (trimmed.startsWith('#')) {
    let hex = trimmed.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (trimmed.startsWith('rgb')) {
    const match = trimmed.match(/\(([^)]+)\)/);
    if (match) {
      const parts = match[1].split(',').map((p) => p.trim());
      const r = parts[0] || '255';
      const g = parts[1] || '255';
      const b = parts[2] || '255';
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  return trimmed;
}

/**
 * Returns line dash array according to specified style.
 */
function getLineDashPattern(
  style: LineStyle,
  dashLength: number,
  dashGap: number,
  strokeWidth: number
): number[] {
  switch (style) {
    case 'solid':
      return [];
    case 'dotted':
      return [Math.max(1.5, strokeWidth), Math.max(3, dashGap)];
    case 'dashed':
    default:
      return [dashLength, dashGap];
  }
}

/**
 * TechText Component
 *
 * Interactive HTML5 Canvas 2D component that transforms typography glyphs into
 * animated dashed vector paths and technical blueprint wireframes upon pointer proximity.
 */
export function TechText({
  text = 'Rizkillah Ramanda',
  color = '#ffffff',
  accentColor = '#a1a1aa',
  lineStyle = 'dashed',
  fontSize = 48,
  fontFamily = "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace, sans-serif",
  fontWeight = 700,
  dashLength = 4,
  dashGap = 4,
  hoverRadius = 85,
  speed = 1,
  animateDashes = true,
  interactive = true,
  showBorders = true,
  showCoordinates = false,
  className,
  style,
  as: Component = 'div',
  ariaLabel,
}: TechTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });
  const dashOffsetRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const id = useId();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let charGlyphs: CharGlyph[] = [];
    let effectiveFontSize = fontSize;
    let cssWidth = 300;
    let cssHeight = 80;
    let baselineY = 50;

    const updateDimensionsAndLayout = () => {
      const container = containerRef.current;
      const containerWidth = container ? container.clientWidth : 0;

      // 1. Initial measurement at base fontSize
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      const baseMeasuredWidth = ctx.measureText(text).width;

      // 2. Responsive scaling down if container is narrower than text
      const paddingX = Math.max(14, Math.round(fontSize * 0.25));
      const paddingY = Math.max(12, Math.round(fontSize * 0.25));

      if (containerWidth > 0 && baseMeasuredWidth > containerWidth - paddingX * 2) {
        const availableW = Math.max(100, containerWidth - paddingX * 2);
        const scale = availableW / (baseMeasuredWidth || 1);
        effectiveFontSize = Math.max(16, Math.floor(fontSize * scale));
      } else {
        effectiveFontSize = fontSize;
      }

      // 3. Layout character glyph positions
      ctx.font = `${fontWeight} ${effectiveFontSize}px ${fontFamily}`;
      ctx.textBaseline = 'alphabetic';

      charGlyphs = [];
      let currentX = paddingX;
      baselineY = paddingY + Math.round(effectiveFontSize * 0.95);

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const w = ctx.measureText(char).width;
        charGlyphs.push({
          char,
          x: currentX,
          width: w,
          hoverProgress: 0,
          targetHover: 0,
        });
        currentX += w;
      }

      cssWidth = Math.ceil(currentX + paddingX);
      cssHeight = Math.ceil(effectiveFontSize * 1.45 + paddingY * 2);

      // 4. DPR-aware canvas sizing
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
    };

    updateDimensionsAndLayout();

    // ResizeObserver for responsive recalculation
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateDimensionsAndLayout();
      });
      resizeObserver.observe(containerRef.current);
    }

    // Visibility Observer to pause loop when scrolled out of view
    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      });
      intersectionObserver.observe(canvas);
    }

    // Main animation & drawing loop
    let lastTime = performance.now();

    const render = (time: number) => {
      animFrameId = requestAnimationFrame(render);

      if (!isVisibleRef.current) return;

      const delta = Math.min(0.1, (time - lastTime) / 1000);
      lastTime = time;

      if (animateDashes) {
        dashOffsetRef.current = (dashOffsetRef.current - 24 * speed * delta) % 100;
      }

      const dpr = window.devicePixelRatio || 1;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const mouse = mouseRef.current;
      const strokeWidth = Math.max(1, Math.round(effectiveFontSize * 0.035));
      const dashPattern = getLineDashPattern(lineStyle, dashLength, dashGap, strokeWidth);

      ctx.font = `${fontWeight} ${effectiveFontSize}px ${fontFamily}`;
      ctx.textBaseline = 'alphabetic';

      for (let i = 0; i < charGlyphs.length; i++) {
        const glyph = charGlyphs[i];

        // Hover target calculation
        if (interactive && mouse.active) {
          const charCenterX = glyph.x + glyph.width / 2;
          const charCenterY = baselineY - effectiveFontSize * 0.4;
          const dx = mouse.x - charCenterX;
          const dy = mouse.y - charCenterY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const inDirectBounds =
            mouse.x >= glyph.x - 2 &&
            mouse.x <= glyph.x + glyph.width + 2 &&
            mouse.y >= baselineY - effectiveFontSize &&
            mouse.y <= baselineY + effectiveFontSize * 0.25;

          if (inDirectBounds) {
            glyph.targetHover = 1.0;
          } else if (dist < hoverRadius) {
            glyph.targetHover = Math.pow(1 - dist / hoverRadius, 1.25);
          } else {
            glyph.targetHover = 0.0;
          }
        } else {
          glyph.targetHover = 0.0;
        }

        // Smooth spring-like lerp transition
        const diff = glyph.targetHover - glyph.hoverProgress;
        glyph.hoverProgress += diff * 0.16;
        if (Math.abs(diff) < 0.002) {
          glyph.hoverProgress = glyph.targetHover;
        }

        if (glyph.char === ' ') continue;

        const progress = Math.min(1, Math.max(0, glyph.hoverProgress));
        const x = glyph.x;
        const y = baselineY;
        const w = glyph.width;

        // 1. Solid Typography Base (transitions out on hover)
        const solidAlpha = Math.max(0, 1 - progress * 0.88);
        if (solidAlpha > 0.02) {
          ctx.fillStyle = toRgbaString(color, solidAlpha);
          ctx.fillText(glyph.char, x, y);
        }

        // 2. Dashed Vector Paths (transitions in on hover)
        if (progress > 0.02) {
          ctx.save();
          const strokeAlpha = Math.min(1, progress * 1.3);
          ctx.strokeStyle = toRgbaString(accentColor, strokeAlpha);
          ctx.lineWidth = strokeWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.setLineDash(dashPattern);
          if (animateDashes) {
            ctx.lineDashOffset = dashOffsetRef.current;
          }
          ctx.strokeText(glyph.char, x, y);
          ctx.restore();

          // 3. Technical Blueprint Corner Brackets & Dashed Baseline Guide
          if (showBorders && progress > 0.08) {
            ctx.save();
            const borderAlpha = progress * 0.55;
            ctx.strokeStyle = toRgbaString(accentColor, borderAlpha);
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 2]);

            const boxLeft = Math.round(x - 2);
            const boxRight = Math.round(x + w + 2);
            const boxTop = Math.round(baselineY - effectiveFontSize * 0.88);
            const boxBottom = Math.round(baselineY + effectiveFontSize * 0.22);
            const cornerLen = Math.min(5, Math.max(3, w * 0.35));

            // Top-left bracket
            ctx.beginPath();
            ctx.moveTo(boxLeft, boxTop + cornerLen);
            ctx.lineTo(boxLeft, boxTop);
            ctx.lineTo(boxLeft + cornerLen, boxTop);
            ctx.stroke();

            // Bottom-right bracket
            ctx.beginPath();
            ctx.moveTo(boxRight, boxBottom - cornerLen);
            ctx.lineTo(boxRight, boxBottom);
            ctx.lineTo(boxRight - cornerLen, boxBottom);
            ctx.stroke();

            // Dashed baseline vector guide
            ctx.beginPath();
            ctx.moveTo(boxLeft, boxBottom + 2);
            ctx.lineTo(boxRight, boxBottom + 2);
            ctx.stroke();

            ctx.restore();
          }

          // 4. Technical Coordinate Index Tags
          if (showCoordinates && progress > 0.15) {
            ctx.save();
            const coordAlpha = progress * 0.65;
            ctx.fillStyle = toRgbaString(accentColor, coordAlpha);
            const tagFontSize = Math.max(7, Math.round(effectiveFontSize * 0.16));
            ctx.font = `600 ${tagFontSize}px ${fontFamily}`;
            const tag = `[${i < 9 ? '0' + (i + 1) : i + 1}]`;
            const boxTop = Math.round(baselineY - effectiveFontSize * 0.88);
            ctx.fillText(tag, x, boxTop - 3);
            ctx.restore();
          }
        }
      }

      ctx.restore();
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      if (intersectionObserver) intersectionObserver.disconnect();
    };
  }, [
    text,
    color,
    accentColor,
    lineStyle,
    fontSize,
    fontFamily,
    fontWeight,
    dashLength,
    dashGap,
    hoverRadius,
    speed,
    animateDashes,
    interactive,
    showBorders,
    showCoordinates,
  ]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current = {
      x: -1000,
      y: -1000,
      active: false,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    handlePointerMove(e);
  };

  const ComponentTag = Component || 'div';

  return React.createElement(
    ComponentTag,
    {
      ref: containerRef,
      id: `tech-text-${id}`,
      className: cn(
        'relative inline-block select-none max-w-full overflow-visible transition-colors',
        className
      ),
      style,
      role: 'img',
      'aria-label': ariaLabel || text,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      onPointerDown: handlePointerDown,
    },
    React.createElement(
      'span',
      {
        className: 'sr-only',
      },
      text
    ),
    React.createElement('canvas', {
      ref: canvasRef,
      'aria-hidden': 'true',
      className: 'block max-w-full',
      style: { touchAction: 'none' },
    })
  );
}

export default TechText;
