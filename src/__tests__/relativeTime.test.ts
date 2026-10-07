import assert from 'node:assert/strict';
import { relativeTime } from '../common/utils/relativeTime';

const now = new Date();
const justNow = new Date(now.getTime() - 1000 * 10).toISOString();
const tenMinAgo = new Date(now.getTime() - 1000 * 60 * 10).toISOString();

assert.equal(relativeTime(justNow, 'en'), 'just now', 'Should identify immediate timestamps');
assert.ok(relativeTime(tenMinAgo, 'en').includes('minutes ago'), 'Should calculate relative minutes');

console.log('✔ relativeTime.test.ts passed');
