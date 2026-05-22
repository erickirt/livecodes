# UI Rebrand Plan

> Companion document for the LiveCodes brand refresh based on the new icon
> (`src/livecodes/assets/images/livecodes-logo.svg`).
> Reference mockup: [`./new-logo.html`](./new-logo.html). Existing system: [`./ui-design-system.mdx`](./ui-design-system.mdx).

## Goals

1. Modern, clean, elegant aesthetic anchored to the new icon (deep navy + electric cyan + signal
   teal + live red).
2. Preserve the existing `--hue / --st / --lt` themeColor pipeline so users can still tint the UI.
3. Preserve existing layout dimensions to avoid breaking embeds.
4. Light + dark, LTR + RTL, all display modes (full/focus/simple/lite/editor/codeblock/result).
5. Self-host fonts (no external Google Fonts at runtime).

## Color strategy

Two layers of color tokens, in order of priority:

1. **Brand tokens (new, fixed):** independent of user themeColor.
   - `--brand-bg-deep: #080d16` — page void
   - `--brand-bg-elevated: #0d1825` — surface
   - `--brand-bg-elevated-2: #111b2c` — raised surface
   - `--brand-border: rgba(255, 255, 255, 0.06)`
   - `--brand-border-hi: rgba(0, 200, 255, 0.18)`
   - `--brand-cyan: #00c8ff` — primary accent (default themeColor maps near this)
   - `--brand-teal: #00e5c8` — secondary accent / success
   - `--brand-live: #ff4d4d` — live indicator / record state
   - `--brand-text: #dde6f0`
   - `--brand-muted: #556070`
   - `--brand-dim: #2e3a4a`
   - `--brand-glow-cyan: 0 0 24px rgba(0, 200, 255, 0.18)`
   - `--brand-glow-cyan-soft: 0 0 12px rgba(0, 200, 255, 0.10)`

2. **Theme tokens (existing, derive from `--hue/--st/--lt`):** primary buttons, focus rings,
   active states, links keep responding to user themeColor. The default `--hue: 214` already
   produces a blue close to the brand cyan.

The light-theme variant (`inc-light.scss`) gets the same brand-token shape but with light values.

## Typography

- **UI:** DM Sans (300, 400, 500, 600) — softer humanist geometric sans
- **Mono / labels / file chrome:** JetBrains Mono (400, 500, 700)
- Both via `@fontsource` (already used for several mono fonts in `vendors.ts`).
- Fallbacks: `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` and
  `'JetBrains Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace`.
- Font sizes/scale unchanged (existing `--s*` units).

## Surfaces & motifs

- **Dot pattern background:** subtle `radial dots` on body + `#toolbar` + modal headers (the same
  motif as the icon). Implemented as a CSS gradient (no extra asset).
- **Cyan halo on focus / active:** `box-shadow: var(--brand-glow-cyan)`.
- **Border-radius:** lift `--rs` from `4px` to `6px` for buttons/menus and keep modal corners at
  `12px` (matching the icon's `rx=80/512 ≈ 16%`).
- **Borders:** thin (1px) with low-alpha cyan tint instead of grayscale `--color30`.

## Phases

### Phase 1 — Foundation ✅

- [x] Logo asset (replaced in `assets/images/livecodes-logo.svg`,
      `livecodes-logo-transparent.svg`, `favicon.svg`).
- [x] Brand tokens layer added to `app.scss` (`--brand-*`) — dark theme.
- [x] Light-theme parity in `inc-light.scss` (`--brand-*` overrides).
- [x] Typography: `fontDMSansUrl` added to `vendors.ts`; DM Sans + JetBrains Mono loaded by
      `loadStyles()` in `core.ts`; body `font-family` switched to `--font-ui` (DM Sans →
      system-ui fallback). System fallbacks render first → no FOIT.
- [x] Toolbar refinements: dot pattern background, hairline brand-tinted divider, smooth
      hover transitions, cyan focus-visible ring.
- [x] Menu / dropdown refinements: cyan-soft glow on hover.
- [x] Button radius bump from `--rs` (`4px` → `6px`); added `--rs-lg` (`12px`) for cards/modals.
- [x] Modal chrome: brand border + 12px radius + deeper drop shadow + inset hairline.
- [x] Logo gains a subtle cyan drop-shadow on hover.
- [ ] Loading screen colors are already brand-aligned (`#080d16`, cyan, red dot) —
      no change needed.

### Phase 2 — Modal & screen polish (in progress)

- [ ] `inc-modal.scss`: rebrand modal title bar, close button, tab bar, dividers, code blocks,
      and primary CTA buttons used inside dialogs.
- [ ] Inputs / selects / textareas: brand-tinted borders, cyan focus ring.
- [ ] Switches / sliders: cyan accent for "on" state.
- [ ] Cards & list items used across screens (templates list, my projects, deploy targets,
      sync providers): brand border, hover lift with cyan glow.
- [ ] Tabbed screens: tab indicator → cyan underline.
- [ ] Light-mode parity for the above.
- [ ] Spot-check: welcome, templates, settings, share, import, deploy, embed,
      code-to-image, tests, project-info, sync, broadcast, custom-settings, restore,
      sponsor, about.

### Phase 3 — Edge surfaces

- [ ] `result-mode-drawer` (in-result top strip) — currently has bespoke colors; refresh to
      match brand on light bg.
- [ ] `code-to-image` watermark/logo (`src/livecodes/UI/code-to-image.ts`) — already uses new SVG.
- [ ] `share` social card image (`src/livecodes/UI/share.ts`) — already uses new SVG.
- [ ] RTL spot-checks (`inc-rtl.scss`) — no logical changes expected, but verify mirrored
      menus, drawer, modal close button.

### Phase 4 — Outside the app shell

- [ ] Docs site (Docusaurus): update `docusaurus.config.ts` colors + custom CSS.
- [ ] Storybook theme.
- [ ] README and marketing assets (`livecodes-text-logo*`).

### Phase 5 — Raster regeneration

- [ ] `favicon-{16,32,96}.png`, `apple-touch-icon.png`, `android-chrome-{192,512}.png`,
      `web-app-manifest-{192,512}.png`, `livecodes-og.png`, `open-graph.png` regenerated from
      the new SVG (manual, with realfavicongenerator or a node script).

## Backwards compatibility

- Toolbar height, modal max-height/max-width, button height, editor heights — **unchanged**.
- Public CSS class names — unchanged.
- All custom theme colors continue to work; the rebrand is layered on top.

## Out of scope for this pass

- Layout restructuring (toolbar, panel grid).
- New components or interactions.
- Component library extraction.
