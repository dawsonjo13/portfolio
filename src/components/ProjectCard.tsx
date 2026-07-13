import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const hasLinks = Boolean(project.liveUrl || project.repoUrl);

  return (
    <article className="rounded-xl border border-slate-200 p-6 transition-colors hover:border-blue-300 hover:bg-white dark:border-gray-800 dark:hover:border-blue-800/60 dark:hover:bg-gray-900/40">
      {project.org && (
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
          {project.org}
        </p>
      )}
      <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 dark:border-gray-800 dark:text-gray-300"
          >
            {t}
          </li>
        ))}
      </ul>
      {hasLinks && (
        <div className="mt-4 flex gap-4 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Live site
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Source
            </a>
          )}
        </div>
      )}
    </article>
  );
}
