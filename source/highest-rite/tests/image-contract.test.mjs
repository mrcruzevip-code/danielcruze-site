import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const appDir = fileURLToPath(new URL('../app/',import.meta.url));
function recursive(folder){return readdirSync(folder,{withFileTypes:true}).flatMap(ent=>ent.isDirectory()?recursive(join(folder,ent.name)):(ent.name.endsWith('.tsx')?[join(folder,ent.name)]:[]));}

test('meaningful images default to full-frame containment; the Soul Blueprint background is the one approved full-bleed hero',()=>{
  const approved = join(appDir,'soul-blueprint.tsx');
  const offenders=recursive(appDir).filter(path=>path!==approved&&/contentFit="cover"/.test(readFileSync(path,'utf8')));
  assert.deepEqual(offenders,[],`unapproved cover crop present in: ${offenders.join(', ')}`);
  const soul=readFileSync(approved,'utf8');
  assert.ok(soul.includes('contentFit="cover"'),'Soul Blueprint must fill its hero rather than letterbox on mobile');
  assert.ok(soul.includes('<AppShell headerTransparent>'),'Soul Blueprint header must overlay the full-bleed hero');
});

test('hero must reflow on rotation; no module-level snapshot viewport',()=>{
 const p=readFileSync(new URL('../app/(tabs)/index.tsx',import.meta.url),'utf8');
 assert.ok(p.includes('useSiteDimensions('));
 assert.ok(!p.includes('Dimensions.get("window")'));
 assert.ok(!p.includes('width: (SCREEN_WIDTH - 100) / 2'));
});

test('drawer width recalculates on rotation',()=>{
 const p=readFileSync(new URL('../components/drawer-menu.tsx',import.meta.url),'utf8');
 assert.ok(p.includes('useSiteDimensions('));
 assert.ok(!p.includes('Dimensions.get("window")'));
});

test('full-image wrapper defaults to contain and updates from screen size',()=>{
 const p=readFileSync(new URL('../components/responsive-media.tsx',import.meta.url),'utf8');
 assert.ok(p.includes("decorative ? 'cover' : 'contain'"));
 assert.ok(p.includes('useWindowDimensions()'));
});
