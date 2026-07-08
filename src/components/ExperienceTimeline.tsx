import Image from "next/image";
import { experience } from "@/data/experience";

export default function ExperienceTimeline() {
  return (
    <ol className="space-y-10 border-l border-gray-200 dark:border-gray-800">
      {experience.map((item, index) => (
        <li key={`${item.company}-${item.role}-${index}`} className="relative pl-8">
          <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gray-400 dark:bg-gray-600" />
          <div className="flex items-start gap-4">
            <Image
              src={item.logoSrc}
              alt={`${item.company} logo`}
              width={40}
              height={40}
              className="h-10 w-10 flex-shrink-0 rounded-md object-contain grayscale"
            />
            <div className="min-w-0">
              <h3 className="font-semibold">{item.role}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.company} · {item.companyLocation}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {item.startDate} – {item.endDate}
              </p>
            </div>
          </div>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-700 dark:text-gray-300">
            {item.bullets.map((bullet, bulletIndex) => (
              <li key={bulletIndex} className="break-words">
                {bullet}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
