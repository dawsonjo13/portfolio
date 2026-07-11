"use client";

import Link from "next/link";
import { useTab } from "@/context/TabContext";

export default function Nav() {
  const { setActiveTab } = useTab();

  return (
    <header className="px-6 py-5">
      <nav className="mx-auto flex max-w-4xl items-center justify-between">
        <Link
          href="/"
          onClick={() => setActiveTab("about")}
          className="font-display text-lg font-semibold tracking-tight"
        >
          JP
        </Link>
        <Link
          href="/resume"
          className="text-sm text-gray-400 hover:text-gray-50"
        >
          Resume
        </Link>
      </nav>
    </header>
  );
}
