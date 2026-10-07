import assert from 'node:assert/strict';
import { formatDate } from '../common/utils/formatDate';

const sampleDate = '2024-03-15T00:00:00.000Z';
const formattedEn = formatDate(sampleDate, 'en');
const formattedId = formatDate(sampleDate, 'id');

assert.ok(formattedEn.includes('2024'), 'English date contains year 2024');
assert.ok(formattedId.includes('2024'), 'Indonesian date contains year 2024');

console.log('✔ formatDate.test.ts passed');
