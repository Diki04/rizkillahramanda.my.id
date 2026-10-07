import { describe, it, expect } from 'vitest';
import { mockProfile, mockSkills } from '../services/data/mock-profile';

describe('mockProfile data structure', () => {
  it('should contain Rizkillah personal details and skills', () => {
    expect(mockProfile.name).toBe('Rizkillah Ramanda Sinyo');
    expect(mockProfile.nickname).toBe('Diki');
    expect(Array.isArray(mockSkills)).toBe(true);
    expect(mockSkills.length).toBeGreaterThan(0);
  });
});
