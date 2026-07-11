"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { profile } from "@/data/profile";
import { TABS, useTab, type TabId } from "@/context/TabContext";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const { activeTab, setActiveTab } = useTab();

  function handleTabClick(id: TabId) {
    if (id !== activeTab) {
      setActiveTab(id);
    }
    if (!isHome) {
      router.push("/");
    }
  }

  return (
    <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          {profile.name}
        </Link>
        <div className="flex items-center gap-4">
          <ul
            role="tablist"
            className="flex gap-1 overflow-x-auto rounded-full border border-gray-800 p-1"
          >
            {TABS.map((tab) => {
              const isActive = isHome && activeTab === tab.id;
              return (
                <li key={tab.id} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => handleTabClick(tab.id)}
                    className={`block whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-gray-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <Link
            href="/resume"
            className="text-sm text-gray-400 hover:text-gray-50"
          >
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}
