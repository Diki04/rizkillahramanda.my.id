'use client';

import React from 'react';

export interface AuthorSignatureProps {
  className?: string;
  name?: string;
}

export function AuthorSignature({ className = '', name = 'rizkillah' }: AuthorSignatureProps) {
  return React.createElement(
    'div',
    {
      className: `relative inline-flex items-center select-none group ${className}`,
    },
    React.createElement(
      'span',
      {
        className:
          'font-signature text-3xl sm:text-4xl md:text-[42px] font-bold tracking-wide text-amber-500 dark:text-[#facc15] -rotate-2 transform group-hover:rotate-0 transition-transform duration-300 drop-shadow-[0_2px_10px_rgba(250,204,21,0.2)] dark:drop-shadow-[0_2px_14px_rgba(250,204,21,0.35)] block',
        style: {
          fontFamily:
            "var(--font-caveat), 'Caveat', 'Dancing Script', 'Brush Script MT', 'Segoe Script', cursive",
        },
      },
      name
    )
  );
}
