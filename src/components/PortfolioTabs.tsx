"use client";

import { TABS, useTab, type TabId } from "@/context/TabContext";
import AboutSection from "@/components/AboutSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsSection from "@/components/SkillsSection";
import ProjectCard from "@/components/ProjectCard";
import ContactSection from "@/components/ContactSection";
import type { Project } from "@/data/projects";

function panelContent(tabId: TabId, projects: Project[]) {
  switch (tabId) {
    case "about":
      return <AboutSection />;
    case "experience":
      return <ExperienceTimeline />;
    case "skills":
      return <SkillsSection />;
    case "projects":
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      );
    case "contact":
      return <ContactSection />;
  }
}

export default function PortfolioTabs({ projects }: { projects: Project[] }) {
  const { activeTab } = useTab();

  return (
    <div>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <section
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={!isActive}
            className={isActive ? "animate-fade-in" : undefined}
          >
            {tab.id !== "contact" && (
              <h2 className="text-xl font-semibold">{tab.label}</h2>
            )}
            <div className="mt-6">{panelContent(tab.id, projects)}</div>
          </section>
        );
      })}
    </div>
  );
}
