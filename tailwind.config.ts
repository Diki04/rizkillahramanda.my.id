import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        'pure-black': '#000000',
        navy: {
          950: '#000000',
          900: '#09090b',
          850: '#121214',
          800: '#18181b',
          700: '#27272a',
          600: '#3f3f46',
        },
        zinc: {
          850: '#121214',
        },
        slate: {
          card: '#09090b',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        accent: {
          blue: '#ffffff',
          cyan: '#e4e4e7',
          glow: 'rgba(255, 255, 255, 0.15)',
        },
        monochrome: {
          base: '#000000',
          surface1: '#09090b',
          surface2: '#121214',
          surface3: '#18181b',
          surface4: '#27272a',
          subtle: 'rgba(255, 255, 255, 0.08)',
          'border-subtle': 'rgba(255, 255, 255, 0.08)',
          'border-prominent': 'rgba(255, 255, 255, 0.25)',
          primary: '#ffffff',
          secondary: '#e4e4e7',
          muted: '#71717a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        signature: ['var(--font-caveat)', 'Caveat', 'Dancing Script', 'Brush Script MT', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
