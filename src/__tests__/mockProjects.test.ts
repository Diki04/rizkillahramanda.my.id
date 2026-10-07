import assert from 'node:assert/strict';
import { mockProjects } from '../services/mock-projects';

assert.ok(Array.isArray(mockProjects), 'mockProjects should be an array');
assert.ok(mockProjects.length >= 3, 'Should have at least 3 initial projects');

mockProjects.forEach((proj) => {
  assert.ok(proj.id, 'Project must have an id');
  assert.ok(proj.title, 'Project must have a title');
  assert.ok(Array.isArray(proj.techStack), 'Project must have techStack array');
  assert.ok(proj.category, 'Project must have a category');
});

console.log('✔ mockProjects.test.ts passed');
