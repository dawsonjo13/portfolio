import skillsJson from "@content/skills.json";

export type SkillItem = {
  name: string;
  icon?: string;
  featured?: boolean;
};

export type SkillCategory = {
  category: string;
  items: SkillItem[];
};

export const skills: SkillCategory[] = skillsJson;
