import assert from 'node:assert/strict';
import { hexToRgba } from '../common/utils/hexToRgba';

assert.equal(hexToRgba('#ffffff', 0.5), 'rgba(255, 255, 255, 0.5)', 'Should format full hex');
assert.equal(hexToRgba('#000', 1), 'rgba(0, 0, 0, 1)', 'Should format short hex');

console.log('✔ hexToRgba.test.ts passed');
