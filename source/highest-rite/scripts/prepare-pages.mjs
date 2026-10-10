import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'dist');
if (!fs.existsSync(path.join(out, 'index.html'))) throw new Error('Run Expo web export first');
const origin = 'https://danielcruze.com';
const canonical = ['/', '/about/', '/books/', '/journal/', '/social/', '/contact/', '/work-with-daniel/', '/the-33rd-house/'];
const noindex = new Set(['dev/theme-lab', 'oauth/callback']);
const redirect = (target) => `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${origin}${target}"><meta http-equiv="refresh" content="0;url=${target}"><title>Page moved | Daniel Cruze</title></head><body><p><a href="${target}">Continue to Daniel Cruze</a></p></body></html>\n`;
const walk = (dir) => fs.readdirSync(dir, { withFileTypes:true }).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
const pages = walk(out).filter(f => f.endsWith('.html'));
for (const file of pages) {
  const rel = path.relative(out, file).replaceAll(path.sep, '/');
  if (['index.html', '+not-found.html', '_sitemap.html'].includes(rel) || rel.startsWith('(tabs)/')) continue;
  if (rel.endsWith('/index.html')) continue;
  const slug = rel.slice(0, -5);
  if (slug === 'the-books') continue;
  let text = fs.readFileSync(file,'utf8');
  // Canonical metadata must describe the directory URL, never a mismatched .html route.
  text = text.replaceAll(`${origin}/${slug}"`, `${origin}/${slug}/"`);
  if (noindex.has(slug)) {
    if (!/name="robots"/.test(text)) text = text.replace('</head>', '<meta name="robots" content="noindex,follow"></head>');
  } else if (!slug.includes('[')) canonical.push(`/${slug}/`);
  const dest = path.join(out,slug,'index.html');
  fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,text);
  fs.writeFileSync(file,redirect(`/${slug}/`));
}
for (const rel of ['the-books.html','the-books/index.html']) {
  const dest=path.join(out,rel);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,redirect('/books/'));
}
// Preserve every original photograph and route. No content-pruning allowlist.
const publicRoutes=[...new Set(canonical)].sort();
const escaped=publicRoutes.map(r=>`  <url><loc>${origin}${r}</loc></url>`).join('\n');
fs.writeFileSync(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${escaped}\n</urlset>\n`);
fs.writeFileSync(path.join(out,'robots.txt'),`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /dev/\nDisallow: /oauth/\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(out,'CNAME'),'danielcruze.com\n');fs.writeFileSync(path.join(out,'.nojekyll'),'');
const error=`<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Page not found | Daniel Cruze</title><style>body{background:#0a0a0a;color:#f5f0e8;font:18px/1.7 system-ui;padding:clamp(24px,7vw,90px)}a{color:#e0c36c}main{max-width:760px}h1{font-weight:400}</style></head><body><main><h1>Page not found</h1><p>That address is not a current public page.</p><a href="/">Daniel Cruze home</a> · <a href="/books/">Books</a> · <a href="/social/">Social</a></main></body></html>\n`;
fs.writeFileSync(path.join(out,'404.html'),error);fs.writeFileSync(path.join(out,'+not-found.html'),error);
const publicMap=error.replace('Page not found','Public site map').replace('Page not found','Public site map').replace('That address is not a current public page.',publicRoutes.map(r=>`<a href="${r}">${r}</a>`).join('<br>'));
fs.writeFileSync(path.join(out,'_sitemap.html'),publicMap);
fs.mkdirSync(path.join(out,'_sitemap'),{recursive:true});fs.writeFileSync(path.join(out,'_sitemap/index.html'),publicMap);
const routes = walk(out).filter(f=>f.endsWith('.html')).map(f=>path.relative(out,f).replaceAll(path.sep,'/')).filter(r=>!['404.html','+not-found.html'].includes(r)).map(r=>({path:r==='index.html'?'/':'/'+r.replace(/index\.html$/,'')}));
fs.writeFileSync(path.join(out,'manus-routes.json'),JSON.stringify({routes},null,2)+'\n');
console.log(`Prepared ${publicRoutes.length} canonical public routes, real Expo directory pages and redirect-only legacy .html aliases in ${out}`);
