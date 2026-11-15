import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import worker from '../../../workers/danielcruzelife-bot/worker.js';

test('Telegram guide accepts a signed website-start deep link and rejects invalid signatures', async () => {
  const token = 'fixture-token-not-a-real-secret';
  const secret = createHash('sha256').update('telegram-hook-v1:' + token).digest('hex');
  const previousFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), method: String(url).split('/').at(-1), payload: JSON.parse(options.body) });
    return { ok: true, json: async () => ({ ok: true }) };
  };
  const request = (text, chatType, signature) => new Request('https://bot.danielcruze.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Telegram-Bot-Api-Secret-Token': signature },
    body: JSON.stringify({ message: { text, chat: { id: 1234, type: chatType }, from: { first_name: 'Visitor' } } }),
  });
  try {
    const denied = await worker.fetch(request('/start website_guide', 'private', 'invalid'), { BOT_TOKEN: token });
    assert.equal(denied.status, 403);
    assert.equal(calls.length, 0);
    const welcome = await worker.fetch(request('/start website_guide', 'private', secret), { BOT_TOKEN: token });
    assert.equal(welcome.status, 200);
    assert.ok(calls.some((entry) => entry.method === 'sendMessage' && entry.payload.text.includes('WELCOME')));
    const beforeGroup = calls.length;
    const ignoredGroup = await worker.fetch(request('/start', 'supergroup', secret), { BOT_TOKEN: token });
    assert.equal(ignoredGroup.status, 200);
    assert.equal(calls.length, beforeGroup);
    const plain = await worker.fetch(request('Where do I start?', 'private', secret), { BOT_TOKEN: token });
    assert.equal(plain.status, 200);
    assert.ok(calls.some((entry) => entry.method === 'sendMessage' && entry.payload.text.includes('THE DANIEL CRUZE GUIDE')));
  } finally {
    globalThis.fetch = previousFetch;
  }
});
