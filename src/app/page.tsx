import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const featured = projects.slice(0, 2);

  return (
    <div className="space-y-16">
      <section>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Hi, I&apos;m Your Name.
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
          A short introduction goes here — who you are, what you build, and
          what you&apos;re looking for next.
        </p>
        <div className="mt-6 flex gap-4 text-sm">
          <Link
            href="/projects"
            className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            View projects
          </Link>
          <Link
            href="/resume"
            className="rounded-md border border-gray-300 px-4 py-2 font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
          >
            View resume
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Featured projects</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
