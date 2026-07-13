import type { IconType } from "react-icons";
import { SiConfluence, SiDotnet, SiJira, SiLaravel, SiMysql, SiPython } from "react-icons/si";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { AiOutlineCloudServer } from "react-icons/ai";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { DiMsqlServer } from "react-icons/di";
import { FiCheckCircle } from "react-icons/fi";
import { skills } from "@/data/skills";

const iconMap: Record<string, IconType> = {
  python: SiPython,
  dotnet: SiDotnet,
  laravel: SiLaravel,
  mysql: SiMysql,
  jira: SiJira,
  confluence: SiConfluence,
  excel: PiMicrosoftExcelLogoFill,
  api: AiOutlineCloudServer,
  powerbi: BsFileEarmarkBarGraph,
  sqlserver: DiMsqlServer
};

export default function SkillsSection() {
  const featuredItems = skills.flatMap((group) =>
    group.items.filter((item) => item.featured)
  );
  const supportingGroups = skills
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.featured)
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="space-y-8">
      {featuredItems.length > 0 && (
        <div>
          <h3 className="inline-block border-b-2 border-blue-400 pb-1.5 text-base font-semibold text-gray-200">
            Core Stack
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {featuredItems.map((item) => {
              const Icon = item.icon ? iconMap[item.icon] : FiCheckCircle;
              return (
                <div
                  key={item.name}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-800 bg-gray-900/60 px-4 py-6 text-center transition-all hover:-translate-y-0.5 hover:border-blue-800/60"
                >
                  <Icon className="h-8 w-8 text-blue-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-200">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {supportingGroups.map((group) => (
          <div key={group.category} className="rounded-xl border border-gray-800/60 p-5">
            <h3 className="inline-block border-b-2 border-blue-400 pb-1 text-sm font-semibold text-gray-300">
              {group.category}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => {
                const Icon = item.icon ? iconMap[item.icon] : FiCheckCircle;
                return (
                  <li
                    key={item.name}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-800/60 px-3 py-2 text-xs text-gray-400 transition-colors hover:border-blue-800/60 hover:text-gray-200"
                  >
                    <Icon className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
