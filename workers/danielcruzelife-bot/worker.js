// The Highest Rite / Daniel Cruze Telegram bot — editable source of truth.
// Keep secrets in Cloudflare. This file intentionally contains no token values.

const BRAND = Object.freeze({
  name: 'Daniel Cruze',
  title: 'THE HIGHEST RITE',
  signature: 'Amor Aeternus. Libertas Sacra.',
  mark: 'https://danielcruze.com/images/highest-rite-mark.png',
  website: 'https://danielcruze.com/',
  books: 'https://danielcruze.com/books/',
  soulBlueprint: 'https://danielcruze.com/soul-blueprint/',
  enquiries: 'https://danielcruze.com/contact/',
  journal: 'https://danielcruze.com/journal/',
});

// These are existing AIB HUB PTY LTD checkout destinations. Edit only after verifying a replacement.
const CHECKOUT = Object.freeze({
  sacredPrinciples: 'https://buy.stripe.com/3cIdR93nz7cEfFK1G06wE0m',
  sensoryAwakening: 'https://buy.stripe.com/6oU6oH7DPcwYdxCfwQ6wE0l',
  grandCodex: 'https://buy.stripe.com/00w9ATe2d68A516acw6wE0k',
  soulBlueprint: 'https://book.stripe.com/bJe7sLgal9kM3X23O86wE0o',
});

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
}[character]));

const buttons = (rows) => ({ reply_markup: JSON.stringify({ inline_keyboard: rows }) });

