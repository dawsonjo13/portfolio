import projectsJson from "@content/projects.json";

export type ProjectRole = "programmer" | "lead";

export const ROLE_LABELS: Record<ProjectRole, string> = {
  programmer: "Programmer",
  lead: "Lead / PM"
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  role: ProjectRole;
  org?: string;
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = projectsJson as Project[];
