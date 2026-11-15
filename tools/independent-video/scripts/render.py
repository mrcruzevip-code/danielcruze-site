#!/usr/bin/env python3
"""Portable local FFmpeg render. Uses original photograph + original audio; no lip-sync."""
import argparse
import json
import shutil
import subprocess
import textwrap
from pathlib import Path

def quote(s):
    return str(s).replace("\\", "\\\\").replace(":", "\\:").replace("'", "\\'").replace(",", "\\,")

def run(cmd, cwd=None):
    return subprocess.run(cmd, text=True, check=True, cwd=cwd, capture_output=True)

def duration(path):
    return float(run(["ffprobe", "-v","error","-show_entries","format=duration",
                      "-of","default=noprint_wrappers=1:nokey=1",str(path)]).stdout.strip())

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--project",default=".")
    p.add_argument("--output",default="output/review.mp4")
    p.add_argument("--no-captions",action="store_true")
    p.add_argument("--dry-run",action="store_true")
    args=p.parse_args()
    base=Path(args.project).resolve()
    cfg=json.loads((base/"scene.json").read_text())
    for tool in ("ffmpeg","ffprobe"):
        if not shutil.which(tool): raise RuntimeError("Missing required local tool: "+tool)
    assets=cfg["assets"]
    photo=base/assets["portrait"]; voice=base/assets["voice"]
    for f in (photo,voice):
        if not f.is_file(): raise FileNotFoundError(f)
    has_captions=not args.no_captions and (base/assets["captions"]).is_file()
    bg=cfg["palette"]["background"].replace("#","0x")
    accent=cfg["palette"]["accent"].replace("#","0x")
    series=quote(cfg["series"].replace("'",""))
    footer=quote(cfg["byline"]+"  |  "+cfg["url"].upper())
    title=textwrap.wrap(cfg["title"].upper(),width=18,break_long_words=False)[:2]
    filters=[
      "scale=1080:1440:force_original_aspect_ratio=decrease:flags=lanczos",
      f"pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color={bg}",
      "zoompan=z='min(zoom+0.000025,1.023)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=24",
      "format=yuv420p",
      "drawbox=x=0:y=1390:w=1080:h=530:color=0x111214@0.85:t=fill",
      f"drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='{series}':fontsize=37:fontcolor={accent}:x=(w-text_w)/2:y=98"
    ]
    for i,line in enumerate(title):
        filters.append(f"drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='{quote(line)}':fontsize=66:fontcolor=white:x=(w-text_w)/2:y={1440+i*85}:enable='between(t,0,5.3)'")
    filters.append(f"drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text='{footer}':fontsize=31:fontcolor={accent}:x=(w-text_w)/2:y=1820")
    if has_captions:
        filters.append("subtitles=filename=assets/captions_DRAFT.srt:force_style='FontName=DejaVu Sans,FontSize=8,Bold=1,Alignment=2,MarginV=40,Outline=0.8,Shadow=0'")
    output=Path(args.output);output=output if output.is_absolute() else base/output
    output.parent.mkdir(parents=True,exist_ok=True)
    cmd=["ffmpeg","-y","-hide_banner","-loglevel","error","-loop","1","-framerate","24","-i",str(photo),"-i",str(voice),"-vf",",".join(filters),"-t",str(duration(voice)),"-map","0:v:0","-map","1:a:0","-c:v","libx264","-preset","ultrafast","-crf","23","-pix_fmt","yuv420p","-r","24","-c:a","aac","-b:a","160k","-movflags","+faststart","-shortest",str(output)]
    if args.dry_run: print("Validated FFmpeg inputs:",photo.name,voice.name);return
    subprocess.run(cmd,cwd=base,check=True)
    print("Local MP4 rendered:",output,"duration_s:",duration(output))
    if has_captions: print("WARNING: draft subtitles not independently verified")

if __name__=="__main__": main()
