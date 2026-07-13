import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { TabProvider } from "@/context/TabContext";
import "./globals.css";

const THEME_INIT_SCRIPT = `
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored ? stored === "dark" : true;
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Jovi — Portfolio",
  description: "Projects and resume of Dawson Jovi Pangestu.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-screen flex-col bg-dotted bg-slate-50 font-sans text-slate-900 antialiased dark:bg-gray-950 dark:text-gray-100"
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <TabProvider>
          <ThemeToggle />
          <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
            {children}
          </main>
          <Footer />
        </TabProvider>
      </body>
    </html>
  );
}
