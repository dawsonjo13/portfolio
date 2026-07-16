"use client";

import { useId, useState } from "react";
import Image from "next/image";
import {
  experience,
  type ExperienceEntry,
  type ExperienceTrack,
  type Position
} from "@/data/experience";

const TRACK_LABELS: Record<ExperienceTrack, string> = {
  employment: "Employment",
  entrepreneurship: "Entrepreneurship"
};

const TRACK_ORDER: ExperienceTrack[] = ["employment", "entrepreneurship"];

function PositionEntry({ position }: { position: Position }) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsId = useId();
  const hasDetails = Boolean(position.details && position.details.length > 0);
  const isCurrent = position.endDate === "Present";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="font-semibold">{position.role}</h4>
        {isCurrent && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400">
            Current
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400 dark:text-gray-500">
        {position.startDate} – {position.endDate}
      </p>
      <p className="mt-2 text-sm text-slate-600 dark:text-gray-300">{position.highlight}</p>

      {hasDetails && (
        <>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={detailsId}
            onClick={() => setIsOpen((prev) => !prev)}
            className="mt-2 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {isOpen ? "Show less" : "Show more"}
          </button>
          <div id={detailsId} aria-hidden={!isOpen} className={`details-collapse${isOpen ? " is-open" : ""}`}>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-500 dark:text-gray-400">
              {position.details?.map((detail, index) => (
                <li key={index} className="break-words">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function CompanyCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <li className="rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-sm dark:border-gray-800">
      <div className="flex items-start gap-4">
        <Image
          src={entry.logoSrc}
          alt={`${entry.company} logo`}
          width={40}
          height={40}
          className="h-10 w-10 flex-shrink-0 rounded-md object-contain grayscale"
        />
        <div className="min-w-0">
          <p className="font-semibold text-slate-900 dark:text-gray-100">{entry.company}</p>
          <p className="text-sm text-slate-500 dark:text-gray-400">{entry.companyLocation}</p>
        </div>
      </div>

      <div className="mt-4 divide-y divide-slate-200 dark:divide-gray-800">
        {entry.positions.map((position, index) => (
          <div key={`${position.role}-${index}`} className={index > 0 ? "pt-4" : "pb-4 last:pb-0"}>
            <PositionEntry position={position} />
          </div>
        ))}
      </div>
    </li>
  );
}

export default function ExperienceTimeline() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {TRACK_ORDER.map((track) => {
        const entries = experience.filter((entry) => entry.track === track);
        return (
          <div key={track}>
            <h3 className="inline-block border-b-2 border-blue-600 pb-1.5 text-base font-semibold text-slate-800 dark:border-blue-400 dark:text-gray-200">
              {TRACK_LABELS[track]}
            </h3>
            {entries.length > 0 ? (
              <ol className="mt-4 space-y-4">
                {entries.map((entry) => (
                  <CompanyCard key={entry.company} entry={entry} />
                ))}
              </ol>
            ) : (
              <p className="mt-4 text-sm text-slate-400 dark:text-gray-500">Nothing here yet.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
