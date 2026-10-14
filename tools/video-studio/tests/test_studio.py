import subprocess,tempfile,pathlib,unittest,json,os
ROOT=pathlib.Path(__file__).resolve().parents[1]
import shutil
PS=os.environ.get('STUDIO_PWSH') or shutil.which('pwsh') or '/workspace/scratch/2816549ffa0f/tools/pwsh/pwsh'
def run(args):return subprocess.run(args,capture_output=True,text=True)
def probe(p):return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration:stream=codec_type','-of','json',str(p)]))
class StudioTests(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.p=pathlib.Path(self.tmp.name)
  subprocess.run(['ffmpeg','-v','error','-f','lavfi','-i','color=black:s=320x240:d=3','-c:v','libx264',str(self.p/'silent.mp4')],check=True)
  subprocess.run(['ffmpeg','-v','error','-f','lavfi','-i','sine=frequency=440:duration=1','-c:a','aac',str(self.p/'tone.m4a')],check=True)
  subprocess.run(['ffmpeg','-v','error','-f','lavfi','-i','color=red:s=40x40','-frames:v','1',str(self.p/'logo.png')],check=True)
 def tearDown(self):self.tmp.cleanup()
 def call(self,*args):return run([PS,'-NoProfile','-File',str(ROOT/'video-studio.ps1'),'-Project',str(self.p/'project'),*map(str,args)])
 def test_audio_info(self):
  r=self.call('-Command','Info','-Input',self.p/'tone.m4a');self.assertEqual(r.returncode,0,r.stderr)
 def test_music_on_silent_video(self):
  r=self.call('-Command','Audio','-Input',self.p/'silent.mp4','-Audio',self.p/'tone.m4a','-Output',self.p/'mix.mp4');self.assertEqual(r.returncode,0,r.stderr);self.assertTrue(any(s['codec_type']=='audio' for s in probe(self.p/'mix.mp4')['streams']))
 def test_trim_end_is_absolute(self):
  r=self.call('-Command','Trim','-Input',self.p/'silent.mp4','-Start','00:00:01','-End','00:00:02','-Output',self.p/'trim.mp4');self.assertEqual(r.returncode,0,r.stderr);self.assertAlmostEqual(float(probe(self.p/'trim.mp4')['format']['duration']),1,delta=.1)
 def test_no_overwrite(self):
  p=self.p/'out.mp4';p.write_bytes(b'preserve');r=self.call('-Command','Resize','-Input',self.p/'silent.mp4','-Output',p);self.assertNotEqual(r.returncode,0);self.assertEqual(p.read_bytes(),b'preserve')
 def test_watermark_applied(self):
  r=self.call('-Command','Watermark','-Input',self.p/'silent.mp4','-WatermarkFile',self.p/'logo.png','-Output',self.p/'mark.mp4');self.assertEqual(r.returncode,0,r.stderr)
  pixels=subprocess.check_output(['ffmpeg','-v','error','-i',str(self.p/'mark.mp4'),'-frames:v','1','-f','rawvideo','-pix_fmt','rgb24','-']);self.assertGreater(max(pixels[0::3]),150)
 def test_short_reel_ends_with_audio(self):
  r=self.call('-Command','RepurposeAudiobook','-Input',self.p,'-ReelSeconds','5');self.assertEqual(r.returncode,0,r.stderr);files=list((self.p/'project/output/reels').glob('*.mp4'));self.assertEqual(len(files),1);self.assertLess(float(probe(files[0])['format']['duration']),1.2)
 def test_single_chapter_audiobook(self):
  folder=self.p/'chapters';folder.mkdir();(folder/'chapter01.m4a').write_bytes((self.p/'tone.m4a').read_bytes())
  r=self.call('-Command','AudioBook','-Input',folder,'-Output',self.p/'book.m4b');self.assertEqual(r.returncode,0,r.stderr);self.assertLess(float(probe(self.p/'book.m4b')['format']['duration']),1.2)
 def test_join_matching_clips(self):
  folder=self.p/'project/input';folder.mkdir(parents=True);(folder/'01.mp4').write_bytes((self.p/'silent.mp4').read_bytes());(folder/'02.mp4').write_bytes((self.p/'silent.mp4').read_bytes())
  r=self.call('-Command','Concat','-Output',self.p/'joined.mp4');self.assertEqual(r.returncode,0,r.stderr);self.assertAlmostEqual(float(probe(self.p/'joined.mp4')['format']['duration']),6,delta=.1)
if __name__=='__main__':unittest.main()
