import assert from 'node:assert/strict';
import { estimateReadingTime } from '../common/utils/readingTime';

const shortContent = 'This is a short message for testing reading time calculation.';
const words200 = Array(200).fill('word').join(' ');

assert.equal(estimateReadingTime(shortContent), 1, 'Short text should take 1 minute min');
assert.equal(estimateReadingTime(words200), 1, '200 words should equal ~1 minute');

console.log('✔ readingTime.test.ts passed');
