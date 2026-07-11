import { profile } from "@/data/profile";

export default function AboutSection() {
  const [firstParagraph, ...restParagraphs] = profile.blurb.paragraphs;

  return (
    <div className="max-w-2xl space-y-4 text-gray-300">
      <p>{firstParagraph}</p>
      <ul className="list-disc space-y-1.5 pl-5">
        {profile.blurb.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {restParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
