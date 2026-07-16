# Animation Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close three motion gaps found by the animation-opportunities review: an instant-snap accordion disclosure, and missing press feedback on two buttons.

**Architecture:** Pure CSS/Tailwind additions to three existing files. No new components, no new dependencies, no changes to data flow or accessibility wiring.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS. No test runner is configured in this repo — verification is manual via `npm run dev`, plus the existing `npm run lint` / `npm run build` gates.

## Global Constraints

- No new npm dependencies.
- Styling stays Tailwind-utility-first; the one exception is extending `src/app/globals.css`'s existing `@layer utilities` block (matching its current `.animate-fade-in` precedent) — only for Task 1, which needs a CSS technique Tailwind has no utility for (`grid-template-rows` transition).
- `prefers-reduced-motion: reduce` must shorten (not remove) each animation: a `@media (prefers-reduced-motion: reduce)` block for Task 1's CSS, Tailwind's `motion-reduce:` variant for Tasks 2 and 3.
- Tasks 2 and 3 use the single `transition` Tailwind utility (not `transition-colors` stacked with `transition-transform`) — Tailwind's base `transition` utility's default property list already includes both `background-color` and `transform`, so one class animates both the existing hover color change and the new press scale. Stacking `transition-colors` + `transition-transform` would have two utilities fight over the same `transition-property` declaration, silently dropping one.
- No test framework is being added. Each task's "test" step is a manual check against a concrete, observable behavior — matching the approved spec's verification section.

---

### Task 1: ExperienceTimeline disclosure animation

**Files:**
- Modify: `src/app/globals.css` (append to the existing `@layer utilities` block, after the `@keyframes fade-in` rule at line 34)
- Modify: `src/components/ExperienceTimeline.tsx:40-64` (`PositionEntry`'s details block)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `.details-collapse` / `.details-collapse.is-open` CSS utility classes in `globals.css`, available repo-wide but only consumed here in this plan.

- [ ] **Step 1: Confirm baseline (broken) behavior**

Run `npm run dev`, open `http://localhost:3000`, go to the Experience tab, and click "Show more" on any position that has details (e.g. one with a non-empty `details` array in `content/experience.json`). Confirm the list snaps open instantly with no transition, and "Show less" snaps it closed instantly.

- [ ] **Step 2: Add the collapse utility classes**

In `src/app/globals.css`, add this block inside `@layer utilities`, immediately after the existing `@keyframes fade-in { ... }` rule (currently ending at line 34, before the layer's closing `}`):

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

- [ ] **Step 3: Wrap the details list and toggle the class**

In `src/components/ExperienceTimeline.tsx`, replace the `<ul id={detailsId} hidden={!isOpen} ...>` block (currently lines 51-61) with a wrapper `<div>` that carries the id and toggles `is-open`, and drop the `hidden` attribute entirely:

```tsx
          <div id={detailsId} className={`details-collapse${isOpen ? " is-open" : ""}`}>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-500 dark:text-gray-400">
              {position.details?.map((detail, index) => (
                <li key={index} className="break-words">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
```

The `aria-controls={detailsId}` on the "Show more/less" button (line 45) already points at this id — no change needed there.

- [ ] **Step 4: Verify the fix manually**

Run `npm run dev`, open the Experience tab, click "Show more" on a position with details. Confirm:
- The list grows open smoothly over ~200ms instead of snapping.
- "Show less" shrinks it smoothly the same way.
- No layout jump in the surrounding card (border/padding stay stable).
- Repeat with the theme toggle set to dark mode — no visual regression.

- [ ] **Step 5: Verify reduced motion**

In Chrome DevTools, open the Command Menu (Ctrl+Shift+P) → "Show Rendering" → set "Emulate CSS media feature prefers-reduced-motion" to "reduce". Repeat Step 4's click. Confirm the transition still happens but visibly faster (~60ms) rather than disappearing.

- [ ] **Step 6: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css src/components/ExperienceTimeline.tsx
git commit -m "feat: animate experience-timeline details disclosure"
```

---

### Task 2: Resume download button press feedback

**Files:**
- Modify: `src/components/ProfileHeader.tsx:25-31`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing consumed elsewhere in this plan.

- [ ] **Step 1: Confirm baseline (missing) behavior**

Run `npm run dev`, open the home page, press and hold the mouse button down on "Download Resume". Confirm only the background color changes on hover — there is no press/scale feedback.

- [ ] **Step 2: Add press feedback classes**

In `src/components/ProfileHeader.tsx`, update the anchor's className (currently `"rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"`):

```tsx
          <a
            href="/resume.pdf"
            download
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-[0.97] duration-150 motion-reduce:duration-75"
          >
            Download Resume
          </a>
```

Note `transition-colors` became `transition` (see Global Constraints) so the same utility covers both the existing hover color change and the new press scale.

- [ ] **Step 3: Verify manually**

Run `npm run dev`. Press and hold the button: confirm a subtle shrink (~3%) on press, release returns to normal size, and the hover color change still works. Confirm in both light and dark mode.

- [ ] **Step 4: Verify reduced motion**

With DevTools' `prefers-reduced-motion: reduce` emulation on (see Task 1 Step 5), inspect the anchor in the Elements panel → Computed tab while pressed, and confirm `transition-duration` reads `75ms` instead of `150ms`.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ProfileHeader.tsx
git commit -m "feat: add press feedback to resume download button"
```

---

### Task 3: Theme toggle button press feedback

**Files:**
- Modify: `src/components/ThemeToggle.tsx:22-27`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing consumed elsewhere in this plan.

- [ ] **Step 1: Confirm baseline (missing) behavior**

Run `npm run dev`, press and hold the theme toggle button (top-right). Confirm the inner sun/moon icon crossfade (already present via `framer-motion`) works, but the button shell itself has no press/scale feedback.

- [ ] **Step 2: Add press feedback classes**

In `src/components/ThemeToggle.tsx`, update the button's className (currently `"fixed right-4 top-4 z-30 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white/70 text-slate-600 backdrop-blur transition-colors hover:text-slate-900 dark:border-gray-800 dark:bg-gray-900/70 dark:text-gray-300 dark:hover:text-gray-50"`):

```tsx
      className="fixed right-4 top-4 z-30 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white/70 text-slate-600 backdrop-blur transition hover:text-slate-900 active:scale-[0.96] duration-150 motion-reduce:duration-75 dark:border-gray-800 dark:bg-gray-900/70 dark:text-gray-300 dark:hover:text-gray-50"
```

Same `transition-colors` → `transition` change as Task 2, for the same reason.

- [ ] **Step 3: Verify manually**

Run `npm run dev`. Press and hold the theme toggle: confirm a subtle shrink (~4%) on the button shell that doesn't fight the inner icon's own rotate/scale animation. Click to switch themes and confirm the crossfade still looks correct in both directions.

- [ ] **Step 4: Verify reduced motion**

With DevTools' `prefers-reduced-motion: reduce` emulation on, inspect the button in the Elements panel → Computed tab while pressed, and confirm `transition-duration` reads `75ms` instead of `150ms`.

- [ ] **Step 5: Full regression build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ThemeToggle.tsx
git commit -m "feat: add press feedback to theme toggle button"
```
