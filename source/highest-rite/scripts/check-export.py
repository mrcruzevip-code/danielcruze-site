#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist'
PUBLIC = ('index.html','about/index.html','books/index.html','journal/index.html','social/index.html','contact/index.html','the-33rd-house/index.html')

class Page(HTMLParser):
    def __init__(self): super().__init__(); self.tags=[]; self.text=[]
    def handle_starttag(self,t,a): self.tags.append((t,dict(a)))
    def handle_data(self,s): self.text.append(s)

def main():
    assert OUT.is_dir(), 'Export is missing'
    for rel in PUBLIC:
        p=OUT/rel;assert p.is_file(),f'Missing canonical page: {rel}'
        page=Page();page.feed(p.read_text());text=' '.join(page.text)
        assert len(text)>200,f'Empty server-rendered page: {rel}'
        for key in ('description','twitter:card','twitter:image'):
            assert any(t=='meta' and a.get('name')==key and a.get('content') for t,a in page.tags),(rel,key)
        assert any(t=='link' and a.get('rel')=='canonical' and a.get('href','').startswith('https://danielcruze.com/') for t,a in page.tags),(rel,'canonical')
        for key in ('og:title','og:description','og:url','og:image'):
            assert any(t=='meta' and a.get('property')==key and a.get('content') for t,a in page.tags),(rel,key)
    books=(OUT/'books/index.html').read_text()
    assert 'THE COMMUNITY' not in books and 'PRIVATE WORK' not in books,'Books erroneously contains the homepage'
    assert 'The Path of Transformation' in books and '12 Sacred Principles' in books
    assert 'danielcruzelife_bot' in (OUT/'social/index.html').read_text()
    for p in OUT.rglob('*'):
        if not p.is_file():continue
        assert p.suffix.lower() not in ('.wav','.mp3','.m4a','.pdf','.epub'),f'Held media exported: {p.relative_to(OUT)}'
        if p.suffix in ('.html','.js','.json'):
            s=p.read_text(errors='ignore')
            assert not re.search(r'\b\d{6,12}:[A-Za-z0-9_-]{30,}\b|\bsk_(?:live|test)_[A-Za-z0-9]{10,}',s),'Secret-like literal found; value suppressed'
    for rel in ('books.html','the-books.html','the-books/index.html','social.html'):
        s=(OUT/rel).read_text();assert 'http-equiv="refresh"' in s and 'noindex' in s,rel
    assert (OUT/'CNAME').read_text().strip()=='danielcruze.com'
    assert (OUT/'404.html').is_file()
    ET.parse(OUT/'sitemap.xml')
    print('PASS: complete initial HTML, metadata, true book content, bot deep link, canonical/alias files, sitemap, held-media exclusion and secret-literal checks.')

if __name__=='__main__':main()
