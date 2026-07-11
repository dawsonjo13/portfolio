export type ExperienceItem = {
  company: string;
  companyLocation: string;
  logoSrc: string;
  role: string;
  startDate: string;
  endDate: string;
  highlight: string;
};

export const experience: ExperienceItem[] = [
  {
    company: "PT. Mattel Indonesia",
    companyLocation: "Cikarang, Bekasi",
    logoSrc: "/logos/placeholder.svg",
    role: "Digital Transformation Engineer",
    startDate: "April 2026",
    endDate: "Present",
    highlight:
      "Promoted to lead digital transformation beyond a single department — now leading web development initiatives across Mattel's Indonesia and China plants.",
  },
  {
    company: "PT. Ngontenin Digital Indonesia",
    companyLocation: "Jakarta",
    logoSrc: "/logos/placeholder.svg",
    role: "Co-founder",
    startDate: "2025",
    endDate: "Present",
    highlight:
      "Co-founded a startup connecting content creators with SME business owners, leading product from concept to MVP.",
  },
  {
    company: "PT. Mattel Indonesia",
    companyLocation: "Cikarang, Bekasi",
    logoSrc: "/logos/placeholder.svg",
    role: "Project Engineer",
    startDate: "2016",
    endDate: "April 2026",
    highlight:
      "Led Mattel's internal web platform for the Product Development department and introduced Scrum to modernize delivery — started here as a PLM engineering intern in 2016.",
  },
];
