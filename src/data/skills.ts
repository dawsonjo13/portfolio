import skillsJson from "@content/skills.json";

export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = skillsJson;
