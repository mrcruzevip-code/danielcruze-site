import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'dist');
if (!fs.existsSync(path.join(out, 'index.html'))) throw new Error('Run Expo web export first');

const origin = 'https://danielcruze.com';
const canonical = ['/', '/about/', '/books/', '/journal/', '/soul-blueprint/', '/social/', '/contact/', '/work-with-daniel/', '/the-33rd-house/'];
const noindex = new Set(['dev/theme-lab', 'oauth/callback']);
const coreNav = [
  ['Home', '/'], ['Books', '/books/'], ['Soul Blueprint', '/soul-blueprint/'],
  ['Journal', '/journal/'], ['Private Enquiries', '/contact/'], ['Social', '/social/'],
];
const redirect = (target) => `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${origin}${target}"><meta http-equiv="refresh" content="0;url=${target}"><title>Page moved | Daniel Cruze</title></head><body><p><a href="${target}">Continue to Daniel Cruze</a></p></body></html>\n`;
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const siteFooter = `<footer data-site-footer aria-label="Daniel Cruze site footer"><style>[data-site-footer]{background:#0a0a0a;border-top:1px solid #2a2520;color:#9b9b8f;padding:36px clamp(24px,6vw,72px);font:12px/1.6 system-ui,sans-serif;text-align:center}[data-site-footer] nav{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 20px;margin:0 auto 20px;max-width:920px}[data-site-footer] a{color:#d9c08a;text-decoration:none;letter-spacing:.08em;text-transform:uppercase}[data-site-footer] a:hover{text-decoration:underline}[data-site-footer] .site-footer-seal{color:#8b2635;letter-spacing:.2em;margin:0 0 12px;font-style:italic}[data-site-footer] .site-footer-meta{margin:0 auto;max-width:720px}</style><p class="site-footer-seal">Amor Aeternus. Libertas Sacra.</p><nav aria-label="Core site links">${coreNav.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}<a href="https://t.me/danielcruzelife_bot" rel="noopener">Official Bot</a><a href="mailto:daniel@danielcruze.com">daniel@danielcruze.com</a><a href="/_sitemap/">Site Index</a></nav><p class="site-footer-meta">Daniel Cruze · The Highest Rite · <a href="/policies/">Terms &amp; Policies</a></p></footer>`;
const withFooter = (html) => html.includes('data-site-footer') ? html : html.replace('</body>', `${siteFooter}</body>`);

for (const file of walk(out).filter((entry) => entry.endsWith('.html'))) {
  const rel = path.relative(out, file).replaceAll(path.sep, '/');
  if (['index.html', '+not-found.html', '_sitemap.html'].includes(rel) || rel.startsWith('(tabs)/') || rel.endsWith('/index.html')) continue;
  const slug = rel.slice(0, -5);
  if (slug === 'the-books') continue;
  let text = fs.readFileSync(file, 'utf8');
  text = text.replaceAll(`${origin}/${slug}"`, `${origin}/${slug}/"`);
  if (noindex.has(slug)) {
    if (!/name="robots"/.test(text)) text = text.replace('</head>', '<meta name="robots" content="noindex,follow"></head>');
  } else if (!slug.includes('[')) {
    canonical.push(`/${slug}/`);
  }
  const dest = path.join(out, slug, 'index.html');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, withFooter(text));
  fs.writeFileSync(file, redirect(`/${slug}/`));
}

const rootIndex = path.join(out, 'index.html');
fs.writeFileSync(rootIndex, withFooter(fs.readFileSync(rootIndex, 'utf8')));
for (const rel of ['the-books.html', 'the-books/index.html']) {
  const dest = path.join(out, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, redirect('/books/'));
}

const publicRoutes = [...new Set(canonical)].sort();
const escaped = publicRoutes.map((route) => `  <url><loc>${origin}${route}</loc></url>`).join('\n');
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${escaped}\n</urlset>\n`);
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /dev/\nDisallow: /oauth/\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(out, 'CNAME'), 'danielcruze.com\n');
fs.writeFileSync(path.join(out, '.nojekyll'), '');

const error = `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Page not found | Daniel Cruze</title><style>body{background:#0a0a0a;color:#f5f0e8;font:18px/1.7 system-ui;padding:clamp(24px,7vw,90px)}a{color:#e0c36c}main{max-width:760px}</style></head><body><main><h1>Page not found</h1><p>That address is not a current public page.</p><a href="/">Daniel Cruze home</a> · <a href="/books/">Books</a> · <a href="/social/">Social</a></main>${siteFooter}</body></html>\n`;
fs.writeFileSync(path.join(out, '404.html'), error);
fs.writeFileSync(path.join(out, '+not-found.html'), error);
const publicMap = `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Site index | Daniel Cruze</title></head><body><main><h1>Daniel Cruze site index</h1><p>${publicRoutes.map((route) => `<a href="${route}">${route}</a>`).join('<br>')}</p></main>${siteFooter}</body></html>\n`;
fs.writeFileSync(path.join(out, '_sitemap.html'), publicMap);
fs.mkdirSync(path.join(out, '_sitemap'), { recursive: true });
fs.writeFileSync(path.join(out, '_sitemap/index.html'), publicMap);
const routes = walk(out).filter((file) => file.endsWith('.html')).map((file) => path.relative(out, file).replaceAll(path.sep, '/')).filter((route) => !['404.html', '+not-found.html'].includes(route)).map((route) => ({ path: route === 'index.html' ? '/' : `/${route.replace(/index\.html$/, '')}` }));
fs.writeFileSync(path.join(out, 'manus-routes.json'), JSON.stringify({ routes }, null, 2) + '\n');
console.log(`Prepared ${publicRoutes.length} canonical public routes, crawler-visible footers, metadata, index, sitemap and redirect-only legacy aliases in ${out}`);
