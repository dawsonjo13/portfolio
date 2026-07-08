# Portfolio

Personal portfolio site built with Next.js, TypeScript, and Tailwind CSS. Showcases projects and a resume, deployed on Vercel.

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Customizing

- Update your name, intro, and metadata in `src/app/layout.tsx` and `src/app/page.tsx`.
- Add projects in `src/data/projects.ts`.
- Add your resume as `public/resume.pdf` (linked from `src/app/resume/page.tsx`), or replace the resume page content directly.

## Deployment

Deployed on [Vercel](https://vercel.com). Push to GitHub and import the repo in the Vercel dashboard, or run `vercel` from the CLI. Vercel builds with `npm run build` and serves via `npm run start`.
