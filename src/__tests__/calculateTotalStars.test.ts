import assert from 'node:assert/strict';
import { calculateTotalStars } from '../common/utils/calculateTotalStars';

const repos = [
  { stargazers_count: 5 },
  { stargazers_count: 12 },
  { stargazers_count: 3 },
];

assert.equal(calculateTotalStars(repos), 20, 'Should correctly sum repository stars');
assert.equal(calculateTotalStars([]), 0, 'Should return 0 for empty repos');

console.log('✔ calculateTotalStars.test.ts passed');
