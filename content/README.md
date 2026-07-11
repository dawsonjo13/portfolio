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

Hero section and contact links.

| Field | Type | Notes |
|---|---|---|
| `name` | string | Full name — shown in the hero and nav bar |
| `title` | string | Short role headline under your name |
| `location` | string | City/country under your title |
| `blurb` | string | 1-2 sentence intro paragraph |
| `photoSrc` | string | Path to your photo in `public/`, e.g. `/profile.jpg` |
| `email` | string | Used for the "Email" contact link |
| `github` | string | Full GitHub profile URL |
| `linkedin` | string | Full LinkedIn profile URL |

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

An array of skill categories.

| Field | Type | Notes |
|---|---|---|
| `category` | string | Group heading, e.g. `"Data Analytics"` |
| `items` | string[] | Chips shown under that heading |

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
