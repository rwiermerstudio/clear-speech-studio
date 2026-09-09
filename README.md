# Clear Speech Studio

**[Open the app →](https://rwiermerstudio.github.io/clear-speech-studio/)** · [Source](https://github.com/rwiermerstudio/clear-speech-studio)

A privacy-first German/English practice desk for clearer, more intentional speech. **Not diagnosis or treatment; no automatic pronunciation or omitted-syllable score.**

## Deutsch

Wähle Schwerpunkt, Stufe, Alltagssituation und Tagesziel unter **Plan anpassen**. Übe kurz und bequem: ankommen → eine Fähigkeit → eine Variation. Es gibt **72 eigenständige Übungen pro Sprache** (18 je Schwerpunkt, 6 je Stufe), zusätzlich eine Einstiegsübung und eine feste Vergleichsprobe. Mit **Vergleichsprobe** speicherst du zuerst eine Startprobe und später Wiederholungsproben desselben Texts.

Du kannst einen Timer verwenden, eine Dauer eintragen oder freiwillig das Mikrofon einschalten. Pegel und stille Abschnitte werden lokal angezeigt; Aufnahmen kannst du anhören und herunterladen. Zähle tatsächlich gesprochene Wörter für eine Tempo-Schätzung. Bewerte Verständlichkeit und Anstrengung selbst. Der Fortschritt bleibt in diesem Browser; JSON-Export und Löschen findest du unter **Fortschritt**. Heruntergeladene Dateien werden nicht mitgelöscht.

Bei plötzlich neuer/veränderter Sprache sofort den örtlichen Notruf wählen (EU 112, UK 999). Bei anhaltenden Schwierigkeiten ärztlichen/logopädischen Rat suchen. Bei Schmerz, Heiserkeit, Schwindel oder Anstrengung stoppen. Nicht schreien oder mit Kraft üben.

## English

Choose focus, level, context and daily goal in **Personalize plan**. Practice comfortably: arrive → one skill → variation. There are **72 original exercises per language** (18 per focus, 6 per level) plus a warm-up and fixed comparison passage. **Comparison sample** preserves your first baseline; later samples become retests of the same passage.

Use the timer, enter a duration, or choose the microphone. Live level and quiet intervals are local acoustic cues; listen to or download the recording. Count words actually spoken for a pace estimate. Rate understandability and effort yourself. Progress remains in this browser; **Progress** offers JSON export and deletion. Downloads are not deleted remotely.

Suddenly new/changed speech needs immediate local emergency help (EU 112, UK 999). Seek medical/SLP advice for persistent difficulties. Stop for pain, hoarseness, dizziness or strain. Do not shout or push.

## Features and honest boundaries

- Four focuses × three levels × six exercises = **72 per language, 144 total**, excluding warm-ups and fixed baselines. Articulation/contrasts/stress; syllables/longer words; pacing/chunking/conversation; and a dedicated S-sound pathway from isolation and syllables through words, contrasts, clusters, sentences and real situations. These are authored prompts with individual instructions, not generated word permutations.
- **S-Laut: Tipps / S sound: tips** opens bilingual optional placement/airflow/voicing cues, German vs English spelling-to-sound examples, linked clinical/phonetic sources and limitations. Its start button selects S focus at level 1. No automatic articulation score or built-in model audio.
- Select any exercise at your chosen level directly, or cycle all six with **Andere Übung / Try another**. Rail titles follow the actual variants. Speak → rest → optionally listen → repeat prompts encourage comfortable repeats, not speed. Sound/syllable exercises disable the text-count helper and recommend leaving word count blank.
- Fully bilingual authored UI, language-specific exercises, independent language histories, editable context and daily goal. Native browser audio/validation controls follow the browser locale.
- Suggest next level after three matching practice attempts self-rated ≥4 understandability and ≤2 effort. No clinical rule; free manual level choice. Warm-up and baseline do not qualify.
- Fixed baseline/retest comparison, attempt table, practice days and non-punitive badges. Pace is manual words / full duration ×60, not a clarity score.
- Microphone permission only on click; Web Audio, MediaRecorder and blob playback/download. Stops on navigation, hidden tab or two-minute limit. No audio persistence in localStorage.
- No recognition, third-party scripts, trackers, external fonts, analytics or server API. No runtime network calls (`connect-src 'none'`). Normal GitHub Pages load requests still reveal standard connection metadata to the host.
- Settings/notes/metrics in this browser’s localStorage (max latest 2,000 attempts; table latest 50). Other users of that browser profile may access them. Export may contain sensitive notes. Storage failure is surfaced. No cloud sync, import or guaranteed offline install.

## Run and verify

Node 22+, Python 3; no runtime npm dependencies.

```sh
npm ci
npx playwright install --with-deps chromium
npm run verify
npm start
# http://127.0.0.1:4173
```

`npm test`: Node unit tests. `npm run build`: exact allowlisted static copies into `dist/`. `npm run test:e2e`: actual Chromium automation on desktop and Pixel 7 viewport emulation. `make verify` is an alias for all three. GitHub Actions tests before deploying `dist/` with official Pages actions.

For the actual deployed site:

```sh
BASE_URL=https://rwiermerstudio.github.io/clear-speech-studio/ npm run test:e2e
```

See [test coverage/limitations](docs/TESTING.md), [source-to-method evidence](docs/SOURCES.md), and [committed implementation plan](docs/plans/implementation-plan.md).

## Saved-data compatibility

The `clear-speech-studio:v1` key and version remain unchanged. All original exercise indexes/IDs, texts and fixed baseline passages are preserved; appended curriculum rows use explicit level maps rather than reindexing old data. Existing history, notes, preferences and exports remain readable. The three-focus exploration badge remains available (renamed to describe three focuses rather than all four). No reset or migration is required.

## Compatibility and limitations

Modern JavaScript and secure context (HTTPS or localhost) required for microphone access. Permission denial/absence supports manual use. Recording format depends on the browser. If MediaRecorder is unavailable, level/timer remain usable. Automatic recognition is deliberately absent. Physical microphones, real phones, Safari/Firefox and assistive-technology user testing must not be inferred from Chromium/emulated/synthetic tests. Clinical effectiveness has not been evaluated.

MIT-licensed original implementation and exercise text. Sources linked for evidence, not endorsement.
