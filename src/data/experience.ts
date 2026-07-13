import experienceJson from "@content/experience.json";

export type ExperienceTrack = "employment" | "entrepreneurship";

export type Position = {
  role: string;
  startDate: string;
  endDate: string;
  highlight: string;
  details?: string[];
};

export type ExperienceEntry = {
  track: ExperienceTrack;
  company: string;
  companyLocation: string;
  logoSrc: string;
  positions: Position[];
};

export const experience: ExperienceEntry[] = experienceJson as ExperienceEntry[];
