// Daniel Cruze / The Highest Rite Telegram bot
// Brand and public links are intentionally centralized below for easy owner edits.
// BOT_TOKEN remains a Cloudflare Worker secret and is never stored in Git.

const BRAND = Object.freeze({
  name: 'Daniel Cruze',
  title: 'THE HIGHEST RITE',
  seal: 'Amor Aeternus. Libertas Sacra.',
  crestImage: 'https://danielcruze.com/images/jXhnNoPYqlORBtZJ.jpg',
  website: 'https://danielcruze.com/',
  books: 'https://danielcruze.com/books/',
  soulBlueprint: 'https://danielcruze.com/soul-blueprint/',
  enquiries: 'https://danielcruze.com/contact/',
  email: 'mailto:daniel@danielcruze.com',
});

const LINKS = Object.freeze({
  sensoryAwakening: 'https://buy.stripe.com/6oU6oH7DPcwYdxCfwQ6wE0l',
  sacredPrinciples: 'https://buy.stripe.com/3cIdR93nz7cEfFK1G06wE0m',
  grandCodex: 'https://buy.stripe.com/00w9ATe2d68A516acw6wE0k',
  soulBlueprint: 'https://book.stripe.com/bJe7sLgal9kM3X23O86wE0o',
  legacyAssociate: 'https://paypal.me/DanielCruzeVIP/33',
  legacyCitizen: 'https://paypal.me/DanielCruzeVIP/33',
  legacyHighestRite: 'https://paypal.me/DanielCruzeVIP/3333',
  order: 'https://t.me/the33rdhouse_bot',
  instagram: 'https://instagram.com/the33rdhouse',
});

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
}[character]));

const keyboard = (rows) => ({ reply_markup: JSON.stringify({ inline_keyboard: rows }) });

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
      photo: BRAND.crestImage,
      caption: `<b>${BRAND.title}</b>\n<i>${BRAND.seal}</i>`,
      parse_mode: 'HTML',
    });
  } catch {
    // The text experience remains available if a remote image cannot be delivered.
  }
}

async function handleStart(env, chatId, firstName) {
  await sendBrandCard(env, chatId);
  const name = escapeHtml(firstName || 'Soul');
  const text = `
<b>${BRAND.title}</b>
<i>The Final Initiation.</i>

${name},

You have found what most will never find.

The Highest Rite is not a course. It is not a program. It is not content.

<b>It is the final initiation.</b>

Beyond the 12 Gates. Beyond the 66 traditions. Beyond the 447 archetypes.

There is one rite that sits above all others: the rite that transforms knowledge into power and potential into sovereignty.

<b>THE TEMPLE</b>
📚 /books — Books and written transmissions
🜂 /blueprint — Soul Blueprint reading
🏛️ /site — Enter danielcruze.com
🔥 /oath — The original Highest Rite paths
⚔️ /order — The Sacred Kings Order
👑 /founder — The man who holds the rite

<i>${BRAND.seal}</i>`;
  await sendMessage(env, chatId, text, keyboard([
    [{ text: '🏛️ ENTER THE TEMPLE', url: BRAND.website }],
    [{ text: '📚 BOOKS & TRANSMISSIONS', url: BRAND.books }, { text: '🜂 SOUL BLUEPRINT', url: BRAND.soulBlueprint }],
    [{ text: '✉️ PRIVATE ENQUIRIES', url: BRAND.enquiries }],
  ]));
}

async function handleBooks(env, chatId) {
  await sendBrandCard(env, chatId);
  const text = `<b>THE LIBRARY</b>\n\nWritten transmissions from Daniel Cruze and The 33rd House. Choose a volume below or enter the full catalogue.`;
  await sendMessage(env, chatId, text, keyboard([
    [{ text: '12 SACRED PRINCIPLES — A$33', url: LINKS.sacredPrinciples }],
    [{ text: 'GATE 1: SENSORY AWAKENING — A$33', url: LINKS.sensoryAwakening }],
    [{ text: 'THE GRAND CODEX OF THE HEART — A$97', url: LINKS.grandCodex }],
    [{ text: 'VIEW THE FULL LIBRARY', url: BRAND.books }],
  ]));
}

