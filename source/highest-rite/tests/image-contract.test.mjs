import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const appDir = fileURLToPath(new URL('../app/',import.meta.url));
function recursive(folder){return readdirSync(folder,{withFileTypes:true}).flatMap(ent=>ent.isDirectory()?recursive(join(folder,ent.name)):(ent.name.endsWith('.tsx')?[join(folder,ent.name)]:[]));}

test('meaningful images must never use crop-by-default cover',()=>{
  const offenders=recursive(appDir).filter(path=>/contentFit="cover"/.test(readFileSync(path,'utf8')));
  assert.deepEqual(offenders,[],`cover crop still present in: ${offenders.join(', ')}`);
});

test('hero must reflow on rotation; no module-level snapshot viewport',()=>{
 const p=readFileSync(new URL('../app/(tabs)/index.tsx',import.meta.url),'utf8');
 assert.ok(p.includes('useWindowDimensions('));
 assert.ok(!p.includes('Dimensions.get("window")'));
 assert.ok(!p.includes('width: (SCREEN_WIDTH - 100) / 2'));
});

test('drawer width recalculates on rotation',()=>{
 const p=readFileSync(new URL('../components/drawer-menu.tsx',import.meta.url),'utf8');
 assert.ok(p.includes('useWindowDimensions('));
 assert.ok(!p.includes('Dimensions.get("window")'));
});

test('full-image wrapper defaults to contain and updates from screen size',()=>{
 const p=readFileSync(new URL('../components/responsive-media.tsx',import.meta.url),'utf8');
 assert.ok(p.includes("decorative ? 'cover' : 'contain'"));
 assert.ok(p.includes('useWindowDimensions()'));
});
