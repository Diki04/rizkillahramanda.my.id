import assert from 'node:assert/strict';
import { clamp, lerp } from '../common/utils/math';

assert.equal(clamp(5, 0, 10), 5, 'Should keep number in bounds');
assert.equal(clamp(-2, 0, 10), 0, 'Should clamp minimum');
assert.equal(clamp(15, 0, 10), 10, 'Should clamp maximum');
assert.equal(lerp(0, 100, 0.5), 50, 'Should interpolate midpoint');

console.log('✔ math.test.ts passed');
