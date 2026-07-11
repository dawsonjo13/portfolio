import Image from "next/image";
import { profile } from "@/data/profile";
import SocialLinks from "@/components/SocialLinks";

export default function ProfileHeader() {
  return (
    <section className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:text-left">
      <Image
        src={profile.photoSrc}
        alt={profile.name}
        width={128}
        height={128}
        className="h-28 w-28 flex-shrink-0 rounded-full object-cover ring-4 ring-gray-800"
        priority
      />
      <div className="flex flex-col items-center md:items-start">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {profile.greeting}
        </h1>
        <p className="mt-1 text-base font-medium text-gray-400">
          {profile.title}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <SocialLinks />
          <a
            href="/resume.pdf"
            download
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
