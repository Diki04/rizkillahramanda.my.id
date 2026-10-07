import assert from 'node:assert/strict';
import { mockAchievements } from '../services/mock-achievements';

assert.ok(Array.isArray(mockAchievements), 'mockAchievements should be an array');
assert.ok(mockAchievements.length >= 3, 'Should have multiple certificates');

mockAchievements.forEach((ach) => {
  assert.ok(ach.id, 'Achievement must have id');
  assert.ok(ach.title, 'Achievement must have title');
  assert.ok(ach.issuer, 'Achievement must have issuer');
  assert.ok(ach.date, 'Achievement must have date');
});

console.log('✔ mockAchievements.test.ts passed');