async function telegram(env, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Telegram ${method} failed with ${response.status}`);
  return response.json();
}

async function sendMessage(env, chatId, text, extra = {}) {
  return telegram(env, 'sendMessage', { chat_id: chatId, text, parse_mode: 'HTML', ...extra });
}

async function sendBrandCard(env, chatId) {
  try {
    await telegram(env, 'sendPhoto', {
      chat_id: chatId,
      photo: BRAND.mark,
      caption: `<b>${BRAND.title}</b>\nDaniel Cruze\n<i>${BRAND.signature}</i>`,
      parse_mode: 'HTML',
    });
  } catch {
    // The bot remains useful if Telegram cannot fetch the public mark.
  }
}

async function handleStart(env, chatId, firstName) {
  await sendBrandCard(env, chatId);
  const name = escapeHtml(firstName || 'there');
  const text = `<b>WELCOME, ${name.toUpperCase()}</b>\n\nThis is the official Daniel Cruze space.\n\nAccess published works, your Soul Blueprint reading, private enquiries and the public journal from one place.\n\n<i>${BRAND.signature}</i>\n\n📚 /books — published works\n🜂 /blueprint — personal reading\n✉️ /enquire — private enquiries\n✦ /journal — current writing\n🏛️ /site — danielcruze.com`;
  await sendMessage(env, chatId, text, buttons([
    [{ text: '📚 BOOKS & TRANSMISSIONS', url: BRAND.books }, { text: '🜂 SOUL BLUEPRINT', url: BRAND.soulBlueprint }],
    [{ text: '✉️ PRIVATE ENQUIRIES', url: BRAND.enquiries }],
    [{ text: '🏛️ ENTER DANIELCRUZE.COM', url: BRAND.website }],
  ]));
}

async function handleBooks(env, chatId) {
  await sendBrandCard(env, chatId);
  await sendMessage(env, chatId, `<b>PUBLISHED WORKS</b>\n\nDoctrine made portable. Wisdom distilled into language that can be lived, not merely read.\n\nChoose a secure AIB HUB PTY LTD checkout below, or view the complete library.`, buttons([
    [{ text: '12 SACRED PRINCIPLES — A$33', url: CHECKOUT.sacredPrinciples }],
    [{ text: 'GATE 1: SENSORY AWAKENING — A$33', url: CHECKOUT.sensoryAwakening }],
    [{ text: 'THE GRAND CODEX OF THE HEART — A$97', url: CHECKOUT.grandCodex }],
    [{ text: 'VIEW ALL BOOKS', url: BRAND.books }],
  ]));
}

async function handleBlueprint(env, chatId) {
  await sendBrandCard(env, chatId);
  const text = `<b>SOUL BLUEPRINT</b>\n\nA personal Chartography reading for your primary Gate, shadow patterns, integration path and practical next steps.\n\n<b>A$333 AUD</b>\n\nSecure booking is processed by AIB HUB PTY LTD. Fulfilment details are confirmed after payment.`;
  await sendMessage(env, chatId, text, buttons([
    [{ text: '🜂 BOOK YOUR SOUL BLUEPRINT — A$333', url: CHECKOUT.soulBlueprint }],
    [{ text: 'READ ABOUT THE BLUEPRINT', url: BRAND.soulBlueprint }],
    [{ text: '✉️ PRIVATE ENQUIRY', url: BRAND.enquiries }],
  ]));
}

async function handleEnquire(env, chatId) {
  await sendBrandCard(env, chatId);
  await sendMessage(env, chatId, `<b>PRIVATE ENQUIRIES</b>\n\nBookings are by appointment. Pre-booking is preferred and every enquiry is handled with discretion.\n\nUse the private enquiry page to email Daniel directly.`, buttons([
    [{ text: '✉️ MAKE A PRIVATE ENQUIRY', url: BRAND.enquiries }],
    [{ text: '🏛️ DANIELCRUZE.COM', url: BRAND.website }],
  ]));
}

async function handleJournal(env, chatId) {
  await sendBrandCard(env, chatId);
  await sendMessage(env, chatId, `<b>THE JOURNAL</b>\n\nWriting on embodied presence, masculine depth, intimacy and the work of a life well lived.`, buttons([
    [{ text: '✦ READ THE JOURNAL', url: BRAND.journal }],
    [{ text: '🏛️ DANIELCRUZE.COM', url: BRAND.website }],
  ]));
}

async function handleSite(env, chatId) {
  await sendBrandCard(env, chatId);
  await sendMessage(env, chatId, `<b>DANIEL CRUZE</b>\n\nPublished works. Soul Blueprint. Private enquiries. The journal.\n\n<i>${BRAND.signature}</i>`, buttons([
    [{ text: '🏛️ ENTER DANIELCRUZE.COM', url: BRAND.website }],
    [{ text: '✉️ PRIVATE ENQUIRIES', url: BRAND.enquiries }],
  ]));
}

async function handleUpdate(update, env) {
  if (!update.message?.text) return;
  const chatId = update.message.chat.id;
  const command = update.message.text.trim().split('@')[0].toLowerCase();
  const firstName = update.message.from?.first_name;

  switch (command) {
    case '/start': await handleStart(env, chatId, firstName); break;
    case '/books': await handleBooks(env, chatId); break;
    case '/blueprint': await handleBlueprint(env, chatId); break;
    case '/enquire': await handleEnquire(env, chatId); break;
    case '/journal': await handleJournal(env, chatId); break;
    case '/site': await handleSite(env, chatId); break;
    default:
      if (command.startsWith('/')) {
        await sendMessage(env, chatId, `Use /books, /blueprint, /enquire, /journal or /site.\n\n<i>${BRAND.signature}</i>`);
      }
  }
}

async function telegramWebhookSecret(env) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('telegram-hook-v1:' + env.BOT_TOKEN));
  return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, '0')).join('');
}

export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      if (!env?.BOT_TOKEN) return new Response('Bot not configured', { status: 503 });
      const signature = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
      if (signature !== await telegramWebhookSecret(env)) return new Response('Forbidden', { status: 403 });
      try {
        await handleUpdate(await request.json(), env);
        return new Response('OK', { status: 200 });
      } catch {
        return new Response('Telegram update error', { status: 500 });
      }
    }
    return new Response(`${BRAND.title} — ${BRAND.signature}`, { status: 200 });
  },
};
