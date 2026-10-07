'use client';

import { useState, useRef, useEffect } from 'react';

export function useHover<T extends HTMLElement = HTMLElement>() {
  const [value, setValue] = useState<boolean>(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseEnter = () => setValue(true);
    const handleMouseLeave = () => setValue(false);

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return [ref, value] as const;
}
