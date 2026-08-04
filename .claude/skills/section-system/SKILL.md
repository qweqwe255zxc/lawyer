---
name: section-system
description: Full reference for how sections work in this template — per-section props, every variant and when to use it, which fields each variant reads, dev-warn behaviors, and the algorithm for adding a new variant. Load before adding, editing, or auditing any section type (Hero, Stats, Features, Steps, Gallery, Testimonials, Team, About, FAQ, Pricing, CTA, ContactForm, Header, Footer) or its variants.
---

Read `docs/section-system.md` in full before touching any section component, its `variant` prop, or `SectionRenderer.tsx`. It documents things that aren't obvious from a quick read of one component file: which optional fields each variant actually reads vs. ignores, dev-warn fallback behavior (e.g. `split` hero silently reverting to `type-only`), removed/merged variants and why, and the required steps for adding a new variant (type union → registry → preset default). Treat it as the source of truth over assumptions from the code alone — where it disagrees with the code, the code wins and the doc should be corrected.
