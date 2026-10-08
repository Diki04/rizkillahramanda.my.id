'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { cn } from '@/common/utils/cn';

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface BorderGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number | string;
  glowRadius?: number;
  glowIntensity?: number;
  edgeSensitivity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
  noGlow?: boolean;
  style?: React.CSSProperties;
  [key: `data-${string}`]: unknown;
}

export const DEFAULT_COLORS = ['#ffffff', '#a1a1aa', '#71717a'];

/**
 * Parses an HSL color string or hex/rgb string into structured HSL components.
 * Supports monochrome shorthand formats such as "0 0% 100%" or "0 0% 80%".
 */
export function parseHSL(hslStr?: string): HslColor {
  if (!hslStr || typeof hslStr !== 'string') {
    return { h: 0, s: 0, l: 100 };
  }

  const trimmed = hslStr.trim();

  // 1. Hex color parsing: #fff or #ffffff
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) {
    let hex = trimmed.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
          break;
        case g:
          h = ((b - r) / d + 2) * 60;
          break;
        case b:
          h = ((r - g) / d + 4) * 60;
          break;
      }
    }
    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  // 2. RGB/RGBA color parsing: rgb(255, 255, 255)
  const rgbMatch = trimmed.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (rgbMatch) {
    const r = parseFloat(rgbMatch[1]) / 255;
    const g = parseFloat(rgbMatch[2]) / 255;
    const b = parseFloat(rgbMatch[3]) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
          break;
        case g:
          h = ((b - r) / d + 2) * 60;
          break;
        case b:
          h = ((r - g) / d + 4) * 60;
          break;
      }
    }
    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  // 3. HSL shorthand or function: "0 0% 100%", "hsl(0 0% 100%)", "243deg 75% 65%"
  const clean = trimmed.replace(/^hsla?\(|\)$/gi, '').replace(/deg/gi, '');
  const matches = clean.match(/([\d.]+)/g);
  if (matches && matches.length >= 3) {
    const h = parseFloat(matches[0]);
    const s = parseFloat(matches[1]);
    const l = parseFloat(matches[2]);
    return {
      h: isNaN(h) ? 0 : h,
      s: isNaN(s) ? 0 : s,
      l: isNaN(l) ? 100 : l,
    };
  }

  return { h: 0, s: 0, l: 100 };
}

/**
 * Builds CSS variable map for luminous multi-layer border box-shadow and glow rings.
 */
export function buildGlowVars(
  glowColor: string = '0 0% 100%',
  intensity: number = 1.0
): Record<string, string> {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars: Record<string, string> = {};
  for (let i = 0; i < opacities.length; i++) {
    const alpha = Math.min(Math.max(opacities[i] * intensity, 0), 100);
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${alpha}%)`;
  }
  return vars;
}

export const GRADIENT_POSITIONS = [
  '80% 55%',
  '69% 34%',
  '8% 6%',
  '41% 38%',
  '86% 85%',
  '82% 18%',
  '51% 4%',
];

export const GRADIENT_KEYS = [
  '--gradient-one',
  '--gradient-two',
  '--gradient-three',
  '--gradient-four',
  '--gradient-five',
  '--gradient-six',
  '--gradient-seven',
];

export const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

/**
 * Builds radial gradient CSS variables mapped across 7 perimeter light anchors.
 */
export function buildGradientVars(colors: string[]): Record<string, string> {
  const vars: Record<string, string> = {};
  const palette = colors.length > 0 ? colors : DEFAULT_COLORS;
  for (let i = 0; i < 7; i++) {
    const c = palette[Math.min(COLOR_MAP[i], palette.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${palette[0]} 0 100%)`;
  return vars;
}

/**
 * Calculates element center coordinates.
 */
export function getCenterOfElement(rect: { width: number; height: number }): [number, number] {
  return [rect.width / 2, rect.height / 2];
}

/**
 * Calculates edge proximity normalized between 0 (center) and 1 (perimeter border).
 */
export function getEdgeProximity(width: number, height: number, x: number, y: number): number {
  if (width <= 0 || height <= 0) return 0;
  const cx = width / 2;
  const cy = height / 2;
  const dx = x - cx;
  const dy = y - cy;
  let kx = Infinity;
  let ky = Infinity;
  if (dx !== 0) kx = cx / Math.abs(dx);
  if (dy !== 0) ky = cy / Math.abs(dy);
  return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
}

