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

### Phase 2 — Modal & screen polish ✅

- [x] `inc-modal.scss`:
  - Modal title bar: dot-pattern background + brand border + blur backdrop.
  - Close / clear / delete buttons: brand hover glow + cyan focus ring.
  - Tab bar: active tab gets 2px cyan underline; hover gets brand border.
  - Inputs, selects, textareas: cyan focus-visible ring via `box-shadow`.
  - Wide buttons / file-input-labels: brand inset shadow + hover glow.
  - Cards & list items (`ul.open-list li`, `#share-screen li`): brand border + hover glow.
  - Thumbnails: brand border + hover glow.
  - Tags: brand border on hover.
  - Image previews, embed preview, code blocks, QR code, login access,
    prompt panels, custom editors: brand-tinted 1px borders.
  - `.span.code` font switched to `--font-mono`.
- [x] Light-mode parity: all changes use `--brand-*` tokens which have light overrides in
      `inc-light.scss`; no extra modal-specific light overrides needed.
- [x] Switches / sliders: the "on" color derives from user `themeColor` (`--input-switch-active:
      var(--color90)`). This preserves user theming; default `--hue: 214` gives a blue close to
      brand cyan.
- [ ] Spot-check of individual screens: deferred to QA pass / visual regression.

### Phase 3 — Edge surfaces ✅

- [x] Result-mode drawer (`app.scss`): removed hardcoded light grays; now uses brand tokens
      (`--brand-bg-elevated-2`, `--brand-text`, `--brand-muted`, `--brand-border`) with
      larger `--rs-lg` radius and cyan focus ring on close button.
- [x] RTL: `inc-rtl.scss` only mirrors directional properties; brand tokens are
      direction-agnostic — no changes needed.
- [x] Docs site (`docs/src/css/custom.css`):
  - `--ifm-color-primary` shifted from teal `#25c2a0` to brand cyan `#0090cc` (light)
    and `#00c8ff` (dark).
  - Dark mode highlighted code lines use cyan-tinted background.
  - `.status-link` dot changed from green `#20bf6b` to brand live red `#ff4d4d` with glow.
- [x] Docs homepage (`HomepageFeatures.tsx` + `.module.css`):
  - Embedded playground glow switched from generic `--ifm-color-secondary-darkest` to
    brand cyan `rgba(0, 200, 255, 0.35)`.
  - Code sample color changed from `dodgerblue` to `#00c8ff`.
  - `.steps` and `.border` borders: brand-tinted cyan instead of `grey`.
  - `.rowDark` in dark mode: background set to brand elevated `#0d1825`.
- [x] Storybook (`storybook/*/.storybook/manager.ts`): all 6 framework variants updated
      with `colorPrimary: '#00c8ff'`, `colorSecondary: '#00e5c8'`, `brandImage`.
- [ ] Share social card image / code-to-image watermark: already uses new SVG asset.

### Phase 3 — Edge surfaces

- [ ] `result-mode-drawer` (in-result top strip) — currently has bespoke colors; refresh to
      match brand on light bg.
- [ ] `code-to-image` watermark/logo (`src/livecodes/UI/code-to-image.ts`) — already uses new SVG.
- [ ] `share` social card image (`src/livecodes/UI/share.ts`) — already uses new SVG.
- [ ] RTL spot-checks (`inc-rtl.scss`) — no logical changes expected, but verify mirrored
      menus, drawer, modal close button.

### Phase 4 — Outside the app shell ✅

- [x] Docs site (Docusaurus): `custom.css` primary palette shifted to brand cyan; status dot
      changed to live red.
- [x] Storybook theme: all 6 framework storybooks now use brand cyan primary + teal secondary.
- [ ] README and marketing assets (`livecodes-text-logo*`): out of scope for code rebrand;
      requires graphic design work.

### Phase 5 — Raster regeneration (remaining)

- [ ] `favicon-{16,32,96}.png`, `apple-touch-icon.png`, `android-chrome-{192,512}.png`,
      `web-app-manifest-{192,512}.png`, `livecodes-og.png`, `open-graph.png` regenerated from
      the new SVG (manual, with realfavicongenerator or a node script).
- [ ] `safari-pinned-tab.svg` color updated to match brand cyan.
- [ ] `msapplication-TileColor` in `src/index.html` and `src/404.html` updated.

## Backwards compatibility

- Toolbar height, modal max-height/max-width, button height, editor heights — **unchanged**.
- Public CSS class names — unchanged.
- All custom theme colors continue to work; the rebrand is layered on top.

## Out of scope for this pass

- Layout restructuring (toolbar, panel grid).
- New components or interactions.
- Component library extraction.
