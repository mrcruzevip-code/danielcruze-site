#!/usr/bin/env python3
import json
import os
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import threading
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
ROUTES = ('/', '/about/', '/books/', '/journal/', '/social/', '/contact/', '/the-33rd-house/', '/work-with-daniel/', '/service/private-mentoring/', '/article/kundalini/')
WIDTHS = (320, 375, 390, 430, 768, 820, 1024, 1280, 1440, 1920)

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass


def main():
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT / 'dist')))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    base=f'http://127.0.0.1:{server.server_port}'
    results=[];errors=[]
    dest=ROOT/'test-results';dest.mkdir(exist_ok=True)
    with sync_playwright() as p:
        kwargs={'headless':True,'args':['--no-sandbox']}
        if os.environ.get('CHROMIUM_PATH'):kwargs['executable_path']=os.environ['CHROMIUM_PATH']
        browser=p.chromium.launch(**kwargs)
        page=browser.new_page(reduced_motion='reduce')
        page.on('pageerror',lambda e:errors.append(str(e)))
        for width in WIDTHS:
            page.set_viewport_size({'width':width,'height':900})
            for route in ROUTES:
                response=page.goto(base+route,wait_until='networkidle')
                assert response.status==200,(width,route,response.status)
                data=page.evaluate('''() => {
                    const root=document.querySelector('#root');
                    const mainText=root?.innerText || '';
                    const hydrated=Object.keys(root||{}).some(k=>k.startsWith('__react'));
                    const overflow=[...document.querySelectorAll('div')].filter(e=>e.clientWidth>0 && e.scrollWidth>e.clientWidth+2).length;
                    const booksDirection=document.querySelector('h2')?.parentElement?.parentElement && getComputedStyle(document.querySelector('h2').parentElement.parentElement).flexDirection;
                    const visible=[...document.querySelectorAll('a')].filter(a=>['About','Books','Journal','Social','Contact'].includes(a.innerText) && a.getBoundingClientRect().width>0);
                    return {hydrated,overflow,booksDirection,length:mainText.length,width:innerWidth,documentWidth:document.documentElement.scrollWidth,
                      rootWidth:root?.getBoundingClientRect().width,
                      nav:visible.length>=5 && visible.every(a=>{const r=a.getBoundingClientRect();return r.width>0 && r.left>=-1 && r.right<=innerWidth+1}),
                      badImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')),
                      images:[...document.images].filter(i=>i.getBoundingClientRect().width>0).map(i=>({fit:getComputedStyle(i).objectFit,ratio:i.getBoundingClientRect().width/i.getBoundingClientRect().height,natural:i.naturalWidth/i.naturalHeight}))};
                }''')
                assert data['hydrated'],(width,route,'React did not hydrate')
                assert data['overflow']==0,(width,route,'nested clipping/overflow',data)
                if route=='/books/':assert data['booksDirection']==('row' if width>=900 else 'column'),(width,route,'wrong breakpoint layout',data)
                assert data['length']>150,(width,route,'blank app',data)
                assert data['rootWidth']>0,(width,route,'zero-size app frame')
                assert data['documentWidth']<=width+1,(width,route,'document overflow',data)
                assert data['nav'],(width,route,'navigation missing/clipped',data)
                assert not data['badImages'],(width,route,'failed image',data['badImages'])
                for i in data['images']:
                    assert i['fit']!='cover' and abs(i['ratio']-i['natural'])<.02,(width,route,'image cropped/stretched',i)
                assert not errors,(width,route,'runtime exception',errors)
                results.append({'width':width,'route':route,'passed':True})
                if width in (390,1440) and route in ('/','/books/','/social/'):
                    page.screenshot(path=str(dest/f"{route.strip('/').replace('/','_') or 'home'}-{width}.png"),full_page=True)
        for alias,target in (('/books.html','/books/'),('/the-books.html','/books/'),('/the-books/','/books/'),('/social.html','/social/')):
            page.goto(base+alias,wait_until='networkidle');page.wait_for_url('**'+target)
            assert page.locator('#root').inner_text().strip(),('empty alias target',alias)
        page.goto(base+'/');page.get_by_role('link',name='Books',exact=True).first.click()
        page.wait_for_url('**/books*');assert 'The Path of Transformation' in page.locator('#root').inner_text()
        page.set_viewport_size({'width':320,'height':900})
        page.goto(base+'/');page.add_style_tag(content='html { font-size: 200% !important; }')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'),'enlarged text overflow'
        page.set_viewport_size({'width':900,'height':430});page.goto(base+'/books/')
        assert 'The Path of Transformation' in page.locator('#root').inner_text(),'landscape book disappeared'
        response=page.goto(base+'/missing-route-validation-20261010');assert response.status==404,'missing URL not HTTP 404'
        context=browser.new_context(java_script_enabled=False)
        raw=context.new_page();raw.goto(base+'/books/');assert 'The Path of Transformation' in raw.locator('body').inner_text(),'empty initial HTML without JS'
        browser.close()
    server.shutdown()
    (dest/'responsive-results.json').write_text(json.dumps(results,indent=2)+'\n')
    print(f'PASS: {len(results)} hydrated route/viewport checks, aliases, real navigation, rotation, 200% root font scaling, no-JS content and HTTP 404. No external destination opened or messages sent.')

if __name__=='__main__':main()
