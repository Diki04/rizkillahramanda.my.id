'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  revealDirection?: 'start' | 'end' | 'center';
  animateOn?: 'view' | 'hover' | 'mount';
  tag?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=~';

export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  characters = DEFAULT_CHARS,
  className = '',
  revealDirection = 'start',
  animateOn = 'mount',
  tag: Tag = 'span',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovered, setIsHovered] = useState(false);
  const isAnimatingRef = useRef(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    let iteration = 0;
    const length = text.length;
    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';

            let revealed = false;
            if (revealDirection === 'start') {
              revealed = index < iteration;
            } else if (revealDirection === 'end') {
              revealed = index >= length - iteration;
            } else {
              const mid = length / 2;
              revealed = Math.abs(index - mid) <= iteration / 2;
            }

            if (revealed) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration > length + maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    }, speed);
  }, [text, characters, speed, maxIterations, revealDirection]);

  useEffect(() => {
    if (animateOn === 'mount') {
      startAnimation();
    } else if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }
  }, [animateOn, startAnimation]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (animateOn === 'hover') {
      startAnimation();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Tag
      ref={elementRef as unknown as React.Ref<any>}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </Tag>
  );
}
