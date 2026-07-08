export type ExperienceItem = {
  company: string;
  companyLocation: string;
  logoSrc: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "PT. Ngontenin Digital Indonesia",
    companyLocation: "Jakarta",
    logoSrc: "/logos/placeholder.svg",
    role: "Co-founder",
    startDate: "July 2025",
    endDate: "Present",
    bullets: [
      "Cofounded a technology startup connecting content creators with business owners, primarily SMEs.",
      "Manage company financial operations, including budgeting, expense tracking, and resource allocation.",
      "Led end-to-end product development from concept to MVP, overseeing UI/UX decisions and defining the product roadmap and release priorities.",
    ],
  },
  {
    company: "PT. Mattel Indonesia",
    companyLocation: "Cikarang, Bekasi",
    logoSrc: "/logos/placeholder.svg",
    role: "Project Engineer",
    startDate: "March 2017",
    endDate: "Present",
    bullets: [
      "Lead a team of web developers building an integrated web application serving as the single source of truth for product-development processes across plants and the head office.",
      "Introduced and implemented Scrum as the standard framework for digital transformation initiatives.",
      "Developed automated ETL pipelines in Python (AS400 Db2/Excel to SQL Server), cutting weekly manual data-transfer hours by more than 50%.",
      "Built a bug submission and tracking system integrating Microsoft Forms, Power Automate, and the JIRA REST API, with a Power BI dashboard for real-time tracking.",
      "Led the migration of an Excel-based parts library to a web-based ASP.NET MVC system — placed top 3 in Mattel's Global Manufacturing Business Process Kaizen Challenge.",
    ],
  },
  {
    company: "PT. Mattel Indonesia",
    companyLocation: "Cikarang, Bekasi",
    logoSrc: "/logos/placeholder.svg",
    role: "Internship PLM Engineer",
    startDate: "February 2016",
    endDate: "March 2017",
    bullets: [
      "Supported lifecycle promotion and product BOM input to the Agile PLM system.",
      "Created and maintained product databases using Excel VBA and Microsoft Access.",
    ],
  },
];
