import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = resolve(root, 'content/page-seo.json');

test('owner SEO registry covers every essential public route', () => {
  assert.ok(existsSync(registryPath), 'content/page-seo.json must exist');
  const seo = JSON.parse(readFileSync(registryPath, 'utf8'));
  const required = ['/', '/about', '/books', '/journal', '/social', '/contact', '/work-with-daniel', '/the-33rd-house'];
  for (const route of required) {
    assert.ok(seo[route], `missing route ${route}`);
    assert.ok(seo[route].title?.trim(), `missing title for ${route}`);
    assert.ok(seo[route].description?.trim(), `missing description for ${route}`);
  }
  assert.equal(seo['/policies']?.robots, 'noindex,follow');
  assert.equal(seo['/the-books']?.robots, 'noindex,follow');
  for (const [route, data] of Object.entries(seo)) {
    assert.match(route, /^\\/(?:[a-z0-9-]+)?$/);
    assert.ok(data.title?.trim() && data.description?.trim(), `missing SEO text ${route}`);
    if (data.ogImage) {
      assert.match(data.ogImage, /^\\/images\\/[A-Za-z0-9_.-]+$/);
      assert.ok(data.ogImageAlt?.trim(), `missing alt text on ${route}`);
      assert.ok(existsSync(resolve(root, 'public', data.ogImage.slice(1))), `missing public image ${route}`);
    }
  }
});

test('site metadata uses the owner-editable JSON registry instead of embedded page entries', () => {
  const source = readFileSync(resolve(root, 'lib/page-seo.ts'), 'utf8');
  assert.match(source, /import pageSeoData from ['"]\\.\\.\\/content\\/page-seo\\.json['"]/);
  assert.doesNotMatch(source, /^\\s*'\\/about':/m);
});
