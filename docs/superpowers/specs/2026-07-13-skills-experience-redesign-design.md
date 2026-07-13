# Skills & Experience Redesign

## Context

Two sections of the About/Experience/Skills tabs feel underdeveloped:

- **Skills**: three same-weight bordered cards with flat chip pills — no visual distinction and no signal for which skills matter most.
- **Experience**: a single flat, date-sorted list interleaves two Mattel roles (continuous employment, same company) with one Ngontenin Digital Indonesia entry (a company the user co-founded). Nothing in the layout communicates that these are two different kinds of experience.

This doc covers both, since they were designed together and touch the same content-driven architecture (`content/*.json` → `src/data/*.ts` → component).

## 1. Skills — Featured + Supporting

### Data model

Add an optional `featured` boolean to individual skill items in `content/skills.json`. No new top-level structure — items keep their existing category grouping.

```json
{ "name": "ASP.NET MVC", "icon": "dotnet", "featured": true }
```

Featured items for this pass (Technical Skills category): **ASP.NET MVC, Laravel, Python, Microsoft SQL Server, REST API**. Everything else (VBA, MySQL, JIRA, Confluence, Power BI, all Soft Skills) is unflagged and renders in the supporting section as today.

`SkillItem` type in `src/data/skills.ts` gains `featured?: boolean`.

### Component (`SkillsSection.tsx`)

- Flatten all items across categories, filter `featured === true`, render first as a **Core Stack** row:
  - Larger tiles (~96–112px), icon + label, `rounded-2xl`, `bg-gray-900/60` fill, `border-gray-800`, hover: `border-blue-800/60` + `-translate-y-0.5` lift + transition.
  - Grid layout: `grid-cols-2` on mobile, up to `grid-cols-5` on `lg` so all 5 sit in one row on wide screens.
  - Section label "Core Stack" above the row, styled like existing category headers (`border-b-2 border-blue-400`), visually first.
- Render the existing three category cards below, unchanged in structure, but:
  - Exclude featured items from their category's chip list (an item shouldn't appear twice).
  - Slightly de-emphasize: smaller chip text/padding, lighter border (`border-gray-800/60`) — this is what creates hierarchy against the Core Stack row.
- No new icons needed — all 5 featured items already have icons in the existing `iconMap`.

### Edge case

If a category ends up with zero remaining (non-featured) items after filtering, that category card is omitted rather than rendered empty. (Not currently triggered — Technical Skills keeps VBA and MySQL — but the component should handle it since content is edited via JSON without a schema check.)

## 2. Experience — Two Tracks

### Data model

Restructure `content/experience.json` from a flat list of 3 role-entries into a list of **company entries**, each holding a `positions` array. This models "one company, multiple roles" directly instead of repeating the company block per role.

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

Copy change: the current Digital Transformation Engineer `highlight` says "Promoted to lead..." — this was a department move, not a promotion, so it's reworded above.

`src/data/experience.ts` types become:

```typescript
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
```

### Component (`ExperienceTimeline.tsx`)

- Group entries by `track` into two columns: **Employment** (left) and **Entrepreneurship** (right), `lg:grid-cols-2 gap-6`, stacking on mobile.
- Each column gets a header matching the Skills category-header style (`border-b-2 border-blue-400`).
- Each company renders as one card: logo/company/location shown once at the top, then its `positions` stacked underneath in array order (already most-recent-first per the JSON above).
  - Each position keeps today's per-entry look: role title, "Current" badge when `endDate === "Present"`, dates, highlight text, and its own independent show-more/show-less toggle for `details` (state is per-position, not per-card, so expanding one role doesn't affect the other).
  - A thin divider (`border-t border-gray-800`) between stacked positions within a card.
- Track order (`employment` before `entrepreneurship`) is fixed by the component, not inferred from JSON array order, so a future third employment entry still resolves into the correct column regardless of where it sits in the file.

### Edge case

A track with zero entries (e.g. if Entrepreneurship is ever removed) renders its column header with an empty-state note rather than an empty box — not currently triggered, but cheap to handle given the two-column layout would otherwise look broken with one side blank.

## Documentation updates

- `content/README.md`: rewrite the `experience.json` section for the new `track`/`positions` shape; add `featured` to the `skills.json` field table; fix the stale supported-icon list (currently missing `excel`, `api`, `powerbi`, `sqlserver`, which already exist in `SkillsSection.tsx`'s `iconMap`).
- `CLAUDE.md`: update the `content/experience.json` bullet to describe the track/positions structure and the two-column layout; update the `content/skills.json` bullet to mention the Core Stack row.

## Out of scope

- No new icons beyond what's already mapped.
- No proficiency ratings/levels for skills (considered, rejected — resume-builder feel, requires self-rating every item).
- No light-mode variants (site is dark-mode only, per existing convention).
- No automated tests added (no test suite configured in this repo currently).
