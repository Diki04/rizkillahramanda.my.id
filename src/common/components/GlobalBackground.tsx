'use client';

import React, { useEffect, useState } from 'react';
import { MicroSlats } from './reactbits/MicroSlats';
import { useTheme } from '../contexts/ThemeContext';

export function GlobalBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return React.createElement('div', {
      className: 'fixed inset-0 pointer-events-none z-0 bg-white dark:bg-black',
      style: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 },
      'aria-hidden': 'true',
    });
  }

  const isDark = theme !== 'light';

  return React.createElement(
    'div',
    {
      className: 'fixed inset-0 pointer-events-none z-0 overflow-hidden',
      style: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 },
      'aria-hidden': 'true',
    },
    React.createElement(MicroSlats, {
      className: 'fixed inset-0 pointer-events-none z-0',
      backgroundColor: isDark ? '#000000' : '#ffffff',
      color: isDark ? '#4751e6' : '#4338ca',
      glintColor: isDark ? '#ffffff' : '#6366f1',
      preset: 'swell',
      interactive: true,
      speed: 0.65,
      scale: 1.3,
      contrast: isDark ? 1.35 : 1.15,
      perspective: 0.65,
    })
  );
}

export default GlobalBackground;
