import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const routes=['about','contact','for-men','for-women','for-couples','work-with-daniel','sacred-masculinity','journal'];
test('route hero heights are fluid rather than fixed pixel heights',()=>{
 for (const route of routes){
  const s=readFileSync(new URL('../app/'+route+'.tsx',import.meta.url),'utf8');
  const section=s.match(/  heroImage: \{([\s\S]*?)\n  \},/)?.[1] || '';
  assert.ok(section.includes('aspectRatio:'),`${route} hero needs fluid aspect ratio`);
  assert.ok(section.includes('maxHeight:'),`${route} hero needs a height cap`);
  assert.ok(!/\bheight:\s*\d+/.test(section),`${route} hero cannot have fixed pixel height`);
 }
});
test('book covers cannot overflow 320px devices',()=>{
 const s=readFileSync(new URL('../app/the-books.tsx',import.meta.url),'utf8');
 const style=s.match(/  coverImage: \{([\s\S]*?)\n  \},/)?.[1]||'';
 assert.ok(style.includes('maxWidth:'));
 assert.ok(style.includes('width: "100%"'));
 assert.ok(style.includes('aspectRatio:'));
 assert.ok(!/\bheight:\s*\d+/.test(style));
});
