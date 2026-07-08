import Image from "next/image";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="top" className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
      <Image
        src={profile.photoSrc}
        alt={profile.name}
        width={144}
        height={144}
        className="h-36 w-36 flex-shrink-0 rounded-full object-cover"
        priority
      />
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-1 text-base font-medium text-gray-600 dark:text-gray-400">
          {profile.title}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
          {profile.location}
        </p>
        <p className="mt-4 max-w-2xl text-gray-700 dark:text-gray-300">
          {profile.blurb}
        </p>
      </div>
    </section>
  );
}
