import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Projects and resume of Your Name.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <Nav />
        <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
