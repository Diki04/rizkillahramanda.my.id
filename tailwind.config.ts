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
        navy: {
          950: '#070A12',
          900: '#0B1120',
          850: '#0E172B',
          800: '#131C31',
          700: '#1E293B',
          600: '#334155',
        },
        slate: {
          card: '#0F172A',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        accent: {
          blue: '#38BDF8',
          cyan: '#0EA5E9',
          glow: 'rgba(56, 189, 248, 0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
