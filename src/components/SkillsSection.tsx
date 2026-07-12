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
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((group) => (
        <div key={group.category} className="rounded-xl border border-gray-800 p-5">
          <h3 className="inline-block border-b-2 border-blue-400 pb-1.5 text-base font-semibold text-gray-200">
            {group.category}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {group.items.map((item) => {
              const Icon = item.icon ? iconMap[item.icon] : FiCheckCircle;
              return (
                <li
                  key={item.name}
                  className="flex items-center gap-2 rounded-lg border border-gray-800 px-4 py-2.5 text-sm text-gray-300 transition-colors hover:border-blue-800/60 hover:text-gray-100"
                >
                  <Icon className="h-4 w-4 text-blue-400" aria-hidden="true" />
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
