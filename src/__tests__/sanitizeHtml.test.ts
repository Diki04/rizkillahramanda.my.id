import assert from 'node:assert/strict';
import { sanitizeHtml } from '../common/utils/sanitizeHtml';

const dirty = '<script>alert("xss")</script>Hello <b>World</b>';
assert.equal(sanitizeHtml(dirty), 'alert("xss")Hello World', 'Should strip HTML tag delimiters');

console.log('✔ sanitizeHtml.test.ts passed');
