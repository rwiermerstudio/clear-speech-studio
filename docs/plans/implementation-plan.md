# Implementation plan and acceptance contract

## Product and safety
- Standalone public static German/English adult practice studio. No diagnosis, no promised cure, no invented clarity score.
- Read ASHA and NHS clinical guidance; map each practice strategy to a source, separate evidence-informed methods from unvalidated product decisions.
- Local microphone levels, quiet-interval cues, recording and playback. Manual timer/count path works without hardware or permission. Deliberately omit browser speech recognition: no provider transmission or consent ambiguity.
- Explain urgent sudden speech changes, professional advice for persistent difficulties, stop for strain.

## Experience
- Operate surface: warm-paper practice desk, pine controls, generous serif speech text, daily-plan rail; no dashboard marketing tiles.
- Independent language-specific contrast, syllable, pacing, stress and functional-transfer material. Three editable levels, three focuses, daily attempt goal, everyday setting and optional pace reference.
- Warm-up, focused skill, variation; repeated comfortable self-ratings suggest progression but never lock content or silently alter level.
- Fixed per-language original baseline passage; preserve first baseline, label subsequent attempts retests. Compare matching languages, warn about familiarity and subjective ratings.
- Local progress, notes, JSON export, recording download, full local reset, no streak penalties.

## Engineering and release
1. Test metric validity then implement; test progression/acoustic fixtures then implement.
2. Test manual browser path then build UI. Test microphone fixtures then add local recorder.
3. Browser-test desktop and emulated mobile, both languages, all views, export/reset, baseline and settings; axe and console/network checks. Inspect screenshots.
4. Build allowlisted static files with relative assets; use a restrictive no-network CSP. Commit sources, this plan, limitations, tests and reproducible commands.
5. Create new public rwiermerstudio/clear-speech-studio; verify rwiermer admin. Enable Actions Pages, push and watch CI. Verify actual deployed URL/assets and interactions.

## Explicit boundaries
No children/subagents; no changes to other repositories or Hermes runtime. No physical-user microphone test is implied by synthetic oscillator fixtures. No clinical efficacy trial, speech-language professional review, device-wide deletion, cross-device sync, or automatic syllable assessment is claimed.
