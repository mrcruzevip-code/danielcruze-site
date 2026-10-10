#!/usr/bin/env python3
import json, os, threading
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import xml.etree.ElementTree as ET
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
def main():
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(QuietHandler,directory=str(ROOT/'dist')))
    threading.Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}'
    tree=ET.parse(ROOT/'dist/sitemap.xml');routes=[n.text.replace('https://danielcruze.com','') for n in tree.findall('.//{*}loc')]
    results=[];errors=[];dest=ROOT/'test-results';dest.mkdir(exist_ok=True)
    with sync_playwright() as p:
        options={'headless':True,'args':['--no-sandbox']}
        if os.environ.get('CHROMIUM_PATH'):options['executable_path']=os.environ['CHROMIUM_PATH']
        browser=p.chromium.launch(**options);page=browser.new_page(reduced_motion='reduce');page.on('pageerror',lambda e:errors.append(str(e)))
        for width in (320,390,768,1440):
            page.set_viewport_size({'width':width,'height':900})
            for route in routes:
                response=page.goto(base+route,wait_until='networkidle');page.wait_for_timeout(150)
                assert response.status==200,(width,route,response.status)
                data=page.evaluate('''() => {const root=document.querySelector('#root');return {hydrated:Object.keys(root||{}).some(k=>k.startsWith('__react')),text:root?.innerText||'',width:document.documentElement.scrollWidth,rootWidth:root?.getBoundingClientRect().width,badImages:[...document.images].filter(i=>i.getBoundingClientRect().width>0&&(!i.complete||i.naturalWidth===0)).map(i=>i.getAttribute('src'))};}''')
                assert data['hydrated'] and data['rootWidth']>0,(width,route,'blank/unhydrated')
                assert len(data['text'])>120,(width,route,'missing content')
                assert data['width']<=width+2,(width,route,'horizontal overflow',data['width'])
                assert not data['badImages'],(width,route,'broken images',data['badImages'])
                assert not errors,(width,route,'runtime errors',errors)
                assert 'A New Public Chapter' not in data['text'],(width,route,'replacement screen')
                if width == 390 and route == '/soul-blueprint/':
                    hero_top=page.get_by_text('CHARTOGRAPHY',exact=True).evaluate("el => el.parentElement?.parentElement?.getBoundingClientRect().top")
                    assert hero_top is not None and hero_top <= 2,(width,route,'blank hero band',hero_top)
                results.append({'width':width,'route':route,'passed':True})
                if width in (390,1440) and route in ('/','/books/','/soul-blueprint/'):
                    page.screenshot(path=str(dest/f'restored-{route.strip("/") or "home"}-{width}.png'))
            page.goto(base+'/',wait_until='networkidle');page.wait_for_timeout(900)
            assert page.get_by_role('button',name='Enter',exact=True).count()>0,'original hero CTA missing'
            page.get_by_role('button',name='Open menu',exact=True).first.click();page.wait_for_timeout(500)
            page.get_by_role('button',name='Soul Blueprint',exact=True).click();page.wait_for_url('**/soul-blueprint*')
            assert 'SOUL BLUEPRINT' in page.locator('#root').inner_text(),'original drawer action broken'
        for alias,target in (('/books.html','/books/'),('/the-books.html','/books/'),('/the-books/','/books/'),('/social.html','/social/')):
            page.goto(base+alias,wait_until='networkidle');page.wait_for_url('**'+target);assert page.locator('#root').inner_text().strip(),alias
        response=page.goto(base+'/missing-route-validation');assert response.status==404
        context=browser.new_context(java_script_enabled=False);raw=context.new_page();raw.goto(base+'/books/');assert 'The Path of Transformation' in raw.locator('body').inner_text()
        browser.close()
    server.shutdown();(dest/'responsive-results.json').write_text(json.dumps(results,indent=2)+'\n')
    print(f'PASS: {len(results)} original-route/viewport hydration checks, retained imagery, visible original hero, real drawer/deep-link navigation, aliases, no-JS Books and HTTP 404.')
if __name__=='__main__':main()
