# Daniel Cruze — Independent Video Studio

A self-owned 1080 × 1920 vertical video workflow, built around original portraits, uploaded recorded speech, editable HTML and local FFmpeg. **No HeyGen account, API key, voice synthesis, watermarks or subscription is required to run the local render.**

## Usage

Prepare local files (never commit them by default):

```
tools/independent-video/assets/portrait.jpg
tools/independent-video/assets/voice.m4a
tools/independent-video/assets/captions_DRAFT.srt
```

From `tools/independent-video` with Python 3.10+ and local FFmpeg installed:

```sh
python3 scripts/render.py --project . --output output/review.mp4
python3 -m http.server 8000
```

Visit `http://localhost:8000/index.html` for the HTML composition. Modify `scene.json`, replace original assets, and repeat the render. This composition uses HyperFrames-compatible data attributes; to use the native engine, install `hyperframes` locally under its open-source license and run `npx hyperframes check` then `npx hyperframes preview` (render only after reviewing the preview). FFmpeg is the independent fallback and outputs a separate implementation of the visual layout.

## Scope and boundaries

- Original portrait stays a still photograph with gentle camera movement, **not lip-sync**. Accurate talking-face animation is a separate model-driven task.
- The voice recording is retained verbatim; no synthetic narration.
- A draft SRT may be burned for internal review. Correct transcription and timing before public posting.
- Don't remove or obscure HeyGen's watermark from an existing HeyGen render. Instead render new source-based video with no HeyGen branding.
- Never put expiring signed HeyGen URLs, private audio, tokens or model weights into this repository.
- This folder does **not** change the website's Expo deploy pipeline. Main-domain, Cloudflare and Shopify routes are outside scope.
- No automatic publishing, payment action or Telegram bot integration.

## Sources and rights

This pipeline copies *concepts and user-owned data*, not HeyGen proprietary models or source code. HyperFrames is an open-source project by HeyGen distributed under Apache 2.0; check its license when installing. `assets/`, `output/` stay local/private and are ignored by git.

Production manifest `scene.json` is editable for every Reel; video duration follows the actual uploaded audio, not a fabricated script duration. Test caption legibility and audio alignment before owner approval.
