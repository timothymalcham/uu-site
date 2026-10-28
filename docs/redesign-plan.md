# Site redesign plan

## Direction (decided)

| Area   | Decision |
| ------ | -------- |
| Scope  | Single page: hero + contact footer. The selected-work grid is removed for now and comes back with new projects |
| Layout | Editorial Swiss grid: 12 columns, hard alignment, oversized display type breaking the grid, small labels in corners |
| Type   | **Bluu Next** for display (hero, section titles, email). **Schibsted Grotesk** for everything else; Geist Mono is dropped |
| Color  | Ink `#151311` on paper `#F2EEE6`; accent `#FF3C52` (50/50 blend of vermilion and hot pink) |
| Modes  | Light/dark follows the system by default; a Light / Dark toggle in the header overrides it and is remembered |
| Copy   | Project copy comes with the new work |

### Accent contrast

`#FF3C52` is about 3.0:1 on paper and 5.3:1 on ink. On the light ground it is only
used for large type, rules, underlines and selection, never small text.

### How light/dark works

- Tokens live in `src/styles/global.css` as `--paper`, `--ink`, `--accent`, exposed to
  Tailwind as `bg-paper`, `text-ink`, `text-accent`, etc. Swap colors there, not with `dark:`.
- With no saved choice, `prefers-color-scheme` decides.
- Picking a scheme that differs from the system sets `data-theme` on `<html>` and stores it
  in `localStorage["uu-color-scheme"]`. Picking the system's own scheme clears the override.
- An inline script in `Layout.astro`'s `<head>` applies the saved choice before first paint.

## Steps

- [x] Strip video background and theme switcher
- [x] Pick accent hue from swatch page
- [x] Design tokens in `global.css`; unused shadcn vars and `.dark` block removed
- [x] Swap Geist Mono for Schibsted Grotesk
- [x] Light/dark tokens, system default, header toggle with no-flash script
- [x] Hero rebuilt on the 12-col grid
- [x] Work grid with Astro `<Image>` (responsive WebP)
- [x] Footer with copy-email button
- [x] Responsive pass (375 / 820 / 1440)
- [x] Data-request page moved onto the new tokens
- [x] Remove unused 3D deps, the React integration, shadcn scaffolding and unused assets
- [x] Remove the selected-work grid until new projects are ready
- [ ] Add the new work (grid layout and `<Image>` usage are in commit 6394fe9)

## Open questions

- When the new work goes in: should projects link anywhere (live site, store page), or stay image + caption only?
