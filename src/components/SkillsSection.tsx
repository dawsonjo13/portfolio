import type { IconType } from "react-icons";
import { SiConfluence, SiDotnet, SiJira, SiLaravel, SiMysql, SiPython } from "react-icons/si";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { AiOutlineCloudServer } from "react-icons/ai";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { DiMsqlServer } from "react-icons/di";
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
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((group) => (
        <div key={group.category}>
          <h3 className="inline-block border-b-2 border-blue-400 pb-1 text-sm font-semibold text-gray-300">
            {group.category}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => {
              const Icon = item.icon ? iconMap[item.icon] : undefined;
              return (
                <li
                  key={item.name}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-800 px-3 py-1.5 text-xs text-gray-300"
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