/**
 * Calculates pointer angle in degrees relative to element center (0deg = top, clockwise).
 */
export function getCursorAngle(width: number, height: number, x: number, y: number): number {
  const cx = width / 2;
  const cy = height / 2;
  const dx = x - cx;
  const dy = y - cy;
  if (dx === 0 && dy === 0) return 0;
  const radians = Math.atan2(dy, dx);
  let degrees = radians * (180 / Math.PI) + 90;
  if (degrees < 0) degrees += 360;
  return degrees;
}

export function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export function easeInCubic(x: number): number {
  return x * x * x;
}

export interface AnimateValueOptions {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (t: number) => number;
  onUpdate: (value: number) => void;
  onEnd?: () => void;
}

/**
 * Smoothly animates a numeric value with frame interpolation and cancellation support.
 */
export function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: AnimateValueOptions): () => void {
  if (typeof window === 'undefined') return () => {};

  const raf =
    typeof requestAnimationFrame === 'function'
      ? requestAnimationFrame
      : (cb: FrameRequestCallback) => (setTimeout(cb, 16) as unknown as number);
  const caf =
    typeof cancelAnimationFrame === 'function'
      ? cancelAnimationFrame
      : (id: number) => clearTimeout(id as unknown as NodeJS.Timeout);

  let frameId: number | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  timeoutId = setTimeout(() => {
    const t0 = performance.now();
    function tick() {
      const elapsed = performance.now() - t0;
      const t = Math.min(elapsed / duration, 1);
      onUpdate(start + (end - start) * ease(t));
      if (t < 1) {
        frameId = raf(tick);
      } else if (onEnd) {
        onEnd();
      }
    }
    frameId = raf(tick);
  }, delay);

  return () => {
    if (timeoutId !== null) clearTimeout(timeoutId);
    if (frameId !== null) caf(frameId);
  };
}

