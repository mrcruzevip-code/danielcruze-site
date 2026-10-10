import test from 'node:test';
import assert from 'node:assert/strict';
import { fitWithin, responsiveHeight } from '../lib/responsive-media.ts';

test('portrait in landscape frame is complete and undistorted',()=>{
  assert.deepEqual(fitWithin(1280,720,800,1200),{width:480,height:720});
});
test('landscape photo fits 320px phone',()=>{
  assert.deepEqual(fitWithin(320,568,1920,1080),{width:320,height:180});
});
test('rotating the screen recomputes the layout',()=>{
  assert.ok(fitWithin(844,390,1000,1500).width<fitWithin(390,844,1000,1500).width);
});
test('all 13 viewport dimensions fit landscape, portrait, square, tall media',()=>{
  for(const [w,h] of [[320,568],[360,640],[375,667],[390,844],[430,932],[540,720],[768,1024],[820,1180],[1024,768],[1280,720],[1440,900],[1920,1080],[2560,1440]]){
    for(const [imw,imh] of [[1000,1500],[1920,1080],[1500,1500],[900,1800]]){
      const frame=fitWithin(w,h,imw,imh);
      assert.ok(frame.width<=w&&frame.height<=h);
      assert.ok(Math.abs(frame.width/frame.height-imw/imh)<1e-9);
    }
  }
});
test('invalid geometry is rejected safely',()=>{
  for(const args of [[0,568,100,100],[320,0,100,100],[320,500,0,100],[-50,500,100,100],[Infinity,500,100,100]]){
    assert.deepEqual(fitWithin(...args),{width:0,height:0});
  }
});
test('hero remains within screen with room for CTAs',()=>{
  for(const [w,h] of [[320,568],[390,844],[820,1180],[1440,900]]){
    const x=responsiveHeight(w,h,2/3);
    assert.ok(x>0&&x<=0.8*h&&x<=w/(2/3));
  }
});
