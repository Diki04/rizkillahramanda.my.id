import { describe, it, expect } from 'vitest';
import { dataProvider } from '../services/supabase/dataProvider';

describe('dataProvider hybrid resilient fallback', () => {
  it('should retrieve projects fallback array when offline', async () => {
    const projects = await dataProvider.getProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should retrieve achievements fallback array when offline', async () => {
    const achievements = await dataProvider.getAchievements();
    expect(Array.isArray(achievements)).toBe(true);
    expect(achievements.length).toBeGreaterThan(0);
  });
});