export const BORDER_GLOW_STYLES = `
.border-glow-card {
  --edge-proximity: 0;
  --cursor-angle: 45deg;
  --edge-sensitivity: 30;
  --color-sensitivity: calc(var(--edge-sensitivity) + 20);
  --border-radius: 16px;
  --glow-padding: 40px;
  --cone-spread: 25;

  position: relative;
  border-radius: var(--border-radius);
  isolation: isolate;
  transform: translate3d(0, 0, 0.01px);
  display: grid;
  border: 1px solid rgb(255 255 255 / 10%);
  background: var(--card-bg, #000000);
  overflow: visible;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 1px 2px,
    rgba(0, 0, 0, 0.2) 0px 4px 8px,
    rgba(0, 0, 0, 0.2) 0px 16px 32px;
}

.border-glow-static::before,
.border-glow-static::after,
.border-glow-static > .edge-light,
.border-glow-static > .edge-light::before {
  display: none !important;
}

.border-glow-card::before,
.border-glow-card::after,
.border-glow-card > .edge-light {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  transition: opacity 0.25s ease-out;
  z-index: -1;
}

.border-glow-card:not(:hover):not(:focus-within):not(.sweep-active)::before,
.border-glow-card:not(:hover):not(:focus-within):not(.sweep-active)::after,
.border-glow-card:not(:hover):not(:focus-within):not(.sweep-active) > .edge-light {
  opacity: 0;
  transition: opacity 0.75s ease-in-out;
}

.border-glow-card::before {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--card-bg, #000000) 0 100%) padding-box,
    linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box,
    var(--gradient-one, radial-gradient(at 80% 55%, #ffffff 0px, transparent 50%)) border-box,
    var(--gradient-two, radial-gradient(at 69% 34%, #a1a1aa 0px, transparent 50%)) border-box,
    var(--gradient-three, radial-gradient(at 8% 6%, #71717a 0px, transparent 50%)) border-box,
    var(--gradient-four, radial-gradient(at 41% 38%, #ffffff 0px, transparent 50%)) border-box,
    var(--gradient-five, radial-gradient(at 86% 85%, #71717a 0px, transparent 50%)) border-box,
    var(--gradient-six, radial-gradient(at 82% 18%, #a1a1aa 0px, transparent 50%)) border-box,
    var(--gradient-seven, radial-gradient(at 51% 4%, #ffffff 0px, transparent 50%)) border-box,
    var(--gradient-base, linear-gradient(#ffffff 0 100%)) border-box;

  opacity: calc((var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)));

  mask-image:
    conic-gradient(
      from var(--cursor-angle) at center,
      black calc(var(--cone-spread) * 1%),
      transparent calc((var(--cone-spread) + 15) * 1%),
      transparent calc((100 - var(--cone-spread) - 15) * 1%),
      black calc((100 - var(--cone-spread)) * 1%)
    );
  -webkit-mask-image:
    conic-gradient(
      from var(--cursor-angle) at center,
      black calc(var(--cone-spread) * 1%),
      transparent calc((var(--cone-spread) + 15) * 1%),
      transparent calc((100 - var(--cone-spread) - 15) * 1%),
      black calc((100 - var(--cone-spread)) * 1%)
    );
}

.border-glow-card::after {
  border: 1px solid transparent;
  background:
    var(--gradient-one) padding-box,
    var(--gradient-two) padding-box,
    var(--gradient-three) padding-box,
    var(--gradient-four) padding-box,
    var(--gradient-five) padding-box,
    var(--gradient-six) padding-box,
    var(--gradient-seven) padding-box,
    var(--gradient-base) padding-box;

  mask-image:
    linear-gradient(to bottom, black, black),
    radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
    radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
    conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%);
  -webkit-mask-image:
    linear-gradient(to bottom, black, black),
    radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
    radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
    conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%);

  mask-composite: subtract, add, add, add, add, add;
  -webkit-mask-composite: source-out, destination-over, destination-over, destination-over, destination-over, destination-over;
  opacity: calc(var(--fill-opacity, 0.5) * (var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)));
  mix-blend-mode: soft-light;
}

.border-glow-card > .edge-light {
  inset: calc(var(--glow-padding) * -1);
  pointer-events: none;
  z-index: 1;
  mask-image:
    conic-gradient(
      from var(--cursor-angle) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%
    );
  -webkit-mask-image:
    conic-gradient(
      from var(--cursor-angle) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%
    );
  opacity: calc((var(--edge-proximity) - var(--edge-sensitivity)) / (100 - var(--edge-sensitivity)));
  mix-blend-mode: plus-lighter;
}

.border-glow-card > .edge-light::before {
  content: "";
  position: absolute;
  inset: var(--glow-padding);
  border-radius: inherit;
  box-shadow:
    inset 0 0 0 1px var(--glow-color, hsl(0deg 0% 100% / 100%)),
    inset 0 0 1px 0 var(--glow-color-60, hsl(0deg 0% 100% / 60%)),
    inset 0 0 3px 0 var(--glow-color-50, hsl(0deg 0% 100% / 50%)),
    inset 0 0 6px 0 var(--glow-color-40, hsl(0deg 0% 100% / 40%)),
    inset 0 0 15px 0 var(--glow-color-30, hsl(0deg 0% 100% / 30%)),
    inset 0 0 25px 2px var(--glow-color-20, hsl(0deg 0% 100% / 20%)),
    inset 0 0 50px 2px var(--glow-color-10, hsl(0deg 0% 100% / 10%)),
    0 0 1px 0 var(--glow-color-60, hsl(0deg 0% 100% / 60%)),
    0 0 3px 0 var(--glow-color-50, hsl(0deg 0% 100% / 50%)),
    0 0 6px 0 var(--glow-color-40, hsl(0deg 0% 100% / 40%)),
    0 0 15px 0 var(--glow-color-30, hsl(0deg 0% 100% / 30%)),
    0 0 25px 2px var(--glow-color-20, hsl(0deg 0% 100% / 20%)),
    0 0 50px 2px var(--glow-color-10, hsl(0deg 0% 100% / 10%));
}

.border-glow-inner {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: visible;
  z-index: 1;
}
`;

/**
 * Pure OLED Monochrome BorderGlow perimeter highlight component.
 * Wraps content with edge-tracing conical perimeter glow tracking cursor position.
 */
