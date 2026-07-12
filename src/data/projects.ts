import projectsJson from "@content/projects.json";

export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  org?: string;
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = projectsJson;
