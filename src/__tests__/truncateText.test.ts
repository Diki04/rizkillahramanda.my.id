import assert from 'node:assert/strict';
import { truncateText } from '../common/utils/truncateText';

const text = 'The quick brown fox jumps over the lazy dog';

assert.equal(truncateText(text, 10), 'The quick...', 'Should truncate at 10 chars with ellipsis');
assert.equal(truncateText('Short', 20), 'Short', 'Should return full text if under max length');

console.log('✔ truncateText.test.ts passed');
