"""Browser acceptance checks; uses the same Playwright dependency as test-web.py."""
import json, os, threading
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from playwright.sync_api import sync_playwright
ROOT = Path(__file__).resolve().parents[1]
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass
server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT/'dist')))
threading.Thread(target=server.serve_forever, daemon=True).start()
results = []
try:
    with sync_playwright() as p:
        options = {'headless': True, 'args': ['--no-sandbox']}
        if os.environ.get('CHROMIUM_PATH'): options['executable_path'] = os.environ['CHROMIUM_PATH']
        browser = p.chromium.launch(**options)
        for width, height in ((320,800), (390,800), (768,800), (1440,800), (844,390)):
            page = browser.new_page(viewport={'width': width, 'height': height}, reduced_motion='reduce')
            errors = []
            page.on('pageerror', lambda e: errors.append(str(e)))
            page.goto(f'http://127.0.0.1:{server.server_port}/', wait_until='networkidle')
            launch = page.locator('#gentlemans-lion .launch')
            launch.click()
            assert launch.get_attribute('aria-expanded') == 'true'
            field = page.get_by_role('textbox', name='Your question')
            field.fill('Which books can I read?'); field.press('Enter')
            assert page.get_by_role('link', name='Explore books').get_attribute('href') == '/books/'
            field.fill('<img src=x onerror=alert(1)>'); field.press('Enter')
            assert 'approved answer' in page.get_by_role('log').inner_text()
            assert page.get_by_role('link', name='Continue in Telegram').get_attribute('href') == 'https://t.me/danielcruzelife_bot?start=website_guide'
            box = page.get_by_role('dialog').bounding_box()
            assert box['x'] >= 0 and box['x']+box['width'] <= width+1 and box['y'] >= 0
            assert page.get_by_role('log').bounding_box()['height'] >= 100
            footer = page.locator('#gentlemans-lion .foot').bounding_box()
            assert footer['y'] + footer['height'] <= box['y'] + box['height'] + 1
            assert page.locator('#gentlemans-lion .launch img').get_attribute('src') == '/guide/lion-idle.png'
            assert page.locator('#gentlemans-lion img').evaluate_all('imgs => imgs.every(i => i.complete && i.naturalWidth > 0)')
            field.press('Escape')
            assert page.get_by_role('dialog').count() == 0
            assert launch.evaluate('el => el.getRootNode().activeElement === el')
            page.emulate_media(reduced_motion='no-preference')
            page.wait_for_function("document.querySelector('#gentlemans-lion').shadowRoot.querySelector('.launch img').src.endsWith('.webp')")
            assert not errors, errors
            if width == 390:
                launch.click(); (ROOT/'test-results').mkdir(exist_ok=True)
                page.screenshot(path=str(ROOT/'test-results/lion-mobile.png'))
            # Direct static entry and client navigation must not drop or duplicate it.
            page.goto(f'http://127.0.0.1:{server.server_port}/studio/', wait_until='networkidle')
            assert page.get_by_role('button', name='Open The Gentleman’s Lion guide').count() == 1
            results.append({'width': width, 'height': height, 'passed': True}); page.close()
        browser.close()
    (ROOT/'test-results/lion-results.json').write_text(json.dumps(results, indent=2)+'\n')
    print('PASS: guide questions, safe rendering, source links, Telegram URL, keyboard focus, reduced motion and bounds at four widths and landscape height.')
finally:
    server.shutdown()
