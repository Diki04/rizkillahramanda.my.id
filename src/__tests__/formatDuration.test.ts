import assert from 'node:assert/strict';
import { formatDuration } from '../common/utils/formatDuration';

assert.equal(formatDuration(45, 'en'), '45m', 'Should format minutes under 1 hr');
assert.equal(formatDuration(90, 'en'), '1h 30m', 'Should format hours and minutes');
assert.equal(formatDuration(120, 'id'), '2j', 'Should format Indonesian hour symbol');

console.log('✔ formatDuration.test.ts passed');
