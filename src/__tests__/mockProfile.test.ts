import assert from 'node:assert/strict';
import { mockProfile } from '../services/mock-profile';

assert.equal(mockProfile.name, 'Rizkillah Ramanda Sinyo', 'Profile name matches');
assert.ok(Array.isArray(mockProfile.education), 'Education is array');
assert.ok(Array.isArray(mockProfile.skills), 'Skills is array');
assert.ok(Array.isArray(mockProfile.experiences), 'Experiences is array');

console.log('✔ mockProfile.test.ts passed');
