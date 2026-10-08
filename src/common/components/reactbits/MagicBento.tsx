'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/common/utils/cn';

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  tag?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  icon?: React.ReactNode;
}

/**
 * Props for the MagicBento interactive 3D bento grid component.
 * Implements GSAP 3D card tilt, particle emitter, and cursor spotlight.
 */
export interface BentoProps {
  cards?: BentoCardProps[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const DEFAULT_PARTICLE_COUNT = 12;
export const DEFAULT_SPOTLIGHT_RADIUS = 300;
export const DEFAULT_GLOW_COLOR = '255, 255, 255';
export const MOBILE_BREAKPOINT = 768;

export const DEFAULT_CARDS: BentoCardProps[] = [
  {
    color: '#09090b',
    label: 'Core Architecture',
    title: 'Architecture Principles',
    description: 'Next.js App Router, Clean Hexagonal Architecture, strict TypeScript typing and domain-driven design.',
  },
  {
    color: '#121214',
    label: 'Backend & DB',
    title: 'Fullstack Core',
    description: 'PostgreSQL, Supabase, Node.js, and high-throughput REST & Realtime APIs with zero-latency caching.',
  },
  {
    color: '#09090b',
    label: 'Autonomous AI',
    title: 'AI & Research',
    description: 'Agentic workflows, multi-agent systems, LLM orchestration, and modern machine learning pipelines.',
  },
  {
    color: '#121214',
    label: 'Quality Metrics',
    title: 'Production Excellence',
    description: '100% test pass rate, 99.9% uptime, strict linting, sub-100ms TTFB and lighthouse perfect scores.',
  },
  {
    color: '#09090b',
    label: 'Availability',
    title: 'Live Availability Status',
    description: 'Active & open for software engineering collaborations, contracts, and tech leadership.',
  },
  {
    color: '#121214',
    label: 'Ecosystem',
    title: 'Modern Web Craft',
    description: 'Hardware-accelerated WebGL, GSAP interactive physics, micro-interactions, and pure OLED aesthetics.',
  },
];

export function calculateSpotlightValues(radius: number): { proximity: number; fadeDistance: number } {
  return {
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75,
  };
}

export function calculateTiltAngles(
  x: number,
  y: number,
  width: number,
  height: number,
  maxTilt: number = 10
): { rotateX: number; rotateY: number } {
  if (width <= 0 || height <= 0) return { rotateX: 0, rotateY: 0 };
  const centerX = width / 2;
  const centerY = height / 2;
  const rawX = ((y - centerY) / centerY) * -maxTilt;
  const rawY = ((x - centerX) / centerX) * maxTilt;
  return {
    rotateX: rawX === 0 ? 0 : rawX,
    rotateY: rawY === 0 ? 0 : rawY,
  };
}

export function calculateMagnetOffset(
  x: number,
  y: number,
  width: number,
  height: number,
  factor: number = 0.05
): { magnetX: number; magnetY: number } {
  if (width <= 0 || height <= 0) return { magnetX: 0, magnetY: 0 };
  const centerX = width / 2;
  const centerY = height / 2;
  const rawX = (x - centerX) * factor;
  const rawY = (y - centerY) * factor;
  return {
    magnetX: rawX === 0 ? 0 : rawX,
    magnetY: rawY === 0 ? 0 : rawY,
  };
}

export function calculateGlowIntensity(
  distance: number,
  proximity: number,
  fadeDistance: number
): number {
  if (distance <= proximity) return 1;
  if (distance <= fadeDistance) {
    const range = fadeDistance - proximity;
    if (range <= 0) return 0;
    return (fadeDistance - distance) / range;
  }
  return 0;
}

export function calculateCardRelativeGlow(
  mouseX: number,
  mouseY: number,
  rect: { left: number; top: number; width: number; height: number }
): { xPercent: number; yPercent: number } {
  if (rect.width <= 0 || rect.height <= 0) return { xPercent: 50, yPercent: 50 };
  const xPercent = ((mouseX - rect.left) / rect.width) * 100;
  const yPercent = ((mouseY - rect.top) / rect.height) * 100;
  return { xPercent, yPercent };
}

export function createParticleElement(
  x: number,
  y: number,
  color: string = DEFAULT_GLOW_COLOR
): HTMLDivElement | null {
  if (typeof document === 'undefined') return null;
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 50;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
}

export const MAGIC_BENTO_STYLES = `
  .bento-section {
    --glow-x: 50%;
    --glow-y: 50%;
    --glow-intensity: 0;
    --glow-radius: 300px;
    --glow-color: 255, 255, 255;
    --border-color: rgba(255, 255, 255, 0.1);
    --background-dark: #09090b;
    --background-card-alt: #121214;
    --white: #ffffff;
  }

  .card-responsive {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: 1.25rem;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    .card-responsive {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .card-responsive {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .card-responsive .card:nth-child(3) {
      grid-column: span 2;
      grid-row: span 2;
    }
    
    .card-responsive .card:nth-child(4) {
      grid-column: 1 / span 2;
      grid-row: 2 / span 2;
    }
    
    .card-responsive .card:nth-child(6) {
      grid-column: 4;
      grid-row: 3;
    }
  }

  .card--border-glow::after {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    background: radial-gradient(var(--glow-radius, 300px) circle at var(--glow-x, 50%) var(--glow-y, 50%),
      rgba(var(--glow-color, 255, 255, 255), calc(var(--glow-intensity, 0) * 0.85)) 0%,
      rgba(var(--glow-color, 255, 255, 255), calc(var(--glow-intensity, 0) * 0.35)) 35%,
      transparent 65%);
    border-radius: inherit;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .card--border-glow:hover {
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.8), 0 0 30px rgba(var(--glow-color, 255, 255, 255), 0.12);
  }

  .particle::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: rgba(var(--glow-color, 255, 255, 255), 0.25);
    border-radius: 50%;
    z-index: -1;
  }

  .text-clamp-1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .text-clamp-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ParticleCard: React.FC<{
  children?: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.killTweensOf(particle);
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current || typeof document === 'undefined') return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    const w = width > 0 ? width : 300;
    const h = height > 0 ? height : 200;

    const created: HTMLDivElement[] = [];
    for (let i = 0; i < particleCount; i++) {
      const p = createParticleElement(Math.random() * w, Math.random() * h, glowColor);
      if (p) created.push(p);
    }
    memoizedParticles.current = created;
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current || typeof document === 'undefined' || particleCount <= 0) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles, particleCount]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current || typeof window === 'undefined') return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 4,
          rotateY: 4,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (enableTilt && rect.width > 0 && rect.height > 0) {
        const { rotateX, rotateY } = calculateTiltAngles(x, y, rect.width, rect.height, 8);
        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.15,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism && rect.width > 0 && rect.height > 0) {
        const { magnetX, magnetY } = calculateMagnetOffset(x, y, rect.width, rect.height, 0.04);
        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.35) 0%, rgba(${glowColor}, 0.15) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 30;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
          onComplete: () => {
            gsap.killTweensOf(ripple);
            ripple.parentNode?.removeChild(ripple);
          },
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
      gsap.killTweensOf(element);
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return React.createElement(
    'div',
    {
      ref: cardRef,
      className: cn('relative overflow-hidden', className),
      style: { ...style, position: 'relative', overflow: 'hidden' },
    },
    children
  );
};

export const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      disableAnimations ||
      !gridRef?.current ||
      !enabled ||
      typeof window === 'undefined' ||
      typeof document === 'undefined'
    ) {
      return;
    }

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.14) 0%,
        rgba(${glowColor}, 0.08) 18%,
        rgba(${glowColor}, 0.04) 30%,
        rgba(${glowColor}, 0.01) 50%,
        transparent 70%
      );
      z-index: 100;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll('.card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        cards.forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        const glowIntensity = calculateGlowIntensity(effectiveDistance, proximity, fadeDistance);
        const { xPercent, yPercent } = calculateCardRelativeGlow(e.clientX, e.clientY, cardRect);

        cardElement.style.setProperty('--glow-x', `${xPercent}%`);
        cardElement.style.setProperty('--glow-y', `${yPercent}%`);
        cardElement.style.setProperty('--glow-intensity', glowIntensity.toString());
        cardElement.style.setProperty('--glow-radius', `${spotlightRadius}px`);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gridRef.current?.querySelectorAll('.card').forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (spotlightRef.current) {
        gsap.killTweensOf(spotlightRef.current);
        spotlightRef.current.parentNode?.removeChild(spotlightRef.current);
        spotlightRef.current = null;
      }
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

export function useMobileDetection(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => setIsMobile(window.innerWidth <= breakpoint);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export const MagicBento: React.FC<BentoProps> = ({
  cards = DEFAULT_CARDS,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  className = '',
  style,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', null, MAGIC_BENTO_STYLES),
    enableSpotlight
      ? React.createElement(GlobalSpotlight, {
          gridRef,
          disableAnimations: shouldDisableAnimations,
          enabled: enableSpotlight,
          spotlightRadius,
          glowColor,
        })
      : null,
    React.createElement(
      'div',
      {
        ref: gridRef,
        className: cn(
          'bento-section w-full max-w-7xl mx-auto select-none relative',
          className
        ),
        style: {
          ...style,
          '--glow-color': glowColor,
        } as React.CSSProperties,
      },
      React.createElement(
        'div',
        { className: 'card-responsive' },
        cards.map((card, index) => {
          const isAvailability =
            card.label?.toLowerCase().includes('availab') ||
            card.title?.toLowerCase().includes('availab');

          const baseCardClassName = cn(
            'card flex flex-col justify-between relative min-h-[220px] sm:min-h-[240px] w-full p-6 sm:p-7',
            'rounded-2xl border border-slate-300 dark:border-white/10 font-sans overflow-hidden bg-white/95 dark:bg-zinc-950/80 shadow-sm hover:shadow-xl',
            'transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-400 dark:hover:border-white/20',
            enableBorderGlow && 'card--border-glow',
            card.className
          );

          const isDefaultDarkColor = card.color === '#09090b' || card.color === '#121214';
          const cardStyle: React.CSSProperties = {
            ...(card.color && !isDefaultDarkColor ? { backgroundColor: card.color } : {}),
            '--glow-x': '50%',
            '--glow-y': '50%',
            '--glow-intensity': '0',
            '--glow-radius': `${spotlightRadius}px`,
          } as React.CSSProperties;

          const headerContent = React.createElement(
            'div',
            {
              className:
                'card__header flex items-center justify-between gap-3 relative z-10 w-full mb-6',
            },
            card.label
              ? React.createElement(
                  'span',
                  {
                    className:
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold tracking-wider uppercase text-slate-900 dark:text-zinc-200 bg-slate-100 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.08]',
                  },
                  card.label
                )
              : null,
            isAvailability
              ? React.createElement(
                  'span',
                  {
                    className:
                      'inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold',
                  },
                  React.createElement(
                    'span',
                    { className: 'relative flex h-2 w-2' },
                    React.createElement('span', {
                      className:
                        'animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75',
                    }),
                    React.createElement('span', {
                      className: 'relative inline-flex rounded-full h-2 w-2 bg-emerald-500',
                    })
                  ),
                  React.createElement('span', null, 'ONLINE')
                )
              : card.icon
                ? React.createElement('span', { className: 'text-slate-600 dark:text-zinc-400' }, card.icon)
                : null
          );

          const bodyContent = React.createElement(
            'div',
            { className: 'card__content flex flex-col relative z-10 mt-auto' },
            React.createElement(
              'h3',
              {
                className: cn(
                  'card__title font-extrabold text-lg sm:text-xl text-slate-950 dark:text-white tracking-tight mb-2',
                  textAutoHide && 'text-clamp-1'
                ),
              },
              card.title
            ),
            React.createElement(
              'p',
              {
                className: cn(
                  'card__description text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-normal',
                  textAutoHide && 'text-clamp-2'
                ),
              },
              card.description
            )
          );

          return React.createElement(
            ParticleCard,
            {
              key: index,
              className: baseCardClassName,
              style: cardStyle,
              disableAnimations: shouldDisableAnimations,
              particleCount: enableStars ? particleCount : 0,
              glowColor,
              enableTilt,
              clickEffect,
              enableMagnetism,
            },
            headerContent,
            bodyContent
          );
        })
      )
    )
  );
};

export default MagicBento;
