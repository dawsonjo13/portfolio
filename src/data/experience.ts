import experienceJson from "@content/experience.json";

export type ExperienceItem = {
  company: string;
  companyLocation: string;
  logoSrc: string;
  role: string;
  startDate: string;
  endDate: string;
  highlight: string;
  details?: string[];
};

export const experience: ExperienceItem[] = experienceJson;
