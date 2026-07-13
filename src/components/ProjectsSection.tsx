import ProjectCard from "@/components/ProjectCard";
import type { Project, ProjectRole } from "@/data/projects";

const ROLE_LABELS: Record<ProjectRole, string> = {
  programmer: "As Programmer",
  lead: "As Lead / PM"
};

const ROLE_ORDER: ProjectRole[] = ["programmer", "lead"];

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {ROLE_ORDER.map((role) => {
        const items = projects.filter((project) => project.role === role);
        return (
          <div key={role}>
            <h3 className="inline-block border-b-2 border-blue-400 pb-1.5 text-base font-semibold text-gray-200">
              {ROLE_LABELS[role]}
            </h3>
            {items.length > 0 ? (
              <div className="mt-4 space-y-4">
                {items.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">Nothing here yet.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
