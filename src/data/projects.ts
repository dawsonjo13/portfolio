import projectsJson from "@content/projects.json";

export type ProjectRole = "programmer" | "lead";

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
