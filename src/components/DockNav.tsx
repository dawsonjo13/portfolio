"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, MotionConfig } from "framer-motion";
import type { IconType } from "react-icons";
import { FiUser, FiBriefcase, FiStar, FiFolder, FiMail } from "react-icons/fi";
import { TABS, useTab, type TabId } from "@/context/TabContext";

const iconMap: Record<TabId, IconType> = {
  about: FiUser,
  experience: FiBriefcase,
  skills: FiStar,
  projects: FiFolder,
  contact: FiMail,
};

export default function DockNav() {
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
    <MotionConfig reducedMotion="user">
      <nav
        aria-label="Primary"
        className="sticky top-0 z-20 flex justify-center bg-gray-950/80 py-4 backdrop-blur"
      >
        <ul
          role="tablist"
          className="flex items-center gap-1 rounded-full border border-gray-800 bg-gray-900/70 p-1 shadow-lg shadow-black/40 backdrop-blur"
        >
          {TABS.map((tab) => {
            const isActive = isHome && activeTab === tab.id;
            const Icon = iconMap[tab.id];
            return (
              <li key={tab.id} role="presentation">
                <button
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-50"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="dock-active-pill"
                      className="absolute inset-0 rounded-full bg-blue-600"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </MotionConfig>
  );
}
