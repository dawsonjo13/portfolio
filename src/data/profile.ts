import profileJson from "@content/profile.json";

export type Blurb = {
  paragraphs: string[];
  highlights: string[];
};

export type Profile = {
  name: string;
  greeting: string;
  title: string;
  blurb: Blurb;
  photoSrc: string;
  email: string;
  github: string;
  linkedin: string;
};

export const profile: Profile = profileJson;
