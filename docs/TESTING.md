# Verification and limitations

## Reproduce

```sh
npm ci
npx playwright install --with-deps chromium
npm run verify
# Production subpath, after deployment:
BASE_URL=https://rwiermerstudio.github.io/clear-speech-studio/ npm run test:e2e
```

The expanded release suite contains **5 Node tests + 24 Chromium browser tests** (12 cases each on desktop and Pixel 7 viewport/touch emulation). Mobile emulation is not a physical phone test. See Actions for the exact commit's repeatable result. Browser HTML reports, S-guide screenshots in both languages and failure traces are generated locally in ignored `playwright-report/` and `test-results/`; CI preserves them in `browser-verification` for 14 days. The separate `github-pages` artifact contains the exact deployed static build.

## Covered

- Manual WPM arithmetic and invalid numeric samples; Unicode word helper.
- Three matching comfortable practice attempts suggest the next level; other language/effort/baseline do not qualify.
- Synthetic waveform RMS classification: quiet, signal and clipping.
- Distinct daily preparation/skill/variation; bilingual switching and persisted settings.
- Programmatic count and normalized prompt/title dedupe: exactly **72 entries per language**, four focuses × 18, each explicit level map containing six unique entries. Every ID is mapped once; legacy IDs retain their level. UI language key sets agree.
- Every focus × level × all six variants in both languages traversed through UI, checking title, instruction and prompt against authored data: 144 exercises on each viewport. Direct selector and variant wraparound checked; active rail matches selected exercise.
- Dedicated bilingual S guide: safe near-teeth/tongue cues, /s/ /z/ /ʃ/ /ts/ map, four source links, axe, narrow layout, shortcut into first S exercise, disabled word helper for sound-only practice, saved S preference across reload.
- Seeded v1 preferences/history survive unchanged and old exercise IDs still display their original titles. Existing baseline/retest test checks fixed passages and language separation.
- Baseline first, subsequent retest, exact same passage, side-by-side comparison, separate language history.
- Manual save/reload, actual JSON download parsed to verify saved metric and provenance, delete readback.
- Denied microphone → timer fallback; blocked localStorage → warning and in-memory progress.
- Delayed permission resolved after navigation → stopped tracks, no lingering recording.
- Real Web Audio oscillator/silence fixture passed through actual AnalyserNode and MediaRecorder; real blob created, playback time advances, tracks stopped. **getUserMedia is substituted with a synthetic stream; no user speech is recorded.**
- Axe automated accessibility on both languages and all main views, keyboard focus presence, duplicate IDs, narrow viewport overflow, console/page errors and no cross-origin app requests during tested flows.
- Production build copies exact allowlisted files; relative paths and restrictive no-network CSP.
- Desktop/mobile full-page screenshots inspected for composition, clipping and control legibility. Original operate/practice-desk composition; no stock images or remote fonts. Design self-audit: no gradient, feature tiles, accent rails, blur, fake stats, icon toppers, center stack or wrong-surface composition; deliberate Georgia/Trebuchet pairing.

An expanded mobile axe check found an unfocusable horizontal progress-table region; adding a labelled focusable region fixed it. The network test initially counted its own initial navigation against `about:blank`; comparison now uses the configured site origin. Final verification reran after these fixes.

## Not established by this release

- A physical microphone, real speech/voice acoustics, actual user permission-dialog UX, real Android/iOS device, Safari or Firefox compatibility.
- Clinical effectiveness, a validated dosage or progression algorithm, objective understandability, missing-syllable detection, or calibrated loudness.
- Screen-reader user study or manual contrast check of every possible native browser control state. Automated axe is not complete accessibility certification.
- Reliable offline installation, cloud sync, audio retention across reloads, or deletion of exported/downloaded files.

## Physical microphone acceptance checklist (for a user, not claimed executed)

On HTTPS, choose Record with microphone and allow permission. Speak comfortably, pause, and check that the meter responds without asking you to shout. Finish; confirm the OS/browser mic indicator stops, listen back, and download if desired. Switch views during a second recording; verify the mic stops. Deny permission in another attempt; verify manual practice remains possible. Never record others without consent; stop for strain.
