---
name: presets
description: How the preset tiers (econom/standard) control visual depth — shadows, radii, card surfaces, and default section variants — via theme.preset and theme/tokens.css. Load before setting or changing theme.preset, editing depth-related tokens, or diagnosing why a "standard"-tier page looks flat instead of using cards/shadows.
---

Read `docs/presets.md` in full before changing `theme.preset`, editing any `--card-*`/`--elevation-*`/`--radius-*` token in `theme/tokens.css`, or investigating why a page looks flatter than its tier should. It covers the preset build checklist, the token table per tier, why "standard" used to render flat (and how not to reintroduce that), and a full example config. Never hardcode shadow/radius/color values in a component — depth comes from the preset tokens, not the component.
