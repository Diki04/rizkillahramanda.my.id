'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';
import { cn } from '@/common/utils/cn';

export type SpecularButtonSize = 'sm' | 'md' | 'lg';

export interface SpecularButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Specular rim highlight color. Defaults to pure white "#ffffff" */
  lineColor?: string;
  /** Button background / fill color. Defaults to OLED zinc "#52525b" */
  baseColor?: string;
  /** Button text and icon color. Defaults to "#ffffff" */
  textColor?: string;
  /** Border corner radius in pixels. Defaults to 14 */
  radius?: number;
  /** Button size variant: 'sm' | 'md' | 'lg'. Defaults to "md" */
  size?: SpecularButtonSize;
  /** Border rim stroke width in pixels. Defaults to 1.5 */
  borderWidth?: number;
  /** Cursor proximity threshold in pixels where specular highlights intensify. Defaults to 250 */
  proximity?: number;
  /** Specular highlight brightness intensity multiplier. Defaults to 2.0 */
  intensity?: number;
  /** Specular reflection shininess exponent. Defaults to 20.0 */
  gloss?: number;
  /** Additional CSS class names */
  className?: string;
  /** Inline CSS styles */
  style?: React.CSSProperties;
  /** Button contents */
  children?: React.ReactNode;
}

/**
 * Robustly parses a color string into a GLSL-compatible normalized RGB vec3 [r, g, b].
 */
export function parseColorToVec3(
  colorStr?: string,
  fallback: [number, number, number] = [1, 1, 1]
): [number, number, number] {
  if (!colorStr) return fallback;
  const str = colorStr.trim();
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(str)) {
    try {
      const c = new Color(str);
      return [c.r, c.g, c.b];
    } catch {
      return fallback;
    }
  }
  if (/^rgba?\(/i.test(str)) {
    const match = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (match) {
      const r = parseFloat(match[1]) / 255;
      const g = parseFloat(match[2]) / 255;
      const b = parseFloat(match[3]) / 255;
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return [
          Math.max(0, Math.min(1, r)),
          Math.max(0, Math.min(1, g)),
          Math.max(0, Math.min(1, b)),
        ];
      }
    }
  }
  return fallback;
}

const VERTEX_SHADER = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uBorderWidth;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uProximity;
uniform float uIntensity;
uniform float uGloss;
uniform float uTime;

varying vec2 vUv;

// 2D Signed Distance Function for a rounded box centered at origin
float sdRoundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + vec2(r);
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

// Surface normal on rounded box boundary via central difference
vec2 getNormal(vec2 p, vec2 b, float r) {
  vec2 eps = vec2(1.0, 0.0);
  return normalize(vec2(
    sdRoundedBox(p + eps.xy, b, r) - sdRoundedBox(p - eps.xy, b, r),
    sdRoundedBox(p + eps.yx, b, r) - sdRoundedBox(p - eps.yx, b, r)
  ));
}

