import assert from 'node:assert/strict';
import { cn } from '../common/utils/cn';

// Test suite for cn utility
assert.equal(cn('px-2', 'py-1'), 'px-2 py-1', 'Should join classes');
assert.equal(cn('px-2', false && 'hidden', 'text-white'), 'px-2 text-white', 'Should filter falsy values');
assert.equal(cn('px-2', 'px-4'), 'px-4', 'Should resolve Tailwind conflicts');

console.log('✔ cn.test.ts passed');
