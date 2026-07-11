"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { experience, type ExperienceItem } from "@/data/experience";

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsId = useId();
  const hasDetails = Boolean(item.details && item.details.length > 0);
  const isCurrent = item.endDate === "Present";

  return (
    <li className="rounded-xl border border-gray-800 p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start gap-4">
        <Image
          src={item.logoSrc}
          alt={`${item.company} logo`}
          width={40}
          height={40}
          className="h-10 w-10 flex-shrink-0 rounded-md object-contain grayscale"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{item.role}</h3>
            {isCurrent && (
              <span className="rounded-full bg-green-900/40 px-2 py-0.5 text-xs font-medium text-green-400">
                Current
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400">
            {item.company} · {item.companyLocation}
          </p>
          <p className="text-xs text-gray-500">
            {item.startDate} – {item.endDate}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-300">{item.highlight}</p>

      {hasDetails && (
        <>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={detailsId}
            onClick={() => setIsOpen((prev) => !prev)}
            className="mt-2 text-xs font-medium text-blue-400 hover:underline"
          >
            {isOpen ? "Show less" : "Show more"}
          </button>
          <ul
            id={detailsId}
            hidden={!isOpen}
            className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-gray-400"
          >
            {item.details?.map((detail, index) => (
              <li key={index} className="break-words">
                {detail}
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  );
}

export default function ExperienceTimeline() {
  return (
    <ol className="space-y-4">
      {experience.map((item, index) => (
        <ExperienceEntry key={`${item.company}-${item.role}-${index}`} item={item} />
      ))}
    </ol>
  );
}
