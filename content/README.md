# Editing site content

Everything in this folder is editable content — you should never need to touch code in `src/` to update what shows up on the site. Each `.json` file here is loaded directly by a matching file in `src/data/`.

## How this works

- Editing a JSON file still requires a rebuild to go live: **edit → commit → push to `main`** → Vercel automatically redeploys (usually within 1-2 minutes).
- There's no live/instant editing — nothing changes on the site until it rebuilds.

## Before you commit

JSON is strict. A misplaced comma or missing quote breaks the build. Before committing:

1. If unsure, paste the file into a JSON validator (e.g. jsonlint.com), or
2. Run `npm run build` locally — it fails loudly with the exact file if the JSON is invalid.

Rules to remember:

- Every key and string value needs double quotes (`"like this"`, not `'like this'`).
- No trailing comma after the last item in a list or object.
- Use `\"` if you need a literal quote inside a string.

## Files

### profile.json

About tab content and contact links.

| Field | Type | Notes |
|---|---|---|
| `name` | string | Full name — used for page metadata, not shown as the main About headline |
| `greeting` | string | Short semi-formal greeting shown as the About headline, e.g. `"Hi, I'm Jovi."` |
| `title` | string | Role line shown right after the greeting |
| `location` | string | City/country shown under your title |
| `blurb` | string | 1-2 sentence intro paragraph |
| `wisdom` | string | A short personal quote/philosophy shown as a pull-quote on the About tab |
| `photoSrc` | string | Path to your photo in `public/`, e.g. `/profile.jpg` |
| `email` | string | Used for the "Email" contact link |
| `github` | string | Full GitHub profile URL |
| `linkedin` | string | Full LinkedIn profile URL |

> **⚠️ Review before publishing**: `wisdom` currently holds placeholder copy (marked `PLACEHOLDER —` at the start). Replace it with your own words before this goes live — it's meant to be personal, not AI-drafted.

### experience.json

An array of work history entries, most recent first.

| Field | Type | Notes |
|---|---|---|
| `company` | string | Company name |
| `companyLocation` | string | City, shown next to the company name |
| `logoSrc` | string | Path to the company logo in `public/logos/`, e.g. `/logos/mattel.svg` |
| `role` | string | Job title |
| `startDate` | string | Free text, e.g. `"2016"` or `"April 2026"` |
| `endDate` | string | Free text, e.g. `"Present"` or `"April 2026"` |
| `highlight` | string | One sentence shown by default — keep it short |
| `details` | string[] *(optional)* | Extra bullet points revealed when the entry is expanded. Omit the field entirely if you don't need it |

To add a new job: copy an existing `{ ... }` entry, add a comma after the previous entry's closing `}`, and fill in the new fields.

### skills.json

An array of skill categories. The site currently uses three groups — `Technical Skills` (languages, frameworks, databases), `Tools & Platforms` (JIRA, Confluence, Power BI, etc.), and `Soft Skills` (leadership/process skills, no icons). You can rename or add categories freely; the layout adapts to however many groups you list.

| Field | Type | Notes |
|---|---|---|
| `category` | string | Group heading, e.g. `"Tools & Platforms"` |
| `items` | object[] | Chips shown under that heading — each is `{ "name": string, "icon"?: string }` |

Each item in `items` is an object, not a plain string:

```json
{ "name": "Python", "icon": "python" }
{ "name": "Stakeholder Management" }
```

`icon` is optional — omit it if there's no logo for that skill. Supported `icon` values (must match exactly, all lowercase): `python`, `dotnet` (ASP.NET/.NET), `laravel`, `mysql`, `jira`, `confluence`. Adding a new one requires a code change (a new icon import in `src/components/SkillsSection.tsx`), so anything outside this list should just omit `icon` and render as a plain text chip.

> **⚠️ Review before publishing**: the `Soft Skills` group (Stakeholder Management, Team Leadership, Agile Facilitation, Process Improvement, Cross-functional Communication) was drafted from your role title, not confirmed by you — edit the list to match skills you'd actually claim.

### projects.json

An array of project cards.

| Field | Type | Notes |
|---|---|---|
| `slug` | string | Unique id for the project (no spaces) |
| `title` | string | Project name |
| `description` | string | 1-2 sentence summary |
| `tech` | string[] | Tech stack chips |
| `repoUrl` | string *(optional)* | GitHub repo link |
| `liveUrl` | string *(optional)* | Live demo link |

To add a project: copy an existing entry and give it a unique `slug`.

## Images

`photoSrc` and `logoSrc` must point to a real file already placed in `public/` (e.g. `public/profile.jpg`, `public/logos/mattel.svg`). If the file doesn't exist, the image just shows broken on the site — it won't fail the build.
