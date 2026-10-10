import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../app/contact.tsx', import.meta.url), 'utf8');
test('opening mail app is not labelled received enquiry', () => {
  assert.ok(!source.includes('ENQUIRY RECEIVED'));
  assert.ok(source.includes('EMAIL DRAFT OPENED'));
  assert.ok(source.includes('must send'));
});
test('failed handoff never sets success state', () => {
  const catchBlock = source.match(/\.catch\(\(\) => \{([\s\S]*?)\}\)/)?.[1] ?? '';
  assert.ok(!catchBlock.includes('setSubmitted(true)'));
  assert.ok(source.includes('Unable to open your email app'));
});
