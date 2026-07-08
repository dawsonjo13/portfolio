import { skills } from "@/data/skills";

export default function SkillsSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {skills.map((group) => (
        <div key={group.category}>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {group.category}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
