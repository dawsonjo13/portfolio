import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
