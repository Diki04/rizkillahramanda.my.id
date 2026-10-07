import assert from 'node:assert/strict';
import { getProjects, getAchievements } from '../services/supabase/dataProvider';

async function runTest() {
  const projects = await getProjects();
  assert.ok(Array.isArray(projects), 'getProjects should return an array');
  assert.ok(projects.length > 0, 'getProjects returns items via fallback');

  const achievements = await getAchievements();
  assert.ok(Array.isArray(achievements), 'getAchievements should return an array');
  assert.ok(achievements.length > 0, 'getAchievements returns items via fallback');

  console.log('✔ dataProvider.test.ts passed');
}

runTest();
