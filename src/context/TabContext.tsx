"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type TabId = "about" | "experience" | "skills" | "projects" | "contact";

export const TABS: { id: TabId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

interface TabContextValue {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const TabContext = createContext<TabContextValue | null>(null);

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("about");
  const value = useMemo(() => ({ activeTab, setActiveTab }), [activeTab]);

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}

export function useTab(): TabContextValue {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
}
