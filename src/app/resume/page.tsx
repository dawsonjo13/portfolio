import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Your Name",
};

export default function ResumePage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Resume</h1>
        <a
          href="/resume.pdf"
          download
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
        >
          Download PDF
        </a>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Experience</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Add your work history here, or replace this page with an embedded
          PDF viewer.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Skills</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          List your key skills here.
        </p>
      </section>
    </div>
  );
}
