import { describe, it, expect } from 'vitest';
import { slugify } from '../common/utils/slugify';

describe('slugify utility', () => {
  it('should lowercase and replace spaces with hyphens', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  it('should strip special characters and punctuation', () => {
    expect(slugify('Next.js 14 & Tailwind CSS')).toBe('nextjs-14-tailwind-css');
  });

  it('should trim edge whitespaces', () => {
    expect(slugify('  Spaced  Out  ')).toBe('spaced-out');
  });
});
