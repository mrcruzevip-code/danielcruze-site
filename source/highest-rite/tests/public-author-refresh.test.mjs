import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source = (file) => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const publicPaths = ['app/(tabs)/index.tsx', 'app/social.web.tsx', 'app/for-men.tsx', 'components/drawer-menu.tsx', 'components/site-metadata.web.tsx', 'lib/content.ts'];

test('deprecated Sacred Masculinity Telegram links are removed from the public UI and metadata', () => {
  for (const file of publicPaths) {
    const value = source(file);
    assert.ok(!value.includes('t.me/SacredMasculinity'), file);
    assert.ok(!value.includes('t.me/SacredMasculine'), file);
    assert.ok(!value.includes('SOCIALS.telegramChannel'), file);
    assert.ok(!value.includes('SOCIALS.telegramGroup'), file);
  }
});

test('the official guide uses the supported Telegram start parameter', () => {
  assert.ok(source('lib/content.ts').includes('t.me/danielcruzelife_bot?start=website_guide'));
  const worker = readFileSync(new URL('../../../workers/danielcruzelife-bot/worker.js', import.meta.url), 'utf8');
  assert.ok(worker.includes('commandToken.split'));
  assert.ok(worker.includes('split(/\\s+/)'));
  assert.ok(worker.includes("update.message.chat?.type !== 'private'"));
});

test('the flagship manuscript is presented without a speculative checkout', () => {
  const page = source('app/the-books.tsx');
  assert.ok(page.includes('THE HIGHEST RITE'));
  assert.ok(page.includes('The work begins where performance ends.'));
  assert.ok(page.includes('ENQUIRE ABOUT THE MANUSCRIPT'));
});
