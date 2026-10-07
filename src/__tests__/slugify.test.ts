import assert from 'node:assert/strict';
import { slugify } from '../common/utils/slugify';

assert.equal(slugify('Hello World!'), 'hello-world', 'Should lowercase and dash spaces');
assert.equal(slugify('Next.js 14 & Tailwind CSS'), 'nextjs-14-tailwind-css', 'Should strip punctuation');
assert.equal(slugify('  Spaced  Out  '), 'spaced-out', 'Should trim edge whitespaces');

console.log('✔ slugify.test.ts passed');
