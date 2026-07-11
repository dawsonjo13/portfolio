import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-4xl px-6 pb-28 pt-8 text-sm text-gray-400">
      <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js.</p>
    </footer>
  );
}
