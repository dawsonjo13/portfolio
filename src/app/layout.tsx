import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TabProvider } from "@/context/TabContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Projects and resume of Your Name.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-dotted bg-gray-950 font-sans text-gray-100 antialiased">
        <TabProvider>
          <Nav />
          <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
            {children}
          </main>
          <Footer />
        </TabProvider>
      </body>
    </html>
  );
}
