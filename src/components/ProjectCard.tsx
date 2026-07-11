import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-xl border border-gray-800 p-6 transition-shadow hover:shadow-md">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-gray-400">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300"
          >
            {t}
          </li>
        ))}
      </ul>
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
    </article>
  );
}
