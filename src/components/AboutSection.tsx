import { profile } from "@/data/profile";

export default function AboutSection() {
  return <p className="max-w-2xl text-gray-300">{profile.blurb}</p>;
}
