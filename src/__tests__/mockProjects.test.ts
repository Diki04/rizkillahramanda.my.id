import { describe, it, expect } from 'vitest';
import { mockProjects } from '../services/data/mock-projects';

describe('mockProjects data structure', () => {
  it('should be an array with valid project items', () => {
    expect(Array.isArray(mockProjects)).toBe(true);
    expect(mockProjects.length).toBeGreaterThan(0);

    mockProjects.forEach((proj) => {
      expect(proj.id).toBeDefined();
      expect(proj.title).toBeDefined();
      expect(Array.isArray(proj.tags)).toBe(true);
      expect(proj.category).toBeDefined();
    });
  });
});
