import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Nav from "@/components/Nav";
import DockNav from "@/components/DockNav";
import Footer from "@/components/Footer";
import { TabProvider } from "@/context/TabContext";
import "./globals.css";

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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col bg-dotted bg-gray-950 font-sans text-gray-100 antialiased">
        <TabProvider>
          <Nav />
          <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-8 pt-4">
            {children}
          </main>
          <Footer />
          <DockNav />
        </TabProvider>
      </body>
    </html>
  );
}
