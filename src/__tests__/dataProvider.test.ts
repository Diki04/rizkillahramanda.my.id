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

  it('should return empty guestbook array without mock data initially', async () => {
    const messages = await dataProvider.getMessages();
    expect(Array.isArray(messages)).toBe(true);
    expect(messages.length).toBe(0);
  });

  it('should post and retrieve authentic message dynamically without mock data', async () => {
    const postRes = await dataProvider.postMessage({
      name: 'Authentic User',
      message: 'Genuine test feedback',
    });
    expect(postRes.success).toBe(true);
    expect(postRes.data?.name).toBe('Authentic User');

    const updated = await dataProvider.getMessages();
    expect(updated.length).toBe(1);
    expect(updated[0].name).toBe('Authentic User');

    if (postRes.data?.id) {
      await dataProvider.deleteMessage(postRes.data.id);
    }
    const cleared = await dataProvider.getMessages();
    expect(cleared.length).toBe(0);
  });
});
