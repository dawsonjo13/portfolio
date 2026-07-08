export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Project Management",
    items: ["Agile", "Scrum", "JIRA", "Confluence"],
  },
  {
    category: "Software Development",
    items: ["ASP.NET MVC", "REST API", "Laravel", "VBA"],
  },
  {
    category: "Databases",
    items: ["Microsoft SQL Server", "MySQL"],
  },
  {
    category: "Data Analytics",
    items: ["Python", "Pandas", "Power BI"],
  },
];
