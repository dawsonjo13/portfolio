import { projects } from "@/data/projects";
import ProfileHeader from "@/components/ProfileHeader";
import DockNav from "@/components/DockNav";
import PortfolioTabs from "@/components/PortfolioTabs";

export default function Home() {
  return (
    <div className="space-y-8">
      <ProfileHeader />
      <DockNav />
      <PortfolioTabs projects={projects} />
    </div>
  );
}
