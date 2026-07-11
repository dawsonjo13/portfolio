import type { IconType } from "react-icons";
import { SiConfluence, SiDotnet, SiJira, SiLaravel, SiMysql, SiPython } from "react-icons/si";
import { skills } from "@/data/skills";

const iconMap: Record<string, IconType> = {
  python: SiPython,
  dotnet: SiDotnet,
  laravel: SiLaravel,
  mysql: SiMysql,
  jira: SiJira,
  confluence: SiConfluence,
};

export default function SkillsSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {skills.map((group) => (
        <div key={group.category}>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {group.category}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => {
              const Icon = item.icon ? iconMap[item.icon] : undefined;
              return (
                <li
                  key={item.name}
                  className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