export const BorderGlow = React.forwardRef<HTMLDivElement, BorderGlowProps>(
  function BorderGlow(
    {
      children,
      className,
      contentClassName,
      glowColor = '0 0% 100%',
      backgroundColor = '#000000',
      borderRadius = 16,
      glowRadius = 40,
      glowIntensity = 1.0,
      edgeSensitivity = 30,
      coneSpread = 25,
      animated = false,
      colors = DEFAULT_COLORS,
      fillOpacity = 0.4,
      noGlow = false,
      style,
      onPointerMove,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    },
    forwardedRef
  ) {
    const internalRef = useRef<HTMLDivElement | null>(null);

    const handleRef = useCallback(
      (node: HTMLDivElement | null) => {
        (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [forwardedRef]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (noGlow) return;
        const card = internalRef.current;
        if (!card) return;
        if (typeof card.getBoundingClientRect === 'function') {
          const rect = card.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const edge = getEdgeProximity(rect.width, rect.height, x, y);
            const angle = getCursorAngle(rect.width, rect.height, x, y);
            card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
            card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
          }
        }
        onPointerMove?.(e);
      },
      [noGlow, onPointerMove]
    );

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        handlePointerMove(e as unknown as React.PointerEvent<HTMLDivElement>);
        onMouseMove?.(e);
      },
      [handlePointerMove, onMouseMove]
    );

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onMouseEnter?.(e);
      },
      [onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const card = internalRef.current;
        if (card) {
          card.style.setProperty('--edge-proximity', '0');
        }
        onMouseLeave?.(e);
      },
      [onMouseLeave]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
        const card = internalRef.current;
        if (card && !noGlow) {
          card.style.setProperty('--edge-proximity', '100');
        }
        onFocus?.(e);
      },
      [noGlow, onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
        const card = internalRef.current;
        if (card) {
          card.style.setProperty('--edge-proximity', '0');
        }
        onBlur?.(e);
      },
      [onBlur]
    );

    useEffect(() => {
      if (!animated || !internalRef.current) return;
      const card = internalRef.current;
      const angleStart = 110;
      const angleEnd = 465;
      card.classList.add('sweep-active');
      card.style.setProperty('--cursor-angle', `${angleStart}deg`);

      const cleanups: Array<() => void> = [];

      cleanups.push(
        animateValue({
          duration: 500,
          onUpdate: (v) => card.style.setProperty('--edge-proximity', v.toFixed(3)),
        })
      );

      cleanups.push(
        animateValue({
          ease: easeInCubic,
          duration: 1500,
          end: 50,
          onUpdate: (v) => {
            const deg = (angleEnd - angleStart) * (v / 100) + angleStart;
            card.style.setProperty('--cursor-angle', `${deg.toFixed(3)}deg`);
          },
        })
      );

      cleanups.push(
        animateValue({
          ease: easeOutCubic,
          delay: 1500,
          duration: 2250,
          start: 50,
          end: 100,
          onUpdate: (v) => {
            const deg = (angleEnd - angleStart) * (v / 100) + angleStart;
            card.style.setProperty('--cursor-angle', `${deg.toFixed(3)}deg`);
          },
        })
      );

      cleanups.push(
        animateValue({
          ease: easeInCubic,
          delay: 2500,
          duration: 1500,
          start: 100,
          end: 0,
          onUpdate: (v) => card.style.setProperty('--edge-proximity', v.toFixed(3)),
          onEnd: () => card.classList.remove('sweep-active'),
        })
      );

      return () => {
        cleanups.forEach((c) => c());
        card.classList.remove('sweep-active');
      };
    }, [animated]);

    const formattedRadius =
      typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
    const glowVars = buildGlowVars(glowColor, glowIntensity);
    const gradientVars = buildGradientVars(colors);

    const mergedStyles: React.CSSProperties = {
      '--card-bg': backgroundColor,
      '--edge-sensitivity': edgeSensitivity,
      '--border-radius': formattedRadius,
      '--glow-padding': `${glowRadius}px`,
      '--cone-spread': coneSpread,
      '--fill-opacity': fillOpacity,
      ...glowVars,
      ...gradientVars,
      ...style,
    } as React.CSSProperties;

    return React.createElement(
      'div',
      {
        ref: handleRef,
        onPointerMove: noGlow ? undefined : handlePointerMove,
        onMouseMove: noGlow ? undefined : handleMouseMove,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        className: cn('border-glow-card', noGlow && 'border-glow-static', className),
        style: mergedStyles,
        ...props,
      },
      React.createElement('style', {
        dangerouslySetInnerHTML: { __html: BORDER_GLOW_STYLES },
      }),
      React.createElement('span', {
        className: 'edge-light',
        'data-testid': 'border-glow-edge-light',
        'aria-hidden': 'true',
      }),
      React.createElement(
        'div',
        {
          className: cn('border-glow-inner', contentClassName),
          'data-testid': 'border-glow-inner',
        },
        children
      )
    );
  }
);

BorderGlow.displayName = 'BorderGlow';

export default BorderGlow;
