import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsSection from "@/components/SkillsSection";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <div className="space-y-20">
      <Hero />

      <section id="experience">
        <h2 className="text-xl font-semibold">Experience</h2>
        <div className="mt-6">
          <ExperienceTimeline />
        </div>
      </section>

      <section id="skills">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-6">
          <SkillsSection />
        </div>
      </section>

      <section id="projects">
        <h2 className="text-xl font-semibold">Projects</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section id="contact">
        <h2 className="text-xl font-semibold">Get in touch</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
          Reach me through GitHub, LinkedIn, or email, or view my full{" "}
          <a href="/resume" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            resume
          </a>
          .
        </p>
        <div className="mt-4">
          <SocialLinks />
        </div>
      </section>
    </div>
  );
}
