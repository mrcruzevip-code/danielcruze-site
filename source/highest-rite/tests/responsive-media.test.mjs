import test from 'node:test';
import assert from 'node:assert/strict';
import { fitWithin, responsiveHeight } from '../lib/responsive-media.ts';

test('portrait fits landscape without clipping or stretching', () => {
  const frame = fitWithin(1280, 720, 800, 1200);
  assert.equal(frame.height, 720);
  assert.equal(frame.width, 480);
});

test('landscape fits a small phone without clipping', () => {
  const frame = fitWithin(320, 568, 1920, 1080);
  assert.equal(frame.width, 320);
  assert.equal(frame.height, 180);
});

test('screen rotation recalculates size independently', () => {
  const portrait = fitWithin(390, 844, 1000, 1500);
  const landscape = fitWithin(844, 390, 1000, 1500);
  assert.equal(portrait.width, 390);
  assert.equal(landscape.height, 390);
  assert.ok(landscape.width < portrait.width);
});

test('every requested viewport preserves fit and aspect ratio', () => {
  const widths = [[320,568],[360,640],[375,667],[390,844],[430,932],[540,720],[768,1024],[820,1180],[1024,768],[1280,720],[1440,900],[1920,1080],[2560,1440]];
  for (const [width, height] of widths) {
    for (const [imageW, imageH] of [[1000,1500],[1920,1080],[1500,1500],[900,1800]]) {
      const m = fitWithin(width,height,imageW,imageH);
      assert.ok(m.width <= width && m.height <= height, `out of bounds at ${width}x${height}`);
      assert.ok(Math.abs(m.width/m.height - imageW/imageH)<1e-9, `distorted at ${width}x${height}`);
    }
  }
});

test('invalid or unknown dimensions never return infinity', () => {
  for (const args of [[0,568,100,100],[320,0,100,100],[320,500,0,100],[-50,500,100,100],[Infinity,500,100,100]]) {
    assert.deepEqual(fitWithin(...args),{width:0,height:0});
  }
});

test('portrait hero is prominent, under safe viewport maximum', () => {
  for (const [w,h] of [[320,568],[390,844],[820,1180],[1440,900]]) {
    const r = responsiveHeight(w,h,2/3);
    assert.ok(r<=h*0.8+1e-8 && r<=w/(2/3)+1e-8);
    assert.ok(r>0);
  }
});