async function handleBlueprint(env, chatId) {
  await sendBrandCard(env, chatId);
  const text = `<b>SOUL BLUEPRINT</b>\n\nA personal Chartography reading through the 12 Gates: primary Gate, shadow Gate, integration path and practical next steps.\n\n<b>A$333 AUD</b>\n\nFulfilment details are confirmed after secure booking. For a private question before booking, use the enquiry route.`;
  await sendMessage(env, chatId, text, keyboard([
    [{ text: '🜂 BOOK SOUL BLUEPRINT — A$333', url: LINKS.soulBlueprint }],
    [{ text: 'READ ABOUT THE BLUEPRINT', url: BRAND.soulBlueprint }],
    [{ text: '✉️ PRIVATE ENQUIRY', url: BRAND.enquiries }],
  ]));
}

async function handleSite(env, chatId) {
  await sendBrandCard(env, chatId);
  await sendMessage(env, chatId, `<b>DANIEL CRUZE</b>\n\nThe public temple: published works, Soul Blueprint, journal, enquiries and the official channel.`, keyboard([
    [{ text: '🏛️ DANIELCRUZE.COM', url: BRAND.website }],
    [{ text: '✉️ PRIVATE ENQUIRIES', url: BRAND.enquiries }],
  ]));
}

async function handleOath(env, chatId) {
  const text = `
<b>THE OATH — THE HIGHEST RITE</b>

You stand at the threshold of the final initiation.

This is not a subscription. This is a <b>declaration of sovereignty</b>.

<b>THREE PATHS:</b>

🔰 <b>ASSOCIATE — $33/year</b>\nYou begin the outer journey. You prove your commitment.

⚔️ <b>CITIZEN — $33/month</b>\nFull access to The Sacred Kings Order.

👑 <b>FOUNDING CITIZEN — $3,333</b>\nThe Highest Rite itself. Personal audience with the Founder.

After payment, send receipt to legacy@the33rdhouse.com`;
  await sendMessage(env, chatId, text, keyboard([
    [{ text: '🔰 ASSOCIATE — $33/year', url: LINKS.legacyAssociate }],
    [{ text: '⚔️ CITIZEN — $33/month', url: LINKS.legacyCitizen }],
    [{ text: '👑 THE HIGHEST RITE — $3,333', url: LINKS.legacyHighestRite }],
    [{ text: '⚔️ ENTER THE ORDER', url: LINKS.order }],
  ]));
}

async function handleOrder(env, chatId) {
  const text = `<b>THE SACRED KINGS ORDER</b>\n\nThe Highest Rite is the crown jewel of The Sacred Kings Order — the sovereign institution founded by Daniel Cruze.\n\nThe Order contains:\n🔱 12 Gates of Initiation\n☥ 447 Deity Archetypes\n📜 66+ Sacred Traditions\n💎 Sovereign Wealth Architecture\n🏛️ Titan Hills Territory\n🔥 The Highest Rite`;
  await sendMessage(env, chatId, text, keyboard([
    [{ text: '⚔️ ENTER THE SACRED KINGS ORDER', url: LINKS.order }],
    [{ text: '🔥 PAY TRIBUTE NOW', url: LINKS.legacyAssociate }],
    [{ text: '🏛️ PUBLIC TEMPLE', url: BRAND.website }],
  ]));
}

async function handleFounder(env, chatId) {
  const text = `<b>DANIEL CRUZE — Keeper of The Highest Rite</b>\n\nOne man compiled 447 deity archetypes. One man decoded 66 sacred traditions. One man built 12 gates of initiation.\n\n<b>That man is Daniel Cruze.</b>\n\nHe is not selling information. He is offering transformation.`;
  await sendMessage(env, chatId, text, keyboard([
    [{ text: "👑 THE FOUNDER'S DOMAIN", url: BRAND.website }],
    [{ text: '📸 INSTAGRAM', url: LINKS.instagram }],
    [{ text: '⚔️ THE ORDER', url: LINKS.order }],
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
    case '/site': await handleSite(env, chatId); break;
    case '/oath':
    case '/buy': await handleOath(env, chatId); break;
    case '/order': await handleOrder(env, chatId); break;
    case '/founder': await handleFounder(env, chatId); break;
    default:
      if (command.startsWith('/')) {
        await sendMessage(env, chatId, `THE TEMPLE IS OPEN.\n\n📚 /books — written transmissions\n🜂 /blueprint — personal Chartography\n🏛️ /site — danielcruze.com\n🔥 /oath — original Highest Rite paths`);
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
      } catch (error) {
        return new Response('Telegram update error', { status: 500 });
      }
    }
    return new Response(`${BRAND.title} — ${BRAND.seal}`, { status: 200 });
  },
};
