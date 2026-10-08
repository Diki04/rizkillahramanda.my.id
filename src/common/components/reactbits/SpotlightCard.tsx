'use client';

import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/common/utils/cn';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  [key: `data-${string}`]: unknown;
}

/**
 * Calculates local spotlight coordinates relative to element bounding rectangle.
 */
export function calculateSpotlightOffset(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number }
): { x: number; y: number } {
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  function SpotlightCard(
    {
      children,
      className,
      spotlightColor = 'rgba(255, 255, 255, 0.15)',
      onMouseMove,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    forwardedRef
  ) {
    const internalRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState<number>(0);

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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (internalRef.current && !isFocused) {
        if (typeof internalRef.current.getBoundingClientRect === 'function') {
          const rect = internalRef.current.getBoundingClientRect();
          const coords = calculateSpotlightOffset(e.clientX, e.clientY, rect);
          setPosition(coords);
        }
      }
      onMouseMove?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      setIsFocused(true);
      setOpacity(0.6);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      setIsFocused(false);
      setOpacity(0);
      onBlur?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setOpacity(0.6);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setOpacity(0);
      onMouseLeave?.(e);
    };

    return React.createElement(
      'div',
      {
        ref: handleRef,
        onMouseMove: handleMouseMove,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: cn(
          'relative rounded-3xl border border-white/10 bg-zinc-950/80 overflow-hidden p-6 md:p-8',
          className
        ),
        ...props,
      },
      React.createElement('div', {
        'data-testid': 'spotlight-overlay',
        className:
          'pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out',
        style: {
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        },
      }),
      children
    );
  }
);

SpotlightCard.displayName = 'SpotlightCard';

export default SpotlightCard;
