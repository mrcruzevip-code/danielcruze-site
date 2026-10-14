# Daniel Cruze Video Studio — Windows toolkit

Requires PowerShell (7 recommended), FFmpeg and ffprobe. Extract the ZIP and run `./video-studio.ps1` for the menu.

```powershell
./video-studio.ps1 -Command RepurposeAudiobook -Input 'C:\Recordings' -Project 'C:\VideoProjects\DanielCruze' -ReelSeconds 35
./video-studio.ps1 -Command Resize -Input 'C:\Videos\clip.mp4' -Preset vertical1080
./video-studio.ps1 -Command AudioBook -Input 'C:\Chapters' -Output 'C:\Books\book.m4b'
./video-studio.ps1 -Command Subtitles -Input 'C:\Videos\clip.mp4' -SubtitleFile 'C:\Videos\clip.srt'
```

Commands: Init, Info, Trim, Concat, Resize, Audio, AudioBook, TtsPrompt, RepurposeAudiobook, Subtitles, Watermark, Export, CreateFromImages.

- Trim uses absolute Start and End timestamps.
- Outputs are protected unless `-Force` is supplied. Input and output must be different.
- Reels end at the earlier of the requested limit or actual audio duration. Each recording produces one opening excerpt, without automatic highlight selection.
- Resize preserves the frame with padding. Reel backgrounds are cropped to fill portrait format.
- Join videos with matching dimensions/frame rates. Audiobook assembly concatenates tracks alphabetically and normalises loudness, without chapter-index metadata.
- Subtitles needs an existing SRT. TtsPrompt writes a text prompt, not generated speech.
- Supplied voice/language catalogues are planning references. Their provider availability and empirical rates have not been independently validated.
- Browser export uses MP4 where supported, WebM otherwise; the Windows toolkit provides H.264/AAC MP4 production.

Eight real-media regression tests passed using PowerShell 7.4.6 and FFmpeg on Linux. Windows desktop testing remains outstanding. Run `python tests/test_studio.py`; set STUDIO_PWSH if needed.
