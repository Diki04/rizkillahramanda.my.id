import { describe, it, expect } from 'vitest';
import { mockAchievements } from '../services/data/mock-achievements';

describe('mockAchievements data structure', () => {
  it('should contain verified certificates', () => {
    expect(Array.isArray(mockAchievements)).toBe(true);
    expect(mockAchievements.length).toBeGreaterThan(0);

    mockAchievements.forEach((ach) => {
      expect(ach.id).toBeDefined();
      expect(ach.title).toBeDefined();
      expect(ach.issuer).toBeDefined();
      expect(ach.issueDate).toBeDefined();
    });
  });
});
