# Animation Polish — Design

**Date:** 2026-07-16
**Status:** Approved for planning
**Source:** `find-animation-opportunities` skill review (2026-07-16)

## Overview & Goals

The animation review identified three high-conviction, low-risk gaps in an otherwise well-restrained interface:

1. The experience-timeline "show more/less" disclosure teleports open/closed with no transition.
2. The Resume download button has no press feedback.
3. The theme toggle button has no press feedback (its inner icon crossfade is already handled well via `framer-motion`).

This spec covers implementing all three. No new dependencies are introduced. No component logic, data flow, or accessibility wiring changes — only className additions and one new pair of CSS utility classes, consistent with the codebase's existing precedent for custom motion (`.animate-fade-in` in `src/app/globals.css`'s `@layer utilities`).

## Per-Animation Design

### A. ExperienceTimeline disclosure

**File:** `src/components/ExperienceTimeline.tsx`, `PositionEntry` component (currently lines 19–66).

- Replace the `hidden={!isOpen}` attribute on the details `<ul>` with a wrapper `<div>` whose className toggles between `details-collapse` and `details-collapse is-open`, following the existing ternary-className pattern already used in this file (e.g. line 87).
- Add to `src/app/globals.css` inside the existing `@layer utilities` block:

```css
.details-collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms ease-out;
}

.details-collapse.is-open {
  grid-template-rows: 1fr;
}

.details-collapse > ul {
  overflow: hidden;
  min-height: 0;
}

@media (prefers-reduced-motion: reduce) {
  .details-collapse {
    transition-duration: 60ms;
  }
}
```

- `aria-expanded` / `aria-controls` wiring on the toggle button is unchanged.
- Purpose: preventing a jarring change / state indication. Frequency: occasional. Duration: 200ms, matching the "dropdowns/selects" budget tier — the closest analog for a disclosure.

### B. Resume download button

**File:** `src/components/ProfileHeader.tsx`, download anchor (currently lines 25–31).

- Add Tailwind utility classes to the existing className string:
  `active:scale-[0.97] transition-transform duration-150 motion-reduce:duration-75`
- No CSS file changes. Coexists with the existing `transition-colors hover:bg-blue-500`.

### C. Theme toggle button

**File:** `src/components/ThemeToggle.tsx`, outer `<button>` (currently lines 22–27).

- Add Tailwind utility classes to the existing className string:
  `active:scale-[0.96] transition-transform duration-150 motion-reduce:duration-75`
- Applies to the outer button shell only; does not touch the inner `AnimatePresence` icon crossfade (`framer-motion`), which continues to handle the sun/moon swap independently. Different elements, no conflict.

Both B and C use Tailwind's `motion-reduce:` variant to shorten (not remove) the transition duration under `prefers-reduced-motion: reduce`, consistent with A's approach — no custom CSS needed since Tailwind ships this variant.

## Rejected / Out of Scope

Per the source review, the following were considered and explicitly rejected — not part of this spec:

- DockNav tab-switch motion — already well handled (spring `layoutId` pill + fade-in panel).
- SkillsSection "Core Stack" grid stagger-in — delight-tier motion on a repeatedly-visited, information-dense tab; fails both frequency and function gates.
- ExperienceTimeline/ProjectsSection card-list stagger-in on tab switch — same reasoning.
- ProjectCard hover state — already animated via `transition-colors`; no gap.

## Verification

No test suite exists in this repo. Verification is manual:

1. `npm run dev` — expand/collapse a position's details in both light and dark mode; confirm smooth grow/shrink with no layout shift in the surrounding card.
2. Emulate `prefers-reduced-motion: reduce` (Chrome DevTools rendering tab, or OS setting) and confirm all three animations shorten rather than vanish or stay unchanged.
3. Click the Resume download button and theme toggle; confirm visible press feedback that doesn't fight the theme toggle's icon crossfade.
4. `npm run lint` and `npm run build` as the existing regression gates.

No animation-specific test framework is added — three small CSS/utility changes don't warrant one.
