import { projects } from "@/data/projects";
import PortfolioTabs from "@/components/PortfolioTabs";

export default function Home() {
  return <PortfolioTabs projects={projects} />;
}
