import { projects } from "@/data/projects";
import Hero from "@/components/Hero";
import PortfolioTabs from "@/components/PortfolioTabs";

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <PortfolioTabs projects={projects} />
    </div>
  );
}
