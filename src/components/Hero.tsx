import Image from "next/image";
import { profile } from "@/data/profile";
import SocialLinks from "@/components/SocialLinks";

export default function Hero() {
  return (
    <section
      id="top"
      className="flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:text-left"
    >
      <Image
        src={profile.photoSrc}
        alt={profile.name}
        width={176}
        height={176}
        className="h-36 w-36 flex-shrink-0 rounded-full object-cover ring-4 ring-gray-800 md:h-44 md:w-44"
        priority
      />
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-1 text-base font-medium text-gray-400">
          {profile.title}
        </p>
        <p className="mt-1 text-sm text-gray-500">{profile.location}</p>
        <p className="mx-auto mt-4 max-w-xl text-gray-300 md:mx-0">
          {profile.blurb}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
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
