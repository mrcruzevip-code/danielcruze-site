# HeyGen → Independent Video handoff (26 October 2026)

## Confirmed from connected workspace
- HeyGen account was on Free subscription at the time of audit.
- Portrait asset: `7a48478b0f4440c685983108bb2b420f` (`14750.jpg`). A matching user-uploaded original is also staged locally, so source media does not require an expiring vendor URL.
- Original recording staged locally: `01_Presence_Original_Source_Audio.m4a` (44.202 seconds).
- Enhanced Discipline audio asset exists: `6099b6b0ef04461ebaa19c151d18bfa2`. Not in current review reel.
- Completed earlier avatar videos (separate from the new portrait attempts):
  - D02 The Ego: https://app.heygen.com/videos/77f42be419b46e427f2a2e6787b7e76a
  - D03 What Used to Work: https://app.heygen.com/videos/0192505e046192a79f79299dfa851a34
  - D04 The Collapse: https://app.heygen.com/videos/207b6d6d4668563bfd690969b0f1f2c6
- Nine new uploaded-portrait generations failed with the Avatar IV monthly duration-limit error.

## What is safe to migrate
Owner-provided portrait, recording, editorial script, corrected subtitle cues, approved scenes and manually downloaded authorised finished outputs. Respect their applicable license; no third-party watermark cropping/obscuring.

## What cannot migrate
HeyGen's proprietary weights, avatar motion/speech model, backend, billing entitlements, signed temporary URLs or secrets. A moving portrait with recorded audio **is not** true lip-sync.

## Open completion gates
1. Verify subtitles against original audio before public distribution.
2. Test every reusable render configuration and the GitHub Actions check.
3. Test native HyperFrames once locally installed. Current proven renderer is FFmpeg.
4. Separate project for an independently licensed lip-sync inference model; review explicit consent, GPU/hosting, data retention and quality.
5. Owner approval before merge/publication, website changes or bot wiring.
