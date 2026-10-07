import { describe, it, expect } from 'vitest';
import { formatDate } from '../common/utils/formatDate';

describe('formatDate helper', () => {
  const sampleDate = '2024-03-15T00:00:00.000Z';

  it('should format English dates', () => {
    expect(formatDate(sampleDate, 'en')).toContain('2024');
  });

  it('should format Indonesian dates', () => {
    expect(formatDate(sampleDate, 'id')).toContain('2024');
  });
});
