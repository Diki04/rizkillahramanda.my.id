import { describe, it, expect } from 'vitest';
import { getTechIcon } from '@/common/utils/techIcons';

describe('getTechIcon', () => {
  it('correctly maps canonical technology names to brand icons and colors', () => {
    const react = getTechIcon('react');
    expect(react.color).toBe('#61DAFB');
    expect(react.icon).toBeDefined();

    const typescript = getTechIcon('typescript');
    expect(typescript.color).toBe('#3178C6');

    const python = getTechIcon('python');
    expect(python.color).toBe('#3776AB');

    const supabase = getTechIcon('supabase');
    expect(supabase.color).toBe('#3ECF8E');
  });

  it('handles variations and case-insensitivity', () => {
    const nextCase = getTechIcon('Next.js');
    expect(nextCase.color).toBe('#FFFFFF');

    const tailwindAlias = getTechIcon('Tailwind CSS');
    expect(tailwindAlias.color).toBe('#38BDF8');

    const postgreSql = getTechIcon('PostgreSQL');
    expect(postgreSql.color).toBe('#4169E1');
  });

  it('falls back to default icon and color for unknown technologies', () => {
    const unknown = getTechIcon('super-unknown-custom-lib-xyz');
    expect(unknown.color).toBe('#94A3B8');
    expect(unknown.icon).toBeDefined();
  });
});
