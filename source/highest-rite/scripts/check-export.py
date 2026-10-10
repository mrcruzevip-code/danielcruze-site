#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
import re
import xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist'
REQUIRED = ('about','books','journal','social','contact','the-33rd-house','work-with-daniel','for-men','for-women','for-couples','soul-blueprint','sacred-masculinity','beyond-duality','decoding-cosmos','policies')
class Page(HTMLParser):
    def __init__(self): super().__init__(); self.tags=[]; self.text=[]
    def handle_starttag(self,t,a): self.tags.append((t,dict(a)))
    def handle_data(self,s): self.text.append(s)
def main():
    assert OUT.is_dir(),'Export missing'
    paths=[OUT/'index.html']+[OUT/r/'index.html' for r in REQUIRED]
    for p in paths:
        assert p.is_file(),f'Missing original route {p}'
        page=Page();page.feed(p.read_text());text=' '.join(page.text)
        assert len(text)>200,f'Empty original page {p.name}'
        assert 'A New Public Chapter' not in text and 'not part of the current public author' not in text,'Replacement boundary content remains'
        for key in ('description','twitter:card','twitter:image'):
            assert any(t=='meta' and a.get('name')==key and a.get('content') for t,a in page.tags),(p.name,key)
        assert any(t=='link' and a.get('rel')=='canonical' and a.get('href','').startswith('https://danielcruze.com/') for t,a in page.tags),(p.name,'canonical')
        for key in ('og:title','og:description','og:url','og:image'):
            assert any(t=='meta' and a.get('property')==key and a.get('content') for t,a in page.tags),(p.name,key)
    home=(OUT/'index.html').read_text()
    for section in ('DANIEL CRUZE','SACRED MASCULINITY','PRIVATE WORK','PUBLISHED WORKS','TESTIMONIALS','FROM THE JOURNAL','THE 33RD HOUSE','THE COMMUNITY','PRIVATE ENQUIRIES'):
        assert section in home,('Original home section lost',section)
    images=list((ROOT/'public/images').iterdir());assert len(images)>=23
    for image in images: assert (OUT/'images'/image.name).read_bytes()==image.read_bytes(),('Original photograph missing/changed',image.name)
    content=(ROOT/'lib/content.ts').read_text()
    for src in set(re.findall(r'"(/images/[^\"]+)"',content)):
        assert (OUT/src.lstrip('/')).is_file(),('Image reference missing',src)
    books=(OUT/'books/index.html').read_text()
    assert 'PRIVATE WORK' not in books and 'The Path of Transformation' in books and '12 Sacred Principles' in books
    for p in OUT.rglob('*'):
        if not p.is_file():continue
        assert p.suffix.lower() not in ('.wav','.mp3','.m4a','.pdf','.epub'),f'Held media exported: {p.relative_to(OUT)}'
        if p.suffix in ('.html','.js','.json'):
            assert not re.search(r'\b\d{6,12}:[A-Za-z0-9_-]{30,}\b|\bsk_(?:live|test)_[A-Za-z0-9]{10,}',p.read_text(errors='ignore')),'Secret-like literal found; value suppressed'
    for rel in ('books.html','the-books.html','the-books/index.html','social.html'):
        s=(OUT/rel).read_text();assert 'http-equiv="refresh"' in s and 'noindex' in s,rel
    assert (OUT/'CNAME').read_text().strip()=='danielcruze.com'
    assert (OUT/'404.html').is_file();ET.parse(OUT/'sitemap.xml')
    print(f'PASS: all original routes and home sections, {len(images)} byte-preserved original images, static metadata, original Books, aliases, sitemap and secret/held-media checks.')
if __name__=='__main__':main()
