# Skills & Experience Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Skills panel into a "Core Stack + supporting" layout and split the Experience panel into two tracks (Employment / Entrepreneurship), merging the two Mattel roles into one company card with stacked positions.

**Architecture:** Content-driven changes flow `content/*.json` → `src/data/*.ts` (typed adapter) → `src/components/*.tsx` (presentational). No new routes, no new dependencies, no test framework changes (this repo has no test suite — verification is `npm run build` + `npm run lint` + manual visual check via `npm run dev`).

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, react-icons.

## Global Constraints

- Dark-mode only — no `dark:` variants, use the existing hardcoded palette (`bg-gray-950`, `text-gray-800`/`gray-900` borders, `text-gray-100`/`gray-300`/`gray-400`/`gray-500`, `text-blue-400` accents).
- `npm run lint` runs `eslint src` (not `next lint`) — must pass with no errors after every task.
- `npm run build` must succeed (this is the repo's only type-check mechanism — there is no standalone `tsc` script).
- Components never import JSON directly — always via the matching `src/data/*.ts` adapter.
- JSON content files require valid strict JSON (double-quoted keys/strings, no trailing commas).
- Full design reference: `docs/superpowers/specs/2026-07-13-skills-experience-redesign-design.md`.

---

### Task 1: Add `featured` flag to Skills content and types

**Files:**
- Modify: `content/skills.json`
- Modify: `src/data/skills.ts`

**Interfaces:**
- Produces: `SkillItem` type with new optional field `featured?: boolean`, consumed by Task 2.

- [ ] **Step 1: Add `featured: true` to the five core-stack items in `content/skills.json`**

Replace the `Technical Skills` category block (lines 2–13) with:

```json
  {
    "category": "Technical Skills",
    "items": [
      { "name": "ASP.NET MVC", "icon": "dotnet", "featured": true },
      { "name": "Laravel", "icon": "laravel", "featured": true },
      { "name": "REST API", "icon": "api", "featured": true },
      { "name": "VBA", "icon": "excel" },
      { "name": "Python", "icon": "python", "featured": true },
      { "name": "Microsoft SQL Server", "icon": "sqlserver", "featured": true },
      { "name": "MySQL", "icon": "mysql" }
    ]
  },
```

Leave `Tools & Platforms` and `Soft Skills` categories unchanged.

- [ ] **Step 2: Add `featured` to the `SkillItem` type in `src/data/skills.ts`**

Replace lines 3–6:

```typescript
export type SkillItem = {
  name: string;
  icon?: string;
  featured?: boolean;
};
```

- [ ] **Step 3: Verify JSON validity and types**

Run: `npm run build`
Expected: build succeeds with no type or JSON parse errors.

- [ ] **Step 4: Commit**

```bash
git add content/skills.json src/data/skills.ts
git commit -m "feat: add featured flag to core-stack skills"
```

---

### Task 2: Rebuild `SkillsSection` with a Core Stack row

**Files:**
- Modify: `src/components/SkillsSection.tsx`

**Interfaces:**
- Consumes: `skills: SkillCategory[]` from `src/data/skills.ts` (`SkillCategory = { category: string; items: SkillItem[] }`, `SkillItem = { name: string; icon?: string; featured?: boolean }`), `iconMap: Record<string, IconType>` (existing, unchanged).
- Produces: default export `SkillsSection()` — no props, no change to how it's consumed by `PortfolioTabs`.

- [ ] **Step 1: Replace the component body to render a Core Stack row plus de-emphasized category cards**

Replace the whole file content from line 23 (`export default function SkillsSection()`) to the end with:

```tsx
export default function SkillsSection() {
  const featuredItems = skills.flatMap((group) =>
    group.items.filter((item) => item.featured)
  );
  const supportingGroups = skills
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.featured)
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="space-y-8">
      {featuredItems.length > 0 && (
        <div>
          <h3 className="inline-block border-b-2 border-blue-400 pb-1.5 text-base font-semibold text-gray-200">
            Core Stack
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {featuredItems.map((item) => {
              const Icon = item.icon ? iconMap[item.icon] : FiCheckCircle;
              return (
                <div
                  key={item.name}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-800 bg-gray-900/60 px-4 py-6 text-center transition-all hover:-translate-y-0.5 hover:border-blue-800/60"
                >
                  <Icon className="h-8 w-8 text-blue-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-200">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {supportingGroups.map((group) => (
          <div key={group.category} className="rounded-xl border border-gray-800/60 p-5">
            <h3 className="inline-block border-b-2 border-blue-400 pb-1 text-sm font-semibold text-gray-300">
              {group.category}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => {
                const Icon = item.icon ? iconMap[item.icon] : FiCheckCircle;
                return (
                  <li
                    key={item.name}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-800/60 px-3 py-2 text-xs text-gray-400 transition-colors hover:border-blue-800/60 hover:text-gray-200"
                  >
                    <Icon className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both succeed with no errors.

- [ ] **Step 3: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000`, switch to the Skills tab.
Expected: a "Core Stack" row of 5 larger tiles (ASP.NET MVC, Laravel, REST API, Python, Microsoft SQL Server) above three smaller, lighter-bordered category cards (Technical Skills now showing only VBA and MySQL, Tools & Platforms, Soft Skills unchanged). Hovering a Core Stack tile lifts it slightly and highlights the border blue.

- [ ] **Step 4: Commit**

```bash
git add src/components/SkillsSection.tsx
git commit -m "feat: add Core Stack row to Skills section"
```

---

### Task 3: Restructure Experience content into tracks with grouped positions

**Files:**
- Modify: `content/experience.json`

**Interfaces:**
- Produces: new JSON shape `Array<{ track: "employment" | "entrepreneurship"; company: string; companyLocation: string; logoSrc: string; positions: Array<{ role: string; startDate: string; endDate: string; highlight: string; details?: string[] }> }>`, consumed by Task 4.

- [ ] **Step 1: Replace the full contents of `content/experience.json`**

```json
[
  {
    "track": "employment",
    "company": "PT. Mattel Indonesia",
    "companyLocation": "Cikarang, Bekasi",
    "logoSrc": "/logos/MATTEL_LOGO.png",
    "positions": [
      {
        "role": "Digital Transformation Engineer",
        "startDate": "April 2026",
        "endDate": "Present",
        "highlight": "Moved to lead digital transformation beyond a single department — now leading web development initiatives across Mattel's Indonesia and China plants."
      },
      {
        "role": "Project Engineer",
        "startDate": "2016",
        "endDate": "April 2026",
        "highlight": "Led Mattel's internal web platform for the Product Development department and introduced Scrum to modernize delivery — started here as a PLM engineering intern in 2016.",
        "details": [
          "Developed automated ETL pipelines in Python (AS400 Db2/Excel to SQL Server), cutting weekly manual data-transfer hours by more than 50%.",
          "Built a bug submission and tracking system integrating Microsoft Forms, Power Automate, and the JIRA REST API, with a Power BI dashboard for real-time tracking.",
          "Led the migration of an Excel-based parts library to a web-based ASP.NET MVC system — placed top 3 in Mattel's Global Manufacturing Business Process Kaizen Challenge."
        ]
      }
    ]
  },
  {
    "track": "entrepreneurship",
    "company": "PT. Ngontenin Digital Indonesia",
    "companyLocation": "Jakarta",
    "logoSrc": "/logos/ng_circle.png",
    "positions": [
      {
        "role": "Co-founder",
        "startDate": "2025",
        "endDate": "Present",
        "highlight": "Co-founded a startup connecting content creators with SME business owners, leading product from concept to MVP.",
        "details": [
          "Manage company financial operations, including budgeting, expense tracking, and resource allocation.",
          "Oversee UI/UX design decisions and define the product roadmap and release priorities."
        ]
      }
    ]
  }
]
```

- [ ] **Step 2: Commit**

```bash
git add content/experience.json
git commit -m "feat: restructure experience content into tracks with grouped positions"
```

(This task alone will break the build, since `src/data/experience.ts` and `ExperienceTimeline.tsx` still expect the old flat shape — Tasks 4–5 fix that. Commit anyway to keep history atomic; the working tree is repaired before moving on.)

---

### Task 4: Update Experience types

**Files:**
- Modify: `src/data/experience.ts`

**Interfaces:**
- Produces: `ExperienceTrack`, `Position`, `ExperienceEntry` types, `experience: ExperienceEntry[]` export, consumed by Task 5.

- [ ] **Step 1: Replace the full contents of `src/data/experience.ts`**

```typescript
import experienceJson from "@content/experience.json";

export type ExperienceTrack = "employment" | "entrepreneurship";

export type Position = {
  role: string;
  startDate: string;
  endDate: string;
  highlight: string;
  details?: string[];
};

export type ExperienceEntry = {
  track: ExperienceTrack;
  company: string;
  companyLocation: string;
  logoSrc: string;
  positions: Position[];
};

export const experience: ExperienceEntry[] = experienceJson as ExperienceEntry[];
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: fails at this point because `ExperienceTimeline.tsx` (Task 5) still references the old `ExperienceItem` type and flat fields — this is expected until Task 5 lands.

- [ ] **Step 3: Commit**

```bash
git add src/data/experience.ts
git commit -m "feat: update experience types for track/positions shape"
```

---

### Task 5: Rebuild `ExperienceTimeline` as two tracks with grouped position cards

**Files:**
- Modify: `src/components/ExperienceTimeline.tsx`

**Interfaces:**
- Consumes: `experience: ExperienceEntry[]`, `ExperienceEntry`, `Position` from `src/data/experience.ts` (Task 4).
- Produces: default export `ExperienceTimeline()` — no props, no change to how it's consumed by `PortfolioTabs`.

- [ ] **Step 1: Replace the full contents of `src/components/ExperienceTimeline.tsx`**

```tsx
"use client";

import { useId, useState } from "react";
import Image from "next/image";
import {
  experience,
  type ExperienceEntry,
  type ExperienceTrack,
  type Position
} from "@/data/experience";

const TRACK_LABELS: Record<ExperienceTrack, string> = {
  employment: "Employment",
  entrepreneurship: "Entrepreneurship"
};

const TRACK_ORDER: ExperienceTrack[] = ["employment", "entrepreneurship"];

function PositionEntry({ position }: { position: Position }) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsId = useId();
  const hasDetails = Boolean(position.details && position.details.length > 0);
  const isCurrent = position.endDate === "Present";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="font-semibold">{position.role}</h4>
        {isCurrent && (
          <span className="rounded-full bg-green-900/40 px-2 py-0.5 text-xs font-medium text-green-400">
            Current
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500">
        {position.startDate} – {position.endDate}
      </p>
      <p className="mt-2 text-sm text-gray-300">{position.highlight}</p>

      {hasDetails && (
        <>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={detailsId}
            onClick={() => setIsOpen((prev) => !prev)}
            className="mt-2 text-xs font-medium text-blue-400 hover:underline"
          >
            {isOpen ? "Show less" : "Show more"}
          </button>
          <ul
            id={detailsId}
            hidden={!isOpen}
            className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-gray-400"
          >
            {position.details?.map((detail, index) => (
              <li key={index} className="break-words">
                {detail}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function CompanyCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <li className="rounded-xl border border-gray-800 p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start gap-4">
        <Image
          src={entry.logoSrc}
          alt={`${entry.company} logo`}
          width={40}
          height={40}
          className="h-10 w-10 flex-shrink-0 rounded-md object-contain grayscale"
        />
        <div className="min-w-0">
          <p className="font-semibold text-gray-100">{entry.company}</p>
          <p className="text-sm text-gray-400">{entry.companyLocation}</p>
        </div>
      </div>

      <div className="mt-4 divide-y divide-gray-800">
        {entry.positions.map((position, index) => (
          <div key={`${position.role}-${index}`} className={index > 0 ? "pt-4" : "pb-4 last:pb-0"}>
            <PositionEntry position={position} />
          </div>
        ))}
      </div>
    </li>
  );
}

export default function ExperienceTimeline() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {TRACK_ORDER.map((track) => {
        const entries = experience.filter((entry) => entry.track === track);
        return (
          <div key={track}>
            <h3 className="inline-block border-b-2 border-blue-400 pb-1.5 text-base font-semibold text-gray-200">
              {TRACK_LABELS[track]}
            </h3>
            {entries.length > 0 ? (
              <ol className="mt-4 space-y-4">
                {entries.map((entry) => (
                  <CompanyCard key={entry.company} entry={entry} />
                ))}
              </ol>
            ) : (
              <p className="mt-4 text-sm text-gray-500">Nothing here yet.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both succeed with no errors.

- [ ] **Step 3: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000`, switch to the Experience tab.
Expected: two side-by-side columns on desktop width — "Employment" (left) showing one Mattel card with "Digital Transformation Engineer" (Current badge, no details) stacked above "Project Engineer" (with a working Show more/Show less toggle) separated by a divider; "Entrepreneurship" (right) showing the Ngontenin Digital Indonesia card with its own Show more/Show less. Narrowing the viewport stacks the columns.

- [ ] **Step 4: Commit**

```bash
git add src/components/ExperienceTimeline.tsx
git commit -m "feat: split Experience into Employment/Entrepreneurship tracks"
```

---

### Task 6: Update content documentation and CLAUDE.md

**Files:**
- Modify: `content/README.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Rewrite the `experience.json` section of `content/README.md`**

Replace lines 55–70 (from `### experience.json` through the "To add a new job" line) with:

```markdown
### experience.json

An array of company entries. Each entry represents one company and can hold multiple `positions` if you held more than one role there (most recent role first).

| Field | Type | Notes |
|---|---|---|
| `track` | string | Either `"employment"` or `"entrepreneurship"` — controls which column the entry renders in |
| `company` | string | Company name |
| `companyLocation` | string | City, shown next to the company name |
| `logoSrc` | string | Path to the company logo in `public/logos/`, e.g. `/logos/mattel.svg` |
| `positions` | object[] | One or more roles at this company, most recent first — see below |

Each item in `positions` is an object:

| Field | Type | Notes |
|---|---|---|
| `role` | string | Job title |
| `startDate` | string | Free text, e.g. `"2016"` or `"April 2026"` |
| `endDate` | string | Free text, e.g. `"Present"` or `"April 2026"` |
| `highlight` | string | One sentence shown by default — keep it short |
| `details` | string[] *(optional)* | Extra bullet points revealed when that position is expanded. Omit the field entirely if you don't need it |

To add a new job at an existing company: add another object to that company's `positions` array (most recent first). To add a new company: copy an existing top-level `{ ... }` entry, set the right `track`, and give it one `positions` entry.
```

- [ ] **Step 2: Update the `skills.json` field table and icon list in `content/README.md`**

In the `skills.json` section, replace the field table (currently ending `Each item in \`items\` is an object, not a plain string:`) so the table includes `featured`:

```markdown
| Field | Type | Notes |
|---|---|---|
| `category` | string | Group heading, e.g. `"Tools & Platforms"` |
| `items` | object[] | Chips shown under that heading — each is `{ "name": string, "icon"?: string, "featured"?: boolean }` |

Each item in `items` is an object, not a plain string:
```

Replace the "Supported `icon` values" line with:

```markdown
`icon` is optional — omit it if there's no logo for that skill. Supported `icon` values (must match exactly, all lowercase): `python`, `dotnet` (ASP.NET/.NET), `laravel`, `mysql`, `jira`, `confluence`, `excel` (VBA), `api` (REST API), `powerbi`, `sqlserver` (Microsoft SQL Server). Adding a new one requires a code change (a new icon import in `src/components/SkillsSection.tsx`), so anything outside this list should just omit `icon` and render with a generic checkmark icon instead of a brand logo.

`featured` is optional — set it to `true` to pull that item into the "Core Stack" row shown above the category cards, regardless of which category it belongs to. Leave it unset (or `false`) for everything that should stay in its category's regular chip list.
```

- [ ] **Step 3: Update the `content/experience.json` and `content/skills.json` bullets in `CLAUDE.md`**

Replace lines 27–28 of `CLAUDE.md`:

```markdown
  - `content/experience.json` / `src/data/experience.ts` — company entries grouped by `track` (`"employment"` or `"entrepreneurship"`), each with a `positions` array (role, dates, highlight, optional `details`) so one company can list multiple roles (used by `ExperienceTimeline`, which renders the two tracks as separate columns)
  - `content/skills.json` / `src/data/skills.ts` — grouped skill chips, currently three groups: Technical Skills / Tools & Platforms / Soft Skills, with an optional `featured` flag per item that promotes it into the "Core Stack" row above the category cards (used by `SkillsSection`). The Soft Skills list is a drafted placeholder pending your review.
```

- [ ] **Step 4: Verify no build regressions from doc changes**

Run: `npm run build`
Expected: succeeds (docs don't affect the build, this just confirms nothing else broke).

- [ ] **Step 5: Commit**

```bash
git add content/README.md CLAUDE.md
git commit -m "docs: update content guide and CLAUDE.md for skills/experience redesign"
```

---

## Self-Review Notes

- Spec coverage: Core Stack row (Task 2), supporting de-emphasis (Task 2), experience track/positions data model (Task 3–4), two-column track layout with merged Mattel card and per-position collapse (Task 5), copy fix for "Promoted" → "Moved" (Task 3), README + CLAUDE.md doc updates including the pre-existing stale icon list (Task 6) — all covered.
- Empty-track edge case from the spec is handled in Task 5's `ExperienceTimeline` (`entries.length > 0` check).
- Empty-category edge case from the spec is handled in Task 2's `SkillsSection` (`supportingGroups` filters out zero-length groups).
- Type consistency checked: `ExperienceEntry`/`Position`/`ExperienceTrack` names and fields match exactly between Task 4 (types) and Task 5 (component usage); `SkillItem.featured` matches between Task 1 and Task 2.
