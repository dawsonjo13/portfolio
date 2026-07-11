# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site (projects showcase + resume) built with Next.js (App Router), TypeScript, and Tailwind CSS. Deployed on Vercel.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run eslint (eslint-config-next)
```

There is no test suite configured yet.

## Architecture

- App Router under `src/app/`. The home route (`src/app/page.tsx`) composes three pieces in order: `ProfileHeader` (persistent photo/greeting/title — no links besides `SocialLinks`/resume download), `DockNav` (the tab switcher), then `PortfolioTabs`, a tab-switching panel (About / Experience / Skills / Projects / Contact) — **About is the default tab** and its content is now just the bio paragraph (identity info lives in `ProfileHeader` instead). Tab switching doesn't scroll or change route: it flips `TabContext`'s `activeTab` state and `PortfolioTabs` shows the matching panel (all five panels stay mounted in the DOM; inactive ones are just `hidden`). There is no standalone `/projects` route — all projects render on home. `src/context/TabContext.tsx` exports `TABS` (the single source of truth for tab id/label pairs, `about` listed first), `TabProvider` (mounted in `layout.tsx`, wraps the whole body), and `useTab()`. Because tab state isn't in the URL, old anchor links like `/#projects` no longer land on a specific section — this is an intentional tradeoff of the tab architecture, not a bug.
- **Navigation is a sticky pill dock, not a top navbar.** `DockNav` is the tab switcher — a glass-blurred pill with icon+label per tab and a `framer-motion` `layoutId` sliding indicator behind the active tab, `sticky top-0` so it stays reachable while scrolling. There's no shared `Nav` component anymore (deleted) — no persistent brand-mark/Resume link exists. Because `DockNav` is composed per-page (to keep the Profile → Nav → content order on home) rather than mounted once in `layout.tsx`, it's rendered explicitly in both `src/app/page.tsx` and `src/app/resume/page.tsx` so cross-page navigation still works. It duplicates the `role="tablist"`/`aria-selected`/`aria-controls` wiring that `PortfolioTabs` expects (`id="tab-{id}"` ↔ `aria-controls="panel-{id}"`).
- **Content lives in `content/*.json`, not code.** `content/README.md` is the editing guide (field-by-field reference, JSON gotchas, how to add entries). Each `src/data/*.ts` file is a thin typed adapter — it imports the matching JSON (via the `@content/*` path alias) and re-exports it typed; components never import JSON directly:
  - `content/profile.json` / `src/data/profile.ts` — name, greeting, title, blurb (`{paragraphs, highlights}` — see `content/README.md` for why it's structured instead of a plain string), photo path, contact/social URLs (used by `ProfileHeader`, `AboutSection`, `SocialLinks`)
  - `content/experience.json` / `src/data/experience.ts` — work history entries, each with an optional `details` array for the timeline's expand/collapse (used by `ExperienceTimeline`)
  - `content/skills.json` / `src/data/skills.ts` — grouped skill chips, currently three groups: Technical Skills / Tools & Platforms / Soft Skills (used by `SkillsSection`). The Soft Skills list is a drafted placeholder pending your review.
  - `content/projects.json` / `src/data/projects.ts` — project cards (used by `ProjectCard` on the home page)
  - Editing a JSON file still requires a rebuild to go live (commit + push to `main`; Vercel redeploys automatically) — there is no live/instant content editing.
  - `ExperienceTimeline` is a Client Component (`"use client"`) — it holds per-entry expand/collapse state for the optional `details` bullets.
- `src/components/` holds presentational components shared across routes (`DockNav`, `Footer`, `ProfileHeader`, `AboutSection`, `ExperienceTimeline`, `SkillsSection`, `SocialLinks`, `ProjectCard`, `ContactSection`). `DockNav` and `PortfolioTabs` are Client Components that consume `TabContext` and are not purely presentational.
- Path alias `@/*` maps to `src/*` (configured in `tsconfig.json`).
- The resume page (`src/app/resume/page.tsx`) links to `/resume.pdf`, expected to be placed in `public/` (not committed by default).
- **Placeholder assets to replace**: `profile.photoSrc` in `profile.ts` points at `public/profile-placeholder.svg`; each `experience.ts` entry's `logoSrc` points at `public/logos/placeholder.svg`. Drop in real files (e.g. `public/profile.jpg`, `public/logos/mattel.svg`) and update the corresponding path(s) in the data files — no component changes needed.
- Styling is Tailwind utility classes only — no CSS modules or styled-components. The site is dark-mode only: there are no `dark:` variants anywhere in the codebase, colors are hardcoded to the dark palette (`bg-gray-950`, `text-gray-100`, etc.), and there is no light theme or toggle. Two font families are wired via `next/font/google` in `layout.tsx`: `Inter` (`font-sans`, the default body/UI face) and `Fraunces` (`font-display`, used sparingly for the `ProfileHeader` greeting headline).
- `npm run lint` runs `eslint src` directly (not `next lint`, which crashes on this Next 15 / ESLint 8 flat-config combo) and is scoped to `src/` to skip Next's auto-generated `next-env.d.ts`.

## Notes

- `CLAUDE.md` is tracked in git and pushed to the remote repo, so it's the shared source of truth for future Claude Code sessions on this project.
