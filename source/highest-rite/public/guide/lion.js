import { answer, TELEGRAM } from './knowledge.mjs';
if (!document.getElementById('gentlemans-lion')) {
  const host = document.createElement('div');
  host.id = 'gentlemans-lion';
  document.body.append(host);
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<style>
:host{position:fixed;bottom:max(20px,env(safe-area-inset-bottom));right:20px;z-index:99999;font:15px/1.55 system-ui,sans-serif;color:#f5f0e8;color-scheme:dark}
*{box-sizing:border-box}button,input,a{-webkit-tap-highlight-color:transparent}button,a{touch-action:manipulation}button{cursor:pointer;font:inherit}button:focus-visible,a:focus-visible,input:focus-visible{outline:3px solid #d4af37;outline-offset:3px}
.launch{display:flex;align-items:center;gap:8px;background:#141414;border:1px solid #c8b88a;border-radius:40px;padding:7px 18px 7px 8px;color:#f5f0e8;box-shadow:0 8px 30px #0006}.launch img{width:48px;height:52px;object-fit:contain;animation:breathe 4s ease-in-out infinite}.launch span{font-size:13px;letter-spacing:.03em}
.panel{width:370px;max-width:calc(100vw - 24px);height:min(620px,calc(100dvh - 110px));background:#141414;border:1px solid #635638;border-radius:20px;box-shadow:0 16px 70px #0009;overflow:hidden;display:flex;flex-direction:column;margin-bottom:12px}.panel[hidden]{display:none}header{display:flex;align-items:center;gap:12px;padding:15px 18px;border-bottom:1px solid #393127;background:#0a0a0a}header img{width:48px;height:52px;object-fit:contain}h2{font:18px/1.3 Georgia,serif;margin:0;color:#d4af37}.sub{font-size:11px;color:#c8b88a}.close{margin-left:auto;background:none;color:#f5f0e8;border:0;padding:10px;font-size:24px}.log{overflow:auto;flex:1;padding:16px;overscroll-behavior:contain}.message{margin:0 0 14px;padding:12px 14px;background:#24221d;border-radius:14px}.message.user{background:#64212b;margin-left:24px}.message p{margin:0}.links{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}a{color:#e1c76e;text-underline-offset:3px}.starters{display:flex;flex-wrap:wrap;gap:7px;padding:0 16px 12px}.starters button{border:1px solid #635638;border-radius:20px;padding:7px 12px;color:#f5f0e8;background:transparent;font-size:12px}form{display:flex;gap:8px;padding:12px 16px;border-top:1px solid #393127}input{min-width:0;flex:1;padding:10px;border-radius:8px;background:#0a0a0a;border:1px solid #635638;color:#f5f0e8;font-size:16px}form button{border:0;border-radius:8px;background:#8b2635;color:#fff;padding:10px 14px}.foot{padding:0 16px 14px;font-size:11px;color:#b6afa0}.foot a{display:block;font-size:13px;margin-bottom:5px}@keyframes breathe{50%{transform:translateY(-3px)}}@media(prefers-reduced-motion:reduce){*{animation:none!important;scroll-behavior:auto!important}}@media(max-width:450px){:host{right:12px;bottom:max(12px,env(safe-area-inset-bottom))}.panel{width:calc(100vw - 24px)}.launch span{max-width:150px}}
</style>
<section class="panel" hidden role="dialog" aria-modal="false" aria-labelledby="title"><header><img src="/guide/lion-wave.png" alt=""><div><h2 id="title">The Gentleman’s Lion</h2><div class="sub">DANIEL CRUZE · DIGITAL GUIDE</div></div><button class="close" aria-label="Close guide">×</button></header><div class="log" role="log" aria-live="polite" aria-label="Guide conversation"></div><div class="starters"><button>Books</button><button>Teachings</button><button>Private work</button><button>The 33rd House</button></div><form><input aria-label="Your question" placeholder="What would you like to explore?" maxlength="500" autocomplete="off" required><button type="submit">Send</button></form><div class="foot"><a class="telegram" target="_blank" rel="noopener noreferrer">Continue in Telegram ↗</a>Curated public answers. Chat stays in this tab; it isn’t sent to Daniel or saved. Telegram starts a separate chat.</div></section><button class="launch" aria-expanded="false" aria-label="Open The Gentleman’s Lion guide"><img src="/guide/lion-idle.webp" alt=""><span>Ask the Gentleman’s Lion</span></button>`;
  const panel = root.querySelector('.panel'), launcher = root.querySelector('.launch'), log = root.querySelector('.log'), input = root.querySelector('input');
  root.querySelector('.telegram').href = TELEGRAM;
  let topic;
  function add(text, user = false, links = []) {
    const item = document.createElement('div'); item.className = 'message' + (user ? ' user' : '');
    const p = document.createElement('p'); p.textContent = text; item.append(p);
    if (links.length) { const nav = document.createElement('div'); nav.className = 'links';
      for (const link of links) { const a = document.createElement('a'); a.href = link.href; a.textContent = link.label;
        if (link.href.startsWith('https://')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } nav.append(a); }
      item.append(nav);
    }
    log.append(item); while (log.children.length > 40) log.firstElementChild.remove(); log.scrollTop = log.scrollHeight;
  }
  function ask(text) { const q = text.trim().slice(0, 500); if (!q) return; add(q, true); const result = answer(q, topic); topic = result.topic; add(result.text, false, result.links); input.value = ''; }
  function close() { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); launcher.focus(); }
  launcher.addEventListener('click', () => { if (!panel.hidden) { close(); return; } panel.hidden = false; launcher.setAttribute('aria-expanded', 'true'); input.focus(); });
  root.querySelector('.close').addEventListener('click', close);
  root.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { e.stopPropagation(); close(); } });
  root.querySelector('form').addEventListener('submit', e => { e.preventDefault(); ask(input.value); input.focus(); });
  root.querySelectorAll('.starters button').forEach(b => b.addEventListener('click', () => ask(b.textContent)));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const setMotion = () => { root.querySelector('.launch img').src = reducedMotion.matches ? '/guide/lion-idle.png' : '/guide/lion-idle.webp'; };
  reducedMotion.addEventListener('change', setMotion); setMotion();
  const greeting = answer('hello'); add(greeting.text);
}