void main() {
  // Map vUv [0, 1] to centered pixel coordinates [-uResolution/2, uResolution/2]
  vec2 p = (vUv - 0.5) * uResolution;

  // Box dimensions inset by half border width
  vec2 halfSize = max((uResolution - vec2(uBorderWidth * 2.0)) * 0.5, vec2(1.0));
  float r = clamp(uRadius, 0.0, min(halfSize.x, halfSize.y));

  // Distance to rounded rectangle boundary
  float d = sdRoundedBox(p, halfSize, r);

  // Normal vector at current coordinate
  vec2 n = getNormal(p, halfSize, r);

  // Light vector pointing towards the cursor
  vec2 toMouse = uMouse - p;
  float mouseDist = length(toMouse);
  vec2 lightDir = mouseDist > 0.001 ? normalize(toMouse) : vec2(0.0, 1.0);

  // Proximity falloff: 1.0 near button, fades smoothly to 0.0 at uProximity
  float prox = clamp(1.0 - (mouseDist / max(uProximity, 1.0)), 0.0, 1.0);
  prox = smoothstep(0.0, 1.0, prox);

  // Specular rim reflection
  float nDotL = max(dot(n, lightDir), 0.0);
  float specular = pow(nDotL, max(uGloss, 1.0));

  // Rim highlight factor
  float baseRim = 0.2;
  float rimLight = baseRim + specular * uIntensity * (0.3 + 0.7 * prox);

  // Anti-aliased outer edge and inner rim boundary
  float outerAA = 1.0 - smoothstep(0.0, 1.2, d);
  float innerAA = smoothstep(-uBorderWidth - 1.0, -uBorderWidth, d);
  float rimMask = innerAA * outerAA;

  // Interior color with subtle dynamic glass reflection towards cursor
  float interiorSheen = clamp(1.0 - (mouseDist / (uProximity * 0.75)), 0.0, 1.0) * 0.15 * prox;
  vec3 interiorColor = mix(uBaseColor, uLineColor, interiorSheen);

  // Composite rim highlight over interior
  vec3 col = mix(interiorColor, uLineColor * rimLight, rimMask);

  // Subtle bloom outside the boundary when mouse is close
  float bloomDist = max(d, 0.0);
  float bloom = exp(-bloomDist * 0.8) * specular * uIntensity * prox * 0.35 * step(0.0, d);
  col += uLineColor * bloom;

  // Final alpha calculation with anti-aliasing
  float alpha = outerAA;
  alpha = max(alpha, bloom);

  if (alpha < 0.01) {
    discard;
  }

  gl_FragColor = vec4(col, alpha);
}
`;

const sizeStyles: Record<SpecularButtonSize, string> = {
  sm: 'h-9 px-4 text-xs font-medium gap-1.5 rounded-lg',
  md: 'h-11 px-6 text-sm font-semibold gap-2 rounded-xl',
  lg: 'h-12 px-8 text-base font-semibold gap-2.5 rounded-xl',
};

const baseStyles =
  'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:focus:ring-white/40 active:scale-[0.98] select-none cursor-pointer overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-md';

const fallbackStyles =
  'bg-white text-slate-900 border border-slate-300 hover:border-slate-400 dark:bg-zinc-900/90 dark:text-white dark:border-white/20 dark:hover:border-white/40';

/**
 * SpecularButton Component:
 * A glass-like interactive button featuring a signed-distance-field (SDF) WebGL shader
 * with dynamic specular rim reflections following cursor proximity and angle.
 */
export const SpecularButton = React.forwardRef<HTMLButtonElement, SpecularButtonProps>(
  (
    {
      lineColor = '#ffffff',
      baseColor = '#52525b',
      textColor = '#ffffff',
      radius = 14,
      size = 'md',
      borderWidth = 1.5,
      proximity = 250,
      intensity = 2.0,
      gloss = 20.0,
      className,
      style,
      disabled = false,
      type = 'button',
      onClick,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLButtonElement | null>(null);
    const [isWebGLActive, setIsWebGLActive] = useState(false);

    const handleRef = (node: HTMLButtonElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    };

    useEffect(() => {
      const button = internalRef.current;
      if (typeof window === 'undefined' || typeof document === 'undefined' || !button) {
        return;
      }

      let renderer: Renderer | null = null;

      try {
        renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio || 1, 2),
          alpha: true,
          antialias: true,
          premultipliedAlpha: true,
        });
      } catch {
        return;
      }

      if (!renderer || !renderer.gl) {
        return;
      }

      const gl = renderer.gl;

      gl.clearColor(0, 0, 0, 0);
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.className = 'absolute inset-0 w-full h-full pointer-events-none rounded-[inherit]';
      canvas.style.borderRadius = `${radius}px`;
      canvas.setAttribute('aria-hidden', 'true');

      // Insert canvas behind the button contents
      button.insertBefore(canvas, button.firstChild);
      setIsWebGLActive(true);

      let alive = true;
      let rafId: number | null = null;
      let width = Math.max(1, button.clientWidth);
      let height = Math.max(1, button.clientHeight);

      const targetMouse = { x: 0, y: 150 };
      const currentMouse = { x: 0, y: 150 };
      const startTime = performance.now();

      const uniforms = {
        uResolution: { value: [width * renderer.dpr, height * renderer.dpr] },
        uMouse: { value: [0, 150 * renderer.dpr] },
        uRadius: { value: radius * renderer.dpr },
        uBorderWidth: { value: borderWidth * renderer.dpr },
        uLineColor: { value: parseColorToVec3(lineColor, [1, 1, 1]) },
        uBaseColor: { value: parseColorToVec3(baseColor, [0.322, 0.322, 0.357]) },
        uProximity: { value: proximity * renderer.dpr },
        uIntensity: { value: intensity },
        uGloss: { value: gloss },
        uTime: { value: 0 },
      };

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: VERTEX_SHADER,
        fragment: FRAGMENT_SHADER,
        uniforms,
        depthTest: false,
        depthWrite: false,
        transparent: true,
      });
      const mesh = new Mesh(gl, { geometry, program });

      const updateDimensions = (w: number, h: number) => {
        if (!renderer || !alive) return;
        width = Math.max(1, w);
        height = Math.max(1, h);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderer.dpr = dpr;
        renderer.setSize(width, height);
        uniforms.uResolution.value = [width * dpr, height * dpr];
        uniforms.uRadius.value = radius * dpr;
        uniforms.uBorderWidth.value = borderWidth * dpr;
        uniforms.uProximity.value = proximity * dpr;
      };

      updateDimensions(width, height);

      let isVisible = true;
      let isRendering = false;
      let idleFrames = 0;

      const triggerRender = () => {
        if (!alive || !renderer || !isVisible) return;
        if (!isRendering) {
          isRendering = true;
          rafId = requestAnimationFrame(loop);
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!alive || !button) return;
        const rect = button.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        targetMouse.x = e.clientX - cx;
        targetMouse.y = -(e.clientY - cy);
        triggerRender();
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width: w, height: h } = entry.contentRect;
            if (w > 0 && h > 0) {
              updateDimensions(w, h);
              triggerRender();
            }
          }
        });
        resizeObserver.observe(button);
      }

      let intersectionObserver: IntersectionObserver | null = null;
      if (typeof IntersectionObserver !== 'undefined') {
        intersectionObserver = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            triggerRender();
          } else if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
            isRendering = false;
          }
        });
        intersectionObserver.observe(button);
      }

      const loop = () => {
        if (!alive || !renderer || !isVisible) {
          isRendering = false;
          return;
        }

        const dx = targetMouse.x - currentMouse.x;
        const dy = targetMouse.y - currentMouse.y;
        currentMouse.x += dx * 0.22;
        currentMouse.y += dy * 0.22;

        const dpr = renderer.dpr;
        uniforms.uMouse.value[0] = currentMouse.x * dpr;
        uniforms.uMouse.value[1] = currentMouse.y * dpr;
        uniforms.uTime.value = (performance.now() - startTime) * 0.001;

        renderer.render({ scene: mesh });

        const isMouseMoving = Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05;
        const mouseDist = Math.sqrt(currentMouse.x * currentMouse.x + currentMouse.y * currentMouse.y);
        const isNear = mouseDist < proximity * 1.5;

        if (isMouseMoving || isNear) {
          idleFrames = 0;
          rafId = requestAnimationFrame(loop);
        } else {
          idleFrames++;
          if (idleFrames < 15) {
            rafId = requestAnimationFrame(loop);
          } else {
            isRendering = false;
          }
        }
      };

      triggerRender();

      return () => {
        alive = false;
        isVisible = false;
        if (rafId) cancelAnimationFrame(rafId);
        resizeObserver?.disconnect();
        intersectionObserver?.disconnect();
        window.removeEventListener('pointermove', onPointerMove);
        try {
          gl.getExtension('WEBGL_lose_context')?.loseContext();
        } catch {
          // ignore context release errors
        }
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        setIsWebGLActive(false);
      };
    }, [
      lineColor,
      baseColor,
      radius,
      borderWidth,
      proximity,
      intensity,
      gloss,
    ]);

    return React.createElement(
      'button',
      {
        ref: handleRef,
        type,
        disabled,
        onClick,
        className: cn(
          baseStyles,
          sizeStyles[size],
          !isWebGLActive && fallbackStyles,
          isWebGLActive && 'border border-transparent bg-transparent',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none active:scale-100',
          className
        ),
        style: {
          borderRadius: `${radius}px`,
          color: textColor,
          ...style,
        },
        ...props,
      },
      React.createElement(
        'span',
        {
          className:
            'relative z-10 inline-flex items-center justify-center gap-2 select-none font-medium',
        },
        children
      )
    );
  }
);

SpecularButton.displayName = 'SpecularButton';

export default SpecularButton;
