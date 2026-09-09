# Verification and limitations

## Reproduce

```sh
npm ci
npx playwright install --with-deps chromium
npm run verify
# Production subpath, after deployment:
BASE_URL=https://rwiermerstudio.github.io/clear-speech-studio/ npm run test:e2e
```

Initial complete local release verification: **3 Node tests + 18 Chromium browser tests passed**. Desktop Chromium and Pixel 7 viewport/touch emulation run the same nine cases each. All 18 are actual browser execution; mobile emulation is not a physical phone test. See Actions for the exact commit's repeatable run. Browser HTML reports and failure traces are generated locally in ignored `playwright-report/` and `test-results/`.

## Covered

- Manual WPM arithmetic and invalid numeric samples; Unicode word helper.
- Three matching comfortable practice attempts suggest the next level; other language/effort/baseline do not qualify.
- Synthetic waveform RMS classification: quiet, signal and clipping.
- Distinct daily preparation/skill/variation; bilingual switching and persisted settings.
- Every focus × level × variation in both languages exercised through controls.
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
