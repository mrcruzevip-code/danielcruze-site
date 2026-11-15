import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.js';
const env = {BOT_TOKEN:'unit-test-only'};
async function request(text, type='private', signature=true) {
 const digest = await crypto.subtle.digest('SHA-256',new TextEncoder().encode('telegram-hook-v1:'+env.BOT_TOKEN));
 const key = Buffer.from(digest).toString('hex');
 return worker.fetch(new Request('https://example.test/',{method:'POST',headers:{'Content-Type':'application/json',...(signature?{'X-Telegram-Bot-Api-Secret-Token':key}:{})},body:JSON.stringify({message:{text,chat:{id:1,type},from:{first_name:'Visitor'}}})}), env);
}
test('website start payload opens welcome and private free text receives guide reply', async () => {
 const sent=[]; const original=globalThis.fetch;
 globalThis.fetch=async (_url,init)=>{sent.push(JSON.parse(init.body)); return Response.json({ok:true,result:{}});};
 try {
  assert.equal((await request('/start website_guide')).status,200);
  assert.ok(sent.some(m=>m.text?.includes('WELCOME')));
  sent.length=0;
  await request('Which books can I read?');
  assert.ok(sent.some(m=>m.text?.includes('published works')));
  sent.length=0;
  await request('hello','group');
  assert.equal(sent.length,0);
  assert.equal((await request('hello','private',false)).status,403);
  assert.equal(sent.length,0);
 } finally {globalThis.fetch=original;}
});
