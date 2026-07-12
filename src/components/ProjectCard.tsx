import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const hasLinks = Boolean(project.liveUrl || project.repoUrl);

  return (
    <article className="rounded-xl border border-gray-800 p-6 transition-colors hover:border-blue-800/60 hover:bg-gray-900/40">
      {project.org && (
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">
          {project.org}
        </p>
      )}
      <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-gray-400">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-full border border-gray-800 px-3 py-1 text-xs text-gray-300"
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
              className="font-medium text-blue-400 hover:underline"
            >
              Live site
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-400 hover:underline"
            >
              Source
            </a>
          )}
        </div>
      )}
    </article>
  );
}
